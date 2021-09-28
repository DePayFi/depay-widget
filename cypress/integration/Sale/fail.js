import DePayWidgets from '../../../src'
import fetchMock from 'fetch-mock'
import mockBasics from '../../../tests/mocks/basics'
import React from 'react'
import ReactDOM from 'react-dom'
import { CONSTANTS } from 'depay-web3-constants'
import { mock, resetMocks, fail, anything } from 'depay-web3-mock'
import { resetCache, provider } from 'depay-web3-client'
import { routers, plugins } from 'depay-web3-payments'
import { Token } from 'depay-web3-tokens'
import { Transaction } from 'depay-web3-transaction'

describe('Sale execution fails', () => {

  const blockchain = 'ethereum'
  const accounts = ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045']
  beforeEach(resetMocks)
  beforeEach(resetCache)
  beforeEach(()=>fetchMock.restore())
  beforeEach(()=>mock({ blockchain, accounts: { return: accounts } }))

  let DEPAY = '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb'
  let DAI = CONSTANTS[blockchain].USD
  let ETH = CONSTANTS[blockchain].NATIVE
  let WETH = CONSTANTS[blockchain].WRAPPED
  let fromAddress = accounts[0]
  let toAddress = fromAddress
  let amount = 20
  let TOKEN_A_AmountBN
  let TOKEN_B_AmountBN
  let defaultArguments = {
    amount: {
      start: 20,
      min: 1,
      step: 1
    },
    token: DEPAY,
    blockchains: [blockchain]
  }

  beforeEach(()=>{

    ({ TOKEN_A_AmountBN, TOKEN_B_AmountBN } = mockBasics({
      
      provider: provider(blockchain),
      blockchain,

      fromAddress,
      fromAddressAssets: [
        {
          "name": "Ether",
          "symbol": "ETH",
          "address": ETH,
          "type": "NATIVE"
        }, {
          "name": "Dai Stablecoin",
          "symbol": "DAI",
          "address": DAI,
          "type": "ERC20"
        }, {
          "name": "DePay",
          "symbol": "DEPAY",
          "address": DEPAY,
          "type": "ERC20"
        }
      ],
      
      toAddress,

      exchange: 'uniswap_v2',
      NATIVE_Balance: 0,

      TOKEN_A: DEPAY,
      TOKEN_A_Decimals: 18,
      TOKEN_A_Name: 'DePay',
      TOKEN_A_Symbol: 'DEPAY',
      TOKEN_A_Amount: amount,
      TOKEN_A_Balance: 30,
      
      TOKEN_B: DAI,
      TOKEN_B_Decimals: 18,
      TOKEN_B_Name: 'Dai Stablecoin',
      TOKEN_B_Symbol: 'DAI',
      TOKEN_B_Amount: 33,
      TOKEN_B_Balance: 50,
      TOKEN_B_Allowance: CONSTANTS[blockchain].MAXINT,

      TOKEN_A_TOKEN_B_Pair: CONSTANTS[blockchain].ZERO,
      TOKEN_B_WRAPPED_Pair: '0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11',
      TOKEN_A_WRAPPED_Pair: '0xEF8cD6Cb5c841A4f02986e8A8ab3cC545d1B8B6d',

      WRAPPED_AmountIn: 0.01,
      USD_AmountOut: 33,

      timeZone: 'Europe/Berlin',
      stubTimeZone: (timeZone)=> {
        cy.stub(Intl, 'DateTimeFormat', () => {
          return { resolvedOptions: ()=>{
            return { timeZone }
          }}
        })
      },

      currency: 'EUR',
      currencyToUSD: '0.85'
    }))
  })
  
  it('shows an error dialog if confirming sent payment transaction by the network failed and calls the failed callback', () => {
    let mockedTransaction = mock({
      blockchain,
      transaction: {
        delay: 1000,
        from: fromAddress,
        to: routers[blockchain].address,
        api: routers[blockchain].api,
        method: 'route',
        params: {
          path: [DAI, WETH, DEPAY],
          amounts: [TOKEN_B_AmountBN, TOKEN_A_AmountBN, anything],
          addresses: [fromAddress, toAddress],
          plugins: [plugins[blockchain].uniswap_v2.address, plugins[blockchain].payment.address],
          data: []
        }
      }
    })

    let failedCalledWith

    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document)=>{
        DePayWidgets.Sale({ ...defaultArguments,
          failed: (transaction)=> {
            failedCalledWith = transaction
          },
        document})
        cy.get('.ReactShadowDOMOutsideContainer').shadow().find('.ButtonPrimary').should('contain.text', 'Pay €28.05')
        cy.get('.ReactShadowDOMOutsideContainer').shadow().find('.ButtonPrimary').click()
        cy.get('.ReactShadowDOMOutsideContainer').shadow().find('.ButtonPrimary').should('contain.text', 'Paying...').then(()=>{
          fail(mockedTransaction)
          cy.get('.ReactShadowDOMOutsideContainer').shadow().find('a').invoke('attr', 'href').should('include', 'https://etherscan.io/tx/')
          cy.wait(2000).then(()=>{
            cy.get('.ReactShadowDOMOutsideContainer').shadow().find('h1').should('contain.text', 'Payment Failed')
            cy.get('button[title="Go back"]', { includeShadowDom: true }).should('exist')
            cy.get('.ReactShadowDOMOutsideContainer').shadow().contains('.ButtonPrimary', 'Try again').click()
            cy.get('.ReactShadowDOMOutsideContainer').shadow().find('.ButtonPrimary').should('contain.text', 'Pay €28.05')
            cy.get('.ReactShadowDOMOutsideContainer').shadow().contains('strong', 'Unfortunately executing your payment failed. You can go back and try again.').then(()=>{
              expect(failedCalledWith).to.be.an.instanceof(Transaction)
            })
          })
        })
      })
    })
  })
})
