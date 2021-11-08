import ChangableAmountContext from '../contexts/ChangableAmountContext'
import ConfigurationContext from '../contexts/ConfigurationContext'
import DonationRoutingContext from '../contexts/DonationRoutingContext'
import PaymentProvider from '../providers/PaymentProvider'
import PaymentRoutingProvider from '../providers/PaymentRoutingProvider'
import PaymentValueProvider from '../providers/PaymentValueProvider'
import React, { useContext } from 'react'

export default (props)=>{
  const { acceptWithAmount, setMaxRoute } = useContext(ChangableAmountContext)
  const { blacklist } = useContext(ConfigurationContext)

  return(
    <DonationRoutingContext.Provider value={{}}>
      <PaymentRoutingProvider accept={ acceptWithAmount } blacklist={ blacklist } setMaxRoute={ setMaxRoute }>
        <PaymentProvider container={ props.container } document={ props.document } >
          <PaymentValueProvider>
            { props.children }
          </PaymentValueProvider>
        </PaymentProvider>
      </PaymentRoutingProvider>
    </DonationRoutingContext.Provider>
  )
}
