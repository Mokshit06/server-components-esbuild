const React = require('react');

const ReactSharedInternals =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    let args;

    for (
      let len = arguments.length,
        args = new Array(len > 1 ? len - 1 : 0),
        key = 1;
      key < len;
      key++
    ) {
      args[key - 1] = arguments[key];
    }

    printWarning('error', format, args);
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    }

    var argsWithFormat = args.map(function(item) {
      return '' + item;
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

function scheduleWork(callback) {
  setImmediate(callback);
}
function flushBuffered(destination) {
  // If we don't have any more data to send right now.
  // Flush whatever is in the buffer to the wire.
  if (typeof destination.flush === 'function') {
    // http.createServer response have flush(), but it has a different meaning and
    // is deprecated in favor of flushHeaders(). Detect to avoid a warning.
    if (typeof destination.flushHeaders !== 'function') {
      // By convention the Zlib streams provide a flush function for this purpose.
      destination.flush();
    }
  }
}

function beginWriting(destination) {
  // Older Node streams like http.createServer don't have this.
  if (typeof destination.cork === 'function') {
    destination.cork();
  }
}
function writeChunk(destination, chunk) {
  var nodeBuffer = chunk; // close enough

  return destination.write(nodeBuffer);
}
function completeWriting(destination) {
  // Older Node streams like http.createServer don't have this.
  if (typeof destination.uncork === 'function') {
    destination.uncork();
  }
}
function close(destination) {
  destination.end();
}
function stringToChunk(content) {
  return content;
}
function closeWithError(destination, error) {
  // $FlowFixMe: This is an Error object or the destination accepts other types.
  destination.destroy(error);
}

// This file is an intermediate layer to translate between Flight
var stringify = JSON.stringify;

function serializeRowHeader(tag, id) {
  return tag + id.toString(16) + ':';
}

function processErrorChunk(request, id, message, stack) {
  var errorInfo = {
    message: message,
    stack: stack,
  };
  var row = serializeRowHeader('E', id) + stringify(errorInfo) + '\n';
  return stringToChunk(row);
}
function processModelChunk(request, id, model) {
  var json = stringify(model, request.toJSON);
  var row = serializeRowHeader('J', id) + json + '\n';
  return stringToChunk(row);
}
function processModuleChunk(request, id, moduleMetaData) {
  var json = stringify(moduleMetaData);
  var row = serializeRowHeader('M', id) + json + '\n';
  return stringToChunk(row);
}
function processSymbolChunk(request, id, name) {
  var json = stringify(name);
  var row = serializeRowHeader('S', id) + json + '\n';
  return stringToChunk(row);
}

// eslint-disable-next-line no-unused-vars
var MODULE_TAG = Symbol.for('react.module.reference');
function getModuleKey(reference) {
  return reference.filepath + '#' + reference.name;
}
function isModuleReference(reference) {
  return reference.$$typeof === MODULE_TAG;
}
function resolveModuleMetaData(config, moduleReference) {
  return config[moduleReference.filepath][moduleReference.name];
}

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE = 0xeac7;
var REACT_PORTAL_TYPE = 0xeaca;
var REACT_FRAGMENT_TYPE = 0xeacb;
var REACT_STRICT_MODE_TYPE = 0xeacc;
var REACT_PROFILER_TYPE = 0xead2;
var REACT_PROVIDER_TYPE = 0xeacd;
var REACT_CONTEXT_TYPE = 0xeace;
var REACT_FORWARD_REF_TYPE = 0xead0;
var REACT_SUSPENSE_TYPE = 0xead1;
var REACT_SUSPENSE_LIST_TYPE = 0xead8;
var REACT_MEMO_TYPE = 0xead3;
var REACT_LAZY_TYPE = 0xead4;
var REACT_SCOPE_TYPE = 0xead7;
var REACT_OPAQUE_ID_TYPE = 0xeae0;
var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
var REACT_OFFSCREEN_TYPE = 0xeae2;
var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;
var REACT_CACHE_TYPE = 0xeae4;

if (typeof Symbol === 'function' && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor('react.element');
  REACT_PORTAL_TYPE = symbolFor('react.portal');
  REACT_FRAGMENT_TYPE = symbolFor('react.fragment');
  REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
  REACT_PROFILER_TYPE = symbolFor('react.profiler');
  REACT_PROVIDER_TYPE = symbolFor('react.provider');
  REACT_CONTEXT_TYPE = symbolFor('react.context');
  REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
  REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
  REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
  REACT_MEMO_TYPE = symbolFor('react.memo');
  REACT_LAZY_TYPE = symbolFor('react.lazy');
  REACT_SCOPE_TYPE = symbolFor('react.scope');
  REACT_OPAQUE_ID_TYPE = symbolFor('react.opaque.id');
  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
  REACT_OFFSCREEN_TYPE = symbolFor('react.offscreen');
  REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
  REACT_CACHE_TYPE = symbolFor('react.cache');
}

var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;

function defaultErrorHandler(error) {
  console['error'](error); // Don't transform to our wrapper
}

function createRequest(model, destination, bundlerConfig) {
  var onError =
    arguments.length > 3 && arguments[3] !== undefined
      ? arguments[3]
      : defaultErrorHandler;
  var pingedSegments = [];
  var request = {
    destination: destination,
    bundlerConfig: bundlerConfig,
    cache: new Map(),
    nextChunkId: 0,
    pendingChunks: 0,
    pingedSegments: pingedSegments,
    completedModuleChunks: [],
    completedJSONChunks: [],
    completedErrorChunks: [],
    writtenSymbols: new Map(),
    writtenModules: new Map(),
    onError: onError,
    flowing: false,
    toJSON: function(key, value) {
      return resolveModelToJSON(request, this, key, value);
    },
  };
  request.pendingChunks++;
  var rootSegment = createSegment(request, model);
  pingedSegments.push(rootSegment);
  return request;
}

function attemptResolveElement(type, key, ref, props) {
  if (ref !== null && ref !== undefined) {
    // When the ref moves to the regular props object this will implicitly
    // throw for functions. We could probably relax it to a DEV warning for other
    // cases.
    {
      {
        throw Error(
          'Refs cannot be used in server components, nor passed to client components.'
        );
      }
    }
  }

  if (typeof type === 'function') {
    // This is a server-side component.
    return type(props);
  } else if (typeof type === 'string') {
    // This is a host element. E.g. HTML.
    return [REACT_ELEMENT_TYPE, type, key, props];
  } else if (typeof type === 'symbol') {
    if (type === REACT_FRAGMENT_TYPE) {
      // For key-less fragments, we add a small optimization to avoid serializing
      // it as a wrapper.
      // TODO: If a key is specified, we should propagate its key to any children.
      // Same as if a server component has a key.
      return props.children;
    } // This might be a built-in React component. We'll let the client decide.
    // Any built-in works as long as its props are serializable.

    return [REACT_ELEMENT_TYPE, type, key, props];
  } else if (type != null && typeof type === 'object') {
    if (isModuleReference(type)) {
      // This is a reference to a client component.
      return [REACT_ELEMENT_TYPE, type, key, props];
    }

    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE: {
        var render = type.render;
        return render(props, undefined);
      }

      case REACT_MEMO_TYPE: {
        return attemptResolveElement(type.type, key, ref, props);
      }
    }
  }

  {
    {
      throw Error(
        'Unsupported server component type: ' +
          describeValueForErrorMessage(type)
      );
    }
  }
}

function pingSegment(request, segment) {
  var pingedSegments = request.pingedSegments;
  pingedSegments.push(segment);

  if (pingedSegments.length === 1) {
    scheduleWork(function() {
      return performWork(request);
    });
  }
}

function createSegment(request, model) {
  var id = request.nextChunkId++;
  var segment = {
    id: id,
    model: model,
    ping: function() {
      return pingSegment(request, segment);
    },
  };
  return segment;
}

function serializeByValueID(id) {
  return '$' + id.toString(16);
}

function serializeByRefID(id) {
  return '@' + id.toString(16);
}

function escapeStringValue(value) {
  if (value[0] === '$' || value[0] === '@') {
    // We need to escape $ or @ prefixed strings since we use those to encode
    // references to IDs and as special symbol values.
    return '$' + value;
  } else {
    return value;
  }
}

function isObjectPrototype(object) {
  if (!object) {
    return false;
  } // $FlowFixMe

  var ObjectPrototype = Object.prototype;

  if (object === ObjectPrototype) {
    return true;
  } // It might be an object from a different Realm which is
  // still just a plain simple object.

  if (Object.getPrototypeOf(object)) {
    return false;
  }

  var names = Object.getOwnPropertyNames(object);

  for (var i = 0; i < names.length; i++) {
    if (!(names[i] in ObjectPrototype)) {
      return false;
    }
  }

  return true;
}

function isSimpleObject(object) {
  if (!isObjectPrototype(Object.getPrototypeOf(object))) {
    return false;
  }

  var names = Object.getOwnPropertyNames(object);

  for (var i = 0; i < names.length; i++) {
    var descriptor = Object.getOwnPropertyDescriptor(object, names[i]);

    if (!descriptor) {
      return false;
    }

    if (!descriptor.enumerable) {
      if (
        (names[i] === 'key' || names[i] === 'ref') &&
        typeof descriptor.get === 'function'
      ) {
        // React adds key and ref getters to props objects to issue warnings.
        // Those getters will not be transferred to the client, but that's ok,
        // so we'll special case them.
        continue;
      }

      return false;
    }
  }

  return true;
}

function objectName(object) {
  var name = Object.prototype.toString.call(object);
  return name.replace(/^\[object (.*)\]$/, function(m, p0) {
    return p0;
  });
}

function describeKeyForErrorMessage(key) {
  var encodedKey = JSON.stringify(key);
  return '"' + key + '"' === encodedKey ? key : encodedKey;
}

function describeValueForErrorMessage(value) {
  switch (typeof value) {
    case 'string': {
      return JSON.stringify(
        value.length <= 10 ? value : value.substr(0, 10) + '...'
      );
    }

    case 'object': {
      if (isArray(value)) {
        return '[...]';
      }

      var name = objectName(value);

      if (name === 'Object') {
        return '{...}';
      }

      return name;
    }

    case 'function':
      return 'function';

    default:
      // eslint-disable-next-line
      return String(value);
  }
}

function describeObjectForErrorMessage(objectOrArray, expandedName) {
  if (isArray(objectOrArray)) {
    var str = '['; // $FlowFixMe: Should be refined by now.

    var array = objectOrArray;

    for (var i = 0; i < array.length; i++) {
      if (i > 0) {
        str += ', ';
      }

      if (i > 6) {
        str += '...';
        break;
      }

      var _value = array[i];

      if (
        '' + i === expandedName &&
        typeof _value === 'object' &&
        _value !== null
      ) {
        str += describeObjectForErrorMessage(_value);
      } else {
        str += describeValueForErrorMessage(_value);
      }
    }

    str += ']';
    return str;
  } else {
    var _str = '{'; // $FlowFixMe: Should be refined by now.

    var object = objectOrArray;
    var names = Object.keys(object);

    for (var _i = 0; _i < names.length; _i++) {
      if (_i > 0) {
        _str += ', ';
      }

      if (_i > 6) {
        _str += '...';
        break;
      }

      var name = names[_i];
      _str += describeKeyForErrorMessage(name) + ': ';
      var _value2 = object[name];

      if (
        name === expandedName &&
        typeof _value2 === 'object' &&
        _value2 !== null
      ) {
        _str += describeObjectForErrorMessage(_value2);
      } else {
        _str += describeValueForErrorMessage(_value2);
      }
    }

    _str += '}';
    return _str;
  }
}

function resolveModelToJSON(request, parent, key, value) {
  {
    // $FlowFixMe
    var originalValue = parent[key];

    if (typeof originalValue === 'object' && originalValue !== value) {
      error(
        'Only plain objects can be passed to client components from server components. ' +
          'Objects with toJSON methods are not supported. Convert it manually ' +
          'to a simple value before passing it to props. ' +
          'Remove %s from these props: %s',
        describeKeyForErrorMessage(key),
        describeObjectForErrorMessage(parent)
      );
    }
  } // Special Symbols

  switch (value) {
    case REACT_ELEMENT_TYPE:
      return '$';

    case REACT_LAZY_TYPE: {
      {
        throw Error(
          'React Lazy Components are not yet supported on the server.'
        );
      }
    }
  } // Resolve server components.

  while (
    typeof value === 'object' &&
    value !== null &&
    value.$$typeof === REACT_ELEMENT_TYPE
  ) {
    // TODO: Concatenate keys of parents onto children.
    var element = value;

    try {
      // Attempt to render the server component.
      value = attemptResolveElement(
        element.type,
        element.key,
        element.ref,
        element.props
      );
    } catch (x) {
      if (typeof x === 'object' && x !== null && typeof x.then === 'function') {
        // Something suspended, we'll need to create a new segment and resolve it later.
        request.pendingChunks++;
        var newSegment = createSegment(request, value);
        var ping = newSegment.ping;
        x.then(ping, ping);
        return serializeByRefID(newSegment.id);
      } else {
        reportError(request, x); // Something errored. We'll still send everything we have up until this point.
        // We'll replace this element with a lazy reference that throws on the client
        // once it gets rendered.

        request.pendingChunks++;
        var errorId = request.nextChunkId++;
        emitErrorChunk(request, errorId, x);
        return serializeByRefID(errorId);
      }
    }
  }

  if (value === null) {
    return null;
  }

  if (typeof value === 'object') {
    if (isModuleReference(value)) {
      var moduleReference = value;
      var moduleKey = getModuleKey(moduleReference);
      var writtenModules = request.writtenModules;
      var existingId = writtenModules.get(moduleKey);

      if (existingId !== undefined) {
        if (parent[0] === REACT_ELEMENT_TYPE && key === '1') {
          // If we're encoding the "type" of an element, we can refer
          // to that by a lazy reference instead of directly since React
          // knows how to deal with lazy values. This lets us suspend
          // on this component rather than its parent until the code has
          // loaded.
          return serializeByRefID(existingId);
        }

        return serializeByValueID(existingId);
      }

      try {
        var moduleMetaData = resolveModuleMetaData(
          request.bundlerConfig,
          moduleReference
        );
        request.pendingChunks++;
        var moduleId = request.nextChunkId++;
        emitModuleChunk(request, moduleId, moduleMetaData);
        writtenModules.set(moduleKey, moduleId);

        if (parent[0] === REACT_ELEMENT_TYPE && key === '1') {
          // If we're encoding the "type" of an element, we can refer
          // to that by a lazy reference instead of directly since React
          // knows how to deal with lazy values. This lets us suspend
          // on this component rather than its parent until the code has
          // loaded.
          return serializeByRefID(moduleId);
        }

        return serializeByValueID(moduleId);
      } catch (x) {
        request.pendingChunks++;

        var _errorId = request.nextChunkId++;

        emitErrorChunk(request, _errorId, x);
        return serializeByValueID(_errorId);
      }
    }

    {
      if (value !== null && !isArray(value)) {
        // Verify that this is a simple plain object.
        if (objectName(value) !== 'Object') {
          error(
            'Only plain objects can be passed to client components from server components. ' +
              'Built-ins like %s are not supported. ' +
              'Remove %s from these props: %s',
            objectName(value),
            describeKeyForErrorMessage(key),
            describeObjectForErrorMessage(parent)
          );
        } else if (!isSimpleObject(value)) {
          error(
            'Only plain objects can be passed to client components from server components. ' +
              'Classes or other objects with methods are not supported. ' +
              'Remove %s from these props: %s',
            describeKeyForErrorMessage(key),
            describeObjectForErrorMessage(parent, key)
          );
        } else if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(value);

          if (symbols.length > 0) {
            error(
              'Only plain objects can be passed to client components from server components. ' +
                'Objects with symbol properties like %s are not supported. ' +
                'Remove %s from these props: %s',
              symbols[0].description,
              describeKeyForErrorMessage(key),
              describeObjectForErrorMessage(parent, key)
            );
          }
        }
      }
    }

    return value;
  }

  if (typeof value === 'string') {
    return escapeStringValue(value);
  }

  if (
    typeof value === 'boolean' ||
    typeof value === 'number' ||
    typeof value === 'undefined'
  ) {
    return value;
  }

  if (typeof value === 'function') {
    if (/^on[A-Z]/.test(key)) {
      {
        {
          throw Error(
            'Event handlers cannot be passed to client component props. Remove ' +
              describeKeyForErrorMessage(key) +
              ' from these props if possible: ' +
              describeObjectForErrorMessage(parent) +
              '\nIf you need interactivity, consider converting part of this to a client component.'
          );
        }
      }
    } else {
      {
        {
          throw Error(
            "Functions cannot be passed directly to client components because they're not serializable. Remove " +
              describeKeyForErrorMessage(key) +
              ' (' +
              (value.displayName || value.name || 'function') +
              ') from this object, or avoid the entire object: ' +
              describeObjectForErrorMessage(parent)
          );
        }
      }
    }
  }

  if (typeof value === 'symbol') {
    var writtenSymbols = request.writtenSymbols;

    var _existingId = writtenSymbols.get(value);

    if (_existingId !== undefined) {
      return serializeByValueID(_existingId);
    }

    var name = value.description;

    if (!(Symbol.for(name) === value)) {
      {
        throw Error(
          'Only global symbols received from Symbol.for(...) can be passed to client components. The symbol Symbol.for(' +
            value.description +
            ') cannot be found among global symbols. Remove ' +
            describeKeyForErrorMessage(key) +
            ' from this object, or avoid the entire object: ' +
            describeObjectForErrorMessage(parent)
        );
      }
    }

    request.pendingChunks++;
    var symbolId = request.nextChunkId++;
    emitSymbolChunk(request, symbolId, name);
    writtenSymbols.set(value, symbolId);
    return serializeByValueID(symbolId);
  } // $FlowFixMe: bigint isn't added to Flow yet.

  if (typeof value === 'bigint') {
    {
      {
        throw Error(
          'BigInt (' +
            value +
            ') is not yet supported in client component props. Remove ' +
            describeKeyForErrorMessage(key) +
            ' from this object or use a plain number instead: ' +
            describeObjectForErrorMessage(parent)
        );
      }
    }
  }

  {
    {
      throw Error(
        'Type ' +
          typeof value +
          ' is not supported in client component props. Remove ' +
          describeKeyForErrorMessage(key) +
          ' from this object, or avoid the entire object: ' +
          describeObjectForErrorMessage(parent)
      );
    }
  }
}

