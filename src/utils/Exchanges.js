import _ from 'lodash';
import UniswapExchange from '../exchanges/UniswapExchange';
import OpenSeaExchange from '../exchanges/OpenSeaExchange';
import MooniswapExchange from '../exchanges/MooniswapExchange';
import { ETH, SLIPPAGE } from '../utils/Constants';
import { ethers } from 'ethers';

class Exchanges {
  static all = [
    // MooniswapExchange,
    UniswapExchange,
    OpenSeaExchange,
  ]

  static findByName(name) {
    return Exchanges.all.find(function(exchange){
      return exchange.name() === name;
    });
  }

  static routesWithMaxAmounts(routes) {
    return new Promise(function(resolve, reject){
      Promise.all(routes.map(function(route){
        return Exchanges.findByName(route.exchange).findMaxAmount(route);
      })).then(function(maxAmounts){
        resolve(
          routes.map(function(route, index){
            var maxAmountIncludingSlippage = maxAmounts[index];
            var maxAmountExcludingSlippage = ethers.BigNumber.from(maxAmountIncludingSlippage).sub(ethers.BigNumber.from(maxAmountIncludingSlippage).div("100").mul(SLIPPAGE.toString())).toString();
            // slippage gets added later again, so maxAmount need to exclude slippage
            return Object.assign({}, route, {
              maxAmount: maxAmountExcludingSlippage
            })
          })
        )
      });
    });
  }

  static amountsWithOrWithoutSlippage(endTokenAddress, route, amounts) {
    if(amounts[Object.keys(amounts)[0]] == undefined || amounts[Object.keys(amounts)[0]] == null) {
      // No amounts as there is not route
      return amounts;
    } else if(endTokenAddress.toLowerCase() === route.token.address.toLowerCase()) {
      // direct transfer requries no slippage nor a conversion (input = output)
      let amountsWithoutSlippage = amounts[Object.keys(amounts)[0]].slice(0); // create a copy
      amountsWithoutSlippage[0] = amountsWithoutSlippage[amountsWithoutSlippage.length-1];
      amounts[Object.keys(amounts)[0]] = amountsWithoutSlippage;
      return amounts;
    } else {
      // swap requires to add slippage
      let amountsWithSlippage = amounts[Object.keys(amounts)[0]].slice(0); // create a copy
      for (var i = 0; i < amountsWithSlippage.length-1; i++) {
        amountsWithSlippage[i] = ethers.BigNumber.from(amountsWithSlippage[i]).div("100").mul(SLIPPAGE.toString()).add(amountsWithSlippage[i]).toString();
      }
      amounts[Object.keys(amounts)[0]] = amountsWithSlippage;
      return amounts;
    }
  }

  static findBestRoutesAndRequiredAmountsForEndToken(routes, endTokenAddress, endTokenAmount){
    return new Promise(function(resolve, reject){
      Exchanges.findRoutes(endTokenAddress)
        .then(function(exchangesWithIntermediateRoute){
          Promise.all(routes.map(function(route){
            if(
              (route.token.address === ETH) &&
              (endTokenAddress === ETH)
            ) {
              return Promise.resolve({ all: [endTokenAmount] });
            } else {
              return Exchanges.findAmountsForRoutePerExchange(
                Object.keys(exchangesWithIntermediateRoute),
                [route.token.address].concat(Object.values(exchangesWithIntermediateRoute)[0]),
                endTokenAmount
              )
            }
          })).then(function(amountsForRoutesPerExchange){
            resolve(
              routes.map(function(route, index){
                return Object.assign(
                  {},
                  route,
                  { route: _.uniq([route.token.address].concat(Object.values(exchangesWithIntermediateRoute)[0])) },
                  { amounts: this.amountsWithOrWithoutSlippage(endTokenAddress, route, amountsForRoutesPerExchange[index]) });
              }.bind(this)).filter(function(route){
                return Boolean(
                  _.every(Object.values(route.amounts), function(values){
                    return values !== null && 
                      _.every(values, function(value){
                        return ethers.BigNumber.from(value).gt(0);
                      })
                  })
                )
              }).map(function(route){
                return Exchanges.selectBestExchangeRoute(route);
              })
            )
          }.bind(this))
        }.bind(this));
    }.bind(this));
  }

