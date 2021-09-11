## Installation

You can either load the depay-widgets package via CDN:

```
<script src="https://depay.fi/integrate/widgets/v2.js"></script>
```

or you install depay-widgets via the package manager of your choice and ship it as part of your application bundle:

```
yarn add depay-widgets
```

```
npm install depay-widgets --save
```

and load the DePayWidgets package wherever you need it:

```
import DePayWidgets from 'depay-widgets'
```

## DePay Payments

DePay Payments allows you to accept and perform crypto payments.

### Preparation

In order to receive decentralized payments on any blockchain you need to have your own wallet on that particular blockchain first:

- [Create an Ethereum wallet](https://ethereum.org/en/wallets/)
- [Create an BSC wallet](https://academy.binance.com/en/articles/how-to-get-started-with-binance-smart-chain-bsc)

### Quick start

```
<script src="https://depay.fi/integrate/widgets/v2.js"/>
```

```
DePayWidgets.Payment({
  accept: [{
    blockchain: 'ethereum',
    amount: 20,
    token: '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb',
    receiver: '0x4e260bB2b25EC6F3A59B478fCDe5eD5B8D783B02'
  }]
});
```

### Configuration

You need to pass a configuration object to `DePayWidgets.Payment` which needs to at least contain the `accept` field:

```javascript
DePayWidgets.Payment({
  accept: [{
    blockchain: 'ethereum',
    amount: 20,
    token: '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb',
    receiver: '0x4e260bB2b25EC6F3A59B478fCDe5eD5B8D783B02'
  }]
});
```

You can also accept multiple payments of multiple blockchains:

```javascript
DePayWidgets.Payment({
  accept: [
    { // 20 USDT on ethereum
      blockchain: 'ethereum',
      amount: 20,
      token: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      receiver: '0x4e260bB2b25EC6F3A59B478fCDe5eD5B8D783B02'
    },{ // 20 BUSD on bsc
      blockchain: 'bsc',
      amount: 20,
      token: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      receiver: '0x552C2a5a774CcaEeC036d41c983808E3c76477e6'
    }
  ]
});
```

#### accept

`blockchain`

The blockchain you want to receive the payment on.

Currently supported:

- `ethereum`
- `bsc` (Binance Smart Chain)

`amount`

The amount of tokens you want to receive. Needs to be passed as a number e.g. `20`. If passed as string the widget will asume it's a `BigNumber`.

The `BigNumber` of that amount will be calculated internally including finding the right amount of decimals for the given token.
So please just pass the amount in a human readable form as Number/Decimal: e.g. `20` for 20 USDT or `20.25` etc.

`token`

The address of the token you want to receive.

Use our [payment configurator](https://depay.fi/documentation/payments#payment-configurator) in order to simplify configuring this.

`receiver`

The address receiving the payment. Always double check that you've set the right address.

#### sent

`sent`

A function that will be called once the payment has been sent to the network (but still needs to be mined/confirmed).

The widget will call the `sent` callback-function passing a transaction as single argument (see: [depay-web3-transaction](http://github.com/depayfi/depay-web3-transaction) for more details)

```javascript
DePayWidgets.Payment({

  sent: (transaction)=> {
    // called when payment transaction has been sent to the network
  }
})
```

#### confirmed

`confirmed`

A function that will be called once the payment has been confirmed once by the network.

The widget will call the `confirmed` callback-function passing a transaction as single argument (see: [depay-web3-transaction](http://github.com/depayfi/depay-web3-transaction) for more details)

```javascript
DePayWidgets.Payment({

  confirmed: (transaction)=> {
    // called when payment transaction has been confirmed once by the network
  }
})
```

#### ensured

`ensured`

A function that will be called once the payment has been confirmed enough times to consider it's "ensured" (e.g. 12 confirmations on Ethereum).

The widget will call the `ensured` callback-function passing a transaction as single argument (see: [depay-web3-transaction](http://github.com/depayfi/depay-web3-transaction) for more details)

```javascript
DePayWidgets.Payment({

  ensured: (transaction)=> {
    // called when payment transaction has been confirmed X times by the network
  }
})
```

#### failed

`failed`

A function that will be called if the payment execution failed on the blockchain (after it has been sent/submitted).

The widget will call the `failed` callback-function passing a transaction as single argument (see: [depay-web3-transaction](http://github.com/depayfi/depay-web3-transaction) for more details)

```javascript
DePayWidgets.Payment({

  failed: (transaction)=> {
    // called when payment transaction failed on the blockchain
    // handled by the widget, no need to display anything
  }
})
```

#### critical

`critical`

A function that will be called if the widget throws an critical internal error that it can't handle and display on it's own:

```javascript
DePayWidgets.Payment({
  
  critical: (error)=> {
    // render and display the error with error.toString()
  }
})
```

#### error

`error`

A function that will be called if the widget throws an non-critical internal error that it can and will handle and display on it's own:

```javascript
DePayWidgets.Payment({

  error: (error)=> {
    // maybe do some internal tracking with error.toString()
    // no need to display anything as widget takes care of displaying the error
  }
})
```

#### providers

Allows to set providers to be used for making RPC calls to the individiual blockchains:

```javascript
DePayWidgets.Payment({

  providers: {
    ethereum: ['http://localhost:8545'],
    bsc: ['http://localhost:8545']
  }
})
```

#### currency

Allows you to enforce displayed local currency (instead of automatically detecting it):

```javascript

DePayWidgets.Payment({

  currency: 'USD'

})

```

#### whitelist

Allows only fromTokens (from the sender) that are part of the whitelist:

```javacript
DePayWidgets.Payment({
  
  whitelist: {
    ethereum: [
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // ETH
      '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
      '0x6b175474e89094c44da98b954eedeac495271d0f'  // DAI
    ],
    bsc: [
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // BNB
      '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
      '0x55d398326f99059ff775485246999027b3197955'  // BSC-USD
    ]
  }

})

```

#### event

`event`

If set to `ifSwapped`, emits a [payment event](https://github.com/depayfi/depay-evm-router#depayrouterv1paymentevent02) if payments are routed through [router smart contract](https://github.com/depayfi/depay-evm-router).
Payments are routed through the DePayPaymentRouter if swapping tokens is required in order to perform the payment. If payments are not routed through the router, e.g. direct transfer, no event is emited if `event` is set to `ifSwapped`.


```javascript
DePayWidgets.Payment({
  
  event: 'ifSwapped',
  
  accept: [
    { blockchain: 'ethereum', token: '0xdAC17F958D2ee523a2206206994597C13D831ec7', amount, receiver },
    { blockchain: 'ethereum', token: '0x6B175474E89094C44Da98b954EedeAC495271d0F', amount, receiver },
    { blockchain: 'ethereum', token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', amount, receiver },
    { blockchain: 'ethereum', token: '0x4Fabb145d64652a948d72533023f6E7A623C7C53', amount, receiver },
    { blockchain: 'bsc', token: '0x55d398326f99059fF775485246999027B3197955', amount, receiver },
    { blockchain: 'bsc', token: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', amount, receiver },
    { blockchain: 'bsc', token: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', amount, receiver },
    { blockchain: 'bsc', token: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', amount, receiver }
  ]
})
```

#### style

`style`

Allows you to change the style of the widget.

```javascript
DePayWidgets.Payment({
  style: {
    colors: {
      primary: '#ffd265',
      text: '#e1b64a',
      buttonText: '#000000',
      icons: '#ffd265'
    },
    fontFamily: '"Cardo", serif !important',
    css: `
      @import url("https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&display=swap");

      .ReactDialogBackground {
        background: rgba(0,0,0,0.8);
      }
    `
  }
})
```

##### colors

`colors`

Allows you to set color values:

```javascript
DePayWidgets.Payment({
  
  style: {
    colors: {
      primary: '#ffd265',
      text: '#ffd265',
      buttonText: '#000000',
      icons: '#ffd265'
    }
  }
})
```

##### fontFamily

`fontFamily`

Allows you to set the font-family:

```javascript
DePayWidgets.Payment({
  
  style: {
    fontFamily: '"Cardo", serif !important'
  }
})
```

##### css

`css`

Allows you to inject CSS:

```javascript
DePayWidgets.Payment({
  
  style: {
    css: `
      @import url("https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&display=swap");

      .ReactDialogBackground {
        background: rgba(0,0,0,0.8);
      }
    `
  }
})
```

## DePay Sales

DePay Sales allows you to sell tokens directly from your website or dApp with automatic any-to-any conversion.

### Preparation

In order to sell tokens in a decentralized way, that token needs to have a liquidity pool on a decentralized exchange:

- [Create Uniswap v2 Liquidity Pool](https://app.uniswap.org/#/add/v2/ETH)
- [Create Pancakeswap Liquidity Pool](https://pancakeswap.finance/add)

### Quick start

```
<script src="https://depay.fi/integrate/widgets/v2.js"/>
```

```javascript
DePayWidgets.Sale({
  amount: {
    start: 10,
    min: 1,
    step: 1
  },
  token: '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb',
  blockchains: ['ethereum']
);
```

### Configuration

You need to pass a configuration object to `DePayWidgets.Sale` which needs to at least contain `amount.start`, `amount.min`, `amount.step`, `token` and `blockchains`:

```javascript
DePayWidgets.Sale({
  amount: {
    start: 10,
    min: 1,
    step: 1
  },
  token: '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb',
  blockchains: ['ethereum']
);
```

You can also sell the same token on multiple blockchains:

```javascript
DePayWidgets.Sale({
  amount: {
    start: 10,
    min: 1,
    step: 1
  },
  token: '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb',
  blockchains: ['ethereum', 'bsc']
);
```

#### amount

The amount object contains the amount of preselected tokens when the widget opens (`start`),
the minimum amount of tokens the user can select in the widget (`min`) and
by which number the amount increments/decrements when changed by the user (`step`).

#### token

The address of the token you want to sell.

#### sent

`sent`

A function that will be called once the payment has been sent to the network (but still needs to be mined/confirmed).

The widget will call the `sent` callback-function passing a transaction as single argument (see: [depay-web3-transaction](http://github.com/depayfi/depay-web3-transaction) for more details)

```javascript
DePayWidgets.Sale({
  
  sent: (transaction)=> {
    // called when payment transaction has been sent to the network
  }
})
```

#### confirmed

`confirmed`

A function that will be called once the payment has been confirmed once by the network.

The widget will call the `confirmed` callback-function passing a transaction as single argument (see: [depay-web3-transaction](http://github.com/depayfi/depay-web3-transaction) for more details)

```javascript
DePayWidgets.Sale({

  confirmed: (transaction)=> {
    // called when payment transaction has been confirmed once by the network
  }
})
```

#### ensured

`ensured`

A function that will be called once the payment has been confirmed enough times to consider it's "ensured" (e.g. 12 confirmations on Ethereum).

The widget will call the `ensured` callback-function passing a transaction as single argument (see: [depay-web3-transaction](http://github.com/depayfi/depay-web3-transaction) for more details)

```javascript
DePayWidgets.Sale({

  ensured: (transaction)=> {
    // called when payment transaction has been confirmed X times by the network
  }
})
```

#### failed

`failed`

A function that will be called if the payment execution failed on the blockchain (after it has been sent/submitted).

The widget will call the `failed` callback-function passing a transaction as single argument (see: [depay-web3-transaction](http://github.com/depayfi/depay-web3-transaction) for more details)

```javascript
DePayWidgets.Sale({

  failed: (transaction)=> {
    // called when payment transaction failed on the blockchain
    // handled by the widget, no need to display anything
  }
})
```

#### critical

`critical`

A function that will be called if the widget throws an critical internal error that it can't handle and display on it's own:

```javascript
DePayWidgets.Sale({
  
  critical: (error)=> {
    // render and display the error with error.toString()
  }
})
```

#### error

`error`

A function that will be called if the widget throws an non-critical internal error that it can and will handle and display on it's own:

```javascript
DePayWidgets.Sale({
  
  error: (error)=> {
    // maybe do some internal tracking with error.toString()
    // no need to display anything as widget takes care of displaying the error
  }
})
```

#### providers

Allows to set providers to be used for making RPC calls to the individiual blockchains:

```javascript
DePayWidgets.Sale({

  providers: {
    ethereum: ['http://localhost:8545'],
    bsc: ['http://localhost:8545']
  }
})
```

#### currency

Allows you to enforce displayed local currency (instead of automatically detecting it):

```javascript

DePayWidgets.Sale({

  currency: 'USD'

})

```

#### style

`style`

Allows you to change the style of the widget.

```javascript
DePayWidgets.Sale({
  
  style: {
    colors: {
      primary: '#ffd265',
      text: '#e1b64a',
      buttonText: '#000000',
      icons: '#ffd265'
    },
    fontFamily: '"Cardo", serif !important',
    css: `
      @import url("https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&display=swap");

      .ReactDialogBackground {
        background: rgba(0,0,0,0.8);
      }
    `
  }
})
```

##### colors

`colors`

Allows you to set color values:

```javascript
DePayWidgets.Sale({
  
  style: {
    colors: {
      primary: '#ffd265',
      text: '#ffd265',
      buttonText: '#000000',
      icons: '#ffd265'
    }
  }
})
```

##### fontFamily

`fontFamily`

Allows you to set the font-family:

```javascript
DePayWidgets.Sale({
  
  style: {
    fontFamily: '"Cardo", serif !important'
  }
})
```

##### css

`css`

Allows you to inject CSS:

```javascript
DePayWidgets.Sale({
  
  style: {
    css: `
      @import url("https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&display=swap");

      .ReactDialogBackground {
        background: rgba(0,0,0,0.8);
      }
    `
  }
})
```

## Development

### Quick start

```
yarn install
yarn dev
```

### Testing

#### Debug Cypress

Starts cypress in `--headed` and `--no-exit`

```
test:cypress:debug
```

Test and debug single cypress file:

```
yarn test:cypress:debug --spec "cypress/integration/Payment/event.js"
```

### Release new versions to npm

```
npm login
npm publish
```