function reportError(request, error) {
  var onError = request.onError;
  onError(error);
}

function fatalError(request, error) {
  // This is called outside error handling code such as if an error happens in React internals.
  closeWithError(request.destination, error);
}

function emitErrorChunk(request, id, error) {
  // TODO: We should not leak error messages to the client in prod.
  // Give this an error code instead and log on the server.
  // We can serialize the error in DEV as a convenience.
  var message;
  var stack = '';

  try {
    if (error instanceof Error) {
      message = '' + error.message;
      stack = '' + error.stack;
    } else {
      message = 'Error: ' + error;
    }
  } catch (x) {
    message = 'An error occurred but serializing the error message failed.';
  }

  var processedChunk = processErrorChunk(request, id, message, stack);
  request.completedErrorChunks.push(processedChunk);
}

function emitModuleChunk(request, id, moduleMetaData) {
  var processedChunk = processModuleChunk(request, id, moduleMetaData);
  request.completedModuleChunks.push(processedChunk);
}

function emitSymbolChunk(request, id, name) {
  var processedChunk = processSymbolChunk(request, id, name);
  request.completedModuleChunks.push(processedChunk);
}

function retrySegment(request, segment) {
  try {
    var _value3 = segment.model;

    while (
      typeof _value3 === 'object' &&
      _value3 !== null &&
      _value3.$$typeof === REACT_ELEMENT_TYPE
    ) {
      // TODO: Concatenate keys of parents onto children.
      var element = _value3; // Attempt to render the server component.
      // Doing this here lets us reuse this same segment if the next component
      // also suspends.

      segment.model = _value3;
      _value3 = attemptResolveElement(
        element.type,
        element.key,
        element.ref,
        element.props
      );
    }

    var processedChunk = processModelChunk(request, segment.id, _value3);
    request.completedJSONChunks.push(processedChunk);
  } catch (x) {
    if (typeof x === 'object' && x !== null && typeof x.then === 'function') {
      // Something suspended again, let's pick it back up later.
      var ping = segment.ping;
      x.then(ping, ping);
      return;
    } else {
      reportError(request, x); // This errored, we need to serialize this error to the

      emitErrorChunk(request, segment.id, x);
    }
  }
}

