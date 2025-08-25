import {
  BehaviorSubject,
  ChangeDetectorRef,
  Compiler,
  Component,
  ConnectableObservable,
  Console,
  DOCUMENT,
  DestroyRef,
  Directive,
  EMPTY,
  EVENT_MANAGER_PLUGINS,
  EmptyError,
  EnvironmentInjector,
  EventEmitter,
  EventManagerPlugin,
  FactoryTarget,
  INTERNAL_APPLICATION_ERROR_HANDLER,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  Location,
  NgModule,
  NgModuleFactory$1,
  NgZone,
  Observable,
  Optional,
  Output,
  PendingTasks,
  PendingTasksInternal,
  ResourceImpl,
  RuntimeError,
  SecurityContext,
  Subject,
  Subscription,
  Version,
  ViewContainerRef,
  XSS_SECURITY_URL,
  XhrFactory,
  _sanitizeHtml,
  _sanitizeUrl,
  allowSanitizationBypassAndThrow,
  assertInInjectionContext,
  bypassSanitizationTrustHtml,
  bypassSanitizationTrustResourceUrl,
  bypassSanitizationTrustScript,
  bypassSanitizationTrustStyle,
  bypassSanitizationTrustUrl,
  catchError,
  combineLatest,
  computed,
  concat,
  concatMap,
  core_exports,
  createEnvironmentInjector,
  defaultIfEmpty,
  defer,
  encapsulateResourceError,
  filter,
  finalize,
  first,
  formatRuntimeError,
  forwardRef,
  from,
  getDOM,
  init_common,
  init_core,
  init_dom_renderer,
  init_esm,
  init_operators,
  init_xhr,
  inject,
  input,
  isInjectable,
  isNgModule,
  isObservable,
  isPromise,
  isStandalone,
  last,
  linkedSignal,
  makeEnvironmentProviders,
  map,
  mergeMap,
  of,
  parseCookieValue,
  pipe,
  refCount,
  reflectComponentType,
  resolveComponentResources,
  runInInjectionContext,
  scan,
  signal,
  startWith,
  switchMap,
  take,
  takeLast,
  takeUntil,
  tap,
  throwError,
  untracked,
  unwrapSafeValue,
  ɵɵngDeclareClassMetadata,
  ɵɵngDeclareComponent,
  ɵɵngDeclareDirective,
  ɵɵngDeclareFactory,
  ɵɵngDeclareInjectable,
  ɵɵngDeclareInjector,
  ɵɵngDeclareNgModule
} from "./chunk-PBX4NKV5.js";
import {
  __async,
  __esm,
  __spreadProps,
  __spreadValues
} from "./chunk-DKJGMCMN.js";