  static selectBestExchangeRoute(route) {
    let bestExchangeRoute = _.map(route.amounts, function(amounts, exchangeName){
      return({
        exchange: exchangeName, 
        amounts: amounts
      });
    }.bind(this)).sort(function(a, b){
      if (ethers.BigNumber.from(a.amounts[0]).gt(ethers.BigNumber.from(b.amounts[0]))) {
        return 1; // b wins
      }
      if (ethers.BigNumber.from(b.amounts[0]).gt(ethers.BigNumber.from(a.amounts[0]))) {
        return -1; // a wins
      }
      return 0; // equal
    })[0];

    return Object.assign(
      {},
      route,
      { exchange: bestExchangeRoute.exchange },
      { amounts: bestExchangeRoute.amounts }
    )
  }

  static findAmountsForRoutePerExchange(exchangeNames, route, endTokenAmount) {
    let findAmountsForRoutePerExchange = {};
    return new Promise(function(resolve, reject){
      Promise.all(exchangeNames.map(function(exchangeName){
        if(route[0] === ETH) { route = route.slice(1,3); }
        if(route[route.length-1] === ETH) { route = [route[0], route[route.length-1]] }
        return Exchanges.findByName(exchangeName).findAmounts(route, endTokenAmount);
      })).then(function(amounts){
        exchangeNames.forEach(function(exchangeName, index){
          findAmountsForRoutePerExchange[exchangeName] = amounts[index];
        })
        resolve(findAmountsForRoutePerExchange);
      });
    });
  }

  static findRoutes(tokenAddress) {
    let routesPerExchange = {};
    return new Promise(function(resolve, reject){
      if(tokenAddress === 'ETH') {
        Exchanges.all.map(function(exchange){
          routesPerExchange[exchange.name()] = [ETH];
        });
        resolve(routesPerExchange);
      } else {
        Promise.all(Exchanges.all.map(function(exchange){
          return exchange.findLiquidity(ETH, tokenAddress).then(function(liquidity){
            if(liquidity === null || !Boolean(_.find(liquidity, function(liquidity){ return liquidity.gt(0) }))) {
              return null;
            } else {
              let exchangeWithLiquidity = {};
              exchangeWithLiquidity[exchange.name()] = liquidity;
              return exchangeWithLiquidity;
            }
          })
        })).then(function(exchangesWithLiquidity){
          exchangesWithLiquidity.forEach(function(exchangeWithLiquidity){
            if(exchangeWithLiquidity) {
              routesPerExchange[Object.keys(exchangeWithLiquidity)[0]] = [ETH, tokenAddress];
            }
          })
          resolve(routesPerExchange);
        })
      }
    });
  }

  static findBestRouteFromTo(from, fromAmount, to) {
    return new Promise(function(resolve, reject){
      Promise.all(Exchanges.all.map(function(exchange){
        return exchange.amountsFromTo(from, fromAmount, to)
      })).then(function(amountsPerExchange){
        let bestAmounts = _.sortBy(amountsPerExchange, function(amounts){ return _.last(amounts) })[0];
        resolve({
          path: [from, to],
          amounts: bestAmounts,
          exchange: Exchanges.all[amountsPerExchange.indexOf(bestAmounts)].name()
        });
      })
    })
  }

  static findBestRouteToFrom(to, toAmount, from) {
    return Promise.all(Exchanges.all.map(function(exchange){
      return exchange.amountsToFrom(to, toAmount, from)
    })).then(function(amountsPerExchange){
      console.log('amountsPerExchange', amountsPerExchange)
    })
  }
}

export default Exchanges;
