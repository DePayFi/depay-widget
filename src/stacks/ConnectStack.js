import allWallets from '../helpers/allWallets'
import ClosableContext from '../contexts/ClosableContext'
import ConnectWalletDialog from '../dialogs/ConnectWalletDialog'
import platformForWallet from '../helpers/platformForWallet'
import isAndroid from '../helpers/isAndroid'
import PoweredBy from '../components/PoweredBy'
import React, { useState, useContext, useEffect } from 'react'
import safeAppUrl from '../helpers/safeAppUrl'
import SelectBlockchainDialog from '../dialogs/SelectBlockchainDialog'
import SelectWalletDialog from '../dialogs/SelectWalletDialog'
import WhatIsAWalletDialog from '../dialogs/WhatIsAWalletDialog'
import { getWallets, wallets } from '@depay/web3-wallets'
import { ReactDialogStack } from '@depay/react-dialog-stack'
import { set as setPreviouslyConnectedWallet } from '../helpers/previouslyConnectedWallet'

export default (props)=>{

  const { open, close } = useContext(ClosableContext)
  const [ wallet, setWallet ] = useState()
  const [ selection, setSelection ] = useState({ blockchain: undefined })
  const [ showConnectExtensionWarning, setShowConnectExtensionWarning ] = useState(false)
  const resolve = (account, wallet)=> {
    if(account && wallet) {
      let walletMeta = allWallets.find((walletMeta)=>walletMeta.extension == wallet.name) || allWallets.find((walletMeta)=>walletMeta.name == wallet.name)
      setPreviouslyConnectedWallet(walletMeta.name)
      if(props.autoClose) close()
      if(props.resolve) props.resolve({ account, wallet })
    }
  }

  const connectExtension = (wallet)=>{
    setShowConnectExtensionWarning(false)

    wallet = new wallets[wallet.extension]()
    wallet.connect()
      .then((account)=>{ 
        resolve(account, wallet)
      })
      .catch((error)=>{
        if(error?.code == -32002) { // Request of type 'wallet_requestPermissions' already pending...
          setShowConnectExtensionWarning(true)
        }
      })
  }

  const connectViaRedirect = (walletMetaData, reconnect = true)=> {
    let platform = platformForWallet(walletMetaData)
    if(!platform) { return }
    if(walletMetaData.link == 'WalletConnectV1') {
      let wallet = new wallets[walletMetaData.link]()
      wallet.connect({
        name: walletMetaData.name,
        logo: walletMetaData.logo,
        reconnect,
        connect: ({ uri })=>{
          let href
          if(platform.universal) {
            href = safeUniversalUrl(platform.universal)
          } else {
            href = safeAppUrl(platform.native)
          }
          localStorage.setItem('WALLETCONNECT_DEEPLINK_CHOICE', JSON.stringify({ href, name: isAndroid() ? 'Android' : walletMetaData.name }))
          if(platform.universal) {
            if(platform.encoded !== false) {
              href = `${href}/wc?uri=${encodeURIComponent(uri)}`
            } else {
              href = `${href}/wc?uri=${uri}`
            }
          } else if(platform.native) {
              if(platform.encoded !== false) {
                href = `${href}wc?uri=${encodeURIComponent(uri)}`
              } else {
                href = `${href}wc?uri=${uri}`
              }
          }
          let target = platform.native && !platform.universal ? '_self' : '_blank'
          try {
            let openReturn = window.open(href, target, 'noreferrer noopener')
            alert(`openReturn: ${openReturn}`);
          } catch (error) {
            alert(error);
          }
        }
      }).then((account)=>{
        resolve(account, wallet)
      })
    } else if (walletMetaData.link == 'WalletLink') {
      setPreviouslyConnectedWallet(walletMetaData.name)
      if(isAndroid()) {
        window.open(`https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(window.location.toString())}`, '_self', 'noreferrer noopener')
      } else { // IOS
        window.open(`cbwallet://dapp?url=${encodeURIComponent(window.location.toString())}`, '_self', 'noreferrer noopener')
      }
    }
  }

  return(
    <div>
      <ReactDialogStack
        open={ open }
        close={ close }
        start='SelectWallet'
        container={ props.container }
        document={ props.document }
        dialogs={{
          SelectWallet: <SelectWalletDialog setWallet={ setWallet } resolve={ resolve } connectViaRedirect={ connectViaRedirect } connectExtension={ connectExtension } />,
          WhatIsAWallet: <WhatIsAWalletDialog />,
          ConnectWallet: <ConnectWalletDialog selection={ selection } wallet={ wallet } resolve={ resolve } connectViaRedirect={ connectViaRedirect } connectExtension={ connectExtension } showConnectExtensionWarning={ showConnectExtensionWarning } />
        }}
      />
      <PoweredBy/>
    </div>
  )
}
