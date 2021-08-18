import apiKey from '../apiKey'
import ConfigurationContext from '../contexts/ConfigurationContext'
import React, { useState, useEffect, useContext } from 'react'
import ToTokenContext from '../contexts/ToTokenContext'
import UpdateContext from '../contexts/UpdateContext'
import WalletContext from '../contexts/WalletContext'
import { CONSTANTS } from 'depay-web3-constants'
import { Currency } from 'depay-local-currency'
import { route } from 'depay-web3-exchanges'
import { Token } from 'depay-web3-tokens'

export default (props)=>{

  const { account } = useContext(WalletContext)
  const { update } = useContext(UpdateContext)
  const { blockchain, token, amount } = useContext(ConfigurationContext)
  const [ localValue, setLocalValue ] = useState()
  const [ reloadCount, setReloadCount ] = useState(0)
  const getToTokenLocalValue = ({ update })=>{
    if(update == false) { return }
    Promise.all([
      route({
        blockchain,
        tokenIn: token,
        tokenOut: CONSTANTS[blockchain].USD,
        amountIn: amount,
        fromAddress: account,
        toAddress: account
      }),
      (new Token({ blockchain, address: CONSTANTS[blockchain].USD })).decimals()
    ]).then(([USDExchangeRoutes, USDDecimals])=>{
      let USDRoute = USDExchangeRoutes[0]
      let USDAmount = USDRoute.amountOut.toString()
      let USDValue = parseFloat(USDAmount) / 10**USDDecimals
      Currency.fromUSD({ amount: USDValue, apiKey }).then((localValue)=>{
        setLocalValue(localValue)
      })
    })
  }
  
  useEffect(()=>{
    if(account) { getToTokenLocalValue({ update }) }
  }, [account])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReloadCount(reloadCount + 1)
      getToTokenLocalValue({ update })
    }, 15000);

    return () => clearTimeout(timeout)
  }, [reloadCount, update])
  
  return(
    <ToTokenContext.Provider value={{
      localValue
    }}>
      { props.children }
    </ToTokenContext.Provider>
  )
}