// node_modules/@angular/common/fesm2022/module.mjs
function assertValidHeaders(headers) {
  for (const [key, value] of Object.entries(headers)) {
    if (!(typeof value === "string" || typeof value === "number") && !Array.isArray(value)) {
      throw new Error(`Unexpected value of the \`${key}\` header provided. Expecting either a string, a number or an array, but got: \`${value}\`.`);
    }
  }
}
function paramParser(rawParams, codec) {
  const map2 = /* @__PURE__ */ new Map();
  if (rawParams.length > 0) {
    const params = rawParams.replace(/^\?/, "").split("&");
    params.forEach((param) => {
      const eqIdx = param.indexOf("=");
      const [key, val] = eqIdx == -1 ? [codec.decodeKey(param), ""] : [codec.decodeKey(param.slice(0, eqIdx)), codec.decodeValue(param.slice(eqIdx + 1))];
      const list = map2.get(key) || [];
      list.push(val);
      map2.set(key, list);
    });
  }
  return map2;
}
function standardEncoding(v) {
  return encodeURIComponent(v).replace(STANDARD_ENCODING_REGEX, (s, t) => STANDARD_ENCODING_REPLACEMENTS[t] ?? s);
}
function valueToString(value) {
  return `${value}`;
}
function mightHaveBody(method) {
  switch (method) {
    case "DELETE":
    case "GET":
    case "HEAD":
    case "OPTIONS":
    case "JSONP":
      return false;
    default:
      return true;
  }
}
function isArrayBuffer(value) {
  return typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer;
}
function isBlob(value) {
  return typeof Blob !== "undefined" && value instanceof Blob;
}
function isFormData(value) {
  return typeof FormData !== "undefined" && value instanceof FormData;
}
function isUrlSearchParams(value) {
  return typeof URLSearchParams !== "undefined" && value instanceof URLSearchParams;
}
function addBody(options, body) {
  return {
    body,
    headers: options.headers,
    context: options.context,
    observe: options.observe,
    params: options.params,
    reportProgress: options.reportProgress,
    responseType: options.responseType,
    withCredentials: options.withCredentials,
    credentials: options.credentials,
    transferCache: options.transferCache,
    timeout: options.timeout,
    keepalive: options.keepalive,
    priority: options.priority,
    cache: options.cache,
    mode: options.mode,
    redirect: options.redirect,
    integrity: options.integrity,
    referrer: options.referrer
  };
}
function getResponseUrl$1(response) {
  if (response.url) {
    return response.url;
  }
  const xRequestUrl = X_REQUEST_URL_HEADER.toLocaleLowerCase();
  return response.headers.get(xRequestUrl);
}
function noop() {
}
function warningOptionsMessage(req) {
  if (req.credentials && req.withCredentials) {
    console.warn(formatRuntimeError(2819, `Angular detected that a \`HttpClient\` request has both \`withCredentials: true\` and \`credentials: '${req.credentials}'\` options. The \`withCredentials\` option is overriding the explicit \`credentials\` setting to 'include'. Consider removing \`withCredentials\` and using \`credentials: '${req.credentials}'\` directly for clarity.`));
  }
}
function silenceSuperfluousUnhandledPromiseRejection(promise) {
  promise.then(noop, noop);
}
function interceptorChainEndFn(req, finalHandlerFn) {
  return finalHandlerFn(req);
}
function adaptLegacyInterceptorToChain(chainTailFn, interceptor) {
  return (initialRequest, finalHandlerFn) => interceptor.intercept(initialRequest, {
    handle: (downstreamRequest) => chainTailFn(downstreamRequest, finalHandlerFn)
  });
}
function chainedInterceptorFn(chainTailFn, interceptorFn, injector) {
  return (initialRequest, finalHandlerFn) => runInInjectionContext(injector, () => interceptorFn(initialRequest, (downstreamRequest) => chainTailFn(downstreamRequest, finalHandlerFn)));
}
function legacyInterceptorFnFactory() {
  let chain = null;
  return (req, handler) => {
    if (chain === null) {
      const interceptors = inject(HTTP_INTERCEPTORS, { optional: true }) ?? [];
      chain = interceptors.reduceRight(adaptLegacyInterceptorToChain, interceptorChainEndFn);
    }
    const pendingTasks = inject(PendingTasks);
    const contributeToStability = inject(REQUESTS_CONTRIBUTE_TO_STABILITY);
    if (contributeToStability) {
      const removeTask = pendingTasks.add();
      return chain(req, handler).pipe(finalize(removeTask));
    } else {
      return chain(req, handler);
    }
  };
}
function jsonpCallbackContext() {
  if (typeof window === "object") {
    return window;
  }
  return {};
}
function jsonpInterceptorFn(req, next) {
  if (req.method === "JSONP") {
    return inject(JsonpClientBackend).handle(req);
  }
  return next(req);
}
function getResponseUrl(xhr) {
  if ("responseURL" in xhr && xhr.responseURL) {
    return xhr.responseURL;
  }
  if (X_REQUEST_URL_REGEXP.test(xhr.getAllResponseHeaders())) {
    return xhr.getResponseHeader(X_REQUEST_URL_HEADER);
  }
  return null;
}
function validateXhrCompatibility(req) {
  const unsupportedOptions = [
    {
      property: "keepalive",
      errorCode: 2813
    },
    {
      property: "cache",
      errorCode: 2814
    },
    {
      property: "priority",
      errorCode: 2815
    },
    {
      property: "mode",
      errorCode: 2816
    },
    {
      property: "redirect",
      errorCode: 2817
    },
    {
      property: "credentials",
      errorCode: 2818
    },
    {
      property: "integrity",
      errorCode: 2820
    },
    {
      property: "referrer",
      errorCode: 2821
    }
  ];
  for (const { property, errorCode } of unsupportedOptions) {
    if (req[property]) {
      console.warn(formatRuntimeError(errorCode, `Angular detected that a \`HttpClient\` request with the \`${property}\` option was sent using XHR, which does not support it. To use the \`${property}\` option, enable Fetch API support by passing \`withFetch()\` as an argument to \`provideHttpClient()\`.`));
    }
  }
}
function xsrfInterceptorFn(req, next) {
  const lcUrl = req.url.toLowerCase();
  if (!inject(XSRF_ENABLED) || req.method === "GET" || req.method === "HEAD" || lcUrl.startsWith("http://") || lcUrl.startsWith("https://")) {
    return next(req);
  }
  const token = inject(HttpXsrfTokenExtractor).getToken();
  const headerName = inject(XSRF_HEADER_NAME);
  if (token != null && !req.headers.has(headerName)) {
    req = req.clone({ headers: req.headers.set(headerName, token) });
  }
  return next(req);
}
function makeHttpFeature(kind, providers) {
  return {
    \u0275kind: kind,
    \u0275providers: providers
  };
}
function provideHttpClient(...features) {
  if (ngDevMode) {
    const featureKinds = new Set(features.map((f) => f.\u0275kind));
    if (featureKinds.has(HttpFeatureKind.NoXsrfProtection) && featureKinds.has(HttpFeatureKind.CustomXsrfConfiguration)) {
      throw new Error(ngDevMode ? `Configuration error: found both withXsrfConfiguration() and withNoXsrfProtection() in the same call to provideHttpClient(), which is a contradiction.` : "");
    }
  }
  const providers = [
    HttpClient,
    HttpXhrBackend,
    HttpInterceptorHandler,
    { provide: HttpHandler, useExisting: HttpInterceptorHandler },
    {
      provide: HttpBackend,
      useFactory: () => {
        return inject(FETCH_BACKEND, { optional: true }) ?? inject(HttpXhrBackend);
      }
    },
    {
      provide: HTTP_INTERCEPTOR_FNS,
      useValue: xsrfInterceptorFn,
      multi: true
    },
    { provide: XSRF_ENABLED, useValue: true },
    { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor }
  ];
  for (const feature of features) {
    providers.push(...feature.\u0275providers);
  }
  return makeEnvironmentProviders(providers);
}
function withInterceptorsFromDi() {
  return makeHttpFeature(HttpFeatureKind.LegacyInterceptors, [
    {
      provide: LEGACY_INTERCEPTOR_FN,
      useFactory: legacyInterceptorFnFactory
    },
    {
      provide: HTTP_INTERCEPTOR_FNS,
      useExisting: LEGACY_INTERCEPTOR_FN,
      multi: true
    }
  ]);
}
function withXsrfConfiguration({ cookieName, headerName }) {
  const providers = [];
  if (cookieName !== void 0) {
    providers.push({ provide: XSRF_COOKIE_NAME, useValue: cookieName });
  }
  if (headerName !== void 0) {
    providers.push({ provide: XSRF_HEADER_NAME, useValue: headerName });
  }
  return makeHttpFeature(HttpFeatureKind.CustomXsrfConfiguration, providers);
}
function withNoXsrfProtection() {
  return makeHttpFeature(HttpFeatureKind.NoXsrfProtection, [
    {
      provide: XSRF_ENABLED,
      useValue: false
    }
  ]);
}
function withJsonpSupport() {
  return makeHttpFeature(HttpFeatureKind.JsonpSupport, [
    JsonpClientBackend,
    { provide: JsonpCallbackContext, useFactory: jsonpCallbackContext },
    { provide: HTTP_INTERCEPTOR_FNS, useValue: jsonpInterceptorFn, multi: true }
  ]);
}
var HttpHandler, HttpBackend, HttpHeaders, HttpUrlEncodingCodec, STANDARD_ENCODING_REGEX, STANDARD_ENCODING_REPLACEMENTS, HttpParams, HttpContext, CONTENT_TYPE_HEADER, ACCEPT_HEADER, X_REQUEST_URL_HEADER, TEXT_CONTENT_TYPE, JSON_CONTENT_TYPE, ACCEPT_HEADER_VALUE, HttpRequest, HttpEventType, HttpResponseBase, HttpHeaderResponse, HttpResponse, HttpErrorResponse, HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_NO_CONTENT, HttpStatusCode, HttpClient, XSSI_PREFIX$1, FETCH_BACKEND, FetchBackend, FetchFactory, HTTP_INTERCEPTORS, HTTP_INTERCEPTOR_FNS, HTTP_ROOT_INTERCEPTOR_FNS, REQUESTS_CONTRIBUTE_TO_STABILITY, fetchBackendWarningDisplayed, HttpInterceptorHandler, nextRequestId, foreignDocument, JSONP_ERR_NO_CALLBACK, JSONP_ERR_WRONG_METHOD, JSONP_ERR_WRONG_RESPONSE_TYPE, JSONP_ERR_HEADERS_NOT_SUPPORTED, JsonpCallbackContext, JsonpClientBackend, JsonpInterceptor, XSSI_PREFIX, X_REQUEST_URL_REGEXP, HttpXhrBackend, XSRF_ENABLED, XSRF_DEFAULT_COOKIE_NAME, XSRF_COOKIE_NAME, XSRF_DEFAULT_HEADER_NAME, XSRF_HEADER_NAME, HttpXsrfTokenExtractor, HttpXsrfCookieExtractor, HttpXsrfInterceptor, HttpFeatureKind, LEGACY_INTERCEPTOR_FN, HttpClientXsrfModule, HttpClientModule, HttpClientJsonpModule;
var init_module = __esm({
  "node_modules/@angular/common/fesm2022/module.mjs"() {
    "use strict";
    init_core();
    init_core();
    init_operators();
    init_esm();
    init_xhr();
    HttpHandler = class {
    };
    HttpBackend = class {
    };
    HttpHeaders = class _HttpHeaders {
      /**
       * Internal map of lowercase header names to values.
       */
      headers;
      /**
       * Internal map of lowercased header names to the normalized
       * form of the name (the form seen first).
       */
      normalizedNames = /* @__PURE__ */ new Map();
      /**
       * Complete the lazy initialization of this object (needed before reading).
       */
      lazyInit;
      /**
       * Queued updates to be materialized the next initialization.
       */
      lazyUpdate = null;
      /**  Constructs a new HTTP header object with the given values.*/
      constructor(headers) {
        if (!headers) {
          this.headers = /* @__PURE__ */ new Map();
        } else if (typeof headers === "string") {
          this.lazyInit = () => {
            this.headers = /* @__PURE__ */ new Map();
            headers.split("\n").forEach((line) => {
              const index = line.indexOf(":");
              if (index > 0) {
                const name = line.slice(0, index);
                const value = line.slice(index + 1).trim();
                this.addHeaderEntry(name, value);
              }
            });
          };
        } else if (typeof Headers !== "undefined" && headers instanceof Headers) {
          this.headers = /* @__PURE__ */ new Map();
          headers.forEach((value, name) => {
            this.addHeaderEntry(name, value);
          });
        } else {
          this.lazyInit = () => {
            if (typeof ngDevMode === "undefined" || ngDevMode) {
              assertValidHeaders(headers);
            }
            this.headers = /* @__PURE__ */ new Map();
            Object.entries(headers).forEach(([name, values]) => {
              this.setHeaderEntries(name, values);
            });
          };
        }
      }
      /**
       * Checks for existence of a given header.
       *
       * @param name The header name to check for existence.
       *
       * @returns True if the header exists, false otherwise.
       */
      has(name) {
        this.init();
        return this.headers.has(name.toLowerCase());
      }
      /**
       * Retrieves the first value of a given header.
       *
       * @param name The header name.
       *
       * @returns The value string if the header exists, null otherwise
       */
      get(name) {
        this.init();
        const values = this.headers.get(name.toLowerCase());
        return values && values.length > 0 ? values[0] : null;
      }
      /**
       * Retrieves the names of the headers.
       *
       * @returns A list of header names.
       */
      keys() {
        this.init();
        return Array.from(this.normalizedNames.values());
      }
      /**
       * Retrieves a list of values for a given header.
       *
       * @param name The header name from which to retrieve values.
       *
       * @returns A string of values if the header exists, null otherwise.
       */
      getAll(name) {
        this.init();
        return this.headers.get(name.toLowerCase()) || null;
      }
      /**
       * Appends a new value to the existing set of values for a header
       * and returns them in a clone of the original instance.
       *
       * @param name The header name for which to append the values.
       * @param value The value to append.
       *
       * @returns A clone of the HTTP headers object with the value appended to the given header.
       */
      append(name, value) {
        return this.clone({ name, value, op: "a" });
      }
      /**
       * Sets or modifies a value for a given header in a clone of the original instance.
       * If the header already exists, its value is replaced with the given value
       * in the returned object.
       *
       * @param name The header name.
       * @param value The value or values to set or override for the given header.
       *
       * @returns A clone of the HTTP headers object with the newly set header value.
       */
      set(name, value) {
        return this.clone({ name, value, op: "s" });
      }
      /**
       * Deletes values for a given header in a clone of the original instance.
       *
       * @param name The header name.
       * @param value The value or values to delete for the given header.
       *
       * @returns A clone of the HTTP headers object with the given value deleted.
       */
      delete(name, value) {
        return this.clone({ name, value, op: "d" });
      }
      maybeSetNormalizedName(name, lcName) {
        if (!this.normalizedNames.has(lcName)) {
          this.normalizedNames.set(lcName, name);
        }
      }
      init() {
        if (!!this.lazyInit) {
          if (this.lazyInit instanceof _HttpHeaders) {
            this.copyFrom(this.lazyInit);
          } else {
            this.lazyInit();
          }
          this.lazyInit = null;
          if (!!this.lazyUpdate) {
            this.lazyUpdate.forEach((update) => this.applyUpdate(update));
            this.lazyUpdate = null;
          }
        }
      }
      copyFrom(other) {
        other.init();
        Array.from(other.headers.keys()).forEach((key) => {
          this.headers.set(key, other.headers.get(key));
          this.normalizedNames.set(key, other.normalizedNames.get(key));
        });
      }
      clone(update) {
        const clone = new _HttpHeaders();
        clone.lazyInit = !!this.lazyInit && this.lazyInit instanceof _HttpHeaders ? this.lazyInit : this;
        clone.lazyUpdate = (this.lazyUpdate || []).concat([update]);
        return clone;
      }
      applyUpdate(update) {
        const key = update.name.toLowerCase();
        switch (update.op) {
          case "a":
          case "s":
            let value = update.value;
            if (typeof value === "string") {
              value = [value];
            }
            if (value.length === 0) {
              return;
            }
            this.maybeSetNormalizedName(update.name, key);
            const base = (update.op === "a" ? this.headers.get(key) : void 0) || [];
            base.push(...value);
            this.headers.set(key, base);
            break;
          case "d":
            const toDelete = update.value;
            if (!toDelete) {
              this.headers.delete(key);
              this.normalizedNames.delete(key);
            } else {
              let existing = this.headers.get(key);
              if (!existing) {
                return;
              }
              existing = existing.filter((value2) => toDelete.indexOf(value2) === -1);
              if (existing.length === 0) {
                this.headers.delete(key);
                this.normalizedNames.delete(key);
              } else {
                this.headers.set(key, existing);
              }
            }
            break;
        }
      }
      addHeaderEntry(name, value) {
        const key = name.toLowerCase();
        this.maybeSetNormalizedName(name, key);
        if (this.headers.has(key)) {
          this.headers.get(key).push(value);
        } else {
          this.headers.set(key, [value]);
        }
      }
      setHeaderEntries(name, values) {
        const headerValues = (Array.isArray(values) ? values : [values]).map((value) => value.toString());
        const key = name.toLowerCase();
        this.headers.set(key, headerValues);
        this.maybeSetNormalizedName(name, key);
      }
      /**
       * @internal
       */
      forEach(fn) {
        this.init();
        Array.from(this.normalizedNames.keys()).forEach((key) => fn(this.normalizedNames.get(key), this.headers.get(key)));
      }
    };
    HttpUrlEncodingCodec = class {
      /**
       * Encodes a key name for a URL parameter or query-string.
       * @param key The key name.
       * @returns The encoded key name.
       */
      encodeKey(key) {
        return standardEncoding(key);
      }
      /**
       * Encodes the value of a URL parameter or query-string.
       * @param value The value.
       * @returns The encoded value.
       */
      encodeValue(value) {
        return standardEncoding(value);
      }
      /**
       * Decodes an encoded URL parameter or query-string key.
       * @param key The encoded key name.
       * @returns The decoded key name.
       */
      decodeKey(key) {
        return decodeURIComponent(key);
      }
      /**
       * Decodes an encoded URL parameter or query-string value.
       * @param value The encoded value.
       * @returns The decoded value.
       */
      decodeValue(value) {
        return decodeURIComponent(value);
      }
    };
    STANDARD_ENCODING_REGEX = /%(\d[a-f0-9])/gi;
    STANDARD_ENCODING_REPLACEMENTS = {
      "40": "@",
      "3A": ":",
      "24": "$",
      "2C": ",",
      "3B": ";",
      "3D": "=",
      "3F": "?",
      "2F": "/"
    };
    HttpParams = class _HttpParams {
      map;
      encoder;
      updates = null;
      cloneFrom = null;
      constructor(options = {}) {
        this.encoder = options.encoder || new HttpUrlEncodingCodec();
        if (options.fromString) {
          if (options.fromObject) {
            throw new RuntimeError(2805, ngDevMode && "Cannot specify both fromString and fromObject.");
          }
          this.map = paramParser(options.fromString, this.encoder);
        } else if (!!options.fromObject) {
          this.map = /* @__PURE__ */ new Map();
          Object.keys(options.fromObject).forEach((key) => {
            const value = options.fromObject[key];
            const values = Array.isArray(value) ? value.map(valueToString) : [valueToString(value)];
            this.map.set(key, values);
          });
        } else {
          this.map = null;
        }
      }
      /**
       * Reports whether the body includes one or more values for a given parameter.
       * @param param The parameter name.
       * @returns True if the parameter has one or more values,
       * false if it has no value or is not present.
       */
      has(param) {
        this.init();
        return this.map.has(param);
      }
      /**
       * Retrieves the first value for a parameter.
       * @param param The parameter name.
       * @returns The first value of the given parameter,
       * or `null` if the parameter is not present.
       */
      get(param) {
        this.init();
        const res = this.map.get(param);
        return !!res ? res[0] : null;
      }
      /**
       * Retrieves all values for a  parameter.
       * @param param The parameter name.
       * @returns All values in a string array,
       * or `null` if the parameter not present.
       */
      getAll(param) {
        this.init();
        return this.map.get(param) || null;
      }
      /**
       * Retrieves all the parameters for this body.
       * @returns The parameter names in a string array.
       */
      keys() {
        this.init();
        return Array.from(this.map.keys());
      }
      /**
       * Appends a new value to existing values for a parameter.
       * @param param The parameter name.
       * @param value The new value to add.
       * @return A new body with the appended value.
       */
      append(param, value) {
        return this.clone({ param, value, op: "a" });
      }
      /**
       * Constructs a new body with appended values for the given parameter name.
       * @param params parameters and values
       * @return A new body with the new value.
       */
      appendAll(params) {
        const updates = [];
        Object.keys(params).forEach((param) => {
          const value = params[param];
          if (Array.isArray(value)) {
            value.forEach((_value) => {
              updates.push({ param, value: _value, op: "a" });
            });
          } else {
            updates.push({ param, value, op: "a" });
          }
        });
        return this.clone(updates);
      }
      /**
       * Replaces the value for a parameter.
       * @param param The parameter name.
       * @param value The new value.
       * @return A new body with the new value.
       */
      set(param, value) {
        return this.clone({ param, value, op: "s" });
      }
      /**
       * Removes a given value or all values from a parameter.
       * @param param The parameter name.
       * @param value The value to remove, if provided.
       * @return A new body with the given value removed, or with all values
       * removed if no value is specified.
       */
      delete(param, value) {
        return this.clone({ param, value, op: "d" });
      }
      /**
       * Serializes the body to an encoded string, where key-value pairs (separated by `=`) are
       * separated by `&`s.
       */
      toString() {
        this.init();
        return this.keys().map((key) => {
          const eKey = this.encoder.encodeKey(key);
          return this.map.get(key).map((value) => eKey + "=" + this.encoder.encodeValue(value)).join("&");
        }).filter((param) => param !== "").join("&");
      }
      clone(update) {
        const clone = new _HttpParams({ encoder: this.encoder });
        clone.cloneFrom = this.cloneFrom || this;
        clone.updates = (this.updates || []).concat(update);
        return clone;
      }
      init() {
        if (this.map === null) {
          this.map = /* @__PURE__ */ new Map();
        }
        if (this.cloneFrom !== null) {
          this.cloneFrom.init();
          this.cloneFrom.keys().forEach((key) => this.map.set(key, this.cloneFrom.map.get(key)));
          this.updates.forEach((update) => {
            switch (update.op) {
              case "a":
              case "s":
                const base = (update.op === "a" ? this.map.get(update.param) : void 0) || [];
                base.push(valueToString(update.value));
                this.map.set(update.param, base);
                break;
              case "d":
                if (update.value !== void 0) {
                  let base2 = this.map.get(update.param) || [];
                  const idx = base2.indexOf(valueToString(update.value));
                  if (idx !== -1) {
                    base2.splice(idx, 1);
                  }
                  if (base2.length > 0) {
                    this.map.set(update.param, base2);
                  } else {
                    this.map.delete(update.param);
                  }
                } else {
                  this.map.delete(update.param);
                  break;
                }
            }
          });
          this.cloneFrom = this.updates = null;
        }
      }
    };
    HttpContext = class {
      map = /* @__PURE__ */ new Map();
      /**
       * Store a value in the context. If a value is already present it will be overwritten.
       *
       * @param token The reference to an instance of `HttpContextToken`.
       * @param value The value to store.
       *
       * @returns A reference to itself for easy chaining.
       */
      set(token, value) {
        this.map.set(token, value);
        return this;
      }
      /**
       * Retrieve the value associated with the given token.
       *
       * @param token The reference to an instance of `HttpContextToken`.
       *
       * @returns The stored value or default if one is defined.
       */
      get(token) {
        if (!this.map.has(token)) {
          this.map.set(token, token.defaultValue());
        }
        return this.map.get(token);
      }
      /**
       * Delete the value associated with the given token.
       *
       * @param token The reference to an instance of `HttpContextToken`.
       *
       * @returns A reference to itself for easy chaining.
       */
      delete(token) {
        this.map.delete(token);
        return this;
      }
      /**
       * Checks for existence of a given token.
       *
       * @param token The reference to an instance of `HttpContextToken`.
       *
       * @returns True if the token exists, false otherwise.
       */
      has(token) {
        return this.map.has(token);
      }
      /**
       * @returns a list of tokens currently stored in the context.
       */
      keys() {
        return this.map.keys();
      }
    };
    CONTENT_TYPE_HEADER = "Content-Type";
    ACCEPT_HEADER = "Accept";
    X_REQUEST_URL_HEADER = "X-Request-URL";
    TEXT_CONTENT_TYPE = "text/plain";
    JSON_CONTENT_TYPE = "application/json";
    ACCEPT_HEADER_VALUE = `${JSON_CONTENT_TYPE}, ${TEXT_CONTENT_TYPE}, */*`;
    HttpRequest = class _HttpRequest {
      url;
      /**
       * The request body, or `null` if one isn't set.
       *
       * Bodies are not enforced to be immutable, as they can include a reference to any
       * user-defined data type. However, interceptors should take care to preserve
       * idempotence by treating them as such.
       */
      body = null;
      /**
       * Outgoing headers for this request.
       */
      headers;
      /**
       * Shared and mutable context that can be used by interceptors
       */
      context;
      /**
       * Whether this request should be made in a way that exposes progress events.
       *
       * Progress events are expensive (change detection runs on each event) and so
       * they should only be requested if the consumer intends to monitor them.
       *
       * Note: The `FetchBackend` doesn't support progress report on uploads.
       */
      reportProgress = false;
      /**
       * Whether this request should be sent with outgoing credentials (cookies).
       */
      withCredentials = false;
      /**
       *  The credentials mode of the request, which determines how cookies and HTTP authentication are handled.
       *  This can affect whether cookies are sent with the request, and how authentication is handled.
       */
      credentials;
      /**
       * When using the fetch implementation and set to `true`, the browser will not abort the associated request if the page that initiated it is unloaded before the request is complete.
       */
      keepalive = false;
      /**
       * Controls how the request will interact with the browser's HTTP cache.
       * This affects whether a response is retrieved from the cache, how it is stored, or if it bypasses the cache altogether.
       */
      cache;
      /**
       * Indicates the relative priority of the request. This may be used by the browser to decide the order in which requests are dispatched and resources fetched.
       */
      priority;
      /**
       * The mode of the request, which determines how the request will interact with the browser's security model.
       * This can affect things like CORS (Cross-Origin Resource Sharing) and same-origin policies.
       */
      mode;
      /**
       * The redirect mode of the request, which determines how redirects are handled.
       * This can affect whether the request follows redirects automatically, or if it fails when a redirect occurs.
       */
      redirect;
      /**
       * The referrer of the request, which can be used to indicate the origin of the request.
       * This is useful for security and analytics purposes.
       * Value is a same-origin URL, "about:client", or the empty string, to set request's referrer.
       */
      referrer;
      /**
       * The integrity metadata of the request, which can be used to ensure the request is made with the expected content.
       * A cryptographic hash of the resource to be fetched by request
       */
      integrity;
      /**
       * The expected response type of the server.
       *
       * This is used to parse the response appropriately before returning it to
       * the requestee.
       */
      responseType = "json";
      /**
       * The outgoing HTTP request method.
       */
      method;
      /**
       * Outgoing URL parameters.
       *
       * To pass a string representation of HTTP parameters in the URL-query-string format,
       * the `HttpParamsOptions`' `fromString` may be used. For example:
       *
       * ```ts
       * new HttpParams({fromString: 'angular=awesome'})
       * ```
       */
      params;
      /**
       * The outgoing URL with all URL parameters set.
       */
      urlWithParams;
      /**
       * The HttpTransferCache option for the request
       */
      transferCache;
      /**
       * The timeout for the backend HTTP request in ms.
       */
      timeout;
      constructor(method, url, third, fourth) {
        this.url = url;
        this.method = method.toUpperCase();
        let options;
        if (mightHaveBody(this.method) || !!fourth) {
          this.body = third !== void 0 ? third : null;
          options = fourth;
        } else {
          options = third;
        }
        if (options) {
          this.reportProgress = !!options.reportProgress;
          this.withCredentials = !!options.withCredentials;
          this.keepalive = !!options.keepalive;
          if (!!options.responseType) {
            this.responseType = options.responseType;
          }
          if (options.headers) {
            this.headers = options.headers;
          }
          if (options.context) {
            this.context = options.context;
          }
          if (options.params) {
            this.params = options.params;
          }
          if (options.priority) {
            this.priority = options.priority;
          }
          if (options.cache) {
            this.cache = options.cache;
          }
          if (options.credentials) {
            this.credentials = options.credentials;
          }
          if (typeof options.timeout === "number") {
            if (options.timeout < 1 || !Number.isInteger(options.timeout)) {
              throw new RuntimeError(2822, ngDevMode ? "`timeout` must be a positive integer value" : "");
            }
            this.timeout = options.timeout;
          }
          if (options.mode) {
            this.mode = options.mode;
          }
          if (options.redirect) {
            this.redirect = options.redirect;
          }
          if (options.integrity) {
            this.integrity = options.integrity;
          }
          if (options.referrer) {
            this.referrer = options.referrer;
          }
          this.transferCache = options.transferCache;
        }
        this.headers ??= new HttpHeaders();
        this.context ??= new HttpContext();
        if (!this.params) {
          this.params = new HttpParams();
          this.urlWithParams = url;
        } else {
          const params = this.params.toString();
          if (params.length === 0) {
            this.urlWithParams = url;
          } else {
            const qIdx = url.indexOf("?");
            const sep = qIdx === -1 ? "?" : qIdx < url.length - 1 ? "&" : "";
            this.urlWithParams = url + sep + params;
          }
        }
      }
      /**
       * Transform the free-form body into a serialized format suitable for
       * transmission to the server.
       */
      serializeBody() {
        if (this.body === null) {
          return null;
        }
        if (typeof this.body === "string" || isArrayBuffer(this.body) || isBlob(this.body) || isFormData(this.body) || isUrlSearchParams(this.body)) {
          return this.body;
        }
        if (this.body instanceof HttpParams) {
          return this.body.toString();
        }
        if (typeof this.body === "object" || typeof this.body === "boolean" || Array.isArray(this.body)) {
          return JSON.stringify(this.body);
        }
        return this.body.toString();
      }
      /**
       * Examine the body and attempt to infer an appropriate MIME type
       * for it.
       *
       * If no such type can be inferred, this method will return `null`.
       */
      detectContentTypeHeader() {
        if (this.body === null) {
          return null;
        }
        if (isFormData(this.body)) {
          return null;
        }
        if (isBlob(this.body)) {
          return this.body.type || null;
        }
        if (isArrayBuffer(this.body)) {
          return null;
        }
        if (typeof this.body === "string") {
          return TEXT_CONTENT_TYPE;
        }
        if (this.body instanceof HttpParams) {
          return "application/x-www-form-urlencoded;charset=UTF-8";
        }
        if (typeof this.body === "object" || typeof this.body === "number" || typeof this.body === "boolean") {
          return JSON_CONTENT_TYPE;
        }
        return null;
      }
      clone(update = {}) {
        const method = update.method || this.method;
        const url = update.url || this.url;
        const responseType = update.responseType || this.responseType;
        const keepalive = update.keepalive ?? this.keepalive;
        const priority = update.priority || this.priority;
        const cache = update.cache || this.cache;
        const mode = update.mode || this.mode;
        const redirect = update.redirect || this.redirect;
        const credentials = update.credentials || this.credentials;
        const referrer = update.referrer || this.referrer;
        const integrity = update.integrity || this.integrity;
        const transferCache = update.transferCache ?? this.transferCache;
        const timeout = update.timeout ?? this.timeout;
        const body = update.body !== void 0 ? update.body : this.body;
        const withCredentials = update.withCredentials ?? this.withCredentials;
        const reportProgress = update.reportProgress ?? this.reportProgress;
        let headers = update.headers || this.headers;
        let params = update.params || this.params;
        const context = update.context ?? this.context;
        if (update.setHeaders !== void 0) {
          headers = Object.keys(update.setHeaders).reduce((headers2, name) => headers2.set(name, update.setHeaders[name]), headers);
        }
        if (update.setParams) {
          params = Object.keys(update.setParams).reduce((params2, param) => params2.set(param, update.setParams[param]), params);
        }
        return new _HttpRequest(method, url, body, {
          params,
          headers,
          context,
          reportProgress,
          responseType,
          withCredentials,
          transferCache,
          keepalive,
          cache,
          priority,
          timeout,
          mode,
          redirect,
          credentials,
          referrer,
          integrity
        });
      }
    };
    (function(HttpEventType2) {
      HttpEventType2[HttpEventType2["Sent"] = 0] = "Sent";
      HttpEventType2[HttpEventType2["UploadProgress"] = 1] = "UploadProgress";
      HttpEventType2[HttpEventType2["ResponseHeader"] = 2] = "ResponseHeader";
      HttpEventType2[HttpEventType2["DownloadProgress"] = 3] = "DownloadProgress";
      HttpEventType2[HttpEventType2["Response"] = 4] = "Response";
      HttpEventType2[HttpEventType2["User"] = 5] = "User";
    })(HttpEventType || (HttpEventType = {}));
    HttpResponseBase = class {
      /**
       * All response headers.
       */
      headers;
      /**
       * Response status code.
       */
      status;
      /**
       * Textual description of response status code, defaults to OK.
       *
       * Do not depend on this.
       */
      statusText;
      /**
       * URL of the resource retrieved, or null if not available.
       */
      url;
      /**
       * Whether the status code falls in the 2xx range.
       */
      ok;
      /**
       * Type of the response, narrowed to either the full response or the header.
       */
      type;
      /**
       * Indicates whether the HTTP response was redirected during the request.
       * This property is only available when using the Fetch API using `withFetch()`
       * When using the default XHR Request this property will be `undefined`
       */
      redirected;
      /**
       * Super-constructor for all responses.
       *
       * The single parameter accepted is an initialization hash. Any properties
       * of the response passed there will override the default values.
       */
      constructor(init, defaultStatus = 200, defaultStatusText = "OK") {
        this.headers = init.headers || new HttpHeaders();
        this.status = init.status !== void 0 ? init.status : defaultStatus;
        this.statusText = init.statusText || defaultStatusText;
        this.url = init.url || null;
        this.redirected = init.redirected;
        this.ok = this.status >= 200 && this.status < 300;
      }
    };
    HttpHeaderResponse = class _HttpHeaderResponse extends HttpResponseBase {
      /**
       * Create a new `HttpHeaderResponse` with the given parameters.
       */
      constructor(init = {}) {
        super(init);
      }
      type = HttpEventType.ResponseHeader;
      /**
       * Copy this `HttpHeaderResponse`, overriding its contents with the
       * given parameter hash.
       */
      clone(update = {}) {
        return new _HttpHeaderResponse({
          headers: update.headers || this.headers,
          status: update.status !== void 0 ? update.status : this.status,
          statusText: update.statusText || this.statusText,
          url: update.url || this.url || void 0
        });
      }
    };
    HttpResponse = class _HttpResponse extends HttpResponseBase {
      /**
       * The response body, or `null` if one was not returned.
       */
      body;
      /**
       * Construct a new `HttpResponse`.
       */
      constructor(init = {}) {
        super(init);
        this.body = init.body !== void 0 ? init.body : null;
      }
      type = HttpEventType.Response;
      clone(update = {}) {
        return new _HttpResponse({
          body: update.body !== void 0 ? update.body : this.body,
          headers: update.headers || this.headers,
          status: update.status !== void 0 ? update.status : this.status,
          statusText: update.statusText || this.statusText,
          url: update.url || this.url || void 0,
          redirected: update.redirected ?? this.redirected
        });
      }
    };
    HttpErrorResponse = class extends HttpResponseBase {
      name = "HttpErrorResponse";
      message;
      error;
      /**
       * Errors are never okay, even when the status code is in the 2xx success range.
       */
      ok = false;
      constructor(init) {
        super(init, 0, "Unknown Error");
        if (this.status >= 200 && this.status < 300) {
          this.message = `Http failure during parsing for ${init.url || "(unknown url)"}`;
        } else {
          this.message = `Http failure response for ${init.url || "(unknown url)"}: ${init.status} ${init.statusText}`;
        }
        this.error = init.error || null;
      }
    };
    HTTP_STATUS_CODE_OK = 200;
    HTTP_STATUS_CODE_NO_CONTENT = 204;
    (function(HttpStatusCode2) {
      HttpStatusCode2[HttpStatusCode2["Continue"] = 100] = "Continue";
      HttpStatusCode2[HttpStatusCode2["SwitchingProtocols"] = 101] = "SwitchingProtocols";
      HttpStatusCode2[HttpStatusCode2["Processing"] = 102] = "Processing";
      HttpStatusCode2[HttpStatusCode2["EarlyHints"] = 103] = "EarlyHints";
      HttpStatusCode2[HttpStatusCode2["Ok"] = 200] = "Ok";
      HttpStatusCode2[HttpStatusCode2["Created"] = 201] = "Created";
      HttpStatusCode2[HttpStatusCode2["Accepted"] = 202] = "Accepted";
      HttpStatusCode2[HttpStatusCode2["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
      HttpStatusCode2[HttpStatusCode2["NoContent"] = 204] = "NoContent";
      HttpStatusCode2[HttpStatusCode2["ResetContent"] = 205] = "ResetContent";
      HttpStatusCode2[HttpStatusCode2["PartialContent"] = 206] = "PartialContent";
      HttpStatusCode2[HttpStatusCode2["MultiStatus"] = 207] = "MultiStatus";
      HttpStatusCode2[HttpStatusCode2["AlreadyReported"] = 208] = "AlreadyReported";
      HttpStatusCode2[HttpStatusCode2["ImUsed"] = 226] = "ImUsed";
      HttpStatusCode2[HttpStatusCode2["MultipleChoices"] = 300] = "MultipleChoices";
      HttpStatusCode2[HttpStatusCode2["MovedPermanently"] = 301] = "MovedPermanently";
      HttpStatusCode2[HttpStatusCode2["Found"] = 302] = "Found";
      HttpStatusCode2[HttpStatusCode2["SeeOther"] = 303] = "SeeOther";
      HttpStatusCode2[HttpStatusCode2["NotModified"] = 304] = "NotModified";
      HttpStatusCode2[HttpStatusCode2["UseProxy"] = 305] = "UseProxy";
      HttpStatusCode2[HttpStatusCode2["Unused"] = 306] = "Unused";
      HttpStatusCode2[HttpStatusCode2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
      HttpStatusCode2[HttpStatusCode2["PermanentRedirect"] = 308] = "PermanentRedirect";
      HttpStatusCode2[HttpStatusCode2["BadRequest"] = 400] = "BadRequest";
      HttpStatusCode2[HttpStatusCode2["Unauthorized"] = 401] = "Unauthorized";
      HttpStatusCode2[HttpStatusCode2["PaymentRequired"] = 402] = "PaymentRequired";
      HttpStatusCode2[HttpStatusCode2["Forbidden"] = 403] = "Forbidden";
      HttpStatusCode2[HttpStatusCode2["NotFound"] = 404] = "NotFound";
      HttpStatusCode2[HttpStatusCode2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
      HttpStatusCode2[HttpStatusCode2["NotAcceptable"] = 406] = "NotAcceptable";
      HttpStatusCode2[HttpStatusCode2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
      HttpStatusCode2[HttpStatusCode2["RequestTimeout"] = 408] = "RequestTimeout";
      HttpStatusCode2[HttpStatusCode2["Conflict"] = 409] = "Conflict";
      HttpStatusCode2[HttpStatusCode2["Gone"] = 410] = "Gone";
      HttpStatusCode2[HttpStatusCode2["LengthRequired"] = 411] = "LengthRequired";
      HttpStatusCode2[HttpStatusCode2["PreconditionFailed"] = 412] = "PreconditionFailed";
      HttpStatusCode2[HttpStatusCode2["PayloadTooLarge"] = 413] = "PayloadTooLarge";
      HttpStatusCode2[HttpStatusCode2["UriTooLong"] = 414] = "UriTooLong";
      HttpStatusCode2[HttpStatusCode2["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
      HttpStatusCode2[HttpStatusCode2["RangeNotSatisfiable"] = 416] = "RangeNotSatisfiable";
      HttpStatusCode2[HttpStatusCode2["ExpectationFailed"] = 417] = "ExpectationFailed";
      HttpStatusCode2[HttpStatusCode2["ImATeapot"] = 418] = "ImATeapot";
      HttpStatusCode2[HttpStatusCode2["MisdirectedRequest"] = 421] = "MisdirectedRequest";
      HttpStatusCode2[HttpStatusCode2["UnprocessableEntity"] = 422] = "UnprocessableEntity";
      HttpStatusCode2[HttpStatusCode2["Locked"] = 423] = "Locked";
      HttpStatusCode2[HttpStatusCode2["FailedDependency"] = 424] = "FailedDependency";
      HttpStatusCode2[HttpStatusCode2["TooEarly"] = 425] = "TooEarly";
      HttpStatusCode2[HttpStatusCode2["UpgradeRequired"] = 426] = "UpgradeRequired";
      HttpStatusCode2[HttpStatusCode2["PreconditionRequired"] = 428] = "PreconditionRequired";
      HttpStatusCode2[HttpStatusCode2["TooManyRequests"] = 429] = "TooManyRequests";
      HttpStatusCode2[HttpStatusCode2["RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
      HttpStatusCode2[HttpStatusCode2["UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
      HttpStatusCode2[HttpStatusCode2["InternalServerError"] = 500] = "InternalServerError";
      HttpStatusCode2[HttpStatusCode2["NotImplemented"] = 501] = "NotImplemented";
      HttpStatusCode2[HttpStatusCode2["BadGateway"] = 502] = "BadGateway";
      HttpStatusCode2[HttpStatusCode2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
      HttpStatusCode2[HttpStatusCode2["GatewayTimeout"] = 504] = "GatewayTimeout";
      HttpStatusCode2[HttpStatusCode2["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
      HttpStatusCode2[HttpStatusCode2["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
      HttpStatusCode2[HttpStatusCode2["InsufficientStorage"] = 507] = "InsufficientStorage";
      HttpStatusCode2[HttpStatusCode2["LoopDetected"] = 508] = "LoopDetected";
      HttpStatusCode2[HttpStatusCode2["NotExtended"] = 510] = "NotExtended";
      HttpStatusCode2[HttpStatusCode2["NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
    })(HttpStatusCode || (HttpStatusCode = {}));
    HttpClient = class _HttpClient {
      handler;
      constructor(handler) {
        this.handler = handler;
      }
      /**
       * Constructs an observable for a generic HTTP request that, when subscribed,
       * fires the request through the chain of registered interceptors and on to the
       * server.
       *
       * You can pass an `HttpRequest` directly as the only parameter. In this case,
       * the call returns an observable of the raw `HttpEvent` stream.
       *
       * Alternatively you can pass an HTTP method as the first parameter,
       * a URL string as the second, and an options hash containing the request body as the third.
       * See `addBody()`. In this case, the specified `responseType` and `observe` options determine the
       * type of returned observable.
       *   * The `responseType` value determines how a successful response body is parsed.
       *   * If `responseType` is the default `json`, you can pass a type interface for the resulting
       * object as a type parameter to the call.
       *
       * The `observe` value determines the return type, according to what you are interested in
       * observing.
       *   * An `observe` value of events returns an observable of the raw `HttpEvent` stream, including
       * progress events by default.
       *   * An `observe` value of response returns an observable of `HttpResponse<T>`,
       * where the `T` parameter depends on the `responseType` and any optionally provided type
       * parameter.
       *   * An `observe` value of body returns an observable of `<T>` with the same `T` body type.
       *
       */
      request(first2, url, options = {}) {
        let req;
        if (first2 instanceof HttpRequest) {
          req = first2;
        } else {
          let headers = void 0;
          if (options.headers instanceof HttpHeaders) {
            headers = options.headers;
          } else {
            headers = new HttpHeaders(options.headers);
          }
          let params = void 0;
          if (!!options.params) {
            if (options.params instanceof HttpParams) {
              params = options.params;
            } else {
              params = new HttpParams({ fromObject: options.params });
            }
          }
          req = new HttpRequest(first2, url, options.body !== void 0 ? options.body : null, {
            headers,
            context: options.context,
            params,
            reportProgress: options.reportProgress,
            // By default, JSON is assumed to be returned for all calls.
            responseType: options.responseType || "json",
            withCredentials: options.withCredentials,
            transferCache: options.transferCache,
            keepalive: options.keepalive,
            priority: options.priority,
            cache: options.cache,
            mode: options.mode,
            redirect: options.redirect,
            credentials: options.credentials,
            referrer: options.referrer,
            integrity: options.integrity,
            timeout: options.timeout
          });
        }
        const events$ = of(req).pipe(concatMap((req2) => this.handler.handle(req2)));
        if (first2 instanceof HttpRequest || options.observe === "events") {
          return events$;
        }
        const res$ = events$.pipe(filter((event) => event instanceof HttpResponse));
        switch (options.observe || "body") {
          case "body":
            switch (req.responseType) {
              case "arraybuffer":
                return res$.pipe(map((res) => {
                  if (res.body !== null && !(res.body instanceof ArrayBuffer)) {
                    throw new RuntimeError(2806, ngDevMode && "Response is not an ArrayBuffer.");
                  }
                  return res.body;
                }));
              case "blob":
                return res$.pipe(map((res) => {
                  if (res.body !== null && !(res.body instanceof Blob)) {
                    throw new RuntimeError(2807, ngDevMode && "Response is not a Blob.");
                  }
                  return res.body;
                }));
              case "text":
                return res$.pipe(map((res) => {
                  if (res.body !== null && typeof res.body !== "string") {
                    throw new RuntimeError(2808, ngDevMode && "Response is not a string.");
                  }
                  return res.body;
                }));
              case "json":
              default:
                return res$.pipe(map((res) => res.body));
            }
          case "response":
            return res$;
          default:
            throw new RuntimeError(2809, ngDevMode && `Unreachable: unhandled observe type ${options.observe}}`);
        }
      }
      /**
       * Constructs an observable that, when subscribed, causes the configured
       * `DELETE` request to execute on the server. See the individual overloads for
       * details on the return type.
       *
       * @param url     The endpoint URL.
       * @param options The HTTP options to send with the request.
       *
       */
      delete(url, options = {}) {
        return this.request("DELETE", url, options);
      }
      /**
       * Constructs an observable that, when subscribed, causes the configured
       * `GET` request to execute on the server. See the individual overloads for
       * details on the return type.
       */
      get(url, options = {}) {
        return this.request("GET", url, options);
      }
      /**
       * Constructs an observable that, when subscribed, causes the configured
       * `HEAD` request to execute on the server. The `HEAD` method returns
       * meta information about the resource without transferring the
       * resource itself. See the individual overloads for
       * details on the return type.
       */
      head(url, options = {}) {
        return this.request("HEAD", url, options);
      }
      /**
       * Constructs an `Observable` that, when subscribed, causes a request with the special method
       * `JSONP` to be dispatched via the interceptor pipeline.
       * The [JSONP pattern](https://en.wikipedia.org/wiki/JSONP) works around limitations of certain
       * API endpoints that don't support newer,
       * and preferable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) protocol.
       * JSONP treats the endpoint API as a JavaScript file and tricks the browser to process the
       * requests even if the API endpoint is not located on the same domain (origin) as the client-side
       * application making the request.
       * The endpoint API must support JSONP callback for JSONP requests to work.
       * The resource API returns the JSON response wrapped in a callback function.
       * You can pass the callback function name as one of the query parameters.
       * Note that JSONP requests can only be used with `GET` requests.
       *
       * @param url The resource URL.
       * @param callbackParam The callback function name.
       *
       */
      jsonp(url, callbackParam) {
        return this.request("JSONP", url, {
          params: new HttpParams().append(callbackParam, "JSONP_CALLBACK"),
          observe: "body",
          responseType: "json"
        });
      }
      /**
       * Constructs an `Observable` that, when subscribed, causes the configured
       * `OPTIONS` request to execute on the server. This method allows the client
       * to determine the supported HTTP methods and other capabilities of an endpoint,
       * without implying a resource action. See the individual overloads for
       * details on the return type.
       */
      options(url, options = {}) {
        return this.request("OPTIONS", url, options);
      }
      /**
       * Constructs an observable that, when subscribed, causes the configured
       * `PATCH` request to execute on the server. See the individual overloads for
       * details on the return type.
       */
      patch(url, body, options = {}) {
        return this.request("PATCH", url, addBody(options, body));
      }
      /**
       * Constructs an observable that, when subscribed, causes the configured
       * `POST` request to execute on the server. The server responds with the location of
       * the replaced resource. See the individual overloads for
       * details on the return type.
       */
      post(url, body, options = {}) {
        return this.request("POST", url, addBody(options, body));
      }
      /**
       * Constructs an observable that, when subscribed, causes the configured
       * `PUT` request to execute on the server. The `PUT` method replaces an existing resource
       * with a new set of values.
       * See the individual overloads for details on the return type.
       */
      put(url, body, options = {}) {
        return this.request("PUT", url, addBody(options, body));
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpClient, deps: [{ token: HttpHandler }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpClient });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: HttpClient, decorators: [{
      type: Injectable
    }], ctorParameters: () => [{ type: HttpHandler }] });
    XSSI_PREFIX$1 = /^\)\]\}',?\n/;
    FETCH_BACKEND = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "FETCH_BACKEND" : "");
    FetchBackend = class _FetchBackend {
      // We use an arrow function to always reference the current global implementation of `fetch`.
      // This is helpful for cases when the global `fetch` implementation is modified by external code,
      // see https://github.com/angular/angular/issues/57527.
      fetchImpl = inject(FetchFactory, { optional: true })?.fetch ?? ((...args) => globalThis.fetch(...args));
      ngZone = inject(NgZone);
      destroyRef = inject(DestroyRef);
      destroyed = false;
      constructor() {
        this.destroyRef.onDestroy(() => {
          this.destroyed = true;
        });
      }
      handle(request) {
        return new Observable((observer) => {
          const aborter = new AbortController();
          this.doRequest(request, aborter.signal, observer).then(noop, (error) => observer.error(new HttpErrorResponse({ error })));
          let timeoutId;
          if (request.timeout) {
            timeoutId = this.ngZone.runOutsideAngular(() => setTimeout(() => {
              if (!aborter.signal.aborted) {
                aborter.abort(new DOMException("signal timed out", "TimeoutError"));
              }
            }, request.timeout));
          }
          return () => {
            if (timeoutId !== void 0) {
              clearTimeout(timeoutId);
            }
            aborter.abort();
          };
        });
      }
      doRequest(request, signal2, observer) {
        return __async(this, null, function* () {
          const init = this.createRequestInit(request);
          let response;
          try {
            const fetchPromise = this.ngZone.runOutsideAngular(() => this.fetchImpl(request.urlWithParams, __spreadValues({ signal: signal2 }, init)));
            silenceSuperfluousUnhandledPromiseRejection(fetchPromise);
            observer.next({ type: HttpEventType.Sent });
            response = yield fetchPromise;
          } catch (error) {
            observer.error(new HttpErrorResponse({
              error,
              status: error.status ?? 0,
              statusText: error.statusText,
              url: request.urlWithParams,
              headers: error.headers
            }));
            return;
          }
          const headers = new HttpHeaders(response.headers);
          const statusText = response.statusText;
          const url = getResponseUrl$1(response) ?? request.urlWithParams;
          let status = response.status;
          let body = null;
          if (request.reportProgress) {
            observer.next(new HttpHeaderResponse({ headers, status, statusText, url }));
          }
          if (response.body) {
            const contentLength = response.headers.get("content-length");
            const chunks = [];
            const reader = response.body.getReader();
            let receivedLength = 0;
            let decoder;
            let partialText;
            const reqZone = typeof Zone !== "undefined" && Zone.current;
            let canceled = false;
            yield this.ngZone.runOutsideAngular(() => __async(this, null, function* () {
              while (true) {
                if (this.destroyed) {
                  yield reader.cancel();
                  canceled = true;
                  break;
                }
                const { done, value } = yield reader.read();
                if (done) {
                  break;
                }
                chunks.push(value);
                receivedLength += value.length;
                if (request.reportProgress) {
                  partialText = request.responseType === "text" ? (partialText ?? "") + (decoder ??= new TextDecoder()).decode(value, { stream: true }) : void 0;
                  const reportProgress = () => observer.next({
                    type: HttpEventType.DownloadProgress,
                    total: contentLength ? +contentLength : void 0,
                    loaded: receivedLength,
                    partialText
                  });
                  reqZone ? reqZone.run(reportProgress) : reportProgress();
                }
              }
            }));
            if (canceled) {
              observer.complete();
              return;
            }
            const chunksAll = this.concatChunks(chunks, receivedLength);
            try {
              const contentType = response.headers.get(CONTENT_TYPE_HEADER) ?? "";
              body = this.parseBody(request, chunksAll, contentType, status);
            } catch (error) {
              observer.error(new HttpErrorResponse({
                error,
                headers: new HttpHeaders(response.headers),
                status: response.status,
                statusText: response.statusText,
                url: getResponseUrl$1(response) ?? request.urlWithParams
              }));
              return;
            }
          }
          if (status === 0) {
            status = body ? HTTP_STATUS_CODE_OK : 0;
          }
          const ok = status >= 200 && status < 300;
          const redirected = response.redirected;
          if (ok) {
            observer.next(new HttpResponse({
              body,
              headers,
              status,
              statusText,
              url,
              redirected
            }));
            observer.complete();
          } else {
            observer.error(new HttpErrorResponse({
              error: body,
              headers,
              status,
              statusText,
              url,
              redirected
            }));
          }
        });
      }
      parseBody(request, binContent, contentType, status) {
        switch (request.responseType) {
          case "json":
            const text = new TextDecoder().decode(binContent).replace(XSSI_PREFIX$1, "");
            if (text === "") {
              return null;
            }
            try {
              return JSON.parse(text);
            } catch (e) {
              if (status < 200 || status >= 300) {
                return text;
              }
              throw e;
            }
          case "text":
            return new TextDecoder().decode(binContent);
          case "blob":
            return new Blob([binContent], { type: contentType });
          case "arraybuffer":
            return binContent.buffer;
        }
      }
      createRequestInit(req) {
        const headers = {};
        let credentials;
        credentials = req.credentials;
        if (req.withCredentials) {
          (typeof ngDevMode === "undefined" || ngDevMode) && warningOptionsMessage(req);
          credentials = "include";
        }
        req.headers.forEach((name, values) => headers[name] = values.join(","));
        if (!req.headers.has(ACCEPT_HEADER)) {
          headers[ACCEPT_HEADER] = ACCEPT_HEADER_VALUE;
        }
        if (!req.headers.has(CONTENT_TYPE_HEADER)) {
          const detectedType = req.detectContentTypeHeader();
          if (detectedType !== null) {
            headers[CONTENT_TYPE_HEADER] = detectedType;
          }
        }
        return {
          body: req.serializeBody(),
          method: req.method,
          headers,
          credentials,
          keepalive: req.keepalive,
          cache: req.cache,
          priority: req.priority,
          mode: req.mode,
          redirect: req.redirect,
          referrer: req.referrer,
          integrity: req.integrity
        };
      }
      concatChunks(chunks, totalLength) {
        const chunksAll = new Uint8Array(totalLength);
        let position = 0;
        for (const chunk of chunks) {
          chunksAll.set(chunk, position);
          position += chunk.length;
        }
        return chunksAll;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _FetchBackend, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _FetchBackend });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: FetchBackend, decorators: [{
      type: Injectable
    }], ctorParameters: () => [] });
    FetchFactory = class {
    };
    HTTP_INTERCEPTORS = new InjectionToken(ngDevMode ? "HTTP_INTERCEPTORS" : "");
    HTTP_INTERCEPTOR_FNS = new InjectionToken(ngDevMode ? "HTTP_INTERCEPTOR_FNS" : "");
    HTTP_ROOT_INTERCEPTOR_FNS = new InjectionToken(ngDevMode ? "HTTP_ROOT_INTERCEPTOR_FNS" : "");
    REQUESTS_CONTRIBUTE_TO_STABILITY = new InjectionToken(ngDevMode ? "REQUESTS_CONTRIBUTE_TO_STABILITY" : "", { providedIn: "root", factory: () => true });
    fetchBackendWarningDisplayed = false;
    HttpInterceptorHandler = class _HttpInterceptorHandler extends HttpHandler {
      backend;
      injector;
      chain = null;
      pendingTasks = inject(PendingTasks);
      contributeToStability = inject(REQUESTS_CONTRIBUTE_TO_STABILITY);
      constructor(backend, injector) {
        super();
        this.backend = backend;
        this.injector = injector;
        if ((typeof ngDevMode === "undefined" || ngDevMode) && !fetchBackendWarningDisplayed) {
          const isTestingBackend = this.backend.isTestingBackend;
          if (false) {
            fetchBackendWarningDisplayed = true;
            injector.get(Console).warn(formatRuntimeError(2801, "Angular detected that `HttpClient` is not configured to use `fetch` APIs. It's strongly recommended to enable `fetch` for applications that use Server-Side Rendering for better performance and compatibility. To enable `fetch`, add the `withFetch()` to the `provideHttpClient()` call at the root of the application."));
          }
        }
      }
      handle(initialRequest) {
        if (this.chain === null) {
          const dedupedInterceptorFns = Array.from(/* @__PURE__ */ new Set([
            ...this.injector.get(HTTP_INTERCEPTOR_FNS),
            ...this.injector.get(HTTP_ROOT_INTERCEPTOR_FNS, [])
          ]));
          this.chain = dedupedInterceptorFns.reduceRight((nextSequencedFn, interceptorFn) => chainedInterceptorFn(nextSequencedFn, interceptorFn, this.injector), interceptorChainEndFn);
        }
        if (this.contributeToStability) {
          const removeTask = this.pendingTasks.add();
          return this.chain(initialRequest, (downstreamRequest) => this.backend.handle(downstreamRequest)).pipe(finalize(removeTask));
        } else {
          return this.chain(initialRequest, (downstreamRequest) => this.backend.handle(downstreamRequest));
        }
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpInterceptorHandler, deps: [{ token: HttpBackend }, { token: EnvironmentInjector }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpInterceptorHandler });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: HttpInterceptorHandler, decorators: [{
      type: Injectable
    }], ctorParameters: () => [{ type: HttpBackend }, { type: EnvironmentInjector }] });
    nextRequestId = 0;
    JSONP_ERR_NO_CALLBACK = "JSONP injected script did not invoke callback.";
    JSONP_ERR_WRONG_METHOD = "JSONP requests must use JSONP request method.";
    JSONP_ERR_WRONG_RESPONSE_TYPE = "JSONP requests must use Json response type.";
    JSONP_ERR_HEADERS_NOT_SUPPORTED = "JSONP requests do not support headers.";
    JsonpCallbackContext = class {
    };
    JsonpClientBackend = class _JsonpClientBackend {
      callbackMap;
      document;
      /**
       * A resolved promise that can be used to schedule microtasks in the event handlers.
       */
      resolvedPromise = Promise.resolve();
      constructor(callbackMap, document) {
        this.callbackMap = callbackMap;
        this.document = document;
      }
      /**
       * Get the name of the next callback method, by incrementing the global `nextRequestId`.
       */
      nextCallback() {
        return `ng_jsonp_callback_${nextRequestId++}`;
      }
      /**
       * Processes a JSONP request and returns an event stream of the results.
       * @param req The request object.
       * @returns An observable of the response events.
       *
       */
      handle(req) {
        if (req.method !== "JSONP") {
          throw new RuntimeError(2810, ngDevMode && JSONP_ERR_WRONG_METHOD);
        } else if (req.responseType !== "json") {
          throw new RuntimeError(2811, ngDevMode && JSONP_ERR_WRONG_RESPONSE_TYPE);
        }
        if (req.headers.keys().length > 0) {
          throw new RuntimeError(2812, ngDevMode && JSONP_ERR_HEADERS_NOT_SUPPORTED);
        }
        return new Observable((observer) => {
          const callback = this.nextCallback();
          const url = req.urlWithParams.replace(/=JSONP_CALLBACK(&|$)/, `=${callback}$1`);
          const node = this.document.createElement("script");
          node.src = url;
          let body = null;
          let finished = false;
          this.callbackMap[callback] = (data) => {
            delete this.callbackMap[callback];
            body = data;
            finished = true;
          };
          const cleanup = () => {
            node.removeEventListener("load", onLoad);
            node.removeEventListener("error", onError);
            node.remove();
            delete this.callbackMap[callback];
          };
          const onLoad = () => {
            this.resolvedPromise.then(() => {
              cleanup();
              if (!finished) {
                observer.error(new HttpErrorResponse({
                  url,
                  status: 0,
                  statusText: "JSONP Error",
                  error: new Error(JSONP_ERR_NO_CALLBACK)
                }));
                return;
              }
              observer.next(new HttpResponse({
                body,
                status: HTTP_STATUS_CODE_OK,
                statusText: "OK",
                url
              }));
              observer.complete();
            });
          };
          const onError = (error) => {
            cleanup();
            observer.error(new HttpErrorResponse({
              error,
              status: 0,
              statusText: "JSONP Error",
              url
            }));
          };
          node.addEventListener("load", onLoad);
          node.addEventListener("error", onError);
          this.document.body.appendChild(node);
          observer.next({ type: HttpEventType.Sent });
          return () => {
            if (!finished) {
              this.removeListeners(node);
            }
            cleanup();
          };
        });
      }
      removeListeners(script) {
        foreignDocument ??= this.document.implementation.createHTMLDocument();
        foreignDocument.adoptNode(script);
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _JsonpClientBackend, deps: [{ token: JsonpCallbackContext }, { token: DOCUMENT }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _JsonpClientBackend });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: JsonpClientBackend, decorators: [{
      type: Injectable
    }], ctorParameters: () => [{ type: JsonpCallbackContext }, { type: void 0, decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }] }] });
    JsonpInterceptor = class _JsonpInterceptor {
      injector;
      constructor(injector) {
        this.injector = injector;
      }
      /**
       * Identifies and handles a given JSONP request.
       * @param initialRequest The outgoing request object to handle.
       * @param next The next interceptor in the chain, or the backend
       * if no interceptors remain in the chain.
       * @returns An observable of the event stream.
       */
      intercept(initialRequest, next) {
        return runInInjectionContext(this.injector, () => jsonpInterceptorFn(initialRequest, (downstreamRequest) => next.handle(downstreamRequest)));
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _JsonpInterceptor, deps: [{ token: EnvironmentInjector }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _JsonpInterceptor });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: JsonpInterceptor, decorators: [{
      type: Injectable
    }], ctorParameters: () => [{ type: EnvironmentInjector }] });
    XSSI_PREFIX = /^\)\]\}',?\n/;
    X_REQUEST_URL_REGEXP = RegExp(`^${X_REQUEST_URL_HEADER}:`, "m");
    HttpXhrBackend = class _HttpXhrBackend {
      xhrFactory;
      constructor(xhrFactory) {
        this.xhrFactory = xhrFactory;
      }
      /**
       * Processes a request and returns a stream of response events.
       * @param req The request object.
       * @returns An observable of the response events.
       */
      handle(req) {
        if (req.method === "JSONP") {
          throw new RuntimeError(-2800, (typeof ngDevMode === "undefined" || ngDevMode) && `Cannot make a JSONP request without JSONP support. To fix the problem, either add the \`withJsonpSupport()\` call (if \`provideHttpClient()\` is used) or import the \`HttpClientJsonpModule\` in the root NgModule.`);
        }
        ngDevMode && validateXhrCompatibility(req);
        const xhrFactory = this.xhrFactory;
        const source = (
          // Note that `ɵloadImpl` is never defined in client bundles and can be
          // safely dropped whenever we're running in the browser.
          // This branching is redundant.
          // The `ngServerMode` guard also enables tree-shaking of the `from()`
          // function from the common bundle, as it's only used in server code.
          false ? from(xhrFactory.\u0275loadImpl()) : of(null)
        );
        return source.pipe(switchMap(() => {
          return new Observable((observer) => {
            const xhr = xhrFactory.build();
            xhr.open(req.method, req.urlWithParams);
            if (req.withCredentials) {
              xhr.withCredentials = true;
            }
            req.headers.forEach((name, values) => xhr.setRequestHeader(name, values.join(",")));
            if (!req.headers.has(ACCEPT_HEADER)) {
              xhr.setRequestHeader(ACCEPT_HEADER, ACCEPT_HEADER_VALUE);
            }
            if (!req.headers.has(CONTENT_TYPE_HEADER)) {
              const detectedType = req.detectContentTypeHeader();
              if (detectedType !== null) {
                xhr.setRequestHeader(CONTENT_TYPE_HEADER, detectedType);
              }
            }
            if (req.timeout) {
              xhr.timeout = req.timeout;
            }
            if (req.responseType) {
              const responseType = req.responseType.toLowerCase();
              xhr.responseType = responseType !== "json" ? responseType : "text";
            }
            const reqBody = req.serializeBody();
            let headerResponse = null;
            const partialFromXhr = () => {
              if (headerResponse !== null) {
                return headerResponse;
              }
              const statusText = xhr.statusText || "OK";
              const headers = new HttpHeaders(xhr.getAllResponseHeaders());
              const url = getResponseUrl(xhr) || req.url;
              headerResponse = new HttpHeaderResponse({ headers, status: xhr.status, statusText, url });
              return headerResponse;
            };
            const onLoad = () => {
              let { headers, status, statusText, url } = partialFromXhr();
              let body = null;
              if (status !== HTTP_STATUS_CODE_NO_CONTENT) {
                body = typeof xhr.response === "undefined" ? xhr.responseText : xhr.response;
              }
              if (status === 0) {
                status = !!body ? HTTP_STATUS_CODE_OK : 0;
              }
              let ok = status >= 200 && status < 300;
              if (req.responseType === "json" && typeof body === "string") {
                const originalBody = body;
                body = body.replace(XSSI_PREFIX, "");
                try {
                  body = body !== "" ? JSON.parse(body) : null;
                } catch (error) {
                  body = originalBody;
                  if (ok) {
                    ok = false;
                    body = { error, text: body };
                  }
                }
              }
              if (ok) {
                observer.next(new HttpResponse({
                  body,
                  headers,
                  status,
                  statusText,
                  url: url || void 0
                }));
                observer.complete();
              } else {
                observer.error(new HttpErrorResponse({
                  // The error in this case is the response body (error from the server).
                  error: body,
                  headers,
                  status,
                  statusText,
                  url: url || void 0
                }));
              }
            };
            const onError = (error) => {
              const { url } = partialFromXhr();
              const res = new HttpErrorResponse({
                error,
                status: xhr.status || 0,
                statusText: xhr.statusText || "Unknown Error",
                url: url || void 0
              });
              observer.error(res);
            };
            let onTimeout = onError;
            if (req.timeout) {
              onTimeout = (_) => {
                const { url } = partialFromXhr();
                const res = new HttpErrorResponse({
                  error: new DOMException("Request timed out", "TimeoutError"),
                  status: xhr.status || 0,
                  statusText: xhr.statusText || "Request timeout",
                  url: url || void 0
                });
                observer.error(res);
              };
            }
            let sentHeaders = false;
            const onDownProgress = (event) => {
              if (!sentHeaders) {
                observer.next(partialFromXhr());
                sentHeaders = true;
              }
              let progressEvent = {
                type: HttpEventType.DownloadProgress,
                loaded: event.loaded
              };
              if (event.lengthComputable) {
                progressEvent.total = event.total;
              }
              if (req.responseType === "text" && !!xhr.responseText) {
                progressEvent.partialText = xhr.responseText;
              }
              observer.next(progressEvent);
            };
            const onUpProgress = (event) => {
              let progress = {
                type: HttpEventType.UploadProgress,
                loaded: event.loaded
              };
              if (event.lengthComputable) {
                progress.total = event.total;
              }
              observer.next(progress);
            };
            xhr.addEventListener("load", onLoad);
            xhr.addEventListener("error", onError);
            xhr.addEventListener("timeout", onTimeout);
            xhr.addEventListener("abort", onError);
            if (req.reportProgress) {
              xhr.addEventListener("progress", onDownProgress);
              if (reqBody !== null && xhr.upload) {
                xhr.upload.addEventListener("progress", onUpProgress);
              }
            }
            xhr.send(reqBody);
            observer.next({ type: HttpEventType.Sent });
            return () => {
              xhr.removeEventListener("error", onError);
              xhr.removeEventListener("abort", onError);
              xhr.removeEventListener("load", onLoad);
              xhr.removeEventListener("timeout", onTimeout);
              if (req.reportProgress) {
                xhr.removeEventListener("progress", onDownProgress);
                if (reqBody !== null && xhr.upload) {
                  xhr.upload.removeEventListener("progress", onUpProgress);
                }
              }
              if (xhr.readyState !== xhr.DONE) {
                xhr.abort();
              }
            };
          });
        }));
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpXhrBackend, deps: [{ token: XhrFactory }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpXhrBackend });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: HttpXhrBackend, decorators: [{
      type: Injectable
    }], ctorParameters: () => [{ type: XhrFactory }] });
    XSRF_ENABLED = new InjectionToken(ngDevMode ? "XSRF_ENABLED" : "");
    XSRF_DEFAULT_COOKIE_NAME = "XSRF-TOKEN";
    XSRF_COOKIE_NAME = new InjectionToken(ngDevMode ? "XSRF_COOKIE_NAME" : "", {
      providedIn: "root",
      factory: () => XSRF_DEFAULT_COOKIE_NAME
    });
    XSRF_DEFAULT_HEADER_NAME = "X-XSRF-TOKEN";
    XSRF_HEADER_NAME = new InjectionToken(ngDevMode ? "XSRF_HEADER_NAME" : "", {
      providedIn: "root",
      factory: () => XSRF_DEFAULT_HEADER_NAME
    });
    HttpXsrfTokenExtractor = class {
    };
    HttpXsrfCookieExtractor = class _HttpXsrfCookieExtractor {
      doc;
      cookieName;
      lastCookieString = "";
      lastToken = null;
      /**
       * @internal for testing
       */
      parseCount = 0;
      constructor(doc, cookieName) {
        this.doc = doc;
        this.cookieName = cookieName;
      }
      getToken() {
        if (false) {
          return null;
        }
        const cookieString = this.doc.cookie || "";
        if (cookieString !== this.lastCookieString) {
          this.parseCount++;
          this.lastToken = parseCookieValue(cookieString, this.cookieName);
          this.lastCookieString = cookieString;
        }
        return this.lastToken;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpXsrfCookieExtractor, deps: [{ token: DOCUMENT }, { token: XSRF_COOKIE_NAME }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpXsrfCookieExtractor });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: HttpXsrfCookieExtractor, decorators: [{
      type: Injectable
    }], ctorParameters: () => [{ type: void 0, decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }] }, { type: void 0, decorators: [{
      type: Inject,
      args: [XSRF_COOKIE_NAME]
    }] }] });
    HttpXsrfInterceptor = class _HttpXsrfInterceptor {
      injector;
      constructor(injector) {
        this.injector = injector;
      }
      intercept(initialRequest, next) {
        return runInInjectionContext(this.injector, () => xsrfInterceptorFn(initialRequest, (downstreamRequest) => next.handle(downstreamRequest)));
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpXsrfInterceptor, deps: [{ token: EnvironmentInjector }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpXsrfInterceptor });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: HttpXsrfInterceptor, decorators: [{
      type: Injectable
    }], ctorParameters: () => [{ type: EnvironmentInjector }] });
    (function(HttpFeatureKind2) {
      HttpFeatureKind2[HttpFeatureKind2["Interceptors"] = 0] = "Interceptors";
      HttpFeatureKind2[HttpFeatureKind2["LegacyInterceptors"] = 1] = "LegacyInterceptors";
      HttpFeatureKind2[HttpFeatureKind2["CustomXsrfConfiguration"] = 2] = "CustomXsrfConfiguration";
      HttpFeatureKind2[HttpFeatureKind2["NoXsrfProtection"] = 3] = "NoXsrfProtection";
      HttpFeatureKind2[HttpFeatureKind2["JsonpSupport"] = 4] = "JsonpSupport";
      HttpFeatureKind2[HttpFeatureKind2["RequestsMadeViaParent"] = 5] = "RequestsMadeViaParent";
      HttpFeatureKind2[HttpFeatureKind2["Fetch"] = 6] = "Fetch";
    })(HttpFeatureKind || (HttpFeatureKind = {}));
    LEGACY_INTERCEPTOR_FN = new InjectionToken(ngDevMode ? "LEGACY_INTERCEPTOR_FN" : "");
    HttpClientXsrfModule = class _HttpClientXsrfModule {
      /**
       * Disable the default XSRF protection.
       */
      static disable() {
        return {
          ngModule: _HttpClientXsrfModule,
          providers: [withNoXsrfProtection().\u0275providers]
        };
      }
      /**
       * Configure XSRF protection.
       * @param options An object that can specify either or both
       * cookie name or header name.
       * - Cookie name default is `XSRF-TOKEN`.
       * - Header name default is `X-XSRF-TOKEN`.
       *
       */
      static withOptions(options = {}) {
        return {
          ngModule: _HttpClientXsrfModule,
          providers: withXsrfConfiguration(options).\u0275providers
        };
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpClientXsrfModule, deps: [], target: FactoryTarget.NgModule });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpClientXsrfModule });
      static \u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpClientXsrfModule, providers: [
        HttpXsrfInterceptor,
        { provide: HTTP_INTERCEPTORS, useExisting: HttpXsrfInterceptor, multi: true },
        { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor },
        withXsrfConfiguration({
          cookieName: XSRF_DEFAULT_COOKIE_NAME,
          headerName: XSRF_DEFAULT_HEADER_NAME
        }).\u0275providers,
        { provide: XSRF_ENABLED, useValue: true }
      ] });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: HttpClientXsrfModule, decorators: [{
      type: NgModule,
      args: [{
        providers: [
          HttpXsrfInterceptor,
          { provide: HTTP_INTERCEPTORS, useExisting: HttpXsrfInterceptor, multi: true },
          { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor },
          withXsrfConfiguration({
            cookieName: XSRF_DEFAULT_COOKIE_NAME,
            headerName: XSRF_DEFAULT_HEADER_NAME
          }).\u0275providers,
          { provide: XSRF_ENABLED, useValue: true }
        ]
      }]
    }] });
    HttpClientModule = class _HttpClientModule {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpClientModule, deps: [], target: FactoryTarget.NgModule });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpClientModule });
      static \u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpClientModule, providers: [provideHttpClient(withInterceptorsFromDi())] });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: HttpClientModule, decorators: [{
      type: NgModule,
      args: [{
        /**
         * Configures the dependency injector where it is imported
         * with supporting services for HTTP communications.
         */
        providers: [provideHttpClient(withInterceptorsFromDi())]
      }]
    }] });
    HttpClientJsonpModule = class _HttpClientJsonpModule {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpClientJsonpModule, deps: [], target: FactoryTarget.NgModule });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpClientJsonpModule });
      static \u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HttpClientJsonpModule, providers: [withJsonpSupport().\u0275providers] });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: HttpClientJsonpModule, decorators: [{
      type: NgModule,
      args: [{
        providers: [withJsonpSupport().\u0275providers]
      }]
    }] });
  }
});

