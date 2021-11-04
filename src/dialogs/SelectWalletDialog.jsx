import ChevronRight from '../components/ChevronRight'
import Dialog from '../components/Dialog'
import React, { useState, useEffect, useContext } from 'react'
import { getWallet, wallets } from 'depay-web3-wallets'
import { NavigateStackContext } from 'depay-react-dialog-stack'

export default (props)=>{

  const [showExplanation, setShowExplanation] = useState(false)
  const { navigate } = useContext(NavigateStackContext)
  const wallet = getWallet()
  
  useEffect(async ()=>{
    if(wallet) {
      let accounts = await wallet.accounts()
      if(accounts == undefined || accounts.length == 0) {
        navigate('ConnectingWallet')
      }
    }
  }, [wallet])

  const connect = (wallet)=>{
    props.setWallet(wallet)
    navigate('ConnectingWallet')
    props.connect(wallet)
  }

  let availableWallets = [wallets.WalletConnect]
  if(wallet) { availableWallets.unshift(wallet) }

  let walletCards = availableWallets.map((wallet, index)=>{
    return(
      <button
        key={index}
        className="Card small"
        title={`Connect ${wallet.name}`}
        onClick={()=>connect(wallet)}
      >
        <div className="CardImage PaddingLeftM">
          <img src={wallet.logo}/>
        </div>
        <div className="CardBody">
          <div className="CardBodyWrapper PaddingLeftXS">
            <h2 className="CardText FontWeightBold">
              { wallet.name }
            </h2>
          </div>
        </div>
      </button>
    )
  })

  return(
    <Dialog
      header={
        <div className="PaddingTopS PaddingLeftM PaddingRightM">
          <h1 className="FontSizeL TextLeft">Select a wallet</h1>
        </div>
      }
      body={
        <div className="PaddingTopS PaddingBottomXS PaddingLeftS PaddingRightS">
          { walletCards }
        </div>
      }
      footer={
        <div className="PaddingBottomS">
          <button className="FontSizeS FontWeightBold TextGrey TextButton" onClick={()=>setShowExplanation(!showExplanation)}>
            <strong>What is a wallet?</strong>
          </button>
          {showExplanation &&
            <p className="PaddingLeftM PaddingRightM">
              Wallets are used to send, receive, and store digital assets. Wallets come in many forms. They are either built into your browser, an extension added to your browser, a piece of hardware plugged into your computer or even an app on your phone.
            </p>
          }
        </div>
      }
    />
  )
}
