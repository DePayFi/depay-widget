import ChangableAmountContext from '../contexts/ChangableAmountContext'
import Checkmark from '../components/Checkmark'
import ClosableContext from '../contexts/ClosableContext'
import ConfigurationContext from '../contexts/ConfigurationContext'
import DigitalWalletIcon from '../components/DigitalWalletIcon'
import LoadingText from '../components/LoadingText'
import PaymentContext from '../contexts/PaymentContext'
import PaymentValueContext from '../contexts/PaymentValueContext'
import React, { useContext } from 'react'
import { Currency } from '@depay/local-currency'
import { NavigateStackContext } from '@depay/react-dialog-stack'

export default ()=>{
  const { currencyCode } = useContext(ConfigurationContext)
  const { amount, amountsMissing } = useContext(ChangableAmountContext)
  const { payment, paymentState, pay, transaction, approve, approvalTransaction } = useContext(PaymentContext)
  const { paymentValue } = useContext(PaymentValueContext)
  const { navigate } = useContext(NavigateStackContext)
  const { close } = useContext(ClosableContext)

  const additionalPaymentInformation = ()=> {
    if (paymentState == 'paying' && transaction == undefined) {
      return(
        <div className="Card transparent disabled small">
          <div className="CardImage">
            <div className="TextCenter Opacity05">
              <DigitalWalletIcon className="small"/>
            </div>
          </div>
          <div className="CardBody">
            <div className="CardBodyWrapper">
              <div className="Opacity05">
                Confirm transaction in your wallet
              </div>
            </div>
          </div>
        </div>
      )
    } else if (paymentState == 'confirmed') {
      return(
        <div>
          <a className="Card transparent small" title="Payment has been confirmed by the network" href={ transaction?.url } target="_blank" rel="noopener noreferrer">
            <div className="CardImage">
              <div className="TextCenter Opacity05">
                <Checkmark className="small"/>
              </div>
            </div>
            <div className="CardBody">
              <div className="CardBodyWrapper">
                <div className="Opacity05">
                  Payment has been confirmed
                </div>
              </div>
            </div>
          </a>
        </div>
      )
    }
  }

  const approvalButton = ()=> {
    if(!payment.route.approvalRequired || payment.route.directTransfer) {
      return(null)
    } else if(paymentState == 'initialized') {
      return(
        <div className="PaddingBottomS">
          <button className="ButtonPrimary" onClick={ approve } title={`Allow ${payment.symbol} to be used as payment`}>
            Allow { payment.symbol } to be used as payment
          </button>
        </div>
      )
    } else if (paymentState == 'approving') {
      return(
        <div className="PaddingBottomS">
          <a className="ButtonPrimary" title="Approving payment token - please wait" href={ approvalTransaction?.url } target="_blank" rel="noopener noreferrer">
            <LoadingText>Approving</LoadingText>
          </a>
        </div>
      )
    }
  }

  const mainAction = ()=> {
    if(paymentState == 'initialized' || paymentState == 'approving') {
      return(
        <button 
          className={["ButtonPrimary", (payment.route.approvalRequired && !payment.route.directTransfer ? 'disabled': '')].join(' ')}
          onClick={()=>{
            if(payment.route.approvalRequired && !payment.route.directTransfer) { return }
            pay({ navigate })
          }}
        >
          Pay { amount ? new Currency({ amount: amount.toFixed(2), code: currencyCode }).toString() : ((paymentValue.toString().length) ? paymentValue.toString() : `${payment.amount}`) }
        </button>
      )
    } else if (paymentState == 'paying') {
      return(
        <a className="ButtonPrimary" title="Performing the payment - please wait" href={ transaction?.url } target="_blank" rel="noopener noreferrer">
          <LoadingText>Paying</LoadingText>
        </a>
      )
    } else if (paymentState == 'confirmed') {
      return(
        <button className="ButtonPrimary" title="Close" onClick={ close }>
          Close
        </button>
      )
    }
  }

  return(
    <div>
      { approvalButton() }
      { additionalPaymentInformation() }
      { mainAction() }
    </div>
  )
}