// node_modules/@angular/common/fesm2022/http.mjs
function makeHttpResourceFn(responseType) {
  return function httpResource2(request, options) {
    if (ngDevMode && !options?.injector) {
      assertInInjectionContext(httpResource2);
    }
    const injector = options?.injector ?? inject(Injector);
    return new HttpResourceImpl(injector, () => normalizeRequest(request, responseType), options?.defaultValue, options?.parse, options?.equal);
  };
}
function normalizeRequest(request, responseType) {
  let unwrappedRequest = typeof request === "function" ? request() : request;
  if (unwrappedRequest === void 0) {
    return void 0;
  } else if (typeof unwrappedRequest === "string") {
    unwrappedRequest = { url: unwrappedRequest };
  }
  const headers = unwrappedRequest.headers instanceof HttpHeaders ? unwrappedRequest.headers : new HttpHeaders(unwrappedRequest.headers);
  const params = unwrappedRequest.params instanceof HttpParams ? unwrappedRequest.params : new HttpParams({ fromObject: unwrappedRequest.params });
  return new HttpRequest(unwrappedRequest.method ?? "GET", unwrappedRequest.url, unwrappedRequest.body ?? null, {
    headers,
    params,
    reportProgress: unwrappedRequest.reportProgress,
    withCredentials: unwrappedRequest.withCredentials,
    keepalive: unwrappedRequest.keepalive,
    cache: unwrappedRequest.cache,
    priority: unwrappedRequest.priority,
    mode: unwrappedRequest.mode,
    redirect: unwrappedRequest.redirect,
    responseType,
    context: unwrappedRequest.context,
    transferCache: unwrappedRequest.transferCache,
    credentials: unwrappedRequest.credentials,
    referrer: unwrappedRequest.referrer,
    integrity: unwrappedRequest.integrity,
    timeout: unwrappedRequest.timeout
  });
}
var httpResource, HttpResourceImpl, HTTP_TRANSFER_CACHE_ORIGIN_MAP, CACHE_OPTIONS;
var init_http = __esm({
  "node_modules/@angular/common/fesm2022/http.mjs"() {
    "use strict";
    init_module();
    init_core();
    httpResource = (() => {
      const jsonFn = makeHttpResourceFn("json");
      jsonFn.arrayBuffer = makeHttpResourceFn("arraybuffer");
      jsonFn.blob = makeHttpResourceFn("blob");
      jsonFn.text = makeHttpResourceFn("text");
      return jsonFn;
    })();
    HttpResourceImpl = class extends ResourceImpl {
      client;
      _headers = linkedSignal({
        source: this.extRequest,
        computation: () => void 0
      });
      _progress = linkedSignal({
        source: this.extRequest,
        computation: () => void 0
      });
      _statusCode = linkedSignal({
        source: this.extRequest,
        computation: () => void 0
      });
      headers = computed(() => this.status() === "resolved" || this.status() === "error" ? this._headers() : void 0, ...ngDevMode ? [{ debugName: "headers" }] : []);
      progress = this._progress.asReadonly();
      statusCode = this._statusCode.asReadonly();
      constructor(injector, request, defaultValue, parse, equal) {
        super(request, ({ params: request2, abortSignal }) => {
          let sub;
          const onAbort = () => sub.unsubscribe();
          abortSignal.addEventListener("abort", onAbort);
          const stream = signal({ value: void 0 }, ...ngDevMode ? [{ debugName: "stream" }] : []);
          let resolve;
          const promise = new Promise((r) => resolve = r);
          const send = (value) => {
            stream.set(value);
            resolve?.(stream);
            resolve = void 0;
          };
          sub = this.client.request(request2).subscribe({
            next: (event) => {
              switch (event.type) {
                case HttpEventType.Response:
                  this._headers.set(event.headers);
                  this._statusCode.set(event.status);
                  try {
                    send({ value: parse ? parse(event.body) : event.body });
                  } catch (error) {
                    send({ error: encapsulateResourceError(error) });
                  }
                  break;
                case HttpEventType.DownloadProgress:
                  this._progress.set(event);
                  break;
              }
            },
            error: (error) => {
              if (error instanceof HttpErrorResponse) {
                this._headers.set(error.headers);
                this._statusCode.set(error.status);
              }
              send({ error });
              abortSignal.removeEventListener("abort", onAbort);
            },
            complete: () => {
              if (resolve) {
                send({
                  error: new RuntimeError(991, ngDevMode && "Resource completed before producing a value")
                });
              }
              abortSignal.removeEventListener("abort", onAbort);
            }
          });
          return promise;
        }, defaultValue, equal, injector);
        this.client = injector.get(HttpClient);
      }
      set(value) {
        super.set(value);
        this._headers.set(void 0);
        this._progress.set(void 0);
        this._statusCode.set(void 0);
      }
    };
    HTTP_TRANSFER_CACHE_ORIGIN_MAP = new InjectionToken(ngDevMode ? "HTTP_TRANSFER_CACHE_ORIGIN_MAP" : "");
    CACHE_OPTIONS = new InjectionToken(ngDevMode ? "HTTP_TRANSFER_STATE_CACHE_OPTIONS" : "");
  }
});

// node_modules/@angular/platform-browser/fesm2022/platform-browser.mjs
var Meta, META_KEYS_MAP, Title, EVENT_NAMES, HAMMER_GESTURE_CONFIG, HAMMER_LOADER, HammerGestureConfig, HammerGesturesPlugin, HammerModule, DomSanitizer, DomSanitizerImpl, HydrationFeatureKind, VERSION;
var init_platform_browser = __esm({
  "node_modules/@angular/platform-browser/fesm2022/platform-browser.mjs"() {
    "use strict";
    init_common();
    init_core();
    init_core();
    init_dom_renderer();
    Meta = class _Meta {
      _doc;
      _dom;
      constructor(_doc) {
        this._doc = _doc;
        this._dom = getDOM();
      }
      /**
       * Retrieves or creates a specific `<meta>` tag element in the current HTML document.
       * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
       * values in the provided tag definition, and verifies that all other attribute values are equal.
       * If an existing element is found, it is returned and is not modified in any way.
       * @param tag The definition of a `<meta>` element to match or create.
       * @param forceCreation True to create a new element without checking whether one already exists.
       * @returns The existing element with the same attributes and values if found,
       * the new element if no match is found, or `null` if the tag parameter is not defined.
       */
      addTag(tag, forceCreation = false) {
        if (!tag)
          return null;
        return this._getOrCreateElement(tag, forceCreation);
      }
      /**
       * Retrieves or creates a set of `<meta>` tag elements in the current HTML document.
       * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
       * values in the provided tag definition, and verifies that all other attribute values are equal.
       * @param tags An array of tag definitions to match or create.
       * @param forceCreation True to create new elements without checking whether they already exist.
       * @returns The matching elements if found, or the new elements.
       */
      addTags(tags, forceCreation = false) {
        if (!tags)
          return [];
        return tags.reduce((result, tag) => {
          if (tag) {
            result.push(this._getOrCreateElement(tag, forceCreation));
          }
          return result;
        }, []);
      }
      /**
       * Retrieves a `<meta>` tag element in the current HTML document.
       * @param attrSelector The tag attribute and value to match against, in the format
       * `"tag_attribute='value string'"`.
       * @returns The matching element, if any.
       */
      getTag(attrSelector) {
        if (!attrSelector)
          return null;
        return this._doc.querySelector(`meta[${attrSelector}]`) || null;
      }
      /**
       * Retrieves a set of `<meta>` tag elements in the current HTML document.
       * @param attrSelector The tag attribute and value to match against, in the format
       * `"tag_attribute='value string'"`.
       * @returns The matching elements, if any.
       */
      getTags(attrSelector) {
        if (!attrSelector)
          return [];
        const list = this._doc.querySelectorAll(`meta[${attrSelector}]`);
        return list ? [].slice.call(list) : [];
      }
      /**
       * Modifies an existing `<meta>` tag element in the current HTML document.
       * @param tag The tag description with which to replace the existing tag content.
       * @param selector A tag attribute and value to match against, to identify
       * an existing tag. A string in the format `"tag_attribute=`value string`"`.
       * If not supplied, matches a tag with the same `name` or `property` attribute value as the
       * replacement tag.
       * @return The modified element.
       */
      updateTag(tag, selector) {
        if (!tag)
          return null;
        selector = selector || this._parseSelector(tag);
        const meta = this.getTag(selector);
        if (meta) {
          return this._setMetaElementAttributes(tag, meta);
        }
        return this._getOrCreateElement(tag, true);
      }
      /**
       * Removes an existing `<meta>` tag element from the current HTML document.
       * @param attrSelector A tag attribute and value to match against, to identify
       * an existing tag. A string in the format `"tag_attribute=`value string`"`.
       */
      removeTag(attrSelector) {
        this.removeTagElement(this.getTag(attrSelector));
      }
      /**
       * Removes an existing `<meta>` tag element from the current HTML document.
       * @param meta The tag definition to match against to identify an existing tag.
       */
      removeTagElement(meta) {
        if (meta) {
          this._dom.remove(meta);
        }
      }
      _getOrCreateElement(meta, forceCreation = false) {
        if (!forceCreation) {
          const selector = this._parseSelector(meta);
          const elem = this.getTags(selector).filter((elem2) => this._containsAttributes(meta, elem2))[0];
          if (elem !== void 0)
            return elem;
        }
        const element = this._dom.createElement("meta");
        this._setMetaElementAttributes(meta, element);
        const head = this._doc.getElementsByTagName("head")[0];
        head.appendChild(element);
        return element;
      }
      _setMetaElementAttributes(tag, el) {
        Object.keys(tag).forEach((prop) => el.setAttribute(this._getMetaKeyMap(prop), tag[prop]));
        return el;
      }
      _parseSelector(tag) {
        const attr = tag.name ? "name" : "property";
        return `${attr}="${tag[attr]}"`;
      }
      _containsAttributes(tag, elem) {
        return Object.keys(tag).every((key) => elem.getAttribute(this._getMetaKeyMap(key)) === tag[key]);
      }
      _getMetaKeyMap(prop) {
        return META_KEYS_MAP[prop] || prop;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _Meta, deps: [{ token: DOCUMENT }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _Meta, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: Meta, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }], ctorParameters: () => [{ type: void 0, decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }] }] });
    META_KEYS_MAP = {
      httpEquiv: "http-equiv"
    };
    Title = class _Title {
      _doc;
      constructor(_doc) {
        this._doc = _doc;
      }
      /**
       * Get the title of the current HTML document.
       */
      getTitle() {
        return this._doc.title;
      }
      /**
       * Set the title of the current HTML document.
       * @param newTitle
       */
      setTitle(newTitle) {
        this._doc.title = newTitle || "";
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _Title, deps: [{ token: DOCUMENT }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _Title, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: Title, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }], ctorParameters: () => [{ type: void 0, decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }] }] });
    EVENT_NAMES = {
      // pan
      "pan": true,
      "panstart": true,
      "panmove": true,
      "panend": true,
      "pancancel": true,
      "panleft": true,
      "panright": true,
      "panup": true,
      "pandown": true,
      // pinch
      "pinch": true,
      "pinchstart": true,
      "pinchmove": true,
      "pinchend": true,
      "pinchcancel": true,
      "pinchin": true,
      "pinchout": true,
      // press
      "press": true,
      "pressup": true,
      // rotate
      "rotate": true,
      "rotatestart": true,
      "rotatemove": true,
      "rotateend": true,
      "rotatecancel": true,
      // swipe
      "swipe": true,
      "swipeleft": true,
      "swiperight": true,
      "swipeup": true,
      "swipedown": true,
      // tap
      "tap": true,
      "doubletap": true
    };
    HAMMER_GESTURE_CONFIG = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "HammerGestureConfig" : "");
    HAMMER_LOADER = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "HammerLoader" : "");
    HammerGestureConfig = class _HammerGestureConfig {
      /**
       * A set of supported event names for gestures to be used in Angular.
       * Angular supports all built-in recognizers, as listed in
       * [HammerJS documentation](https://hammerjs.github.io/).
       */
      events = [];
      /**
       * Maps gesture event names to a set of configuration options
       * that specify overrides to the default values for specific properties.
       *
       * The key is a supported event name to be configured,
       * and the options object contains a set of properties, with override values
       * to be applied to the named recognizer event.
       * For example, to disable recognition of the rotate event, specify
       *  `{"rotate": {"enable": false}}`.
       *
       * Properties that are not present take the HammerJS default values.
       * For information about which properties are supported for which events,
       * and their allowed and default values, see
       * [HammerJS documentation](https://hammerjs.github.io/).
       *
       */
      overrides = {};
      /**
       * Properties whose default values can be overridden for a given event.
       * Different sets of properties apply to different events.
       * For information about which properties are supported for which events,
       * and their allowed and default values, see
       * [HammerJS documentation](https://hammerjs.github.io/).
       */
      options;
      /**
       * Creates a [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
       * and attaches it to a given HTML element.
       * @param element The element that will recognize gestures.
       * @returns A HammerJS event-manager object.
       */
      buildHammer(element) {
        const mc = new Hammer(element, this.options);
        mc.get("pinch").set({ enable: true });
        mc.get("rotate").set({ enable: true });
        for (const eventName in this.overrides) {
          mc.get(eventName).set(this.overrides[eventName]);
        }
        return mc;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HammerGestureConfig, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HammerGestureConfig });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: HammerGestureConfig, decorators: [{
      type: Injectable
    }] });
    HammerGesturesPlugin = class _HammerGesturesPlugin extends EventManagerPlugin {
      _config;
      _injector;
      loader;
      _loaderPromise = null;
      constructor(doc, _config, _injector, loader) {
        super(doc);
        this._config = _config;
        this._injector = _injector;
        this.loader = loader;
      }
      supports(eventName) {
        if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
          return false;
        }
        if (!window.Hammer && !this.loader) {
          if (typeof ngDevMode === "undefined" || ngDevMode) {
            const _console = this._injector.get(Console);
            _console.warn(`The "${eventName}" event cannot be bound because Hammer.JS is not loaded and no custom loader has been specified.`);
          }
          return false;
        }
        return true;
      }
      addEventListener(element, eventName, handler) {
        const zone = this.manager.getZone();
        eventName = eventName.toLowerCase();
        if (!window.Hammer && this.loader) {
          this._loaderPromise = this._loaderPromise || zone.runOutsideAngular(() => this.loader());
          let cancelRegistration = false;
          let deregister = () => {
            cancelRegistration = true;
          };
          zone.runOutsideAngular(() => this._loaderPromise.then(() => {
            if (!window.Hammer) {
              if (typeof ngDevMode === "undefined" || ngDevMode) {
                const _console = this._injector.get(Console);
                _console.warn(`The custom HAMMER_LOADER completed, but Hammer.JS is not present.`);
              }
              deregister = () => {
              };
              return;
            }
            if (!cancelRegistration) {
              deregister = this.addEventListener(element, eventName, handler);
            }
          }).catch(() => {
            if (typeof ngDevMode === "undefined" || ngDevMode) {
              const _console = this._injector.get(Console);
              _console.warn(`The "${eventName}" event cannot be bound because the custom Hammer.JS loader failed.`);
            }
            deregister = () => {
            };
          }));
          return () => {
            deregister();
          };
        }
        return zone.runOutsideAngular(() => {
          const mc = this._config.buildHammer(element);
          const callback = function(eventObj) {
            zone.runGuarded(function() {
              handler(eventObj);
            });
          };
          mc.on(eventName, callback);
          return () => {
            mc.off(eventName, callback);
            if (typeof mc.destroy === "function") {
              mc.destroy();
            }
          };
        });
      }
      isCustomEvent(eventName) {
        return this._config.events.indexOf(eventName) > -1;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HammerGesturesPlugin, deps: [{ token: DOCUMENT }, { token: HAMMER_GESTURE_CONFIG }, { token: Injector }, { token: HAMMER_LOADER, optional: true }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HammerGesturesPlugin });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: HammerGesturesPlugin, decorators: [{
      type: Injectable
    }], ctorParameters: () => [{ type: void 0, decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }] }, { type: HammerGestureConfig, decorators: [{
      type: Inject,
      args: [HAMMER_GESTURE_CONFIG]
    }] }, { type: Injector }, { type: void 0, decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [HAMMER_LOADER]
    }] }] });
    HammerModule = class _HammerModule {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HammerModule, deps: [], target: FactoryTarget.NgModule });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HammerModule });
      static \u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HammerModule, providers: [
        {
          provide: EVENT_MANAGER_PLUGINS,
          useClass: HammerGesturesPlugin,
          multi: true,
          deps: [DOCUMENT, HAMMER_GESTURE_CONFIG, Injector, [new Optional(), HAMMER_LOADER]]
        },
        { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig }
      ] });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: HammerModule, decorators: [{
      type: NgModule,
      args: [{
        providers: [
          {
            provide: EVENT_MANAGER_PLUGINS,
            useClass: HammerGesturesPlugin,
            multi: true,
            deps: [DOCUMENT, HAMMER_GESTURE_CONFIG, Injector, [new Optional(), HAMMER_LOADER]]
          },
          { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig }
        ]
      }]
    }] });
    DomSanitizer = class _DomSanitizer {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _DomSanitizer, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _DomSanitizer, providedIn: "root", useExisting: forwardRef(() => DomSanitizerImpl) });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: DomSanitizer, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root", useExisting: forwardRef(() => DomSanitizerImpl) }]
    }] });
    DomSanitizerImpl = class _DomSanitizerImpl extends DomSanitizer {
      _doc;
      constructor(_doc) {
        super();
        this._doc = _doc;
      }
      sanitize(ctx, value) {
        if (value == null)
          return null;
        switch (ctx) {
          case SecurityContext.NONE:
            return value;
          case SecurityContext.HTML:
            if (allowSanitizationBypassAndThrow(
              value,
              "HTML"
              /* BypassType.Html */
            )) {
              return unwrapSafeValue(value);
            }
            return _sanitizeHtml(this._doc, String(value)).toString();
          case SecurityContext.STYLE:
            if (allowSanitizationBypassAndThrow(
              value,
              "Style"
              /* BypassType.Style */
            )) {
              return unwrapSafeValue(value);
            }
            return value;
          case SecurityContext.SCRIPT:
            if (allowSanitizationBypassAndThrow(
              value,
              "Script"
              /* BypassType.Script */
            )) {
              return unwrapSafeValue(value);
            }
            throw new RuntimeError(5200, (typeof ngDevMode === "undefined" || ngDevMode) && "unsafe value used in a script context");
          case SecurityContext.URL:
            if (allowSanitizationBypassAndThrow(
              value,
              "URL"
              /* BypassType.Url */
            )) {
              return unwrapSafeValue(value);
            }
            return _sanitizeUrl(String(value));
          case SecurityContext.RESOURCE_URL:
            if (allowSanitizationBypassAndThrow(
              value,
              "ResourceURL"
              /* BypassType.ResourceUrl */
            )) {
              return unwrapSafeValue(value);
            }
            throw new RuntimeError(5201, (typeof ngDevMode === "undefined" || ngDevMode) && `unsafe value used in a resource URL context (see ${XSS_SECURITY_URL})`);
          default:
            throw new RuntimeError(5202, (typeof ngDevMode === "undefined" || ngDevMode) && `Unexpected SecurityContext ${ctx} (see ${XSS_SECURITY_URL})`);
        }
      }
      bypassSecurityTrustHtml(value) {
        return bypassSanitizationTrustHtml(value);
      }
      bypassSecurityTrustStyle(value) {
        return bypassSanitizationTrustStyle(value);
      }
      bypassSecurityTrustScript(value) {
        return bypassSanitizationTrustScript(value);
      }
      bypassSecurityTrustUrl(value) {
        return bypassSanitizationTrustUrl(value);
      }
      bypassSecurityTrustResourceUrl(value) {
        return bypassSanitizationTrustResourceUrl(value);
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _DomSanitizerImpl, deps: [{ token: DOCUMENT }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _DomSanitizerImpl, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: DomSanitizerImpl, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }], ctorParameters: () => [{ type: void 0, decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }] }] });
    (function(HydrationFeatureKind2) {
      HydrationFeatureKind2[HydrationFeatureKind2["NoHttpTransferCache"] = 0] = "NoHttpTransferCache";
      HydrationFeatureKind2[HydrationFeatureKind2["HttpTransferCacheOptions"] = 1] = "HttpTransferCacheOptions";
      HydrationFeatureKind2[HydrationFeatureKind2["I18nSupport"] = 2] = "I18nSupport";
      HydrationFeatureKind2[HydrationFeatureKind2["EventReplay"] = 3] = "EventReplay";
      HydrationFeatureKind2[HydrationFeatureKind2["IncrementalHydration"] = 4] = "IncrementalHydration";
    })(HydrationFeatureKind || (HydrationFeatureKind = {}));
    VERSION = new Version("20.2.1");
  }
});

