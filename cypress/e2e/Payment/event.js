import DePayWidgets from '../../../src'
import fetchMock from 'fetch-mock'
import mockAmountsOut from '../../../tests/mocks/amountsOut'
import mockBasics from '../../../tests/mocks/basics'
import React from 'react'
import ReactDOM from 'react-dom'
import { CONSTANTS } from '@depay/web3-constants'
import { mock, confirm, increaseBlock, resetMocks, anything } from '@depay/web3-mock'
import { resetCache, getProvider } from '@depay/web3-client'
import { routers, plugins } from '@depay/web3-payments'
import { Token } from '@depay/web3-tokens'

describe('Payment Widget: payment event', () => {

  const blockchain = 'ethereum'
  const accounts = ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045']
  const DEPAY = '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb'
  const DAI = CONSTANTS[blockchain].USD
  const ETH = CONSTANTS[blockchain].NATIVE
  const WETH = CONSTANTS[blockchain].WRAPPED
  const fromAddress = accounts[0]
  const toAddress = '0x4e260bB2b25EC6F3A59B478fCDe5eD5B8D783B02'
  const amount = 20
  const defaultArguments = {
    accept: [{
      blockchain,
      amount,
      token: DEPAY,
      receiver: toAddress
    }]
  }
  
  let provider
  let exchange
  let TOKEN_A_AmountBN

  beforeEach(async()=>{
    resetMocks()
    resetCache()
    fetchMock.restore()
    mock({ blockchain, accounts: { return: accounts } })
    provider = await getProvider(blockchain)

    ;({ TOKEN_A_AmountBN, exchange } = mockBasics({
      
      provider,
      blockchain,

      fromAddress,
      fromAddressAssets: [
        {
          "name": "Ether",
          "symbol": "ETH",
          "address": ETH,
          "type": "NATIVE"
        }
      ],
      
      toAddress,

      exchange: 'uniswap_v2',
      NATIVE_Balance: 1.1,

      TOKEN_A: DEPAY,
      TOKEN_A_Decimals: 18,
      TOKEN_A_Name: 'DePay',
      TOKEN_A_Symbol: 'DEPAY',
      TOKEN_A_Amount: amount,
      TOKEN_A_Balance: 0,
      
      TOKEN_B: DAI,
      TOKEN_B_Decimals: 18,
      TOKEN_B_Name: 'Dai Stablecoin',
      TOKEN_B_Symbol: 'DAI',
      TOKEN_B_Amount: 33,
      TOKEN_B_Balance: 50,

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
  
  it('emits an event if payment transaction goes through the router', () => {
    
    mockAmountsOut({
      provider,
      blockchain,
      exchange,
      amountInBN: '10100000000000000',
      path: [WETH, DAI],
      amountsOut: [
        '10100000000000000',
        '27000000000000000000'
      ]
    })

    let mockedTransaction = mock({
      blockchain,
      transaction: {
        to: "0xae60ac8e69414c2dc362d0e6a03af643d1d85b92",
        api: routers[blockchain].api,
        method: 'route',
        params: {
          path: ["0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee","0xa0bed124a09ac2bd941b10349d8d224fe3c955eb"],
          amounts: ["10100000000000000", "20000000000000000000", anything],
          addresses: [fromAddress, toAddress],
          plugins: [
            plugins[blockchain].uniswap_v2.address,
            plugins[blockchain].paymentWithEvent.address
          ],
          data:[]
        }
      }
    })

    fetchMock.post({
      url: "https://public.depay.com/payments",
      body: {
        after_block: 1,
        amount: "20.0",
        blockchain: "ethereum",
        confirmations: 1,
        fee_amount: null,
        fee_receiver: null,
        nonce: 0,
        payload: {
          sender_amount: "0.0101",
          sender_id: fromAddress.toLowerCase(),
          sender_token_id: ETH,
          type: 'payment'
        },
        receiver: toAddress,
        sender: fromAddress.toLowerCase(),
        token: DEPAY,
        transaction: mockedTransaction.transaction._id,
        uuid: mockedTransaction.transaction._id,
      },
    }, 201)

    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document)=>{
        DePayWidgets.Payment({ ...defaultArguments, event: 'ifSwapped', document })
        cy.get('button[title="Close dialog"]', { includeShadowDom: true }).should('exist')
        cy.get('.ReactShadowDOMOutsideContainer').shadow().find('.ButtonPrimary').should('contain.text', 'Pay €22.95')
        cy.get('.ReactShadowDOMOutsideContainer').shadow().find('.ButtonPrimary').click()
        cy.get('.ReactShadowDOMOutsideContainer').shadow().find('.ButtonPrimary').invoke('attr', 'href').should('include', 'https://etherscan.io/tx/')
        cy.get('.ReactShadowDOMOutsideContainer').shadow().find('.ButtonPrimary').invoke('attr', 'target').should('eq', '_blank')
        cy.get('.ReactShadowDOMOutsideContainer').shadow().find('.ButtonPrimary').invoke('attr', 'rel').should('eq', 'noopener noreferrer')
        cy.get('.ReactShadowDOMOutsideContainer').shadow().find('.ButtonPrimary').should('contain.text', 'Paying...').then(()=>{
          expect(mockedTransaction.calls.count()).to.equal(1)
          cy.get('button[title="Close dialog"]', { includeShadowDom: true }).should('not.exist')
          cy.get('.ReactShadowDOMOutsideContainer').shadow().find('.Card.disabled')
          confirm(mockedTransaction)
          cy.wait(1000).then(()=>{
            cy.get('.ReactShadowDOMOutsideContainer').shadow().find('.Card.disabled').then(()=>{
              cy.get('button[title="Close dialog"]', { includeShadowDom: true }).should('exist')
              cy.get('.ReactShadowDOMOutsideContainer').shadow().find('.ButtonPrimary').click()
              cy.get('.ReactShadowDOMOutsideContainer').should('not.exist')
            })
          })
        })
      })
    })
  })
})
