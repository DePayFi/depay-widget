import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { wallets, getWallets } from '@depay/web3-wallets';
import copy from '@uiw/copy-to-clipboard';
import { NavigateStackContext, ReactDialogStack } from '@depay/react-dialog-stack';
import QRCodeStyling from 'qr-code-styling';
import Blockchains from '@depay/web3-blockchains';
import Fuse from 'fuse.js';
import { useVirtualizer } from '@tanstack/react-virtual';
import ReactDOM from 'react-dom';
import { ReactShadowDOM } from '@depay/react-shadow-dom';
import { Currency } from '@depay/local-currency';
import { setProviderEndpoints, request } from '@depay/web3-client';
import { route } from '@depay/web3-payments';
import { ethers } from 'ethers';
import { Decimal } from 'decimal.js';
import { route as route$1 } from '@depay/web3-exchanges';
import { Token } from '@depay/web3-tokens';
import { TokenImage } from '@depay/react-token-image';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime_1 = createCommonjsModule(function (module) {
var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

var regenerator = runtime_1;

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var ClosableContext = /*#__PURE__*/React.createContext();

var UpdatableContext = /*#__PURE__*/React.createContext();

var ClosableProvider = (function (props) {
  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      closable = _useState2[0],
      setClosable = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      open = _useState4[0],
      setOpen = _useState4[1];

  var _useContext = useContext(UpdatableContext),
      setUpdatable = _useContext.setUpdatable;

  var close = function close() {
    if (props.closable === false) {
      return;
    }

    if (!closable) {
      return;
    }

    setUpdatable(false);
    setOpen(false);
    setTimeout(props.unmount, 300);
  };

  useEffect(function () {
    var preventReload = function preventReload(event) {
      if (!closable || props.closable === false) {
        var msg = 'Payment is still pending. Please wait!';
        event.preventDefault();
        event.returnValue = msg;
        return msg;
      }
    };

    window.addEventListener('beforeunload', preventReload);
    return function () {
      window.removeEventListener('beforeunload', preventReload);
    };
  }, [closable, props.closable]);
  return /*#__PURE__*/React.createElement(ClosableContext.Provider, {
    value: {
      closable: closable,
      setClosable: setClosable,
      close: close,
      open: open,
      setOpen: setOpen
    }
  }, props.children);
});

var allWallets = [{
  "name": "Coinbase",
  "extension": "Coinbase",
  "link": "WalletLink",
  "mobile": {
    "ios": {
      "native": "cbwallet://dapp",
      "universal": "https://go.cb-w.com/dapp"
    },
    "android": {
      "native": "cbwallet://dapp",
      "universal": "https://go.cb-w.com/dapp"
    }
  },
  "logo": wallets.Coinbase.info.logo
}, {
  "name": "MetaMask",
  "extension": "MetaMask",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "metamask:",
      "encoded": false,
      "universal": "https://metamask.app.link"
    },
    "android": {
      "native": "metamask:",
      "encoded": false,
      "universal": "https://metamask.app.link"
    }
  },
  "logo": wallets.MetaMask.info.logo
}, {
  "name": "Trust Wallet",
  "extension": "Trust",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "trust:",
      "universal": "https://link.trustwallet.com"
    },
    "android": {
      "native": "trust:",
      "universal": "https://link.trustwallet.com"
    }
  },
  "logo": wallets.Trust.info.logo
}, {
  "name": "Phantom",
  "extension": "Phantom",
  "logo": wallets.Phantom.info.logo
}, {
  "name": "Binance Wallet",
  "extension": "Binance",
  "link": "WalletConnectV1",
  "logo": wallets.Binance.info.logo
}, {
  "name": "Crypto.com | DeFi Wallet",
  "extension": "CryptoCom",
  "link": "WalletConnectV1",
  "desktop": {
    "native": "cryptowallet:"
  },
  "mobile": {
    "ios": {
      "native": "cryptowallet:",
      "universal": "https://wallet.crypto.com"
    },
    "android": {
      "native": "wc:",
      "universal": "https://wallet.crypto.com"
    }
  },
  "logo": wallets.CryptoCom.info.logo
}, {
  "name": "Coin98",
  "extension": "Coin98",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "coin98:",
      "universal": "https://coin98.com"
    },
    "android": {
      "native": "coin98:",
      "universal": "https://coin98.com"
    }
  },
  "logo": wallets.Coin98.info.logo
}, {
  "name": "Brave",
  "extension": "Brave",
  "logo": wallets.Brave.info.logo
}, {
  "name": "Rainbow",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://rnbwapp.com"
    },
    "android": {
      "native": "rainbow:",
      "universal": "https://rnbwapp.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/7a33d7f1-3d12-4b5c-f3ee-5cd83cb1b500?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Uniswap Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://uniswap.org/app"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/bff9cf1f-df19-42ce-f62a-87f04df13c00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Safe",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "gnosissafe:",
      "universal": "https://gnosis-safe.io/"
    },
    "android": {
      "native": "gnosissafe:",
      "universal": "https://gnosis-safe.io/"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/a1cb2777-f8f9-49b0-53fd-443d20ee0b00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Rabby",
  "extension": "Rabby",
  "link": "WalletConnectV1",
  "logo": wallets.Rabby.info.logo
}, {
  "name": "Backpack",
  "extension": "Backpack",
  "logo": wallets.Backpack.info.logo
}, {
  "name": "Glow",
  "extension": "Glow",
  "logo": wallets.Glow.info.logo
}, {
  "name": "Solflare",
  "extension": "Solflare",
  "logo": wallets.Solflare.info.logo
}, {
  "name": "imToken",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "imtokenv2:"
    },
    "android": {
      "native": "imtokenv2:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/1991f85d-43d4-4165-3502-cd6ef8312b00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "MEW wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://mewwallet.com"
    },
    "android": {
      "universal": "https://mewwallet.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/e2024511-2c9b-46d7-3111-52df3d241700?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "ONTO",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "ontoprovider:"
    },
    "android": {
      "native": "ontoprovider:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/d22b2a4b-5562-49ba-506b-6d5986914600?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Zerion",
  "link": "WalletConnectV1",
  "desktop": {
    "native": "zerion://"
  },
  "mobile": {
    "ios": {
      "native": "zerion://",
      "universal": "https://wallet.zerion.io"
    },
    "android": {
      "native": "zerion://",
      "universal": "https://wallet.zerion.io"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/f216b371-96cf-409a-9d88-296392b85800?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Spot",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "spot://",
      "universal": "https://spot.so"
    },
    "android": {
      "native": "spot://",
      "universal": "https://spot.so"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/1bf33a89-b049-4a1c-d1f6-4dd7419ee400?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "BitKeep",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "bitkeep://",
      "universal": "https://bkapp.vip"
    },
    "android": {
      "native": "bitkeep://",
      "universal": "https://bkapp.vip"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/3f7075d0-4ab7-4db5-404d-3e4c05e6fe00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Unstoppable Domains",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://unstoppabledomains.com/mobile"
    },
    "android": {
      "universal": "https://unstoppabledomains.com/mobile"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/4725dda0-4471-4d0f-7adf-6bbe8b929c00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Omni",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "omni",
      "universal": "https://links.omni.app"
    },
    "android": {
      "native": "omni",
      "universal": "https://links.omni.app"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/2cd67b4c-282b-4809-e7c0-a88cd5116f00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "KEYRING PRO",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "keyring:",
      "universal": "https://keyring.app"
    },
    "android": {
      "native": "keyring:",
      "universal": "https://keyring.app"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/dda0f0fb-34e8-4a57-dcea-b008e7d1ff00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "TokenPocket",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "tpoutside:"
    },
    "android": {
      "native": "tpoutside:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/f3119826-4ef5-4d31-4789-d4ae5c18e400?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "BitPay",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "bitpay:",
      "universal": "https://link.bitpay.com/wallet"
    },
    "android": {
      "native": "bitpay:",
      "universal": "https://link.bitpay.com/wallet"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/97d4429f-eaf0-4302-87f5-9d26d46fe700?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "MathWallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "mathwallet:",
      "universal": "https://www.mathwallet.org"
    },
    "android": {
      "native": "mathwallet:",
      "universal": "https://www.mathwallet.org"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/26a8f588-3231-4411-60ce-5bb6b805a700?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "WallETH",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/8b59dafd-9150-46be-9793-34e6d3298100?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Ledger Live",
  "link": "WalletConnectV1",
  "desktop": {
    "native": "ledgerlive:"
  },
  "mobile": {
    "ios": {
      "native": "ledgerlive:"
    },
    "android": {
      "native": "ledgerlive:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/a7f416de-aa03-4c5e-3280-ab49269aef00?projectId=ec576959c7769a8b4dbbb3da3f12fef4",
  "connectionLink": true
}, {
  "name": "Authereum",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/deb6ec25-fcec-4b1b-c536-df3b4fb92b00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "1inch Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "1inch:",
      "universal": "https://wallet.1inch.io"
    },
    "android": {
      "native": "1inch:",
      "universal": "https://wallet.1inch.io"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/dce1ee99-403f-44a9-9f94-20de30616500?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "iToken Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "huobiwallet:"
    },
    "android": {
      "native": "huobiwallet:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/5cd60c34-038d-470c-c024-d58f64260200?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Eidoo",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "eidoo:",
      "universal": "https://eidoo.io/crypto-wallet"
    },
    "android": {
      "native": "eidoo:",
      "universal": "https://eidoo.io/crypto-wallet"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/ef5b8bcf-00d5-457d-e161-9911e4788700?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "TrustVault",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/fc5e0354-cc1e-490d-fb62-477e83148000?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Atomic",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/adb1ed3f-722c-48a0-441f-c75038a9a300?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "CoolWallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "coolwallet:"
    },
    "android": {
      "native": "coolwallet:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/f581365d-e844-4d21-8e35-44a755a32d00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Unstoppable Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "moneyunstoppable:",
      "universal": "https://unstoppable.money"
    },
    "android": {
      "native": "moneyunstoppable:",
      "universal": "https://unstoppable.money"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/5c38b22c-adb9-4899-3252-6e3d71458500?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Alice",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/bd1ce165-9b3a-4925-73c1-b329ca13e900?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "AlphaWallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "awallet:",
      "universal": "https://aw.app"
    },
    "android": {
      "native": "awallet:",
      "universal": "https://aw.app"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/5b1cddfb-056e-4e78-029a-54de5d70c500?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Pillar",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "pillarwallet:"
    },
    "android": {
      "native": "pillarwallet:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/0eb8230d-ce4c-42fb-2a57-a84a6eb7ea00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "D'CENT Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "dcent:",
      "universal": "https://link.dcentwallet.com"
    },
    "android": {
      "native": "dcent:",
      "universal": "https://link.dcentwallet.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/1efb49ec-2bab-4fa1-f2f2-4392c64ed000?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "ZelCore",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "zel:",
      "universal": "https://link.zel.network"
    },
    "android": {
      "native": "zel:",
      "universal": "https://link.zel.network"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/97d45a92-a1f0-46da-95a6-ad5db99f3500?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Nash",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "nash:",
      "universal": "https://nash.io/walletconnect"
    },
    "android": {
      "native": "nash:",
      "universal": "https://nash.io/walletconnect"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/12f981b1-bb0a-4115-009f-317255979600?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Coinomi",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://coinomi.page.link"
    },
    "android": {
      "universal": "https://coinomi.page.link"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/3b446d16-a908-40c8-5835-9a6efe90dd00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "GridPlus",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/3c928cbd-39dc-4090-c372-d4dcb3c89500?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "CYBAVO Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "cybavowallet:",
      "universal": "https://cdn.cybavo.com"
    },
    "android": {
      "native": "cybavowallet:",
      "universal": "https://cdn.cybavo.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/3117d3ce-b973-4cfd-8fb5-f5d72ed3c200?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Tokenary",
  "link": "WalletConnectV1",
  "desktop": {
    "native": "tokenary:",
    "universal": "https://tokenary.io"
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/5e481041-dc3c-4a81-373a-76bbde91b800?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Torus",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/47d03b65-6be7-4004-5dba-7dadef6e6000?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Spatium",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://caspiantechnologies.bitbucket.io"
    },
    "android": {
      "universal": "https://caspiantechnologies.bitbucket.io"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/e85caf96-8e6c-4ac5-5bb3-c13ac7edc700?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "SafePal",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://link.safepal.io"
    },
    "android": {
      "universal": "https://link.safepal.io"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/14096232-7483-425b-f9a9-658f94fe7100?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Infinito",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/b07624f3-fb36-45a4-200c-6cb2a930ef00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "wallet.io",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/82cdf116-4355-4e07-88e4-63dc2e253500?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Infinity Wallet",
  "link": "WalletConnectV1",
  "desktop": {
    "native": "infinity:",
    "universal": "https://infinitywallet.io/"
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/9f259366-0bcd-4817-0af9-f78773e41900?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Ownbit",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/83b291fa-1a08-4871-3ddb-8faa8be6f200?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Bridge Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "bridgewallet:",
      "universal": "https://bridge.mtpelerin.com"
    },
    "android": {
      "native": "bridgewallet:",
      "universal": "https://bridge.mtpelerin.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/989d504f-93db-4ca6-c00a-9d1faf177d00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "SparkPoint",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "sparkpoint:",
      "universal": "https://sparkpoint.io"
    },
    "android": {
      "native": "sparkpoint:",
      "universal": "https://sparkpoint.io"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/34c4f901-70de-4507-e7a0-bc7887843000?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "ViaWallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/ffc3ba49-2e6b-4baa-304d-ebb253f74700?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Vision",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/c279537a-920d-422c-6a65-8b3bd524c300?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "PEAKDEFI Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "peakdefiwallet:",
      "universal": "https://peakdefi.com/download"
    },
    "android": {
      "native": "peakdefiwallet:",
      "universal": "https://peakdefi.com/download"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/744a3fbe-4261-4148-133e-49c5b58cb400?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Dok Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/6886f45d-1451-41ec-ebc7-b18bebfc3c00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "AT.Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/a5b7369b-d92c-41a4-0263-ca28f4597600?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Midas Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/4b7268e6-47fb-46bc-6f3c-424f44695f00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Ellipal",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "ellipal:",
      "universal": "https://www.ellipal.com/"
    },
    "android": {
      "native": "ellipal:",
      "universal": "https://www.ellipal.com/"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/0a805e10-bfc0-4d02-d9c1-8cec88f0dc00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Aktionariat",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "aktionariat:",
      "universal": "https://app.aktionariat.com"
    },
    "android": {
      "native": "aktionariat:",
      "universal": "https://app.aktionariat.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/6d18e8ea-b536-4038-c5bf-94a499d5a400?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Talken Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "talken-wallet:",
      "universal": "https://talken.io"
    },
    "android": {
      "native": "talken-wallet:",
      "universal": "https://talken.io"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/1afb5a3a-2da3-40ce-baf9-b416e7510600?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "XinFin XDC Network",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/bee71890-cdbe-4a9a-0d51-6cc75078f600?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "KyberSwap",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "kyberswap:",
      "universal": "https://kyberswapnew.app.link"
    },
    "android": {
      "native": "kyberswap:",
      "universal": "https://kyberswapnew.app.link"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/3abd1720-260e-495a-2e31-3d0b349e0d00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Tongue Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "tongue:",
      "universal": "https://www.tongue.fi"
    },
    "android": {
      "native": "tongue:",
      "universal": "https://www.tongue.fi"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/20bc4fdb-b9e6-429a-8cba-c233b3273000?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "RWallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "rwallet:",
      "universal": "https://www.rwallet.app"
    },
    "android": {
      "native": "rwallet:",
      "universal": "https://www.rwallet.app"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/a883229c-26cb-4c19-9b34-1f0ed4012a00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "PlasmaPay",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "plasmapay:",
      "universal": "https://plasmapay.com/"
    },
    "android": {
      "native": "plasmapay:",
      "universal": "https://plasmapay.com/"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/466c8fd0-fcec-4621-b94f-e91ce1439f00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "O3Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "o3wallet:",
      "universal": "https://o3.network"
    },
    "android": {
      "native": "o3wallet:",
      "universal": "https://o3.network"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/e1c7c6af-c731-463e-55f0-5e686e9f6200?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "HashKey Me",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "hashme:",
      "universal": "https://me.hashkey.com"
    },
    "android": {
      "native": "hashme:",
      "universal": "https://me.hashkey.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/72734fac-9500-4c2c-81ba-678f7fc32700?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Jade Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/8a6f6b6f-9e25-43d2-6cb8-42013579bd00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Guarda Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/0142b5f2-2006-465f-fe0e-2021225d8c00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Defiant",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "defiantapp:",
      "universal": "https://defiantapp.tech"
    },
    "android": {
      "native": "defiantapp:",
      "universal": "https://defiantapp.tech"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/026462e7-09a3-47f6-6b46-49df18133b00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Trustee Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/2432f3c2-83f1-486b-6081-d03acc33e000?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "CoinUs",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/1f92f9f9-08b9-4eca-4d75-425ce3d50100?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "cmorq",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/4e9f4558-32a2-46c9-be37-4926a6e95100?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Valora",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "celo://wallet",
      "universal": "https://valoraapp.com"
    },
    "android": {
      "native": "celo://wallet",
      "universal": "https://valoraapp.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/a03bfa44-ce98-4883-9b2a-75e2b68f5700?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "QuiverX",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/67acf8ad-da61-4b7f-609b-57224fb8b100?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Celo Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "celowallet:"
    },
    "android": {
      "native": "celowallet:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/482c9981-61c0-4782-84ec-c80fd997da00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Elastos Essentials",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "essentials:",
      "universal": "https://essentials.elastos.net"
    },
    "android": {
      "native": "essentials:",
      "universal": "https://essentials.elastos.net"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/04a6bfed-d80e-4f7b-0516-261f86aa4000?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "fuse.cash",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "fuse.cash:",
      "universal": "https://app.fuse.cash/"
    },
    "android": {
      "native": "fuse.cash:",
      "universal": "https://app.fuse.cash/"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/71828267-72d6-4680-e144-265e6dc1e400?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Stasis",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "stasis:",
      "universal": "https://app.stasis.net"
    },
    "android": {
      "native": "stasis:",
      "universal": "https://app.stasis.net"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/7ae753bc-a754-450c-2d90-2c5521734400?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "JulWallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "julwallet:",
      "universal": "https://justliquidity.org"
    },
    "android": {
      "native": "julwallet:",
      "universal": "https://justliquidity.org"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/cabd50de-22fa-487b-ce68-2c63de8bb800?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "f(x) Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/4d5c5c70-5abb-43ba-fc5e-577b6e403300?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Bull App",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/b3c42bfd-5078-4616-a2ad-e4e322bbf600?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Anybit",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/6aac5fb1-d400-4e81-4709-bef8b2c00900?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Bitpie",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "bitpie:"
    },
    "android": {
      "native": "bitpie:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/f9b7c668-ed26-47f7-d8c9-7eadc7114800?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Minerva Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/7d5f3710-7c2c-49fc-7893-bacd3f384000?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "ArchiPage",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "archipage:"
    },
    "android": {
      "native": "archipage:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/b62c4f22-e781-4ca9-5c01-ef7cd9d23400?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Tangem",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "tangem:",
      "universal": "https://app.tangem.com"
    },
    "android": {
      "native": "tangem:",
      "universal": "https://app.tangem.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/8a5b6e94-e378-458d-bf2e-017cc7958e00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Chainge Finance",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/addaaf64-cf13-46ef-a022-d97189156f00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "ioPay",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "iopay:"
    },
    "android": {
      "native": "iopay:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/aa40d575-f7f4-4aa6-12c4-c8f055ad0800?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Coinhub",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/cd7d6974-739b-46d7-bd10-604222e16e00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Go Pocket",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/2494a686-3e07-4e9b-15ef-3605dca32a00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Wallet 3",
  "link": "WalletConnectV1",
  "desktop": {
    "native": "wallet3:"
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/d740b48c-2b55-4a27-b5f5-d2188200ca00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "yiToken",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "yitoken:"
    },
    "android": {
      "native": "yitoken:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/b5cc13d4-2a58-4142-08dd-5596ab253800?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "DID Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "abt:"
    },
    "android": {
      "native": "abt:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/673b7f3b-a555-4327-f9b7-fefa535bc500?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "StarBase",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/2bd78dfd-37d9-4334-8afb-17544b85f200?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Shinobi Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/f5cf868c-5347-4d5e-e80f-c6ece8fcb600?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "AirGap Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "airgap-wallet://"
    },
    "android": {
      "native": "airgap-wallet://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/76bfe8cd-cf3f-4341-c33c-60da01065000?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "PayTube",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/58230f60-6c7b-400c-ab96-cb1fd0391700?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "SecuX",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "secux://",
      "universal": "https://wsweb.secuxtech.com"
    },
    "android": {
      "native": "secux://",
      "universal": "https://wsweb.secuxtech.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/w3m/v1/getWalletImage/6013a9a1-4a67-45bb-fc24-27c11eb13900?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "BlockBank",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/5b2cc39f-bc4f-4ac1-b6d7-08bcc9066a00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Orange",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "orangewallet:",
      "universal": "https://link.orangewallet.app"
    },
    "android": {
      "native": "orangewallet:",
      "universal": "https://link.orangewallet.app"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/7fcbf9f0-0c0b-439d-3fdb-31b32c28df00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "NEFTiPEDiA",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/3f503c40-d5f0-4430-b996-3126a9968c00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Krystal",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "krystalWallet:"
    },
    "android": {
      "native": "krystalWallet:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/91449cb2-57b0-4bb6-481b-47d489f7a800?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Ambire Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "ambire:",
      "universal": "https://mobile.ambire.com"
    },
    "android": {
      "native": "ambire:",
      "universal": "https://mobile.ambire.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/c39b3a16-1a38-4588-f089-cb7aeb584700?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "PayBolt",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "paybolt://Wallet"
    },
    "android": {
      "native": "paybolt://Wallet"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/cc8f4e0c-56a8-465a-6cb6-3e9d60846500?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "OKX Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "okex://main"
    },
    "android": {
      "native": "okex://main"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/45f2f08e-fc0c-4d62-3e63-404e72170500?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Backpack",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "ndj-backpack:",
      "universal": "https://jxndao.com"
    },
    "android": {
      "native": "ndj-backpack:",
      "universal": "https://jxndao.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/e46f132d-6e05-4d51-8720-43727446e600?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Mask Network",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/51fa27fd-8a21-4de0-c084-528e4a37ad00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Uniblow",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/3aa86daa-b885-4686-c443-83355e1b3b00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Autonomy: Digital Art Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "autonomy-wc",
      "universal": "https://autonomy.io/apps/wc"
    },
    "android": {
      "native": "autonomy-wc",
      "universal": "https://autonomy.io/apps/wc"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/2ee7c9db-9a86-4cd6-0d32-5053b4636100?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Lilico",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "lilico://",
      "universal": "https://link.lilico.app/wc"
    },
    "android": {
      "native": "lilico://",
      "universal": "https://link.lilico.app/wc"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/70c0bc88-7bb1-4c1f-3531-9a5f799fb100?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Fireblocks",
  "link": "WalletConnectV1",
  "desktop": {
    "universal": "https://console.fireblocks.io/v2"
  },
  "mobile": {
    "ios": {
      "native": "fireblocks-wc://"
    },
    "android": {
      "native": "fireblocks-wc://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/7e1514ba-932d-415d-1bdb-bccb6c2cbc00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "WATT ME",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "wattwallet://wallet-connect/"
    },
    "android": {
      "native": "wattwallet://wallet-connect/"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/38c619c4-5365-4de5-09b2-cdde8caf3600?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Coingrig",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "coingrig://",
      "universal": "https://link.coingrig.com"
    },
    "android": {
      "native": "coingrig://",
      "universal": "https://link.coingrig.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/18e38e41-a387-4402-ca31-6d2d5eb91100?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Cryptnox Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/2947b7c8-8966-4485-a98d-25fe43c16700?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "bobablocks",
  "link": "WalletConnectV1",
  "desktop": {
    "native": "bobablocks://"
  },
  "mobile": {
    "ios": {
      "native": "bobablocks://",
      "universal": "https://app.bobablocks.io"
    },
    "android": {
      "native": "bobablocks://",
      "universal": "https://app.bobablocks.io"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/aff8973b-e093-45b5-4858-c01dd043bc00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Plasma Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "plasmawallet:",
      "universal": "https://plasma-wallet.com"
    },
    "android": {
      "native": "plasmawallet:",
      "universal": "https://plasma-wallet.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/c268e78d-ffb0-4c8b-5cad-04c3add48500?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Holdstation Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/27553327-b647-4bfb-8524-b7558e804400?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "FirstWallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/864565a8-66ab-4b50-fda6-1c29128f6b00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "HUMBL WALLET",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "humblwallet:",
      "universal": "https://wallet.search3.com"
    },
    "android": {
      "native": "humblwallet:",
      "universal": "https://wallet.search3.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/1ac55ba2-aa98-4ed0-59b3-b3155dea4200?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Zelus",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "zeluswallet://"
    },
    "android": {
      "native": "zeluswallet://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/aeba2105-6c84-4642-f441-b3f5817ac400?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Earth Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "earthwallet:"
    },
    "android": {
      "native": "earthwallet:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/d3f724c4-f99b-476f-10f8-12aa4af13800?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Boba Multisig",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/5acb31bf-151e-4ae6-02bd-f109ca47b600?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "EASY",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "co.theeasy.app://",
      "universal": "https://link.easy.me"
    },
    "android": {
      "native": "co.theeasy.app://",
      "universal": "https://link.easy.me"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/62feb41a-be1f-4b1c-e089-27f97c0e8d00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "ISLAMIwallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "poc://islamiwallet.com",
      "universal": "https://islamiwallet.com"
    },
    "android": {
      "native": "poc://islamiwallet.com",
      "universal": "https://islamiwallet.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/8d723c78-28ad-4610-901f-ea391d7e8d00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Card Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "cardwallet://",
      "universal": "https://wallet.cardstack.com"
    },
    "android": {
      "native": "cardwallet://",
      "universal": "https://wallet.cardstack.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/325428cf-c212-4d83-a434-7f48902d2c00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "GameStop Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/c12536e0-dff1-4a1a-6c8f-c7247d6aa200?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "RealT Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/bf1f251b-08a5-4b27-ae4a-201a5f698900?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "PLTwallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "pltwallet:",
      "universal": "https://pltwallet.io/"
    },
    "android": {
      "native": "pltwallet:",
      "universal": "https://pltwallet.io/"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/a5d9dd15-8cef-42de-8bed-09e01a8b0200?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Avacus",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "avacus://",
      "universal": "https://avacus.app.link"
    },
    "android": {
      "native": "avacus://",
      "universal": "https://avacus.app.link"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/a7106965-91cc-4a73-4688-c5c72ae0ed00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "StrikeX Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "strikex://"
    },
    "android": {
      "native": "strikex://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/cae46de2-b432-4002-8bc8-1f0e7380b200?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "BCERTin wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/e321346d-5ce7-4e75-371e-e4f0bf923900?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Bycoin",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/980b0c5f-353d-4643-1ee8-d9264ec30000?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Edge Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "edge://",
      "universal": "https://deep.edge.app/wc"
    },
    "android": {
      "native": "edge://",
      "universal": "https://deep.edge.app/wc"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/f601bc29-4298-422f-dbf7-34dac2884f00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Freedom Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "freedom-wallet://"
    },
    "android": {
      "native": "freedom-wallet://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/42a6f275-96c8-4cd0-9b7a-acc5f054a800?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Assure",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "assure://",
      "universal": "https://www.assure.pro/Official"
    },
    "android": {
      "native": "assure://",
      "universal": "https://www.assure.pro/Official"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/64db7104-c8b7-44ea-e102-11ce87124200?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Cosmostation",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "cosmostation://"
    },
    "android": {
      "native": "cosmostation://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/ea26c3c8-adb6-4dc4-ee02-35d6eee02800?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "THORWallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "thorwallet:"
    },
    "android": {
      "native": "thorwallet:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/19a02756-462c-4e8a-2d32-af0f9bcf3d00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "DeFi Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/017d9dc4-dd04-4934-5be8-1d564e924a00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Gryfyn",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/51bb1507-45a1-4d21-15f2-1cc2ebe69400?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "CoinStats",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "coinstats:",
      "universal": "https://coinstats.app"
    },
    "android": {
      "native": "coinstats:",
      "universal": "https://coinstats.app"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/f989ab84-650b-4ad5-c342-77f3334f1b00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Abra Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "abra:"
    },
    "android": {
      "native": "abra:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/2219db01-e0c9-471c-5def-fd3b4e7a7a00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Opera Crypto Browser",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "cryptobrowser://"
    },
    "android": {
      "native": "cryptobrowser://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/877fa1a4-304d-4d45-ca8e-f76d1a556f00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Pera Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "algorand://"
    },
    "android": {
      "native": "algorand://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/d4a1258e-d154-4885-0489-856c33e91e00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Keywallet Touch",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "keywalletTouch://"
    },
    "android": {
      "native": "keywalletTouch://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/ceefb75b-2632-40c6-7471-ea23d3d49800?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Enno Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "ennowallet:"
    },
    "android": {
      "native": "ennowallet:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/ae4f5167-0b61-43bd-7d76-1f8579271000?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "SoCap Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/99c0152b-1001-4f24-3293-a9125374f900?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Talk+",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "talkapp:"
    },
    "android": {
      "native": "talkapp:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/d24cdd56-6f55-42da-631b-c25974c36f00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "A4 Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/7a788c03-daf7-4d93-fa3a-f94e2b719900?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Bitcoin.com Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "bitcoincom://",
      "universal": "https://wallet.bitcoin.com/"
    },
    "android": {
      "native": "bitcoincom://",
      "universal": "https://wallet.bitcoin.com/"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/0d7938e1-9b3b-4d8b-177b-98188c4cf400?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Defiant",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "defiantapp://",
      "universal": "https://defiantapp.tech/"
    },
    "android": {
      "native": "defiantapp://",
      "universal": "https://defiantapp.tech/"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/11a96ca4-3592-42ae-c781-2b7265ec9200?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Chain",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/f9f3d8da-e791-47d2-98c2-031712617e00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Verso",
  "link": "WalletConnectV1",
  "desktop": {
    "native": "verso"
  },
  "mobile": {
    "ios": {
      "native": "verso"
    },
    "android": {
      "native": "verso"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/109d7c90-86ed-4ee0-e17d-3c87624ddf00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "LOBSTR Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "lobstr://",
      "universal": "https://lobstr.co/uni/wc"
    },
    "android": {
      "native": "lobstr://",
      "universal": "https://lobstr.co/uni/wc"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/0dafcaab-0852-47f7-85dd-436b86491d00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Bifrost Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "bifrostwallet:",
      "universal": "https://app.bifrostwallet.com"
    },
    "android": {
      "native": "bifrostwallet:",
      "universal": "https://app.bifrostwallet.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/86be07e2-6652-4fd1-5f33-651682c95400?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Okse Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "oksewallet:"
    },
    "android": {
      "native": "oksewallet:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/8a1b36d5-7f40-403a-7000-5d30f9181200?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "BRISE Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/09a4e1d9-e4de-44fa-f248-5495ba9ab300?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "LZ Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/e3272444-3876-49d3-2f84-004b818d3800?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "HyperPay",
  "extension": "HyperPay",
  "link": "WalletConnectV1",
  "logo": wallets.HyperPay.info.logo
}, {
  "name": "ATON",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/2e85f1d1-f498-4cae-bb54-1d40614ee300?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Frontier",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "frontier://"
    },
    "android": {
      "native": "frontier://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/a78c4d48-32c1-4a9d-52f2-ec7ee08ce200?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "MDAO Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "ttmwalletapp://"
    },
    "android": {
      "native": "ttmwalletapp://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/82014e92-838b-4e75-e77e-76cdc5539d00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "TTM Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "ttmwalletapp:"
    },
    "android": {
      "native": "ttmwalletapp:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/82014e92-838b-4e75-e77e-76cdc5539d00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Dentacoin Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "dentacoin-wallet://"
    },
    "android": {
      "native": "dentacoin-wallet://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/34910dc0-9f3b-4407-115d-673707602900?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Opto Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "opto://"
    },
    "android": {
      "native": "opto://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/3df102e4-e435-49dd-d4b1-5ea74ebed500?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "XFUN Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "xfunwallet://",
      "universal": "https://xfun.io"
    },
    "android": {
      "native": "xfunwallet://",
      "universal": "https://xfun.io"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/a665f8f3-09ef-4d17-2bd0-26dca4518400?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Exodus",
  "link": "WalletConnectV1",
  "desktop": {
    "native": "exodus://"
  },
  "mobile": {
    "ios": {
      "universal": "https://exodus.com/m"
    },
    "android": {
      "native": "wc://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/4c16cad4-cac9-4643-6726-c696efaf5200?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Uvtoken",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "UvToken://"
    },
    "android": {
      "native": "UvToken://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/52b9a9fc-caff-469e-033b-6d6f14e41800?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "S-ONE Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "sone://",
      "universal": "https://sonewallet.app"
    },
    "android": {
      "native": "sone://",
      "universal": "https://sonewallet.app"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/b3562637-a407-4035-6fa5-a70ff2050400?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "PREMA Wallet",
  "link": "WalletConnectV1",
  "desktop": {
    "native": "premawallet:"
  },
  "mobile": {
    "ios": {
      "native": "premawallet:",
      "universal": "https://premanft.com"
    },
    "android": {
      "native": "premawallet:",
      "universal": "https://premanft.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/6487869b-1165-4f30-aa3a-115665be8300?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Shinobi-Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "shinobi-wallet://"
    },
    "android": {
      "native": "shinobi-wallet://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/685c986c-3e80-4701-cec6-cd247ba1a700?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "ByteBank",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "hideoutWallet:"
    },
    "android": {
      "native": "hideoutWallet:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/bc7aacd6-b2e2-4146-7d21-06e0c5d44f00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Ancrypto Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "ancrypto://app"
    },
    "android": {
      "native": "ancrypto://app"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/d4382329-e288-4d7a-0ac8-3eb0facfb900?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Bee Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "beewallet.app://",
      "universal": "https://beewallet.app/wc"
    },
    "android": {
      "native": "beewallet.app://",
      "universal": "https://beewallet.app/wc"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/f90bc33f-f085-40cf-7538-fae5ae84f900?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "LATOKEN Multichain DeFi Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "dfwallet:"
    },
    "android": {
      "native": "dfwallet:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/ff858a37-cbcb-413d-c1ed-917a444bea00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "TK Finance",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "tk://",
      "universal": "https://trustkeys.network"
    },
    "android": {
      "native": "tk://",
      "universal": "https://trustkeys.network"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/c4066f68-2247-49bf-ac8a-a677bfa81800?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Oxalus Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "oxalus://",
      "universal": "https://deeplink.oxalus.io"
    },
    "android": {
      "native": "oxalus://",
      "universal": "https://deeplink.oxalus.io"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/a6e22fcb-6b69-45d2-b52d-a4a347a21e00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "3S Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "bhcwallet://"
    },
    "android": {
      "native": "bhcwallet://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/f3b6a89d-ec8f-49dc-e07f-6bf723e1e500?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Klever Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "kleverwallet:",
      "universal": "https://klever.page.link"
    },
    "android": {
      "native": "kleverwallet:",
      "universal": "https://klever.page.link"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/8f5bbad8-6a14-4b2c-5343-cc1fca6e4d00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "OneKey",
  "link": "WalletConnectV1",
  "desktop": {
    "native": "onekey-wallet://"
  },
  "mobile": {
    "ios": {
      "native": "onekey-wallet://",
      "universal": "https://app.onekey.so/wc/connect"
    },
    "android": {
      "native": "onekey-wallet://",
      "universal": "https://app.onekey.so/wc/connect"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/12bebb3f-8030-4892-8452-c60a6bac1500?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "helix id",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "helix-id://helix-id.com"
    },
    "android": {
      "native": "helix-id://helix-id.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/4083ef71-8389-4682-ded6-0099236d2e00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "CeloDance",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "celo://wallet/dappkit/celodance"
    },
    "android": {
      "native": "celo://wallet/dappkit/celodance"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/47c8ab7b-a66c-4949-f0fe-b0c2c169ee00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Volt: DeFi",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "volt:",
      "universal": "https://get.voltage.finance"
    },
    "android": {
      "native": "volt:",
      "universal": "https://get.voltage.finance"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/51d783cb-0686-4ffa-e661-edca0c380000?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Wirex Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "wirexwallet://",
      "universal": "https://wwallet.app.link"
    },
    "android": {
      "native": "wirexwallet://",
      "universal": "https://wwallet.app.link"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/769739aa-ff45-4db5-c6e6-70590741ec00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Robinhood Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "robinhood-wallet:"
    },
    "android": {
      "native": "robinhood-wallet:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/dfe0e3e3-5746-4e2b-12ad-704608531500?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "RiceWallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "ricewallet",
      "universal": "https://ricewallet.io"
    },
    "android": {
      "native": "ricewallet",
      "universal": "https://ricewallet.io"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/df94578e-19be-4f00-258f-2470343e7b00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "SafeMoon",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "safemoon:",
      "universal": "https://safemoon.net/"
    },
    "android": {
      "native": "safemoon:",
      "universal": "https://safemoon.net/"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/ecc31a8e-0ee9-49db-cc59-0876b7c35600?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "SimpleHold",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "simplehold://",
      "universal": "https://simplehold.io"
    },
    "android": {
      "native": "simplehold://",
      "universal": "https://simplehold.io"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/a9f1ba96-b658-4d13-f71f-226b6389f000?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "GoldBit",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "goldbit://"
    },
    "android": {
      "native": "goldbit://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/11974ef1-21ab-4806-a2b1-362c31499900?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "ioPay",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "iopay:"
    },
    "android": {
      "native": "iopay:"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/18891f5a-fd0f-4126-7d1a-452be6714700?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Bitizen",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "bitizen://wallet",
      "universal": "https://bitizen.org/wallet"
    },
    "android": {
      "native": "bitizen://wallet",
      "universal": "https://bitizen.org/wallet"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/75dd1471-77e9-4811-ce57-ec8fc980ec00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Slavi Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "slaviwallet:",
      "universal": "https://www.slaviwallet.io"
    },
    "android": {
      "native": "slaviwallet:",
      "universal": "https://www.slaviwallet.io"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/282ce060-0beb-4236-b7b0-1b34cc6c8f00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Nufinetes",
  "link": "WalletConnectV1",
  "desktop": {
    "native": "vimwallet:/"
  },
  "mobile": {
    "ios": {
      "native": "vimwallet:/",
      "universal": "https://apple.vimworld.org"
    },
    "android": {
      "native": "vimwallet:/",
      "universal": "https://apple.vimworld.org"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/70080bd7-9858-4720-cf74-8f74cd74cb00?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Arianee Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "com.arianee.wallet",
      "universal": "https://arianee.net"
    },
    "android": {
      "native": "com.arianee.wallet",
      "universal": "https://arianee.net"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/ace938a9-c906-4b9e-f683-b85f1ab72800?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "NOW Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "walletnow://",
      "universal": "https://walletnow.app.link"
    },
    "android": {
      "native": "walletnow://",
      "universal": "https://walletnow.app.link"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/b6ee4efc-f53e-475b-927b-a7ded6211700?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Arculus Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "arculuswc:",
      "universal": "https://gw.arculus.co/app"
    },
    "android": {
      "native": "arculuswc:",
      "universal": "https://gw.arculus.co/app"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/f78dab27-7165-4a3d-fdb1-fcff06c0a700?projectId=ec576959c7769a8b4dbbb3da3f12fef4"
}, {
  "name": "Binana",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://master.tokenone.app"
    },
    "android": {
      "universal": "https://master.tokenone.app"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/65a60845-8fe3-4146-2688-586e4dc68a00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Fundamenta Mobile",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://app.civiport.online"
    },
    "android": {
      "universal": "https://app.civiport.online"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/79797f9e-a6c7-4284-1a1c-88332f11ea00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Nitrogen Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://nitrogen.org/wc"
    },
    "android": {
      "universal": "https://nitrogen.org/wc"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/af185895-cda5-4eaf-e31b-28b6fe4b0800?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "ApolloX",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://app.apollox.finance"
    },
    "android": {
      "universal": "https://app.apollox.finance"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/80ab63a2-1b32-4140-3577-9fbc8ea82e00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "ID Pocket",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/c227ee0a-5127-4707-ded9-c3cd81348d00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "CoinCircle",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://coincircle.com/app/walletconnect"
    },
    "android": {
      "universal": "https://coincircle.com/app/walletconnect"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/eae63a23-c7ba-4f7e-24b3-e6fc69215d00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Dracula Metaverse",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/7259499f-3a9c-4905-d881-19944500d000?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "SahalWallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/d29d6426-b6f2-481b-12d8-7b20ec82af00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "UPBOND Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/698e08f3-b452-4c91-9f65-299939396a00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Sequence Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://sequence.app"
    },
    "android": {
      "universal": "https://sequence.app"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/b2d5c39c-a485-4efa-5736-a782204e4a00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "LocalTrade Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://ws.lab.localtrade.cc"
    },
    "android": {
      "universal": "https://ws.lab.localtrade.cc"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/fcc60983-74ae-484a-4242-87cb6f05f100?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Loopring Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/2103feda-4fc8-4635-76a7-02a4ed998000?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Vision: Crypto Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://app.vision-crypto.com"
    },
    "android": {
      "universal": "https://app.vision-crypto.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/64ccf07c-1fba-4473-49e8-dc446e5a5000?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Ballet Crypto",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/542094e6-70d6-4b0d-4c8f-b61cc2c38500?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Pitaka",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "pitaka://",
      "universal": "https://app.pitaka.io"
    },
    "android": {
      "native": "pitaka://",
      "universal": "https://app.pitaka.io"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/691c0716-5213-4b99-e837-079268313800?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "AbsoluteWallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/03797059-fc49-4adc-7b93-503290b62300?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "The Parallel",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/de73fe0b-0244-4373-dea4-bef78ca82e00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "CypherD Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/6dfec0f3-2cbb-4300-b049-d66d28fcf400?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Keplr",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/527324b0-3849-462b-9a1a-72b53bdfea00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "MyWalliD",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/e6cff623-9671-4a39-acc7-1c2292d7e100?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Status",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/e131fa98-8c4f-4680-f5b6-6fb77189c900?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Monarch Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://monarchwallet.com"
    },
    "android": {
      "universal": "https://monarchwallet.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/c664d955-8a1e-4460-3917-4cfcf198f000?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Marble",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://app.marblewallet.com/"
    },
    "android": {
      "universal": "https://app.marblewallet.com/"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/eb6de921-6824-4f35-6331-8a8b031e7100?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Flooz",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://wallet.flooz.trade/wc"
    },
    "android": {
      "universal": "https://wallet.flooz.trade/wc"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/0a04f368-4f56-4c12-0bfa-93b14bb20800?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Blockchain.com",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://login.blockchain.com/deeplink/login/wallet-connect"
    },
    "android": {
      "universal": "https://login.blockchain.com/deeplink/login/wallet-connect"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/fc282669-2dbe-44d5-33fc-9168fcf08600?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Dohrnii Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/1bb51ed9-68ed-4012-3082-72dcb7754300?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "UniPass",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://wallet.unipass.id"
    },
    "android": {
      "universal": "https://wallet.unipass.id"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/77865965-4322-4ac4-5049-b2af11bf8300?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "ZenGo",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://get.zengo.com"
    },
    "android": {
      "universal": "https://get.zengo.com"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/d1794d97-ea1f-4966-be42-9f614bb5d800?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Locker Token",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/37401d35-3fa1-451c-802d-604940315800?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Keeper",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://link.keeper-wallet.app"
    },
    "android": {
      "universal": "https://link.keeper-wallet.app"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/41f6ac85-8f4e-4d9f-b37b-92b43fa7f400?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "XDEFI Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/efec6318-7f96-4b30-9287-6c287660cd00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "BeeWallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/ae53ba0b-4d01-42f6-53d8-cc568409b700?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Numio",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/416ee463-6699-43f7-c0e3-396f0ad3d300?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "UvToken",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "UvToken://"
    },
    "android": {
      "native": "UvToken://"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/a0057241-cd91-4a53-7175-016b76bfd900?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Neon Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/322bd6f0-09b5-4595-cb15-0dfab8054800?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Nabox",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://nabox.io/app/"
    },
    "android": {
      "universal": "https://nabox.io/app/"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/3b75e9f7-2ca8-4a33-ed2b-4e8a0c048d00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Snowball",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://app.snowball.exchange/app"
    },
    "android": {
      "universal": "https://app.snowball.exchange/app"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/313faea4-af8c-41f4-0ed8-98be5d048e00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "KryptoGO Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://kryptogo.page.link"
    },
    "android": {
      "universal": "https://kryptogo.page.link"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/3ccbd966-97e8-45a0-1ceb-6141a8978e00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Payperless",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/4a867e30-44c9-4627-6281-33457b8e2100?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Brave Wallet",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/8cecad66-73e3-46ee-f45f-01503c032f00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Crossmint",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/8ad627ec-cbcd-4878-ec5c-3df588055200?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Safematrix",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://safematrix.io/"
    },
    "android": {
      "universal": "https://safematrix.io/"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/48ea5de9-869a-4994-2402-97afba060900?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "pier",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://pierwallet.com/wc"
    },
    "android": {
      "universal": "https://pierwallet.com/wc"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/cf3f0da1-40ec-4940-aebe-df075513d100?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "FILWallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://h5.filwallet.co"
    },
    "android": {
      "universal": "https://h5.filwallet.co"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/f400f6c2-ca6c-487b-654d-e119af247500?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "ParaSwap Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://wallet.paraswap.io/#/"
    },
    "android": {
      "universal": "https://wallet.paraswap.io/#/"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/73dc6b30-b644-46e6-020c-5926851df600?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Bitski",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://wallet.bitski.com/walletconnect"
    },
    "android": {
      "universal": "https://wallet.bitski.com/walletconnect"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/94d94cb5-a94f-47cf-70e6-fe8d3f1c3700?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Hippo Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "native": "hippowallet://",
      "universal": "https://hippowallet.io"
    },
    "android": {
      "native": "hippowallet://",
      "universal": "https://hippowallet.io"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/f9570968-45f7-47c1-3189-98cf60e25c00?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Core",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://core.app"
    },
    "android": {
      "universal": "https://core.app"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/35f9c46e-cc57-4aa7-315d-e6ccb2a1d600?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Xcapit",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://app.xcapit.com/links"
    },
    "android": {
      "universal": "https://app.xcapit.com/links"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/17f59b75-21b0-4b3f-b024-fe4b9b8d2300?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Paper Wallet",
  "link": "WalletConnectV1",
  "mobile": {
    "ios": {
      "universal": "https://paper.xyz"
    },
    "android": {
      "universal": "https://paper.xyz"
    }
  },
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/37d7a10f-d94d-4a56-c30e-267e8afbd500?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "BC Vault",
  "link": "WalletConnectV1",
  "logo": "https://explorer-api.walletconnect.com/v3/logo/lg/4d7bf99f-b2d9-48b0-5d7e-7d64f9a4f700?projectId=a8d876c6f91c3748db621583fad358f1"
}, {
  "name": "Wallet (Ethereum)",
  "extension": "WindowEthereum",
  "logo": wallets.WindowEthereum.info.logo
}, {
  "name": "Wallet (Solana)",
  "extension": "WindowSolana",
  "logo": wallets.WindowSolana.info.logo
}, {
  "name": "WalletConnect",
  "link": "WalletConnectV1",
  "logo": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz48IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMjUuNC4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAtLT48c3ZnIHZlcnNpb249JzEuMScgaWQ9J0xheWVyXzEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHg9JzBweCcgeT0nMHB4JyB2aWV3Qm94PScwIDAgNTAwIDUwMCcgc3R5bGU9J2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTAwIDUwMDsnIHhtbDpzcGFjZT0ncHJlc2VydmUnPjxzdHlsZSB0eXBlPSd0ZXh0L2Nzcyc+IC5zdDB7ZmlsbDojNTk5MUNEO30KPC9zdHlsZT48ZyBpZD0nUGFnZS0xJz48ZyBpZD0nd2FsbGV0Y29ubmVjdC1sb2dvLWFsdCc+PHBhdGggaWQ9J1dhbGxldENvbm5lY3QnIGNsYXNzPSdzdDAnIGQ9J00xMDIuNywxNjJjODEuNS03OS44LDIxMy42LTc5LjgsMjk1LjEsMGw5LjgsOS42YzQuMSw0LDQuMSwxMC41LDAsMTQuNEwzNzQsMjE4LjkgYy0yLDItNS4zLDItNy40LDBsLTEzLjUtMTMuMmMtNTYuOC01NS43LTE0OS01NS43LTIwNS44LDBsLTE0LjUsMTQuMWMtMiwyLTUuMywyLTcuNCwwTDkxLjksMTg3Yy00LjEtNC00LjEtMTAuNSwwLTE0LjQgTDEwMi43LDE2MnogTTQ2Ny4xLDIyOS45bDI5LjksMjkuMmM0LjEsNCw0LjEsMTAuNSwwLDE0LjRMMzYyLjMsNDA1LjRjLTQuMSw0LTEwLjcsNC0xNC44LDBjMCwwLDAsMCwwLDBMMjUyLDMxMS45IGMtMS0xLTIuNy0xLTMuNywwaDBsLTk1LjUsOTMuNWMtNC4xLDQtMTAuNyw0LTE0LjgsMGMwLDAsMCwwLDAsMEwzLjQsMjczLjZjLTQuMS00LTQuMS0xMC41LDAtMTQuNGwyOS45LTI5LjIgYzQuMS00LDEwLjctNCwxNC44LDBsOTUuNSw5My41YzEsMSwyLjcsMSwzLjcsMGMwLDAsMCwwLDAsMGw5NS41LTkzLjVjNC4xLTQsMTAuNy00LDE0LjgsMGMwLDAsMCwwLDAsMGw5NS41LDkzLjUgYzEsMSwyLjcsMSwzLjcsMGw5NS41LTkzLjVDNDU2LjQsMjI1LjksNDYzLDIyNS45LDQ2Ny4xLDIyOS45eicvPjwvZz48L2c+PC9zdmc+Cg=="
}];

var ChevronLeft = (function () {
  return /*#__PURE__*/React.createElement("svg", {
    className: "ChevronLeft Icon",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React.createElement("path", {
    strokeWidth: "1",
    fillRule: "evenodd",
    d: "M10.4,1.6c0.2,0.2,0.2,0.5,0,0.7L4.7,8l5.6,5.6c0.2,0.2,0.2,0.5,0,0.7s-0.5,0.2-0.7,0l-6-6l0,0,c-0.2-0.2-0.2-0.5,0-0.7l6-6l0,0C9.8,1.5,10.2,1.5,10.4,1.6L10.4,1.6z"
  }));
});

var CloseIcon = (function () {
  return /*#__PURE__*/React.createElement("svg", {
    className: "CloseIcon Icon",
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }));
});

var Dialog$1 = (function (props) {
  var _useContext = useContext(NavigateStackContext),
      navigate = _useContext.navigate;

  var _useContext2 = useContext(ClosableContext),
      close = _useContext2.close,
      closable = _useContext2.closable;

  return /*#__PURE__*/React.createElement("div", {
    className: ["Dialog", props.className].join(' ')
  }, /*#__PURE__*/React.createElement("div", {
    className: ["DialogHeader", props.stacked ? 'TextCenter' : ''].join(' ')
  }, props.stacked && /*#__PURE__*/React.createElement("div", {
    className: "DialogHeaderActionLeft PaddingTopS PaddingLeftS PaddingRightS"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return navigate('back');
    },
    className: "ButtonCircular",
    title: "Go back"
  }, /*#__PURE__*/React.createElement(ChevronLeft, null))), closable && props.closable !== false && /*#__PURE__*/React.createElement("div", {
    className: "DialogHeaderActionRight PaddingTopS PaddingLeftS PaddingRightS"
  }, props.alternativeHeaderAction, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: close,
    className: "ButtonCircular",
    title: "Close dialog"
  }, /*#__PURE__*/React.createElement(CloseIcon, null))), props.header), /*#__PURE__*/React.createElement("div", {
    className: ["DialogBody", props.bodyClassName].join(' ')
  }, props.body), props.hideFooter !== true && /*#__PURE__*/React.createElement("div", {
    className: "DialogFooter"
  }, props.footer));
});

var ExtensionImage = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyNTAgMjUwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTAgMjUwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTE3Mi44LDY4LjNjLTQuOS0yLjItNy40LTguNC00LjUtMTMuNmM1LjMtOS40LDEwLTE4LjYsNC4zLTI5LjFjLTctMTIuNy0yNC4xLTE3LjQtMzYuNi0xMGMtMTUuNCw5LjEtMTMuNCwyNS42LTUuMSwzOC45CgkJYzMuMyw1LjIsMC45LDExLjYtNC4yLDEzLjlsLTYxLjIsMC4xbDAsMC44bDAuMSwyMS44bDAuMSwzNy45Yy0xLjksNS41LTguNyw4LjQtMTQuMSw1Yy0xMy40LTguMy0yOS44LTEwLjEtMzguOSw1LjMKCQljLTcuMywxMi41LTIuNSwyOS43LDEwLjIsMzYuNWMxMC41LDUuNywxOS43LDEsMjkuMS00LjRjNS40LTMuMSwxMS45LTAuMywxMy44LDVsMC4xLDU5LjhsNTcuMi0wLjFjMC4xLDAsMC4yLDAsMC4zLDBsMy42LDAKCQljNS0yLjMsNy40LTguNyw0LjItMTMuOWMtOC4zLTEzLjMtMTAuMy0yOS44LDUuMS0zOC45YzEyLjUtNy40LDI5LjYtMi43LDM2LjYsMTBjNS43LDEwLjUsMS4xLDE5LjctNC4zLDI5LjEKCQljLTIuOSw1LjItMC41LDExLjQsNC41LDEzLjZsMy42LDBjMC4xLDAsMC4yLDAsMC4zLDBsNTYuNS0wLjFsLTAuMS01OC44Yy0xLjQtNi42LTcuOC05LjItMTQuMS01LjhjLTkuNSw1LjItMTcuOSw5LjgtMjguNCw0LjEKCQljLTEyLjgtNi45LTE4LjItMjMuNy0xMC45LTM2LjNjOS0xNS40LDI1LjUtMTMuNiwzOC45LTUuM2M1LjcsMy41LDEyLjksMC4yLDE0LjQtNS45bC0wLjEtMzUuNEwyMzMuMyw2OWwwLTAuOEwxNzIuOCw2OC4zeiIvPgo8L2c+Cjwvc3ZnPgo=';

var isMobile = function isMobile() {
  if (typeof window !== 'undefined') {
    return Boolean(window.matchMedia('(pointer:coarse)').matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/.test(navigator.userAgent));
  }

  return false;
};

var LinkImage = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiMwMTAxMDEiIGQ9Ik00NTkuNjU0LDIzMy4zNzNsLTkwLjUzMSw5MC41Yy00OS45NjksNTAtMTMxLjAzMSw1MC0xODEsMGMtNy44NzUtNy44NDQtMTQuMDMxLTE2LjY4OC0xOS40MzgtMjUuODEzDQoJbDQyLjA2My00Mi4wNjNjMi0yLjAxNiw0LjQ2OS0zLjE3Miw2LjgyOC00LjUzMWMyLjkwNiw5LjkzOCw3Ljk4NCwxOS4zNDQsMTUuNzk3LDI3LjE1NmMyNC45NTMsMjQuOTY5LDY1LjU2MywyNC45MzgsOTAuNSwwDQoJbDkwLjUtOTAuNWMyNC45NjktMjQuOTY5LDI0Ljk2OS02NS41NjMsMC05MC41MTZjLTI0LjkzOC0yNC45NTMtNjUuNTMxLTI0Ljk1My05MC41LDBsLTMyLjE4OCwzMi4yMTkNCgljLTI2LjEwOS0xMC4xNzItNTQuMjUtMTIuOTA2LTgxLjY0MS04Ljg5MWw2OC41NzgtNjguNTc4YzUwLTQ5Ljk4NCwxMzEuMDMxLTQ5Ljk4NCwxODEuMDMxLDANCglDNTA5LjYyMywxMDIuMzQyLDUwOS42MjMsMTgzLjM4OSw0NTkuNjU0LDIzMy4zNzN6IE0yMjAuMzI2LDM4Mi4xODZsLTMyLjIwMywzMi4yMTljLTI0Ljk1MywyNC45MzgtNjUuNTYzLDI0LjkzOC05MC41MTYsMA0KCWMtMjQuOTUzLTI0Ljk2OS0yNC45NTMtNjUuNTYzLDAtOTAuNTMxbDkwLjUxNi05MC41YzI0Ljk2OS0yNC45NjksNjUuNTQ3LTI0Ljk2OSw5MC41LDBjNy43OTcsNy43OTcsMTIuODc1LDE3LjIwMywxNS44MTMsMjcuMTI1DQoJYzIuMzc1LTEuMzc1LDQuODEzLTIuNSw2LjgxMy00LjVsNDIuMDYzLTQyLjA0N2MtNS4zNzUtOS4xNTYtMTEuNTYzLTE3Ljk2OS0xOS40MzgtMjUuODI4Yy00OS45NjktNDkuOTg0LTEzMS4wMzEtNDkuOTg0LTE4MS4wMTYsMA0KCWwtOTAuNSw5MC41Yy00OS45ODQsNTAtNDkuOTg0LDEzMS4wMzEsMCwxODEuMDMxYzQ5Ljk4NCw0OS45NjksMTMxLjAzMSw0OS45NjksMTgxLjAxNiwwbDY4LjU5NC02OC41OTQNCglDMjc0LjU2MSwzOTUuMDkyLDI0Ni40MiwzOTIuMzQyLDIyMC4zMjYsMzgyLjE4NnoiLz4NCjwvc3ZnPg0K';

var isAndroid = function isAndroid() {
  return navigator.userAgent.toLowerCase().includes('android');
};

var isIOS = function isIOS() {
  return Boolean(/iPad|iPhone|iPod/.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

var platformForWallet = (function (walletMetaData) {
  var platform;

  if (isMobile()) {
    if (isAndroid()) {
      var _walletMetaData$mobil;

      platform = (_walletMetaData$mobil = walletMetaData.mobile) === null || _walletMetaData$mobil === void 0 ? void 0 : _walletMetaData$mobil.android;
    } else if (isIOS()) {
      var _walletMetaData$mobil2;

      platform = (_walletMetaData$mobil2 = walletMetaData.mobile) === null || _walletMetaData$mobil2 === void 0 ? void 0 : _walletMetaData$mobil2.ios;
    }
  } else {
    platform = walletMetaData.desktop;
  }

  return platform;
});

var QRCodeImage = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyAgUFVCTElDICctLy9XM0MvL0RURCBTVkcgMS4xLy9FTicgICdodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQnPgo8c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMDAgMTAwMCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMWUzIDFlMyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1ldGFkYXRhPiBTdmcgVmVjdG9yIEljb25zIDogaHR0cDovL3d3dy5vbmxpbmV3ZWJmb250cy5jb20vaWNvbiA8L21ldGFkYXRhPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDUxMSkgc2NhbGUoLjEgLS4xKSI+PHBhdGggZD0ibTEwMCAyNzk3LjF2LTIyMTIuOWg0NDI1Ljh2NDQyNS44aC00NDI1Ljh2LTIyMTIuOXptMzQ3Ny40IDB2LTEyNjQuNWgtMjUyOXYyNTI5aDI1Mjl2LTEyNjQuNXoiLz48cGF0aCBkPSJtMTY4MC42IDI3OTcuMXYtNjMyLjNoMTI2NC42djEyNjQuNmgtMTI2NC42di02MzIuM3oiLz48cGF0aCBkPSJtNTQ3NC4yIDI3OTcuMXYtMjIxMi45aDQ0MjUuOHY0NDI1LjhoLTQ0MjUuOHYtMjIxMi45em0zNDc3LjQgMHYtMTI2NC41aC0yNTI5djI1MjloMjUyOXYtMTI2NC41eiIvPjxwYXRoIGQ9Im03MDU0LjggMjc5Ny4xdi02MzIuM2gxMjY0LjZ2MTI2NC42aC0xMjY0LjZ2LTYzMi4zeiIvPjxwYXRoIGQ9Im0xMDAtMjU3Ny4xdi0yMjEyLjloNDQyNS44djQ0MjUuOGgtNDQyNS44di0yMjEyLjl6bTM0NzcuNCAwdi0xMjY0LjVoLTI1Mjl2MjUyOWgyNTI5di0xMjY0LjV6Ii8+PHBhdGggZD0ibTE2ODAuNi0yNTc3LjF2LTYzMi4zaDEyNjQuNnYxMjY0LjZoLTEyNjQuNnYtNjMyLjN6Ii8+PHBhdGggZD0ibTU0NzQuMi05MTcuNHYtNTUzLjJoMTEwNi40di0xMTA2LjRoLTExMDYuNHYtMTEwNi40aDExMDYuNHYtMTEwNi42aDExMDYuNHYxMTA2LjRoMTEwNi40di0xMTA2LjRoMTEwNi42djExMDYuNGgtMTEwNi40djExMDYuNGgxMTA2LjR2MTEwNi40aC0xMTA2LjR2MTEwNi40aC0xMTA2LjR2LTExMDYuNGgtMTEwNi40djExMDYuNGgtMTEwNi40di01NTN6bTMzMTkuMy0xMTA2LjV2LTU1My4yaC0xMTA2LjR2LTExMDYuNGgtMTEwNi40djExMDYuNGgxMTA2LjR2MTEwNi40aDExMDYuNHYtNTUzLjJ6Ii8+PC9nPgo8L3N2Zz4K";

var KEY = '_DePayConnectDialogPreviouslyConnectedWallet';

var set = function set(value) {
  localStorage[KEY] = value;
};

var get = function get() {
  return localStorage[KEY];
};

var ConnectWalletDialog = (function (props) {
  var _props$wallet;

  var QRCodeElement = React.useRef();

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      extensionIsAvailable = _useState2[0],
      setExtensionIsAvailable = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      appIsAvailable = _useState4[0],
      setAppIsAvailable = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      linkIsConnected = _useState6[0],
      setLinkIsConnected = _useState6[1];

  var _useState7 = useState(),
      _useState8 = _slicedToArray(_useState7, 2);
      _useState8[0];
      _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      showQRCode = _useState10[0],
      setShowQRCode = _useState10[1];

  var _useState11 = useState(false),
      _useState12 = _slicedToArray(_useState11, 2),
      showLinkCopied = _useState12[0],
      setShowLinkCopied = _useState12[1];

  var _useState13 = useState(),
      _useState14 = _slicedToArray(_useState13, 2),
      QRCode = _useState14[0],
      setQRCode = _useState14[1];

  var _useContext = useContext(NavigateStackContext);
      _useContext.navigate;

  var header = /*#__PURE__*/React.createElement("div", {
    className: "PaddingTopS PaddingLeftM PaddingRightM"
  }, ((_props$wallet = props.wallet) === null || _props$wallet === void 0 ? void 0 : _props$wallet.logo) && /*#__PURE__*/React.createElement("div", {
    className: "PaddingTopXS"
  }, /*#__PURE__*/React.createElement("div", {
    className: "LineHeightL FontSizeL PaddingTopS"
  }, /*#__PURE__*/React.createElement("span", {
    className: "CardImage rounded large"
  }, /*#__PURE__*/React.createElement("img", {
    className: "transparent",
    src: props.wallet.logo
  })))));

  var connectViaCopyLink = function connectViaCopyLink() {
    var wallet = new wallets[props.wallet.link]();
    wallet.connect({
      name: props.wallet.name,
      logo: props.wallet.logo,
      reconnect: true,
      connect: function connect(_ref) {
        var uri = _ref.uri;
        copy(uri);
        setShowLinkCopied(true);
        setTimeout(function () {
          return setShowLinkCopied(false);
        }, 3000);
      }
    }).then(function (account) {
      props.resolve(account, wallet);
    });
  };

  var connectViaQRCode = function connectViaQRCode() {
    switch (props.wallet.link) {
      case 'WalletConnectV1':
        if (QRCode == undefined) {
          var _wallet = new wallets[props.wallet.link]();

          _wallet.connect({
            name: props.wallet.name,
            logo: props.wallet.logo,
            reconnect: true,
            connect: function connect(_ref2) {
              var uri = _ref2.uri;
              var newQRCode = new QRCodeStyling({
                width: 340,
                height: 340,
                type: "svg",
                dotsOptions: {
                  type: "extra-rounded"
                },
                cornersSquareOptions: {
                  type: 'rounded'
                },
                backgroundOptions: {
                  color: "transparent"
                }
              });
              newQRCode.update({
                data: uri
              });
              setQRCode(newQRCode);
            }
          }).then(function (account) {
            props.resolve(account, _wallet);
          });
        }

        break;

      case 'WalletLink':
        var wallet = new wallets[props.wallet.link]();
        wallet.connect().then(function (account) {
          props.resolve(account, wallet);
        });
        break;
    }
  };

  useEffect(function () {
    _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      var _props$wallet2, _props$wallet3;

      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = setExtensionIsAvailable;

              if (!((_props$wallet2 = props.wallet) !== null && _props$wallet2 !== void 0 && _props$wallet2.extension)) {
                _context.next = 10;
                break;
              }

              _context.next = 4;
              return wallets[props.wallet.extension].isAvailable();

            case 4:
              _context.t2 = _context.sent;

              if (_context.t2) {
                _context.next = 7;
                break;
              }

              _context.t2 = false;

            case 7:
              _context.t1 = _context.t2;
              _context.next = 11;
              break;

            case 10:
              _context.t1 = false;

            case 11:
              _context.t3 = _context.t1;
              (0, _context.t0)(_context.t3);
              _context.t4 = setLinkIsConnected;

              if (!((_props$wallet3 = props.wallet) !== null && _props$wallet3 !== void 0 && _props$wallet3.link)) {
                _context.next = 23;
                break;
              }

              _context.next = 17;
              return wallets[props.wallet.link].isAvailable();

            case 17:
              _context.t6 = _context.sent;

              if (_context.t6) {
                _context.next = 20;
                break;
              }

              _context.t6 = false;

            case 20:
              _context.t5 = _context.t6;
              _context.next = 24;
              break;

            case 23:
              _context.t5 = false;

            case 24:
              _context.t7 = _context.t5;
              (0, _context.t4)(_context.t7);
              setAppIsAvailable(!!platformForWallet(props.wallet));

            case 27:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }, []);
  useEffect(function () {
    if (linkIsConnected !== undefined) {
      var _props$wallet4, _props$wallet4$deskto;

      setShowQRCode(!extensionIsAvailable && !isMobile() && !((_props$wallet4 = props.wallet) !== null && _props$wallet4 !== void 0 && (_props$wallet4$deskto = _props$wallet4.desktop) !== null && _props$wallet4$deskto !== void 0 && _props$wallet4$deskto["native"]));
    }
  }, [extensionIsAvailable, linkIsConnected]);
  useEffect(function () {
    if (showQRCode && props.wallet.link) {
      connectViaQRCode();
    }
  }, [showQRCode]);
  useEffect(function () {
    if (showQRCode && QRCode && QRCodeElement && QRCodeElement.current) {
      QRCodeElement.current.innerHTML = "";
      QRCode.append(QRCodeElement.current);
    }
  }, [QRCode]);
  return /*#__PURE__*/React.createElement(Dialog$1, {
    stacked: true,
    header: header,
    body: /*#__PURE__*/React.createElement("div", {
      className: "TextCenter"
    }, /*#__PURE__*/React.createElement("div", {
      className: "PaddingLeftL PaddingRightL"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL Text FontSizeL FontWeightBold"
    }, "Connect ", props.wallet.name)), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS"
    }, /*#__PURE__*/React.createElement("div", {
      ref: QRCodeElement,
      className: "QRCode"
    }), showQRCode && /*#__PURE__*/React.createElement("div", {
      className: "Opacity05 PaddingBottomXS"
    }, /*#__PURE__*/React.createElement("small", null, "Scan QR code with your wallet"))), /*#__PURE__*/React.createElement("div", {
      className: "PaddingLeftL PaddingRightL PaddingTopL"
    }, extensionIsAvailable && /*#__PURE__*/React.createElement("div", {
      className: "PaddingBottomXS"
    }, props.showConnectExtensionWarning && /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingBottomS PaddingLeftS PaddingRightS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "Alert"
    }, /*#__PURE__*/React.createElement("span", {
      className: "FontWeightBold PaddingBottomXS"
    }, "You wallet extension window is already asking to connect. It might be hidden."))), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return props.connectExtension(props.wallet);
      },
      className: "Card small PaddingTopS PaddingRightXS PaddingBottomS PaddingLeftXS"
    }, /*#__PURE__*/React.createElement("span", {
      className: "PaddingTopXS PaddingRightXS PaddingLeftS"
    }, /*#__PURE__*/React.createElement("img", {
      className: "transparent ",
      title: "Connect your wallet",
      style: {
        height: '26px'
      },
      src: ExtensionImage
    })), /*#__PURE__*/React.createElement("div", {
      className: "PaddingLeftS LineHeightXS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardText FontWeightMedium"
    }, "Connect extension")))), appIsAvailable && /*#__PURE__*/React.createElement("div", {
      className: "PaddingBottomXS"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return props.connectViaRedirect(props.wallet);
      },
      className: "Card small PaddingTopS PaddingRightXS PaddingBottomS PaddingLeftXS"
    }, /*#__PURE__*/React.createElement("span", {
      className: "PaddingTopXS PaddingRightXS PaddingLeftS"
    }, /*#__PURE__*/React.createElement("img", {
      className: "transparent ",
      title: "Click to connect app",
      style: {
        height: '26px',
        width: '26px',
        borderRadius: '8px'
      },
      src: props.wallet.logo
    })), /*#__PURE__*/React.createElement("div", {
      className: "PaddingLeftS LineHeightXS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardText FontWeightMedium"
    }, "Connect app")))), props.wallet.link && (!showQRCode || props.wallet.link == 'WalletLink') && /*#__PURE__*/React.createElement("div", {
      className: "PaddingBottomXS"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        setShowQRCode(true);

        if (props.wallet.link) {
          connectViaQRCode();
        }
      },
      className: "Card small PaddingTopS PaddingRightXS PaddingBottomS PaddingLeftXS"
    }, /*#__PURE__*/React.createElement("span", {
      className: "PaddingTopXS PaddingRightXS PaddingLeftS"
    }, /*#__PURE__*/React.createElement("img", {
      className: "transparent ",
      title: "Scan QR code to connect a mobile wallet",
      style: {
        height: '26px'
      },
      src: QRCodeImage
    })), /*#__PURE__*/React.createElement("div", {
      className: "PaddingLeftS LineHeightXS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardText FontWeightMedium"
    }, "Scan QR code")))), props.wallet.link && props.wallet.link == 'WalletConnectV1' && props.wallet.connectionLink && /*#__PURE__*/React.createElement("div", {
      className: "PaddingBottomXS TooltipWrapper"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: connectViaCopyLink,
      className: "Card small PaddingTopS PaddingRightXS PaddingBottomS PaddingLeftXS"
    }, /*#__PURE__*/React.createElement("span", {
      className: "PaddingTopXS PaddingRightXS PaddingLeftS"
    }, /*#__PURE__*/React.createElement("img", {
      className: "transparent ",
      title: "Copy connection link",
      style: {
        height: '26px'
      },
      src: LinkImage
    })), /*#__PURE__*/React.createElement("div", {
      className: "PaddingLeftS LineHeightXS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardText FontWeightMedium"
    }, "Copy connection link"))), showLinkCopied && /*#__PURE__*/React.createElement("div", {
      className: "Tooltip absolute top"
    }, /*#__PURE__*/React.createElement("span", {
      className: "TooltipArrowDown"
    }), "Connection link copied"))))
  });
});

var isWebView = function isWebView() {
  var userAgentToLower = navigator.userAgent.toLowerCase();
  return userAgentToLower.includes('webview') || userAgentToLower.includes('wv') || navigator.userAgent.toLowerCase().match(/\) mobile\//) && !userAgentToLower.includes('safari');
};

var PoweredBy = (function () {
  return /*#__PURE__*/React.createElement("div", {
    className: "PoweredByWrapper"
  }, /*#__PURE__*/React.createElement("a", {
    href: 'https://depay.com',
    rel: "noopener noreferrer",
    target: "_blank",
    className: "PoweredByLink"
  }, "by DePay"));
});

var safeAppUrl = (function (href) {
  if (!href.includes('://')) {
    href = href.replaceAll('/', '').replaceAll(':', '');
    href = "".concat(href, "://");
  }

  return href;
});

var safeUniversalUrl = (function (href) {
  if (href.endsWith('/')) {
    href = href.slice(0, -1);
  }

  return href;
});

var SelectionContext = /*#__PURE__*/React.createContext();

var SelectBlockchainDialog = (function (props) {
  var _useContext = useContext(SelectionContext),
      setSelection = _useContext.setSelection;

  var _useContext2 = useContext(NavigateStackContext),
      navigate = _useContext2.navigate;

  var stacked = props.stacked || Object.keys(props.selection).length > 1;
  var blockchains = [Blockchains.findByName('ethereum'), Blockchains.findByName('bsc'), Blockchains.findByName('polygon')];

  var selectBlockchain = function selectBlockchain(blockchain) {
    window._depay_token_selection_selected_blockchain = blockchain.name;
    setSelection(Object.assign(props.selection, {
      blockchain: blockchain
    }));

    if (stacked && props.navigateBack !== false) {
      navigate('back');
    } else {
      props.resolve(blockchain);
    }
  };

  var elements = blockchains.map(function (blockchain, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: "Card Row",
      onClick: function onClick() {
        return selectBlockchain(blockchain);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardImage"
    }, /*#__PURE__*/React.createElement("img", {
      className: "transparent",
      src: blockchain.logo
    })), /*#__PURE__*/React.createElement("div", {
      className: "CardBody"
    }, /*#__PURE__*/React.createElement("span", {
      className: "CardText"
    }, blockchain.label)));
  });
  return /*#__PURE__*/React.createElement(Dialog$1, {
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL FontSizeL"
    }, "Select Blockchain"))),
    stacked: stacked,
    bodyClassName: "ScrollHeight",
    body: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS"
    }, elements),
    footer: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingRightM PaddingLeftM PaddingBottomS"
    })
  });
});

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var DropDown = (function (props) {
  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      clickCount = _useState2[0],
      setClickCount = _useState2[1];

  useEffect(function () {
    var handleClick = function handleClick() {
      setClickCount(clickCount + 1);

      if (clickCount == 0) {
        return;
      }

      props.hide();
    };

    window.addEventListener('click', handleClick);
    return function () {
      window.removeEventListener('click', handleClick);
    };
  }, [props.open, clickCount]);
  return /*#__PURE__*/React.createElement("div", {
    className: "DropDown ".concat(props.open ? 'open' : '')
  }, /*#__PURE__*/React.createElement("ul", null, props.items.map(function (item, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index
    }, /*#__PURE__*/React.createElement("button", {
      className: "DropDownItem",
      onClick: function onClick() {
        return item.action();
      }
    }, item.label));
  })));
});

var MenuIcon = (function (props) {
  return /*#__PURE__*/React.createElement("svg", {
    className: "MenuIcon Icon",
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "11.6",
    y1: "17.8",
    x2: "11.6",
    y2: "17.6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "11.6",
    y1: "12.2",
    x2: "11.6",
    y2: "12.2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "11.6",
    y1: "6.8",
    x2: "11.6",
    y2: "6.6"
  }));
});

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var SelectWalletList = (function (props) {
  var parentElement = React.useRef();
  var fuse = new Fuse(allWallets, {
    keys: ['name'],
    threshold: 0.3,
    ignoreFieldNorm: true
  });

  var _useState = useState(allWallets),
      _useState2 = _slicedToArray(_useState, 2),
      resultList = _useState2[0],
      setResultList = _useState2[1];

  var rowVirtualizer = useVirtualizer({
    count: resultList.length,
    getScrollElement: function getScrollElement() {
      return parentElement.current;
    },
    estimateSize: function estimateSize() {
      return 61;
    }
  });
  useEffect(function () {
    var results = fuse.search(props.searchTerm).map(function (result) {
      return result.item;
    });

    if (parentElement.current) {
      parentElement.current.scrollTo(0, 0);
    }

    if (props.searchTerm.length) {
      setResultList(results);
    } else {
      setResultList(allWallets);
    }
  }, [props.searchTerm]);
  return /*#__PURE__*/React.createElement("div", {
    ref: parentElement,
    className: "DialogBody ScrollHeightM PaddingBottomS PaddingLeftS PaddingRightS"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "".concat(rowVirtualizer.getTotalSize(), "px"),
      width: '100%',
      position: 'relative'
    }
  }, rowVirtualizer.getVirtualItems().map(function (virtualItem) {
    return /*#__PURE__*/React.createElement("div", {
      key: virtualItem.key,
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: "".concat(virtualItem.size, "px"),
        transform: "translateY(".concat(virtualItem.start, "px)")
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "PaddingBottomXS"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "Card small",
      title: "Connect ".concat(resultList[virtualItem.key].name),
      onClick: function onClick() {
        props.onClickWallet(_objectSpread$5({}, resultList[virtualItem.key]));
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardImage"
    }, /*#__PURE__*/React.createElement("img", _defineProperty({
      className: "transparent",
      src: resultList[virtualItem.key].logo
    }, "className", "WalletLogoS"))), /*#__PURE__*/React.createElement("div", {
      className: "CardBody"
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardBodyWrapper PaddingLeftXS LineHeightXS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardText"
    }, resultList[virtualItem.key].name))))));
  })));
});

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var SelectWalletDialog = (function (props) {
  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      searchTerm = _useState2[0],
      setSearchTerm = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      prioritizedWallets = _useState4[0],
      setPrioritizedWallets = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showDropDown = _useState6[0],
      setShowDropDown = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      dialogAnimationFinished = _useState8[0],
      setDialogAnimationFinished = _useState8[1];

  var searchElement = useRef();

  var _useContext = useContext(NavigateStackContext),
      navigate = _useContext.navigate;

  var onClickWallet = function onClickWallet(walletMetaData, wallet) {
    if (walletMetaData.via == 'detected') {
      if (walletMetaData.connectionType == 'app') {
        wallet.account().then(function (account) {
          if (account) {
            props.resolve(account, wallet);
          }
        });
        props.setWallet(walletMetaData);
        navigate('ConnectWallet');
      } else if (walletMetaData.connectionType == 'extension') {
        props.setWallet(walletMetaData);
        props.connectExtension(walletMetaData);
        navigate('ConnectWallet');
      }
    } else {
      props.connectViaRedirect(walletMetaData);
      props.setWallet(walletMetaData);
      navigate('ConnectWallet');
    }
  };

  useEffect(function () {
    getWallets().then(function (availableWallets) {
      var renderedWallets = {}; // prevents rendering same wallet twice (e.g. extension + via walletconnect)

      var renderWalletElement = function renderWalletElement(walletMetaData, index, type, wallet) {
        if (renderedWallets[walletMetaData.name] && type == 'previouslyConnected') {
          return null;
        }

        renderedWallets[walletMetaData.name] = true;
        var connectionType = 'app';

        if (wallet && wallet.constructor && ![wallets.WalletConnectV1, wallets.WalletLink].includes(wallet.constructor)) {
          connectionType = 'extension';
        }

        return /*#__PURE__*/React.createElement("div", {
          key: index,
          className: "PaddingBottomXS"
        }, /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: "Card small",
          title: "Connect ".concat(walletMetaData.name),
          onClick: function onClick() {
            return onClickWallet(_objectSpread$4(_objectSpread$4({}, walletMetaData), {}, {
              via: type,
              connectionType: connectionType
            }), wallet);
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "CardImage"
        }, /*#__PURE__*/React.createElement("img", _defineProperty({
          className: "transparent",
          src: walletMetaData.logo
        }, "className", "WalletLogoS"))), /*#__PURE__*/React.createElement("div", {
          className: "CardBody"
        }, /*#__PURE__*/React.createElement("div", {
          className: "CardBodyWrapper PaddingLeftXS LineHeightXS"
        }, /*#__PURE__*/React.createElement("div", {
          className: "CardText FontWeightMedium"
        }, walletMetaData.name), type != 'previouslyConnected' && /*#__PURE__*/React.createElement("div", {
          className: "LightGreen"
        }, /*#__PURE__*/React.createElement("span", {
          className: "LightGreen",
          style: {
            fontSize: '70%',
            top: '-1px',
            position: 'relative'
          }
        }, "\u25CF"), " Connect detected ", connectionType), type == 'previouslyConnected' && /*#__PURE__*/React.createElement("div", {
          className: "Opacity05"
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: '70%',
            top: '-1px',
            position: 'relative'
          }
        }, "\u25CF"), " Previously connected")))));
      };

      var prioritizedWallets = availableWallets.map(function (availableWallet, index) {
        if (availableWallet.name == 'Phantom') {
          return;
        }

        var walletMetaData = allWallets.find(function (wallet) {
          return wallet.name == availableWallet.name;
        });

        if (walletMetaData) {
          return renderWalletElement(walletMetaData, index, 'detected', availableWallet);
        }
      }).filter(function (wallet) {
        return !!wallet;
      });
      var previouslyConnectedWalletName = get();
      var previouslyConnectedWallet = allWallets.find(function (wallet) {
        return wallet.name == previouslyConnectedWalletName;
      }) || allWallets.find(function (wallet) {
        return wallet.name == previouslyConnectedWalletName;
      });

      if (previouslyConnectedWallet && previouslyConnectedWallet) {
        prioritizedWallets.push(renderWalletElement(previouslyConnectedWallet, prioritizedWallets.length + 1, 'previouslyConnected'));
      }

      setPrioritizedWallets(prioritizedWallets);
    });
  }, []);
  useEffect(function () {
    setTimeout(function () {
      setDialogAnimationFinished(true);

      if (!isMobile()) {
        if (searchElement.current) {
          searchElement.current.click();
          searchElement.current.focus();
        }
      }
    }, 200);
  }, []);
  return /*#__PURE__*/React.createElement(Dialog$1, {
    header: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM TextLeft"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL FontSizeL"
    }, "Connect a wallet")), prioritizedWallets && /*#__PURE__*/React.createElement("div", {
      className: "PaddingBottomXS PaddingLeftS PaddingRightS PaddingTopS"
    }, prioritizedWallets), /*#__PURE__*/React.createElement("div", {
      className: "PaddingBottomXS PaddingLeftS PaddingRightS PaddingTopXS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "Row"
    }, /*#__PURE__*/React.createElement("input", {
      className: "Search",
      value: searchTerm,
      onChange: function onChange(event) {
        setSearchTerm(event.target.value);
      },
      placeholder: "Search by name",
      ref: searchElement
    })))),
    alternativeHeaderAction: /*#__PURE__*/React.createElement("span", {
      className: "DropDownWrapper"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick() {
        return setShowDropDown(!showDropDown);
      },
      className: "ButtonCircular",
      title: "More options"
    }, /*#__PURE__*/React.createElement(MenuIcon, null)), showDropDown && /*#__PURE__*/React.createElement(DropDown, {
      hide: function hide() {
        return setShowDropDown(false);
      },
      items: [{
        label: "What is a wallet?",
        action: function action() {
          navigate('WhatIsAWallet');
        }
      }]
    })),
    bodyClassName: "PaddingBottomXS",
    body: /*#__PURE__*/React.createElement("div", {
      className: "ScrollHeightM PaddingTopXS"
    }, dialogAnimationFinished && /*#__PURE__*/React.createElement(SelectWalletList, {
      setWallet: props.setWallet,
      searchTerm: searchTerm,
      onClickWallet: onClickWallet
    })),
    hideFooter: true
  });
});

var QuestionsGraphic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAHQCAMAAADgcCJ6AAAAXVBMVEVHcEwiGxq6jYEwExPTf2RKx+4uEhLSf2PSfmMvEhJKx+7UgWYvEhIvEhJOJyJrOzGHTkCdX023Y07Ab1bOd1/SgGPXhWhKx+7gm3roq5j/u6nx3mbu1MT37OL///+EeM1aAAAADXRSTlMADSZMUmqDg6y4udfdNJi0SgAAHCNJREFUeNrsndl6qjAUhU1KBIM4hej7v2lBxSBTgATF7PXflc+eVtfaY6BnAwAAAAAAAAAAAAAAAOBH4ELKW4GUgm8AMQr1bzXgAVpU6r97YANowO/ywwJUMfK3LYBCEDz8NgiSQOCImwW5AQFT6A8HEOapP6oAUQr94QDCiNtI2AYECHvKizaAKPI2GqwDAqRYACAFUKboAJACKPOUFoMAUXhvuhdCogaEjxg8AOQSNSBwhCXTC9SAsBG2w1+BGhA0oq0/a7wCBggZYV34MhggZLh91H9rBDcgMFr9HwxAi2aTBwMQg1nnfIkeIGiEbcxHExg4Ylh/gUVQ6HBpFgBtJAwQPlwIwXryA+4KIw3HJpg2EmdBpCkKALYAhMFhMG3EDQmAMgJ3BJJG4IZA0gg8GUYaiWcCKMMkHgmgDIf+pBF4JIg00J82EvpThkF/0nA8Ekwajr8SShqBB8JJg/afNhzpnzQc4U8a6E8c2Uj/OP2lBW7/o43A4T9tkP5pI7H8IQ2H/rTB34BYEYxzHjXgfNGqzKH/dykVj+MkSdM07ydNkySOogUadIn+/xtUqudTSZPYqw045v8PUkR7qbouuPajS4ZtULhg4wcB/ReHl8GepoXo07DYIPViAjQAi8CKFP+o6/rqyKALkoh5qwBIAM7pvdLcWfQpJkgiPxUACWAG/uLczjIekJgAZlX0ZIk4d/BAOrMUMCSA8ap/KNLneiCeE8ICCWAoPKLorvp1VXi1gEAC6A72FcT6AP0WmFoIJEYAM7fFydqCfUYaiCcagPqfgCpk/yXdRzggjSYZgGgCKMP9J3WvoS59QyGbYABaHQD/rTxv43xSrklA0hgB7vuaYHQ35MfjxS0J8LCfAQpVeMP50G2BlI/+jEJUP3zha0kg67aAj5PCn2Pts5xSlwcqr0moSvLZe4dTlh2V+0D426ww5B8HeIUyuta3G9RLf3Mpn/eTLocsO3U1AhsClHP8GkM+r4mtK0tc6rzkq7ti5g8rHHA4dzhg0ZtJv8yqkv3zuF6bC12y5k0DtF2ha//klJ9/zIo60NEKhuiAQvl1ZXut+vO6udp2hckAPcliSl9QOuBwCdsBbAV1XufqQd4d7PmQAa7q7Vr10qFXKj3FAdnJ5oD2fxf2Ew7h31e+3cW9rlmzvfn+l33y69vFrgQw1QKnrLMMpP0nwXL9pwBfDPoy1isJOrXOhy6aq6r6dvvRTl9WmZIDDmrsLCDWfRD87aDvDGFlzfb6XdLJw73TaHDMSi7jHCBW+zjQ56XXyhLsun7RR7oe8StNNYBxwHnURkiu8HkA9nHpTQjbe/P2K839Ofey7k39xiIhH2+bw90BpzFb4YlPhLK/giUbRh59RvtCrCfXPq3bF9tNYDEFLE7RhUxdDuU9DuBOBmDbXfZgv/vbLACPk+tnyDunc1u51+9Pa33ydnBdXy4pe0N5yTodkAwaQFjkz+rsfKeBKF4w8h8bOvP1hF3sM/zUJ2J93HsZVQ9OD5nO1jZAjmwC/7IGe59JIFow9HVtvB4O9iW6OP+ocb/isdsBvP+JEDGsfxtfDuBLxn7nyZvuC/ZHrHtu4zxjKpK9EWxPg2n74x+p/1IO8B78WrdOY9rZ/jeC3eLofEwbcFC2IsCElNKyBdplnbj3AZHX4Ldle9Ucr9dT2Se8ybG7wdPTAa0iMJ2/rJvdquQfyvbtD+yjTbxXam9pVBE4NovAdMoBwH8R4O7yP2ax4dbO+Uab1aFNnhtTBLKz802C22yBFBC7bshUcz/Xk+2VWmBB912qtzpuEsgabQBzMsB+t9ubr74V/tZNTijRPpgElO1TyjrbgNihB9iy+9cvC7DvhH/3JoeO/o8MaH+T56dMJ9c+cNdY/7G9kwFYMu8hSN1zq5252/oH5viPcqiKwPzbhI3g+207J7BPpH/9OhHLCWZ7B0wKOLqmgE3zELAywPL6a0U92/tIAWffTwrsZxuAO0z3l0YTpHLIXyZIbR0FD84p4B1WZYDF9W/0e6BzIMqtKeDk93GxbWWAhfSvWRrlfhjLJ3PJOvvAd+Fmz4X7Jer/Y8WTB7zK80nVD2tbCjh6TAHb11pg6nemdvV7bsDDcDdcItXQINA+GE5dwn9vjgM973/yeroP4Nzmn70zW05eB4Jw7KQIKTCLZKkMP877P+ZhV0LskY1nRuJUf7e5y7Q13aMFDUJEji4BLM8GvH9V1bMLwIfvAfF++hJgyG3hE2Z6EnyfLavAF7cBrGH4n6COfDGuurKemASL2XLaudD5GAFg1R/dBGKbgpWdYAPDmfCw/jM3gKNW4fclgoDtXAIW48o//VBwMSQBwu8/Qz0wCVb2ORtYfFWPzAqZHWCH4gtMA+9JcBOxgUOvBMwUtgDAyM1yR/y16twReO7zX86uiz+3AwRy3G3gdnQPKJa/jP/128cC8FpsO23gfFD9J3/6PGfAwCSqThs4pv5T7wN7kJJ1sIGjesAXU/nfPjxIybbTBn5G/T/H/Y8z0++AgCE4N6YHLIYd+1lOvwIIC6jCaRxgx/SAMrLtz1V/WEAVnDlRs/WAgq3+6AAq1MSeUN3ZA+a0ANjqjw6ggqW2hVedPSDSApbVjKP+6AA6OOpw2ObeA1jOBWEMnCPUtrANPYDtbCimQJlB9oDqxnaACShYX4PEFEiJmuoB6879gJ4BEM/0BxZAG3NhqgkouJ6AggVQxg4yASZmAt5vh/6YwBRAjSCAv1RdQXCuIABMAfSogweYYAKKJWsLgAdUxFlbxy6IVNHtgOKL8y1geMA8MMEExEdBBdfnDw+YDS6YAN1REDxgJqzuJoDpmjAE8FqsOycBb+J4kAfb6oblfC4IKfBVsGE7QHNDcGgKbHb7w37ngRzVjbWmCxwmgN3h+8LBAz95IGwd6QJXk1+KYB4D7NrvO23jweQNAUu6wErTBX7GF/9z+QPoA0L7AcEFGkUXOI9+/seaQwF8mDM2Gxc4H1p/dAEergLIxgUuIuv/r9LDCU7HXMjGBS4G9H80AUbCqRDCBSoOg2kB3NLfYxPwQOBoaNgRtnoxIGoAsATwUvcLYBtcoF4M8BTnBgAXwIrrF4ANO8J6McAT7L978eBZ7JAYkIcAvvtBEpzYA2o6BujlwFEOILD3gP+dgBAD9HJgxAHABEjgXOxgqNXKgUV0BoQgqMePGKCVAwt6BgAXqMqPGKCVAwuyA8AF6uL0Y0AR6wAYBWmiHwOK/iEABKCPvgBK0gIgByqjnwNL0gIgByoTcqBRyoFl/xgQAhDDnQ+GZpEDy94xIAQgx+VgaBY5EAJIgDNnXA45sOwNARCAGGFHmIgBqQVwgADEuArA5pADIYAE3ASQQw6EAFJwFUAO+4Fl/xgAgyAxzIUcciCxAmAULIbtFYAJORAC+P/SL4A65ECdQQAlAGwHS3F1gTmcC6UEgAMhYlxHgRkMAqhBEI6EieFOCnD0fqDOIKB/FIwUKIpzsQ1hqzIIKHEgKC9+bAinFYCHB0zCj0GAyiSIOBACC5AC7UEAcSQMFiAF2oOAsv9iGCxAErIRgEcHSILyIKAkbgZhJygFK91BQEncDUQGEOR8LjSDSVCJ90HS0H8iQHcSRAlgh30AMdyQEwGpBeBbRAApanPGJZ8EkQJo0ACk6H8rzJ4TwGq92Zg71jL+SFRcAIE9IqAQfQJwtd1stuYvc6EkWHqSAx4KluEqAOucq4/YE4ZmLjINKj1Ni+9fAFdb8wQSYbCM/lgA+j8f7vStm+cRCAOlj3H4UX4s/xM4fvWT4VdA6aM0Fwm0e5T/eRxD9UW6QDnsF8N2KH4O5T/CHQbws4EK8JX/CPNEAAIQxxlWmG0ABCBNbZjhHQcUHojCXn/mJQACkIW//sxLAAQgikT9eaMgBCAJs/+78cYIBCAJa/4TmgV4IIZIA+DuAR5IIdQAmHuAH8gO4+BMGgBzDvCB+H4Q7gOMwYjB2QP8AA44EJqRA2CeBQ34/FscCWFfAKzzTdN4Z5ObAB+lxbUwbgvo/wVcYhOwiK7/uBbA3AEu5Q+4pJOARcz941w4bwaw//5iE7rARcQA4G4wrwU41p9BAYwucB5pALgbyGoBjvXnUICaABpcDmS1AKH+jySLAXP6bhhuB7JagKZXAE0qAXzSERAvxHAKwJ1KzdIE+I6G0gLACyGsHvBe7UN7/IweFJBoEPBJWgA8EsYpgLsDaK+t9PcSkKEAdngkijMENKH+F34JwKcRwAcpADwSxCmAW6lv/8YHBWQogD0EICCA9nUEgBWAUwD2QQCPLsAmEUAJAUjQJYD6UQAPScAmiYElmQIgAMYUUDOuAG98eAoIgFEA9jYEeCEBtIiB/AJgSAH/sXetvY3jMDC9HoorttaLkpAEzf7/n3lxXnQcR7ZjUpSSzLdboOjecizNjCiKcm7gn6QIeAdBhFFwLwfqJ0Eyp4FpAsT3rFhCAqyvGNAPg9cyDSEjBPh9HwbRHQcHPAu4fP8IkGkJG2sIeEsAOh942ANIOgLoYoAxAsTt+zCQTAW6mKh/kGkHaE+D0ti9TSCZCHBECwClBhwlwPqtAMhEgAOafhBKDbj6N45g8/weMFitlVJaWx+pENycniAv1A6CBEhg8+T1B90gtItEgGEGLBcAtBJgAgHi5pnrH3RzDQWRBN5NZgCIXQuZOClwvXva1wJANTcwkQRuGLDuNwSD3M3AyVOC1r+73e4Jp4W7Zgg6UsC7KRRYS94Le/khMdA0jAxI3Q5fr9vir4P8tODVn/iy8Kf1n2kX4BkRQb0AvDIBdHMXJGbAMYDyJPiI/+Krwvbkv+r+RyQAxxJAqwBfmwBXBW+97s4SbwL0g8IozwEvWfCLwjUIfb6sQ7sEkI8KJBcAxREAjN7DWKI0ZqICULvLSWdzho0EIN4ESE+BMAosBmA6NTEh8qJB/Pl7gaK1gqSbAEv9yyFAP5RVJN/gpB3gFwmAHIwkIGQAx/pf0Ksx7taUK7rDuVuYBrFDAqAOpPnldDKAqf6lEOD4D890MDMEfWcFoBUBdAzgWf+LyYJtMww+Bug7GoCaADQMAM+1AJQRBZ435Iy7gO7+Fux3JE4CiN6NBP/cBAiqaVjPZcZyYHPud6Q+DyBRguA9JwEKiAKv9b/Sez6Qr8RDIhChfw9JIPmBEEEeAP4APg0gTwC4KcWvpY3kRlQH0o6LeQEeLz83AeSjQD2wGG94CjEkO/LoT+8egPGenwDiSZAflGOWeQkIzTCIg6AFFDCqaV6CAKZBYAPqjutTvF53sqpPD24ibFv9Jg8BxJOgbiX+IjSHGktFD4wS4IIwgQNwbFTPRgDxxyNVdwdAaM5v8fh7U+A7iwrewx5DlQfvQ/s3y0oA6SgwNHdWAGYRcNx6WLsCRxEuwD/LTwDhJAiawVR+xyjHxpcAxbcAzPqLQQ4CCAcBcLXzogvgJwDkVgBvAoyVAW3AhtOQnWFzWoByCSCcBPnet/f3JpSdnbpZo9WkhhJTZP1zE0A6CGh60KZ3NjA9aWkrP+tA15ZY/6hfiwCqWRjJ7MuuFRZ+FnNAFbb/XxPA5SCAdBKkm0WRTLj/8/4BN6jZOhCGXGARBJBOgmyThn/4x6fVMliFvcgZy39oE4ACCCCdBMUmCRXT0KM/OY7grDHW5TX/3rXwBRBAOAmKZlEor3Id6FIDXAuYQADejiDxICD65AIwXUIs28zXe2QdgeGKIYBwEJBeAuxjDeUGZhV/sz1js8nFgjcBEIuaQvVNc9fMq4XrbQ9ZKBDKIYB0EBAjLDqUsVod7ve3t0oTtU+VX4ACBRFAOgjYA3JfCxiuP4J/Ht4kAkAWAkgHAS1AFVX/7ZZ9JvqJAL4AAogHAS28vt3/+X35of5Ca8A8AjDMBiknCDjCqpzXw4/YniChA9wBYUgT5yaAdBCAag6//hzlj3v3J7cEeNcilkAAeR94AViTMZTdthBTAS0DQpoAPg8B5H2gDNayBEBMIAD9fLiyCcC9Ab8JUFgQMBTLsoeybwKU5ANP1c8pxNZbSRE4gQDKX7BiRRk+cF/+vGYslLkACBCgDB+4WfYhurYjVNtAtARwMm8EzS0B6IdEl+cDly3FmCWbQMEAwfojAfQrEWDZt2gbhILlDJCsf8T/kwwDQkrxgct2Y/vwIdJ6I6X/wDkII9dllctDAHkfuFmUykOij2w6BbLZz04SHEZvS2Y4DCzBB24XEUAtvNyx3mSuPh4GjtLZ8CfBBfjAZY7cLugIR+TtCU20A7jeqTh/DiTvAzcLVgAPqrqW8Bg9EmCMzzoDAaRtwDaJdBdBgRf8p08PDUkCqBMDuHMgeQI8fDBvREe88BDAoAs8M4A5BpD3gUkCpBbSQkc8jMMdkexzV96fGbBihrQPfDSTtbJDnhYTAJIE0P7CgK8VM6IwNon6PzEBfNLUGp+PAdI+MG4ecgCW9elPTrgDQpIA1ncY8LlihbQPvMOATUwDsk36pQbc3QFiryUUsjBA2gagDpiXyapKNeCRASEtbP0eyIAf6nfDi7IBmMjOy2RtlaMBkgNi3E03wOlPvleMkLYByIEDpqeyqtIFIMnpfjfAJ78QLOF+INm1UtlBr5FqWoLxZ3x88csAcRtA9/QH53ODGaDRBGA70De7DJC3AVQXiyuvP25q3ZvBHz/cm0ABNoDmYnGGO8WsCBciX10LO8kAviWgCBuwfBfQlX/+McKtBFi1+GZ2AjUTQJ0GQ9lqqu99GDUB9roh9INZB1ZrA2I0lbQAINweMKYB+xeDv446cMWFam0A8L4swwBwLXxaA2IKcN73mXVgtTZA1RP+3R0PhQgDO8AJn7xLQK02wFRy/osAl1gB3IAHOOObVQVUqgJtdeFfcEeEZA6oOx4gzxJQJwGglvP/mwUA0hIAhubD/XAuAVXaAK+q2wCCS+0A/mYB+GeF+GLNAiq0AUFV5wCid0ekUwA3eCv0gzUOrM8GBJVtoigdkhIw6iEJiPjmdIKyNgDggfpX1P6RfCcCMXAQ2MUn5x4gqQKDnv8dg6rlFtDQreDkDqDvjgfk3AMkm4LMfCvn6qz/cQnw6RzY9ReAPFFAlIOa3cllqrkBcINw9yQo3FkAEJ+cIkDQBuiZxfS6mlugD6RaicEwH5xZkKANgHmfs63nFvAD34FNTYf8YRQBkjbAznjrC1Q9F4BmweMGcHcuzBejCJC0AdFMfSYA9NN0/w1LYbgowPY7zykCJG1A91K0Sz7zWm/3H4q/lAS0fQWYMQmIojD4ZVs/nKLr3C+KUAKfCk5tg2bksdgPTgII2oCbYY/Ghev4xOjcDwqRImAbUMoLaz+8ASB+GG2ApArsd/ifXwLcQ+vTn1fc/BvcEZDmv0rPh8coaMUCURXYIphmClR14j+4cQIoFICpyZBfjD5QVgWixr9G9V//Hu4Mn5RAriMAJAggrAKnUECZmo5+z4DxBSCgAeicAWQOAqRV4MXr3eGArrL6MfoJG4C5qn9iLuQnJwEEw+CB1x8axF4O1nPt5wYwXn841B8FoBABpG1ADwEO3hnq/O4RfrT+UV3XX4oABajAZ0QYjQBM47r1FyNAESrwCeGdg5AMQKBbf0EClCMCXgr6qv6SBChMBLwIrO/qf1ECvEUAGYIHB3EKwHcPAGQJUEgSUD8Cdn+PM2Ug/xMKgt4igAjgTghxFMNPxMtEwQWcBz0DvLvAxzF0t/8CCPA2gsvhHSJM3gD+69dU4Dj4vQf8397ZNrkJQlE4aMbEUbudAPn/P7Wyur2asAjyajxPv20bs9NzOPcCikF4OASApPi3gdWxTwpCDfBG7tD/Xlmp3w5D9HOjD3lMQFmQ/Jb6d3bdXz8QbbwmADXgGWQKIKSt/jcbMVk7/BD52GDUgD1rPnw55+d2G5j26T+dFZzIAagBjgja7neC5LfTP5kDUAP2zvmeLlDxt538E3HfH4Ea4Ky/uwGkGv0k/xavARDznAjsBzh3/O4lQFrKT48DpYwA7AmbkVJvAOkQ/7ex9nsbINZyENpA4x6vgr/f8C3sL9JdXcO7HV6Ie3Y8ImCj36dFHjmrL5/WGBp/wywgqQFwW4gW/iCE4d0PZvl3pnKbsglABOgQvzZ8cUf/TJvSAIgAWqqVWgPIxPKPSwEpDYAIeErOSes3A4inO2rVJ7ABYvUAmAhI/p729Ih3BvkvlzqpAc4eAdpyLwXnqiTkkH80QLp1gBMuB0qxKvcyQL+34O4v/0jKFuBUfaAU/H12r633yTv/FU2yvYBzFQGhG+zB9O9uwVRiSQNg/L4PLQJSilUhfyxZu4JzIQvI/pcISHBf4MQ13BGIpbBIe6lL+6CHT4VVf3JAmrsCqQi4nX9QvAvEg+Axyv1S/Rj61H2q/J+4u94GXdJZHlLwCWFOex7+t4+jvoI17ff8r4n1BXvmgiLOGAq3kiPMac9HvKv9ousLnvyvJmCJ1FdzQRsH8JdJMymQ6IAfyX++S+pXcuLM7rVDP9CUrxhsVgPk1n82f9tfkR5a89f2nD9sBzuPqf/99mnikwNc4tZYF+hfcqGr1lKzGcP5i9amNp4btm4p7UPFfcLczwdVAZvpFTfXBa0rhNYqv8zOdVZL19vrxY/W8pUBOcBiPZ06Q/txuZXWpCC3vij9lPPQw/1M4nssCoutwfrQlmtJrtAbwFzulzVkJKL2n1rztVx3rQoLqgvGdnE7AaTOQK+NYcCp3Bbd53X7G1T3/SvvUn9b7UPqtObGLZqn4DzMIr2H9udI/XjPi0khqOEnWSf4+9QgxUKCdeifbeAvYad+ZvTc2s9UH7o/bKaD9sT1XBYYe71z1ntYAMP+tBaA9Ge1gFIe0kdfFiiQUXkMemfY8WNA8g7K+1DdjumBTg35rz9xH6w6Cex6oFrQ3b+rfJITt8/E9Va0CbpZ97XYbfQn685FdbuXVQ5UzCvZf6vwfZIHK85Fdc3sglF0pTqNdgPp7qw/G6MNEvqg+xG9Wome+71LQBlBOeHedYHM0CmtFeNV/359ff2pX+MdBigWVlWjH0ZuS+4zy59dl1TfvD8FwfzVayK/dQVExb+AYxJwaFrvFh6TgEPjHeDMP0NARryX8dADHhtv/bwdBLLineDoAQ/O1MPl+zzIzDSC8yUIyMxcw7P1ECAzngrW6AEPzpzh2dYRQG4GRZtvJRFkZuoC8+0lgMxMIZ6ngIACmLvADB8GRTBrmGUSCUpgSvEcDQQogmkxN/1nQSG0gwI94GmZ63jy/gFkpW7avm/bhpGKu72jDl5XV2tghaPQ9PSyjMkAzf4esG7p3WuwwAFg08uTA7w0p/8WfUj88hXgyBjRa/ohzHsT2UAsHKC4wAcFwPS0gw7mfu160DvgPynfxwHM4hPNoKW2VMvuSgwuyAoz0A9aGqNc7GITJRQB8EBWTPrXg8EAZswGIMa/ggdywvYYoHU3QD/oqeGAvLAyEwAWSIVZNrthSzi3kz0MkJkN2UIFwG8R0MAAmXGWrZ81CxICDYMBMrOlWt2u1Tem//bF+lUvWTMYIDsWso37d2ozcBQ/AHUzXU5dDfoXAfPm8v0nwIWgfx6Cy8QukP9gOI/5KJeF9HmJqJAhEy7YEC6LtTzYsgcAAAAAAAAAAAAAAAAAAAAAAAD0/AOU5ijBfZTOtQAAAABJRU5ErkJggg==";

var WhatIsAWalletDialog = (function (props) {
  return /*#__PURE__*/React.createElement(Dialog$1, {
    stacked: true,
    header: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM TextCenter"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL FontSizeL"
    }, "What is a wallet?"))),
    body: /*#__PURE__*/React.createElement("div", {
      className: "TextCenter PaddingLeftL PaddingRightL PaddingTopS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "GraphicWrapper"
    }, /*#__PURE__*/React.createElement("img", {
      className: "Graphic",
      src: QuestionsGraphic
    })), /*#__PURE__*/React.createElement("p", {
      className: "FontSizeM PaddingTopS PaddingLeftM PaddingRightM"
    }, "Wallets are used to send, receive, and store digital assets. Wallets come in many forms. They are either built into your browser, an extension added to your browser, a piece of hardware plugged into your computer or even an app on your phone."), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS"
    }, /*#__PURE__*/React.createElement("a", {
      className: "Link",
      href: "https://ethereum.org/wallets/",
      target: "_blank",
      rel: "noopener noreferrer"
    }, "Learn more")))
  });
});

var ConnectStack = (function (props) {
  var _useContext = useContext(ClosableContext),
      open = _useContext.open,
      close = _useContext.close;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      wallet = _useState2[0],
      setWallet = _useState2[1];

  var _useState3 = useState({
    blockchain: undefined
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      selection = _useState4[0];
      _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showConnectExtensionWarning = _useState6[0],
      setShowConnectExtensionWarning = _useState6[1];

  var resolve = function resolve(account, wallet) {
    if (account && wallet) {
      var walletMeta = allWallets.find(function (walletMeta) {
        return walletMeta.extension == wallet.name;
      }) || allWallets.find(function (walletMeta) {
        return walletMeta.name == wallet.name;
      });
      set(walletMeta.name);
      if (props.autoClose) close();
      if (props.resolve) props.resolve({
        account: account,
        wallet: wallet
      });
    }
  };

  var connectExtension = function connectExtension(wallet) {
    setShowConnectExtensionWarning(false);
    wallet = new wallets[wallet.extension]();
    wallet.connect().then(function (account) {
      resolve(account, wallet);
    })["catch"](function (error) {
      if ((error === null || error === void 0 ? void 0 : error.code) == -32002) {
        // Request of type 'wallet_requestPermissions' already pending...
        setShowConnectExtensionWarning(true);
      }
    });
  };

  var openUniversalLink = function openUniversalLink(platform, uri, name) {
    if (!platform.universal) {
      return;
    }

    var href = safeUniversalUrl(platform.universal);
    localStorage.setItem('WALLETCONNECT_DEEPLINK_CHOICE', JSON.stringify({
      href: href,
      name: name
    }));
    href = "".concat(href, "/wc?uri=").concat(encodeURIComponent(uri));
    return window.open(href, '_self', 'noreferrer noopener');
  };

  var openNativeLink = function openNativeLink(platform, uri, name) {
    if (!platform["native"]) {
      return;
    }

    var href = safeAppUrl(platform["native"]);
    localStorage.setItem('WALLETCONNECT_DEEPLINK_CHOICE', JSON.stringify({
      href: href,
      name: name
    }));

    if (platform.encoded !== false) {
      href = "".concat(href, "wc?uri=").concat(encodeURIComponent(uri));
    } else {
      href = "".concat(href, "wc?uri=").concat(uri);
    }

    return window.open(href, '_self', 'noreferrer noopener');
  };

  var openWcLink = function openWcLink(platform, uri, name) {
    var href = 'wc://';
    localStorage.setItem('WALLETCONNECT_DEEPLINK_CHOICE', JSON.stringify({
      href: href,
      name: name
    }));

    if (platform.encoded !== false) {
      href = "".concat(href, "wc?uri=").concat(encodeURIComponent(uri));
    } else {
      href = "".concat(href, "wc?uri=").concat(uri);
    }

    window.open(href, '_self', 'noreferrer noopener');
  };

  var connectViaRedirect = function connectViaRedirect(walletMetaData) {
    var reconnect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var platform = platformForWallet(walletMetaData);

    if (!platform) {
      return;
    }

    if (walletMetaData.link == 'WalletConnectV1') {
      var _wallet = new wallets[walletMetaData.link]();

      _wallet.connect({
        name: walletMetaData.name,
        logo: walletMetaData.logo,
        reconnect: reconnect,
        connect: function connect(_ref) {
          var uri = _ref.uri;
          var name = isAndroid() ? 'Android' : walletMetaData.name;

          if (isWebView()) {
            if (platform.universal) {
              openUniversalLink(platform, uri, name);
            } else if (isAndroid()) {
              openWcLink(platform, uri, name);
            }
          } else {
            if (platform["native"]) {
              openNativeLink(platform, uri, name);
            } else {
              openUniversalLink(platform, uri, name);
            }
          }
        }
      }).then(function (account) {
        resolve(account, _wallet);
      });
    } else if (walletMetaData.link == 'WalletLink') {
      set(walletMetaData.name);

      if (isAndroid() || isWebView()) {
        // Universal Link
        window.open("".concat(platform.universal, "?cb_url=").concat(encodeURIComponent(window.location.toString())), '_self', 'noreferrer noopener');
      } else {
        // iOS standalone browser -> native deeplink
        window.open("".concat(platform["native"], "?url=").concat(encodeURIComponent(window.location.toString())), '_self', 'noreferrer noopener');
      }
    }
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ReactDialogStack, {
    open: open,
    close: close,
    start: "SelectWallet",
    container: props.container,
    document: props.document,
    dialogs: {
      SelectWallet: /*#__PURE__*/React.createElement(SelectWalletDialog, {
        setWallet: setWallet,
        resolve: resolve,
        connectViaRedirect: connectViaRedirect,
        connectExtension: connectExtension
      }),
      WhatIsAWallet: /*#__PURE__*/React.createElement(WhatIsAWalletDialog, null),
      ConnectWallet: /*#__PURE__*/React.createElement(ConnectWalletDialog, {
        selection: selection,
        wallet: wallet,
        resolve: resolve,
        connectViaRedirect: connectViaRedirect,
        connectExtension: connectExtension,
        showConnectExtensionWarning: showConnectExtensionWarning
      })
    }
  }), /*#__PURE__*/React.createElement(PoweredBy, null));
});

var ensureDocument = (function (document) {
  if (typeof document === 'undefined') {
    return window.document;
  } else {
    return document;
  }
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

var ErrorContext = /*#__PURE__*/React.createContext();

var ErrorGraphic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAGHCAMAAADx+xo1AAAAeFBMVEVHcEweFhTcf2s2ERDegW3egWw1EBDbg2s1EBD/h4fSfWM1EBDTf2T/h4fTf2Q1EBDVgmYvEhI8EhJWLCV1QTWWV0a3Y07Ab1fOd1/PfWLXhWjUlH3/h4e8pZ3br12tub3ppI6hyNaY1Or+u6nx3mbO6/b14M3///8kXrGSAAAAEXRSTlMADSI/RWdshpqipsDG1OPj/QoziQ8AAB1ySURBVHja7J3bkqIwEIYBQTwLEUxgvNiqqZp5/zdczkFDEhCiPaa/q11WZcf+6f67ExgHQRAEQRAEQbSszmTlIPZyJmTvINayJoRsHMRaigRwdh3EVlZFAlg7iLVsCgFgArAXl6AFtJo1VgC72ROCUwCLKSvA2UHshZQK2KxXK9ddFaAdtI0N6YHlwD7ccy/6OBO0EHe97zSAHYGl1PV/TXAmZDV7rABWsyG4KmQzG+wBrAbjbzdr7ACsZoXxtxq3ir9bdIPrzX6/wUpgG5UBwGmQvdyNg3GHiH3cZQBcILYQtxgEr9elAzhjBrCcd94m4HolfkEQBGHBruRQc+qIWnKBaJjurc1nlR9bfn5xmuJk1VldC4agQeCNCIJpE1hGuQ1xHd46qDkAIjnZidOKqFaQ5zl/g+Ptdtv62vgsORF0q1h3oT6dQIR5vkqyAtbndNiFhRRAZxH/VnEMXO1MyH063s2V/TnRViuBy4ALIfCBZgSvFoAuDWymNwGeH4RlxHMrKWTAHmWwC32AySC8dRwD6asmeUCviLylcX9QQTagggBaKvDCI9fA1pt5q6AfHj49x08VAXvkEPoOLIKjJg2sR1kAN9hh8Mdp4LQDpgFve+OIEtiPsAA+Rn+SBhg0DfTSgD8ggI2mjmDRfyIPhLD8QJcGQvGBQeeV6o27HPmINNA0hQP/KQz/IgxI4ABJAscmAUwhwNL/MRKoS8B20uV/yJHZhQCIBJr4Q7z8m5FK1jsdow2Mv4peK+6OdS+L+pdh82n6ExtYjyrOLkoAgB18Iv5Gqn/E6vBk94FtYtseqw/pj105THwd7cLL2iOUn5fyYw+6K8Uzg+IDBMJ3j4nDeg702vRf5sPqy4iGgh2Jgb1mbWDFY1n/WDRwrIu1KJRs4BRMeYyyOUkgFSVwem8dCKbHf37rT9XfOmuDLR6LRgqA9Y8N6InKj4mnFXXXnOSJlJAmV7EnfGMS8G5TGwA/mp7aaU37TjY2EpoM0J5Ac2XTSafV647dv7d0GRNgl4QCSgIeXw4yFH+m+9bFY0xR29nAlZgN1vaO9likS/djKw//OH7aCSQkEZ2A8y6OveUgE/k/0uZiUSc8d9DW3d+b6dJMZQM9VpQ/vo7eva44IBo+Ljt+TNSYLqFM4UpICqYM9JeDjqE3P/5RVmX8oUvsOvBtRt1X3ATn0WQt344NNuiZ0H4+lPfqx2o9oOgzJ0FJfKGPZeB9DWG3HKTfJij1/7z7Vthxeh/sqpf/w/S1zWUyyhFkl5ikcIyA449MAzvdz6X0zzT/MKoSJVoKmo146yUWk8AbFXCXBo6e7DWqH0l0cnwkV9fij6SqDN3P1ko9G6UAkkJSQC8NbJ81AHdV0ULu2xG9AuIElAK6bYLhZAMgzlo/9IIf3/L8SQWUaUBaAvzRVwC1M/xCM6tXgGgE3tcL8H39kn84jZv6ZbYGv+lvJlheRioFQOkGNYQ5Moa2M2Dj5gGFFXxQwLsmQho84wOZjyGjo3veNBYVsHNAgglgCqO3kyS1AoCsC2ACWJ5MM+68xJUPgNUKYAJYDKYbClBSKQC8DZi/CcRO2lGxxgbECXAbEOTIU3TrypoiEKewi8D8XYCWQjsFaIpAfIVcBLwceQ6+11VXBAgF3AmgBZy/PEBVI+GSC7CRMFaAZehygMIoxKINODiAwAqwgAKoahjQFIF3+EDfwx7ANKx2gdoUkLw+BZT7gLZYAUwT6XYKXpoi8OIU0GwD0+UAN0cM06SAy0tTQBN+/XMh/BwxzetTQG8TaNB/2puPTeA7aFIAoS9KAU34H24M9I/l39ACGCTSpIDkJbMA/ojI6g/bLvwVaAGMweTdQNqmAPNrQiG/AcB3OgH4nSjQApiCKbYLR2QgBRhZEdjy8Df3hh7LksCPogUwhXIilDQpoC+AwDFAF2guh174gxc9D8ZKlNtFaVyTmraBddn3+/mAhx/3gpikXRhS2kBi2gZ6xyb84lPjcQxkGGUKSNsU8NJV4YCHf84Y6N/3z8/P91eOjLpzSlIDxHHgyTFN96tjZqwE/fv5bfjJkTEpIFLVgJgargGiJTj6qq5RH/4emASUZGNqQPLSGuBt5z0U5LuIOipg4iiAAaoBMzeEd5c/VoFxNLeNKWvA9aU1QIOriz8qYBqZ/FkpSVsDTM+CFtsOVscfi8BCXNsaYH49YIDpXWBU1n9MAcsRxQ1XQCZA0QR8FdHGFLAkrQlIAZmAna4AiHznyHMkbQ0AZAIOygYQa8CiXOMGQCZA3gX+SsmR53YGZa0AUjgmQJkA0AQ8Pw5iKhOQgDEB3hMJ4PdfjugHwpnKBLxsc/DTXeA3CmDmPJgqlgPily4HqAiULQC2AXMeJ6lYDohTw9uCZo8Bvn5RAHPXBDPFKCiB4gJ3sgqAApi9NYwpXOAFigs8yCoACmD2k4OowgUSKC7wJKsAKIDZG4OULpACmQXKtgGhABYwAapZYApjFujJKgAKYIEaoGoDEhhtgI8CMAKTbg5uBXCB0QYE8jEgDoLmuoAsV7UBpm8RnDUG+EIBzCZSbwmIYbQBO4UHxMUgEyRdGwBCAAeFAHA52ARp1waA6AMlAvhGAZiC94EgloNOKgHgjiAD8D4QxCBAthKAXaApsq4PhDAI8GQCwCbAGATSIMCX3RCAFmA25e9Ujgb7QHE5yHkXvmwpAC3AbGT3iV+6PhDAgnAgEwBagDxfYj2IKgYBVwACkO4HQguQL7EaoBRACmASJL0tCC3Af/bObadxGAigXQRCQhVybh7bUWm7LOH//3CTtonTdWwnjW9h5zzwsEJlYU5mxtcIJwLQxGeC9kJDgxXAuwBlwgKQBhcCnPQAlOinAssEpgLfhYYTjgF8CQDDTFACU4FCCyYA4WRnsCoAS0iAX0JLgwnAxTwAJUnPBT/p/T1hAnDSBRL9prA8vgDPQk+DcwAOagAYFgOy+IsBJgFOWABWQhiwycWAdAR4wRviIiAXA6KvBr0KAzXG3w+DADRtAcQJ4+8FuRoUfWP4m7mGnbD/8wCRq0HRlwP3wkzd4AqAezYkwPWu+Kb5xKffIQmtB+PbgmIglwNRgJ8NoxR40gIIxCM8/Q0BAvEI0A6esABPAvHIVQCGAvyv6ASg2Y0itgD41miv0AtgECD2njAUwCugEQCSEeBFIB5BAf5zbj1AwrtCX8UMTqcTbgNz+g5Jlt3I0xegbnApyPlbA/h2BPiUewEwCyyHTW8KJMkI8CbMNLgdYB2cMTHBVgRocEO4H/LsRux94XthgDS4I8wT2xDghMeCfTEIAAkLUOPFAN5IRoB30wAAjwV5YxMC4NUQ/khGAIIHwzxDiPloUOSzYaYhIN4OtB7STQSRbQqAZ8MdALQFTGfD4grwyzAGwAviHEAvpCvAEwrglf6SmC0KcEIB1sNRgP+bLQuAJeBhCOecXQB6gTHeQchYgDwvWiiDmAI84yjAMRyAWoCpf4M4N0Q84zyASzjQFcQ4GGAUAGcCQ4a/I/z50GfT5SC4FrAEsjr8LcF3Bb0IA9gDLur3nbAPfFOQUYBPbAHmQhh1RGADjALUWAHm4iL9R6kCL8LEJyaAwM9/8MHAizDSYAcwB6fxpzTkdWEWAWocA86AULeELAIvwszpPv5EIF4bgOAp4FXYDMAGMHABCNsFzD8b2mD9D1MAOnbBeBV26s+m+cQ1oHAJIGQNeBWIk01fbglXA1AAkWACCDgOQAGEvyEAkI8WAik3ASjAUuqOGS0gfPwZ+IBkmwAUYAmH4/n3jeOhNlaAa/ilAqk2ASjAbOrj73vOB20FgD8Ky5JAsCvjUICZ1O2zr3IQtvhLeJJdIArw2NM/VAKwxV/CUuwCUYBZtV8JvKwDEwb80QAowDa5e/y/Wu4UAHP/N+4EUYAtMqr+X989YwlAVwCalvsUkN44EAWYFX8ZfqmArALTCeC2iHaXAlCAzVEr4R+QYwE6RsZfNQAF2Brj+OsNgIkK8N0zrgI8uSMiKMC8/P8tmagCRyoRMgHcGNcAFGBbnJXnf7oNgFEL4EYALAEpMIz/vi8YugAU4Cci539sAhxRgB/I0ADaBTiPBDA1gR84EbQhzjYBRpNB4ybwikwASQuA74wyNwDGJnByPpj1wZYJ4IFhYLBrY1EAUwEwpwDNgsAQ7SH+EkhuORgFsBYAmQPU/K8ZB8rFgH9Wg9LbEIIC2EYAUgF1KUhi2A2Q9EQgCqAtAIs4u14ODjUKRAEsHaAddTkIHGwI2YUCBXCRAGQLYDKAJ7glEF8e7j4BtPCp+IsUd4WjAPohwPIOQMJXbgoOd1EUCjDJsviD+VyQPBuU3DQQCuAgA8j464+G8UTPBaEA05BangGzcdQHl3903KKfZgXYPQlEQ32QRwElyvEwDzeEhBsDoABW6osHZ134vdwQEGwWKAUBeJEXZcVEYAgtu5c1rBDh3J4P9nNHSMgEEF+AMrtQhHSAVMXtpz6QEVoTWura/T3RETqA3e6XiEyV9bTPYxCgzIcfKdzg9KLAYOtAV0RsqiKoAlBmPXnJhRtc9oFBC0AKAgRVgPsIv9MiEHAO6EoSl79WedbjMiwBf46zkUDQBqDjXaTA+MmshCdglGlAOMaRASFHgCkJ0EXH18MpH3+vjrkwYB8+/skIIETp8fm8yzGFnxHnegPeguf/lr1IBurxER0nGOEJvpn7YRMVQEDuK0rSrcy5W65eHBch/Xe8iYTwZUCVhYj/qjIAwTaCpyzAOFKFu1aw/VTXc3+OXx8FjMUpAD4E6FZNju26SfulnTMXiygyDwaUmSR39aEGBWB5+FsCzwD7Oh16OKpLpoe5hbq8xN91t15mY/Ky8u4AX+IAAGM/RoCDdt28nr9EI8ldGFBmCkXlf/6TM5hhQQWsJ1IP6PJgQBt+PUfbcsCA2ypQZlPk/tOALRVUVZvwcjawi4Q7AWTy1xhgDr8fA5T4K2tB9o0gN+qHuwLOGNyg16/F9Tf+SQLU57tDlF/zBQA1/M669irTk1fWblbuCZSbgFZAlP9WwXred5FwtC24j//oBK1ys/qSGLmZDwDLZ3NTN6vdBrieCQGCLwMbBKDF8qnYIf6SWQmAXx5/XymgyszkoPdZj1WBKresZpSqAKH3gZgE6NpxeKj+629QOItJ2Dj+3e7QqhsXAQfomqSuS6LrdpzePvTykdcPLe6Uo4/0M+famneKeQKUrCfWRODuaTpvVo/cpmC4QkPzJ6vk6JxyEQgC1TDjUFgFWJ4Eqsz2BBX/ChBvIlAnQPlAAfi+Z1YDcA2+h+VfG/w67VTOPR4upbaOakspACHJC7BT/zSLBThM3qIzawhIYwS/h1UVmTmmVfLa0fJ88363MDcJUDHG4k4E7nZksgcolncA6iVKsgHYHkMXqMj9ZasCeZfW5AYBMvUdN6roE4G73fu0n0TMx5YAfL54mnhqHWQRULtb82/Fh94CaAeb+I4eGn0eSAqg1LClFUAbfxcjZ93qUX4ZPfioI7IIqO2tMa/RSwk1CQBZDyQgwH66i60WC6BvAPzQTSD7PFAgi4Ba3gxiyz8foRoBaNYTfyLwL3tXuJysDkSRQm2t2hggm+DXqZ3Off9XvAHFYEMSohBX5PxyOq0U9mT37G7YdBCAKAr7rJX/wtq/qSCMt5dYBQFTfLMkAUztERTm+hS9fyGwa0cI30lkt1SBtAqQG4ca+73vJj8FCr3MerpQ6cb3dS6ANkkAZwYRWCAqBDYE0G+B+xLgP1MFyI3Dr8Kht/39GbA/tK5zcAcBhwv4NvYfslIRwFYJvn8hMIqWhn+w8JZLXT2Ar77m96IAtOzf/siHvVA7CNhigL68c0UAKDXkmOpAUWq8h7740g7V9BAA5PCrw/U32bmjC3VNj/bpHO1/dewdd+ZIBPalafUoAnBbIRBBHShKDV6MktvHan77LX+Ffrs8cvFXERZ2++s4XCkDjP6NqPhJTHWgDFMdKEpMpUp281C1H1/7K/Tp8ucaJ2ys/e3GoT+3exGgaHki3h0Byl2DAkEZIEpMSyy/+XDt/TX2d9slV/bXVlXhfaV9/1vTy8GOR0eEKEtbIRBBGaBzShDziwHltfYvf40ojRBU7fDX3EI25JUqfHe2BIwSV1C384RdAwxlgE4ClNQvD/i60v77XyP2rm0+RbdfEHYH4C8EfzoYYL7FouZmz31KFEMZIIqMXjYre+PHtWvG2ywHx/Ojoru+Kga8UqfEbWc6BvWU9yRAhiELVP1g/Wny6xnwXZZjEeCYBBaGZz/klQzuTZHc4N2htCJHlQWqdqAPk3X82LfODumYRZHnrIMY8sfFoFRz7Q/7sntO94YwDFmg6gZ1xDLi+V6QMv/NBCgHhptq/mmuQQIWLgKgygINBBC7K7aGfn1LfO2HMMvge0gON1Bt/9PTARRtdUI4CHO3qAJgSAJkN8gcqOjYL1EejG55cDio5s+AH4MDyFvDI6HUwZElAYb3gyHAPA2JQyj733Qp0sWAvUHdQXtYiCg1MGRJgIEAZRZmnsIhlP1vvNS3OwDwtgMomakVVCBLAkyvh8Ltr+b1wj6Q+SX2zn6wW+Qq+1scgG07UJkj04BRYk1Xh99r12GXIObXt57sr55/8L03ufb8coC4LQlgODSgkQBwDFRj68DLjVpk/MtZN4W5Xxj/qV4SN7/mChcEAFsSgEQDms+MyAMFgWng8mkRZiKAwKYBzRPjBQ0VBCaAQu1HsEsAhqwOKEEcNzXCWxeTA6jF0iIA2FpBBYbNAI550fkwg3qmD5GpANAKAdzWCgIkEsA2LljQgELwgUEyrUUNTMLWCaBoJIBtVCAbYFDPEyDrGDfCAUipQ+CTANZBYcXMADdy435EiwYskFQBXIPCspkBDpDc+IisEgDBS0F9Do8kDQNmHWB/QBnxGoedIWkEuE8OE3SgoZ3TBM+8Hg+hjQRAkwTqaYDe5JrrASYAVa8l+kkAPBHAOTGc07FO8nl4FL5zzfPmDzBFgCh1urmxhjA8NoQK6GUbwMBEiAxjBIjiHndqdAJQZFkWZvr6nSCKLMsLMBxEqMd/aIqAOgTKCNDj/FiSG870g3zyErFhf84NQ87zzoOj7CEDTxXIrQIV3fU4UNBBpnqjxpn7lLWsrH5adJ8kbo8AaPoAbhWoM57mQhG6AS2nCqqfOSdy2u0R1VYgsEYAwCQBtVqgwwkoChS7FqYaAxqjKQbw3HLEqWBHEFsEyFBJQJcI0P1ehRyU/Se9b4TtLhkAuWU0nXIA1mjC0DQCfQ+QZdnuDPlxjFPecAG0u7QPpyQ2ByDQOoAo9Z/PqYNOzwmoqKchKywHSPPub0PrAFQlwA2iPZRQB/OGR2E1v5kAYO+snh3APY6LN2Bb9gfp8AKTbBeAl/mVBgDr11FwOIA4SdJ0+f6+2Wzeo1BY+s7pHuGIJ3Qw8DxnpRkEAEjZidy9GVQa/d8FghUK49ITvJsCU3IBbFdjqKHU3L0RIP33F+FcwHoY/zilgmA3xfltX0eZpQi41AgQTiampScIfUoC0PJKCOoeDhqfDS/Dfx0MArYKyCARckoiYNgbLPqMh47TNEni+KgHKh5E4bAcJEeakgfIfDJdzhgQqwPwPSp2E1QCXCEDBZ04AbQQYB6aI4BJgOvLVAa4tfl2FQ6C9opWQ7iAqWcBhWH5H0Ec2+qYOQPozggqIsTHqsD76HLA2wWQbLgIiRJ97w+YkwB5zR6fA0Leay0YNCM0uQA7rSfcEmRaAOBW+4P9mwqviRD/NERjIy59AXTSvQBS9Kl087P9idVXKvuvFz2McWn8MBnB6or9chO2/1+ZkwlrAAB7ACi4JgCdSYCqCoTQAJJ1pPQGO1Mgm5IAbACZ1v03EACsRVOq2d+FWNp8WZUFAhjeVg50A4pcopjidpAKXN2ejQDc6iYpU/YPadDxOwIzagYAsZYAMngQ+0fxtpzhDeLQETl/FPu79gerLQ98qpuA+0FwUF7fDkYLfsYau/3dLQGV9fKnnRjAgdUQvVQk41gmQg6TCzKFqeo+OzhrAKUTouDcWv97eUW0MbCXEGQtPKMPAOZBAAGt8J9EOhaUfkTIENsZwJ/bBRCmIJy/LFruvzP8v1BKI2xwpAIclAdokwLgGYShcNtfQfD2/o+HIYAzGRQnCoD2UGCKQUFwDlz88QDAe/2hWv5mAizwCQIVBUwgHNQjgOnKAnL2d6J9s72cnSX6K0gCvDR64AORIFhfqYsYqEcnIR6cD7zjxkS/myL9mv+flL4eP73SCkhcgN8WQc4UoPWzh1QGhGgB3yL53fZf2ms/b6dV/yKXP63dARakpOwNAZoyYgoP0yUUACq70ZntA6EFfzMB6GLxKh0BNgJ49gUEgKYLG5ALngDSOjIB7T/m14ob0WP1K8d/sv7HC6YQcM1OcaKiI2EtCO1n0PazQtxDKggOFVRBGyz/MXB/979NrcZUlaDG/K2ccIGEB8l2CPnELA5V7acJ21rg+tLWKVuZEvyVrKh9v1L+bhdQmf/48fOcDiChwJLcnkDx5gfMTgqhSk2d+pFc25/lACeS2cqZrIXbqgZ8nXqY7+Xt7fUY+aXd3061geoTDsSr8sanIWyaGgwJhBYqONNJQU5enJO2sTWnDS1jWy4LQ5SzSGV9W+R3p4SVLKyEARIXIOPAYNuE2smCxRKMWS0GpU4UbmnVcAfvuOIOwG2lCyJWftbXq4KV+69QcQENhqNAtUJAgnd5BW4hQLemVCAdyYfNyYyRpBJr3HejkgDN8qeIioIDU0BPHzVd6DC2MGeaRpmhr/YKQ2ak65vf46uMfwz/i+gVW0YYJatyNBAhOBdaQm4iBekghUVmEBhhtf/F6mbzNwT4PDaEPlDFgBrxMtyO0aaR3pcUHfIeyJ9vE4Mt9r/YLr0Cf7LZJAYCVKv/FA+QxYDGDYRM1onuJySEJigAxN9fC1ha8o/8+uSPs83fzpVgdFXBBmlQDmAHWaWRLxYdr/rq9b8Frr7AHf0AXmz9A7968dtJnA88taAuDixHSwseBOul1fruF3/jHklhhBmLpyUBsRvfjVQLAg+yX1hHkq7CpQYIQNardICEb6MFgcd4Y6AbsWTBE/iC7XqZDvViV/wv8AzAAKhpsJ2kOqxMnwy7Gpdhhv7cA/VMq9V6ElzYSoc/0nyGTfAhcHdAfCSDZMOD6QQZ6ZfS8sMu+o4gsBnzCsggyZDUZNgiJsNWGj7UTJYJB4FengEPGYg0ezi7P1kQ6EsGKRqCsmFbG11afVw/b0USaPTbI2FxDBTSOVSEGEpGCg7b9dHg9dCtwCvdxPx088RBoDcjFi80k0gkL05YdmLVfEiPSCrEEi+7ChEuJMv3gNMfHxy7Cte3xV53EqhKqskm8PjPB8fHTuL1+l02OwlUXbXL8a+zChzZgjV/MO2tipXxl6ETj4fEjT78cyeBamPFpjb+EC2l50Ct4q5ujC92Fe6W6j1LI2hMnEx4F/qMg2euAQZ34viSgLkGGFTG4UsCnrERdMc04BNbEjAHAX8vfkMYX+zQJQFzEPDWcTeoQJSF4LkRFK4YjFIDzkEgnApEqQHnIBDOiugKwXMQCOvHkWrA8/thy2jGmEoOYSG4FQRmFzC6GTEWgs9IZgKMXs3BqwErpJsQh4FOAUc7TkoDzgiiAvFtBpgRsqeLWgPOGN+QqDXgjPFdOdpC8AwF+4SE/9u7gxWHYRiKonkITMAL4///2XEndFzquEEhBJW5Z9GNQV3o2VEaaBrTMMx5h0fZow6Xgu/SXqJRN9menTx1+5jysw73A1/ESu3K78e50eG1TpT/4MdIi15ZHck9Aw6KSQspCEXd5/5Xc5ZNdVT6d0R5K8t/pplcd6S24DlI1rpjfayQghA0ZfVz75bBUYq6tkAGQtBgsnf7COdT6uQcIQMhhAoACbidYgWABNxN8s4AJp80mQFIQAhyHgHZ5JXKzgFAAKLwJKCsvf0elt/q0P84jrZvLlvP8toe5Jxnaf2r1NpPAAI5bp6ZrrFVov/B6KT5L4DXVcQ9Lm+UXHg2FMIlnfecCQt9D4jtCQAAAAAAAAAAAABvfgCECMuQGDaxMAAAAABJRU5ErkJggg==";

function ReactDialogStyle (styles) {
  let background =
    typeof styles === 'object' && styles.background ? styles.background : 'rgba(0,0,0,0.4)';

  return `
    .ReactDialog {
      bottom: 0;
      display: flex;
      height: 100%;
      height: 100vh;
      left: 0;
      min-height: 100%;
      min-height: 100vh;
      overflow: hidden;
      position: fixed;
      right: 0;
      top: 0;
      width: 100%;
      width: 100vw;
    }

    .ReactDialogInner {
      align-items: center;
      display: flex;
      flex: 1;
      justify-content: center;
    }

    .ReactDialogBackground {
      background: ${background};
      bottom: 0;
      display: block;
      height: 100%;
      left: 0;
      opacity: 0;
      position: fixed;
      right: 0;
      top: 0;
      transition: opacity 0.4s ease;
      width: 100%;
    }

    .ReactDialog.ReactDialogOpen .ReactDialogBackground {
      opacity: 1;
    }

    .ReactDialogAnimation {
      display: inline-block;
      position: relative;
      opacity: 0;
      top: -17vh;
      transition: opacity 0.4s ease, top 0.4s ease;
    }

    .ReactDialog.ReactDialogOpen .ReactDialogAnimation {
      opacity: 1.0;
      top: -5vh;
    }
  `
}

const _jsxFileName$1 = "/Users/sebastian/Work/DePay/react-dialog/src/components/Dialog.jsx";
class Dialog extends React.Component {
  constructor(props) {
    super(props);

    this.handler = this.onKeyDown.bind(this);

    this.state = {
      open: true,
    };
  }

  closeDialog() {
    this.props.close();
  }

  onKeyDown(event) {
    if (event.key === 'Escape') {
      this.closeDialog();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.open === false && prevProps.open === true) {
      this.setState({ open: false });
    }
  }

  onClickBackground(event) {
    this.closeDialog();
  }

  componentDidMount() {
    this.setState({ open: false }, () => {
      // make sure state is false first before opening the dialog
      // to ensure opening is animated
      setTimeout(() => {
        this.setState({ open: true });
      }, 10);
    });
    this.props.document.addEventListener('keydown', this.handler, true);
  }

  componentWillUnmount() {
    this.props.document.removeEventListener('keydown', this.handler, true);
  }

  render() {
    const classNames = ['ReactDialog', this.state.open ? 'ReactDialogOpen' : ''];
    const style = ReactDialogStyle({ background: this.props.background });
    return (
      React.createElement('div', { className: classNames.join(' '), __self: this, __source: {fileName: _jsxFileName$1, lineNumber: 55}}
        , React.createElement('style', {__self: this, __source: {fileName: _jsxFileName$1, lineNumber: 56}}, style)
        , React.createElement('div', { className: "ReactDialogInner", __self: this, __source: {fileName: _jsxFileName$1, lineNumber: 57}}
          , React.createElement('div', { className: "ReactDialogBackground", onClick: this.onClickBackground.bind(this), __self: this, __source: {fileName: _jsxFileName$1, lineNumber: 58}} )
          , this.props.children
        )
      )
    )
  }
}

const _jsxFileName = "/Users/sebastian/Work/DePay/react-dialog/src/index.jsx";
class ReactDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.open === false && prevProps.open === true) {
      setTimeout(() => {
        this.setState({ open: false });
      }, 400);
    } else if (this.props.open === true && prevProps.open === false) {
      this.setState({ open: true });
    }
  }

  render() {
    let _document = this.props.document || document;
    let container = this.props.container || _document.body;
    if (this.state.open) {
      return ReactDOM.createPortal(
        React.createElement(Dialog, {
          background: this.props.background,
          close: this.props.close,
          document: _document,
          open: this.props.open, __self: this, __source: {fileName: _jsxFileName, lineNumber: 29}}
        
          , this.props.children
        ),
        container,
      )
    } else {
      // enforces unmount
      return null
    }
  }
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  _inherits(ErrorBoundary, _React$Component);

  var _super = _createSuper(ErrorBoundary);

  function ErrorBoundary(props) {
    _classCallCheck(this, ErrorBoundary);

    return _super.call(this, props);
  }

  _createClass(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      if (error.error) {
        error = error.error;
      }

      this.props.setError(error);
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return ErrorBoundary;
}(React.Component);

var ErrorProvider = (function (props) {
  var _useState = useState(props.error),
      _useState2 = _slicedToArray(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      open = _useState4[0],
      setOpen = _useState4[1];

  var setErrorFromChildren = function setErrorFromChildren(error) {
    if (error.error) {
      error = error.error;
    }

    setError(error);

    if (props.errorCallback) {
      props.errorCallback(error.message || error.toString());
    }
  };

  var close = function close() {
    setOpen(false);
    setTimeout(props.unmount, 300);
  };

  if (error) {
    return /*#__PURE__*/React.createElement(ReactDialog, {
      container: props.container,
      close: close,
      open: open
    }, /*#__PURE__*/React.createElement("div", {
      className: "Dialog ReactDialogAnimation"
    }, /*#__PURE__*/React.createElement("div", {
      className: "DialogHeader"
    }, /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftS PaddingRightS"
    })), /*#__PURE__*/React.createElement("div", {
      className: "DialogBody TextCenter"
    }, /*#__PURE__*/React.createElement("div", {
      className: "GraphicWrapper PaddingTopS"
    }, /*#__PURE__*/React.createElement("img", {
      className: "Graphic",
      src: ErrorGraphic
    })), /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL Text FontSizeL PaddingTopS FontWeightBold"
    }, "Oops, Something Went Wrong"), /*#__PURE__*/React.createElement("div", {
      className: "Text PaddingTopS PaddingBottomS PaddingLeftS PaddingRightS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "PaddingLeftS PaddingRightS"
    }, /*#__PURE__*/React.createElement("pre", {
      className: "ErrorSnippetText"
    }, error.message || error.toString())), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingBottomS"
    }, /*#__PURE__*/React.createElement("strong", {
      className: "FontSizeM PaddingTopS"
    }, "If this keeps happening, please report it.")))), /*#__PURE__*/React.createElement("div", {
      className: "DialogFooter"
    }, /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingRightM PaddingLeftM PaddingBottomM"
    }, /*#__PURE__*/React.createElement("button", {
      className: "ButtonPrimary",
      onClick: close
    }, "Try again")))));
  } else {
    return /*#__PURE__*/React.createElement(ErrorContext.Provider, {
      value: {
        setError: setErrorFromChildren,
        errorCallback: props.errorCallback
      }
    }, /*#__PURE__*/React.createElement(ErrorBoundary, {
      setError: setErrorFromChildren
    }, props.children));
  }
});

var AlertStyle = (function (style) {
  return "\n\n    .Alert {\n      background: rgba(0,0,0,0.08);\n      border-radius: 7px;\n      font-weight: 500;\n      padding: 8px;\n    }\n  ";
});

var BlockchainLogoStyle = (function (style) {
  return "\n\n    .BlockchainLogo {\n      border-radius: 999px;\n    }\n\n    .BlockchainLogo.small {\n      height: 18px;\n      width: 18px;\n    }\n  ";
});

var ButtonCircularStyle = (function (style) {
  return "\n\n    .ButtonCircular {\n      border-radius: 9999px;\n      border: 1px solid transparent;\n      cursor: pointer;\n      height: 34px;\n      opacity: 0.5;\n      padding: 5px 4px 4px 4px;\n      width: 34px;\n    }\n\n    .ButtonCircular:focus {\n      border: 1px solid ".concat(style.colors.primary, ";\n    }\n\n    .ButtonCircular:hover {\n      background: rgba(0,0,0,0.1);\n      opacity: 1;\n    }\n\n    .ButtonCircular:active {\n      background: rgba(0,0,0,0.25);\n      opacity: 1;\n    }\n  ");
});

var ButtonPrimaryStyle = (function (style) {
  return "\n\n    .ButtonPrimary {\n      align-items: center;\n      align-self: center;\n      background: ".concat(style.colors.primary, ";\n      border-radius: 13px;\n      border: 1px solid transparent;\n      box-shadow: 0 0 16px rgba(0,0,0,0.1);\n      font-size: 22px;\n      font-weight: 400;\n      line-height: 40px;\n      height: 58px;\n      justify-content: center;\n      width: 100%;\n      overflow: hidden;\n      padding: 7px 0;\n      position: relative;\n      text-align: center;\n      text-decoration: none;\n      text-overflow: ellipsis;\n      transition: background 0.1s;\n      vertical-align: middle;\n      display: inline-block;\n    }\n\n    .ButtonPrimary, .ButtonPrimary * {\n      color: ").concat(style.colors.buttonText, ";\n    }\n\n    .ButtonPrimary.disabled {\n      background: rgb(210,210,210);\n      color: rgb(140,140,140);\n    }\n\n    .ButtonPrimary:not(.disabled){\n      cursor: pointer;\n    }\n    .ButtonPrimary:not(.disabled):hover {\n      box-shadow: inset 0 0 300px rgba(0,0,0,0.1);\n    }\n    .ButtonPrimary:not(.disabled):active {\n      box-shadow: inset 0 0 300px rgba(0,0,0,0.2);\n    }\n  ");
});

var CardStyle = (function (style) {
  return "\n\n    .Card {\n      align-items: center;\n      background: rgb(255,255,255);\n      border: 1px solid transparent;\n      border-radius: 13px;\n      box-shadow: 0 0 8px rgba(0,0,0,0.03);\n      cursor: pointer;\n      display: flex;\n      flex-direction: row;\n      margin-bottom: 8px;\n      min-height: 76px;\n      padding: 16px 10px;\n      width: 100%;\n    }\n\n    .Card:focus {\n      border: 1px solid ".concat(style.colors.primary, ";\n    }\n\n    .Card.center {\n      justify-content: center;\n    }\n\n    .Card.Row {\n      border-radius: 0;\n      margin-bottom: 0;\n      box-shadow: none;\n      min-height: 69px;\n      padding: 7px 21px;\n      border-top: 1px solid rgba(0,0,0,0.05);\n    }\n\n    .Card.Row .CardText {\n      font-size: 19px;\n      line-height: 40px;\n    }\n\n    .CardTokenSymbol {\n      width: 40%;\n      min-width: 0;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n\n    .CardTokenFullName {\n      width: 100%;\n      min-width: 0;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n\n    .CardTokenName {\n      text-align: right;\n      opacity: 0.5;\n      width: 60%;\n      min-width: 0;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n    \n    .Card.Row .CardTokenName .CardText {\n      font-size: 17px;\n    }\n\n    .Card.Row .CardImage {\n      width: 40px;\n    }\n\n    .Card.Row .CardImage img {\n      height: 30px;\n      width: 30px;\n    }\n\n    a.Card, a.Card * {\n      color: inherit;\n      text-decoration: none;\n    }\n\n    .Card.transparent {\n      background: none;\n      box-shadow: none;\n    }\n\n    .Card.small {\n      min-height: auto;\n      padding: 8px 8px;\n      margin: 0;\n    }\n\n    .CardImage.small {\n      width: 27px;\n    }\n\n    .CardImage.small img {\n      height: 27px;\n      width: 27px;\n    }\n\n    .CardImage.large {\n      width: 58px;\n    }\n\n    .CardImage.large img {\n      height: 58px;\n      width: 58px;\n    }\n\n    .Card.disabled {\n      cursor: default;\n    }\n\n    .Card:hover:not(.disabled) {\n      background: rgb(240,240,240);\n      box-shadow: 0 0 0 rgba(0,0,0,0); \n    }\n\n    .Card:active:not(.disabled) {\n      background: rgb(235,235,235);\n      box-shadow: inset 0 0 6px rgba(0,0,0,0.02);\n      color: inherit;\n    }\n\n    .Card:hover:not(.disabled) .CardAction {\n      opacity: 0.4;\n    }\n\n    .CardImage, .CardBody, .CardAction, .CardInfo {\n      align-items: center;\n      display: flex;\n      min-width: 0;\n      padding: 0 7px;\n    }\n\n    .CardImage {\n      display: inline-flex;\n      flex-basis: auto;\n      flex-grow: 0;\n      flex-shrink: 0;\n      justify-content: center;\n      position: relative;\n      width: 58px;\n    }\n\n    .CardBody {\n      flex-basis: auto;\n      flex-grow: 1;\n      flex-shrink: 1;\n      line-height: 27px;\n      padding-left: 10px;\n      text-align: left;\n    }\n\n    .CardBodyWrapper {\n      min-width: 0;\n    }\n\n    .CardAction {\n      flex-basis: auto;\n      flex-shrink: 0;\n      flex-grow: 0;\n      padding-right: 0;\n      margin-left: auto;\n    }\n\n    .Card.disabled .CardAction {\n      opacity: 0;  \n    }\n\n    .CardInfo {\n      display: flex;\n      flex-basis: auto;\n      flex-direction: column;\n      flex-grow: 0;\n      flex-shrink: 1;\n      justify-content: center;\n      margin-left: auto; \n      padding-right: 0;\n    }\n\n    .CardImage img {\n      background: white;\n      border-radius: 9999px;\n      border: 1px solid white;\n      box-shadow: 0 2px 8px rgb(0 0 0 / 10%);\n      height: 45px;\n      position: relative;\n      vertical-align: middle;\n      width: 45px;\n    }\n\n    .CardImage.rounded img {\n      border-radius: 8px !important;\n    }\n\n    .CardImage.square img {\n      border-radius: 0;\n    }\n\n    .CardImage img.transparent {\n      border: none;\n      background: none;\n      box-shadow: none;\n    }\n    \n    .CardImage .BlockchainLogo {\n      position: absolute;\n      bottom: 0;\n      right: 0;\n    }\n\n    .CardTitle {\n      font-size: 15px;\n      color: rgb(150,150,150);\n      line-height: 20px;\n    }\n    \n    .CardText, a .CardText {\n      color: ").concat(style.colors.text, ";\n      flex: 1;\n      font-size: 21px;\n      line-height: 26px;\n    }\n\n    .CardText strong {\n      font-weight: 500;\n    }\n\n    .CardText.small, .CardText.small small {\n      font-size: 18px;\n      color: rgb(150,150,150);\n      line-height: 20px;\n    }\n\n    .CardAction {\n      opacity: 0.2;\n    }\n\n    .Card.More {\n      display: inline-block;\n      text-align: center;\n    }\n  ");
});

var DialogStyle = (function (style) {
  return "\n\n    .ReactDialogBackground {\n      z-index: -2;\n      backdrop-filter: blur(5px);\n      background: rgba(0,0,0,0.7);\n    }\n\n    .contained .ReactDialog {\n      position: absolute;\n      height: 100%;\n      min-height: 100%;\n      width: 100%;\n      min-width: 100%;\n    }\n\n    .contained .ReactDialogBackground {\n      position: absolute;\n    }\n\n    .contained .ReactDialog.ReactDialogOpen .ReactDialogAnimation {\n      top: 0;\n    }\n\n    .Dialog {\n      margin: 0 auto;\n      position: relative;\n      width: 420px;\n      box-shadow: 0 0 20px rgba(0,0,0,0.2);\n      border-radius: 13px;\n      background: rgb(248,248,248);\n    }\n\n    @media (max-width: 450px) {\n\n      .Dialog {\n        border-radius: 0;\n        width: 100%;\n      }\n    }\n\n    @media (orientation: portrait) and (max-width: 800px) {\n\n      .ReactDialogAnimation {\n        width: 100%;\n      }\n\n      .ReactDialog {\n        height: 100%;\n        min-height: 100%;\n      }\n\n      .ReactDialogStack {\n        align-items: flex-end;\n      }\n\n      .Dialog {\n        align-content: stretch;\n        border-radius: 13px;\n        border-top-radius: 13px;\n        display: flex;\n        flex-direction: column;\n        border-bottom-left-radius: 0 !important;\n        border-bottom-right-radius: 0 !important;\n      }\n\n      .DialogBody {\n        flex: 1;\n        align-items: flex-end;\n      }\n\n      .DialogFooter {\n        padding-bottom: 20px;\n      }\n\n      .ReactDialogAnimation {\n        margin-bottom: -100px !important;\n        top: inherit !important;\n        position: relative;\n        transition: opacity 0.4s ease, margin-bottom 0.4s ease;\n      }\n\n      .ReactDialog.ReactDialogOpen .ReactDialogAnimation {\n        margin-bottom: 0px !important;\n      }\n\n      .DialogFooter {\n        border-bottom-left-radius: 0 !important;\n        border-bottom-right-radius: 0 !important;\n      }\n\n      .ReactShadowDOMInsideContainer > .ReactDialog {\n        align-items: flex-end;\n      }\n    }\n\n    .DialogBody {\n      overflow-x: hidden;\n      overflow-y: auto;\n    }\n\n    .ScrollHeight {\n      height: 30vh !important;\n      max-height: 30vh !important;\n    }\n\n    .ScrollHeightS {\n      height: 180px !important;\n      max-height: 180px !important;\n    }\n\n    .ScrollHeightM {\n      height: 194px !important;\n      max-height: 194px !important;\n    }\n\n    .DialogBody.MinHeight {\n      height: 120px !important;\n      max-height: 120px !important;\n    }\n\n    .DialogHeader {\n      border-top-left-radius: 13px;\n      border-top-right-radius: 13px;\n      min-height: 54px;\n      position: relative;\n      width: 100%;\n    }\n\n    .DialogHeaderActionRight {\n      position: absolute;\n      top: 0;\n      right: 0;\n      height: 48px;\n    }\n\n    .DialogHeaderActionLeft {\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 48px;\n    }\n\n    .DialogFooter {\n      border-bottom-left-radius: 13px;\n      border-bottom-right-radius: 13px;\n      line-height: 24px;\n      min-height: 32px;\n      position: relative;\n      text-align: center;\n    }\n\n  ";
});

var DropDownStyle = (function (style) {
  return "\n\n    .DropDownWrapper {\n      position: relative;\n    }\n\n    .DropDown {\n      background: rgb(240,240,240);\n      border-radius: 8px;\n      border: 1px solid rgb(230,230,230);\n      box-shadow: 0 0 12px rgba(0,0,0,0.1);\n      display: block;\n      padding: 8px 6px;\n      position: absolute;\n      right: 0;\n      z-index: 1000;\n    }\n\n    .DropDownItem {\n      border: 1px solid transparent;\n      border-radius: 6px;\n      cursor: pointer;\n      font-size: 17px;\n      font-weight: 500;\n      min-width: 160px;\n      padding: 6px 10px;\n      text-align: left;\n      white-space: nowrap;\n    }\n\n    .DropDownItem:focus {\n      border: 1px solid ".concat(style.colors.primary, ";\n    }\n\n    .DropDownItem:hover {\n      background: rgba(0,0,0,0.1);\n    }\n    \n    .DropDownItem:active {\n      background: rgba(0,0,0,0.15);\n    }\n    \n  ");
});

var FontStyle = (function (style) {
  return "\n\n    *, div, div * {\n      font-family: ".concat(style.fontFamily, ";\n    }\n\n    * {\n      font-size: 15px;\n    }\n\n    .FontSizeS {\n      font-size: 16px;\n    }\n\n    .FontSizeM {\n      font-size: 19px;\n    }\n\n    .FontSizeL {\n      font-size: 23px;\n    }\n\n    .FontSizeXL {\n      font-size: 32px;\n    }\n\n    .FontSizeXXL {\n      font-size: 42px;\n    }\n\n    .FontWeightMedium {\n      font-weight: 500;\n    }\n\n    .FontWeightBold {\n      font-weight: bold;\n    }\n\n    .FontItalic {\n      font-style: italic;\n    }\n  ");
});

var GraphicStyle = (function () {
  return "\n\n    .GraphicWrapper {\n      display: block;\n    }\n\n    .Graphic {\n      width: 50%;\n      position: relative;\n    }\n  ";
});

var GridStyle = (function (style) {
  return "\n\n    .Row {\n      overflow: hidden;\n    }\n\n    .Column {\n      float: left;\n    }\n\n    .Column2 {\n      width: 16.66%;\n    }\n\n    .Column10 {\n      width: 83.33%;\n    }\n  ";
});

var HeightStyle = (function () {
  return "\n\n    .MaxHeight {\n      max-height: 320px;\n      overflow-y: auto;\n    }\n  ";
});

var IconStyle = (function (style) {
  return "\n\n    .Icon {\n      fill: ".concat(style.colors.icons, ";\n      stroke: ").concat(style.colors.icons, ";\n    }\n\n    .QuestionMarkIcon {\n      fill: transparent;\n    }\n\n    .ChevronLeft, .ChevronRight {\n      position: relative;\n      top: 1px;\n    }\n\n    .Checkmark {\n      height: 24px;\n      position: relative;\n      top: -1px;\n      vertical-align: middle;\n      width: 24px;\n    }\n\n    .AlertIcon {\n      height: 20px;\n      position: relative;\n      top: -1px;\n      vertical-align: middle;\n      width: 20px;\n      fill: #e42626;\n      stroke: transparent;\n    }\n\n    .CheckMark.small {\n      height: 16px;\n      width: 16px;\n    }\n\n    .DigitalWalletIcon {\n      height: 24px;\n      position: relative;\n      top: -1px;\n      vertical-align: middle;\n      width: 24px;\n    }\n\n    .ButtonPrimary .Icon {\n      fill : ").concat(style.colors.buttonText, ";\n      stroke : ").concat(style.colors.buttonText, ";\n    }\n\n    .Loading {\n      border: 3px solid ").concat(style.colors.primary, ";\n      border-top: 3px solid rgba(0,0,0,0.1);\n      border-radius: 100%;\n      position: relative;\n      left: -1px;\n      width: 18px;\n      height: 18px;\n      animation: spin 1.5s linear infinite;\n    }\n\n    @keyframes spin {\n      0% { transform: rotate(0deg); }\n      100% { transform: rotate(360deg); }\n    }\n  ");
});

var ImageStyle = (function (style) {
  return "\n\n    .MaxAmountImage {\n      display: inline-block;\n      padding-right: 6px;\n    }\n    \n    .MaxAmountImage img {\n      height: 16px;\n      width: 16px;\n      position: relative;\n      top: 3px;\n    }\n  ";
});

var InputStyle = (function (style) {
  return "\n\n    .Input {\n      background: none;\n      border: 1px solid transparent;\n      margin: 0;\n      outline: none !important;\n      padding: 0 0 0 14px;\n      width: 100%;\n    }\n\n    .Input::placeholder {\n      color: rgb(210,210,210);\n    }\n    \n  ";
});

var LinkStyle = (function (style) {
  return "\n\n    .Link {\n      color: ".concat(style.colors.primary, ";\n      cursor: pointer;\n      text-decoration: none;\n    }\n\n    .Link:hover {\n      filter: brightness(0.8);\n    }\n\n    .Link:active {\n      filter: brightness(1.0);\n    }\n  ");
});

var LoadingTextStyle = (function (style) {
  return "\n\n    .LoadingText {\n      color: ".concat(style.colors.buttonText, ";\n      display: inline-block;\n      text-decoration: none;\n    }\n\n    @keyframes blink {\n      0% { opacity: .2; }\n      20% { opacity: 1; }\n      100% { opacity: .2; }\n    }\n    \n    .LoadingText .dot {\n      animation-name: blink;\n      animation-duration: 1.4s;\n      animation-iteration-count: infinite;\n      animation-fill-mode: both;\n    }\n    \n    .LoadingText .dot:nth-child(2) {\n      animation-delay: .2s;\n    }\n    \n    .LoadingText .dot:nth-child(3) {\n      animation-delay: .4s;\n    }\n  ");
});

var OpacityStyle = (function (style) {
  return "\n\n    .Opacity05 {\n      opacity: 0.5;\n    }\n  ";
});

var PaddingStyle = (function () {
  return "\n\n    .PaddingTopXS {\n      padding-top: 3px;\n    }\n\n    .PaddingRightXS {\n      padding-right: 3px;\n    }\n\n    .PaddingBottomXS {\n      padding-bottom: 3px;\n    }\n\n    .PaddingLeftXS {\n      padding-left: 3px; \n    }\n\n    .PaddingTopS {\n      padding-top: 13px;\n    }\n\n    .PaddingRightS {\n      padding-right: 13px;\n    }\n\n    .PaddingBottomS {\n      padding-bottom: 13px;\n    }\n\n    .PaddingLeftS {\n      padding-left: 13px; \n    }\n\n    .PaddingTopM {\n      padding-top: 19px;\n    }\n\n    .PaddingRightM {\n      padding-right: 19px;\n    }\n\n    .PaddingBottomM {\n      padding-bottom: 19px;\n    }\n\n    .PaddingLeftM {\n      padding-left: 19px; \n    }\n\n    .PaddingTopL {\n      padding-top: 29px;\n    }\n\n    .PaddingRightL {\n      padding-right: 29px;\n    }\n\n    .PaddingBottomL {\n      padding-bottom: 29px;\n    }\n\n    .PaddingLeftL {\n      padding-left: 29px; \n    }\n  ";
});

var PoweredByStyle = (function (style) {
  return "\n\n    .PoweredByWrapper {\n      display: block;\n      left: 0;\n      padding-top: 3px;\n      position: fixed;\n      right: 0;\n      text-align: center;\n      top: 0;\n    }\n\n    .contained .PoweredByWrapper {\n      position: absolute;\n    }\n\n    .PoweredByLink {\n      color: white;\n      display: inline-block;\n      font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\" !important;\n      font-size: 14px;\n      font-style: italic;\n      font-weight: bold;\n      letter-spacing: -0.2px;\n      margin-left: 8px;\n      opacity: 0.5;\n      text-decoration: none;\n      text-shadow: black 0 0 2px;\n    }\n\n    .PoweredByLink:hover, .PoweredByLink:active {\n      opacity: 1.0;\n    }\n  ";
});

var QRCodeStyle = (function () {
  return "\n\n    .QRCode {\n      width: 100%;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      margin-bottom: -10px;\n    }\n  ";
});

var RangeSliderStyle = (function (style) {
  return "\n\n    .rangeslider {\n      margin: 20px 0;\n      position: relative;\n      background: #e6e6e6;\n      -ms-touch-action: none;\n      touch-action: none;\n    }\n\n    .rangeslider,\n    .rangeslider__fill {\n      display: block;\n      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);\n    }\n\n    .rangeslider__handle {\n      outline: none;\n      cursor: pointer;\n      display: inline-block;\n      position: absolute;\n      border-radius: 50%;\n      background-color: " + style.colors.primary + ";\n      border: 1px solid white;\n      box-shadow: 0 0 8px rgba(0,0,0,0.1);\n    }\n\n    .rangeslider__handle:hover {\n      box-shadow: inset 0 0 300px rgba(0,0,0,0.2);\n    }\n\n    .rangeslider__handle:active {\n      box-shadow: inset 0 0 300px rgba(0,0,0,0.3);\n    }\n\n    .rangeslider__active {\n      opacity: 1;\n    }\n\n    .rangeslider__handle-tooltip {\n      display: none;\n    }\n\n    .rangeslider-horizontal {\n      height: 12px;\n      border-radius: 10px;\n    }\n\n    .rangeslider-horizontal .rangeslider__fill {\n      height: 100%;\n      background-color: " + style.colors.primary + ";\n      border-radius: 10px;\n      top: 0;\n    }\n    .rangeslider-horizontal .rangeslider__handle {\n      width: 18px;\n      height: 18px;\n      border-radius: 30px;\n      top: 50%;\n      transform: translate3d(-50%, -50%, 0);\n    }\n\n\n    .rangeslider-horizontal .rangeslider__handle-tooltip {\n      top: -55px;\n    }\n\n  ";
});

var ResetStyle = (function () {
  return "\n\n      html, body, div, span, applet, object, iframe,\n      h1, h2, h3, h4, h5, h6, p, blockquote, pre,\n      a, abbr, acronym, address, big, cite, code,\n      del, dfn, em, img, ins, kbd, q, s, samp,\n      small, strike, strong, sub, sup, tt, var,\n      b, u, i, center,\n      dl, dt, dd, ol, ul, li,\n      fieldset, form, label, legend,\n      table, caption, tbody, tfoot, thead, tr, th, td,\n      article, aside, canvas, details, embed, \n      figure, figcaption, footer, header, hgroup, \n      menu, nav, output, ruby, section, summary,\n      time, mark, audio, video {\n        margin: 0;\n        padding: 0;\n        border: 0;\n        font-size: 100%;\n        font: inherit;\n        text-align: inherit;\n        vertical-align: baseline;\n      }\n\n      article, aside, details, figcaption, figure, \n      footer, header, hgroup, menu, nav, section {\n        display: block;\n      }\n\n      body {\n        line-height: 1;\n      }\n\n      ol, ul {\n        list-style: none;\n      }\n\n      blockquote, q {\n        quotes: none;\n      }\n\n      blockquote:before, blockquote:after,\n      q:before, q:after {\n        content: '';\n        content: none;\n      }\n      \n      table {\n        border-collapse: collapse;\n        border-spacing: 0;\n      }\n\n      * {\n        box-sizing: border-box;\n      }\n\n      button {\n        border: 0;\n        background: none;\n        outline: none;\n      }\n\n  ";
});

var SearchStyle = (function (style) {
  return "\n\n    .Search {\n      border-radius: 13px;\n      border: 1px solid rgba(0,0,0,0.2);\n      background: white;\n      outline: none !important;\n      color: ".concat(style.colors.text, ";\n      font-size: 19px;\n      padding: 13px;\n      width: 100%;\n    }\n\n    .Search::placeholder {\n      color: rgb(180,180,180);\n    } \n\n    .Search:focus, .Search:focus-visible {\n      border: 1px solid ").concat(style.colors.primary, ";\n    }\n\n  ");
});

var SkeletonStyle = (function () {
  return "\n        \n    .Skeleton {\n      background: rgb(230,230,230) !important;\n      border: 0px solid transparent !important;\n      box-shadow: none !important;\n      cursor: inherit !important;\n      line-height: 0;\n      overflow: hidden;\n      position: relative;\n    }\n\n    @keyframes SkeletonBackgroundAnimation {\n      from {\n        left: -500px;\n      }\n      to   {\n        left: +120%;\n      }\n    }\n\n    .SkeletonBackground {\n      animation: 2s SkeletonBackgroundAnimation 0.2s ease infinite;\n      background: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%);\n      height: 100%;\n      left: -140%;\n      position: absolute;\n      top: 0;\n      width: 400px;\n    }\n\n    .SkeletonWrapper {\n      line-height: 0;\n    }\n  ";
});

var TableStyle = (function (style) {
  return "\n\n    .Table {\n      border-collapse: separate;\n      border-radius: 7px;\n      border-style: hidden;\n      border: 1px solid rgba(0,0,0,0.1);\n      width: 100%;\n    }\n\n    .Table tr.small td {\n      font-size: 14px;\n    }\n\n    .Table tr td {\n      border-bottom: 1px solid rgba(0,0,0,0.1);\n      word-break: break-all;\n    }\n    \n    .Table tr:last-child td {\n      border-bottom: none;\n    }\n    \n    .Table tr td {\n      padding: 8px 15px;\n      text-align: left;\n    }\n    \n    .Table tr td:first-child {\n      width: 30%\n    }\n\n    .Table tr td:last-child {\n      width: 70%\n    }\n    \n    .Table .TableSubTitle {\n      font-weight: 300;\n      opacity: 0.7;\n    }\n\n    .Table tr td:last-child {\n      font-weight: 500;\n    }\n  ";
});

var TextButtonStyle = (function (style) {
  return "\n\n    .TextButton {\n      cursor: pointer;\n      font-size: 16px;\n      color: ".concat(style.colors.primary, "\n    }\n\n    .TextButton:hover * {\n      opacity: 1.0;\n    }\n  ");
});

var TextStyle = (function (style) {
  return "\n\n    * {\n      color: ".concat(style.colors.text, ";\n    }\n\n    .LightGreen {\n      color: rgba(50,160,60);\n    }\n\n    h1, h2, h3, h4, h5, h6 {\n      display: block;\n    }\n\n    .Text {\n      font-size: 16px;\n      line-height: 24px\n    }\n\n    .TextLeft, .TextLeft * {\n      text-align: left !important;\n    }\n\n    .TextCenter, .TextCenter * {\n      text-align: center;\n    }\n\n    .LineHeightXS {\n      line-height: 16px;\n    }\n\n    .LineHeightL {\n      line-height: 32px;\n    }\n\n    .ErrorSnippetText {\n      background: rgb(30, 30, 20);\n      border-radius: 19px;\n      border: 8px solid rgb(30, 30, 20);\n      color: #00FF41;\n      font-size: 15px;\n      font-style: italic;\n      max-height: 100px;\n      padding: 6px;\n      overflow-wrap: break-word;\n      overflow-y: auto;\n      white-space: pre-wrap;\n      word-wrap: break-word;\n    }\n  ");
});

var TokenAmountStyle = (function () {
  return "\n        \n    .TokenAmountRow {\n      min-width: 0;\n      width: 100%;\n      display: flex;\n      flex-direction: row;\n    }\n    \n    .TokenAmountRow.small {\n      font-size: 17px;\n      line-height: 17px;\n    }\n\n    .TokenAmountRow.grey {\n      opacity: 0.5;\n    }\n\n    .TokenAmountCell {\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n\n    .TokenSymbolCell {\n    }\n  ";
});

var TokenImageStyle = (function (style) {
  return "\n\n    .TokenImage img {\n      border-radius: 9999px;\n      border: 1px solid white;\n      background: white;\n      box-shadow: 0 2px 8px rgb(0 0 0 / 10%);\n      height: 45px;\n      position: relative;\n      vertical-align: middle;\n      width: 45px;\n    }\n\n    .TokenImage.medium img {\n      height: 93px;\n      width: 93px;\n    }\n  ";
});

var TooltipStyle = (function (style) {
  return "\n\n    .TooltipWrapper {\n      position: relative;\n    }\n\n    .Tooltip {\n      background: ".concat(style.colors.primary, ";\n      border-radius: 10px;\n      color: ").concat(style.colors.buttonText, ";\n      padding: 10px 13px;\n      position: relative;\n      box-shadow: 0 0 8px rgba(0,0,0,0.2);\n    }\n\n    .Tooltip.absolute {\n      position: absolute;\n    }\n\n    .Tooltip.top {\n      top: -40px;\n    }\n\n    .TooltipArrowUp {\n      border-bottom: 10px solid ").concat(style.colors.primary, ";\n      border-left: 10px solid transparent;\n      border-right: 10px solid transparent;\n      height: 0; \n      left: 12px;\n      position: absolute;\n      top: -8px;\n      width: 0; \n    }\n\n    .TooltipArrowDown {\n      border-top: 10px solid ").concat(style.colors.primary, ";\n      border-left: 10px solid transparent;\n      border-right: 10px solid transparent;\n      height: 0; \n      left: 12px;\n      position: absolute;\n      bottom: -8px;\n      width: 0; \n    }\n  ");
});

var WalletStyle = (function (style) {
  return "\n\n    .WalletLogoS {\n      background: none !important;\n      border-radius: 8px !important;\n      border: 1px solid transparent !important;\n      box-shadow: none !important;\n      height: 40px !important;\n      width: 40px !important;\n    }\n  ";
});

var styleRenderer = (function (style) {
  var _style, _style2;

  style = {
    colors: Object.assign({
      primary: '#ea357a',
      buttonText: '#ffffff',
      icons: '#000000',
      text: '#212529'
    }, ((_style = style) === null || _style === void 0 ? void 0 : _style.colors) || {}),
    fontFamily: ((_style2 = style) === null || _style2 === void 0 ? void 0 : _style2.fontFamily) || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  };
  return [ResetStyle(), DialogStyle(), ButtonCircularStyle(style), ButtonPrimaryStyle(style), CardStyle(style), PoweredByStyle(), QRCodeStyle(), GraphicStyle(), GridStyle(), SkeletonStyle(), TokenAmountStyle(), TextStyle(style), FontStyle(style), IconStyle(style), OpacityStyle(), PaddingStyle(), HeightStyle(), LoadingTextStyle(style), RangeSliderStyle(style), InputStyle(), TextButtonStyle(style), ImageStyle(), BlockchainLogoStyle(), SearchStyle(style), TokenImageStyle(), AlertStyle(), TableStyle(), LinkStyle(style), TooltipStyle(style), WalletStyle(), DropDownStyle(style)].join('');
});

var mount = (function (_ref, content) {
  var style = _ref.style,
      container = _ref.container,
      document = _ref.document,
      closed = _ref.closed;
  var insideStyle = styleRenderer(style);

  if (style && style.css) {
    insideStyle = [insideStyle, style.css].join(' ');
  }

  var unmountShadowDOM = function unmountShadowDOM() {
    // setTimeout to allow dialog to animate out first
    setTimeout(function () {
      unmount();

      if (typeof closed == 'function') {
        closed();
      }
    }, 300);
  };

  var outsideStyle;

  if (container) {
    outsideStyle = "\n      position: absolute;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      right: 0;\n      z-index: 99999;\n    ";
  } else {
    outsideStyle = "\n      position: fixed;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      right: 0;\n      z-index: 99999;\n    ";
  }

  var _ReactShadowDOM = ReactShadowDOM({
    document: document,
    element: container || document.body,
    content: content(unmountShadowDOM),
    outsideStyle: outsideStyle,
    insideStyle: insideStyle,
    insideClasses: container ? ['contained'] : []
  }),
      unmount = _ReactShadowDOM.unmount;

  return unmount;
});

var requireReactVersion = (function () {
  if (parseInt(React.version.split('.')[0]) < 17) {
    throw 'depay/widgets require at least React v17';
  }
});

var SelectionProvider = (function (props) {
  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      selection = _useState2[0],
      setSelection = _useState2[1];

  return /*#__PURE__*/React.createElement(SelectionContext.Provider, {
    value: {
      selection: selection,
      setSelection: setSelection
    }
  }, props.children);
});

var UpdatableProvider = (function (props) {
  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      updatable = _useState2[0],
      setUpdatable = _useState2[1];

  return /*#__PURE__*/React.createElement(UpdatableContext.Provider, {
    value: {
      updatable: updatable,
      setUpdatable: setUpdatable
    }
  }, props.children);
});

var Connect = function Connect(options) {
  requireReactVersion();
  var style, error, document;

  if (_typeof(options) == 'object') {
    style = options.style;
    error = options.error;
    document = options.document;
  }

  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(resolve, reject) {
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              mount({
                style: style,
                document: ensureDocument(document)
              }, function (unmount) {
                var rejectBeforeUnmount = function rejectBeforeUnmount() {
                  reject('USER_CLOSED_DIALOG');
                  unmount();
                };

                return function (container) {
                  return /*#__PURE__*/React.createElement(ErrorProvider, {
                    errorCallback: error,
                    container: container,
                    unmount: unmount
                  }, /*#__PURE__*/React.createElement(UpdatableProvider, null, /*#__PURE__*/React.createElement(ClosableProvider, {
                    unmount: rejectBeforeUnmount
                  }, /*#__PURE__*/React.createElement(SelectionProvider, null, /*#__PURE__*/React.createElement(ConnectStack, {
                    document: document,
                    container: container,
                    resolve: resolve,
                    reject: reject,
                    autoClose: true
                  }), /*#__PURE__*/React.createElement(PoweredBy, null)))));
                };
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var ConfigurationContext = /*#__PURE__*/React.createContext();

var ConfigurationProvider = (function (props) {
  var currencyCode = new Currency({
    code: props.configuration.currency
  }).code;
  useEffect(function () {
    if (props.configuration.providers != undefined) {
      Object.entries(props.configuration.providers).forEach(function (entry) {
        setProviderEndpoints(entry[0], entry[1]);
      });
    }
  }, [props.configuration]);
  return /*#__PURE__*/React.createElement(ConfigurationContext.Provider, {
    value: Object.assign({}, props.configuration, {
      currencyCode: currencyCode
    })
  }, props.children);
});

var NavigateContext = /*#__PURE__*/React.createContext();

var LoadingDialog = (function (props) {
  var _useContext = useContext(ConfigurationContext),
      text = _useContext.text;

  return /*#__PURE__*/React.createElement(Dialog$1, {
    closable: false,
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM TextLeft"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL FontSizeL"
    }, "Payment")),
    body: /*#__PURE__*/React.createElement("div", {
      className: "PaddingLeftM PaddingRightM PaddingBottomXS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "Card Skeleton"
    }, /*#__PURE__*/React.createElement("div", {
      className: "SkeletonBackground"
    }))),
    footer: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingRightM PaddingLeftM PaddingBottomS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "SkeletonWrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ButtonPrimary Skeleton"
    }, /*#__PURE__*/React.createElement("div", {
      className: "SkeletonBackground"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "TextCenter Opacity05 PaddingTopS"
    }, /*#__PURE__*/React.createElement("strong", null, text)))
  });
});

var LoadingStack = (function (props) {
  var _useContext = useContext(ClosableContext),
      open = _useContext.open,
      close = _useContext.close;

  var _useContext2 = useContext(NavigateContext),
      setNavigator = _useContext2.setNavigator;

  return /*#__PURE__*/React.createElement(ReactDialogStack, {
    setNavigator: setNavigator,
    open: open,
    close: close,
    start: "Loading",
    container: props.container,
    document: props.document,
    dialogs: {
      Loading: /*#__PURE__*/React.createElement(LoadingDialog, null)
    }
  });
});

var NavigateProvider = (function (props) {
  var navigator;

  var setNavigator = function setNavigator(_navigator) {
    navigator = _navigator;
  };

  var navigate = function navigate(dialog) {
    if (navigator) {
      navigator.navigate(dialog);
    }
  };

  var set = function set(dialogs) {
    if (navigator) {
      navigator.set(dialogs);
    }
  };

  return /*#__PURE__*/React.createElement(NavigateContext.Provider, {
    value: {
      navigate: navigate,
      set: set,
      setNavigator: setNavigator
    }
  }, props.children);
});

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var prepareAcceptedPayments = function prepareAcceptedPayments(accept) {
  var toAddress = _typeof(accept.receiver) == 'object' ? accept.receiver.address : accept.receiver;
  var toContract = _typeof(accept.receiver) == 'object' ? accept.receiver : undefined;
  return _objectSpread$3(_objectSpread$3({}, accept), {}, {
    toAddress: toAddress,
    toContract: toContract
  });
};

var mergeFromAccounts = function mergeFromAccounts(accept, account) {
  var from = {};
  accept.forEach(function (accept) {
    from[accept.blockchain] = account;
  });
  return from;
};

var routePayments = (function (_ref) {
  var accept = _ref.accept,
      account = _ref.account,
      whitelist = _ref.whitelist,
      blacklist = _ref.blacklist,
      fee = _ref.fee;
  return route({
    accept: accept.map(prepareAcceptedPayments),
    from: mergeFromAccounts(accept, account),
    whitelist: whitelist,
    blacklist: blacklist,
    event: 'ifRoutedAndNative',
    fee: fee
  });
});

var Loading = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_ref) {
    var text, style, error, critical, container, document, unmount;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            text = _ref.text, style = _ref.style, error = _ref.error, critical = _ref.critical, container = _ref.container, document = _ref.document;
            requireReactVersion();
            _context.prev = 2;
            unmount = mount({
              style: style,
              container: container,
              document: ensureDocument(document),
              closed: closed
            }, function (unmount) {
              return function (container) {
                return /*#__PURE__*/React.createElement(ErrorProvider, {
                  errorCallback: error,
                  container: container,
                  unmount: unmount
                }, /*#__PURE__*/React.createElement(ConfigurationProvider, {
                  configuration: {
                    text: text
                  }
                }, /*#__PURE__*/React.createElement(UpdatableProvider, null, /*#__PURE__*/React.createElement(ClosableProvider, {
                  unmount: unmount,
                  closable: false
                }, /*#__PURE__*/React.createElement(NavigateProvider, null, /*#__PURE__*/React.createElement(LoadingStack, {
                  document: document,
                  container: container
                }), /*#__PURE__*/React.createElement(PoweredBy, null))))));
              };
            });
            window._depayUnmountLoading = unmount;
            return _context.abrupt("return", {
              unmount: unmount
            });

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            console.log('critical error', _context.t0);

            if (critical != undefined) {
              critical(_context.t0);
            }

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 8]]);
  }));

  return function Loading(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var WalletContext = /*#__PURE__*/React.createContext();

var SignLoginDialog = (function (props) {
  var _useContext = useContext(ErrorContext),
      setError = _useContext.setError;

  var _useContext2 = useContext(ConfigurationContext),
      message = _useContext2.message,
      endpoint = _useContext2.endpoint;

  var _useContext3 = useContext(ConfigurationContext),
      recoverSignature = _useContext3.recoverSignature;

  var _useContext4 = useContext(WalletContext),
      wallet = _useContext4.wallet,
      account = _useContext4.account;

  if (!wallet) {
    return null;
  }

  wallet !== null && wallet !== void 0 && wallet.name ? wallet.name : 'wallet';
  var walletLogo = wallet !== null && wallet !== void 0 && wallet.logo ? wallet.logo : undefined;

  if (typeof recoverSignature != 'function') {
    recoverSignature = function recoverSignature(_ref) {
      var message = _ref.message,
          signature = _ref.signature;
      return new Promise(function (resolve, reject) {
        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: message,
            signature: signature
          })
        }).then(function (response) {
          if (response.status == 200) {
            response.text().then(function (account) {
              resolve(account);
            })["catch"](setError);
          } else {
            response.text().then(function (text) {
              setError(text || 'Recovering login signature failed!');
            });
          }
        });
      });
    };
  }

  var login = function login() {
    var messageToSign;

    if (typeof message == 'function') {
      messageToSign = message(account);
    } else {
      messageToSign = message;
    }

    wallet.sign(messageToSign).then(function (signature) {
      recoverSignature({
        message: messageToSign,
        signature: signature
      }).then(function (account) {
        props.resolve({
          account: account,
          wallet: wallet
        });
      })["catch"](setError);
    })["catch"](function (error) {
      if (error && error.code && error.code == 4001) ; else {
        setError(error);
      }
    });
  };

  return /*#__PURE__*/React.createElement(Dialog$1, {
    body: /*#__PURE__*/React.createElement("div", {
      className: "TextCenter"
    }, walletLogo && /*#__PURE__*/React.createElement("div", {
      className: "GraphicWrapper PaddingTopS PaddingBottomS"
    }, /*#__PURE__*/React.createElement("img", {
      className: "Graphic",
      src: walletLogo
    })), /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL Text FontSizeL FontWeightBold PaddingTopS"
    }, "Wallet Login"), /*#__PURE__*/React.createElement("div", {
      className: "Text PaddingTopS PaddingBottomS PaddingLeftS PaddingRightS"
    }, /*#__PURE__*/React.createElement("p", {
      className: "FontSizeM PaddingLeftM PaddingRightM PaddingBottomS"
    }, "Please click \"Log in\" and sign the message with your connected wallet."))),
    footer: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingRightM PaddingLeftM PaddingBottomM"
    }, /*#__PURE__*/React.createElement("button", {
      className: "ButtonPrimary",
      onClick: login
    }, "Log in"))
  });
});

var LoginStack = (function (props) {
  var _useContext = useContext(ClosableContext),
      open = _useContext.open,
      close = _useContext.close;

  return /*#__PURE__*/React.createElement(ReactDialogStack, {
    open: open,
    close: close,
    start: "SignLogin",
    container: props.container,
    document: props.document,
    dialogs: {
      SignLogin: /*#__PURE__*/React.createElement(SignLoginDialog, {
        resolve: props.resolve,
        userClosedDialog: props.userClosedDialog
      })
    }
  });
});

var WalletProvider = (function (props) {
  var _useContext = useContext(ConfigurationContext),
      recover = _useContext.recover,
      passedWallet = _useContext.wallet;

  var _useContext2 = useContext(ErrorContext);
      _useContext2.setError;

  var _useState = useState(passedWallet),
      _useState2 = _slicedToArray(_useState, 2),
      wallet = _useState2[0],
      setWallet = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      account = _useState4[0],
      setAccount = _useState4[1];

  var _useState5 = useState(passedWallet ? 'connected' : undefined),
      _useState6 = _slicedToArray(_useState5, 2),
      walletState = _useState6[0],
      setWalletState = _useState6[1];

  var connected = function connected(_ref) {
    var account = _ref.account,
        wallet = _ref.wallet;
    setAccount(account);
    setWallet(wallet);
    setTimeout(function () {
      setWalletState('connected');

      if (props.connected) {
        props.connected(account);
      }
    }, 200);
  };

  var disconnect = function disconnect() {
    setAccount();
    setWallet();
    setWalletState();
  };

  useEffect(function () {
    _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      var _account;

      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!passedWallet) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return passedWallet.account();

            case 3:
              _account = _context.sent;

              if (_account) {
                setAccount(_account);
              } else {
                setWallet();
                setWalletState();
              }

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }, []);

  if (walletState == 'connected' || recover != undefined) {
    return /*#__PURE__*/React.createElement(WalletContext.Provider, {
      value: {
        account: account,
        wallet: wallet,
        disconnect: disconnect
      }
    }, props.children);
  } else {
    return /*#__PURE__*/React.createElement(ConnectStack, {
      document: props.document,
      container: props.container,
      resolve: connected
    });
  }
});

var Login = function Login(options) {
  requireReactVersion();
  var style, error, document, message, endpoint, recover, wallet;

  if (_typeof(options) == 'object') {
    style = options.style;
    error = options.error;
    document = options.document;
    message = options.message;
    endpoint = options.endpoint;
    recover = options.recover;
    wallet = options.wallet;
  }

  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_resolve, reject) {
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              mount({
                style: style,
                document: ensureDocument(document)
              }, function (unmount) {
                var userClosedDialog = function userClosedDialog() {
                  reject('USER_CLOSED_DIALOG');
                  unmount();
                };

                return function (container) {
                  return /*#__PURE__*/React.createElement(ErrorProvider, {
                    errorCallback: error,
                    container: container,
                    unmount: unmount
                  }, /*#__PURE__*/React.createElement(ConfigurationProvider, {
                    configuration: {
                      message: message,
                      endpoint: endpoint || '/login',
                      recoverSignature: recover,
                      wallet: wallet
                    }
                  }, /*#__PURE__*/React.createElement(UpdatableProvider, null, /*#__PURE__*/React.createElement(ClosableProvider, {
                    unmount: userClosedDialog
                  }, /*#__PURE__*/React.createElement(WalletProvider, {
                    container: container,
                    unmount: unmount
                  }, /*#__PURE__*/React.createElement(LoginStack, {
                    document: document,
                    container: container,
                    resolve: function resolve(_ref2) {
                      var account = _ref2.account,
                          wallet = _ref2.wallet;
                      unmount();

                      _resolve({
                        account: account,
                        wallet: wallet
                      });
                    }
                  }), /*#__PURE__*/React.createElement(PoweredBy, null))))));
                };
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var ChangableAmountContext = /*#__PURE__*/React.createContext();

var ConversionRateContext = /*#__PURE__*/React.createContext();

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

var findMaxRoute = (function (routes) {
  var sortedLowToHigh = _toConsumableArray(routes).sort(function (a, b) {
    if (a.fromBalance == '0' || a.fromAmount == '0') {
      return -1; // b
    }

    if (b.fromBalance == '0' || b.fromAmount == '0') {
      return 1; // a
    }

    var aAmountsAvailable = ethers.BigNumber.from(a.fromBalance).div(ethers.BigNumber.from(a.fromAmount));
    var bAmountsAvailable = ethers.BigNumber.from(b.fromBalance).div(ethers.BigNumber.from(b.fromAmount));

    if (aAmountsAvailable.lt(bAmountsAvailable)) {
      return -1; // b
    }

    if (bAmountsAvailable.lt(aAmountsAvailable)) {
      return 1; // a
    }

    return 0; // equal
  });

  return sortedLowToHigh[sortedLowToHigh.length - 1];
});

var round = (function (input) {
  var _digitsAfterDecimal;

  var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'up';
  var inputAsFloat = parseFloat(input);
  var digitsAfterDecimal = inputAsFloat.toString().match(/\d+\.0*(\d{4})/);

  if ((_digitsAfterDecimal = digitsAfterDecimal) !== null && _digitsAfterDecimal !== void 0 && _digitsAfterDecimal.length) {
    digitsAfterDecimal = digitsAfterDecimal[0];
    var focus = digitsAfterDecimal.match(/\d{4}$/)[0];

    var _float;

    var focusToFixed;

    if (focus.match(/^0/)) {
      if (direction == 'up') {
        _float = parseFloat("".concat(focus[1], ".").concat(focus[2]).concat(focus[3]));
      } else {
        _float = parseFloat("".concat(focus[1], ".").concat(focus[2]).concat(focus[3]));
      }

      focusToFixed = parseFloat(_float).toFixed(2);
      focusToFixed = "0".concat(focusToFixed).replace('.', '');
    } else {
      if (direction == 'up') {
        _float = parseFloat("".concat(focus[0], ".").concat(focus[1]).concat(focus[2], "9"));
      } else {
        _float = parseFloat("".concat(focus[0], ".").concat(focus[1]).concat(focus[2], "1"));
      }

      focusToFixed = parseFloat(_float).toFixed(2).replace('.', '');
    }

    if (focusToFixed == '0999' && parseInt(inputAsFloat.toFixed(0)) == 0) {
      focusToFixed = direction == 'up' ? '1000' : '0999';
      return parseFloat(digitsAfterDecimal.replace(/\d{4}$/, focusToFixed));
    } else if (focusToFixed == '1000' && parseInt(inputAsFloat.toFixed(0)) == 0) {
      return parseFloat(digitsAfterDecimal.replace(/\d{5}$/, focusToFixed));
    } else if (focusToFixed.toString()[0] != "0" && focusToFixed.toString().length > 3) {
      return parseInt(inputAsFloat.toFixed(0));
    } else {
      return parseFloat(digitsAfterDecimal.replace(/\d{4}$/, focusToFixed));
    }
  } else {
    return parseFloat(inputAsFloat.toFixed(3));
  }
});

/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

var lodash = createCommonjsModule(function (module, exports) {
(function() {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined$1;

  /** Used as the semantic version number. */
  var VERSION = '4.17.21';

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Error message constants. */
  var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
      FUNC_ERROR_TEXT = 'Expected a function',
      INVALID_TEMPL_VAR_ERROR_TEXT = 'Invalid `variable` option passed into `_.template`';

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /** Used as the internal argument placeholder. */
  var PLACEHOLDER = '__lodash_placeholder__';

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1,
      CLONE_FLAT_FLAG = 2,
      CLONE_SYMBOLS_FLAG = 4;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG = 1,
      WRAP_BIND_KEY_FLAG = 2,
      WRAP_CURRY_BOUND_FLAG = 4,
      WRAP_CURRY_FLAG = 8,
      WRAP_CURRY_RIGHT_FLAG = 16,
      WRAP_PARTIAL_FLAG = 32,
      WRAP_PARTIAL_RIGHT_FLAG = 64,
      WRAP_ARY_FLAG = 128,
      WRAP_REARG_FLAG = 256,
      WRAP_FLIP_FLAG = 512;

  /** Used as default options for `_.truncate`. */
  var DEFAULT_TRUNC_LENGTH = 30,
      DEFAULT_TRUNC_OMISSION = '...';

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /** Used to indicate the type of lazy iteratees. */
  var LAZY_FILTER_FLAG = 1,
      LAZY_MAP_FLAG = 2,
      LAZY_WHILE_FLAG = 3;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0,
      MAX_SAFE_INTEGER = 9007199254740991,
      MAX_INTEGER = 1.7976931348623157e+308,
      NAN = 0 / 0;

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH = 4294967295,
      MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
      HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

  /** Used to associate wrap methods with their bit flags. */
  var wrapFlags = [
    ['ary', WRAP_ARY_FLAG],
    ['bind', WRAP_BIND_FLAG],
    ['bindKey', WRAP_BIND_KEY_FLAG],
    ['curry', WRAP_CURRY_FLAG],
    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
    ['flip', WRAP_FLIP_FLAG],
    ['partial', WRAP_PARTIAL_FLAG],
    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
    ['rearg', WRAP_REARG_FLAG]
  ];

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      asyncTag = '[object AsyncFunction]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      domExcTag = '[object DOMException]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      nullTag = '[object Null]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      proxyTag = '[object Proxy]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]',
      undefinedTag = '[object Undefined]',
      weakMapTag = '[object WeakMap]',
      weakSetTag = '[object WeakSet]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to match empty string literals in compiled template source. */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /** Used to match HTML entities and HTML characters. */
  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
      reUnescapedHtml = /[&<>"']/g,
      reHasEscapedHtml = RegExp(reEscapedHtml.source),
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  /** Used to match template delimiters. */
  var reEscape = /<%-([\s\S]+?)%>/g,
      reEvaluate = /<%([\s\S]+?)%>/g,
      reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
      reHasRegExpChar = RegExp(reRegExpChar.source);

  /** Used to match leading whitespace. */
  var reTrimStart = /^\s+/;

  /** Used to match a single whitespace character. */
  var reWhitespace = /\s/;

  /** Used to match wrap detail comments. */
  var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
      reSplitDetails = /,? & /;

  /** Used to match words composed of alphanumeric characters. */
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

  /**
   * Used to validate the `validate` option in `_.template` variable.
   *
   * Forbids characters which could potentially change the meaning of the function argument definition:
   * - "()," (modification of function parameters)
   * - "=" (default value)
   * - "[]{}" (destructuring of function parameters)
   * - "/" (beginning of a comment)
   * - whitespace
   */
  var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Used to match
   * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
   */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /** Used to match Latin Unicode letters (excluding mathematical operators). */
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

  /** Used to ensure capturing order of template delimiters. */
  var reNoMatch = /($^)/;

  /** Used to match unescaped characters in compiled string literals. */
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

  /** Used to compose unicode character classes. */
  var rsAstralRange = '\\ud800-\\udfff',
      rsComboMarksRange = '\\u0300-\\u036f',
      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange = '\\u20d0-\\u20ff',
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
      rsDingbatRange = '\\u2700-\\u27bf',
      rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
      rsPunctuationRange = '\\u2000-\\u206f',
      rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
      rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
      rsVarRange = '\\ufe0e\\ufe0f',
      rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

  /** Used to compose unicode capture groups. */
  var rsApos = "['\u2019]",
      rsAstral = '[' + rsAstralRange + ']',
      rsBreak = '[' + rsBreakRange + ']',
      rsCombo = '[' + rsComboRange + ']',
      rsDigits = '\\d+',
      rsDingbat = '[' + rsDingbatRange + ']',
      rsLower = '[' + rsLowerRange + ']',
      rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
      rsFitz = '\\ud83c[\\udffb-\\udfff]',
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange + ']',
      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsUpper = '[' + rsUpperRange + ']',
      rsZWJ = '\\u200d';

  /** Used to compose unicode regexes. */
  var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
      reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange + ']?',
      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
      rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

  /** Used to match apostrophes. */
  var reApos = RegExp(rsApos, 'g');

  /**
   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
   */
  var reComboMark = RegExp(rsCombo, 'g');

  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

  /** Used to match complex or compound words. */
  var reUnicodeWord = RegExp([
    rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
    rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
    rsUpper + '+' + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsDigits,
    rsEmoji
  ].join('|'), 'g');

  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

  /** Used to detect strings that need a more robust regexp to match words. */
  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

  /** Used to assign default `context` object properties. */
  var contextProps = [
    'Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array',
    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object',
    'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array',
    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap',
    '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'
  ];

  /** Used to make template sourceURLs easier to identify. */
  var templateCounter = -1;

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
  cloneableTags[boolTag] = cloneableTags[dateTag] =
  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
  cloneableTags[int32Tag] = cloneableTags[mapTag] =
  cloneableTags[numberTag] = cloneableTags[objectTag] =
  cloneableTags[regexpTag] = cloneableTags[setTag] =
  cloneableTags[stringTag] = cloneableTags[symbolTag] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[weakMapTag] = false;

  /** Used to map Latin Unicode letters to basic Latin letters. */
  var deburredLetters = {
    // Latin-1 Supplement block.
    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C',  '\xe7': 'c',
    '\xd0': 'D',  '\xf0': 'd',
    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N',  '\xf1': 'n',
    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss',
    // Latin Extended-A block.
    '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
    '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
    '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
    '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
    '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
    '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
    '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
    '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
    '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
    '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
    '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
    '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
    '\u0134': 'J',  '\u0135': 'j',
    '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
    '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
    '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
    '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
    '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
    '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
    '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
    '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
    '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
    '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
    '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
    '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
    '\u0163': 't',  '\u0165': 't', '\u0167': 't',
    '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
    '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
    '\u0174': 'W',  '\u0175': 'w',
    '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
    '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
    '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
    '\u0132': 'IJ', '\u0133': 'ij',
    '\u0152': 'Oe', '\u0153': 'oe',
    '\u0149': "'n", '\u017f': 's'
  };

  /** Used to map characters to HTML entities. */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  /** Used to map HTML entities to characters. */
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };

  /** Used to escape characters for inclusion in compiled string literals. */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Built-in method references without a dependency on `root`. */
  var freeParseFloat = parseFloat,
      freeParseInt = parseInt;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  /* Node.js helper references. */
  var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
      nodeIsDate = nodeUtil && nodeUtil.isDate,
      nodeIsMap = nodeUtil && nodeUtil.isMap,
      nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
      nodeIsSet = nodeUtil && nodeUtil.isSet,
      nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  /*--------------------------------------------------------------------------*/

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /**
   * A specialized version of `baseAggregator` for arrays.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform keys.
   * @param {Object} accumulator The initial aggregated object.
   * @returns {Function} Returns `accumulator`.
   */
  function arrayAggregator(array, setter, iteratee, accumulator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      var value = array[index];
      setter(accumulator, value, iteratee(value), array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.forEachRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEachRight(array, iteratee) {
    var length = array == null ? 0 : array.length;

    while (length--) {
      if (iteratee(array[length], length, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.every` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   */
  function arrayEvery(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (!predicate(array[index], index, array)) {
        return false;
      }
    }
    return true;
  }

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  /**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && baseIndexOf(array, value, 0) > -1;
  }

  /**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludesWith(array, value, comparator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  /**
   * A specialized version of `_.reduce` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the first element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1,
        length = array == null ? 0 : array.length;

    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.reduceRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the last element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduceRight(array, iteratee, accumulator, initAccum) {
    var length = array == null ? 0 : array.length;
    if (initAccum && length) {
      accumulator = array[--length];
    }
    while (length--) {
      accumulator = iteratee(accumulator, array[length], length, array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Gets the size of an ASCII `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  var asciiSize = baseProperty('length');

  /**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function asciiToArray(string) {
    return string.split('');
  }

  /**
   * Splits an ASCII `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function asciiWords(string) {
    return string.match(reAsciiWord) || [];
  }

  /**
   * The base implementation of methods like `_.findKey` and `_.findLastKey`,
   * without support for iteratee shorthands, which iterates over `collection`
   * using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the found element or its key, else `undefined`.
   */
  function baseFindKey(collection, predicate, eachFunc) {
    var result;
    eachFunc(collection, function(value, key, collection) {
      if (predicate(value, key, collection)) {
        result = key;
        return false;
      }
    });
    return result;
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    return value === value
      ? strictIndexOf(array, value, fromIndex)
      : baseFindIndex(array, baseIsNaN, fromIndex);
  }

  /**
   * This function is like `baseIndexOf` except that it accepts a comparator.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOfWith(array, value, fromIndex, comparator) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (comparator(array[index], value)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */
  function baseIsNaN(value) {
    return value !== value;
  }

  /**
   * The base implementation of `_.mean` and `_.meanBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the mean.
   */
  function baseMean(array, iteratee) {
    var length = array == null ? 0 : array.length;
    return length ? (baseSum(array, iteratee) / length) : NAN;
  }

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined$1 : object[key];
    };
  }

  /**
   * The base implementation of `_.propertyOf` without support for deep paths.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyOf(object) {
    return function(key) {
      return object == null ? undefined$1 : object[key];
    };
  }

  /**
   * The base implementation of `_.reduce` and `_.reduceRight`, without support
   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} accumulator The initial value.
   * @param {boolean} initAccum Specify using the first or last element of
   *  `collection` as the initial value.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the accumulated value.
   */
  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
    eachFunc(collection, function(value, index, collection) {
      accumulator = initAccum
        ? (initAccum = false, value)
        : iteratee(accumulator, value, index, collection);
    });
    return accumulator;
  }

  /**
   * The base implementation of `_.sortBy` which uses `comparer` to define the
   * sort order of `array` and replaces criteria objects with their corresponding
   * values.
   *
   * @private
   * @param {Array} array The array to sort.
   * @param {Function} comparer The function to define sort order.
   * @returns {Array} Returns `array`.
   */
  function baseSortBy(array, comparer) {
    var length = array.length;

    array.sort(comparer);
    while (length--) {
      array[length] = array[length].value;
    }
    return array;
  }

  /**
   * The base implementation of `_.sum` and `_.sumBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the sum.
   */
  function baseSum(array, iteratee) {
    var result,
        index = -1,
        length = array.length;

    while (++index < length) {
      var current = iteratee(array[index]);
      if (current !== undefined$1) {
        result = result === undefined$1 ? current : (result + current);
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /**
   * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
   * of key-value pairs for `object` corresponding to the property names of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the key-value pairs.
   */
  function baseToPairs(object, props) {
    return arrayMap(props, function(key) {
      return [key, object[key]];
    });
  }

  /**
   * The base implementation of `_.trim`.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} Returns the trimmed string.
   */
  function baseTrim(string) {
    return string
      ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
      : string;
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues(object, props) {
    return arrayMap(props, function(key) {
      return object[key];
    });
  }

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  /**
   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the first unmatched string symbol.
   */
  function charsStartIndex(strSymbols, chrSymbols) {
    var index = -1,
        length = strSymbols.length;

    while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the last unmatched string symbol.
   */
  function charsEndIndex(strSymbols, chrSymbols) {
    var index = strSymbols.length;

    while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /**
   * Gets the number of `placeholder` occurrences in `array`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} placeholder The placeholder to search for.
   * @returns {number} Returns the placeholder count.
   */
  function countHolders(array, placeholder) {
    var length = array.length,
        result = 0;

    while (length--) {
      if (array[length] === placeholder) {
        ++result;
      }
    }
    return result;
  }

  /**
   * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
   * letters to basic Latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */
  var deburrLetter = basePropertyOf(deburredLetters);

  /**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  var escapeHtmlChar = basePropertyOf(htmlEscapes);

  /**
   * Used by `_.template` to escape characters for inclusion in compiled string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined$1 : object[key];
  }

  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }

  /**
   * Checks if `string` contains a word composed of Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a word is found, else `false`.
   */
  function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
  }

  /**
   * Converts `iterator` to an array.
   *
   * @private
   * @param {Object} iterator The iterator to convert.
   * @returns {Array} Returns the converted array.
   */
  function iteratorToArray(iterator) {
    var data,
        result = [];

    while (!(data = iterator.next()).done) {
      result.push(data.value);
    }
    return result;
  }

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (value === placeholder || value === PLACEHOLDER) {
        array[index] = PLACEHOLDER;
        result[resIndex++] = index;
      }
    }
    return result;
  }

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  /**
   * Converts `set` to its value-value pairs.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the value-value pairs.
   */
  function setToPairs(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = [value, value];
    });
    return result;
  }

  /**
   * A specialized version of `_.indexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * A specialized version of `_.lastIndexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictLastIndexOf(array, value, fromIndex) {
    var index = fromIndex + 1;
    while (index--) {
      if (array[index] === value) {
        return index;
      }
    }
    return index;
  }

  /**
   * Gets the number of symbols in `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the string size.
   */
  function stringSize(string) {
    return hasUnicode(string)
      ? unicodeSize(string)
      : asciiSize(string);
  }

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function stringToArray(string) {
    return hasUnicode(string)
      ? unicodeToArray(string)
      : asciiToArray(string);
  }

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
  function trimmedEndIndex(string) {
    var index = string.length;

    while (index-- && reWhitespace.test(string.charAt(index))) {}
    return index;
  }

  /**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
  var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

  /**
   * Gets the size of a Unicode `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  function unicodeSize(string) {
    var result = reUnicode.lastIndex = 0;
    while (reUnicode.test(string)) {
      ++result;
    }
    return result;
  }

  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }

  /**
   * Splits a Unicode `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a new pristine `lodash` function using the `context` object.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Util
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns a new `lodash` function.
   * @example
   *
   * _.mixin({ 'foo': _.constant('foo') });
   *
   * var lodash = _.runInContext();
   * lodash.mixin({ 'bar': lodash.constant('bar') });
   *
   * _.isFunction(_.foo);
   * // => true
   * _.isFunction(_.bar);
   * // => false
   *
   * lodash.isFunction(lodash.foo);
   * // => false
   * lodash.isFunction(lodash.bar);
   * // => true
   *
   * // Create a suped-up `defer` in Node.js.
   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
   */
  var runInContext = (function runInContext(context) {
    context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));

    /** Built-in constructor references. */
    var Array = context.Array,
        Date = context.Date,
        Error = context.Error,
        Function = context.Function,
        Math = context.Math,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;

    /** Used for built-in method references. */
    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;

    /** Used to detect overreaching core-js shims. */
    var coreJsData = context['__core-js_shared__'];

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to generate unique IDs. */
    var idCounter = 0;

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString.call(Object);

    /** Used to restore the original `_` reference in `_.noConflict`. */
    var oldDash = root._;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Built-in value references. */
    var Buffer = moduleExports ? context.Buffer : undefined$1,
        Symbol = context.Symbol,
        Uint8Array = context.Uint8Array,
        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined$1,
        getPrototype = overArg(Object.getPrototypeOf, Object),
        objectCreate = Object.create,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice,
        spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined$1,
        symIterator = Symbol ? Symbol.iterator : undefined$1,
        symToStringTag = Symbol ? Symbol.toStringTag : undefined$1;

    var defineProperty = (function() {
      try {
        var func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }());

    /** Mocked built-ins. */
    var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
        ctxNow = Date && Date.now !== root.Date.now && Date.now,
        ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeCeil = Math.ceil,
        nativeFloor = Math.floor,
        nativeGetSymbols = Object.getOwnPropertySymbols,
        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined$1,
        nativeIsFinite = context.isFinite,
        nativeJoin = arrayProto.join,
        nativeKeys = overArg(Object.keys, Object),
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeNow = Date.now,
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random,
        nativeReverse = arrayProto.reverse;

    /* Built-in method references that are verified to be native. */
    var DataView = getNative(context, 'DataView'),
        Map = getNative(context, 'Map'),
        Promise = getNative(context, 'Promise'),
        Set = getNative(context, 'Set'),
        WeakMap = getNative(context, 'WeakMap'),
        nativeCreate = getNative(Object, 'create');

    /** Used to store function metadata. */
    var metaMap = WeakMap && new WeakMap;

    /** Used to lookup unminified function names. */
    var realNames = {};

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap);

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol ? Symbol.prototype : undefined$1,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined$1,
        symbolToString = symbolProto ? symbolProto.toString : undefined$1;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object which wraps `value` to enable implicit method
     * chain sequences. Methods that operate on and return arrays, collections,
     * and functions can be chained together. Methods that retrieve a single value
     * or may return a primitive value will automatically end the chain sequence
     * and return the unwrapped value. Otherwise, the value must be unwrapped
     * with `_#value`.
     *
     * Explicit chain sequences, which must be unwrapped with `_#value`, may be
     * enabled using `_.chain`.
     *
     * The execution of chained methods is lazy, that is, it's deferred until
     * `_#value` is implicitly or explicitly called.
     *
     * Lazy evaluation allows several methods to support shortcut fusion.
     * Shortcut fusion is an optimization to merge iteratee calls; this avoids
     * the creation of intermediate arrays and can greatly reduce the number of
     * iteratee executions. Sections of a chain sequence qualify for shortcut
     * fusion if the section is applied to an array and iteratees accept only
     * one argument. The heuristic for whether a section qualifies for shortcut
     * fusion is subject to change.
     *
     * Chaining is supported in custom builds as long as the `_#value` method is
     * directly or indirectly included in the build.
     *
     * In addition to lodash methods, wrappers have `Array` and `String` methods.
     *
     * The wrapper `Array` methods are:
     * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
     *
     * The wrapper `String` methods are:
     * `replace` and `split`
     *
     * The wrapper methods that support shortcut fusion are:
     * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
     * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
     *
     * The chainable wrapper methods are:
     * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
     * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
     * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
     * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
     * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
     * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
     * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
     * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
     * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
     * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
     * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
     * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
     * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
     * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
     * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
     * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
     * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
     * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
     * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
     * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
     * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
     * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
     * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
     * `zipObject`, `zipObjectDeep`, and `zipWith`
     *
     * The wrapper methods that are **not** chainable by default are:
     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
     * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
     * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
     * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
     * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
     * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
     * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
     * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
     * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
     * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
     * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
     * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
     * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
     * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
     * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
     * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
     * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
     * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
     * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
     * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
     * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
     * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
     * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
     * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
     * `upperFirst`, `value`, and `words`
     *
     * @name _
     * @constructor
     * @category Seq
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // Returns an unwrapped value.
     * wrapped.reduce(_.add);
     * // => 6
     *
     * // Returns a wrapped value.
     * var squares = wrapped.map(square);
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
    function lodash(value) {
      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
        if (value instanceof LodashWrapper) {
          return value;
        }
        if (hasOwnProperty.call(value, '__wrapped__')) {
          return wrapperClone(value);
        }
      }
      return new LodashWrapper(value);
    }

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} proto The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    var baseCreate = (function() {
      function object() {}
      return function(proto) {
        if (!isObject(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object;
        object.prototype = undefined$1;
        return result;
      };
    }());

    /**
     * The function whose prototype chain sequence wrappers inherit from.
     *
     * @private
     */
    function baseLodash() {
      // No operation performed.
    }

    /**
     * The base constructor for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap.
     * @param {boolean} [chainAll] Enable explicit method chain sequences.
     */
    function LodashWrapper(value, chainAll) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__chain__ = !!chainAll;
      this.__index__ = 0;
      this.__values__ = undefined$1;
    }

    /**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB) as well as ES2015 template strings. Change the
     * following template settings to use alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type {Object}
     */
    lodash.templateSettings = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'escape': reEscape,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'evaluate': reEvaluate,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'interpolate': reInterpolate,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type {string}
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type {Object}
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type {Function}
         */
        '_': lodash
      }
    };

    // Ensure wrappers are instances of `baseLodash`.
    lodash.prototype = baseLodash.prototype;
    lodash.prototype.constructor = lodash;

    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
    LodashWrapper.prototype.constructor = LodashWrapper;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
     *
     * @private
     * @constructor
     * @param {*} value The value to wrap.
     */
    function LazyWrapper(value) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__dir__ = 1;
      this.__filtered__ = false;
      this.__iteratees__ = [];
      this.__takeCount__ = MAX_ARRAY_LENGTH;
      this.__views__ = [];
    }

    /**
     * Creates a clone of the lazy wrapper object.
     *
     * @private
     * @name clone
     * @memberOf LazyWrapper
     * @returns {Object} Returns the cloned `LazyWrapper` object.
     */
    function lazyClone() {
      var result = new LazyWrapper(this.__wrapped__);
      result.__actions__ = copyArray(this.__actions__);
      result.__dir__ = this.__dir__;
      result.__filtered__ = this.__filtered__;
      result.__iteratees__ = copyArray(this.__iteratees__);
      result.__takeCount__ = this.__takeCount__;
      result.__views__ = copyArray(this.__views__);
      return result;
    }

    /**
     * Reverses the direction of lazy iteration.
     *
     * @private
     * @name reverse
     * @memberOf LazyWrapper
     * @returns {Object} Returns the new reversed `LazyWrapper` object.
     */
    function lazyReverse() {
      if (this.__filtered__) {
        var result = new LazyWrapper(this);
        result.__dir__ = -1;
        result.__filtered__ = true;
      } else {
        result = this.clone();
        result.__dir__ *= -1;
      }
      return result;
    }

    /**
     * Extracts the unwrapped value from its lazy wrapper.
     *
     * @private
     * @name value
     * @memberOf LazyWrapper
     * @returns {*} Returns the unwrapped value.
     */
    function lazyValue() {
      var array = this.__wrapped__.value(),
          dir = this.__dir__,
          isArr = isArray(array),
          isRight = dir < 0,
          arrLength = isArr ? array.length : 0,
          view = getView(0, arrLength, this.__views__),
          start = view.start,
          end = view.end,
          length = end - start,
          index = isRight ? end : (start - 1),
          iteratees = this.__iteratees__,
          iterLength = iteratees.length,
          resIndex = 0,
          takeCount = nativeMin(length, this.__takeCount__);

      if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
        return baseWrapperValue(array, this.__actions__);
      }
      var result = [];

      outer:
      while (length-- && resIndex < takeCount) {
        index += dir;

        var iterIndex = -1,
            value = array[index];

        while (++iterIndex < iterLength) {
          var data = iteratees[iterIndex],
              iteratee = data.iteratee,
              type = data.type,
              computed = iteratee(value);

          if (type == LAZY_MAP_FLAG) {
            value = computed;
          } else if (!computed) {
            if (type == LAZY_FILTER_FLAG) {
              continue outer;
            } else {
              break outer;
            }
          }
        }
        result[resIndex++] = value;
      }
      return result;
    }

    // Ensure `LazyWrapper` is an instance of `baseLodash`.
    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
    LazyWrapper.prototype.constructor = LazyWrapper;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined$1 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : undefined$1;
    }

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? (data[key] !== undefined$1) : hasOwnProperty.call(data, key);
    }

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = (nativeCreate && value === undefined$1) ? HASH_UNDEFINED : value;
      return this;
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined$1 : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map || ListCache),
        'string': new Hash
      };
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      var result = getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      var data = getMapData(this, key),
          size = data.size;

      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /*------------------------------------------------------------------------*/

    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var index = -1,
          length = values == null ? 0 : values.length;

      this.__data__ = new MapCache;
      while (++index < length) {
        this.add(values[index]);
      }
    }

    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }

    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */
    function setCacheHas(value) {
      return this.__data__.has(value);
    }

    // Add methods to `SetCache`.
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new ListCache;
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      var data = this.__data__,
          result = data['delete'](key);

      this.size = data.size;
      return result;
    }

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value),
          isArg = !isArr && isArguments(value),
          isBuff = !isArr && !isArg && isBuffer(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) &&
            !(skipIndexes && (
               // Safari 9 has enumerable `arguments.length` in strict mode.
               key == 'length' ||
               // Node.js 0.10 has enumerable non-index properties on buffers.
               (isBuff && (key == 'offset' || key == 'parent')) ||
               // PhantomJS 2 has enumerable non-index properties on typed arrays.
               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
               // Skip index properties.
               isIndex(key, length)
            ))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.sample` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @returns {*} Returns the random element.
     */
    function arraySample(array) {
      var length = array.length;
      return length ? array[baseRandom(0, length - 1)] : undefined$1;
    }

    /**
     * A specialized version of `_.sampleSize` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */
    function arraySampleSize(array, n) {
      return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
    }

    /**
     * A specialized version of `_.shuffle` for arrays.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */
    function arrayShuffle(array) {
      return shuffleSelf(copyArray(array));
    }

    /**
     * This function is like `assignValue` except that it doesn't assign
     * `undefined` values.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignMergeValue(object, key, value) {
      if ((value !== undefined$1 && !eq(object[key], value)) ||
          (value === undefined$1 && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
          (value === undefined$1 && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * Aggregates elements of `collection` on `accumulator` with keys transformed
     * by `iteratee` and values set by `setter`.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform keys.
     * @param {Object} accumulator The initial aggregated object.
     * @returns {Function} Returns `accumulator`.
     */
    function baseAggregator(collection, setter, iteratee, accumulator) {
      baseEach(collection, function(value, key, collection) {
        setter(accumulator, value, iteratee(value), collection);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }

    /**
     * The base implementation of `_.assignIn` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssignIn(object, source) {
      return object && copyObject(source, keysIn(source), object);
    }

    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && defineProperty) {
        defineProperty(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    /**
     * The base implementation of `_.at` without support for individual paths.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {string[]} paths The property paths to pick.
     * @returns {Array} Returns the picked elements.
     */
    function baseAt(object, paths) {
      var index = -1,
          length = paths.length,
          result = Array(length),
          skip = object == null;

      while (++index < length) {
        result[index] = skip ? undefined$1 : get(object, paths[index]);
      }
      return result;
    }

    /**
     * The base implementation of `_.clamp` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     */
    function baseClamp(number, lower, upper) {
      if (number === number) {
        if (upper !== undefined$1) {
          number = number <= upper ? number : upper;
        }
        if (lower !== undefined$1) {
          number = number >= lower ? number : lower;
        }
      }
      return number;
    }

    /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Deep clone
     *  2 - Flatten inherited properties
     *  4 - Clone symbols
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result,
          isDeep = bitmask & CLONE_DEEP_FLAG,
          isFlat = bitmask & CLONE_FLAT_FLAG,
          isFull = bitmask & CLONE_SYMBOLS_FLAG;

      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== undefined$1) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value),
            isFunc = tag == funcTag || tag == genTag;

        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          result = (isFlat || isFunc) ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat
              ? copySymbolsIn(value, baseAssignIn(result, value))
              : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, isDeep);
        }
      }
      // Check for circular references and return its corresponding clone.
      stack || (stack = new Stack);
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);

      if (isSet(value)) {
        value.forEach(function(subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });
      } else if (isMap(value)) {
        value.forEach(function(subValue, key) {
          result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });
      }

      var keysFunc = isFull
        ? (isFlat ? getAllKeysIn : getAllKeys)
        : (isFlat ? keysIn : keys);

      var props = isArr ? undefined$1 : keysFunc(value);
      arrayEach(props || value, function(subValue, key) {
        if (props) {
          key = subValue;
          subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
      return result;
    }

    /**
     * The base implementation of `_.conforms` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     */
    function baseConforms(source) {
      var props = keys(source);
      return function(object) {
        return baseConformsTo(object, source, props);
      };
    }

    /**
     * The base implementation of `_.conformsTo` which accepts `props` to check.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     */
    function baseConformsTo(object, source, props) {
      var length = props.length;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (length--) {
        var key = props[length],
            predicate = source[key],
            value = object[key];

        if ((value === undefined$1 && !(key in object)) || !predicate(value)) {
          return false;
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.delay` and `_.defer` which accepts `args`
     * to provide to `func`.
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {Array} args The arguments to provide to `func`.
     * @returns {number|Object} Returns the timer id or timeout object.
     */
    function baseDelay(func, wait, args) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function() { func.apply(undefined$1, args); }, wait);
    }

    /**
     * The base implementation of methods like `_.difference` without support
     * for excluding multiple arrays or iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     */
    function baseDifference(array, values, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          isCommon = true,
          length = array.length,
          result = [],
          valuesLength = values.length;

      if (!length) {
        return result;
      }
      if (iteratee) {
        values = arrayMap(values, baseUnary(iteratee));
      }
      if (comparator) {
        includes = arrayIncludesWith;
        isCommon = false;
      }
      else if (values.length >= LARGE_ARRAY_SIZE) {
        includes = cacheHas;
        isCommon = false;
        values = new SetCache(values);
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee == null ? value : iteratee(value);

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var valuesIndex = valuesLength;
          while (valuesIndex--) {
            if (values[valuesIndex] === computed) {
              continue outer;
            }
          }
          result.push(value);
        }
        else if (!includes(values, computed, comparator)) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.forEach` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEach = createBaseEach(baseForOwn);

    /**
     * The base implementation of `_.forEachRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEachRight = createBaseEach(baseForOwnRight, true);

    /**
     * The base implementation of `_.every` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`
     */
    function baseEvery(collection, predicate) {
      var result = true;
      baseEach(collection, function(value, index, collection) {
        result = !!predicate(value, index, collection);
        return result;
      });
      return result;
    }

    /**
     * The base implementation of methods like `_.max` and `_.min` which accepts a
     * `comparator` to determine the extremum value.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The iteratee invoked per iteration.
     * @param {Function} comparator The comparator used to compare values.
     * @returns {*} Returns the extremum value.
     */
    function baseExtremum(array, iteratee, comparator) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        var value = array[index],
            current = iteratee(value);

        if (current != null && (computed === undefined$1
              ? (current === current && !isSymbol(current))
              : comparator(current, computed)
            )) {
          var computed = current,
              result = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.fill` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     */
    function baseFill(array, value, start, end) {
      var length = array.length;

      start = toInteger(start);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined$1 || end > length) ? length : toInteger(end);
      if (end < 0) {
        end += length;
      }
      end = start > end ? 0 : toLength(end);
      while (start < end) {
        array[start++] = value;
      }
      return array;
    }

    /**
     * The base implementation of `_.filter` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {number} depth The maximum recursion depth.
     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1,
          length = array.length;

      predicate || (predicate = isFlattenable);
      result || (result = []);

      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            // Recursively flatten arrays (susceptible to call stack limits).
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();

    /**
     * This function is like `baseFor` except that it iterates over properties
     * in the opposite order.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseForRight = createBaseFor(true);

    /**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwnRight(object, iteratee) {
      return object && baseForRight(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.functions` which creates an array of
     * `object` function property names filtered from `props`.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} props The property names to filter.
     * @returns {Array} Returns the function names.
     */
    function baseFunctions(object, props) {
      return arrayFilter(props, function(key) {
        return isFunction(object[key]);
      });
    }

    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path) {
      path = castPath(path, object);

      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined$1;
    }

    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined$1 ? undefinedTag : nullTag;
      }
      return (symToStringTag && symToStringTag in Object(value))
        ? getRawTag(value)
        : objectToString(value);
    }

    /**
     * The base implementation of `_.gt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     */
    function baseGt(value, other) {
      return value > other;
    }

    /**
     * The base implementation of `_.has` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHas(object, key) {
      return object != null && hasOwnProperty.call(object, key);
    }

    /**
     * The base implementation of `_.hasIn` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }

    /**
     * The base implementation of `_.inRange` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to check.
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     */
    function baseInRange(number, start, end) {
      return number >= nativeMin(start, end) && number < nativeMax(start, end);
    }

    /**
     * The base implementation of methods like `_.intersection`, without support
     * for iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of shared values.
     */
    function baseIntersection(arrays, iteratee, comparator) {
      var includes = comparator ? arrayIncludesWith : arrayIncludes,
          length = arrays[0].length,
          othLength = arrays.length,
          othIndex = othLength,
          caches = Array(othLength),
          maxLength = Infinity,
          result = [];

      while (othIndex--) {
        var array = arrays[othIndex];
        if (othIndex && iteratee) {
          array = arrayMap(array, baseUnary(iteratee));
        }
        maxLength = nativeMin(array.length, maxLength);
        caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
          ? new SetCache(othIndex && array)
          : undefined$1;
      }
      array = arrays[0];

      var index = -1,
          seen = caches[0];

      outer:
      while (++index < length && result.length < maxLength) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (!(seen
              ? cacheHas(seen, computed)
              : includes(result, computed, comparator)
            )) {
          othIndex = othLength;
          while (--othIndex) {
            var cache = caches[othIndex];
            if (!(cache
                  ? cacheHas(cache, computed)
                  : includes(arrays[othIndex], computed, comparator))
                ) {
              continue outer;
            }
          }
          if (seen) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.invert` and `_.invertBy` which inverts
     * `object` with values transformed by `iteratee` and set by `setter`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform values.
     * @param {Object} accumulator The initial inverted object.
     * @returns {Function} Returns `accumulator`.
     */
    function baseInverter(object, setter, iteratee, accumulator) {
      baseForOwn(object, function(value, key, object) {
        setter(accumulator, iteratee(value), key, object);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.invoke` without support for individual
     * method arguments.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {Array} args The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     */
    function baseInvoke(object, path, args) {
      path = castPath(path, object);
      object = parent(object, path);
      var func = object == null ? object : object[toKey(last(path))];
      return func == null ? undefined$1 : apply(func, object, args);
    }

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }

    /**
     * The base implementation of `_.isArrayBuffer` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     */
    function baseIsArrayBuffer(value) {
      return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
    }

    /**
     * The base implementation of `_.isDate` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     */
    function baseIsDate(value) {
      return isObjectLike(value) && baseGetTag(value) == dateTag;
    }

    /**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Unordered comparison
     *  2 - Partial comparison
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = objIsArr ? arrayTag : getTag(object),
          othTag = othIsArr ? arrayTag : getTag(other);

      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;

      var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;

      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack);
        return (objIsArr || isTypedArray(object))
          ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
          : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;

          stack || (stack = new Stack);
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack);
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }

    /**
     * The base implementation of `_.isMap` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     */
    function baseIsMap(value) {
      return isObjectLike(value) && getTag(value) == mapTag;
    }

    /**
     * The base implementation of `_.isMatch` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Array} matchData The property names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined$1 && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack;
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === undefined$1
                ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
                : result
              )) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * The base implementation of `_.isRegExp` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     */
    function baseIsRegExp(value) {
      return isObjectLike(value) && baseGetTag(value) == regexpTag;
    }

    /**
     * The base implementation of `_.isSet` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     */
    function baseIsSet(value) {
      return isObjectLike(value) && getTag(value) == setTag;
    }

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike(value) &&
        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }

    /**
     * The base implementation of `_.iteratee`.
     *
     * @private
     * @param {*} [value=_.identity] The value to convert to an iteratee.
     * @returns {Function} Returns the iteratee.
     */
    function baseIteratee(value) {
      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
      if (typeof value == 'function') {
        return value;
      }
      if (value == null) {
        return identity;
      }
      if (typeof value == 'object') {
        return isArray(value)
          ? baseMatchesProperty(value[0], value[1])
          : baseMatches(value);
      }
      return property(value);
    }

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.lt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     */
    function baseLt(value, other) {
      return value < other;
    }

    /**
     * The base implementation of `_.map` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function baseMap(collection, iteratee) {
      var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
      });
      return result;
    }

    /**
     * The base implementation of `_.matches` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }

    /**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return (objValue === undefined$1 && objValue === srcValue)
          ? hasIn(object, path)
          : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }

    /**
     * The base implementation of `_.merge` without support for multiple sources.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      baseFor(source, function(srcValue, key) {
        stack || (stack = new Stack);
        if (isObject(srcValue)) {
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        }
        else {
          var newValue = customizer
            ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
            : undefined$1;

          if (newValue === undefined$1) {
            newValue = srcValue;
          }
          assignMergeValue(object, key, newValue);
        }
      }, keysIn);
    }

    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = safeGet(object, key),
          srcValue = safeGet(source, key),
          stacked = stack.get(srcValue);

      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer
        ? customizer(objValue, srcValue, (key + ''), object, source, stack)
        : undefined$1;

      var isCommon = newValue === undefined$1;

      if (isCommon) {
        var isArr = isArray(srcValue),
            isBuff = !isArr && isBuffer(srcValue),
            isTyped = !isArr && !isBuff && isTypedArray(srcValue);

        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          }
          else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          }
          else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          }
          else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          }
          else {
            newValue = [];
          }
        }
        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          }
          else if (!isObject(objValue) || isFunction(objValue)) {
            newValue = initCloneObject(srcValue);
          }
        }
        else {
          isCommon = false;
        }
      }
      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
      }
      assignMergeValue(object, key, newValue);
    }

    /**
     * The base implementation of `_.nth` which doesn't coerce arguments.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {number} n The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     */
    function baseNth(array, n) {
      var length = array.length;
      if (!length) {
        return;
      }
      n += n < 0 ? length : 0;
      return isIndex(n, length) ? array[n] : undefined$1;
    }

    /**
     * The base implementation of `_.orderBy` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {string[]} orders The sort orders of `iteratees`.
     * @returns {Array} Returns the new sorted array.
     */
    function baseOrderBy(collection, iteratees, orders) {
      if (iteratees.length) {
        iteratees = arrayMap(iteratees, function(iteratee) {
          if (isArray(iteratee)) {
            return function(value) {
              return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
            }
          }
          return iteratee;
        });
      } else {
        iteratees = [identity];
      }

      var index = -1;
      iteratees = arrayMap(iteratees, baseUnary(getIteratee()));

      var result = baseMap(collection, function(value, key, collection) {
        var criteria = arrayMap(iteratees, function(iteratee) {
          return iteratee(value);
        });
        return { 'criteria': criteria, 'index': ++index, 'value': value };
      });

      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }

    /**
     * The base implementation of `_.pick` without support for individual
     * property identifiers.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @returns {Object} Returns the new object.
     */
    function basePick(object, paths) {
      return basePickBy(object, paths, function(value, path) {
        return hasIn(object, path);
      });
    }

    /**
     * The base implementation of  `_.pickBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @param {Function} predicate The function invoked per property.
     * @returns {Object} Returns the new object.
     */
    function basePickBy(object, paths, predicate) {
      var index = -1,
          length = paths.length,
          result = {};

      while (++index < length) {
        var path = paths[index],
            value = baseGet(object, path);

        if (predicate(value, path)) {
          baseSet(result, castPath(path, object), value);
        }
      }
      return result;
    }

    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }

    /**
     * The base implementation of `_.pullAllBy` without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     */
    function basePullAll(array, values, iteratee, comparator) {
      var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
          index = -1,
          length = values.length,
          seen = array;

      if (array === values) {
        values = copyArray(values);
      }
      if (iteratee) {
        seen = arrayMap(array, baseUnary(iteratee));
      }
      while (++index < length) {
        var fromIndex = 0,
            value = values[index],
            computed = iteratee ? iteratee(value) : value;

        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
          if (seen !== array) {
            splice.call(seen, fromIndex, 1);
          }
          splice.call(array, fromIndex, 1);
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.pullAt` without support for individual
     * indexes or capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */
    function basePullAt(array, indexes) {
      var length = array ? indexes.length : 0,
          lastIndex = length - 1;

      while (length--) {
        var index = indexes[length];
        if (length == lastIndex || index !== previous) {
          var previous = index;
          if (isIndex(index)) {
            splice.call(array, index, 1);
          } else {
            baseUnset(array, index);
          }
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.random` without support for returning
     * floating-point numbers.
     *
     * @private
     * @param {number} lower The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the random number.
     */
    function baseRandom(lower, upper) {
      return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
    }

    /**
     * The base implementation of `_.range` and `_.rangeRight` which doesn't
     * coerce arguments.
     *
     * @private
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @param {number} step The value to increment or decrement by.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the range of numbers.
     */
    function baseRange(start, end, step, fromRight) {
      var index = -1,
          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
          result = Array(length);

      while (length--) {
        result[fromRight ? length : ++index] = start;
        start += step;
      }
      return result;
    }

    /**
     * The base implementation of `_.repeat` which doesn't coerce arguments.
     *
     * @private
     * @param {string} string The string to repeat.
     * @param {number} n The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     */
    function baseRepeat(string, n) {
      var result = '';
      if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
        return result;
      }
      // Leverage the exponentiation by squaring algorithm for a faster repeat.
      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
      do {
        if (n % 2) {
          result += string;
        }
        n = nativeFloor(n / 2);
        if (n) {
          string += string;
        }
      } while (n);

      return result;
    }

    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + '');
    }

    /**
     * The base implementation of `_.sample`.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     */
    function baseSample(collection) {
      return arraySample(values(collection));
    }

    /**
     * The base implementation of `_.sampleSize` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */
    function baseSampleSize(collection, n) {
      var array = values(collection);
      return shuffleSelf(array, baseClamp(n, 0, array.length));
    }

    /**
     * The base implementation of `_.set`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseSet(object, path, value, customizer) {
      if (!isObject(object)) {
        return object;
      }
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          lastIndex = length - 1,
          nested = object;

      while (nested != null && ++index < length) {
        var key = toKey(path[index]),
            newValue = value;

        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
          return object;
        }

        if (index != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
          if (newValue === undefined$1) {
            newValue = isObject(objValue)
              ? objValue
              : (isIndex(path[index + 1]) ? [] : {});
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }

    /**
     * The base implementation of `setData` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var baseSetData = !metaMap ? identity : function(func, data) {
      metaMap.set(func, data);
      return func;
    };

    /**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var baseSetToString = !defineProperty ? identity : function(func, string) {
      return defineProperty(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant(string),
        'writable': true
      });
    };

    /**
     * The base implementation of `_.shuffle`.
     *
     * @private
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */
    function baseShuffle(collection) {
      return shuffleSelf(values(collection));
    }

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    /**
     * The base implementation of `_.some` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function baseSome(collection, predicate) {
      var result;

      baseEach(collection, function(value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
      });
      return !!result;
    }

    /**
     * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
     * performs a binary search of `array` to determine the index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function baseSortedIndex(array, value, retHighest) {
      var low = 0,
          high = array == null ? low : array.length;

      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
        while (low < high) {
          var mid = (low + high) >>> 1,
              computed = array[mid];

          if (computed !== null && !isSymbol(computed) &&
              (retHighest ? (computed <= value) : (computed < value))) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return high;
      }
      return baseSortedIndexBy(array, value, identity, retHighest);
    }

    /**
     * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
     * which invokes `iteratee` for `value` and each element of `array` to compute
     * their sort ranking. The iteratee is invoked with one argument; (value).
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} iteratee The iteratee invoked per element.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function baseSortedIndexBy(array, value, iteratee, retHighest) {
      var low = 0,
          high = array == null ? 0 : array.length;
      if (high === 0) {
        return 0;
      }

      value = iteratee(value);
      var valIsNaN = value !== value,
          valIsNull = value === null,
          valIsSymbol = isSymbol(value),
          valIsUndefined = value === undefined$1;

      while (low < high) {
        var mid = nativeFloor((low + high) / 2),
            computed = iteratee(array[mid]),
            othIsDefined = computed !== undefined$1,
            othIsNull = computed === null,
            othIsReflexive = computed === computed,
            othIsSymbol = isSymbol(computed);

        if (valIsNaN) {
          var setLow = retHighest || othIsReflexive;
        } else if (valIsUndefined) {
          setLow = othIsReflexive && (retHighest || othIsDefined);
        } else if (valIsNull) {
          setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
        } else if (valIsSymbol) {
          setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
        } else if (othIsNull || othIsSymbol) {
          setLow = false;
        } else {
          setLow = retHighest ? (computed <= value) : (computed < value);
        }
        if (setLow) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return nativeMin(high, MAX_ARRAY_INDEX);
    }

    /**
     * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
     * support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseSortedUniq(array, iteratee) {
      var index = -1,
          length = array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        if (!index || !eq(computed, seen)) {
          var seen = computed;
          result[resIndex++] = value === 0 ? 0 : value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.toNumber` which doesn't ensure correct
     * conversions of binary, hexadecimal, or octal string values.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     */
    function baseToNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      return +value;
    }

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return arrayMap(value, baseToString) + '';
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseUniq(array, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          length = array.length,
          isCommon = true,
          result = [],
          seen = result;

      if (comparator) {
        isCommon = false;
        includes = arrayIncludesWith;
      }
      else if (length >= LARGE_ARRAY_SIZE) {
        var set = iteratee ? null : createSet(array);
        if (set) {
          return setToArray(set);
        }
        isCommon = false;
        includes = cacheHas;
        seen = new SetCache;
      }
      else {
        seen = iteratee ? [] : result;
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        }
        else if (!includes(seen, computed, comparator)) {
          if (seen !== result) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.unset`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The property path to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     */
    function baseUnset(object, path) {
      path = castPath(path, object);
      object = parent(object, path);
      return object == null || delete object[toKey(last(path))];
    }

    /**
     * The base implementation of `_.update`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to update.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseUpdate(object, path, updater, customizer) {
      return baseSet(object, path, updater(baseGet(object, path)), customizer);
    }

    /**
     * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
     * without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {Function} predicate The function invoked per iteration.
     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseWhile(array, predicate, isDrop, fromRight) {
      var length = array.length,
          index = fromRight ? length : -1;

      while ((fromRight ? index-- : ++index < length) &&
        predicate(array[index], index, array)) {}

      return isDrop
        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
    }

    /**
     * The base implementation of `wrapperValue` which returns the result of
     * performing a sequence of actions on the unwrapped `value`, where each
     * successive action is supplied the return value of the previous.
     *
     * @private
     * @param {*} value The unwrapped value.
     * @param {Array} actions Actions to perform to resolve the unwrapped value.
     * @returns {*} Returns the resolved value.
     */
    function baseWrapperValue(value, actions) {
      var result = value;
      if (result instanceof LazyWrapper) {
        result = result.value();
      }
      return arrayReduce(actions, function(result, action) {
        return action.func.apply(action.thisArg, arrayPush([result], action.args));
      }, result);
    }

    /**
     * The base implementation of methods like `_.xor`, without support for
     * iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of values.
     */
    function baseXor(arrays, iteratee, comparator) {
      var length = arrays.length;
      if (length < 2) {
        return length ? baseUniq(arrays[0]) : [];
      }
      var index = -1,
          result = Array(length);

      while (++index < length) {
        var array = arrays[index],
            othIndex = -1;

        while (++othIndex < length) {
          if (othIndex != index) {
            result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
          }
        }
      }
      return baseUniq(baseFlatten(result, 1), iteratee, comparator);
    }

    /**
     * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
     *
     * @private
     * @param {Array} props The property identifiers.
     * @param {Array} values The property values.
     * @param {Function} assignFunc The function to assign values.
     * @returns {Object} Returns the new object.
     */
    function baseZipObject(props, values, assignFunc) {
      var index = -1,
          length = props.length,
          valsLength = values.length,
          result = {};

      while (++index < length) {
        var value = index < valsLength ? values[index] : undefined$1;
        assignFunc(result, props[index], value);
      }
      return result;
    }

    /**
     * Casts `value` to an empty array if it's not an array like object.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Array|Object} Returns the cast array-like object.
     */
    function castArrayLikeObject(value) {
      return isArrayLikeObject(value) ? value : [];
    }

    /**
     * Casts `value` to `identity` if it's not a function.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Function} Returns cast function.
     */
    function castFunction(value) {
      return typeof value == 'function' ? value : identity;
    }

    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {Object} [object] The object to query keys on.
     * @returns {Array} Returns the cast property path array.
     */
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }

    /**
     * A `baseRest` alias which can be replaced with `identity` by module
     * replacement plugins.
     *
     * @private
     * @type {Function}
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    var castRest = baseRest;

    /**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined$1 ? length : end;
      return (!start && end >= length) ? array : baseSlice(array, start, end);
    }

    /**
     * A simple wrapper around the global [`clearTimeout`](https://mdn.io/clearTimeout).
     *
     * @private
     * @param {number|Object} id The timer id or timeout object of the timer to clear.
     */
    var clearTimeout = ctxClearTimeout || function(id) {
      return root.clearTimeout(id);
    };

    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

      buffer.copy(result);
      return result;
    }

    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }

    /**
     * Creates a clone of `dataView`.
     *
     * @private
     * @param {Object} dataView The data view to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned data view.
     */
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }

    /**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }

    /**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }

    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    /**
     * Compares values to sort them in ascending order.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {number} Returns the sort order indicator for `value`.
     */
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== undefined$1,
            valIsNull = value === null,
            valIsReflexive = value === value,
            valIsSymbol = isSymbol(value);

        var othIsDefined = other !== undefined$1,
            othIsNull = other === null,
            othIsReflexive = other === other,
            othIsSymbol = isSymbol(other);

        if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
            (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
            (valIsNull && othIsDefined && othIsReflexive) ||
            (!valIsDefined && othIsReflexive) ||
            !valIsReflexive) {
          return 1;
        }
        if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
            (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
            (othIsNull && valIsDefined && valIsReflexive) ||
            (!othIsDefined && valIsReflexive) ||
            !othIsReflexive) {
          return -1;
        }
      }
      return 0;
    }

    /**
     * Used by `_.orderBy` to compare multiple properties of a value to another
     * and stable sort them.
     *
     * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
     * specify an order of "desc" for descending or "asc" for ascending sort order
     * of corresponding values.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {boolean[]|string[]} orders The order to sort by for each property.
     * @returns {number} Returns the sort order indicator for `object`.
     */
    function compareMultiple(object, other, orders) {
      var index = -1,
          objCriteria = object.criteria,
          othCriteria = other.criteria,
          length = objCriteria.length,
          ordersLength = orders.length;

      while (++index < length) {
        var result = compareAscending(objCriteria[index], othCriteria[index]);
        if (result) {
          if (index >= ordersLength) {
            return result;
          }
          var order = orders[index];
          return result * (order == 'desc' ? -1 : 1);
        }
      }
      // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
      // that causes it, under certain circumstances, to provide the same value for
      // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
      // for more details.
      //
      // This also ensures a stable sort in V8 and other engines.
      // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
      return object.index - other.index;
    }

    /**
     * Creates an array that is the composition of partially applied arguments,
     * placeholders, and provided arguments into a single array of arguments.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to prepend to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgs(args, partials, holders, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          holdersLength = holders.length,
          leftIndex = -1,
          leftLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(leftLength + rangeLength),
          isUncurried = !isCurried;

      while (++leftIndex < leftLength) {
        result[leftIndex] = partials[leftIndex];
      }
      while (++argsIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          result[holders[argsIndex]] = args[argsIndex];
        }
      }
      while (rangeLength--) {
        result[leftIndex++] = args[argsIndex++];
      }
      return result;
    }

    /**
     * This function is like `composeArgs` except that the arguments composition
     * is tailored for `_.partialRight`.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to append to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgsRight(args, partials, holders, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          holdersIndex = -1,
          holdersLength = holders.length,
          rightIndex = -1,
          rightLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(rangeLength + rightLength),
          isUncurried = !isCurried;

      while (++argsIndex < rangeLength) {
        result[argsIndex] = args[argsIndex];
      }
      var offset = argsIndex;
      while (++rightIndex < rightLength) {
        result[offset + rightIndex] = partials[rightIndex];
      }
      while (++holdersIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          result[offset + holders[holdersIndex]] = args[argsIndex++];
        }
      }
      return result;
    }

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];

        var newValue = customizer
          ? customizer(object[key], source[key], key, object, source)
          : undefined$1;

        if (newValue === undefined$1) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }

    /**
     * Copies own symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }

    /**
     * Copies own and inherited symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbolsIn(source, object) {
      return copyObject(source, getSymbolsIn(source), object);
    }

    /**
     * Creates a function like `_.groupBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} [initializer] The accumulator object initializer.
     * @returns {Function} Returns the new aggregator function.
     */
    function createAggregator(setter, initializer) {
      return function(collection, iteratee) {
        var func = isArray(collection) ? arrayAggregator : baseAggregator,
            accumulator = initializer ? initializer() : {};

        return func(collection, setter, getIteratee(iteratee, 2), accumulator);
      };
    }

    /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined$1,
            guard = length > 2 ? sources[2] : undefined$1;

        customizer = (assigner.length > 3 && typeof customizer == 'function')
          ? (length--, customizer)
          : undefined$1;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined$1 : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }

    /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length,
            index = fromRight ? length : -1,
            iterable = Object(collection);

        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }

    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    /**
     * Creates a function that wraps `func` to invoke it with the optional `this`
     * binding of `thisArg`.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createBind(func, bitmask, thisArg) {
      var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);

      function wrapper() {
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(isBind ? thisArg : this, arguments);
      }
      return wrapper;
    }

    /**
     * Creates a function like `_.lowerFirst`.
     *
     * @private
     * @param {string} methodName The name of the `String` case method to use.
     * @returns {Function} Returns the new case function.
     */
    function createCaseFirst(methodName) {
      return function(string) {
        string = toString(string);

        var strSymbols = hasUnicode(string)
          ? stringToArray(string)
          : undefined$1;

        var chr = strSymbols
          ? strSymbols[0]
          : string.charAt(0);

        var trailing = strSymbols
          ? castSlice(strSymbols, 1).join('')
          : string.slice(1);

        return chr[methodName]() + trailing;
      };
    }

    /**
     * Creates a function like `_.camelCase`.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
    function createCompounder(callback) {
      return function(string) {
        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
      };
    }

    /**
     * Creates a function that produces an instance of `Ctor` regardless of
     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
     *
     * @private
     * @param {Function} Ctor The constructor to wrap.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCtor(Ctor) {
      return function() {
        // Use a `switch` statement to work with class constructors. See
        // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
        // for more details.
        var args = arguments;
        switch (args.length) {
          case 0: return new Ctor;
          case 1: return new Ctor(args[0]);
          case 2: return new Ctor(args[0], args[1]);
          case 3: return new Ctor(args[0], args[1], args[2]);
          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
          case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
          case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        }
        var thisBinding = baseCreate(Ctor.prototype),
            result = Ctor.apply(thisBinding, args);

        // Mimic the constructor's `return` behavior.
        // See https://es5.github.io/#x13.2.2 for more details.
        return isObject(result) ? result : thisBinding;
      };
    }

    /**
     * Creates a function that wraps `func` to enable currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {number} arity The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCurry(func, bitmask, arity) {
      var Ctor = createCtor(func);

      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length,
            placeholder = getHolder(wrapper);

        while (index--) {
          args[index] = arguments[index];
        }
        var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
          ? []
          : replaceHolders(args, placeholder);

        length -= holders.length;
        if (length < arity) {
          return createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, undefined$1,
            args, holders, undefined$1, undefined$1, arity - length);
        }
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return apply(fn, this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.find` or `_.findLast` function.
     *
     * @private
     * @param {Function} findIndexFunc The function to find the collection index.
     * @returns {Function} Returns the new find function.
     */
    function createFind(findIndexFunc) {
      return function(collection, predicate, fromIndex) {
        var iterable = Object(collection);
        if (!isArrayLike(collection)) {
          var iteratee = getIteratee(predicate, 3);
          collection = keys(collection);
          predicate = function(key) { return iteratee(iterable[key], key, iterable); };
        }
        var index = findIndexFunc(collection, predicate, fromIndex);
        return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined$1;
      };
    }

    /**
     * Creates a `_.flow` or `_.flowRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new flow function.
     */
    function createFlow(fromRight) {
      return flatRest(function(funcs) {
        var length = funcs.length,
            index = length,
            prereq = LodashWrapper.prototype.thru;

        if (fromRight) {
          funcs.reverse();
        }
        while (index--) {
          var func = funcs[index];
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
            var wrapper = new LodashWrapper([], true);
          }
        }
        index = wrapper ? index : length;
        while (++index < length) {
          func = funcs[index];

          var funcName = getFuncName(func),
              data = funcName == 'wrapper' ? getData(func) : undefined$1;

          if (data && isLaziable(data[0]) &&
                data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
                !data[4].length && data[9] == 1
              ) {
            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
          } else {
            wrapper = (func.length == 1 && isLaziable(func))
              ? wrapper[funcName]()
              : wrapper.thru(func);
          }
        }
        return function() {
          var args = arguments,
              value = args[0];

          if (wrapper && args.length == 1 && isArray(value)) {
            return wrapper.plant(value).value();
          }
          var index = 0,
              result = length ? funcs[index].apply(this, args) : value;

          while (++index < length) {
            result = funcs[index].call(this, result);
          }
          return result;
        };
      });
    }

    /**
     * Creates a function that wraps `func` to invoke it with optional `this`
     * binding of `thisArg`, partial application, and currying.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [partialsRight] The arguments to append to those provided
     *  to the new function.
     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
      var isAry = bitmask & WRAP_ARY_FLAG,
          isBind = bitmask & WRAP_BIND_FLAG,
          isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
          isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
          isFlip = bitmask & WRAP_FLIP_FLAG,
          Ctor = isBindKey ? undefined$1 : createCtor(func);

      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length;

        while (index--) {
          args[index] = arguments[index];
        }
        if (isCurried) {
          var placeholder = getHolder(wrapper),
              holdersCount = countHolders(args, placeholder);
        }
        if (partials) {
          args = composeArgs(args, partials, holders, isCurried);
        }
        if (partialsRight) {
          args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
        }
        length -= holdersCount;
        if (isCurried && length < arity) {
          var newHolders = replaceHolders(args, placeholder);
          return createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, thisArg,
            args, newHolders, argPos, ary, arity - length
          );
        }
        var thisBinding = isBind ? thisArg : this,
            fn = isBindKey ? thisBinding[func] : func;

        length = args.length;
        if (argPos) {
          args = reorder(args, argPos);
        } else if (isFlip && length > 1) {
          args.reverse();
        }
        if (isAry && ary < length) {
          args.length = ary;
        }
        if (this && this !== root && this instanceof wrapper) {
          fn = Ctor || createCtor(fn);
        }
        return fn.apply(thisBinding, args);
      }
      return wrapper;
    }

    /**
     * Creates a function like `_.invertBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} toIteratee The function to resolve iteratees.
     * @returns {Function} Returns the new inverter function.
     */
    function createInverter(setter, toIteratee) {
      return function(object, iteratee) {
        return baseInverter(object, setter, toIteratee(iteratee), {});
      };
    }

    /**
     * Creates a function that performs a mathematical operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @param {number} [defaultValue] The value used for `undefined` arguments.
     * @returns {Function} Returns the new mathematical operation function.
     */
    function createMathOperation(operator, defaultValue) {
      return function(value, other) {
        var result;
        if (value === undefined$1 && other === undefined$1) {
          return defaultValue;
        }
        if (value !== undefined$1) {
          result = value;
        }
        if (other !== undefined$1) {
          if (result === undefined$1) {
            return other;
          }
          if (typeof value == 'string' || typeof other == 'string') {
            value = baseToString(value);
            other = baseToString(other);
          } else {
            value = baseToNumber(value);
            other = baseToNumber(other);
          }
          result = operator(value, other);
        }
        return result;
      };
    }

    /**
     * Creates a function like `_.over`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over iteratees.
     * @returns {Function} Returns the new over function.
     */
    function createOver(arrayFunc) {
      return flatRest(function(iteratees) {
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
        return baseRest(function(args) {
          var thisArg = this;
          return arrayFunc(iteratees, function(iteratee) {
            return apply(iteratee, thisArg, args);
          });
        });
      });
    }

    /**
     * Creates the padding for `string` based on `length`. The `chars` string
     * is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {number} length The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padding for `string`.
     */
    function createPadding(length, chars) {
      chars = chars === undefined$1 ? ' ' : baseToString(chars);

      var charsLength = chars.length;
      if (charsLength < 2) {
        return charsLength ? baseRepeat(chars, length) : chars;
      }
      var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
      return hasUnicode(chars)
        ? castSlice(stringToArray(result), 0, length).join('')
        : result.slice(0, length);
    }

    /**
     * Creates a function that wraps `func` to invoke it with the `this` binding
     * of `thisArg` and `partials` prepended to the arguments it receives.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} partials The arguments to prepend to those provided to
     *  the new function.
     * @returns {Function} Returns the new wrapped function.
     */
    function createPartial(func, bitmask, thisArg, partials) {
      var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);

      function wrapper() {
        var argsIndex = -1,
            argsLength = arguments.length,
            leftIndex = -1,
            leftLength = partials.length,
            args = Array(leftLength + argsLength),
            fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

        while (++leftIndex < leftLength) {
          args[leftIndex] = partials[leftIndex];
        }
        while (argsLength--) {
          args[leftIndex++] = arguments[++argsIndex];
        }
        return apply(fn, isBind ? thisArg : this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.range` or `_.rangeRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new range function.
     */
    function createRange(fromRight) {
      return function(start, end, step) {
        if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
          end = step = undefined$1;
        }
        // Ensure the sign of `-0` is preserved.
        start = toFinite(start);
        if (end === undefined$1) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        step = step === undefined$1 ? (start < end ? 1 : -1) : toFinite(step);
        return baseRange(start, end, step, fromRight);
      };
    }

    /**
     * Creates a function that performs a relational operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @returns {Function} Returns the new relational operation function.
     */
    function createRelationalOperation(operator) {
      return function(value, other) {
        if (!(typeof value == 'string' && typeof other == 'string')) {
          value = toNumber(value);
          other = toNumber(other);
        }
        return operator(value, other);
      };
    }

    /**
     * Creates a function that wraps `func` to continue currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {Function} wrapFunc The function to create the `func` wrapper.
     * @param {*} placeholder The placeholder value.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
      var isCurry = bitmask & WRAP_CURRY_FLAG,
          newHolders = isCurry ? holders : undefined$1,
          newHoldersRight = isCurry ? undefined$1 : holders,
          newPartials = isCurry ? partials : undefined$1,
          newPartialsRight = isCurry ? undefined$1 : partials;

      bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
      bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

      if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
        bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
      }
      var newData = [
        func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
        newHoldersRight, argPos, ary, arity
      ];

      var result = wrapFunc.apply(undefined$1, newData);
      if (isLaziable(func)) {
        setData(result, newData);
      }
      result.placeholder = placeholder;
      return setWrapToString(result, func, bitmask);
    }

    /**
     * Creates a function like `_.round`.
     *
     * @private
     * @param {string} methodName The name of the `Math` method to use when rounding.
     * @returns {Function} Returns the new round function.
     */
    function createRound(methodName) {
      var func = Math[methodName];
      return function(number, precision) {
        number = toNumber(number);
        precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
        if (precision && nativeIsFinite(number)) {
          // Shift with exponential notation to avoid floating-point issues.
          // See [MDN](https://mdn.io/round#Examples) for more details.
          var pair = (toString(number) + 'e').split('e'),
              value = func(pair[0] + 'e' + (+pair[1] + precision));

          pair = (toString(value) + 'e').split('e');
          return +(pair[0] + 'e' + (+pair[1] - precision));
        }
        return func(number);
      };
    }

    /**
     * Creates a set object of `values`.
     *
     * @private
     * @param {Array} values The values to add to the set.
     * @returns {Object} Returns the new set.
     */
    var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
      return new Set(values);
    };

    /**
     * Creates a `_.toPairs` or `_.toPairsIn` function.
     *
     * @private
     * @param {Function} keysFunc The function to get the keys of a given object.
     * @returns {Function} Returns the new pairs function.
     */
    function createToPairs(keysFunc) {
      return function(object) {
        var tag = getTag(object);
        if (tag == mapTag) {
          return mapToArray(object);
        }
        if (tag == setTag) {
          return setToPairs(object);
        }
        return baseToPairs(object, keysFunc(object));
      };
    }

    /**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags.
     *    1 - `_.bind`
     *    2 - `_.bindKey`
     *    4 - `_.curry` or `_.curryRight` of a bound function
     *    8 - `_.curry`
     *   16 - `_.curryRight`
     *   32 - `_.partial`
     *   64 - `_.partialRight`
     *  128 - `_.rearg`
     *  256 - `_.ary`
     *  512 - `_.flip`
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
      var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
      if (!isBindKey && typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var length = partials ? partials.length : 0;
      if (!length) {
        bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
        partials = holders = undefined$1;
      }
      ary = ary === undefined$1 ? ary : nativeMax(toInteger(ary), 0);
      arity = arity === undefined$1 ? arity : toInteger(arity);
      length -= holders ? holders.length : 0;

      if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
        var partialsRight = partials,
            holdersRight = holders;

        partials = holders = undefined$1;
      }
      var data = isBindKey ? undefined$1 : getData(func);

      var newData = [
        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
        argPos, ary, arity
      ];

      if (data) {
        mergeData(newData, data);
      }
      func = newData[0];
      bitmask = newData[1];
      thisArg = newData[2];
      partials = newData[3];
      holders = newData[4];
      arity = newData[9] = newData[9] === undefined$1
        ? (isBindKey ? 0 : func.length)
        : nativeMax(newData[9] - length, 0);

      if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
        bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
      }
      if (!bitmask || bitmask == WRAP_BIND_FLAG) {
        var result = createBind(func, bitmask, thisArg);
      } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
        result = createCurry(func, bitmask, arity);
      } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
        result = createPartial(func, bitmask, thisArg, partials);
      } else {
        result = createHybrid.apply(undefined$1, newData);
      }
      var setter = data ? baseSetData : setData;
      return setWrapToString(setter(result, newData), func, bitmask);
    }

    /**
     * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
     * of source objects to the destination object for all destination properties
     * that resolve to `undefined`.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to assign.
     * @param {Object} object The parent object of `objValue`.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsAssignIn(objValue, srcValue, key, object) {
      if (objValue === undefined$1 ||
          (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
        return srcValue;
      }
      return objValue;
    }

    /**
     * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
     * objects into destination objects that are passed thru.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to merge.
     * @param {Object} object The parent object of `objValue`.
     * @param {Object} source The parent object of `srcValue`.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
      if (isObject(objValue) && isObject(srcValue)) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, objValue);
        baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
        stack['delete'](srcValue);
      }
      return objValue;
    }

    /**
     * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
     * objects.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {string} key The key of the property to inspect.
     * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
     */
    function customOmitClone(value) {
      return isPlainObject(value) ? undefined$1 : value;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      // Check that cyclic values are equal.
      var arrStacked = stack.get(array);
      var othStacked = stack.get(other);
      if (arrStacked && othStacked) {
        return arrStacked == other && othStacked == array;
      }
      var index = -1,
          result = true,
          seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined$1;

      stack.set(array, other);
      stack.set(other, array);

      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, arrValue, index, other, array, stack)
            : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined$1) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
          if (!arraySome(other, function(othValue, othIndex) {
                if (!cacheHas(seen, othIndex) &&
                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
            result = false;
            break;
          }
        } else if (!(
              arrValue === othValue ||
                equalFunc(arrValue, othValue, bitmask, customizer, stack)
            )) {
          result = false;
          break;
        }
      }
      stack['delete'](array);
      stack['delete'](other);
      return result;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if ((object.byteLength != other.byteLength) ||
              (object.byteOffset != other.byteOffset)) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;

        case arrayBufferTag:
          if ((object.byteLength != other.byteLength) ||
              !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;

        case boolTag:
        case dateTag:
        case numberTag:
          // Coerce booleans to `1` or `0` and dates to milliseconds.
          // Invalid dates are coerced to `NaN`.
          return eq(+object, +other);

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case regexpTag:
        case stringTag:
          // Coerce regexes to strings and treat strings, primitives and objects,
          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
          // for more details.
          return object == (other + '');

        case mapTag:
          var convert = mapToArray;

        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);

          if (object.size != other.size && !isPartial) {
            return false;
          }
          // Assume cyclic values are equal.
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;

          // Recursively compare objects (susceptible to call stack limits).
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack['delete'](object);
          return result;

        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          objProps = getAllKeys(object),
          objLength = objProps.length,
          othProps = getAllKeys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      // Check that cyclic values are equal.
      var objStacked = stack.get(object);
      var othStacked = stack.get(other);
      if (objStacked && othStacked) {
        return objStacked == other && othStacked == object;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);

      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, objValue, key, other, object, stack)
            : customizer(objValue, othValue, key, object, other, stack);
        }
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined$1
              ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
              : compared
            )) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack['delete'](object);
      stack['delete'](other);
      return result;
    }

    /**
     * A specialized version of `baseRest` which flattens the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    function flatRest(func) {
      return setToString(overRest(func, undefined$1, flatten), func + '');
    }

    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }

    /**
     * Creates an array of own and inherited enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn, getSymbolsIn);
    }

    /**
     * Gets metadata for `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {*} Returns the metadata for `func`.
     */
    var getData = !metaMap ? noop : function(func) {
      return metaMap.get(func);
    };

    /**
     * Gets the name of `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {string} Returns the function name.
     */
    function getFuncName(func) {
      var result = (func.name + ''),
          array = realNames[result],
          length = hasOwnProperty.call(realNames, result) ? array.length : 0;

      while (length--) {
        var data = array[length],
            otherFunc = data.func;
        if (otherFunc == null || otherFunc == func) {
          return data.name;
        }
      }
      return result;
    }

    /**
     * Gets the argument placeholder value for `func`.
     *
     * @private
     * @param {Function} func The function to inspect.
     * @returns {*} Returns the placeholder value.
     */
    function getHolder(func) {
      var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
      return object.placeholder;
    }

    /**
     * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
     * this function returns the custom method, otherwise it returns `baseIteratee`.
     * If arguments are provided, the chosen function is invoked with them and
     * its result is returned.
     *
     * @private
     * @param {*} [value] The value to convert to an iteratee.
     * @param {number} [arity] The arity of the created iteratee.
     * @returns {Function} Returns the chosen function or its result.
     */
    function getIteratee() {
      var result = lodash.iteratee || iteratee;
      result = result === iteratee ? baseIteratee : result;
      return arguments.length ? result(arguments[0], arguments[1]) : result;
    }

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
    function getMatchData(object) {
      var result = keys(object),
          length = result.length;

      while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined$1;
    }

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined$1;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }

    /**
     * Creates an array of the own enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };

    /**
     * Creates an array of the own and inherited enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
      var result = [];
      while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
      }
      return result;
    };

    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    var getTag = baseGetTag;

    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
        (Map && getTag(new Map) != mapTag) ||
        (Promise && getTag(Promise.resolve()) != promiseTag) ||
        (Set && getTag(new Set) != setTag) ||
        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
      getTag = function(value) {
        var result = baseGetTag(value),
            Ctor = result == objectTag ? value.constructor : undefined$1,
            ctorString = Ctor ? toSource(Ctor) : '';

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString: return dataViewTag;
            case mapCtorString: return mapTag;
            case promiseCtorString: return promiseTag;
            case setCtorString: return setTag;
            case weakMapCtorString: return weakMapTag;
          }
        }
        return result;
      };
    }

    /**
     * Gets the view, applying any `transforms` to the `start` and `end` positions.
     *
     * @private
     * @param {number} start The start of the view.
     * @param {number} end The end of the view.
     * @param {Array} transforms The transformations to apply to the view.
     * @returns {Object} Returns an object containing the `start` and `end`
     *  positions of the view.
     */
    function getView(start, end, transforms) {
      var index = -1,
          length = transforms.length;

      while (++index < length) {
        var data = transforms[index],
            size = data.size;

        switch (data.type) {
          case 'drop':      start += size; break;
          case 'dropRight': end -= size; break;
          case 'take':      end = nativeMin(end, start + size); break;
          case 'takeRight': start = nativeMax(start, end - size); break;
        }
      }
      return { 'start': start, 'end': end };
    }

    /**
     * Extracts wrapper details from the `source` body comment.
     *
     * @private
     * @param {string} source The source to inspect.
     * @returns {Array} Returns the wrapper details.
     */
    function getWrapDetails(source) {
      var match = source.match(reWrapDetails);
      return match ? match[1].split(reSplitDetails) : [];
    }

    /**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          result = false;

      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) &&
        (isArray(object) || isArguments(object));
    }

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = new array.constructor(length);

      // Add properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      return (typeof object.constructor == 'function' && !isPrototype(object))
        ? baseCreate(getPrototype(object))
        : {};
    }

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);

        case boolTag:
        case dateTag:
          return new Ctor(+object);

        case dataViewTag:
          return cloneDataView(object, isDeep);

        case float32Tag: case float64Tag:
        case int8Tag: case int16Tag: case int32Tag:
        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
          return cloneTypedArray(object, isDeep);

        case mapTag:
          return new Ctor;

        case numberTag:
        case stringTag:
          return new Ctor(object);

        case regexpTag:
          return cloneRegExp(object);

        case setTag:
          return new Ctor;

        case symbolTag:
          return cloneSymbol(object);
      }
    }

    /**
     * Inserts wrapper `details` in a comment at the top of the `source` body.
     *
     * @private
     * @param {string} source The source to modify.
     * @returns {Array} details The details to insert.
     * @returns {string} Returns the modified source.
     */
    function insertWrapDetails(source, details) {
      var length = details.length;
      if (!length) {
        return source;
      }
      var lastIndex = length - 1;
      details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
      details = details.join(length > 2 ? ', ' : ' ');
      return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
    }

    /**
     * Checks if `value` is a flattenable `arguments` object or array.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
     */
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) ||
        !!(spreadableSymbol && value && value[spreadableSymbol]);
    }

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;

      return !!length &&
        (type == 'number' ||
          (type != 'symbol' && reIsUint.test(value))) &&
            (value > -1 && value % 1 == 0 && value < length);
    }

    /**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
            ? (isArrayLike(object) && isIndex(index, object.length))
            : (type == 'string' && index in object)
          ) {
        return eq(object[index], value);
      }
      return false;
    }

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
          value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Checks if `func` has a lazy counterpart.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
     *  else `false`.
     */
    function isLaziable(func) {
      var funcName = getFuncName(func),
          other = lodash[funcName];

      if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
        return false;
      }
      if (func === other) {
        return true;
      }
      var data = getData(other);
      return !!data && func === data[0];
    }

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /**
     * Checks if `func` is capable of being masked.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
     */
    var isMaskable = coreJsData ? isFunction : stubFalse;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

      return value === proto;
    }

    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }

    /**
     * A specialized version of `matchesProperty` for source values suitable
     * for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue &&
          (srcValue !== undefined$1 || (key in Object(object)));
      };
    }

    /**
     * A specialized version of `_.memoize` which clears the memoized function's
     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
     *
     * @private
     * @param {Function} func The function to have its output memoized.
     * @returns {Function} Returns the new memoized function.
     */
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });

      var cache = result.cache;
      return result;
    }

    /**
     * Merges the function metadata of `source` into `data`.
     *
     * Merging metadata reduces the number of wrappers used to invoke a function.
     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
     * may be applied regardless of execution order. Methods like `_.ary` and
     * `_.rearg` modify function arguments, making the order in which they are
     * executed important, preventing the merging of metadata. However, we make
     * an exception for a safe combined case where curried functions have `_.ary`
     * and or `_.rearg` applied.
     *
     * @private
     * @param {Array} data The destination metadata.
     * @param {Array} source The source metadata.
     * @returns {Array} Returns `data`.
     */
    function mergeData(data, source) {
      var bitmask = data[1],
          srcBitmask = source[1],
          newBitmask = bitmask | srcBitmask,
          isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

      var isCombo =
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
        ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

      // Exit early if metadata can't be merged.
      if (!(isCommon || isCombo)) {
        return data;
      }
      // Use source `thisArg` if available.
      if (srcBitmask & WRAP_BIND_FLAG) {
        data[2] = source[2];
        // Set when currying a bound function.
        newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
      }
      // Compose partial arguments.
      var value = source[3];
      if (value) {
        var partials = data[3];
        data[3] = partials ? composeArgs(partials, value, source[4]) : value;
        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
      }
      // Compose partial right arguments.
      value = source[5];
      if (value) {
        partials = data[5];
        data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
      }
      // Use source `argPos` if available.
      value = source[7];
      if (value) {
        data[7] = value;
      }
      // Use source `ary` if it's smaller.
      if (srcBitmask & WRAP_ARY_FLAG) {
        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
      }
      // Use source `arity` if one is not provided.
      if (data[9] == null) {
        data[9] = source[9];
      }
      // Use source `func` and merge bitmasks.
      data[0] = source[0];
      data[1] = newBitmask;

      return data;
    }

    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }

    /**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */
    function overRest(func, start, transform) {
      start = nativeMax(start === undefined$1 ? (func.length - 1) : start, 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }

    /**
     * Gets the parent value at `path` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path to get the parent value of.
     * @returns {*} Returns the parent value.
     */
    function parent(object, path) {
      return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
    }

    /**
     * Reorder `array` according to the specified indexes where the element at
     * the first index is assigned as the first element, the element at
     * the second index is assigned as the second element, and so on.
     *
     * @private
     * @param {Array} array The array to reorder.
     * @param {Array} indexes The arranged array indexes.
     * @returns {Array} Returns `array`.
     */
    function reorder(array, indexes) {
      var arrLength = array.length,
          length = nativeMin(indexes.length, arrLength),
          oldArray = copyArray(array);

      while (length--) {
        var index = indexes[length];
        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined$1;
      }
      return array;
    }

    /**
     * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function safeGet(object, key) {
      if (key === 'constructor' && typeof object[key] === 'function') {
        return;
      }

      if (key == '__proto__') {
        return;
      }

      return object[key];
    }

    /**
     * Sets metadata for `func`.
     *
     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
     * period of time, it will trip its breaker and transition to an identity
     * function to avoid garbage collection pauses in V8. See
     * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
     * for more details.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var setData = shortOut(baseSetData);

    /**
     * A simple wrapper around the global [`setTimeout`](https://mdn.io/setTimeout).
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @returns {number|Object} Returns the timer id or timeout object.
     */
    var setTimeout = ctxSetTimeout || function(func, wait) {
      return root.setTimeout(func, wait);
    };

    /**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var setToString = shortOut(baseSetToString);

    /**
     * Sets the `toString` method of `wrapper` to mimic the source of `reference`
     * with wrapper details in a comment at the top of the source body.
     *
     * @private
     * @param {Function} wrapper The function to modify.
     * @param {Function} reference The reference function.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Function} Returns `wrapper`.
     */
    function setWrapToString(wrapper, reference, bitmask) {
      var source = (reference + '');
      return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
    }

    /**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */
    function shortOut(func) {
      var count = 0,
          lastCalled = 0;

      return function() {
        var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(undefined$1, arguments);
      };
    }

    /**
     * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @param {number} [size=array.length] The size of `array`.
     * @returns {Array} Returns `array`.
     */
    function shuffleSelf(array, size) {
      var index = -1,
          length = array.length,
          lastIndex = length - 1;

      size = size === undefined$1 ? length : size;
      while (++index < size) {
        var rand = baseRandom(index, lastIndex),
            value = array[rand];

        array[rand] = array[index];
        array[index] = value;
      }
      array.length = size;
      return array;
    }

    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46 /* . */) {
        result.push('');
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    });

    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */
    function toKey(value) {
      if (typeof value == 'string' || isSymbol(value)) {
        return value;
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Updates wrapper `details` based on `bitmask` flags.
     *
     * @private
     * @returns {Array} details The details to modify.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Array} Returns `details`.
     */
    function updateWrapDetails(details, bitmask) {
      arrayEach(wrapFlags, function(pair) {
        var value = '_.' + pair[0];
        if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
          details.push(value);
        }
      });
      return details.sort();
    }

    /**
     * Creates a clone of `wrapper`.
     *
     * @private
     * @param {Object} wrapper The wrapper to clone.
     * @returns {Object} Returns the cloned wrapper.
     */
    function wrapperClone(wrapper) {
      if (wrapper instanceof LazyWrapper) {
        return wrapper.clone();
      }
      var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
      result.__actions__ = copyArray(wrapper.__actions__);
      result.__index__  = wrapper.__index__;
      result.__values__ = wrapper.__values__;
      return result;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of elements split into groups the length of `size`.
     * If `array` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to process.
     * @param {number} [size=1] The length of each chunk
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the new array of chunks.
     * @example
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */
    function chunk(array, size, guard) {
      if ((guard ? isIterateeCall(array, size, guard) : size === undefined$1)) {
        size = 1;
      } else {
        size = nativeMax(toInteger(size), 0);
      }
      var length = array == null ? 0 : array.length;
      if (!length || size < 1) {
        return [];
      }
      var index = 0,
          resIndex = 0,
          result = Array(nativeCeil(length / size));

      while (index < length) {
        result[resIndex++] = baseSlice(array, index, (index += size));
      }
      return result;
    }

    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to compact.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result[resIndex++] = value;
        }
      }
      return result;
    }

    /**
     * Creates a new array concatenating `array` with any additional arrays
     * and/or values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to concatenate.
     * @param {...*} [values] The values to concatenate.
     * @returns {Array} Returns the new concatenated array.
     * @example
     *
     * var array = [1];
     * var other = _.concat(array, 2, [3], [[4]]);
     *
     * console.log(other);
     * // => [1, 2, 3, [4]]
     *
     * console.log(array);
     * // => [1]
     */
    function concat() {
      var length = arguments.length;
      if (!length) {
        return [];
      }
      var args = Array(length - 1),
          array = arguments[0],
          index = length;

      while (index--) {
        args[index - 1] = arguments[index];
      }
      return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
    }

    /**
     * Creates an array of `array` values not included in the other given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * **Note:** Unlike `_.pullAll`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.without, _.xor
     * @example
     *
     * _.difference([2, 1], [2, 3]);
     * // => [1]
     */
    var difference = baseRest(function(array, values) {
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
        : [];
    });

    /**
     * This method is like `_.difference` except that it accepts `iteratee` which
     * is invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var differenceBy = baseRest(function(array, values) {
      var iteratee = last(values);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined$1;
      }
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
        : [];
    });

    /**
     * This method is like `_.difference` except that it accepts `comparator`
     * which is invoked to compare elements of `array` to `values`. The order and
     * references of result values are determined by the first array. The comparator
     * is invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     *
     * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }]
     */
    var differenceWith = baseRest(function(array, values) {
      var comparator = last(values);
      if (isArrayLikeObject(comparator)) {
        comparator = undefined$1;
      }
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined$1, comparator)
        : [];
    });

    /**
     * Creates a slice of `array` with `n` elements dropped from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.drop([1, 2, 3]);
     * // => [2, 3]
     *
     * _.drop([1, 2, 3], 2);
     * // => [3]
     *
     * _.drop([1, 2, 3], 5);
     * // => []
     *
     * _.drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function drop(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined$1) ? 1 : toInteger(n);
      return baseSlice(array, n < 0 ? 0 : n, length);
    }

    /**
     * Creates a slice of `array` with `n` elements dropped from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRight([1, 2, 3]);
     * // => [1, 2]
     *
     * _.dropRight([1, 2, 3], 2);
     * // => [1]
     *
     * _.dropRight([1, 2, 3], 5);
     * // => []
     *
     * _.dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function dropRight(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined$1) ? 1 : toInteger(n);
      n = length - n;
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the end.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.dropRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropRightWhile(users, ['active', false]);
     * // => objects for ['barney']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropRightWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */
    function dropRightWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true, true)
        : [];
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the beginning.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.dropWhile(users, function(o) { return !o.active; });
     * // => objects for ['pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropWhile(users, ['active', false]);
     * // => objects for ['pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */
    function dropWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true)
        : [];
    }

    /**
     * Fills elements of `array` with `value` from `start` up to, but not
     * including, `end`.
     *
     * **Note:** This method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Array
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.fill(array, 'a');
     * console.log(array);
     * // => ['a', 'a', 'a']
     *
     * _.fill(Array(3), 2);
     * // => [2, 2, 2]
     *
     * _.fill([4, 6, 8, 10], '*', 1, 3);
     * // => [4, '*', '*', 10]
     */
    function fill(array, value, start, end) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
        start = 0;
        end = length;
      }
      return baseFill(array, value, start, end);
    }

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.findIndex(users, function(o) { return o.user == 'barney'; });
     * // => 0
     *
     * // The `_.matches` iteratee shorthand.
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findIndex(users, ['active', false]);
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.findIndex(users, 'active');
     * // => 2
     */
    function findIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return baseFindIndex(array, getIteratee(predicate, 3), index);
    }

    /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
     * // => 2
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
     * // => 0
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastIndex(users, ['active', false]);
     * // => 2
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastIndex(users, 'active');
     * // => 0
     */
    function findLastIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = length - 1;
      if (fromIndex !== undefined$1) {
        index = toInteger(fromIndex);
        index = fromIndex < 0
          ? nativeMax(length + index, 0)
          : nativeMin(index, length - 1);
      }
      return baseFindIndex(array, getIteratee(predicate, 3), index, true);
    }

    /**
     * Flattens `array` a single level deep.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, [3, [4]], 5]]);
     * // => [1, 2, [3, [4]], 5]
     */
    function flatten(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, 1) : [];
    }

    /**
     * Recursively flattens `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, [3, [4]], 5]]);
     * // => [1, 2, 3, 4, 5]
     */
    function flattenDeep(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, INFINITY) : [];
    }

    /**
     * Recursively flatten `array` up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * var array = [1, [2, [3, [4]], 5]];
     *
     * _.flattenDepth(array, 1);
     * // => [1, 2, [3, [4]], 5]
     *
     * _.flattenDepth(array, 2);
     * // => [1, 2, 3, [4], 5]
     */
    function flattenDepth(array, depth) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      depth = depth === undefined$1 ? 1 : toInteger(depth);
      return baseFlatten(array, depth);
    }

    /**
     * The inverse of `_.toPairs`; this method returns an object composed
     * from key-value `pairs`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} pairs The key-value pairs.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.fromPairs([['a', 1], ['b', 2]]);
     * // => { 'a': 1, 'b': 2 }
     */
    function fromPairs(pairs) {
      var index = -1,
          length = pairs == null ? 0 : pairs.length,
          result = {};

      while (++index < length) {
        var pair = pairs[index];
        result[pair[0]] = pair[1];
      }
      return result;
    }

    /**
     * Gets the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias first
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the first element of `array`.
     * @example
     *
     * _.head([1, 2, 3]);
     * // => 1
     *
     * _.head([]);
     * // => undefined
     */
    function head(array) {
      return (array && array.length) ? array[0] : undefined$1;
    }

    /**
     * Gets the index at which the first occurrence of `value` is found in `array`
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it's used as the
     * offset from the end of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.indexOf([1, 2, 1, 2], 2);
     * // => 1
     *
     * // Search from the `fromIndex`.
     * _.indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     */
    function indexOf(array, value, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return baseIndexOf(array, value, index);
    }

    /**
     * Gets all but the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     */
    function initial(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseSlice(array, 0, -1) : [];
    }

    /**
     * Creates an array of unique values that are included in all given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersection([2, 1], [2, 3]);
     * // => [2]
     */
    var intersection = baseRest(function(arrays) {
      var mapped = arrayMap(arrays, castArrayLikeObject);
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped)
        : [];
    });

    /**
     * This method is like `_.intersection` except that it accepts `iteratee`
     * which is invoked for each element of each `arrays` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [2.1]
     *
     * // The `_.property` iteratee shorthand.
     * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }]
     */
    var intersectionBy = baseRest(function(arrays) {
      var iteratee = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);

      if (iteratee === last(mapped)) {
        iteratee = undefined$1;
      } else {
        mapped.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, getIteratee(iteratee, 2))
        : [];
    });

    /**
     * This method is like `_.intersection` except that it accepts `comparator`
     * which is invoked to compare elements of `arrays`. The order and references
     * of result values are determined by the first array. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.intersectionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }]
     */
    var intersectionWith = baseRest(function(arrays) {
      var comparator = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);

      comparator = typeof comparator == 'function' ? comparator : undefined$1;
      if (comparator) {
        mapped.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, undefined$1, comparator)
        : [];
    });

    /**
     * Converts all elements in `array` into a string separated by `separator`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to convert.
     * @param {string} [separator=','] The element separator.
     * @returns {string} Returns the joined string.
     * @example
     *
     * _.join(['a', 'b', 'c'], '~');
     * // => 'a~b~c'
     */
    function join(array, separator) {
      return array == null ? '' : nativeJoin.call(array, separator);
    }

    /**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */
    function last(array) {
      var length = array == null ? 0 : array.length;
      return length ? array[length - 1] : undefined$1;
    }

    /**
     * This method is like `_.indexOf` except that it iterates over elements of
     * `array` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     *
     * // Search from the `fromIndex`.
     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     */
    function lastIndexOf(array, value, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = length;
      if (fromIndex !== undefined$1) {
        index = toInteger(fromIndex);
        index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
      }
      return value === value
        ? strictLastIndexOf(array, value, index)
        : baseFindIndex(array, baseIsNaN, index, true);
    }

    /**
     * Gets the element at index `n` of `array`. If `n` is negative, the nth
     * element from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.11.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=0] The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     *
     * _.nth(array, 1);
     * // => 'b'
     *
     * _.nth(array, -2);
     * // => 'c';
     */
    function nth(array, n) {
      return (array && array.length) ? baseNth(array, toInteger(n)) : undefined$1;
    }

    /**
     * Removes all given values from `array` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
     * to remove elements from an array by predicate.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pull(array, 'a', 'c');
     * console.log(array);
     * // => ['b', 'b']
     */
    var pull = baseRest(pullAll);

    /**
     * This method is like `_.pull` except that it accepts an array of values to remove.
     *
     * **Note:** Unlike `_.difference`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pullAll(array, ['a', 'c']);
     * console.log(array);
     * // => ['b', 'b']
     */
    function pullAll(array, values) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values)
        : array;
    }

    /**
     * This method is like `_.pullAll` except that it accepts `iteratee` which is
     * invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The iteratee is invoked with one argument: (value).
     *
     * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
     *
     * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
     * console.log(array);
     * // => [{ 'x': 2 }]
     */
    function pullAllBy(array, values, iteratee) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values, getIteratee(iteratee, 2))
        : array;
    }

    /**
     * This method is like `_.pullAll` except that it accepts `comparator` which
     * is invoked to compare elements of `array` to `values`. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
     *
     * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
     * console.log(array);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
     */
    function pullAllWith(array, values, comparator) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values, undefined$1, comparator)
        : array;
    }

    /**
     * Removes elements from `array` corresponding to `indexes` and returns an
     * array of removed elements.
     *
     * **Note:** Unlike `_.at`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...(number|number[])} [indexes] The indexes of elements to remove.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     * var pulled = _.pullAt(array, [1, 3]);
     *
     * console.log(array);
     * // => ['a', 'c']
     *
     * console.log(pulled);
     * // => ['b', 'd']
     */
    var pullAt = flatRest(function(array, indexes) {
      var length = array == null ? 0 : array.length,
          result = baseAt(array, indexes);

      basePullAt(array, arrayMap(indexes, function(index) {
        return isIndex(index, length) ? +index : index;
      }).sort(compareAscending));

      return result;
    });

    /**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is invoked
     * with three arguments: (value, index, array).
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
     * to pull elements from an array by value.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */
    function remove(array, predicate) {
      var result = [];
      if (!(array && array.length)) {
        return result;
      }
      var index = -1,
          indexes = [],
          length = array.length;

      predicate = getIteratee(predicate, 3);
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result.push(value);
          indexes.push(index);
        }
      }
      basePullAt(array, indexes);
      return result;
    }

    /**
     * Reverses `array` so that the first element becomes the last, the second
     * element becomes the second to last, and so on.
     *
     * **Note:** This method mutates `array` and is based on
     * [`Array#reverse`](https://mdn.io/Array/reverse).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.reverse(array);
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function reverse(array) {
      return array == null ? array : nativeReverse.call(array);
    }

    /**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of
     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
     * returned.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function slice(array, start, end) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
        start = 0;
        end = length;
      }
      else {
        start = start == null ? 0 : toInteger(start);
        end = end === undefined$1 ? length : toInteger(end);
      }
      return baseSlice(array, start, end);
    }

    /**
     * Uses a binary search to determine the lowest index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([30, 50], 40);
     * // => 1
     */
    function sortedIndex(array, value) {
      return baseSortedIndex(array, value);
    }

    /**
     * This method is like `_.sortedIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
     * // => 0
     */
    function sortedIndexBy(array, value, iteratee) {
      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
    }

    /**
     * This method is like `_.indexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
     * // => 1
     */
    function sortedIndexOf(array, value) {
      var length = array == null ? 0 : array.length;
      if (length) {
        var index = baseSortedIndex(array, value);
        if (index < length && eq(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.sortedIndex` except that it returns the highest
     * index at which `value` should be inserted into `array` in order to
     * maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
     * // => 4
     */
    function sortedLastIndex(array, value) {
      return baseSortedIndex(array, value, true);
    }

    /**
     * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 1
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
     * // => 1
     */
    function sortedLastIndexBy(array, value, iteratee) {
      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
    }

    /**
     * This method is like `_.lastIndexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
     * // => 3
     */
    function sortedLastIndexOf(array, value) {
      var length = array == null ? 0 : array.length;
      if (length) {
        var index = baseSortedIndex(array, value, true) - 1;
        if (eq(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.uniq` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniq([1, 1, 2]);
     * // => [1, 2]
     */
    function sortedUniq(array) {
      return (array && array.length)
        ? baseSortedUniq(array)
        : [];
    }

    /**
     * This method is like `_.uniqBy` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
     * // => [1.1, 2.3]
     */
    function sortedUniqBy(array, iteratee) {
      return (array && array.length)
        ? baseSortedUniq(array, getIteratee(iteratee, 2))
        : [];
    }

    /**
     * Gets all but the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.tail([1, 2, 3]);
     * // => [2, 3]
     */
    function tail(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseSlice(array, 1, length) : [];
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.take([1, 2, 3]);
     * // => [1]
     *
     * _.take([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.take([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.take([1, 2, 3], 0);
     * // => []
     */
    function take(array, n, guard) {
      if (!(array && array.length)) {
        return [];
      }
      n = (guard || n === undefined$1) ? 1 : toInteger(n);
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRight([1, 2, 3]);
     * // => [3]
     *
     * _.takeRight([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.takeRight([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.takeRight([1, 2, 3], 0);
     * // => []
     */
    function takeRight(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined$1) ? 1 : toInteger(n);
      n = length - n;
      return baseSlice(array, n < 0 ? 0 : n, length);
    }

    /**
     * Creates a slice of `array` with elements taken from the end. Elements are
     * taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.takeRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeRightWhile(users, ['active', false]);
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeRightWhile(users, 'active');
     * // => []
     */
    function takeRightWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), false, true)
        : [];
    }

    /**
     * Creates a slice of `array` with elements taken from the beginning. Elements
     * are taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.takeWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeWhile(users, ['active', false]);
     * // => objects for ['barney', 'fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeWhile(users, 'active');
     * // => []
     */
    function takeWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3))
        : [];
    }

    /**
     * Creates an array of unique values, in order, from all given arrays using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.union([2], [1, 2]);
     * // => [2, 1]
     */
    var union = baseRest(function(arrays) {
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
    });

    /**
     * This method is like `_.union` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which uniqueness is computed. Result values are chosen from the first
     * array in which the value occurs. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.unionBy([2.1], [1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    var unionBy = baseRest(function(arrays) {
      var iteratee = last(arrays);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined$1;
      }
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
    });

    /**
     * This method is like `_.union` except that it accepts `comparator` which
     * is invoked to compare elements of `arrays`. Result values are chosen from
     * the first array in which the value occurs. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.unionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */
    var unionWith = baseRest(function(arrays) {
      var comparator = last(arrays);
      comparator = typeof comparator == 'function' ? comparator : undefined$1;
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
    });

    /**
     * Creates a duplicate-free version of an array, using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons, in which only the first occurrence of each element
     * is kept. The order of result values is determined by the order they occur
     * in the array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     */
    function uniq(array) {
      return (array && array.length) ? baseUniq(array) : [];
    }

    /**
     * This method is like `_.uniq` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * uniqueness is computed. The order of result values is determined by the
     * order they occur in the array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniqBy(array, iteratee) {
      return (array && array.length) ? baseUniq(array, getIteratee(iteratee, 2)) : [];
    }

    /**
     * This method is like `_.uniq` except that it accepts `comparator` which
     * is invoked to compare elements of `array`. The order of result values is
     * determined by the order they occur in the array.The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.uniqWith(objects, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
     */
    function uniqWith(array, comparator) {
      comparator = typeof comparator == 'function' ? comparator : undefined$1;
      return (array && array.length) ? baseUniq(array, undefined$1, comparator) : [];
    }

    /**
     * This method is like `_.zip` except that it accepts an array of grouped
     * elements and creates an array regrouping the elements to their pre-zip
     * configuration.
     *
     * @static
     * @memberOf _
     * @since 1.2.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     *
     * _.unzip(zipped);
     * // => [['a', 'b'], [1, 2], [true, false]]
     */
    function unzip(array) {
      if (!(array && array.length)) {
        return [];
      }
      var length = 0;
      array = arrayFilter(array, function(group) {
        if (isArrayLikeObject(group)) {
          length = nativeMax(group.length, length);
          return true;
        }
      });
      return baseTimes(length, function(index) {
        return arrayMap(array, baseProperty(index));
      });
    }

    /**
     * This method is like `_.unzip` except that it accepts `iteratee` to specify
     * how regrouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  regrouped values.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
     * // => [[1, 10, 100], [2, 20, 200]]
     *
     * _.unzipWith(zipped, _.add);
     * // => [3, 30, 300]
     */
    function unzipWith(array, iteratee) {
      if (!(array && array.length)) {
        return [];
      }
      var result = unzip(array);
      if (iteratee == null) {
        return result;
      }
      return arrayMap(result, function(group) {
        return apply(iteratee, undefined$1, group);
      });
    }

    /**
     * Creates an array excluding all given values using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.pull`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...*} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.xor
     * @example
     *
     * _.without([2, 1, 2, 3], 1, 2);
     * // => [3]
     */
    var without = baseRest(function(array, values) {
      return isArrayLikeObject(array)
        ? baseDifference(array, values)
        : [];
    });

    /**
     * Creates an array of unique values that is the
     * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
     * of the given arrays. The order of result values is determined by the order
     * they occur in the arrays.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.without
     * @example
     *
     * _.xor([2, 1], [2, 3]);
     * // => [1, 3]
     */
    var xor = baseRest(function(arrays) {
      return baseXor(arrayFilter(arrays, isArrayLikeObject));
    });

    /**
     * This method is like `_.xor` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which by which they're compared. The order of result values is determined
     * by the order they occur in the arrays. The iteratee is invoked with one
     * argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2, 3.4]
     *
     * // The `_.property` iteratee shorthand.
     * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var xorBy = baseRest(function(arrays) {
      var iteratee = last(arrays);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined$1;
      }
      return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
    });

    /**
     * This method is like `_.xor` except that it accepts `comparator` which is
     * invoked to compare elements of `arrays`. The order of result values is
     * determined by the order they occur in the arrays. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.xorWith(objects, others, _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */
    var xorWith = baseRest(function(arrays) {
      var comparator = last(arrays);
      comparator = typeof comparator == 'function' ? comparator : undefined$1;
      return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined$1, comparator);
    });

    /**
     * Creates an array of grouped elements, the first of which contains the
     * first elements of the given arrays, the second of which contains the
     * second elements of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     */
    var zip = baseRest(unzip);

    /**
     * This method is like `_.fromPairs` except that it accepts two arrays,
     * one of property identifiers and one of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 0.4.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObject(['a', 'b'], [1, 2]);
     * // => { 'a': 1, 'b': 2 }
     */
    function zipObject(props, values) {
      return baseZipObject(props || [], values || [], assignValue);
    }

    /**
     * This method is like `_.zipObject` except that it supports property paths.
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
     * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
     */
    function zipObjectDeep(props, values) {
      return baseZipObject(props || [], values || [], baseSet);
    }

    /**
     * This method is like `_.zip` except that it accepts `iteratee` to specify
     * how grouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  grouped values.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
     *   return a + b + c;
     * });
     * // => [111, 222]
     */
    var zipWith = baseRest(function(arrays) {
      var length = arrays.length,
          iteratee = length > 1 ? arrays[length - 1] : undefined$1;

      iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined$1;
      return unzipWith(arrays, iteratee);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` wrapper instance that wraps `value` with explicit method
     * chain sequences enabled. The result of such sequences must be unwrapped
     * with `_#value`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Seq
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36 },
     *   { 'user': 'fred',    'age': 40 },
     *   { 'user': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _
     *   .chain(users)
     *   .sortBy('age')
     *   .map(function(o) {
     *     return o.user + ' is ' + o.age;
     *   })
     *   .head()
     *   .value();
     * // => 'pebbles is 1'
     */
    function chain(value) {
      var result = lodash(value);
      result.__chain__ = true;
      return result;
    }

    /**
     * This method invokes `interceptor` and returns `value`. The interceptor
     * is invoked with one argument; (value). The purpose of this method is to
     * "tap into" a method chain sequence in order to modify intermediate results.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3])
     *  .tap(function(array) {
     *    // Mutate input array.
     *    array.pop();
     *  })
     *  .reverse()
     *  .value();
     * // => [2, 1]
     */
    function tap(value, interceptor) {
      interceptor(value);
      return value;
    }

    /**
     * This method is like `_.tap` except that it returns the result of `interceptor`.
     * The purpose of this method is to "pass thru" values replacing intermediate
     * results in a method chain sequence.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns the result of `interceptor`.
     * @example
     *
     * _('  abc  ')
     *  .chain()
     *  .trim()
     *  .thru(function(value) {
     *    return [value];
     *  })
     *  .value();
     * // => ['abc']
     */
    function thru(value, interceptor) {
      return interceptor(value);
    }

    /**
     * This method is the wrapper version of `_.at`.
     *
     * @name at
     * @memberOf _
     * @since 1.0.0
     * @category Seq
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _(object).at(['a[0].b.c', 'a[1]']).value();
     * // => [3, 4]
     */
    var wrapperAt = flatRest(function(paths) {
      var length = paths.length,
          start = length ? paths[0] : 0,
          value = this.__wrapped__,
          interceptor = function(object) { return baseAt(object, paths); };

      if (length > 1 || this.__actions__.length ||
          !(value instanceof LazyWrapper) || !isIndex(start)) {
        return this.thru(interceptor);
      }
      value = value.slice(start, +start + (length ? 1 : 0));
      value.__actions__.push({
        'func': thru,
        'args': [interceptor],
        'thisArg': undefined$1
      });
      return new LodashWrapper(value, this.__chain__).thru(function(array) {
        if (length && !array.length) {
          array.push(undefined$1);
        }
        return array;
      });
    });

    /**
     * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
     *
     * @name chain
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // A sequence without explicit chaining.
     * _(users).head();
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // A sequence with explicit chaining.
     * _(users)
     *   .chain()
     *   .head()
     *   .pick('user')
     *   .value();
     * // => { 'user': 'barney' }
     */
    function wrapperChain() {
      return chain(this);
    }

    /**
     * Executes the chain sequence and returns the wrapped result.
     *
     * @name commit
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).push(3);
     *
     * console.log(array);
     * // => [1, 2]
     *
     * wrapped = wrapped.commit();
     * console.log(array);
     * // => [1, 2, 3]
     *
     * wrapped.last();
     * // => 3
     *
     * console.log(array);
     * // => [1, 2, 3]
     */
    function wrapperCommit() {
      return new LodashWrapper(this.value(), this.__chain__);
    }

    /**
     * Gets the next value on a wrapped object following the
     * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
     *
     * @name next
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the next iterator value.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 1 }
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 2 }
     *
     * wrapped.next();
     * // => { 'done': true, 'value': undefined }
     */
    function wrapperNext() {
      if (this.__values__ === undefined$1) {
        this.__values__ = toArray(this.value());
      }
      var done = this.__index__ >= this.__values__.length,
          value = done ? undefined$1 : this.__values__[this.__index__++];

      return { 'done': done, 'value': value };
    }

    /**
     * Enables the wrapper to be iterable.
     *
     * @name Symbol.iterator
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the wrapper object.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped[Symbol.iterator]() === wrapped;
     * // => true
     *
     * Array.from(wrapped);
     * // => [1, 2]
     */
    function wrapperToIterator() {
      return this;
    }

    /**
     * Creates a clone of the chain sequence planting `value` as the wrapped value.
     *
     * @name plant
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @param {*} value The value to plant.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2]).map(square);
     * var other = wrapped.plant([3, 4]);
     *
     * other.value();
     * // => [9, 16]
     *
     * wrapped.value();
     * // => [1, 4]
     */
    function wrapperPlant(value) {
      var result,
          parent = this;

      while (parent instanceof baseLodash) {
        var clone = wrapperClone(parent);
        clone.__index__ = 0;
        clone.__values__ = undefined$1;
        if (result) {
          previous.__wrapped__ = clone;
        } else {
          result = clone;
        }
        var previous = clone;
        parent = parent.__wrapped__;
      }
      previous.__wrapped__ = value;
      return result;
    }

    /**
     * This method is the wrapper version of `_.reverse`.
     *
     * **Note:** This method mutates the wrapped array.
     *
     * @name reverse
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _(array).reverse().value()
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function wrapperReverse() {
      var value = this.__wrapped__;
      if (value instanceof LazyWrapper) {
        var wrapped = value;
        if (this.__actions__.length) {
          wrapped = new LazyWrapper(this);
        }
        wrapped = wrapped.reverse();
        wrapped.__actions__.push({
          'func': thru,
          'args': [reverse],
          'thisArg': undefined$1
        });
        return new LodashWrapper(wrapped, this.__chain__);
      }
      return this.thru(reverse);
    }

    /**
     * Executes the chain sequence to resolve the unwrapped value.
     *
     * @name value
     * @memberOf _
     * @since 0.1.0
     * @alias toJSON, valueOf
     * @category Seq
     * @returns {*} Returns the resolved unwrapped value.
     * @example
     *
     * _([1, 2, 3]).value();
     * // => [1, 2, 3]
     */
    function wrapperValue() {
      return baseWrapperValue(this.__wrapped__, this.__actions__);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the number of times the key was returned by `iteratee`. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': 1, '6': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        ++result[key];
      } else {
        baseAssignValue(result, key, 1);
      }
    });

    /**
     * Checks if `predicate` returns truthy for **all** elements of `collection`.
     * Iteration is stopped once `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * **Note:** This method returns `true` for
     * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
     * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
     * elements of empty collections.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.every(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.every(users, 'active');
     * // => false
     */
    function every(collection, predicate, guard) {
      var func = isArray(collection) ? arrayEvery : baseEvery;
      if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined$1;
      }
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * **Note:** Unlike `_.remove`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.reject
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, { 'age': 36, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.filter(users, 'active');
     * // => objects for ['barney']
     *
     * // Combining several predicates using `_.overEvery` or `_.overSome`.
     * _.filter(users, _.overSome([{ 'age': 36 }, ['age', 40]]));
     * // => objects for ['fred', 'barney']
     */
    function filter(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.find(users, function(o) { return o.age < 40; });
     * // => object for 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.find(users, { 'age': 1, 'active': true });
     * // => object for 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.find(users, ['active', false]);
     * // => object for 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.find(users, 'active');
     * // => object for 'barney'
     */
    var find = createFind(findIndex);

    /**
     * This method is like `_.find` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=collection.length-1] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(n) {
     *   return n % 2 == 1;
     * });
     * // => 3
     */
    var findLast = createFind(findLastIndex);

    /**
     * Creates a flattened array of values by running each element in `collection`
     * thru `iteratee` and flattening the mapped results. The iteratee is invoked
     * with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [n, n];
     * }
     *
     * _.flatMap([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */
    function flatMap(collection, iteratee) {
      return baseFlatten(map(collection, iteratee), 1);
    }

    /**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDeep([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */
    function flatMapDeep(collection, iteratee) {
      return baseFlatten(map(collection, iteratee), INFINITY);
    }

    /**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDepth([1, 2], duplicate, 2);
     * // => [[1, 1], [2, 2]]
     */
    function flatMapDepth(collection, iteratee, depth) {
      depth = depth === undefined$1 ? 1 : toInteger(depth);
      return baseFlatten(map(collection, iteratee), depth);
    }

    /**
     * Iterates over elements of `collection` and invokes `iteratee` for each element.
     * The iteratee is invoked with three arguments: (value, index|key, collection).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length"
     * property are iterated like arrays. To avoid this behavior use `_.forIn`
     * or `_.forOwn` for object iteration.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias each
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEachRight
     * @example
     *
     * _.forEach([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `1` then `2`.
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forEach(collection, iteratee) {
      var func = isArray(collection) ? arrayEach : baseEach;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.forEach` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @alias eachRight
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEach
     * @example
     *
     * _.forEachRight([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `2` then `1`.
     */
    function forEachRight(collection, iteratee) {
      var func = isArray(collection) ? arrayEachRight : baseEachRight;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The order of grouped values
     * is determined by the order they occur in `collection`. The corresponding
     * value of each key is an array of elements responsible for generating the
     * key. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': [4.2], '6': [6.1, 6.3] }
     *
     * // The `_.property` iteratee shorthand.
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
    var groupBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
      } else {
        baseAssignValue(result, key, [value]);
      }
    });

    /**
     * Checks if `value` is in `collection`. If `collection` is a string, it's
     * checked for a substring of `value`, otherwise
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * is used for equality comparisons. If `fromIndex` is negative, it's used as
     * the offset from the end of `collection`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {boolean} Returns `true` if `value` is found, else `false`.
     * @example
     *
     * _.includes([1, 2, 3], 1);
     * // => true
     *
     * _.includes([1, 2, 3], 1, 2);
     * // => false
     *
     * _.includes({ 'a': 1, 'b': 2 }, 1);
     * // => true
     *
     * _.includes('abcd', 'bc');
     * // => true
     */
    function includes(collection, value, fromIndex, guard) {
      collection = isArrayLike(collection) ? collection : values(collection);
      fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

      var length = collection.length;
      if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
      }
      return isString(collection)
        ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
        : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
    }

    /**
     * Invokes the method at `path` of each element in `collection`, returning
     * an array of the results of each invoked method. Any additional arguments
     * are provided to each invoked method. If `path` is a function, it's invoked
     * for, and `this` bound to, each element in `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array|Function|string} path The path of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [args] The arguments to invoke each method with.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invokeMap([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    var invokeMap = baseRest(function(collection, path, args) {
      var index = -1,
          isFunc = typeof path == 'function',
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value) {
        result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
      });
      return result;
    });

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the last element responsible for generating the key. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var array = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.keyBy(array, function(o) {
     *   return String.fromCharCode(o.code);
     * });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.keyBy(array, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     */
    var keyBy = createAggregator(function(result, value, key) {
      baseAssignValue(result, key, value);
    });

    /**
     * Creates an array of values by running each element in `collection` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
     * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
     * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
     * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * _.map([4, 8], square);
     * // => [16, 64]
     *
     * _.map({ 'a': 4, 'b': 8 }, square);
     * // => [16, 64] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */
    function map(collection, iteratee) {
      var func = isArray(collection) ? arrayMap : baseMap;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.sortBy` except that it allows specifying the sort
     * orders of the iteratees to sort by. If `orders` is unspecified, all values
     * are sorted in ascending order. Otherwise, specify an order of "desc" for
     * descending or "asc" for ascending sort order of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @param {string[]} [orders] The sort orders of `iteratees`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 34 },
     *   { 'user': 'fred',   'age': 40 },
     *   { 'user': 'barney', 'age': 36 }
     * ];
     *
     * // Sort by `user` in ascending order and by `age` in descending order.
     * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
     */
    function orderBy(collection, iteratees, orders, guard) {
      if (collection == null) {
        return [];
      }
      if (!isArray(iteratees)) {
        iteratees = iteratees == null ? [] : [iteratees];
      }
      orders = guard ? undefined$1 : orders;
      if (!isArray(orders)) {
        orders = orders == null ? [] : [orders];
      }
      return baseOrderBy(collection, iteratees, orders);
    }

    /**
     * Creates an array of elements split into two groups, the first of which
     * contains elements `predicate` returns truthy for, the second of which
     * contains elements `predicate` returns falsey for. The predicate is
     * invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of grouped elements.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': false },
     *   { 'user': 'fred',    'age': 40, 'active': true },
     *   { 'user': 'pebbles', 'age': 1,  'active': false }
     * ];
     *
     * _.partition(users, function(o) { return o.active; });
     * // => objects for [['fred'], ['barney', 'pebbles']]
     *
     * // The `_.matches` iteratee shorthand.
     * _.partition(users, { 'age': 1, 'active': false });
     * // => objects for [['pebbles'], ['barney', 'fred']]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.partition(users, ['active', false]);
     * // => objects for [['barney', 'pebbles'], ['fred']]
     *
     * // The `_.property` iteratee shorthand.
     * _.partition(users, 'active');
     * // => objects for [['fred'], ['barney', 'pebbles']]
     */
    var partition = createAggregator(function(result, value, key) {
      result[key ? 0 : 1].push(value);
    }, function() { return [[], []]; });

    /**
     * Reduces `collection` to a value which is the accumulated result of running
     * each element in `collection` thru `iteratee`, where each successive
     * invocation is supplied the return value of the previous. If `accumulator`
     * is not given, the first element of `collection` is used as the initial
     * value. The iteratee is invoked with four arguments:
     * (accumulator, value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.reduce`, `_.reduceRight`, and `_.transform`.
     *
     * The guarded methods are:
     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
     * and `sortBy`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduceRight
     * @example
     *
     * _.reduce([1, 2], function(sum, n) {
     *   return sum + n;
     * }, 0);
     * // => 3
     *
     * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     *   return result;
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
     */
    function reduce(collection, iteratee, accumulator) {
      var func = isArray(collection) ? arrayReduce : baseReduce,
          initAccum = arguments.length < 3;

      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
    }

    /**
     * This method is like `_.reduce` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduce
     * @example
     *
     * var array = [[0, 1], [2, 3], [4, 5]];
     *
     * _.reduceRight(array, function(flattened, other) {
     *   return flattened.concat(other);
     * }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    function reduceRight(collection, iteratee, accumulator) {
      var func = isArray(collection) ? arrayReduceRight : baseReduce,
          initAccum = arguments.length < 3;

      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
    }

    /**
     * The opposite of `_.filter`; this method returns the elements of `collection`
     * that `predicate` does **not** return truthy for.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.filter
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': true }
     * ];
     *
     * _.reject(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.reject(users, { 'age': 40, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.reject(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.reject(users, 'active');
     * // => objects for ['barney']
     */
    function reject(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, negate(getIteratee(predicate, 3)));
    }

    /**
     * Gets a random element from `collection`.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     */
    function sample(collection) {
      var func = isArray(collection) ? arraySample : baseSample;
      return func(collection);
    }

    /**
     * Gets `n` random elements at unique keys from `collection` up to the
     * size of `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @param {number} [n=1] The number of elements to sample.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the random elements.
     * @example
     *
     * _.sampleSize([1, 2, 3], 2);
     * // => [3, 1]
     *
     * _.sampleSize([1, 2, 3], 4);
     * // => [2, 3, 1]
     */
    function sampleSize(collection, n, guard) {
      if ((guard ? isIterateeCall(collection, n, guard) : n === undefined$1)) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      var func = isArray(collection) ? arraySampleSize : baseSampleSize;
      return func(collection, n);
    }

    /**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @example
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */
    function shuffle(collection) {
      var func = isArray(collection) ? arrayShuffle : baseShuffle;
      return func(collection);
    }

    /**
     * Gets the size of `collection` by returning its length for array-like
     * values or the number of own enumerable string keyed properties for objects.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns the collection size.
     * @example
     *
     * _.size([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.size('pebbles');
     * // => 7
     */
    function size(collection) {
      if (collection == null) {
        return 0;
      }
      if (isArrayLike(collection)) {
        return isString(collection) ? stringSize(collection) : collection.length;
      }
      var tag = getTag(collection);
      if (tag == mapTag || tag == setTag) {
        return collection.size;
      }
      return baseKeys(collection).length;
    }

    /**
     * Checks if `predicate` returns truthy for **any** element of `collection`.
     * Iteration is stopped once `predicate` returns truthy. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var users = [
     *   { 'user': 'barney', 'active': true },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.some(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.some(users, 'active');
     * // => true
     */
    function some(collection, predicate, guard) {
      var func = isArray(collection) ? arraySome : baseSome;
      if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined$1;
      }
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection thru each iteratee. This method
     * performs a stable sort, that is, it preserves the original sort order of
     * equal elements. The iteratees are invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 30 },
     *   { 'user': 'barney', 'age': 34 }
     * ];
     *
     * _.sortBy(users, [function(o) { return o.user; }]);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 30]]
     *
     * _.sortBy(users, ['user', 'age']);
     * // => objects for [['barney', 34], ['barney', 36], ['fred', 30], ['fred', 48]]
     */
    var sortBy = baseRest(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var length = iteratees.length;
      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
        iteratees = [];
      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
        iteratees = [iteratees[0]];
      }
      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Gets the timestamp of the number of milliseconds that have elapsed since
     * the Unix epoch (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Date
     * @returns {number} Returns the timestamp.
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => Logs the number of milliseconds it took for the deferred invocation.
     */
    var now = ctxNow || function() {
      return root.Date.now();
    };

    /*------------------------------------------------------------------------*/

    /**
     * The opposite of `_.before`; this method creates a function that invokes
     * `func` once it's called `n` or more times.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {number} n The number of calls before `func` is invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => Logs 'done saving!' after the two async saves have completed.
     */
    function after(n, func) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }

    /**
     * Creates a function that invokes `func`, with up to `n` arguments,
     * ignoring any additional arguments.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @param {number} [n=func.length] The arity cap.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
     * // => [6, 8, 10]
     */
    function ary(func, n, guard) {
      n = guard ? undefined$1 : n;
      n = (func && n == null) ? func.length : n;
      return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n);
    }

    /**
     * Creates a function that invokes `func`, with the `this` binding and arguments
     * of the created function, while it's called less than `n` times. Subsequent
     * calls to the created function return the result of the last `func` invocation.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {number} n The number of calls at which `func` is no longer invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * jQuery(element).on('click', _.before(5, addContactToList));
     * // => Allows adding up to 4 contacts to the list.
     */
    function before(n, func) {
      var result;
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = undefined$1;
        }
        return result;
      };
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and `partials` prepended to the arguments it receives.
     *
     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for partially applied arguments.
     *
     * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
     * property of bound functions.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * function greet(greeting, punctuation) {
     *   return greeting + ' ' + this.user + punctuation;
     * }
     *
     * var object = { 'user': 'fred' };
     *
     * var bound = _.bind(greet, object, 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bind(greet, object, _, '!');
     * bound('hi');
     * // => 'hi fred!'
     */
    var bind = baseRest(function(func, thisArg, partials) {
      var bitmask = WRAP_BIND_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bind));
        bitmask |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(func, bitmask, thisArg, partials, holders);
    });

    /**
     * Creates a function that invokes the method at `object[key]` with `partials`
     * prepended to the arguments it receives.
     *
     * This method differs from `_.bind` by allowing bound functions to reference
     * methods that may be redefined or don't yet exist. See
     * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
     * for more details.
     *
     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Function
     * @param {Object} object The object to invoke the method on.
     * @param {string} key The key of the method.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'user': 'fred',
     *   'greet': function(greeting, punctuation) {
     *     return greeting + ' ' + this.user + punctuation;
     *   }
     * };
     *
     * var bound = _.bindKey(object, 'greet', 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * object.greet = function(greeting, punctuation) {
     *   return greeting + 'ya ' + this.user + punctuation;
     * };
     *
     * bound('!');
     * // => 'hiya fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bindKey(object, 'greet', _, '!');
     * bound('hi');
     * // => 'hiya fred!'
     */
    var bindKey = baseRest(function(object, key, partials) {
      var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bindKey));
        bitmask |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(key, bitmask, object, partials, holders);
    });

    /**
     * Creates a function that accepts arguments of `func` and either invokes
     * `func` returning its result, if at least `arity` number of arguments have
     * been provided, or returns a function that accepts the remaining `func`
     * arguments, and so on. The arity of `func` may be specified if `func.length`
     * is not sufficient.
     *
     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curry(abc);
     *
     * curried(1)(2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(1)(_, 3)(2);
     * // => [1, 2, 3]
     */
    function curry(func, arity, guard) {
      arity = guard ? undefined$1 : arity;
      var result = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
      result.placeholder = curry.placeholder;
      return result;
    }

    /**
     * This method is like `_.curry` except that arguments are applied to `func`
     * in the manner of `_.partialRight` instead of `_.partial`.
     *
     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curryRight(abc);
     *
     * curried(3)(2)(1);
     * // => [1, 2, 3]
     *
     * curried(2, 3)(1);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(3)(1, _)(2);
     * // => [1, 2, 3]
     */
    function curryRight(func, arity, guard) {
      arity = guard ? undefined$1 : arity;
      var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
      result.placeholder = curryRight.placeholder;
      return result;
    }

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed `func` invocations and a `flush` method to immediately invoke them.
     * Provide `options` to indicate whether `func` should be invoked on the
     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
     * with the last arguments provided to the debounced function. Subsequent
     * calls to the debounced function return the result of the last `func`
     * invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false]
     *  Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait]
     *  The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // Avoid costly calculations while the window size is in flux.
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
     * jQuery(element).on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', debounced);
     *
     * // Cancel the trailing debounced invocation.
     * jQuery(window).on('popstate', debounced.cancel);
     */
    function debounce(func, wait, options) {
      var lastArgs,
          lastThis,
          maxWait,
          result,
          timerId,
          lastCallTime,
          lastInvokeTime = 0,
          leading = false,
          maxing = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined$1;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }

      function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
      }

      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            timeWaiting = wait - timeSinceLastCall;

        return maxing
          ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
          : timeWaiting;
      }

      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined$1 || (timeSinceLastCall >= wait) ||
          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
      }

      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
      }

      function trailingEdge(time) {
        timerId = undefined$1;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = undefined$1;
        return result;
      }

      function cancel() {
        if (timerId !== undefined$1) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined$1;
      }

      function flush() {
        return timerId === undefined$1 ? result : trailingEdge(now());
      }

      function debounced() {
        var time = now(),
            isInvoking = shouldInvoke(time);

        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
          if (timerId === undefined$1) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            // Handle invocations in a tight loop.
            clearTimeout(timerId);
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === undefined$1) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }

    /**
     * Defers invoking the `func` until the current call stack has cleared. Any
     * additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to defer.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) {
     *   console.log(text);
     * }, 'deferred');
     * // => Logs 'deferred' after one millisecond.
     */
    var defer = baseRest(function(func, args) {
      return baseDelay(func, 1, args);
    });

    /**
     * Invokes `func` after `wait` milliseconds. Any additional arguments are
     * provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) {
     *   console.log(text);
     * }, 1000, 'later');
     * // => Logs 'later' after one second.
     */
    var delay = baseRest(function(func, wait, args) {
      return baseDelay(func, toNumber(wait) || 0, args);
    });

    /**
     * Creates a function that invokes `func` with arguments reversed.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to flip arguments for.
     * @returns {Function} Returns the new flipped function.
     * @example
     *
     * var flipped = _.flip(function() {
     *   return _.toArray(arguments);
     * });
     *
     * flipped('a', 'b', 'c', 'd');
     * // => ['d', 'c', 'b', 'a']
     */
    function flip(func) {
      return createWrap(func, WRAP_FLIP_FLAG);
    }

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache);
      return memoized;
    }

    // Expose `MapCache`.
    memoize.Cache = MapCache;

    /**
     * Creates a function that negates the result of the predicate `func`. The
     * `func` predicate is invoked with the `this` binding and arguments of the
     * created function.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} predicate The predicate to negate.
     * @returns {Function} Returns the new negated function.
     * @example
     *
     * function isEven(n) {
     *   return n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
     * // => [1, 3, 5]
     */
    function negate(predicate) {
      if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function() {
        var args = arguments;
        switch (args.length) {
          case 0: return !predicate.call(this);
          case 1: return !predicate.call(this, args[0]);
          case 2: return !predicate.call(this, args[0], args[1]);
          case 3: return !predicate.call(this, args[0], args[1], args[2]);
        }
        return !predicate.apply(this, args);
      };
    }

    /**
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first invocation. The `func` is
     * invoked with the `this` binding and arguments of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // => `createApplication` is invoked once
     */
    function once(func) {
      return before(2, func);
    }

    /**
     * Creates a function that invokes `func` with its arguments transformed.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Function
     * @param {Function} func The function to wrap.
     * @param {...(Function|Function[])} [transforms=[_.identity]]
     *  The argument transforms.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function doubled(n) {
     *   return n * 2;
     * }
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var func = _.overArgs(function(x, y) {
     *   return [x, y];
     * }, [square, doubled]);
     *
     * func(9, 3);
     * // => [81, 6]
     *
     * func(10, 5);
     * // => [100, 10]
     */
    var overArgs = castRest(function(func, transforms) {
      transforms = (transforms.length == 1 && isArray(transforms[0]))
        ? arrayMap(transforms[0], baseUnary(getIteratee()))
        : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));

      var funcsLength = transforms.length;
      return baseRest(function(args) {
        var index = -1,
            length = nativeMin(args.length, funcsLength);

        while (++index < length) {
          args[index] = transforms[index].call(this, args[index]);
        }
        return apply(func, this, args);
      });
    });

    /**
     * Creates a function that invokes `func` with `partials` prepended to the
     * arguments it receives. This method is like `_.bind` except it does **not**
     * alter the `this` binding.
     *
     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 0.2.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var sayHelloTo = _.partial(greet, 'hello');
     * sayHelloTo('fred');
     * // => 'hello fred'
     *
     * // Partially applied with placeholders.
     * var greetFred = _.partial(greet, _, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     */
    var partial = baseRest(function(func, partials) {
      var holders = replaceHolders(partials, getHolder(partial));
      return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
    });

    /**
     * This method is like `_.partial` except that partially applied arguments
     * are appended to the arguments it receives.
     *
     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var greetFred = _.partialRight(greet, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     *
     * // Partially applied with placeholders.
     * var sayHelloTo = _.partialRight(greet, 'hello', _);
     * sayHelloTo('fred');
     * // => 'hello fred'
     */
    var partialRight = baseRest(function(func, partials) {
      var holders = replaceHolders(partials, getHolder(partialRight));
      return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
    });

    /**
     * Creates a function that invokes `func` with arguments arranged according
     * to the specified `indexes` where the argument value at the first index is
     * provided as the first argument, the argument value at the second index is
     * provided as the second argument, and so on.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to rearrange arguments for.
     * @param {...(number|number[])} indexes The arranged argument indexes.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var rearged = _.rearg(function(a, b, c) {
     *   return [a, b, c];
     * }, [2, 0, 1]);
     *
     * rearged('b', 'c', 'a')
     * // => ['a', 'b', 'c']
     */
    var rearg = flatRest(function(func, indexes) {
      return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
    });

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as
     * an array.
     *
     * **Note:** This method is based on the
     * [rest parameter](https://mdn.io/rest_parameters).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.rest(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */
    function rest(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = start === undefined$1 ? start : toInteger(start);
      return baseRest(func, start);
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * create function and an array of arguments much like
     * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
     *
     * **Note:** This method is based on the
     * [spread operator](https://mdn.io/spread_operator).
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Function
     * @param {Function} func The function to spread arguments over.
     * @param {number} [start=0] The start position of the spread.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.spread(function(who, what) {
     *   return who + ' says ' + what;
     * });
     *
     * say(['fred', 'hello']);
     * // => 'fred says hello'
     *
     * var numbers = Promise.all([
     *   Promise.resolve(40),
     *   Promise.resolve(36)
     * ]);
     *
     * numbers.then(_.spread(function(x, y) {
     *   return x + y;
     * }));
     * // => a Promise of 76
     */
    function spread(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = start == null ? 0 : nativeMax(toInteger(start), 0);
      return baseRest(function(args) {
        var array = args[start],
            otherArgs = castSlice(args, 0, start);

        if (array) {
          arrayPush(otherArgs, array);
        }
        return apply(func, this, otherArgs);
      });
    }

    /**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed `func` invocations and a `flush` method to
     * immediately invoke them. Provide `options` to indicate whether `func`
     * should be invoked on the leading and/or trailing edge of the `wait`
     * timeout. The `func` is invoked with the last arguments provided to the
     * throttled function. Subsequent calls to the throttled function return the
     * result of the last `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the throttled function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=true]
     *  Specify invoking on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // Avoid excessively updating the position while scrolling.
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
     * jQuery(element).on('click', throttled);
     *
     * // Cancel the trailing throttled invocation.
     * jQuery(window).on('popstate', throttled.cancel);
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        'leading': leading,
        'maxWait': wait,
        'trailing': trailing
      });
    }

    /**
     * Creates a function that accepts up to one argument, ignoring any
     * additional arguments.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.unary(parseInt));
     * // => [6, 8, 10]
     */
    function unary(func) {
      return ary(func, 1);
    }

    /**
     * Creates a function that provides `value` to `wrapper` as its first
     * argument. Any additional arguments provided to the function are appended
     * to those provided to the `wrapper`. The wrapper is invoked with the `this`
     * binding of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {*} value The value to wrap.
     * @param {Function} [wrapper=identity] The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('fred, barney, & pebbles');
     * // => '<p>fred, barney, &amp; pebbles</p>'
     */
    function wrap(value, wrapper) {
      return partial(castFunction(wrapper), value);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Casts `value` as an array if it's not one.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Lang
     * @param {*} value The value to inspect.
     * @returns {Array} Returns the cast array.
     * @example
     *
     * _.castArray(1);
     * // => [1]
     *
     * _.castArray({ 'a': 1 });
     * // => [{ 'a': 1 }]
     *
     * _.castArray('abc');
     * // => ['abc']
     *
     * _.castArray(null);
     * // => [null]
     *
     * _.castArray(undefined);
     * // => [undefined]
     *
     * _.castArray();
     * // => []
     *
     * var array = [1, 2, 3];
     * console.log(_.castArray(array) === array);
     * // => true
     */
    function castArray() {
      if (!arguments.length) {
        return [];
      }
      var value = arguments[0];
      return isArray(value) ? value : [value];
    }

    /**
     * Creates a shallow clone of `value`.
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
     * and supports cloning arrays, array buffers, booleans, date objects, maps,
     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
     * arrays. The own enumerable properties of `arguments` objects are cloned
     * as plain objects. An empty object is returned for uncloneable values such
     * as error objects, functions, DOM nodes, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to clone.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeep
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var shallow = _.clone(objects);
     * console.log(shallow[0] === objects[0]);
     * // => true
     */
    function clone(value) {
      return baseClone(value, CLONE_SYMBOLS_FLAG);
    }

    /**
     * This method is like `_.clone` except that it accepts `customizer` which
     * is invoked to produce the cloned value. If `customizer` returns `undefined`,
     * cloning is handled by the method instead. The `customizer` is invoked with
     * up to four arguments; (value [, index|key, object, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeepWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(false);
     *   }
     * }
     *
     * var el = _.cloneWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 0
     */
    function cloneWith(value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined$1;
      return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
    }

    /**
     * This method is like `_.clone` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @returns {*} Returns the deep cloned value.
     * @see _.clone
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var deep = _.cloneDeep(objects);
     * console.log(deep[0] === objects[0]);
     * // => false
     */
    function cloneDeep(value) {
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
    }

    /**
     * This method is like `_.cloneWith` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the deep cloned value.
     * @see _.cloneWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(true);
     *   }
     * }
     *
     * var el = _.cloneDeepWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 20
     */
    function cloneDeepWith(value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined$1;
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
    }

    /**
     * Checks if `object` conforms to `source` by invoking the predicate
     * properties of `source` with the corresponding property values of `object`.
     *
     * **Note:** This method is equivalent to `_.conforms` when `source` is
     * partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
     * // => true
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
     * // => false
     */
    function conformsTo(object, source) {
      return source == null || baseConformsTo(object, source, keys(source));
    }

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /**
     * Checks if `value` is greater than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     * @see _.lt
     * @example
     *
     * _.gt(3, 1);
     * // => true
     *
     * _.gt(3, 3);
     * // => false
     *
     * _.gt(1, 3);
     * // => false
     */
    var gt = createRelationalOperation(baseGt);

    /**
     * Checks if `value` is greater than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than or equal to
     *  `other`, else `false`.
     * @see _.lte
     * @example
     *
     * _.gte(3, 1);
     * // => true
     *
     * _.gte(3, 3);
     * // => true
     *
     * _.gte(1, 3);
     * // => false
     */
    var gte = createRelationalOperation(function(value, other) {
      return value >= other;
    });

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee');
    };

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /**
     * Checks if `value` is classified as an `ArrayBuffer` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     * @example
     *
     * _.isArrayBuffer(new ArrayBuffer(2));
     * // => true
     *
     * _.isArrayBuffer(new Array(2));
     * // => false
     */
    var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }

    /**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
     * @example
     *
     * _.isBoolean(false);
     * // => true
     *
     * _.isBoolean(null);
     * // => false
     */
    function isBoolean(value) {
      return value === true || value === false ||
        (isObjectLike(value) && baseGetTag(value) == boolTag);
    }

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse;

    /**
     * Checks if `value` is classified as a `Date` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     *
     * _.isDate('Mon April 23 2012');
     * // => false
     */
    var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

    /**
     * Checks if `value` is likely a DOM element.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     *
     * _.isElement('<body>');
     * // => false
     */
    function isElement(value) {
      return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
    }

    /**
     * Checks if `value` is an empty object, collection, map, or set.
     *
     * Objects are considered empty if they have no own enumerable string keyed
     * properties.
     *
     * Array-like values such as `arguments` objects, arrays, buffers, strings, or
     * jQuery-like collections are considered empty if they have a `length` of `0`.
     * Similarly, maps and sets are considered empty if they have a `size` of `0`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) &&
          (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
            isBuffer(value) || isTypedArray(value) || isArguments(value))) {
        return !value.length;
      }
      var tag = getTag(value);
      if (tag == mapTag || tag == setTag) {
        return !value.size;
      }
      if (isPrototype(value)) {
        return !baseKeys(value).length;
      }
      for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return true;
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent.
     *
     * **Note:** This method supports comparing arrays, array buffers, booleans,
     * date objects, error objects, maps, numbers, `Object` objects, regexes,
     * sets, strings, symbols, and typed arrays. `Object` objects are compared
     * by their own, not inherited, enumerable properties. Functions and DOM
     * nodes are compared by strict equality, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.isEqual(object, other);
     * // => true
     *
     * object === other;
     * // => false
     */
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }

    /**
     * This method is like `_.isEqual` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with up to
     * six arguments: (objValue, othValue [, index|key, object, other, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, othValue) {
     *   if (isGreeting(objValue) && isGreeting(othValue)) {
     *     return true;
     *   }
     * }
     *
     * var array = ['hello', 'goodbye'];
     * var other = ['hi', 'goodbye'];
     *
     * _.isEqualWith(array, other, customizer);
     * // => true
     */
    function isEqualWith(value, other, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined$1;
      var result = customizer ? customizer(value, other) : undefined$1;
      return result === undefined$1 ? baseIsEqual(value, other, undefined$1, customizer) : !!result;
    }

    /**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */
    function isError(value) {
      if (!isObjectLike(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == errorTag || tag == domExcTag ||
        (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
    }

    /**
     * Checks if `value` is a finite primitive number.
     *
     * **Note:** This method is based on
     * [`Number.isFinite`](https://mdn.io/Number/isFinite).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
     * @example
     *
     * _.isFinite(3);
     * // => true
     *
     * _.isFinite(Number.MIN_VALUE);
     * // => true
     *
     * _.isFinite(Infinity);
     * // => false
     *
     * _.isFinite('3');
     * // => false
     */
    function isFinite(value) {
      return typeof value == 'number' && nativeIsFinite(value);
    }

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    /**
     * Checks if `value` is an integer.
     *
     * **Note:** This method is based on
     * [`Number.isInteger`](https://mdn.io/Number/isInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
     * @example
     *
     * _.isInteger(3);
     * // => true
     *
     * _.isInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isInteger(Infinity);
     * // => false
     *
     * _.isInteger('3');
     * // => false
     */
    function isInteger(value) {
      return typeof value == 'number' && value == toInteger(value);
    }

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a `Map` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     * @example
     *
     * _.isMap(new Map);
     * // => true
     *
     * _.isMap(new WeakMap);
     * // => false
     */
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

    /**
     * Performs a partial deep comparison between `object` and `source` to
     * determine if `object` contains equivalent property values.
     *
     * **Note:** This method is equivalent to `_.matches` when `source` is
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.isMatch(object, { 'b': 2 });
     * // => true
     *
     * _.isMatch(object, { 'b': 1 });
     * // => false
     */
    function isMatch(object, source) {
      return object === source || baseIsMatch(object, source, getMatchData(source));
    }

    /**
     * This method is like `_.isMatch` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with five
     * arguments: (objValue, srcValue, index|key, object, source).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, srcValue) {
     *   if (isGreeting(objValue) && isGreeting(srcValue)) {
     *     return true;
     *   }
     * }
     *
     * var object = { 'greeting': 'hello' };
     * var source = { 'greeting': 'hi' };
     *
     * _.isMatchWith(object, source, customizer);
     * // => true
     */
    function isMatchWith(object, source, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined$1;
      return baseIsMatch(object, source, getMatchData(source), customizer);
    }

    /**
     * Checks if `value` is `NaN`.
     *
     * **Note:** This method is based on
     * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
     * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
     * `undefined` and other non-number values.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
    function isNaN(value) {
      // An `NaN` primitive is the only value that is not equal to itself.
      // Perform the `toStringTag` check first to avoid errors with some
      // ActiveX objects in IE.
      return isNumber(value) && value != +value;
    }

    /**
     * Checks if `value` is a pristine native function.
     *
     * **Note:** This method can't reliably detect native functions in the presence
     * of the core-js package because core-js circumvents this kind of detection.
     * Despite multiple requests, the core-js maintainer has made it clear: any
     * attempt to fix the detection will be obstructed. As a result, we're left
     * with little choice but to throw an error. Unfortunately, this also affects
     * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
     * which rely on core-js.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */
    function isNative(value) {
      if (isMaskable(value)) {
        throw new Error(CORE_ERROR_TEXT);
      }
      return baseIsNative(value);
    }

    /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(void 0);
     * // => false
     */
    function isNull(value) {
      return value === null;
    }

    /**
     * Checks if `value` is `null` or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
     * @example
     *
     * _.isNil(null);
     * // => true
     *
     * _.isNil(void 0);
     * // => true
     *
     * _.isNil(NaN);
     * // => false
     */
    function isNil(value) {
      return value == null;
    }

    /**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
     * classified as numbers, use the `_.isFinite` method.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a number, else `false`.
     * @example
     *
     * _.isNumber(3);
     * // => true
     *
     * _.isNumber(Number.MIN_VALUE);
     * // => true
     *
     * _.isNumber(Infinity);
     * // => true
     *
     * _.isNumber('3');
     * // => false
     */
    function isNumber(value) {
      return typeof value == 'number' ||
        (isObjectLike(value) && baseGetTag(value) == numberTag);
    }

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString.call(Ctor) == objectCtorString;
    }

    /**
     * Checks if `value` is classified as a `RegExp` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     * @example
     *
     * _.isRegExp(/abc/);
     * // => true
     *
     * _.isRegExp('/abc/');
     * // => false
     */
    var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

    /**
     * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
     * double precision number which isn't the result of a rounded unsafe integer.
     *
     * **Note:** This method is based on
     * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
     * @example
     *
     * _.isSafeInteger(3);
     * // => true
     *
     * _.isSafeInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isSafeInteger(Infinity);
     * // => false
     *
     * _.isSafeInteger('3');
     * // => false
     */
    function isSafeInteger(value) {
      return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is classified as a `Set` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     * @example
     *
     * _.isSet(new Set);
     * // => true
     *
     * _.isSet(new WeakSet);
     * // => false
     */
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a string, else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
    function isString(value) {
      return typeof value == 'string' ||
        (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
    }

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && baseGetTag(value) == symbolTag);
    }

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */
    function isUndefined(value) {
      return value === undefined$1;
    }

    /**
     * Checks if `value` is classified as a `WeakMap` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
     * @example
     *
     * _.isWeakMap(new WeakMap);
     * // => true
     *
     * _.isWeakMap(new Map);
     * // => false
     */
    function isWeakMap(value) {
      return isObjectLike(value) && getTag(value) == weakMapTag;
    }

    /**
     * Checks if `value` is classified as a `WeakSet` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
     * @example
     *
     * _.isWeakSet(new WeakSet);
     * // => true
     *
     * _.isWeakSet(new Set);
     * // => false
     */
    function isWeakSet(value) {
      return isObjectLike(value) && baseGetTag(value) == weakSetTag;
    }

    /**
     * Checks if `value` is less than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     * @see _.gt
     * @example
     *
     * _.lt(1, 3);
     * // => true
     *
     * _.lt(3, 3);
     * // => false
     *
     * _.lt(3, 1);
     * // => false
     */
    var lt = createRelationalOperation(baseLt);

    /**
     * Checks if `value` is less than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than or equal to
     *  `other`, else `false`.
     * @see _.gte
     * @example
     *
     * _.lte(1, 3);
     * // => true
     *
     * _.lte(3, 3);
     * // => true
     *
     * _.lte(3, 1);
     * // => false
     */
    var lte = createRelationalOperation(function(value, other) {
      return value <= other;
    });

    /**
     * Converts `value` to an array.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Array} Returns the converted array.
     * @example
     *
     * _.toArray({ 'a': 1, 'b': 2 });
     * // => [1, 2]
     *
     * _.toArray('abc');
     * // => ['a', 'b', 'c']
     *
     * _.toArray(1);
     * // => []
     *
     * _.toArray(null);
     * // => []
     */
    function toArray(value) {
      if (!value) {
        return [];
      }
      if (isArrayLike(value)) {
        return isString(value) ? stringToArray(value) : copyArray(value);
      }
      if (symIterator && value[symIterator]) {
        return iteratorToArray(value[symIterator]());
      }
      var tag = getTag(value),
          func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

      return func(value);
    }

    /**
     * Converts `value` to a finite number.
     *
     * @static
     * @memberOf _
     * @since 4.12.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted number.
     * @example
     *
     * _.toFinite(3.2);
     * // => 3.2
     *
     * _.toFinite(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toFinite(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toFinite('3.2');
     * // => 3.2
     */
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = (value < 0 ? -1 : 1);
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }

    /**
     * Converts `value` to an integer.
     *
     * **Note:** This method is loosely based on
     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toInteger(3.2);
     * // => 3
     *
     * _.toInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toInteger(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toInteger('3.2');
     * // => 3
     */
    function toInteger(value) {
      var result = toFinite(value),
          remainder = result % 1;

      return result === result ? (remainder ? result - remainder : result) : 0;
    }

    /**
     * Converts `value` to an integer suitable for use as the length of an
     * array-like object.
     *
     * **Note:** This method is based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toLength(3.2);
     * // => 3
     *
     * _.toLength(Number.MIN_VALUE);
     * // => 0
     *
     * _.toLength(Infinity);
     * // => 4294967295
     *
     * _.toLength('3.2');
     * // => 3
     */
    function toLength(value) {
      return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
    }

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = baseTrim(value);
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    /**
     * Converts `value` to a plain object flattening inherited enumerable string
     * keyed properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }

    /**
     * Converts `value` to a safe integer. A safe integer can be compared and
     * represented correctly.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toSafeInteger(3.2);
     * // => 3
     *
     * _.toSafeInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toSafeInteger(Infinity);
     * // => 9007199254740991
     *
     * _.toSafeInteger('3.2');
     * // => 3
     */
    function toSafeInteger(value) {
      return value
        ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
        : (value === 0 ? value : 0);
    }

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Assigns own enumerable string keyed properties of source objects to the
     * destination object. Source objects are applied from left to right.
     * Subsequent sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object` and is loosely based on
     * [`Object.assign`](https://mdn.io/Object/assign).
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assignIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assign({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'c': 3 }
     */
    var assign = createAssigner(function(object, source) {
      if (isPrototype(source) || isArrayLike(source)) {
        copyObject(source, keys(source), object);
        return;
      }
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          assignValue(object, key, source[key]);
        }
      }
    });

    /**
     * This method is like `_.assign` except that it iterates over own and
     * inherited source properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extend
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assign
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assignIn({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
     */
    var assignIn = createAssigner(function(object, source) {
      copyObject(source, keysIn(source), object);
    });

    /**
     * This method is like `_.assignIn` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extendWith
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignInWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keysIn(source), object, customizer);
    });

    /**
     * This method is like `_.assign` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignInWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keys(source), object, customizer);
    });

    /**
     * Creates an array of values corresponding to `paths` of `object`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Array} Returns the picked values.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _.at(object, ['a[0].b.c', 'a[1]']);
     * // => [3, 4]
     */
    var at = flatRest(baseAt);

    /**
     * Creates an object that inherits from the `prototype` object. If a
     * `properties` object is given, its own enumerable string keyed properties
     * are assigned to the created object.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Object
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, {
     *   'constructor': Circle
     * });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
    function create(prototype, properties) {
      var result = baseCreate(prototype);
      return properties == null ? result : baseAssign(result, properties);
    }

    /**
     * Assigns own and inherited enumerable string keyed properties of source
     * objects to the destination object for all destination properties that
     * resolve to `undefined`. Source objects are applied from left to right.
     * Once a property is set, additional values of the same property are ignored.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaultsDeep
     * @example
     *
     * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var defaults = baseRest(function(object, sources) {
      object = Object(object);

      var index = -1;
      var length = sources.length;
      var guard = length > 2 ? sources[2] : undefined$1;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        length = 1;
      }

      while (++index < length) {
        var source = sources[index];
        var props = keysIn(source);
        var propsIndex = -1;
        var propsLength = props.length;

        while (++propsIndex < propsLength) {
          var key = props[propsIndex];
          var value = object[key];

          if (value === undefined$1 ||
              (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
            object[key] = source[key];
          }
        }
      }

      return object;
    });

    /**
     * This method is like `_.defaults` except that it recursively assigns
     * default properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaults
     * @example
     *
     * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
     * // => { 'a': { 'b': 2, 'c': 3 } }
     */
    var defaultsDeep = baseRest(function(args) {
      args.push(undefined$1, customDefaultsMerge);
      return apply(mergeWith, undefined$1, args);
    });

    /**
     * This method is like `_.find` except that it returns the key of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findKey(users, function(o) { return o.age < 40; });
     * // => 'barney' (iteration order is not guaranteed)
     *
     * // The `_.matches` iteratee shorthand.
     * _.findKey(users, { 'age': 1, 'active': true });
     * // => 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findKey(users, 'active');
     * // => 'barney'
     */
    function findKey(object, predicate) {
      return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
    }

    /**
     * This method is like `_.findKey` except that it iterates over elements of
     * a collection in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findLastKey(users, function(o) { return o.age < 40; });
     * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastKey(users, { 'age': 36, 'active': true });
     * // => 'barney'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastKey(users, 'active');
     * // => 'pebbles'
     */
    function findLastKey(object, predicate) {
      return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
    }

    /**
     * Iterates over own and inherited enumerable string keyed properties of an
     * object and invokes `iteratee` for each property. The iteratee is invoked
     * with three arguments: (value, key, object). Iteratee functions may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forInRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forIn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
     */
    function forIn(object, iteratee) {
      return object == null
        ? object
        : baseFor(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * This method is like `_.forIn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forInRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
     */
    function forInRight(object, iteratee) {
      return object == null
        ? object
        : baseForRight(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * Iterates over own enumerable string keyed properties of an object and
     * invokes `iteratee` for each property. The iteratee is invoked with three
     * arguments: (value, key, object). Iteratee functions may exit iteration
     * early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwnRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forOwn(object, iteratee) {
      return object && baseForOwn(object, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.forOwn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwnRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
     */
    function forOwnRight(object, iteratee) {
      return object && baseForOwnRight(object, getIteratee(iteratee, 3));
    }

    /**
     * Creates an array of function property names from own enumerable properties
     * of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functionsIn
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functions(new Foo);
     * // => ['a', 'b']
     */
    function functions(object) {
      return object == null ? [] : baseFunctions(object, keys(object));
    }

    /**
     * Creates an array of function property names from own and inherited
     * enumerable properties of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functions
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functionsIn(new Foo);
     * // => ['a', 'b', 'c']
     */
    function functionsIn(object) {
      return object == null ? [] : baseFunctions(object, keysIn(object));
    }

    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined$1 : baseGet(object, path);
      return result === undefined$1 ? defaultValue : result;
    }

    /**
     * Checks if `path` is a direct property of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': 2 } };
     * var other = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b');
     * // => true
     *
     * _.has(object, ['a', 'b']);
     * // => true
     *
     * _.has(other, 'a');
     * // => false
     */
    function has(object, path) {
      return object != null && hasPath(object, path, baseHas);
    }

    /**
     * Checks if `path` is a direct or inherited property of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.hasIn(object, 'a');
     * // => true
     *
     * _.hasIn(object, 'a.b');
     * // => true
     *
     * _.hasIn(object, ['a', 'b']);
     * // => true
     *
     * _.hasIn(object, 'b');
     * // => false
     */
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }

    /**
     * Creates an object composed of the inverted keys and values of `object`.
     * If `object` contains duplicate values, subsequent values overwrite
     * property assignments of previous values.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Object
     * @param {Object} object The object to invert.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(object);
     * // => { '1': 'c', '2': 'b' }
     */
    var invert = createInverter(function(result, value, key) {
      if (value != null &&
          typeof value.toString != 'function') {
        value = nativeObjectToString.call(value);
      }

      result[value] = key;
    }, constant(identity));

    /**
     * This method is like `_.invert` except that the inverted object is generated
     * from the results of running each element of `object` thru `iteratee`. The
     * corresponding inverted value of each inverted key is an array of keys
     * responsible for generating the inverted value. The iteratee is invoked
     * with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Object
     * @param {Object} object The object to invert.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invertBy(object);
     * // => { '1': ['a', 'c'], '2': ['b'] }
     *
     * _.invertBy(object, function(value) {
     *   return 'group' + value;
     * });
     * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
     */
    var invertBy = createInverter(function(result, value, key) {
      if (value != null &&
          typeof value.toString != 'function') {
        value = nativeObjectToString.call(value);
      }

      if (hasOwnProperty.call(result, value)) {
        result[value].push(key);
      } else {
        result[value] = [key];
      }
    }, getIteratee);

    /**
     * Invokes the method at `path` of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
     *
     * _.invoke(object, 'a[0].b.c.slice', 1, 3);
     * // => [2, 3]
     */
    var invoke = baseRest(baseInvoke);

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }

    /**
     * The opposite of `_.mapValues`; this method creates an object with the
     * same values as `object` and keys generated by running each own enumerable
     * string keyed property of `object` thru `iteratee`. The iteratee is invoked
     * with three arguments: (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapValues
     * @example
     *
     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
     *   return key + value;
     * });
     * // => { 'a1': 1, 'b2': 2 }
     */
    function mapKeys(object, iteratee) {
      var result = {};
      iteratee = getIteratee(iteratee, 3);

      baseForOwn(object, function(value, key, object) {
        baseAssignValue(result, iteratee(value, key, object), value);
      });
      return result;
    }

    /**
     * Creates an object with the same keys as `object` and values generated
     * by running each own enumerable string keyed property of `object` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapKeys
     * @example
     *
     * var users = {
     *   'fred':    { 'user': 'fred',    'age': 40 },
     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
     * };
     *
     * _.mapValues(users, function(o) { return o.age; });
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     *
     * // The `_.property` iteratee shorthand.
     * _.mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */
    function mapValues(object, iteratee) {
      var result = {};
      iteratee = getIteratee(iteratee, 3);

      baseForOwn(object, function(value, key, object) {
        baseAssignValue(result, key, iteratee(value, key, object));
      });
      return result;
    }

    /**
     * This method is like `_.assign` except that it recursively merges own and
     * inherited enumerable string keyed properties of source objects into the
     * destination object. Source properties that resolve to `undefined` are
     * skipped if a destination value exists. Array and plain object properties
     * are merged recursively. Other objects and value types are overridden by
     * assignment. Source objects are applied from left to right. Subsequent
     * sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {
     *   'a': [{ 'b': 2 }, { 'd': 4 }]
     * };
     *
     * var other = {
     *   'a': [{ 'c': 3 }, { 'e': 5 }]
     * };
     *
     * _.merge(object, other);
     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
     */
    var merge = createAssigner(function(object, source, srcIndex) {
      baseMerge(object, source, srcIndex);
    });

    /**
     * This method is like `_.merge` except that it accepts `customizer` which
     * is invoked to produce the merged values of the destination and source
     * properties. If `customizer` returns `undefined`, merging is handled by the
     * method instead. The `customizer` is invoked with six arguments:
     * (objValue, srcValue, key, object, source, stack).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   if (_.isArray(objValue)) {
     *     return objValue.concat(srcValue);
     *   }
     * }
     *
     * var object = { 'a': [1], 'b': [2] };
     * var other = { 'a': [3], 'b': [4] };
     *
     * _.mergeWith(object, other, customizer);
     * // => { 'a': [1, 3], 'b': [2, 4] }
     */
    var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
      baseMerge(object, source, srcIndex, customizer);
    });

    /**
     * The opposite of `_.pick`; this method creates an object composed of the
     * own and inherited enumerable property paths of `object` that are not omitted.
     *
     * **Note:** This method is considerably slower than `_.pick`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to omit.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omit(object, ['a', 'c']);
     * // => { 'b': '2' }
     */
    var omit = flatRest(function(object, paths) {
      var result = {};
      if (object == null) {
        return result;
      }
      var isDeep = false;
      paths = arrayMap(paths, function(path) {
        path = castPath(path, object);
        isDeep || (isDeep = path.length > 1);
        return path;
      });
      copyObject(object, getAllKeysIn(object), result);
      if (isDeep) {
        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
      }
      var length = paths.length;
      while (length--) {
        baseUnset(result, paths[length]);
      }
      return result;
    });

    /**
     * The opposite of `_.pickBy`; this method creates an object composed of
     * the own and inherited enumerable string keyed properties of `object` that
     * `predicate` doesn't return truthy for. The predicate is invoked with two
     * arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omitBy(object, _.isNumber);
     * // => { 'b': '2' }
     */
    function omitBy(object, predicate) {
      return pickBy(object, negate(getIteratee(predicate)));
    }

    /**
     * Creates an object composed of the picked `object` properties.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pick(object, ['a', 'c']);
     * // => { 'a': 1, 'c': 3 }
     */
    var pick = flatRest(function(object, paths) {
      return object == null ? {} : basePick(object, paths);
    });

    /**
     * Creates an object composed of the `object` properties `predicate` returns
     * truthy for. The predicate is invoked with two arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pickBy(object, _.isNumber);
     * // => { 'a': 1, 'c': 3 }
     */
    function pickBy(object, predicate) {
      if (object == null) {
        return {};
      }
      var props = arrayMap(getAllKeysIn(object), function(prop) {
        return [prop];
      });
      predicate = getIteratee(predicate);
      return basePickBy(object, props, function(value, path) {
        return predicate(value, path[0]);
      });
    }

    /**
     * This method is like `_.get` except that if the resolved value is a
     * function it's invoked with the `this` binding of its parent object and
     * its result is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to resolve.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
     *
     * _.result(object, 'a[0].b.c1');
     * // => 3
     *
     * _.result(object, 'a[0].b.c2');
     * // => 4
     *
     * _.result(object, 'a[0].b.c3', 'default');
     * // => 'default'
     *
     * _.result(object, 'a[0].b.c3', _.constant('default'));
     * // => 'default'
     */
    function result(object, path, defaultValue) {
      path = castPath(path, object);

      var index = -1,
          length = path.length;

      // Ensure the loop is entered when path is empty.
      if (!length) {
        length = 1;
        object = undefined$1;
      }
      while (++index < length) {
        var value = object == null ? undefined$1 : object[toKey(path[index])];
        if (value === undefined$1) {
          index = length;
          value = defaultValue;
        }
        object = isFunction(value) ? value.call(object) : value;
      }
      return object;
    }

    /**
     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
     * it's created. Arrays are created for missing index properties while objects
     * are created for all other missing properties. Use `_.setWith` to customize
     * `path` creation.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, ['x', '0', 'y', 'z'], 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
    function set(object, path, value) {
      return object == null ? object : baseSet(object, path, value);
    }

    /**
     * This method is like `_.set` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.setWith(object, '[0][1]', 'a', Object);
     * // => { '0': { '1': 'a' } }
     */
    function setWith(object, path, value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined$1;
      return object == null ? object : baseSet(object, path, value, customizer);
    }

    /**
     * Creates an array of own enumerable string keyed-value pairs for `object`
     * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
     * entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entries
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairs(new Foo);
     * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
     */
    var toPairs = createToPairs(keys);

    /**
     * Creates an array of own and inherited enumerable string keyed-value pairs
     * for `object` which can be consumed by `_.fromPairs`. If `object` is a map
     * or set, its entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entriesIn
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairsIn(new Foo);
     * // => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
     */
    var toPairsIn = createToPairs(keysIn);

    /**
     * An alternative to `_.reduce`; this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own
     * enumerable string keyed properties thru `iteratee`, with each invocation
     * potentially mutating the `accumulator` object. If `accumulator` is not
     * provided, a new object with the same `[[Prototype]]` will be used. The
     * iteratee is invoked with four arguments: (accumulator, value, key, object).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.transform([2, 3, 4], function(result, n) {
     *   result.push(n *= n);
     *   return n % 2 == 0;
     * }, []);
     * // => [4, 9]
     *
     * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */
    function transform(object, iteratee, accumulator) {
      var isArr = isArray(object),
          isArrLike = isArr || isBuffer(object) || isTypedArray(object);

      iteratee = getIteratee(iteratee, 4);
      if (accumulator == null) {
        var Ctor = object && object.constructor;
        if (isArrLike) {
          accumulator = isArr ? new Ctor : [];
        }
        else if (isObject(object)) {
          accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
        }
        else {
          accumulator = {};
        }
      }
      (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
        return iteratee(accumulator, value, index, object);
      });
      return accumulator;
    }

    /**
     * Removes the property at `path` of `object`.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 7 } }] };
     * _.unset(object, 'a[0].b.c');
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     *
     * _.unset(object, ['a', '0', 'b', 'c']);
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     */
    function unset(object, path) {
      return object == null ? true : baseUnset(object, path);
    }

    /**
     * This method is like `_.set` except that accepts `updater` to produce the
     * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
     * is invoked with one argument: (value).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.update(object, 'a[0].b.c', function(n) { return n * n; });
     * console.log(object.a[0].b.c);
     * // => 9
     *
     * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
     * console.log(object.x[0].y.z);
     * // => 0
     */
    function update(object, path, updater) {
      return object == null ? object : baseUpdate(object, path, castFunction(updater));
    }

    /**
     * This method is like `_.update` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.updateWith(object, '[0][1]', _.constant('a'), Object);
     * // => { '0': { '1': 'a' } }
     */
    function updateWith(object, path, updater, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined$1;
      return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
    }

    /**
     * Creates an array of the own enumerable string keyed property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */
    function values(object) {
      return object == null ? [] : baseValues(object, keys(object));
    }

    /**
     * Creates an array of the own and inherited enumerable string keyed property
     * values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.valuesIn(new Foo);
     * // => [1, 2, 3] (iteration order is not guaranteed)
     */
    function valuesIn(object) {
      return object == null ? [] : baseValues(object, keysIn(object));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Clamps `number` within the inclusive `lower` and `upper` bounds.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Number
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     * @example
     *
     * _.clamp(-10, -5, 5);
     * // => -5
     *
     * _.clamp(10, -5, 5);
     * // => 5
     */
    function clamp(number, lower, upper) {
      if (upper === undefined$1) {
        upper = lower;
        lower = undefined$1;
      }
      if (upper !== undefined$1) {
        upper = toNumber(upper);
        upper = upper === upper ? upper : 0;
      }
      if (lower !== undefined$1) {
        lower = toNumber(lower);
        lower = lower === lower ? lower : 0;
      }
      return baseClamp(toNumber(number), lower, upper);
    }

    /**
     * Checks if `n` is between `start` and up to, but not including, `end`. If
     * `end` is not specified, it's set to `start` with `start` then set to `0`.
     * If `start` is greater than `end` the params are swapped to support
     * negative ranges.
     *
     * @static
     * @memberOf _
     * @since 3.3.0
     * @category Number
     * @param {number} number The number to check.
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     * @see _.range, _.rangeRight
     * @example
     *
     * _.inRange(3, 2, 4);
     * // => true
     *
     * _.inRange(4, 8);
     * // => true
     *
     * _.inRange(4, 2);
     * // => false
     *
     * _.inRange(2, 2);
     * // => false
     *
     * _.inRange(1.2, 2);
     * // => true
     *
     * _.inRange(5.2, 4);
     * // => false
     *
     * _.inRange(-3, -2, -6);
     * // => true
     */
    function inRange(number, start, end) {
      start = toFinite(start);
      if (end === undefined$1) {
        end = start;
        start = 0;
      } else {
        end = toFinite(end);
      }
      number = toNumber(number);
      return baseInRange(number, start, end);
    }

    /**
     * Produces a random number between the inclusive `lower` and `upper` bounds.
     * If only one argument is provided a number between `0` and the given number
     * is returned. If `floating` is `true`, or either `lower` or `upper` are
     * floats, a floating-point number is returned instead of an integer.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Number
     * @param {number} [lower=0] The lower bound.
     * @param {number} [upper=1] The upper bound.
     * @param {boolean} [floating] Specify returning a floating-point number.
     * @returns {number} Returns the random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
    function random(lower, upper, floating) {
      if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
        upper = floating = undefined$1;
      }
      if (floating === undefined$1) {
        if (typeof upper == 'boolean') {
          floating = upper;
          upper = undefined$1;
        }
        else if (typeof lower == 'boolean') {
          floating = lower;
          lower = undefined$1;
        }
      }
      if (lower === undefined$1 && upper === undefined$1) {
        lower = 0;
        upper = 1;
      }
      else {
        lower = toFinite(lower);
        if (upper === undefined$1) {
          upper = lower;
          lower = 0;
        } else {
          upper = toFinite(upper);
        }
      }
      if (lower > upper) {
        var temp = lower;
        lower = upper;
        upper = temp;
      }
      if (floating || lower % 1 || upper % 1) {
        var rand = nativeRandom();
        return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
      }
      return baseRandom(lower, upper);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar--');
     * // => 'fooBar'
     *
     * _.camelCase('__FOO_BAR__');
     * // => 'fooBar'
     */
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? capitalize(word) : word);
    });

    /**
     * Converts the first character of `string` to upper case and the remaining
     * to lower case.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('FRED');
     * // => 'Fred'
     */
    function capitalize(string) {
      return upperFirst(toString(string).toLowerCase());
    }

    /**
     * Deburrs `string` by converting
     * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
     * letters to basic Latin letters and removing
     * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
    function deburr(string) {
      string = toString(string);
      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
    }

    /**
     * Checks if `string` ends with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=string.length] The position to search up to.
     * @returns {boolean} Returns `true` if `string` ends with `target`,
     *  else `false`.
     * @example
     *
     * _.endsWith('abc', 'c');
     * // => true
     *
     * _.endsWith('abc', 'b');
     * // => false
     *
     * _.endsWith('abc', 'b', 2);
     * // => true
     */
    function endsWith(string, target, position) {
      string = toString(string);
      target = baseToString(target);

      var length = string.length;
      position = position === undefined$1
        ? length
        : baseClamp(toInteger(position), 0, length);

      var end = position;
      position -= target.length;
      return position >= 0 && string.slice(position, end) == target;
    }

    /**
     * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
     * corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional
     * characters use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value. See
     * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * When working with HTML you should always
     * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
     * XSS vectors.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
    function escape(string) {
      string = toString(string);
      return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, escapeHtmlChar)
        : string;
    }

    /**
     * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
     * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https://lodash\.com/\)'
     */
    function escapeRegExp(string) {
      string = toString(string);
      return (string && reHasRegExpChar.test(string))
        ? string.replace(reRegExpChar, '\\$&')
        : string;
    }

    /**
     * Converts `string` to
     * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the kebab cased string.
     * @example
     *
     * _.kebabCase('Foo Bar');
     * // => 'foo-bar'
     *
     * _.kebabCase('fooBar');
     * // => 'foo-bar'
     *
     * _.kebabCase('__FOO_BAR__');
     * // => 'foo-bar'
     */
    var kebabCase = createCompounder(function(result, word, index) {
      return result + (index ? '-' : '') + word.toLowerCase();
    });

    /**
     * Converts `string`, as space separated words, to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.lowerCase('--Foo-Bar--');
     * // => 'foo bar'
     *
     * _.lowerCase('fooBar');
     * // => 'foo bar'
     *
     * _.lowerCase('__FOO_BAR__');
     * // => 'foo bar'
     */
    var lowerCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + word.toLowerCase();
    });

    /**
     * Converts the first character of `string` to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.lowerFirst('Fred');
     * // => 'fred'
     *
     * _.lowerFirst('FRED');
     * // => 'fRED'
     */
    var lowerFirst = createCaseFirst('toLowerCase');

    /**
     * Pads `string` on the left and right sides if it's shorter than `length`.
     * Padding characters are truncated if they can't be evenly divided by `length`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.pad('abc', 8);
     * // => '  abc   '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */
    function pad(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      if (!length || strLength >= length) {
        return string;
      }
      var mid = (length - strLength) / 2;
      return (
        createPadding(nativeFloor(mid), chars) +
        string +
        createPadding(nativeCeil(mid), chars)
      );
    }

    /**
     * Pads `string` on the right side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padEnd('abc', 6);
     * // => 'abc   '
     *
     * _.padEnd('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padEnd('abc', 3);
     * // => 'abc'
     */
    function padEnd(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      return (length && strLength < length)
        ? (string + createPadding(length - strLength, chars))
        : string;
    }

    /**
     * Pads `string` on the left side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padStart('abc', 6);
     * // => '   abc'
     *
     * _.padStart('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padStart('abc', 3);
     * // => 'abc'
     */
    function padStart(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      return (length && strLength < length)
        ? (createPadding(length - strLength, chars) + string)
        : string;
    }

    /**
     * Converts `string` to an integer of the specified radix. If `radix` is
     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
     * hexadecimal, in which case a `radix` of `16` is used.
     *
     * **Note:** This method aligns with the
     * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category String
     * @param {string} string The string to convert.
     * @param {number} [radix=10] The radix to interpret `value` by.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     *
     * _.map(['6', '08', '10'], _.parseInt);
     * // => [6, 8, 10]
     */
    function parseInt(string, radix, guard) {
      if (guard || radix == null) {
        radix = 0;
      } else if (radix) {
        radix = +radix;
      }
      return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
    }

    /**
     * Repeats the given string `n` times.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to repeat.
     * @param {number} [n=1] The number of times to repeat the string.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the repeated string.
     * @example
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */
    function repeat(string, n, guard) {
      if ((guard ? isIterateeCall(string, n, guard) : n === undefined$1)) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      return baseRepeat(toString(string), n);
    }

    /**
     * Replaces matches for `pattern` in `string` with `replacement`.
     *
     * **Note:** This method is based on
     * [`String#replace`](https://mdn.io/String/replace).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to modify.
     * @param {RegExp|string} pattern The pattern to replace.
     * @param {Function|string} replacement The match replacement.
     * @returns {string} Returns the modified string.
     * @example
     *
     * _.replace('Hi Fred', 'Fred', 'Barney');
     * // => 'Hi Barney'
     */
    function replace() {
      var args = arguments,
          string = toString(args[0]);

      return args.length < 3 ? string : string.replace(args[1], args[2]);
    }

    /**
     * Converts `string` to
     * [snake case](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the snake cased string.
     * @example
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--FOO-BAR--');
     * // => 'foo_bar'
     */
    var snakeCase = createCompounder(function(result, word, index) {
      return result + (index ? '_' : '') + word.toLowerCase();
    });

    /**
     * Splits `string` by `separator`.
     *
     * **Note:** This method is based on
     * [`String#split`](https://mdn.io/String/split).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to split.
     * @param {RegExp|string} separator The separator pattern to split by.
     * @param {number} [limit] The length to truncate results to.
     * @returns {Array} Returns the string segments.
     * @example
     *
     * _.split('a-b-c', '-', 2);
     * // => ['a', 'b']
     */
    function split(string, separator, limit) {
      if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
        separator = limit = undefined$1;
      }
      limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
      if (!limit) {
        return [];
      }
      string = toString(string);
      if (string && (
            typeof separator == 'string' ||
            (separator != null && !isRegExp(separator))
          )) {
        separator = baseToString(separator);
        if (!separator && hasUnicode(string)) {
          return castSlice(stringToArray(string), 0, limit);
        }
      }
      return string.split(separator, limit);
    }

    /**
     * Converts `string` to
     * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
     *
     * @static
     * @memberOf _
     * @since 3.1.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the start cased string.
     * @example
     *
     * _.startCase('--foo-bar--');
     * // => 'Foo Bar'
     *
     * _.startCase('fooBar');
     * // => 'Foo Bar'
     *
     * _.startCase('__FOO_BAR__');
     * // => 'FOO BAR'
     */
    var startCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + upperFirst(word);
    });

    /**
     * Checks if `string` starts with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=0] The position to search from.
     * @returns {boolean} Returns `true` if `string` starts with `target`,
     *  else `false`.
     * @example
     *
     * _.startsWith('abc', 'a');
     * // => true
     *
     * _.startsWith('abc', 'b');
     * // => false
     *
     * _.startsWith('abc', 'b', 1);
     * // => true
     */
    function startsWith(string, target, position) {
      string = toString(string);
      position = position == null
        ? 0
        : baseClamp(toInteger(position), 0, string.length);

      target = baseToString(target);
      return string.slice(position, position + target.length) == target;
    }

    /**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is given, it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options={}] The options object.
     * @param {RegExp} [options.escape=_.templateSettings.escape]
     *  The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
     *  The "evaluate" delimiter.
     * @param {Object} [options.imports=_.templateSettings.imports]
     *  An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
     *  The "interpolate" delimiter.
     * @param {string} [options.sourceURL='lodash.templateSources[n]']
     *  The sourceURL of the compiled template.
     * @param {string} [options.variable='obj']
     *  The data object variable name.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // Use the "interpolate" delimiter to create a compiled template.
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // Use the HTML "escape" delimiter to escape data property values.
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the internal `print` function in "evaluate" delimiters.
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // Use the ES template literal delimiter as an "interpolate" delimiter.
     * // Disable support by replacing the "interpolate" delimiter.
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // Use backslashes to treat delimiters as plain text.
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // Use the `imports` option to import `jQuery` as `jq`.
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the `sourceURL` option to specify a custom sourceURL for the template.
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
     *
     * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // Use custom template delimiters.
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // Use the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and stack traces.
     * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(string, options, guard) {
      // Based on John Resig's `tmpl` implementation
      // (http://ejohn.org/blog/javascript-micro-templating/)
      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
      var settings = lodash.templateSettings;

      if (guard && isIterateeCall(string, options, guard)) {
        options = undefined$1;
      }
      string = toString(string);
      options = assignInWith({}, options, settings, customDefaultsAssignIn);

      var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
          importsKeys = keys(imports),
          importsValues = baseValues(imports, importsKeys);

      var isEscaping,
          isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // Compile the regexp to match each delimiter.
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      // Use a sourceURL for easier debugging.
      // The sourceURL gets injected into the source that's eval-ed, so be careful
      // to normalize all kinds of whitespace, so e.g. newlines (and unicode versions of it) can't sneak in
      // and escape the comment, thus injecting code that gets evaled.
      var sourceURL = '//# sourceURL=' +
        (hasOwnProperty.call(options, 'sourceURL')
          ? (options.sourceURL + '').replace(/\s/g, ' ')
          : ('lodash.templateSources[' + (++templateCounter) + ']')
        ) + '\n';

      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // Escape characters that can't be included in string literals.
        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // Replace delimiters with snippets.
        if (escapeValue) {
          isEscaping = true;
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // The JS engine embedded in Adobe products needs `match` returned in
        // order to produce the correct `offset` value.
        return match;
      });

      source += "';\n";

      // If `variable` is not specified wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain.
      var variable = hasOwnProperty.call(options, 'variable') && options.variable;
      if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n';
      }
      // Throw an error if a forbidden character was found in `variable`, to prevent
      // potential command injection attacks.
      else if (reForbiddenIdentifierChars.test(variable)) {
        throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);
      }

      // Cleanup code by stripping empty strings.
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // Frame code as the function body.
      source = 'function(' + (variable || 'obj') + ') {\n' +
        (variable
          ? ''
          : 'obj || (obj = {});\n'
        ) +
        "var __t, __p = ''" +
        (isEscaping
           ? ', __e = _.escape'
           : ''
        ) +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      var result = attempt(function() {
        return Function(importsKeys, sourceURL + 'return ' + source)
          .apply(undefined$1, importsValues);
      });

      // Provide the compiled function's source by its `toString` method or
      // the `source` property as a convenience for inlining compiled templates.
      result.source = source;
      if (isError(result)) {
        throw result;
      }
      return result;
    }

    /**
     * Converts `string`, as a whole, to lower case just like
     * [String#toLowerCase](https://mdn.io/toLowerCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.toLower('--Foo-Bar--');
     * // => '--foo-bar--'
     *
     * _.toLower('fooBar');
     * // => 'foobar'
     *
     * _.toLower('__FOO_BAR__');
     * // => '__foo_bar__'
     */
    function toLower(value) {
      return toString(value).toLowerCase();
    }

    /**
     * Converts `string`, as a whole, to upper case just like
     * [String#toUpperCase](https://mdn.io/toUpperCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.toUpper('--foo-bar--');
     * // => '--FOO-BAR--'
     *
     * _.toUpper('fooBar');
     * // => 'FOOBAR'
     *
     * _.toUpper('__foo_bar__');
     * // => '__FOO_BAR__'
     */
    function toUpper(value) {
      return toString(value).toUpperCase();
    }

    /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
    function trim(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined$1)) {
        return baseTrim(string);
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          chrSymbols = stringToArray(chars),
          start = charsStartIndex(strSymbols, chrSymbols),
          end = charsEndIndex(strSymbols, chrSymbols) + 1;

      return castSlice(strSymbols, start, end).join('');
    }

    /**
     * Removes trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimEnd('  abc  ');
     * // => '  abc'
     *
     * _.trimEnd('-_-abc-_-', '_-');
     * // => '-_-abc'
     */
    function trimEnd(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined$1)) {
        return string.slice(0, trimmedEndIndex(string) + 1);
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

      return castSlice(strSymbols, 0, end).join('');
    }

    /**
     * Removes leading whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimStart('  abc  ');
     * // => 'abc  '
     *
     * _.trimStart('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */
    function trimStart(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined$1)) {
        return string.replace(reTrimStart, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          start = charsStartIndex(strSymbols, stringToArray(chars));

      return castSlice(strSymbols, start).join('');
    }

    /**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to truncate.
     * @param {Object} [options={}] The options object.
     * @param {number} [options.length=30] The maximum string length.
     * @param {string} [options.omission='...'] The string to indicate text is omitted.
     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
     * @returns {string} Returns the truncated string.
     * @example
     *
     * _.truncate('hi-diddly-ho there, neighborino');
     * // => 'hi-diddly-ho there, neighbo...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': ' '
     * });
     * // => 'hi-diddly-ho there,...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': /,? +/
     * });
     * // => 'hi-diddly-ho there...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'omission': ' [...]'
     * });
     * // => 'hi-diddly-ho there, neig [...]'
     */
    function truncate(string, options) {
      var length = DEFAULT_TRUNC_LENGTH,
          omission = DEFAULT_TRUNC_OMISSION;

      if (isObject(options)) {
        var separator = 'separator' in options ? options.separator : separator;
        length = 'length' in options ? toInteger(options.length) : length;
        omission = 'omission' in options ? baseToString(options.omission) : omission;
      }
      string = toString(string);

      var strLength = string.length;
      if (hasUnicode(string)) {
        var strSymbols = stringToArray(string);
        strLength = strSymbols.length;
      }
      if (length >= strLength) {
        return string;
      }
      var end = length - stringSize(omission);
      if (end < 1) {
        return omission;
      }
      var result = strSymbols
        ? castSlice(strSymbols, 0, end).join('')
        : string.slice(0, end);

      if (separator === undefined$1) {
        return result + omission;
      }
      if (strSymbols) {
        end += (result.length - end);
      }
      if (isRegExp(separator)) {
        if (string.slice(end).search(separator)) {
          var match,
              substring = result;

          if (!separator.global) {
            separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
          }
          separator.lastIndex = 0;
          while ((match = separator.exec(substring))) {
            var newEnd = match.index;
          }
          result = result.slice(0, newEnd === undefined$1 ? end : newEnd);
        }
      } else if (string.indexOf(baseToString(separator), end) != end) {
        var index = result.lastIndexOf(separator);
        if (index > -1) {
          result = result.slice(0, index);
        }
      }
      return result + omission;
    }

    /**
     * The inverse of `_.escape`; this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
     * their corresponding characters.
     *
     * **Note:** No other HTML entities are unescaped. To unescape additional
     * HTML entities use a third-party library like [_he_](https://mths.be/he).
     *
     * @static
     * @memberOf _
     * @since 0.6.0
     * @category String
     * @param {string} [string=''] The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('fred, barney, &amp; pebbles');
     * // => 'fred, barney, & pebbles'
     */
    function unescape(string) {
      string = toString(string);
      return (string && reHasEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, unescapeHtmlChar)
        : string;
    }

    /**
     * Converts `string`, as space separated words, to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.upperCase('--foo-bar');
     * // => 'FOO BAR'
     *
     * _.upperCase('fooBar');
     * // => 'FOO BAR'
     *
     * _.upperCase('__foo_bar__');
     * // => 'FOO BAR'
     */
    var upperCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + word.toUpperCase();
    });

    /**
     * Converts the first character of `string` to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.upperFirst('fred');
     * // => 'Fred'
     *
     * _.upperFirst('FRED');
     * // => 'FRED'
     */
    var upperFirst = createCaseFirst('toUpperCase');

    /**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */
    function words(string, pattern, guard) {
      string = toString(string);
      pattern = guard ? undefined$1 : pattern;

      if (pattern === undefined$1) {
        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
      }
      return string.match(pattern) || [];
    }

    /*------------------------------------------------------------------------*/

    /**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Function} func The function to attempt.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // Avoid throwing errors for invalid selectors.
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */
    var attempt = baseRest(function(func, args) {
      try {
        return apply(func, undefined$1, args);
      } catch (e) {
        return isError(e) ? e : new Error(e);
      }
    });

    /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method.
     *
     * **Note:** This method doesn't set the "length" property of bound functions.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...(string|string[])} methodNames The object method names to bind.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'click': function() {
     *     console.log('clicked ' + this.label);
     *   }
     * };
     *
     * _.bindAll(view, ['click']);
     * jQuery(element).on('click', view.click);
     * // => Logs 'clicked docs' when clicked.
     */
    var bindAll = flatRest(function(object, methodNames) {
      arrayEach(methodNames, function(key) {
        key = toKey(key);
        baseAssignValue(object, key, bind(object[key], object));
      });
      return object;
    });

    /**
     * Creates a function that iterates over `pairs` and invokes the corresponding
     * function of the first predicate to return truthy. The predicate-function
     * pairs are invoked with the `this` binding and arguments of the created
     * function.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Array} pairs The predicate-function pairs.
     * @returns {Function} Returns the new composite function.
     * @example
     *
     * var func = _.cond([
     *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
     *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
     *   [_.stubTrue,                      _.constant('no match')]
     * ]);
     *
     * func({ 'a': 1, 'b': 2 });
     * // => 'matches A'
     *
     * func({ 'a': 0, 'b': 1 });
     * // => 'matches B'
     *
     * func({ 'a': '1', 'b': '2' });
     * // => 'no match'
     */
    function cond(pairs) {
      var length = pairs == null ? 0 : pairs.length,
          toIteratee = getIteratee();

      pairs = !length ? [] : arrayMap(pairs, function(pair) {
        if (typeof pair[1] != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        return [toIteratee(pair[0]), pair[1]];
      });

      return baseRest(function(args) {
        var index = -1;
        while (++index < length) {
          var pair = pairs[index];
          if (apply(pair[0], this, args)) {
            return apply(pair[1], this, args);
          }
        }
      });
    }

    /**
     * Creates a function that invokes the predicate properties of `source` with
     * the corresponding property values of a given object, returning `true` if
     * all predicates return truthy, else `false`.
     *
     * **Note:** The created function is equivalent to `_.conformsTo` with
     * `source` partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 2, 'b': 1 },
     *   { 'a': 1, 'b': 2 }
     * ];
     *
     * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
     * // => [{ 'a': 1, 'b': 2 }]
     */
    function conforms(source) {
      return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    /**
     * Checks `value` to determine whether a default value should be returned in
     * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
     * or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Util
     * @param {*} value The value to check.
     * @param {*} defaultValue The default value.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * _.defaultTo(1, 10);
     * // => 1
     *
     * _.defaultTo(undefined, 10);
     * // => 10
     */
    function defaultTo(value, defaultValue) {
      return (value == null || value !== value) ? defaultValue : value;
    }

    /**
     * Creates a function that returns the result of invoking the given functions
     * with the `this` binding of the created function, where each successive
     * invocation is supplied the return value of the previous.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flowRight
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flow([_.add, square]);
     * addSquare(1, 2);
     * // => 9
     */
    var flow = createFlow();

    /**
     * This method is like `_.flow` except that it creates a function that
     * invokes the given functions from right to left.
     *
     * @static
     * @since 3.0.0
     * @memberOf _
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flow
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flowRight([square, _.add]);
     * addSquare(1, 2);
     * // => 9
     */
    var flowRight = createFlow(true);

    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * Creates a function that invokes `func` with the arguments of the created
     * function. If `func` is a property name, the created function returns the
     * property value for a given element. If `func` is an array or object, the
     * created function returns `true` for elements that contain the equivalent
     * source properties, otherwise it returns `false`.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Util
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @returns {Function} Returns the callback.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
     * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, _.iteratee(['user', 'fred']));
     * // => [{ 'user': 'fred', 'age': 40 }]
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, _.iteratee('user'));
     * // => ['barney', 'fred']
     *
     * // Create custom iteratee shorthands.
     * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
     *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
     *     return func.test(string);
     *   };
     * });
     *
     * _.filter(['abc', 'def'], /ef/);
     * // => ['def']
     */
    function iteratee(func) {
      return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that performs a partial deep comparison between a given
     * object and `source`, returning `true` if the given object has equivalent
     * property values, else `false`.
     *
     * **Note:** The created function is equivalent to `_.isMatch` with `source`
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * **Note:** Multiple values can be checked by combining several matchers
     * using `_.overSome`
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
     * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
     *
     * // Checking for several possible values
     * _.filter(objects, _.overSome([_.matches({ 'a': 1 }), _.matches({ 'a': 4 })]));
     * // => [{ 'a': 1, 'b': 2, 'c': 3 }, { 'a': 4, 'b': 5, 'c': 6 }]
     */
    function matches(source) {
      return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that performs a partial deep comparison between the
     * value at `path` of a given object to `srcValue`, returning `true` if the
     * object value is equivalent, else `false`.
     *
     * **Note:** Partial comparisons will match empty array and empty object
     * `srcValue` values against any array or object value, respectively. See
     * `_.isEqual` for a list of supported value comparisons.
     *
     * **Note:** Multiple values can be checked by combining several matchers
     * using `_.overSome`
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.find(objects, _.matchesProperty('a', 4));
     * // => { 'a': 4, 'b': 5, 'c': 6 }
     *
     * // Checking for several possible values
     * _.filter(objects, _.overSome([_.matchesProperty('a', 1), _.matchesProperty('a', 4)]));
     * // => [{ 'a': 1, 'b': 2, 'c': 3 }, { 'a': 4, 'b': 5, 'c': 6 }]
     */
    function matchesProperty(path, srcValue) {
      return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that invokes the method at `path` of a given object.
     * Any additional arguments are provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': _.constant(2) } },
     *   { 'a': { 'b': _.constant(1) } }
     * ];
     *
     * _.map(objects, _.method('a.b'));
     * // => [2, 1]
     *
     * _.map(objects, _.method(['a', 'b']));
     * // => [2, 1]
     */
    var method = baseRest(function(path, args) {
      return function(object) {
        return baseInvoke(object, path, args);
      };
    });

    /**
     * The opposite of `_.method`; this method creates a function that invokes
     * the method at a given path of `object`. Any additional arguments are
     * provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Object} object The object to query.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var array = _.times(3, _.constant),
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
     * // => [2, 0]
     */
    var methodOf = baseRest(function(object, args) {
      return function(path) {
        return baseInvoke(object, path, args);
      };
    });

    /**
     * Adds all own enumerable string keyed function properties of a source
     * object to the destination object. If `object` is a function, then methods
     * are added to its prototype as well.
     *
     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
     * avoid conflicts caused by modifying the original.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Function|Object} [object=lodash] The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
     * @returns {Function|Object} Returns `object`.
     * @example
     *
     * function vowels(string) {
     *   return _.filter(string, function(v) {
     *     return /[aeiou]/i.test(v);
     *   });
     * }
     *
     * _.mixin({ 'vowels': vowels });
     * _.vowels('fred');
     * // => ['e']
     *
     * _('fred').vowels().value();
     * // => ['e']
     *
     * _.mixin({ 'vowels': vowels }, { 'chain': false });
     * _('fred').vowels();
     * // => ['e']
     */
    function mixin(object, source, options) {
      var props = keys(source),
          methodNames = baseFunctions(source, props);

      if (options == null &&
          !(isObject(source) && (methodNames.length || !props.length))) {
        options = source;
        source = object;
        object = this;
        methodNames = baseFunctions(source, keys(source));
      }
      var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
          isFunc = isFunction(object);

      arrayEach(methodNames, function(methodName) {
        var func = source[methodName];
        object[methodName] = func;
        if (isFunc) {
          object.prototype[methodName] = function() {
            var chainAll = this.__chain__;
            if (chain || chainAll) {
              var result = object(this.__wrapped__),
                  actions = result.__actions__ = copyArray(this.__actions__);

              actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
              result.__chain__ = chainAll;
              return result;
            }
            return func.apply(object, arrayPush([this.value()], arguments));
          };
        }
      });

      return object;
    }

    /**
     * Reverts the `_` variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
    function noConflict() {
      if (root._ === this) {
        root._ = oldDash;
      }
      return this;
    }

    /**
     * This method returns `undefined`.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Util
     * @example
     *
     * _.times(2, _.noop);
     * // => [undefined, undefined]
     */
    function noop() {
      // No operation performed.
    }

    /**
     * Creates a function that gets the argument at index `n`. If `n` is negative,
     * the nth argument from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [n=0] The index of the argument to return.
     * @returns {Function} Returns the new pass-thru function.
     * @example
     *
     * var func = _.nthArg(1);
     * func('a', 'b', 'c', 'd');
     * // => 'b'
     *
     * var func = _.nthArg(-2);
     * func('a', 'b', 'c', 'd');
     * // => 'c'
     */
    function nthArg(n) {
      n = toInteger(n);
      return baseRest(function(args) {
        return baseNth(args, n);
      });
    }

    /**
     * Creates a function that invokes `iteratees` with the arguments it receives
     * and returns their results.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.over([Math.max, Math.min]);
     *
     * func(1, 2, 3, 4);
     * // => [4, 1]
     */
    var over = createOver(arrayMap);

    /**
     * Creates a function that checks if **all** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * Following shorthands are possible for providing predicates.
     * Pass an `Object` and it will be used as an parameter for `_.matches` to create the predicate.
     * Pass an `Array` of parameters for `_.matchesProperty` and the predicate will be created using them.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overEvery([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => false
     *
     * func(NaN);
     * // => false
     */
    var overEvery = createOver(arrayEvery);

    /**
     * Creates a function that checks if **any** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * Following shorthands are possible for providing predicates.
     * Pass an `Object` and it will be used as an parameter for `_.matches` to create the predicate.
     * Pass an `Array` of parameters for `_.matchesProperty` and the predicate will be created using them.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overSome([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => true
     *
     * func(NaN);
     * // => false
     *
     * var matchesFunc = _.overSome([{ 'a': 1 }, { 'a': 2 }])
     * var matchesPropertyFunc = _.overSome([['a', 1], ['a', 2]])
     */
    var overSome = createOver(arraySome);

    /**
     * Creates a function that returns the value at `path` of a given object.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': 2 } },
     *   { 'a': { 'b': 1 } }
     * ];
     *
     * _.map(objects, _.property('a.b'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
     * // => [1, 2]
     */
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }

    /**
     * The opposite of `_.property`; this method creates a function that returns
     * the value at a given path of `object`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var array = [0, 1, 2],
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
     * // => [2, 0]
     */
    function propertyOf(object) {
      return function(path) {
        return object == null ? undefined$1 : baseGet(object, path);
      };
    }

    /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to, but not including, `end`. A step of `-1` is used if a negative
     * `start` is specified without an `end` or `step`. If `end` is not specified,
     * it's set to `start` with `start` then set to `0`.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.rangeRight
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(-4);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
    var range = createRange();

    /**
     * This method is like `_.range` except that it populates values in
     * descending order.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.range
     * @example
     *
     * _.rangeRight(4);
     * // => [3, 2, 1, 0]
     *
     * _.rangeRight(-4);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 5);
     * // => [4, 3, 2, 1]
     *
     * _.rangeRight(0, 20, 5);
     * // => [15, 10, 5, 0]
     *
     * _.rangeRight(0, -4, -1);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.rangeRight(0);
     * // => []
     */
    var rangeRight = createRange(true);

    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */
    function stubArray() {
      return [];
    }

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    /**
     * This method returns a new empty object.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Object} Returns the new empty object.
     * @example
     *
     * var objects = _.times(2, _.stubObject);
     *
     * console.log(objects);
     * // => [{}, {}]
     *
     * console.log(objects[0] === objects[1]);
     * // => false
     */
    function stubObject() {
      return {};
    }

    /**
     * This method returns an empty string.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {string} Returns the empty string.
     * @example
     *
     * _.times(2, _.stubString);
     * // => ['', '']
     */
    function stubString() {
      return '';
    }

    /**
     * This method returns `true`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `true`.
     * @example
     *
     * _.times(2, _.stubTrue);
     * // => [true, true]
     */
    function stubTrue() {
      return true;
    }

    /**
     * Invokes the iteratee `n` times, returning an array of the results of
     * each invocation. The iteratee is invoked with one argument; (index).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.times(3, String);
     * // => ['0', '1', '2']
     *
     *  _.times(4, _.constant(0));
     * // => [0, 0, 0, 0]
     */
    function times(n, iteratee) {
      n = toInteger(n);
      if (n < 1 || n > MAX_SAFE_INTEGER) {
        return [];
      }
      var index = MAX_ARRAY_LENGTH,
          length = nativeMin(n, MAX_ARRAY_LENGTH);

      iteratee = getIteratee(iteratee);
      n -= MAX_ARRAY_LENGTH;

      var result = baseTimes(length, iteratee);
      while (++index < n) {
        iteratee(index);
      }
      return result;
    }

    /**
     * Converts `value` to a property path array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {*} value The value to convert.
     * @returns {Array} Returns the new property path array.
     * @example
     *
     * _.toPath('a.b.c');
     * // => ['a', 'b', 'c']
     *
     * _.toPath('a[0].b.c');
     * // => ['a', '0', 'b', 'c']
     */
    function toPath(value) {
      if (isArray(value)) {
        return arrayMap(value, toKey);
      }
      return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
    }

    /**
     * Generates a unique ID. If `prefix` is given, the ID is appended to it.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {string} [prefix=''] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
    function uniqueId(prefix) {
      var id = ++idCounter;
      return toString(prefix) + id;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Adds two numbers.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {number} augend The first number in an addition.
     * @param {number} addend The second number in an addition.
     * @returns {number} Returns the total.
     * @example
     *
     * _.add(6, 4);
     * // => 10
     */
    var add = createMathOperation(function(augend, addend) {
      return augend + addend;
    }, 0);

    /**
     * Computes `number` rounded up to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round up.
     * @param {number} [precision=0] The precision to round up to.
     * @returns {number} Returns the rounded up number.
     * @example
     *
     * _.ceil(4.006);
     * // => 5
     *
     * _.ceil(6.004, 2);
     * // => 6.01
     *
     * _.ceil(6040, -2);
     * // => 6100
     */
    var ceil = createRound('ceil');

    /**
     * Divide two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} dividend The first number in a division.
     * @param {number} divisor The second number in a division.
     * @returns {number} Returns the quotient.
     * @example
     *
     * _.divide(6, 4);
     * // => 1.5
     */
    var divide = createMathOperation(function(dividend, divisor) {
      return dividend / divisor;
    }, 1);

    /**
     * Computes `number` rounded down to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round down.
     * @param {number} [precision=0] The precision to round down to.
     * @returns {number} Returns the rounded down number.
     * @example
     *
     * _.floor(4.006);
     * // => 4
     *
     * _.floor(0.046, 2);
     * // => 0.04
     *
     * _.floor(4060, -2);
     * // => 4000
     */
    var floor = createRound('floor');

    /**
     * Computes the maximum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * _.max([]);
     * // => undefined
     */
    function max(array) {
      return (array && array.length)
        ? baseExtremum(array, identity, baseGt)
        : undefined$1;
    }

    /**
     * This method is like `_.max` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.maxBy(objects, function(o) { return o.n; });
     * // => { 'n': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.maxBy(objects, 'n');
     * // => { 'n': 2 }
     */
    function maxBy(array, iteratee) {
      return (array && array.length)
        ? baseExtremum(array, getIteratee(iteratee, 2), baseGt)
        : undefined$1;
    }

    /**
     * Computes the mean of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the mean.
     * @example
     *
     * _.mean([4, 2, 8, 6]);
     * // => 5
     */
    function mean(array) {
      return baseMean(array, identity);
    }

    /**
     * This method is like `_.mean` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be averaged.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the mean.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.meanBy(objects, function(o) { return o.n; });
     * // => 5
     *
     * // The `_.property` iteratee shorthand.
     * _.meanBy(objects, 'n');
     * // => 5
     */
    function meanBy(array, iteratee) {
      return baseMean(array, getIteratee(iteratee, 2));
    }

    /**
     * Computes the minimum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * _.min([]);
     * // => undefined
     */
    function min(array) {
      return (array && array.length)
        ? baseExtremum(array, identity, baseLt)
        : undefined$1;
    }

    /**
     * This method is like `_.min` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.minBy(objects, function(o) { return o.n; });
     * // => { 'n': 1 }
     *
     * // The `_.property` iteratee shorthand.
     * _.minBy(objects, 'n');
     * // => { 'n': 1 }
     */
    function minBy(array, iteratee) {
      return (array && array.length)
        ? baseExtremum(array, getIteratee(iteratee, 2), baseLt)
        : undefined$1;
    }

    /**
     * Multiply two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} multiplier The first number in a multiplication.
     * @param {number} multiplicand The second number in a multiplication.
     * @returns {number} Returns the product.
     * @example
     *
     * _.multiply(6, 4);
     * // => 24
     */
    var multiply = createMathOperation(function(multiplier, multiplicand) {
      return multiplier * multiplicand;
    }, 1);

    /**
     * Computes `number` rounded to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round.
     * @param {number} [precision=0] The precision to round to.
     * @returns {number} Returns the rounded number.
     * @example
     *
     * _.round(4.006);
     * // => 4
     *
     * _.round(4.006, 2);
     * // => 4.01
     *
     * _.round(4060, -2);
     * // => 4100
     */
    var round = createRound('round');

    /**
     * Subtract two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {number} minuend The first number in a subtraction.
     * @param {number} subtrahend The second number in a subtraction.
     * @returns {number} Returns the difference.
     * @example
     *
     * _.subtract(6, 4);
     * // => 2
     */
    var subtract = createMathOperation(function(minuend, subtrahend) {
      return minuend - subtrahend;
    }, 0);

    /**
     * Computes the sum of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.sum([4, 2, 8, 6]);
     * // => 20
     */
    function sum(array) {
      return (array && array.length)
        ? baseSum(array, identity)
        : 0;
    }

    /**
     * This method is like `_.sum` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be summed.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the sum.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.sumBy(objects, function(o) { return o.n; });
     * // => 20
     *
     * // The `_.property` iteratee shorthand.
     * _.sumBy(objects, 'n');
     * // => 20
     */
    function sumBy(array, iteratee) {
      return (array && array.length)
        ? baseSum(array, getIteratee(iteratee, 2))
        : 0;
    }

    /*------------------------------------------------------------------------*/

    // Add methods that return wrapped values in chain sequences.
    lodash.after = after;
    lodash.ary = ary;
    lodash.assign = assign;
    lodash.assignIn = assignIn;
    lodash.assignInWith = assignInWith;
    lodash.assignWith = assignWith;
    lodash.at = at;
    lodash.before = before;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.castArray = castArray;
    lodash.chain = chain;
    lodash.chunk = chunk;
    lodash.compact = compact;
    lodash.concat = concat;
    lodash.cond = cond;
    lodash.conforms = conforms;
    lodash.constant = constant;
    lodash.countBy = countBy;
    lodash.create = create;
    lodash.curry = curry;
    lodash.curryRight = curryRight;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defaultsDeep = defaultsDeep;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.differenceBy = differenceBy;
    lodash.differenceWith = differenceWith;
    lodash.drop = drop;
    lodash.dropRight = dropRight;
    lodash.dropRightWhile = dropRightWhile;
    lodash.dropWhile = dropWhile;
    lodash.fill = fill;
    lodash.filter = filter;
    lodash.flatMap = flatMap;
    lodash.flatMapDeep = flatMapDeep;
    lodash.flatMapDepth = flatMapDepth;
    lodash.flatten = flatten;
    lodash.flattenDeep = flattenDeep;
    lodash.flattenDepth = flattenDepth;
    lodash.flip = flip;
    lodash.flow = flow;
    lodash.flowRight = flowRight;
    lodash.fromPairs = fromPairs;
    lodash.functions = functions;
    lodash.functionsIn = functionsIn;
    lodash.groupBy = groupBy;
    lodash.initial = initial;
    lodash.intersection = intersection;
    lodash.intersectionBy = intersectionBy;
    lodash.intersectionWith = intersectionWith;
    lodash.invert = invert;
    lodash.invertBy = invertBy;
    lodash.invokeMap = invokeMap;
    lodash.iteratee = iteratee;
    lodash.keyBy = keyBy;
    lodash.keys = keys;
    lodash.keysIn = keysIn;
    lodash.map = map;
    lodash.mapKeys = mapKeys;
    lodash.mapValues = mapValues;
    lodash.matches = matches;
    lodash.matchesProperty = matchesProperty;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.mergeWith = mergeWith;
    lodash.method = method;
    lodash.methodOf = methodOf;
    lodash.mixin = mixin;
    lodash.negate = negate;
    lodash.nthArg = nthArg;
    lodash.omit = omit;
    lodash.omitBy = omitBy;
    lodash.once = once;
    lodash.orderBy = orderBy;
    lodash.over = over;
    lodash.overArgs = overArgs;
    lodash.overEvery = overEvery;
    lodash.overSome = overSome;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.partition = partition;
    lodash.pick = pick;
    lodash.pickBy = pickBy;
    lodash.property = property;
    lodash.propertyOf = propertyOf;
    lodash.pull = pull;
    lodash.pullAll = pullAll;
    lodash.pullAllBy = pullAllBy;
    lodash.pullAllWith = pullAllWith;
    lodash.pullAt = pullAt;
    lodash.range = range;
    lodash.rangeRight = rangeRight;
    lodash.rearg = rearg;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.reverse = reverse;
    lodash.sampleSize = sampleSize;
    lodash.set = set;
    lodash.setWith = setWith;
    lodash.shuffle = shuffle;
    lodash.slice = slice;
    lodash.sortBy = sortBy;
    lodash.sortedUniq = sortedUniq;
    lodash.sortedUniqBy = sortedUniqBy;
    lodash.split = split;
    lodash.spread = spread;
    lodash.tail = tail;
    lodash.take = take;
    lodash.takeRight = takeRight;
    lodash.takeRightWhile = takeRightWhile;
    lodash.takeWhile = takeWhile;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.thru = thru;
    lodash.toArray = toArray;
    lodash.toPairs = toPairs;
    lodash.toPairsIn = toPairsIn;
    lodash.toPath = toPath;
    lodash.toPlainObject = toPlainObject;
    lodash.transform = transform;
    lodash.unary = unary;
    lodash.union = union;
    lodash.unionBy = unionBy;
    lodash.unionWith = unionWith;
    lodash.uniq = uniq;
    lodash.uniqBy = uniqBy;
    lodash.uniqWith = uniqWith;
    lodash.unset = unset;
    lodash.unzip = unzip;
    lodash.unzipWith = unzipWith;
    lodash.update = update;
    lodash.updateWith = updateWith;
    lodash.values = values;
    lodash.valuesIn = valuesIn;
    lodash.without = without;
    lodash.words = words;
    lodash.wrap = wrap;
    lodash.xor = xor;
    lodash.xorBy = xorBy;
    lodash.xorWith = xorWith;
    lodash.zip = zip;
    lodash.zipObject = zipObject;
    lodash.zipObjectDeep = zipObjectDeep;
    lodash.zipWith = zipWith;

    // Add aliases.
    lodash.entries = toPairs;
    lodash.entriesIn = toPairsIn;
    lodash.extend = assignIn;
    lodash.extendWith = assignInWith;

    // Add methods to `lodash.prototype`.
    mixin(lodash, lodash);

    /*------------------------------------------------------------------------*/

    // Add methods that return unwrapped values in chain sequences.
    lodash.add = add;
    lodash.attempt = attempt;
    lodash.camelCase = camelCase;
    lodash.capitalize = capitalize;
    lodash.ceil = ceil;
    lodash.clamp = clamp;
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.cloneDeepWith = cloneDeepWith;
    lodash.cloneWith = cloneWith;
    lodash.conformsTo = conformsTo;
    lodash.deburr = deburr;
    lodash.defaultTo = defaultTo;
    lodash.divide = divide;
    lodash.endsWith = endsWith;
    lodash.eq = eq;
    lodash.escape = escape;
    lodash.escapeRegExp = escapeRegExp;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.floor = floor;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.forOwn = forOwn;
    lodash.forOwnRight = forOwnRight;
    lodash.get = get;
    lodash.gt = gt;
    lodash.gte = gte;
    lodash.has = has;
    lodash.hasIn = hasIn;
    lodash.head = head;
    lodash.identity = identity;
    lodash.includes = includes;
    lodash.indexOf = indexOf;
    lodash.inRange = inRange;
    lodash.invoke = invoke;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isArrayBuffer = isArrayBuffer;
    lodash.isArrayLike = isArrayLike;
    lodash.isArrayLikeObject = isArrayLikeObject;
    lodash.isBoolean = isBoolean;
    lodash.isBuffer = isBuffer;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isEqualWith = isEqualWith;
    lodash.isError = isError;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isInteger = isInteger;
    lodash.isLength = isLength;
    lodash.isMap = isMap;
    lodash.isMatch = isMatch;
    lodash.isMatchWith = isMatchWith;
    lodash.isNaN = isNaN;
    lodash.isNative = isNative;
    lodash.isNil = isNil;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isObjectLike = isObjectLike;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isSafeInteger = isSafeInteger;
    lodash.isSet = isSet;
    lodash.isString = isString;
    lodash.isSymbol = isSymbol;
    lodash.isTypedArray = isTypedArray;
    lodash.isUndefined = isUndefined;
    lodash.isWeakMap = isWeakMap;
    lodash.isWeakSet = isWeakSet;
    lodash.join = join;
    lodash.kebabCase = kebabCase;
    lodash.last = last;
    lodash.lastIndexOf = lastIndexOf;
    lodash.lowerCase = lowerCase;
    lodash.lowerFirst = lowerFirst;
    lodash.lt = lt;
    lodash.lte = lte;
    lodash.max = max;
    lodash.maxBy = maxBy;
    lodash.mean = mean;
    lodash.meanBy = meanBy;
    lodash.min = min;
    lodash.minBy = minBy;
    lodash.stubArray = stubArray;
    lodash.stubFalse = stubFalse;
    lodash.stubObject = stubObject;
    lodash.stubString = stubString;
    lodash.stubTrue = stubTrue;
    lodash.multiply = multiply;
    lodash.nth = nth;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.now = now;
    lodash.pad = pad;
    lodash.padEnd = padEnd;
    lodash.padStart = padStart;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.repeat = repeat;
    lodash.replace = replace;
    lodash.result = result;
    lodash.round = round;
    lodash.runInContext = runInContext;
    lodash.sample = sample;
    lodash.size = size;
    lodash.snakeCase = snakeCase;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.sortedIndexBy = sortedIndexBy;
    lodash.sortedIndexOf = sortedIndexOf;
    lodash.sortedLastIndex = sortedLastIndex;
    lodash.sortedLastIndexBy = sortedLastIndexBy;
    lodash.sortedLastIndexOf = sortedLastIndexOf;
    lodash.startCase = startCase;
    lodash.startsWith = startsWith;
    lodash.subtract = subtract;
    lodash.sum = sum;
    lodash.sumBy = sumBy;
    lodash.template = template;
    lodash.times = times;
    lodash.toFinite = toFinite;
    lodash.toInteger = toInteger;
    lodash.toLength = toLength;
    lodash.toLower = toLower;
    lodash.toNumber = toNumber;
    lodash.toSafeInteger = toSafeInteger;
    lodash.toString = toString;
    lodash.toUpper = toUpper;
    lodash.trim = trim;
    lodash.trimEnd = trimEnd;
    lodash.trimStart = trimStart;
    lodash.truncate = truncate;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;
    lodash.upperCase = upperCase;
    lodash.upperFirst = upperFirst;

    // Add aliases.
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.first = head;

    mixin(lodash, (function() {
      var source = {};
      baseForOwn(lodash, function(func, methodName) {
        if (!hasOwnProperty.call(lodash.prototype, methodName)) {
          source[methodName] = func;
        }
      });
      return source;
    }()), { 'chain': false });

    /*------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type {string}
     */
    lodash.VERSION = VERSION;

    // Assign default placeholders.
    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
      lodash[methodName].placeholder = lodash;
    });

    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
    arrayEach(['drop', 'take'], function(methodName, index) {
      LazyWrapper.prototype[methodName] = function(n) {
        n = n === undefined$1 ? 1 : nativeMax(toInteger(n), 0);

        var result = (this.__filtered__ && !index)
          ? new LazyWrapper(this)
          : this.clone();

        if (result.__filtered__) {
          result.__takeCount__ = nativeMin(n, result.__takeCount__);
        } else {
          result.__views__.push({
            'size': nativeMin(n, MAX_ARRAY_LENGTH),
            'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
          });
        }
        return result;
      };

      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
        return this.reverse()[methodName](n).reverse();
      };
    });

    // Add `LazyWrapper` methods that accept an `iteratee` value.
    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
      var type = index + 1,
          isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;

      LazyWrapper.prototype[methodName] = function(iteratee) {
        var result = this.clone();
        result.__iteratees__.push({
          'iteratee': getIteratee(iteratee, 3),
          'type': type
        });
        result.__filtered__ = result.__filtered__ || isFilter;
        return result;
      };
    });

    // Add `LazyWrapper` methods for `_.head` and `_.last`.
    arrayEach(['head', 'last'], function(methodName, index) {
      var takeName = 'take' + (index ? 'Right' : '');

      LazyWrapper.prototype[methodName] = function() {
        return this[takeName](1).value()[0];
      };
    });

    // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
    arrayEach(['initial', 'tail'], function(methodName, index) {
      var dropName = 'drop' + (index ? '' : 'Right');

      LazyWrapper.prototype[methodName] = function() {
        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
      };
    });

    LazyWrapper.prototype.compact = function() {
      return this.filter(identity);
    };

    LazyWrapper.prototype.find = function(predicate) {
      return this.filter(predicate).head();
    };

    LazyWrapper.prototype.findLast = function(predicate) {
      return this.reverse().find(predicate);
    };

    LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
      if (typeof path == 'function') {
        return new LazyWrapper(this);
      }
      return this.map(function(value) {
        return baseInvoke(value, path, args);
      });
    });

    LazyWrapper.prototype.reject = function(predicate) {
      return this.filter(negate(getIteratee(predicate)));
    };

    LazyWrapper.prototype.slice = function(start, end) {
      start = toInteger(start);

      var result = this;
      if (result.__filtered__ && (start > 0 || end < 0)) {
        return new LazyWrapper(result);
      }
      if (start < 0) {
        result = result.takeRight(-start);
      } else if (start) {
        result = result.drop(start);
      }
      if (end !== undefined$1) {
        end = toInteger(end);
        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
      }
      return result;
    };

    LazyWrapper.prototype.takeRightWhile = function(predicate) {
      return this.reverse().takeWhile(predicate).reverse();
    };

    LazyWrapper.prototype.toArray = function() {
      return this.take(MAX_ARRAY_LENGTH);
    };

    // Add `LazyWrapper` methods to `lodash.prototype`.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
          isTaker = /^(?:head|last)$/.test(methodName),
          lodashFunc = lodash[isTaker ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName],
          retUnwrapped = isTaker || /^find/.test(methodName);

      if (!lodashFunc) {
        return;
      }
      lodash.prototype[methodName] = function() {
        var value = this.__wrapped__,
            args = isTaker ? [1] : arguments,
            isLazy = value instanceof LazyWrapper,
            iteratee = args[0],
            useLazy = isLazy || isArray(value);

        var interceptor = function(value) {
          var result = lodashFunc.apply(lodash, arrayPush([value], args));
          return (isTaker && chainAll) ? result[0] : result;
        };

        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
          // Avoid lazy use if the iteratee has a "length" value other than `1`.
          isLazy = useLazy = false;
        }
        var chainAll = this.__chain__,
            isHybrid = !!this.__actions__.length,
            isUnwrapped = retUnwrapped && !chainAll,
            onlyLazy = isLazy && !isHybrid;

        if (!retUnwrapped && useLazy) {
          value = onlyLazy ? value : new LazyWrapper(this);
          var result = func.apply(value, args);
          result.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined$1 });
          return new LodashWrapper(result, chainAll);
        }
        if (isUnwrapped && onlyLazy) {
          return func.apply(this, args);
        }
        result = this.thru(interceptor);
        return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
      };
    });

    // Add `Array` methods to `lodash.prototype`.
    arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
      var func = arrayProto[methodName],
          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
          retUnwrapped = /^(?:pop|shift)$/.test(methodName);

      lodash.prototype[methodName] = function() {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
          var value = this.value();
          return func.apply(isArray(value) ? value : [], args);
        }
        return this[chainName](function(value) {
          return func.apply(isArray(value) ? value : [], args);
        });
      };
    });

    // Map minified method names to their real names.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var lodashFunc = lodash[methodName];
      if (lodashFunc) {
        var key = lodashFunc.name + '';
        if (!hasOwnProperty.call(realNames, key)) {
          realNames[key] = [];
        }
        realNames[key].push({ 'name': methodName, 'func': lodashFunc });
      }
    });

    realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
      'name': 'wrapper',
      'func': undefined$1
    }];

    // Add methods to `LazyWrapper`.
    LazyWrapper.prototype.clone = lazyClone;
    LazyWrapper.prototype.reverse = lazyReverse;
    LazyWrapper.prototype.value = lazyValue;

    // Add chain sequence methods to the `lodash` wrapper.
    lodash.prototype.at = wrapperAt;
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.commit = wrapperCommit;
    lodash.prototype.next = wrapperNext;
    lodash.prototype.plant = wrapperPlant;
    lodash.prototype.reverse = wrapperReverse;
    lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

    // Add lazy aliases.
    lodash.prototype.first = lodash.prototype.head;

    if (symIterator) {
      lodash.prototype[symIterator] = wrapperToIterator;
    }
    return lodash;
  });

  /*--------------------------------------------------------------------------*/

  // Export lodash.
  var _ = runInContext();

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (freeModule) {
    // Export for Node.js.
    (freeModule.exports = _)._ = _;
    // Export for CommonJS support.
    freeExports._ = _;
  }
  else {
    // Export to the global object.
    root._ = _;
  }
}.call(commonjsGlobal));
});

var ChangableAmountProvider = (function (props) {
  var configurationsMissAmounts = function configurationsMissAmounts(configurations) {
    return !configurations.every(function (configuration) {
      return typeof configuration.amount != 'undefined' || typeof configuration.fromAmount != 'undefined';
    });
  };

  var _useContext = useContext(ConfigurationContext),
      configuredAmount = _useContext.amount;
      _useContext.toAmount;
      var recover = _useContext.recover;

  var _useState = useState(recover == undefined ? configurationsMissAmounts(props.accept) : false),
      _useState2 = _slicedToArray(_useState, 2),
      amountsMissing = _useState2[0],
      setAmountsMissing = _useState2[1];

  var _useContext2 = useContext(WalletContext),
      account = _useContext2.account;

  var _useContext3 = useContext(ConversionRateContext),
      conversionRate = _useContext3.conversionRate,
      fixedCurrencyConversionRate = _useContext3.fixedCurrencyConversionRate;

  var _useContext4 = useContext(ErrorContext),
      setError = _useContext4.setError;

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      acceptWithAmount = _useState4[0],
      setAcceptWithAmount = _useState4[1];

  var _useState5 = useState(_typeof(configuredAmount) == 'object' && configuredAmount.fix && configuredAmount.currency ? configuredAmount.fix : null),
      _useState6 = _slicedToArray(_useState5, 1),
      fixedAmount = _useState6[0];

  var _useState7 = useState(_typeof(configuredAmount) == 'object' && configuredAmount.fix && configuredAmount.currency ? configuredAmount.currency : null),
      _useState8 = _slicedToArray(_useState7, 1),
      fixedCurrency = _useState8[0];

  var startAmount;

  if (amountsMissing) {
    if (_typeof(configuredAmount) == "object" && configuredAmount.start && configuredAmount.start) {
      startAmount = configuredAmount.start;
    } else if (_typeof(configuredAmount) == "object" && configuredAmount.fix) {
      startAmount = configuredAmount.fix;
    } else {
      startAmount = 1;
    }
  }

  var _useState9 = useState(startAmount),
      _useState10 = _slicedToArray(_useState9, 2),
      amount = _useState10[0],
      setAmount = _useState10[1];

  var _useState11 = useState(),
      _useState12 = _slicedToArray(_useState11, 2),
      maxRoute = _useState12[0],
      setMaxRoute = _useState12[1];

  var _useState13 = useState(),
      _useState14 = _slicedToArray(_useState13, 2),
      maxAmount = _useState14[0],
      setMaxAmount = _useState14[1];

  useEffect(function () {
    if (recover) {
      return;
    }

    setAmountsMissing(configurationsMissAmounts(props.accept));
  }, [props.accept, recover]);

  var getAmounts = function getAmounts(_ref) {
    var amount = _ref.amount,
        conversionRate = _ref.conversionRate,
        fixedCurrencyConversionRate = _ref.fixedCurrencyConversionRate;
    return new Promise(function (resolve, reject) {
      if (configuredAmount && configuredAmount.token) {
        resolve(props.accept.map(function () {
          return amount;
        }));
      } else {
        Promise.all(props.accept.map(function (configuration) {
          if (fixedAmount) {
            if (Blockchains[configuration.blockchain].stables.usd[0] == configuration.token) {
              return 1.00 / fixedCurrencyConversionRate * fixedAmount;
            } else {
              return route$1({
                blockchain: configuration.blockchain,
                tokenIn: Blockchains[configuration.blockchain].stables.usd[0],
                amountIn: 1.00 / fixedCurrencyConversionRate * fixedAmount,
                tokenOut: configuration.token,
                fromAddress: account,
                toAddress: account
              });
            }
          } else {
            if (Blockchains[configuration.blockchain].stables.usd[0] == configuration.token) {
              return 1.00 / conversionRate * amount;
            } else {
              return route$1({
                blockchain: configuration.blockchain,
                tokenIn: Blockchains[configuration.blockchain].stables.usd[0],
                amountIn: 1.00 / conversionRate * amount,
                tokenOut: configuration.token,
                fromAddress: account,
                toAddress: account
              });
            }
          }
        })).then(function (results) {
          Promise.all(results.map(function (result, index) {
            if (typeof result == 'number') {
              return result;
            } else if (result[0] == undefined) {
              return;
            } else {
              return Token.readable({
                blockchain: props.accept[index].blockchain,
                amount: result[0].amountOut,
                address: result[0].tokenOut
              });
            }
          })).then(resolve)["catch"](setError);
        })["catch"](setError);
      }
    });
  };

  var updateAmounts = useCallback(lodash.debounce(function (_ref2) {
    var account = _ref2.account,
        amount = _ref2.amount,
        conversionRate = _ref2.conversionRate,
        fixedCurrencyConversionRate = _ref2.fixedCurrencyConversionRate;
    getAmounts({
      amount: amount,
      conversionRate: conversionRate,
      fixedCurrencyConversionRate: fixedCurrencyConversionRate
    }).then(function (amounts) {
      setAcceptWithAmount(props.accept.map(function (configuration, index) {
        if (amounts[index] == undefined) {
          return;
        }

        return {
          blockchain: configuration.blockchain,
          amount: round(amounts[index]),
          token: configuration.token,
          receiver: configuration.receiver || account
        };
      }).filter(function (configuration) {
        return !!configuration;
      }));
    })["catch"](setError);
  }, 500), []);
  useEffect(function () {
    if (recover) {
      return;
    }

    if (amountsMissing && account && conversionRate && (fixedAmount ? fixedCurrencyConversionRate : true)) {
      updateAmounts({
        account: account,
        amount: amount,
        conversionRate: conversionRate,
        fixedCurrencyConversionRate: fixedCurrencyConversionRate
      });
    }
  }, [amountsMissing, account, conversionRate, fixedAmount, fixedCurrencyConversionRate, amount, recover]);
  useEffect(function () {
    if (amountsMissing && maxRoute) {
      maxRoute.fromToken.readable(maxRoute.fromBalance).then(function (readableMaxAmount) {
        if (configuredAmount && configuredAmount.token) {
          route$1({
            blockchain: maxRoute.blockchain,
            tokenIn: maxRoute.fromToken.address,
            tokenOut: maxRoute.toToken.address,
            amountIn: parseFloat(readableMaxAmount),
            fromAddress: account,
            toAddress: account
          }).then(function (routes) {
            if (routes[0] == undefined) {
              Token.readable({
                amount: maxRoute.fromBalance,
                blockchain: maxRoute.blockchain,
                address: maxRoute.fromToken.address
              }).then(setMaxAmount);
              return;
            }

            Token.readable({
              amount: routes[0].amountOut,
              blockchain: maxRoute.blockchain,
              address: maxRoute.toToken.address
            }).then(function (readableMaxAmount) {
              var slippage = 1.01;
              var maxAmount = parseFloat(new Decimal(readableMaxAmount).div(slippage).mul(conversionRate).toString());
              setMaxAmount(maxAmount > 10 ? Math.round(maxAmount - 1) : round(maxAmount - 1));
            })["catch"](setError);
          })["catch"](setError);
        } else if (maxRoute.fromToken.address == Blockchains[maxRoute.blockchain].stables.usd[0]) {
          var _maxAmount = parseFloat(new Decimal(readableMaxAmount).mul(conversionRate).toString());

          setMaxAmount(_maxAmount > 10 ? Math.round(_maxAmount - 1) : _maxAmount - 1);
        } else {
          route$1({
            blockchain: maxRoute.blockchain,
            tokenIn: maxRoute.fromToken.address,
            tokenOut: Blockchains[maxRoute.blockchain].stables.usd[0],
            amountIn: parseFloat(readableMaxAmount),
            fromAddress: account,
            toAddress: account
          }).then(function (routes) {
            if (routes[0] == undefined) {
              return;
            }

            Token.readable({
              amount: routes[0].amountOut,
              blockchain: maxRoute.blockchain,
              address: Blockchains[maxRoute.blockchain].stables.usd[0]
            }).then(function (readableMaxAmount) {
              var slippage = 1.01;
              var maxAmount = parseFloat(new Decimal(readableMaxAmount).div(slippage).mul(conversionRate).toString());
              setMaxAmount(maxAmount > 10 ? Math.round(maxAmount) : round(maxAmount));
            })["catch"](setError);
          })["catch"](setError);
        }
      })["catch"](setError);
    } else {
      setMaxAmount(100);
    }
  }, [account, maxRoute]);
  return /*#__PURE__*/React.createElement(ChangableAmountContext.Provider, {
    value: {
      amountsMissing: amountsMissing,
      fixedAmount: fixedAmount,
      fixedCurrency: fixedCurrency,
      acceptWithAmount: acceptWithAmount,
      amount: amount,
      setAmount: setAmount,
      setMaxRoute: setMaxRoute,
      maxAmount: maxAmount
    }
  }, props.children);
});

var ConversionRateProvider = (function (props) {
  var _useContext = useContext(ErrorContext);
      _useContext.setError;

  var _useContext2 = useContext(ConfigurationContext),
      amount = _useContext2.amount,
      currency = _useContext2.currency;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      conversionRate = _useState2[0],
      setConversionRate = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      fixedCurrencyConversionRate = _useState4[0],
      setFixedCurrencyConversionRate = _useState4[1];

  useEffect(function () {
    if (_typeof(amount) == 'object' && amount.currency) {
      Currency.fromUSD({
        amount: 1,
        code: amount.currency
      }).then(function (conversion) {
        return setFixedCurrencyConversionRate(conversion.amount);
      });
    }

    Currency.fromUSD({
      amount: 1,
      code: currency
    }).then(function (conversion) {
      return setConversionRate(conversion.amount);
    })["catch"](setConversionRate(1));
  }, []);
  return /*#__PURE__*/React.createElement(ConversionRateContext.Provider, {
    value: {
      conversionRate: conversionRate,
      fixedCurrencyConversionRate: fixedCurrencyConversionRate
    }
  }, props.children);
});

var SUPPORTED_CURRENCIES = ["all", "xcd", "eur", "bbd", "btn", "bnd", "xaf", "cup", "usd", "fkp", "gip", "huf", "irr", "jmd", "aud", "lak", "lyd", "mkd", "xof", "nzd", "omr", "pgk", "rwf", "wst", "rsd", "sek", "tzs", "amd", "bsd", "bam", "cve", "cny", "crc", "czk", "ern", "gel", "htg", "inr", "jod", "krw", "lbp", "mwk", "mru", "mzn", "ang", "pen", "qar", "std", "sll", "sos", "sdg", "syp", "aoa", "awg", "bhd", "bzd", "bwp", "bif", "kyd", "cop", "dkk", "gtq", "hnl", "idr", "ils", "kzt", "kwd", "lsl", "myr", "mur", "mnt", "mmk", "ngn", "pab", "php", "ron", "sar", "sgd", "zar", "srd", "twd", "top", "vef", "dzd", "ars", "azn", "bob", "bgn", "cad", "clp", "cdf", "dop", "fjd", "gmd", "gyd", "isk", "iqd", "jpy", "kpw", "chf", "mga", "mdl", "mad", "npr", "nio", "pkr", "pyg", "shp", "scr", "sbd", "lkr", "thb", "try", "aed", "vuv", "yer", "afn", "bdt", "brl", "khr", "kmf", "hrk", "djf", "egp", "etb", "xpf", "ghs", "gnf", "hkd", "xdr", "kes", "kgs", "lrd", "mop", "mvr", "mxn", "nad", "nok", "pln", "rub", "szl", "tjs", "ttd", "ugx", "uyu", "vnd", "tnd", "uah", "uzs", "tmt", "gbp", "zmw", "byn", "bmd", "ggp", "clf", "cuc", "imp", "jep", "svc", "xag", "zwl"];

var PaymentAmountRoutingContext = /*#__PURE__*/React.createContext();

var PaymentRoutingContext = /*#__PURE__*/React.createContext();

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var PaymentRoutingProvider = (function (props) {
  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      allRoutes = _useState2[0],
      setAllRoutes = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      updatedRouteWithNewPrice = _useState4[0],
      setUpdatedRouteWithNewPrice = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedRoute = _useState6[0],
      setSelectedRoute = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      slowRouting = _useState8[0],
      setSlowRouting = _useState8[1];

  var _useState9 = useState(0),
      _useState10 = _slicedToArray(_useState9, 2),
      reloadCount = _useState10[0],
      setReloadCount = _useState10[1];

  var _useContext = useContext(WalletContext),
      account = _useContext.account;

  var _useContext2 = useContext(UpdatableContext),
      updatable = _useContext2.updatable;

  var _useContext3 = useContext(ConfigurationContext),
      recover = _useContext3.recover;

  var onRoutesUpdate = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(routes) {
      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (routes.length == 0) {
                setAllRoutes([]);

                if (props.setMaxRoute) {
                  props.setMaxRoute(null);
                }
              } else {
                roundAmounts(routes).then( /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(roundedRoutes) {
                    var selectRoute, updatedSelectedRoute;
                    return regenerator.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (typeof selectedRoute == 'undefined') {
                              selectRoute = roundedRoutes[0];
                              setSelectedRoute(selectRoute);
                            } else {
                              updatedSelectedRoute = roundedRoutes[roundedRoutes.findIndex(function (route) {
                                return route.fromToken.address == selectedRoute.fromToken.address && route.blockchain == selectedRoute.blockchain;
                              })];

                              if (updatedSelectedRoute) {
                                if (selectedRoute.fromAmount != updatedSelectedRoute.fromAmount) {
                                  setUpdatedRouteWithNewPrice(updatedSelectedRoute);
                                } else if ( // other reasons but price to update selected route
                                selectedRoute.approvalRequired != updatedSelectedRoute.approvalRequired) {
                                  setSelectedRoute(updatedSelectedRoute);
                                }
                              } else {
                                setSelectedRoute(roundedRoutes[0]);
                              }
                            }

                            setAllRoutes(roundedRoutes);

                            if (props.setMaxRoute) {
                              props.setMaxRoute(findMaxRoute(roundedRoutes));
                            }

                          case 3:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref2.apply(this, arguments);
                  };
                }());
              }

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function onRoutesUpdate(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var getPaymentRoutes = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(_ref3) {
      var updatable, slowRoutingTimeout;
      return regenerator.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              updatable = _ref3.updatable;

              if (!(updatable == false || !props.accept || !account)) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return");

            case 3:
              slowRoutingTimeout = setTimeout(function () {
                setSlowRouting(true);
              }, 4000);
              _context3.next = 6;
              return routePayments(Object.assign({}, props, {
                account: account
              })).then(function (routes) {
                clearInterval(slowRoutingTimeout);
                onRoutesUpdate(routes);
              });

            case 6:
              return _context3.abrupt("return", _context3.sent);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function getPaymentRoutes(_x3) {
      return _ref4.apply(this, arguments);
    };
  }();

  var updateRouteAmount = function updateRouteAmount(route, amountBN) {
    route.fromAmount = amountBN.toString();
    route.transaction.params.amounts[0] = amountBN.toString();

    if (route.transaction.value && route.transaction.value.toString() != '0') {
      route.transaction.value = amountBN.toString();
    }
  };

  var roundAmount = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(route, amountBN) {
      var readableAmount, roundedAmountBN;
      return regenerator.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!route.directTransfer) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", route);

            case 2:
              _context4.next = 4;
              return route.fromToken.readable(amountBN || route.transaction.params.amounts[0]);

            case 4:
              readableAmount = _context4.sent;
              _context4.next = 7;
              return route.fromToken.BigNumber(round(readableAmount));

            case 7:
              roundedAmountBN = _context4.sent;
              updateRouteAmount(route, roundedAmountBN);
              return _context4.abrupt("return", route);

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function roundAmount(_x4, _x5) {
      return _ref5.apply(this, arguments);
    };
  }();

  var roundAmounts = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(routes) {
      return regenerator.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", Promise.all(routes.map(function (route) {
                return roundAmount(route);
              })));

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function roundAmounts(_x6) {
      return _ref6.apply(this, arguments);
    };
  }();

  var updateRouteWithNewPrice = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6() {
      return regenerator.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              setSelectedRoute(_objectSpread$2({}, updatedRouteWithNewPrice));
              setUpdatedRouteWithNewPrice(null);

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function updateRouteWithNewPrice() {
      return _ref7.apply(this, arguments);
    };
  }();

  var refreshPaymentRoutes = function refreshPaymentRoutes() {
    return getPaymentRoutes({
      allRoutes: allRoutes,
      selectedRoute: selectedRoute,
      updatable: updatable
    });
  };

  useEffect(function () {
    var timeout = setTimeout(function () {
      setReloadCount(reloadCount + 1);
      getPaymentRoutes({
        allRoutes: allRoutes,
        selectedRoute: selectedRoute,
        updatable: updatable
      });
    }, 15000);
    return function () {
      return clearTimeout(timeout);
    };
  }, [reloadCount, allRoutes, selectedRoute, updatable]);
  useEffect(function () {
    if (account && props.accept && recover == undefined) {
      getPaymentRoutes({});
    }
  }, [account, props.accept]);
  return /*#__PURE__*/React.createElement(PaymentRoutingContext.Provider, {
    value: {
      selectedRoute: selectedRoute,
      setSelectedRoute: setSelectedRoute,
      refreshPaymentRoutes: refreshPaymentRoutes,
      allRoutes: allRoutes,
      setAllRoutes: setAllRoutes,
      slowRouting: slowRouting,
      updatedRouteWithNewPrice: updatedRouteWithNewPrice,
      updateRouteWithNewPrice: updateRouteWithNewPrice
    }
  }, props.children);
});

var PaymentAmountRoutingProvider = (function (props) {
  var _useContext = useContext(ChangableAmountContext),
      amountsMissing = _useContext.amountsMissing,
      acceptWithAmount = _useContext.acceptWithAmount,
      setMaxRoute = _useContext.setMaxRoute;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      accept = _useState2[0],
      setAccept = _useState2[1];

  useEffect(function () {
    if (amountsMissing) {
      if (acceptWithAmount) {
        setAccept(acceptWithAmount);
      }
    } else {
      setAccept(props.accept);
    }
  }, [amountsMissing, acceptWithAmount]);
  return /*#__PURE__*/React.createElement(PaymentAmountRoutingContext.Provider, {
    value: {}
  }, /*#__PURE__*/React.createElement(PaymentRoutingProvider, {
    accept: accept,
    whitelist: props.whitelist,
    blacklist: props.blacklist,
    event: props.event,
    setMaxRoute: setMaxRoute,
    fee: props.fee
  }, props.children));
});

var NoPaymentMethodFoundDialog = (function () {
  var _useContext = useContext(ClosableContext),
      close = _useContext.close;

  return /*#__PURE__*/React.createElement(Dialog$1, {
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM"
    }),
    body: /*#__PURE__*/React.createElement("div", {
      className: "TextCenter"
    }, /*#__PURE__*/React.createElement("div", {
      className: "GraphicWrapper"
    }, /*#__PURE__*/React.createElement("img", {
      className: "Graphic",
      src: QuestionsGraphic
    })), /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL Text FontSizeL PaddingTopS FontWeightBold"
    }, "Insufficient Balance"), /*#__PURE__*/React.createElement("div", {
      className: "Text PaddingTopS PaddingBottomM PaddingLeftM PaddingRightM"
    }, /*#__PURE__*/React.createElement("strong", {
      className: "FontSizeM"
    }, "We were not able to find any asset with enough value in your wallet. Please top up your account in order to proceed with this payment."))),
    footer: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingRightM PaddingLeftM PaddingBottomM"
    }, /*#__PURE__*/React.createElement("button", {
      className: "ButtonPrimary",
      onClick: close
    }, "Ok"))
  });
});

var PaymentContext = /*#__PURE__*/React.createContext();

var PaymentTrackingContext = /*#__PURE__*/React.createContext();

var TransactionTrackingContext = /*#__PURE__*/React.createContext();

var PaymentProvider = (function (props) {
  var _useContext = useContext(ErrorContext),
      setError = _useContext.setError;

  var _useContext2 = useContext(ConfigurationContext),
      _sent = _useContext2.sent,
      succeeded = _useContext2.succeeded,
      failed = _useContext2.failed,
      recover = _useContext2.recover,
      before = _useContext2.before;

  var _useContext3 = useContext(PaymentRoutingContext),
      selectedRoute = _useContext3.selectedRoute,
      refreshPaymentRoutes = _useContext3.refreshPaymentRoutes;

  var _useContext4 = useContext(ClosableContext),
      open = _useContext4.open,
      close = _useContext4.close,
      setClosable = _useContext4.setClosable;

  var _useContext5 = useContext(PaymentRoutingContext),
      allRoutes = _useContext5.allRoutes;

  var _useContext6 = useContext(UpdatableContext),
      setUpdatable = _useContext6.setUpdatable;

  var _useContext7 = useContext(NavigateContext),
      navigate = _useContext7.navigate,
      set = _useContext7.set;

  var _useContext8 = useContext(WalletContext),
      wallet = _useContext8.wallet;

  var _useContext9 = useContext(PaymentTrackingContext),
      release = _useContext9.release,
      synchronousTracking = _useContext9.synchronousTracking,
      asynchronousTracking = _useContext9.asynchronousTracking,
      trackingInitialized = _useContext9.trackingInitialized,
      initializePaymentTracking = _useContext9.initializeTracking,
      preTrack = _useContext9.preTrack;

  var _useContext10 = useContext(TransactionTrackingContext),
      foundTransaction = _useContext10.foundTransaction,
      initializeTransactionTracking = _useContext10.initializeTracking;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      payment = _useState2[0],
      setPayment = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      transaction = _useState4[0],
      setTransaction = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      approvalTransaction = _useState6[0],
      setApprovalTransaction = _useState6[1];

  var _useState7 = useState('initialized'),
      _useState8 = _slicedToArray(_useState7, 2),
      paymentState = _useState8[0],
      setPaymentState = _useState8[1];

  var paymentSucceeded = function paymentSucceeded(transaction) {
    if (synchronousTracking == false && (asynchronousTracking == false || trackingInitialized == true)) {
      setClosable(true);
    }

    setPaymentState('success');

    if (succeeded) {
      setTimeout(function () {
        return succeeded(transaction);
      }, 200);
    }
  };

  var paymentFailed = function paymentFailed(transaction, error) {
    if (asynchronousTracking == false || trackingInitialized == true) {
      setClosable(true);
    }

    set(['PaymentFailed']);
    setPaymentState('failed');

    if (failed) {
      failed(transaction, error);
    }
  };

  var pay = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      var stop, currentBlock;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!before) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return before(payment.route.transaction);

            case 3:
              stop = _context.sent;

              if (!(stop === false)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return");

            case 6:
              setClosable(false);
              setPaymentState('paying');
              setUpdatable(false);
              _context.next = 11;
              return request({
                blockchain: payment.route.transaction.blockchain,
                method: 'latestBlockNumber'
              });

            case 11:
              currentBlock = _context.sent;
              _context.next = 14;
              return preTrack(currentBlock, payment.route).then(function () {
                wallet.sendTransaction(Object.assign({}, payment.route.transaction, {
                  sent: function sent(transaction) {
                    initializeTransactionTracking(transaction, currentBlock);

                    if (_sent) {
                      _sent(transaction);
                    }
                  },
                  succeeded: paymentSucceeded,
                  failed: paymentFailed
                })).then(function (sentTransaction) {
                  setTransaction(sentTransaction);
                  initializePaymentTracking(sentTransaction, currentBlock, payment.route);
                })["catch"](function (error) {
                  console.log('error', error);
                  setPaymentState('initialized');
                  setClosable(true);
                  setUpdatable(true);

                  if ((error === null || error === void 0 ? void 0 : error.code) == 'WRONG_NETWORK' || (error === null || error === void 0 ? void 0 : error.code) == 'NOT_SUPPORTED') {
                    navigate('WrongNetwork');
                  }
                });
              })["catch"](function (e) {
                console.log(e);
                setPaymentState('initialized');
                setClosable(true);
                setUpdatable(true);
                navigate('PreTrackingFailed');
              });

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function pay() {
      return _ref.apply(this, arguments);
    };
  }();

  var approve = function approve() {
    setClosable(false);
    setUpdatable(false);
    setPaymentState('approving');
    wallet.sendTransaction(Object.assign({}, payment.route.approvalTransaction, {
      succeeded: function succeeded() {
        setUpdatable(true);
        setClosable(true);
        refreshPaymentRoutes().then(function () {
          setPaymentState('initialized');
        });
      }
    })).then(function (sentTransaction) {
      setApprovalTransaction(sentTransaction);
    })["catch"](function (error) {
      console.log('error', error);

      if ((error === null || error === void 0 ? void 0 : error.code) == 'WRONG_NETWORK' || (error === null || error === void 0 ? void 0 : error.code) == 'NOT_SUPPORTED') {
        navigate('WrongNetwork');
      }

      setPaymentState('initialized');
      setClosable(true);
    });
  };

  useEffect(function () {
    if (release) {
      setPaymentState('success');
    }
  }, [release]);
  useEffect(function () {
    if (asynchronousTracking && trackingInitialized && (paymentState == 'success' || paymentState == 'failed')) {
      setClosable(true);
    }
  }, [trackingInitialized, paymentState]);
  useEffect(function () {
    if (recover) {
      setClosable(false);
      setUpdatable(false);
      setPaymentState('paying');
      setTransaction({
        blockchain: recover.blockchain,
        id: recover.transaction,
        url: Blockchains.findByName(recover.blockchain).explorerUrlFor({
          transaction: {
            id: recover.transaction
          }
        })
      });
      var paymentToken = new Token({
        blockchain: recover.blockchain,
        address: recover.token
      });
      Promise.all([paymentToken.name(), paymentToken.symbol()]).then(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            name = _ref3[0],
            symbol = _ref3[1];

        setPayment({
          blockchain: recover.blockchain,
          token: recover.token,
          name: name,
          symbol: symbol.toUpperCase(),
          amount: recover.amount
        });
      })["catch"](setError);
    }
  }, [recover]);
  useEffect(function () {
    if (foundTransaction && foundTransaction.id && foundTransaction.status) {
      var newTransaction;

      if (foundTransaction.id != transaction.id) {
        newTransaction = Object.assign({}, transaction, {
          id: foundTransaction.id,
          url: Blockchains.findByName(transaction.blockchain).explorerUrlFor({
            transaction: foundTransaction
          })
        });
        setTransaction(newTransaction);
      }

      if (foundTransaction.status == 'success') {
        paymentSucceeded(newTransaction || transaction);
      } else if (foundTransaction.status == 'failed') {
        paymentFailed(newTransaction || transaction);
      }
    }
  }, [foundTransaction, transaction]);
  useEffect(function () {
    if (selectedRoute) {
      var fromToken = selectedRoute.fromToken;
      Promise.all([fromToken.name(), fromToken.symbol(), fromToken.readable(selectedRoute.fromAmount)]).then(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 3),
            name = _ref5[0],
            symbol = _ref5[1],
            amount = _ref5[2];

        setPayment({
          blockchain: selectedRoute.blockchain,
          route: selectedRoute,
          token: fromToken.address,
          name: name,
          symbol: symbol.toUpperCase(),
          amount: amount
        });
      })["catch"](setError);
    } else {
      setPayment(undefined);
    }
  }, [selectedRoute]);
  useEffect(function () {
    if (allRoutes && allRoutes.length == 0) {
      setUpdatable(false);
    } else if (allRoutes && allRoutes.length > 0) {
      setUpdatable(true);
    }
  }, [allRoutes]);

  if (allRoutes instanceof Array && allRoutes.length == 0) {
    return /*#__PURE__*/React.createElement(ReactDialogStack, {
      open: open,
      close: close,
      start: "NoPaymentMethodFound",
      container: props.container,
      document: props.document,
      dialogs: {
        NoPaymentMethodFound: /*#__PURE__*/React.createElement(NoPaymentMethodFoundDialog, null)
      }
    });
  } else {
    return /*#__PURE__*/React.createElement(PaymentContext.Provider, {
      value: {
        payment: payment,
        paymentState: paymentState,
        pay: pay,
        transaction: transaction,
        approve: approve,
        approvalTransaction: approvalTransaction
      }
    }, props.children);
  }
});

var format = (function (input) {
  var _float = round(input);

  var floatToString = _float.toString();

  if (new RegExp(/\./).test(floatToString)) {
    var exploded = floatToString.split('.');
    return new Intl.NumberFormat().format(parseInt(exploded[0])) + '.' + exploded[1];
  } else {
    return new Intl.NumberFormat().format(_float);
  }
});

var PaymentValueContext = /*#__PURE__*/React.createContext();

var ChangeAmountDialog = (function (props) {
  var _useContext = useContext(NavigateStackContext),
      navigate = _useContext.navigate;

  var _useContext2 = useContext(ErrorContext);
      _useContext2.setError;

  var _useContext3 = useContext(WalletContext);
      _useContext3.account;

  var _useContext4 = useContext(ChangableAmountContext),
      amount = _useContext4.amount,
      setAmount = _useContext4.setAmount,
      maxAmount = _useContext4.maxAmount;

  var _useContext5 = useContext(PaymentValueContext);
      _useContext5.displayedPaymentValue;

  var _useState = useState(amount),
      _useState2 = _slicedToArray(_useState, 2),
      inputAmount = _useState2[0],
      setInputAmount = _useState2[1];

  var _useContext6 = useContext(ConfigurationContext),
      currencyCode = _useContext6.currencyCode,
      amountConfiguration = _useContext6.amount;

  var _useContext7 = useContext(PaymentRoutingContext);
      _useContext7.allRoutes;
      var setSelectedRoute = _useContext7.setSelectedRoute;

  var min = _typeof(amountConfiguration) == "object" && amountConfiguration.min ? amountConfiguration.min : 1;
  var step = _typeof(amountConfiguration) == "object" && amountConfiguration.step ? amountConfiguration.step : 1;
  var displayedCurrencyCode = amountConfiguration != undefined && amountConfiguration.token ? null : currencyCode;

  var changeAmountAndGoBack = function changeAmountAndGoBack() {
    var newAmount = toValidValue(parseFloat(inputAmount));

    if (newAmount != amount) {
      setSelectedRoute(undefined);
      setAmount(newAmount);
    }

    navigate('back');
  };

  var changeAmount = function changeAmount(value) {
    if (Number.isNaN(value)) {
      return;
    }

    setInputAmount(value);
  };

  var toValidStep = function toValidStep(value) {
    if (step) {
      value = parseFloat(new Decimal(Math.floor(new Decimal(value).div(step))).mul(step).toString());
    }

    return value;
  };

  var toValidValue = function toValidValue(value) {
    value = toValidStep(value);

    if (maxAmount) {
      value = Math.max(min, Math.min(value, maxAmount));
    }

    value = toValidStep(value);
    return value;
  };

  var setValidValue = function setValidValue(value) {
    setInputAmount(toValidValue(value));
  };

  return /*#__PURE__*/React.createElement(Dialog$1, {
    stacked: true,
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM PaddingBottomS"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL FontSizeL TextCenter"
    }, "Change Amount"), /*#__PURE__*/React.createElement("div", {
      className: "FontSizeL TextCenter FontWeightBold"
    }, /*#__PURE__*/React.createElement("strong", null, displayedCurrencyCode))),
    body: /*#__PURE__*/React.createElement("div", {
      className: "MaxHeight PaddingTopXS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "PaddingLeftM PaddingRightM"
    }, /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS TextCenter PaddingBottomL"
    }, /*#__PURE__*/React.createElement("div", {
      className: "PaddingBottomM"
    }, /*#__PURE__*/React.createElement("input", {
      max: maxAmount ? parseFloat(maxAmount) : null,
      min: min,
      step: step,
      className: "Input FontSizeXXL TextAlignCenter",
      type: "number",
      name: "amount",
      value: parseFloat(inputAmount),
      onChange: function onChange(event) {
        changeAmount(event.target.value);
      },
      onBlur: function onBlur(event) {
        setValidValue(event.target.value);
      }
    })), maxAmount && /*#__PURE__*/React.createElement("div", {
      style: {
        height: '40px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "FontSizeS"
    }, format(toValidStep(maxAmount)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      className: "TextButton",
      onClick: function onClick() {
        changeAmount(toValidValue(maxAmount));
      }
    }, "(Max)"))))))),
    footer: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingRightM PaddingLeftM PaddingBottomM"
    }, /*#__PURE__*/React.createElement("button", {
      className: "ButtonPrimary",
      onClick: changeAmountAndGoBack
    }, "Done"))
  });
});

var ChangePaymentSkeleton = (function (props) {
  var _useContext = useContext(PaymentValueContext),
      paymentValue = _useContext.paymentValue;

  return /*#__PURE__*/React.createElement(Dialog$1, {
    stacked: true,
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM PaddingBottomS"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL FontSizeL TextCenter"
    }, "Change Payment"), paymentValue != undefined && /*#__PURE__*/React.createElement("div", {
      className: "FontSizeL TextCenter FontWeightBold"
    }, /*#__PURE__*/React.createElement("strong", null, paymentValue.toString()))),
    body: /*#__PURE__*/React.createElement("div", {
      className: "MaxHeight PaddingTopXS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "PaddingLeftM PaddingRightM"
    }, /*#__PURE__*/React.createElement("div", {
      className: "Card Skeleton"
    }, /*#__PURE__*/React.createElement("div", {
      className: "SkeletonBackground"
    })), /*#__PURE__*/React.createElement("div", {
      className: "Card Skeleton"
    }, /*#__PURE__*/React.createElement("div", {
      className: "SkeletonBackground"
    })), /*#__PURE__*/React.createElement("div", {
      className: "Card Skeleton"
    }, /*#__PURE__*/React.createElement("div", {
      className: "SkeletonBackground"
    }))))
  });
});

var ChangePaymentDialog = (function (props) {
  var _useContext = useContext(ErrorContext),
      setError = _useContext.setError;

  var _useContext2 = useContext(PaymentRoutingContext),
      allRoutes = _useContext2.allRoutes,
      setSelectedRoute = _useContext2.setSelectedRoute;

  var _useContext3 = useContext(PaymentValueContext);
      _useContext3.paymentValue;
      var displayedPaymentValue = _useContext3.displayedPaymentValue;

  var _useContext4 = useContext(NavigateStackContext),
      navigate = _useContext4.navigate;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      allPaymentRoutesWithData = _useState2[0],
      setAllPaymentRoutesWithData = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      cards = _useState4[0],
      setCards = _useState4[1];

  useEffect(function () {
    if (allRoutes == undefined) {
      return;
    }

    Promise.all(allRoutes.map(function (route) {
      route.exchangeRoutes[0];
      route.fromToken;
      return Promise.all([route.fromToken.name(), route.fromToken.symbol(), route.fromToken.decimals(), route.fromToken.readable(route.fromAmount)]);
    })).then(function (allPaymentRoutesWithData) {
      setAllPaymentRoutesWithData(allRoutes.map(function (route, index) {
        return {
          name: allPaymentRoutesWithData[index][0],
          symbol: allPaymentRoutesWithData[index][1].toUpperCase(),
          decimals: allPaymentRoutesWithData[index][2],
          amount: allPaymentRoutesWithData[index][3],
          route: route
        };
      }));
    })["catch"](setError);
  }, [allRoutes]);
  useEffect(function () {
    setCards(allPaymentRoutesWithData.map(function (payment, index) {
      var blockchain = Blockchains.findByName(payment.route.blockchain);
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: "Card",
        title: "Select ".concat(payment.symbol, " as payment"),
        onClick: function onClick() {
          setSelectedRoute(payment.route);
          navigate('back');
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardImage"
      }, /*#__PURE__*/React.createElement(TokenImage, {
        blockchain: payment.route.blockchain,
        address: payment.route.fromToken.address
      }), /*#__PURE__*/React.createElement("img", {
        className: "BlockchainLogo small",
        src: blockchain.logo,
        alt: blockchain.label,
        title: blockchain.label
      })), /*#__PURE__*/React.createElement("div", {
        className: "CardBody"
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardBodyWrapper"
      }, /*#__PURE__*/React.createElement("h2", {
        className: "CardText"
      }, /*#__PURE__*/React.createElement("div", {
        className: "TokenAmountRow"
      }, /*#__PURE__*/React.createElement("span", {
        className: "TokenSymbolCell"
      }, payment.symbol), /*#__PURE__*/React.createElement("span", null, "\xA0"), /*#__PURE__*/React.createElement("span", {
        className: "TokenAmountCell"
      }, format(payment.amount)))), /*#__PURE__*/React.createElement("h3", {
        className: "CardText small"
      }, /*#__PURE__*/React.createElement("small", null, format(round(parseFloat(payment.route.fromBalance.toString()) / Math.pow(10, payment.decimals), 'down')))))));
    }));
  }, [allPaymentRoutesWithData]);

  if (allPaymentRoutesWithData.length == 0 || cards.length == 0) {
    return /*#__PURE__*/React.createElement(ChangePaymentSkeleton, null);
  }

  return /*#__PURE__*/React.createElement(Dialog$1, {
    stacked: true,
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM PaddingBottomS"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL FontSizeL TextCenter"
    }, "Change Payment"), displayedPaymentValue != undefined && /*#__PURE__*/React.createElement("div", {
      className: "FontSizeL TextCenter FontWeightBold"
    }, /*#__PURE__*/React.createElement("strong", null, displayedPaymentValue.toString()))),
    body: /*#__PURE__*/React.createElement("div", {
      className: "MaxHeight PaddingTopXS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "PaddingLeftM PaddingRightM"
    }, cards)),
    footer: /*#__PURE__*/React.createElement("div", null)
  });
});

var PaymentFailedDialog = (function () {
  var _useContext = useContext(ClosableContext),
      close = _useContext.close;

  var _useContext2 = useContext(PaymentContext),
      transaction = _useContext2.transaction;

  return /*#__PURE__*/React.createElement(Dialog$1, {
    stacked: false,
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM"
    }),
    body: /*#__PURE__*/React.createElement("div", {
      className: "TextCenter"
    }, /*#__PURE__*/React.createElement("div", {
      className: "GraphicWrapper"
    }, /*#__PURE__*/React.createElement("img", {
      className: "Graphic",
      src: ErrorGraphic
    })), /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL Text FontSizeL PaddingTopS FontWeightBold"
    }, "Payment Failed"), /*#__PURE__*/React.createElement("div", {
      className: "Text PaddingTopS PaddingBottomS PaddingLeftS PaddingRightS"
    }, /*#__PURE__*/React.createElement("strong", {
      className: "FontSizeM"
    }, "Unfortunately executing your payment failed, but you can try again."), transaction && /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS"
    }, /*#__PURE__*/React.createElement("a", {
      className: "Link",
      title: "Check your transaction on a block explorer",
      href: transaction === null || transaction === void 0 ? void 0 : transaction.url,
      target: "_blank",
      rel: "noopener noreferrer"
    }, "View on explorer")))),
    footer: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingRightM PaddingLeftM PaddingBottomM"
    }, /*#__PURE__*/React.createElement("button", {
      className: "ButtonPrimary",
      onClick: function onClick() {
        return close();
      }
    }, "Try again"))
  });
});

var ChevronRight = (function () {
  return /*#__PURE__*/React.createElement("svg", {
    className: "ChevronRight Icon",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React.createElement("path", {
    strokeWidth: "1",
    fillRule: "evenodd",
    d: "M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
  }));
});

var Checkmark = (function (props) {
  return /*#__PURE__*/React.createElement("svg", {
    className: "Checkmark Icon " + props.className,
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    x: "0px",
    y: "0px",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20,4.9L9.2,16l-5.4-3.9c-0.7-0.5-1.6-0.3-2.1,0.3c-0.5,0.7-0.3,1.6,0.3,2.1l6.4,4.7c0.3,0.2,0.6,0.3,0.9,0.3 c0.4,0,0.8-0.2,1.1-0.5l11.7-12c0.6-0.6,0.6-1.6,0-2.2C21.6,4.3,20.6,4.3,20,4.9z"
  }));
});

var DigitalWalletIcon = (function (props) {
  return /*#__PURE__*/React.createElement("svg", {
    className: "DigitalWalletIcon Icon " + props.className,
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    width: "24",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.51,4.84l-.39-.53,4-2.89a2.2,2.2,0,0,1,3.06.48l.4.56-.53.39-.4-.56A1.54,1.54,0,0,0,12.5,2Z",
    transform: "translate(-0.81 -1)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.77,4.89l-.21-.62,6.31-2.13h0a2.18,2.18,0,0,1,.67-.1h0a2.21,2.21,0,0,1,2.08,1.49l.32.95-.63.21L18,3.73a1.53,1.53,0,0,0-1.45-1h0a1.61,1.61,0,0,0-.48.08h0Z",
    transform: "translate(-0.81 -1)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.72,16.2H18.27a3.28,3.28,0,1,1,0-6.56h1.45a3.21,3.21,0,0,1,1.33.28h0a3.28,3.28,0,0,1,0,6A3.21,3.21,0,0,1,19.72,16.2Zm-1.45-5.9a2.63,2.63,0,0,0,0,5.25h1.45a2.56,2.56,0,0,0,1.06-.23,2.62,2.62,0,0,0,0-4.8,2.55,2.55,0,0,0-1.06-.22ZM19,14.53a1.61,1.61,0,1,1,1.61-1.61A1.62,1.62,0,0,1,19,14.53ZM19,12a1,1,0,1,0,.95.95A1,1,0,0,0,19,12Z",
    transform: "translate(-0.81 -1)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.49,19.69a1.58,1.58,0,1,1,1.58-1.57A1.57,1.57,0,0,1,10.49,19.69Zm0-2.49a.92.92,0,1,0,.92.92A.92.92,0,0,0,10.49,17.2Z",
    transform: "translate(-0.81 -1)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.09,22.14H2.79a2,2,0,0,1-2-2V6.25a2.1,2.1,0,0,1,0-.43,2,2,0,0,1,.48-.92,2,2,0,0,1,1.48-.65H19.09a2,2,0,0,1,.64.1,2,2,0,0,1,1.36,1.79v0a.28.28,0,0,1,0,.09v3.91h-.66v-4a1.49,1.49,0,0,0-.23-.69A1.35,1.35,0,0,0,19.52,5a1.26,1.26,0,0,0-.43-.08H2.82a1.34,1.34,0,0,0-1,.44A1.49,1.49,0,0,0,1.5,6a1.5,1.5,0,0,0,0,.29V20.13a1.36,1.36,0,0,0,1.34,1.35H19.09a1.35,1.35,0,0,0,1.35-1.35V15.68h.66v4.45A2,2,0,0,1,19.09,22.14Z",
    transform: "translate(-0.81 -1)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.27,9.31a1.58,1.58,0,1,1,0-3.15,1.58,1.58,0,0,1,0,3.15Zm0-2.5a.92.92,0,1,0,.92.92A.92.92,0,0,0,9.27,6.81Z",
    transform: "translate(-0.81 -1)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.11,14.67A1.58,1.58,0,1,1,8.69,13.1,1.57,1.57,0,0,1,7.11,14.67Zm0-2.49A.92.92,0,1,0,8,13.1.92.92,0,0,0,7.11,12.18Z",
    transform: "translate(-0.81 -1)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "0.33",
    y: "11.77",
    width: "4.72",
    height: "0.66"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "2.08 9.53 0.33 9.53 0.33 8.87 1.8 8.87 4.28 6.39 7.21 6.39 7.21 7.05 4.55 7.05 2.08 9.53"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "8.43 17.45 4.53 17.45 2.63 15.55 0.33 15.55 0.33 14.89 2.9 14.89 4.8 16.79 8.43 16.79 8.43 17.45"
  }));
});

var blockTimes = {
  // in seconds
  ethereum: 13,
  bsc: 4,
  polygon: 3
};
var etaForConfirmations = (function (blockchain, confirmationsRequired, confirmationsPassed) {
  return (confirmationsRequired - confirmationsPassed) * blockTimes[blockchain];
});

var LoadingText = (function (props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "LoadingText"
  }, props.children, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, "."), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, "."), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, "."));
});

var Footer = (function () {
  var _useContext = useContext(ChangableAmountContext);
      _useContext.amount;
      _useContext.amountsMissing;

  var _useContext2 = useContext(PaymentTrackingContext),
      synchronousTracking = _useContext2.synchronousTracking,
      asynchronousTracking = _useContext2.asynchronousTracking,
      trackingInitialized = _useContext2.trackingInitialized,
      release = _useContext2.release,
      forwardTo = _useContext2.forwardTo,
      confirmationsRequired = _useContext2.confirmationsRequired,
      confirmationsPassed = _useContext2.confirmationsPassed;

  var _useContext3 = useContext(PaymentContext),
      payment = _useContext3.payment,
      paymentState = _useContext3.paymentState,
      pay = _useContext3.pay,
      transaction = _useContext3.transaction,
      approve = _useContext3.approve,
      approvalTransaction = _useContext3.approvalTransaction;

  var _useContext4 = useContext(PaymentValueContext),
      paymentValueLoss = _useContext4.paymentValueLoss;

  var _useContext5 = useContext(PaymentRoutingContext),
      updatedRouteWithNewPrice = _useContext5.updatedRouteWithNewPrice,
      updateRouteWithNewPrice = _useContext5.updateRouteWithNewPrice;

  var _useContext6 = useContext(NavigateStackContext);
      _useContext6.navigate;

  var _useContext7 = useContext(ClosableContext),
      close = _useContext7.close;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      secondsLeft = _useState2[0],
      setSecondsLeft = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      secondsLeftCountdown = _useState4[0],
      setSecondsLeftCountdown = _useState4[1];

  useEffect(function () {
    if (confirmationsRequired) {
      var interval = setInterval(function () {
        setSecondsLeftCountdown(secondsLeftCountdown + 1);
      }, 1000);
      return function () {
        clearInterval(interval);
      };
    }
  }, [confirmationsRequired, secondsLeftCountdown]);
  useEffect(function () {
    if (confirmationsPassed) {
      setSecondsLeft(etaForConfirmations(payment.blockchain, confirmationsRequired, confirmationsPassed) - secondsLeftCountdown);
    }
  }, [confirmationsPassed, secondsLeftCountdown]);
  useEffect(function () {
    if (confirmationsPassed) {
      setSecondsLeftCountdown(0);
    }
  }, [confirmationsPassed]);

  var trackingInfo = function trackingInfo() {
    if (synchronousTracking == false && asynchronousTracking == false || asynchronousTracking && trackingInitialized) {
      return null;
    } else if (asynchronousTracking && trackingInitialized == false) {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "Card transparent small disabled"
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardImage"
      }, /*#__PURE__*/React.createElement("div", {
        className: "TextCenter"
      }, /*#__PURE__*/React.createElement("div", {
        className: "Loading Icon"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "CardBody"
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardBodyWrapper"
      }, /*#__PURE__*/React.createElement("div", {
        className: "Opacity05"
      }, "Initializing tracking")))));
    } else if (release) {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "Card transparent small disabled"
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardImage"
      }, /*#__PURE__*/React.createElement("div", {
        className: "TextCenter Opacity05"
      }, /*#__PURE__*/React.createElement(Checkmark, {
        className: "small"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "CardBody"
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardBodyWrapper"
      }, /*#__PURE__*/React.createElement("div", {
        className: "Opacity05"
      }, "Payment validated")))));
    } else {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "Card transparent small disabled"
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardImage"
      }, /*#__PURE__*/React.createElement("div", {
        className: "TextCenter"
      }, /*#__PURE__*/React.createElement("div", {
        className: "Loading Icon"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "CardBody"
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardBodyWrapper"
      }, /*#__PURE__*/React.createElement("div", {
        className: "Opacity05"
      }, "Validating payment", confirmationsRequired && secondsLeft > 0 && /*#__PURE__*/React.createElement("span", {
        title: "".concat(confirmationsPassed, "/").concat(confirmationsRequired, " required confirmations")
      }, " ", secondsLeft, "s"))))));
    }
  };

  var additionalPaymentInformation = function additionalPaymentInformation() {
    if (paymentState == 'paying' && transaction == undefined) {
      return /*#__PURE__*/React.createElement("div", {
        className: "PaddingBottomS"
      }, /*#__PURE__*/React.createElement("div", {
        className: "Card transparent disabled small"
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardImage"
      }, /*#__PURE__*/React.createElement("div", {
        className: "TextCenter Opacity05"
      }, /*#__PURE__*/React.createElement(DigitalWalletIcon, {
        className: "small"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "CardBody"
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardBodyWrapper"
      }, /*#__PURE__*/React.createElement("div", {
        className: "Opacity05"
      }, "Confirm transaction in your wallet")))));
    } else if (paymentState == 'success') {
      return /*#__PURE__*/React.createElement("div", {
        className: "PaddingBottomS"
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
        className: "Card transparent small",
        title: "Transaction has been confirmed by the network",
        href: transaction === null || transaction === void 0 ? void 0 : transaction.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardImage"
      }, /*#__PURE__*/React.createElement("div", {
        className: "TextCenter Opacity05"
      }, /*#__PURE__*/React.createElement(Checkmark, {
        className: "small"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "CardBody"
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardBodyWrapper"
      }, /*#__PURE__*/React.createElement("div", {
        className: "Opacity05"
      }, "Transaction confirmed"))))), trackingInfo());
    }
  };

  var approvalButton = function approvalButton() {
    if (payment.route == undefined || !payment.route.approvalRequired || payment.route.directTransfer || updatedRouteWithNewPrice) {
      return null;
    } else if (paymentValueLoss) {
      return /*#__PURE__*/React.createElement("div", {
        className: "PaddingBottomXS"
      }, /*#__PURE__*/React.createElement("button", {
        className: "ButtonPrimary disabled",
        onClick: function onClick() {},
        title: "Allow ".concat(payment.symbol, " to be used as payment")
      }, "Approve use of ", payment.symbol));
    } else if (paymentState == 'initialized') {
      return /*#__PURE__*/React.createElement("div", {
        className: "PaddingBottomXS"
      }, /*#__PURE__*/React.createElement("button", {
        className: "ButtonPrimary",
        onClick: approve,
        title: "Allow ".concat(payment.symbol, " to be used as payment")
      }, "Approve use of ", payment.symbol));
    } else if (paymentState == 'approving') {
      return /*#__PURE__*/React.createElement("div", {
        className: "PaddingBottomXS"
      }, /*#__PURE__*/React.createElement("a", {
        className: "ButtonPrimary",
        title: "Approving payment token - please wait",
        href: approvalTransaction === null || approvalTransaction === void 0 ? void 0 : approvalTransaction.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, /*#__PURE__*/React.createElement(LoadingText, null, "Approving")));
    }
  };

  var mainAction = function mainAction() {
    if (updatedRouteWithNewPrice) {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "PaddingBottomXS"
      }, /*#__PURE__*/React.createElement("div", {
        className: "Alert"
      }, /*#__PURE__*/React.createElement("strong", null, "Price updated!"))), /*#__PURE__*/React.createElement("button", {
        className: "ButtonPrimary",
        onClick: function onClick() {
          updateRouteWithNewPrice();
        }
      }, "Reload"));
    } else if (paymentValueLoss) {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        className: "ButtonPrimary disabled",
        onClick: function onClick() {}
      }, "Pay"));
    } else if ((paymentState == 'initialized' || paymentState == 'approving') && payment.route) {
      return /*#__PURE__*/React.createElement("button", {
        className: ["ButtonPrimary", payment.route.approvalRequired && !payment.route.directTransfer ? 'disabled' : ''].join(' '),
        onClick: function onClick() {
          if (payment.route.approvalRequired && !payment.route.directTransfer) {
            return;
          }

          pay();
        }
      }, "Pay");
    } else if (paymentState == 'paying') {
      return /*#__PURE__*/React.createElement("a", {
        className: "ButtonPrimary",
        title: "Performing the payment - please wait",
        href: transaction === null || transaction === void 0 ? void 0 : transaction.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, /*#__PURE__*/React.createElement(LoadingText, null, "Paying"));
    } else if (paymentState == 'success') {
      if (synchronousTracking == true) {
        if (release) {
          if (forwardTo) {
            return /*#__PURE__*/React.createElement("a", {
              className: "ButtonPrimary",
              href: forwardTo,
              rel: "noopener noreferrer"
            }, "Continue");
          } else {
            return /*#__PURE__*/React.createElement("button", {
              className: "ButtonPrimary",
              onClick: close
            }, "Continue");
          }
        } else {
          return /*#__PURE__*/React.createElement("button", {
            className: "ButtonPrimary disabled",
            onClick: function onClick() {}
          }, "Continue");
        }
      } else if (asynchronousTracking == true && trackingInitialized == false) {
        return /*#__PURE__*/React.createElement("button", {
          className: "ButtonPrimary disabled",
          onClick: function onClick() {}
        }, "Close");
      } else {
        return /*#__PURE__*/React.createElement("button", {
          className: "ButtonPrimary",
          onClick: close
        }, "Close");
      }
    }
  };

  return /*#__PURE__*/React.createElement("div", null, paymentValueLoss && /*#__PURE__*/React.createElement("div", {
    className: "PaddingBottomXS"
  }, /*#__PURE__*/React.createElement("div", {
    className: "Alert"
  }, /*#__PURE__*/React.createElement("strong", null, "Payment would lose ", paymentValueLoss, "% of its value!"))), approvalButton(), additionalPaymentInformation(), mainAction());
});

var PaymentOverviewSkeleton = (function (props) {
  var _useContext = useContext(ChangableAmountContext),
      amountsMissing = _useContext.amountsMissing,
      fixedAmount = _useContext.fixedAmount;

  var _useContext2 = useContext(PaymentRoutingContext),
      slowRouting = _useContext2.slowRouting,
      selectedRoute = _useContext2.selectedRoute;

  return /*#__PURE__*/React.createElement(Dialog$1, {
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM TextLeft"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL FontSizeL"
    }, "Payment")),
    alternativeHeaderAction: props.alternativeHeaderAction,
    body: /*#__PURE__*/React.createElement("div", {
      className: "PaddingLeftM PaddingRightM PaddingBottomXS"
    }, amountsMissing && !fixedAmount && /*#__PURE__*/React.createElement("div", {
      className: "Card Skeleton"
    }, /*#__PURE__*/React.createElement("div", {
      className: "SkeletonBackground"
    })), /*#__PURE__*/React.createElement("div", {
      className: "Card Skeleton"
    }, /*#__PURE__*/React.createElement("div", {
      className: "SkeletonBackground"
    }))),
    footer: /*#__PURE__*/React.createElement("div", {
      className: ["PaddingTopXS PaddingRightM PaddingLeftM", selectedRoute == undefined && slowRouting ? 'PaddingBottomS' : 'PaddingBottomM'].join(' ')
    }, /*#__PURE__*/React.createElement("div", {
      className: "SkeletonWrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ButtonPrimary Skeleton"
    }, /*#__PURE__*/React.createElement("div", {
      className: "SkeletonBackground"
    }))), selectedRoute == undefined && slowRouting && /*#__PURE__*/React.createElement("div", {
      className: "TextCenter Opacity05 PaddingTopS"
    }, /*#__PURE__*/React.createElement("strong", null, "Loading payment options...")))
  });
});

var PaymentOverviewDialog = (function (props) {
  var _useContext = useContext(ConfigurationContext),
      currencyCode = _useContext.currencyCode,
      recover = _useContext.recover,
      amountConfiguration = _useContext.amount,
      currency = _useContext.currency;

  var _useContext2 = useContext(PaymentContext),
      payment = _useContext2.payment,
      paymentState = _useContext2.paymentState;

  var _useContext3 = useContext(ChangableAmountContext),
      amount = _useContext3.amount,
      amountsMissing = _useContext3.amountsMissing,
      fixedAmount = _useContext3.fixedAmount,
      fixedCurrency = _useContext3.fixedCurrency;

  var _useContext4 = useContext(WalletContext),
      disconnect = _useContext4.disconnect;

  var _useContext5 = useContext(PaymentValueContext),
      paymentValue = _useContext5.paymentValue,
      displayedPaymentValue = _useContext5.displayedPaymentValue;

  var _useContext6 = useContext(NavigateStackContext),
      navigate = _useContext6.navigate;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showDropDown = _useState2[0],
      setShowDropDown = _useState2[1];

  var displayedCurrencyCode = amountConfiguration != undefined && amountConfiguration.token ? null : currencyCode;
  var alternativeHeaderActionElement = /*#__PURE__*/React.createElement("span", {
    className: "DropDownWrapper"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setShowDropDown(!showDropDown);
    },
    className: "ButtonCircular",
    title: "Disconnect connected wallet"
  }, /*#__PURE__*/React.createElement(MenuIcon, null)), showDropDown && /*#__PURE__*/React.createElement(DropDown, {
    hide: function hide() {
      return setShowDropDown(false);
    },
    items: [{
      label: "Disconnect wallet",
      action: disconnect
    }]
  }));

  if (payment == undefined || recover == undefined && paymentValue == undefined) {
    return /*#__PURE__*/React.createElement(PaymentOverviewSkeleton, {
      alternativeHeaderAction: alternativeHeaderActionElement
    });
  }

  var blockchain = Blockchains.findByName(payment.blockchain);
  return /*#__PURE__*/React.createElement(Dialog$1, {
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM TextLeft"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL FontSizeL"
    }, "Payment")),
    alternativeHeaderAction: alternativeHeaderActionElement,
    body: /*#__PURE__*/React.createElement("div", {
      className: "PaddingLeftM PaddingRightM PaddingBottomXS"
    }, amountsMissing && !fixedAmount && /*#__PURE__*/React.createElement("div", {
      className: ["Card", paymentState == 'initialized' ? '' : 'disabled'].join(' '),
      title: paymentState == 'initialized' ? "Change amount" : undefined,
      onClick: function onClick() {
        if (paymentState != 'initialized') {
          return;
        }

        navigate('ChangeAmount');
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardBody"
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardBodyWrapper"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "CardTitle"
    }, "Amount"), /*#__PURE__*/React.createElement("h2", {
      className: "CardText"
    }, displayedCurrencyCode && /*#__PURE__*/React.createElement("div", {
      className: "TokenAmountRow"
    }, new Currency({
      amount: amount.toFixed(2),
      code: currencyCode
    }).toString()), !displayedCurrencyCode && /*#__PURE__*/React.createElement("div", {
      className: "TokenAmountRow"
    }, amount)))), /*#__PURE__*/React.createElement("div", {
      className: "CardAction"
    }, /*#__PURE__*/React.createElement(ChevronRight, null))), /*#__PURE__*/React.createElement("div", {
      className: ["Card", paymentState == 'initialized' ? '' : 'disabled'].join(' '),
      title: paymentState == 'initialized' ? "Change payment" : undefined,
      onClick: function onClick() {
        if (paymentState != 'initialized') {
          return;
        }

        navigate('ChangePayment');
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardImage",
      title: payment.name
    }, /*#__PURE__*/React.createElement(TokenImage, {
      blockchain: payment.blockchain,
      address: payment.token
    }), /*#__PURE__*/React.createElement("img", {
      className: "BlockchainLogo small",
      src: blockchain.logo,
      alt: blockchain.label,
      title: blockchain.label
    })), /*#__PURE__*/React.createElement("div", {
      className: "CardBody"
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardBodyWrapper"
    }, amountsMissing && !fixedCurrency && /*#__PURE__*/React.createElement("h4", {
      className: "CardTitle"
    }, "Payment"), /*#__PURE__*/React.createElement("h2", {
      className: "CardText"
    }, /*#__PURE__*/React.createElement("div", {
      className: "TokenAmountRow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "TokenSymbolCell"
    }, payment.symbol), /*#__PURE__*/React.createElement("span", null, "\xA0"), /*#__PURE__*/React.createElement("span", {
      className: "TokenAmountCell"
    }, format(payment.amount))), displayedPaymentValue != "".concat(payment.symbol, " ").concat(format(payment.amount)) && !(amountsMissing && !fixedCurrency) && currency !== false && /*#__PURE__*/React.createElement("div", {
      className: "TokenAmountRow small grey"
    }, /*#__PURE__*/React.createElement("span", {
      className: "TokenAmountCell"
    }, displayedPaymentValue))))), /*#__PURE__*/React.createElement("div", {
      className: "CardAction"
    }, /*#__PURE__*/React.createElement(ChevronRight, null)))),
    footer: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingRightM PaddingLeftM PaddingBottomM"
    }, /*#__PURE__*/React.createElement(Footer, null))
  });
});

var PreTrackingFailedDialog = (function () {
  var _useContext = useContext(PaymentContext);
      _useContext.transaction;

  var _useContext2 = useContext(NavigateStackContext),
      navigate = _useContext2.navigate;

  var tryAgain = function tryAgain() {
    navigate('back');
  };

  return /*#__PURE__*/React.createElement(Dialog$1, {
    stacked: false,
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM"
    }),
    body: /*#__PURE__*/React.createElement("div", {
      className: "TextCenter"
    }, /*#__PURE__*/React.createElement("div", {
      className: "GraphicWrapper"
    }, /*#__PURE__*/React.createElement("img", {
      className: "Graphic",
      src: ErrorGraphic
    })), /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL Text FontSizeL PaddingTopS FontWeightBold"
    }, "Tracking payment failed"), /*#__PURE__*/React.createElement("div", {
      className: "Text PaddingTopS PaddingBottomS PaddingLeftS PaddingRightS"
    }, /*#__PURE__*/React.createElement("strong", {
      className: "FontSizeM"
    }, "Please ensure you are connected to the internet, then click \"Try again\"."), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS"
    }, /*#__PURE__*/React.createElement("span", null, "If this keeps happening, please report it.")))),
    footer: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingRightM PaddingLeftM PaddingBottomM"
    }, /*#__PURE__*/React.createElement("button", {
      className: "ButtonPrimary",
      onClick: tryAgain
    }, "Try again"))
  });
});

var TrackingFailedDialog = (function () {
  var _useContext = useContext(PaymentTrackingContext),
      continueTryTracking = _useContext.continueTryTracking;

  var _useContext2 = useContext(PaymentContext);
      _useContext2.transaction;

  var _useContext3 = useContext(NavigateStackContext),
      navigate = _useContext3.navigate;

  var tryAgain = function tryAgain() {
    continueTryTracking();
    navigate('back');
  };

  return /*#__PURE__*/React.createElement(Dialog$1, {
    stacked: false,
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM"
    }),
    body: /*#__PURE__*/React.createElement("div", {
      className: "TextCenter"
    }, /*#__PURE__*/React.createElement("div", {
      className: "GraphicWrapper"
    }, /*#__PURE__*/React.createElement("img", {
      className: "Graphic",
      src: ErrorGraphic
    })), /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL Text FontSizeL PaddingTopS FontWeightBold"
    }, "Tracking payment failed"), /*#__PURE__*/React.createElement("div", {
      className: "Text PaddingTopS PaddingBottomS PaddingLeftS PaddingRightS"
    }, /*#__PURE__*/React.createElement("strong", {
      className: "FontSizeM"
    }, "Please ensure you are connected to the internet, then click \"Try again\"."), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS"
    }, /*#__PURE__*/React.createElement("span", null, "If this keeps happening, please report it.")))),
    footer: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingRightM PaddingLeftM PaddingBottomM"
    }, /*#__PURE__*/React.createElement("button", {
      className: "ButtonPrimary",
      onClick: tryAgain
    }, "Try again"))
  });
});

var WrongNetworkDialog = (function (props) {
  var _useContext = useContext(PaymentContext),
      payment = _useContext.payment;

  var _useContext2 = useContext(WalletContext),
      wallet = _useContext2.wallet;

  var _useContext3 = useContext(NavigateStackContext),
      navigate = _useContext3.navigate;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2);
      _useState2[0];
      _useState2[1];

  var blockchain = Blockchains.findByName(payment.route.blockchain);

  var switchNetwork = function switchNetwork() {
    wallet.switchTo(payment.blockchain);
    navigate('back');
  };

  return /*#__PURE__*/React.createElement(Dialog$1, {
    stacked: true,
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL FontSizeL"
    }, "Wrong Network")),
    body: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM PaddingBottomXS TextCenter"
    }, /*#__PURE__*/React.createElement("div", {
      className: "GraphicWrapper"
    }, /*#__PURE__*/React.createElement("img", {
      className: "Graphic",
      src: blockchain.logo
    })), /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL Text FontSizeL PaddingTopS FontWeightBold"
    }, "Connect to ", blockchain.label), /*#__PURE__*/React.createElement("div", {
      className: "Text PaddingTopS PaddingBottomS PaddingLeftS PaddingRightS"
    }, /*#__PURE__*/React.createElement("strong", {
      className: "FontSizeM"
    }, "Please make sure you connect your wallet to the correct network before you try again!"))),
    footer: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingRightM PaddingLeftM PaddingBottomM"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "ButtonPrimary",
      onClick: switchNetwork
    }, "Switch Network"))
  });
});

var PaymentStack = (function (props) {
  var _useContext = useContext(ClosableContext),
      open = _useContext.open,
      close = _useContext.close;

  var _useContext2 = useContext(NavigateContext),
      setNavigator = _useContext2.setNavigator;

  return /*#__PURE__*/React.createElement(ReactDialogStack, {
    setNavigator: setNavigator,
    open: open,
    close: close,
    start: "PaymentOverview",
    container: props.container,
    document: props.document,
    dialogs: {
      PaymentOverview: /*#__PURE__*/React.createElement(PaymentOverviewDialog, null),
      ChangeAmount: /*#__PURE__*/React.createElement(ChangeAmountDialog, null),
      ChangePayment: /*#__PURE__*/React.createElement(ChangePaymentDialog, null),
      PaymentFailed: /*#__PURE__*/React.createElement(PaymentFailedDialog, null),
      WrongNetwork: /*#__PURE__*/React.createElement(WrongNetworkDialog, null),
      TrackingFailed: /*#__PURE__*/React.createElement(TrackingFailedDialog, null),
      PreTrackingFailed: /*#__PURE__*/React.createElement(PreTrackingFailedDialog, null)
    }
  });
});

var PaymentTrackingProvider = (function (props) {
  var _useContext = useContext(ErrorContext);
      _useContext.errorCallback;

  var _useContext2 = useContext(ConfigurationContext),
      track = _useContext2.track,
      validated = _useContext2.validated;
      _useContext2.failed;
      var integration = _useContext2.integration,
      link = _useContext2.link,
      type = _useContext2.type;

  var _useContext3 = useContext(WalletContext),
      account = _useContext3.account,
      wallet = _useContext3.wallet;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      transaction = _useState2[0],
      setTransaction = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      confirmationsRequired = _useState4[0],
      setConfirmationsRequired = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      confirmationsPassed = _useState6[0],
      setConfirmationsPassed = _useState6[1];

  var _useState7 = useState(),
      _useState8 = _slicedToArray(_useState7, 2),
      afterBlock = _useState8[0],
      setAfterBlock = _useState8[1];

  var _useState9 = useState(),
      _useState10 = _slicedToArray(_useState9, 2);
      _useState10[0];
      _useState10[1];

  var _useState11 = useState(),
      _useState12 = _slicedToArray(_useState11, 2),
      paymentRoute = _useState12[0],
      setPaymentRoute = _useState12[1];

  var _useState13 = useState(false),
      _useState14 = _slicedToArray(_useState13, 2),
      trackingInitialized = _useState14[0],
      setTrackingInitialized = _useState14[1];

  var _useState15 = useState(!!(track && (track.endpoint || typeof track.method == 'function') && track.async != true)),
      _useState16 = _slicedToArray(_useState15, 1),
      synchronousTracking = _useState16[0];

  var _useState17 = useState(!!(track && track.async == true)),
      _useState18 = _slicedToArray(_useState17, 1),
      asynchronousTracking = _useState18[0];

  var _useState19 = useState(!!(track && track.poll && (track.poll.endpoint || typeof track.poll.method == 'function') && track.async != true)),
      _useState20 = _slicedToArray(_useState19, 1),
      polling = _useState20[0];

  var _useState21 = useState(false),
      _useState22 = _slicedToArray(_useState21, 2),
      release = _useState22[0],
      setRelease = _useState22[1];

  var _useState23 = useState(),
      _useState24 = _slicedToArray(_useState23, 2),
      forwardTo = _useState24[0],
      setForwardTo = _useState24[1];

  var _useContext4 = useContext(ClosableContext),
      setClosable = _useContext4.setClosable;

  var _useContext5 = useContext(NavigateContext),
      navigate = _useContext5.navigate,
      set = _useContext5.set;

  var openSocket = function openSocket(transaction) {
    var socket = new WebSocket('wss://integrate.depay.com/cable');

    socket.onopen = function (event) {
      var _transaction$nonce;

      var msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
          blockchain: transaction.blockchain,
          sender: transaction.from,
          nonce: transaction === null || transaction === void 0 ? void 0 : (_transaction$nonce = transaction.nonce) === null || _transaction$nonce === void 0 ? void 0 : _transaction$nonce.toString(),
          channel: 'PaymentChannel'
        })
      };
      socket.send(JSON.stringify(msg));
    };

    socket.onclose = function (event) {
      if (!event || event.code != 1000) {
        openSocket(transaction);
      }
    };

    socket.onmessage = function (event) {
      var item = JSON.parse(event.data);

      if (item.type === "ping" || !item.message) {
        return;
      }

      var success = item.message.status == 'success';

      if (validated) {
        setTimeout(function () {
          return validated(success);
        }, 200);
      }

      if (item.message.release) {
        socket.close(1000);

        if (success) {
          setRelease(true);
          setClosable(true);
          setForwardTo(item.message.forward_to);

          if (!!item.message.forward_to) {
            setTimeout(function () {
              props.document.location.href = item.message.forward_to;
            }, 200);
          }
        } else if (success == false) {
          setClosable(true);
          set(['PaymentFailed']);
        }
      } else if (item.message.confirmations) {
        setConfirmationsRequired(item.message.confirmations.required);
        setConfirmationsPassed(item.message.confirmations.passed);
      }
    };

    socket.onerror = function (error) {
      console.log('WebSocket Error: ' + error);
    };
  };

  var retryStartTracking = function retryStartTracking(transaction, afterBlock, paymentRoute, attempt) {
    attempt = parseInt(attempt || 1, 10);

    if (attempt < ((track === null || track === void 0 ? void 0 : track.attempts) || 40)) {
      setTimeout(function () {
        startTracking(transaction, afterBlock, paymentRoute, attempt + 1);
      }, 3000);
    } else {
      navigate('TrackingFailed');
    }
  };

  var continueTryTracking = function continueTryTracking() {
    retryStartTracking(transaction, afterBlock, paymentRoute, 1);
  };

  var callTracking = function callTracking(payment) {
    if (track.endpoint) {
      return fetch(track.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payment)
      }).then(function (response) {
        if (response.status == 200 || response.status == 201) {
          return response;
        } else {
          throw response;
        }
      });
    } else if (track.method) {
      return track.method(payment);
    } else {
      throw 'No tracking defined!';
    }
  };

  var startTracking = function startTracking(transaction, afterBlock, paymentRoute, attempt) {
    var _transaction$nonce2, _paymentRoute$feeAmou;

    console.log('START TRACKING!', transaction);
    callTracking({
      blockchain: transaction.blockchain,
      transaction: transaction.id,
      sender: transaction.from,
      nonce: transaction === null || transaction === void 0 ? void 0 : (_transaction$nonce2 = transaction.nonce) === null || _transaction$nonce2 === void 0 ? void 0 : _transaction$nonce2.toString(),
      after_block: afterBlock.toString(),
      from_token: paymentRoute.fromToken.address,
      from_amount: paymentRoute.fromAmount.toString(),
      from_decimals: paymentRoute.fromDecimals,
      to_token: paymentRoute.toToken.address,
      to_amount: paymentRoute.toAmount.toString(),
      to_decimals: paymentRoute.toDecimals,
      fee_amount: paymentRoute === null || paymentRoute === void 0 ? void 0 : (_paymentRoute$feeAmou = paymentRoute.feeAmount) === null || _paymentRoute$feeAmou === void 0 ? void 0 : _paymentRoute$feeAmou.toString()
    }).then(function (response) {
      setTrackingInitialized(true);
      console.log('PAYMENT TRACKING INITIALIZED');
    })["catch"](function (error) {
      console.log('PAYMENT TRACKING FAILED', error);
      retryStartTracking(transaction, afterBlock, paymentRoute, attempt);
    });
  };

  var pollStatus = function pollStatus(polling, transaction, afterBlock, paymentRoute, pollingInterval) {
    var _transaction$nonce3;

    if (!polling || transaction == undefined || afterBlock == undefined || paymentRoute == undefined) {
      return;
    }

    var payment = {
      blockchain: transaction.blockchain,
      transaction: transaction.id,
      sender: transaction.from,
      nonce: transaction === null || transaction === void 0 ? void 0 : (_transaction$nonce3 = transaction.nonce) === null || _transaction$nonce3 === void 0 ? void 0 : _transaction$nonce3.toString(),
      after_block: afterBlock.toString(),
      to_token: paymentRoute.toToken.address
    };

    var handlePollingResponse = function handlePollingResponse(data) {
      if (data) {
        if (data && data.forward_to) {
          setClosable(true);
          setForwardTo(data.forward_to);
          setTimeout(function () {
            props.document.location.href = data.forward_to;
          }, 200);
        } else {
          setClosable(true);
        }

        clearInterval(pollingInterval);

        if (validated) {
          validated(true);
        }

        setRelease(true);
      }
    };

    if (track.poll.endpoint) {
      fetch(track.poll.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payment)
      }).then(function (response) {
        if (response.status == 200 || response.status == 201) {
          return response.json()["catch"](function () {
            setClosable(true);
          });
        } else {
          return undefined;
        }
      }).then(handlePollingResponse);
    } else if (track.poll.method) {
      track.poll.method(payment).then(handlePollingResponse);
    }
  };

  useEffect(function () {
    if (!polling) {
      return;
    }

    if (!synchronousTracking) {
      return;
    }

    var pollingInterval = setInterval(function () {
      return pollStatus(polling, transaction, afterBlock, paymentRoute, pollingInterval);
    }, 5000);
    return function () {
      clearInterval(pollingInterval);
    };
  }, [polling, transaction, afterBlock, paymentRoute]);

  var storePayment = function storePayment(transaction, afterBlock, paymentRoute, attempt) {
    var _transaction$nonce4;

    fetch('https://public.depay.com/payments', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        blockchain: transaction.blockchain,
        transaction: transaction.id,
        sender: transaction.from,
        nonce: transaction === null || transaction === void 0 ? void 0 : (_transaction$nonce4 = transaction.nonce) === null || _transaction$nonce4 === void 0 ? void 0 : _transaction$nonce4.toString(),
        receiver: paymentRoute.toAddress,
        token: paymentRoute.toToken.address,
        amount: paymentRoute.fee ? ethers.utils.formatUnits(paymentRoute.transaction.params.amounts[1], paymentRoute.toDecimals) : ethers.utils.formatUnits(paymentRoute.toAmount, paymentRoute.toDecimals),
        confirmations: 1,
        after_block: afterBlock.toString(),
        uuid: transaction.id,
        payload: {
          sender_id: transaction.from,
          sender_token_id: paymentRoute.fromToken.address,
          sender_amount: ethers.utils.formatUnits(paymentRoute.fromAmount, paymentRoute.fromDecimals),
          integration: integration,
          link: link,
          type: type
        },
        fee_amount: paymentRoute.fee ? ethers.utils.formatUnits(paymentRoute.transaction.params.amounts[4], paymentRoute.toDecimals) : null,
        fee_receiver: paymentRoute.fee ? paymentRoute.transaction.params.addresses[1] : null
      })
    }).then(function (response) {
      if (response.status == 200 || response.status == 201) ; else {
        setTimeout(function () {
          storePayment(transaction, afterBlock, paymentRoute);
        }, 3000);
      }
    })["catch"](function (error) {
      setTimeout(function () {
        storePayment(transaction, afterBlock, paymentRoute);
      }, 3000);
    });
  };

  var initializeTracking = function initializeTracking(transaction, afterBlock, paymentRoute) {
    console.log('initializeTracking');
    storePayment(transaction, afterBlock, paymentRoute);

    if (synchronousTracking || track && track.async == true) {
      startTracking(transaction, afterBlock, paymentRoute);
    }

    if (synchronousTracking == false) {
      return;
    }

    setTransaction(transaction);
    setAfterBlock(afterBlock);
    setPaymentRoute(paymentRoute);
    openSocket(transaction);
  };

  var preTrack = function preTrack(afterBlock, paymentRoute) {
    if (!synchronousTracking && !asynchronousTracking) {
      return Promise.resolve();
    }

    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(resolve, reject) {
        var _paymentRoute$feeAmou2;

        var payment;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = paymentRoute.blockchain;
                _context.t1 = account;
                _context.next = 4;
                return wallet.transactionCount({
                  blockchain: paymentRoute.blockchain,
                  address: account
                });

              case 4:
                _context.t2 = _context.sent.toString();
                _context.t3 = afterBlock.toString();
                _context.t4 = paymentRoute.fromToken.address;
                _context.t5 = paymentRoute.fromAmount.toString();
                _context.t6 = paymentRoute.fromDecimals;
                _context.t7 = paymentRoute.toToken.address;
                _context.t8 = paymentRoute.toAmount.toString();
                _context.t9 = paymentRoute.toDecimals;
                _context.t10 = paymentRoute === null || paymentRoute === void 0 ? void 0 : (_paymentRoute$feeAmou2 = paymentRoute.feeAmount) === null || _paymentRoute$feeAmou2 === void 0 ? void 0 : _paymentRoute$feeAmou2.toString();
                payment = {
                  blockchain: _context.t0,
                  sender: _context.t1,
                  nonce: _context.t2,
                  after_block: _context.t3,
                  from_token: _context.t4,
                  from_amount: _context.t5,
                  from_decimals: _context.t6,
                  to_token: _context.t7,
                  to_amount: _context.t8,
                  to_decimals: _context.t9,
                  fee_amount: _context.t10
                };

                if (!track.endpoint) {
                  _context.next = 18;
                  break;
                }

                return _context.abrupt("return", fetch(track.endpoint, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(payment)
                }).then(function (response) {
                  if (response.status == 200 || response.status == 201) {
                    return resolve();
                  } else {
                    return reject('PRETRACKING REQUEST FAILED');
                  }
                }));

              case 18:
                if (track.method) {
                  track.method(payment).then(resolve)["catch"](reject);
                } else {
                  reject('No tracking defined!');
                }

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  };

  return /*#__PURE__*/React.createElement(PaymentTrackingContext.Provider, {
    value: {
      synchronousTracking: synchronousTracking,
      asynchronousTracking: asynchronousTracking,
      initializeTracking: initializeTracking,
      preTrack: preTrack,
      trackingInitialized: trackingInitialized,
      continueTryTracking: continueTryTracking,
      release: release,
      forwardTo: forwardTo,
      confirmationsRequired: confirmationsRequired,
      confirmationsPassed: confirmationsPassed
    }
  }, props.children);
});

var PaymentValueProvider = (function (props) {
  var _useContext = useContext(ErrorContext),
      setError = _useContext.setError;

  var _useContext2 = useContext(WalletContext),
      account = _useContext2.account;

  var _useContext3 = useContext(UpdatableContext),
      updatable = _useContext3.updatable;

  var _useContext4 = useContext(ConfigurationContext),
      configuredAmount = _useContext4.amount,
      currencyCode = _useContext4.currencyCode;

  var _useContext5 = useContext(ChangableAmountContext),
      amount = _useContext5.amount;

  var _useContext6 = useContext(PaymentContext),
      payment = _useContext6.payment;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      paymentValue = _useState2[0],
      setPaymentValue = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      displayedPaymentValue = _useState4[0],
      setDisplayedPaymentValue = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      paymentValueLoss = _useState6[0],
      setPaymentValueLoss = _useState6[1];

  var _useContext7 = useContext(ConfigurationContext),
      currency = _useContext7.currency;

  var _useState7 = useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      reloadCount = _useState8[0],
      setReloadCount = _useState8[1];

  var updatePaymentValue = function updatePaymentValue(_ref) {
    var updatable = _ref.updatable,
        payment = _ref.payment;

    if (updatable == false || (payment === null || payment === void 0 ? void 0 : payment.route) == undefined) {
      return;
    }

    setPaymentValue(null);
    setPaymentValueLoss(null);
    Promise.all([Promise.all(Blockchains[payment.route.blockchain].stables.usd.map(function (stable) {
      return route$1({
        blockchain: payment.route.blockchain,
        tokenIn: payment.route.fromToken.address,
        tokenOut: stable,
        amountIn: payment.route.fromAmount,
        fromAddress: account,
        toAddress: account
      });
    })), !payment.route.directTransfer ? route$1({
      blockchain: payment.route.blockchain,
      tokenIn: payment.route.toToken.address,
      tokenOut: payment.route.fromToken.address,
      amountIn: payment.route.toAmount,
      fromAddress: account,
      toAddress: account
    }) : Promise.resolve([])]).then(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          fromTokenUSDExchangeRoutes = _ref3[0],
          reverseRoutes = _ref3[1];

      var reverseRoute = reverseRoutes[0];

      if (reverseRoute) {
        var reverseAmountOutBN = ethers.BigNumber.from(reverseRoute.amountOut);
        var paymentAmountInBN = ethers.BigNumber.from(payment.route.fromAmount);
        var divPercent = 100 - reverseAmountOutBN.mul(ethers.BigNumber.from('100')).div(paymentAmountInBN).abs().toString();

        if (divPercent >= 10) {
          setPaymentValueLoss(divPercent);
        } else {
          setPaymentValueLoss(null);
        }
      }

      var USDValue;

      if (Blockchains[payment.route.blockchain].stables.usd.includes(payment.route.fromToken.address)) {
        // is stable
        var decimals = Blockchains[payment.route.blockchain].tokens.find(function (token) {
          return token.address === payment.route.fromToken.address;
        }).decimals;
        USDValue = ethers.utils.formatUnits(payment.route.fromAmount.toString(), decimals);
      } else {
        var USDRoutes = fromTokenUSDExchangeRoutes.map(function (routes) {
          return routes ? routes[0] : undefined;
        }).filter(Boolean);

        if (USDRoutes.length == 0) {
          setPaymentValue('');
          return;
        } else {
          var amounts = USDRoutes.map(function (route) {
            var decimals = Blockchains[payment.route.blockchain].tokens.find(function (token) {
              return token.address === route.tokenOut;
            }).decimals;
            return parseFloat(ethers.utils.formatUnits(route.amountOut, decimals));
          }); // remove outliers

          var average = amounts.reduce(function (a, b) {
            return a + b;
          }) / amounts.length;
          var diff = 0.1; // 10%

          amounts = amounts.filter(function (amount) {
            return amount < average + average * diff && amount > average - average * diff;
          });
          USDValue = amounts.reduce(function (a, b) {
            return a + b;
          }) / amounts.length;
        }
      }

      Currency.fromUSD({
        amount: USDValue,
        code: currency
      }).then(setPaymentValue);
    })["catch"](setError);
  };

  useEffect(function () {
    if (paymentValue && amount && configuredAmount && configuredAmount.currency && configuredAmount.fix) {
      setDisplayedPaymentValue(paymentValue.toString());
    } else if (amount && (configuredAmount == undefined || (configuredAmount === null || configuredAmount === void 0 ? void 0 : configuredAmount.token) != true)) {
      setDisplayedPaymentValue(new Currency({
        amount: amount.toFixed(2),
        code: currencyCode
      }).toString());
    } else if (paymentValue && paymentValue.toString().length && (configuredAmount === null || configuredAmount === void 0 ? void 0 : configuredAmount.token) != true) {
      setDisplayedPaymentValue(paymentValue.toString());
    } else if (payment) {
      setDisplayedPaymentValue("".concat(payment.symbol, " ").concat(payment.amount));
    }
  }, [paymentValue, payment, amount, configuredAmount]);
  useEffect(function () {
    if (account && payment) {
      updatePaymentValue({
        updatable: updatable,
        payment: payment
      });
    }
  }, [payment, account]);
  useEffect(function () {
    var timeout = setTimeout(function () {
      setReloadCount(reloadCount + 1);
      updatePaymentValue({
        updatable: updatable
      });
    }, 15000);
    return function () {
      return clearTimeout(timeout);
    };
  }, [reloadCount, updatable]);
  return /*#__PURE__*/React.createElement(PaymentValueContext.Provider, {
    value: {
      paymentValue: paymentValue,
      paymentValueLoss: paymentValueLoss,
      displayedPaymentValue: displayedPaymentValue
    }
  }, props.children);
});

var TransactionTrackingProvider = (function (props) {
  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      givenTransaction = _useState2[0],
      setGivenTransaction = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      foundTransaction = _useState4[0],
      setFoundTransaction = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      polling = _useState6[0],
      setPolling = _useState6[1];

  var _useContext = useContext(ErrorContext);
      _useContext.errorCallback;

  var _useContext2 = useContext(ConfigurationContext),
      recover = _useContext2.recover;

  useEffect(function () {
    if (polling) {
      var poll = function poll() {
        fetch("https://public.depay.com/transactions/".concat(givenTransaction.blockchain, "/").concat(givenTransaction.from, "/").concat(givenTransaction.nonce)).then(function (response) {
          if (response.status == 200) {
            response.json().then(function (data) {
              if (data.status != 'pending') {
                setFoundTransaction({
                  id: data.external_id,
                  status: data.status
                });
                setPolling(false);
              }
            });
          }
        });
      };

      var pollingInterval = setInterval(poll, 5000);
      poll();
      return function () {
        clearInterval(pollingInterval);
      };
    }
  }, [polling]);

  var createTracking = function createTracking(transaction, afterBlock, attempt) {
    var _transaction$nonce;

    if (attempt > 3) {
      console.log('TRANSACTION TRACKING FAILED AFTER 3 ATTEMPTS!');
      return;
    }

    fetch('https://public.depay.com/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: transaction.id,
        after_block: afterBlock.toString(),
        blockchain: transaction.blockchain,
        sender: transaction.from,
        nonce: transaction === null || transaction === void 0 ? void 0 : (_transaction$nonce = transaction.nonce) === null || _transaction$nonce === void 0 ? void 0 : _transaction$nonce.toString()
      })
    }).then(function (response) {
      if (response.status == 200 || response.status == 201) {
        console.log('TRANSACTION TRACKING INITIALIZED');
      } else {
        console.log('TRANSACTION TRACKING FAILED', response);
        setTimeout(function () {
          createTracking(transaction, afterBlock, attempt + 1);
        }, 3000);
      }
    })["catch"](function (error) {
      console.log('TRANSACTION TRACKING FAILED', error);
      setTimeout(function () {
        createTracking(transaction, afterBlock, attempt + 1);
      }, 3000);
    });
  };

  var openSocket = function openSocket(transaction) {
    var socket = new WebSocket('wss://integrate.depay.com/cable');

    socket.onopen = function (event) {
      var _transaction$nonce2;

      var msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
          blockchain: transaction.blockchain,
          sender: transaction.from,
          nonce: transaction === null || transaction === void 0 ? void 0 : (_transaction$nonce2 = transaction.nonce) === null || _transaction$nonce2 === void 0 ? void 0 : _transaction$nonce2.toString(),
          channel: 'TransactionChannel'
        })
      };
      socket.send(JSON.stringify(msg));
    };

    socket.onclose = function (event) {
      if (!event || event.code != 1000) {
        openSocket(transaction);
      }
    };

    socket.onmessage = function (event) {
      var item = JSON.parse(event.data);

      if (item.type === "ping") {
        return;
      }

      if (item.message && item.message.status && item.message.status != 'pending') {
        setFoundTransaction(item.message);
        socket.close(1000);
      }
    };

    socket.onerror = function (error) {
      console.log('WebSocket Error: ' + error);
    };
  };

  var initializeTracking = function initializeTracking(transaction, afterBlock) {
    setGivenTransaction(transaction);

    if (recover == undefined) {
      createTracking(transaction, afterBlock, 1);
    }

    openSocket(transaction);
    setPolling(true);
  };

  useEffect(function () {
    if (recover) {
      initializeTracking({
        blockchain: recover.blockchain,
        id: recover.transaction,
        from: recover.sender,
        nonce: recover.nonce
      }, recover.afterBlock);
    }
  }, [recover]);
  return /*#__PURE__*/React.createElement(TransactionTrackingContext.Provider, {
    value: {
      initializeTracking: initializeTracking,
      foundTransaction: foundTransaction
    }
  }, props.children);
});

var preflight$1 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_ref) {
    var accept, recover;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            accept = _ref.accept, recover = _ref.recover;

            if (!recover) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            accept.forEach(function (configuration) {
              if (typeof configuration.blockchain === 'undefined') {
                throw 'You need to set the blockchain your want to receive the payment on!';
              }

              if (!['ethereum', 'bsc', 'polygon'].includes(configuration.blockchain)) {
                throw 'You need to set a supported blockchain!';
              }

              if (typeof configuration.token === 'undefined' && typeof configuration.fromToken === 'undefined' && typeof configuration.fromAmount === 'undefined' && typeof configuration.toToken === 'undefined') {
                throw 'You need to set the token you want to receive as payment!';
              }

              if (typeof configuration.token === 'undefined' && typeof configuration.fromToken !== 'undefined' && typeof configuration.fromAmount === 'undefined' && typeof configuration.toToken === 'undefined') {
                throw 'You need to set the fromToken, fromAmount and toToken!';
              }

              if (typeof configuration.receiver === 'undefined') {
                throw 'You need to set the receiver address that you want to receive the payment!';
              }
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function preflight(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var Payment = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(_ref3) {
    var accept, amount, sent, succeeded, validated, failed, error, critical, style, whitelist, blacklist, providers, currency, connected, closed, track, fee, recover, closable, integration, link, container, before, wallet, document, unmount;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            accept = _ref3.accept, amount = _ref3.amount, sent = _ref3.sent, succeeded = _ref3.succeeded, validated = _ref3.validated, failed = _ref3.failed, error = _ref3.error, critical = _ref3.critical, style = _ref3.style, whitelist = _ref3.whitelist, blacklist = _ref3.blacklist, providers = _ref3.providers, currency = _ref3.currency, connected = _ref3.connected, closed = _ref3.closed, track = _ref3.track, fee = _ref3.fee, recover = _ref3.recover, closable = _ref3.closable, integration = _ref3.integration, link = _ref3.link, container = _ref3.container, before = _ref3.before, wallet = _ref3.wallet, document = _ref3.document;
            requireReactVersion();

            if (currency && !SUPPORTED_CURRENCIES.includes(currency.toLowerCase())) {
              currency = false;
            }

            _context2.prev = 3;
            _context2.next = 6;
            return preflight$1({
              accept: accept,
              recover: recover
            });

          case 6:
            if (typeof window._depayUnmountLoading == 'function') {
              window._depayUnmountLoading();
            }

            unmount = mount({
              style: style,
              container: container,
              document: ensureDocument(document),
              closed: closed
            }, function (unmount) {
              return function (container) {
                return /*#__PURE__*/React.createElement(ErrorProvider, {
                  errorCallback: error,
                  container: container,
                  unmount: unmount
                }, /*#__PURE__*/React.createElement(ConfigurationProvider, {
                  configuration: {
                    type: 'payment',
                    before: before,
                    amount: amount,
                    accept: accept,
                    currency: currency,
                    event: event,
                    sent: sent,
                    succeeded: succeeded,
                    validated: validated,
                    failed: failed,
                    whitelist: whitelist,
                    blacklist: blacklist,
                    providers: providers,
                    track: track,
                    fee: fee,
                    recover: recover,
                    integration: integration,
                    link: link,
                    wallet: wallet
                  }
                }, /*#__PURE__*/React.createElement(UpdatableProvider, null, /*#__PURE__*/React.createElement(ClosableProvider, {
                  unmount: unmount,
                  closable: closable
                }, /*#__PURE__*/React.createElement(WalletProvider, {
                  document: document,
                  container: container,
                  connected: connected,
                  unmount: unmount
                }, /*#__PURE__*/React.createElement(NavigateProvider, null, /*#__PURE__*/React.createElement(ConversionRateProvider, null, /*#__PURE__*/React.createElement(ChangableAmountProvider, {
                  accept: accept
                }, /*#__PURE__*/React.createElement(PaymentAmountRoutingProvider, {
                  accept: accept,
                  whitelist: whitelist,
                  blacklist: blacklist,
                  event: event,
                  fee: fee
                }, /*#__PURE__*/React.createElement(TransactionTrackingProvider, null, /*#__PURE__*/React.createElement(PaymentTrackingProvider, {
                  document: ensureDocument(document)
                }, /*#__PURE__*/React.createElement(PaymentProvider, {
                  container: container,
                  document: document
                }, /*#__PURE__*/React.createElement(PaymentValueProvider, null, /*#__PURE__*/React.createElement(PaymentStack, {
                  document: document,
                  container: container
                }), /*#__PURE__*/React.createElement(PoweredBy, null))))))))))))));
              };
            });
            return _context2.abrupt("return", {
              unmount: unmount
            });

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](3);
            console.log('critical error', _context2.t0);

            if (critical != undefined) {
              critical(_context2.t0);
            }

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 11]]);
  }));

  return function Payment(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

Payment.preload = function (_ref5) {
  var account = _ref5.account,
      accept = _ref5.accept,
      whitelist = _ref5.whitelist,
      blacklist = _ref5.blacklist;
      _ref5.event;
      var fee = _ref5.fee;
  routePayments({
    account: account,
    accept: accept,
    whitelist: whitelist,
    blacklist: blacklist,
    fee: fee
  });
};

var SaleRoutingContext = /*#__PURE__*/React.createContext();

var ToTokenContext = /*#__PURE__*/React.createContext();

var ToTokenProvider = (function (props) {
  var _useContext = useContext(PaymentContext),
      payment = _useContext.payment;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      toToken = _useState2[0],
      setToToken = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      toTokenReadableAmount = _useState4[0],
      setToTokenReadableAmount = _useState4[1];

  useEffect(function () {
    if (payment) {
      Promise.all([payment.route.toToken.symbol(), payment.route.toToken.readable(payment.route.toAmount)]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            symbol = _ref2[0],
            readableAmount = _ref2[1];

        setToToken({
          address: payment.route.toToken.address,
          symbol: symbol
        });
        setToTokenReadableAmount(readableAmount);
      });
    }
  }, [payment]);
  return /*#__PURE__*/React.createElement(ToTokenContext.Provider, {
    value: {
      toToken: toToken,
      toTokenReadableAmount: toTokenReadableAmount
    }
  }, props.children);
});

var SaleRoutingProvider = (function (props) {
  var _useContext = useContext(ChangableAmountContext),
      acceptWithAmount = _useContext.acceptWithAmount,
      setMaxRoute = _useContext.setMaxRoute;

  var _useContext2 = useContext(ConfigurationContext),
      sell = _useContext2.sell;

  var _useContext3 = useContext(ConfigurationContext),
      blacklist = _useContext3.blacklist;

  if (blacklist == undefined) {
    blacklist = {};
  }

  for (var blockchain in sell) {
    var token = sell[blockchain];

    if (blacklist[blockchain] instanceof Array) {
      blacklist[blockchain].push(token);
    } else {
      blacklist[blockchain] = [token];
    }
  }

  return /*#__PURE__*/React.createElement(SaleRoutingContext.Provider, {
    value: {}
  }, /*#__PURE__*/React.createElement(PaymentRoutingProvider, {
    accept: acceptWithAmount,
    blacklist: blacklist,
    setMaxRoute: setMaxRoute
  }, /*#__PURE__*/React.createElement(PaymentProvider, {
    container: props.container,
    document: props.document
  }, /*#__PURE__*/React.createElement(PaymentValueProvider, null, /*#__PURE__*/React.createElement(ToTokenProvider, null, props.children)))));
});

var SaleOverviewSkeleton = (function (props) {
  return /*#__PURE__*/React.createElement(Dialog$1, {
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM TextLeft"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL FontSizeL"
    }, "Purchase")),
    body: /*#__PURE__*/React.createElement("div", {
      className: "PaddingLeftM PaddingRightM PaddingBottomXS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "Card Skeleton",
      style: {
        height: '100px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "SkeletonBackground"
    })), /*#__PURE__*/React.createElement("div", {
      className: "Card Skeleton"
    }, /*#__PURE__*/React.createElement("div", {
      className: "SkeletonBackground"
    }))),
    footer: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingRightM PaddingLeftM PaddingBottomM"
    }, /*#__PURE__*/React.createElement("div", {
      className: "SkeletonWrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ButtonPrimary Skeleton"
    }, /*#__PURE__*/React.createElement("div", {
      className: "SkeletonBackground"
    }))))
  });
});

var SaleOverviewDialog = (function (props) {
  var _useContext = useContext(ChangableAmountContext);
      _useContext.amount;

  var _useContext2 = useContext(ConfigurationContext),
      tokenImage = _useContext2.tokenImage,
      amountConfiguration = _useContext2.amount;

  var _useContext3 = useContext(PaymentValueContext),
      paymentValue = _useContext3.paymentValue;

  var _useContext4 = useContext(PaymentContext),
      payment = _useContext4.payment,
      paymentState = _useContext4.paymentState;

  var _useContext5 = useContext(NavigateStackContext),
      navigate = _useContext5.navigate;

  var _useContext6 = useContext(ToTokenContext),
      toToken = _useContext6.toToken,
      toTokenReadableAmount = _useContext6.toTokenReadableAmount;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      salePerTokenValue = _useState2[0],
      setSalePerTokenValue = _useState2[1];

  useEffect(function () {
    if (paymentValue && (amountConfiguration == undefined || amountConfiguration.token != true) && toTokenReadableAmount) {
      var UsdAmountPerToken = paymentValue.amount / parseFloat(toTokenReadableAmount);
      var readableLocalizedAmountPerToken = new Currency({
        amount: UsdAmountPerToken,
        code: paymentValue.code
      }).toString();
      var zero = new Currency({
        amount: 0,
        code: paymentValue.code
      }).toString();

      if (readableLocalizedAmountPerToken != zero) {
        setSalePerTokenValue(readableLocalizedAmountPerToken);
      }
    }
  }, [paymentValue, toTokenReadableAmount]);

  if (toToken == undefined || toTokenReadableAmount == undefined || payment == undefined || paymentValue == undefined) {
    return /*#__PURE__*/React.createElement(SaleOverviewSkeleton, null);
  }

  var tokenImageElement;

  if (tokenImage) {
    tokenImageElement = /*#__PURE__*/React.createElement("img", {
      src: tokenImage
    });
  } else {
    tokenImageElement = /*#__PURE__*/React.createElement(TokenImage, {
      blockchain: payment.route.blockchain,
      address: toToken.address
    });
  }

  var blockchain = Blockchains.findByName(payment.blockchain);
  return /*#__PURE__*/React.createElement(Dialog$1, {
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM TextLeft"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL FontSizeL"
    }, "Purchase")),
    body: /*#__PURE__*/React.createElement("div", {
      className: "PaddingLeftM PaddingRightM PaddingBottomXS"
    }, /*#__PURE__*/React.createElement("div", {
      className: ["Card", paymentState == 'initialized' ? '' : 'disabled'].join(' '),
      title: paymentState == 'initialized' ? "Change amount" : undefined,
      onClick: function onClick() {
        if (paymentState != 'initialized') {
          return;
        }

        navigate('ChangeAmount');
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardImage",
      title: payment.name
    }, tokenImageElement, /*#__PURE__*/React.createElement("img", {
      className: "BlockchainLogo small",
      src: blockchain.logo,
      alt: blockchain.label,
      title: blockchain.label
    })), /*#__PURE__*/React.createElement("div", {
      className: "CardBody"
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardBodyWrapper"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "CardTitle"
    }, "Amount"), /*#__PURE__*/React.createElement("h2", {
      className: "CardText"
    }, /*#__PURE__*/React.createElement("div", {
      className: "TokenAmountRow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "TokenSymbolCell"
    }, toToken.symbol), /*#__PURE__*/React.createElement("span", null, "\xA0"), /*#__PURE__*/React.createElement("span", {
      className: "TokenAmountCell"
    }, format(toTokenReadableAmount)))), salePerTokenValue && /*#__PURE__*/React.createElement("h3", {
      className: "CardText small"
    }, /*#__PURE__*/React.createElement("small", null, salePerTokenValue, " per token")))), /*#__PURE__*/React.createElement("div", {
      className: "CardAction"
    }, /*#__PURE__*/React.createElement(ChevronRight, null))), /*#__PURE__*/React.createElement("div", {
      className: ["Card", paymentState == 'initialized' ? '' : 'disabled'].join(' '),
      title: paymentState == 'initialized' ? "Change payment" : undefined,
      onClick: function onClick() {
        if (paymentState != 'initialized') {
          return;
        }

        navigate('ChangePayment');
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardImage",
      title: payment.name
    }, /*#__PURE__*/React.createElement(TokenImage, {
      blockchain: payment.route.blockchain,
      address: payment.token
    })), /*#__PURE__*/React.createElement("div", {
      className: "CardBody"
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardBodyWrapper"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "CardTitle"
    }, "Payment"), /*#__PURE__*/React.createElement("h2", {
      className: "CardText"
    }, /*#__PURE__*/React.createElement("div", {
      className: "TokenAmountRow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "TokenSymbolCell"
    }, payment.symbol), /*#__PURE__*/React.createElement("span", null, "\xA0"), /*#__PURE__*/React.createElement("span", {
      className: "TokenAmountCell"
    }, format(payment.amount)))))), /*#__PURE__*/React.createElement("div", {
      className: "CardAction"
    }, /*#__PURE__*/React.createElement(ChevronRight, null)))),
    footer: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingRightM PaddingLeftM PaddingBottomM"
    }, /*#__PURE__*/React.createElement(Footer, null))
  });
});

var SaleStack = (function (props) {
  var _useContext = useContext(ClosableContext),
      open = _useContext.open,
      close = _useContext.close;

  var _useContext2 = useContext(NavigateContext),
      setNavigator = _useContext2.setNavigator;

  return /*#__PURE__*/React.createElement(ReactDialogStack, {
    setNavigator: setNavigator,
    open: open,
    close: close,
    start: "SaleOverview",
    container: props.container,
    document: props.document,
    dialogs: {
      SaleOverview: /*#__PURE__*/React.createElement(SaleOverviewDialog, null),
      ChangeAmount: /*#__PURE__*/React.createElement(ChangeAmountDialog, null),
      ChangePayment: /*#__PURE__*/React.createElement(ChangePaymentDialog, null),
      NoPaymentMethodFound: /*#__PURE__*/React.createElement(NoPaymentMethodFoundDialog, null),
      PaymentFailed: /*#__PURE__*/React.createElement(PaymentFailedDialog, null),
      WrongNetwork: /*#__PURE__*/React.createElement(WrongNetworkDialog, null)
    }
  });
});

var preflight = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_ref) {
    var sell;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sell = _ref.sell;

            if (!(_typeof(sell) != 'object')) {
              _context.next = 3;
              break;
            }

            throw 'You need to configure at least 1 "blockchain": "token"';

          case 3:
            if (!(Object.keys(sell).length == 0)) {
              _context.next = 5;
              break;
            }

            throw 'You need to configure at least 1 "blockchain": "token"';

          case 5:
            if (!(Object.values(sell).length == 0)) {
              _context.next = 7;
              break;
            }

            throw 'You need to configure at least 1 "blockchain": "token"';

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function preflight(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var Sale = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(_ref3) {
    var amount, sell, sent, succeeded, failed, error, critical, style, blacklist, providers, currency, connected, closed, tokenImage, closable, integration, wallet, document, accept, unmount;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            amount = _ref3.amount, sell = _ref3.sell, sent = _ref3.sent, succeeded = _ref3.succeeded, failed = _ref3.failed, error = _ref3.error, critical = _ref3.critical, style = _ref3.style, blacklist = _ref3.blacklist, providers = _ref3.providers, currency = _ref3.currency, connected = _ref3.connected, closed = _ref3.closed, tokenImage = _ref3.tokenImage, closable = _ref3.closable, integration = _ref3.integration, wallet = _ref3.wallet, document = _ref3.document;
            requireReactVersion();
            _context2.prev = 2;
            _context2.next = 5;
            return preflight({
              sell: sell
            });

          case 5:
            accept = Object.keys(sell).map(function (key) {
              return {
                blockchain: key,
                token: sell[key]
              };
            });
            unmount = mount({
              style: style,
              document: ensureDocument(document),
              closed: closed
            }, function (unmount) {
              return function (container) {
                return /*#__PURE__*/React.createElement(ErrorProvider, {
                  errorCallback: error,
                  container: container,
                  unmount: unmount
                }, /*#__PURE__*/React.createElement(ConfigurationProvider, {
                  configuration: {
                    type: 'sale',
                    tokenImage: tokenImage,
                    amount: amount,
                    sell: sell,
                    currency: currency,
                    sent: sent,
                    succeeded: succeeded,
                    failed: failed,
                    blacklist: blacklist,
                    providers: providers,
                    integration: integration,
                    wallet: wallet
                  }
                }, /*#__PURE__*/React.createElement(UpdatableProvider, null, /*#__PURE__*/React.createElement(ClosableProvider, {
                  unmount: unmount,
                  closable: closable
                }, /*#__PURE__*/React.createElement(WalletProvider, {
                  container: container,
                  connected: connected,
                  unmount: unmount
                }, /*#__PURE__*/React.createElement(NavigateProvider, null, /*#__PURE__*/React.createElement(ConversionRateProvider, null, /*#__PURE__*/React.createElement(ChangableAmountProvider, {
                  accept: accept
                }, /*#__PURE__*/React.createElement(TransactionTrackingProvider, null, /*#__PURE__*/React.createElement(PaymentTrackingProvider, {
                  document: ensureDocument(document)
                }, /*#__PURE__*/React.createElement(SaleRoutingProvider, {
                  container: container,
                  document: document
                }, /*#__PURE__*/React.createElement(SaleStack, {
                  document: document,
                  container: container
                }), /*#__PURE__*/React.createElement(PoweredBy, null))))))))))));
              };
            });
            return _context2.abrupt("return", {
              unmount: unmount
            });

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);
            console.log('critical error', _context2.t0);

            if (critical != undefined) {
              critical(_context2.t0);
            }

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 10]]);
  }));

  return function Sale(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

function addressEllipsis (address) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

  if (address === undefined) {
    return address;
  }

  var _address = "";
  _address += address.slice(0, length + 2);
  _address += '...';
  _address += address.slice(address.length - length, address.length);
  return _address;
}

var msToTime = (function (ms) {
  var year, month, day, hour, minute, second;
  second = Math.floor(ms / 1000);
  minute = Math.floor(second / 60);
  second = second % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  day = Math.floor(hour / 24);
  hour = hour % 24;
  month = Math.floor(day / 30);
  day = day % 30;
  year = Math.floor(month / 12);
  month = month % 12;
  return {
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
    second: second
  };
});

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var ConfirmNFTSelectionDialog = (function (props) {
  var _selection$nft, _selection$blockchain;

  var _useContext = useContext(SelectionContext),
      selection = _useContext.selection;
      _useContext.setSelection;

  var _useContext2 = useContext(ClosableContext),
      setOpen = _useContext2.setOpen;

  var _useContext3 = useContext(NavigateStackContext),
      navigate = _useContext3.navigate;

  var age, holders;

  if (selection.nft.createdAt) {
    age = msToTime(new Date() - new Date(selection.nft.createdAt));
    age = [age.year && age.year >= 1 ? age.year >= 2 ? "".concat(age.year, " years") : "1 year" : undefined, age.month && age.month >= 1 ? age.month >= 2 ? "".concat(age.month, " months") : "1 month" : undefined, age.day && age.day >= 1 && age.month <= 1 && age.year < 1 ? age.day >= 2 ? "".concat(age.day, " days !!!") : "1 day !!!" : undefined].filter(function (n) {
      return n;
    }).join(' ');
  }

  if (selection.nft.holders) {
    if (selection.nft.holders > 1000000) {
      holders = "Millions";
    } else if (selection.nft.holders > 100000) {
      holders = "Hundreds of Thousands";
    } else if (selection.nft.holders > 2000) {
      holders = "Thousands";
    } else if (selection.nft.holders > 100) {
      holders = "Hundreds";
    } else {
      holders = "Only a Few!!!";
    }
  }

  var blockchain = ((_selection$nft = selection.nft) === null || _selection$nft === void 0 ? void 0 : _selection$nft.blockchain) || ((_selection$blockchain = selection.blockchain) === null || _selection$blockchain === void 0 ? void 0 : _selection$blockchain.name);

  if (blockchain == undefined) {
    navigate('SelectBlockchain');
    return null;
  }

  var onClickConfirm = function onClickConfirm() {
    setOpen(false);
    props.resolve(_objectSpread$1(_objectSpread$1({}, selection.nft), {}, {
      blockchain: blockchain
    }));
    setTimeout(props.unmount, 300);
  };

  return /*#__PURE__*/React.createElement(Dialog$1, {
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL FontSizeL"
    }, "Confirm Selection"))),
    stacked: true,
    body: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM"
    }, /*#__PURE__*/React.createElement("div", {
      className: "TokenImage medium TextCenter"
    }, selection.nft.image && /*#__PURE__*/React.createElement("img", {
      src: selection.nft.image
    })), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS TextCenter"
    }, /*#__PURE__*/React.createElement("div", {
      className: "Alert FontSizeS"
    }, /*#__PURE__*/React.createElement("strong", null, "Please review this information"))), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS"
    }, /*#__PURE__*/React.createElement("table", {
      className: "Table TextLeft FontSizeS"
    }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "TableSubTitle"
    }, "Address")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
      className: "Link",
      title: selection.nft.address,
      href: Blockchains.findByName(blockchain).explorerUrlFor({
        token: selection.nft.address
      }),
      target: "_blank",
      rel: "noopener noreferrer"
    }, addressEllipsis(selection.nft.address, 6))))), selection.nft.id && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "TableSubTitle"
    }, "Token ID")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", null, selection.nft.id))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "TableSubTitle"
    }, "Blockchain")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", null, Blockchains.findByName(blockchain).label))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "TableSubTitle"
    }, "Name")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
      className: "Link",
      href: selection.nft.link,
      target: "_blank",
      rel: "noopener noreferrer"
    }, selection.nft.name))), age && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "TableSubTitle"
    }, "Age")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", null, age))), holders && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "TableSubTitle"
    }, "Holders")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", null, holders))))))),
    footer: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingRightM PaddingLeftM PaddingBottomS"
    }, /*#__PURE__*/React.createElement("button", {
      className: "ButtonPrimary",
      onClick: onClickConfirm
    }, "Confirm"))
  });
});

var OpenSea = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjMuMjUwODg5bW0iIGhlaWdodD0iNjMuMjUwODg5bW0iIHZpZXdCb3g9IjAgMCA2My4yNTA4ODYgNjMuMjUwODg4Ij4KICA8ZyBmaWxsPSJub25lIiB0cmFuc2Zvcm09InNjYWxlKC42MzI1KSI+CiAgICA8cGF0aCBmaWxsPSIjMjA4MWUyIiBkPSJNMTAwIDUwYzAgMjcuNjEyNy0yMi4zODczIDUwLTUwIDUwUzAgNzcuNjEyNyAwIDUwIDIyLjM4NzMgMCA1MCAwYzI3LjYxODUgMCA1MCAyMi4zODczIDUwIDUweiIvPgogICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0ibTI0LjY2NzkgNTEuNjgwMS4yMTU3LS4zMzkxIDEzLjAwNy0yMC4zNDc4Yy4xOTAxLS4yOTc5LjYzNy0uMjY3MS43ODA4LjA1NjUgMi4xNzMgNC44Njk5IDQuMDQ4IDEwLjkyNjUgMy4xNjk2IDE0LjY5NzEtLjM3NSAxLjU1MTQtMS40MDI0IDMuNjUyNC0yLjU1ODMgNS41OTQyLS4xNDg5LjI4MjYtLjMxMzMuNTYtLjQ4OC44MjcxLS4wODIyLjEyMzMtLjIyMDkuMTk1Mi0uMzY5OS4xOTUySDI1LjA0OGMtLjM1OTYgMC0uNTcwMi0uMzkwNC0uMzgwMS0uNjgzMnoiLz4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik04Mi42NDQ0IDU1LjQ2MXYzLjIyMDljMCAuMTg0OS0uMTEzLjM0OTMtLjI3NzQuNDIxMi0xLjAwNjguNDMxNS00LjQ1MzggMi4wMTM3LTUuODg3IDQuMDA2OS0zLjY1NzYgNS4wOTA4LTYuNDUyMSAxMi4zNy0xMi42OTg4IDEyLjM3SDM3LjcyMUMyOC40ODQ3IDc1LjQ4IDIxIDY3Ljk2OTcgMjEgNTguNzAyNHYtLjI5NzljMC0uMjQ2Ni4yMDAzLS40NDY5LjQ0NjktLjQ0NjloMTQuNTI3NmMuMjg3NiAwIC40OTgyLjI2NzEuNDcyNi41NDk2LS4xMDI4Ljk0NTIuMDcxOSAxLjkxMS41MTg4IDIuNzg5NC44NjMgMS43NTE4IDIuNjUwNyAyLjg0NiA0LjU4MjIgMi44NDZINDguNzR2LTUuNjE0OGgtNy4xMDk3Yy0uMzY0NyAwLS41ODA0LS40MjEzLS4zNjk4LS43MTkyLjA3Ny0uMTE4Mi4xNjQ0LS4yNDE0LjI1NjgtLjM4MDEuNjczLS45NTU1IDEuNjMzNi0yLjQ0MDEgMi41ODkxLTQuMTMwMi42NTI0LTEuMTQwNCAxLjI4NDItMi4zNTc5IDEuNzkyOC0zLjU4MDUuMTAyOC0uMjIwOS4xODQ5LS40NDcuMjY3MS0uNjY3OS4xMzg3LS4zOTA0LjI4MjYtLjc1NTEuMzg1My0xLjExOTguMTAyOC0uMzA4My4xODQ5LS42MzE5LjI2NzEtLjkzNS4yNDE1LTEuMDM3Ny4zNDQyLTIuMTM3LjM0NDItMy4yNzc0IDAtLjQ0NjktLjAyMDUtLjkxNDQtLjA2MTYtMS4zNjEzLS4wMjA2LS40ODgtLjA4MjItLjk3NjEtLjE0MzktMS40NjQxLS4wNDExLS40MzE1LS4xMTgxLS44NTc5LS4yMDAzLTEuMzA0OC0uMTAyNy0uNjUyNC0uMjQ2Ni0xLjI5OTYtLjQxMS0xLjk1MjFsLS4wNTY1LS4yNDY1Yy0uMTIzMy0uNDQ3LS4yMjYtLjg3MzMtLjM2OTgtMS4zMjAyLS40MDU5LTEuNDAyNS0uODczMy0yLjc2ODktMS4zNjY1LTQuMDQ4LS4xNzk4LS41MDg2LS4zODUzLS45OTY2LS41OTA4LTEuNDg0Ni0uMzAzLS43MzQ2LS42MTEzLTEuNDAyNC0uODkzOC0yLjAzNDMtLjE0MzgtLjI4NzctLjI2NzEtLjU0OTctLjM5MDQtLjgxNjgtLjEzODctLjMwMzEtLjI4MjUtLjYwNjItLjQyNjQtLjg5MzgtLjEwMjctLjIyMDktLjIyMDktLjQyNjQtLjMwMzEtLjYzMTlsLS44Nzg0LTEuNjIzM2MtLjEyMzMtLjIyMDkuMDgyMi0uNDgyOS4zMjM2LS40MTYxbDUuNDk2NyAxLjQ4OTdoLjAxNTRjLjAxMDIgMCAuMDE1NC4wMDUyLjAyMDUuMDA1MmwuNzI0My4yMDAzLjc5NjMuMjI2MS4yOTI4LjA4MjF2LTMuMjY3MUM0OC43NCAyMS4yNzkxIDUwLjAwMzcgMjAgNTEuNTY1NCAyMGMuNzgwOCAwIDEuNDg5Ny4zMTg1IDEuOTk4My44MzczLjUwODUuNTE4OS44MjcgMS4yMjc4LjgyNyAyLjAxODl2NC44NDk0bC41ODU3LjE2NDNjLjA0NjIuMDE1NS4wOTI0LjAzNi4xMzM1LjA2NjguMTQzOS4xMDc5LjM0OTMuMjY3MS42MTEzLjQ2MjQuMjA1NS4xNjQzLjQyNjQuMzY0Ny42OTM1LjU3MDIuNTI5MS40MjYzIDEuMTYxLjk3NiAxLjg1NDUgMS42MDc5LjE4NDkuMTU5Mi4zNjQ3LjMyMzYuNTI5MS40ODguODkzOS44MzIyIDEuODk1NiAxLjgwODIgMi44NTExIDIuODg3LjI2NzEuMzAzMS41MjkxLjYxMTMuNzk2Mi45MzQ5LjI2NzEuMzI4OC41NDk3LjY1MjQuNzk2Mi45NzYxLjMyMzcuNDMxNS42NzMuODc4NC45NzYxIDEuMzQ1OS4xNDM4LjIyMDkuMzA4Mi40NDY5LjQ0NjkuNjY3OC4zOTA0LjU5MDcuNzM0NiAxLjIwMjEgMS4wNjM0IDEuODEzNC4xMzg3LjI4MjUuMjgyNS41OTA3LjQwNTguODkzOC4zNjQ3LjgxNjguNjUyNCAxLjY0OS44MzczIDIuNDgxMi4wNTY1LjE3OTguMDk3Ni4zNzUuMTE4Mi41NDk3di4wNDExYy4wNjE2LjI0NjUuMDgyMi41MDg1LjEwMjcuNzc1Ni4wODIyLjg1MjguMDQxMSAxLjcwNTUtLjE0MzggMi41NjM0LS4wNzcxLjM2NDgtLjE3OTguNzA4OS0uMzAzMSAxLjA3MzctLjEyMzMuMzQ5My0uMjQ2Ni43MTQtLjQwNTggMS4wNTgyLS4zMDgyLjcxNC0uNjczIDEuNDI4MS0xLjEwNDUgMi4wOTU5LS4xMzg3LjI0NjYtLjMwMzEuNTA4Ni0uNDY3NS43NTUyLS4xNzk4LjI2MTktLjM2NDcuNTA4NS0uNTI5MS43NS0uMjI2LjMwODItLjQ2NzQuNjMxOC0uNzE0LjkxOTUtLjIyMDkuMzAzMS0uNDQ2OS42MDYyLS42OTM1Ljg3MzMtLjM0NDIuNDA1OC0uNjczLjc5MTEtMS4wMTcyIDEuMTYxLS4yMDU0LjI0MTQtLjQyNjMuNDg4LS42NTI0LjcwODktLjIyMDguMjQ2NS0uNDQ2OS40Njc0LS42NTI0LjY3MjktLjM0NDEuMzQ0Mi0uNjMxOC42MTEzLS44NzMzLjgzMjJsLS41NjUuNTE4OWMtLjA4MjIuMDcxOS0uMTkwMS4xMTMtLjMwMzEuMTEzaC00LjM3Njh2NS42MTQ4aDUuNTA2OWMxLjIzMjkgMCAyLjQwNDItLjQzNjcgMy4zNDk0LTEuMjM4MS4zMjM2LS4yODI1IDEuNzM2My0xLjUwNTEgMy40MDU4LTMuMzQ5My4wNTY1LS4wNjE3LjEyODUtLjEwNzkuMjEwNy0uMTI4NGwxNS4yMTA3LTQuMzk3M2MuMjgyNi0uMDgyMi41NzAyLjEzMzUuNTcwMi40MzE1eiIvPgogIDwvZz4KPC9zdmc+';

var EnterNFTDataForOpenSeaDialog = (function (props) {
  var _Blockchains$findByNa, _selection$blockchain3, _selection$collection3, _Blockchains$findByNa2, _selection$blockchain4, _selection$collection4;

  var _useContext = useContext(NavigateStackContext),
      navigate = _useContext.navigate;

  var _useContext2 = useContext(SelectionContext),
      selection = _useContext2.selection,
      setSelection = _useContext2.setSelection;

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      id = _useState2[0],
      setId = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      image = _useState4[0],
      setImage = _useState4[1];

  var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      link = _useState6[0],
      setLink = _useState6[1];

  var _useState7 = useState(''),
      _useState8 = _slicedToArray(_useState7, 2),
      name = _useState8[0],
      setName = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      idRequired = _useState10[0],
      setIdRequired = _useState10[1];

  var confirm = function confirm() {
    var _selection$blockchain, _selection$collection;

    var blockchain = (selection === null || selection === void 0 ? void 0 : (_selection$blockchain = selection.blockchain) === null || _selection$blockchain === void 0 ? void 0 : _selection$blockchain.name) || (selection === null || selection === void 0 ? void 0 : selection.blockchain) || (selection === null || selection === void 0 ? void 0 : (_selection$collection = selection.collection) === null || _selection$collection === void 0 ? void 0 : _selection$collection.blockchain);
    setSelection(Object.assign(props.selection, {
      nft: {
        blockchain: blockchain,
        id: id,
        image: image,
        name: name,
        link: link,
        address: selection.nft.address,
        type: idRequired ? '1155' : '721'
      }
    }));
    navigate('ConfirmNFTSelection');
  };

  useEffect(function () {
    var _selection$blockchain2, _selection$collection2;

    var blockchain = (selection === null || selection === void 0 ? void 0 : (_selection$blockchain2 = selection.blockchain) === null || _selection$blockchain2 === void 0 ? void 0 : _selection$blockchain2.name) || (selection === null || selection === void 0 ? void 0 : selection.blockchain) || (selection === null || selection === void 0 ? void 0 : (_selection$collection2 = selection.collection) === null || _selection$collection2 === void 0 ? void 0 : _selection$collection2.blockchain);

    var checkForIdRequired = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        var balanceWithId;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!blockchain) {
                  _context.next = 10;
                  break;
                }

                _context.prev = 1;
                _context.next = 4;
                return request({
                  blockchain: blockchain,
                  address: selection.nft.address,
                  method: 'balanceOf',
                  api: Token[blockchain][1155],
                  params: ['0x4e260bB2b25EC6F3A59B478fCDe5eD5B8D783B02', '1']
                });

              case 4:
                balanceWithId = _context.sent;
                _context.next = 9;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);

              case 9:
                if (balanceWithId) {
                  setIdRequired(true);
                }

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 7]]);
      }));

      return function checkForIdRequired() {
        return _ref.apply(this, arguments);
      };
    }();

    checkForIdRequired();
  }, [selection.blockchain]);
  return /*#__PURE__*/React.createElement(Dialog$1, {
    stacked: true,
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "LineHeightL FontSizeL PaddingTopXS"
    }, /*#__PURE__*/React.createElement("span", {
      className: "CardImage small"
    }, /*#__PURE__*/React.createElement("img", {
      className: "transparent",
      src: OpenSea
    }))))),
    body: /*#__PURE__*/React.createElement("div", {
      className: "PaddingLeftM PaddingRightM"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS TextLeft"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "DePayWidgetsEnterNFTBlockchain"
    }, /*#__PURE__*/React.createElement("span", {
      className: "FontSizeM Opacity05"
    }, "Select Blockchain"))), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingBottomS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "Card small",
      onClick: function onClick() {
        return navigate('SelectBlockchain');
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardImage small"
    }, /*#__PURE__*/React.createElement("img", {
      className: "transparent",
      src: (_Blockchains$findByNa = Blockchains.findByName((selection === null || selection === void 0 ? void 0 : (_selection$blockchain3 = selection.blockchain) === null || _selection$blockchain3 === void 0 ? void 0 : _selection$blockchain3.name) || (selection === null || selection === void 0 ? void 0 : selection.blockchain) || (selection === null || selection === void 0 ? void 0 : (_selection$collection3 = selection.collection) === null || _selection$collection3 === void 0 ? void 0 : _selection$collection3.blockchain))) === null || _Blockchains$findByNa === void 0 ? void 0 : _Blockchains$findByNa.logo
    })), /*#__PURE__*/React.createElement("div", {
      className: "CardBody FontSizeM"
    }, (_Blockchains$findByNa2 = Blockchains.findByName((selection === null || selection === void 0 ? void 0 : (_selection$blockchain4 = selection.blockchain) === null || _selection$blockchain4 === void 0 ? void 0 : _selection$blockchain4.name) || (selection === null || selection === void 0 ? void 0 : selection.blockchain) || (selection === null || selection === void 0 ? void 0 : (_selection$collection4 = selection.collection) === null || _selection$collection4 === void 0 ? void 0 : _selection$collection4.blockchain))) === null || _Blockchains$findByNa2 === void 0 ? void 0 : _Blockchains$findByNa2.label), /*#__PURE__*/React.createElement("div", {
      className: "CardAction"
    }, /*#__PURE__*/React.createElement(ChevronRight, null))))), idRequired && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS TextLeft"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "DePayWidgetsEnterNFTTokenId"
    }, /*#__PURE__*/React.createElement("span", {
      className: "FontSizeM Opacity05"
    }, "Enter Token ID"))), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingBottomS TextLeft"
    }, /*#__PURE__*/React.createElement("input", {
      id: "DePayWidgetsEnterNFTTokenId",
      name: "DePayWidgetsEnterNFTTokenId",
      value: id,
      onChange: function onChange(event) {
        return setId(event.target.value);
      },
      className: "Search"
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS TextLeft"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "DePayWidgetsEnterNFTName"
    }, /*#__PURE__*/React.createElement("span", {
      className: "FontSizeM Opacity05"
    }, "Enter NFT Name"))), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingBottomS TextLeft"
    }, /*#__PURE__*/React.createElement("input", {
      id: "DePayWidgetsEnterNFTName",
      name: "DePayWidgetsEnterNFTName",
      value: name,
      onChange: function onChange(event) {
        return setName(event.target.value);
      },
      placeholder: "CryptoPunks",
      className: "Search"
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS TextLeft"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "DePayWidgetsEnterNFTImage"
    }, /*#__PURE__*/React.createElement("span", {
      className: "FontSizeM Opacity05"
    }, "Enter Image URL"))), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingBottomS TextLeft"
    }, /*#__PURE__*/React.createElement("input", {
      id: "DePayWidgetsEnterNFTImage",
      name: "DePayWidgetsEnterNFTImage",
      value: image,
      onChange: function onChange(event) {
        return setImage(event.target.value);
      },
      placeholder: "https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?auto=format&w=128",
      className: "Search"
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS TextLeft"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "DePayWidgetsEnterNFTLink"
    }, /*#__PURE__*/React.createElement("span", {
      className: "FontSizeM Opacity05"
    }, "Enter Link URL"))), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingBottomS TextLeft"
    }, /*#__PURE__*/React.createElement("input", {
      id: "DePayWidgetsEnterNFTLink",
      name: "DePayWidgetsEnterNFTLink",
      value: link,
      onChange: function onChange(event) {
        return setLink(event.target.value);
      },
      placeholder: "https://opensea.io/collection/cryptopunks",
      className: "Search"
    })))),
    footer: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingRightM PaddingLeftM PaddingBottomM"
    }, /*#__PURE__*/React.createElement("button", {
      className: ['ButtonPrimary', !image.length || !link.length || !name.length || idRequired && !id.length ? 'disabled' : ''].join(' '),
      onClick: function onClick() {
        if (!image.length || !link.length || !name.length || idRequired && !id.length) {
          return;
        }

        confirm();
      }
    }, "Continue"))
  });
});

var BLOCKCHAIN_NAMES$1 = {
  'ethereum': 'ethereum',
  'matic': 'polygon,'
};
var SelectNFTContractOnOpenSeaDialog = (function (props) {
  var _useContext = useContext(NavigateStackContext),
      navigate = _useContext.navigate;

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      searchTerm = _useState2[0],
      setSearchTerm = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      searchResults = _useState6[0],
      setSearchResults = _useState6[1];

  var _useContext2 = useContext(SelectionContext),
      setSelection = _useContext2.setSelection;

  var select = function select(nft) {
    setSelection(Object.assign(props.selection, {
      nft: nft
    }));
    navigate('ConfirmNFTSelection');
  };

  var dataForCollectionViaAsset = function dataForCollectionViaAsset(address) {
    return new Promise(function (resolve, reject) {
      fetch("https://api.opensea.io/api/v1/assets?asset_contract_address=".concat(address)).then(function (response) {
        if (response.status != 200) {
          return resolve();
        }

        response.json().then(function (data) {
          return resolve(data.assets ? data.assets[0] : undefined);
        })["catch"](function () {
          return resolve();
        });
      })["catch"](function () {
        return resolve();
      });
    });
  };

  var searchContract = useCallback(lodash.debounce(function (address) {
    fetch("https://api.opensea.io/api/v1/asset_contract/".concat(address)).then(function (response) {
      if (response.status != 200) {
        setLoading(false);
        return;
      }

      response.json().then( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(data) {
          var result, blockchain, holders, additionalData, _additionalData$colle, _additionalData$colle2, _additionalData$colle3, _additionalData$colle4, _additionalData, _blockchain;

          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(data.asset_contract_type == 'non-fungible')) {
                    _context.next = 8;
                    break;
                  }

                  _context.next = 3;
                  return dataForCollectionViaAsset(address);

                case 3:
                  additionalData = _context.sent;

                  if (additionalData) {
                    blockchain = additionalData !== null && additionalData !== void 0 && additionalData.permalink.match(/https:\/\/opensea\.io\/assets\/(\w*)\//) ? BLOCKCHAIN_NAMES$1[additionalData.permalink.match(/https:\/\/opensea\.io\/assets\/(\w*)\//)[1]] : undefined;
                    holders = additionalData === null || additionalData === void 0 ? void 0 : (_additionalData$colle = additionalData.collection) === null || _additionalData$colle === void 0 ? void 0 : (_additionalData$colle2 = _additionalData$colle.stats) === null || _additionalData$colle2 === void 0 ? void 0 : _additionalData$colle2.num_owners;
                  }

                  result = {
                    blockchain: blockchain,
                    holders: holders,
                    createdAt: data.created_date,
                    image: data.image_url,
                    name: data.collection ? data.collection.name : undefined,
                    link: data.collection ? "https://opensea.io/collection/".concat(data.collection.slug) : undefined,
                    address: ethers.utils.getAddress(data.address),
                    type: '721'
                  };
                  _context.next = 22;
                  break;

                case 8:
                  if (!(data.asset_contract_type == 'semi-fungible')) {
                    _context.next = 21;
                    break;
                  }

                  if (!(data.symbol == 'OPENSTORE' && data.name == 'OpenSea Collection')) {
                    _context.next = 13;
                    break;
                  }

                  result = {
                    id: null,
                    address: ethers.utils.getAddress(data.address),
                    type: '1155'
                  };
                  _context.next = 19;
                  break;

                case 13:
                  _context.next = 15;
                  return dataForCollectionViaAsset(address);

                case 15:
                  _additionalData = _context.sent;
                  _blockchain = _additionalData !== null && _additionalData !== void 0 && _additionalData.permalink.match(/https:\/\/opensea\.io\/assets\/(\w*)\//) ? BLOCKCHAIN_NAMES$1[_additionalData.permalink.match(/https:\/\/opensea\.io\/assets\/(\w*)\//)[1]] : undefined;
                  _additionalData === null || _additionalData === void 0 ? void 0 : (_additionalData$colle3 = _additionalData.collection) === null || _additionalData$colle3 === void 0 ? void 0 : (_additionalData$colle4 = _additionalData$colle3.stats) === null || _additionalData$colle4 === void 0 ? void 0 : _additionalData$colle4.num_owners;
                  result = {
                    blockchain: _blockchain,
                    id: null,
                    createdAt: data.created_date,
                    image: data.image_url,
                    name: data.collection ? data.collection.name : undefined,
                    link: data.collection ? "https://opensea.io/collection/".concat(data.collection.slug) : undefined,
                    address: ethers.utils.getAddress(data.address),
                    type: '1155'
                  };

                case 19:
                  _context.next = 22;
                  break;

                case 21:
                  // like matic/polygon (which is not yet supported by opensea apis)
                  if (data.address) {
                    result = {
                      address: ethers.utils.getAddress(data.address)
                    };
                  }

                case 22:
                  if (result) {
                    if (result.type == undefined) {
                      setSelection(Object.assign(props.selection, {
                        nft: result,
                        blockchain: result.blockchain || 'polygon'
                      }));
                      navigate('EnterNFTDataForOpenSea');
                      setSearchTerm('');
                    } else if (result.id !== null) {
                      select(result);
                      setSearchResults([result]);
                      navigate('ConfirmNFTSelection');
                    } else {
                      setSelection(Object.assign(props.selection, {
                        nft: result
                      }));
                      navigate('SelectNFTIdOnOpenSea');
                      setSearchTerm('');
                    }
                  }

                  setLoading(false);

                case 24:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }())["catch"](function () {
        setLoading(false);
      });
    })["catch"](function () {
      setLoading(false);
    });
  }, 500), []);

  var onChangeTermSearch = function onChangeTermSearch(event) {
    setLoading(true);
    setSearchResults([]);
    var term = event.target.value;
    setSearchTerm(term);

    if (term && term.length) {
      searchContract(term);
    } else {
      setLoading(false);
    }
  };

  var elements;

  if (loading) {
    elements = [/*#__PURE__*/React.createElement("div", {
      className: "SkeletonWrapper",
      key: 'loading'
    }, /*#__PURE__*/React.createElement("div", {
      className: "Skeleton",
      style: {
        height: '69px',
        width: '100%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "SkeletonBackground"
    })))];
  } else {
    elements = searchResults.map(function (result, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: "Card Row",
        onClick: function onClick() {
          return select(result);
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardImage"
      }, /*#__PURE__*/React.createElement("img", {
        src: result.image
      })), /*#__PURE__*/React.createElement("div", {
        className: "CardBody"
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardTokenFullName",
        title: result.name
      }, /*#__PURE__*/React.createElement("span", {
        className: "CardText"
      }, result.name))));
    });
  }

  return /*#__PURE__*/React.createElement(Dialog$1, {
    stacked: true,
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "LineHeightL FontSizeL PaddingTopXS"
    }, /*#__PURE__*/React.createElement("span", {
      className: "CardImage small"
    }, /*#__PURE__*/React.createElement("img", {
      className: "transparent",
      src: OpenSea
    })))), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingBottomXS TextLeft"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "DePayWidgetsEnterContractAddress"
    }, /*#__PURE__*/React.createElement("span", {
      className: "FontSizeM Opacity05"
    }, "Enter contract address"))), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingBottomS TextLeft"
    }, /*#__PURE__*/React.createElement("input", {
      id: "DePayWidgetsEnterContractAddress",
      name: "DePayWidgetsEnterContractAddress",
      value: searchTerm,
      onChange: onChangeTermSearch,
      className: "Search",
      autoFocus: true,
      placeholder: "0x495f947276749ce646f68ac8c248420045cb7b5e"
    }))),
    bodyClassName: "ScrollHeight",
    body: /*#__PURE__*/React.createElement("div", null, elements)
  });
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var BLOCKCHAIN_NAMES = {
  'ethereum': 'ethereum',
  'matic': 'polygon,'
};
var SelectNFTIdOnOpenSeaDialog = (function (props) {
  var _useContext = useContext(NavigateStackContext),
      navigate = _useContext.navigate;

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      searchTerm = _useState2[0],
      setSearchTerm = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      searchResults = _useState6[0],
      setSearchResults = _useState6[1];

  var _useContext2 = useContext(SelectionContext),
      selection = _useContext2.selection,
      setSelection = _useContext2.setSelection;

  var select = function select(nft) {
    setSelection(Object.assign(props.selection, {
      nft: nft
    }));
    navigate('ConfirmNFTSelection');
  };

  var searchForCollectionById = useCallback(lodash.debounce(function (id) {
    fetch("https://api.opensea.io/api/v1/asset/".concat(selection.nft.address, "/").concat(id)).then(function (response) {
      if (response.status != 200) {
        return resolve();
      }

      response.json().then( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(data) {
          var blockchain, result;
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  blockchain = data !== null && data !== void 0 && data.permalink.match(/https:\/\/opensea\.io\/assets\/(\w*)\//) ? BLOCKCHAIN_NAMES[data.permalink.match(/https:\/\/opensea\.io\/assets\/(\w*)\//)[1]] : undefined;
                  result = _objectSpread(_objectSpread({}, selection.nft), {}, {
                    blockchain: blockchain,
                    id: data.token_id,
                    image: data.image_url,
                    name: data.name,
                    link: data.permalink
                  });
                  setSearchResults([result]);
                  select(result);
                  setLoading(false);

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }())["catch"](function () {
        setLoading(false);
      });
    })["catch"](function () {
      setLoading(false);
    });
  }, 500), []);

  var onChangeTermSearch = function onChangeTermSearch(event) {
    setLoading(true);
    setSearchResults([]);
    var term = event.target.value;
    setSearchTerm(term);

    if (term && term.length) {
      searchForCollectionById(term);
    } else {
      setLoading(false);
    }
  };

  useEffect(function () {
    fetch("https://api.opensea.io/api/v1/assets?asset_contract_address=".concat(selection.nft.address)).then(function (response) {
      if (response.status != 200) {
        return resolve();
      }

      response.json().then(function (data) {
        if (data.assets.length <= 6) {
          var results = data.assets.map(function (data) {
            var blockchain = data !== null && data !== void 0 && data.permalink.match(/https:\/\/opensea\.io\/assets\/(\w*)\//) ? BLOCKCHAIN_NAMES[data.permalink.match(/https:\/\/opensea\.io\/assets\/(\w*)\//)[1]] : undefined;
            return _objectSpread(_objectSpread({}, selection.nft), {}, {
              blockchain: blockchain,
              id: data.token_id,
              image: data.image_url,
              name: data.name,
              link: data.permalink
            });
          });
          setSearchResults(results);

          if (results.length == 1) {
            select(results[0]);
          }
        }
      });
    });
  }, []);
  var elements;

  if (loading) {
    elements = [/*#__PURE__*/React.createElement("div", {
      className: "SkeletonWrapper",
      key: 'loading'
    }, /*#__PURE__*/React.createElement("div", {
      className: "Skeleton",
      style: {
        height: '69px',
        width: '100%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "SkeletonBackground"
    })))];
  } else {
    elements = searchResults.map(function (result, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: "Card Row",
        onClick: function onClick() {
          return select(result);
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardImage"
      }, /*#__PURE__*/React.createElement("img", {
        src: result.image
      })), /*#__PURE__*/React.createElement("div", {
        className: "CardBody"
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardTokenFullName",
        title: result.name
      }, /*#__PURE__*/React.createElement("span", {
        className: "CardText"
      }, result.name))));
    });
  }

  return /*#__PURE__*/React.createElement(Dialog$1, {
    stacked: true,
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "LineHeightL FontSizeL PaddingTopXS"
    }, /*#__PURE__*/React.createElement("span", {
      className: "CardImage small"
    }, /*#__PURE__*/React.createElement("img", {
      className: "transparent",
      src: OpenSea
    })))), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingBottomXS TextLeft"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "DePayWidgetsEnterCollectionId"
    }, /*#__PURE__*/React.createElement("span", {
      className: "FontSizeM Opacity05"
    }, "Enter Token ID"))), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingBottomS TextLeft"
    }, /*#__PURE__*/React.createElement("input", {
      id: "DePayWidgetsEnterCollectionId",
      name: "DePayWidgetsEnterCollectionId",
      value: searchTerm,
      onChange: onChangeTermSearch,
      className: "Search",
      placeholder: "35347623114821255323888368639026081793120226253597860997754787918389704654849"
    }))),
    bodyClassName: "ScrollHeight",
    body: /*#__PURE__*/React.createElement("div", null, elements)
  });
});

var SelectNFTPlatformDialog = (function (props) {
  var _useContext = useContext(NavigateStackContext),
      navigate = _useContext.navigate;

  var select = function select(marketplace) {
    navigate(marketplace.navigate);
  };

  var elements = [{
    name: 'OpenSea',
    navigate: 'SelectNFTContractOnOpenSea',
    logo: OpenSea
  }].map(function (marketplace, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: "Card Row",
      onClick: function onClick() {
        return select(marketplace);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardImage"
    }, /*#__PURE__*/React.createElement("img", {
      src: marketplace.logo
    })), /*#__PURE__*/React.createElement("div", {
      className: "CardBody"
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardTokenSymbol",
      title: marketplace.name
    }, /*#__PURE__*/React.createElement("span", {
      className: "CardText"
    }, marketplace.name)), /*#__PURE__*/React.createElement("div", {
      className: "CardTokenName PaddingTopXS"
    }, /*#__PURE__*/React.createElement(ChevronRight, null))));
  });
  return /*#__PURE__*/React.createElement(Dialog$1, {
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM TextLeft"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL FontSizeL"
    }, "Select NFT")), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingBottomS"
    }, /*#__PURE__*/React.createElement("span", {
      className: "FontSizeM Opacity05"
    }, "Choose which marketplace"))),
    bodyClassName: "ScrollHeight",
    body: /*#__PURE__*/React.createElement("div", {
      className: ""
    }, elements)
  });
});

var SelectNFTStack = (function (props) {
  var _useContext = useContext(ConfigurationContext),
      what = _useContext.what;

  var _useContext2 = useContext(ClosableContext),
      open = _useContext2.open,
      close = _useContext2.close;

  var _useContext3 = useContext(SelectionContext),
      selection = _useContext3.selection;
      _useContext3.setSelection;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2);
      _useState2[0];
      var _setNavigator = _useState2[1];

  var start;

  switch (what) {
    default:
      start = 'SelectMarketplace';
  }

  return /*#__PURE__*/React.createElement(ReactDialogStack, {
    open: open,
    close: close,
    start: start,
    container: props.container,
    document: props.document,
    setNavigator: function setNavigator(navigator) {
      _setNavigator(navigator);
    },
    dialogs: {
      SelectMarketplace: /*#__PURE__*/React.createElement(SelectNFTPlatformDialog, {
        selection: selection,
        resolve: props.resolve,
        unmount: props.unmount
      }),
      SelectNFTContractOnOpenSea: /*#__PURE__*/React.createElement(SelectNFTContractOnOpenSeaDialog, {
        selection: selection,
        resolve: props.resolve,
        unmount: props.unmount
      }),
      SelectNFTIdOnOpenSea: /*#__PURE__*/React.createElement(SelectNFTIdOnOpenSeaDialog, {
        selection: selection,
        resolve: props.resolve,
        unmount: props.unmount
      }),
      EnterNFTDataForOpenSea: /*#__PURE__*/React.createElement(EnterNFTDataForOpenSeaDialog, {
        selection: selection,
        resolve: props.resolve,
        unmount: props.unmount
      }),
      SelectBlockchain: /*#__PURE__*/React.createElement(SelectBlockchainDialog, {
        selection: selection,
        stacked: true,
        resolve: props.resolve,
        unmount: props.unmount
      }),
      ConfirmNFTSelection: /*#__PURE__*/React.createElement(ConfirmNFTSelectionDialog, {
        selection: selection,
        resolve: props.resolve,
        unmount: props.unmount
      })
    }
  });
});

var ConfirmTokenSelectionDialog = (function (props) {
  var _useContext = useContext(SelectionContext),
      selection = _useContext.selection;

  var _useContext2 = useContext(ClosableContext),
      setOpen = _useContext2.setOpen;

  var token = selection.token;
  var address = token.address || token.external_id;
  var logo = token.logo || token.image;
  var blockchain = Blockchains.findByName(token.blockchain);
  var age = token.first_transfer ? msToTime(new Date() - new Date(token.first_transfer)) : undefined;

  if (age) {
    age = [age.year && age.year >= 1 ? age.year >= 2 ? "".concat(age.year, " years") : "1 year" : undefined, age.month && age.month >= 1 ? age.month >= 2 ? "".concat(age.month, " months") : "1 month" : undefined, age.day && age.day >= 1 && age.month <= 1 && age.year < 1 ? age.day >= 2 ? "".concat(age.day, " days !!!") : "1 day !!!" : undefined].filter(function (n) {
      return n;
    }).join(' ');
  }

  var holders = token.unique_senders ? token.unique_senders : undefined;

  if (holders) {
    if (holders > 1000000) {
      holders = "Millions";
    } else if (holders > 100000) {
      holders = "Hundreds of Thousands";
    } else if (holders > 2000) {
      holders = "Thousands";
    } else if (holders > 100) {
      holders = "Hundreds";
    } else {
      holders = "Only a Few!!!";
    }
  }

  var onClickConfirm = function onClickConfirm() {
    setOpen(false);
    props.resolve({
      blockchain: token.blockchain,
      address: token.external_id || token.address,
      symbol: token.symbol,
      name: token.name,
      decimals: token.decimals,
      logo: token.image || token.logo,
      routable: token.routable
    });
    setTimeout(props.unmount, 300);
  };

  return /*#__PURE__*/React.createElement(Dialog$1, {
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL FontSizeL"
    }, "Confirm Selection"))),
    stacked: true,
    body: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM"
    }, /*#__PURE__*/React.createElement("div", {
      className: "TokenImage medium TextCenter"
    }, logo && /*#__PURE__*/React.createElement("img", {
      src: logo
    }), !logo && /*#__PURE__*/React.createElement(TokenImage, {
      blockchain: token.blockchain,
      address: address
    })), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS TextCenter"
    }, /*#__PURE__*/React.createElement("div", {
      className: "Alert FontSizeS"
    }, /*#__PURE__*/React.createElement("strong", null, "Please review this information"))), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS"
    }, /*#__PURE__*/React.createElement("table", {
      className: "Table TextLeft FontSizeS"
    }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "TableSubTitle"
    }, "Address")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
      className: "Link",
      title: address,
      href: blockchain.explorerUrlFor({
        token: address
      }),
      target: "_blank",
      rel: "noopener noreferrer"
    }, addressEllipsis(address, 8))))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "TableSubTitle"
    }, "Blockchain")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", null, blockchain.label))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "TableSubTitle"
    }, "Symbol")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", null, token.symbol))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "TableSubTitle"
    }, "Name")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", null, token.name))), age && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "TableSubTitle"
    }, "Age")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", null, age))), holders && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "TableSubTitle"
    }, "Holders")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", null, holders))))))),
    footer: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingRightM PaddingLeftM PaddingBottomS"
    }, /*#__PURE__*/React.createElement("button", {
      className: "ButtonPrimary",
      onClick: onClickConfirm
    }, "Confirm"))
  });
});

var SelectTokenDialog = (function (props) {
  var _useContext = useContext(NavigateStackContext),
      navigate = _useContext.navigate;

  var _useContext2 = useContext(ClosableContext),
      setOpen = _useContext2.setOpen;

  var _useContext3 = useContext(SelectionContext),
      setSelection = _useContext3.setSelection;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      searchTerm = _useState4[0],
      setSearchTerm = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      blockchain = _useState6[0],
      setBlockchain = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      showAddToken = _useState8[0],
      setShowAddToken = _useState8[1];

  var _useState9 = useState([]),
      _useState10 = _slicedToArray(_useState9, 2),
      tokens = _useState10[0],
      setTokens = _useState10[1];

  var _useState11 = useState(),
      _useState12 = _slicedToArray(_useState11, 2);
      _useState12[0];
      _useState12[1];

  var searchElement = useRef();
  var wallet = getWallets()[0];

  var startWithBlockchain = function startWithBlockchain(name) {
    var blockchain = Blockchains.findByName(name);
    setBlockchain(blockchain);
    setSelection(Object.assign(props.selection, {
      blockchain: blockchain,
      token: undefined
    }));
    setTokens(blockchain.tokens);
  };

  useEffect(function () {
    if (wallet) {
      wallet.connectedTo().then(function (name) {
        var blockchain = Blockchains.findByName(name);

        if (window._depay_token_selection_selected_blockchain) {
          startWithBlockchain(window._depay_token_selection_selected_blockchain);
        } else if (name && name.length && blockchain && blockchain.tokens && blockchain.tokens.length) {
          startWithBlockchain(name);
        } else {
          startWithBlockchain('ethereum');
        }
      })["catch"](function () {
        return startWithBlockchain('ethereum');
      });
    } else {
      startWithBlockchain('ethereum');
    }
  }, []);
  useEffect(function () {
    if (props.selection.blockchain) {
      setBlockchain(props.selection.blockchain);
      setTokens(props.selection.blockchain.tokens);

      if (searchElement.current) {
        searchElement.current.value = '';
        searchElement.current.focus();
      }
    }
  }, [props.selection, props.selection.blockchain]);

  var onClickChangeBlockchain = function onClickChangeBlockchain() {
    navigate('SelectBlockchain');
  };

  var onClickAddToken = function onClickAddToken() {
    setShowAddToken(true);

    if (searchElement.current) {
      searchElement.current.value = '';
      searchElement.current.focus();
    }
  };

  var searchTokens = useCallback(lodash.debounce(function (term, blockchainName) {
    fetch("https://public.depay.com/tokens/search?blockchain=".concat(blockchainName, "&term=").concat(term)).then(function (response) {
      if (response.status == 200) {
        response.json().then(function (tokens) {
          setTokens(tokens);
          setLoading(false);
        })["catch"](function () {
          return reject;
        });
      } else {
        reject();
      }
    })["catch"](function () {
      return reject;
    });
  }, 500), []);

  var onChangeSearch = function onChangeSearch(event) {
    setShowAddToken(false);
    setLoading(true);
    var term = event.target.value;
    setSearchTerm(term);

    if (term.match(/^0x/)) {
      setTokens([]);
      var token;

      try {
        token = new Token({
          blockchain: blockchain.name,
          address: term
        });
      } catch (_unused) {}

      if (token == undefined) {
        setLoading(false);
        return;
      }

      Promise.all([token.name(), token.symbol(), token.decimals(), fetch("https://public.depay.com/tokens/routable/".concat(blockchain.name, "/").concat(term)).then(function (response) {
        if (response.status == 200) {
          return response.json();
        }
      })]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 4),
            name = _ref2[0],
            symbol = _ref2[1],
            decimals = _ref2[2],
            routable = _ref2[3];

        setTokens([{
          name: name,
          symbol: symbol,
          decimals: decimals,
          address: term,
          blockchain: blockchain.name,
          routable: !!routable
        }]);
        setLoading(false);
      });
    } else if (term && term.length) {
      setTokens([]);
      searchTokens(term, blockchain.name);
    } else {
      setTokens(blockchain.tokens);
      setLoading(false);
    }
  };

  var select = function select(token) {
    if (token.address) {
      token.address = ethers.utils.getAddress(token.address);
    }

    if (token.external_id) {
      token.external_id = ethers.utils.getAddress(token.external_id);
    }

    if (blockchain.tokens.find(function (majorToken) {
      return majorToken.address == (token.address || token.external_id);
    })) {
      setOpen(false);
      props.resolve({
        blockchain: blockchain.name,
        address: token.address || token.external_id,
        logo: token.logo || token.image,
        name: token.name,
        symbol: token.symbol,
        decimals: token.decimals,
        routable: true
      });
      setTimeout(props.unmount, 300);
    } else {
      setSelection(Object.assign(props.selection, {
        token: token
      }));
      navigate('ConfirmTokenSelection');
    }
  };

  var elements;

  if (loading) {
    elements = [/*#__PURE__*/React.createElement("div", {
      className: "SkeletonWrapper",
      key: 'loading'
    }, /*#__PURE__*/React.createElement("div", {
      className: "Skeleton",
      style: {
        height: '69px',
        width: '100%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "SkeletonBackground"
    })))];
  } else {
    elements = tokens.map(function (token, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: "".concat(index, "-").concat(token.address),
        className: "Card Row",
        onClick: function onClick() {
          return select(token);
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardImage"
      }, token.logo && /*#__PURE__*/React.createElement("img", {
        src: token.logo
      }), token.image && /*#__PURE__*/React.createElement("img", {
        src: token.image
      }), !(token.logo || token.image) && /*#__PURE__*/React.createElement(TokenImage, {
        blockchain: token.blockchain,
        address: token.external_id || token.address
      })), /*#__PURE__*/React.createElement("div", {
        className: "CardBody"
      }, /*#__PURE__*/React.createElement("div", {
        className: "CardTokenSymbol",
        title: token.symbol
      }, /*#__PURE__*/React.createElement("span", {
        className: "CardText"
      }, token.symbol)), /*#__PURE__*/React.createElement("div", {
        className: "CardTokenName",
        title: token.name
      }, /*#__PURE__*/React.createElement("span", {
        className: "CardText"
      }, token.name))));
    });
  }

  if (blockchain == undefined) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Dialog$1, {
    header: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingLeftM PaddingRightM TextLeft"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      className: "LineHeightL FontSizeL"
    }, "Select Token")), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingBottomXS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "Card small",
      onClick: onClickChangeBlockchain
    }, /*#__PURE__*/React.createElement("div", {
      className: "CardImage small"
    }, /*#__PURE__*/React.createElement("img", {
      className: "transparent",
      src: blockchain.logo
    })), /*#__PURE__*/React.createElement("div", {
      className: "CardBody FontSizeM"
    }, blockchain.label), /*#__PURE__*/React.createElement("div", {
      className: "CardAction"
    }, /*#__PURE__*/React.createElement(ChevronRight, null)))), /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingBottomS"
    }, /*#__PURE__*/React.createElement("input", {
      value: searchTerm,
      onBlur: function onBlur() {
        return setShowAddToken(false);
      },
      onChange: onChangeSearch,
      className: "Search",
      autoFocus: true,
      placeholder: "Search name or paste address",
      ref: searchElement
    }), showAddToken && /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingRightXS PaddingLeftXS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "Tooltip"
    }, /*#__PURE__*/React.createElement("span", {
      className: "TooltipArrowUp"
    }), "Enter token address here")))),
    bodyClassName: "ScrollHeight",
    body: /*#__PURE__*/React.createElement("div", {
      className: ""
    }, elements),
    footer: /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopS PaddingRightM PaddingLeftM PaddingBottomS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "PaddingTopXS PaddingBottomXS"
    }, /*#__PURE__*/React.createElement("div", {
      className: "Link FontSizeS",
      onClick: onClickAddToken
    }, "Token missing? Add it.")))
  });
});

var SelectTokenStack = (function (props) {
  var _useContext = useContext(ConfigurationContext),
      what = _useContext.what;

  var _useContext2 = useContext(ClosableContext),
      open = _useContext2.open,
      close = _useContext2.close;

  var _useContext3 = useContext(SelectionContext),
      selection = _useContext3.selection;

  var start;

  switch (what) {
    default:
      start = 'SelectToken';
  }

  return /*#__PURE__*/React.createElement(ReactDialogStack, {
    open: open,
    close: close,
    start: start,
    container: props.container,
    document: props.document,
    dialogs: {
      SelectToken: /*#__PURE__*/React.createElement(SelectTokenDialog, {
        selection: selection,
        resolve: props.resolve,
        unmount: props.unmount
      }),
      SelectBlockchain: /*#__PURE__*/React.createElement(SelectBlockchainDialog, {
        selection: selection,
        resolve: props.resolve
      }),
      ConfirmTokenSelection: /*#__PURE__*/React.createElement(ConfirmTokenSelectionDialog, {
        selection: selection,
        resolve: props.resolve,
        unmount: props.unmount
      })
    }
  });
});

var Select = function Select(options) {
  requireReactVersion();
  var style, error, document, what;

  if (_typeof(options) == 'object') {
    style = options.style;
    error = options.error;
    document = options.document;
    what = options.what;
  }

  var startupError;

  if (what == undefined) {
    startupError = '"what" needs to be configured!';
  } else if (['token', 'nft'].indexOf(what) < 0) {
    startupError = "Unknown \"what\" configured: ".concat(what, "!");
  }

  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(resolve, reject) {
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              mount({
                style: style,
                document: ensureDocument(document)
              }, function (unmount) {
                var userClosedDialog = function userClosedDialog() {
                  reject('USER_CLOSED_DIALOG');
                  unmount();
                };

                return function (container) {
                  return /*#__PURE__*/React.createElement(ErrorProvider, {
                    error: startupError,
                    errorCallback: error,
                    container: container,
                    unmount: unmount
                  }, /*#__PURE__*/React.createElement(ConfigurationProvider, {
                    configuration: {
                      what: what
                    }
                  }, /*#__PURE__*/React.createElement(UpdatableProvider, null, /*#__PURE__*/React.createElement(ClosableProvider, {
                    unmount: userClosedDialog
                  }, /*#__PURE__*/React.createElement(SelectionProvider, null, what == 'token' && /*#__PURE__*/React.createElement(SelectTokenStack, {
                    document: document,
                    container: container,
                    unmount: unmount,
                    resolve: resolve
                  }), what == 'nft' && /*#__PURE__*/React.createElement(SelectNFTStack, {
                    document: document,
                    container: container,
                    unmount: unmount,
                    resolve: resolve
                  })), /*#__PURE__*/React.createElement(PoweredBy, null)))));
                };
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var DePayWidgets = {
  Connect: Connect,
  Login: Login,
  Payment: Payment,
  Sale: Sale,
  Select: Select,
  Loading: Loading
};

export { DePayWidgets as default };