// node_modules/@angular/router/fesm2022/router2.mjs
function convertToParamMap(params) {
  return new ParamsAsMap(params);
}
function defaultUrlMatcher(segments, segmentGroup, route) {
  const parts = route.path.split("/");
  if (parts.length > segments.length) {
    return null;
  }
  if (route.pathMatch === "full" && (segmentGroup.hasChildren() || parts.length < segments.length)) {
    return null;
  }
  const posParams = {};
  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];
    const segment = segments[index];
    const isParameter = part[0] === ":";
    if (isParameter) {
      posParams[part.substring(1)] = segment;
    } else if (part !== segment.path) {
      return null;
    }
  }
  return { consumed: segments.slice(0, parts.length), posParams };
}
function shallowEqualArrays(a, b) {
  if (a.length !== b.length)
    return false;
  for (let i = 0; i < a.length; ++i) {
    if (!shallowEqual(a[i], b[i]))
      return false;
  }
  return true;
}
function shallowEqual(a, b) {
  const k1 = a ? getDataKeys(a) : void 0;
  const k2 = b ? getDataKeys(b) : void 0;
  if (!k1 || !k2 || k1.length != k2.length) {
    return false;
  }
  let key;
  for (let i = 0; i < k1.length; i++) {
    key = k1[i];
    if (!equalArraysOrString(a[key], b[key])) {
      return false;
    }
  }
  return true;
}
function getDataKeys(obj) {
  return [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
}
function equalArraysOrString(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length)
      return false;
    const aSorted = [...a].sort();
    const bSorted = [...b].sort();
    return aSorted.every((val, index) => bSorted[index] === val);
  } else {
    return a === b;
  }
}
function last2(a) {
  return a.length > 0 ? a[a.length - 1] : null;
}
function wrapIntoObservable(value) {
  if (isObservable(value)) {
    return value;
  }
  if (isPromise(value)) {
    return from(Promise.resolve(value));
  }
  return of(value);
}
function containsTree(container, containee, options) {
  return pathCompareMap[options.paths](container.root, containee.root, options.matrixParams) && paramCompareMap[options.queryParams](container.queryParams, containee.queryParams) && !(options.fragment === "exact" && container.fragment !== containee.fragment);
}
function equalParams(container, containee) {
  return shallowEqual(container, containee);
}
function equalSegmentGroups(container, containee, matrixParams) {
  if (!equalPath(container.segments, containee.segments))
    return false;
  if (!matrixParamsMatch(container.segments, containee.segments, matrixParams)) {
    return false;
  }
  if (container.numberOfChildren !== containee.numberOfChildren)
    return false;
  for (const c in containee.children) {
    if (!container.children[c])
      return false;
    if (!equalSegmentGroups(container.children[c], containee.children[c], matrixParams))
      return false;
  }
  return true;
}
function containsParams(container, containee) {
  return Object.keys(containee).length <= Object.keys(container).length && Object.keys(containee).every((key) => equalArraysOrString(container[key], containee[key]));
}
function containsSegmentGroup(container, containee, matrixParams) {
  return containsSegmentGroupHelper(container, containee, containee.segments, matrixParams);
}
function containsSegmentGroupHelper(container, containee, containeePaths, matrixParams) {
  if (container.segments.length > containeePaths.length) {
    const current = container.segments.slice(0, containeePaths.length);
    if (!equalPath(current, containeePaths))
      return false;
    if (containee.hasChildren())
      return false;
    if (!matrixParamsMatch(current, containeePaths, matrixParams))
      return false;
    return true;
  } else if (container.segments.length === containeePaths.length) {
    if (!equalPath(container.segments, containeePaths))
      return false;
    if (!matrixParamsMatch(container.segments, containeePaths, matrixParams))
      return false;
    for (const c in containee.children) {
      if (!container.children[c])
        return false;
      if (!containsSegmentGroup(container.children[c], containee.children[c], matrixParams)) {
        return false;
      }
    }
    return true;
  } else {
    const current = containeePaths.slice(0, container.segments.length);
    const next = containeePaths.slice(container.segments.length);
    if (!equalPath(container.segments, current))
      return false;
    if (!matrixParamsMatch(container.segments, current, matrixParams))
      return false;
    if (!container.children[PRIMARY_OUTLET])
      return false;
    return containsSegmentGroupHelper(container.children[PRIMARY_OUTLET], containee, next, matrixParams);
  }
}
function matrixParamsMatch(containerPaths, containeePaths, options) {
  return containeePaths.every((containeeSegment, i) => {
    return paramCompareMap[options](containerPaths[i].parameters, containeeSegment.parameters);
  });
}
function equalSegments(as, bs) {
  return equalPath(as, bs) && as.every((a, i) => shallowEqual(a.parameters, bs[i].parameters));
}
function equalPath(as, bs) {
  if (as.length !== bs.length)
    return false;
  return as.every((a, i) => a.path === bs[i].path);
}
function mapChildrenIntoArray(segment, fn) {
  let res = [];
  Object.entries(segment.children).forEach(([childOutlet, child]) => {
    if (childOutlet === PRIMARY_OUTLET) {
      res = res.concat(fn(child, childOutlet));
    }
  });
  Object.entries(segment.children).forEach(([childOutlet, child]) => {
    if (childOutlet !== PRIMARY_OUTLET) {
      res = res.concat(fn(child, childOutlet));
    }
  });
  return res;
}
function serializePaths(segment) {
  return segment.segments.map((p) => serializePath(p)).join("/");
}
function serializeSegment(segment, root) {
  if (!segment.hasChildren()) {
    return serializePaths(segment);
  }
  if (root) {
    const primary = segment.children[PRIMARY_OUTLET] ? serializeSegment(segment.children[PRIMARY_OUTLET], false) : "";
    const children = [];
    Object.entries(segment.children).forEach(([k, v]) => {
      if (k !== PRIMARY_OUTLET) {
        children.push(`${k}:${serializeSegment(v, false)}`);
      }
    });
    return children.length > 0 ? `${primary}(${children.join("//")})` : primary;
  } else {
    const children = mapChildrenIntoArray(segment, (v, k) => {
      if (k === PRIMARY_OUTLET) {
        return [serializeSegment(segment.children[PRIMARY_OUTLET], false)];
      }
      return [`${k}:${serializeSegment(v, false)}`];
    });
    if (Object.keys(segment.children).length === 1 && segment.children[PRIMARY_OUTLET] != null) {
      return `${serializePaths(segment)}/${children[0]}`;
    }
    return `${serializePaths(segment)}/(${children.join("//")})`;
  }
}
function encodeUriString(s) {
  return encodeURIComponent(s).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",");
}
function encodeUriQuery(s) {
  return encodeUriString(s).replace(/%3B/gi, ";");
}
function encodeUriFragment(s) {
  return encodeURI(s);
}
function encodeUriSegment(s) {
  return encodeUriString(s).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&");
}
function decode(s) {
  return decodeURIComponent(s);
}
function decodeQuery(s) {
  return decode(s.replace(/\+/g, "%20"));
}
function serializePath(path) {
  return `${encodeUriSegment(path.path)}${serializeMatrixParams(path.parameters)}`;
}
function serializeMatrixParams(params) {
  return Object.entries(params).map(([key, value]) => `;${encodeUriSegment(key)}=${encodeUriSegment(value)}`).join("");
}
function serializeQueryParams(params) {
  const strParams = Object.entries(params).map(([name, value]) => {
    return Array.isArray(value) ? value.map((v) => `${encodeUriQuery(name)}=${encodeUriQuery(v)}`).join("&") : `${encodeUriQuery(name)}=${encodeUriQuery(value)}`;
  }).filter((s) => s);
  return strParams.length ? `?${strParams.join("&")}` : "";
}
function matchSegments(str) {
  const match2 = str.match(SEGMENT_RE);
  return match2 ? match2[0] : "";
}
function matchMatrixKeySegments(str) {
  const match2 = str.match(MATRIX_PARAM_SEGMENT_RE);
  return match2 ? match2[0] : "";
}
function matchQueryParams(str) {
  const match2 = str.match(QUERY_PARAM_RE);
  return match2 ? match2[0] : "";
}
function matchUrlQueryParamValue(str) {
  const match2 = str.match(QUERY_PARAM_VALUE_RE);
  return match2 ? match2[0] : "";
}
function createRoot(rootCandidate) {
  return rootCandidate.segments.length > 0 ? new UrlSegmentGroup([], { [PRIMARY_OUTLET]: rootCandidate }) : rootCandidate;
}
function squashSegmentGroup(segmentGroup) {
  const newChildren = {};
  for (const [childOutlet, child] of Object.entries(segmentGroup.children)) {
    const childCandidate = squashSegmentGroup(child);
    if (childOutlet === PRIMARY_OUTLET && childCandidate.segments.length === 0 && childCandidate.hasChildren()) {
      for (const [grandChildOutlet, grandChild] of Object.entries(childCandidate.children)) {
        newChildren[grandChildOutlet] = grandChild;
      }
    } else if (childCandidate.segments.length > 0 || childCandidate.hasChildren()) {
      newChildren[childOutlet] = childCandidate;
    }
  }
  const s = new UrlSegmentGroup(segmentGroup.segments, newChildren);
  return mergeTrivialChildren(s);
}
function mergeTrivialChildren(s) {
  if (s.numberOfChildren === 1 && s.children[PRIMARY_OUTLET]) {
    const c = s.children[PRIMARY_OUTLET];
    return new UrlSegmentGroup(s.segments.concat(c.segments), c.children);
  }
  return s;
}
function isUrlTree(v) {
  return v instanceof UrlTree;
}
function createUrlTreeFromSnapshot(relativeTo, commands, queryParams = null, fragment = null) {
  const relativeToUrlSegmentGroup = createSegmentGroupFromRoute(relativeTo);
  return createUrlTreeFromSegmentGroup(relativeToUrlSegmentGroup, commands, queryParams, fragment);
}
function createSegmentGroupFromRoute(route) {
  let targetGroup;
  function createSegmentGroupFromRouteRecursive(currentRoute) {
    const childOutlets = {};
    for (const childSnapshot of currentRoute.children) {
      const root = createSegmentGroupFromRouteRecursive(childSnapshot);
      childOutlets[childSnapshot.outlet] = root;
    }
    const segmentGroup = new UrlSegmentGroup(currentRoute.url, childOutlets);
    if (currentRoute === route) {
      targetGroup = segmentGroup;
    }
    return segmentGroup;
  }
  const rootCandidate = createSegmentGroupFromRouteRecursive(route.root);
  const rootSegmentGroup = createRoot(rootCandidate);
  return targetGroup ?? rootSegmentGroup;
}
function createUrlTreeFromSegmentGroup(relativeTo, commands, queryParams, fragment) {
  let root = relativeTo;
  while (root.parent) {
    root = root.parent;
  }
  if (commands.length === 0) {
    return tree(root, root, root, queryParams, fragment);
  }
  const nav = computeNavigation(commands);
  if (nav.toRoot()) {
    return tree(root, root, new UrlSegmentGroup([], {}), queryParams, fragment);
  }
  const position = findStartingPositionForTargetGroup(nav, root, relativeTo);
  const newSegmentGroup = position.processChildren ? updateSegmentGroupChildren(position.segmentGroup, position.index, nav.commands) : updateSegmentGroup(position.segmentGroup, position.index, nav.commands);
  return tree(root, position.segmentGroup, newSegmentGroup, queryParams, fragment);
}
function isMatrixParams(command) {
  return typeof command === "object" && command != null && !command.outlets && !command.segmentPath;
}
function isCommandWithOutlets(command) {
  return typeof command === "object" && command != null && command.outlets;
}
function tree(oldRoot, oldSegmentGroup, newSegmentGroup, queryParams, fragment) {
  let qp = {};
  if (queryParams) {
    Object.entries(queryParams).forEach(([name, value]) => {
      qp[name] = Array.isArray(value) ? value.map((v) => `${v}`) : `${value}`;
    });
  }
  let rootCandidate;
  if (oldRoot === oldSegmentGroup) {
    rootCandidate = newSegmentGroup;
  } else {
    rootCandidate = replaceSegment(oldRoot, oldSegmentGroup, newSegmentGroup);
  }
  const newRoot = createRoot(squashSegmentGroup(rootCandidate));
  return new UrlTree(newRoot, qp, fragment);
}
function replaceSegment(current, oldSegment, newSegment) {
  const children = {};
  Object.entries(current.children).forEach(([outletName, c]) => {
    if (c === oldSegment) {
      children[outletName] = newSegment;
    } else {
      children[outletName] = replaceSegment(c, oldSegment, newSegment);
    }
  });
  return new UrlSegmentGroup(current.segments, children);
}
function computeNavigation(commands) {
  if (typeof commands[0] === "string" && commands.length === 1 && commands[0] === "/") {
    return new Navigation(true, 0, commands);
  }
  let numberOfDoubleDots = 0;
  let isAbsolute = false;
  const res = commands.reduce((res2, cmd, cmdIdx) => {
    if (typeof cmd === "object" && cmd != null) {
      if (cmd.outlets) {
        const outlets = {};
        Object.entries(cmd.outlets).forEach(([name, commands2]) => {
          outlets[name] = typeof commands2 === "string" ? commands2.split("/") : commands2;
        });
        return [...res2, { outlets }];
      }
      if (cmd.segmentPath) {
        return [...res2, cmd.segmentPath];
      }
    }
    if (!(typeof cmd === "string")) {
      return [...res2, cmd];
    }
    if (cmdIdx === 0) {
      cmd.split("/").forEach((urlPart, partIndex) => {
        if (partIndex == 0 && urlPart === ".") ;
        else if (partIndex == 0 && urlPart === "") {
          isAbsolute = true;
        } else if (urlPart === "..") {
          numberOfDoubleDots++;
        } else if (urlPart != "") {
          res2.push(urlPart);
        }
      });
      return res2;
    }
    return [...res2, cmd];
  }, []);
  return new Navigation(isAbsolute, numberOfDoubleDots, res);
}
function findStartingPositionForTargetGroup(nav, root, target) {
  if (nav.isAbsolute) {
    return new Position(root, true, 0);
  }
  if (!target) {
    return new Position(root, false, NaN);
  }
  if (target.parent === null) {
    return new Position(target, true, 0);
  }
  const modifier = isMatrixParams(nav.commands[0]) ? 0 : 1;
  const index = target.segments.length - 1 + modifier;
  return createPositionApplyingDoubleDots(target, index, nav.numberOfDoubleDots);
}
function createPositionApplyingDoubleDots(group, index, numberOfDoubleDots) {
  let g = group;
  let ci = index;
  let dd = numberOfDoubleDots;
  while (dd > ci) {
    dd -= ci;
    g = g.parent;
    if (!g) {
      throw new RuntimeError(4005, (typeof ngDevMode === "undefined" || ngDevMode) && "Invalid number of '../'");
    }
    ci = g.segments.length;
  }
  return new Position(g, false, ci - dd);
}
function getOutlets(commands) {
  if (isCommandWithOutlets(commands[0])) {
    return commands[0].outlets;
  }
  return { [PRIMARY_OUTLET]: commands };
}
function updateSegmentGroup(segmentGroup, startIndex, commands) {
  segmentGroup ??= new UrlSegmentGroup([], {});
  if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
    return updateSegmentGroupChildren(segmentGroup, startIndex, commands);
  }
  const m = prefixedWith(segmentGroup, startIndex, commands);
  const slicedCommands = commands.slice(m.commandIndex);
  if (m.match && m.pathIndex < segmentGroup.segments.length) {
    const g = new UrlSegmentGroup(segmentGroup.segments.slice(0, m.pathIndex), {});
    g.children[PRIMARY_OUTLET] = new UrlSegmentGroup(segmentGroup.segments.slice(m.pathIndex), segmentGroup.children);
    return updateSegmentGroupChildren(g, 0, slicedCommands);
  } else if (m.match && slicedCommands.length === 0) {
    return new UrlSegmentGroup(segmentGroup.segments, {});
  } else if (m.match && !segmentGroup.hasChildren()) {
    return createNewSegmentGroup(segmentGroup, startIndex, commands);
  } else if (m.match) {
    return updateSegmentGroupChildren(segmentGroup, 0, slicedCommands);
  } else {
    return createNewSegmentGroup(segmentGroup, startIndex, commands);
  }
}
function updateSegmentGroupChildren(segmentGroup, startIndex, commands) {
  if (commands.length === 0) {
    return new UrlSegmentGroup(segmentGroup.segments, {});
  } else {
    const outlets = getOutlets(commands);
    const children = {};
    if (Object.keys(outlets).some((o) => o !== PRIMARY_OUTLET) && segmentGroup.children[PRIMARY_OUTLET] && segmentGroup.numberOfChildren === 1 && segmentGroup.children[PRIMARY_OUTLET].segments.length === 0) {
      const childrenOfEmptyChild = updateSegmentGroupChildren(segmentGroup.children[PRIMARY_OUTLET], startIndex, commands);
      return new UrlSegmentGroup(segmentGroup.segments, childrenOfEmptyChild.children);
    }
    Object.entries(outlets).forEach(([outlet, commands2]) => {
      if (typeof commands2 === "string") {
        commands2 = [commands2];
      }
      if (commands2 !== null) {
        children[outlet] = updateSegmentGroup(segmentGroup.children[outlet], startIndex, commands2);
      }
    });
    Object.entries(segmentGroup.children).forEach(([childOutlet, child]) => {
      if (outlets[childOutlet] === void 0) {
        children[childOutlet] = child;
      }
    });
    return new UrlSegmentGroup(segmentGroup.segments, children);
  }
}
function prefixedWith(segmentGroup, startIndex, commands) {
  let currentCommandIndex = 0;
  let currentPathIndex = startIndex;
  const noMatch2 = { match: false, pathIndex: 0, commandIndex: 0 };
  while (currentPathIndex < segmentGroup.segments.length) {
    if (currentCommandIndex >= commands.length)
      return noMatch2;
    const path = segmentGroup.segments[currentPathIndex];
    const command = commands[currentCommandIndex];
    if (isCommandWithOutlets(command)) {
      break;
    }
    const curr = `${command}`;
    const next = currentCommandIndex < commands.length - 1 ? commands[currentCommandIndex + 1] : null;
    if (currentPathIndex > 0 && curr === void 0)
      break;
    if (curr && next && typeof next === "object" && next.outlets === void 0) {
      if (!compare(curr, next, path))
        return noMatch2;
      currentCommandIndex += 2;
    } else {
      if (!compare(curr, {}, path))
        return noMatch2;
      currentCommandIndex++;
    }
    currentPathIndex++;
  }
  return { match: true, pathIndex: currentPathIndex, commandIndex: currentCommandIndex };
}
function createNewSegmentGroup(segmentGroup, startIndex, commands) {
  const paths = segmentGroup.segments.slice(0, startIndex);
  let i = 0;
  while (i < commands.length) {
    const command = commands[i];
    if (isCommandWithOutlets(command)) {
      const children = createNewSegmentChildren(command.outlets);
      return new UrlSegmentGroup(paths, children);
    }
    if (i === 0 && isMatrixParams(commands[0])) {
      const p = segmentGroup.segments[startIndex];
      paths.push(new UrlSegment(p.path, stringify(commands[0])));
      i++;
      continue;
    }
    const curr = isCommandWithOutlets(command) ? command.outlets[PRIMARY_OUTLET] : `${command}`;
    const next = i < commands.length - 1 ? commands[i + 1] : null;
    if (curr && next && isMatrixParams(next)) {
      paths.push(new UrlSegment(curr, stringify(next)));
      i += 2;
    } else {
      paths.push(new UrlSegment(curr, {}));
      i++;
    }
  }
  return new UrlSegmentGroup(paths, {});
}
function createNewSegmentChildren(outlets) {
  const children = {};
  Object.entries(outlets).forEach(([outlet, commands]) => {
    if (typeof commands === "string") {
      commands = [commands];
    }
    if (commands !== null) {
      children[outlet] = createNewSegmentGroup(new UrlSegmentGroup([], {}), 0, commands);
    }
  });
  return children;
}
function stringify(params) {
  const res = {};
  Object.entries(params).forEach(([k, v]) => res[k] = `${v}`);
  return res;
}
function compare(path, params, segment) {
  return path == segment.path && shallowEqual(params, segment.parameters);
}
function isPublicRouterEvent(e) {
  return !(e instanceof BeforeActivateRoutes) && !(e instanceof RedirectRequest);
}
function getOrCreateRouteInjectorIfNeeded(route, currentInjector) {
  if (route.providers && !route._injector) {
    route._injector = createEnvironmentInjector(route.providers, currentInjector, `Route: ${route.path}`);
  }
  return route._injector ?? currentInjector;
}
function validateConfig(config, parentPath = "", requireStandaloneComponents = false) {
  for (let i = 0; i < config.length; i++) {
    const route = config[i];
    const fullPath = getFullPath(parentPath, route);
    validateNode(route, fullPath, requireStandaloneComponents);
  }
}
function assertStandalone(fullPath, component) {
  if (component && isNgModule(component)) {
    throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}'. You are using 'loadComponent' with a module, but it must be used with standalone components. Use 'loadChildren' instead.`);
  } else if (component && !isStandalone(component)) {
    throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}'. The component must be standalone.`);
  }
}
function validateNode(route, fullPath, requireStandaloneComponents) {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    if (!route) {
      throw new RuntimeError(4014, `
      Invalid configuration of route '${fullPath}': Encountered undefined route.
      The reason might be an extra comma.

      Example:
      const routes: Routes = [
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        { path: 'dashboard',  component: DashboardComponent },, << two commas
        { path: 'detail/:id', component: HeroDetailComponent }
      ];
    `);
    }
    if (Array.isArray(route)) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': Array cannot be specified`);
    }
    if (!route.redirectTo && !route.component && !route.loadComponent && !route.children && !route.loadChildren && route.outlet && route.outlet !== PRIMARY_OUTLET) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': a componentless route without children or loadChildren cannot have a named outlet set`);
    }
    if (route.redirectTo && route.children) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and children cannot be used together`);
    }
    if (route.redirectTo && route.loadChildren) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and loadChildren cannot be used together`);
    }
    if (route.children && route.loadChildren) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': children and loadChildren cannot be used together`);
    }
    if (route.component && route.loadComponent) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': component and loadComponent cannot be used together`);
    }
    if (route.redirectTo) {
      if (route.component || route.loadComponent) {
        throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and component/loadComponent cannot be used together`);
      }
      if (route.canMatch || route.canActivate) {
        throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and ${route.canMatch ? "canMatch" : "canActivate"} cannot be used together.Redirects happen before guards are executed.`);
      }
    }
    if (route.path && route.matcher) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': path and matcher cannot be used together`);
    }
    if (route.redirectTo === void 0 && !route.component && !route.loadComponent && !route.children && !route.loadChildren) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}'. One of the following must be provided: component, loadComponent, redirectTo, children or loadChildren`);
    }
    if (route.path === void 0 && route.matcher === void 0) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': routes must have either a path or a matcher specified`);
    }
    if (typeof route.path === "string" && route.path.charAt(0) === "/") {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': path cannot start with a slash`);
    }
    if (route.path === "" && route.redirectTo !== void 0 && route.pathMatch === void 0) {
      const exp = `The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`;
      throw new RuntimeError(4014, `Invalid configuration of route '{path: "${fullPath}", redirectTo: "${route.redirectTo}"}': please provide 'pathMatch'. ${exp}`);
    }
    if (requireStandaloneComponents) {
      assertStandalone(fullPath, route.component);
    }
  }
  if (route.children) {
    validateConfig(route.children, fullPath, requireStandaloneComponents);
  }
}
function getFullPath(parentPath, currentRoute) {
  if (!currentRoute) {
    return parentPath;
  }
  if (!parentPath && !currentRoute.path) {
    return "";
  } else if (parentPath && !currentRoute.path) {
    return `${parentPath}/`;
  } else if (!parentPath && currentRoute.path) {
    return currentRoute.path;
  } else {
    return `${parentPath}/${currentRoute.path}`;
  }
}
function getOutlet(route) {
  return route.outlet || PRIMARY_OUTLET;
}
function sortByMatchingOutlets(routes, outletName) {
  const sortedConfig = routes.filter((r) => getOutlet(r) === outletName);
  sortedConfig.push(...routes.filter((r) => getOutlet(r) !== outletName));
  return sortedConfig;
}
function getClosestRouteInjector(snapshot) {
  if (!snapshot)
    return null;
  if (snapshot.routeConfig?._injector) {
    return snapshot.routeConfig._injector;
  }
  for (let s = snapshot.parent; s; s = s.parent) {
    const route = s.routeConfig;
    if (route?._loadedInjector)
      return route._loadedInjector;
    if (route?._injector)
      return route._injector;
  }
  return null;
}
function findNode(value, node) {
  if (value === node.value)
    return node;
  for (const child of node.children) {
    const node2 = findNode(value, child);
    if (node2)
      return node2;
  }
  return null;
}
function findPath(value, node) {
  if (value === node.value)
    return [node];
  for (const child of node.children) {
    const path = findPath(value, child);
    if (path.length) {
      path.unshift(node);
      return path;
    }
  }
  return [];
}
function nodeChildrenAsMap(node) {
  const map2 = {};
  if (node) {
    node.children.forEach((child) => map2[child.value.outlet] = child);
  }
  return map2;
}
function createEmptyState(rootComponent) {
  const snapshot = createEmptyStateSnapshot(rootComponent);
  const emptyUrl = new BehaviorSubject([new UrlSegment("", {})]);
  const emptyParams = new BehaviorSubject({});
  const emptyData = new BehaviorSubject({});
  const emptyQueryParams = new BehaviorSubject({});
  const fragment = new BehaviorSubject("");
  const activated = new ActivatedRoute(emptyUrl, emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, snapshot.root);
  activated.snapshot = snapshot.root;
  return new RouterState(new TreeNode(activated, []), snapshot);
}
function createEmptyStateSnapshot(rootComponent) {
  const emptyParams = {};
  const emptyData = {};
  const emptyQueryParams = {};
  const fragment = "";
  const activated = new ActivatedRouteSnapshot([], emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, null, {});
  return new RouterStateSnapshot("", new TreeNode(activated, []));
}
function getInherited(route, parent, paramsInheritanceStrategy = "emptyOnly") {
  let inherited;
  const { routeConfig } = route;
  if (parent !== null && (paramsInheritanceStrategy === "always" || // inherit parent data if route is empty path
  routeConfig?.path === "" || // inherit parent data if parent was componentless
  !parent.component && !parent.routeConfig?.loadComponent)) {
    inherited = {
      params: __spreadValues(__spreadValues({}, parent.params), route.params),
      data: __spreadValues(__spreadValues({}, parent.data), route.data),
      resolve: __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, route.data), parent.data), routeConfig?.data), route._resolvedData)
    };
  } else {
    inherited = {
      params: __spreadValues({}, route.params),
      data: __spreadValues({}, route.data),
      resolve: __spreadValues(__spreadValues({}, route.data), route._resolvedData ?? {})
    };
  }
  if (routeConfig && hasStaticTitle(routeConfig)) {
    inherited.resolve[RouteTitleKey] = routeConfig.title;
  }
  return inherited;
}
function setRouterState(state, node) {
  node.value._routerState = state;
  node.children.forEach((c) => setRouterState(state, c));
}
function serializeNode(node) {
  const c = node.children.length > 0 ? ` { ${node.children.map(serializeNode).join(", ")} } ` : "";
  return `${node.value}${c}`;
}
function advanceActivatedRoute(route) {
  if (route.snapshot) {
    const currentSnapshot = route.snapshot;
    const nextSnapshot = route._futureSnapshot;
    route.snapshot = nextSnapshot;
    if (!shallowEqual(currentSnapshot.queryParams, nextSnapshot.queryParams)) {
      route.queryParamsSubject.next(nextSnapshot.queryParams);
    }
    if (currentSnapshot.fragment !== nextSnapshot.fragment) {
      route.fragmentSubject.next(nextSnapshot.fragment);
    }
    if (!shallowEqual(currentSnapshot.params, nextSnapshot.params)) {
      route.paramsSubject.next(nextSnapshot.params);
    }
    if (!shallowEqualArrays(currentSnapshot.url, nextSnapshot.url)) {
      route.urlSubject.next(nextSnapshot.url);
    }
    if (!shallowEqual(currentSnapshot.data, nextSnapshot.data)) {
      route.dataSubject.next(nextSnapshot.data);
    }
  } else {
    route.snapshot = route._futureSnapshot;
    route.dataSubject.next(route._futureSnapshot.data);
  }
}
function equalParamsAndUrlSegments(a, b) {
  const equalUrlParams = shallowEqual(a.params, b.params) && equalSegments(a.url, b.url);
  const parentsMismatch = !a.parent !== !b.parent;
  return equalUrlParams && !parentsMismatch && (!a.parent || equalParamsAndUrlSegments(a.parent, b.parent));
}
function hasStaticTitle(config) {
  return typeof config.title === "string" || config.title === null;
}
function standardizeConfig(r) {
  const children = r.children && r.children.map(standardizeConfig);
  const c = children ? __spreadProps(__spreadValues({}, r), { children }) : __spreadValues({}, r);
  if (!c.component && !c.loadComponent && (children || c.loadChildren) && c.outlet && c.outlet !== PRIMARY_OUTLET) {
    c.component = \u0275EmptyOutletComponent;
  }
  return c;
}
function createRouterState(routeReuseStrategy, curr, prevState) {
  const root = createNode(routeReuseStrategy, curr._root, prevState ? prevState._root : void 0);
  return new RouterState(root, curr);
}
function createNode(routeReuseStrategy, curr, prevState) {
  if (prevState && routeReuseStrategy.shouldReuseRoute(curr.value, prevState.value.snapshot)) {
    const value = prevState.value;
    value._futureSnapshot = curr.value;
    const children = createOrReuseChildren(routeReuseStrategy, curr, prevState);
    return new TreeNode(value, children);
  } else {
    if (routeReuseStrategy.shouldAttach(curr.value)) {
      const detachedRouteHandle = routeReuseStrategy.retrieve(curr.value);
      if (detachedRouteHandle !== null) {
        const tree2 = detachedRouteHandle.route;
        tree2.value._futureSnapshot = curr.value;
        tree2.children = curr.children.map((c) => createNode(routeReuseStrategy, c));
        return tree2;
      }
    }
    const value = createActivatedRoute(curr.value);
    const children = curr.children.map((c) => createNode(routeReuseStrategy, c));
    return new TreeNode(value, children);
  }
}
function createOrReuseChildren(routeReuseStrategy, curr, prevState) {
  return curr.children.map((child) => {
    for (const p of prevState.children) {
      if (routeReuseStrategy.shouldReuseRoute(child.value, p.value.snapshot)) {
        return createNode(routeReuseStrategy, child, p);
      }
    }
    return createNode(routeReuseStrategy, child);
  });
}
function createActivatedRoute(c) {
  return new ActivatedRoute(new BehaviorSubject(c.url), new BehaviorSubject(c.params), new BehaviorSubject(c.queryParams), new BehaviorSubject(c.fragment), new BehaviorSubject(c.data), c.outlet, c.component, c);
}
function redirectingNavigationError(urlSerializer, redirect) {
  const { redirectTo, navigationBehaviorOptions } = isUrlTree(redirect) ? { redirectTo: redirect, navigationBehaviorOptions: void 0 } : redirect;
  const error = navigationCancelingError(ngDevMode && `Redirecting to "${urlSerializer.serialize(redirectTo)}"`, NavigationCancellationCode.Redirect);
  error.url = redirectTo;
  error.navigationBehaviorOptions = navigationBehaviorOptions;
  return error;
}
function navigationCancelingError(message, code) {
  const error = new Error(`NavigationCancelingError: ${message || ""}`);
  error[NAVIGATION_CANCELING_ERROR] = true;
  error.cancellationCode = code;
  return error;
}
function isRedirectingNavigationCancelingError(error) {
  return isNavigationCancelingError(error) && isUrlTree(error.url);
}
function isNavigationCancelingError(error) {
  return !!error && error[NAVIGATION_CANCELING_ERROR];
}
function getAllRouteGuards(future, curr, parentContexts) {
  const futureRoot = future._root;
  const currRoot = curr ? curr._root : null;
  return getChildRouteGuards(futureRoot, currRoot, parentContexts, [futureRoot.value]);
}
function getCanActivateChild(p) {
  const canActivateChild = p.routeConfig ? p.routeConfig.canActivateChild : null;
  if (!canActivateChild || canActivateChild.length === 0)
    return null;
  return { node: p, guards: canActivateChild };
}
function getTokenOrFunctionIdentity(tokenOrFunction, injector) {
  const NOT_FOUND = Symbol();
  const result = injector.get(tokenOrFunction, NOT_FOUND);
  if (result === NOT_FOUND) {
    if (typeof tokenOrFunction === "function" && !isInjectable(tokenOrFunction)) {
      return tokenOrFunction;
    } else {
      return injector.get(tokenOrFunction);
    }
  }
  return result;
}
function getChildRouteGuards(futureNode, currNode, contexts, futurePath, checks = {
  canDeactivateChecks: [],
  canActivateChecks: []
}) {
  const prevChildren = nodeChildrenAsMap(currNode);
  futureNode.children.forEach((c) => {
    getRouteGuards(c, prevChildren[c.value.outlet], contexts, futurePath.concat([c.value]), checks);
    delete prevChildren[c.value.outlet];
  });
  Object.entries(prevChildren).forEach(([k, v]) => deactivateRouteAndItsChildren(v, contexts.getContext(k), checks));
  return checks;
}
function getRouteGuards(futureNode, currNode, parentContexts, futurePath, checks = {
  canDeactivateChecks: [],
  canActivateChecks: []
}) {
  const future = futureNode.value;
  const curr = currNode ? currNode.value : null;
  const context = parentContexts ? parentContexts.getContext(futureNode.value.outlet) : null;
  if (curr && future.routeConfig === curr.routeConfig) {
    const shouldRun = shouldRunGuardsAndResolvers(curr, future, future.routeConfig.runGuardsAndResolvers);
    if (shouldRun) {
      checks.canActivateChecks.push(new CanActivate(futurePath));
    } else {
      future.data = curr.data;
      future._resolvedData = curr._resolvedData;
    }
    if (future.component) {
      getChildRouteGuards(futureNode, currNode, context ? context.children : null, futurePath, checks);
    } else {
      getChildRouteGuards(futureNode, currNode, parentContexts, futurePath, checks);
    }
    if (shouldRun && context && context.outlet && context.outlet.isActivated) {
      checks.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, curr));
    }
  } else {
    if (curr) {
      deactivateRouteAndItsChildren(currNode, context, checks);
    }
    checks.canActivateChecks.push(new CanActivate(futurePath));
    if (future.component) {
      getChildRouteGuards(futureNode, null, context ? context.children : null, futurePath, checks);
    } else {
      getChildRouteGuards(futureNode, null, parentContexts, futurePath, checks);
    }
  }
  return checks;
}
function shouldRunGuardsAndResolvers(curr, future, mode) {
  if (typeof mode === "function") {
    return mode(curr, future);
  }
  switch (mode) {
    case "pathParamsChange":
      return !equalPath(curr.url, future.url);
    case "pathParamsOrQueryParamsChange":
      return !equalPath(curr.url, future.url) || !shallowEqual(curr.queryParams, future.queryParams);
    case "always":
      return true;
    case "paramsOrQueryParamsChange":
      return !equalParamsAndUrlSegments(curr, future) || !shallowEqual(curr.queryParams, future.queryParams);
    case "paramsChange":
    default:
      return !equalParamsAndUrlSegments(curr, future);
  }
}
function deactivateRouteAndItsChildren(route, context, checks) {
  const children = nodeChildrenAsMap(route);
  const r = route.value;
  Object.entries(children).forEach(([childName, node]) => {
    if (!r.component) {
      deactivateRouteAndItsChildren(node, context, checks);
    } else if (context) {
      deactivateRouteAndItsChildren(node, context.children.getContext(childName), checks);
    } else {
      deactivateRouteAndItsChildren(node, null, checks);
    }
  });
  if (!r.component) {
    checks.canDeactivateChecks.push(new CanDeactivate(null, r));
  } else if (context && context.outlet && context.outlet.isActivated) {
    checks.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, r));
  } else {
    checks.canDeactivateChecks.push(new CanDeactivate(null, r));
  }
}
function isFunction(v) {
  return typeof v === "function";
}
function isBoolean(v) {
  return typeof v === "boolean";
}
function isCanLoad(guard) {
  return guard && isFunction(guard.canLoad);
}
function isCanActivate(guard) {
  return guard && isFunction(guard.canActivate);
}
function isCanActivateChild(guard) {
  return guard && isFunction(guard.canActivateChild);
}
function isCanDeactivate(guard) {
  return guard && isFunction(guard.canDeactivate);
}
function isCanMatch(guard) {
  return guard && isFunction(guard.canMatch);
}
function isEmptyError(e) {
  return e instanceof EmptyError || e?.name === "EmptyError";
}
function prioritizedGuardValue() {
  return switchMap((obs) => {
    return combineLatest(obs.map((o) => o.pipe(take(1), startWith(INITIAL_VALUE)))).pipe(map((results) => {
      for (const result of results) {
        if (result === true) {
          continue;
        } else if (result === INITIAL_VALUE) {
          return INITIAL_VALUE;
        } else if (result === false || isRedirect(result)) {
          return result;
        }
      }
      return true;
    }), filter((item) => item !== INITIAL_VALUE), take(1));
  });
}
function isRedirect(val) {
  return isUrlTree(val) || val instanceof RedirectCommand;
}
function checkGuards(injector, forwardEvent) {
  return mergeMap((t) => {
    const { targetSnapshot, currentSnapshot, guards: { canActivateChecks, canDeactivateChecks } } = t;
    if (canDeactivateChecks.length === 0 && canActivateChecks.length === 0) {
      return of(__spreadProps(__spreadValues({}, t), { guardsResult: true }));
    }
    return runCanDeactivateChecks(canDeactivateChecks, targetSnapshot, currentSnapshot, injector).pipe(mergeMap((canDeactivate) => {
      return canDeactivate && isBoolean(canDeactivate) ? runCanActivateChecks(targetSnapshot, canActivateChecks, injector, forwardEvent) : of(canDeactivate);
    }), map((guardsResult) => __spreadProps(__spreadValues({}, t), { guardsResult })));
  });
}
function runCanDeactivateChecks(checks, futureRSS, currRSS, injector) {
  return from(checks).pipe(mergeMap((check) => runCanDeactivate(check.component, check.route, currRSS, futureRSS, injector)), first((result) => {
    return result !== true;
  }, true));
}
function runCanActivateChecks(futureSnapshot, checks, injector, forwardEvent) {
  return from(checks).pipe(concatMap((check) => {
    return concat(fireChildActivationStart(check.route.parent, forwardEvent), fireActivationStart(check.route, forwardEvent), runCanActivateChild(futureSnapshot, check.path, injector), runCanActivate(futureSnapshot, check.route, injector));
  }), first((result) => {
    return result !== true;
  }, true));
}
function fireActivationStart(snapshot, forwardEvent) {
  if (snapshot !== null && forwardEvent) {
    forwardEvent(new ActivationStart(snapshot));
  }
  return of(true);
}
function fireChildActivationStart(snapshot, forwardEvent) {
  if (snapshot !== null && forwardEvent) {
    forwardEvent(new ChildActivationStart(snapshot));
  }
  return of(true);
}
function runCanActivate(futureRSS, futureARS, injector) {
  const canActivate = futureARS.routeConfig ? futureARS.routeConfig.canActivate : null;
  if (!canActivate || canActivate.length === 0)
    return of(true);
  const canActivateObservables = canActivate.map((canActivate2) => {
    return defer(() => {
      const closestInjector = getClosestRouteInjector(futureARS) ?? injector;
      const guard = getTokenOrFunctionIdentity(canActivate2, closestInjector);
      const guardVal = isCanActivate(guard) ? guard.canActivate(futureARS, futureRSS) : runInInjectionContext(closestInjector, () => guard(futureARS, futureRSS));
      return wrapIntoObservable(guardVal).pipe(first());
    });
  });
  return of(canActivateObservables).pipe(prioritizedGuardValue());
}
function runCanActivateChild(futureRSS, path, injector) {
  const futureARS = path[path.length - 1];
  const canActivateChildGuards = path.slice(0, path.length - 1).reverse().map((p) => getCanActivateChild(p)).filter((_) => _ !== null);
  const canActivateChildGuardsMapped = canActivateChildGuards.map((d) => {
    return defer(() => {
      const guardsMapped = d.guards.map((canActivateChild) => {
        const closestInjector = getClosestRouteInjector(d.node) ?? injector;
        const guard = getTokenOrFunctionIdentity(canActivateChild, closestInjector);
        const guardVal = isCanActivateChild(guard) ? guard.canActivateChild(futureARS, futureRSS) : runInInjectionContext(closestInjector, () => guard(futureARS, futureRSS));
        return wrapIntoObservable(guardVal).pipe(first());
      });
      return of(guardsMapped).pipe(prioritizedGuardValue());
    });
  });
  return of(canActivateChildGuardsMapped).pipe(prioritizedGuardValue());
}
function runCanDeactivate(component, currARS, currRSS, futureRSS, injector) {
  const canDeactivate = currARS && currARS.routeConfig ? currARS.routeConfig.canDeactivate : null;
  if (!canDeactivate || canDeactivate.length === 0)
    return of(true);
  const canDeactivateObservables = canDeactivate.map((c) => {
    const closestInjector = getClosestRouteInjector(currARS) ?? injector;
    const guard = getTokenOrFunctionIdentity(c, closestInjector);
    const guardVal = isCanDeactivate(guard) ? guard.canDeactivate(component, currARS, currRSS, futureRSS) : runInInjectionContext(closestInjector, () => guard(component, currARS, currRSS, futureRSS));
    return wrapIntoObservable(guardVal).pipe(first());
  });
  return of(canDeactivateObservables).pipe(prioritizedGuardValue());
}
function runCanLoadGuards(injector, route, segments, urlSerializer) {
  const canLoad = route.canLoad;
  if (canLoad === void 0 || canLoad.length === 0) {
    return of(true);
  }
  const canLoadObservables = canLoad.map((injectionToken) => {
    const guard = getTokenOrFunctionIdentity(injectionToken, injector);
    const guardVal = isCanLoad(guard) ? guard.canLoad(route, segments) : runInInjectionContext(injector, () => guard(route, segments));
    return wrapIntoObservable(guardVal);
  });
  return of(canLoadObservables).pipe(prioritizedGuardValue(), redirectIfUrlTree(urlSerializer));
}
function redirectIfUrlTree(urlSerializer) {
  return pipe(tap((result) => {
    if (typeof result === "boolean")
      return;
    throw redirectingNavigationError(urlSerializer, result);
  }), map((result) => result === true));
}
function runCanMatchGuards(injector, route, segments, urlSerializer) {
  const canMatch = route.canMatch;
  if (!canMatch || canMatch.length === 0)
    return of(true);
  const canMatchObservables = canMatch.map((injectionToken) => {
    const guard = getTokenOrFunctionIdentity(injectionToken, injector);
    const guardVal = isCanMatch(guard) ? guard.canMatch(route, segments) : runInInjectionContext(injector, () => guard(route, segments));
    return wrapIntoObservable(guardVal);
  });
  return of(canMatchObservables).pipe(prioritizedGuardValue(), redirectIfUrlTree(urlSerializer));
}
function noMatch$1(segmentGroup) {
  return throwError(new NoMatch(segmentGroup));
}
function namedOutletsRedirect(redirectTo) {
  return throwError(new RuntimeError(4e3, (typeof ngDevMode === "undefined" || ngDevMode) && `Only absolute redirects can have named outlets. redirectTo: '${redirectTo}'`));
}
function canLoadFails(route) {
  return throwError(navigationCancelingError((typeof ngDevMode === "undefined" || ngDevMode) && `Cannot load children because the guard of the route "path: '${route.path}'" returned false`, NavigationCancellationCode.GuardRejected));
}
function getRedirectResult(redirectTo, currentSnapshot, injector) {
  if (typeof redirectTo === "string") {
    return of(redirectTo);
  }
  const redirectToFn = redirectTo;
  const { queryParams, fragment, routeConfig, url, outlet, params, data, title } = currentSnapshot;
  return wrapIntoObservable(runInInjectionContext(injector, () => redirectToFn({ params, data, queryParams, fragment, routeConfig, url, outlet, title })));
}
function matchWithChecks(segmentGroup, route, segments, injector, urlSerializer) {
  const result = match(segmentGroup, route, segments);
  if (!result.matched) {
    return of(result);
  }
  injector = getOrCreateRouteInjectorIfNeeded(route, injector);
  return runCanMatchGuards(injector, route, segments, urlSerializer).pipe(map((v) => v === true ? result : __spreadValues({}, noMatch)));
}
function match(segmentGroup, route, segments) {
  if (route.path === "**") {
    return createWildcardMatchResult(segments);
  }
  if (route.path === "") {
    if (route.pathMatch === "full" && (segmentGroup.hasChildren() || segments.length > 0)) {
      return __spreadValues({}, noMatch);
    }
    return {
      matched: true,
      consumedSegments: [],
      remainingSegments: segments,
      parameters: {},
      positionalParamSegments: {}
    };
  }
  const matcher = route.matcher || defaultUrlMatcher;
  const res = matcher(segments, segmentGroup, route);
  if (!res)
    return __spreadValues({}, noMatch);
  const posParams = {};
  Object.entries(res.posParams ?? {}).forEach(([k, v]) => {
    posParams[k] = v.path;
  });
  const parameters = res.consumed.length > 0 ? __spreadValues(__spreadValues({}, posParams), res.consumed[res.consumed.length - 1].parameters) : posParams;
  return {
    matched: true,
    consumedSegments: res.consumed,
    remainingSegments: segments.slice(res.consumed.length),
    // TODO(atscott): investigate combining parameters and positionalParamSegments
    parameters,
    positionalParamSegments: res.posParams ?? {}
  };
}
function createWildcardMatchResult(segments) {
  return {
    matched: true,
    parameters: segments.length > 0 ? last2(segments).parameters : {},
    consumedSegments: segments,
    remainingSegments: [],
    positionalParamSegments: {}
  };
}
function split(segmentGroup, consumedSegments, slicedSegments, config) {
  if (slicedSegments.length > 0 && containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, config)) {
    const s2 = new UrlSegmentGroup(consumedSegments, createChildrenForEmptyPaths(config, new UrlSegmentGroup(slicedSegments, segmentGroup.children)));
    return { segmentGroup: s2, slicedSegments: [] };
  }
  if (slicedSegments.length === 0 && containsEmptyPathMatches(segmentGroup, slicedSegments, config)) {
    const s2 = new UrlSegmentGroup(segmentGroup.segments, addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, config, segmentGroup.children));
    return { segmentGroup: s2, slicedSegments };
  }
  const s = new UrlSegmentGroup(segmentGroup.segments, segmentGroup.children);
  return { segmentGroup: s, slicedSegments };
}
function addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, routes, children) {
  const res = {};
  for (const r of routes) {
    if (emptyPathMatch(segmentGroup, slicedSegments, r) && !children[getOutlet(r)]) {
      const s = new UrlSegmentGroup([], {});
      res[getOutlet(r)] = s;
    }
  }
  return __spreadValues(__spreadValues({}, children), res);
}
function createChildrenForEmptyPaths(routes, primarySegment) {
  const res = {};
  res[PRIMARY_OUTLET] = primarySegment;
  for (const r of routes) {
    if (r.path === "" && getOutlet(r) !== PRIMARY_OUTLET) {
      const s = new UrlSegmentGroup([], {});
      res[getOutlet(r)] = s;
    }
  }
  return res;
}
function containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, routes) {
  return routes.some((r) => emptyPathMatch(segmentGroup, slicedSegments, r) && getOutlet(r) !== PRIMARY_OUTLET);
}
function containsEmptyPathMatches(segmentGroup, slicedSegments, routes) {
  return routes.some((r) => emptyPathMatch(segmentGroup, slicedSegments, r));
}
function emptyPathMatch(segmentGroup, slicedSegments, r) {
  if ((segmentGroup.hasChildren() || slicedSegments.length > 0) && r.pathMatch === "full") {
    return false;
  }
  return r.path === "";
}
function noLeftoversInUrl(segmentGroup, segments, outlet) {
  return segments.length === 0 && !segmentGroup.children[outlet];
}
function recognize$1(injector, configLoader, rootComponentType, config, urlTree, urlSerializer, paramsInheritanceStrategy = "emptyOnly") {
  return new Recognizer(injector, configLoader, rootComponentType, config, urlTree, paramsInheritanceStrategy, urlSerializer).recognize();
}
function sortActivatedRouteSnapshots(nodes) {
  nodes.sort((a, b) => {
    if (a.value.outlet === PRIMARY_OUTLET)
      return -1;
    if (b.value.outlet === PRIMARY_OUTLET)
      return 1;
    return a.value.outlet.localeCompare(b.value.outlet);
  });
}
function hasEmptyPathConfig(node) {
  const config = node.value.routeConfig;
  return config && config.path === "";
}
function mergeEmptyPathMatches(nodes) {
  const result = [];
  const mergedNodes = /* @__PURE__ */ new Set();
  for (const node of nodes) {
    if (!hasEmptyPathConfig(node)) {
      result.push(node);
      continue;
    }
    const duplicateEmptyPathNode = result.find((resultNode) => node.value.routeConfig === resultNode.value.routeConfig);
    if (duplicateEmptyPathNode !== void 0) {
      duplicateEmptyPathNode.children.push(...node.children);
      mergedNodes.add(duplicateEmptyPathNode);
    } else {
      result.push(node);
    }
  }
  for (const mergedNode of mergedNodes) {
    const mergedChildren = mergeEmptyPathMatches(mergedNode.children);
    result.push(new TreeNode(mergedNode.value, mergedChildren));
  }
  return result.filter((n) => !mergedNodes.has(n));
}
function checkOutletNameUniqueness(nodes) {
  const names = {};
  nodes.forEach((n) => {
    const routeWithSameOutletName = names[n.value.outlet];
    if (routeWithSameOutletName) {
      const p = routeWithSameOutletName.url.map((s) => s.toString()).join("/");
      const c = n.value.url.map((s) => s.toString()).join("/");
      throw new RuntimeError(4006, (typeof ngDevMode === "undefined" || ngDevMode) && `Two segments cannot have the same outlet name: '${p}' and '${c}'.`);
    }
    names[n.value.outlet] = n.value;
  });
}
function getData(route) {
  return route.data || {};
}
function getResolve(route) {
  return route.resolve || {};
}
function recognize(injector, configLoader, rootComponentType, config, serializer, paramsInheritanceStrategy) {
  return mergeMap((t) => recognize$1(injector, configLoader, rootComponentType, config, t.extractedUrl, serializer, paramsInheritanceStrategy).pipe(map(({ state: targetSnapshot, tree: urlAfterRedirects }) => {
    return __spreadProps(__spreadValues({}, t), { targetSnapshot, urlAfterRedirects });
  })));
}
function resolveData(paramsInheritanceStrategy, injector) {
  return mergeMap((t) => {
    const { targetSnapshot, guards: { canActivateChecks } } = t;
    if (!canActivateChecks.length) {
      return of(t);
    }
    const routesWithResolversToRun = new Set(canActivateChecks.map((check) => check.route));
    const routesNeedingDataUpdates = /* @__PURE__ */ new Set();
    for (const route of routesWithResolversToRun) {
      if (routesNeedingDataUpdates.has(route)) {
        continue;
      }
      for (const newRoute of flattenRouteTree(route)) {
        routesNeedingDataUpdates.add(newRoute);
      }
    }
    let routesProcessed = 0;
    return from(routesNeedingDataUpdates).pipe(concatMap((route) => {
      if (routesWithResolversToRun.has(route)) {
        return runResolve(route, targetSnapshot, paramsInheritanceStrategy, injector);
      } else {
        route.data = getInherited(route, route.parent, paramsInheritanceStrategy).resolve;
        return of(void 0);
      }
    }), tap(() => routesProcessed++), takeLast(1), mergeMap((_) => routesProcessed === routesNeedingDataUpdates.size ? of(t) : EMPTY));
  });
}
function flattenRouteTree(route) {
  const descendants = route.children.map((child) => flattenRouteTree(child)).flat();
  return [route, ...descendants];
}
function runResolve(futureARS, futureRSS, paramsInheritanceStrategy, injector) {
  const config = futureARS.routeConfig;
  const resolve = futureARS._resolve;
  if (config?.title !== void 0 && !hasStaticTitle(config)) {
    resolve[RouteTitleKey] = config.title;
  }
  return defer(() => {
    futureARS.data = getInherited(futureARS, futureARS.parent, paramsInheritanceStrategy).resolve;
    return resolveNode(resolve, futureARS, futureRSS, injector).pipe(map((resolvedData) => {
      futureARS._resolvedData = resolvedData;
      futureARS.data = __spreadValues(__spreadValues({}, futureARS.data), resolvedData);
      return null;
    }));
  });
}
function resolveNode(resolve, futureARS, futureRSS, injector) {
  const keys = getDataKeys(resolve);
  if (keys.length === 0) {
    return of({});
  }
  const data = {};
  return from(keys).pipe(mergeMap((key) => getResolver(resolve[key], futureARS, futureRSS, injector).pipe(first(), tap((value) => {
    if (value instanceof RedirectCommand) {
      throw redirectingNavigationError(new DefaultUrlSerializer(), value);
    }
    data[key] = value;
  }))), takeLast(1), map(() => data), catchError((e) => isEmptyError(e) ? EMPTY : throwError(e)));
}
function getResolver(injectionToken, futureARS, futureRSS, injector) {
  const closestInjector = getClosestRouteInjector(futureARS) ?? injector;
  const resolver = getTokenOrFunctionIdentity(injectionToken, closestInjector);
  const resolverValue = resolver.resolve ? resolver.resolve(futureARS, futureRSS) : runInInjectionContext(closestInjector, () => resolver(futureARS, futureRSS));
  return wrapIntoObservable(resolverValue);
}
function switchTap(next) {
  return switchMap((v) => {
    const nextResult = next(v);
    if (nextResult) {
      return from(nextResult).pipe(map(() => v));
    }
    return of(v);
  });
}
function loadChildren(route, compiler, parentInjector, onLoadEndListener) {
  return wrapIntoObservable(runInInjectionContext(parentInjector, () => route.loadChildren())).pipe(map(maybeUnwrapDefaultExport), switchMap(maybeResolveResources), mergeMap((t) => {
    if (t instanceof NgModuleFactory$1 || Array.isArray(t)) {
      return of(t);
    } else {
      return from(compiler.compileModuleAsync(t));
    }
  }), map((factoryOrRoutes) => {
    if (onLoadEndListener) {
      onLoadEndListener(route);
    }
    let injector;
    let rawRoutes;
    let requireStandaloneComponents = false;
    if (Array.isArray(factoryOrRoutes)) {
      rawRoutes = factoryOrRoutes;
      requireStandaloneComponents = true;
    } else {
      injector = factoryOrRoutes.create(parentInjector).injector;
      rawRoutes = injector.get(ROUTES, [], { optional: true, self: true }).flat();
    }
    const routes = rawRoutes.map(standardizeConfig);
    (typeof ngDevMode === "undefined" || ngDevMode) && validateConfig(routes, route.path, requireStandaloneComponents);
    return { routes, injector };
  }));
}
function isWrappedDefaultExport(value) {
  return value && typeof value === "object" && "default" in value;
}
function maybeUnwrapDefaultExport(input2) {
  return isWrappedDefaultExport(input2) ? input2["default"] : input2;
}
function maybeResolveResources(value) {
  if (typeof fetch === "function") {
    return resolveComponentResources(fetch).catch((error) => {
      console.error(error);
      return Promise.resolve();
    }).then(() => value);
  }
  return of(value);
}
function isBrowserTriggeredNavigation(source) {
  return source !== IMPERATIVE_NAVIGATION;
}
function afterNextNavigation(router, action) {
  router.events.pipe(filter((e) => e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError || e instanceof NavigationSkipped), map((e) => {
    if (e instanceof NavigationEnd || e instanceof NavigationSkipped) {
      return 0;
    }
    const redirecting = e instanceof NavigationCancel ? e.code === NavigationCancellationCode.Redirect || e.code === NavigationCancellationCode.SupersededByNewNavigation : false;
    return redirecting ? 2 : 1;
  }), filter(
    (result) => result !== 2
    /* NavigationResult.REDIRECTING */
  ), take(1)).subscribe(() => {
    action();
  });
}
function validateCommands(commands) {
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    if (cmd == null) {
      throw new RuntimeError(4008, (typeof ngDevMode === "undefined" || ngDevMode) && `The requested path contains ${cmd} segment at index ${i}`);
    }
  }
}
var PRIMARY_OUTLET, RouteTitleKey, ParamsAsMap, pathCompareMap, paramCompareMap, UrlTree, UrlSegmentGroup, UrlSegment, UrlSerializer, DefaultUrlSerializer, DEFAULT_SERIALIZER, SEGMENT_RE, MATRIX_PARAM_SEGMENT_RE, QUERY_PARAM_RE, QUERY_PARAM_VALUE_RE, UrlParser, Navigation, Position, IMPERATIVE_NAVIGATION, EventType, RouterEvent, NavigationStart, NavigationEnd, NavigationCancellationCode, NavigationSkippedCode, NavigationCancel, NavigationSkipped, NavigationError, RoutesRecognized, GuardsCheckStart, GuardsCheckEnd, ResolveStart, ResolveEnd, RouteConfigLoadStart, RouteConfigLoadEnd, ChildActivationStart, ChildActivationEnd, ActivationStart, ActivationEnd, BeforeActivateRoutes, RedirectRequest, OutletContext, ChildrenOutletContexts, Tree, TreeNode, RouterState, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, ROUTER_OUTLET_DATA, RouterOutlet, OutletInjector, INPUT_BINDER, RoutedComponentInputBinder, \u0275EmptyOutletComponent, RedirectCommand, NAVIGATION_CANCELING_ERROR, warnedAboutUnsupportedInputBinding, activateRoutes, ActivateRoutes, CanActivate, CanDeactivate, INITIAL_VALUE, NoMatch, AbsoluteRedirect, ApplyRedirects, noMatch, NoLeftoversInUrl, MAX_ALLOWED_REDIRECTS, Recognizer, TitleStrategy, DefaultTitleStrategy, ROUTER_CONFIGURATION, ROUTES, RouterConfigLoader, UrlHandlingStrategy, DefaultUrlHandlingStrategy, CREATE_VIEW_TRANSITION, VIEW_TRANSITION_OPTIONS, NAVIGATION_ERROR_HANDLER, NavigationTransitions, RouteReuseStrategy, BaseRouteReuseStrategy, DefaultRouteReuseStrategy, StateManager, HistoryStateManager, exactMatchOptions, subsetMatchOptions, Router;
var init_router2 = __esm({
  "node_modules/@angular/router/fesm2022/router2.mjs"() {
    "use strict";
    init_common();
    init_core();
    init_core();
    init_esm();
    init_operators();
    init_platform_browser();
    PRIMARY_OUTLET = "primary";
    RouteTitleKey = /* @__PURE__ */ Symbol("RouteTitle");
    ParamsAsMap = class {
      params;
      constructor(params) {
        this.params = params || {};
      }
      has(name) {
        return Object.prototype.hasOwnProperty.call(this.params, name);
      }
      get(name) {
        if (this.has(name)) {
          const v = this.params[name];
          return Array.isArray(v) ? v[0] : v;
        }
        return null;
      }
      getAll(name) {
        if (this.has(name)) {
          const v = this.params[name];
          return Array.isArray(v) ? v : [v];
        }
        return [];
      }
      get keys() {
        return Object.keys(this.params);
      }
    };
    pathCompareMap = {
      "exact": equalSegmentGroups,
      "subset": containsSegmentGroup
    };
    paramCompareMap = {
      "exact": equalParams,
      "subset": containsParams,
      "ignored": () => true
    };
    UrlTree = class {
      root;
      queryParams;
      fragment;
      /** @internal */
      _queryParamMap;
      constructor(root = new UrlSegmentGroup([], {}), queryParams = {}, fragment = null) {
        this.root = root;
        this.queryParams = queryParams;
        this.fragment = fragment;
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          if (root.segments.length > 0) {
            throw new RuntimeError(4015, "The root `UrlSegmentGroup` should not contain `segments`. Instead, these segments belong in the `children` so they can be associated with a named outlet.");
          }
        }
      }
      get queryParamMap() {
        this._queryParamMap ??= convertToParamMap(this.queryParams);
        return this._queryParamMap;
      }
      /** @docsNotRequired */
      toString() {
        return DEFAULT_SERIALIZER.serialize(this);
      }
    };
    UrlSegmentGroup = class {
      segments;
      children;
      /** The parent node in the url tree */
      parent = null;
      constructor(segments, children) {
        this.segments = segments;
        this.children = children;
        Object.values(children).forEach((v) => v.parent = this);
      }
      /** Whether the segment has child segments */
      hasChildren() {
        return this.numberOfChildren > 0;
      }
      /** Number of child segments */
      get numberOfChildren() {
        return Object.keys(this.children).length;
      }
      /** @docsNotRequired */
      toString() {
        return serializePaths(this);
      }
    };
    UrlSegment = class {
      path;
      parameters;
      /** @internal */
      _parameterMap;
      constructor(path, parameters) {
        this.path = path;
        this.parameters = parameters;
      }
      get parameterMap() {
        this._parameterMap ??= convertToParamMap(this.parameters);
        return this._parameterMap;
      }
      /** @docsNotRequired */
      toString() {
        return serializePath(this);
      }
    };
    UrlSerializer = class _UrlSerializer {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _UrlSerializer, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _UrlSerializer, providedIn: "root", useFactory: () => new DefaultUrlSerializer() });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: UrlSerializer, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root", useFactory: () => new DefaultUrlSerializer() }]
    }] });
    DefaultUrlSerializer = class {
      /** Parses a url into a `UrlTree` */
      parse(url) {
        const p = new UrlParser(url);
        return new UrlTree(p.parseRootSegment(), p.parseQueryParams(), p.parseFragment());
      }
      /** Converts a `UrlTree` into a url */
      serialize(tree2) {
        const segment = `/${serializeSegment(tree2.root, true)}`;
        const query = serializeQueryParams(tree2.queryParams);
        const fragment = typeof tree2.fragment === `string` ? `#${encodeUriFragment(tree2.fragment)}` : "";
        return `${segment}${query}${fragment}`;
      }
    };
    DEFAULT_SERIALIZER = new DefaultUrlSerializer();
    SEGMENT_RE = /^[^\/()?;#]+/;
    MATRIX_PARAM_SEGMENT_RE = /^[^\/()?;=#]+/;
    QUERY_PARAM_RE = /^[^=?&#]+/;
    QUERY_PARAM_VALUE_RE = /^[^&#]+/;
    UrlParser = class {
      url;
      remaining;
      constructor(url) {
        this.url = url;
        this.remaining = url;
      }
      parseRootSegment() {
        this.consumeOptional("/");
        if (this.remaining === "" || this.peekStartsWith("?") || this.peekStartsWith("#")) {
          return new UrlSegmentGroup([], {});
        }
        return new UrlSegmentGroup([], this.parseChildren());
      }
      parseQueryParams() {
        const params = {};
        if (this.consumeOptional("?")) {
          do {
            this.parseQueryParam(params);
          } while (this.consumeOptional("&"));
        }
        return params;
      }
      parseFragment() {
        return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null;
      }
      parseChildren() {
        if (this.remaining === "") {
          return {};
        }
        this.consumeOptional("/");
        const segments = [];
        if (!this.peekStartsWith("(")) {
          segments.push(this.parseSegment());
        }
        while (this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(")) {
          this.capture("/");
          segments.push(this.parseSegment());
        }
        let children = {};
        if (this.peekStartsWith("/(")) {
          this.capture("/");
          children = this.parseParens(true);
        }
        let res = {};
        if (this.peekStartsWith("(")) {
          res = this.parseParens(false);
        }
        if (segments.length > 0 || Object.keys(children).length > 0) {
          res[PRIMARY_OUTLET] = new UrlSegmentGroup(segments, children);
        }
        return res;
      }
      // parse a segment with its matrix parameters
      // ie `name;k1=v1;k2`
      parseSegment() {
        const path = matchSegments(this.remaining);
        if (path === "" && this.peekStartsWith(";")) {
          throw new RuntimeError(4009, (typeof ngDevMode === "undefined" || ngDevMode) && `Empty path url segment cannot have parameters: '${this.remaining}'.`);
        }
        this.capture(path);
        return new UrlSegment(decode(path), this.parseMatrixParams());
      }
      parseMatrixParams() {
        const params = {};
        while (this.consumeOptional(";")) {
          this.parseParam(params);
        }
        return params;
      }
      parseParam(params) {
        const key = matchMatrixKeySegments(this.remaining);
        if (!key) {
          return;
        }
        this.capture(key);
        let value = "";
        if (this.consumeOptional("=")) {
          const valueMatch = matchSegments(this.remaining);
          if (valueMatch) {
            value = valueMatch;
            this.capture(value);
          }
        }
        params[decode(key)] = decode(value);
      }
      // Parse a single query parameter `name[=value]`
      parseQueryParam(params) {
        const key = matchQueryParams(this.remaining);
        if (!key) {
          return;
        }
        this.capture(key);
        let value = "";
        if (this.consumeOptional("=")) {
          const valueMatch = matchUrlQueryParamValue(this.remaining);
          if (valueMatch) {
            value = valueMatch;
            this.capture(value);
          }
        }
        const decodedKey = decodeQuery(key);
        const decodedVal = decodeQuery(value);
        if (params.hasOwnProperty(decodedKey)) {
          let currentVal = params[decodedKey];
          if (!Array.isArray(currentVal)) {
            currentVal = [currentVal];
            params[decodedKey] = currentVal;
          }
          currentVal.push(decodedVal);
        } else {
          params[decodedKey] = decodedVal;
        }
      }
      // parse `(a/b//outlet_name:c/d)`
      parseParens(allowPrimary) {
        const segments = {};
        this.capture("(");
        while (!this.consumeOptional(")") && this.remaining.length > 0) {
          const path = matchSegments(this.remaining);
          const next = this.remaining[path.length];
          if (next !== "/" && next !== ")" && next !== ";") {
            throw new RuntimeError(4010, (typeof ngDevMode === "undefined" || ngDevMode) && `Cannot parse url '${this.url}'`);
          }
          let outletName = void 0;
          if (path.indexOf(":") > -1) {
            outletName = path.slice(0, path.indexOf(":"));
            this.capture(outletName);
            this.capture(":");
          } else if (allowPrimary) {
            outletName = PRIMARY_OUTLET;
          }
          const children = this.parseChildren();
          segments[outletName] = Object.keys(children).length === 1 ? children[PRIMARY_OUTLET] : new UrlSegmentGroup([], children);
          this.consumeOptional("//");
        }
        return segments;
      }
      peekStartsWith(str) {
        return this.remaining.startsWith(str);
      }
      // Consumes the prefix when it is present and returns whether it has been consumed
      consumeOptional(str) {
        if (this.peekStartsWith(str)) {
          this.remaining = this.remaining.substring(str.length);
          return true;
        }
        return false;
      }
      capture(str) {
        if (!this.consumeOptional(str)) {
          throw new RuntimeError(4011, (typeof ngDevMode === "undefined" || ngDevMode) && `Expected "${str}".`);
        }
      }
    };
    Navigation = class {
      isAbsolute;
      numberOfDoubleDots;
      commands;
      constructor(isAbsolute, numberOfDoubleDots, commands) {
        this.isAbsolute = isAbsolute;
        this.numberOfDoubleDots = numberOfDoubleDots;
        this.commands = commands;
        if (isAbsolute && commands.length > 0 && isMatrixParams(commands[0])) {
          throw new RuntimeError(4003, (typeof ngDevMode === "undefined" || ngDevMode) && "Root segment cannot have matrix parameters");
        }
        const cmdWithOutlet = commands.find(isCommandWithOutlets);
        if (cmdWithOutlet && cmdWithOutlet !== last2(commands)) {
          throw new RuntimeError(4004, (typeof ngDevMode === "undefined" || ngDevMode) && "{outlets:{}} has to be the last command");
        }
      }
      toRoot() {
        return this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/";
      }
    };
    Position = class {
      segmentGroup;
      processChildren;
      index;
      constructor(segmentGroup, processChildren, index) {
        this.segmentGroup = segmentGroup;
        this.processChildren = processChildren;
        this.index = index;
      }
    };
    IMPERATIVE_NAVIGATION = "imperative";
    (function(EventType2) {
      EventType2[EventType2["NavigationStart"] = 0] = "NavigationStart";
      EventType2[EventType2["NavigationEnd"] = 1] = "NavigationEnd";
      EventType2[EventType2["NavigationCancel"] = 2] = "NavigationCancel";
      EventType2[EventType2["NavigationError"] = 3] = "NavigationError";
      EventType2[EventType2["RoutesRecognized"] = 4] = "RoutesRecognized";
      EventType2[EventType2["ResolveStart"] = 5] = "ResolveStart";
      EventType2[EventType2["ResolveEnd"] = 6] = "ResolveEnd";
      EventType2[EventType2["GuardsCheckStart"] = 7] = "GuardsCheckStart";
      EventType2[EventType2["GuardsCheckEnd"] = 8] = "GuardsCheckEnd";
      EventType2[EventType2["RouteConfigLoadStart"] = 9] = "RouteConfigLoadStart";
      EventType2[EventType2["RouteConfigLoadEnd"] = 10] = "RouteConfigLoadEnd";
      EventType2[EventType2["ChildActivationStart"] = 11] = "ChildActivationStart";
      EventType2[EventType2["ChildActivationEnd"] = 12] = "ChildActivationEnd";
      EventType2[EventType2["ActivationStart"] = 13] = "ActivationStart";
      EventType2[EventType2["ActivationEnd"] = 14] = "ActivationEnd";
      EventType2[EventType2["Scroll"] = 15] = "Scroll";
      EventType2[EventType2["NavigationSkipped"] = 16] = "NavigationSkipped";
    })(EventType || (EventType = {}));
    RouterEvent = class {
      id;
      url;
      constructor(id, url) {
        this.id = id;
        this.url = url;
      }
    };
    NavigationStart = class extends RouterEvent {
      type = EventType.NavigationStart;
      /**
       * Identifies the call or event that triggered the navigation.
       * An `imperative` trigger is a call to `router.navigateByUrl()` or `router.navigate()`.
       *
       * @see {@link NavigationEnd}
       * @see {@link NavigationCancel}
       * @see {@link NavigationError}
       */
      navigationTrigger;
      /**
       * The navigation state that was previously supplied to the `pushState` call,
       * when the navigation is triggered by a `popstate` event. Otherwise null.
       *
       * The state object is defined by `NavigationExtras`, and contains any
       * developer-defined state value, as well as a unique ID that
       * the router assigns to every router transition/navigation.
       *
       * From the perspective of the router, the router never "goes back".
       * When the user clicks on the back button in the browser,
       * a new navigation ID is created.
       *
       * Use the ID in this previous-state object to differentiate between a newly created
       * state and one returned to by a `popstate` event, so that you can restore some
       * remembered state, such as scroll position.
       *
       */
      restoredState;
      constructor(id, url, navigationTrigger = "imperative", restoredState = null) {
        super(id, url);
        this.navigationTrigger = navigationTrigger;
        this.restoredState = restoredState;
      }
      /** @docsNotRequired */
      toString() {
        return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
      }
    };
    NavigationEnd = class extends RouterEvent {
      urlAfterRedirects;
      type = EventType.NavigationEnd;
      constructor(id, url, urlAfterRedirects) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
      }
      /** @docsNotRequired */
      toString() {
        return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
      }
    };
    (function(NavigationCancellationCode2) {
      NavigationCancellationCode2[NavigationCancellationCode2["Redirect"] = 0] = "Redirect";
      NavigationCancellationCode2[NavigationCancellationCode2["SupersededByNewNavigation"] = 1] = "SupersededByNewNavigation";
      NavigationCancellationCode2[NavigationCancellationCode2["NoDataFromResolver"] = 2] = "NoDataFromResolver";
      NavigationCancellationCode2[NavigationCancellationCode2["GuardRejected"] = 3] = "GuardRejected";
      NavigationCancellationCode2[NavigationCancellationCode2["Aborted"] = 4] = "Aborted";
    })(NavigationCancellationCode || (NavigationCancellationCode = {}));
    (function(NavigationSkippedCode2) {
      NavigationSkippedCode2[NavigationSkippedCode2["IgnoredSameUrlNavigation"] = 0] = "IgnoredSameUrlNavigation";
      NavigationSkippedCode2[NavigationSkippedCode2["IgnoredByUrlHandlingStrategy"] = 1] = "IgnoredByUrlHandlingStrategy";
    })(NavigationSkippedCode || (NavigationSkippedCode = {}));
    NavigationCancel = class extends RouterEvent {
      reason;
      code;
      type = EventType.NavigationCancel;
      constructor(id, url, reason, code) {
        super(id, url);
        this.reason = reason;
        this.code = code;
      }
      /** @docsNotRequired */
      toString() {
        return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
      }
    };
    NavigationSkipped = class extends RouterEvent {
      reason;
      code;
      type = EventType.NavigationSkipped;
      constructor(id, url, reason, code) {
        super(id, url);
        this.reason = reason;
        this.code = code;
      }
    };
    NavigationError = class extends RouterEvent {
      error;
      target;
      type = EventType.NavigationError;
      constructor(id, url, error, target) {
        super(id, url);
        this.error = error;
        this.target = target;
      }
      /** @docsNotRequired */
      toString() {
        return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
      }
    };
    RoutesRecognized = class extends RouterEvent {
      urlAfterRedirects;
      state;
      type = EventType.RoutesRecognized;
      constructor(id, url, urlAfterRedirects, state) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
      }
      /** @docsNotRequired */
      toString() {
        return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
      }
    };
    GuardsCheckStart = class extends RouterEvent {
      urlAfterRedirects;
      state;
      type = EventType.GuardsCheckStart;
      constructor(id, url, urlAfterRedirects, state) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
      }
      toString() {
        return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
      }
    };
    GuardsCheckEnd = class extends RouterEvent {
      urlAfterRedirects;
      state;
      shouldActivate;
      type = EventType.GuardsCheckEnd;
      constructor(id, url, urlAfterRedirects, state, shouldActivate) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
        this.shouldActivate = shouldActivate;
      }
      toString() {
        return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
      }
    };
    ResolveStart = class extends RouterEvent {
      urlAfterRedirects;
      state;
      type = EventType.ResolveStart;
      constructor(id, url, urlAfterRedirects, state) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
      }
      toString() {
        return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
      }
    };
    ResolveEnd = class extends RouterEvent {
      urlAfterRedirects;
      state;
      type = EventType.ResolveEnd;
      constructor(id, url, urlAfterRedirects, state) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
      }
      toString() {
        return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
      }
    };
    RouteConfigLoadStart = class {
      route;
      type = EventType.RouteConfigLoadStart;
      constructor(route) {
        this.route = route;
      }
      toString() {
        return `RouteConfigLoadStart(path: ${this.route.path})`;
      }
    };
    RouteConfigLoadEnd = class {
      route;
      type = EventType.RouteConfigLoadEnd;
      constructor(route) {
        this.route = route;
      }
      toString() {
        return `RouteConfigLoadEnd(path: ${this.route.path})`;
      }
    };
    ChildActivationStart = class {
      snapshot;
      type = EventType.ChildActivationStart;
      constructor(snapshot) {
        this.snapshot = snapshot;
      }
      toString() {
        const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || "";
        return `ChildActivationStart(path: '${path}')`;
      }
    };
    ChildActivationEnd = class {
      snapshot;
      type = EventType.ChildActivationEnd;
      constructor(snapshot) {
        this.snapshot = snapshot;
      }
      toString() {
        const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || "";
        return `ChildActivationEnd(path: '${path}')`;
      }
    };
    ActivationStart = class {
      snapshot;
      type = EventType.ActivationStart;
      constructor(snapshot) {
        this.snapshot = snapshot;
      }
      toString() {
        const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || "";
        return `ActivationStart(path: '${path}')`;
      }
    };
    ActivationEnd = class {
      snapshot;
      type = EventType.ActivationEnd;
      constructor(snapshot) {
        this.snapshot = snapshot;
      }
      toString() {
        const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || "";
        return `ActivationEnd(path: '${path}')`;
      }
    };
    BeforeActivateRoutes = class {
    };
    RedirectRequest = class {
      url;
      navigationBehaviorOptions;
      constructor(url, navigationBehaviorOptions) {
        this.url = url;
        this.navigationBehaviorOptions = navigationBehaviorOptions;
      }
    };
    OutletContext = class {
      rootInjector;
      outlet = null;
      route = null;
      children;
      attachRef = null;
      get injector() {
        return getClosestRouteInjector(this.route?.snapshot) ?? this.rootInjector;
      }
      constructor(rootInjector) {
        this.rootInjector = rootInjector;
        this.children = new ChildrenOutletContexts(this.rootInjector);
      }
    };
    ChildrenOutletContexts = class _ChildrenOutletContexts {
      rootInjector;
      // contexts for child outlets, by name.
      contexts = /* @__PURE__ */ new Map();
      /** @docs-private */
      constructor(rootInjector) {
        this.rootInjector = rootInjector;
      }
      /** Called when a `RouterOutlet` directive is instantiated */
      onChildOutletCreated(childName, outlet) {
        const context = this.getOrCreateContext(childName);
        context.outlet = outlet;
        this.contexts.set(childName, context);
      }
      /**
       * Called when a `RouterOutlet` directive is destroyed.
       * We need to keep the context as the outlet could be destroyed inside a NgIf and might be
       * re-created later.
       */
      onChildOutletDestroyed(childName) {
        const context = this.getContext(childName);
        if (context) {
          context.outlet = null;
          context.attachRef = null;
        }
      }
      /**
       * Called when the corresponding route is deactivated during navigation.
       * Because the component get destroyed, all children outlet are destroyed.
       */
      onOutletDeactivated() {
        const contexts = this.contexts;
        this.contexts = /* @__PURE__ */ new Map();
        return contexts;
      }
      onOutletReAttached(contexts) {
        this.contexts = contexts;
      }
      getOrCreateContext(childName) {
        let context = this.getContext(childName);
        if (!context) {
          context = new OutletContext(this.rootInjector);
          this.contexts.set(childName, context);
        }
        return context;
      }
      getContext(childName) {
        return this.contexts.get(childName) || null;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _ChildrenOutletContexts, deps: [{ token: EnvironmentInjector }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _ChildrenOutletContexts, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: ChildrenOutletContexts, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }], ctorParameters: () => [{ type: EnvironmentInjector }] });
    Tree = class {
      /** @internal */
      _root;
      constructor(root) {
        this._root = root;
      }
      get root() {
        return this._root.value;
      }
      /**
       * @internal
       */
      parent(t) {
        const p = this.pathFromRoot(t);
        return p.length > 1 ? p[p.length - 2] : null;
      }
      /**
       * @internal
       */
      children(t) {
        const n = findNode(t, this._root);
        return n ? n.children.map((t2) => t2.value) : [];
      }
      /**
       * @internal
       */
      firstChild(t) {
        const n = findNode(t, this._root);
        return n && n.children.length > 0 ? n.children[0].value : null;
      }
      /**
       * @internal
       */
      siblings(t) {
        const p = findPath(t, this._root);
        if (p.length < 2)
          return [];
        const c = p[p.length - 2].children.map((c2) => c2.value);
        return c.filter((cc) => cc !== t);
      }
      /**
       * @internal
       */
      pathFromRoot(t) {
        return findPath(t, this._root).map((s) => s.value);
      }
    };
    TreeNode = class {
      value;
      children;
      constructor(value, children) {
        this.value = value;
        this.children = children;
      }
      toString() {
        return `TreeNode(${this.value})`;
      }
    };
    RouterState = class extends Tree {
      snapshot;
      /** @internal */
      constructor(root, snapshot) {
        super(root);
        this.snapshot = snapshot;
        setRouterState(this, root);
      }
      toString() {
        return this.snapshot.toString();
      }
    };
    ActivatedRoute = class {
      urlSubject;
      paramsSubject;
      queryParamsSubject;
      fragmentSubject;
      dataSubject;
      outlet;
      component;
      /** The current snapshot of this route */
      snapshot;
      /** @internal */
      _futureSnapshot;
      /** @internal */
      _routerState;
      /** @internal */
      _paramMap;
      /** @internal */
      _queryParamMap;
      /** An Observable of the resolved route title */
      title;
      /** An observable of the URL segments matched by this route. */
      url;
      /** An observable of the matrix parameters scoped to this route. */
      params;
      /** An observable of the query parameters shared by all the routes. */
      queryParams;
      /** An observable of the URL fragment shared by all the routes. */
      fragment;
      /** An observable of the static and resolved data of this route. */
      data;
      /** @internal */
      constructor(urlSubject, paramsSubject, queryParamsSubject, fragmentSubject, dataSubject, outlet, component, futureSnapshot) {
        this.urlSubject = urlSubject;
        this.paramsSubject = paramsSubject;
        this.queryParamsSubject = queryParamsSubject;
        this.fragmentSubject = fragmentSubject;
        this.dataSubject = dataSubject;
        this.outlet = outlet;
        this.component = component;
        this._futureSnapshot = futureSnapshot;
        this.title = this.dataSubject?.pipe(map((d) => d[RouteTitleKey])) ?? of(void 0);
        this.url = urlSubject;
        this.params = paramsSubject;
        this.queryParams = queryParamsSubject;
        this.fragment = fragmentSubject;
        this.data = dataSubject;
      }
      /** The configuration used to match this route. */
      get routeConfig() {
        return this._futureSnapshot.routeConfig;
      }
      /** The root of the router state. */
      get root() {
        return this._routerState.root;
      }
      /** The parent of this route in the router state tree. */
      get parent() {
        return this._routerState.parent(this);
      }
      /** The first child of this route in the router state tree. */
      get firstChild() {
        return this._routerState.firstChild(this);
      }
      /** The children of this route in the router state tree. */
      get children() {
        return this._routerState.children(this);
      }
      /** The path from the root of the router state tree to this route. */
      get pathFromRoot() {
        return this._routerState.pathFromRoot(this);
      }
      /**
       * An Observable that contains a map of the required and optional parameters
       * specific to the route.
       * The map supports retrieving single and multiple values from the same parameter.
       */
      get paramMap() {
        this._paramMap ??= this.params.pipe(map((p) => convertToParamMap(p)));
        return this._paramMap;
      }
      /**
       * An Observable that contains a map of the query parameters available to all routes.
       * The map supports retrieving single and multiple values from the query parameter.
       */
      get queryParamMap() {
        this._queryParamMap ??= this.queryParams.pipe(map((p) => convertToParamMap(p)));
        return this._queryParamMap;
      }
      toString() {
        return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
      }
    };
    ActivatedRouteSnapshot = class {
      url;
      params;
      queryParams;
      fragment;
      data;
      outlet;
      component;
      /** The configuration used to match this route **/
      routeConfig;
      /** @internal */
      _resolve;
      /** @internal */
      _resolvedData;
      /** @internal */
      _routerState;
      /** @internal */
      _paramMap;
      /** @internal */
      _queryParamMap;
      /** The resolved route title */
      get title() {
        return this.data?.[RouteTitleKey];
      }
      /** @internal */
      constructor(url, params, queryParams, fragment, data, outlet, component, routeConfig, resolve) {
        this.url = url;
        this.params = params;
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.data = data;
        this.outlet = outlet;
        this.component = component;
        this.routeConfig = routeConfig;
        this._resolve = resolve;
      }
      /** The root of the router state */
      get root() {
        return this._routerState.root;
      }
      /** The parent of this route in the router state tree */
      get parent() {
        return this._routerState.parent(this);
      }
      /** The first child of this route in the router state tree */
      get firstChild() {
        return this._routerState.firstChild(this);
      }
      /** The children of this route in the router state tree */
      get children() {
        return this._routerState.children(this);
      }
      /** The path from the root of the router state tree to this route */
      get pathFromRoot() {
        return this._routerState.pathFromRoot(this);
      }
      get paramMap() {
        this._paramMap ??= convertToParamMap(this.params);
        return this._paramMap;
      }
      get queryParamMap() {
        this._queryParamMap ??= convertToParamMap(this.queryParams);
        return this._queryParamMap;
      }
      toString() {
        const url = this.url.map((segment) => segment.toString()).join("/");
        const matched = this.routeConfig ? this.routeConfig.path : "";
        return `Route(url:'${url}', path:'${matched}')`;
      }
    };
    RouterStateSnapshot = class extends Tree {
      url;
      /** @internal */
      constructor(url, root) {
        super(root);
        this.url = url;
        setRouterState(this, root);
      }
      toString() {
        return serializeNode(this._root);
      }
    };
    ROUTER_OUTLET_DATA = new InjectionToken(ngDevMode ? "RouterOutlet data" : "");
    RouterOutlet = class _RouterOutlet {
      activated = null;
      /** @internal */
      get activatedComponentRef() {
        return this.activated;
      }
      _activatedRoute = null;
      /**
       * The name of the outlet
       *
       */
      name = PRIMARY_OUTLET;
      activateEvents = new EventEmitter();
      deactivateEvents = new EventEmitter();
      /**
       * Emits an attached component instance when the `RouteReuseStrategy` instructs to re-attach a
       * previously detached subtree.
       **/
      attachEvents = new EventEmitter();
      /**
       * Emits a detached component instance when the `RouteReuseStrategy` instructs to detach the
       * subtree.
       */
      detachEvents = new EventEmitter();
      /**
       * Data that will be provided to the child injector through the `ROUTER_OUTLET_DATA` token.
       *
       * When unset, the value of the token is `undefined` by default.
       */
      routerOutletData = input(void 0, ...ngDevMode ? [{ debugName: "routerOutletData" }] : []);
      parentContexts = inject(ChildrenOutletContexts);
      location = inject(ViewContainerRef);
      changeDetector = inject(ChangeDetectorRef);
      inputBinder = inject(INPUT_BINDER, { optional: true });
      /** @docs-private */
      supportsBindingToComponentInputs = true;
      /** @docs-private */
      ngOnChanges(changes) {
        if (changes["name"]) {
          const { firstChange, previousValue } = changes["name"];
          if (firstChange) {
            return;
          }
          if (this.isTrackedInParentContexts(previousValue)) {
            this.deactivate();
            this.parentContexts.onChildOutletDestroyed(previousValue);
          }
          this.initializeOutletWithName();
        }
      }
      /** @docs-private */
      ngOnDestroy() {
        if (this.isTrackedInParentContexts(this.name)) {
          this.parentContexts.onChildOutletDestroyed(this.name);
        }
        this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(outletName) {
        return this.parentContexts.getContext(outletName)?.outlet === this;
      }
      /** @docs-private */
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        this.parentContexts.onChildOutletCreated(this.name, this);
        if (this.activated) {
          return;
        }
        const context = this.parentContexts.getContext(this.name);
        if (context?.route) {
          if (context.attachRef) {
            this.attach(context.attachRef, context.route);
          } else {
            this.activateWith(context.route, context.injector);
          }
        }
      }
      get isActivated() {
        return !!this.activated;
      }
      /**
       * @returns The currently activated component instance.
       * @throws An error if the outlet is not activated.
       */
      get component() {
        if (!this.activated)
          throw new RuntimeError(4012, (typeof ngDevMode === "undefined" || ngDevMode) && "Outlet is not activated");
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated)
          throw new RuntimeError(4012, (typeof ngDevMode === "undefined" || ngDevMode) && "Outlet is not activated");
        return this._activatedRoute;
      }
      get activatedRouteData() {
        if (this._activatedRoute) {
          return this._activatedRoute.snapshot.data;
        }
        return {};
      }
      /**
       * Called when the `RouteReuseStrategy` instructs to detach the subtree
       */
      detach() {
        if (!this.activated)
          throw new RuntimeError(4012, (typeof ngDevMode === "undefined" || ngDevMode) && "Outlet is not activated");
        this.location.detach();
        const cmp = this.activated;
        this.activated = null;
        this._activatedRoute = null;
        this.detachEvents.emit(cmp.instance);
        return cmp;
      }
      /**
       * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
       */
      attach(ref, activatedRoute) {
        this.activated = ref;
        this._activatedRoute = activatedRoute;
        this.location.insert(ref.hostView);
        this.inputBinder?.bindActivatedRouteToOutletComponent(this);
        this.attachEvents.emit(ref.instance);
      }
      deactivate() {
        if (this.activated) {
          const c = this.component;
          this.activated.destroy();
          this.activated = null;
          this._activatedRoute = null;
          this.deactivateEvents.emit(c);
        }
      }
      activateWith(activatedRoute, environmentInjector) {
        if (this.isActivated) {
          throw new RuntimeError(4013, (typeof ngDevMode === "undefined" || ngDevMode) && "Cannot activate an already activated outlet");
        }
        this._activatedRoute = activatedRoute;
        const location = this.location;
        const snapshot = activatedRoute.snapshot;
        const component = snapshot.component;
        const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
        const injector = new OutletInjector(activatedRoute, childContexts, location.injector, this.routerOutletData);
        this.activated = location.createComponent(component, {
          index: location.length,
          injector,
          environmentInjector
        });
        this.changeDetector.markForCheck();
        this.inputBinder?.bindActivatedRouteToOutletComponent(this);
        this.activateEvents.emit(this.activated.instance);
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _RouterOutlet, deps: [], target: FactoryTarget.Directive });
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "17.1.0", version: "20.2.0-next.2", type: _RouterOutlet, isStandalone: true, selector: "router-outlet", inputs: { name: { classPropertyName: "name", publicName: "name", isSignal: false, isRequired: false, transformFunction: null }, routerOutletData: { classPropertyName: "routerOutletData", publicName: "routerOutletData", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { activateEvents: "activate", deactivateEvents: "deactivate", attachEvents: "attach", detachEvents: "detach" }, exportAs: ["outlet"], usesOnChanges: true, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: RouterOutlet, decorators: [{
      type: Directive,
      args: [{
        selector: "router-outlet",
        exportAs: "outlet"
      }]
    }], propDecorators: { name: [{
      type: Input
    }], activateEvents: [{
      type: Output,
      args: ["activate"]
    }], deactivateEvents: [{
      type: Output,
      args: ["deactivate"]
    }], attachEvents: [{
      type: Output,
      args: ["attach"]
    }], detachEvents: [{
      type: Output,
      args: ["detach"]
    }] } });
    OutletInjector = class {
      route;
      childContexts;
      parent;
      outletData;
      constructor(route, childContexts, parent, outletData) {
        this.route = route;
        this.childContexts = childContexts;
        this.parent = parent;
        this.outletData = outletData;
      }
      get(token, notFoundValue) {
        if (token === ActivatedRoute) {
          return this.route;
        }
        if (token === ChildrenOutletContexts) {
          return this.childContexts;
        }
        if (token === ROUTER_OUTLET_DATA) {
          return this.outletData;
        }
        return this.parent.get(token, notFoundValue);
      }
    };
    INPUT_BINDER = new InjectionToken("");
    RoutedComponentInputBinder = class _RoutedComponentInputBinder {
      outletDataSubscriptions = /* @__PURE__ */ new Map();
      bindActivatedRouteToOutletComponent(outlet) {
        this.unsubscribeFromRouteData(outlet);
        this.subscribeToRouteData(outlet);
      }
      unsubscribeFromRouteData(outlet) {
        this.outletDataSubscriptions.get(outlet)?.unsubscribe();
        this.outletDataSubscriptions.delete(outlet);
      }
      subscribeToRouteData(outlet) {
        const { activatedRoute } = outlet;
        const dataSubscription = combineLatest([
          activatedRoute.queryParams,
          activatedRoute.params,
          activatedRoute.data
        ]).pipe(switchMap(([queryParams, params, data], index) => {
          data = __spreadValues(__spreadValues(__spreadValues({}, queryParams), params), data);
          if (index === 0) {
            return of(data);
          }
          return Promise.resolve(data);
        })).subscribe((data) => {
          if (!outlet.isActivated || !outlet.activatedComponentRef || outlet.activatedRoute !== activatedRoute || activatedRoute.component === null) {
            this.unsubscribeFromRouteData(outlet);
            return;
          }
          const mirror = reflectComponentType(activatedRoute.component);
          if (!mirror) {
            this.unsubscribeFromRouteData(outlet);
            return;
          }
          for (const { templateName } of mirror.inputs) {
            outlet.activatedComponentRef.setInput(templateName, data[templateName]);
          }
        });
        this.outletDataSubscriptions.set(outlet, dataSubscription);
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _RoutedComponentInputBinder, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _RoutedComponentInputBinder });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: RoutedComponentInputBinder, decorators: [{
      type: Injectable
    }] });
    \u0275EmptyOutletComponent = class _\u0275EmptyOutletComponent {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _\u0275EmptyOutletComponent, deps: [], target: FactoryTarget.Component });
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "20.2.0-next.2", type: _\u0275EmptyOutletComponent, isStandalone: true, selector: "ng-component", exportAs: ["emptyRouterOutlet"], ngImport: core_exports, template: `<router-outlet/>`, isInline: true, dependencies: [{ kind: "directive", type: RouterOutlet, selector: "router-outlet", inputs: ["name", "routerOutletData"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }] });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: \u0275EmptyOutletComponent, decorators: [{
      type: Component,
      args: [{
        template: `<router-outlet/>`,
        imports: [RouterOutlet],
        // Used to avoid component ID collisions with user code.
        exportAs: "emptyRouterOutlet"
      }]
    }] });
    RedirectCommand = class {
      redirectTo;
      navigationBehaviorOptions;
      constructor(redirectTo, navigationBehaviorOptions) {
        this.redirectTo = redirectTo;
        this.navigationBehaviorOptions = navigationBehaviorOptions;
      }
    };
    NAVIGATION_CANCELING_ERROR = "ngNavigationCancelingError";
    warnedAboutUnsupportedInputBinding = false;
    activateRoutes = (rootContexts, routeReuseStrategy, forwardEvent, inputBindingEnabled) => map((t) => {
      new ActivateRoutes(routeReuseStrategy, t.targetRouterState, t.currentRouterState, forwardEvent, inputBindingEnabled).activate(rootContexts);
      return t;
    });
    ActivateRoutes = class {
      routeReuseStrategy;
      futureState;
      currState;
      forwardEvent;
      inputBindingEnabled;
      constructor(routeReuseStrategy, futureState, currState, forwardEvent, inputBindingEnabled) {
        this.routeReuseStrategy = routeReuseStrategy;
        this.futureState = futureState;
        this.currState = currState;
        this.forwardEvent = forwardEvent;
        this.inputBindingEnabled = inputBindingEnabled;
      }
      activate(parentContexts) {
        const futureRoot = this.futureState._root;
        const currRoot = this.currState ? this.currState._root : null;
        this.deactivateChildRoutes(futureRoot, currRoot, parentContexts);
        advanceActivatedRoute(this.futureState.root);
        this.activateChildRoutes(futureRoot, currRoot, parentContexts);
      }
      // De-activate the child route that are not re-used for the future state
      deactivateChildRoutes(futureNode, currNode, contexts) {
        const children = nodeChildrenAsMap(currNode);
        futureNode.children.forEach((futureChild) => {
          const childOutletName = futureChild.value.outlet;
          this.deactivateRoutes(futureChild, children[childOutletName], contexts);
          delete children[childOutletName];
        });
        Object.values(children).forEach((v) => {
          this.deactivateRouteAndItsChildren(v, contexts);
        });
      }
      deactivateRoutes(futureNode, currNode, parentContext) {
        const future = futureNode.value;
        const curr = currNode ? currNode.value : null;
        if (future === curr) {
          if (future.component) {
            const context = parentContext.getContext(future.outlet);
            if (context) {
              this.deactivateChildRoutes(futureNode, currNode, context.children);
            }
          } else {
            this.deactivateChildRoutes(futureNode, currNode, parentContext);
          }
        } else {
          if (curr) {
            this.deactivateRouteAndItsChildren(currNode, parentContext);
          }
        }
      }
      deactivateRouteAndItsChildren(route, parentContexts) {
        if (route.value.component && this.routeReuseStrategy.shouldDetach(route.value.snapshot)) {
          this.detachAndStoreRouteSubtree(route, parentContexts);
        } else {
          this.deactivateRouteAndOutlet(route, parentContexts);
        }
      }
      detachAndStoreRouteSubtree(route, parentContexts) {
        const context = parentContexts.getContext(route.value.outlet);
        const contexts = context && route.value.component ? context.children : parentContexts;
        const children = nodeChildrenAsMap(route);
        for (const treeNode of Object.values(children)) {
          this.deactivateRouteAndItsChildren(treeNode, contexts);
        }
        if (context && context.outlet) {
          const componentRef = context.outlet.detach();
          const contexts2 = context.children.onOutletDeactivated();
          this.routeReuseStrategy.store(route.value.snapshot, { componentRef, route, contexts: contexts2 });
        }
      }
      deactivateRouteAndOutlet(route, parentContexts) {
        const context = parentContexts.getContext(route.value.outlet);
        const contexts = context && route.value.component ? context.children : parentContexts;
        const children = nodeChildrenAsMap(route);
        for (const treeNode of Object.values(children)) {
          this.deactivateRouteAndItsChildren(treeNode, contexts);
        }
        if (context) {
          if (context.outlet) {
            context.outlet.deactivate();
            context.children.onOutletDeactivated();
          }
          context.attachRef = null;
          context.route = null;
        }
      }
      activateChildRoutes(futureNode, currNode, contexts) {
        const children = nodeChildrenAsMap(currNode);
        futureNode.children.forEach((c) => {
          this.activateRoutes(c, children[c.value.outlet], contexts);
          this.forwardEvent(new ActivationEnd(c.value.snapshot));
        });
        if (futureNode.children.length) {
          this.forwardEvent(new ChildActivationEnd(futureNode.value.snapshot));
        }
      }
      activateRoutes(futureNode, currNode, parentContexts) {
        const future = futureNode.value;
        const curr = currNode ? currNode.value : null;
        advanceActivatedRoute(future);
        if (future === curr) {
          if (future.component) {
            const context = parentContexts.getOrCreateContext(future.outlet);
            this.activateChildRoutes(futureNode, currNode, context.children);
          } else {
            this.activateChildRoutes(futureNode, currNode, parentContexts);
          }
        } else {
          if (future.component) {
            const context = parentContexts.getOrCreateContext(future.outlet);
            if (this.routeReuseStrategy.shouldAttach(future.snapshot)) {
              const stored = this.routeReuseStrategy.retrieve(future.snapshot);
              this.routeReuseStrategy.store(future.snapshot, null);
              context.children.onOutletReAttached(stored.contexts);
              context.attachRef = stored.componentRef;
              context.route = stored.route.value;
              if (context.outlet) {
                context.outlet.attach(stored.componentRef, stored.route.value);
              }
              advanceActivatedRoute(stored.route.value);
              this.activateChildRoutes(futureNode, null, context.children);
            } else {
              context.attachRef = null;
              context.route = future;
              if (context.outlet) {
                context.outlet.activateWith(future, context.injector);
              }
              this.activateChildRoutes(futureNode, null, context.children);
            }
          } else {
            this.activateChildRoutes(futureNode, null, parentContexts);
          }
        }
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          const context = parentContexts.getOrCreateContext(future.outlet);
          const outlet = context.outlet;
          if (outlet && this.inputBindingEnabled && !outlet.supportsBindingToComponentInputs && !warnedAboutUnsupportedInputBinding) {
            console.warn(`'withComponentInputBinding' feature is enabled but this application is using an outlet that may not support binding to component inputs.`);
            warnedAboutUnsupportedInputBinding = true;
          }
        }
      }
    };
    CanActivate = class {
      path;
      route;
      constructor(path) {
        this.path = path;
        this.route = this.path[this.path.length - 1];
      }
    };
    CanDeactivate = class {
      component;
      route;
      constructor(component, route) {
        this.component = component;
        this.route = route;
      }
    };
    INITIAL_VALUE = /* @__PURE__ */ Symbol("INITIAL_VALUE");
    NoMatch = class {
      segmentGroup;
      constructor(segmentGroup) {
        this.segmentGroup = segmentGroup || null;
      }
    };
    AbsoluteRedirect = class extends Error {
      urlTree;
      constructor(urlTree) {
        super();
        this.urlTree = urlTree;
      }
    };
    ApplyRedirects = class {
      urlSerializer;
      urlTree;
      constructor(urlSerializer, urlTree) {
        this.urlSerializer = urlSerializer;
        this.urlTree = urlTree;
      }
      lineralizeSegments(route, urlTree) {
        let res = [];
        let c = urlTree.root;
        while (true) {
          res = res.concat(c.segments);
          if (c.numberOfChildren === 0) {
            return of(res);
          }
          if (c.numberOfChildren > 1 || !c.children[PRIMARY_OUTLET]) {
            return namedOutletsRedirect(`${route.redirectTo}`);
          }
          c = c.children[PRIMARY_OUTLET];
        }
      }
      applyRedirectCommands(segments, redirectTo, posParams, currentSnapshot, injector) {
        return getRedirectResult(redirectTo, currentSnapshot, injector).pipe(map((redirect) => {
          if (redirect instanceof UrlTree) {
            throw new AbsoluteRedirect(redirect);
          }
          const newTree = this.applyRedirectCreateUrlTree(redirect, this.urlSerializer.parse(redirect), segments, posParams);
          if (redirect[0] === "/") {
            throw new AbsoluteRedirect(newTree);
          }
          return newTree;
        }));
      }
      applyRedirectCreateUrlTree(redirectTo, urlTree, segments, posParams) {
        const newRoot = this.createSegmentGroup(redirectTo, urlTree.root, segments, posParams);
        return new UrlTree(newRoot, this.createQueryParams(urlTree.queryParams, this.urlTree.queryParams), urlTree.fragment);
      }
      createQueryParams(redirectToParams, actualParams) {
        const res = {};
        Object.entries(redirectToParams).forEach(([k, v]) => {
          const copySourceValue = typeof v === "string" && v[0] === ":";
          if (copySourceValue) {
            const sourceName = v.substring(1);
            res[k] = actualParams[sourceName];
          } else {
            res[k] = v;
          }
        });
        return res;
      }
      createSegmentGroup(redirectTo, group, segments, posParams) {
        const updatedSegments = this.createSegments(redirectTo, group.segments, segments, posParams);
        let children = {};
        Object.entries(group.children).forEach(([name, child]) => {
          children[name] = this.createSegmentGroup(redirectTo, child, segments, posParams);
        });
        return new UrlSegmentGroup(updatedSegments, children);
      }
      createSegments(redirectTo, redirectToSegments, actualSegments, posParams) {
        return redirectToSegments.map((s) => s.path[0] === ":" ? this.findPosParam(redirectTo, s, posParams) : this.findOrReturn(s, actualSegments));
      }
      findPosParam(redirectTo, redirectToUrlSegment, posParams) {
        const pos = posParams[redirectToUrlSegment.path.substring(1)];
        if (!pos)
          throw new RuntimeError(4001, (typeof ngDevMode === "undefined" || ngDevMode) && `Cannot redirect to '${redirectTo}'. Cannot find '${redirectToUrlSegment.path}'.`);
        return pos;
      }
      findOrReturn(redirectToUrlSegment, actualSegments) {
        let idx = 0;
        for (const s of actualSegments) {
          if (s.path === redirectToUrlSegment.path) {
            actualSegments.splice(idx);
            return s;
          }
          idx++;
        }
        return redirectToUrlSegment;
      }
    };
    noMatch = {
      matched: false,
      consumedSegments: [],
      remainingSegments: [],
      parameters: {},
      positionalParamSegments: {}
    };
    NoLeftoversInUrl = class {
    };
    MAX_ALLOWED_REDIRECTS = 31;
    Recognizer = class {
      injector;
      configLoader;
      rootComponentType;
      config;
      urlTree;
      paramsInheritanceStrategy;
      urlSerializer;
      applyRedirects;
      absoluteRedirectCount = 0;
      allowRedirects = true;
      constructor(injector, configLoader, rootComponentType, config, urlTree, paramsInheritanceStrategy, urlSerializer) {
        this.injector = injector;
        this.configLoader = configLoader;
        this.rootComponentType = rootComponentType;
        this.config = config;
        this.urlTree = urlTree;
        this.paramsInheritanceStrategy = paramsInheritanceStrategy;
        this.urlSerializer = urlSerializer;
        this.applyRedirects = new ApplyRedirects(this.urlSerializer, this.urlTree);
      }
      noMatchError(e) {
        return new RuntimeError(4002, typeof ngDevMode === "undefined" || ngDevMode ? `Cannot match any routes. URL Segment: '${e.segmentGroup}'` : `'${e.segmentGroup}'`);
      }
      recognize() {
        const rootSegmentGroup = split(this.urlTree.root, [], [], this.config).segmentGroup;
        return this.match(rootSegmentGroup).pipe(map(({ children, rootSnapshot }) => {
          const rootNode = new TreeNode(rootSnapshot, children);
          const routeState = new RouterStateSnapshot("", rootNode);
          const tree2 = createUrlTreeFromSnapshot(rootSnapshot, [], this.urlTree.queryParams, this.urlTree.fragment);
          tree2.queryParams = this.urlTree.queryParams;
          routeState.url = this.urlSerializer.serialize(tree2);
          return { state: routeState, tree: tree2 };
        }));
      }
      match(rootSegmentGroup) {
        const rootSnapshot = new ActivatedRouteSnapshot([], Object.freeze({}), Object.freeze(__spreadValues({}, this.urlTree.queryParams)), this.urlTree.fragment, Object.freeze({}), PRIMARY_OUTLET, this.rootComponentType, null, {});
        return this.processSegmentGroup(this.injector, this.config, rootSegmentGroup, PRIMARY_OUTLET, rootSnapshot).pipe(map((children) => {
          return { children, rootSnapshot };
        }), catchError((e) => {
          if (e instanceof AbsoluteRedirect) {
            this.urlTree = e.urlTree;
            return this.match(e.urlTree.root);
          }
          if (e instanceof NoMatch) {
            throw this.noMatchError(e);
          }
          throw e;
        }));
      }
      processSegmentGroup(injector, config, segmentGroup, outlet, parentRoute) {
        if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
          return this.processChildren(injector, config, segmentGroup, parentRoute);
        }
        return this.processSegment(injector, config, segmentGroup, segmentGroup.segments, outlet, true, parentRoute).pipe(map((child) => child instanceof TreeNode ? [child] : []));
      }
      /**
       * Matches every child outlet in the `segmentGroup` to a `Route` in the config. Returns `null` if
       * we cannot find a match for _any_ of the children.
       *
       * @param config - The `Routes` to match against
       * @param segmentGroup - The `UrlSegmentGroup` whose children need to be matched against the
       *     config.
       */
      processChildren(injector, config, segmentGroup, parentRoute) {
        const childOutlets = [];
        for (const child of Object.keys(segmentGroup.children)) {
          if (child === "primary") {
            childOutlets.unshift(child);
          } else {
            childOutlets.push(child);
          }
        }
        return from(childOutlets).pipe(concatMap((childOutlet) => {
          const child = segmentGroup.children[childOutlet];
          const sortedConfig = sortByMatchingOutlets(config, childOutlet);
          return this.processSegmentGroup(injector, sortedConfig, child, childOutlet, parentRoute);
        }), scan((children, outletChildren) => {
          children.push(...outletChildren);
          return children;
        }), defaultIfEmpty(null), last(), mergeMap((children) => {
          if (children === null)
            return noMatch$1(segmentGroup);
          const mergedChildren = mergeEmptyPathMatches(children);
          if (typeof ngDevMode === "undefined" || ngDevMode) {
            checkOutletNameUniqueness(mergedChildren);
          }
          sortActivatedRouteSnapshots(mergedChildren);
          return of(mergedChildren);
        }));
      }
      processSegment(injector, routes, segmentGroup, segments, outlet, allowRedirects, parentRoute) {
        return from(routes).pipe(concatMap((r) => {
          return this.processSegmentAgainstRoute(r._injector ?? injector, routes, r, segmentGroup, segments, outlet, allowRedirects, parentRoute).pipe(catchError((e) => {
            if (e instanceof NoMatch) {
              return of(null);
            }
            throw e;
          }));
        }), first((x) => !!x), catchError((e) => {
          if (isEmptyError(e)) {
            if (noLeftoversInUrl(segmentGroup, segments, outlet)) {
              return of(new NoLeftoversInUrl());
            }
            return noMatch$1(segmentGroup);
          }
          throw e;
        }));
      }
      processSegmentAgainstRoute(injector, routes, route, rawSegment, segments, outlet, allowRedirects, parentRoute) {
        if (getOutlet(route) !== outlet && (outlet === PRIMARY_OUTLET || !emptyPathMatch(rawSegment, segments, route))) {
          return noMatch$1(rawSegment);
        }
        if (route.redirectTo === void 0) {
          return this.matchSegmentAgainstRoute(injector, rawSegment, route, segments, outlet, parentRoute);
        }
        if (this.allowRedirects && allowRedirects) {
          return this.expandSegmentAgainstRouteUsingRedirect(injector, rawSegment, routes, route, segments, outlet, parentRoute);
        }
        return noMatch$1(rawSegment);
      }
      expandSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes, route, segments, outlet, parentRoute) {
        const { matched, parameters, consumedSegments, positionalParamSegments, remainingSegments } = match(segmentGroup, route, segments);
        if (!matched)
          return noMatch$1(segmentGroup);
        if (typeof route.redirectTo === "string" && route.redirectTo[0] === "/") {
          this.absoluteRedirectCount++;
          if (this.absoluteRedirectCount > MAX_ALLOWED_REDIRECTS) {
            if (ngDevMode) {
              throw new RuntimeError(4016, `Detected possible infinite redirect when redirecting from '${this.urlTree}' to '${route.redirectTo}'.
This is currently a dev mode only error but will become a call stack size exceeded error in production in a future major version.`);
            }
            this.allowRedirects = false;
          }
        }
        const currentSnapshot = new ActivatedRouteSnapshot(segments, parameters, Object.freeze(__spreadValues({}, this.urlTree.queryParams)), this.urlTree.fragment, getData(route), getOutlet(route), route.component ?? route._loadedComponent ?? null, route, getResolve(route));
        const inherited = getInherited(currentSnapshot, parentRoute, this.paramsInheritanceStrategy);
        currentSnapshot.params = Object.freeze(inherited.params);
        currentSnapshot.data = Object.freeze(inherited.data);
        const newTree$ = this.applyRedirects.applyRedirectCommands(consumedSegments, route.redirectTo, positionalParamSegments, currentSnapshot, injector);
        return newTree$.pipe(switchMap((newTree) => this.applyRedirects.lineralizeSegments(route, newTree)), mergeMap((newSegments) => {
          return this.processSegment(injector, routes, segmentGroup, newSegments.concat(remainingSegments), outlet, false, parentRoute);
        }));
      }
      matchSegmentAgainstRoute(injector, rawSegment, route, segments, outlet, parentRoute) {
        const matchResult = matchWithChecks(rawSegment, route, segments, injector, this.urlSerializer);
        if (route.path === "**") {
          rawSegment.children = {};
        }
        return matchResult.pipe(switchMap((result) => {
          if (!result.matched) {
            return noMatch$1(rawSegment);
          }
          injector = route._injector ?? injector;
          return this.getChildConfig(injector, route, segments).pipe(switchMap(({ routes: childConfig }) => {
            const childInjector = route._loadedInjector ?? injector;
            const { parameters, consumedSegments, remainingSegments } = result;
            const snapshot = new ActivatedRouteSnapshot(consumedSegments, parameters, Object.freeze(__spreadValues({}, this.urlTree.queryParams)), this.urlTree.fragment, getData(route), getOutlet(route), route.component ?? route._loadedComponent ?? null, route, getResolve(route));
            const inherited = getInherited(snapshot, parentRoute, this.paramsInheritanceStrategy);
            snapshot.params = Object.freeze(inherited.params);
            snapshot.data = Object.freeze(inherited.data);
            const { segmentGroup, slicedSegments } = split(rawSegment, consumedSegments, remainingSegments, childConfig);
            if (slicedSegments.length === 0 && segmentGroup.hasChildren()) {
              return this.processChildren(childInjector, childConfig, segmentGroup, snapshot).pipe(map((children) => {
                return new TreeNode(snapshot, children);
              }));
            }
            if (childConfig.length === 0 && slicedSegments.length === 0) {
              return of(new TreeNode(snapshot, []));
            }
            const matchedOnOutlet = getOutlet(route) === outlet;
            return this.processSegment(childInjector, childConfig, segmentGroup, slicedSegments, matchedOnOutlet ? PRIMARY_OUTLET : outlet, true, snapshot).pipe(map((child) => {
              return new TreeNode(snapshot, child instanceof TreeNode ? [child] : []);
            }));
          }));
        }));
      }
      getChildConfig(injector, route, segments) {
        if (route.children) {
          return of({ routes: route.children, injector });
        }
        if (route.loadChildren) {
          if (route._loadedRoutes !== void 0) {
            return of({ routes: route._loadedRoutes, injector: route._loadedInjector });
          }
          return runCanLoadGuards(injector, route, segments, this.urlSerializer).pipe(mergeMap((shouldLoadResult) => {
            if (shouldLoadResult) {
              return this.configLoader.loadChildren(injector, route).pipe(tap((cfg) => {
                route._loadedRoutes = cfg.routes;
                route._loadedInjector = cfg.injector;
              }));
            }
            return canLoadFails(route);
          }));
        }
        return of({ routes: [], injector });
      }
    };
    TitleStrategy = class _TitleStrategy {
      /**
       * @returns The `title` of the deepest primary route.
       */
      buildTitle(snapshot) {
        let pageTitle;
        let route = snapshot.root;
        while (route !== void 0) {
          pageTitle = this.getResolvedTitleForRoute(route) ?? pageTitle;
          route = route.children.find((child) => child.outlet === PRIMARY_OUTLET);
        }
        return pageTitle;
      }
      /**
       * Given an `ActivatedRouteSnapshot`, returns the final value of the
       * `Route.title` property, which can either be a static string or a resolved value.
       */
      getResolvedTitleForRoute(snapshot) {
        return snapshot.data[RouteTitleKey];
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _TitleStrategy, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _TitleStrategy, providedIn: "root", useFactory: () => inject(DefaultTitleStrategy) });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: TitleStrategy, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root", useFactory: () => inject(DefaultTitleStrategy) }]
    }] });
    DefaultTitleStrategy = class _DefaultTitleStrategy extends TitleStrategy {
      title;
      constructor(title) {
        super();
        this.title = title;
      }
      /**
       * Sets the title of the browser to the given value.
       *
       * @param title The `pageTitle` from the deepest primary route.
       */
      updateTitle(snapshot) {
        const title = this.buildTitle(snapshot);
        if (title !== void 0) {
          this.title.setTitle(title);
        }
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _DefaultTitleStrategy, deps: [{ token: Title }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _DefaultTitleStrategy, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: DefaultTitleStrategy, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }], ctorParameters: () => [{ type: Title }] });
    ROUTER_CONFIGURATION = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "router config" : "", {
      providedIn: "root",
      factory: () => ({})
    });
    ROUTES = new InjectionToken(ngDevMode ? "ROUTES" : "");
    RouterConfigLoader = class _RouterConfigLoader {
      componentLoaders = /* @__PURE__ */ new WeakMap();
      childrenLoaders = /* @__PURE__ */ new WeakMap();
      onLoadStartListener;
      onLoadEndListener;
      compiler = inject(Compiler);
      loadComponent(injector, route) {
        if (this.componentLoaders.get(route)) {
          return this.componentLoaders.get(route);
        } else if (route._loadedComponent) {
          return of(route._loadedComponent);
        }
        if (this.onLoadStartListener) {
          this.onLoadStartListener(route);
        }
        const loadRunner = wrapIntoObservable(runInInjectionContext(injector, () => route.loadComponent())).pipe(map(maybeUnwrapDefaultExport), switchMap(maybeResolveResources), tap((component) => {
          if (this.onLoadEndListener) {
            this.onLoadEndListener(route);
          }
          (typeof ngDevMode === "undefined" || ngDevMode) && assertStandalone(route.path ?? "", component);
          route._loadedComponent = component;
        }), finalize(() => {
          this.componentLoaders.delete(route);
        }));
        const loader = new ConnectableObservable(loadRunner, () => new Subject()).pipe(refCount());
        this.componentLoaders.set(route, loader);
        return loader;
      }
      loadChildren(parentInjector, route) {
        if (this.childrenLoaders.get(route)) {
          return this.childrenLoaders.get(route);
        } else if (route._loadedRoutes) {
          return of({ routes: route._loadedRoutes, injector: route._loadedInjector });
        }
        if (this.onLoadStartListener) {
          this.onLoadStartListener(route);
        }
        const moduleFactoryOrRoutes$ = loadChildren(route, this.compiler, parentInjector, this.onLoadEndListener);
        const loadRunner = moduleFactoryOrRoutes$.pipe(finalize(() => {
          this.childrenLoaders.delete(route);
        }));
        const loader = new ConnectableObservable(loadRunner, () => new Subject()).pipe(refCount());
        this.childrenLoaders.set(route, loader);
        return loader;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _RouterConfigLoader, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _RouterConfigLoader, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: RouterConfigLoader, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }] });
    UrlHandlingStrategy = class _UrlHandlingStrategy {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _UrlHandlingStrategy, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _UrlHandlingStrategy, providedIn: "root", useFactory: () => inject(DefaultUrlHandlingStrategy) });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: UrlHandlingStrategy, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root", useFactory: () => inject(DefaultUrlHandlingStrategy) }]
    }] });
    DefaultUrlHandlingStrategy = class _DefaultUrlHandlingStrategy {
      shouldProcessUrl(url) {
        return true;
      }
      extract(url) {
        return url;
      }
      merge(newUrlPart, wholeUrl) {
        return newUrlPart;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _DefaultUrlHandlingStrategy, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _DefaultUrlHandlingStrategy, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: DefaultUrlHandlingStrategy, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }] });
    CREATE_VIEW_TRANSITION = new InjectionToken(ngDevMode ? "view transition helper" : "");
    VIEW_TRANSITION_OPTIONS = new InjectionToken(ngDevMode ? "view transition options" : "");
    NAVIGATION_ERROR_HANDLER = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "navigation error handler" : "");
    NavigationTransitions = class _NavigationTransitions {
      // Some G3 targets expect the navigation object to be mutated (and not getting a new reference on changes).
      currentNavigation = signal(null, ...ngDevMode ? [{ debugName: "currentNavigation", equal: () => false }] : [{ equal: () => false }]);
      currentTransition = null;
      lastSuccessfulNavigation = null;
      /**
       * These events are used to communicate back to the Router about the state of the transition. The
       * Router wants to respond to these events in various ways. Because the `NavigationTransition`
       * class is not public, this event subject is not publicly exposed.
       */
      events = new Subject();
      /**
       * Used to abort the current transition with an error.
       */
      transitionAbortWithErrorSubject = new Subject();
      configLoader = inject(RouterConfigLoader);
      environmentInjector = inject(EnvironmentInjector);
      destroyRef = inject(DestroyRef);
      urlSerializer = inject(UrlSerializer);
      rootContexts = inject(ChildrenOutletContexts);
      location = inject(Location);
      inputBindingEnabled = inject(INPUT_BINDER, { optional: true }) !== null;
      titleStrategy = inject(TitleStrategy);
      options = inject(ROUTER_CONFIGURATION, { optional: true }) || {};
      paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly";
      urlHandlingStrategy = inject(UrlHandlingStrategy);
      createViewTransition = inject(CREATE_VIEW_TRANSITION, { optional: true });
      navigationErrorHandler = inject(NAVIGATION_ERROR_HANDLER, { optional: true });
      navigationId = 0;
      get hasRequestedNavigation() {
        return this.navigationId !== 0;
      }
      transitions;
      /**
       * Hook that enables you to pause navigation after the preactivation phase.
       * Used by `RouterModule`.
       *
       * @internal
       */
      afterPreactivation = () => of(void 0);
      /** @internal */
      rootComponentType = null;
      destroyed = false;
      constructor() {
        const onLoadStart = (r) => this.events.next(new RouteConfigLoadStart(r));
        const onLoadEnd = (r) => this.events.next(new RouteConfigLoadEnd(r));
        this.configLoader.onLoadEndListener = onLoadEnd;
        this.configLoader.onLoadStartListener = onLoadStart;
        this.destroyRef.onDestroy(() => {
          this.destroyed = true;
        });
      }
      complete() {
        this.transitions?.complete();
      }
      handleNavigationRequest(request) {
        const id = ++this.navigationId;
        untracked(() => {
          this.transitions?.next(__spreadProps(__spreadValues({}, request), {
            extractedUrl: this.urlHandlingStrategy.extract(request.rawUrl),
            targetSnapshot: null,
            targetRouterState: null,
            guards: { canActivateChecks: [], canDeactivateChecks: [] },
            guardsResult: null,
            abortController: new AbortController(),
            id
          }));
        });
      }
      setupNavigations(router) {
        this.transitions = new BehaviorSubject(null);
        return this.transitions.pipe(
          filter((t) => t !== null),
          // Using switchMap so we cancel executing navigations when a new one comes in
          switchMap((overallTransitionState) => {
            let completedOrAborted = false;
            return of(overallTransitionState).pipe(
              switchMap((t) => {
                if (this.navigationId > overallTransitionState.id) {
                  const cancellationReason = typeof ngDevMode === "undefined" || ngDevMode ? `Navigation ID ${overallTransitionState.id} is not equal to the current navigation id ${this.navigationId}` : "";
                  this.cancelNavigationTransition(overallTransitionState, cancellationReason, NavigationCancellationCode.SupersededByNewNavigation);
                  return EMPTY;
                }
                this.currentTransition = overallTransitionState;
                this.currentNavigation.set({
                  id: t.id,
                  initialUrl: t.rawUrl,
                  extractedUrl: t.extractedUrl,
                  targetBrowserUrl: typeof t.extras.browserUrl === "string" ? this.urlSerializer.parse(t.extras.browserUrl) : t.extras.browserUrl,
                  trigger: t.source,
                  extras: t.extras,
                  previousNavigation: !this.lastSuccessfulNavigation ? null : __spreadProps(__spreadValues({}, this.lastSuccessfulNavigation), {
                    previousNavigation: null
                  }),
                  abort: () => t.abortController.abort()
                });
                const urlTransition = !router.navigated || this.isUpdatingInternalState() || this.isUpdatedBrowserUrl();
                const onSameUrlNavigation = t.extras.onSameUrlNavigation ?? router.onSameUrlNavigation;
                if (!urlTransition && onSameUrlNavigation !== "reload") {
                  const reason = typeof ngDevMode === "undefined" || ngDevMode ? `Navigation to ${t.rawUrl} was ignored because it is the same as the current Router URL.` : "";
                  this.events.next(new NavigationSkipped(t.id, this.urlSerializer.serialize(t.rawUrl), reason, NavigationSkippedCode.IgnoredSameUrlNavigation));
                  t.resolve(false);
                  return EMPTY;
                }
                if (this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)) {
                  return of(t).pipe(
                    // Fire NavigationStart event
                    switchMap((t2) => {
                      this.events.next(new NavigationStart(t2.id, this.urlSerializer.serialize(t2.extractedUrl), t2.source, t2.restoredState));
                      if (t2.id !== this.navigationId) {
                        return EMPTY;
                      }
                      return Promise.resolve(t2);
                    }),
                    // Recognize
                    recognize(this.environmentInjector, this.configLoader, this.rootComponentType, router.config, this.urlSerializer, this.paramsInheritanceStrategy),
                    // Update URL if in `eager` update mode
                    tap((t2) => {
                      overallTransitionState.targetSnapshot = t2.targetSnapshot;
                      overallTransitionState.urlAfterRedirects = t2.urlAfterRedirects;
                      this.currentNavigation.update((nav) => {
                        nav.finalUrl = t2.urlAfterRedirects;
                        return nav;
                      });
                      const routesRecognized = new RoutesRecognized(t2.id, this.urlSerializer.serialize(t2.extractedUrl), this.urlSerializer.serialize(t2.urlAfterRedirects), t2.targetSnapshot);
                      this.events.next(routesRecognized);
                    })
                  );
                } else if (urlTransition && this.urlHandlingStrategy.shouldProcessUrl(t.currentRawUrl)) {
                  const { id, extractedUrl, source, restoredState, extras } = t;
                  const navStart = new NavigationStart(id, this.urlSerializer.serialize(extractedUrl), source, restoredState);
                  this.events.next(navStart);
                  const targetSnapshot = createEmptyState(this.rootComponentType).snapshot;
                  this.currentTransition = overallTransitionState = __spreadProps(__spreadValues({}, t), {
                    targetSnapshot,
                    urlAfterRedirects: extractedUrl,
                    extras: __spreadProps(__spreadValues({}, extras), { skipLocationChange: false, replaceUrl: false })
                  });
                  this.currentNavigation.update((nav) => {
                    nav.finalUrl = extractedUrl;
                    return nav;
                  });
                  return of(overallTransitionState);
                } else {
                  const reason = typeof ngDevMode === "undefined" || ngDevMode ? `Navigation was ignored because the UrlHandlingStrategy indicated neither the current URL ${t.currentRawUrl} nor target URL ${t.rawUrl} should be processed.` : "";
                  this.events.next(new NavigationSkipped(t.id, this.urlSerializer.serialize(t.extractedUrl), reason, NavigationSkippedCode.IgnoredByUrlHandlingStrategy));
                  t.resolve(false);
                  return EMPTY;
                }
              }),
              // --- GUARDS ---
              tap((t) => {
                const guardsStart = new GuardsCheckStart(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects), t.targetSnapshot);
                this.events.next(guardsStart);
              }),
              map((t) => {
                this.currentTransition = overallTransitionState = __spreadProps(__spreadValues({}, t), {
                  guards: getAllRouteGuards(t.targetSnapshot, t.currentSnapshot, this.rootContexts)
                });
                return overallTransitionState;
              }),
              checkGuards(this.environmentInjector, (evt) => this.events.next(evt)),
              tap((t) => {
                overallTransitionState.guardsResult = t.guardsResult;
                if (t.guardsResult && typeof t.guardsResult !== "boolean") {
                  throw redirectingNavigationError(this.urlSerializer, t.guardsResult);
                }
                const guardsEnd = new GuardsCheckEnd(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects), t.targetSnapshot, !!t.guardsResult);
                this.events.next(guardsEnd);
              }),
              filter((t) => {
                if (!t.guardsResult) {
                  this.cancelNavigationTransition(t, "", NavigationCancellationCode.GuardRejected);
                  return false;
                }
                return true;
              }),
              // --- RESOLVE ---
              switchTap((t) => {
                if (t.guards.canActivateChecks.length === 0) {
                  return void 0;
                }
                return of(t).pipe(tap((t2) => {
                  const resolveStart = new ResolveStart(t2.id, this.urlSerializer.serialize(t2.extractedUrl), this.urlSerializer.serialize(t2.urlAfterRedirects), t2.targetSnapshot);
                  this.events.next(resolveStart);
                }), switchMap((t2) => {
                  let dataResolved = false;
                  return of(t2).pipe(resolveData(this.paramsInheritanceStrategy, this.environmentInjector), tap({
                    next: () => dataResolved = true,
                    complete: () => {
                      if (!dataResolved) {
                        this.cancelNavigationTransition(t2, typeof ngDevMode === "undefined" || ngDevMode ? `At least one route resolver didn't emit any value.` : "", NavigationCancellationCode.NoDataFromResolver);
                      }
                    }
                  }));
                }), tap((t2) => {
                  const resolveEnd = new ResolveEnd(t2.id, this.urlSerializer.serialize(t2.extractedUrl), this.urlSerializer.serialize(t2.urlAfterRedirects), t2.targetSnapshot);
                  this.events.next(resolveEnd);
                }));
              }),
              // --- LOAD COMPONENTS ---
              switchTap((t) => {
                const loadComponents = (route) => {
                  const loaders = [];
                  if (route.routeConfig?.loadComponent) {
                    const injector = getClosestRouteInjector(route) ?? this.environmentInjector;
                    loaders.push(this.configLoader.loadComponent(injector, route.routeConfig).pipe(tap((loadedComponent) => {
                      route.component = loadedComponent;
                    }), map(() => void 0)));
                  }
                  for (const child of route.children) {
                    loaders.push(...loadComponents(child));
                  }
                  return loaders;
                };
                return combineLatest(loadComponents(t.targetSnapshot.root)).pipe(defaultIfEmpty(null), take(1));
              }),
              switchTap(() => this.afterPreactivation()),
              switchMap(() => {
                const { currentSnapshot, targetSnapshot } = overallTransitionState;
                const viewTransitionStarted = this.createViewTransition?.(this.environmentInjector, currentSnapshot.root, targetSnapshot.root);
                return viewTransitionStarted ? from(viewTransitionStarted).pipe(map(() => overallTransitionState)) : of(overallTransitionState);
              }),
              map((t) => {
                const targetRouterState = createRouterState(router.routeReuseStrategy, t.targetSnapshot, t.currentRouterState);
                this.currentTransition = overallTransitionState = __spreadProps(__spreadValues({}, t), { targetRouterState });
                this.currentNavigation.update((nav) => {
                  nav.targetRouterState = targetRouterState;
                  return nav;
                });
                return overallTransitionState;
              }),
              tap(() => {
                this.events.next(new BeforeActivateRoutes());
              }),
              activateRoutes(this.rootContexts, router.routeReuseStrategy, (evt) => this.events.next(evt), this.inputBindingEnabled),
              // Ensure that if some observable used to drive the transition doesn't
              // complete, the navigation still finalizes This should never happen, but
              // this is done as a safety measure to avoid surfacing this error (#49567).
              take(1),
              takeUntil(new Observable((subscriber) => {
                const abortSignal = overallTransitionState.abortController.signal;
                const handler = () => subscriber.next();
                abortSignal.addEventListener("abort", handler);
                return () => abortSignal.removeEventListener("abort", handler);
              }).pipe(
                // Ignore aborts if we are already completed, canceled, or are in the activation stage (we have targetRouterState)
                filter(() => !completedOrAborted && !overallTransitionState.targetRouterState),
                tap(() => {
                  this.cancelNavigationTransition(overallTransitionState, overallTransitionState.abortController.signal.reason + "", NavigationCancellationCode.Aborted);
                })
              )),
              tap({
                next: (t) => {
                  completedOrAborted = true;
                  this.lastSuccessfulNavigation = untracked(this.currentNavigation);
                  this.events.next(new NavigationEnd(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects)));
                  this.titleStrategy?.updateTitle(t.targetRouterState.snapshot);
                  t.resolve(true);
                },
                complete: () => {
                  completedOrAborted = true;
                }
              }),
              // There used to be a lot more logic happening directly within the
              // transition Observable. Some of this logic has been refactored out to
              // other places but there may still be errors that happen there. This gives
              // us a way to cancel the transition from the outside. This may also be
              // required in the future to support something like the abort signal of the
              // Navigation API where the navigation gets aborted from outside the
              // transition.
              takeUntil(this.transitionAbortWithErrorSubject.pipe(tap((err) => {
                throw err;
              }))),
              finalize(() => {
                if (!completedOrAborted) {
                  const cancelationReason = typeof ngDevMode === "undefined" || ngDevMode ? `Navigation ID ${overallTransitionState.id} is not equal to the current navigation id ${this.navigationId}` : "";
                  this.cancelNavigationTransition(overallTransitionState, cancelationReason, NavigationCancellationCode.SupersededByNewNavigation);
                }
                if (this.currentTransition?.id === overallTransitionState.id) {
                  this.currentNavigation.set(null);
                  this.currentTransition = null;
                }
              }),
              catchError((e) => {
                if (this.destroyed) {
                  overallTransitionState.resolve(false);
                  return EMPTY;
                }
                completedOrAborted = true;
                if (isNavigationCancelingError(e)) {
                  this.events.next(new NavigationCancel(overallTransitionState.id, this.urlSerializer.serialize(overallTransitionState.extractedUrl), e.message, e.cancellationCode));
                  if (!isRedirectingNavigationCancelingError(e)) {
                    overallTransitionState.resolve(false);
                  } else {
                    this.events.next(new RedirectRequest(e.url, e.navigationBehaviorOptions));
                  }
                } else {
                  const navigationError = new NavigationError(overallTransitionState.id, this.urlSerializer.serialize(overallTransitionState.extractedUrl), e, overallTransitionState.targetSnapshot ?? void 0);
                  try {
                    const navigationErrorHandlerResult = runInInjectionContext(this.environmentInjector, () => this.navigationErrorHandler?.(navigationError));
                    if (navigationErrorHandlerResult instanceof RedirectCommand) {
                      const { message, cancellationCode } = redirectingNavigationError(this.urlSerializer, navigationErrorHandlerResult);
                      this.events.next(new NavigationCancel(overallTransitionState.id, this.urlSerializer.serialize(overallTransitionState.extractedUrl), message, cancellationCode));
                      this.events.next(new RedirectRequest(navigationErrorHandlerResult.redirectTo, navigationErrorHandlerResult.navigationBehaviorOptions));
                    } else {
                      this.events.next(navigationError);
                      throw e;
                    }
                  } catch (ee) {
                    if (this.options.resolveNavigationPromiseOnError) {
                      overallTransitionState.resolve(false);
                    } else {
                      overallTransitionState.reject(ee);
                    }
                  }
                }
                return EMPTY;
              })
            );
          })
        );
      }
      cancelNavigationTransition(t, reason, code) {
        const navCancel = new NavigationCancel(t.id, this.urlSerializer.serialize(t.extractedUrl), reason, code);
        this.events.next(navCancel);
        t.resolve(false);
      }
      /**
       * @returns Whether we're navigating to somewhere that is not what the Router is
       * currently set to.
       */
      isUpdatingInternalState() {
        return this.currentTransition?.extractedUrl.toString() !== this.currentTransition?.currentUrlTree.toString();
      }
      /**
       * @returns Whether we're updating the browser URL to something new (navigation is going
       * to somewhere not displayed in the URL bar and we will update the URL
       * bar if navigation succeeds).
       */
      isUpdatedBrowserUrl() {
        const currentBrowserUrl = this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(true)));
        const currentNavigation = untracked(this.currentNavigation);
        const targetBrowserUrl = currentNavigation?.targetBrowserUrl ?? currentNavigation?.extractedUrl;
        return currentBrowserUrl.toString() !== targetBrowserUrl?.toString() && !currentNavigation?.extras.skipLocationChange;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _NavigationTransitions, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _NavigationTransitions, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: NavigationTransitions, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }], ctorParameters: () => [] });
    RouteReuseStrategy = class _RouteReuseStrategy {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _RouteReuseStrategy, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _RouteReuseStrategy, providedIn: "root", useFactory: () => inject(DefaultRouteReuseStrategy) });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: RouteReuseStrategy, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root", useFactory: () => inject(DefaultRouteReuseStrategy) }]
    }] });
    BaseRouteReuseStrategy = class {
      /**
       * Whether the given route should detach for later reuse.
       * Always returns false for `BaseRouteReuseStrategy`.
       * */
      shouldDetach(route) {
        return false;
      }
      /**
       * A no-op; the route is never stored since this strategy never detaches routes for later re-use.
       */
      store(route, detachedTree) {
      }
      /** Returns `false`, meaning the route (and its subtree) is never reattached */
      shouldAttach(route) {
        return false;
      }
      /** Returns `null` because this strategy does not store routes for later re-use. */
      retrieve(route) {
        return null;
      }
      /**
       * Determines if a route should be reused.
       * This strategy returns `true` when the future route config and current route config are
       * identical.
       */
      shouldReuseRoute(future, curr) {
        return future.routeConfig === curr.routeConfig;
      }
    };
    DefaultRouteReuseStrategy = class _DefaultRouteReuseStrategy extends BaseRouteReuseStrategy {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _DefaultRouteReuseStrategy, deps: null, target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _DefaultRouteReuseStrategy, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: DefaultRouteReuseStrategy, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }] });
    StateManager = class _StateManager {
      urlSerializer = inject(UrlSerializer);
      options = inject(ROUTER_CONFIGURATION, { optional: true }) || {};
      canceledNavigationResolution = this.options.canceledNavigationResolution || "replace";
      location = inject(Location);
      urlHandlingStrategy = inject(UrlHandlingStrategy);
      urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
      currentUrlTree = new UrlTree();
      /**
       * Returns the currently activated `UrlTree`.
       *
       * This `UrlTree` shows only URLs that the `Router` is configured to handle (through
       * `UrlHandlingStrategy`).
       *
       * The value is set after finding the route config tree to activate but before activating the
       * route.
       */
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      rawUrlTree = this.currentUrlTree;
      /**
       * Returns a `UrlTree` that is represents what the browser is actually showing.
       *
       * In the life of a navigation transition:
       * 1. When a navigation begins, the raw `UrlTree` is updated to the full URL that's being
       * navigated to.
       * 2. During a navigation, redirects are applied, which might only apply to _part_ of the URL (due
       * to `UrlHandlingStrategy`).
       * 3. Just before activation, the raw `UrlTree` is updated to include the redirects on top of the
       * original raw URL.
       *
       * Note that this is _only_ here to support `UrlHandlingStrategy.extract` and
       * `UrlHandlingStrategy.shouldProcessUrl`. Without those APIs, the current `UrlTree` would not
       * deviated from the raw `UrlTree`.
       *
       * For `extract`, a raw `UrlTree` is needed because `extract` may only return part
       * of the navigation URL. Thus, the current `UrlTree` may only represent _part_ of the browser
       * URL. When a navigation gets cancelled and the router needs to reset the URL or a new navigation
       * occurs, it needs to know the _whole_ browser URL, not just the part handled by
       * `UrlHandlingStrategy`.
       * For `shouldProcessUrl`, when the return is `false`, the router ignores the navigation but
       * still updates the raw `UrlTree` with the assumption that the navigation was caused by the
       * location change listener due to a URL update by the AngularJS router. In this case, the router
       * still need to know what the browser's URL is for future navigations.
       */
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      createBrowserPath({ finalUrl, initialUrl, targetBrowserUrl }) {
        const rawUrl = finalUrl !== void 0 ? this.urlHandlingStrategy.merge(finalUrl, initialUrl) : initialUrl;
        const url = targetBrowserUrl ?? rawUrl;
        const path = url instanceof UrlTree ? this.urlSerializer.serialize(url) : url;
        return path;
      }
      commitTransition({ targetRouterState, finalUrl, initialUrl }) {
        if (finalUrl && targetRouterState) {
          this.currentUrlTree = finalUrl;
          this.rawUrlTree = this.urlHandlingStrategy.merge(finalUrl, initialUrl);
          this.routerState = targetRouterState;
        } else {
          this.rawUrlTree = initialUrl;
        }
      }
      routerState = createEmptyState(null);
      /** Returns the current RouterState. */
      getRouterState() {
        return this.routerState;
      }
      stateMemento = this.createStateMemento();
      updateStateMemento() {
        this.stateMemento = this.createStateMemento();
      }
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState
        };
      }
      resetInternalState({ finalUrl }) {
        this.routerState = this.stateMemento.routerState;
        this.currentUrlTree = this.stateMemento.currentUrlTree;
        this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, finalUrl ?? this.rawUrlTree);
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _StateManager, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _StateManager, providedIn: "root", useFactory: () => inject(HistoryStateManager) });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: StateManager, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root", useFactory: () => inject(HistoryStateManager) }]
    }] });
    HistoryStateManager = class _HistoryStateManager extends StateManager {
      /**
       * The id of the currently active page in the router.
       * Updated to the transition's target id on a successful navigation.
       *
       * This is used to track what page the router last activated. When an attempted navigation fails,
       * the router can then use this to compute how to restore the state back to the previously active
       * page.
       */
      currentPageId = 0;
      lastSuccessfulId = -1;
      restoredState() {
        return this.location.getState();
      }
      /**
       * The ɵrouterPageId of whatever page is currently active in the browser history. This is
       * important for computing the target page id for new navigations because we need to ensure each
       * page id in the browser history is 1 more than the previous entry.
       */
      get browserPageId() {
        if (this.canceledNavigationResolution !== "computed") {
          return this.currentPageId;
        }
        return this.restoredState()?.\u0275routerPageId ?? this.currentPageId;
      }
      registerNonRouterCurrentEntryChangeListener(listener) {
        return this.location.subscribe((event) => {
          if (event["type"] === "popstate") {
            setTimeout(() => {
              listener(event["url"], event.state, "popstate");
            });
          }
        });
      }
      handleRouterEvent(e, currentTransition) {
        if (e instanceof NavigationStart) {
          this.updateStateMemento();
        } else if (e instanceof NavigationSkipped) {
          this.commitTransition(currentTransition);
        } else if (e instanceof RoutesRecognized) {
          if (this.urlUpdateStrategy === "eager") {
            if (!currentTransition.extras.skipLocationChange) {
              this.setBrowserUrl(this.createBrowserPath(currentTransition), currentTransition);
            }
          }
        } else if (e instanceof BeforeActivateRoutes) {
          this.commitTransition(currentTransition);
          if (this.urlUpdateStrategy === "deferred" && !currentTransition.extras.skipLocationChange) {
            this.setBrowserUrl(this.createBrowserPath(currentTransition), currentTransition);
          }
        } else if (e instanceof NavigationCancel && e.code !== NavigationCancellationCode.SupersededByNewNavigation && e.code !== NavigationCancellationCode.Redirect) {
          this.restoreHistory(currentTransition);
        } else if (e instanceof NavigationError) {
          this.restoreHistory(currentTransition, true);
        } else if (e instanceof NavigationEnd) {
          this.lastSuccessfulId = e.id;
          this.currentPageId = this.browserPageId;
        }
      }
      setBrowserUrl(path, { extras, id }) {
        const { replaceUrl, state } = extras;
        if (this.location.isCurrentPathEqualTo(path) || !!replaceUrl) {
          const currentBrowserPageId = this.browserPageId;
          const newState = __spreadValues(__spreadValues({}, state), this.generateNgRouterState(id, currentBrowserPageId));
          this.location.replaceState(path, "", newState);
        } else {
          const newState = __spreadValues(__spreadValues({}, state), this.generateNgRouterState(id, this.browserPageId + 1));
          this.location.go(path, "", newState);
        }
      }
      /**
       * Performs the necessary rollback action to restore the browser URL to the
       * state before the transition.
       */
      restoreHistory(navigation, restoringFromCaughtError = false) {
        if (this.canceledNavigationResolution === "computed") {
          const currentBrowserPageId = this.browserPageId;
          const targetPagePosition = this.currentPageId - currentBrowserPageId;
          if (targetPagePosition !== 0) {
            this.location.historyGo(targetPagePosition);
          } else if (this.getCurrentUrlTree() === navigation.finalUrl && targetPagePosition === 0) {
            this.resetInternalState(navigation);
            this.resetUrlToCurrentUrlTree();
          } else ;
        } else if (this.canceledNavigationResolution === "replace") {
          if (restoringFromCaughtError) {
            this.resetInternalState(navigation);
          }
          this.resetUrlToCurrentUrlTree();
        }
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId));
      }
      generateNgRouterState(navigationId, routerPageId) {
        if (this.canceledNavigationResolution === "computed") {
          return { navigationId, \u0275routerPageId: routerPageId };
        }
        return { navigationId };
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HistoryStateManager, deps: null, target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _HistoryStateManager, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: HistoryStateManager, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }] });
    exactMatchOptions = {
      paths: "exact",
      fragment: "ignored",
      matrixParams: "ignored",
      queryParams: "exact"
    };
    subsetMatchOptions = {
      paths: "subset",
      fragment: "ignored",
      matrixParams: "ignored",
      queryParams: "subset"
    };
    Router = class _Router {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      disposed = false;
      nonRouterCurrentEntryChangeSubscription;
      console = inject(Console);
      stateManager = inject(StateManager);
      options = inject(ROUTER_CONFIGURATION, { optional: true }) || {};
      pendingTasks = inject(PendingTasksInternal);
      urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
      navigationTransitions = inject(NavigationTransitions);
      urlSerializer = inject(UrlSerializer);
      location = inject(Location);
      urlHandlingStrategy = inject(UrlHandlingStrategy);
      injector = inject(EnvironmentInjector);
      /**
       * The private `Subject` type for the public events exposed in the getter. This is used internally
       * to push events to. The separate field allows us to expose separate types in the public API
       * (i.e., an Observable rather than the Subject).
       */
      _events = new Subject();
      /**
       * An event stream for routing events.
       */
      get events() {
        return this._events;
      }
      /**
       * The current state of routing in this NgModule.
       */
      get routerState() {
        return this.stateManager.getRouterState();
      }
      /**
       * True if at least one navigation event has occurred,
       * false otherwise.
       */
      navigated = false;
      /**
       * A strategy for re-using routes.
       *
       * @deprecated Configure using `providers` instead:
       *   `{provide: RouteReuseStrategy, useClass: MyStrategy}`.
       */
      routeReuseStrategy = inject(RouteReuseStrategy);
      /**
       * How to handle a navigation request to the current URL.
       *
       *
       * @deprecated Configure this through `provideRouter` or `RouterModule.forRoot` instead.
       * @see {@link withRouterConfig}
       * @see {@link provideRouter}
       * @see {@link RouterModule}
       */
      onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore";
      config = inject(ROUTES, { optional: true })?.flat() ?? [];
      /**
       * Indicates whether the application has opted in to binding Router data to component inputs.
       *
       * This option is enabled by the `withComponentInputBinding` feature of `provideRouter` or
       * `bindToComponentInputs` in the `ExtraOptions` of `RouterModule.forRoot`.
       */
      componentInputBindingEnabled = !!inject(INPUT_BINDER, { optional: true });
      /**
       * Signal of the current `Navigation` object when the router is navigating, and `null` when idle.
       *
       * Note: The current navigation becomes to null after the NavigationEnd event is emitted.
       */
      currentNavigation = this.navigationTransitions.currentNavigation.asReadonly();
      constructor() {
        this.resetConfig(this.config);
        this.navigationTransitions.setupNavigations(this).subscribe({
          error: (e) => {
            this.console.warn(ngDevMode ? `Unhandled Navigation Error: ${e}` : e);
          }
        });
        this.subscribeToNavigationEvents();
      }
      eventsSubscription = new Subscription();
      subscribeToNavigationEvents() {
        const subscription = this.navigationTransitions.events.subscribe((e) => {
          try {
            const currentTransition = this.navigationTransitions.currentTransition;
            const currentNavigation = untracked(this.navigationTransitions.currentNavigation);
            if (currentTransition !== null && currentNavigation !== null) {
              this.stateManager.handleRouterEvent(e, currentNavigation);
              if (e instanceof NavigationCancel && e.code !== NavigationCancellationCode.Redirect && e.code !== NavigationCancellationCode.SupersededByNewNavigation) {
                this.navigated = true;
              } else if (e instanceof NavigationEnd) {
                this.navigated = true;
              } else if (e instanceof RedirectRequest) {
                const opts = e.navigationBehaviorOptions;
                const mergedTree = this.urlHandlingStrategy.merge(e.url, currentTransition.currentRawUrl);
                const extras = __spreadValues({
                  browserUrl: currentTransition.extras.browserUrl,
                  info: currentTransition.extras.info,
                  skipLocationChange: currentTransition.extras.skipLocationChange,
                  // The URL is already updated at this point if we have 'eager' URL
                  // updates or if the navigation was triggered by the browser (back
                  // button, URL bar, etc). We want to replace that item in history
                  // if the navigation is rejected.
                  replaceUrl: currentTransition.extras.replaceUrl || this.urlUpdateStrategy === "eager" || isBrowserTriggeredNavigation(currentTransition.source)
                }, opts);
                this.scheduleNavigation(mergedTree, IMPERATIVE_NAVIGATION, null, extras, {
                  resolve: currentTransition.resolve,
                  reject: currentTransition.reject,
                  promise: currentTransition.promise
                });
              }
            }
            if (isPublicRouterEvent(e)) {
              this._events.next(e);
            }
          } catch (e2) {
            this.navigationTransitions.transitionAbortWithErrorSubject.next(e2);
          }
        });
        this.eventsSubscription.add(subscription);
      }
      /** @internal */
      resetRootComponentType(rootComponentType) {
        this.routerState.root.component = rootComponentType;
        this.navigationTransitions.rootComponentType = rootComponentType;
      }
      /**
       * Sets up the location change listener and performs the initial navigation.
       */
      initialNavigation() {
        this.setUpLocationChangeListener();
        if (!this.navigationTransitions.hasRequestedNavigation) {
          this.navigateToSyncWithBrowser(this.location.path(true), IMPERATIVE_NAVIGATION, this.stateManager.restoredState());
        }
      }
      /**
       * Sets up the location change listener. This listener detects navigations triggered from outside
       * the Router (the browser back/forward buttons, for example) and schedules a corresponding Router
       * navigation so that the correct events, guards, etc. are triggered.
       */
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ??= this.stateManager.registerNonRouterCurrentEntryChangeListener((url, state, source) => {
          this.navigateToSyncWithBrowser(url, source, state);
        });
      }
      /**
       * Schedules a router navigation to synchronize Router state with the browser state.
       *
       * This is done as a response to a popstate event and the initial navigation. These
       * two scenarios represent times when the browser URL/state has been updated and
       * the Router needs to respond to ensure its internal state matches.
       */
      navigateToSyncWithBrowser(url, source, state) {
        const extras = { replaceUrl: true };
        const restoredState = state?.navigationId ? state : null;
        if (state) {
          const stateCopy = __spreadValues({}, state);
          delete stateCopy.navigationId;
          delete stateCopy.\u0275routerPageId;
          if (Object.keys(stateCopy).length !== 0) {
            extras.state = stateCopy;
          }
        }
        const urlTree = this.parseUrl(url);
        this.scheduleNavigation(urlTree, source, restoredState, extras).catch((e) => {
          if (this.disposed) {
            return;
          }
          this.injector.get(INTERNAL_APPLICATION_ERROR_HANDLER)(e);
        });
      }
      /** The current URL. */
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      /**
       * Returns the current `Navigation` object when the router is navigating,
       * and `null` when idle.
       *
       * @deprecated 20.2 Use the `currentNavigation` signal instead.
       */
      getCurrentNavigation() {
        return untracked(this.navigationTransitions.currentNavigation);
      }
      /**
       * The `Navigation` object of the most recent navigation to succeed and `null` if there
       *     has not been a successful navigation yet.
       */
      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation;
      }
      /**
       * Resets the route configuration used for navigation and generating links.
       *
       * @param config The route array for the new configuration.
       *
       * @usageNotes
       *
       * ```ts
       * router.resetConfig([
       *  { path: 'team/:id', component: TeamCmp, children: [
       *    { path: 'simple', component: SimpleCmp },
       *    { path: 'user/:name', component: UserCmp }
       *  ]}
       * ]);
       * ```
       */
      resetConfig(config) {
        (typeof ngDevMode === "undefined" || ngDevMode) && validateConfig(config);
        this.config = config.map(standardizeConfig);
        this.navigated = false;
      }
      /** @docs-private */
      ngOnDestroy() {
        this.dispose();
      }
      /** Disposes of the router. */
      dispose() {
        this._events.unsubscribe();
        this.navigationTransitions.complete();
        if (this.nonRouterCurrentEntryChangeSubscription) {
          this.nonRouterCurrentEntryChangeSubscription.unsubscribe();
          this.nonRouterCurrentEntryChangeSubscription = void 0;
        }
        this.disposed = true;
        this.eventsSubscription.unsubscribe();
      }
      /**
       * Appends URL segments to the current URL tree to create a new URL tree.
       *
       * @param commands An array of URL fragments with which to construct the new URL tree.
       * If the path is static, can be the literal URL string. For a dynamic path, pass an array of path
       * segments, followed by the parameters for each segment.
       * The fragments are applied to the current URL tree or the one provided  in the `relativeTo`
       * property of the options object, if supplied.
       * @param navigationExtras Options that control the navigation strategy.
       * @returns The new URL tree.
       *
       * @usageNotes
       *
       * ```
       * // create /team/33/user/11
       * router.createUrlTree(['/team', 33, 'user', 11]);
       *
       * // create /team/33;expand=true/user/11
       * router.createUrlTree(['/team', 33, {expand: true}, 'user', 11]);
       *
       * // you can collapse static segments like this (this works only with the first passed-in value):
       * router.createUrlTree(['/team/33/user', userId]);
       *
       * // If the first segment can contain slashes, and you do not want the router to split it,
       * // you can do the following:
       * router.createUrlTree([{segmentPath: '/one/two'}]);
       *
       * // create /team/33/(user/11//right:chat)
       * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: 'chat'}}]);
       *
       * // remove the right secondary node
       * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: null}}]);
       *
       * // assuming the current url is `/team/33/user/11` and the route points to `user/11`
       *
       * // navigate to /team/33/user/11/details
       * router.createUrlTree(['details'], {relativeTo: route});
       *
       * // navigate to /team/33/user/22
       * router.createUrlTree(['../22'], {relativeTo: route});
       *
       * // navigate to /team/44/user/22
       * router.createUrlTree(['../../team/44/user/22'], {relativeTo: route});
       *
       * Note that a value of `null` or `undefined` for `relativeTo` indicates that the
       * tree should be created relative to the root.
       * ```
       */
      createUrlTree(commands, navigationExtras = {}) {
        const { relativeTo, queryParams, fragment, queryParamsHandling, preserveFragment } = navigationExtras;
        const f = preserveFragment ? this.currentUrlTree.fragment : fragment;
        let q = null;
        switch (queryParamsHandling ?? this.options.defaultQueryParamsHandling) {
          case "merge":
            q = __spreadValues(__spreadValues({}, this.currentUrlTree.queryParams), queryParams);
            break;
          case "preserve":
            q = this.currentUrlTree.queryParams;
            break;
          default:
            q = queryParams || null;
        }
        if (q !== null) {
          q = this.removeEmptyProps(q);
        }
        let relativeToUrlSegmentGroup;
        try {
          const relativeToSnapshot = relativeTo ? relativeTo.snapshot : this.routerState.snapshot.root;
          relativeToUrlSegmentGroup = createSegmentGroupFromRoute(relativeToSnapshot);
        } catch (e) {
          if (typeof commands[0] !== "string" || commands[0][0] !== "/") {
            commands = [];
          }
          relativeToUrlSegmentGroup = this.currentUrlTree.root;
        }
        return createUrlTreeFromSegmentGroup(relativeToUrlSegmentGroup, commands, q, f ?? null);
      }
      /**
       * Navigates to a view using an absolute route path.
       *
       * @param url An absolute path for a defined route. The function does not apply any delta to the
       *     current URL.
       * @param extras An object containing properties that modify the navigation strategy.
       *
       * @returns A Promise that resolves to 'true' when navigation succeeds,
       * to 'false' when navigation fails, or is rejected on error.
       *
       * @usageNotes
       *
       * The following calls request navigation to an absolute path.
       *
       * ```ts
       * router.navigateByUrl("/team/33/user/11");
       *
       * // Navigate without updating the URL
       * router.navigateByUrl("/team/33/user/11", { skipLocationChange: true });
       * ```
       *
       * @see [Routing and Navigation guide](guide/routing/common-router-tasks)
       *
       */
      navigateByUrl(url, extras = {
        skipLocationChange: false
      }) {
        const urlTree = isUrlTree(url) ? url : this.parseUrl(url);
        const mergedTree = this.urlHandlingStrategy.merge(urlTree, this.rawUrlTree);
        return this.scheduleNavigation(mergedTree, IMPERATIVE_NAVIGATION, null, extras);
      }
      /**
       * Navigate based on the provided array of commands and a starting point.
       * If no starting route is provided, the navigation is absolute.
       *
       * @param commands An array of URL fragments with which to construct the target URL.
       * If the path is static, can be the literal URL string. For a dynamic path, pass an array of path
       * segments, followed by the parameters for each segment.
       * The fragments are applied to the current URL or the one provided  in the `relativeTo` property
       * of the options object, if supplied.
       * @param extras An options object that determines how the URL should be constructed or
       *     interpreted.
       *
       * @returns A Promise that resolves to `true` when navigation succeeds, or `false` when navigation
       *     fails. The Promise is rejected when an error occurs if `resolveNavigationPromiseOnError` is
       * not `true`.
       *
       * @usageNotes
       *
       * The following calls request navigation to a dynamic route path relative to the current URL.
       *
       * ```ts
       * router.navigate(['team', 33, 'user', 11], {relativeTo: route});
       *
       * // Navigate without updating the URL, overriding the default behavior
       * router.navigate(['team', 33, 'user', 11], {relativeTo: route, skipLocationChange: true});
       * ```
       *
       * @see [Routing and Navigation guide](guide/routing/common-router-tasks)
       *
       */
      navigate(commands, extras = { skipLocationChange: false }) {
        validateCommands(commands);
        return this.navigateByUrl(this.createUrlTree(commands, extras), extras);
      }
      /** Serializes a `UrlTree` into a string */
      serializeUrl(url) {
        return this.urlSerializer.serialize(url);
      }
      /** Parses a string into a `UrlTree` */
      parseUrl(url) {
        try {
          return this.urlSerializer.parse(url);
        } catch {
          return this.urlSerializer.parse("/");
        }
      }
      isActive(url, matchOptions) {
        let options;
        if (matchOptions === true) {
          options = __spreadValues({}, exactMatchOptions);
        } else if (matchOptions === false) {
          options = __spreadValues({}, subsetMatchOptions);
        } else {
          options = matchOptions;
        }
        if (isUrlTree(url)) {
          return containsTree(this.currentUrlTree, url, options);
        }
        const urlTree = this.parseUrl(url);
        return containsTree(this.currentUrlTree, urlTree, options);
      }
      removeEmptyProps(params) {
        return Object.entries(params).reduce((result, [key, value]) => {
          if (value !== null && value !== void 0) {
            result[key] = value;
          }
          return result;
        }, {});
      }
      scheduleNavigation(rawUrl, source, restoredState, extras, priorPromise) {
        if (this.disposed) {
          return Promise.resolve(false);
        }
        let resolve;
        let reject;
        let promise;
        if (priorPromise) {
          resolve = priorPromise.resolve;
          reject = priorPromise.reject;
          promise = priorPromise.promise;
        } else {
          promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
          });
        }
        const taskId = this.pendingTasks.add();
        afterNextNavigation(this, () => {
          queueMicrotask(() => this.pendingTasks.remove(taskId));
        });
        this.navigationTransitions.handleNavigationRequest({
          source,
          restoredState,
          currentUrlTree: this.currentUrlTree,
          currentRawUrl: this.currentUrlTree,
          rawUrl,
          extras,
          resolve,
          reject,
          promise,
          currentSnapshot: this.routerState.snapshot,
          currentRouterState: this.routerState
        });
        return promise.catch((e) => {
          return Promise.reject(e);
        });
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _Router, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _Router, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: Router, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }], ctorParameters: () => [] });
  }
});

// node_modules/@angular/router/fesm2022/router.mjs
var VERSION2;
var init_router = __esm({
  "node_modules/@angular/router/fesm2022/router.mjs"() {
    "use strict";
    init_router2();
    init_core();
    VERSION2 = new Version("20.2.1");
  }
});

export {
  HttpClient,
  init_http,
  DomSanitizer,
  init_platform_browser,
  ActivatedRoute,
  RouterOutlet,
  Router,
  init_router
};
/*! Bundled license information:

@angular/common/fesm2022/module.mjs:
@angular/common/fesm2022/http.mjs:
@angular/platform-browser/fesm2022/platform-browser.mjs:
@angular/router/fesm2022/router2.mjs:
@angular/router/fesm2022/router.mjs:
  (**
   * @license Angular v20.2.1
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-MZVHQKQQ.js.map
