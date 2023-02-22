import copy from '@uiw/copy-to-clipboard'
import Dialog from '../components/Dialog'
import ExtensionImage from '../graphics/extension'
import isMobile from '../helpers/isMobile'
import LinkImage from '../graphics/link'
import QRCodeImage from '../graphics/qrcode'
import QRCodeStyling from "qr-code-styling"
import React, { useState, useContext, useEffect, useRef } from 'react'
import safeAppUrl from '../helpers/safeAppUrl'
import safeUniversalUrl from '../helpers/safeUniversalUrl'
import { NavigateStackContext } from '@depay/react-dialog-stack'
import { wallets } from '@depay/web3-wallets'

export default (props)=> {

  const QRCodeElement = React.useRef()
  const [ showConnectExtensionButton, setShowConnectExtensionButton ] = useState(false)
  const [ showConnectExtensionWarning, setShowConnectExtensionWarning ] = useState(false)
  const [ extensionIsAvailable, setExtensionIsAvailable ] = useState()
  const [ linkIsConnected, setLinkIsConnected ] = useState()
  const [ linkURI, setLinkURI ] = useState()
  const [ showQRCode, setShowQRCode ] = useState(false)
  const [ showLinkCopied, setShowLinkCopied ] = useState(false)
  const [ QRCode, setQRCode ] = useState()
  const { navigate } = useContext(NavigateStackContext)
  const header = (
    <div className="PaddingTopS PaddingLeftM PaddingRightM">
      { props.wallet?.logo &&
        <div className="PaddingTopXS">
          <div className="LineHeightL FontSizeL PaddingTopS">
            <span className="CardImage rounded large">
              <img className="transparent" src={ props.wallet.logo }/>
            </span>
          </div>
        </div>
      }
    </div>
  )

  const connectExtension = ()=>{
    setShowConnectExtensionWarning(false)

    if(extensionIsAvailable) {
      let wallet = new wallets[props.wallet.extension]()
      wallet.connect()
        .then((account)=>{ props.resolve(account, wallet)})
        .catch((error)=>{
          if(error?.code == -32002) { // Request of type 'wallet_requestPermissions' already pending...
            setShowConnectExtensionWarning(true)
          }
        })
    }
  }

  const connectViaRedirect = (provider, uri)=>{
    if(!provider) { return }
    let wallet = new wallets[props.wallet.link]()
    wallet.connect({
      name: props.wallet.name,
      logo: props.wallet.logo,
      connect: ({ uri })=>{
        let href = provider.native ? safeAppUrl(provider.native) : safeUniversalUrl(provider.universal)
        localStorage.setItem('WALLETCONNECT_DEEPLINK_CHOICE', JSON.stringify({ href, name: props.wallet.name }))
        href = provider.native ? `${href}wc?uri=${encodeURIComponent(uri)}` : `${href}/wc?uri=${encodeURIComponent(uri)}`
        let target = provider.native && !provider.universal ? '_self' : '_blank'
        window.open(href, target, 'noreferrer noopener')
      }
    }).then((account)=>{
      props.resolve(account, wallet)
    })
  }

  const connectViaCopyLink = ()=>{
    let wallet = new wallets[props.wallet.link]()
    wallet.connect({
      name: props.wallet.name,
      logo: props.wallet.logo,
      reconnect: true,
      connect: ({ uri })=>{
        copy(uri)
        setShowLinkCopied(true)
        setTimeout(()=>setShowLinkCopied(false), 3000)
      }
    }).then((account)=>{
      props.resolve(account, wallet)
    })
  }

  const connect = ()=>{
    if(props.wallet.via == 'detected') { connectExtension() }
    if(linkIsConnected && props.wallet.via == 'detected') {
      wallets[props.wallet.link].getConnectedInstance().then((wallet)=>{
        wallet.account().then((account)=>{
          props.resolve(account, wallet)
        })
      })
    } else {
      if(isMobile()) {
        connectViaRedirect(props.wallet.mobile)
      } else {
        connectViaRedirect(props.wallet.desktop)
      }
    }
  }

  useEffect(()=>{
    (async ()=>{
      setExtensionIsAvailable(
        props.wallet?.extension ? (await wallets[props.wallet.extension].isAvailable()) : false
      )
      setLinkIsConnected(
        props.wallet?.link ? (await wallets[props.wallet.link].isAvailable()) : false
      )
    })()
  }, [])

  useEffect(()=> {
    if(extensionIsAvailable != undefined && linkIsConnected != undefined) {
      connect()

      if(linkIsConnected == false){
        setShowQRCode(!extensionIsAvailable && !isMobile() && !props.wallet?.desktop?.native)
      }

      let timeout = setTimeout(()=>{
        if(extensionIsAvailable) {
          setShowConnectExtensionButton(true)
        }
      }, 8000)
      return ()=>clearTimeout(timeout)
    }
  }, [extensionIsAvailable, linkIsConnected])

  useEffect(()=> {
    if(showQRCode && props.wallet.link) {
      switch (props.wallet.link) {
        case 'WalletConnectV1':
          if(QRCode == undefined) {
            let wallet = new wallets[props.wallet.link]()
            wallet.connect({
              name: props.wallet.name,
              logo: props.wallet.logo,
              reconnect: true,
              connect: ({ uri })=>{
                let newQRCode = new QRCodeStyling({
                  width: 340,
                  height: 340,
                  type: "svg",
                  dotsOptions: { type: "extra-rounded" },
                  cornersSquareOptions: { type: 'rounded' },
                  backgroundOptions: {
                    color: "transparent",
                  },
                })
                newQRCode.update({ data: uri })
                setQRCode(newQRCode)
              }
            }).then((account)=>{
              props.resolve(account, wallet)
            })
          }
        break;
        case 'WalletLink':
          let wallet = new wallets[props.wallet.link]()
          wallet.connect().then((account)=>{
            props.resolve(account, wallet)
          })
        break
      }
    }
  }, [showQRCode])

  useEffect(()=>{
    if(showQRCode && QRCode && QRCodeElement && QRCodeElement.current) {
      QRCodeElement.current.innerHTML = ""
      QRCode.append(QRCodeElement.current)
    }
  }, [QRCode])

  return(
    <Dialog
      stacked={ true }
      header={ header }
      body={
        <div className="TextCenter">

          <div className="PaddingLeftL PaddingRightL">
            <h1 className="LineHeightL Text FontSizeL FontWeightBold">Connect { props.wallet.name }</h1>
          </div>

          <div className="PaddingTopS">
            <div ref={ QRCodeElement } className="QRCode"/>
            { showQRCode &&
              <div className="Opacity05 PaddingBottomXS">
                <small>Scan QR code with your wallet</small>
              </div>
            }
          </div>

          <div className="PaddingLeftL PaddingRightL PaddingTopL">
            { extensionIsAvailable &&
              <div className="PaddingLeftM PaddingRightM PaddingBottomXS">
                { showConnectExtensionWarning &&
                  <div className="PaddingTopS PaddingBottomS PaddingLeftS PaddingRightS">
                    <div className="Alert">
                      <span className="FontWeightBold PaddingBottomXS">
                        You wallet extension window is already asking to connect. It might be hidden.
                      </span>
                    </div>
                  </div>
                }
                <button onClick={ ()=>connectExtension() } className="Card small PaddingTopS PaddingRightXS PaddingBottomS PaddingLeftXS">
                  <span className="PaddingTopXS PaddingRightXS PaddingLeftS">
                    <img className="transparent " title="Connect your wallet" style={{ height: '26px' }} src={ ExtensionImage }/>
                  </span>
                  <div className="PaddingLeftS LineHeightXS">
                    <div className="CardText FontWeightMedium">
                      Connect extension
                    </div>
                  </div>
                </button>
              </div>
            }
            { props.wallet.link && !showQRCode &&
              <div className="PaddingLeftM PaddingRightM PaddingBottomXS">
                <button onClick={ ()=>setShowQRCode(true) } className="Card small PaddingTopS PaddingRightXS PaddingBottomS PaddingLeftXS">
                  <span className="PaddingTopXS PaddingRightXS PaddingLeftS">
                    <img className="transparent " title="Scan QR code to connect a mobile wallet" style={{ height: '26px' }} src={ QRCodeImage }/>
                  </span>
                  <div className="PaddingLeftS LineHeightXS">
                    <div className="CardText FontWeightMedium">
                      Scan QR Code
                    </div>
                  </div>
                </button>
              </div>
            }
            { props.wallet.link && props.wallet.link == 'WalletConnectV1' &&
              <div className="PaddingLeftM PaddingRightM PaddingBottomXS TooltipWrapper">
                <button onClick={ connectViaCopyLink } className="Card small PaddingTopS PaddingRightXS PaddingBottomS PaddingLeftXS">
                  <span className="PaddingTopXS PaddingRightXS PaddingLeftS">
                    <img className="transparent " title="Copy connection link" style={{ height: '26px' }} src={ LinkImage }/>
                  </span>
                  <div className="PaddingLeftS LineHeightXS">
                    <div className="CardText FontWeightMedium">
                      Copy connection link
                    </div>
                  </div>
                </button>
                { showLinkCopied &&
                  <div className="Tooltip absolute top"> 
                    <span className="TooltipArrowDown"/>
                    Connection link copied
                  </div> 
                }
              </div>
            }
          </div>

        </div>
      }
    />
  )
}