function performWork(request) {
  var prevDispatcher = ReactCurrentDispatcher.current;
  var prevCache = currentCache;
  ReactCurrentDispatcher.current = Dispatcher;
  currentCache = request.cache;

  try {
    var pingedSegments = request.pingedSegments;
    request.pingedSegments = [];

    for (var i = 0; i < pingedSegments.length; i++) {
      var segment = pingedSegments[i];
      retrySegment(request, segment);
    }

    if (request.flowing) {
      flushCompletedChunks(request);
    }
  } catch (error) {
    reportError(request, error);
    fatalError(request, error);
  } finally {
    ReactCurrentDispatcher.current = prevDispatcher;
    currentCache = prevCache;
  }
}

var reentrant = false;

function flushCompletedChunks(request) {
  if (reentrant) {
    return;
  }

  reentrant = true;
  var destination = request.destination;
  beginWriting(destination);

  try {
    // We emit module chunks first in the stream so that
    // they can be preloaded as early as possible.
    var moduleChunks = request.completedModuleChunks;
    var i = 0;

    for (; i < moduleChunks.length; i++) {
      request.pendingChunks--;
      var chunk = moduleChunks[i];

      if (!writeChunk(destination, chunk)) {
        request.flowing = false;
        i++;
        break;
      }
    }

    moduleChunks.splice(0, i); // Next comes model data.

    var jsonChunks = request.completedJSONChunks;
    i = 0;

    for (; i < jsonChunks.length; i++) {
      request.pendingChunks--;
      var _chunk = jsonChunks[i];

      if (!writeChunk(destination, _chunk)) {
        request.flowing = false;
        i++;
        break;
      }
    }

    jsonChunks.splice(0, i); // Finally, errors are sent. The idea is that it's ok to delay
    // any error messages and prioritize display of other parts of
    // the page.

    var errorChunks = request.completedErrorChunks;
    i = 0;

    for (; i < errorChunks.length; i++) {
      request.pendingChunks--;
      var _chunk2 = errorChunks[i];

      if (!writeChunk(destination, _chunk2)) {
        request.flowing = false;
        i++;
        break;
      }
    }

    errorChunks.splice(0, i);
  } finally {
    reentrant = false;
    completeWriting(destination);
  }

  flushBuffered(destination);

  if (request.pendingChunks === 0) {
    // We're done.
    close(destination);
  }
}

function startWork(request) {
  request.flowing = true;
  scheduleWork(function() {
    return performWork(request);
  });
}
function startFlowing(request) {
  request.flowing = true;

  try {
    flushCompletedChunks(request);
  } catch (error) {
    reportError(request, error);
    fatalError(request, error);
  }
}

function unsupportedHook() {
  {
    {
      throw Error('This Hook is not supported in Server Components.');
    }
  }
}

function unsupportedRefresh() {
  if (!currentCache) {
    {
      throw Error(
        'Refreshing the cache is not supported in Server Components.'
      );
    }
  }
}

var currentCache = null;
var Dispatcher = {
  useMemo: function(nextCreate) {
    return nextCreate();
  },
  useCallback: function(callback) {
    return callback;
  },
  useDebugValue: function() {},
  useDeferredValue: unsupportedHook,
  useTransition: unsupportedHook,
  getCacheForType: function(resourceType) {
    if (!currentCache) {
      {
        throw Error('Reading the cache is only supported while rendering.');
      }
    }

    var entry = currentCache.get(resourceType);

    if (entry === undefined) {
      entry = resourceType(); // TODO: Warn if undefined?

      currentCache.set(resourceType, entry);
    }

    return entry;
  },
  readContext: unsupportedHook,
  useContext: unsupportedHook,
  useReducer: unsupportedHook,
  useRef: unsupportedHook,
  useState: unsupportedHook,
  useLayoutEffect: unsupportedHook,
  useImperativeHandle: unsupportedHook,
  useEffect: unsupportedHook,
  useOpaqueIdentifier: unsupportedHook,
  useMutableSource: unsupportedHook,
  useCacheRefresh: function() {
    return unsupportedRefresh;
  },
};

function createDrainHandler(destination, request) {
  return function() {
    return startFlowing(request);
  };
}

function pipeToNodeWritable(model, destination, esbuildMap, options) {
  var request = createRequest(
    model,
    destination,
    esbuildMap,
    options ? options.onError : undefined
  );
  destination.on('drain', createDrainHandler(destination, request));
  startWork(request);
}

exports.pipeToNodeWritable = pipeToNodeWritable;
