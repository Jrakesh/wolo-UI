/*!
 * jQuery JavaScript Library v1.12.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-02-22T19:07Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	if ( !document.implementation.createHTMLDocument ) {
		return false;
	}
	var doc = document.implementation.createHTMLDocument( "" );
	doc.body.innerHTML = "<form></form><form></form>";
	return doc.body.childNodes.length === 2;
} )();


// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// document.implementation stops scripts or inline event handlers from
	// being executed immediately
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
<!DOCTYPE html><html><head><title>Facebook Cross-Domain Messaging helper</title></head><body><script>document.domain = 'facebook.com';__transform_includes = {};if(!Array.from)Array.from=function(a){if(a==null)throw new TypeError('Object is null or undefined');var b=arguments[1],c=arguments[2],d=this,e=Object(a),f=typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator',g=typeof b==='function',h=typeof e[f]==='function',i=0,j,k;if(h){j=typeof d==='function'?new d():[];var l=e[f](),m;while(!(m=l.next()).done){k=m.value;if(g)k=b.call(c,k,i);j[i]=k;i+=1;}j.length=i;return j;}var n=e.length;if(isNaN(n)||n<0)n=0;j=typeof d==='function'?new d(n):new Array(n);while(i<n){k=e[i];if(g)k=b.call(c,k,i);j[i]=k;i+=1;}j.length=i;return j;};
if(!Array.isArray)Array.isArray=function(a){return Object.prototype.toString.call(a)=='[object Array]';};
self.__DEV__=self.__DEV__||0;
(function(a){function b(c,d){if(this==null)throw new TypeError('Array.prototype.findIndex called on null or undefined');if(typeof c!=='function')throw new TypeError('predicate must be a function');var e=Object(this),f=e.length>>>0;for(var g=0;g<f;g++)if(c.call(d,e[g],g,e))return g;return -1;}if(!Array.prototype.findIndex)Array.prototype.findIndex=b;if(!Array.prototype.find)Array.prototype.find=function(c,d){if(this==null)throw new TypeError('Array.prototype.find called on null or undefined');var e=b.call(this,c,d);return e===-1?a:this[e];};if(!Array.prototype.fill)Array.prototype.fill=function(c){if(this==null)throw new TypeError('Array.prototype.fill called on null or undefined');var d=Object(this),e=d.length>>>0,f=arguments[1],g=f>>0,h=g<0?Math.max(e+g,0):Math.min(g,e),i=arguments[2],j=i===a?e:i>>0,k=j<0?Math.max(e+j,0):Math.min(j,e);while(h<k){d[h]=c;h++;}return d;};})();
(function(){var a=Object.prototype.toString,b=Object("a"),c=b[0]!="a";function d(e){e=+e;if(e!==e){e=0;}else if(e!==0&&e!==1/0&&e!==-(1/0))e=(e>0||-1)*Math.floor(Math.abs(e));return e;}if(!Array.prototype.map)Array.prototype.map=function(e,f){if(typeof e!='function')throw new TypeError();var g,h=this.length,i=new Array(h);for(g=0;g<h;++g)if(g in this)i[g]=e.call(f,this[g],g,this);return i;};if(!Array.prototype.forEach)Array.prototype.forEach=function(e,f){this.map(e,f);};if(!Array.prototype.filter)Array.prototype.filter=function(e,f){if(typeof e!='function')throw new TypeError();var g,h,i=this.length,j=[];for(g=0;g<i;++g)if(g in this){h=this[g];if(e.call(f,h,g,this))j.push(h);}return j;};if(!Array.prototype.every)Array.prototype.every=function(e,f){if(typeof e!='function')throw new TypeError();var g=new Object(this),h=g.length;for(var i=0;i<h;i++)if(i in g)if(!e.call(f,g[i],i,g))return false;return true;};if(!Array.prototype.some)Array.prototype.some=function(e,f){if(typeof e!='function')throw new TypeError();var g=new Object(this),h=g.length;for(var i=0;i<h;i++)if(i in g)if(e.call(f,g[i],i,g))return true;return false;};if(!Array.prototype.indexOf)Array.prototype.indexOf=function(e,f){var g=this.length;f|=0;if(f<0)f+=g;for(;f<g;f++)if(f in this&&this[f]===e)return f;return -1;};if(!Array.prototype.lastIndexOf||[0,1].lastIndexOf(0,-3)!=-1)Array.prototype.lastIndexOf=function(e){var f=c&&a.call(this)=="[object String]"?this.split(""):Object(this),g=f.length>>>0;if(!g)return -1;var h=g-1;if(arguments.length>1)h=Math.min(h,d(arguments[1]));h=h>=0?h:g-Math.abs(h);for(;h>=0;h--)if(h in f&&e===f[h])return h;return -1;};if(!Array.prototype.reduce)Array.prototype.reduce=function(e){if(typeof e!=='function')throw new TypeError(e+' is not a function');var f=this.length>>>0,g,h,i=arguments.length===2;if(i)g=arguments[1];for(h=0;h<f;++h)if(this.hasOwnProperty(h))if(i===false){g=this[h];i=true;}else g=e(g,this[h],h,this);if(i===false)throw new TypeError('Reduce of empty array with no initial value');return g;};if(!Array.prototype.reduceRight)Array.prototype.reduceRight=function(e){if(typeof e!=='function')throw new TypeError(e+' is not a function');var f=this.length>>>0,g,h,i=arguments.length===2;if(i)g=arguments[1];for(h=f-1;h>-1;--h)if(this.hasOwnProperty(h))if(i===false){g=this[h];i=true;}else g=e(g,this[h],h,this);if(i===false)throw new TypeError('Reduce of empty array with no initial value');return g;};})();
if(typeof Number.isFinite!=='function')Number.isFinite=function(a){return typeof a==='number'&&isFinite(a);};if(typeof Number.isNaN!=='function')Number.isNaN=function(a){return typeof a==='number'&&isNaN(a);};if(typeof Number.EPSILON!=='number')Number.EPSILON=Math.pow(2,-52);if(typeof Number.MAX_SAFE_INTEGER!=='number')Number.MAX_SAFE_INTEGER=Math.pow(2,53)-1;if(typeof Number.MIN_SAFE_INTEGER!=='number')Number.MIN_SAFE_INTEGER=-1*Number.MAX_SAFE_INTEGER;if(typeof Number.isInteger!=='function')Number.isInteger=function(a){return Number.isFinite(a)&&Math.floor(a)===a;};if(typeof Number.isSafeInteger!=='function')Number.isSafeInteger=function(a){return Number.isFinite(a)&&a>=Number.MIN_SAFE_INTEGER&&a<=Number.MAX_SAFE_INTEGER&&Math.floor(a)===a;};
(function(){'use strict';var a=Array.prototype.indexOf;if(!Array.prototype.includes)Array.prototype.includes=function(e){'use strict';if(e!==undefined&&Array.isArray(this)&&!Number.isNaN(e))return a.apply(this,arguments)!==-1;var f=Object(this),g=f.length?b(f.length):0;if(g===0)return false;var h=arguments.length>1?c(arguments[1]):0,i=h<0?Math.max(g+h,0):h,j=Number.isNaN(e);while(i<g){var k=f[i];if(k===e||j&&Number.isNaN(k))return true;i++;}return false;};function b(e){return Math.min(Math.max(c(e),0),Number.MAX_SAFE_INTEGER);}function c(e){var f=Number(e);return Number.isFinite(f)&&f!==0?d(f)*Math.floor(Math.abs(f)):f;}function d(e){return e>=0?1:-1;}})();
if(!Date.now)Date.now=function(){return new Date().getTime();};
(function(){if(!Date.prototype.toISOString){var a=function(b){if(b<10)return '0'+b;return b;};Date.prototype.toISOString=function(){if(!isFinite(this))throw new Error('Invalid time value');var b=this.getUTCFullYear();b=(b<0?'-':b>9999?'+':'')+('00000'+Math.abs(b)).slice(0<=b&&b<=9999?-4:-6);return b+'-'+a(this.getUTCMonth()+1)+'-'+a(this.getUTCDate())+'T'+a(this.getUTCHours())+':'+a(this.getUTCMinutes())+':'+a(this.getUTCSeconds())+'.'+(this.getUTCMilliseconds()/1000).toFixed(3).slice(2,5)+'Z';};}})();
if(!Function.prototype.bind)Function.prototype.bind=function(a){if(typeof this!='function')throw new TypeError('Bind must be called on a function');var b=this,c=Array.prototype.slice,d=c.call(arguments,1);function e(){var f=b.prototype&&this instanceof b;return b.apply(!f&&a||this,d.concat(c.call(arguments)));}e.prototype=b.prototype;e.displayName='bound:'+(b.displayName||b.name||'(?)');e.toString=function f(){return 'bound: '+b;};return e;};

(function(){var a={},b=function(i,j){if(!i&&!j)return null;var k={};if(typeof i!=='undefined')k.type=i;if(typeof j!=='undefined')k.signature=j;return k;},c=function(i,j){return b(i&&/^[A-Z]/.test(i)?i:undefined,j&&(j.params&&j.params.length||j.returns)?'function('+(j.params?j.params.map(function(k){return (/\?/.test(k)?'?'+k.replace('?',''):k);}).join(','):'')+')'+(j.returns?':'+j.returns:''):undefined);},d=function(i,j,k){return i;},e=function(i,j,k){if('sourcemeta' in __transform_includes)i.__SMmeta=j;if('typechecks' in __transform_includes){var l=c(j?j.name:undefined,k);if(l)__w(i,l);}return i;},f=function(i,j,k){return k.apply(i,j);},g=function(i,j,k,l){if(l&&l.params)__t.apply(i,l.params);var m=k.apply(i,j);if(l&&l.returns)__t([m,l.returns]);return m;},h=function(i,j,k,l,m){if(m){if(!m.callId)m.callId=m.module+':'+(m.line||0)+':'+(m.column||0);var n=m.callId;a[n]=(a[n]||0)+1;}return k.apply(i,j);};if(typeof __transform_includes==='undefined'){__annotator=d;__bodyWrapper=f;}else{__annotator=e;if('codeusage' in __transform_includes){__annotator=d;__bodyWrapper=h;__bodyWrapper.getCodeUsage=function(){return a;};__bodyWrapper.clearCodeUsage=function(){a={};};}else if('typechecks' in __transform_includes){__bodyWrapper=g;}else __bodyWrapper=f;}})();
if(JSON.stringify(["\u2028\u2029"])==='["\u2028\u2029"]')JSON.stringify=function(a){var b=/\u2028/g,c=/\u2029/g;return function d(e,f,g){var h=a.call(this,e,f,g);if(h){if(-1<h.indexOf('\u2028'))h=h.replace(b,'\\u2028');if(-1<h.indexOf('\u2029'))h=h.replace(c,'\\u2029');}return h;};}(JSON.stringify);
if(typeof JSON==='object'&&typeof JSON.parse==='function')try{JSON.parse(null);}catch(e){JSON.originalParse=JSON.parse;JSON.parse=function(a){return a===null?null:JSON.originalParse(a);};}
if(typeof Math.log2!=='function')Math.log2=function(a){return Math.log(a)/Math.LN2;};if(typeof Math.log10!=='function')Math.log10=function(a){return Math.log(a)/Math.LN10;};if(typeof Math.trunc!=='function')Math.trunc=function(a){return a<0?Math.ceil(a):Math.floor(a);};
(function(){var a=!{toString:true}.propertyIsEnumerable('toString');if(!a)return;var b=['toString','toLocaleString','valueOf','hasOwnProperty','isPrototypeOf','constructor'];Object.keys=function(c){var d=typeof c;if(d!='object'&&d!='function'||c===null)throw new TypeError('Object.keys called on non-object');var e=Object.prototype.hasOwnProperty,f=[];for(var g in c)if(e.call(c,g))f.push(g);for(var h=0;h<b.length;h++){var i=b[h];if(e.call(c,i))f.push(i);}return f;};Object.assign=function(c,d){if(c==null)throw new TypeError('Object.assign target cannot be null or undefined');var e=Object(c),f=Object.prototype.hasOwnProperty;for(var g=1;g<arguments.length;g++){var h=arguments[g];if(h==null)continue;var i=Object(h);for(var j in i)if(f.call(i,j))e[j]=i[j];for(var k=0;k<b.length;k++){var l=b[k];if(f.call(i,l))e[l]=i[l];}}return e;};})();
if(!Object.create)Object.create=function(a){var b=typeof a;if(b!='object'&&b!='function')throw new TypeError('Object prototype may only be a Object or null');var c=function(){if(a===null){this.__proto__=a;delete this.__proto__;}};c.prototype=a;return new c();};if(!Object.keys)Object.keys=function a(b){var c=typeof b;if(c!='object'&&c!='function'||b===null)throw new TypeError('Object.keys called on non-object');var d=Object.prototype.hasOwnProperty,e=[];for(var f in b)if(d.call(b,f))e.push(f);return e;};if(!Object.freeze)Object.freeze=function(a){return a;};if(!Object.seal)Object.seal=function(a){return a;};(function(){try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value');}catch(a){Object.getOwnPropertyDescriptor=function(b){return function c(d,e){try{return b(d,e);}catch(f){return {enumerable:d.propertyIsEnumerable(e),configurable:true,get:d.__lookupGetter__(e),set:d.__lookupSetter__(e)};}};}(Object.getOwnPropertyDescriptor);}})();
(function(){if(Object.assign)return;var a=Object.prototype.hasOwnProperty,b;if(Object.keys&&Object.keys.name!=='object_keys_polyfill'){b=function(c,d){var e=Object.keys(d);for(var f=0;f<e.length;f++)c[e[f]]=d[e[f]];};}else b=function(c,d){for(var e in d)if(a.call(d,e))c[e]=d[e];};Object.assign=function(c,d){if(c==null)throw new TypeError('Object.assign target cannot be null or undefined');var e=Object(c);for(var f=1;f<arguments.length;f++){var g=arguments[f];if(g!=null)b(e,Object(g));}return e;};})();
(function(){var a=Object.prototype.hasOwnProperty;if(typeof Object.entries!=='function')Object.entries=function(b){if(b==null)throw new TypeError('Object.entries called on non-object');var c=[];for(var d in b)if(a.call(b,d))c.push([d,b[d]]);return c;};if(typeof Object.values!=='function')Object.values=function(b){if(b==null)throw new TypeError('Object.values called on non-object');var c=[];for(var d in b)if(a.call(b,d))c.push(b[d]);return c;};})();
(function(){if(!Object.is)Object.is=function(a,b){if(a===b){return a!==0||1/a===1/b;}else return a!==a&&b!==b;};})();
if({}.hasOwnProperty('__proto__'))Object.prototype.hasOwnProperty=function(a){return function b(c){return c!='__proto__'&&a.call(this,c);};}(Object.prototype.hasOwnProperty);
(function(a){a.__m=function(b,c){b.__SMmeta=c;return b;};})(this);
if(typeof String.fromCodePoint!=='function')String.fromCodePoint=function(){'use strict';var a=[];for(var b=arguments.length,c=Array(b),d=0;d<b;d++)c[d]=arguments[d];for(var e=0;e<c.length;e++){var f=Number(c[e]);if(!isFinite(f)||Math.floor(f)!=f||f<0||1114111<f)throw RangeError('Invalid code point '+f);if(f<65536){a.push(String.fromCharCode(f));}else{f-=65536;a.push(String.fromCharCode((f>>10)+55296),String.fromCharCode(f%1024+56320));}}return a.join('');};
if(!String.prototype.startsWith)String.prototype.startsWith=function(a){"use strict";if(this==null)throw TypeError();var b=String(this),c=arguments.length>1?Number(arguments[1])||0:0,d=Math.min(Math.max(c,0),b.length);return b.indexOf(String(a),c)==d;};if(!String.prototype.endsWith)String.prototype.endsWith=function(a){"use strict";if(this==null)throw TypeError();var b=String(this),c=b.length,d=String(a),e=arguments.length>1?Number(arguments[1])||0:c,f=Math.min(Math.max(e,0),c),g=f-d.length;if(g<0)return false;return b.lastIndexOf(d,g)==g;};if(!String.prototype.includes)String.prototype.includes=function(a){"use strict";if(this==null)throw TypeError();var b=String(this),c=arguments.length>1?Number(arguments[1])||0:0;return b.indexOf(String(a),c)!=-1;};if(!String.prototype.contains)String.prototype.contains=String.prototype.includes;if(!String.prototype.repeat)String.prototype.repeat=function(a){"use strict";if(this==null)throw TypeError();var b=String(this);a=Number(a)||0;if(a<0||a===Infinity)throw RangeError();if(a===1)return b;var c='';while(a){if(a&1)c+=b;if(a>>=1)b+=b;}return c;};if(!String.prototype.codePointAt)String.prototype.codePointAt=function(a){'use strict';if(this==null)throw TypeError('Invalid context: '+this);var b=String(this),c=b.length;a=Number(a)||0;if(a<0||c<=a)return undefined;var d=b.charCodeAt(a);if(55296<=d&&d<=56319&&c>a+1){var e=b.charCodeAt(a+1);if(56320<=e&&e<=57343)return (d-55296)*1024+e-56320+65536;}return d;};
if(!String.prototype.trimLeft)String.prototype.trimLeft=function(){return this.replace(/^\s+/,'');};if(!String.prototype.trimRight)String.prototype.trimRight=function(){return this.replace(/\s+$/,'');};
if(!String.prototype.trim)String.prototype.trim=function(){if(this==null)throw new TypeError('String.prototype.trim called on null or undefined');return String.prototype.replace.call(this,/^\s+|\s+$/g,'');};
(function(){var a,b=String.prototype.split,c=/()??/.exec("")[1]===a;String.prototype.split=function(d,e){var f=this;if(Object.prototype.toString.call(d)!=="[object RegExp]")return b.call(f,d,e);var g=[],h=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.extended?"x":"")+(d.sticky?"y":""),i=0,d=new RegExp(d.source,h+"g"),j,k,l,m;f+="";if(!c)j=new RegExp("^"+d.source+"$(?!\\s)",h);e=e===a?-1>>>0:e>>>0;while(k=d.exec(f)){l=k.index+k[0].length;if(l>i){g.push(f.slice(i,k.index));if(!c&&k.length>1)k[0].replace(j,function(){for(var n=1;n<arguments.length-2;n++)if(arguments[n]===a)k[n]=a;});if(k.length>1&&k.index<f.length)Array.prototype.push.apply(g,k.slice(1));m=k[0].length;i=l;if(g.length>=e)break;}if(d.lastIndex===k.index)d.lastIndex++;}if(i===f.length){if(m||!d.test(""))g.push("");}else g.push(f.slice(i));return g.length>e?g.slice(0,e):g;};})();
__t=function(a){return a[0];};__w=function(a){return a;};
(function(a){var b=a.babelHelpers={},c=Object.prototype.hasOwnProperty;b.inherits=function(d,e){Object.assign(d,e);d.prototype=Object.create(e&&e.prototype);d.prototype.constructor=d;d.__superConstructor__=e;return e;};b._extends=Object.assign;b['extends']=b._extends;b.objectWithoutProperties=function(d,e){var f={};for(var g in d){if(!c.call(d,g)||e.indexOf(g)>=0)continue;f[g]=d[g];}return f;};b.taggedTemplateLiteralLoose=function(d,e){d.raw=e;return d;};b.bind=Function.prototype.bind;})(typeof global==='undefined'?self:global);
if(typeof console=='undefined')(function(){function a(){}console={log:a,info:a,warn:a,debug:a,dir:a,error:a};})();
(function(a){var b=a.performance;if(b&&b.setResourceTimingBufferSize){b.setResourceTimingBufferSize(100000);b.setResourceTimingBufferSize=function(){};}})(this);
var require,__d;(function(a){var b={},c={},d=['global','require','requireDynamic','requireLazy','module','exports'];require=function(e,f){if(c.hasOwnProperty(e))return c[e];if(!b.hasOwnProperty(e)){if(f)return null;throw new Error('Module '+e+' has not been defined');}var g=b[e],h=g.deps,i=g.factory.length,j,k=[];for(var l=0;l<i;l++){switch(h[l]){case 'module':j=g;break;case 'exports':j=g.exports;break;case 'global':j=a;break;case 'require':j=require;break;case 'requireDynamic':j=null;break;case 'requireLazy':j=null;break;default:j=require.call(null,h[l]);}k.push(j);}g.factory.apply(a,k);c[e]=g.exports;return g.exports;};require.__markCompiled=function(){};__d=function(e,f,g,h){if(typeof g=='function'){b[e]={factory:g,deps:d.concat(f),exports:{}};if(h===3)require.call(null,e);}else c[e]=g;};})(this);
__d("sprintf",[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i){for(var j=arguments.length,k=Array(j>1?j-1:0),l=1;l<j;l++)k[l-1]=arguments[l];var m=0;return i.replace(/%s/g,function(n){return k[m++];});}f.exports=h;},null);
__d('Log',['sprintf'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i={DEBUG:3,INFO:2,WARNING:1,ERROR:0};function j(l,m){var n=Array.prototype.slice.call(arguments,2),o=h.apply(null,n),p=window.console;if(p&&k.level>=m)p[l in p?l:'log'](o);}var k={level:-1,Level:i,debug:j.bind(null,'debug',i.DEBUG),info:j.bind(null,'info',i.INFO),warn:j.bind(null,'warn',i.WARNING),error:j.bind(null,'error',i.ERROR)};f.exports=k;},null);
__d('QueryString',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(l){var m=[];Object.keys(l).sort().forEach(function(n){var o=l[n];if(typeof o==='undefined')return;if(o===null){m.push(n);return;}m.push(encodeURIComponent(n)+'='+encodeURIComponent(o));});return m.join('&');}function i(l,m){var n={};if(l==='')return n;var o=l.split('&');for(var p=0;p<o.length;p++){var q=o[p].split('=',2),r=decodeURIComponent(q[0]);if(m&&n.hasOwnProperty(r))throw new URIError('Duplicate key: '+r);n[r]=q.length===2?decodeURIComponent(q[1]):null;}return n;}function j(l,m){return l+(l.indexOf('?')!==-1?'&':'?')+(typeof m==='string'?m:k.encode(m));}var k={encode:h,decode:i,appendToUrl:j};f.exports=k;},null);
__d('eprintf',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=function(i){var j=Array.prototype.slice.call(arguments).map(function(m){return String(m);}),k=i.split('%s').length-1;if(k!==j.length-1)return h('eprintf args number mismatch: %s',JSON.stringify(j));var l=1;return i.replace(/%s/g,function(m){return String(j[l++]);});};f.exports=h;},null);
__d('ex',['eprintf'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=function(){for(var j=arguments.length,k=Array(j),l=0;l<j;l++)k[l]=arguments[l];k=k.map(function(m){return String(m);});if(k[0].split('%s').length!==k.length)return i('ex args number mismatch: %s',JSON.stringify(k));return i._prefix+JSON.stringify(k)+i._suffix;};i._prefix='<![EX[';i._suffix=']]>';f.exports=i;},null);
__d('invariant',['ex','sprintf'],function a(b,c,d,e,f,g,h,i){'use strict';if(c.__markCompiled)c.__markCompiled();var j=h;function k(l,m){if(!l){var n=void 0;if(m===undefined){n=new Error('Minified exception occurred; use the non-minified dev environment '+'for the full error message and additional helpful warnings.');}else{var o=[m];for(var p=2,q=arguments.length;p<q;p++)o.push(arguments[p]);n=new Error(j.apply(null,o));n.name='Invariant Violation';n.messageWithParams=o;}n.framesToPop=1;throw n;}}f.exports=k;},null);
__d('wrapFunction',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={},i=function j(k,l,m){var n=l||'default';return function(){var o=n in h?h[n](k,m):k;return o.apply(this,arguments);};};i.setWrapper=function(j){var k=arguments.length<=1||arguments[1]===undefined?'default':arguments[1];h[k]=j;};f.exports=i;},null);
__d('DOMEventListener',['invariant','wrapFunction'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j=void 0,k=void 0;if(window.addEventListener){j=function(m,n,o){o.wrapper=i(o,'entry','DOMEventListener.add '+n);m.addEventListener(n,o.wrapper,false);};k=function(m,n,o){m.removeEventListener(n,o.wrapper,false);};}else if(window.attachEvent){j=function(m,n,o){o.wrapper=i(o,'entry','DOMEventListener.add '+n);!m.attachEvent?h(0):void 0;m.attachEvent('on'+n,o.wrapper);};k=function(m,n,o){!m.detachEvent?h(0):void 0;m.detachEvent('on'+n,o.wrapper);};}else k=j=function(){};var l={add:function(m,n,o){j(m,n,o);return {remove:function(){k(m,n,o);}};},remove:k};f.exports=l;},null);
__d("DOMWrapper",[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h,i,j={setRoot:function(k){h=k;},getRoot:function(){return h||document.body;},setWindow:function(k){i=k;},getWindow:function(){return i||self;}};f.exports=j;},null);
__d('UserAgent_DEPRECATED',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=false,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;function x(){if(h)return;h=true;var z=navigator.userAgent,aa=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(z),ba=/(Mac OS X)|(Windows)|(Linux)/.exec(z);t=/\b(iPhone|iP[ao]d)/.exec(z);u=/\b(iP[ao]d)/.exec(z);r=/Android/i.exec(z);v=/FBAN\/\w+;/i.exec(z);w=/Mobile/i.exec(z);s=!!/Win64/.exec(z);if(aa){i=aa[1]?parseFloat(aa[1]):aa[5]?parseFloat(aa[5]):NaN;if(i&&document&&document.documentMode)i=document.documentMode;var ca=/(?:Trident\/(\d+.\d+))/.exec(z);n=ca?parseFloat(ca[1])+4:i;j=aa[2]?parseFloat(aa[2]):NaN;k=aa[3]?parseFloat(aa[3]):NaN;l=aa[4]?parseFloat(aa[4]):NaN;if(l){aa=/(?:Chrome\/(\d+\.\d+))/.exec(z);m=aa&&aa[1]?parseFloat(aa[1]):NaN;}else m=NaN;}else i=j=k=m=l=NaN;if(ba){if(ba[1]){var da=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(z);o=da?parseFloat(da[1].replace('_','.')):true;}else o=false;p=!!ba[2];q=!!ba[3];}else o=p=q=false;}var y={ie:function(){return x()||i;},ieCompatibilityMode:function(){return x()||n>i;},ie64:function(){return y.ie()&&s;},firefox:function(){return x()||j;},opera:function(){return x()||k;},webkit:function(){return x()||l;},safari:function(){return y.webkit();},chrome:function(){return x()||m;},windows:function(){return x()||p;},osx:function(){return x()||o;},linux:function(){return x()||q;},iphone:function(){return x()||t;},mobile:function(){return x()||t||u||r||w;},nativeApp:function(){return x()||v;},android:function(){return x()||r;},ipad:function(){return x()||u;}};f.exports=y;},null);
__d('guid',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(){return 'f'+(Math.random()*(1<<30)).toString(16).replace('.','');}f.exports=h;},null);
__d('htmlSpecialChars',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=/&/g,i=/</g,j=/>/g,k=/"/g,l=/'/g;function m(n){if(typeof n=='undefined'||n===null||!n.toString)return '';if(n===false){return '0';}else if(n===true)return '1';return n.toString().replace(h,'&amp;').replace(k,'&quot;').replace(l,'&#039;').replace(i,'&lt;').replace(j,'&gt;');}f.exports=m;},null);
__d('Flash',['DOMEventListener','DOMWrapper','QueryString','UserAgent_DEPRECATED','guid','htmlSpecialChars'],function a(b,c,d,e,f,g,h,i,j,k,l,m){if(c.__markCompiled)c.__markCompiled();var n={},o,p=i.getWindow().document;function q(v){var w=p.getElementById(v);if(w)w.parentNode.removeChild(w);delete n[v];}function r(){for(var v in n)if(n.hasOwnProperty(v))q(v);}function s(v){return v.replace(/\d+/g,function(w){return '000'.substring(w.length)+w;});}function t(v){if(!o){if(k.ie()>=9)h.add(window,'unload',r);o=true;}n[v]=v;}var u={embed:function(v,w,x,y){var z=l();v=m(v).replace(/&amp;/g,'&');x=babelHelpers['extends']({allowscriptaccess:'always',flashvars:y,movie:v},x);if(typeof x.flashvars=='object')x.flashvars=j.encode(x.flashvars);var aa=[];for(var ba in x)if(x.hasOwnProperty(ba)&&x[ba])aa.push('<param name="'+m(ba)+'" value="'+m(x[ba])+'">');var ca=w.appendChild(p.createElement('span')),da='<object '+(k.ie()?'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ':'type="application/x-shockwave-flash"')+'data="'+v+'" '+(x.height?'height="'+x.height+'" ':'')+(x.width?'width="'+x.width+'" ':'')+'id="'+z+'">'+aa.join('')+'</object>';ca.innerHTML=da;var ea=ca.firstChild;t(z);return ea;},remove:q,getVersion:function(){var v='Shockwave Flash',w='application/x-shockwave-flash',x='ShockwaveFlash.ShockwaveFlash',y;if(navigator.plugins&&typeof navigator.plugins[v]=='object'){var z=navigator.plugins[v].description;if(z&&navigator.mimeTypes&&navigator.mimeTypes[w]&&navigator.mimeTypes[w].enabledPlugin)y=z.match(/\d+/g);}if(!y)try{y=new ActiveXObject(x).GetVariable('$version').match(/(\d+),(\d+),(\d+),(\d+)/);y=Array.prototype.slice.call(y,1);}catch(aa){}return y;},getVersionString:function(){var v=u.getVersion();return v?v.join('.'):'';},checkMinVersion:function(v){var w=u.getVersion();if(!w)return false;return s(w.join('.'))>=s(v);},isAvailable:function(){return !!u.getVersion();}};f.exports=u;},null);
__d('dotAccess',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i,j,k){var l=j.split('.');do{var m=l.shift();i=i[m]||k&&(i[m]={});}while(l.length&&i);return i;}f.exports=h;},null);
__d('GlobalCallback',['DOMWrapper','dotAccess','guid','wrapFunction'],function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();var l,m,n={setPrefix:function(o){l=i(h.getWindow(),o,true);m=o;},create:function(o,p){if(!l)this.setPrefix('__globalCallbacks');var q=j();l[q]=k(o,'entry',p||'GlobalCallback');return m+'.'+q;},remove:function(o){var p=o.substring(m.length+1);delete l[p];}};f.exports=n;},null);
__d("emptyFunction",[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(j){return function(){return j;};}var i=function(){};i.thatReturns=h;i.thatReturnsFalse=h(false);i.thatReturnsTrue=h(true);i.thatReturnsNull=h(null);i.thatReturnsThis=function(){return this;};i.thatReturnsArgument=function(j){return j;};f.exports=i;},null);
__d('XDM',['DOMEventListener','DOMWrapper','emptyFunction','Flash','GlobalCallback','guid','Log','UserAgent_DEPRECATED','wrapFunction'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){if(c.__markCompiled)c.__markCompiled();var q={},r={transports:[]},s=i.getWindow();function t(w){var x={},y=w.length,z=r.transports;while(y--)x[w[y]]=1;y=z.length;while(y--){var aa=z[y],ba=q[aa];if(!x[aa]&&ba.isAvailable())return aa;}}var u={register:function(w,x){n.debug('Registering %s as XDM provider',w);r.transports.push(w);q[w]=x;},create:function(w){if(!w.whenReady&&!w.onMessage){n.error('An instance without whenReady or onMessage makes no sense');throw new Error('An instance without whenReady or '+'onMessage makes no sense');}if(!w.channel){n.warn('Missing channel name, selecting at random');w.channel=m();}if(!w.whenReady)w.whenReady=j;if(!w.onMessage)w.onMessage=j;var x=w.transport||t(w.blacklist||[]),y=q[x];if(y&&y.isAvailable()){n.debug('%s is available',x);y.init(w);return x;}}};u.register('flash',function(){var w=false,x,y=false,z=15000,aa;return {isAvailable:function(){return k.checkMinVersion('8.0.24');},init:function(ba){n.debug('init flash: '+ba.channel);var ca={send:function(fa,ga,ha,ia){n.debug('sending to: %s (%s)',ga,ia);x.postMessage(fa,ga,ia);}};if(w){ba.whenReady(ca);return;}var da=ba.root.appendChild(s.document.createElement('div')),ea=l.create(function(){l.remove(ea);clearTimeout(aa);n.info('xdm.swf called the callback');var fa=l.create(function(ga,ha){ga=decodeURIComponent(ga);ha=decodeURIComponent(ha);n.debug('received message %s from %s',ga,ha);ba.onMessage(ga,ha);},'xdm.swf:onMessage');x.init(ba.channel,fa);ba.whenReady(ca);},'xdm.swf:load');x=k.embed(ba.flashUrl,da,null,{protocol:location.protocol.replace(':',''),host:location.host,callback:ea,log:y});aa=setTimeout(function(){n.warn('The Flash component did not load within %s ms - '+'verify that the container is not set to hidden or invisible '+'using CSS as this will cause some browsers to not load '+'the components',z);},z);w=true;}};}());var v=/\.facebook\.com(\/|$)/;u.register('postmessage',function(){var w=false;return {isAvailable:function(){return !!s.postMessage;},init:function(x){n.debug('init postMessage: '+x.channel);var y='_FB_'+x.channel,z={send:function(aa,ba,ca,da){if(s===ca){n.error('Invalid windowref, equal to window (self)');throw new Error();}n.debug('sending to: %s (%s)',ba,da);var ea=function(){ca.postMessage('_FB_'+da+aa,ba);};if(o.ie()==8||o.ieCompatibilityMode()){setTimeout(ea,0);}else ea();}};if(w){x.whenReady(z);return;}h.add(s,'message',p(function(event){var aa=event.data,ba=event.origin||'native';if(!/^(https?:\/\/|native$)/.test(ba)){n.debug('Received message from invalid origin type: %s',ba);return;}if(ba!=='native'&&!(v.test(location.hostname)||v.test(event.origin)))return;if(typeof aa!='string'){n.warn('Received message of type %s from %s, expected a string',typeof aa,ba);return;}n.debug('received message %s from %s',aa,ba);if(aa.substring(0,y.length)==y)aa=aa.substring(y.length);x.onMessage(aa,ba);},'entry','onMessage'));x.whenReady(z);w=true;}};}());f.exports=u;},null);
__d('resolveWindow',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i){var j=window,k=i.split('.');try{for(var m=0;m<k.length;m++){var n=k[m],o=/^frames\[['"]?([a-zA-Z0-9\-_]+)['"]?\]$/.exec(n);if(o){j=j.frames[o[1]];}else if(n==='opener'||n==='parent'||n==='top'){j=j[n];}else return null;}}catch(l){return null;}return j;}f.exports=h;},null);
__d('initXdArbiter',['QueryString','resolveWindow','Log','XDM','XDMConfig'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();(function(){var h=c('QueryString'),i=c('resolveWindow'),j=c('Log'),k=c('XDM'),l=c('XDMConfig');function m(aa){return aa?aa.replace(/["'<>\(\)\\@]/g,''):aa;}function n(){if(!window.chrome||!location.ancestorOrigins)return false;return !/\.facebook\.com$/.test(location.ancestorOrigins[1]);}function o(aa,ba){if(n())return '';if(window!=parent&&window.parent!=window.parent.parent)try{return parent.parent.XdArbiter.register(window,aa,ba);}catch(ca){j.error('Could not register with XdArbiter in parent.parent');}return '';}function p(aa,ba,ca){if(!aa&&n()){j.error('Can not use parent.parent to reach facebook.com');return;}var da=aa?i(aa):parent.parent;try{da.XdArbiter.handleMessage(ba,ca,window);}catch(ea){j.error('Could not reach facebook.com using %s',aa);}}function q(aa,ba){var ca=50,da=function(){if(!--ca)clearInterval(ea);try{aa();clearInterval(ea);}catch(fa){}},ea=setInterval(da,50);da();}function r(){var aa=/^https?:\/\/[^\/]*/.exec(u.origin)[0];q(function(){var ba=i(u.relation).frames['fb_xdm_frame_'+v];if(typeof ba.location.search==='undefined')throw new Error('Proxy not ready');if(location.search===ba.location.search){ba.proxyMessage(t,aa);}else j.error('Version mismatch: %s, %s',location.search,ba.location.search);},50);}function s(){var aa=/^(.*)\/(.*)$/.exec(u.origin)[1];if(window.__fbNative&&window.__fbNative.postMessage){window.__fbNative.postMessage(t,aa);}else{var ba=function(ca){window.removeEventListener('fbNativeReady',ba);window.__fbNative.postMessage(t,aa);};window.addEventListener('fbNativeReady',ba);}}var t=/#(.*)|$/.exec(location.href)[1];if(window==top)location.hash='';if(!t){j.error('xd_arbiter.php loaded without a valid hash, referrer: %s',document.referrer);return;}var u=h.decode(t,true),v=location.protocol.replace(':','');if(window.name.substring(0,6)==='blank_'){parent.frames[u.forIframe].require('Arbiter').inform('blankIframeAck',window);return;}if(u.relation){if(window==top&&/FBAN\/\w+;/i.test(navigator.userAgent)){j.info('Native proxy');s();}else{j.info('Legacy proxy to %s',u.relation);r();}return;}if(v!=/https?/.exec(window.name)[0]){j.info('Redirection to %s detected, aborting',v);return;}var w=m(u.transport),x=m(u.channel),y=m(u.origin),z=m(u.xd_name);if(!/^https?/.test(y)){j.error('Invalid origin presented, aborting.');return;}k.create({root:document.body,transport:w,channel:x+'_'+v,flashUrl:l.Flash.path,onMessage:function(aa,ba){if(y!==ba){j.info('Received message from unknown origin %s, expected %s.',ba,y);return;}if(!/^FB_RPC:/.test(aa))aa=h.decode(aa);p(aa.relation,aa,y);},whenReady:function(aa){window.proxyMessage=function(ea,fa){if(fa===y){aa.send(ea,y,parent,x);}else j.error('Failed proxying to %s, expected %s',fa,y);};var ba=null,ca={xd_action:'proxy_ready',logged_in:/\bc_user=/.test(document.cookie),data:ba},da=o(z,y);if(da)ca.registered=da;aa.send(h.encode(ca),y,parent,x);}});})();},null);__d("XDMConfig",[],{"Flash":{"path":"https:\/\/connect.facebook.net\/rsrc.php\/v1\/yW\/r\/yOZN1vHw3Z_.swf"}}); require('initXdArbiter'); </script><b id="warning" style="display: none; color:red"> SECURITY WARNING: Please treat the URL above as you would your password and do not share it with anyone. See the <a href="http://l.facebook.com/l.php?u=http%3A%2F%2Fon.fb.me%2F1mXNHhm&amp;h=QAQHh_HrV&amp;s=1" target="_blank" rel="nofollow" onmouseover="LinkshimAsyncLink.swap(this, &quot;http:\/\/on.fb.me\/1mXNHhm&quot;);" onclick="LinkshimAsyncLink.referrer_log(this, &quot;http:\/\/on.fb.me\/1mXNHhm&quot;, &quot;\/si\/ajax\/l\/render_linkshim_log\/?u=http\u00253A\u00252F\u00252Fon.fb.me\u00252F1mXNHhm&amp;h=QAQHh_HrV&amp;render_verification=0&amp;enc&amp;d&quot;);">Facebook Help Center</a> for more information. </b><script>if (window == top) {  setTimeout(function() {    document.getElementById("warning").style.display = 'block';  }, 2000);}</script></body></html>
;
/*!
 * jQuery JavaScript Library v1.12.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-02-22T19:07Z
 */

function onInit(t){$(document).ready(t),$(document).on("page:load",t)}function readmore(t,e,i){i&&(first_child_id=t+" > .tip",new_height=$(first_child_id).first().height(),e.collapsedHeight=new_height),$(t).readmore(e)}function BestInPlaceEditor(t){"use strict";this.element=t,this.initOptions(),this.bindForm(),this.initPlaceHolder(),jQuery(this.activator).bind("click",{editor:this},this.clickHandler)}/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if(function(t,e){"object"==typeof module&&"object"==typeof module.exports?module.exports=t.document?e(t,!0):function(t){if(!t.document)throw new Error("jQuery requires a window with a document");return e(t)}:e(t)}("undefined"!=typeof window?window:this,function(t,e){function i(t){var e=!!t&&"length"in t&&t.length,i=pt.type(t);return"function"===i||pt.isWindow(t)?!1:"array"===i||0===e||"number"==typeof e&&e>0&&e-1 in t}function n(t,e,i){if(pt.isFunction(e))return pt.grep(t,function(t,n){return!!e.call(t,n,t)!==i});if(e.nodeType)return pt.grep(t,function(t){return t===e!==i});if("string"==typeof e){if(Ct.test(e))return pt.filter(e,t,i);e=pt.filter(e,t)}return pt.grep(t,function(t){return pt.inArray(t,e)>-1!==i})}function s(t,e){do t=t[e];while(t&&1!==t.nodeType);return t}function o(t){var e={};return pt.each(t.match(At)||[],function(t,i){e[i]=!0}),e}function r(){nt.addEventListener?(nt.removeEventListener("DOMContentLoaded",a),t.removeEventListener("load",a)):(nt.detachEvent("onreadystatechange",a),t.detachEvent("onload",a))}function a(){(nt.addEventListener||"load"===t.event.type||"complete"===nt.readyState)&&(r(),pt.ready())}function l(t,e,i){if(void 0===i&&1===t.nodeType){var n="data-"+e.replace(Ot,"-$1").toLowerCase();if(i=t.getAttribute(n),"string"==typeof i){try{i="true"===i?!0:"false"===i?!1:"null"===i?null:+i+""===i?+i:Nt.test(i)?pt.parseJSON(i):i}catch(s){}pt.data(t,e,i)}else i=void 0}return i}function u(t){var e;for(e in t)if(("data"!==e||!pt.isEmptyObject(t[e]))&&"toJSON"!==e)return!1;return!0}function c(t,e,i,n){if(Pt(t)){var s,o,r=pt.expando,a=t.nodeType,l=a?pt.cache:t,u=a?t[r]:t[r]&&r;if(u&&l[u]&&(n||l[u].data)||void 0!==i||"string"!=typeof e)return u||(u=a?t[r]=it.pop()||pt.guid++:r),l[u]||(l[u]=a?{}:{toJSON:pt.noop}),"object"!=typeof e&&"function"!=typeof e||(n?l[u]=pt.extend(l[u],e):l[u].data=pt.extend(l[u].data,e)),o=l[u],n||(o.data||(o.data={}),o=o.data),void 0!==i&&(o[pt.camelCase(e)]=i),"string"==typeof e?(s=o[e],null==s&&(s=o[pt.camelCase(e)])):s=o,s}}function h(t,e,i){if(Pt(t)){var n,s,o=t.nodeType,r=o?pt.cache:t,a=o?t[pt.expando]:pt.expando;if(r[a]){if(e&&(n=i?r[a]:r[a].data)){pt.isArray(e)?e=e.concat(pt.map(e,pt.camelCase)):e in n?e=[e]:(e=pt.camelCase(e),e=e in n?[e]:e.split(" ")),s=e.length;for(;s--;)delete n[e[s]];if(i?!u(n):!pt.isEmptyObject(n))return}(i||(delete r[a].data,u(r[a])))&&(o?pt.cleanData([t],!0):ht.deleteExpando||r!=r.window?delete r[a]:r[a]=void 0)}}}function d(t,e,i,n){var s,o=1,r=20,a=n?function(){return n.cur()}:function(){return pt.css(t,e,"")},l=a(),u=i&&i[3]||(pt.cssNumber[e]?"":"px"),c=(pt.cssNumber[e]||"px"!==u&&+l)&&Ht.exec(pt.css(t,e));if(c&&c[3]!==u){u=u||c[3],i=i||[],c=+l||1;do o=o||".5",c/=o,pt.style(t,e,c+u);while(o!==(o=a()/l)&&1!==o&&--r)}return i&&(c=+c||+l||0,s=i[1]?c+(i[1]+1)*i[2]:+i[2],n&&(n.unit=u,n.start=c,n.end=s)),s}function p(t){var e=Bt.split("|"),i=t.createDocumentFragment();if(i.createElement)for(;e.length;)i.createElement(e.pop());return i}function f(t,e){var i,n,s=0,o="undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e||"*"):"undefined"!=typeof t.querySelectorAll?t.querySelectorAll(e||"*"):void 0;if(!o)for(o=[],i=t.childNodes||t;null!=(n=i[s]);s++)!e||pt.nodeName(n,e)?o.push(n):pt.merge(o,f(n,e));return void 0===e||e&&pt.nodeName(t,e)?pt.merge([t],o):o}function m(t,e){for(var i,n=0;null!=(i=t[n]);n++)pt._data(i,"globalEval",!e||pt._data(e[n],"globalEval"))}function g(t){Lt.test(t.type)&&(t.defaultChecked=t.checked)}function v(t,e,i,n,s){for(var o,r,a,l,u,c,h,d=t.length,v=p(e),y=[],b=0;d>b;b++)if(r=t[b],r||0===r)if("object"===pt.type(r))pt.merge(y,r.nodeType?[r]:r);else if(Yt.test(r)){for(l=l||v.appendChild(e.createElement("div")),u=(Wt.exec(r)||["",""])[1].toLowerCase(),h=Ut[u]||Ut._default,l.innerHTML=h[1]+pt.htmlPrefilter(r)+h[2],o=h[0];o--;)l=l.lastChild;if(!ht.leadingWhitespace&&qt.test(r)&&y.push(e.createTextNode(qt.exec(r)[0])),!ht.tbody)for(r="table"!==u||Vt.test(r)?"<table>"!==h[1]||Vt.test(r)?0:l:l.firstChild,o=r&&r.childNodes.length;o--;)pt.nodeName(c=r.childNodes[o],"tbody")&&!c.childNodes.length&&r.removeChild(c);for(pt.merge(y,l.childNodes),l.textContent="";l.firstChild;)l.removeChild(l.firstChild);l=v.lastChild}else y.push(e.createTextNode(r));for(l&&v.removeChild(l),ht.appendChecked||pt.grep(f(y,"input"),g),b=0;r=y[b++];)if(n&&pt.inArray(r,n)>-1)s&&s.push(r);else if(a=pt.contains(r.ownerDocument,r),l=f(v.appendChild(r),"script"),a&&m(l),i)for(o=0;r=l[o++];)Rt.test(r.type||"")&&i.push(r);return l=null,v}function y(){return!0}function b(){return!1}function _(){try{return nt.activeElement}catch(t){}}function w(t,e,i,n,s,o){var r,a;if("object"==typeof e){"string"!=typeof i&&(n=n||i,i=void 0);for(a in e)w(t,a,i,n,e[a],o);return t}if(null==n&&null==s?(s=i,n=i=void 0):null==s&&("string"==typeof i?(s=n,n=void 0):(s=n,n=i,i=void 0)),s===!1)s=b;else if(!s)return t;return 1===o&&(r=s,s=function(t){return pt().off(t),r.apply(this,arguments)},s.guid=r.guid||(r.guid=pt.guid++)),t.each(function(){pt.event.add(this,e,s,n,i)})}function x(t,e){return pt.nodeName(t,"table")&&pt.nodeName(11!==e.nodeType?e:e.firstChild,"tr")?t.getElementsByTagName("tbody")[0]||t.appendChild(t.ownerDocument.createElement("tbody")):t}function C(t){return t.type=(null!==pt.find.attr(t,"type"))+"/"+t.type,t}function k(t){var e=se.exec(t.type);return e?t.type=e[1]:t.removeAttribute("type"),t}function T(t,e){if(1===e.nodeType&&pt.hasData(t)){var i,n,s,o=pt._data(t),r=pt._data(e,o),a=o.events;if(a){delete r.handle,r.events={};for(i in a)for(n=0,s=a[i].length;s>n;n++)pt.event.add(e,i,a[i][n])}r.data&&(r.data=pt.extend({},r.data))}}function D(t,e){var i,n,s;if(1===e.nodeType){if(i=e.nodeName.toLowerCase(),!ht.noCloneEvent&&e[pt.expando]){s=pt._data(e);for(n in s.events)pt.removeEvent(e,n,s.handle);e.removeAttribute(pt.expando)}"script"===i&&e.text!==t.text?(C(e).text=t.text,k(e)):"object"===i?(e.parentNode&&(e.outerHTML=t.outerHTML),ht.html5Clone&&t.innerHTML&&!pt.trim(e.innerHTML)&&(e.innerHTML=t.innerHTML)):"input"===i&&Lt.test(t.type)?(e.defaultChecked=e.checked=t.checked,e.value!==t.value&&(e.value=t.value)):"option"===i?e.defaultSelected=e.selected=t.defaultSelected:"input"!==i&&"textarea"!==i||(e.defaultValue=t.defaultValue)}}function E(t,e,i,n){e=ot.apply([],e);var s,o,r,a,l,u,c=0,h=t.length,d=h-1,p=e[0],m=pt.isFunction(p);if(m||h>1&&"string"==typeof p&&!ht.checkClone&&ne.test(p))return t.each(function(s){var o=t.eq(s);m&&(e[0]=p.call(this,s,o.html())),E(o,e,i,n)});if(h&&(u=v(e,t[0].ownerDocument,!1,t,n),s=u.firstChild,1===u.childNodes.length&&(u=s),s||n)){for(a=pt.map(f(u,"script"),C),r=a.length;h>c;c++)o=u,c!==d&&(o=pt.clone(o,!0,!0),r&&pt.merge(a,f(o,"script"))),i.call(t[c],o,c);if(r)for(l=a[a.length-1].ownerDocument,pt.map(a,k),c=0;r>c;c++)o=a[c],Rt.test(o.type||"")&&!pt._data(o,"globalEval")&&pt.contains(l,o)&&(o.src?pt._evalUrl&&pt._evalUrl(o.src):pt.globalEval((o.text||o.textContent||o.innerHTML||"").replace(oe,"")));u=s=null}return t}function S(t,e,i){for(var n,s=e?pt.filter(e,t):t,o=0;null!=(n=s[o]);o++)i||1!==n.nodeType||pt.cleanData(f(n)),n.parentNode&&(i&&pt.contains(n.ownerDocument,n)&&m(f(n,"script")),n.parentNode.removeChild(n));return t}function A(t,e){var i=pt(e.createElement(t)).appendTo(e.body),n=pt.css(i[0],"display");return i.detach(),n}function I(t){var e=nt,i=ue[t];return i||(i=A(t,e),"none"!==i&&i||(le=(le||pt("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement),e=(le[0].contentWindow||le[0].contentDocument).document,e.write(),e.close(),i=A(t,e),le.detach()),ue[t]=i),i}function M(t,e){return{get:function(){return t()?void delete this.get:(this.get=e).apply(this,arguments)}}}function P(t){if(t in ke)return t;for(var e=t.charAt(0).toUpperCase()+t.slice(1),i=Ce.length;i--;)if(t=Ce[i]+e,t in ke)return t}function N(t,e){for(var i,n,s,o=[],r=0,a=t.length;a>r;r++)n=t[r],n.style&&(o[r]=pt._data(n,"olddisplay"),i=n.style.display,e?(o[r]||"none"!==i||(n.style.display=""),""===n.style.display&&Ft(n)&&(o[r]=pt._data(n,"olddisplay",I(n.nodeName)))):(s=Ft(n),(i&&"none"!==i||!s)&&pt._data(n,"olddisplay",s?i:pt.css(n,"display"))));for(r=0;a>r;r++)n=t[r],n.style&&(e&&"none"!==n.style.display&&""!==n.style.display||(n.style.display=e?o[r]||"":"none"));return t}function O(t,e,i){var n=_e.exec(e);return n?Math.max(0,n[1]-(i||0))+(n[2]||"px"):e}function j(t,e,i,n,s){for(var o=i===(n?"border":"content")?4:"width"===e?1:0,r=0;4>o;o+=2)"margin"===i&&(r+=pt.css(t,i+$t[o],!0,s)),n?("content"===i&&(r-=pt.css(t,"padding"+$t[o],!0,s)),"margin"!==i&&(r-=pt.css(t,"border"+$t[o]+"Width",!0,s))):(r+=pt.css(t,"padding"+$t[o],!0,s),"padding"!==i&&(r+=pt.css(t,"border"+$t[o]+"Width",!0,s)));return r}function H(e,i,n){var s=!0,o="width"===i?e.offsetWidth:e.offsetHeight,r=fe(e),a=ht.boxSizing&&"border-box"===pt.css(e,"boxSizing",!1,r);if(nt.msFullscreenElement&&t.top!==t&&e.getClientRects().length&&(o=Math.round(100*e.getBoundingClientRect()[i])),0>=o||null==o){if(o=me(e,i,r),(0>o||null==o)&&(o=e.style[i]),he.test(o))return o;s=a&&(ht.boxSizingReliable()||o===e.style[i]),o=parseFloat(o)||0}return o+j(e,i,n||(a?"border":"content"),s,r)+"px"}function $(t,e,i,n,s){return new $.prototype.init(t,e,i,n,s)}function F(){return t.setTimeout(function(){Te=void 0}),Te=pt.now()}function z(t,e){var i,n={height:t},s=0;for(e=e?1:0;4>s;s+=2-e)i=$t[s],n["margin"+i]=n["padding"+i]=t;return e&&(n.opacity=n.width=t),n}function L(t,e,i){for(var n,s=(q.tweeners[e]||[]).concat(q.tweeners["*"]),o=0,r=s.length;r>o;o++)if(n=s[o].call(i,e,t))return n}function W(t,e,i){var n,s,o,r,a,l,u,c,h=this,d={},p=t.style,f=t.nodeType&&Ft(t),m=pt._data(t,"fxshow");i.queue||(a=pt._queueHooks(t,"fx"),null==a.unqueued&&(a.unqueued=0,l=a.empty.fire,a.empty.fire=function(){a.unqueued||l()}),a.unqueued++,h.always(function(){h.always(function(){a.unqueued--,pt.queue(t,"fx").length||a.empty.fire()})})),1===t.nodeType&&("height"in e||"width"in e)&&(i.overflow=[p.overflow,p.overflowX,p.overflowY],u=pt.css(t,"display"),c="none"===u?pt._data(t,"olddisplay")||I(t.nodeName):u,"inline"===c&&"none"===pt.css(t,"float")&&(ht.inlineBlockNeedsLayout&&"inline"!==I(t.nodeName)?p.zoom=1:p.display="inline-block")),i.overflow&&(p.overflow="hidden",ht.shrinkWrapBlocks()||h.always(function(){p.overflow=i.overflow[0],p.overflowX=i.overflow[1],p.overflowY=i.overflow[2]}));for(n in e)if(s=e[n],Ee.exec(s)){if(delete e[n],o=o||"toggle"===s,s===(f?"hide":"show")){if("show"!==s||!m||void 0===m[n])continue;f=!0}d[n]=m&&m[n]||pt.style(t,n)}else u=void 0;if(pt.isEmptyObject(d))"inline"===("none"===u?I(t.nodeName):u)&&(p.display=u);else{m?"hidden"in m&&(f=m.hidden):m=pt._data(t,"fxshow",{}),o&&(m.hidden=!f),f?pt(t).show():h.done(function(){pt(t).hide()}),h.done(function(){var e;pt._removeData(t,"fxshow");for(e in d)pt.style(t,e,d[e])});for(n in d)r=L(f?m[n]:0,n,h),n in m||(m[n]=r.start,f&&(r.end=r.start,r.start="width"===n||"height"===n?1:0))}}function R(t,e){var i,n,s,o,r;for(i in t)if(n=pt.camelCase(i),s=e[n],o=t[i],pt.isArray(o)&&(s=o[1],o=t[i]=o[0]),i!==n&&(t[n]=o,delete t[i]),r=pt.cssHooks[n],r&&"expand"in r){o=r.expand(o),delete t[n];for(i in o)i in t||(t[i]=o[i],e[i]=s)}else e[n]=s}function q(t,e,i){var n,s,o=0,r=q.prefilters.length,a=pt.Deferred().always(function(){delete l.elem}),l=function(){if(s)return!1;for(var e=Te||F(),i=Math.max(0,u.startTime+u.duration-e),n=i/u.duration||0,o=1-n,r=0,l=u.tweens.length;l>r;r++)u.tweens[r].run(o);return a.notifyWith(t,[u,o,i]),1>o&&l?i:(a.resolveWith(t,[u]),!1)},u=a.promise({elem:t,props:pt.extend({},e),opts:pt.extend(!0,{specialEasing:{},easing:pt.easing._default},i),originalProperties:e,originalOptions:i,startTime:Te||F(),duration:i.duration,tweens:[],createTween:function(e,i){var n=pt.Tween(t,u.opts,e,i,u.opts.specialEasing[e]||u.opts.easing);return u.tweens.push(n),n},stop:function(e){var i=0,n=e?u.tweens.length:0;if(s)return this;for(s=!0;n>i;i++)u.tweens[i].run(1);return e?(a.notifyWith(t,[u,1,0]),a.resolveWith(t,[u,e])):a.rejectWith(t,[u,e]),this}}),c=u.props;for(R(c,u.opts.specialEasing);r>o;o++)if(n=q.prefilters[o].call(u,t,c,u.opts))return pt.isFunction(n.stop)&&(pt._queueHooks(u.elem,u.opts.queue).stop=pt.proxy(n.stop,n)),n;return pt.map(c,L,u),pt.isFunction(u.opts.start)&&u.opts.start.call(t,u),pt.fx.timer(pt.extend(l,{elem:t,anim:u,queue:u.opts.queue})),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always)}function B(t){return pt.attr(t,"class")||""}function U(t){return function(e,i){"string"!=typeof e&&(i=e,e="*");var n,s=0,o=e.toLowerCase().match(At)||[];if(pt.isFunction(i))for(;n=o[s++];)"+"===n.charAt(0)?(n=n.slice(1)||"*",(t[n]=t[n]||[]).unshift(i)):(t[n]=t[n]||[]).push(i)}}function Y(t,e,i,n){function s(a){var l;return o[a]=!0,pt.each(t[a]||[],function(t,a){var u=a(e,i,n);return"string"!=typeof u||r||o[u]?r?!(l=u):void 0:(e.dataTypes.unshift(u),s(u),!1)}),l}var o={},r=t===Ge;return s(e.dataTypes[0])||!o["*"]&&s("*")}function V(t,e){var i,n,s=pt.ajaxSettings.flatOptions||{};for(n in e)void 0!==e[n]&&((s[n]?t:i||(i={}))[n]=e[n]);return i&&pt.extend(!0,t,i),t}function Q(t,e,i){for(var n,s,o,r,a=t.contents,l=t.dataTypes;"*"===l[0];)l.shift(),void 0===s&&(s=t.mimeType||e.getResponseHeader("Content-Type"));if(s)for(r in a)if(a[r]&&a[r].test(s)){l.unshift(r);break}if(l[0]in i)o=l[0];else{for(r in i){if(!l[0]||t.converters[r+" "+l[0]]){o=r;break}n||(n=r)}o=o||n}return o?(o!==l[0]&&l.unshift(o),i[o]):void 0}function K(t,e,i,n){var s,o,r,a,l,u={},c=t.dataTypes.slice();if(c[1])for(r in t.converters)u[r.toLowerCase()]=t.converters[r];for(o=c.shift();o;)if(t.responseFields[o]&&(i[t.responseFields[o]]=e),!l&&n&&t.dataFilter&&(e=t.dataFilter(e,t.dataType)),l=o,o=c.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(r=u[l+" "+o]||u["* "+o],!r)for(s in u)if(a=s.split(" "),a[1]===o&&(r=u[l+" "+a[0]]||u["* "+a[0]])){r===!0?r=u[s]:u[s]!==!0&&(o=a[0],c.unshift(a[1]));break}if(r!==!0)if(r&&t["throws"])e=r(e);else try{e=r(e)}catch(h){return{state:"parsererror",error:r?h:"No conversion from "+l+" to "+o}}}return{state:"success",data:e}}function X(t){return t.style&&t.style.display||pt.css(t,"display")}function G(t){for(;t&&1===t.nodeType;){if("none"===X(t)||"hidden"===t.type)return!0;t=t.parentNode}return!1}function J(t,e,i,n){var s;if(pt.isArray(e))pt.each(e,function(e,s){i||ii.test(t)?n(t,s):J(t+"["+("object"==typeof s&&null!=s?e:"")+"]",s,i,n)});else if(i||"object"!==pt.type(e))n(t,e);else for(s in e)J(t+"["+s+"]",e[s],i,n)}function Z(){try{return new t.XMLHttpRequest}catch(e){}}function tt(){try{return new t.ActiveXObject("Microsoft.XMLHTTP")}catch(e){}}function et(t){return pt.isWindow(t)?t:9===t.nodeType?t.defaultView||t.parentWindow:!1}var it=[],nt=t.document,st=it.slice,ot=it.concat,rt=it.push,at=it.indexOf,lt={},ut=lt.toString,ct=lt.hasOwnProperty,ht={},dt="1.12.1",pt=function(t,e){return new pt.fn.init(t,e)},ft=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,mt=/^-ms-/,gt=/-([\da-z])/gi,vt=function(t,e){return e.toUpperCase()};pt.fn=pt.prototype={jquery:dt,constructor:pt,selector:"",length:0,toArray:function(){return st.call(this)},get:function(t){return null!=t?0>t?this[t+this.length]:this[t]:st.call(this)},pushStack:function(t){var e=pt.merge(this.constructor(),t);return e.prevObject=this,e.context=this.context,e},each:function(t){return pt.each(this,t)},map:function(t){return this.pushStack(pt.map(this,function(e,i){return t.call(e,i,e)}))},slice:function(){return this.pushStack(st.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(t){var e=this.length,i=+t+(0>t?e:0);return this.pushStack(i>=0&&e>i?[this[i]]:[])},end:function(){return this.prevObject||this.constructor()},push:rt,sort:it.sort,splice:it.splice},pt.extend=pt.fn.extend=function(){var t,e,i,n,s,o,r=arguments[0]||{},a=1,l=arguments.length,u=!1;for("boolean"==typeof r&&(u=r,r=arguments[a]||{},a++),"object"==typeof r||pt.isFunction(r)||(r={}),a===l&&(r=this,a--);l>a;a++)if(null!=(s=arguments[a]))for(n in s)t=r[n],i=s[n],r!==i&&(u&&i&&(pt.isPlainObject(i)||(e=pt.isArray(i)))?(e?(e=!1,o=t&&pt.isArray(t)?t:[]):o=t&&pt.isPlainObject(t)?t:{},r[n]=pt.extend(u,o,i)):void 0!==i&&(r[n]=i));return r},pt.extend({expando:"jQuery"+(dt+Math.random()).replace(/\D/g,""),isReady:!0,error:function(t){throw new Error(t)},noop:function(){},isFunction:function(t){return"function"===pt.type(t)},isArray:Array.isArray||function(t){return"array"===pt.type(t)},isWindow:function(t){return null!=t&&t==t.window},isNumeric:function(t){var e=t&&t.toString();return!pt.isArray(t)&&e-parseFloat(e)+1>=0},isEmptyObject:function(t){var e;for(e in t)return!1;return!0},isPlainObject:function(t){var e;if(!t||"object"!==pt.type(t)||t.nodeType||pt.isWindow(t))return!1;try{if(t.constructor&&!ct.call(t,"constructor")&&!ct.call(t.constructor.prototype,"isPrototypeOf"))return!1}catch(i){return!1}if(!ht.ownFirst)for(e in t)return ct.call(t,e);for(e in t);return void 0===e||ct.call(t,e)},type:function(t){return null==t?t+"":"object"==typeof t||"function"==typeof t?lt[ut.call(t)]||"object":typeof t},globalEval:function(e){e&&pt.trim(e)&&(t.execScript||function(e){t.eval.call(t,e)})(e)},camelCase:function(t){return t.replace(mt,"ms-").replace(gt,vt)},nodeName:function(t,e){return t.nodeName&&t.nodeName.toLowerCase()===e.toLowerCase()},each:function(t,e){var n,s=0;if(i(t))for(n=t.length;n>s&&e.call(t[s],s,t[s])!==!1;s++);else for(s in t)if(e.call(t[s],s,t[s])===!1)break;return t},trim:function(t){return null==t?"":(t+"").replace(ft,"")},makeArray:function(t,e){var n=e||[];return null!=t&&(i(Object(t))?pt.merge(n,"string"==typeof t?[t]:t):rt.call(n,t)),n},inArray:function(t,e,i){var n;if(e){if(at)return at.call(e,t,i);for(n=e.length,i=i?0>i?Math.max(0,n+i):i:0;n>i;i++)if(i in e&&e[i]===t)return i}return-1},merge:function(t,e){for(var i=+e.length,n=0,s=t.length;i>n;)t[s++]=e[n++];if(i!==i)for(;void 0!==e[n];)t[s++]=e[n++];return t.length=s,t},grep:function(t,e,i){for(var n,s=[],o=0,r=t.length,a=!i;r>o;o++)n=!e(t[o],o),n!==a&&s.push(t[o]);return s},map:function(t,e,n){var s,o,r=0,a=[];if(i(t))for(s=t.length;s>r;r++)o=e(t[r],r,n),null!=o&&a.push(o);else for(r in t)o=e(t[r],r,n),null!=o&&a.push(o);return ot.apply([],a)},guid:1,proxy:function(t,e){var i,n,s;return"string"==typeof e&&(s=t[e],e=t,t=s),pt.isFunction(t)?(i=st.call(arguments,2),n=function(){return t.apply(e||this,i.concat(st.call(arguments)))},n.guid=t.guid=t.guid||pt.guid++,n):void 0},now:function(){return+new Date},support:ht}),"function"==typeof Symbol&&(pt.fn[Symbol.iterator]=it[Symbol.iterator]),pt.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(t,e){lt["[object "+e+"]"]=e.toLowerCase()});var yt=/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
function(t){function e(t,e,i,n){var s,o,r,a,l,u,h,p,f=e&&e.ownerDocument,m=e?e.nodeType:9;if(i=i||[],"string"!=typeof t||!t||1!==m&&9!==m&&11!==m)return i;if(!n&&((e?e.ownerDocument||e:L)!==P&&M(e),e=e||P,O)){if(11!==m&&(u=vt.exec(t)))if(s=u[1]){if(9===m){if(!(r=e.getElementById(s)))return i;if(r.id===s)return i.push(r),i}else if(f&&(r=f.getElementById(s))&&F(e,r)&&r.id===s)return i.push(r),i}else{if(u[2])return J.apply(i,e.getElementsByTagName(t)),i;if((s=u[3])&&w.getElementsByClassName&&e.getElementsByClassName)return J.apply(i,e.getElementsByClassName(s)),i}if(w.qsa&&!U[t+" "]&&(!j||!j.test(t))){if(1!==m)f=e,p=t;else if("object"!==e.nodeName.toLowerCase()){for((a=e.getAttribute("id"))?a=a.replace(bt,"\\$&"):e.setAttribute("id",a=z),h=T(t),o=h.length,l=dt.test(a)?"#"+a:"[id='"+a+"']";o--;)h[o]=l+" "+d(h[o]);p=h.join(","),f=yt.test(t)&&c(e.parentNode)||e}if(p)try{return J.apply(i,f.querySelectorAll(p)),i}catch(g){}finally{a===z&&e.removeAttribute("id")}}}return E(t.replace(at,"$1"),e,i,n)}function i(){function t(i,n){return e.push(i+" ")>x.cacheLength&&delete t[e.shift()],t[i+" "]=n}var e=[];return t}function n(t){return t[z]=!0,t}function s(t){var e=P.createElement("div");try{return!!t(e)}catch(i){return!1}finally{e.parentNode&&e.parentNode.removeChild(e),e=null}}function o(t,e){for(var i=t.split("|"),n=i.length;n--;)x.attrHandle[i[n]]=e}function r(t,e){var i=e&&t,n=i&&1===t.nodeType&&1===e.nodeType&&(~e.sourceIndex||V)-(~t.sourceIndex||V);if(n)return n;if(i)for(;i=i.nextSibling;)if(i===e)return-1;return t?1:-1}function a(t){return function(e){var i=e.nodeName.toLowerCase();return"input"===i&&e.type===t}}function l(t){return function(e){var i=e.nodeName.toLowerCase();return("input"===i||"button"===i)&&e.type===t}}function u(t){return n(function(e){return e=+e,n(function(i,n){for(var s,o=t([],i.length,e),r=o.length;r--;)i[s=o[r]]&&(i[s]=!(n[s]=i[s]))})})}function c(t){return t&&"undefined"!=typeof t.getElementsByTagName&&t}function h(){}function d(t){for(var e=0,i=t.length,n="";i>e;e++)n+=t[e].value;return n}function p(t,e,i){var n=e.dir,s=i&&"parentNode"===n,o=R++;return e.first?function(e,i,o){for(;e=e[n];)if(1===e.nodeType||s)return t(e,i,o)}:function(e,i,r){var a,l,u,c=[W,o];if(r){for(;e=e[n];)if((1===e.nodeType||s)&&t(e,i,r))return!0}else for(;e=e[n];)if(1===e.nodeType||s){if(u=e[z]||(e[z]={}),l=u[e.uniqueID]||(u[e.uniqueID]={}),(a=l[n])&&a[0]===W&&a[1]===o)return c[2]=a[2];if(l[n]=c,c[2]=t(e,i,r))return!0}}}function f(t){return t.length>1?function(e,i,n){for(var s=t.length;s--;)if(!t[s](e,i,n))return!1;return!0}:t[0]}function m(t,i,n){for(var s=0,o=i.length;o>s;s++)e(t,i[s],n);return n}function g(t,e,i,n,s){for(var o,r=[],a=0,l=t.length,u=null!=e;l>a;a++)(o=t[a])&&(i&&!i(o,n,s)||(r.push(o),u&&e.push(a)));return r}function v(t,e,i,s,o,r){return s&&!s[z]&&(s=v(s)),o&&!o[z]&&(o=v(o,r)),n(function(n,r,a,l){var u,c,h,d=[],p=[],f=r.length,v=n||m(e||"*",a.nodeType?[a]:a,[]),y=!t||!n&&e?v:g(v,d,t,a,l),b=i?o||(n?t:f||s)?[]:r:y;if(i&&i(y,b,a,l),s)for(u=g(b,p),s(u,[],a,l),c=u.length;c--;)(h=u[c])&&(b[p[c]]=!(y[p[c]]=h));if(n){if(o||t){if(o){for(u=[],c=b.length;c--;)(h=b[c])&&u.push(y[c]=h);o(null,b=[],u,l)}for(c=b.length;c--;)(h=b[c])&&(u=o?tt(n,h):d[c])>-1&&(n[u]=!(r[u]=h))}}else b=g(b===r?b.splice(f,b.length):b),o?o(null,r,b,l):J.apply(r,b)})}function y(t){for(var e,i,n,s=t.length,o=x.relative[t[0].type],r=o||x.relative[" "],a=o?1:0,l=p(function(t){return t===e},r,!0),u=p(function(t){return tt(e,t)>-1},r,!0),c=[function(t,i,n){var s=!o&&(n||i!==S)||((e=i).nodeType?l(t,i,n):u(t,i,n));return e=null,s}];s>a;a++)if(i=x.relative[t[a].type])c=[p(f(c),i)];else{if(i=x.filter[t[a].type].apply(null,t[a].matches),i[z]){for(n=++a;s>n&&!x.relative[t[n].type];n++);return v(a>1&&f(c),a>1&&d(t.slice(0,a-1).concat({value:" "===t[a-2].type?"*":""})).replace(at,"$1"),i,n>a&&y(t.slice(a,n)),s>n&&y(t=t.slice(n)),s>n&&d(t))}c.push(i)}return f(c)}function b(t,i){var s=i.length>0,o=t.length>0,r=function(n,r,a,l,u){var c,h,d,p=0,f="0",m=n&&[],v=[],y=S,b=n||o&&x.find.TAG("*",u),_=W+=null==y?1:Math.random()||.1,w=b.length;for(u&&(S=r===P||r||u);f!==w&&null!=(c=b[f]);f++){if(o&&c){for(h=0,r||c.ownerDocument===P||(M(c),a=!O);d=t[h++];)if(d(c,r||P,a)){l.push(c);break}u&&(W=_)}s&&((c=!d&&c)&&p--,n&&m.push(c))}if(p+=f,s&&f!==p){for(h=0;d=i[h++];)d(m,v,r,a);if(n){if(p>0)for(;f--;)m[f]||v[f]||(v[f]=X.call(l));v=g(v)}J.apply(l,v),u&&!n&&v.length>0&&p+i.length>1&&e.uniqueSort(l)}return u&&(W=_,S=y),m};return s?n(r):r}var _,w,x,C,k,T,D,E,S,A,I,M,P,N,O,j,H,$,F,z="sizzle"+1*new Date,L=t.document,W=0,R=0,q=i(),B=i(),U=i(),Y=function(t,e){return t===e&&(I=!0),0},V=1<<31,Q={}.hasOwnProperty,K=[],X=K.pop,G=K.push,J=K.push,Z=K.slice,tt=function(t,e){for(var i=0,n=t.length;n>i;i++)if(t[i]===e)return i;return-1},et="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",it="[\\x20\\t\\r\\n\\f]",nt="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",st="\\["+it+"*("+nt+")(?:"+it+"*([*^$|!~]?=)"+it+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+nt+"))|)"+it+"*\\]",ot=":("+nt+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+st+")*)|.*)\\)|)",rt=new RegExp(it+"+","g"),at=new RegExp("^"+it+"+|((?:^|[^\\\\])(?:\\\\.)*)"+it+"+$","g"),lt=new RegExp("^"+it+"*,"+it+"*"),ut=new RegExp("^"+it+"*([>+~]|"+it+")"+it+"*"),ct=new RegExp("="+it+"*([^\\]'\"]*?)"+it+"*\\]","g"),ht=new RegExp(ot),dt=new RegExp("^"+nt+"$"),pt={ID:new RegExp("^#("+nt+")"),CLASS:new RegExp("^\\.("+nt+")"),TAG:new RegExp("^("+nt+"|[*])"),ATTR:new RegExp("^"+st),PSEUDO:new RegExp("^"+ot),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+it+"*(even|odd|(([+-]|)(\\d*)n|)"+it+"*(?:([+-]|)"+it+"*(\\d+)|))"+it+"*\\)|)","i"),bool:new RegExp("^(?:"+et+")$","i"),needsContext:new RegExp("^"+it+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+it+"*((?:-\\d)?\\d*)"+it+"*\\)|)(?=[^-]|$)","i")},ft=/^(?:input|select|textarea|button)$/i,mt=/^h\d$/i,gt=/^[^{]+\{\s*\[native \w/,vt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,yt=/[+~]/,bt=/'|\\/g,_t=new RegExp("\\\\([\\da-f]{1,6}"+it+"?|("+it+")|.)","ig"),wt=function(t,e,i){var n="0x"+e-65536;return n!==n||i?e:0>n?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320)},xt=function(){M()};try{J.apply(K=Z.call(L.childNodes),L.childNodes),K[L.childNodes.length].nodeType}catch(Ct){J={apply:K.length?function(t,e){G.apply(t,Z.call(e))}:function(t,e){for(var i=t.length,n=0;t[i++]=e[n++];);t.length=i-1}}}w=e.support={},k=e.isXML=function(t){var e=t&&(t.ownerDocument||t).documentElement;return e?"HTML"!==e.nodeName:!1},M=e.setDocument=function(t){var e,i,n=t?t.ownerDocument||t:L;return n!==P&&9===n.nodeType&&n.documentElement?(P=n,N=P.documentElement,O=!k(P),(i=P.defaultView)&&i.top!==i&&(i.addEventListener?i.addEventListener("unload",xt,!1):i.attachEvent&&i.attachEvent("onunload",xt)),w.attributes=s(function(t){return t.className="i",!t.getAttribute("className")}),w.getElementsByTagName=s(function(t){return t.appendChild(P.createComment("")),!t.getElementsByTagName("*").length}),w.getElementsByClassName=gt.test(P.getElementsByClassName),w.getById=s(function(t){return N.appendChild(t).id=z,!P.getElementsByName||!P.getElementsByName(z).length}),w.getById?(x.find.ID=function(t,e){if("undefined"!=typeof e.getElementById&&O){var i=e.getElementById(t);return i?[i]:[]}},x.filter.ID=function(t){var e=t.replace(_t,wt);return function(t){return t.getAttribute("id")===e}}):(delete x.find.ID,x.filter.ID=function(t){var e=t.replace(_t,wt);return function(t){var i="undefined"!=typeof t.getAttributeNode&&t.getAttributeNode("id");return i&&i.value===e}}),x.find.TAG=w.getElementsByTagName?function(t,e){return"undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t):w.qsa?e.querySelectorAll(t):void 0}:function(t,e){var i,n=[],s=0,o=e.getElementsByTagName(t);if("*"===t){for(;i=o[s++];)1===i.nodeType&&n.push(i);return n}return o},x.find.CLASS=w.getElementsByClassName&&function(t,e){return"undefined"!=typeof e.getElementsByClassName&&O?e.getElementsByClassName(t):void 0},H=[],j=[],(w.qsa=gt.test(P.querySelectorAll))&&(s(function(t){N.appendChild(t).innerHTML="<a id='"+z+"'></a><select id='"+z+"-\r\\' msallowcapture=''><option selected=''></option></select>",t.querySelectorAll("[msallowcapture^='']").length&&j.push("[*^$]="+it+"*(?:''|\"\")"),t.querySelectorAll("[selected]").length||j.push("\\["+it+"*(?:value|"+et+")"),t.querySelectorAll("[id~="+z+"-]").length||j.push("~="),t.querySelectorAll(":checked").length||j.push(":checked"),t.querySelectorAll("a#"+z+"+*").length||j.push(".#.+[+~]")}),s(function(t){var e=P.createElement("input");e.setAttribute("type","hidden"),t.appendChild(e).setAttribute("name","D"),t.querySelectorAll("[name=d]").length&&j.push("name"+it+"*[*^$|!~]?="),t.querySelectorAll(":enabled").length||j.push(":enabled",":disabled"),t.querySelectorAll("*,:x"),j.push(",.*:")})),(w.matchesSelector=gt.test($=N.matches||N.webkitMatchesSelector||N.mozMatchesSelector||N.oMatchesSelector||N.msMatchesSelector))&&s(function(t){w.disconnectedMatch=$.call(t,"div"),$.call(t,"[s!='']:x"),H.push("!=",ot)}),j=j.length&&new RegExp(j.join("|")),H=H.length&&new RegExp(H.join("|")),e=gt.test(N.compareDocumentPosition),F=e||gt.test(N.contains)?function(t,e){var i=9===t.nodeType?t.documentElement:t,n=e&&e.parentNode;return t===n||!(!n||1!==n.nodeType||!(i.contains?i.contains(n):t.compareDocumentPosition&&16&t.compareDocumentPosition(n)))}:function(t,e){if(e)for(;e=e.parentNode;)if(e===t)return!0;return!1},Y=e?function(t,e){if(t===e)return I=!0,0;var i=!t.compareDocumentPosition-!e.compareDocumentPosition;return i?i:(i=(t.ownerDocument||t)===(e.ownerDocument||e)?t.compareDocumentPosition(e):1,1&i||!w.sortDetached&&e.compareDocumentPosition(t)===i?t===P||t.ownerDocument===L&&F(L,t)?-1:e===P||e.ownerDocument===L&&F(L,e)?1:A?tt(A,t)-tt(A,e):0:4&i?-1:1)}:function(t,e){if(t===e)return I=!0,0;var i,n=0,s=t.parentNode,o=e.parentNode,a=[t],l=[e];if(!s||!o)return t===P?-1:e===P?1:s?-1:o?1:A?tt(A,t)-tt(A,e):0;if(s===o)return r(t,e);for(i=t;i=i.parentNode;)a.unshift(i);for(i=e;i=i.parentNode;)l.unshift(i);for(;a[n]===l[n];)n++;return n?r(a[n],l[n]):a[n]===L?-1:l[n]===L?1:0},P):P},e.matches=function(t,i){return e(t,null,null,i)},e.matchesSelector=function(t,i){if((t.ownerDocument||t)!==P&&M(t),i=i.replace(ct,"='$1']"),w.matchesSelector&&O&&!U[i+" "]&&(!H||!H.test(i))&&(!j||!j.test(i)))try{var n=$.call(t,i);if(n||w.disconnectedMatch||t.document&&11!==t.document.nodeType)return n}catch(s){}return e(i,P,null,[t]).length>0},e.contains=function(t,e){return(t.ownerDocument||t)!==P&&M(t),F(t,e)},e.attr=function(t,e){(t.ownerDocument||t)!==P&&M(t);var i=x.attrHandle[e.toLowerCase()],n=i&&Q.call(x.attrHandle,e.toLowerCase())?i(t,e,!O):void 0;return void 0!==n?n:w.attributes||!O?t.getAttribute(e):(n=t.getAttributeNode(e))&&n.specified?n.value:null},e.error=function(t){throw new Error("Syntax error, unrecognized expression: "+t)},e.uniqueSort=function(t){var e,i=[],n=0,s=0;if(I=!w.detectDuplicates,A=!w.sortStable&&t.slice(0),t.sort(Y),I){for(;e=t[s++];)e===t[s]&&(n=i.push(s));for(;n--;)t.splice(i[n],1)}return A=null,t},C=e.getText=function(t){var e,i="",n=0,s=t.nodeType;if(s){if(1===s||9===s||11===s){if("string"==typeof t.textContent)return t.textContent;for(t=t.firstChild;t;t=t.nextSibling)i+=C(t)}else if(3===s||4===s)return t.nodeValue}else for(;e=t[n++];)i+=C(e);return i},x=e.selectors={cacheLength:50,createPseudo:n,match:pt,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(t){return t[1]=t[1].replace(_t,wt),t[3]=(t[3]||t[4]||t[5]||"").replace(_t,wt),"~="===t[2]&&(t[3]=" "+t[3]+" "),t.slice(0,4)},CHILD:function(t){return t[1]=t[1].toLowerCase(),"nth"===t[1].slice(0,3)?(t[3]||e.error(t[0]),t[4]=+(t[4]?t[5]+(t[6]||1):2*("even"===t[3]||"odd"===t[3])),t[5]=+(t[7]+t[8]||"odd"===t[3])):t[3]&&e.error(t[0]),t},PSEUDO:function(t){var e,i=!t[6]&&t[2];return pt.CHILD.test(t[0])?null:(t[3]?t[2]=t[4]||t[5]||"":i&&ht.test(i)&&(e=T(i,!0))&&(e=i.indexOf(")",i.length-e)-i.length)&&(t[0]=t[0].slice(0,e),t[2]=i.slice(0,e)),t.slice(0,3))}},filter:{TAG:function(t){var e=t.replace(_t,wt).toLowerCase();return"*"===t?function(){return!0}:function(t){return t.nodeName&&t.nodeName.toLowerCase()===e}},CLASS:function(t){var e=q[t+" "];return e||(e=new RegExp("(^|"+it+")"+t+"("+it+"|$)"))&&q(t,function(t){return e.test("string"==typeof t.className&&t.className||"undefined"!=typeof t.getAttribute&&t.getAttribute("class")||"")})},ATTR:function(t,i,n){return function(s){var o=e.attr(s,t);return null==o?"!="===i:i?(o+="","="===i?o===n:"!="===i?o!==n:"^="===i?n&&0===o.indexOf(n):"*="===i?n&&o.indexOf(n)>-1:"$="===i?n&&o.slice(-n.length)===n:"~="===i?(" "+o.replace(rt," ")+" ").indexOf(n)>-1:"|="===i?o===n||o.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(t,e,i,n,s){var o="nth"!==t.slice(0,3),r="last"!==t.slice(-4),a="of-type"===e;return 1===n&&0===s?function(t){return!!t.parentNode}:function(e,i,l){var u,c,h,d,p,f,m=o!==r?"nextSibling":"previousSibling",g=e.parentNode,v=a&&e.nodeName.toLowerCase(),y=!l&&!a,b=!1;if(g){if(o){for(;m;){for(d=e;d=d[m];)if(a?d.nodeName.toLowerCase()===v:1===d.nodeType)return!1;f=m="only"===t&&!f&&"nextSibling"}return!0}if(f=[r?g.firstChild:g.lastChild],r&&y){for(d=g,h=d[z]||(d[z]={}),c=h[d.uniqueID]||(h[d.uniqueID]={}),u=c[t]||[],p=u[0]===W&&u[1],b=p&&u[2],d=p&&g.childNodes[p];d=++p&&d&&d[m]||(b=p=0)||f.pop();)if(1===d.nodeType&&++b&&d===e){c[t]=[W,p,b];break}}else if(y&&(d=e,h=d[z]||(d[z]={}),c=h[d.uniqueID]||(h[d.uniqueID]={}),u=c[t]||[],p=u[0]===W&&u[1],b=p),b===!1)for(;(d=++p&&d&&d[m]||(b=p=0)||f.pop())&&((a?d.nodeName.toLowerCase()!==v:1!==d.nodeType)||!++b||(y&&(h=d[z]||(d[z]={}),c=h[d.uniqueID]||(h[d.uniqueID]={}),c[t]=[W,b]),d!==e)););return b-=s,b===n||b%n===0&&b/n>=0}}},PSEUDO:function(t,i){var s,o=x.pseudos[t]||x.setFilters[t.toLowerCase()]||e.error("unsupported pseudo: "+t);return o[z]?o(i):o.length>1?(s=[t,t,"",i],x.setFilters.hasOwnProperty(t.toLowerCase())?n(function(t,e){for(var n,s=o(t,i),r=s.length;r--;)n=tt(t,s[r]),t[n]=!(e[n]=s[r])}):function(t){return o(t,0,s)}):o}},pseudos:{not:n(function(t){var e=[],i=[],s=D(t.replace(at,"$1"));return s[z]?n(function(t,e,i,n){for(var o,r=s(t,null,n,[]),a=t.length;a--;)(o=r[a])&&(t[a]=!(e[a]=o))}):function(t,n,o){return e[0]=t,s(e,null,o,i),e[0]=null,!i.pop()}}),has:n(function(t){return function(i){return e(t,i).length>0}}),contains:n(function(t){return t=t.replace(_t,wt),function(e){return(e.textContent||e.innerText||C(e)).indexOf(t)>-1}}),lang:n(function(t){return dt.test(t||"")||e.error("unsupported lang: "+t),t=t.replace(_t,wt).toLowerCase(),function(e){var i;do if(i=O?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return i=i.toLowerCase(),i===t||0===i.indexOf(t+"-");while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var i=t.location&&t.location.hash;return i&&i.slice(1)===e.id},root:function(t){return t===N},focus:function(t){return t===P.activeElement&&(!P.hasFocus||P.hasFocus())&&!!(t.type||t.href||~t.tabIndex)},enabled:function(t){return t.disabled===!1},disabled:function(t){return t.disabled===!0},checked:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&!!t.checked||"option"===e&&!!t.selected},selected:function(t){return t.parentNode&&t.parentNode.selectedIndex,t.selected===!0},empty:function(t){for(t=t.firstChild;t;t=t.nextSibling)if(t.nodeType<6)return!1;return!0},parent:function(t){return!x.pseudos.empty(t)},header:function(t){return mt.test(t.nodeName)},input:function(t){return ft.test(t.nodeName)},button:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&"button"===t.type||"button"===e},text:function(t){var e;return"input"===t.nodeName.toLowerCase()&&"text"===t.type&&(null==(e=t.getAttribute("type"))||"text"===e.toLowerCase())},first:u(function(){return[0]}),last:u(function(t,e){return[e-1]}),eq:u(function(t,e,i){return[0>i?i+e:i]}),even:u(function(t,e){for(var i=0;e>i;i+=2)t.push(i);return t}),odd:u(function(t,e){for(var i=1;e>i;i+=2)t.push(i);return t}),lt:u(function(t,e,i){for(var n=0>i?i+e:i;--n>=0;)t.push(n);return t}),gt:u(function(t,e,i){for(var n=0>i?i+e:i;++n<e;)t.push(n);return t})}},x.pseudos.nth=x.pseudos.eq;for(_ in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})x.pseudos[_]=a(_);for(_ in{submit:!0,reset:!0})x.pseudos[_]=l(_);return h.prototype=x.filters=x.pseudos,x.setFilters=new h,T=e.tokenize=function(t,i){var n,s,o,r,a,l,u,c=B[t+" "];if(c)return i?0:c.slice(0);for(a=t,l=[],u=x.preFilter;a;){n&&!(s=lt.exec(a))||(s&&(a=a.slice(s[0].length)||a),l.push(o=[])),n=!1,(s=ut.exec(a))&&(n=s.shift(),o.push({value:n,type:s[0].replace(at," ")}),a=a.slice(n.length));for(r in x.filter)!(s=pt[r].exec(a))||u[r]&&!(s=u[r](s))||(n=s.shift(),o.push({value:n,type:r,matches:s}),a=a.slice(n.length));if(!n)break}return i?a.length:a?e.error(t):B(t,l).slice(0)},D=e.compile=function(t,e){var i,n=[],s=[],o=U[t+" "];if(!o){for(e||(e=T(t)),i=e.length;i--;)o=y(e[i]),o[z]?n.push(o):s.push(o);o=U(t,b(s,n)),o.selector=t}return o},E=e.select=function(t,e,i,n){var s,o,r,a,l,u="function"==typeof t&&t,h=!n&&T(t=u.selector||t);if(i=i||[],1===h.length){if(o=h[0]=h[0].slice(0),o.length>2&&"ID"===(r=o[0]).type&&w.getById&&9===e.nodeType&&O&&x.relative[o[1].type]){if(e=(x.find.ID(r.matches[0].replace(_t,wt),e)||[])[0],!e)return i;u&&(e=e.parentNode),t=t.slice(o.shift().value.length)}for(s=pt.needsContext.test(t)?0:o.length;s--&&(r=o[s],!x.relative[a=r.type]);)if((l=x.find[a])&&(n=l(r.matches[0].replace(_t,wt),yt.test(o[0].type)&&c(e.parentNode)||e))){if(o.splice(s,1),t=n.length&&d(o),!t)return J.apply(i,n),i;break}}return(u||D(t,h))(n,e,!O,i,!e||yt.test(t)&&c(e.parentNode)||e),i},w.sortStable=z.split("").sort(Y).join("")===z,w.detectDuplicates=!!I,M(),w.sortDetached=s(function(t){return 1&t.compareDocumentPosition(P.createElement("div"))}),s(function(t){return t.innerHTML="<a href='#'></a>","#"===t.firstChild.getAttribute("href")})||o("type|href|height|width",function(t,e,i){return i?void 0:t.getAttribute(e,"type"===e.toLowerCase()?1:2)}),w.attributes&&s(function(t){return t.innerHTML="<input/>",t.firstChild.setAttribute("value",""),""===t.firstChild.getAttribute("value")})||o("value",function(t,e,i){return i||"input"!==t.nodeName.toLowerCase()?void 0:t.defaultValue}),s(function(t){return null==t.getAttribute("disabled")})||o(et,function(t,e,i){var n;return i?void 0:t[e]===!0?e.toLowerCase():(n=t.getAttributeNode(e))&&n.specified?n.value:null}),e}(t);pt.find=yt,pt.expr=yt.selectors,pt.expr[":"]=pt.expr.pseudos,pt.uniqueSort=pt.unique=yt.uniqueSort,pt.text=yt.getText,pt.isXMLDoc=yt.isXML,pt.contains=yt.contains;var bt=function(t,e,i){for(var n=[],s=void 0!==i;(t=t[e])&&9!==t.nodeType;)if(1===t.nodeType){if(s&&pt(t).is(i))break;n.push(t)}return n},_t=function(t,e){for(var i=[];t;t=t.nextSibling)1===t.nodeType&&t!==e&&i.push(t);return i},wt=pt.expr.match.needsContext,xt=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,Ct=/^.[^:#\[\.,]*$/;pt.filter=function(t,e,i){var n=e[0];return i&&(t=":not("+t+")"),1===e.length&&1===n.nodeType?pt.find.matchesSelector(n,t)?[n]:[]:pt.find.matches(t,pt.grep(e,function(t){return 1===t.nodeType}))},pt.fn.extend({find:function(t){var e,i=[],n=this,s=n.length;if("string"!=typeof t)return this.pushStack(pt(t).filter(function(){for(e=0;s>e;e++)if(pt.contains(n[e],this))return!0}));for(e=0;s>e;e++)pt.find(t,n[e],i);return i=this.pushStack(s>1?pt.unique(i):i),i.selector=this.selector?this.selector+" "+t:t,i},filter:function(t){return this.pushStack(n(this,t||[],!1))},not:function(t){return this.pushStack(n(this,t||[],!0))},is:function(t){return!!n(this,"string"==typeof t&&wt.test(t)?pt(t):t||[],!1).length}});var kt,Tt=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,Dt=pt.fn.init=function(t,e,i){var n,s;if(!t)return this;if(i=i||kt,"string"==typeof t){if(n="<"===t.charAt(0)&&">"===t.charAt(t.length-1)&&t.length>=3?[null,t,null]:Tt.exec(t),!n||!n[1]&&e)return!e||e.jquery?(e||i).find(t):this.constructor(e).find(t);if(n[1]){if(e=e instanceof pt?e[0]:e,pt.merge(this,pt.parseHTML(n[1],e&&e.nodeType?e.ownerDocument||e:nt,!0)),xt.test(n[1])&&pt.isPlainObject(e))for(n in e)pt.isFunction(this[n])?this[n](e[n]):this.attr(n,e[n]);return this}if(s=nt.getElementById(n[2]),s&&s.parentNode){if(s.id!==n[2])return kt.find(t);this.length=1,this[0]=s}return this.context=nt,this.selector=t,this}return t.nodeType?(this.context=this[0]=t,this.length=1,this):pt.isFunction(t)?"undefined"!=typeof i.ready?i.ready(t):t(pt):(void 0!==t.selector&&(this.selector=t.selector,this.context=t.context),pt.makeArray(t,this))};Dt.prototype=pt.fn,kt=pt(nt);var Et=/^(?:parents|prev(?:Until|All))/,St={children:!0,contents:!0,next:!0,prev:!0};pt.fn.extend({has:function(t){var e,i=pt(t,this),n=i.length;return this.filter(function(){for(e=0;n>e;e++)if(pt.contains(this,i[e]))return!0})},closest:function(t,e){for(var i,n=0,s=this.length,o=[],r=wt.test(t)||"string"!=typeof t?pt(t,e||this.context):0;s>n;n++)for(i=this[n];i&&i!==e;i=i.parentNode)if(i.nodeType<11&&(r?r.index(i)>-1:1===i.nodeType&&pt.find.matchesSelector(i,t))){o.push(i);break}return this.pushStack(o.length>1?pt.uniqueSort(o):o)},index:function(t){return t?"string"==typeof t?pt.inArray(this[0],pt(t)):pt.inArray(t.jquery?t[0]:t,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(t,e){return this.pushStack(pt.uniqueSort(pt.merge(this.get(),pt(t,e))))},addBack:function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}}),pt.each({parent:function(t){var e=t.parentNode;return e&&11!==e.nodeType?e:null},parents:function(t){return bt(t,"parentNode")},parentsUntil:function(t,e,i){return bt(t,"parentNode",i)},next:function(t){return s(t,"nextSibling")},prev:function(t){return s(t,"previousSibling")},nextAll:function(t){return bt(t,"nextSibling")},prevAll:function(t){return bt(t,"previousSibling")},nextUntil:function(t,e,i){return bt(t,"nextSibling",i)},prevUntil:function(t,e,i){return bt(t,"previousSibling",i)},siblings:function(t){return _t((t.parentNode||{}).firstChild,t)},children:function(t){return _t(t.firstChild)},contents:function(t){return pt.nodeName(t,"iframe")?t.contentDocument||t.contentWindow.document:pt.merge([],t.childNodes)}},function(t,e){pt.fn[t]=function(i,n){var s=pt.map(this,e,i);return"Until"!==t.slice(-5)&&(n=i),n&&"string"==typeof n&&(s=pt.filter(n,s)),this.length>1&&(St[t]||(s=pt.uniqueSort(s)),Et.test(t)&&(s=s.reverse())),this.pushStack(s)}});var At=/\S+/g;pt.Callbacks=function(t){t="string"==typeof t?o(t):pt.extend({},t);var e,i,n,s,r=[],a=[],l=-1,u=function(){for(s=t.once,n=e=!0;a.length;l=-1)for(i=a.shift();++l<r.length;)r[l].apply(i[0],i[1])===!1&&t.stopOnFalse&&(l=r.length,i=!1);t.memory||(i=!1),e=!1,s&&(r=i?[]:"")},c={add:function(){return r&&(i&&!e&&(l=r.length-1,a.push(i)),function n(e){pt.each(e,function(e,i){pt.isFunction(i)?t.unique&&c.has(i)||r.push(i):i&&i.length&&"string"!==pt.type(i)&&n(i)})}(arguments),i&&!e&&u()),this},remove:function(){return pt.each(arguments,function(t,e){for(var i;(i=pt.inArray(e,r,i))>-1;)r.splice(i,1),l>=i&&l--}),this},has:function(t){return t?pt.inArray(t,r)>-1:r.length>0},empty:function(){return r&&(r=[]),this},disable:function(){return s=a=[],r=i="",this},disabled:function(){return!r},lock:function(){return s=!0,i||c.disable(),this},locked:function(){return!!s},fireWith:function(t,i){return s||(i=i||[],i=[t,i.slice?i.slice():i],a.push(i),e||u()),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!n}};return c},pt.extend({Deferred:function(t){var e=[["resolve","done",pt.Callbacks("once memory"),"resolved"],["reject","fail",pt.Callbacks("once memory"),"rejected"],["notify","progress",pt.Callbacks("memory")]],i="pending",n={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},then:function(){var t=arguments;return pt.Deferred(function(i){pt.each(e,function(e,o){var r=pt.isFunction(t[e])&&t[e];s[o[1]](function(){var t=r&&r.apply(this,arguments);t&&pt.isFunction(t.promise)?t.promise().progress(i.notify).done(i.resolve).fail(i.reject):i[o[0]+"With"](this===n?i.promise():this,r?[t]:arguments)})}),t=null}).promise()},promise:function(t){return null!=t?pt.extend(t,n):n}},s={};return n.pipe=n.then,pt.each(e,function(t,o){var r=o[2],a=o[3];n[o[1]]=r.add,a&&r.add(function(){i=a},e[1^t][2].disable,e[2][2].lock),s[o[0]]=function(){return s[o[0]+"With"](this===s?n:this,arguments),this},s[o[0]+"With"]=r.fireWith}),n.promise(s),t&&t.call(s,s),s},when:function(t){var e,i,n,s=0,o=st.call(arguments),r=o.length,a=1!==r||t&&pt.isFunction(t.promise)?r:0,l=1===a?t:pt.Deferred(),u=function(t,i,n){return function(s){i[t]=this,n[t]=arguments.length>1?st.call(arguments):s,n===e?l.notifyWith(i,n):--a||l.resolveWith(i,n)}};if(r>1)for(e=new Array(r),i=new Array(r),n=new Array(r);r>s;s++)o[s]&&pt.isFunction(o[s].promise)?o[s].promise().progress(u(s,i,e)).done(u(s,n,o)).fail(l.reject):--a;return a||l.resolveWith(n,o),l.promise()}});var It;pt.fn.ready=function(t){return pt.ready.promise().done(t),this},pt.extend({isReady:!1,readyWait:1,holdReady:function(t){t?pt.readyWait++:pt.ready(!0)},ready:function(t){(t===!0?--pt.readyWait:pt.isReady)||(pt.isReady=!0,t!==!0&&--pt.readyWait>0||(It.resolveWith(nt,[pt]),pt.fn.triggerHandler&&(pt(nt).triggerHandler("ready"),pt(nt).off("ready"))))}}),pt.ready.promise=function(e){if(!It)if(It=pt.Deferred(),"complete"===nt.readyState||"loading"!==nt.readyState&&!nt.documentElement.doScroll)t.setTimeout(pt.ready);else if(nt.addEventListener)nt.addEventListener("DOMContentLoaded",a),t.addEventListener("load",a);else{nt.attachEvent("onreadystatechange",a),t.attachEvent("onload",a);var i=!1;try{i=null==t.frameElement&&nt.documentElement}catch(n){}i&&i.doScroll&&!function s(){if(!pt.isReady){try{i.doScroll("left")}catch(e){return t.setTimeout(s,50)}r(),pt.ready()}}()}return It.promise(e)},pt.ready.promise();var Mt;for(Mt in pt(ht))break;ht.ownFirst="0"===Mt,ht.inlineBlockNeedsLayout=!1,pt(function(){var t,e,i,n;i=nt.getElementsByTagName("body")[0],i&&i.style&&(e=nt.createElement("div"),n=nt.createElement("div"),n.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",i.appendChild(n).appendChild(e),"undefined"!=typeof e.style.zoom&&(e.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",ht.inlineBlockNeedsLayout=t=3===e.offsetWidth,t&&(i.style.zoom=1)),i.removeChild(n))}),function(){var t=nt.createElement("div");ht.deleteExpando=!0;try{delete t.test}catch(e){ht.deleteExpando=!1}t=null}();var Pt=function(t){var e=pt.noData[(t.nodeName+" ").toLowerCase()],i=+t.nodeType||1;return 1!==i&&9!==i?!1:!e||e!==!0&&t.getAttribute("classid")===e},Nt=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Ot=/([A-Z])/g;pt.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(t){return t=t.nodeType?pt.cache[t[pt.expando]]:t[pt.expando],!!t&&!u(t)},data:function(t,e,i){return c(t,e,i)},removeData:function(t,e){return h(t,e)},_data:function(t,e,i){return c(t,e,i,!0)},_removeData:function(t,e){return h(t,e,!0)}}),pt.fn.extend({data:function(t,e){var i,n,s,o=this[0],r=o&&o.attributes;if(void 0===t){if(this.length&&(s=pt.data(o),1===o.nodeType&&!pt._data(o,"parsedAttrs"))){for(i=r.length;i--;)r[i]&&(n=r[i].name,0===n.indexOf("data-")&&(n=pt.camelCase(n.slice(5)),l(o,n,s[n])));pt._data(o,"parsedAttrs",!0)}return s}return"object"==typeof t?this.each(function(){pt.data(this,t)}):arguments.length>1?this.each(function(){pt.data(this,t,e)}):o?l(o,t,pt.data(o,t)):void 0},removeData:function(t){return this.each(function(){pt.removeData(this,t)})}}),pt.extend({queue:function(t,e,i){var n;return t?(e=(e||"fx")+"queue",n=pt._data(t,e),i&&(!n||pt.isArray(i)?n=pt._data(t,e,pt.makeArray(i)):n.push(i)),n||[]):void 0},dequeue:function(t,e){e=e||"fx";var i=pt.queue(t,e),n=i.length,s=i.shift(),o=pt._queueHooks(t,e),r=function(){pt.dequeue(t,e)};"inprogress"===s&&(s=i.shift(),n--),s&&("fx"===e&&i.unshift("inprogress"),delete o.stop,s.call(t,r,o)),!n&&o&&o.empty.fire()},_queueHooks:function(t,e){var i=e+"queueHooks";return pt._data(t,i)||pt._data(t,i,{empty:pt.Callbacks("once memory").add(function(){pt._removeData(t,e+"queue"),pt._removeData(t,i)})})}}),pt.fn.extend({queue:function(t,e){var i=2;return"string"!=typeof t&&(e=t,t="fx",i--),arguments.length<i?pt.queue(this[0],t):void 0===e?this:this.each(function(){var i=pt.queue(this,t,e);pt._queueHooks(this,t),"fx"===t&&"inprogress"!==i[0]&&pt.dequeue(this,t)})},dequeue:function(t){return this.each(function(){pt.dequeue(this,t)})},clearQueue:function(t){return this.queue(t||"fx",[])},promise:function(t,e){var i,n=1,s=pt.Deferred(),o=this,r=this.length,a=function(){--n||s.resolveWith(o,[o])};for("string"!=typeof t&&(e=t,t=void 0),t=t||"fx";r--;)i=pt._data(o[r],t+"queueHooks"),i&&i.empty&&(n++,i.empty.add(a));return a(),s.promise(e)}}),function(){var t;ht.shrinkWrapBlocks=function(){if(null!=t)return t;t=!1;var e,i,n;return i=nt.getElementsByTagName("body")[0],i&&i.style?(e=nt.createElement("div"),n=nt.createElement("div"),n.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",i.appendChild(n).appendChild(e),"undefined"!=typeof e.style.zoom&&(e.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",e.appendChild(nt.createElement("div")).style.width="5px",t=3!==e.offsetWidth),i.removeChild(n),t):void 0}}();var jt=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Ht=new RegExp("^(?:([+-])=|)("+jt+")([a-z%]*)$","i"),$t=["Top","Right","Bottom","Left"],Ft=function(t,e){return t=e||t,"none"===pt.css(t,"display")||!pt.contains(t.ownerDocument,t)},zt=function(t,e,i,n,s,o,r){var a=0,l=t.length,u=null==i;if("object"===pt.type(i)){s=!0;for(a in i)zt(t,e,a,i[a],!0,o,r)}else if(void 0!==n&&(s=!0,pt.isFunction(n)||(r=!0),u&&(r?(e.call(t,n),e=null):(u=e,e=function(t,e,i){return u.call(pt(t),i)})),e))for(;l>a;a++)e(t[a],i,r?n:n.call(t[a],a,e(t[a],i)));return s?t:u?e.call(t):l?e(t[0],i):o},Lt=/^(?:checkbox|radio)$/i,Wt=/<([\w:-]+)/,Rt=/^$|\/(?:java|ecma)script/i,qt=/^\s+/,Bt="abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";!function(){var t=nt.createElement("div"),e=nt.createDocumentFragment(),i=nt.createElement("input");t.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",ht.leadingWhitespace=3===t.firstChild.nodeType,ht.tbody=!t.getElementsByTagName("tbody").length,ht.htmlSerialize=!!t.getElementsByTagName("link").length,ht.html5Clone="<:nav></:nav>"!==nt.createElement("nav").cloneNode(!0).outerHTML,i.type="checkbox",i.checked=!0,e.appendChild(i),ht.appendChecked=i.checked,t.innerHTML="<textarea>x</textarea>",ht.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue,e.appendChild(t),i=nt.createElement("input"),i.setAttribute("type","radio"),i.setAttribute("checked","checked"),i.setAttribute("name","t"),t.appendChild(i),ht.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,ht.noCloneEvent=!!t.addEventListener,t[pt.expando]=1,ht.attributes=!t.getAttribute(pt.expando)}();var Ut={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:ht.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]};Ut.optgroup=Ut.option,Ut.tbody=Ut.tfoot=Ut.colgroup=Ut.caption=Ut.thead,Ut.th=Ut.td;var Yt=/<|&#?\w+;/,Vt=/<tbody/i;!function(){var e,i,n=nt.createElement("div");for(e in{submit:!0,change:!0,focusin:!0})i="on"+e,(ht[e]=i in t)||(n.setAttribute(i,"t"),ht[e]=n.attributes[i].expando===!1);n=null}();var Qt=/^(?:input|select|textarea)$/i,Kt=/^key/,Xt=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Gt=/^(?:focusinfocus|focusoutblur)$/,Jt=/^([^.]*)(?:\.(.+)|)/;pt.event={global:{},add:function(t,e,i,n,s){var o,r,a,l,u,c,h,d,p,f,m,g=pt._data(t);if(g){for(i.handler&&(l=i,i=l.handler,s=l.selector),i.guid||(i.guid=pt.guid++),(r=g.events)||(r=g.events={}),(c=g.handle)||(c=g.handle=function(t){return"undefined"==typeof pt||t&&pt.event.triggered===t.type?void 0:pt.event.dispatch.apply(c.elem,arguments)},c.elem=t),e=(e||"").match(At)||[""],a=e.length;a--;)o=Jt.exec(e[a])||[],p=m=o[1],f=(o[2]||"").split(".").sort(),p&&(u=pt.event.special[p]||{},p=(s?u.delegateType:u.bindType)||p,u=pt.event.special[p]||{},h=pt.extend({type:p,origType:m,data:n,handler:i,guid:i.guid,
selector:s,needsContext:s&&pt.expr.match.needsContext.test(s),namespace:f.join(".")},l),(d=r[p])||(d=r[p]=[],d.delegateCount=0,u.setup&&u.setup.call(t,n,f,c)!==!1||(t.addEventListener?t.addEventListener(p,c,!1):t.attachEvent&&t.attachEvent("on"+p,c))),u.add&&(u.add.call(t,h),h.handler.guid||(h.handler.guid=i.guid)),s?d.splice(d.delegateCount++,0,h):d.push(h),pt.event.global[p]=!0);t=null}},remove:function(t,e,i,n,s){var o,r,a,l,u,c,h,d,p,f,m,g=pt.hasData(t)&&pt._data(t);if(g&&(c=g.events)){for(e=(e||"").match(At)||[""],u=e.length;u--;)if(a=Jt.exec(e[u])||[],p=m=a[1],f=(a[2]||"").split(".").sort(),p){for(h=pt.event.special[p]||{},p=(n?h.delegateType:h.bindType)||p,d=c[p]||[],a=a[2]&&new RegExp("(^|\\.)"+f.join("\\.(?:.*\\.|)")+"(\\.|$)"),l=o=d.length;o--;)r=d[o],!s&&m!==r.origType||i&&i.guid!==r.guid||a&&!a.test(r.namespace)||n&&n!==r.selector&&("**"!==n||!r.selector)||(d.splice(o,1),r.selector&&d.delegateCount--,h.remove&&h.remove.call(t,r));l&&!d.length&&(h.teardown&&h.teardown.call(t,f,g.handle)!==!1||pt.removeEvent(t,p,g.handle),delete c[p])}else for(p in c)pt.event.remove(t,p+e[u],i,n,!0);pt.isEmptyObject(c)&&(delete g.handle,pt._removeData(t,"events"))}},trigger:function(e,i,n,s){var o,r,a,l,u,c,h,d=[n||nt],p=ct.call(e,"type")?e.type:e,f=ct.call(e,"namespace")?e.namespace.split("."):[];if(a=c=n=n||nt,3!==n.nodeType&&8!==n.nodeType&&!Gt.test(p+pt.event.triggered)&&(p.indexOf(".")>-1&&(f=p.split("."),p=f.shift(),f.sort()),r=p.indexOf(":")<0&&"on"+p,e=e[pt.expando]?e:new pt.Event(p,"object"==typeof e&&e),e.isTrigger=s?2:3,e.namespace=f.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+f.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),i=null==i?[e]:pt.makeArray(i,[e]),u=pt.event.special[p]||{},s||!u.trigger||u.trigger.apply(n,i)!==!1)){if(!s&&!u.noBubble&&!pt.isWindow(n)){for(l=u.delegateType||p,Gt.test(l+p)||(a=a.parentNode);a;a=a.parentNode)d.push(a),c=a;c===(n.ownerDocument||nt)&&d.push(c.defaultView||c.parentWindow||t)}for(h=0;(a=d[h++])&&!e.isPropagationStopped();)e.type=h>1?l:u.bindType||p,o=(pt._data(a,"events")||{})[e.type]&&pt._data(a,"handle"),o&&o.apply(a,i),o=r&&a[r],o&&o.apply&&Pt(a)&&(e.result=o.apply(a,i),e.result===!1&&e.preventDefault());if(e.type=p,!s&&!e.isDefaultPrevented()&&(!u._default||u._default.apply(d.pop(),i)===!1)&&Pt(n)&&r&&n[p]&&!pt.isWindow(n)){c=n[r],c&&(n[r]=null),pt.event.triggered=p;try{n[p]()}catch(m){}pt.event.triggered=void 0,c&&(n[r]=c)}return e.result}},dispatch:function(t){t=pt.event.fix(t);var e,i,n,s,o,r=[],a=st.call(arguments),l=(pt._data(this,"events")||{})[t.type]||[],u=pt.event.special[t.type]||{};if(a[0]=t,t.delegateTarget=this,!u.preDispatch||u.preDispatch.call(this,t)!==!1){for(r=pt.event.handlers.call(this,t,l),e=0;(s=r[e++])&&!t.isPropagationStopped();)for(t.currentTarget=s.elem,i=0;(o=s.handlers[i++])&&!t.isImmediatePropagationStopped();)t.rnamespace&&!t.rnamespace.test(o.namespace)||(t.handleObj=o,t.data=o.data,n=((pt.event.special[o.origType]||{}).handle||o.handler).apply(s.elem,a),void 0!==n&&(t.result=n)===!1&&(t.preventDefault(),t.stopPropagation()));return u.postDispatch&&u.postDispatch.call(this,t),t.result}},handlers:function(t,e){var i,n,s,o,r=[],a=e.delegateCount,l=t.target;if(a&&l.nodeType&&("click"!==t.type||isNaN(t.button)||t.button<1))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==t.type)){for(n=[],i=0;a>i;i++)o=e[i],s=o.selector+" ",void 0===n[s]&&(n[s]=o.needsContext?pt(s,this).index(l)>-1:pt.find(s,this,null,[l]).length),n[s]&&n.push(o);n.length&&r.push({elem:l,handlers:n})}return a<e.length&&r.push({elem:this,handlers:e.slice(a)}),r},fix:function(t){if(t[pt.expando])return t;var e,i,n,s=t.type,o=t,r=this.fixHooks[s];for(r||(this.fixHooks[s]=r=Xt.test(s)?this.mouseHooks:Kt.test(s)?this.keyHooks:{}),n=r.props?this.props.concat(r.props):this.props,t=new pt.Event(o),e=n.length;e--;)i=n[e],t[i]=o[i];return t.target||(t.target=o.srcElement||nt),3===t.target.nodeType&&(t.target=t.target.parentNode),t.metaKey=!!t.metaKey,r.filter?r.filter(t,o):t},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(t,e){return null==t.which&&(t.which=null!=e.charCode?e.charCode:e.keyCode),t}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(t,e){var i,n,s,o=e.button,r=e.fromElement;return null==t.pageX&&null!=e.clientX&&(n=t.target.ownerDocument||nt,s=n.documentElement,i=n.body,t.pageX=e.clientX+(s&&s.scrollLeft||i&&i.scrollLeft||0)-(s&&s.clientLeft||i&&i.clientLeft||0),t.pageY=e.clientY+(s&&s.scrollTop||i&&i.scrollTop||0)-(s&&s.clientTop||i&&i.clientTop||0)),!t.relatedTarget&&r&&(t.relatedTarget=r===t.target?e.toElement:r),t.which||void 0===o||(t.which=1&o?1:2&o?3:4&o?2:0),t}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==_()&&this.focus)try{return this.focus(),!1}catch(t){}},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return pt.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(t){return pt.nodeName(t.target,"a")}},beforeunload:{postDispatch:function(t){void 0!==t.result&&t.originalEvent&&(t.originalEvent.returnValue=t.result)}}},simulate:function(t,e,i){var n=pt.extend(new pt.Event,i,{type:t,isSimulated:!0});pt.event.trigger(n,null,e),n.isDefaultPrevented()&&i.preventDefault()}},pt.removeEvent=nt.removeEventListener?function(t,e,i){t.removeEventListener&&t.removeEventListener(e,i)}:function(t,e,i){var n="on"+e;t.detachEvent&&("undefined"==typeof t[n]&&(t[n]=null),t.detachEvent(n,i))},pt.Event=function(t,e){return this instanceof pt.Event?(t&&t.type?(this.originalEvent=t,this.type=t.type,this.isDefaultPrevented=t.defaultPrevented||void 0===t.defaultPrevented&&t.returnValue===!1?y:b):this.type=t,e&&pt.extend(this,e),this.timeStamp=t&&t.timeStamp||pt.now(),void(this[pt.expando]=!0)):new pt.Event(t,e)},pt.Event.prototype={constructor:pt.Event,isDefaultPrevented:b,isPropagationStopped:b,isImmediatePropagationStopped:b,preventDefault:function(){var t=this.originalEvent;this.isDefaultPrevented=y,t&&(t.preventDefault?t.preventDefault():t.returnValue=!1)},stopPropagation:function(){var t=this.originalEvent;this.isPropagationStopped=y,t&&!this.isSimulated&&(t.stopPropagation&&t.stopPropagation(),t.cancelBubble=!0)},stopImmediatePropagation:function(){var t=this.originalEvent;this.isImmediatePropagationStopped=y,t&&t.stopImmediatePropagation&&t.stopImmediatePropagation(),this.stopPropagation()}},pt.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(t,e){pt.event.special[t]={delegateType:e,bindType:e,handle:function(t){var i,n=this,s=t.relatedTarget,o=t.handleObj;return s&&(s===n||pt.contains(n,s))||(t.type=o.origType,i=o.handler.apply(this,arguments),t.type=e),i}}}),ht.submit||(pt.event.special.submit={setup:function(){return pt.nodeName(this,"form")?!1:void pt.event.add(this,"click._submit keypress._submit",function(t){var e=t.target,i=pt.nodeName(e,"input")||pt.nodeName(e,"button")?pt.prop(e,"form"):void 0;i&&!pt._data(i,"submit")&&(pt.event.add(i,"submit._submit",function(t){t._submitBubble=!0}),pt._data(i,"submit",!0))})},postDispatch:function(t){t._submitBubble&&(delete t._submitBubble,this.parentNode&&!t.isTrigger&&pt.event.simulate("submit",this.parentNode,t))},teardown:function(){return pt.nodeName(this,"form")?!1:void pt.event.remove(this,"._submit")}}),ht.change||(pt.event.special.change={setup:function(){return Qt.test(this.nodeName)?("checkbox"!==this.type&&"radio"!==this.type||(pt.event.add(this,"propertychange._change",function(t){"checked"===t.originalEvent.propertyName&&(this._justChanged=!0)}),pt.event.add(this,"click._change",function(t){this._justChanged&&!t.isTrigger&&(this._justChanged=!1),pt.event.simulate("change",this,t)})),!1):void pt.event.add(this,"beforeactivate._change",function(t){var e=t.target;Qt.test(e.nodeName)&&!pt._data(e,"change")&&(pt.event.add(e,"change._change",function(t){!this.parentNode||t.isSimulated||t.isTrigger||pt.event.simulate("change",this.parentNode,t)}),pt._data(e,"change",!0))})},handle:function(t){var e=t.target;return this!==e||t.isSimulated||t.isTrigger||"radio"!==e.type&&"checkbox"!==e.type?t.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return pt.event.remove(this,"._change"),!Qt.test(this.nodeName)}}),ht.focusin||pt.each({focus:"focusin",blur:"focusout"},function(t,e){var i=function(t){pt.event.simulate(e,t.target,pt.event.fix(t))};pt.event.special[e]={setup:function(){var n=this.ownerDocument||this,s=pt._data(n,e);s||n.addEventListener(t,i,!0),pt._data(n,e,(s||0)+1)},teardown:function(){var n=this.ownerDocument||this,s=pt._data(n,e)-1;s?pt._data(n,e,s):(n.removeEventListener(t,i,!0),pt._removeData(n,e))}}}),pt.fn.extend({on:function(t,e,i,n){return w(this,t,e,i,n)},one:function(t,e,i,n){return w(this,t,e,i,n,1)},off:function(t,e,i){var n,s;if(t&&t.preventDefault&&t.handleObj)return n=t.handleObj,pt(t.delegateTarget).off(n.namespace?n.origType+"."+n.namespace:n.origType,n.selector,n.handler),this;if("object"==typeof t){for(s in t)this.off(s,e,t[s]);return this}return e!==!1&&"function"!=typeof e||(i=e,e=void 0),i===!1&&(i=b),this.each(function(){pt.event.remove(this,t,i,e)})},trigger:function(t,e){return this.each(function(){pt.event.trigger(t,e,this)})},triggerHandler:function(t,e){var i=this[0];return i?pt.event.trigger(t,e,i,!0):void 0}});var Zt=/ jQuery\d+="(?:null|\d+)"/g,te=new RegExp("<(?:"+Bt+")[\\s/>]","i"),ee=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,ie=/<script|<style|<link/i,ne=/checked\s*(?:[^=]|=\s*.checked.)/i,se=/^true\/(.*)/,oe=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,re=p(nt),ae=re.appendChild(nt.createElement("div"));pt.extend({htmlPrefilter:function(t){return t.replace(ee,"<$1></$2>")},clone:function(t,e,i){var n,s,o,r,a,l=pt.contains(t.ownerDocument,t);if(ht.html5Clone||pt.isXMLDoc(t)||!te.test("<"+t.nodeName+">")?o=t.cloneNode(!0):(ae.innerHTML=t.outerHTML,ae.removeChild(o=ae.firstChild)),!(ht.noCloneEvent&&ht.noCloneChecked||1!==t.nodeType&&11!==t.nodeType||pt.isXMLDoc(t)))for(n=f(o),a=f(t),r=0;null!=(s=a[r]);++r)n[r]&&D(s,n[r]);if(e)if(i)for(a=a||f(t),n=n||f(o),r=0;null!=(s=a[r]);r++)T(s,n[r]);else T(t,o);return n=f(o,"script"),n.length>0&&m(n,!l&&f(t,"script")),n=a=s=null,o},cleanData:function(t,e){for(var i,n,s,o,r=0,a=pt.expando,l=pt.cache,u=ht.attributes,c=pt.event.special;null!=(i=t[r]);r++)if((e||Pt(i))&&(s=i[a],o=s&&l[s])){if(o.events)for(n in o.events)c[n]?pt.event.remove(i,n):pt.removeEvent(i,n,o.handle);l[s]&&(delete l[s],u||"undefined"==typeof i.removeAttribute?i[a]=void 0:i.removeAttribute(a),it.push(s))}}}),pt.fn.extend({domManip:E,detach:function(t){return S(this,t,!0)},remove:function(t){return S(this,t)},text:function(t){return zt(this,function(t){return void 0===t?pt.text(this):this.empty().append((this[0]&&this[0].ownerDocument||nt).createTextNode(t))},null,t,arguments.length)},append:function(){return E(this,arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var e=x(this,t);e.appendChild(t)}})},prepend:function(){return E(this,arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var e=x(this,t);e.insertBefore(t,e.firstChild)}})},before:function(){return E(this,arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this)})},after:function(){return E(this,arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this.nextSibling)})},empty:function(){for(var t,e=0;null!=(t=this[e]);e++){for(1===t.nodeType&&pt.cleanData(f(t,!1));t.firstChild;)t.removeChild(t.firstChild);t.options&&pt.nodeName(t,"select")&&(t.options.length=0)}return this},clone:function(t,e){return t=null==t?!1:t,e=null==e?t:e,this.map(function(){return pt.clone(this,t,e)})},html:function(t){return zt(this,function(t){var e=this[0]||{},i=0,n=this.length;if(void 0===t)return 1===e.nodeType?e.innerHTML.replace(Zt,""):void 0;if("string"==typeof t&&!ie.test(t)&&(ht.htmlSerialize||!te.test(t))&&(ht.leadingWhitespace||!qt.test(t))&&!Ut[(Wt.exec(t)||["",""])[1].toLowerCase()]){t=pt.htmlPrefilter(t);try{for(;n>i;i++)e=this[i]||{},1===e.nodeType&&(pt.cleanData(f(e,!1)),e.innerHTML=t);e=0}catch(s){}}e&&this.empty().append(t)},null,t,arguments.length)},replaceWith:function(){var t=[];return E(this,arguments,function(e){var i=this.parentNode;pt.inArray(this,t)<0&&(pt.cleanData(f(this)),i&&i.replaceChild(e,this))},t)}}),pt.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(t,e){pt.fn[t]=function(t){for(var i,n=0,s=[],o=pt(t),r=o.length-1;r>=n;n++)i=n===r?this:this.clone(!0),pt(o[n])[e](i),rt.apply(s,i.get());return this.pushStack(s)}});var le,ue={HTML:"block",BODY:"block"},ce=/^margin/,he=new RegExp("^("+jt+")(?!px)[a-z%]+$","i"),de=function(t,e,i,n){var s,o,r={};for(o in e)r[o]=t.style[o],t.style[o]=e[o];s=i.apply(t,n||[]);for(o in e)t.style[o]=r[o];return s},pe=nt.documentElement;!function(){function e(){var e,c,h=nt.documentElement;h.appendChild(l),u.style.cssText="-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",i=s=a=!1,n=r=!0,t.getComputedStyle&&(c=t.getComputedStyle(u),i="1%"!==(c||{}).top,a="2px"===(c||{}).marginLeft,s="4px"===(c||{width:"4px"}).width,u.style.marginRight="50%",n="4px"===(c||{marginRight:"4px"}).marginRight,e=u.appendChild(nt.createElement("div")),e.style.cssText=u.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",e.style.marginRight=e.style.width="0",u.style.width="1px",r=!parseFloat((t.getComputedStyle(e)||{}).marginRight),u.removeChild(e)),u.style.display="none",o=0===u.getClientRects().length,o&&(u.style.display="",u.innerHTML="<table><tr><td></td><td>t</td></tr></table>",e=u.getElementsByTagName("td"),e[0].style.cssText="margin:0;border:0;padding:0;display:none",o=0===e[0].offsetHeight,o&&(e[0].style.display="",e[1].style.display="none",o=0===e[0].offsetHeight)),h.removeChild(l)}var i,n,s,o,r,a,l=nt.createElement("div"),u=nt.createElement("div");u.style&&(u.style.cssText="float:left;opacity:.5",ht.opacity="0.5"===u.style.opacity,ht.cssFloat=!!u.style.cssFloat,u.style.backgroundClip="content-box",u.cloneNode(!0).style.backgroundClip="",ht.clearCloneStyle="content-box"===u.style.backgroundClip,l=nt.createElement("div"),l.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",u.innerHTML="",l.appendChild(u),ht.boxSizing=""===u.style.boxSizing||""===u.style.MozBoxSizing||""===u.style.WebkitBoxSizing,pt.extend(ht,{reliableHiddenOffsets:function(){return null==i&&e(),o},boxSizingReliable:function(){return null==i&&e(),s},pixelMarginRight:function(){return null==i&&e(),n},pixelPosition:function(){return null==i&&e(),i},reliableMarginRight:function(){return null==i&&e(),r},reliableMarginLeft:function(){return null==i&&e(),a}}))}();var fe,me,ge=/^(top|right|bottom|left)$/;t.getComputedStyle?(fe=function(e){var i=e.ownerDocument.defaultView;return i&&i.opener||(i=t),i.getComputedStyle(e)},me=function(t,e,i){var n,s,o,r,a=t.style;return i=i||fe(t),r=i?i.getPropertyValue(e)||i[e]:void 0,""!==r&&void 0!==r||pt.contains(t.ownerDocument,t)||(r=pt.style(t,e)),i&&!ht.pixelMarginRight()&&he.test(r)&&ce.test(e)&&(n=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=i.width,a.width=n,a.minWidth=s,a.maxWidth=o),void 0===r?r:r+""}):pe.currentStyle&&(fe=function(t){return t.currentStyle},me=function(t,e,i){var n,s,o,r,a=t.style;return i=i||fe(t),r=i?i[e]:void 0,null==r&&a&&a[e]&&(r=a[e]),he.test(r)&&!ge.test(e)&&(n=a.left,s=t.runtimeStyle,o=s&&s.left,o&&(s.left=t.currentStyle.left),a.left="fontSize"===e?"1em":r,r=a.pixelLeft+"px",a.left=n,o&&(s.left=o)),void 0===r?r:r+""||"auto"});var ve=/alpha\([^)]*\)/i,ye=/opacity\s*=\s*([^)]*)/i,be=/^(none|table(?!-c[ea]).+)/,_e=new RegExp("^("+jt+")(.*)$","i"),we={position:"absolute",visibility:"hidden",display:"block"},xe={letterSpacing:"0",fontWeight:"400"},Ce=["Webkit","O","Moz","ms"],ke=nt.createElement("div").style;pt.extend({cssHooks:{opacity:{get:function(t,e){if(e){var i=me(t,"opacity");return""===i?"1":i}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":ht.cssFloat?"cssFloat":"styleFloat"},style:function(t,e,i,n){if(t&&3!==t.nodeType&&8!==t.nodeType&&t.style){var s,o,r,a=pt.camelCase(e),l=t.style;if(e=pt.cssProps[a]||(pt.cssProps[a]=P(a)||a),r=pt.cssHooks[e]||pt.cssHooks[a],void 0===i)return r&&"get"in r&&void 0!==(s=r.get(t,!1,n))?s:l[e];if(o=typeof i,"string"===o&&(s=Ht.exec(i))&&s[1]&&(i=d(t,e,s),o="number"),null!=i&&i===i&&("number"===o&&(i+=s&&s[3]||(pt.cssNumber[a]?"":"px")),ht.clearCloneStyle||""!==i||0!==e.indexOf("background")||(l[e]="inherit"),!(r&&"set"in r&&void 0===(i=r.set(t,i,n)))))try{l[e]=i}catch(u){}}},css:function(t,e,i,n){var s,o,r,a=pt.camelCase(e);return e=pt.cssProps[a]||(pt.cssProps[a]=P(a)||a),r=pt.cssHooks[e]||pt.cssHooks[a],r&&"get"in r&&(o=r.get(t,!0,i)),void 0===o&&(o=me(t,e,n)),"normal"===o&&e in xe&&(o=xe[e]),""===i||i?(s=parseFloat(o),i===!0||isFinite(s)?s||0:o):o}}),pt.each(["height","width"],function(t,e){pt.cssHooks[e]={get:function(t,i,n){return i?be.test(pt.css(t,"display"))&&0===t.offsetWidth?de(t,we,function(){return H(t,e,n)}):H(t,e,n):void 0},set:function(t,i,n){var s=n&&fe(t);return O(t,i,n?j(t,e,n,ht.boxSizing&&"border-box"===pt.css(t,"boxSizing",!1,s),s):0)}}}),ht.opacity||(pt.cssHooks.opacity={get:function(t,e){return ye.test((e&&t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":e?"1":""},set:function(t,e){var i=t.style,n=t.currentStyle,s=pt.isNumeric(e)?"alpha(opacity="+100*e+")":"",o=n&&n.filter||i.filter||"";i.zoom=1,(e>=1||""===e)&&""===pt.trim(o.replace(ve,""))&&i.removeAttribute&&(i.removeAttribute("filter"),""===e||n&&!n.filter)||(i.filter=ve.test(o)?o.replace(ve,s):o+" "+s)}}),pt.cssHooks.marginRight=M(ht.reliableMarginRight,function(t,e){return e?de(t,{display:"inline-block"},me,[t,"marginRight"]):void 0}),pt.cssHooks.marginLeft=M(ht.reliableMarginLeft,function(t,e){return e?(parseFloat(me(t,"marginLeft"))||(pt.contains(t.ownerDocument,t)?t.getBoundingClientRect().left-de(t,{marginLeft:0},function(){return t.getBoundingClientRect().left}):0))+"px":void 0}),pt.each({margin:"",padding:"",border:"Width"},function(t,e){pt.cssHooks[t+e]={expand:function(i){for(var n=0,s={},o="string"==typeof i?i.split(" "):[i];4>n;n++)s[t+$t[n]+e]=o[n]||o[n-2]||o[0];return s}},ce.test(t)||(pt.cssHooks[t+e].set=O)}),pt.fn.extend({css:function(t,e){return zt(this,function(t,e,i){var n,s,o={},r=0;if(pt.isArray(e)){for(n=fe(t),s=e.length;s>r;r++)o[e[r]]=pt.css(t,e[r],!1,n);return o}return void 0!==i?pt.style(t,e,i):pt.css(t,e)},t,e,arguments.length>1)},show:function(){return N(this,!0)},hide:function(){return N(this)},toggle:function(t){return"boolean"==typeof t?t?this.show():this.hide():this.each(function(){Ft(this)?pt(this).show():pt(this).hide()})}}),pt.Tween=$,$.prototype={constructor:$,init:function(t,e,i,n,s,o){this.elem=t,this.prop=i,this.easing=s||pt.easing._default,this.options=e,this.start=this.now=this.cur(),this.end=n,this.unit=o||(pt.cssNumber[i]?"":"px")},cur:function(){var t=$.propHooks[this.prop];return t&&t.get?t.get(this):$.propHooks._default.get(this)},run:function(t){var e,i=$.propHooks[this.prop];return this.options.duration?this.pos=e=pt.easing[this.easing](t,this.options.duration*t,0,1,this.options.duration):this.pos=e=t,this.now=(this.end-this.start)*e+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),i&&i.set?i.set(this):$.propHooks._default.set(this),this}},$.prototype.init.prototype=$.prototype,$.propHooks={_default:{get:function(t){var e;return 1!==t.elem.nodeType||null!=t.elem[t.prop]&&null==t.elem.style[t.prop]?t.elem[t.prop]:(e=pt.css(t.elem,t.prop,""),e&&"auto"!==e?e:0)},set:function(t){pt.fx.step[t.prop]?pt.fx.step[t.prop](t):1!==t.elem.nodeType||null==t.elem.style[pt.cssProps[t.prop]]&&!pt.cssHooks[t.prop]?t.elem[t.prop]=t.now:pt.style(t.elem,t.prop,t.now+t.unit)}}},$.propHooks.scrollTop=$.propHooks.scrollLeft={set:function(t){t.elem.nodeType&&t.elem.parentNode&&(t.elem[t.prop]=t.now)}},pt.easing={linear:function(t){return t},swing:function(t){return.5-Math.cos(t*Math.PI)/2},_default:"swing"},pt.fx=$.prototype.init,pt.fx.step={};var Te,De,Ee=/^(?:toggle|show|hide)$/,Se=/queueHooks$/;pt.Animation=pt.extend(q,{tweeners:{"*":[function(t,e){var i=this.createTween(t,e);return d(i.elem,t,Ht.exec(e),i),i}]},tweener:function(t,e){pt.isFunction(t)?(e=t,t=["*"]):t=t.match(At);for(var i,n=0,s=t.length;s>n;n++)i=t[n],q.tweeners[i]=q.tweeners[i]||[],q.tweeners[i].unshift(e)},prefilters:[W],prefilter:function(t,e){e?q.prefilters.unshift(t):q.prefilters.push(t)}}),pt.speed=function(t,e,i){var n=t&&"object"==typeof t?pt.extend({},t):{complete:i||!i&&e||pt.isFunction(t)&&t,duration:t,easing:i&&e||e&&!pt.isFunction(e)&&e};return n.duration=pt.fx.off?0:"number"==typeof n.duration?n.duration:n.duration in pt.fx.speeds?pt.fx.speeds[n.duration]:pt.fx.speeds._default,null!=n.queue&&n.queue!==!0||(n.queue="fx"),n.old=n.complete,n.complete=function(){pt.isFunction(n.old)&&n.old.call(this),n.queue&&pt.dequeue(this,n.queue)},n},pt.fn.extend({fadeTo:function(t,e,i,n){return this.filter(Ft).css("opacity",0).show().end().animate({opacity:e},t,i,n)},animate:function(t,e,i,n){var s=pt.isEmptyObject(t),o=pt.speed(e,i,n),r=function(){var e=q(this,pt.extend({},t),o);(s||pt._data(this,"finish"))&&e.stop(!0)};return r.finish=r,s||o.queue===!1?this.each(r):this.queue(o.queue,r)},stop:function(t,e,i){var n=function(t){var e=t.stop;delete t.stop,e(i)};return"string"!=typeof t&&(i=e,e=t,t=void 0),e&&t!==!1&&this.queue(t||"fx",[]),this.each(function(){var e=!0,s=null!=t&&t+"queueHooks",o=pt.timers,r=pt._data(this);if(s)r[s]&&r[s].stop&&n(r[s]);else for(s in r)r[s]&&r[s].stop&&Se.test(s)&&n(r[s]);for(s=o.length;s--;)o[s].elem!==this||null!=t&&o[s].queue!==t||(o[s].anim.stop(i),e=!1,o.splice(s,1));!e&&i||pt.dequeue(this,t)})},finish:function(t){return t!==!1&&(t=t||"fx"),this.each(function(){var e,i=pt._data(this),n=i[t+"queue"],s=i[t+"queueHooks"],o=pt.timers,r=n?n.length:0;for(i.finish=!0,pt.queue(this,t,[]),s&&s.stop&&s.stop.call(this,!0),e=o.length;e--;)o[e].elem===this&&o[e].queue===t&&(o[e].anim.stop(!0),o.splice(e,1));for(e=0;r>e;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete i.finish})}}),pt.each(["toggle","show","hide"],function(t,e){var i=pt.fn[e];pt.fn[e]=function(t,n,s){return null==t||"boolean"==typeof t?i.apply(this,arguments):this.animate(z(e,!0),t,n,s)}}),pt.each({slideDown:z("show"),slideUp:z("hide"),slideToggle:z("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(t,e){pt.fn[t]=function(t,i,n){return this.animate(e,t,i,n)}}),pt.timers=[],pt.fx.tick=function(){var t,e=pt.timers,i=0;for(Te=pt.now();i<e.length;i++)t=e[i],t()||e[i]!==t||e.splice(i--,1);e.length||pt.fx.stop(),Te=void 0},pt.fx.timer=function(t){pt.timers.push(t),t()?pt.fx.start():pt.timers.pop()},pt.fx.interval=13,pt.fx.start=function(){De||(De=t.setInterval(pt.fx.tick,pt.fx.interval))},pt.fx.stop=function(){t.clearInterval(De),De=null},pt.fx.speeds={slow:600,fast:200,_default:400},pt.fn.delay=function(e,i){return e=pt.fx?pt.fx.speeds[e]||e:e,i=i||"fx",this.queue(i,function(i,n){var s=t.setTimeout(i,e);n.stop=function(){t.clearTimeout(s)}})},function(){var t,e=nt.createElement("input"),i=nt.createElement("div"),n=nt.createElement("select"),s=n.appendChild(nt.createElement("option"));i=nt.createElement("div"),i.setAttribute("className","t"),i.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",t=i.getElementsByTagName("a")[0],e.setAttribute("type","checkbox"),i.appendChild(e),t=i.getElementsByTagName("a")[0],t.style.cssText="top:1px",ht.getSetAttribute="t"!==i.className,ht.style=/top/.test(t.getAttribute("style")),ht.hrefNormalized="/a"===t.getAttribute("href"),ht.checkOn=!!e.value,ht.optSelected=s.selected,ht.enctype=!!nt.createElement("form").enctype,n.disabled=!0,ht.optDisabled=!s.disabled,e=nt.createElement("input"),e.setAttribute("value",""),ht.input=""===e.getAttribute("value"),e.value="t",e.setAttribute("type","radio"),ht.radioValue="t"===e.value}();var Ae=/\r/g;pt.fn.extend({val:function(t){var e,i,n,s=this[0];{if(arguments.length)return n=pt.isFunction(t),this.each(function(i){var s;1===this.nodeType&&(s=n?t.call(this,i,pt(this).val()):t,null==s?s="":"number"==typeof s?s+="":pt.isArray(s)&&(s=pt.map(s,function(t){return null==t?"":t+""})),e=pt.valHooks[this.type]||pt.valHooks[this.nodeName.toLowerCase()],e&&"set"in e&&void 0!==e.set(this,s,"value")||(this.value=s))});if(s)return e=pt.valHooks[s.type]||pt.valHooks[s.nodeName.toLowerCase()],e&&"get"in e&&void 0!==(i=e.get(s,"value"))?i:(i=s.value,"string"==typeof i?i.replace(Ae,""):null==i?"":i)}}}),pt.extend({valHooks:{option:{get:function(t){var e=pt.find.attr(t,"value");return null!=e?e:pt.trim(pt.text(t))}},select:{get:function(t){for(var e,i,n=t.options,s=t.selectedIndex,o="select-one"===t.type||0>s,r=o?null:[],a=o?s+1:n.length,l=0>s?a:o?s:0;a>l;l++)if(i=n[l],(i.selected||l===s)&&(ht.optDisabled?!i.disabled:null===i.getAttribute("disabled"))&&(!i.parentNode.disabled||!pt.nodeName(i.parentNode,"optgroup"))){if(e=pt(i).val(),o)return e;r.push(e)}return r},set:function(t,e){for(var i,n,s=t.options,o=pt.makeArray(e),r=s.length;r--;)if(n=s[r],pt.inArray(pt.valHooks.option.get(n),o)>=0)try{n.selected=i=!0}catch(a){n.scrollHeight}else n.selected=!1;return i||(t.selectedIndex=-1),s}}}}),pt.each(["radio","checkbox"],function(){pt.valHooks[this]={set:function(t,e){return pt.isArray(e)?t.checked=pt.inArray(pt(t).val(),e)>-1:void 0}},ht.checkOn||(pt.valHooks[this].get=function(t){return null===t.getAttribute("value")?"on":t.value})});var Ie,Me,Pe=pt.expr.attrHandle,Ne=/^(?:checked|selected)$/i,Oe=ht.getSetAttribute,je=ht.input;pt.fn.extend({attr:function(t,e){return zt(this,pt.attr,t,e,arguments.length>1)},removeAttr:function(t){return this.each(function(){pt.removeAttr(this,t)})}}),pt.extend({attr:function(t,e,i){var n,s,o=t.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof t.getAttribute?pt.prop(t,e,i):(1===o&&pt.isXMLDoc(t)||(e=e.toLowerCase(),s=pt.attrHooks[e]||(pt.expr.match.bool.test(e)?Me:Ie)),void 0!==i?null===i?void pt.removeAttr(t,e):s&&"set"in s&&void 0!==(n=s.set(t,i,e))?n:(t.setAttribute(e,i+""),i):s&&"get"in s&&null!==(n=s.get(t,e))?n:(n=pt.find.attr(t,e),null==n?void 0:n))},attrHooks:{type:{set:function(t,e){if(!ht.radioValue&&"radio"===e&&pt.nodeName(t,"input")){var i=t.value;return t.setAttribute("type",e),i&&(t.value=i),e}}}},removeAttr:function(t,e){var i,n,s=0,o=e&&e.match(At);if(o&&1===t.nodeType)for(;i=o[s++];)n=pt.propFix[i]||i,pt.expr.match.bool.test(i)?je&&Oe||!Ne.test(i)?t[n]=!1:t[pt.camelCase("default-"+i)]=t[n]=!1:pt.attr(t,i,""),t.removeAttribute(Oe?i:n)}}),Me={set:function(t,e,i){return e===!1?pt.removeAttr(t,i):je&&Oe||!Ne.test(i)?t.setAttribute(!Oe&&pt.propFix[i]||i,i):t[pt.camelCase("default-"+i)]=t[i]=!0,i}},pt.each(pt.expr.match.bool.source.match(/\w+/g),function(t,e){var i=Pe[e]||pt.find.attr;je&&Oe||!Ne.test(e)?Pe[e]=function(t,e,n){var s,o;return n||(o=Pe[e],Pe[e]=s,s=null!=i(t,e,n)?e.toLowerCase():null,Pe[e]=o),s}:Pe[e]=function(t,e,i){return i?void 0:t[pt.camelCase("default-"+e)]?e.toLowerCase():null}}),je&&Oe||(pt.attrHooks.value={set:function(t,e,i){return pt.nodeName(t,"input")?void(t.defaultValue=e):Ie&&Ie.set(t,e,i)}}),Oe||(Ie={set:function(t,e,i){var n=t.getAttributeNode(i);return n||t.setAttributeNode(n=t.ownerDocument.createAttribute(i)),n.value=e+="","value"===i||e===t.getAttribute(i)?e:void 0}},Pe.id=Pe.name=Pe.coords=function(t,e,i){var n;return i?void 0:(n=t.getAttributeNode(e))&&""!==n.value?n.value:null},pt.valHooks.button={get:function(t,e){var i=t.getAttributeNode(e);return i&&i.specified?i.value:void 0},set:Ie.set},pt.attrHooks.contenteditable={set:function(t,e,i){Ie.set(t,""===e?!1:e,i)}},pt.each(["width","height"],function(t,e){pt.attrHooks[e]={set:function(t,i){return""===i?(t.setAttribute(e,"auto"),i):void 0}}})),ht.style||(pt.attrHooks.style={get:function(t){return t.style.cssText||void 0},set:function(t,e){return t.style.cssText=e+""}});var He=/^(?:input|select|textarea|button|object)$/i,$e=/^(?:a|area)$/i;pt.fn.extend({prop:function(t,e){return zt(this,pt.prop,t,e,arguments.length>1)},removeProp:function(t){return t=pt.propFix[t]||t,this.each(function(){try{this[t]=void 0,delete this[t]}catch(e){}})}}),pt.extend({prop:function(t,e,i){var n,s,o=t.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&pt.isXMLDoc(t)||(e=pt.propFix[e]||e,s=pt.propHooks[e]),void 0!==i?s&&"set"in s&&void 0!==(n=s.set(t,i,e))?n:t[e]=i:s&&"get"in s&&null!==(n=s.get(t,e))?n:t[e]},propHooks:{tabIndex:{get:function(t){var e=pt.find.attr(t,"tabindex");return e?parseInt(e,10):He.test(t.nodeName)||$e.test(t.nodeName)&&t.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),ht.hrefNormalized||pt.each(["href","src"],function(t,e){pt.propHooks[e]={get:function(t){return t.getAttribute(e,4)}}}),ht.optSelected||(pt.propHooks.selected={get:function(t){var e=t.parentNode;return e&&(e.selectedIndex,e.parentNode&&e.parentNode.selectedIndex),null}}),pt.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){pt.propFix[this.toLowerCase()]=this}),ht.enctype||(pt.propFix.enctype="encoding");var Fe=/[\t\r\n\f]/g;pt.fn.extend({addClass:function(t){var e,i,n,s,o,r,a,l=0;if(pt.isFunction(t))return this.each(function(e){pt(this).addClass(t.call(this,e,B(this)))});if("string"==typeof t&&t)for(e=t.match(At)||[];i=this[l++];)if(s=B(i),n=1===i.nodeType&&(" "+s+" ").replace(Fe," ")){for(r=0;o=e[r++];)n.indexOf(" "+o+" ")<0&&(n+=o+" ");a=pt.trim(n),s!==a&&pt.attr(i,"class",a)}return this},removeClass:function(t){var e,i,n,s,o,r,a,l=0;if(pt.isFunction(t))return this.each(function(e){pt(this).removeClass(t.call(this,e,B(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof t&&t)for(e=t.match(At)||[];i=this[l++];)if(s=B(i),n=1===i.nodeType&&(" "+s+" ").replace(Fe," ")){for(r=0;o=e[r++];)for(;n.indexOf(" "+o+" ")>-1;)n=n.replace(" "+o+" "," ");a=pt.trim(n),s!==a&&pt.attr(i,"class",a)}return this},toggleClass:function(t,e){var i=typeof t;return"boolean"==typeof e&&"string"===i?e?this.addClass(t):this.removeClass(t):pt.isFunction(t)?this.each(function(i){pt(this).toggleClass(t.call(this,i,B(this),e),e)}):this.each(function(){var e,n,s,o;if("string"===i)for(n=0,s=pt(this),o=t.match(At)||[];e=o[n++];)s.hasClass(e)?s.removeClass(e):s.addClass(e);else void 0!==t&&"boolean"!==i||(e=B(this),e&&pt._data(this,"__className__",e),pt.attr(this,"class",e||t===!1?"":pt._data(this,"__className__")||""))})},hasClass:function(t){var e,i,n=0;for(e=" "+t+" ";i=this[n++];)if(1===i.nodeType&&(" "+B(i)+" ").replace(Fe," ").indexOf(e)>-1)return!0;return!1}}),pt.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(t,e){pt.fn[e]=function(t,i){return arguments.length>0?this.on(e,null,t,i):this.trigger(e)}}),pt.fn.extend({hover:function(t,e){return this.mouseenter(t).mouseleave(e||t)}});var ze=t.location,Le=pt.now(),We=/\?/,Re=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;pt.parseJSON=function(e){if(t.JSON&&t.JSON.parse)return t.JSON.parse(e+"");var i,n=null,s=pt.trim(e+"");return s&&!pt.trim(s.replace(Re,function(t,e,s,o){return i&&e&&(n=0),0===n?t:(i=s||e,n+=!o-!s,"")}))?Function("return "+s)():pt.error("Invalid JSON: "+e)},pt.parseXML=function(e){var i,n;if(!e||"string"!=typeof e)return null;try{t.DOMParser?(n=new t.DOMParser,i=n.parseFromString(e,"text/xml")):(i=new t.ActiveXObject("Microsoft.XMLDOM"),i.async="false",i.loadXML(e))}catch(s){i=void 0}return i&&i.documentElement&&!i.getElementsByTagName("parsererror").length||pt.error("Invalid XML: "+e),i};var qe=/#.*$/,Be=/([?&])_=[^&]*/,Ue=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Ye=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Ve=/^(?:GET|HEAD)$/,Qe=/^\/\//,Ke=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Xe={},Ge={},Je="*/".concat("*"),Ze=ze.href,ti=Ke.exec(Ze.toLowerCase())||[];
pt.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ze,type:"GET",isLocal:Ye.test(ti[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Je,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":pt.parseJSON,"text xml":pt.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(t,e){return e?V(V(t,pt.ajaxSettings),e):V(pt.ajaxSettings,t)},ajaxPrefilter:U(Xe),ajaxTransport:U(Ge),ajax:function(e,i){function n(e,i,n,s){var o,h,y,b,w,C=i;2!==_&&(_=2,l&&t.clearTimeout(l),c=void 0,a=s||"",x.readyState=e>0?4:0,o=e>=200&&300>e||304===e,n&&(b=Q(d,x,n)),b=K(d,b,x,o),o?(d.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(pt.lastModified[r]=w),w=x.getResponseHeader("etag"),w&&(pt.etag[r]=w)),204===e||"HEAD"===d.type?C="nocontent":304===e?C="notmodified":(C=b.state,h=b.data,y=b.error,o=!y)):(y=C,!e&&C||(C="error",0>e&&(e=0))),x.status=e,x.statusText=(i||C)+"",o?m.resolveWith(p,[h,C,x]):m.rejectWith(p,[x,C,y]),x.statusCode(v),v=void 0,u&&f.trigger(o?"ajaxSuccess":"ajaxError",[x,d,o?h:y]),g.fireWith(p,[x,C]),u&&(f.trigger("ajaxComplete",[x,d]),--pt.active||pt.event.trigger("ajaxStop")))}"object"==typeof e&&(i=e,e=void 0),i=i||{};var s,o,r,a,l,u,c,h,d=pt.ajaxSetup({},i),p=d.context||d,f=d.context&&(p.nodeType||p.jquery)?pt(p):pt.event,m=pt.Deferred(),g=pt.Callbacks("once memory"),v=d.statusCode||{},y={},b={},_=0,w="canceled",x={readyState:0,getResponseHeader:function(t){var e;if(2===_){if(!h)for(h={};e=Ue.exec(a);)h[e[1].toLowerCase()]=e[2];e=h[t.toLowerCase()]}return null==e?null:e},getAllResponseHeaders:function(){return 2===_?a:null},setRequestHeader:function(t,e){var i=t.toLowerCase();return _||(t=b[i]=b[i]||t,y[t]=e),this},overrideMimeType:function(t){return _||(d.mimeType=t),this},statusCode:function(t){var e;if(t)if(2>_)for(e in t)v[e]=[v[e],t[e]];else x.always(t[x.status]);return this},abort:function(t){var e=t||w;return c&&c.abort(e),n(0,e),this}};if(m.promise(x).complete=g.add,x.success=x.done,x.error=x.fail,d.url=((e||d.url||Ze)+"").replace(qe,"").replace(Qe,ti[1]+"//"),d.type=i.method||i.type||d.method||d.type,d.dataTypes=pt.trim(d.dataType||"*").toLowerCase().match(At)||[""],null==d.crossDomain&&(s=Ke.exec(d.url.toLowerCase()),d.crossDomain=!(!s||s[1]===ti[1]&&s[2]===ti[2]&&(s[3]||("http:"===s[1]?"80":"443"))===(ti[3]||("http:"===ti[1]?"80":"443")))),d.data&&d.processData&&"string"!=typeof d.data&&(d.data=pt.param(d.data,d.traditional)),Y(Xe,d,i,x),2===_)return x;u=pt.event&&d.global,u&&0===pt.active++&&pt.event.trigger("ajaxStart"),d.type=d.type.toUpperCase(),d.hasContent=!Ve.test(d.type),r=d.url,d.hasContent||(d.data&&(r=d.url+=(We.test(r)?"&":"?")+d.data,delete d.data),d.cache===!1&&(d.url=Be.test(r)?r.replace(Be,"$1_="+Le++):r+(We.test(r)?"&":"?")+"_="+Le++)),d.ifModified&&(pt.lastModified[r]&&x.setRequestHeader("If-Modified-Since",pt.lastModified[r]),pt.etag[r]&&x.setRequestHeader("If-None-Match",pt.etag[r])),(d.data&&d.hasContent&&d.contentType!==!1||i.contentType)&&x.setRequestHeader("Content-Type",d.contentType),x.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+("*"!==d.dataTypes[0]?", "+Je+"; q=0.01":""):d.accepts["*"]);for(o in d.headers)x.setRequestHeader(o,d.headers[o]);if(d.beforeSend&&(d.beforeSend.call(p,x,d)===!1||2===_))return x.abort();w="abort";for(o in{success:1,error:1,complete:1})x[o](d[o]);if(c=Y(Ge,d,i,x)){if(x.readyState=1,u&&f.trigger("ajaxSend",[x,d]),2===_)return x;d.async&&d.timeout>0&&(l=t.setTimeout(function(){x.abort("timeout")},d.timeout));try{_=1,c.send(y,n)}catch(C){if(!(2>_))throw C;n(-1,C)}}else n(-1,"No Transport");return x},getJSON:function(t,e,i){return pt.get(t,e,i,"json")},getScript:function(t,e){return pt.get(t,void 0,e,"script")}}),pt.each(["get","post"],function(t,e){pt[e]=function(t,i,n,s){return pt.isFunction(i)&&(s=s||n,n=i,i=void 0),pt.ajax(pt.extend({url:t,type:e,dataType:s,data:i,success:n},pt.isPlainObject(t)&&t))}}),pt._evalUrl=function(t){return pt.ajax({url:t,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},pt.fn.extend({wrapAll:function(t){if(pt.isFunction(t))return this.each(function(e){pt(this).wrapAll(t.call(this,e))});if(this[0]){var e=pt(t,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&e.insertBefore(this[0]),e.map(function(){for(var t=this;t.firstChild&&1===t.firstChild.nodeType;)t=t.firstChild;return t}).append(this)}return this},wrapInner:function(t){return pt.isFunction(t)?this.each(function(e){pt(this).wrapInner(t.call(this,e))}):this.each(function(){var e=pt(this),i=e.contents();i.length?i.wrapAll(t):e.append(t)})},wrap:function(t){var e=pt.isFunction(t);return this.each(function(i){pt(this).wrapAll(e?t.call(this,i):t)})},unwrap:function(){return this.parent().each(function(){pt.nodeName(this,"body")||pt(this).replaceWith(this.childNodes)}).end()}}),pt.expr.filters.hidden=function(t){return ht.reliableHiddenOffsets()?t.offsetWidth<=0&&t.offsetHeight<=0&&!t.getClientRects().length:G(t)},pt.expr.filters.visible=function(t){return!pt.expr.filters.hidden(t)};var ei=/%20/g,ii=/\[\]$/,ni=/\r?\n/g,si=/^(?:submit|button|image|reset|file)$/i,oi=/^(?:input|select|textarea|keygen)/i;pt.param=function(t,e){var i,n=[],s=function(t,e){e=pt.isFunction(e)?e():null==e?"":e,n[n.length]=encodeURIComponent(t)+"="+encodeURIComponent(e)};if(void 0===e&&(e=pt.ajaxSettings&&pt.ajaxSettings.traditional),pt.isArray(t)||t.jquery&&!pt.isPlainObject(t))pt.each(t,function(){s(this.name,this.value)});else for(i in t)J(i,t[i],e,s);return n.join("&").replace(ei,"+")},pt.fn.extend({serialize:function(){return pt.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var t=pt.prop(this,"elements");return t?pt.makeArray(t):this}).filter(function(){var t=this.type;return this.name&&!pt(this).is(":disabled")&&oi.test(this.nodeName)&&!si.test(t)&&(this.checked||!Lt.test(t))}).map(function(t,e){var i=pt(this).val();return null==i?null:pt.isArray(i)?pt.map(i,function(t){return{name:e.name,value:t.replace(ni,"\r\n")}}):{name:e.name,value:i.replace(ni,"\r\n")}}).get()}}),pt.ajaxSettings.xhr=void 0!==t.ActiveXObject?function(){return this.isLocal?tt():nt.documentMode>8?Z():/^(get|post|head|put|delete|options)$/i.test(this.type)&&Z()||tt()}:Z;var ri=0,ai={},li=pt.ajaxSettings.xhr();t.attachEvent&&t.attachEvent("onunload",function(){for(var t in ai)ai[t](void 0,!0)}),ht.cors=!!li&&"withCredentials"in li,li=ht.ajax=!!li,li&&pt.ajaxTransport(function(e){if(!e.crossDomain||ht.cors){var i;return{send:function(n,s){var o,r=e.xhr(),a=++ri;if(r.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(o in e.xhrFields)r[o]=e.xhrFields[o];e.mimeType&&r.overrideMimeType&&r.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(o in n)void 0!==n[o]&&r.setRequestHeader(o,n[o]+"");r.send(e.hasContent&&e.data||null),i=function(t,n){var o,l,u;if(i&&(n||4===r.readyState))if(delete ai[a],i=void 0,r.onreadystatechange=pt.noop,n)4!==r.readyState&&r.abort();else{u={},o=r.status,"string"==typeof r.responseText&&(u.text=r.responseText);try{l=r.statusText}catch(c){l=""}o||!e.isLocal||e.crossDomain?1223===o&&(o=204):o=u.text?200:404}u&&s(o,l,u,r.getAllResponseHeaders())},e.async?4===r.readyState?t.setTimeout(i):r.onreadystatechange=ai[a]=i:i()},abort:function(){i&&i(void 0,!0)}}}}),pt.ajaxPrefilter(function(t){t.crossDomain&&(t.contents.script=!1)}),pt.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(t){return pt.globalEval(t),t}}}),pt.ajaxPrefilter("script",function(t){void 0===t.cache&&(t.cache=!1),t.crossDomain&&(t.type="GET",t.global=!1)}),pt.ajaxTransport("script",function(t){if(t.crossDomain){var e,i=nt.head||pt("head")[0]||nt.documentElement;return{send:function(n,s){e=nt.createElement("script"),e.async=!0,t.scriptCharset&&(e.charset=t.scriptCharset),e.src=t.url,e.onload=e.onreadystatechange=function(t,i){(i||!e.readyState||/loaded|complete/.test(e.readyState))&&(e.onload=e.onreadystatechange=null,e.parentNode&&e.parentNode.removeChild(e),e=null,i||s(200,"success"))},i.insertBefore(e,i.firstChild)},abort:function(){e&&e.onload(void 0,!0)}}}});var ui=[],ci=/(=)\?(?=&|$)|\?\?/;pt.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var t=ui.pop()||pt.expando+"_"+Le++;return this[t]=!0,t}}),pt.ajaxPrefilter("json jsonp",function(e,i,n){var s,o,r,a=e.jsonp!==!1&&(ci.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&ci.test(e.data)&&"data");return a||"jsonp"===e.dataTypes[0]?(s=e.jsonpCallback=pt.isFunction(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(ci,"$1"+s):e.jsonp!==!1&&(e.url+=(We.test(e.url)?"&":"?")+e.jsonp+"="+s),e.converters["script json"]=function(){return r||pt.error(s+" was not called"),r[0]},e.dataTypes[0]="json",o=t[s],t[s]=function(){r=arguments},n.always(function(){void 0===o?pt(t).removeProp(s):t[s]=o,e[s]&&(e.jsonpCallback=i.jsonpCallback,ui.push(s)),r&&pt.isFunction(o)&&o(r[0]),r=o=void 0}),"script"):void 0}),ht.createHTMLDocument=function(){if(!nt.implementation.createHTMLDocument)return!1;var t=nt.implementation.createHTMLDocument("");return t.body.innerHTML="<form></form><form></form>",2===t.body.childNodes.length}(),pt.parseHTML=function(t,e,i){if(!t||"string"!=typeof t)return null;"boolean"==typeof e&&(i=e,e=!1),e=e||(ht.createHTMLDocument?nt.implementation.createHTMLDocument(""):nt);var n=xt.exec(t),s=!i&&[];return n?[e.createElement(n[1])]:(n=v([t],e,s),s&&s.length&&pt(s).remove(),pt.merge([],n.childNodes))};var hi=pt.fn.load;pt.fn.load=function(t,e,i){if("string"!=typeof t&&hi)return hi.apply(this,arguments);var n,s,o,r=this,a=t.indexOf(" ");return a>-1&&(n=pt.trim(t.slice(a,t.length)),t=t.slice(0,a)),pt.isFunction(e)?(i=e,e=void 0):e&&"object"==typeof e&&(s="POST"),r.length>0&&pt.ajax({url:t,type:s||"GET",dataType:"html",data:e}).done(function(t){o=arguments,r.html(n?pt("<div>").append(pt.parseHTML(t)).find(n):t)}).always(i&&function(t,e){r.each(function(){i.apply(r,o||[t.responseText,e,t])})}),this},pt.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(t,e){pt.fn[e]=function(t){return this.on(e,t)}}),pt.expr.filters.animated=function(t){return pt.grep(pt.timers,function(e){return t===e.elem}).length},pt.offset={setOffset:function(t,e,i){var n,s,o,r,a,l,u,c=pt.css(t,"position"),h=pt(t),d={};"static"===c&&(t.style.position="relative"),a=h.offset(),o=pt.css(t,"top"),l=pt.css(t,"left"),u=("absolute"===c||"fixed"===c)&&pt.inArray("auto",[o,l])>-1,u?(n=h.position(),r=n.top,s=n.left):(r=parseFloat(o)||0,s=parseFloat(l)||0),pt.isFunction(e)&&(e=e.call(t,i,pt.extend({},a))),null!=e.top&&(d.top=e.top-a.top+r),null!=e.left&&(d.left=e.left-a.left+s),"using"in e?e.using.call(t,d):h.css(d)}},pt.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){pt.offset.setOffset(this,t,e)});var e,i,n={top:0,left:0},s=this[0],o=s&&s.ownerDocument;if(o)return e=o.documentElement,pt.contains(e,s)?("undefined"!=typeof s.getBoundingClientRect&&(n=s.getBoundingClientRect()),i=et(o),{top:n.top+(i.pageYOffset||e.scrollTop)-(e.clientTop||0),left:n.left+(i.pageXOffset||e.scrollLeft)-(e.clientLeft||0)}):n},position:function(){if(this[0]){var t,e,i={top:0,left:0},n=this[0];return"fixed"===pt.css(n,"position")?e=n.getBoundingClientRect():(t=this.offsetParent(),e=this.offset(),pt.nodeName(t[0],"html")||(i=t.offset()),i.top+=pt.css(t[0],"borderTopWidth",!0),i.left+=pt.css(t[0],"borderLeftWidth",!0)),{top:e.top-i.top-pt.css(n,"marginTop",!0),left:e.left-i.left-pt.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent;t&&!pt.nodeName(t,"html")&&"static"===pt.css(t,"position");)t=t.offsetParent;return t||pe})}}),pt.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,e){var i=/Y/.test(e);pt.fn[t]=function(n){return zt(this,function(t,n,s){var o=et(t);return void 0===s?o?e in o?o[e]:o.document.documentElement[n]:t[n]:void(o?o.scrollTo(i?pt(o).scrollLeft():s,i?s:pt(o).scrollTop()):t[n]=s)},t,n,arguments.length,null)}}),pt.each(["top","left"],function(t,e){pt.cssHooks[e]=M(ht.pixelPosition,function(t,i){return i?(i=me(t,e),he.test(i)?pt(t).position()[e]+"px":i):void 0})}),pt.each({Height:"height",Width:"width"},function(t,e){pt.each({padding:"inner"+t,content:e,"":"outer"+t},function(i,n){pt.fn[n]=function(n,s){var o=arguments.length&&(i||"boolean"!=typeof n),r=i||(n===!0||s===!0?"margin":"border");return zt(this,function(e,i,n){var s;return pt.isWindow(e)?e.document.documentElement["client"+t]:9===e.nodeType?(s=e.documentElement,Math.max(e.body["scroll"+t],s["scroll"+t],e.body["offset"+t],s["offset"+t],s["client"+t])):void 0===n?pt.css(e,i,r):pt.style(e,i,n,r)},e,o?n:void 0,o,null)}})}),pt.fn.extend({bind:function(t,e,i){return this.on(t,null,e,i)},unbind:function(t,e){return this.off(t,null,e)},delegate:function(t,e,i,n){return this.on(e,t,i,n)},undelegate:function(t,e,i){return 1===arguments.length?this.off(t,"**"):this.off(e,t||"**",i)}}),pt.fn.size=function(){return this.length},pt.fn.andSelf=pt.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return pt});var di=t.jQuery,pi=t.$;return pt.noConflict=function(e){return t.$===pt&&(t.$=pi),e&&t.jQuery===pt&&(t.jQuery=di),pt},e||(t.jQuery=t.$=pt),pt}),function(t,e){"use strict";t.rails!==e&&t.error("jquery-ujs has already been loaded!");var i,n=t(document);t.rails=i={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",buttonClickSelector:"button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",disableSelector:"input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",requiredInputSelector:"input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",fileInputSelector:"input[type=file]:not([disabled])",linkDisableSelector:"a[data-disable-with], a[data-disable]",buttonDisableSelector:"button[data-remote][data-disable-with], button[data-remote][data-disable]",csrfToken:function(){return t("meta[name=csrf-token]").attr("content")},csrfParam:function(){return t("meta[name=csrf-param]").attr("content")},CSRFProtection:function(t){var e=i.csrfToken();e&&t.setRequestHeader("X-CSRF-Token",e)},refreshCSRFTokens:function(){t('form input[name="'+i.csrfParam()+'"]').val(i.csrfToken())},fire:function(e,i,n){var s=t.Event(i);return e.trigger(s,n),s.result!==!1},confirm:function(t){return confirm(t)},ajax:function(e){return t.ajax(e)},href:function(t){return t[0].href},isRemote:function(t){return t.data("remote")!==e&&t.data("remote")!==!1},handleRemote:function(n){var s,o,r,a,l,u;if(i.fire(n,"ajax:before")){if(a=n.data("with-credentials")||null,l=n.data("type")||t.ajaxSettings&&t.ajaxSettings.dataType,n.is("form")){s=n.data("ujs:submit-button-formmethod")||n.attr("method"),o=n.data("ujs:submit-button-formaction")||n.attr("action"),r=t(n[0]).serializeArray();var c=n.data("ujs:submit-button");c&&(r.push(c),n.data("ujs:submit-button",null)),n.data("ujs:submit-button-formmethod",null),n.data("ujs:submit-button-formaction",null)}else n.is(i.inputChangeSelector)?(s=n.data("method"),o=n.data("url"),r=n.serialize(),n.data("params")&&(r=r+"&"+n.data("params"))):n.is(i.buttonClickSelector)?(s=n.data("method")||"get",o=n.data("url"),r=n.serialize(),n.data("params")&&(r=r+"&"+n.data("params"))):(s=n.data("method"),o=i.href(n),r=n.data("params")||null);return u={type:s||"GET",data:r,dataType:l,beforeSend:function(t,s){return s.dataType===e&&t.setRequestHeader("accept","*/*;q=0.5, "+s.accepts.script),i.fire(n,"ajax:beforeSend",[t,s])?void n.trigger("ajax:send",t):!1},success:function(t,e,i){n.trigger("ajax:success",[t,e,i])},complete:function(t,e){n.trigger("ajax:complete",[t,e])},error:function(t,e,i){n.trigger("ajax:error",[t,e,i])},crossDomain:i.isCrossDomain(o)},a&&(u.xhrFields={withCredentials:a}),o&&(u.url=o),i.ajax(u)}return!1},isCrossDomain:function(t){var e=document.createElement("a");e.href=location.href;var i=document.createElement("a");try{return i.href=t,i.href=i.href,!((!i.protocol||":"===i.protocol)&&!i.host||e.protocol+"//"+e.host==i.protocol+"//"+i.host)}catch(n){return!0}},handleMethod:function(n){var s=i.href(n),o=n.data("method"),r=n.attr("target"),a=i.csrfToken(),l=i.csrfParam(),u=t('<form method="post" action="'+s+'"></form>'),c='<input name="_method" value="'+o+'" type="hidden" />';l===e||a===e||i.isCrossDomain(s)||(c+='<input name="'+l+'" value="'+a+'" type="hidden" />'),r&&u.attr("target",r),u.hide().append(c).appendTo("body"),u.submit()},formElements:function(e,i){return e.is("form")?t(e[0].elements).filter(i):e.find(i)},disableFormElements:function(e){i.formElements(e,i.disableSelector).each(function(){i.disableFormElement(t(this))})},disableFormElement:function(t){var i,n;i=t.is("button")?"html":"val",n=t.data("disable-with"),n!==e&&(t.data("ujs:enable-with",t[i]()),t[i](n)),t.prop("disabled",!0),t.data("ujs:disabled",!0)},enableFormElements:function(e){i.formElements(e,i.enableSelector).each(function(){i.enableFormElement(t(this))})},enableFormElement:function(t){var i=t.is("button")?"html":"val";t.data("ujs:enable-with")!==e&&(t[i](t.data("ujs:enable-with")),t.removeData("ujs:enable-with")),t.prop("disabled",!1),t.removeData("ujs:disabled")},allowAction:function(t){var e,n=t.data("confirm"),s=!1;if(!n)return!0;if(i.fire(t,"confirm")){try{s=i.confirm(n)}catch(o){(console.error||console.log).call(console,o.stack||o)}e=i.fire(t,"confirm:complete",[s])}return s&&e},blankInputs:function(e,i,n){var s,o,r,a,l=t(),u=i||"input,textarea",c=e.find(u),h={};return c.each(function(){s=t(this),s.is("input[type=radio]")?(a=s.attr("name"),h[a]||(0===e.find('input[type=radio]:checked[name="'+a+'"]').length&&(r=e.find('input[type=radio][name="'+a+'"]'),l=l.add(r)),h[a]=a)):(o=s.is("input[type=checkbox],input[type=radio]")?s.is(":checked"):!!s.val(),o===n&&(l=l.add(s)))}),l.length?l:!1},nonBlankInputs:function(t,e){return i.blankInputs(t,e,!0)},stopEverything:function(e){return t(e.target).trigger("ujs:everythingStopped"),e.stopImmediatePropagation(),!1},disableElement:function(t){var n=t.data("disable-with");n!==e&&(t.data("ujs:enable-with",t.html()),t.html(n)),t.bind("click.railsDisable",function(t){return i.stopEverything(t)}),t.data("ujs:disabled",!0)},enableElement:function(t){t.data("ujs:enable-with")!==e&&(t.html(t.data("ujs:enable-with")),t.removeData("ujs:enable-with")),t.unbind("click.railsDisable"),t.removeData("ujs:disabled")}},i.fire(n,"rails:attachBindings")&&(t.ajaxPrefilter(function(t,e,n){t.crossDomain||i.CSRFProtection(n)}),t(window).on("pageshow.rails",function(){t(t.rails.enableSelector).each(function(){var e=t(this);e.data("ujs:disabled")&&t.rails.enableFormElement(e)}),t(t.rails.linkDisableSelector).each(function(){var e=t(this);e.data("ujs:disabled")&&t.rails.enableElement(e)})}),n.delegate(i.linkDisableSelector,"ajax:complete",function(){i.enableElement(t(this))}),n.delegate(i.buttonDisableSelector,"ajax:complete",function(){i.enableFormElement(t(this))}),n.delegate(i.linkClickSelector,"click.rails",function(e){var n=t(this),s=n.data("method"),o=n.data("params"),r=e.metaKey||e.ctrlKey;if(!i.allowAction(n))return i.stopEverything(e);if(!r&&n.is(i.linkDisableSelector)&&i.disableElement(n),i.isRemote(n)){if(r&&(!s||"GET"===s)&&!o)return!0;var a=i.handleRemote(n);return a===!1?i.enableElement(n):a.fail(function(){i.enableElement(n)}),!1}return s?(i.handleMethod(n),!1):void 0}),n.delegate(i.buttonClickSelector,"click.rails",function(e){var n=t(this);if(!i.allowAction(n)||!i.isRemote(n))return i.stopEverything(e);n.is(i.buttonDisableSelector)&&i.disableFormElement(n);var s=i.handleRemote(n);return s===!1?i.enableFormElement(n):s.fail(function(){i.enableFormElement(n)}),!1}),n.delegate(i.inputChangeSelector,"change.rails",function(e){var n=t(this);return i.allowAction(n)&&i.isRemote(n)?(i.handleRemote(n),!1):i.stopEverything(e)}),n.delegate(i.formSubmitSelector,"submit.rails",function(n){var s,o,r=t(this),a=i.isRemote(r);if(!i.allowAction(r))return i.stopEverything(n);if(r.attr("novalidate")===e)if(r.data("ujs:formnovalidate-button")===e){if(s=i.blankInputs(r,i.requiredInputSelector,!1),s&&i.fire(r,"ajax:aborted:required",[s]))return i.stopEverything(n)}else r.data("ujs:formnovalidate-button",e);if(a){if(o=i.nonBlankInputs(r,i.fileInputSelector)){setTimeout(function(){i.disableFormElements(r)},13);var l=i.fire(r,"ajax:aborted:file",[o]);return l||setTimeout(function(){i.enableFormElements(r)},13),l}return i.handleRemote(r),!1}setTimeout(function(){i.disableFormElements(r)},13)}),n.delegate(i.formInputClickSelector,"click.rails",function(e){var n=t(this);if(!i.allowAction(n))return i.stopEverything(e);var s=n.attr("name"),o=s?{name:s,value:n.val()}:null,r=n.closest("form");0===r.length&&(r=t("#"+n.attr("form"))),r.data("ujs:submit-button",o),r.data("ujs:formnovalidate-button",n.attr("formnovalidate")),r.data("ujs:submit-button-formaction",n.attr("formaction")),r.data("ujs:submit-button-formmethod",n.attr("formmethod"))}),n.delegate(i.formSubmitSelector,"ajax:send.rails",function(e){this===e.target&&i.disableFormElements(t(this))}),n.delegate(i.formSubmitSelector,"ajax:complete.rails",function(e){this===e.target&&i.enableFormElements(t(this))}),t(function(){i.refreshCSRFTokens()}))}(jQuery),/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){function e(e,n){var s,o,r,a=e.nodeName.toLowerCase();return"area"===a?(s=e.parentNode,o=s.name,e.href&&o&&"map"===s.nodeName.toLowerCase()?(r=t("img[usemap='#"+o+"']")[0],!!r&&i(r)):!1):(/^(input|select|textarea|button|object)$/.test(a)?!e.disabled:"a"===a?e.href||n:n)&&i(e)}function i(e){return t.expr.filters.visible(e)&&!t(e).parents().addBack().filter(function(){return"hidden"===t.css(this,"visibility")}).length}t.ui=t.ui||{},t.extend(t.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),t.fn.extend({scrollParent:function(e){var i=this.css("position"),n="absolute"===i,s=e?/(auto|scroll|hidden)/:/(auto|scroll)/,o=this.parents().filter(function(){var e=t(this);return n&&"static"===e.css("position")?!1:s.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))}).eq(0);return"fixed"!==i&&o.length?o:t(this[0].ownerDocument||document)},uniqueId:function(){var t=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++t)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&t(this).removeAttr("id")})}}),t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(i){return!!t.data(i,e)}}):function(e,i,n){return!!t.data(e,n[3])},focusable:function(i){return e(i,!isNaN(t.attr(i,"tabindex")))},tabbable:function(i){var n=t.attr(i,"tabindex"),s=isNaN(n);return(s||n>=0)&&e(i,!s)}}),t("<a>").outerWidth(1).jquery||t.each(["Width","Height"],function(e,i){function n(e,i,n,o){return t.each(s,function(){i-=parseFloat(t.css(e,"padding"+this))||0,n&&(i-=parseFloat(t.css(e,"border"+this+"Width"))||0),o&&(i-=parseFloat(t.css(e,"margin"+this))||0)}),i}var s="Width"===i?["Left","Right"]:["Top","Bottom"],o=i.toLowerCase(),r={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+i]=function(e){return void 0===e?r["inner"+i].call(this):this.each(function(){t(this).css(o,n(this,e)+"px")})},t.fn["outer"+i]=function(e,s){return"number"!=typeof e?r["outer"+i].call(this,e):this.each(function(){t(this).css(o,n(this,e,!0,s)+"px")})}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(t.fn.removeData=function(e){return function(i){return arguments.length?e.call(this,t.camelCase(i)):e.call(this)}}(t.fn.removeData)),t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),t.fn.extend({focus:function(e){return function(i,n){return"number"==typeof i?this.each(function(){var e=this;setTimeout(function(){t(e).focus(),n&&n.call(e)},i)}):e.apply(this,arguments)}}(t.fn.focus),disableSelection:function(){var t="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(t+".ui-disableSelection",function(t){t.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(e){if(void 0!==e)return this.css("zIndex",e);if(this.length)for(var i,n,s=t(this[0]);s.length&&s[0]!==document;){if(i=s.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(n=parseInt(s.css("zIndex"),10),!isNaN(n)&&0!==n))return n;s=s.parent()}return 0}}),t.ui.plugin={add:function(e,i,n){var s,o=t.ui[e].prototype;for(s in n)o.plugins[s]=o.plugins[s]||[],o.plugins[s].push([i,n[s]])},call:function(t,e,i,n){var s,o=t.plugins[e];if(o&&(n||t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType))for(s=0;s<o.length;s++)t.options[o[s][0]]&&o[s][1].apply(t.element,i)}}}),/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){var e=0,i=Array.prototype.slice;return t.cleanData=function(e){return function(i){var n,s,o;for(o=0;null!=(s=i[o]);o++)try{n=t._data(s,"events"),n&&n.remove&&t(s).triggerHandler("remove")}catch(r){}e(i)}}(t.cleanData),t.widget=function(e,i,n){var s,o,r,a,l={},u=e.split(".")[0];return e=e.split(".")[1],s=u+"-"+e,n||(n=i,i=t.Widget),t.expr[":"][s.toLowerCase()]=function(e){return!!t.data(e,s)},t[u]=t[u]||{},o=t[u][e],r=t[u][e]=function(t,e){return this._createWidget?void(arguments.length&&this._createWidget(t,e)):new r(t,e)},t.extend(r,o,{version:n.version,_proto:t.extend({},n),_childConstructors:[]}),a=new i,a.options=t.widget.extend({},a.options),t.each(n,function(e,n){return t.isFunction(n)?void(l[e]=function(){var t=function(){return i.prototype[e].apply(this,arguments)},s=function(t){return i.prototype[e].apply(this,t)};return function(){var e,i=this._super,o=this._superApply;return this._super=t,this._superApply=s,e=n.apply(this,arguments),this._super=i,this._superApply=o,e}}()):void(l[e]=n)}),r.prototype=t.widget.extend(a,{widgetEventPrefix:o?a.widgetEventPrefix||e:e},l,{constructor:r,namespace:u,widgetName:e,widgetFullName:s}),o?(t.each(o._childConstructors,function(e,i){var n=i.prototype;t.widget(n.namespace+"."+n.widgetName,r,i._proto)}),delete o._childConstructors):i._childConstructors.push(r),t.widget.bridge(e,r),r},t.widget.extend=function(e){for(var n,s,o=i.call(arguments,1),r=0,a=o.length;a>r;r++)for(n in o[r])s=o[r][n],o[r].hasOwnProperty(n)&&void 0!==s&&(t.isPlainObject(s)?e[n]=t.isPlainObject(e[n])?t.widget.extend({},e[n],s):t.widget.extend({},s):e[n]=s);return e},t.widget.bridge=function(e,n){var s=n.prototype.widgetFullName||e;t.fn[e]=function(o){var r="string"==typeof o,a=i.call(arguments,1),l=this;return r?this.each(function(){var i,n=t.data(this,s);return"instance"===o?(l=n,!1):n?t.isFunction(n[o])&&"_"!==o.charAt(0)?(i=n[o].apply(n,a),i!==n&&void 0!==i?(l=i&&i.jquery?l.pushStack(i.get()):i,!1):void 0):t.error("no such method '"+o+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; attempted to call method '"+o+"'")}):(a.length&&(o=t.widget.extend.apply(null,[o].concat(a))),this.each(function(){var e=t.data(this,s);e?(e.option(o||{}),e._init&&e._init()):t.data(this,s,new n(o,this))})),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(i,n){n=t(n||this.defaultElement||this)[0],this.element=t(n),this.uuid=e++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),n!==this&&(t.data(n,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===n&&this.destroy()}}),this.document=t(n.style?n.ownerDocument:n.document||n),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),i),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var n,s,o,r=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(r={},n=e.split("."),e=n.shift(),n.length){for(s=r[e]=t.widget.extend({},this.options[e]),o=0;o<n.length-1;o++)s[n[o]]=s[n[o]]||{},s=s[n[o]];if(e=n.pop(),1===arguments.length)return void 0===s[e]?null:s[e];s[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];r[e]=i}return this._setOptions(r),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!e),e&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(e,i,n){var s,o=this;"boolean"!=typeof e&&(n=i,i=e,e=!1),n?(i=s=t(i),this.bindings=this.bindings.add(i)):(n=i,i=this.element,s=this.widget()),t.each(n,function(n,r){function a(){return e||o.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof r?o[r]:r).apply(o,arguments):void 0}"string"!=typeof r&&(a.guid=r.guid=r.guid||a.guid||t.guid++);var l=n.match(/^([\w:-]*)\s*(.*)$/),u=l[1]+o.eventNamespace,c=l[2];c?s.delegate(c,u,a):i.bind(u,a)})},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(i).undelegate(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function i(){return("string"==typeof t?n[t]:t).apply(n,arguments)}var n=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,i,n){var s,o,r=this.options[e];if(n=n||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(s in o)s in i||(i[s]=o[s]);return this.element.trigger(i,n),!(t.isFunction(r)&&r.apply(this.element[0],[i].concat(n))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(n,s,o){"string"==typeof s&&(s={effect:s});var r,a=s?s===!0||"number"==typeof s?i:s.effect||i:e;s=s||{},"number"==typeof s&&(s={duration:s}),r=!t.isEmptyObject(s),s.complete=o,s.delay&&n.delay(s.delay),r&&t.effects&&t.effects.effect[a]?n[e](s):a!==e&&n[a]?n[a](s.duration,s.easing,o):n.queue(function(i){t(this)[e](),o&&o.call(n[0]),i()})}}),t.widget}),/*!
 * jQuery UI Accordion 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/accordion/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget"],t):t(jQuery)}(function(t){return t.widget("ui.accordion",{version:"1.11.4",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var e=this.options;this.prevShow=this.prevHide=t(),this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role","tablist"),e.collapsible||e.active!==!1&&null!=e.active||(e.active=0),this._processPanels(),e.active<0&&(e.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():t()}},_createIcons:function(){var e=this.options.icons;e&&(t("<span>").addClass("ui-accordion-header-icon ui-icon "+e.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var t;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(),this._destroyIcons(),t=this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display","").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(),"content"!==this.options.heightStyle&&t.css("height","")},_setOption:function(t,e){return"active"===t?void this._activate(e):("event"===t&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(e)),this._super(t,e),"collapsible"!==t||e||this.options.active!==!1||this._activate(0),"icons"===t&&(this._destroyIcons(),e&&this._createIcons()),void("disabled"===t&&(this.element.toggleClass("ui-state-disabled",!!e).attr("aria-disabled",e),this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!e))))},_keydown:function(e){if(!e.altKey&&!e.ctrlKey){var i=t.ui.keyCode,n=this.headers.length,s=this.headers.index(e.target),o=!1;switch(e.keyCode){case i.RIGHT:case i.DOWN:o=this.headers[(s+1)%n];break;case i.LEFT:case i.UP:o=this.headers[(s-1+n)%n];break;case i.SPACE:case i.ENTER:this._eventHandler(e);break;case i.HOME:o=this.headers[0];break;case i.END:o=this.headers[n-1]}o&&(t(e.target).attr("tabIndex",-1),t(o).attr("tabIndex",0),o.focus(),e.preventDefault())}},_panelKeyDown:function(e){e.keyCode===t.ui.keyCode.UP&&e.ctrlKey&&t(e.currentTarget).prev().focus()},refresh:function(){var e=this.options;this._processPanels(),e.active===!1&&e.collapsible===!0||!this.headers.length?(e.active=!1,this.active=t()):e.active===!1?this._activate(0):this.active.length&&!t.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(e.active=!1,this.active=t()):this._activate(Math.max(0,e.active-1)):e.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){var t=this.headers,e=this.panels;this.headers=this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"),this.panels=this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(),e&&(this._off(t.not(this.headers)),this._off(e.not(this.panels)))},_refresh:function(){var e,i=this.options,n=i.heightStyle,s=this.element.parent();this.active=this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),this.active.next().addClass("ui-accordion-content-active").show(),this.headers.attr("role","tab").each(function(){var e=t(this),i=e.uniqueId().attr("id"),n=e.next(),s=n.uniqueId().attr("id");e.attr("aria-controls",s),n.attr("aria-labelledby",i)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(i.event),"fill"===n?(e=s.height(),this.element.siblings(":visible").each(function(){var i=t(this),n=i.css("position");"absolute"!==n&&"fixed"!==n&&(e-=i.outerHeight(!0))}),this.headers.each(function(){e-=t(this).outerHeight(!0)}),this.headers.next().each(function(){t(this).height(Math.max(0,e-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===n&&(e=0,this.headers.next().each(function(){e=Math.max(e,t(this).css("height","").height())}).height(e))},_activate:function(e){var i=this._findActive(e)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return"number"==typeof e?this.headers.eq(e):t()},_setupEvents:function(e){var i={keydown:"_keydown"};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(e){var i=this.options,n=this.active,s=t(e.currentTarget),o=s[0]===n[0],r=o&&i.collapsible,a=r?t():s.next(),l=n.next(),u={oldHeader:n,oldPanel:l,newHeader:r?t():s,newPanel:a};e.preventDefault(),o&&!i.collapsible||this._trigger("beforeActivate",e,u)===!1||(i.active=r?!1:this.headers.index(s),this.active=o?t():s,this._toggle(u),n.removeClass("ui-accordion-header-active ui-state-active"),i.icons&&n.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header),o||(s.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),i.icons&&s.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader),s.next().addClass("ui-accordion-content-active")))},_toggle:function(e){var i=e.newPanel,n=this.prevShow.length?this.prevShow:e.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=n,this.options.animate?this._animate(i,n,e):(n.hide(),i.show(),this._toggleComplete(e)),n.attr({"aria-hidden":"true"}),n.prev().attr({"aria-selected":"false","aria-expanded":"false"}),i.length&&n.length?n.prev().attr({tabIndex:-1,"aria-expanded":"false"}):i.length&&this.headers.filter(function(){return 0===parseInt(t(this).attr("tabIndex"),10)}).attr("tabIndex",-1),i.attr("aria-hidden","false").prev().attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_animate:function(t,e,i){var n,s,o,r=this,a=0,l=t.css("box-sizing"),u=t.length&&(!e.length||t.index()<e.index()),c=this.options.animate||{},h=u&&c.down||c,d=function(){r._toggleComplete(i)};return"number"==typeof h&&(o=h),"string"==typeof h&&(s=h),s=s||h.easing||c.easing,o=o||h.duration||c.duration,e.length?t.length?(n=t.show().outerHeight(),e.animate(this.hideProps,{duration:o,easing:s,step:function(t,e){e.now=Math.round(t)}}),void t.hide().animate(this.showProps,{duration:o,easing:s,complete:d,step:function(t,i){i.now=Math.round(t),"height"!==i.prop?"content-box"===l&&(a+=i.now):"content"!==r.options.heightStyle&&(i.now=Math.round(n-e.outerHeight()-a),a=0)}})):e.animate(this.hideProps,o,s,d):t.animate(this.showProps,o,s,d)},_toggleComplete:function(t){var e=t.oldPanel;e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),e.length&&(e.parent()[0].className=e.parent()[0].className),this._trigger("activate",null,t)}})}),/*!
 * jQuery UI Position 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){return function(){function e(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function i(e,i){return parseInt(t.css(e,i),10)||0}function n(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var s,o,r=Math.max,a=Math.abs,l=Math.round,u=/left|center|right/,c=/top|center|bottom/,h=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(void 0!==s)return s;var e,i,n=t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=n.children()[0];return t("body").append(n),e=o.offsetWidth,n.css("overflow","scroll"),i=o.offsetWidth,e===i&&(i=n[0].clientWidth),n.remove(),s=e-i},getScrollInfo:function(e){var i=e.isWindow||e.isDocument?"":e.element.css("overflow-x"),n=e.isWindow||e.isDocument?"":e.element.css("overflow-y"),s="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,o="scroll"===n||"auto"===n&&e.height<e.element[0].scrollHeight;return{width:o?t.position.scrollbarWidth():0,height:s?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),n=t.isWindow(i[0]),s=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:n,isDocument:s,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:n||s?i.width():i.outerWidth(),height:n||s?i.height():i.outerHeight()}}},t.fn.position=function(s){if(!s||!s.of)return f.apply(this,arguments);s=t.extend({},s);var p,m,g,v,y,b,_=t(s.of),w=t.position.getWithinInfo(s.within),x=t.position.getScrollInfo(w),C=(s.collision||"flip").split(" "),k={};return b=n(_),_[0].preventDefault&&(s.at="left top"),m=b.width,g=b.height,v=b.offset,y=t.extend({},v),t.each(["my","at"],function(){var t,e,i=(s[this]||"").split(" ");1===i.length&&(i=u.test(i[0])?i.concat(["center"]):c.test(i[0])?["center"].concat(i):["center","center"]),i[0]=u.test(i[0])?i[0]:"center",i[1]=c.test(i[1])?i[1]:"center",t=h.exec(i[0]),e=h.exec(i[1]),k[this]=[t?t[0]:0,e?e[0]:0],s[this]=[d.exec(i[0])[0],d.exec(i[1])[0]]}),1===C.length&&(C[1]=C[0]),"right"===s.at[0]?y.left+=m:"center"===s.at[0]&&(y.left+=m/2),"bottom"===s.at[1]?y.top+=g:"center"===s.at[1]&&(y.top+=g/2),p=e(k.at,m,g),y.left+=p[0],y.top+=p[1],this.each(function(){var n,u,c=t(this),h=c.outerWidth(),d=c.outerHeight(),f=i(this,"marginLeft"),b=i(this,"marginTop"),T=h+f+i(this,"marginRight")+x.width,D=d+b+i(this,"marginBottom")+x.height,E=t.extend({},y),S=e(k.my,c.outerWidth(),c.outerHeight());"right"===s.my[0]?E.left-=h:"center"===s.my[0]&&(E.left-=h/2),"bottom"===s.my[1]?E.top-=d:"center"===s.my[1]&&(E.top-=d/2),E.left+=S[0],E.top+=S[1],o||(E.left=l(E.left),E.top=l(E.top)),n={marginLeft:f,marginTop:b},t.each(["left","top"],function(e,i){t.ui.position[C[e]]&&t.ui.position[C[e]][i](E,{targetWidth:m,targetHeight:g,elemWidth:h,elemHeight:d,collisionPosition:n,collisionWidth:T,collisionHeight:D,offset:[p[0]+S[0],p[1]+S[1]],my:s.my,at:s.at,within:w,elem:c})}),s.using&&(u=function(t){var e=v.left-E.left,i=e+m-h,n=v.top-E.top,o=n+g-d,l={target:{element:_,left:v.left,top:v.top,width:m,height:g},element:{element:c,left:E.left,top:E.top,width:h,height:d},horizontal:0>i?"left":e>0?"right":"center",vertical:0>o?"top":n>0?"bottom":"middle"};h>m&&a(e+i)<m&&(l.horizontal="center"),d>g&&a(n+o)<g&&(l.vertical="middle"),r(a(e),a(i))>r(a(n),a(o))?l.important="horizontal":l.important="vertical",s.using.call(this,t,l)}),c.offset(t.extend(E,{using:u}))})},t.ui.position={fit:{left:function(t,e){var i,n=e.within,s=n.isWindow?n.scrollLeft:n.offset.left,o=n.width,a=t.left-e.collisionPosition.marginLeft,l=s-a,u=a+e.collisionWidth-o-s;e.collisionWidth>o?l>0&&0>=u?(i=t.left+l+e.collisionWidth-o-s,t.left+=l-i):u>0&&0>=l?t.left=s:l>u?t.left=s+o-e.collisionWidth:t.left=s:l>0?t.left+=l:u>0?t.left-=u:t.left=r(t.left-a,t.left)},top:function(t,e){var i,n=e.within,s=n.isWindow?n.scrollTop:n.offset.top,o=e.within.height,a=t.top-e.collisionPosition.marginTop,l=s-a,u=a+e.collisionHeight-o-s;e.collisionHeight>o?l>0&&0>=u?(i=t.top+l+e.collisionHeight-o-s,t.top+=l-i):u>0&&0>=l?t.top=s:l>u?t.top=s+o-e.collisionHeight:t.top=s:l>0?t.top+=l:u>0?t.top-=u:t.top=r(t.top-a,t.top)}},flip:{left:function(t,e){var i,n,s=e.within,o=s.offset.left+s.scrollLeft,r=s.width,l=s.isWindow?s.scrollLeft:s.offset.left,u=t.left-e.collisionPosition.marginLeft,c=u-l,h=u+e.collisionWidth-r-l,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-r-o,(0>i||i<a(c))&&(t.left+=d+p+f)):h>0&&(n=t.left-e.collisionPosition.marginLeft+d+p+f-l,(n>0||a(n)<h)&&(t.left+=d+p+f))},top:function(t,e){var i,n,s=e.within,o=s.offset.top+s.scrollTop,r=s.height,l=s.isWindow?s.scrollTop:s.offset.top,u=t.top-e.collisionPosition.marginTop,c=u-l,h=u+e.collisionHeight-r-l,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,m=-2*e.offset[1];0>c?(n=t.top+p+f+m+e.collisionHeight-r-o,(0>n||n<a(c))&&(t.top+=p+f+m)):h>0&&(i=t.top-e.collisionPosition.marginTop+p+f+m-l,(i>0||a(i)<h)&&(t.top+=p+f+m))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,n,s,r,a=document.getElementsByTagName("body")[0],l=document.createElement("div");e=document.createElement(a?"div":"body"),n={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},a&&t.extend(n,{position:"absolute",left:"-1000px",top:"-1000px"});for(r in n)e.style[r]=n[r];e.appendChild(l),i=a||document.documentElement,i.insertBefore(e,i.firstChild),l.style.cssText="position: absolute; left: 10.7432222px;",s=t(l).offset().left,o=s>10&&11>s,e.innerHTML="",i.removeChild(e)}()}(),t.ui.position}),/*!
 * jQuery UI Menu 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/menu/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./position"],t):t(jQuery)}(function(t){return t.widget("ui.menu",{version:"1.11.4",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},items:"> *",menus:"ul",position:{my:"left-1 top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item":function(t){t.preventDefault()},"click .ui-menu-item":function(e){var i=t(e.target);!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(e),e.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(e):!this.element.is(":focus")&&t(this.document[0].activeElement).closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(e){if(!this.previousFilter){var i=t(e.currentTarget);i.siblings(".ui-state-active").removeClass("ui-state-active"),this.focus(e,i)}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(t,e){var i=this.active||this.element.find(this.options.items).eq(0);e||this.focus(t,i)},blur:function(e){this._delay(function(){t.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(e)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(t){this._closeOnDocumentClick(t)&&this.collapseAll(t),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var e=t(this);e.data("ui-menu-submenu-carat")&&e.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(e){var i,n,s,o,r=!0;switch(e.keyCode){case t.ui.keyCode.PAGE_UP:this.previousPage(e);break;case t.ui.keyCode.PAGE_DOWN:this.nextPage(e);break;case t.ui.keyCode.HOME:this._move("first","first",e);break;case t.ui.keyCode.END:this._move("last","last",e);break;case t.ui.keyCode.UP:this.previous(e);break;case t.ui.keyCode.DOWN:this.next(e);break;case t.ui.keyCode.LEFT:this.collapse(e);break;case t.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(e);break;case t.ui.keyCode.ENTER:case t.ui.keyCode.SPACE:this._activate(e);break;case t.ui.keyCode.ESCAPE:this.collapse(e);break;default:r=!1,n=this.previousFilter||"",s=String.fromCharCode(e.keyCode),o=!1,clearTimeout(this.filterTimer),s===n?o=!0:s=n+s,i=this._filterMenuItems(s),i=o&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,i.length||(s=String.fromCharCode(e.keyCode),i=this._filterMenuItems(s)),i.length?(this.focus(e,i),this.previousFilter=s,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}r&&e.preventDefault()},_activate:function(t){this.active.is(".ui-state-disabled")||(this.active.is("[aria-haspopup='true']")?this.expand(t):this.select(t))},refresh:function(){var e,i,n=this,s=this.options.icons.submenu,o=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length),o.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var e=t(this),i=e.parent(),n=t("<span>").addClass("ui-menu-icon ui-icon "+s).data("ui-menu-submenu-carat",!0);i.attr("aria-haspopup","true").prepend(n),e.attr("aria-labelledby",i.attr("id"))}),e=o.add(this.element),i=e.find(this.options.items),i.not(".ui-menu-item").each(function(){var e=t(this);n._isDivider(e)&&e.addClass("ui-widget-content ui-menu-divider")}),i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),i.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!t.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(t,e){"icons"===t&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu),"disabled"===t&&this.element.toggleClass("ui-state-disabled",!!e).attr("aria-disabled",e),this._super(t,e)},focus:function(t,e){var i,n;this.blur(t,t&&"focus"===t.type),this._scrollIntoView(e),this.active=e.first(),n=this.active.addClass("ui-state-focus").removeClass("ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",n.attr("id")),this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"),t&&"keydown"===t.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=e.children(".ui-menu"),i.length&&t&&/^mouse/.test(t.type)&&this._startOpening(i),this.activeMenu=e.parent(),this._trigger("focus",t,{item:e})},_scrollIntoView:function(e){var i,n,s,o,r,a;this._hasScroll()&&(i=parseFloat(t.css(this.activeMenu[0],"borderTopWidth"))||0,n=parseFloat(t.css(this.activeMenu[0],"paddingTop"))||0,s=e.offset().top-this.activeMenu.offset().top-i-n,o=this.activeMenu.scrollTop(),r=this.activeMenu.height(),a=e.outerHeight(),0>s?this.activeMenu.scrollTop(o+s):s+a>r&&this.activeMenu.scrollTop(o+s-r+a))},blur:function(t,e){e||clearTimeout(this.timer),this.active&&(this.active.removeClass("ui-state-focus"),this.active=null,this._trigger("blur",t,{item:this.active}))},_startOpening:function(t){clearTimeout(this.timer),"true"===t.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(t)},this.delay))},_open:function(e){var i=t.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden","true"),e.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(e,i){clearTimeout(this.timer),this.timer=this._delay(function(){var n=i?this.element:t(e&&e.target).closest(this.element.find(".ui-menu"));n.length||(n=this.element),this._close(n),this.blur(e),this.activeMenu=n},this.delay)},_close:function(t){t||(t=this.active?this.active.parent():this.element),t.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")},_closeOnDocumentClick:function(e){return!t(e.target).closest(".ui-menu").length},_isDivider:function(t){return!/[^\-\u2014\u2013\s]/.test(t.text())},collapse:function(t){var e=this.active&&this.active.parent().closest(".ui-menu-item",this.element);e&&e.length&&(this._close(),this.focus(t,e))},expand:function(t){var e=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();e&&e.length&&(this._open(e.parent()),this._delay(function(){this.focus(t,e)}))},next:function(t){this._move("next","first",t)},previous:function(t){this._move("prev","last",t)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(t,e,i){var n;this.active&&(n="first"===t||"last"===t?this.active["first"===t?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[t+"All"](".ui-menu-item").eq(0)),n&&n.length&&this.active||(n=this.activeMenu.find(this.options.items)[e]()),this.focus(i,n)},nextPage:function(e){var i,n,s;return this.active?void(this.isLastItem()||(this._hasScroll()?(n=this.active.offset().top,s=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=t(this),i.offset().top-n-s<0}),this.focus(e,i)):this.focus(e,this.activeMenu.find(this.options.items)[this.active?"last":"first"]()))):void this.next(e)},previousPage:function(e){var i,n,s;return this.active?void(this.isFirstItem()||(this._hasScroll()?(n=this.active.offset().top,s=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=t(this),i.offset().top-n+s>0}),this.focus(e,i)):this.focus(e,this.activeMenu.find(this.options.items).first()))):void this.next(e)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(e){this.active=this.active||t(e.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(e,!0),this._trigger("select",e,i)},_filterMenuItems:function(e){var i=e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),n=new RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return n.test(t.trim(t(this).text()))})}})}),/*!
 * jQuery UI Autocomplete 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/autocomplete/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./position","./menu"],t):t(jQuery)}(function(t){return t.widget("ui.autocomplete",{version:"1.11.4",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var e,i,n,s=this.element[0].nodeName.toLowerCase(),o="textarea"===s,r="input"===s;this.isMultiLine=o?!0:r?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[o||r?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(s){if(this.element.prop("readOnly"))return e=!0,n=!0,void(i=!0);e=!1,n=!1,i=!1;var o=t.ui.keyCode;switch(s.keyCode){case o.PAGE_UP:e=!0,this._move("previousPage",s);break;case o.PAGE_DOWN:e=!0,this._move("nextPage",s);break;case o.UP:e=!0,this._keyEvent("previous",s);break;case o.DOWN:e=!0,this._keyEvent("next",s);break;case o.ENTER:this.menu.active&&(e=!0,s.preventDefault(),this.menu.select(s));break;case o.TAB:this.menu.active&&this.menu.select(s);break;case o.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(s),s.preventDefault());break;default:i=!0,this._searchTimeout(s)}},keypress:function(n){if(e)return e=!1,void(this.isMultiLine&&!this.menu.element.is(":visible")||n.preventDefault());if(!i){var s=t.ui.keyCode;switch(n.keyCode){case s.PAGE_UP:this._move("previousPage",n);break;case s.PAGE_DOWN:this._move("nextPage",n);break;case s.UP:this._keyEvent("previous",n);break;case s.DOWN:this._keyEvent("next",n)}}},input:function(t){return n?(n=!1,void t.preventDefault()):void this._searchTimeout(t)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(t){return this.cancelBlur?void delete this.cancelBlur:(clearTimeout(this.searching),this.close(t),void this._change(t))}}),this._initSource(),this.menu=t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._on(this.menu.element,{mousedown:function(e){e.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var i=this.menu.element[0];t(e.target).closest(".ui-menu-item").length||this._delay(function(){var e=this;this.document.one("mousedown",function(n){n.target===e.element[0]||n.target===i||t.contains(i,n.target)||e.close()})})},menufocus:function(e,i){var n,s;return this.isNewMenu&&(this.isNewMenu=!1,e.originalEvent&&/^mouse/.test(e.originalEvent.type))?(this.menu.blur(),void this.document.one("mousemove",function(){t(e.target).trigger(e.originalEvent)})):(s=i.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",e,{item:s})&&e.originalEvent&&/^key/.test(e.originalEvent.type)&&this._value(s.value),n=i.item.attr("aria-label")||s.value,void(n&&t.trim(n).length&&(this.liveRegion.children().hide(),t("<div>").text(n).appendTo(this.liveRegion))))},menuselect:function(t,e){var i=e.item.data("ui-autocomplete-item"),n=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=n,this._delay(function(){this.previous=n,this.selectedItem=i})),!1!==this._trigger("select",t,{item:i})&&this._value(i.value),this.term=this._value(),this.close(t),this.selectedItem=i}}),this.liveRegion=t("<span>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(t,e){this._super(t,e),"source"===t&&this._initSource(),"appendTo"===t&&this.menu.element.appendTo(this._appendTo()),"disabled"===t&&e&&this.xhr&&this.xhr.abort()},_appendTo:function(){var e=this.options.appendTo;return e&&(e=e.jquery||e.nodeType?t(e):this.document.find(e).eq(0)),e&&e[0]||(e=this.element.closest(".ui-front")),e.length||(e=this.document[0].body),e},_initSource:function(){var e,i,n=this;t.isArray(this.options.source)?(e=this.options.source,this.source=function(i,n){n(t.ui.autocomplete.filter(e,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(e,s){n.xhr&&n.xhr.abort(),n.xhr=t.ajax({url:i,data:e,dataType:"json",success:function(t){s(t)},error:function(){s([])}})}):this.source=this.options.source},_searchTimeout:function(t){clearTimeout(this.searching),this.searching=this._delay(function(){var e=this.term===this._value(),i=this.menu.element.is(":visible"),n=t.altKey||t.ctrlKey||t.metaKey||t.shiftKey;e&&(!e||i||n)||(this.selectedItem=null,this.search(null,t))},this.options.delay)},search:function(t,e){return t=null!=t?t:this._value(),this.term=this._value(),t.length<this.options.minLength?this.close(e):this._trigger("search",e)!==!1?this._search(t):void 0},_search:function(t){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:t},this._response())},_response:function(){var e=++this.requestIndex;return t.proxy(function(t){e===this.requestIndex&&this.__response(t),this.pending--,this.pending||this.element.removeClass("ui-autocomplete-loading")},this)},__response:function(t){t&&(t=this._normalize(t)),this._trigger("response",null,{content:t}),!this.options.disabled&&t&&t.length&&!this.cancelSearch?(this._suggest(t),this._trigger("open")):this._close()},close:function(t){this.cancelSearch=!0,this._close(t)},_close:function(t){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",t))},_change:function(t){this.previous!==this._value()&&this._trigger("change",t,{item:this.selectedItem})},_normalize:function(e){return e.length&&e[0].label&&e[0].value?e:t.map(e,function(e){return"string"==typeof e?{label:e,value:e}:t.extend({},e,{label:e.label||e.value,value:e.value||e.label})})},_suggest:function(e){var i=this.menu.element.empty();this._renderMenu(i,e),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(t.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var t=this.menu.element;t.outerWidth(Math.max(t.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(e,i){var n=this;t.each(i,function(t,i){n._renderItemData(e,i)})},_renderItemData:function(t,e){return this._renderItem(t,e).data("ui-autocomplete-item",e)},_renderItem:function(e,i){return t("<li>").text(i.label).appendTo(e)},_move:function(t,e){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(t)||this.menu.isLastItem()&&/^next/.test(t)?(this.isMultiLine||this._value(this.term),void this.menu.blur()):void this.menu[t](e):void this.search(null,e)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(t,e){this.isMultiLine&&!this.menu.element.is(":visible")||(this._move(t,e),e.preventDefault())}}),t.extend(t.ui.autocomplete,{escapeRegex:function(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(e,i){var n=new RegExp(t.ui.autocomplete.escapeRegex(i),"i");return t.grep(e,function(t){return n.test(t.label||t.value||t)})}}),t.widget("ui.autocomplete",t.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(t){return t+(t>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var i;this._superApply(arguments),this.options.disabled||this.cancelSearch||(i=e&&e.length?this.options.messages.results(e.length):this.options.messages.noResults,this.liveRegion.children().hide(),t("<div>").text(i).appendTo(this.liveRegion))}}),t.ui.autocomplete}),/*!
 * jQuery UI Button 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/button/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget"],t):t(jQuery)}(function(t){var e,i="ui-button ui-widget ui-state-default ui-corner-all",n="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",s=function(){var e=t(this);setTimeout(function(){e.find(":ui-button").button("refresh")},1)},o=function(e){var i=e.name,n=e.form,s=t([]);return i&&(i=i.replace(/'/g,"\\'"),s=n?t(n).find("[name='"+i+"'][type=radio]"):t("[name='"+i+"'][type=radio]",e.ownerDocument).filter(function(){return!this.form})),s};return t.widget("ui.button",{version:"1.11.4",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,s),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var n=this,r=this.options,a="checkbox"===this.type||"radio"===this.type,l=a?"":"ui-state-active";null===r.label&&(r.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(i).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){r.disabled||this===e&&t(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){r.disabled||t(this).removeClass(l)}).bind("click"+this.eventNamespace,function(t){r.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}),this._on({focus:function(){this.buttonElement.addClass("ui-state-focus")},blur:function(){this.buttonElement.removeClass("ui-state-focus")}}),a&&this.element.bind("change"+this.eventNamespace,function(){n.refresh()}),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return r.disabled?!1:void 0}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(r.disabled)return!1;t(this).addClass("ui-state-active"),n.buttonElement.attr("aria-pressed","true");var e=n.element[0];o(e).not(e).map(function(){return t(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return r.disabled?!1:(t(this).addClass("ui-state-active"),e=this,void n.document.one("mouseup",function(){e=null}))}).bind("mouseup"+this.eventNamespace,function(){return r.disabled?!1:void t(this).removeClass("ui-state-active")}).bind("keydown"+this.eventNamespace,function(e){return r.disabled?!1:void(e.keyCode!==t.ui.keyCode.SPACE&&e.keyCode!==t.ui.keyCode.ENTER||t(this).addClass("ui-state-active"))}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){t(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(e){e.keyCode===t.ui.keyCode.SPACE&&t(this).click()})),this._setOption("disabled",r.disabled),this._resetButton()},_determineButtonType:function(){var t,e,i;this.element.is("[type=checkbox]")?this.type="checkbox":this.element.is("[type=radio]")?this.type="radio":this.element.is("input")?this.type="input":this.type="button","checkbox"===this.type||"radio"===this.type?(t=this.element.parents().last(),e="label[for='"+this.element.attr("id")+"']",this.buttonElement=t.find(e),this.buttonElement.length||(t=t.length?t.siblings():this.element.siblings(),this.buttonElement=t.filter(e),this.buttonElement.length||(this.buttonElement=t.find(e))),this.element.addClass("ui-helper-hidden-accessible"),i=this.element.is(":checked"),i&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",i)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(i+" ui-state-active "+n).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(t,e){return this._super(t,e),"disabled"===t?(this.widget().toggleClass("ui-state-disabled",!!e),this.element.prop("disabled",!!e),void(e&&("checkbox"===this.type||"radio"===this.type?this.buttonElement.removeClass("ui-state-focus"):this.buttonElement.removeClass("ui-state-focus ui-state-active")))):void this._resetButton()},refresh:function(){var e=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");e!==this.options.disabled&&this._setOption("disabled",e),"radio"===this.type?o(this.element[0]).each(function(){t(this).is(":checked")?t(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return void(this.options.label&&this.element.val(this.options.label));var e=this.buttonElement.removeClass(n),i=t("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),s=this.options.icons,o=s.primary&&s.secondary,r=[];s.primary||s.secondary?(this.options.text&&r.push("ui-button-text-icon"+(o?"s":s.primary?"-primary":"-secondary")),s.primary&&e.prepend("<span class='ui-button-icon-primary ui-icon "+s.primary+"'></span>"),s.secondary&&e.append("<span class='ui-button-icon-secondary ui-icon "+s.secondary+"'></span>"),this.options.text||(r.push(o?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||e.attr("title",t.trim(i)))):r.push("ui-button-text-only"),e.addClass(r.join(" "))}}),t.widget("ui.buttonset",{version:"1.11.4",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(t,e){"disabled"===t&&this.buttons.button("option",t,e),this._super(t,e)},refresh:function(){var e="rtl"===this.element.css("direction"),i=this.element.find(this.options.items),n=i.filter(":ui-button");i.not(":ui-button").button(),n.button("refresh"),this.buttons=i.map(function(){return t(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(e?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return t(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}}),t.ui.button}),/*!
 * jQuery UI Datepicker 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/datepicker/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./core"],t):t(jQuery)}(function(t){function e(t){for(var e,i;t.length&&t[0]!==document;){if(e=t.css("position"),("absolute"===e||"relative"===e||"fixed"===e)&&(i=parseInt(t.css("zIndex"),10),!isNaN(i)&&0!==i))return i;t=t.parent()}return 0}function i(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},t.extend(this._defaults,this.regional[""]),this.regional.en=t.extend(!0,{},this.regional[""]),this.regional["en-US"]=t.extend(!0,{},this.regional.en),this.dpDiv=n(t("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function n(e){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.delegate(i,"mouseout",function(){t(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).removeClass("ui-datepicker-next-hover")}).delegate(i,"mouseover",s)}function s(){t.datepicker._isDisabledDatepicker(r.inline?r.dpDiv.parent()[0]:r.input[0])||(t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),t(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).addClass("ui-datepicker-next-hover"))}function o(e,i){t.extend(e,i);for(var n in i)null==i[n]&&(e[n]=i[n]);return e}t.extend(t.ui,{datepicker:{version:"1.11.4"}});var r;return t.extend(i.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(t){return o(this._defaults,t||{}),this},_attachDatepicker:function(e,i){var n,s,o;n=e.nodeName.toLowerCase(),s="div"===n||"span"===n,e.id||(this.uuid+=1,e.id="dp"+this.uuid),o=this._newInst(t(e),s),o.settings=t.extend({},i||{}),"input"===n?this._connectDatepicker(e,o):s&&this._inlineDatepicker(e,o)},_newInst:function(e,i){var s=e[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:s,input:e,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?n(t("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(e,i){var n=t(e);i.append=t([]),i.trigger=t([]),n.hasClass(this.markerClassName)||(this._attachments(n,i),n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),this._autoSize(i),t.data(e,"datepicker",i),i.settings.disabled&&this._disableDatepicker(e))},_attachments:function(e,i){var n,s,o,r=this._get(i,"appendText"),a=this._get(i,"isRTL");i.append&&i.append.remove(),r&&(i.append=t("<span class='"+this._appendClass+"'>"+r+"</span>"),e[a?"before":"after"](i.append)),e.unbind("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),n=this._get(i,"showOn"),"focus"!==n&&"both"!==n||e.focus(this._showDatepicker),"button"!==n&&"both"!==n||(s=this._get(i,"buttonText"),o=this._get(i,"buttonImage"),i.trigger=t(this._get(i,"buttonImageOnly")?t("<img/>").addClass(this._triggerClass).attr({src:o,alt:s,title:s}):t("<button type='button'></button>").addClass(this._triggerClass).html(o?t("<img/>").attr({src:o,alt:s,title:s}):s)),e[a?"before":"after"](i.trigger),i.trigger.click(function(){return t.datepicker._datepickerShowing&&t.datepicker._lastInput===e[0]?t.datepicker._hideDatepicker():t.datepicker._datepickerShowing&&t.datepicker._lastInput!==e[0]?(t.datepicker._hideDatepicker(),t.datepicker._showDatepicker(e[0])):t.datepicker._showDatepicker(e[0]),!1}))},_autoSize:function(t){if(this._get(t,"autoSize")&&!t.inline){var e,i,n,s,o=new Date(2009,11,20),r=this._get(t,"dateFormat");r.match(/[DM]/)&&(e=function(t){for(i=0,n=0,s=0;s<t.length;s++)t[s].length>i&&(i=t[s].length,n=s);return n},o.setMonth(e(this._get(t,r.match(/MM/)?"monthNames":"monthNamesShort"))),o.setDate(e(this._get(t,r.match(/DD/)?"dayNames":"dayNamesShort"))+20-o.getDay())),t.input.attr("size",this._formatDate(t,o).length)}},_inlineDatepicker:function(e,i){var n=t(e);n.hasClass(this.markerClassName)||(n.addClass(this.markerClassName).append(i.dpDiv),t.data(e,"datepicker",i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(e),i.dpDiv.css("display","block"))},_dialogDatepicker:function(e,i,n,s,r){var a,l,u,c,h,d=this._dialogInst;return d||(this.uuid+=1,a="dp"+this.uuid,this._dialogInput=t("<input type='text' id='"+a+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.keydown(this._doKeyDown),t("body").append(this._dialogInput),d=this._dialogInst=this._newInst(this._dialogInput,!1),d.settings={},t.data(this._dialogInput[0],"datepicker",d)),o(d.settings,s||{}),i=i&&i.constructor===Date?this._formatDate(d,i):i,this._dialogInput.val(i),this._pos=r?r.length?r:[r.pageX,r.pageY]:null,this._pos||(l=document.documentElement.clientWidth,u=document.documentElement.clientHeight,c=document.documentElement.scrollLeft||document.body.scrollLeft,h=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[l/2-100+c,u/2-150+h]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),d.settings.onSelect=n,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),t.blockUI&&t.blockUI(this.dpDiv),t.data(this._dialogInput[0],"datepicker",d),this},_destroyDatepicker:function(e){var i,n=t(e),s=t.data(e,"datepicker");n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),t.removeData(e,"datepicker"),"input"===i?(s.append.remove(),s.trigger.remove(),n.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):"div"!==i&&"span"!==i||n.removeClass(this.markerClassName).empty(),r===s&&(r=null))},_enableDatepicker:function(e){var i,n,s=t(e),o=t.data(e,"datepicker");s.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!1,o.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):"div"!==i&&"span"!==i||(n=s.children("."+this._inlineClass),n.children().removeClass("ui-state-disabled"),n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}))},_disableDatepicker:function(e){var i,n,s=t(e),o=t.data(e,"datepicker");s.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!0,o.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):"div"!==i&&"span"!==i||(n=s.children("."+this._inlineClass),n.children().addClass("ui-state-disabled"),n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}),this._disabledInputs[this._disabledInputs.length]=e)},_isDisabledDatepicker:function(t){if(!t)return!1;for(var e=0;e<this._disabledInputs.length;e++)if(this._disabledInputs[e]===t)return!0;return!1},_getInst:function(e){try{return t.data(e,"datepicker")}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(e,i,n){var s,r,a,l,u=this._getInst(e);return 2===arguments.length&&"string"==typeof i?"defaults"===i?t.extend({},t.datepicker._defaults):u?"all"===i?t.extend({},u.settings):this._get(u,i):null:(s=i||{},"string"==typeof i&&(s={},s[i]=n),void(u&&(this._curInst===u&&this._hideDatepicker(),r=this._getDateDatepicker(e,!0),a=this._getMinMaxDate(u,"min"),l=this._getMinMaxDate(u,"max"),o(u.settings,s),null!==a&&void 0!==s.dateFormat&&void 0===s.minDate&&(u.settings.minDate=this._formatDate(u,a)),null!==l&&void 0!==s.dateFormat&&void 0===s.maxDate&&(u.settings.maxDate=this._formatDate(u,l)),"disabled"in s&&(s.disabled?this._disableDatepicker(e):this._enableDatepicker(e)),this._attachments(t(e),u),this._autoSize(u),this._setDate(u,r),this._updateAlternate(u),this._updateDatepicker(u))))},_changeDatepicker:function(t,e,i){this._optionDatepicker(t,e,i)},_refreshDatepicker:function(t){var e=this._getInst(t);e&&this._updateDatepicker(e)},_setDateDatepicker:function(t,e){var i=this._getInst(t);i&&(this._setDate(i,e),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(t,e){var i=this._getInst(t);return i&&!i.inline&&this._setDateFromField(i,e),i?this._getDate(i):null},_doKeyDown:function(e){var i,n,s,o=t.datepicker._getInst(e.target),r=!0,a=o.dpDiv.is(".ui-datepicker-rtl");if(o._keyEvent=!0,t.datepicker._datepickerShowing)switch(e.keyCode){case 9:t.datepicker._hideDatepicker(),r=!1;break;case 13:return s=t("td."+t.datepicker._dayOverClass+":not(."+t.datepicker._currentClass+")",o.dpDiv),s[0]&&t.datepicker._selectDay(e.target,o.selectedMonth,o.selectedYear,s[0]),i=t.datepicker._get(o,"onSelect"),i?(n=t.datepicker._formatDate(o),i.apply(o.input?o.input[0]:null,[n,o])):t.datepicker._hideDatepicker(),!1;case 27:t.datepicker._hideDatepicker();break;case 33:t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 34:t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");break;case 35:(e.ctrlKey||e.metaKey)&&t.datepicker._clearDate(e.target),r=e.ctrlKey||e.metaKey;break;case 36:(e.ctrlKey||e.metaKey)&&t.datepicker._gotoToday(e.target),r=e.ctrlKey||e.metaKey;break;case 37:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,a?1:-1,"D"),r=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 38:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,-7,"D"),r=e.ctrlKey||e.metaKey;break;case 39:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,a?-1:1,"D"),r=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");break;case 40:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,7,"D"),r=e.ctrlKey||e.metaKey;break;default:r=!1}else 36===e.keyCode&&e.ctrlKey?t.datepicker._showDatepicker(this):r=!1;r&&(e.preventDefault(),e.stopPropagation())},_doKeyPress:function(e){var i,n,s=t.datepicker._getInst(e.target);return t.datepicker._get(s,"constrainInput")?(i=t.datepicker._possibleChars(t.datepicker._get(s,"dateFormat")),n=String.fromCharCode(null==e.charCode?e.keyCode:e.charCode),e.ctrlKey||e.metaKey||" ">n||!i||i.indexOf(n)>-1):void 0},_doKeyUp:function(e){var i,n=t.datepicker._getInst(e.target);if(n.input.val()!==n.lastVal)try{i=t.datepicker.parseDate(t.datepicker._get(n,"dateFormat"),n.input?n.input.val():null,t.datepicker._getFormatConfig(n)),i&&(t.datepicker._setDateFromField(n),t.datepicker._updateAlternate(n),t.datepicker._updateDatepicker(n))}catch(s){}return!0},_showDatepicker:function(i){if(i=i.target||i,"input"!==i.nodeName.toLowerCase()&&(i=t("input",i.parentNode)[0]),!t.datepicker._isDisabledDatepicker(i)&&t.datepicker._lastInput!==i){var n,s,r,a,l,u,c;n=t.datepicker._getInst(i),t.datepicker._curInst&&t.datepicker._curInst!==n&&(t.datepicker._curInst.dpDiv.stop(!0,!0),n&&t.datepicker._datepickerShowing&&t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])),s=t.datepicker._get(n,"beforeShow"),r=s?s.apply(i,[i,n]):{},r!==!1&&(o(n.settings,r),n.lastVal=null,t.datepicker._lastInput=i,t.datepicker._setDateFromField(n),t.datepicker._inDialog&&(i.value=""),t.datepicker._pos||(t.datepicker._pos=t.datepicker._findPos(i),t.datepicker._pos[1]+=i.offsetHeight),a=!1,t(i).parents().each(function(){return a|="fixed"===t(this).css("position"),!a}),l={left:t.datepicker._pos[0],top:t.datepicker._pos[1]},t.datepicker._pos=null,n.dpDiv.empty(),n.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),t.datepicker._updateDatepicker(n),l=t.datepicker._checkOffset(n,l,a),n.dpDiv.css({position:t.datepicker._inDialog&&t.blockUI?"static":a?"fixed":"absolute",display:"none",left:l.left+"px",top:l.top+"px"}),n.inline||(u=t.datepicker._get(n,"showAnim"),c=t.datepicker._get(n,"duration"),n.dpDiv.css("z-index",e(t(i))+1),t.datepicker._datepickerShowing=!0,t.effects&&t.effects.effect[u]?n.dpDiv.show(u,t.datepicker._get(n,"showOptions"),c):n.dpDiv[u||"show"](u?c:null),t.datepicker._shouldFocusInput(n)&&n.input.focus(),t.datepicker._curInst=n))}},_updateDatepicker:function(e){this.maxRows=4,r=e,e.dpDiv.empty().append(this._generateHTML(e)),this._attachHandlers(e);var i,n=this._getNumberOfMonths(e),o=n[1],a=17,l=e.dpDiv.find("."+this._dayOverClass+" a");l.length>0&&s.apply(l.get(0)),e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),o>1&&e.dpDiv.addClass("ui-datepicker-multi-"+o).css("width",a*o+"em"),e.dpDiv[(1!==n[0]||1!==n[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),e.dpDiv[(this._get(e,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),e===t.datepicker._curInst&&t.datepicker._datepickerShowing&&t.datepicker._shouldFocusInput(e)&&e.input.focus(),e.yearshtml&&(i=e.yearshtml,setTimeout(function(){i===e.yearshtml&&e.yearshtml&&e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),i=e.yearshtml=null},0))},_shouldFocusInput:function(t){return t.input&&t.input.is(":visible")&&!t.input.is(":disabled")&&!t.input.is(":focus")},_checkOffset:function(e,i,n){var s=e.dpDiv.outerWidth(),o=e.dpDiv.outerHeight(),r=e.input?e.input.outerWidth():0,a=e.input?e.input.outerHeight():0,l=document.documentElement.clientWidth+(n?0:t(document).scrollLeft()),u=document.documentElement.clientHeight+(n?0:t(document).scrollTop());return i.left-=this._get(e,"isRTL")?s-r:0,i.left-=n&&i.left===e.input.offset().left?t(document).scrollLeft():0,i.top-=n&&i.top===e.input.offset().top+a?t(document).scrollTop():0,i.left-=Math.min(i.left,i.left+s>l&&l>s?Math.abs(i.left+s-l):0),i.top-=Math.min(i.top,i.top+o>u&&u>o?Math.abs(o+a):0),i},_findPos:function(e){for(var i,n=this._getInst(e),s=this._get(n,"isRTL");e&&("hidden"===e.type||1!==e.nodeType||t.expr.filters.hidden(e));)e=e[s?"previousSibling":"nextSibling"];return i=t(e).offset(),[i.left,i.top]},_hideDatepicker:function(e){var i,n,s,o,r=this._curInst;!r||e&&r!==t.data(e,"datepicker")||this._datepickerShowing&&(i=this._get(r,"showAnim"),n=this._get(r,"duration"),s=function(){t.datepicker._tidyDialog(r)},t.effects&&(t.effects.effect[i]||t.effects[i])?r.dpDiv.hide(i,t.datepicker._get(r,"showOptions"),n,s):r.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?n:null,s),i||s(),this._datepickerShowing=!1,o=this._get(r,"onClose"),o&&o.apply(r.input?r.input[0]:null,[r.input?r.input.val():"",r]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),t.blockUI&&(t.unblockUI(),t("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(t){t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(e){if(t.datepicker._curInst){var i=t(e.target),n=t.datepicker._getInst(i[0]);(i[0].id===t.datepicker._mainDivId||0!==i.parents("#"+t.datepicker._mainDivId).length||i.hasClass(t.datepicker.markerClassName)||i.closest("."+t.datepicker._triggerClass).length||!t.datepicker._datepickerShowing||t.datepicker._inDialog&&t.blockUI)&&(!i.hasClass(t.datepicker.markerClassName)||t.datepicker._curInst===n)||t.datepicker._hideDatepicker()}},_adjustDate:function(e,i,n){var s=t(e),o=this._getInst(s[0]);this._isDisabledDatepicker(s[0])||(this._adjustInstDate(o,i+("M"===n?this._get(o,"showCurrentAtPos"):0),n),this._updateDatepicker(o))},_gotoToday:function(e){var i,n=t(e),s=this._getInst(n[0]);this._get(s,"gotoCurrent")&&s.currentDay?(s.selectedDay=s.currentDay,s.drawMonth=s.selectedMonth=s.currentMonth,s.drawYear=s.selectedYear=s.currentYear):(i=new Date,s.selectedDay=i.getDate(),s.drawMonth=s.selectedMonth=i.getMonth(),s.drawYear=s.selectedYear=i.getFullYear()),this._notifyChange(s),this._adjustDate(n)},_selectMonthYear:function(e,i,n){var s=t(e),o=this._getInst(s[0]);o["selected"+("M"===n?"Month":"Year")]=o["draw"+("M"===n?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(o),this._adjustDate(s)},_selectDay:function(e,i,n,s){var o,r=t(e);t(s).hasClass(this._unselectableClass)||this._isDisabledDatepicker(r[0])||(o=this._getInst(r[0]),o.selectedDay=o.currentDay=t("a",s).html(),o.selectedMonth=o.currentMonth=i,o.selectedYear=o.currentYear=n,this._selectDate(e,this._formatDate(o,o.currentDay,o.currentMonth,o.currentYear)))},_clearDate:function(e){var i=t(e);this._selectDate(i,"")},_selectDate:function(e,i){var n,s=t(e),o=this._getInst(s[0]);i=null!=i?i:this._formatDate(o),o.input&&o.input.val(i),this._updateAlternate(o),n=this._get(o,"onSelect"),n?n.apply(o.input?o.input[0]:null,[i,o]):o.input&&o.input.trigger("change"),o.inline?this._updateDatepicker(o):(this._hideDatepicker(),this._lastInput=o.input[0],"object"!=typeof o.input[0]&&o.input.focus(),this._lastInput=null)},_updateAlternate:function(e){var i,n,s,o=this._get(e,"altField");o&&(i=this._get(e,"altFormat")||this._get(e,"dateFormat"),n=this._getDate(e),s=this.formatDate(i,n,this._getFormatConfig(e)),t(o).each(function(){t(this).val(s)}))},noWeekends:function(t){var e=t.getDay();return[e>0&&6>e,""]},iso8601Week:function(t){var e,i=new Date(t.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),e=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((e-i)/864e5)/7)+1},parseDate:function(e,i,n){if(null==e||null==i)throw"Invalid arguments";if(i="object"==typeof i?i.toString():i+"",""===i)return null;var s,o,r,a,l=0,u=(n?n.shortYearCutoff:null)||this._defaults.shortYearCutoff,c="string"!=typeof u?u:(new Date).getFullYear()%100+parseInt(u,10),h=(n?n.dayNamesShort:null)||this._defaults.dayNamesShort,d=(n?n.dayNames:null)||this._defaults.dayNames,p=(n?n.monthNamesShort:null)||this._defaults.monthNamesShort,f=(n?n.monthNames:null)||this._defaults.monthNames,m=-1,g=-1,v=-1,y=-1,b=!1,_=function(t){var i=s+1<e.length&&e.charAt(s+1)===t;return i&&s++,i},w=function(t){var e=_(t),n="@"===t?14:"!"===t?20:"y"===t&&e?4:"o"===t?3:2,s="y"===t?n:1,o=new RegExp("^\\d{"+s+","+n+"}"),r=i.substring(l).match(o);if(!r)throw"Missing number at position "+l;return l+=r[0].length,parseInt(r[0],10)},x=function(e,n,s){var o=-1,r=t.map(_(e)?s:n,function(t,e){return[[e,t]]}).sort(function(t,e){return-(t[1].length-e[1].length)});if(t.each(r,function(t,e){var n=e[1];return i.substr(l,n.length).toLowerCase()===n.toLowerCase()?(o=e[0],l+=n.length,!1):void 0}),-1!==o)return o+1;throw"Unknown name at position "+l},C=function(){if(i.charAt(l)!==e.charAt(s))throw"Unexpected literal at position "+l;l++};for(s=0;s<e.length;s++)if(b)"'"!==e.charAt(s)||_("'")?C():b=!1;else switch(e.charAt(s)){case"d":v=w("d");break;case"D":x("D",h,d);break;case"o":y=w("o");break;case"m":g=w("m");break;case"M":g=x("M",p,f);break;case"y":m=w("y");break;case"@":a=new Date(w("@")),m=a.getFullYear(),g=a.getMonth()+1,v=a.getDate();break;case"!":a=new Date((w("!")-this._ticksTo1970)/1e4),m=a.getFullYear(),g=a.getMonth()+1,v=a.getDate();break;case"'":_("'")?C():b=!0;break;default:C()}if(l<i.length&&(r=i.substr(l),!/^\s+/.test(r)))throw"Extra/unparsed characters found in date: "+r;if(-1===m?m=(new Date).getFullYear():100>m&&(m+=(new Date).getFullYear()-(new Date).getFullYear()%100+(c>=m?0:-100)),y>-1)for(g=1,v=y;;){if(o=this._getDaysInMonth(m,g-1),o>=v)break;g++,v-=o}if(a=this._daylightSavingAdjust(new Date(m,g-1,v)),a.getFullYear()!==m||a.getMonth()+1!==g||a.getDate()!==v)throw"Invalid date";return a},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*60*60*1e7,formatDate:function(t,e,i){if(!e)return"";var n,s=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,o=(i?i.dayNames:null)||this._defaults.dayNames,r=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,a=(i?i.monthNames:null)||this._defaults.monthNames,l=function(e){var i=n+1<t.length&&t.charAt(n+1)===e;return i&&n++,i},u=function(t,e,i){var n=""+e;if(l(t))for(;n.length<i;)n="0"+n;return n},c=function(t,e,i,n){return l(t)?n[e]:i[e]},h="",d=!1;if(e)for(n=0;n<t.length;n++)if(d)"'"!==t.charAt(n)||l("'")?h+=t.charAt(n):d=!1;else switch(t.charAt(n)){case"d":h+=u("d",e.getDate(),2);break;case"D":h+=c("D",e.getDay(),s,o);break;case"o":h+=u("o",Math.round((new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-new Date(e.getFullYear(),0,0).getTime())/864e5),3);break;case"m":h+=u("m",e.getMonth()+1,2);break;case"M":h+=c("M",e.getMonth(),r,a);break;case"y":h+=l("y")?e.getFullYear():(e.getYear()%100<10?"0":"")+e.getYear()%100;break;case"@":h+=e.getTime();break;case"!":h+=1e4*e.getTime()+this._ticksTo1970;break;case"'":l("'")?h+="'":d=!0;break;default:h+=t.charAt(n)}return h},_possibleChars:function(t){var e,i="",n=!1,s=function(i){var n=e+1<t.length&&t.charAt(e+1)===i;return n&&e++,n};for(e=0;e<t.length;e++)if(n)"'"!==t.charAt(e)||s("'")?i+=t.charAt(e):n=!1;else switch(t.charAt(e)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":s("'")?i+="'":n=!0;break;default:i+=t.charAt(e)}return i},_get:function(t,e){return void 0!==t.settings[e]?t.settings[e]:this._defaults[e]},_setDateFromField:function(t,e){if(t.input.val()!==t.lastVal){var i=this._get(t,"dateFormat"),n=t.lastVal=t.input?t.input.val():null,s=this._getDefaultDate(t),o=s,r=this._getFormatConfig(t);try{o=this.parseDate(i,n,r)||s}catch(a){n=e?"":n}t.selectedDay=o.getDate(),t.drawMonth=t.selectedMonth=o.getMonth(),t.drawYear=t.selectedYear=o.getFullYear(),t.currentDay=n?o.getDate():0,t.currentMonth=n?o.getMonth():0,t.currentYear=n?o.getFullYear():0,this._adjustInstDate(t)}},_getDefaultDate:function(t){return this._restrictMinMax(t,this._determineDate(t,this._get(t,"defaultDate"),new Date))},_determineDate:function(e,i,n){var s=function(t){var e=new Date;return e.setDate(e.getDate()+t),e},o=function(i){try{return t.datepicker.parseDate(t.datepicker._get(e,"dateFormat"),i,t.datepicker._getFormatConfig(e))}catch(n){}for(var s=(i.toLowerCase().match(/^c/)?t.datepicker._getDate(e):null)||new Date,o=s.getFullYear(),r=s.getMonth(),a=s.getDate(),l=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,u=l.exec(i);u;){switch(u[2]||"d"){case"d":case"D":a+=parseInt(u[1],10);break;case"w":case"W":a+=7*parseInt(u[1],10);break;case"m":case"M":r+=parseInt(u[1],10),a=Math.min(a,t.datepicker._getDaysInMonth(o,r));break;case"y":case"Y":o+=parseInt(u[1],10),a=Math.min(a,t.datepicker._getDaysInMonth(o,r))}u=l.exec(i)}return new Date(o,r,a)},r=null==i||""===i?n:"string"==typeof i?o(i):"number"==typeof i?isNaN(i)?n:s(i):new Date(i.getTime());return r=r&&"Invalid Date"===r.toString()?n:r,r&&(r.setHours(0),r.setMinutes(0),r.setSeconds(0),r.setMilliseconds(0)),this._daylightSavingAdjust(r)},_daylightSavingAdjust:function(t){return t?(t.setHours(t.getHours()>12?t.getHours()+2:0),t):null},_setDate:function(t,e,i){var n=!e,s=t.selectedMonth,o=t.selectedYear,r=this._restrictMinMax(t,this._determineDate(t,e,new Date));t.selectedDay=t.currentDay=r.getDate(),t.drawMonth=t.selectedMonth=t.currentMonth=r.getMonth(),t.drawYear=t.selectedYear=t.currentYear=r.getFullYear(),s===t.selectedMonth&&o===t.selectedYear||i||this._notifyChange(t),this._adjustInstDate(t),t.input&&t.input.val(n?"":this._formatDate(t))},_getDate:function(t){var e=!t.currentYear||t.input&&""===t.input.val()?null:this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return e},_attachHandlers:function(e){var i=this._get(e,"stepMonths"),n="#"+e.id.replace(/\\\\/g,"\\");e.dpDiv.find("[data-handler]").map(function(){var e={prev:function(){t.datepicker._adjustDate(n,-i,"M")},next:function(){t.datepicker._adjustDate(n,+i,"M")},hide:function(){t.datepicker._hideDatepicker()},today:function(){t.datepicker._gotoToday(n)},selectDay:function(){return t.datepicker._selectDay(n,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return t.datepicker._selectMonthYear(n,this,"M"),!1},selectYear:function(){return t.datepicker._selectMonthYear(n,this,"Y"),!1}};t(this).bind(this.getAttribute("data-event"),e[this.getAttribute("data-handler")])})},_generateHTML:function(t){var e,i,n,s,o,r,a,l,u,c,h,d,p,f,m,g,v,y,b,_,w,x,C,k,T,D,E,S,A,I,M,P,N,O,j,H,$,F,z,L=new Date,W=this._daylightSavingAdjust(new Date(L.getFullYear(),L.getMonth(),L.getDate())),R=this._get(t,"isRTL"),q=this._get(t,"showButtonPanel"),B=this._get(t,"hideIfNoPrevNext"),U=this._get(t,"navigationAsDateFormat"),Y=this._getNumberOfMonths(t),V=this._get(t,"showCurrentAtPos"),Q=this._get(t,"stepMonths"),K=1!==Y[0]||1!==Y[1],X=this._daylightSavingAdjust(t.currentDay?new Date(t.currentYear,t.currentMonth,t.currentDay):new Date(9999,9,9)),G=this._getMinMaxDate(t,"min"),J=this._getMinMaxDate(t,"max"),Z=t.drawMonth-V,tt=t.drawYear;if(0>Z&&(Z+=12,tt--),J)for(e=this._daylightSavingAdjust(new Date(J.getFullYear(),J.getMonth()-Y[0]*Y[1]+1,J.getDate())),e=G&&G>e?G:e;this._daylightSavingAdjust(new Date(tt,Z,1))>e;)Z--,0>Z&&(Z=11,tt--);for(t.drawMonth=Z,t.drawYear=tt,i=this._get(t,"prevText"),i=U?this.formatDate(i,this._daylightSavingAdjust(new Date(tt,Z-Q,1)),this._getFormatConfig(t)):i,n=this._canAdjustMonth(t,-1,tt,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(R?"e":"w")+"'>"+i+"</span></a>":B?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(R?"e":"w")+"'>"+i+"</span></a>",s=this._get(t,"nextText"),s=U?this.formatDate(s,this._daylightSavingAdjust(new Date(tt,Z+Q,1)),this._getFormatConfig(t)):s,o=this._canAdjustMonth(t,1,tt,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+s+"'><span class='ui-icon ui-icon-circle-triangle-"+(R?"w":"e")+"'>"+s+"</span></a>":B?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+s+"'><span class='ui-icon ui-icon-circle-triangle-"+(R?"w":"e")+"'>"+s+"</span></a>",r=this._get(t,"currentText"),a=this._get(t,"gotoCurrent")&&t.currentDay?X:W,r=U?this.formatDate(r,a,this._getFormatConfig(t)):r,l=t.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(t,"closeText")+"</button>",u=q?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(R?l:"")+(this._isInRange(t,a)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+r+"</button>":"")+(R?"":l)+"</div>":"",c=parseInt(this._get(t,"firstDay"),10),c=isNaN(c)?0:c,h=this._get(t,"showWeek"),d=this._get(t,"dayNames"),p=this._get(t,"dayNamesMin"),f=this._get(t,"monthNames"),m=this._get(t,"monthNamesShort"),g=this._get(t,"beforeShowDay"),v=this._get(t,"showOtherMonths"),y=this._get(t,"selectOtherMonths"),b=this._getDefaultDate(t),_="",x=0;x<Y[0];x++){for(C="",this.maxRows=4,k=0;k<Y[1];k++){if(T=this._daylightSavingAdjust(new Date(tt,Z,t.selectedDay)),D=" ui-corner-all",E="",K){if(E+="<div class='ui-datepicker-group",Y[1]>1)switch(k){case 0:E+=" ui-datepicker-group-first",D=" ui-corner-"+(R?"right":"left");break;case Y[1]-1:E+=" ui-datepicker-group-last",D=" ui-corner-"+(R?"left":"right");break;default:E+=" ui-datepicker-group-middle",D=""}E+="'>"}for(E+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+D+"'>"+(/all|left/.test(D)&&0===x?R?o:n:"")+(/all|right/.test(D)&&0===x?R?n:o:"")+this._generateMonthYearHeader(t,Z,tt,G,J,x>0||k>0,f,m)+"</div><table class='ui-datepicker-calendar'><thead><tr>",S=h?"<th class='ui-datepicker-week-col'>"+this._get(t,"weekHeader")+"</th>":"",w=0;7>w;w++)A=(w+c)%7,S+="<th scope='col'"+((w+c+6)%7>=5?" class='ui-datepicker-week-end'":"")+"><span title='"+d[A]+"'>"+p[A]+"</span></th>";for(E+=S+"</tr></thead><tbody>",I=this._getDaysInMonth(tt,Z),tt===t.selectedYear&&Z===t.selectedMonth&&(t.selectedDay=Math.min(t.selectedDay,I)),M=(this._getFirstDayOfMonth(tt,Z)-c+7)%7,P=Math.ceil((M+I)/7),N=K&&this.maxRows>P?this.maxRows:P,this.maxRows=N,O=this._daylightSavingAdjust(new Date(tt,Z,1-M)),j=0;N>j;j++){for(E+="<tr>",H=h?"<td class='ui-datepicker-week-col'>"+this._get(t,"calculateWeek")(O)+"</td>":"",w=0;7>w;w++)$=g?g.apply(t.input?t.input[0]:null,[O]):[!0,""],F=O.getMonth()!==Z,z=F&&!y||!$[0]||G&&G>O||J&&O>J,H+="<td class='"+((w+c+6)%7>=5?" ui-datepicker-week-end":"")+(F?" ui-datepicker-other-month":"")+(O.getTime()===T.getTime()&&Z===t.selectedMonth&&t._keyEvent||b.getTime()===O.getTime()&&b.getTime()===T.getTime()?" "+this._dayOverClass:"")+(z?" "+this._unselectableClass+" ui-state-disabled":"")+(F&&!v?"":" "+$[1]+(O.getTime()===X.getTime()?" "+this._currentClass:"")+(O.getTime()===W.getTime()?" ui-datepicker-today":""))+"'"+(F&&!v||!$[2]?"":" title='"+$[2].replace(/'/g,"&#39;")+"'")+(z?"":" data-handler='selectDay' data-event='click' data-month='"+O.getMonth()+"' data-year='"+O.getFullYear()+"'")+">"+(F&&!v?"&#xa0;":z?"<span class='ui-state-default'>"+O.getDate()+"</span>":"<a class='ui-state-default"+(O.getTime()===W.getTime()?" ui-state-highlight":"")+(O.getTime()===X.getTime()?" ui-state-active":"")+(F?" ui-priority-secondary":"")+"' href='#'>"+O.getDate()+"</a>")+"</td>",O.setDate(O.getDate()+1),O=this._daylightSavingAdjust(O);E+=H+"</tr>"}Z++,Z>11&&(Z=0,tt++),E+="</tbody></table>"+(K?"</div>"+(Y[0]>0&&k===Y[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),C+=E}_+=C}return _+=u,t._keyEvent=!1,_},_generateMonthYearHeader:function(t,e,i,n,s,o,r,a){var l,u,c,h,d,p,f,m,g=this._get(t,"changeMonth"),v=this._get(t,"changeYear"),y=this._get(t,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",_="";if(o||!g)_+="<span class='ui-datepicker-month'>"+r[e]+"</span>";else{for(l=n&&n.getFullYear()===i,u=s&&s.getFullYear()===i,_+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",c=0;12>c;c++)(!l||c>=n.getMonth())&&(!u||c<=s.getMonth())&&(_+="<option value='"+c+"'"+(c===e?" selected='selected'":"")+">"+a[c]+"</option>");_+="</select>"}if(y||(b+=_+(!o&&g&&v?"":"&#xa0;")),!t.yearshtml)if(t.yearshtml="",o||!v)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(h=this._get(t,"yearRange").split(":"),d=(new Date).getFullYear(),p=function(t){var e=t.match(/c[+\-].*/)?i+parseInt(t.substring(1),10):t.match(/[+\-].*/)?d+parseInt(t,10):parseInt(t,10);return isNaN(e)?d:e},f=p(h[0]),m=Math.max(f,p(h[1]||"")),f=n?Math.max(f,n.getFullYear()):f,m=s?Math.min(m,s.getFullYear()):m,
t.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";m>=f;f++)t.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";t.yearshtml+="</select>",b+=t.yearshtml,t.yearshtml=null}return b+=this._get(t,"yearSuffix"),y&&(b+=(!o&&g&&v?"":"&#xa0;")+_),b+="</div>"},_adjustInstDate:function(t,e,i){var n=t.drawYear+("Y"===i?e:0),s=t.drawMonth+("M"===i?e:0),o=Math.min(t.selectedDay,this._getDaysInMonth(n,s))+("D"===i?e:0),r=this._restrictMinMax(t,this._daylightSavingAdjust(new Date(n,s,o)));t.selectedDay=r.getDate(),t.drawMonth=t.selectedMonth=r.getMonth(),t.drawYear=t.selectedYear=r.getFullYear(),"M"!==i&&"Y"!==i||this._notifyChange(t)},_restrictMinMax:function(t,e){var i=this._getMinMaxDate(t,"min"),n=this._getMinMaxDate(t,"max"),s=i&&i>e?i:e;return n&&s>n?n:s},_notifyChange:function(t){var e=this._get(t,"onChangeMonthYear");e&&e.apply(t.input?t.input[0]:null,[t.selectedYear,t.selectedMonth+1,t])},_getNumberOfMonths:function(t){var e=this._get(t,"numberOfMonths");return null==e?[1,1]:"number"==typeof e?[1,e]:e},_getMinMaxDate:function(t,e){return this._determineDate(t,this._get(t,e+"Date"),null)},_getDaysInMonth:function(t,e){return 32-this._daylightSavingAdjust(new Date(t,e,32)).getDate()},_getFirstDayOfMonth:function(t,e){return new Date(t,e,1).getDay()},_canAdjustMonth:function(t,e,i,n){var s=this._getNumberOfMonths(t),o=this._daylightSavingAdjust(new Date(i,n+(0>e?e:s[0]*s[1]),1));return 0>e&&o.setDate(this._getDaysInMonth(o.getFullYear(),o.getMonth())),this._isInRange(t,o)},_isInRange:function(t,e){var i,n,s=this._getMinMaxDate(t,"min"),o=this._getMinMaxDate(t,"max"),r=null,a=null,l=this._get(t,"yearRange");return l&&(i=l.split(":"),n=(new Date).getFullYear(),r=parseInt(i[0],10),a=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(r+=n),i[1].match(/[+\-].*/)&&(a+=n)),(!s||e.getTime()>=s.getTime())&&(!o||e.getTime()<=o.getTime())&&(!r||e.getFullYear()>=r)&&(!a||e.getFullYear()<=a)},_getFormatConfig:function(t){var e=this._get(t,"shortYearCutoff");return e="string"!=typeof e?e:(new Date).getFullYear()%100+parseInt(e,10),{shortYearCutoff:e,dayNamesShort:this._get(t,"dayNamesShort"),dayNames:this._get(t,"dayNames"),monthNamesShort:this._get(t,"monthNamesShort"),monthNames:this._get(t,"monthNames")}},_formatDate:function(t,e,i,n){e||(t.currentDay=t.selectedDay,t.currentMonth=t.selectedMonth,t.currentYear=t.selectedYear);var s=e?"object"==typeof e?e:this._daylightSavingAdjust(new Date(n,i,e)):this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return this.formatDate(this._get(t,"dateFormat"),s,this._getFormatConfig(t))}}),t.fn.datepicker=function(e){if(!this.length)return this;t.datepicker.initialized||(t(document).mousedown(t.datepicker._checkExternalClick),t.datepicker.initialized=!0),0===t("#"+t.datepicker._mainDivId).length&&t("body").append(t.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof e||"isDisabled"!==e&&"getDate"!==e&&"widget"!==e?"option"===e&&2===arguments.length&&"string"==typeof arguments[1]?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof e?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this].concat(i)):t.datepicker._attachDatepicker(this,e)}):t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i))},t.datepicker=new i,t.datepicker.initialized=!1,t.datepicker.uuid=(new Date).getTime(),t.datepicker.version="1.11.4",t.datepicker}),/*!
 * jQuery UI Mouse 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./widget"],t):t(jQuery)}(function(t){var e=!1;return t(document).mouseup(function(){e=!1}),t.widget("ui.mouse",{version:"1.11.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.bind("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).bind("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!e){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var n=this,s=1===i.which,o="string"==typeof this.options.cancel&&i.target.nodeName?t(i.target).closest(this.options.cancel).length:!1;return s&&!o&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){n.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===t.data(i.target,this.widgetName+".preventClickEvent")&&t.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return n._mouseMove(t)},this._mouseUpDelegate=function(t){return n._mouseUp(t)},this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),e=!0,!0)):!0}},_mouseMove:function(e){if(this._mouseMoved){if(t.ui.ie&&(!document.documentMode||document.documentMode<9)&&!e.button)return this._mouseUp(e);if(!e.which)return this._mouseUp(e)}return(e.which||e.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(i){return this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,i.target===this._mouseDownEvent.target&&t.data(i.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(i)),e=!1,!1},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})}),/*!
 * jQuery UI Draggable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/draggable/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./mouse","./widget"],t):t(jQuery)}(function(t){return t.widget("ui.draggable",t.ui.mouse,{version:"1.11.4",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._setHandleClassName(),this._mouseInit()},_setOption:function(t,e){this._super(t,e),"handle"===t&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?void(this.destroyOnClear=!0):(this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._removeHandleClassName(),void this._mouseDestroy())},_mouseCapture:function(e){var i=this.options;return this._blurActiveElement(e),this.helper||i.disabled||t(e.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(e),this.handle?(this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(e){this.iframeBlocks=this.document.find(e).map(function(){var e=t(this);return t("<div>").css("position","absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(e){var i=this.document[0];if(this.handleElement.is(e.target))try{i.activeElement&&"body"!==i.activeElement.nodeName.toLowerCase()&&t(i.activeElement).blur()}catch(n){}},_mouseStart:function(e){var i=this.options;return this.helper=this._createHelper(e),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),t.ui.ddmanager&&(t.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===t(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(e),this.originalPosition=this.position=this._generatePosition(e,!1),this.originalPageX=e.pageX,this.originalPageY=e.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",e)===!1?(this._clear(),!1):(this._cacheHelperProportions(),t.ui.ddmanager&&!i.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this._normalizeRightBottom(),this._mouseDrag(e,!0),t.ui.ddmanager&&t.ui.ddmanager.dragStart(this,e),!0)},_refreshOffsets:function(t){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:t.pageX-this.offset.left,top:t.pageY-this.offset.top}},_mouseDrag:function(e,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(e,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var n=this._uiHash();if(this._trigger("drag",e,n)===!1)return this._mouseUp({}),!1;this.position=n.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),!1},_mouseStop:function(e){var i=this,n=!1;return t.ui.ddmanager&&!this.options.dropBehaviour&&(n=t.ui.ddmanager.drop(this,e)),this.dropped&&(n=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!n||"valid"===this.options.revert&&n||this.options.revert===!0||t.isFunction(this.options.revert)&&this.options.revert.call(this.element,n)?t(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",e)!==!1&&i._clear()}):this._trigger("stop",e)!==!1&&this._clear(),!1},_mouseUp:function(e){return this._unblockFrames(),t.ui.ddmanager&&t.ui.ddmanager.dragStop(this,e),this.handleElement.is(e.target)&&this.element.focus(),t.ui.mouse.prototype._mouseUp.call(this,e)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(e){return this.options.handle?!!t(e.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this.handleElement.addClass("ui-draggable-handle")},_removeHandleClassName:function(){this.handleElement.removeClass("ui-draggable-handle")},_createHelper:function(e){var i=this.options,n=t.isFunction(i.helper),s=n?t(i.helper.apply(this.element[0],[e])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return s.parents("body").length||s.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),n&&s[0]===this.element[0]&&this._setPositionRelative(),s[0]===this.element[0]||/(fixed|absolute)/.test(s.css("position"))||s.css("position","absolute"),s},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_isRootNode:function(t){return/(html|body)/i.test(t.tagName)||t===this.document[0]},_getParentOffset:function(){var e=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var t=this.element.position(),e=this._isRootNode(this.scrollParent[0]);return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+(e?0:this.scrollParent.scrollTop()),left:t.left-(parseInt(this.helper.css("left"),10)||0)+(e?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,n,s=this.options,o=this.document[0];return this.relativeContainer=null,s.containment?"window"===s.containment?void(this.containment=[t(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,t(window).scrollLeft()+t(window).width()-this.helperProportions.width-this.margins.left,t(window).scrollTop()+(t(window).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):"document"===s.containment?void(this.containment=[0,0,t(o).width()-this.helperProportions.width-this.margins.left,(t(o).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):s.containment.constructor===Array?void(this.containment=s.containment):("parent"===s.containment&&(s.containment=this.helper[0].parentNode),i=t(s.containment),n=i[0],void(n&&(e=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(e?Math.max(n.scrollWidth,n.offsetWidth):n.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(n.scrollHeight,n.offsetHeight):n.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i))):void(this.containment=null)},_convertPositionTo:function(t,e){e||(e=this.position);var i="absolute"===t?1:-1,n=this._isRootNode(this.scrollParent[0]);return{top:e.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:n?0:this.offset.scroll.top)*i,left:e.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:n?0:this.offset.scroll.left)*i}},_generatePosition:function(t,e){var i,n,s,o,r=this.options,a=this._isRootNode(this.scrollParent[0]),l=t.pageX,u=t.pageY;return a&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),e&&(this.containment&&(this.relativeContainer?(n=this.relativeContainer.offset(),i=[this.containment[0]+n.left,this.containment[1]+n.top,this.containment[2]+n.left,this.containment[3]+n.top]):i=this.containment,t.pageX-this.offset.click.left<i[0]&&(l=i[0]+this.offset.click.left),t.pageY-this.offset.click.top<i[1]&&(u=i[1]+this.offset.click.top),t.pageX-this.offset.click.left>i[2]&&(l=i[2]+this.offset.click.left),t.pageY-this.offset.click.top>i[3]&&(u=i[3]+this.offset.click.top)),r.grid&&(s=r.grid[1]?this.originalPageY+Math.round((u-this.originalPageY)/r.grid[1])*r.grid[1]:this.originalPageY,u=i?s-this.offset.click.top>=i[1]||s-this.offset.click.top>i[3]?s:s-this.offset.click.top>=i[1]?s-r.grid[1]:s+r.grid[1]:s,o=r.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/r.grid[0])*r.grid[0]:this.originalPageX,l=i?o-this.offset.click.left>=i[0]||o-this.offset.click.left>i[2]?o:o-this.offset.click.left>=i[0]?o-r.grid[0]:o+r.grid[0]:o),"y"===r.axis&&(l=this.originalPageX),"x"===r.axis&&(u=this.originalPageY)),{top:u-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:a?0:this.offset.scroll.top),left:l-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:a?0:this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_normalizeRightBottom:function(){"y"!==this.options.axis&&"auto"!==this.helper.css("right")&&(this.helper.width(this.helper.width()),this.helper.css("right","auto")),"x"!==this.options.axis&&"auto"!==this.helper.css("bottom")&&(this.helper.height(this.helper.height()),this.helper.css("bottom","auto"))},_trigger:function(e,i,n){return n=n||this._uiHash(),t.ui.plugin.call(this,e,[i,n,this],!0),/^(drag|start|stop)/.test(e)&&(this.positionAbs=this._convertPositionTo("absolute"),n.offset=this.positionAbs),t.Widget.prototype._trigger.call(this,e,i,n)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),t.ui.plugin.add("draggable","connectToSortable",{start:function(e,i,n){var s=t.extend({},i,{item:n.element});n.sortables=[],t(n.options.connectToSortable).each(function(){var i=t(this).sortable("instance");i&&!i.options.disabled&&(n.sortables.push(i),i.refreshPositions(),i._trigger("activate",e,s))})},stop:function(e,i,n){var s=t.extend({},i,{item:n.element});n.cancelHelperRemoval=!1,t.each(n.sortables,function(){var t=this;t.isOver?(t.isOver=0,n.cancelHelperRemoval=!0,t.cancelHelperRemoval=!1,t._storedCSS={position:t.placeholder.css("position"),top:t.placeholder.css("top"),left:t.placeholder.css("left")},t._mouseStop(e),t.options.helper=t.options._helper):(t.cancelHelperRemoval=!0,t._trigger("deactivate",e,s))})},drag:function(e,i,n){t.each(n.sortables,function(){var s=!1,o=this;o.positionAbs=n.positionAbs,o.helperProportions=n.helperProportions,o.offset.click=n.offset.click,o._intersectsWith(o.containerCache)&&(s=!0,t.each(n.sortables,function(){return this.positionAbs=n.positionAbs,this.helperProportions=n.helperProportions,this.offset.click=n.offset.click,this!==o&&this._intersectsWith(this.containerCache)&&t.contains(o.element[0],this.element[0])&&(s=!1),s})),s?(o.isOver||(o.isOver=1,n._parent=i.helper.parent(),o.currentItem=i.helper.appendTo(o.element).data("ui-sortable-item",!0),o.options._helper=o.options.helper,o.options.helper=function(){return i.helper[0]},e.target=o.currentItem[0],o._mouseCapture(e,!0),o._mouseStart(e,!0,!0),o.offset.click.top=n.offset.click.top,o.offset.click.left=n.offset.click.left,o.offset.parent.left-=n.offset.parent.left-o.offset.parent.left,o.offset.parent.top-=n.offset.parent.top-o.offset.parent.top,n._trigger("toSortable",e),n.dropped=o.element,t.each(n.sortables,function(){this.refreshPositions()}),n.currentItem=n.element,o.fromOutside=n),o.currentItem&&(o._mouseDrag(e),i.position=o.position)):o.isOver&&(o.isOver=0,o.cancelHelperRemoval=!0,o.options._revert=o.options.revert,o.options.revert=!1,o._trigger("out",e,o._uiHash(o)),o._mouseStop(e,!0),o.options.revert=o.options._revert,o.options.helper=o.options._helper,o.placeholder&&o.placeholder.remove(),i.helper.appendTo(n._parent),n._refreshOffsets(e),i.position=n._generatePosition(e,!0),n._trigger("fromSortable",e),n.dropped=!1,t.each(n.sortables,function(){this.refreshPositions()}))})}}),t.ui.plugin.add("draggable","cursor",{start:function(e,i,n){var s=t("body"),o=n.options;s.css("cursor")&&(o._cursor=s.css("cursor")),s.css("cursor",o.cursor)},stop:function(e,i,n){var s=n.options;s._cursor&&t("body").css("cursor",s._cursor)}}),t.ui.plugin.add("draggable","opacity",{start:function(e,i,n){var s=t(i.helper),o=n.options;s.css("opacity")&&(o._opacity=s.css("opacity")),s.css("opacity",o.opacity)},stop:function(e,i,n){var s=n.options;s._opacity&&t(i.helper).css("opacity",s._opacity)}}),t.ui.plugin.add("draggable","scroll",{start:function(t,e,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(e,i,n){var s=n.options,o=!1,r=n.scrollParentNotHidden[0],a=n.document[0];r!==a&&"HTML"!==r.tagName?(s.axis&&"x"===s.axis||(n.overflowOffset.top+r.offsetHeight-e.pageY<s.scrollSensitivity?r.scrollTop=o=r.scrollTop+s.scrollSpeed:e.pageY-n.overflowOffset.top<s.scrollSensitivity&&(r.scrollTop=o=r.scrollTop-s.scrollSpeed)),s.axis&&"y"===s.axis||(n.overflowOffset.left+r.offsetWidth-e.pageX<s.scrollSensitivity?r.scrollLeft=o=r.scrollLeft+s.scrollSpeed:e.pageX-n.overflowOffset.left<s.scrollSensitivity&&(r.scrollLeft=o=r.scrollLeft-s.scrollSpeed))):(s.axis&&"x"===s.axis||(e.pageY-t(a).scrollTop()<s.scrollSensitivity?o=t(a).scrollTop(t(a).scrollTop()-s.scrollSpeed):t(window).height()-(e.pageY-t(a).scrollTop())<s.scrollSensitivity&&(o=t(a).scrollTop(t(a).scrollTop()+s.scrollSpeed))),s.axis&&"y"===s.axis||(e.pageX-t(a).scrollLeft()<s.scrollSensitivity?o=t(a).scrollLeft(t(a).scrollLeft()-s.scrollSpeed):t(window).width()-(e.pageX-t(a).scrollLeft())<s.scrollSensitivity&&(o=t(a).scrollLeft(t(a).scrollLeft()+s.scrollSpeed)))),o!==!1&&t.ui.ddmanager&&!s.dropBehaviour&&t.ui.ddmanager.prepareOffsets(n,e)}}),t.ui.plugin.add("draggable","snap",{start:function(e,i,n){var s=n.options;n.snapElements=[],t(s.snap.constructor!==String?s.snap.items||":data(ui-draggable)":s.snap).each(function(){var e=t(this),i=e.offset();this!==n.element[0]&&n.snapElements.push({item:this,width:e.outerWidth(),height:e.outerHeight(),top:i.top,left:i.left})})},drag:function(e,i,n){var s,o,r,a,l,u,c,h,d,p,f=n.options,m=f.snapTolerance,g=i.offset.left,v=g+n.helperProportions.width,y=i.offset.top,b=y+n.helperProportions.height;for(d=n.snapElements.length-1;d>=0;d--)l=n.snapElements[d].left-n.margins.left,u=l+n.snapElements[d].width,c=n.snapElements[d].top-n.margins.top,h=c+n.snapElements[d].height,l-m>v||g>u+m||c-m>b||y>h+m||!t.contains(n.snapElements[d].item.ownerDocument,n.snapElements[d].item)?(n.snapElements[d].snapping&&n.options.snap.release&&n.options.snap.release.call(n.element,e,t.extend(n._uiHash(),{snapItem:n.snapElements[d].item})),n.snapElements[d].snapping=!1):("inner"!==f.snapMode&&(s=Math.abs(c-b)<=m,o=Math.abs(h-y)<=m,r=Math.abs(l-v)<=m,a=Math.abs(u-g)<=m,s&&(i.position.top=n._convertPositionTo("relative",{top:c-n.helperProportions.height,left:0}).top),o&&(i.position.top=n._convertPositionTo("relative",{top:h,left:0}).top),r&&(i.position.left=n._convertPositionTo("relative",{top:0,left:l-n.helperProportions.width}).left),a&&(i.position.left=n._convertPositionTo("relative",{top:0,left:u}).left)),p=s||o||r||a,"outer"!==f.snapMode&&(s=Math.abs(c-y)<=m,o=Math.abs(h-b)<=m,r=Math.abs(l-g)<=m,a=Math.abs(u-v)<=m,s&&(i.position.top=n._convertPositionTo("relative",{top:c,left:0}).top),o&&(i.position.top=n._convertPositionTo("relative",{top:h-n.helperProportions.height,left:0}).top),r&&(i.position.left=n._convertPositionTo("relative",{top:0,left:l}).left),a&&(i.position.left=n._convertPositionTo("relative",{top:0,left:u-n.helperProportions.width}).left)),!n.snapElements[d].snapping&&(s||o||r||a||p)&&n.options.snap.snap&&n.options.snap.snap.call(n.element,e,t.extend(n._uiHash(),{snapItem:n.snapElements[d].item})),n.snapElements[d].snapping=s||o||r||a||p)}}),t.ui.plugin.add("draggable","stack",{start:function(e,i,n){var s,o=n.options,r=t.makeArray(t(o.stack)).sort(function(e,i){return(parseInt(t(e).css("zIndex"),10)||0)-(parseInt(t(i).css("zIndex"),10)||0)});r.length&&(s=parseInt(t(r[0]).css("zIndex"),10)||0,t(r).each(function(e){t(this).css("zIndex",s+e)}),this.css("zIndex",s+r.length))}}),t.ui.plugin.add("draggable","zIndex",{start:function(e,i,n){var s=t(i.helper),o=n.options;s.css("zIndex")&&(o._zIndex=s.css("zIndex")),s.css("zIndex",o.zIndex)},stop:function(e,i,n){var s=n.options;s._zIndex&&t(i.helper).css("zIndex",s._zIndex)}}),t.ui.draggable}),/*!
 * jQuery UI Resizable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/resizable/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./mouse","./widget"],t):t(jQuery)}(function(t){return t.widget("ui.resizable",t.ui.mouse,{version:"1.11.4",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(t){return parseInt(t,10)||0},_isNumber:function(t){return!isNaN(parseInt(t,10))},_hasScroll:function(e,i){if("hidden"===t(e).css("overflow"))return!1;var n=i&&"left"===i?"scrollLeft":"scrollTop",s=!1;return e[n]>0?!0:(e[n]=1,s=e[n]>0,e[n]=0,s)},_create:function(){var e,i,n,s,o,r=this,a=this.options;if(this.element.addClass("ui-resizable"),t.extend(this,{_aspectRatio:!!a.aspectRatio,aspectRatio:a.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:a.helper||a.ghost||a.animate?a.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)&&(this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=a.handles||(t(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this._handles=t(),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),e=this.handles.split(","),this.handles={},i=0;i<e.length;i++)n=t.trim(e[i]),o="ui-resizable-"+n,s=t("<div class='ui-resizable-handle "+o+"'></div>"),s.css({zIndex:a.zIndex}),"se"===n&&s.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[n]=".ui-resizable-"+n,this.element.append(s);this._renderAxis=function(e){var i,n,s,o;e=e||this.element;for(i in this.handles)this.handles[i].constructor===String?this.handles[i]=this.element.children(this.handles[i]).first().show():(this.handles[i].jquery||this.handles[i].nodeType)&&(this.handles[i]=t(this.handles[i]),this._on(this.handles[i],{mousedown:r._mouseDown})),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)&&(n=t(this.handles[i],this.element),o=/sw|ne|nw|se|n|s/.test(i)?n.outerHeight():n.outerWidth(),s=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),e.css(s,o),this._proportionallyResize()),this._handles=this._handles.add(this.handles[i])},this._renderAxis(this.element),this._handles=this._handles.add(this.element.find(".ui-resizable-handle")),this._handles.disableSelection(),this._handles.mouseover(function(){r.resizing||(this.className&&(s=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),r.axis=s&&s[1]?s[1]:"se")}),a.autoHide&&(this._handles.hide(),t(this.element).addClass("ui-resizable-autohide").mouseenter(function(){a.disabled||(t(this).removeClass("ui-resizable-autohide"),r._handles.show())}).mouseleave(function(){a.disabled||r.resizing||(t(this).addClass("ui-resizable-autohide"),r._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var e,i=function(e){t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),e=this.element,this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")}).insertAfter(e),e.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_mouseCapture:function(e){var i,n,s=!1;for(i in this.handles)n=t(this.handles[i])[0],(n===e.target||t.contains(n,e.target))&&(s=!0);return!this.options.disabled&&s},_mouseStart:function(e){var i,n,s,o=this.options,r=this.element;return this.resizing=!0,this._renderProxy(),i=this._num(this.helper.css("left")),n=this._num(this.helper.css("top")),o.containment&&(i+=t(o.containment).scrollLeft()||0,n+=t(o.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:n},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:r.width(),height:r.height()},this.originalSize=this._helper?{width:r.outerWidth(),height:r.outerHeight()}:{width:r.width(),height:r.height()},this.sizeDiff={width:r.outerWidth()-r.width(),height:r.outerHeight()-r.height()},this.originalPosition={left:i,top:n},this.originalMousePosition={left:e.pageX,top:e.pageY},this.aspectRatio="number"==typeof o.aspectRatio?o.aspectRatio:this.originalSize.width/this.originalSize.height||1,s=t(".ui-resizable-"+this.axis).css("cursor"),t("body").css("cursor","auto"===s?this.axis+"-resize":s),r.addClass("ui-resizable-resizing"),this._propagate("start",e),!0},_mouseDrag:function(e){var i,n,s=this.originalMousePosition,o=this.axis,r=e.pageX-s.left||0,a=e.pageY-s.top||0,l=this._change[o];return this._updatePrevProperties(),l?(i=l.apply(this,[e,r,a]),this._updateVirtualBoundaries(e.shiftKey),(this._aspectRatio||e.shiftKey)&&(i=this._updateRatio(i,e)),i=this._respectSize(i,e),this._updateCache(i),this._propagate("resize",e),n=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),t.isEmptyObject(n)||(this._updatePrevProperties(),this._trigger("resize",e,this.ui()),this._applyChanges()),!1):!1},_mouseStop:function(e){this.resizing=!1;var i,n,s,o,r,a,l,u=this.options,c=this;return this._helper&&(i=this._proportionallyResizeElements,n=i.length&&/textarea/i.test(i[0].nodeName),s=n&&this._hasScroll(i[0],"left")?0:c.sizeDiff.height,o=n?0:c.sizeDiff.width,r={width:c.helper.width()-o,height:c.helper.height()-s},a=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null,l=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null,u.animate||this.element.css(t.extend(r,{top:l,left:a})),c.helper.height(c.size.height),c.helper.width(c.size.width),this._helper&&!u.animate&&this._proportionallyResize()),t("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",e),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var t={};return this.position.top!==this.prevPosition.top&&(t.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(t.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(t.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(t.height=this.size.height+"px"),this.helper.css(t),t},_updateVirtualBoundaries:function(t){var e,i,n,s,o,r=this.options;o={minWidth:this._isNumber(r.minWidth)?r.minWidth:0,maxWidth:this._isNumber(r.maxWidth)?r.maxWidth:1/0,minHeight:this._isNumber(r.minHeight)?r.minHeight:0,maxHeight:this._isNumber(r.maxHeight)?r.maxHeight:1/0},(this._aspectRatio||t)&&(e=o.minHeight*this.aspectRatio,n=o.minWidth/this.aspectRatio,i=o.maxHeight*this.aspectRatio,s=o.maxWidth/this.aspectRatio,e>o.minWidth&&(o.minWidth=e),n>o.minHeight&&(o.minHeight=n),i<o.maxWidth&&(o.maxWidth=i),s<o.maxHeight&&(o.maxHeight=s)),this._vBoundaries=o},_updateCache:function(t){this.offset=this.helper.offset(),this._isNumber(t.left)&&(this.position.left=t.left),this._isNumber(t.top)&&(this.position.top=t.top),this._isNumber(t.height)&&(this.size.height=t.height),this._isNumber(t.width)&&(this.size.width=t.width)},_updateRatio:function(t){var e=this.position,i=this.size,n=this.axis;return this._isNumber(t.height)?t.width=t.height*this.aspectRatio:this._isNumber(t.width)&&(t.height=t.width/this.aspectRatio),"sw"===n&&(t.left=e.left+(i.width-t.width),t.top=null),"nw"===n&&(t.top=e.top+(i.height-t.height),t.left=e.left+(i.width-t.width)),t},_respectSize:function(t){var e=this._vBoundaries,i=this.axis,n=this._isNumber(t.width)&&e.maxWidth&&e.maxWidth<t.width,s=this._isNumber(t.height)&&e.maxHeight&&e.maxHeight<t.height,o=this._isNumber(t.width)&&e.minWidth&&e.minWidth>t.width,r=this._isNumber(t.height)&&e.minHeight&&e.minHeight>t.height,a=this.originalPosition.left+this.originalSize.width,l=this.position.top+this.size.height,u=/sw|nw|w/.test(i),c=/nw|ne|n/.test(i);return o&&(t.width=e.minWidth),r&&(t.height=e.minHeight),n&&(t.width=e.maxWidth),s&&(t.height=e.maxHeight),o&&u&&(t.left=a-e.minWidth),n&&u&&(t.left=a-e.maxWidth),r&&c&&(t.top=l-e.minHeight),s&&c&&(t.top=l-e.maxHeight),t.width||t.height||t.left||!t.top?t.width||t.height||t.top||!t.left||(t.left=null):t.top=null,t},_getPaddingPlusBorderDimensions:function(t){for(var e=0,i=[],n=[t.css("borderTopWidth"),t.css("borderRightWidth"),t.css("borderBottomWidth"),t.css("borderLeftWidth")],s=[t.css("paddingTop"),t.css("paddingRight"),t.css("paddingBottom"),t.css("paddingLeft")];4>e;e++)i[e]=parseInt(n[e],10)||0,i[e]+=parseInt(s[e],10)||0;return{height:i[0]+i[2],width:i[1]+i[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var t,e=0,i=this.helper||this.element;e<this._proportionallyResizeElements.length;e++)t=this._proportionallyResizeElements[e],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(t)),t.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0})},_renderProxy:function(){var e=this.element,i=this.options;this.elementOffset=e.offset(),this._helper?(this.helper=this.helper||t("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(t,e){return{width:this.originalSize.width+e}},w:function(t,e){var i=this.originalSize,n=this.originalPosition;return{left:n.left+e,width:i.width-e}},n:function(t,e,i){var n=this.originalSize,s=this.originalPosition;return{top:s.top+i,height:n.height-i}},s:function(t,e,i){return{height:this.originalSize.height+i}},se:function(e,i,n){return t.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[e,i,n]))},sw:function(e,i,n){return t.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[e,i,n]))},ne:function(e,i,n){return t.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[e,i,n]))},nw:function(e,i,n){return t.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[e,i,n]))}},_propagate:function(e,i){t.ui.plugin.call(this,e,[i,this.ui()]),"resize"!==e&&this._trigger(e,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),t.ui.plugin.add("resizable","animate",{stop:function(e){var i=t(this).resizable("instance"),n=i.options,s=i._proportionallyResizeElements,o=s.length&&/textarea/i.test(s[0].nodeName),r=o&&i._hasScroll(s[0],"left")?0:i.sizeDiff.height,a=o?0:i.sizeDiff.width,l={width:i.size.width-a,height:i.size.height-r},u=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,c=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(t.extend(l,c&&u?{top:c,left:u}:{}),{duration:n.animateDuration,easing:n.animateEasing,step:function(){var n={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};s&&s.length&&t(s[0]).css({width:n.width,height:n.height}),i._updateCache(n),i._propagate("resize",e)}})}}),t.ui.plugin.add("resizable","containment",{start:function(){var e,i,n,s,o,r,a,l=t(this).resizable("instance"),u=l.options,c=l.element,h=u.containment,d=h instanceof t?h.get(0):/parent/.test(h)?c.parent().get(0):h;d&&(l.containerElement=t(d),/document/.test(h)||h===document?(l.containerOffset={left:0,top:0},l.containerPosition={left:0,top:0},l.parentData={element:t(document),left:0,top:0,width:t(document).width(),height:t(document).height()||document.body.parentNode.scrollHeight}):(e=t(d),i=[],t(["Top","Right","Left","Bottom"]).each(function(t,n){i[t]=l._num(e.css("padding"+n))}),l.containerOffset=e.offset(),l.containerPosition=e.position(),l.containerSize={height:e.innerHeight()-i[3],width:e.innerWidth()-i[1]},n=l.containerOffset,s=l.containerSize.height,o=l.containerSize.width,r=l._hasScroll(d,"left")?d.scrollWidth:o,a=l._hasScroll(d)?d.scrollHeight:s,l.parentData={element:d,left:n.left,top:n.top,width:r,height:a}))},resize:function(e){var i,n,s,o,r=t(this).resizable("instance"),a=r.options,l=r.containerOffset,u=r.position,c=r._aspectRatio||e.shiftKey,h={top:0,left:0},d=r.containerElement,p=!0;d[0]!==document&&/static/.test(d.css("position"))&&(h=l),u.left<(r._helper?l.left:0)&&(r.size.width=r.size.width+(r._helper?r.position.left-l.left:r.position.left-h.left),c&&(r.size.height=r.size.width/r.aspectRatio,p=!1),r.position.left=a.helper?l.left:0),u.top<(r._helper?l.top:0)&&(r.size.height=r.size.height+(r._helper?r.position.top-l.top:r.position.top),c&&(r.size.width=r.size.height*r.aspectRatio,p=!1),r.position.top=r._helper?l.top:0),s=r.containerElement.get(0)===r.element.parent().get(0),o=/relative|absolute/.test(r.containerElement.css("position")),s&&o?(r.offset.left=r.parentData.left+r.position.left,r.offset.top=r.parentData.top+r.position.top):(r.offset.left=r.element.offset().left,r.offset.top=r.element.offset().top),i=Math.abs(r.sizeDiff.width+(r._helper?r.offset.left-h.left:r.offset.left-l.left)),n=Math.abs(r.sizeDiff.height+(r._helper?r.offset.top-h.top:r.offset.top-l.top)),i+r.size.width>=r.parentData.width&&(r.size.width=r.parentData.width-i,c&&(r.size.height=r.size.width/r.aspectRatio,p=!1)),n+r.size.height>=r.parentData.height&&(r.size.height=r.parentData.height-n,c&&(r.size.width=r.size.height*r.aspectRatio,p=!1)),p||(r.position.left=r.prevPosition.left,r.position.top=r.prevPosition.top,r.size.width=r.prevSize.width,r.size.height=r.prevSize.height)},stop:function(){var e=t(this).resizable("instance"),i=e.options,n=e.containerOffset,s=e.containerPosition,o=e.containerElement,r=t(e.helper),a=r.offset(),l=r.outerWidth()-e.sizeDiff.width,u=r.outerHeight()-e.sizeDiff.height;e._helper&&!i.animate&&/relative/.test(o.css("position"))&&t(this).css({left:a.left-s.left-n.left,width:l,height:u}),e._helper&&!i.animate&&/static/.test(o.css("position"))&&t(this).css({left:a.left-s.left-n.left,width:l,height:u})}}),t.ui.plugin.add("resizable","alsoResize",{start:function(){var e=t(this).resizable("instance"),i=e.options;t(i.alsoResize).each(function(){var e=t(this);e.data("ui-resizable-alsoresize",{width:parseInt(e.width(),10),height:parseInt(e.height(),10),left:parseInt(e.css("left"),10),top:parseInt(e.css("top"),10)})})},resize:function(e,i){var n=t(this).resizable("instance"),s=n.options,o=n.originalSize,r=n.originalPosition,a={height:n.size.height-o.height||0,width:n.size.width-o.width||0,top:n.position.top-r.top||0,left:n.position.left-r.left||0};t(s.alsoResize).each(function(){var e=t(this),n=t(this).data("ui-resizable-alsoresize"),s={},o=e.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];t.each(o,function(t,e){var i=(n[e]||0)+(a[e]||0);i&&i>=0&&(s[e]=i||null)}),e.css(s)})},stop:function(){t(this).removeData("resizable-alsoresize")}}),t.ui.plugin.add("resizable","ghost",{start:function(){var e=t(this).resizable("instance"),i=e.options,n=e.size;e.ghost=e.originalElement.clone(),e.ghost.css({opacity:.25,display:"block",position:"relative",height:n.height,width:n.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),e.ghost.appendTo(e.helper)},resize:function(){var e=t(this).resizable("instance");e.ghost&&e.ghost.css({position:"relative",height:e.size.height,width:e.size.width})},stop:function(){var e=t(this).resizable("instance");e.ghost&&e.helper&&e.helper.get(0).removeChild(e.ghost.get(0))}}),t.ui.plugin.add("resizable","grid",{resize:function(){var e,i=t(this).resizable("instance"),n=i.options,s=i.size,o=i.originalSize,r=i.originalPosition,a=i.axis,l="number"==typeof n.grid?[n.grid,n.grid]:n.grid,u=l[0]||1,c=l[1]||1,h=Math.round((s.width-o.width)/u)*u,d=Math.round((s.height-o.height)/c)*c,p=o.width+h,f=o.height+d,m=n.maxWidth&&n.maxWidth<p,g=n.maxHeight&&n.maxHeight<f,v=n.minWidth&&n.minWidth>p,y=n.minHeight&&n.minHeight>f;n.grid=l,v&&(p+=u),y&&(f+=c),m&&(p-=u),g&&(f-=c),/^(se|s|e)$/.test(a)?(i.size.width=p,i.size.height=f):/^(ne)$/.test(a)?(i.size.width=p,i.size.height=f,i.position.top=r.top-d):/^(sw)$/.test(a)?(i.size.width=p,i.size.height=f,i.position.left=r.left-h):((0>=f-c||0>=p-u)&&(e=i._getPaddingPlusBorderDimensions(this)),f-c>0?(i.size.height=f,i.position.top=r.top-d):(f=c-e.height,i.size.height=f,i.position.top=r.top+o.height-f),p-u>0?(i.size.width=p,i.position.left=r.left-h):(p=u-e.width,i.size.width=p,i.position.left=r.left+o.width-p))}}),t.ui.resizable}),/*!
 * jQuery UI Dialog 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/dialog/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./button","./draggable","./mouse","./position","./resizable"],t):t(jQuery)}(function(t){return t.widget("ui.dialog",{version:"1.11.4",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"Close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(e){var i=t(this).css(e).offset().top;0>i&&t(this).css("top",e.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&t.fn.draggable&&this._makeDraggable(),this.options.resizable&&t.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var e=this.options.appendTo;return e&&(e.jquery||e.nodeType)?t(e):this.document.find(e||"body").eq(0)},_destroy:function(){var t,e=this.originalPosition;this._untrackInstance(),this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),t=e.parent.children().eq(e.index),t.length&&t[0]!==this.element[0]?t.before(this.element):e.parent.append(this.element)},widget:function(){return this.uiDialog},disable:t.noop,enable:t.noop,close:function(e){var i,n=this;if(this._isOpen&&this._trigger("beforeClose",e)!==!1){if(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),!this.opener.filter(":focusable").focus().length)try{i=this.document[0].activeElement,i&&"body"!==i.nodeName.toLowerCase()&&t(i).blur()}catch(s){}this._hide(this.uiDialog,this.options.hide,function(){n._trigger("close",e)})}},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(e,i){var n=!1,s=this.uiDialog.siblings(".ui-front:visible").map(function(){return+t(this).css("z-index")}).get(),o=Math.max.apply(null,s);return o>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",o+1),n=!0),n&&!i&&this._trigger("focus",e),n},open:function(){var e=this;return this._isOpen?void(this._moveToTop()&&this._focusTabbable()):(this._isOpen=!0,this.opener=t(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){e._focusTabbable(),e._trigger("focus")}),this._makeFocusTarget(),void this._trigger("open"))},_focusTabbable:function(){var t=this._focusedElement;t||(t=this.element.find("[autofocus]")),t.length||(t=this.element.find(":tabbable")),t.length||(t=this.uiDialogButtonPane.find(":tabbable")),t.length||(t=this.uiDialogTitlebarClose.filter(":tabbable")),t.length||(t=this.uiDialog),t.eq(0).focus()},_keepFocus:function(e){function i(){var e=this.document[0].activeElement,i=this.uiDialog[0]===e||t.contains(this.uiDialog[0],e);i||this._focusTabbable()}e.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function(e){if(this.options.closeOnEscape&&!e.isDefaultPrevented()&&e.keyCode&&e.keyCode===t.ui.keyCode.ESCAPE)return e.preventDefault(),void this.close(e);if(e.keyCode===t.ui.keyCode.TAB&&!e.isDefaultPrevented()){var i=this.uiDialog.find(":tabbable"),n=i.filter(":first"),s=i.filter(":last");e.target!==s[0]&&e.target!==this.uiDialog[0]||e.shiftKey?e.target!==n[0]&&e.target!==this.uiDialog[0]||!e.shiftKey||(this._delay(function(){s.focus()}),e.preventDefault()):(this._delay(function(){n.focus()}),e.preventDefault())}},mousedown:function(t){this._moveToTop(t)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var e;this.uiDialogTitlebar=t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function(e){t(e.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus()}}),this.uiDialogTitlebarClose=t("<button type='button'></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function(t){t.preventDefault(),this.close(t)}}),e=t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(e),this.uiDialog.attr({"aria-labelledby":e.attr("id")})},_title:function(t){this.options.title||t.html("&#160;"),t.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons()},_createButtons:function(){var e=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),t.isEmptyObject(i)||t.isArray(i)&&!i.length?void this.uiDialog.removeClass("ui-dialog-buttons"):(t.each(i,function(i,n){var s,o;n=t.isFunction(n)?{click:n,text:i}:n,n=t.extend({type:"button"},n),s=n.click,n.click=function(){s.apply(e.element[0],arguments)},o={icons:n.icons,text:n.showText},delete n.icons,delete n.showText,t("<button></button>",n).button(o).appendTo(e.uiButtonSet)}),this.uiDialog.addClass("ui-dialog-buttons"),void this.uiDialogButtonPane.appendTo(this.uiDialog))},_makeDraggable:function(){function e(t){return{position:t.position,offset:t.offset}}var i=this,n=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(n,s){t(this).addClass("ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",n,e(s))},drag:function(t,n){i._trigger("drag",t,e(n))},stop:function(s,o){var r=o.offset.left-i.document.scrollLeft(),a=o.offset.top-i.document.scrollTop();n.position={my:"left top",at:"left"+(r>=0?"+":"")+r+" top"+(a>=0?"+":"")+a,of:i.window},t(this).removeClass("ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",s,e(o))}})},_makeResizable:function(){function e(t){return{originalPosition:t.originalPosition,originalSize:t.originalSize,position:t.position,size:t.size}}var i=this,n=this.options,s=n.resizable,o=this.uiDialog.css("position"),r="string"==typeof s?s:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:n.maxWidth,maxHeight:n.maxHeight,minWidth:n.minWidth,minHeight:this._minHeight(),handles:r,start:function(n,s){t(this).addClass("ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",n,e(s))},resize:function(t,n){i._trigger("resize",t,e(n))},stop:function(s,o){var r=i.uiDialog.offset(),a=r.left-i.document.scrollLeft(),l=r.top-i.document.scrollTop();n.height=i.uiDialog.height(),n.width=i.uiDialog.width(),n.position={my:"left top",at:"left"+(a>=0?"+":"")+a+" top"+(l>=0?"+":"")+l,of:i.window},t(this).removeClass("ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",s,e(o))}}).css("position",o)},_trackFocus:function(){this._on(this.widget(),{focusin:function(e){this._makeFocusTarget(),this._focusedElement=t(e.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var e=this._trackingInstances(),i=t.inArray(this,e);-1!==i&&e.splice(i,1)},_trackingInstances:function(){var t=this.document.data("ui-dialog-instances");return t||(t=[],this.document.data("ui-dialog-instances",t)),t},_minHeight:function(){var t=this.options;return"auto"===t.height?t.minHeight:Math.min(t.minHeight,t.height)},_position:function(){var t=this.uiDialog.is(":visible");t||this.uiDialog.show(),this.uiDialog.position(this.options.position),t||this.uiDialog.hide()},_setOptions:function(e){var i=this,n=!1,s={};t.each(e,function(t,e){i._setOption(t,e),t in i.sizeRelatedOptions&&(n=!0),t in i.resizableRelatedOptions&&(s[t]=e)}),n&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",s)},_setOption:function(t,e){var i,n,s=this.uiDialog;"dialogClass"===t&&s.removeClass(this.options.dialogClass).addClass(e),"disabled"!==t&&(this._super(t,e),"appendTo"===t&&this.uiDialog.appendTo(this._appendTo()),"buttons"===t&&this._createButtons(),"closeText"===t&&this.uiDialogTitlebarClose.button({label:""+e}),"draggable"===t&&(i=s.is(":data(ui-draggable)"),i&&!e&&s.draggable("destroy"),!i&&e&&this._makeDraggable()),"position"===t&&this._position(),"resizable"===t&&(n=s.is(":data(ui-resizable)"),n&&!e&&s.resizable("destroy"),n&&"string"==typeof e&&s.resizable("option","handles",e),n||e===!1||this._makeResizable()),"title"===t&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var t,e,i,n=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),n.minWidth>n.width&&(n.width=n.minWidth),t=this.uiDialog.css({height:"auto",width:n.width}).outerHeight(),e=Math.max(0,n.minHeight-t),i="number"==typeof n.maxHeight?Math.max(0,n.maxHeight-t):"none","auto"===n.height?this.element.css({minHeight:e,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,n.height-t)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var e=t(this);return t("<div>").css({position:"absolute",width:e.outerWidth(),height:e.outerHeight()}).appendTo(e.parent()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(e){return t(e.target).closest(".ui-dialog").length?!0:!!t(e.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var e=!0;this._delay(function(){e=!1}),this.document.data("ui-dialog-overlays")||this._on(this.document,{focusin:function(t){e||this._allowInteraction(t)||(t.preventDefault(),this._trackingInstances()[0]._focusTabbable())}}),this.overlay=t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)}},_destroyOverlay:function(){if(this.options.modal&&this.overlay){var t=this.document.data("ui-dialog-overlays")-1;t?this.document.data("ui-dialog-overlays",t):this.document.unbind("focusin").removeData("ui-dialog-overlays"),this.overlay.remove(),this.overlay=null}}})}),/*!
 * jQuery UI Droppable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/droppable/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./mouse","./draggable"],t):t(jQuery)}(function(t){return t.widget("ui.droppable",{version:"1.11.4",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var e,i=this.options,n=i.accept;this.isover=!1,this.isout=!0,this.accept=t.isFunction(n)?n:function(t){return t.is(n)},this.proportions=function(){return arguments.length?void(e=arguments[0]):e?e:e={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}},this._addToManager(i.scope),i.addClasses&&this.element.addClass("ui-droppable")},_addToManager:function(e){t.ui.ddmanager.droppables[e]=t.ui.ddmanager.droppables[e]||[],t.ui.ddmanager.droppables[e].push(this)},_splice:function(t){for(var e=0;e<t.length;e++)t[e]===this&&t.splice(e,1)},_destroy:function(){var e=t.ui.ddmanager.droppables[this.options.scope];this._splice(e),this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(e,i){if("accept"===e)this.accept=t.isFunction(i)?i:function(t){return t.is(i)};else if("scope"===e){var n=t.ui.ddmanager.droppables[this.options.scope];this._splice(n),this._addToManager(i)}this._super(e,i)},_activate:function(e){var i=t.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),i&&this._trigger("activate",e,this.ui(i))},_deactivate:function(e){var i=t.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),i&&this._trigger("deactivate",e,this.ui(i))},_over:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",e,this.ui(i)))},_out:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",e,this.ui(i)))},_drop:function(e,i){var n=i||t.ui.ddmanager.current,s=!1;return n&&(n.currentItem||n.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=t(this).droppable("instance");return i.options.greedy&&!i.options.disabled&&i.options.scope===n.options.scope&&i.accept.call(i.element[0],n.currentItem||n.element)&&t.ui.intersect(n,t.extend(i,{offset:i.element.offset()}),i.options.tolerance,e)?(s=!0,!1):void 0}),s?!1:this.accept.call(this.element[0],n.currentItem||n.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",e,this.ui(n)),this.element):!1):!1},ui:function(t){return{draggable:t.currentItem||t.element,helper:t.helper,position:t.position,offset:t.positionAbs}}}),t.ui.intersect=function(){function t(t,e,i){return t>=e&&e+i>t}return function(e,i,n,s){if(!i.offset)return!1;var o=(e.positionAbs||e.position.absolute).left+e.margins.left,r=(e.positionAbs||e.position.absolute).top+e.margins.top,a=o+e.helperProportions.width,l=r+e.helperProportions.height,u=i.offset.left,c=i.offset.top,h=u+i.proportions().width,d=c+i.proportions().height;switch(n){case"fit":return o>=u&&h>=a&&r>=c&&d>=l;case"intersect":return u<o+e.helperProportions.width/2&&a-e.helperProportions.width/2<h&&c<r+e.helperProportions.height/2&&l-e.helperProportions.height/2<d;case"pointer":return t(s.pageY,c,i.proportions().height)&&t(s.pageX,u,i.proportions().width);case"touch":return(r>=c&&d>=r||l>=c&&d>=l||c>r&&l>d)&&(o>=u&&h>=o||a>=u&&h>=a||u>o&&a>h);default:return!1}}}(),t.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(e,i){var n,s,o=t.ui.ddmanager.droppables[e.options.scope]||[],r=i?i.type:null,a=(e.currentItem||e.element).find(":data(ui-droppable)").addBack();t:for(n=0;n<o.length;n++)if(!(o[n].options.disabled||e&&!o[n].accept.call(o[n].element[0],e.currentItem||e.element))){for(s=0;s<a.length;s++)if(a[s]===o[n].element[0]){o[n].proportions().height=0;continue t}o[n].visible="none"!==o[n].element.css("display"),o[n].visible&&("mousedown"===r&&o[n]._activate.call(o[n],i),o[n].offset=o[n].element.offset(),o[n].proportions({width:o[n].element[0].offsetWidth,height:o[n].element[0].offsetHeight}))}},drop:function(e,i){var n=!1;return t.each((t.ui.ddmanager.droppables[e.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&t.ui.intersect(e,this,this.options.tolerance,i)&&(n=this._drop.call(this,i)||n),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],e.currentItem||e.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),n},dragStart:function(e,i){e.element.parentsUntil("body").bind("scroll.droppable",function(){e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)})},drag:function(e,i){e.options.refreshPositions&&t.ui.ddmanager.prepareOffsets(e,i),t.each(t.ui.ddmanager.droppables[e.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var n,s,o,r=t.ui.intersect(e,this,this.options.tolerance,i),a=!r&&this.isover?"isout":r&&!this.isover?"isover":null;a&&(this.options.greedy&&(s=this.options.scope,o=this.element.parents(":data(ui-droppable)").filter(function(){return t(this).droppable("instance").options.scope===s}),o.length&&(n=t(o[0]).droppable("instance"),n.greedyChild="isover"===a)),n&&"isover"===a&&(n.isover=!1,n.isout=!0,n._out.call(n,i)),this[a]=!0,this["isout"===a?"isover":"isout"]=!1,this["isover"===a?"_over":"_out"].call(this,i),n&&"isout"===a&&(n.isout=!1,n.isover=!0,n._over.call(n,i)))}})},dragStop:function(e,i){e.element.parentsUntil("body").unbind("scroll.droppable"),e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)}},t.ui.droppable}),/*!
 * jQuery UI Effects 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/effects-core/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){var e="ui-effects-",i=t;/*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
return t.effects={effect:{}},function(t,e){function i(t,e,i){var n=h[e.type]||{};return null==t?i||!e.def?null:e.def:(t=n.floor?~~t:parseFloat(t),isNaN(t)?e.def:n.mod?(t+n.mod)%n.mod:0>t?0:n.max<t?n.max:t)}function n(e){var i=u(),n=i._rgba=[];return e=e.toLowerCase(),f(l,function(t,s){var o,r=s.re.exec(e),a=r&&s.parse(r),l=s.space||"rgba";return a?(o=i[l](a),i[c[l].cache]=o[c[l].cache],n=i._rgba=o._rgba,!1):void 0}),n.length?("0,0,0,0"===n.join()&&t.extend(n,o.transparent),i):o[e]}function s(t,e,i){return i=(i+1)%1,1>6*i?t+(e-t)*i*6:1>2*i?e:2>3*i?t+(e-t)*(2/3-i)*6:t}var o,r="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",a=/^([\-+])=\s*(\d+\.?\d*)/,l=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],u=t.Color=function(e,i,n,s){return new t.Color.fn.parse(e,i,n,s)},c={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},h={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=u.support={},p=t("<p>")[0],f=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(c,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),u.fn=t.extend(u.prototype,{parse:function(s,r,a,l){if(s===e)return this._rgba=[null,null,null,null],this;(s.jquery||s.nodeType)&&(s=t(s).css(r),r=e);var h=this,d=t.type(s),p=this._rgba=[];return r!==e&&(s=[s,r,a,l],d="array"),"string"===d?this.parse(n(s)||o._default):"array"===d?(f(c.rgba.props,function(t,e){p[e.idx]=i(s[e.idx],e)}),this):"object"===d?(s instanceof u?f(c,function(t,e){s[e.cache]&&(h[e.cache]=s[e.cache].slice())}):f(c,function(e,n){var o=n.cache;f(n.props,function(t,e){if(!h[o]&&n.to){if("alpha"===t||null==s[t])return;h[o]=n.to(h._rgba)}h[o][e.idx]=i(s[t],e,!0)}),h[o]&&t.inArray(null,h[o].slice(0,3))<0&&(h[o][3]=1,n.from&&(h._rgba=n.from(h[o])))}),this):void 0},is:function(t){var e=u(t),i=!0,n=this;return f(c,function(t,s){var o,r=e[s.cache];return r&&(o=n[s.cache]||s.to&&s.to(n._rgba)||[],f(s.props,function(t,e){return null!=r[e.idx]?i=r[e.idx]===o[e.idx]:void 0})),i}),i},_space:function(){var t=[],e=this;return f(c,function(i,n){e[n.cache]&&t.push(i)}),t.pop()},transition:function(t,e){var n=u(t),s=n._space(),o=c[s],r=0===this.alpha()?u("transparent"):this,a=r[o.cache]||o.to(r._rgba),l=a.slice();return n=n[o.cache],f(o.props,function(t,s){var o=s.idx,r=a[o],u=n[o],c=h[s.type]||{};null!==u&&(null===r?l[o]=u:(c.mod&&(u-r>c.mod/2?r+=c.mod:r-u>c.mod/2&&(r-=c.mod)),l[o]=i((u-r)*e+r,s)))}),this[s](l)},blend:function(e){if(1===this._rgba[3])return this;var i=this._rgba.slice(),n=i.pop(),s=u(e)._rgba;return u(t.map(i,function(t,e){return(1-n)*s[e]+n*t}))},toRgbaString:function(){var e="rgba(",i=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===i[3]&&(i.pop(),e="rgb("),e+i.join()+")"},toHslaString:function(){var e="hsla(",i=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===i[3]&&(i.pop(),e="hsl("),e+i.join()+")"},toHexString:function(e){var i=this._rgba.slice(),n=i.pop();return e&&i.push(~~(255*n)),"#"+t.map(i,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),u.fn.parse.prototype=u.fn,c.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,i,n=t[0]/255,s=t[1]/255,o=t[2]/255,r=t[3],a=Math.max(n,s,o),l=Math.min(n,s,o),u=a-l,c=a+l,h=.5*c;return e=l===a?0:n===a?60*(s-o)/u+360:s===a?60*(o-n)/u+120:60*(n-s)/u+240,i=0===u?0:.5>=h?u/c:u/(2-c),[Math.round(e)%360,i,h,null==r?1:r]},c.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,i=t[1],n=t[2],o=t[3],r=.5>=n?n*(1+i):n+i-n*i,a=2*n-r;return[Math.round(255*s(a,r,e+1/3)),Math.round(255*s(a,r,e)),Math.round(255*s(a,r,e-1/3)),o]},f(c,function(n,s){var o=s.props,r=s.cache,l=s.to,c=s.from;u.fn[n]=function(n){if(l&&!this[r]&&(this[r]=l(this._rgba)),n===e)return this[r].slice();var s,a=t.type(n),h="array"===a||"object"===a?n:arguments,d=this[r].slice();return f(o,function(t,e){var n=h["object"===a?t:e.idx];null==n&&(n=d[e.idx]),d[e.idx]=i(n,e)}),c?(s=u(c(d)),s[r]=d,s):u(d)},f(o,function(e,i){u.fn[e]||(u.fn[e]=function(s){var o,r=t.type(s),l="alpha"===e?this._hsla?"hsla":"rgba":n,u=this[l](),c=u[i.idx];return"undefined"===r?c:("function"===r&&(s=s.call(this,c),r=t.type(s)),null==s&&i.empty?this:("string"===r&&(o=a.exec(s),o&&(s=c+parseFloat(o[2])*("+"===o[1]?1:-1))),u[i.idx]=s,this[l](u)))})})}),u.hook=function(e){var i=e.split(" ");f(i,function(e,i){t.cssHooks[i]={set:function(e,s){var o,r,a="";if("transparent"!==s&&("string"!==t.type(s)||(o=n(s)))){if(s=u(o||s),!d.rgba&&1!==s._rgba[3]){for(r="backgroundColor"===i?e.parentNode:e;(""===a||"transparent"===a)&&r&&r.style;)try{a=t.css(r,"backgroundColor"),r=r.parentNode}catch(l){}s=s.blend(a&&"transparent"!==a?a:"_default")}s=s.toRgbaString()}try{e.style[i]=s}catch(l){}}},t.fx.step[i]=function(e){e.colorInit||(e.start=u(e.elem,i),e.end=u(e.end),e.colorInit=!0),t.cssHooks[i].set(e.elem,e.start.transition(e.end,e.pos))}})},u.hook(r),t.cssHooks.borderColor={expand:function(t){var e={};return f(["Top","Right","Bottom","Left"],function(i,n){e["border"+n+"Color"]=t}),e}},o=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(i),function(){function e(e){var i,n,s=e.ownerDocument.defaultView?e.ownerDocument.defaultView.getComputedStyle(e,null):e.currentStyle,o={};if(s&&s.length&&s[0]&&s[s[0]])for(n=s.length;n--;)i=s[n],"string"==typeof s[i]&&(o[t.camelCase(i)]=s[i]);else for(i in s)"string"==typeof s[i]&&(o[i]=s[i]);return o}function n(e,i){var n,s,r={};for(n in i)s=i[n],e[n]!==s&&(o[n]||!t.fx.step[n]&&isNaN(parseFloat(s))||(r[n]=s));return r}var s=["add","remove","toggle"],o={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};t.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(e,n){t.fx.step[n]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(i.style(t.elem,n,t.end),t.setAttr=!0)}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.effects.animateClass=function(i,o,r,a){var l=t.speed(o,r,a);return this.queue(function(){var o,r=t(this),a=r.attr("class")||"",u=l.children?r.find("*").addBack():r;u=u.map(function(){var i=t(this);return{el:i,start:e(this)}}),o=function(){t.each(s,function(t,e){i[e]&&r[e+"Class"](i[e])})},o(),u=u.map(function(){return this.end=e(this.el[0]),this.diff=n(this.start,this.end),this}),r.attr("class",a),u=u.map(function(){var e=this,i=t.Deferred(),n=t.extend({},l,{queue:!1,complete:function(){i.resolve(e)}});return this.el.animate(this.diff,n),i.promise()}),t.when.apply(t,u.get()).done(function(){o(),t.each(arguments,function(){var e=this.el;t.each(this.diff,function(t){e.css(t,"")})}),l.complete.call(r[0])})})},t.fn.extend({addClass:function(e){return function(i,n,s,o){return n?t.effects.animateClass.call(this,{add:i},n,s,o):e.apply(this,arguments)}}(t.fn.addClass),removeClass:function(e){return function(i,n,s,o){return arguments.length>1?t.effects.animateClass.call(this,{remove:i},n,s,o):e.apply(this,arguments)}}(t.fn.removeClass),toggleClass:function(e){return function(i,n,s,o,r){return"boolean"==typeof n||void 0===n?s?t.effects.animateClass.call(this,n?{add:i}:{remove:i},s,o,r):e.apply(this,arguments):t.effects.animateClass.call(this,{toggle:i},n,s,o)}}(t.fn.toggleClass),switchClass:function(e,i,n,s,o){return t.effects.animateClass.call(this,{add:i,remove:e},n,s,o)}})}(),function(){function i(e,i,n,s){return t.isPlainObject(e)&&(i=e,e=e.effect),e={effect:e},null==i&&(i={}),t.isFunction(i)&&(s=i,n=null,i={}),("number"==typeof i||t.fx.speeds[i])&&(s=n,n=i,i={}),t.isFunction(n)&&(s=n,n=null),i&&t.extend(e,i),n=n||i.duration,e.duration=t.fx.off?0:"number"==typeof n?n:n in t.fx.speeds?t.fx.speeds[n]:t.fx.speeds._default,e.complete=s||i.complete,e}function n(e){return!e||"number"==typeof e||t.fx.speeds[e]?!0:"string"!=typeof e||t.effects.effect[e]?t.isFunction(e)?!0:"object"==typeof e&&!e.effect:!0}t.extend(t.effects,{version:"1.11.4",save:function(t,i){for(var n=0;n<i.length;n++)null!==i[n]&&t.data(e+i[n],t[0].style[i[n]])},restore:function(t,i){var n,s;for(s=0;s<i.length;s++)null!==i[s]&&(n=t.data(e+i[s]),void 0===n&&(n=""),t.css(i[s],n))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},getBaseline:function(t,e){var i,n;switch(t[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=t[0]/e.height}switch(t[1]){case"left":n=0;break;case"center":n=.5;break;case"right":n=1;break;default:n=t[1]/e.width}return{x:n,y:i}},createWrapper:function(e){if(e.parent().is(".ui-effects-wrapper"))return e.parent();var i={width:e.outerWidth(!0),height:e.outerHeight(!0),"float":e.css("float")},n=t("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),s={width:e.width(),height:e.height()},o=document.activeElement;try{o.id}catch(r){o=document.body}return e.wrap(n),(e[0]===o||t.contains(e[0],o))&&t(o).focus(),n=e.parent(),"static"===e.css("position")?(n.css({position:"relative"}),e.css({position:"relative"})):(t.extend(i,{position:e.css("position"),zIndex:e.css("z-index")}),t.each(["top","left","bottom","right"],function(t,n){i[n]=e.css(n),isNaN(parseInt(i[n],10))&&(i[n]="auto")}),e.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),e.css(s),n.css(i).show()},removeWrapper:function(e){var i=document.activeElement;return e.parent().is(".ui-effects-wrapper")&&(e.parent().replaceWith(e),(e[0]===i||t.contains(e[0],i))&&t(i).focus()),e},setTransition:function(e,i,n,s){return s=s||{},t.each(i,function(t,i){var o=e.cssUnit(i);o[0]>0&&(s[i]=o[0]*n+o[1])}),s}}),t.fn.extend({effect:function(){function e(e){function i(){t.isFunction(o)&&o.call(s[0]),t.isFunction(e)&&e()}var s=t(this),o=n.complete,a=n.mode;(s.is(":hidden")?"hide"===a:"show"===a)?(s[a](),i()):r.call(s[0],n,i)}var n=i.apply(this,arguments),s=n.mode,o=n.queue,r=t.effects.effect[n.effect];return t.fx.off||!r?s?this[s](n.duration,n.complete):this.each(function(){n.complete&&n.complete.call(this)}):o===!1?this.each(e):this.queue(o||"fx",e)},show:function(t){return function(e){if(n(e))return t.apply(this,arguments);var s=i.apply(this,arguments);return s.mode="show",this.effect.call(this,s)}}(t.fn.show),hide:function(t){return function(e){if(n(e))return t.apply(this,arguments);var s=i.apply(this,arguments);return s.mode="hide",this.effect.call(this,s)}}(t.fn.hide),toggle:function(t){return function(e){if(n(e)||"boolean"==typeof e)return t.apply(this,arguments);var s=i.apply(this,arguments);return s.mode="toggle",this.effect.call(this,s)}}(t.fn.toggle),cssUnit:function(e){var i=this.css(e),n=[];return t.each(["em","px","%","pt"],function(t,e){i.indexOf(e)>0&&(n=[parseFloat(i),e])}),n}})}(),function(){var e={};t.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,i){e[i]=function(e){return Math.pow(e,t+2)}}),t.extend(e,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,i=4;t<((e=Math.pow(2,--i))-1)/11;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*e-2)/22-t,2)}}),t.each(e,function(e,i){t.easing["easeIn"+e]=i,t.easing["easeOut"+e]=function(t){return 1-i(1-t)},t.easing["easeInOut"+e]=function(t){return.5>t?i(2*t)/2:1-i(-2*t+2)/2}})}(),t.effects}),/*!
 * jQuery UI Effects Blind 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/blind-effect/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.blind=function(e,i){var n,s,o,r=t(this),a=/up|down|vertical/,l=/up|left|vertical|horizontal/,u=["position","top","bottom","left","right","height","width"],c=t.effects.setMode(r,e.mode||"hide"),h=e.direction||"up",d=a.test(h),p=d?"height":"width",f=d?"top":"left",m=l.test(h),g={},v="show"===c;r.parent().is(".ui-effects-wrapper")?t.effects.save(r.parent(),u):t.effects.save(r,u),r.show(),n=t.effects.createWrapper(r).css({overflow:"hidden"}),s=n[p](),o=parseFloat(n.css(f))||0,g[p]=v?s:0,m||(r.css(d?"bottom":"right",0).css(d?"top":"left","auto").css({position:"absolute"}),g[f]=v?o:s+o),v&&(n.css(p,0),m||n.css(f,o+s)),n.animate(g,{duration:e.duration,easing:e.easing,queue:!1,complete:function(){"hide"===c&&r.hide(),t.effects.restore(r,u),t.effects.removeWrapper(r),i()}})}}),/*!
 * jQuery UI Effects Bounce 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/bounce-effect/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.bounce=function(e,i){var n,s,o,r=t(this),a=["position","top","bottom","left","right","height","width"],l=t.effects.setMode(r,e.mode||"effect"),u="hide"===l,c="show"===l,h=e.direction||"up",d=e.distance,p=e.times||5,f=2*p+(c||u?1:0),m=e.duration/f,g=e.easing,v="up"===h||"down"===h?"top":"left",y="up"===h||"left"===h,b=r.queue(),_=b.length;for((c||u)&&a.push("opacity"),t.effects.save(r,a),r.show(),t.effects.createWrapper(r),d||(d=r["top"===v?"outerHeight":"outerWidth"]()/3),c&&(o={opacity:1},o[v]=0,r.css("opacity",0).css(v,y?2*-d:2*d).animate(o,m,g)),u&&(d/=Math.pow(2,p-1)),o={},o[v]=0,n=0;p>n;n++)s={},s[v]=(y?"-=":"+=")+d,r.animate(s,m,g).animate(o,m,g),d=u?2*d:d/2;u&&(s={opacity:0},s[v]=(y?"-=":"+=")+d,r.animate(s,m,g)),r.queue(function(){u&&r.hide(),t.effects.restore(r,a),t.effects.removeWrapper(r),i()}),_>1&&b.splice.apply(b,[1,0].concat(b.splice(_,f+1))),r.dequeue()}}),/*!
 * jQuery UI Effects Clip 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/clip-effect/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.clip=function(e,i){var n,s,o,r=t(this),a=["position","top","bottom","left","right","height","width"],l=t.effects.setMode(r,e.mode||"hide"),u="show"===l,c=e.direction||"vertical",h="vertical"===c,d=h?"height":"width",p=h?"top":"left",f={};t.effects.save(r,a),r.show(),n=t.effects.createWrapper(r).css({overflow:"hidden"}),s="IMG"===r[0].tagName?n:r,o=s[d](),u&&(s.css(d,0),s.css(p,o/2)),f[d]=u?o:0,f[p]=u?0:o/2,s.animate(f,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){u||r.hide(),t.effects.restore(r,a),t.effects.removeWrapper(r),i()}})}}),/*!
 * jQuery UI Effects Drop 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/drop-effect/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.drop=function(e,i){var n,s=t(this),o=["position","top","bottom","left","right","opacity","height","width"],r=t.effects.setMode(s,e.mode||"hide"),a="show"===r,l=e.direction||"left",u="up"===l||"down"===l?"top":"left",c="up"===l||"left"===l?"pos":"neg",h={opacity:a?1:0};t.effects.save(s,o),s.show(),t.effects.createWrapper(s),n=e.distance||s["top"===u?"outerHeight":"outerWidth"](!0)/2,a&&s.css("opacity",0).css(u,"pos"===c?-n:n),h[u]=(a?"pos"===c?"+=":"-=":"pos"===c?"-=":"+=")+n,s.animate(h,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===r&&s.hide(),t.effects.restore(s,o),t.effects.removeWrapper(s),i()}})}}),/*!
 * jQuery UI Effects Explode 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/explode-effect/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.explode=function(e,i){function n(){b.push(this),b.length===h*d&&s()}function s(){p.css({visibility:"visible"}),t(b).remove(),m||p.hide(),i()}var o,r,a,l,u,c,h=e.pieces?Math.round(Math.sqrt(e.pieces)):3,d=h,p=t(this),f=t.effects.setMode(p,e.mode||"hide"),m="show"===f,g=p.show().css("visibility","hidden").offset(),v=Math.ceil(p.outerWidth()/d),y=Math.ceil(p.outerHeight()/h),b=[];for(o=0;h>o;o++)for(l=g.top+o*y,c=o-(h-1)/2,r=0;d>r;r++)a=g.left+r*v,u=r-(d-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-r*v,top:-o*y}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:v,height:y,left:a+(m?u*v:0),top:l+(m?c*y:0),opacity:m?0:1}).animate({left:a+(m?0:u*v),top:l+(m?0:c*y),opacity:m?1:0},e.duration||500,e.easing,n)}}),/*!
 * jQuery UI Effects Fade 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/fade-effect/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.fade=function(e,i){var n=t(this),s=t.effects.setMode(n,e.mode||"toggle");n.animate({opacity:s},{queue:!1,duration:e.duration,easing:e.easing,complete:i})}}),/*!
 * jQuery UI Effects Fold 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/fold-effect/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.fold=function(e,i){var n,s,o=t(this),r=["position","top","bottom","left","right","height","width"],a=t.effects.setMode(o,e.mode||"hide"),l="show"===a,u="hide"===a,c=e.size||15,h=/([0-9]+)%/.exec(c),d=!!e.horizFirst,p=l!==d,f=p?["width","height"]:["height","width"],m=e.duration/2,g={},v={};t.effects.save(o,r),o.show(),n=t.effects.createWrapper(o).css({overflow:"hidden"}),s=p?[n.width(),n.height()]:[n.height(),n.width()],h&&(c=parseInt(h[1],10)/100*s[u?0:1]),l&&n.css(d?{height:0,width:c}:{height:c,width:0}),g[f[0]]=l?s[0]:c,v[f[1]]=l?s[1]:0,n.animate(g,m,e.easing).animate(v,m,e.easing,function(){u&&o.hide(),t.effects.restore(o,r),t.effects.removeWrapper(o),i()})}}),/*!
 * jQuery UI Effects Highlight 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/highlight-effect/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.highlight=function(e,i){var n=t(this),s=["backgroundImage","backgroundColor","opacity"],o=t.effects.setMode(n,e.mode||"show"),r={backgroundColor:n.css("backgroundColor")};"hide"===o&&(r.opacity=0),t.effects.save(n,s),n.show().css({backgroundImage:"none",backgroundColor:e.color||"#ffff99"}).animate(r,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===o&&n.hide(),t.effects.restore(n,s),i()}})}}),/*!
 * jQuery UI Effects Size 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/size-effect/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.size=function(e,i){var n,s,o,r=t(this),a=["position","top","bottom","left","right","width","height","overflow","opacity"],l=["position","top","bottom","left","right","overflow","opacity"],u=["width","height","overflow"],c=["fontSize"],h=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],d=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=t.effects.setMode(r,e.mode||"effect"),f=e.restore||"effect"!==p,m=e.scale||"both",g=e.origin||["middle","center"],v=r.css("position"),y=f?a:l,b={height:0,width:0,outerHeight:0,outerWidth:0};"show"===p&&r.show(),n={height:r.height(),width:r.width(),outerHeight:r.outerHeight(),outerWidth:r.outerWidth()},"toggle"===e.mode&&"show"===p?(r.from=e.to||b,r.to=e.from||n):(r.from=e.from||("show"===p?b:n),r.to=e.to||("hide"===p?b:n)),o={from:{y:r.from.height/n.height,x:r.from.width/n.width},to:{y:r.to.height/n.height,x:r.to.width/n.width}},"box"!==m&&"both"!==m||(o.from.y!==o.to.y&&(y=y.concat(h),r.from=t.effects.setTransition(r,h,o.from.y,r.from),r.to=t.effects.setTransition(r,h,o.to.y,r.to)),o.from.x!==o.to.x&&(y=y.concat(d),r.from=t.effects.setTransition(r,d,o.from.x,r.from),r.to=t.effects.setTransition(r,d,o.to.x,r.to))),"content"!==m&&"both"!==m||o.from.y!==o.to.y&&(y=y.concat(c).concat(u),r.from=t.effects.setTransition(r,c,o.from.y,r.from),r.to=t.effects.setTransition(r,c,o.to.y,r.to)),t.effects.save(r,y),r.show(),t.effects.createWrapper(r),r.css("overflow","hidden").css(r.from),g&&(s=t.effects.getBaseline(g,n),r.from.top=(n.outerHeight-r.outerHeight())*s.y,r.from.left=(n.outerWidth-r.outerWidth())*s.x,r.to.top=(n.outerHeight-r.to.outerHeight)*s.y,r.to.left=(n.outerWidth-r.to.outerWidth)*s.x),r.css(r.from),"content"!==m&&"both"!==m||(h=h.concat(["marginTop","marginBottom"]).concat(c),d=d.concat(["marginLeft","marginRight"]),u=a.concat(h).concat(d),r.find("*[width]").each(function(){var i=t(this),n={height:i.height(),width:i.width(),outerHeight:i.outerHeight(),outerWidth:i.outerWidth()};f&&t.effects.save(i,u),i.from={height:n.height*o.from.y,width:n.width*o.from.x,outerHeight:n.outerHeight*o.from.y,outerWidth:n.outerWidth*o.from.x},i.to={height:n.height*o.to.y,width:n.width*o.to.x,outerHeight:n.height*o.to.y,outerWidth:n.width*o.to.x},o.from.y!==o.to.y&&(i.from=t.effects.setTransition(i,h,o.from.y,i.from),i.to=t.effects.setTransition(i,h,o.to.y,i.to)),o.from.x!==o.to.x&&(i.from=t.effects.setTransition(i,d,o.from.x,i.from),i.to=t.effects.setTransition(i,d,o.to.x,i.to)),i.css(i.from),i.animate(i.to,e.duration,e.easing,function(){f&&t.effects.restore(i,u)})})),r.animate(r.to,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){0===r.to.opacity&&r.css("opacity",r.from.opacity),"hide"===p&&r.hide(),t.effects.restore(r,y),f||("static"===v?r.css({position:"relative",top:r.to.top,left:r.to.left}):t.each(["top","left"],function(t,e){r.css(e,function(e,i){var n=parseInt(i,10),s=t?r.to.left:r.to.top;return"auto"===i?s+"px":n+s+"px"})})),t.effects.removeWrapper(r),i()}})}}),/*!
 * jQuery UI Effects Scale 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/scale-effect/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./effect","./effect-size"],t):t(jQuery)}(function(t){return t.effects.effect.scale=function(e,i){var n=t(this),s=t.extend(!0,{},e),o=t.effects.setMode(n,e.mode||"effect"),r=parseInt(e.percent,10)||(0===parseInt(e.percent,10)?0:"hide"===o?0:100),a=e.direction||"both",l=e.origin,u={height:n.height(),width:n.width(),outerHeight:n.outerHeight(),outerWidth:n.outerWidth()},c={y:"horizontal"!==a?r/100:1,x:"vertical"!==a?r/100:1};s.effect="size",s.queue=!1,s.complete=i,"effect"!==o&&(s.origin=l||["middle","center"],s.restore=!0),s.from=e.from||("show"===o?{height:0,width:0,outerHeight:0,outerWidth:0}:u),s.to={height:u.height*c.y,width:u.width*c.x,outerHeight:u.outerHeight*c.y,outerWidth:u.outerWidth*c.x},s.fade&&("show"===o&&(s.from.opacity=0,s.to.opacity=1),"hide"===o&&(s.from.opacity=1,s.to.opacity=0)),n.effect(s)}}),/*!
 * jQuery UI Effects Puff 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/puff-effect/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./effect","./effect-scale"],t):t(jQuery)}(function(t){return t.effects.effect.puff=function(e,i){var n=t(this),s=t.effects.setMode(n,e.mode||"hide"),o="hide"===s,r=parseInt(e.percent,10)||150,a=r/100,l={height:n.height(),width:n.width(),outerHeight:n.outerHeight(),outerWidth:n.outerWidth()};t.extend(e,{effect:"scale",queue:!1,fade:!0,mode:s,complete:i,percent:o?r:100,from:o?l:{height:l.height*a,width:l.width*a,outerHeight:l.outerHeight*a,outerWidth:l.outerWidth*a}}),n.effect(e)}}),/*!
 * jQuery UI Effects Pulsate 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/pulsate-effect/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.pulsate=function(e,i){var n,s=t(this),o=t.effects.setMode(s,e.mode||"show"),r="show"===o,a="hide"===o,l=r||"hide"===o,u=2*(e.times||5)+(l?1:0),c=e.duration/u,h=0,d=s.queue(),p=d.length;for(!r&&s.is(":visible")||(s.css("opacity",0).show(),h=1),n=1;u>n;n++)s.animate({opacity:h},c,e.easing),h=1-h;s.animate({opacity:h},c,e.easing),s.queue(function(){a&&s.hide(),i()}),p>1&&d.splice.apply(d,[1,0].concat(d.splice(p,u+1))),s.dequeue()}}),/*!
 * jQuery UI Effects Shake 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/shake-effect/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.shake=function(e,i){var n,s=t(this),o=["position","top","bottom","left","right","height","width"],r=t.effects.setMode(s,e.mode||"effect"),a=e.direction||"left",l=e.distance||20,u=e.times||3,c=2*u+1,h=Math.round(e.duration/c),d="up"===a||"down"===a?"top":"left",p="up"===a||"left"===a,f={},m={},g={},v=s.queue(),y=v.length;for(t.effects.save(s,o),s.show(),t.effects.createWrapper(s),f[d]=(p?"-=":"+=")+l,m[d]=(p?"+=":"-=")+2*l,g[d]=(p?"-=":"+=")+2*l,s.animate(f,h,e.easing),n=1;u>n;n++)s.animate(m,h,e.easing).animate(g,h,e.easing);s.animate(m,h,e.easing).animate(f,h/2,e.easing).queue(function(){"hide"===r&&s.hide(),t.effects.restore(s,o),t.effects.removeWrapper(s),i()}),y>1&&v.splice.apply(v,[1,0].concat(v.splice(y,c+1))),s.dequeue()}}),/*!
 * jQuery UI Effects Slide 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slide-effect/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.slide=function(e,i){var n,s=t(this),o=["position","top","bottom","left","right","width","height"],r=t.effects.setMode(s,e.mode||"show"),a="show"===r,l=e.direction||"left",u="up"===l||"down"===l?"top":"left",c="up"===l||"left"===l,h={};t.effects.save(s,o),s.show(),n=e.distance||s["top"===u?"outerHeight":"outerWidth"](!0),t.effects.createWrapper(s).css({overflow:"hidden"}),a&&s.css(u,c?isNaN(n)?"-"+n:-n:n),h[u]=(a?c?"+=":"-=":c?"-=":"+=")+n,s.animate(h,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===r&&s.hide(),t.effects.restore(s,o),t.effects.removeWrapper(s),i()}})}}),/*!
 * jQuery UI Effects Transfer 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/transfer-effect/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.transfer=function(e,i){var n=t(this),s=t(e.to),o="fixed"===s.css("position"),r=t("body"),a=o?r.scrollTop():0,l=o?r.scrollLeft():0,u=s.offset(),c={top:u.top-a,left:u.left-l,height:s.innerHeight(),width:s.innerWidth()},h=n.offset(),d=t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({top:h.top-a,left:h.left-l,height:n.innerHeight(),width:n.innerWidth(),position:o?"fixed":"absolute"}).animate(c,e.duration,e.easing,function(){d.remove(),i()})}}),/*!
 * jQuery UI Progressbar 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/progressbar/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget"],t):t(jQuery)}(function(t){return t.widget("ui.progressbar",{version:"1.11.4",options:{max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue(),this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min}),this.valueDiv=t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this._refreshValue()},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove()},value:function(t){return void 0===t?this.options.value:(this.options.value=this._constrainedValue(t),void this._refreshValue())},_constrainedValue:function(t){return void 0===t&&(t=this.options.value),this.indeterminate=t===!1,"number"!=typeof t&&(t=0),this.indeterminate?!1:Math.min(this.options.max,Math.max(this.min,t))},_setOptions:function(t){var e=t.value;delete t.value,this._super(t),this.options.value=this._constrainedValue(e),this._refreshValue()},_setOption:function(t,e){"max"===t&&(e=Math.max(this.min,e)),"disabled"===t&&this.element.toggleClass("ui-state-disabled",!!e).attr("aria-disabled",e),this._super(t,e)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var e=this.options.value,i=this._percentage();this.valueDiv.toggle(this.indeterminate||e>this.min).toggleClass("ui-corner-right",e===this.options.max).width(i.toFixed(0)+"%"),this.element.toggleClass("ui-progressbar-indeterminate",this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=t("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":e}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==e&&(this.oldValue=e,this._trigger("change")),e===this.options.max&&this._trigger("complete")}})}),/*!
 * jQuery UI Selectable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/selectable/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./mouse","./widget"],t):t(jQuery)}(function(t){return t.widget("ui.selectable",t.ui.mouse,{version:"1.11.4",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var e,i=this;this.element.addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){e=t(i.options.filter,i.element[0]),e.addClass("ui-selectee"),e.each(function(){var e=t(this),i=e.offset();t.data(this,"selectable-item",{element:this,$element:e,left:i.left,top:i.top,right:i.left+e.outerWidth(),bottom:i.top+e.outerHeight(),startselected:!1,selected:e.hasClass("ui-selected"),selecting:e.hasClass("ui-selecting"),unselecting:e.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=e.addClass("ui-selectee"),this._mouseInit(),this.helper=t("<div class='ui-selectable-helper'></div>")},_destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled"),this._mouseDestroy()},_mouseStart:function(e){var i=this,n=this.options;this.opos=[e.pageX,e.pageY],this.options.disabled||(this.selectees=t(n.filter,this.element[0]),this._trigger("start",e),t(n.appendTo).append(this.helper),this.helper.css({left:e.pageX,top:e.pageY,width:0,height:0}),n.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var n=t.data(this,"selectable-item");n.startselected=!0,e.metaKey||e.ctrlKey||(n.$element.removeClass("ui-selected"),n.selected=!1,n.$element.addClass("ui-unselecting"),n.unselecting=!0,i._trigger("unselecting",e,{unselecting:n.element}))}),t(e.target).parents().addBack().each(function(){var n,s=t.data(this,"selectable-item");return s?(n=!e.metaKey&&!e.ctrlKey||!s.$element.hasClass("ui-selected"),s.$element.removeClass(n?"ui-unselecting":"ui-selected").addClass(n?"ui-selecting":"ui-unselecting"),s.unselecting=!n,s.selecting=n,s.selected=n,n?i._trigger("selecting",e,{selecting:s.element}):i._trigger("unselecting",e,{unselecting:s.element}),!1):void 0}))},_mouseDrag:function(e){if(this.dragged=!0,!this.options.disabled){var i,n=this,s=this.options,o=this.opos[0],r=this.opos[1],a=e.pageX,l=e.pageY;return o>a&&(i=a,a=o,o=i),r>l&&(i=l,l=r,r=i),this.helper.css({left:o,top:r,width:a-o,height:l-r}),this.selectees.each(function(){var i=t.data(this,"selectable-item"),u=!1;i&&i.element!==n.element[0]&&("touch"===s.tolerance?u=!(i.left>a||i.right<o||i.top>l||i.bottom<r):"fit"===s.tolerance&&(u=i.left>o&&i.right<a&&i.top>r&&i.bottom<l),u?(i.selected&&(i.$element.removeClass("ui-selected"),i.selected=!1),i.unselecting&&(i.$element.removeClass("ui-unselecting"),i.unselecting=!1),i.selecting||(i.$element.addClass("ui-selecting"),i.selecting=!0,n._trigger("selecting",e,{selecting:i.element}))):(i.selecting&&((e.metaKey||e.ctrlKey)&&i.startselected?(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.$element.addClass("ui-selected"),i.selected=!0):(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.startselected&&(i.$element.addClass("ui-unselecting"),i.unselecting=!0),n._trigger("unselecting",e,{unselecting:i.element}))),i.selected&&(e.metaKey||e.ctrlKey||i.startselected||(i.$element.removeClass("ui-selected"),i.selected=!1,i.$element.addClass("ui-unselecting"),i.unselecting=!0,n._trigger("unselecting",e,{unselecting:i.element})))))}),!1}},_mouseStop:function(e){var i=this;return this.dragged=!1,t(".ui-unselecting",this.element[0]).each(function(){var n=t.data(this,"selectable-item");n.$element.removeClass("ui-unselecting"),n.unselecting=!1,n.startselected=!1,i._trigger("unselected",e,{unselected:n.element})}),t(".ui-selecting",this.element[0]).each(function(){var n=t.data(this,"selectable-item");n.$element.removeClass("ui-selecting").addClass("ui-selected"),n.selecting=!1,n.selected=!0,n.startselected=!0,i._trigger("selected",e,{selected:n.element})}),this._trigger("stop",e),this.helper.remove(),!1}})}),/*!
 * jQuery UI Selectmenu 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/selectmenu
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./position","./menu"],t):t(jQuery)}(function(t){return t.widget("ui.selectmenu",{version:"1.11.4",defaultElement:"<select>",options:{appendTo:null,disabled:null,icons:{button:"ui-icon-triangle-1-s"},position:{my:"left top",at:"left bottom",collision:"none"},width:null,change:null,close:null,focus:null,open:null,select:null},_create:function(){var t=this.element.uniqueId().attr("id");this.ids={element:t,button:t+"-button",menu:t+"-menu"},this._drawButton(),this._drawMenu(),this.options.disabled&&this.disable()},_drawButton:function(){var e=this;this.label=t("label[for='"+this.ids.element+"']").attr("for",this.ids.button),this._on(this.label,{click:function(t){this.button.focus(),t.preventDefault()}}),this.element.hide(),this.button=t("<span>",{"class":"ui-selectmenu-button ui-widget ui-state-default ui-corner-all",tabindex:this.options.disabled?-1:0,id:this.ids.button,role:"combobox","aria-expanded":"false","aria-autocomplete":"list","aria-owns":this.ids.menu,"aria-haspopup":"true"}).insertAfter(this.element),t("<span>",{"class":"ui-icon "+this.options.icons.button}).prependTo(this.button),this.buttonText=t("<span>",{"class":"ui-selectmenu-text"}).appendTo(this.button),this._setText(this.buttonText,this.element.find("option:selected").text()),this._resizeButton(),this._on(this.button,this._buttonEvents),this.button.one("focusin",function(){e.menuItems||e._refreshMenu()}),this._hoverable(this.button),this._focusable(this.button)},_drawMenu:function(){var e=this;this.menu=t("<ul>",{"aria-hidden":"true","aria-labelledby":this.ids.button,id:this.ids.menu}),this.menuWrap=t("<div>",{"class":"ui-selectmenu-menu ui-front"}).append(this.menu).appendTo(this._appendTo()),this.menuInstance=this.menu.menu({role:"listbox",select:function(t,i){t.preventDefault(),e._setSelection(),e._select(i.item.data("ui-selectmenu-item"),t)},focus:function(t,i){var n=i.item.data("ui-selectmenu-item");null!=e.focusIndex&&n.index!==e.focusIndex&&(e._trigger("focus",t,{item:n}),e.isOpen||e._select(n,t)),e.focusIndex=n.index,e.button.attr("aria-activedescendant",e.menuItems.eq(n.index).attr("id"))}}).menu("instance"),this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"),this.menuInstance._off(this.menu,"mouseleave"),this.menuInstance._closeOnDocumentClick=function(){return!1},this.menuInstance._isDivider=function(){return!1}},refresh:function(){this._refreshMenu(),this._setText(this.buttonText,this._getSelectedItem().text()),this.options.width||this._resizeButton()},_refreshMenu:function(){this.menu.empty();var t,e=this.element.find("option");e.length&&(this._parseOptions(e),this._renderMenu(this.menu,this.items),this.menuInstance.refresh(),this.menuItems=this.menu.find("li").not(".ui-selectmenu-optgroup"),t=this._getSelectedItem(),this.menuInstance.focus(null,t),this._setAria(t.data("ui-selectmenu-item")),this._setOption("disabled",this.element.prop("disabled")))},open:function(t){this.options.disabled||(this.menuItems?(this.menu.find(".ui-state-focus").removeClass("ui-state-focus"),this.menuInstance.focus(null,this._getSelectedItem())):this._refreshMenu(),this.isOpen=!0,this._toggleAttr(),this._resizeMenu(),this._position(),this._on(this.document,this._documentClick),this._trigger("open",t))},_position:function(){this.menuWrap.position(t.extend({of:this.button},this.options.position))},close:function(t){this.isOpen&&(this.isOpen=!1,this._toggleAttr(),this.range=null,this._off(this.document),this._trigger("close",t))},widget:function(){return this.button},menuWidget:function(){return this.menu},_renderMenu:function(e,i){var n=this,s="";t.each(i,function(i,o){o.optgroup!==s&&(t("<li>",{"class":"ui-selectmenu-optgroup ui-menu-divider"+(o.element.parent("optgroup").prop("disabled")?" ui-state-disabled":""),text:o.optgroup}).appendTo(e),s=o.optgroup),n._renderItemData(e,o)})},_renderItemData:function(t,e){return this._renderItem(t,e).data("ui-selectmenu-item",e)},_renderItem:function(e,i){var n=t("<li>");return i.disabled&&n.addClass("ui-state-disabled"),this._setText(n,i.label),n.appendTo(e)},_setText:function(t,e){e?t.text(e):t.html("&#160;")},_move:function(t,e){var i,n,s=".ui-menu-item";this.isOpen?i=this.menuItems.eq(this.focusIndex):(i=this.menuItems.eq(this.element[0].selectedIndex),s+=":not(.ui-state-disabled)"),n="first"===t||"last"===t?i["first"===t?"prevAll":"nextAll"](s).eq(-1):i[t+"All"](s).eq(0),n.length&&this.menuInstance.focus(e,n)},_getSelectedItem:function(){return this.menuItems.eq(this.element[0].selectedIndex)},_toggle:function(t){this[this.isOpen?"close":"open"](t)},_setSelection:function(){var t;this.range&&(window.getSelection?(t=window.getSelection(),t.removeAllRanges(),t.addRange(this.range)):this.range.select(),this.button.focus())},_documentClick:{mousedown:function(e){this.isOpen&&(t(e.target).closest(".ui-selectmenu-menu, #"+this.ids.button).length||this.close(e))}},_buttonEvents:{mousedown:function(){var t;window.getSelection?(t=window.getSelection(),t.rangeCount&&(this.range=t.getRangeAt(0))):this.range=document.selection.createRange()},click:function(t){this._setSelection(),this._toggle(t)},keydown:function(e){var i=!0;switch(e.keyCode){case t.ui.keyCode.TAB:case t.ui.keyCode.ESCAPE:this.close(e),i=!1;break;case t.ui.keyCode.ENTER:this.isOpen&&this._selectFocusedItem(e);break;case t.ui.keyCode.UP:e.altKey?this._toggle(e):this._move("prev",e);break;case t.ui.keyCode.DOWN:e.altKey?this._toggle(e):this._move("next",e);break;case t.ui.keyCode.SPACE:this.isOpen?this._selectFocusedItem(e):this._toggle(e);break;case t.ui.keyCode.LEFT:this._move("prev",e);break;case t.ui.keyCode.RIGHT:this._move("next",e);break;case t.ui.keyCode.HOME:case t.ui.keyCode.PAGE_UP:this._move("first",e);break;case t.ui.keyCode.END:case t.ui.keyCode.PAGE_DOWN:this._move("last",e);break;default:this.menu.trigger(e),i=!1}i&&e.preventDefault()}},_selectFocusedItem:function(t){var e=this.menuItems.eq(this.focusIndex);e.hasClass("ui-state-disabled")||this._select(e.data("ui-selectmenu-item"),t)},_select:function(t,e){var i=this.element[0].selectedIndex;this.element[0].selectedIndex=t.index,this._setText(this.buttonText,t.label),this._setAria(t),this._trigger("select",e,{item:t}),t.index!==i&&this._trigger("change",e,{item:t}),this.close(e)},_setAria:function(t){var e=this.menuItems.eq(t.index).attr("id");this.button.attr({"aria-labelledby":e,"aria-activedescendant":e}),this.menu.attr("aria-activedescendant",e)},_setOption:function(t,e){"icons"===t&&this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(e.button),this._super(t,e),"appendTo"===t&&this.menuWrap.appendTo(this._appendTo()),"disabled"===t&&(this.menuInstance.option("disabled",e),this.button.toggleClass("ui-state-disabled",e).attr("aria-disabled",e),this.element.prop("disabled",e),e?(this.button.attr("tabindex",-1),this.close()):this.button.attr("tabindex",0)),"width"===t&&this._resizeButton()},_appendTo:function(){var e=this.options.appendTo;return e&&(e=e.jquery||e.nodeType?t(e):this.document.find(e).eq(0)),e&&e[0]||(e=this.element.closest(".ui-front")),e.length||(e=this.document[0].body),e},_toggleAttr:function(){this.button.toggleClass("ui-corner-top",this.isOpen).toggleClass("ui-corner-all",!this.isOpen).attr("aria-expanded",this.isOpen),this.menuWrap.toggleClass("ui-selectmenu-open",this.isOpen),this.menu.attr("aria-hidden",!this.isOpen)},_resizeButton:function(){var t=this.options.width;t||(t=this.element.show().outerWidth(),this.element.hide()),this.button.outerWidth(t)},_resizeMenu:function(){this.menu.outerWidth(Math.max(this.button.outerWidth(),this.menu.width("").outerWidth()+1))},_getCreateOptions:function(){return{disabled:this.element.prop("disabled")}},_parseOptions:function(e){var i=[];e.each(function(e,n){var s=t(n),o=s.parent("optgroup");i.push({element:s,index:e,value:s.val(),label:s.text(),optgroup:o.attr("label")||"",disabled:o.prop("disabled")||s.prop("disabled")})}),this.items=i},_destroy:function(){this.menuWrap.remove(),this.button.remove(),this.element.show(),this.element.removeUniqueId(),this.label.attr("for",this.ids.element)}})}),/*!
 * jQuery UI Slider 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slider/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./mouse","./widget"],t):t(jQuery)}(function(t){return t.widget("ui.slider",t.ui.mouse,{version:"1.11.4",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var e,i,n=this.options,s=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),o="<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",r=[];for(i=n.values&&n.values.length||1,s.length>i&&(s.slice(i).remove(),s=s.slice(0,i)),e=s.length;i>e;e++)r.push(o);this.handles=s.add(t(r.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(e){t(this).data("ui-slider-handle-index",e)})},_createRange:function(){var e=this.options,i="";e.range?(e.range===!0&&(e.values?e.values.length&&2!==e.values.length?e.values=[e.values[0],e.values[0]]:t.isArray(e.values)&&(e.values=e.values.slice(0)):e.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=t("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===e.range||"max"===e.range?" ui-slider-range-"+e.range:""))):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(e){var i,n,s,o,r,a,l,u,c=this,h=this.options;return h.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:e.pageX,y:e.pageY},n=this._normValueFromMouse(i),s=this._valueMax()-this._valueMin()+1,this.handles.each(function(e){var i=Math.abs(n-c.values(e));(s>i||s===i&&(e===c._lastChangedValue||c.values(e)===h.min))&&(s=i,o=t(this),r=e)}),a=this._start(e,r),a===!1?!1:(this._mouseSliding=!0,this._handleIndex=r,o.addClass("ui-state-active").focus(),l=o.offset(),u=!t(e.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=u?{left:0,top:0}:{left:e.pageX-l.left-o.width()/2,top:e.pageY-l.top-o.height()/2-(parseInt(o.css("borderTopWidth"),10)||0)-(parseInt(o.css("borderBottomWidth"),10)||0)+(parseInt(o.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(e,r,n),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(t){var e={x:t.pageX,y:t.pageY},i=this._normValueFromMouse(e);return this._slide(t,this._handleIndex,i),!1},_mouseStop:function(t){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(t,this._handleIndex),this._change(t,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(t){var e,i,n,s,o;return"horizontal"===this.orientation?(e=this.elementSize.width,i=t.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(e=this.elementSize.height,i=t.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),n=i/e,n>1&&(n=1),0>n&&(n=0),"vertical"===this.orientation&&(n=1-n),s=this._valueMax()-this._valueMin(),o=this._valueMin()+n*s,this._trimAlignValue(o)},_start:function(t,e){var i={handle:this.handles[e],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("start",t,i)},_slide:function(t,e,i){var n,s,o;this.options.values&&this.options.values.length?(n=this.values(e?0:1),2===this.options.values.length&&this.options.range===!0&&(0===e&&i>n||1===e&&n>i)&&(i=n),i!==this.values(e)&&(s=this.values(),s[e]=i,o=this._trigger("slide",t,{handle:this.handles[e],value:i,values:s}),n=this.values(e?0:1),o!==!1&&this.values(e,i))):i!==this.value()&&(o=this._trigger("slide",t,{handle:this.handles[e],value:i}),o!==!1&&this.value(i))},_stop:function(t,e){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("stop",t,i)},_change:function(t,e){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._lastChangedValue=e,this._trigger("change",t,i)}},value:function(t){return arguments.length?(this.options.value=this._trimAlignValue(t),this._refreshValue(),void this._change(null,0)):this._value()},values:function(e,i){var n,s,o;if(arguments.length>1)return this.options.values[e]=this._trimAlignValue(i),this._refreshValue(),void this._change(null,e);if(!arguments.length)return this._values();if(!t.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(e):this.value();for(n=this.options.values,s=arguments[0],o=0;o<n.length;o+=1)n[o]=this._trimAlignValue(s[o]),this._change(null,o);this._refreshValue()},_setOption:function(e,i){var n,s=0;switch("range"===e&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),t.isArray(this.options.values)&&(s=this.options.values.length),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!i),this._super(e,i),e){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue(),this.handles.css("horizontal"===i?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),n=0;s>n;n+=1)this._change(null,n);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var t=this.options.value;return t=this._trimAlignValue(t)},_values:function(t){var e,i,n;if(arguments.length)return e=this.options.values[t],e=this._trimAlignValue(e);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),n=0;n<i.length;n+=1)i[n]=this._trimAlignValue(i[n]);return i}return[]},_trimAlignValue:function(t){if(t<=this._valueMin())return this._valueMin();if(t>=this._valueMax())return this._valueMax();var e=this.options.step>0?this.options.step:1,i=(t-this._valueMin())%e,n=t-i;return 2*Math.abs(i)>=e&&(n+=i>0?e:-e),parseFloat(n.toFixed(5))},_calculateNewMax:function(){var t=this.options.max,e=this._valueMin(),i=this.options.step,n=Math.floor(+(t-e).toFixed(this._precision())/i)*i;t=n+e,this.max=parseFloat(t.toFixed(this._precision()))},_precision:function(){var t=this._precisionOf(this.options.step);return null!==this.options.min&&(t=Math.max(t,this._precisionOf(this.options.min))),t},_precisionOf:function(t){var e=t.toString(),i=e.indexOf(".");return-1===i?0:e.length-i-1},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshValue:function(){var e,i,n,s,o,r=this.options.range,a=this.options,l=this,u=this._animateOff?!1:a.animate,c={};this.options.values&&this.options.values.length?this.handles.each(function(n){i=(l.values(n)-l._valueMin())/(l._valueMax()-l._valueMin())*100,c["horizontal"===l.orientation?"left":"bottom"]=i+"%",t(this).stop(1,1)[u?"animate":"css"](c,a.animate),l.options.range===!0&&("horizontal"===l.orientation?(0===n&&l.range.stop(1,1)[u?"animate":"css"]({left:i+"%"},a.animate),1===n&&l.range[u?"animate":"css"]({width:i-e+"%"},{queue:!1,duration:a.animate})):(0===n&&l.range.stop(1,1)[u?"animate":"css"]({bottom:i+"%"},a.animate),1===n&&l.range[u?"animate":"css"]({height:i-e+"%"},{queue:!1,duration:a.animate}))),e=i}):(n=this.value(),s=this._valueMin(),o=this._valueMax(),i=o!==s?(n-s)/(o-s)*100:0,c["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[u?"animate":"css"](c,a.animate),"min"===r&&"horizontal"===this.orientation&&this.range.stop(1,1)[u?"animate":"css"]({width:i+"%"},a.animate),"max"===r&&"horizontal"===this.orientation&&this.range[u?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:a.animate}),"min"===r&&"vertical"===this.orientation&&this.range.stop(1,1)[u?"animate":"css"]({height:i+"%"},a.animate),"max"===r&&"vertical"===this.orientation&&this.range[u?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:a.animate}))},_handleEvents:{keydown:function(e){var i,n,s,o,r=t(e.target).data("ui-slider-handle-index");switch(e.keyCode){case t.ui.keyCode.HOME:case t.ui.keyCode.END:case t.ui.keyCode.PAGE_UP:case t.ui.keyCode.PAGE_DOWN:case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(e.preventDefault(),!this._keySliding&&(this._keySliding=!0,t(e.target).addClass("ui-state-active"),i=this._start(e,r),i===!1))return}switch(o=this.options.step,n=s=this.options.values&&this.options.values.length?this.values(r):this.value(),e.keyCode){case t.ui.keyCode.HOME:s=this._valueMin();break;case t.ui.keyCode.END:s=this._valueMax();break;case t.ui.keyCode.PAGE_UP:s=this._trimAlignValue(n+(this._valueMax()-this._valueMin())/this.numPages);break;case t.ui.keyCode.PAGE_DOWN:s=this._trimAlignValue(n-(this._valueMax()-this._valueMin())/this.numPages);break;case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:if(n===this._valueMax())return;s=this._trimAlignValue(n+o);break;case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(n===this._valueMin())return;s=this._trimAlignValue(n-o)}this._slide(e,r,s)},keyup:function(e){var i=t(e.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(e,i),this._change(e,i),t(e.target).removeClass("ui-state-active"))}}})}),/*!
 * jQuery UI Sortable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/sortable/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./mouse","./widget"],t):t(jQuery)}(function(t){return t.widget("ui.sortable",t.ui.mouse,{version:"1.11.4",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(t,e,i){return t>=e&&e+i>t},_isFloating:function(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))},_create:function(){this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(t,e){this._super(t,e),"handle"===t&&this._setHandleClassName()},_setHandleClassName:function(){this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"),t.each(this.items,function(){(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item).addClass("ui-sortable-handle")})},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"),this._mouseDestroy();for(var t=this.items.length-1;t>=0;t--)this.items[t].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(e,i){var n=null,s=!1,o=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(e),t(e.target).parents().each(function(){return t.data(this,o.widgetName+"-item")===o?(n=t(this),!1):void 0}),t.data(e.target,o.widgetName+"-item")===o&&(n=t(e.target)),n&&(!this.options.handle||i||(t(this.options.handle,n).find("*").addBack().each(function(){this===e.target&&(s=!0)}),s))?(this.currentItem=n,this._removeCurrentsFromItems(),!0):!1)},_mouseStart:function(e,i,n){var s,o,r=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(e),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,r.cursorAt&&this._adjustOffsetFromHelper(r.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),r.containment&&this._setContainment(),r.cursor&&"auto"!==r.cursor&&(o=this.document.find("body"),this.storedCursor=o.css("cursor"),o.css("cursor",r.cursor),this.storedStylesheet=t("<style>*{ cursor: "+r.cursor+" !important; }</style>").appendTo(o)),r.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",r.opacity)),r.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",r.zIndex)),this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",e,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!n)for(s=this.containers.length-1;s>=0;s--)this.containers[s]._trigger("activate",e,this._uiHash(this));return t.ui.ddmanager&&(t.ui.ddmanager.current=this),t.ui.ddmanager&&!r.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(e),!0},_mouseDrag:function(e){var i,n,s,o,r=this.options,a=!1;for(this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-e.pageY<r.scrollSensitivity?this.scrollParent[0].scrollTop=a=this.scrollParent[0].scrollTop+r.scrollSpeed:e.pageY-this.overflowOffset.top<r.scrollSensitivity&&(this.scrollParent[0].scrollTop=a=this.scrollParent[0].scrollTop-r.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-e.pageX<r.scrollSensitivity?this.scrollParent[0].scrollLeft=a=this.scrollParent[0].scrollLeft+r.scrollSpeed:e.pageX-this.overflowOffset.left<r.scrollSensitivity&&(this.scrollParent[0].scrollLeft=a=this.scrollParent[0].scrollLeft-r.scrollSpeed)):(e.pageY-this.document.scrollTop()<r.scrollSensitivity?a=this.document.scrollTop(this.document.scrollTop()-r.scrollSpeed):this.window.height()-(e.pageY-this.document.scrollTop())<r.scrollSensitivity&&(a=this.document.scrollTop(this.document.scrollTop()+r.scrollSpeed)),e.pageX-this.document.scrollLeft()<r.scrollSensitivity?a=this.document.scrollLeft(this.document.scrollLeft()-r.scrollSpeed):this.window.width()-(e.pageX-this.document.scrollLeft())<r.scrollSensitivity&&(a=this.document.scrollLeft(this.document.scrollLeft()+r.scrollSpeed))),a!==!1&&t.ui.ddmanager&&!r.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(n=this.items[i],s=n.item[0],o=this._intersectsWithPointer(n),o&&n.instance===this.currentContainer&&s!==this.currentItem[0]&&this.placeholder[1===o?"next":"prev"]()[0]!==s&&!t.contains(this.placeholder[0],s)&&("semi-dynamic"===this.options.type?!t.contains(this.element[0],s):!0)){if(this.direction=1===o?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(n))break;this._rearrange(e,n),this._trigger("change",e,this._uiHash());break}return this._contactContainers(e),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),this._trigger("sort",e,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(e,i){if(e){if(t.ui.ddmanager&&!this.options.dropBehaviour&&t.ui.ddmanager.drop(this,e),this.options.revert){var n=this,s=this.placeholder.offset(),o=this.options.axis,r={};o&&"x"!==o||(r.left=s.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)),o&&"y"!==o||(r.top=s.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,t(this.helper).animate(r,parseInt(this.options.revert,10)||500,function(){n._clear(e)})}else this._clear(e,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("deactivate",null,this._uiHash(this)),this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",null,this._uiHash(this)),this.containers[e].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),t.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?t(this.domPosition.prev).after(this.currentItem):t(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(e){var i=this._getItemsAsjQuery(e&&e.connected),n=[];return e=e||{},t(i).each(function(){var i=(t(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[\-=_](.+)/);i&&n.push((e.key||i[1]+"[]")+"="+(e.key&&e.expression?i[1]:i[2]))}),!n.length&&e.key&&n.push(e.key+"="),n.join("&")},toArray:function(e){var i=this._getItemsAsjQuery(e&&e.connected),n=[];return e=e||{},i.each(function(){n.push(t(e.item||this).attr(e.attribute||"id")||"")}),n},_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,n=this.positionAbs.top,s=n+this.helperProportions.height,o=t.left,r=o+t.width,a=t.top,l=a+t.height,u=this.offset.click.top,c=this.offset.click.left,h="x"===this.options.axis||n+u>a&&l>n+u,d="y"===this.options.axis||e+c>o&&r>e+c,p=h&&d;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?p:o<e+this.helperProportions.width/2&&i-this.helperProportions.width/2<r&&a<n+this.helperProportions.height/2&&s-this.helperProportions.height/2<l},_intersectsWithPointer:function(t){var e="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top,t.height),i="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left,t.width),n=e&&i,s=this._getDragVerticalDirection(),o=this._getDragHorizontalDirection();return n?this.floating?o&&"right"===o||"down"===s?2:1:s&&("down"===s?2:1):!1},_intersectsWithSides:function(t){var e=this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),n=this._getDragVerticalDirection(),s=this._getDragHorizontalDirection();return this.floating&&s?"right"===s&&i||"left"===s&&!i:n&&("down"===n&&e||"up"===n&&!e)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!==t&&(t>0?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!==t&&(t>0?"right":"left")},refresh:function(t){return this._refreshItems(t),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(e){function i(){a.push(this)}var n,s,o,r,a=[],l=[],u=this._connectWith();if(u&&e)for(n=u.length-1;n>=0;n--)for(o=t(u[n],this.document[0]),s=o.length-1;s>=0;s--)r=t.data(o[s],this.widgetFullName),r&&r!==this&&!r.options.disabled&&l.push([t.isFunction(r.options.items)?r.options.items.call(r.element):t(r.options.items,r.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),r]);for(l.push([t.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):t(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),n=l.length-1;n>=0;n--)l[n][0].each(i);return t(a)},_removeCurrentsFromItems:function(){var e=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=t.grep(this.items,function(t){for(var i=0;i<e.length;i++)if(e[i]===t.item[0])return!1;return!0})},_refreshItems:function(e){this.items=[],this.containers=[this];var i,n,s,o,r,a,l,u,c=this.items,h=[[t.isFunction(this.options.items)?this.options.items.call(this.element[0],e,{item:this.currentItem}):t(this.options.items,this.element),this]],d=this._connectWith();if(d&&this.ready)for(i=d.length-1;i>=0;i--)for(s=t(d[i],this.document[0]),n=s.length-1;n>=0;n--)o=t.data(s[n],this.widgetFullName),o&&o!==this&&!o.options.disabled&&(h.push([t.isFunction(o.options.items)?o.options.items.call(o.element[0],e,{item:this.currentItem}):t(o.options.items,o.element),o]),this.containers.push(o));for(i=h.length-1;i>=0;i--)for(r=h[i][1],a=h[i][0],n=0,u=a.length;u>n;n++)l=t(a[n]),l.data(this.widgetName+"-item",r),c.push({item:l,instance:r,width:0,height:0,left:0,top:0})},refreshPositions:function(e){this.floating=this.items.length?"x"===this.options.axis||this._isFloating(this.items[0].item):!1,this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,n,s,o;for(i=this.items.length-1;i>=0;i--)n=this.items[i],n.instance!==this.currentContainer&&this.currentContainer&&n.item[0]!==this.currentItem[0]||(s=this.options.toleranceElement?t(this.options.toleranceElement,n.item):n.item,e||(n.width=s.outerWidth(),n.height=s.outerHeight()),o=s.offset(),n.left=o.left,n.top=o.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)o=this.containers[i].element.offset(),this.containers[i].containerCache.left=o.left,this.containers[i].containerCache.top=o.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(e){e=e||this;var i,n=e.options;n.placeholder&&n.placeholder.constructor!==String||(i=n.placeholder,n.placeholder={element:function(){var n=e.currentItem[0].nodeName.toLowerCase(),s=t("<"+n+">",e.document[0]).addClass(i||e.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tbody"===n?e._createTrPlaceholder(e.currentItem.find("tr").eq(0),t("<tr>",e.document[0]).appendTo(s)):"tr"===n?e._createTrPlaceholder(e.currentItem,s):"img"===n&&s.attr("src",e.currentItem.attr("src")),i||s.css("visibility","hidden"),s},update:function(t,s){i&&!n.forcePlaceholderSize||(s.height()||s.height(e.currentItem.innerHeight()-parseInt(e.currentItem.css("paddingTop")||0,10)-parseInt(e.currentItem.css("paddingBottom")||0,10)),s.width()||s.width(e.currentItem.innerWidth()-parseInt(e.currentItem.css("paddingLeft")||0,10)-parseInt(e.currentItem.css("paddingRight")||0,10)))}}),e.placeholder=t(n.placeholder.element.call(e.element,e.currentItem)),e.currentItem.after(e.placeholder),n.placeholder.update(e,e.placeholder)},_createTrPlaceholder:function(e,i){var n=this;e.children().each(function(){t("<td>&#160;</td>",n.document[0]).attr("colspan",t(this).attr("colspan")||1).appendTo(i)})},_contactContainers:function(e){var i,n,s,o,r,a,l,u,c,h,d=null,p=null;for(i=this.containers.length-1;i>=0;i--)if(!t.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(d&&t.contains(this.containers[i].element[0],d.element[0]))continue;d=this.containers[i],p=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",e,this._uiHash(this)),this.containers[i].containerCache.over=0);if(d)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",e,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(s=1e4,o=null,c=d.floating||this._isFloating(this.currentItem),r=c?"left":"top",a=c?"width":"height",h=c?"clientX":"clientY",n=this.items.length-1;n>=0;n--)t.contains(this.containers[p].element[0],this.items[n].item[0])&&this.items[n].item[0]!==this.currentItem[0]&&(l=this.items[n].item.offset()[r],u=!1,e[h]-l>this.items[n][a]/2&&(u=!0),Math.abs(e[h]-l)<s&&(s=Math.abs(e[h]-l),o=this.items[n],this.direction=u?"up":"down"));if(!o&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return void(this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",e,this._uiHash()),this.currentContainer.containerCache.over=1));o?this._rearrange(e,o,null,!0):this._rearrange(e,null,this.containers[p].element,!0),this._trigger("change",e,this._uiHash()),this.containers[p]._trigger("change",e,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",e,this._uiHash(this)),this.containers[p].containerCache.over=1}},_createHelper:function(e){var i=this.options,n=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return n.parents("body").length||t("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(n[0]),n[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),n[0].style.width&&!i.forceHelperSize||n.width(this.currentItem.width()),n[0].style.height&&!i.forceHelperSize||n.height(this.currentItem.height()),n},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,n,s=this.options;"parent"===s.containment&&(s.containment=this.helper[0].parentNode),"document"!==s.containment&&"window"!==s.containment||(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===s.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===s.containment?this.document.width():this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(s.containment)||(e=t(s.containment)[0],i=t(s.containment).offset(),n="hidden"!==t(e).css("overflow"),this.containment=[i.left+(parseInt(t(e).css("borderLeftWidth"),10)||0)+(parseInt(t(e).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(t(e).css("borderTopWidth"),10)||0)+(parseInt(t(e).css("paddingTop"),10)||0)-this.margins.top,i.left+(n?Math.max(e.scrollWidth,e.offsetWidth):e.offsetWidth)-(parseInt(t(e).css("borderLeftWidth"),10)||0)-(parseInt(t(e).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(n?Math.max(e.scrollHeight,e.offsetHeight):e.offsetHeight)-(parseInt(t(e).css("borderTopWidth"),10)||0)-(parseInt(t(e).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(e,i){i||(i=this.position);var n="absolute"===e?1:-1,s="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(s[0].tagName);return{top:i.top+this.offset.relative.top*n+this.offset.parent.top*n-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():o?0:s.scrollTop())*n,left:i.left+this.offset.relative.left*n+this.offset.parent.left*n-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():o?0:s.scrollLeft())*n}},_generatePosition:function(e){var i,n,s=this.options,o=e.pageX,r=e.pageY,a="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,l=/(html|body)/i.test(a[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(e.pageX-this.offset.click.left<this.containment[0]&&(o=this.containment[0]+this.offset.click.left),e.pageY-this.offset.click.top<this.containment[1]&&(r=this.containment[1]+this.offset.click.top),e.pageX-this.offset.click.left>this.containment[2]&&(o=this.containment[2]+this.offset.click.left),e.pageY-this.offset.click.top>this.containment[3]&&(r=this.containment[3]+this.offset.click.top)),s.grid&&(i=this.originalPageY+Math.round((r-this.originalPageY)/s.grid[1])*s.grid[1],r=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-s.grid[1]:i+s.grid[1]:i,n=this.originalPageX+Math.round((o-this.originalPageX)/s.grid[0])*s.grid[0],o=this.containment?n-this.offset.click.left>=this.containment[0]&&n-this.offset.click.left<=this.containment[2]?n:n-this.offset.click.left>=this.containment[0]?n-s.grid[0]:n+s.grid[0]:n)),{top:r-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():l?0:a.scrollTop()),left:o-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():l?0:a.scrollLeft())}},_rearrange:function(t,e,i,n){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var s=this.counter;this._delay(function(){s===this.counter&&this.refreshPositions(!n)})},_clear:function(t,e){function i(t,e,i){return function(n){i._trigger(t,n,e._uiHash(e))}}this.reverting=!1;var n,s=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(n in this._storedCSS)"auto"!==this._storedCSS[n]&&"static"!==this._storedCSS[n]||(this._storedCSS[n]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!e&&s.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||s.push(function(t){this._trigger("update",t,this._uiHash())}),this!==this.currentContainer&&(e||(s.push(function(t){this._trigger("remove",t,this._uiHash())}),s.push(function(t){return function(e){t._trigger("receive",e,this._uiHash(this))}}.call(this,this.currentContainer)),s.push(function(t){return function(e){t._trigger("update",e,this._uiHash(this))}}.call(this,this.currentContainer)))),n=this.containers.length-1;n>=0;n--)e||s.push(i("deactivate",this,this.containers[n])),this.containers[n].containerCache.over&&(s.push(i("out",this,this.containers[n])),this.containers[n].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,e||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!e){for(n=0;n<s.length;n++)s[n].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){t.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(e){var i=e||this;return{helper:i.helper,placeholder:i.placeholder||t([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:e?e.element:null}}})}),/*!
 * jQuery UI Spinner 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/spinner/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./button"],t):t(jQuery)}(function(t){function e(t){return function(){var e=this.element.val();t.apply(this,arguments),this._refresh(),e!==this.element.val()&&this._trigger("change")}}return t.widget("ui.spinner",{version:"1.11.4",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),""!==this.value()&&this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var e={},i=this.element;return t.each(["min","max","step"],function(t,n){var s=i.attr(n);void 0!==s&&s.length&&(e[n]=s)}),e},_events:{keydown:function(t){this._start(t)&&this._keydown(t)&&t.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(t){return this.cancelBlur?void delete this.cancelBlur:(this._stop(),this._refresh(),void(this.previous!==this.element.val()&&this._trigger("change",t)))},mousewheel:function(t,e){if(e){if(!this.spinning&&!this._start(t))return!1;this._spin((e>0?1:-1)*this.options.step,t),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(t)},100),t.preventDefault()}},"mousedown .ui-spinner-button":function(e){function i(){var t=this.element[0]===this.document[0].activeElement;t||(this.element.focus(),this.previous=n,this._delay(function(){this.previous=n}))}var n;n=this.element[0]===this.document[0].activeElement?this.previous:this.element.val(),e.preventDefault(),i.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this)}),this._start(e)!==!1&&this._repeat(null,t(e.currentTarget).hasClass("ui-spinner-up")?1:-1,e)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(e){return t(e.currentTarget).hasClass("ui-state-active")?this._start(e)===!1?!1:void this._repeat(null,t(e.currentTarget).hasClass("ui-spinner-up")?1:-1,e):void 0},"mouseleave .ui-spinner-button":"_stop"},_draw:function(){var t=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton"),this.buttons=t.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"),this.buttons.height()>Math.ceil(.5*t.height())&&t.height()>0&&t.height(t.height()),this.options.disabled&&this.disable()},_keydown:function(e){var i=this.options,n=t.ui.keyCode;switch(e.keyCode){case n.UP:return this._repeat(null,1,e),!0;case n.DOWN:return this._repeat(null,-1,e),!0;case n.PAGE_UP:return this._repeat(null,i.page,e),!0;case n.PAGE_DOWN:return this._repeat(null,-i.page,e),!0}return!1},_uiSpinnerHtml:function(){return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"},_buttonHtml:function(){return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon "+this.options.icons.down+"'>&#9660;</span></a>"},_start:function(t){return this.spinning||this._trigger("start",t)!==!1?(this.counter||(this.counter=1),this.spinning=!0,!0):!1},_repeat:function(t,e,i){t=t||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,e,i)},t),this._spin(e*this.options.step,i)},_spin:function(t,e){var i=this.value()||0;this.counter||(this.counter=1),i=this._adjustValue(i+t*this._increment(this.counter)),this.spinning&&this._trigger("spin",e,{value:i})===!1||(this._value(i),this.counter++)},_increment:function(e){var i=this.options.incremental;return i?t.isFunction(i)?i(e):Math.floor(e*e*e/5e4-e*e/500+17*e/200+1):1},_precision:function(){var t=this._precisionOf(this.options.step);return null!==this.options.min&&(t=Math.max(t,this._precisionOf(this.options.min))),t},_precisionOf:function(t){var e=t.toString(),i=e.indexOf(".");return-1===i?0:e.length-i-1},_adjustValue:function(t){var e,i,n=this.options;return e=null!==n.min?n.min:0,i=t-e,i=Math.round(i/n.step)*n.step,t=e+i,t=parseFloat(t.toFixed(this._precision())),null!==n.max&&t>n.max?n.max:null!==n.min&&t<n.min?n.min:t},_stop:function(t){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",t))},_setOption:function(t,e){if("culture"===t||"numberFormat"===t){var i=this._parse(this.element.val());return this.options[t]=e,void this.element.val(this._format(i))}"max"!==t&&"min"!==t&&"step"!==t||"string"==typeof e&&(e=this._parse(e)),"icons"===t&&(this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(e.up),this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(e.down)),this._super(t,e),"disabled"===t&&(this.widget().toggleClass("ui-state-disabled",!!e),this.element.prop("disabled",!!e),this.buttons.button(e?"disable":"enable"))},_setOptions:e(function(t){this._super(t)}),_parse:function(t){return"string"==typeof t&&""!==t&&(t=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(t,10,this.options.culture):+t),""===t||isNaN(t)?null:t},_format:function(t){return""===t?"":window.Globalize&&this.options.numberFormat?Globalize.format(t,this.options.numberFormat,this.options.culture):t},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},isValid:function(){var t=this.value();return null===t?!1:t===this._adjustValue(t)},_value:function(t,e){var i;""!==t&&(i=this._parse(t),null!==i&&(e||(i=this._adjustValue(i)),t=this._format(i))),this.element.val(t),this._refresh()},_destroy:function(){this.element.removeClass("ui-spinner-input").prop("disabled",!1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:e(function(t){this._stepUp(t)}),_stepUp:function(t){this._start()&&(this._spin((t||1)*this.options.step),this._stop())},stepDown:e(function(t){this._stepDown(t)}),_stepDown:function(t){this._start()&&(this._spin((t||1)*-this.options.step),this._stop())},pageUp:e(function(t){this._stepUp((t||1)*this.options.page)}),pageDown:e(function(t){this._stepDown((t||1)*this.options.page)}),value:function(t){return arguments.length?void e(this._value).call(this,t):this._parse(this.element.val())},widget:function(){return this.uiSpinner}})}),/*!
 * jQuery UI Tabs 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/tabs/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget"],t):t(jQuery)}(function(t){return t.widget("ui.tabs",{version:"1.11.4",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){var t=/#.*$/;return function(e){var i,n;e=e.cloneNode(!1),i=e.href.replace(t,""),n=location.href.replace(t,"");try{i=decodeURIComponent(i)}catch(s){}try{n=decodeURIComponent(n)}catch(s){}return e.hash.length>1&&i===n}}(),_create:function(){var e=this,i=this.options;this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",i.collapsible),this._processTabs(),i.active=this._initialActive(),t.isArray(i.disabled)&&(i.disabled=t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"),function(t){return e.tabs.index(t)}))).sort()),this.options.active!==!1&&this.anchors.length?this.active=this._findActive(i.active):this.active=t(),this._refresh(),this.active.length&&this.load(i.active)},_initialActive:function(){var e=this.options.active,i=this.options.collapsible,n=location.hash.substring(1);return null===e&&(n&&this.tabs.each(function(i,s){return t(s).attr("aria-controls")===n?(e=i,!1):void 0}),null===e&&(e=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),null!==e&&-1!==e||(e=this.tabs.length?0:!1)),e!==!1&&(e=this.tabs.index(this.tabs.eq(e)),-1===e&&(e=i?!1:0)),!i&&e===!1&&this.anchors.length&&(e=0),e},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):t()}},_tabKeydown:function(e){var i=t(this.document[0].activeElement).closest("li"),n=this.tabs.index(i),s=!0;if(!this._handlePageNav(e)){switch(e.keyCode){case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:n++;break;case t.ui.keyCode.UP:case t.ui.keyCode.LEFT:s=!1,n--;break;case t.ui.keyCode.END:n=this.anchors.length-1;break;case t.ui.keyCode.HOME:n=0;break;case t.ui.keyCode.SPACE:return e.preventDefault(),clearTimeout(this.activating),void this._activate(n);case t.ui.keyCode.ENTER:return e.preventDefault(),clearTimeout(this.activating),void this._activate(n===this.options.active?!1:n);default:return}e.preventDefault(),clearTimeout(this.activating),n=this._focusNextTab(n,s),e.ctrlKey||e.metaKey||(i.attr("aria-selected","false"),this.tabs.eq(n).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",n)},this.delay))}},_panelKeydown:function(e){this._handlePageNav(e)||e.ctrlKey&&e.keyCode===t.ui.keyCode.UP&&(e.preventDefault(),this.active.focus())},_handlePageNav:function(e){return e.altKey&&e.keyCode===t.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):e.altKey&&e.keyCode===t.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(e,i){function n(){return e>s&&(e=0),0>e&&(e=s),e}for(var s=this.tabs.length-1;-1!==t.inArray(n(),this.options.disabled);)e=i?e+1:e-1;return e},_focusNextTab:function(t,e){return t=this._findNextTab(t,e),this.tabs.eq(t).focus(),t},_setOption:function(t,e){return"active"===t?void this._activate(e):"disabled"===t?void this._setupDisabled(e):(this._super(t,e),"collapsible"===t&&(this.element.toggleClass("ui-tabs-collapsible",e),e||this.options.active!==!1||this._activate(0)),"event"===t&&this._setupEvents(e),void("heightStyle"===t&&this._setupHeightStyle(e)))},_sanitizeSelector:function(t){return t?t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var e=this.options,i=this.tablist.children(":has(a[href])");e.disabled=t.map(i.filter(".ui-state-disabled"),function(t){return i.index(t)}),this._processTabs(),e.active!==!1&&this.anchors.length?this.active.length&&!t.contains(this.tablist[0],this.active[0])?this.tabs.length===e.disabled.length?(e.active=!1,this.active=t()):this._activate(this._findNextTab(Math.max(0,e.active-1),!1)):e.active=this.tabs.index(this.active):(e.active=!1,this.active=t()),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var e=this,i=this.tabs,n=this.anchors,s=this.panels;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist").delegate("> li","mousedown"+this.eventNamespace,function(e){t(this).is(".ui-state-disabled")&&e.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){t(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return t("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=t(),this.anchors.each(function(i,n){var s,o,r,a=t(n).uniqueId().attr("id"),l=t(n).closest("li"),u=l.attr("aria-controls");e._isLocal(n)?(s=n.hash,r=s.substring(1),o=e.element.find(e._sanitizeSelector(s))):(r=l.attr("aria-controls")||t({}).uniqueId()[0].id,s="#"+r,o=e.element.find(s),o.length||(o=e._createPanel(r),o.insertAfter(e.panels[i-1]||e.tablist)),o.attr("aria-live","polite")),o.length&&(e.panels=e.panels.add(o)),u&&l.data("ui-tabs-aria-controls",u),l.attr({"aria-controls":r,"aria-labelledby":a}),o.attr("aria-labelledby",a)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel"),i&&(this._off(i.not(this.tabs)),this._off(n.not(this.anchors)),this._off(s.not(this.panels)))},_getList:function(){return this.tablist||this.element.find("ol,ul").eq(0)},_createPanel:function(e){return t("<div>").attr("id",e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(e){t.isArray(e)&&(e.length?e.length===this.anchors.length&&(e=!0):e=!1);for(var i,n=0;i=this.tabs[n];n++)e===!0||-1!==t.inArray(n,e)?t(i).addClass("ui-state-disabled").attr("aria-disabled","true"):t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=e},_setupEvents:function(e){var i={};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function(t){t.preventDefault()}}),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(e){var i,n=this.element.parent();"fill"===e?(i=n.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var e=t(this),n=e.css("position");"absolute"!==n&&"fixed"!==n&&(i-=e.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=t(this).outerHeight(!0)}),this.panels.each(function(){t(this).height(Math.max(0,i-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===e&&(i=0,this.panels.each(function(){i=Math.max(i,t(this).height("").height())}).height(i))},_eventHandler:function(e){var i=this.options,n=this.active,s=t(e.currentTarget),o=s.closest("li"),r=o[0]===n[0],a=r&&i.collapsible,l=a?t():this._getPanelForTab(o),u=n.length?this._getPanelForTab(n):t(),c={oldTab:n,oldPanel:u,newTab:a?t():o,newPanel:l};e.preventDefault(),o.hasClass("ui-state-disabled")||o.hasClass("ui-tabs-loading")||this.running||r&&!i.collapsible||this._trigger("beforeActivate",e,c)===!1||(i.active=a?!1:this.tabs.index(o),this.active=r?t():o,this.xhr&&this.xhr.abort(),u.length||l.length||t.error("jQuery UI Tabs: Mismatching fragment identifier."),l.length&&this.load(this.tabs.index(o),e),this._toggle(e,c))},_toggle:function(e,i){function n(){o.running=!1,o._trigger("activate",e,i)}function s(){i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),r.length&&o.options.show?o._show(r,o.options.show,n):(r.show(),n())}var o=this,r=i.newPanel,a=i.oldPanel;this.running=!0,a.length&&this.options.hide?this._hide(a,this.options.hide,function(){i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),s()}):(i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),a.hide(),s()),a.attr("aria-hidden","true"),i.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),r.length&&a.length?i.oldTab.attr("tabIndex",-1):r.length&&this.tabs.filter(function(){return 0===t(this).attr("tabIndex")}).attr("tabIndex",-1),r.attr("aria-hidden","false"),i.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(e){var i,n=this._findActive(e);n[0]!==this.active[0]&&(n.length||(n=this.active),i=n.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return e===!1?t():this.tabs.eq(e)},_getIndex:function(t){return"string"==typeof t&&(t=this.anchors.index(this.anchors.filter("[href$='"+t+"']"))),t},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),this.tablist.unbind(this.eventNamespace),this.tabs.add(this.panels).each(function(){t.data(this,"ui-tabs-destroy")?t(this).remove():t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var e=t(this),i=e.data("ui-tabs-aria-controls");i?e.attr("aria-controls",i).removeData("ui-tabs-aria-controls"):e.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(e){var i=this.options.disabled;i!==!1&&(void 0===e?i=!1:(e=this._getIndex(e),i=t.isArray(i)?t.map(i,function(t){return t!==e?t:null}):t.map(this.tabs,function(t,i){return i!==e?i:null})),this._setupDisabled(i))},disable:function(e){var i=this.options.disabled;if(i!==!0){if(void 0===e)i=!0;else{if(e=this._getIndex(e),-1!==t.inArray(e,i))return;i=t.isArray(i)?t.merge([e],i).sort():[e]}this._setupDisabled(i)}},load:function(e,i){e=this._getIndex(e);var n=this,s=this.tabs.eq(e),o=s.find(".ui-tabs-anchor"),r=this._getPanelForTab(s),a={tab:s,panel:r},l=function(t,e){"abort"===e&&n.panels.stop(!1,!0),s.removeClass("ui-tabs-loading"),r.removeAttr("aria-busy"),t===n.xhr&&delete n.xhr};this._isLocal(o[0])||(this.xhr=t.ajax(this._ajaxSettings(o,i,a)),this.xhr&&"canceled"!==this.xhr.statusText&&(s.addClass("ui-tabs-loading"),r.attr("aria-busy","true"),this.xhr.done(function(t,e,s){setTimeout(function(){r.html(t),n._trigger("load",i,a),l(s,e)},1)}).fail(function(t,e){setTimeout(function(){l(t,e)},1)})))},_ajaxSettings:function(e,i,n){var s=this;return{url:e.attr("href"),beforeSend:function(e,o){return s._trigger("beforeLoad",i,t.extend({jqXHR:e,ajaxSettings:o},n))}}},_getPanelForTab:function(e){var i=t(e).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i))}})}),/*!
 * jQuery UI Tooltip 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/tooltip/
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./position"],t):t(jQuery)}(function(t){return t.widget("ui.tooltip",{version:"1.11.4",options:{content:function(){var e=t(this).attr("title")||"";return t("<a>").text(e).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_addDescribedBy:function(e,i){var n=(e.attr("aria-describedby")||"").split(/\s+/);n.push(i),e.data("ui-tooltip-id",i).attr("aria-describedby",t.trim(n.join(" ")))},_removeDescribedBy:function(e){var i=e.data("ui-tooltip-id"),n=(e.attr("aria-describedby")||"").split(/\s+/),s=t.inArray(i,n);-1!==s&&n.splice(s,1),e.removeData("ui-tooltip-id"),n=t.trim(n.join(" ")),n?e.attr("aria-describedby",n):e.removeAttr("aria-describedby")},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable(),this.liveRegion=t("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)},_setOption:function(e,i){var n=this;return"disabled"===e?(this[i?"_disable":"_enable"](),void(this.options[e]=i)):(this._super(e,i),void("content"===e&&t.each(this.tooltips,function(t,e){n._updateContent(e.element)})))},_disable:function(){var e=this;t.each(this.tooltips,function(i,n){var s=t.Event("blur");s.target=s.currentTarget=n.element[0],e.close(s,!0)}),this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.is("[title]")&&e.data("ui-tooltip-title",e.attr("title")).removeAttr("title")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.data("ui-tooltip-title")&&e.attr("title",e.data("ui-tooltip-title"))})},open:function(e){var i=this,n=t(e?e.target:this.element).closest(this.options.items);n.length&&!n.data("ui-tooltip-id")&&(n.attr("title")&&n.data("ui-tooltip-title",n.attr("title")),n.data("ui-tooltip-open",!0),e&&"mouseover"===e.type&&n.parents().each(function(){var e,n=t(this);n.data("ui-tooltip-open")&&(e=t.Event("blur"),e.target=e.currentTarget=this,i.close(e,!0)),n.attr("title")&&(n.uniqueId(),i.parents[this.id]={element:this,title:n.attr("title")},n.attr("title",""))}),this._registerCloseHandlers(e,n),this._updateContent(n,e))},_updateContent:function(t,e){var i,n=this.options.content,s=this,o=e?e.type:null;return"string"==typeof n?this._open(e,t,n):(i=n.call(t[0],function(i){s._delay(function(){t.data("ui-tooltip-open")&&(e&&(e.type=o),this._open(e,t,i))})}),void(i&&this._open(e,t,i)))},_open:function(e,i,n){function s(t){u.of=t,r.is(":hidden")||r.position(u)}var o,r,a,l,u=t.extend({},this.options.position);if(n){if(o=this._find(i))return void o.tooltip.find(".ui-tooltip-content").html(n);i.is("[title]")&&(e&&"mouseover"===e.type?i.attr("title",""):i.removeAttr("title")),o=this._tooltip(i),r=o.tooltip,this._addDescribedBy(i,r.attr("id")),r.find(".ui-tooltip-content").html(n),this.liveRegion.children().hide(),n.clone?(l=n.clone(),l.removeAttr("id").find("[id]").removeAttr("id")):l=n,t("<div>").html(l).appendTo(this.liveRegion),this.options.track&&e&&/^mouse/.test(e.type)?(this._on(this.document,{mousemove:s}),s(e)):r.position(t.extend({of:i},this.options.position)),r.hide(),this._show(r,this.options.show),this.options.show&&this.options.show.delay&&(a=this.delayedShow=setInterval(function(){r.is(":visible")&&(s(u.of),clearInterval(a))},t.fx.interval)),this._trigger("open",e,{tooltip:r})}},_registerCloseHandlers:function(e,i){var n={keyup:function(e){if(e.keyCode===t.ui.keyCode.ESCAPE){var n=t.Event(e);n.currentTarget=i[0],this.close(n,!0)}}};i[0]!==this.element[0]&&(n.remove=function(){this._removeTooltip(this._find(i).tooltip)}),e&&"mouseover"!==e.type||(n.mouseleave="close"),e&&"focusin"!==e.type||(n.focusout="close"),this._on(!0,i,n)},close:function(e){var i,n=this,s=t(e?e.currentTarget:this.element),o=this._find(s);return o?(i=o.tooltip,void(o.closing||(clearInterval(this.delayedShow),s.data("ui-tooltip-title")&&!s.attr("title")&&s.attr("title",s.data("ui-tooltip-title")),this._removeDescribedBy(s),o.hiding=!0,i.stop(!0),this._hide(i,this.options.hide,function(){n._removeTooltip(t(this))}),s.removeData("ui-tooltip-open"),this._off(s,"mouseleave focusout keyup"),s[0]!==this.element[0]&&this._off(s,"remove"),this._off(this.document,"mousemove"),e&&"mouseleave"===e.type&&t.each(this.parents,function(e,i){t(i.element).attr("title",i.title),delete n.parents[e]}),o.closing=!0,this._trigger("close",e,{tooltip:i}),o.hiding||(o.closing=!1)))):void s.removeData("ui-tooltip-open")},_tooltip:function(e){var i=t("<div>").attr("role","tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||"")),n=i.uniqueId().attr("id");return t("<div>").addClass("ui-tooltip-content").appendTo(i),i.appendTo(this.document[0].body),this.tooltips[n]={element:e,tooltip:i}},_find:function(t){var e=t.data("ui-tooltip-id");return e?this.tooltips[e]:null},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_destroy:function(){var e=this;t.each(this.tooltips,function(i,n){var s=t.Event("blur"),o=n.element;s.target=s.currentTarget=o[0],e.close(s,!0),t("#"+i).remove(),o.data("ui-tooltip-title")&&(o.attr("title")||o.attr("title",o.data("ui-tooltip-title")),o.removeData("ui-tooltip-title"))}),this.liveRegion.remove()}})}),onInit(function(){}),function(t){window.NestedFormEvents=function(){this.addFields=t.proxy(this.addFields,this),this.removeFields=t.proxy(this.removeFields,this)},NestedFormEvents.prototype={addFields:function(e){var i=e.currentTarget,n=t(i).data("association"),s=t("#"+t(i).data("blueprint-id")),o=s.data("blueprint"),r=(t(i).closest(".fields").closestChild("input, textarea, select").eq(0).attr("name")||"").replace(new RegExp("[[a-z_]+]$"),"");if(r)for(var a=r.match(/[a-z_]+_attributes(?=\]\[(new_)?\d+\])/g)||[],l=r.match(/[0-9]+/g)||[],u=0;u<a.length;u++)l[u]&&(o=o.replace(new RegExp("(_"+a[u]+")_.+?_","g"),"$1_"+l[u]+"_"),o=o.replace(new RegExp("(\\["+a[u]+"\\])\\[.+?\\]","g"),"$1["+l[u]+"]"));var c=new RegExp("new_"+n,"g"),h=this.newId();o=t.trim(o.replace(c,h));var d=this.insertFields(o,n,i);return d.trigger({type:"nested:fieldAdded",field:d}).trigger({type:"nested:fieldAdded:"+n,field:d}),!1},newId:function(){return(new Date).getTime()},insertFields:function(e,i,n){var s=t(n).data("target");return s?t(e).appendTo(t(s)):t(e).insertBefore(n)},removeFields:function(e){var i=t(e.currentTarget),n=i.data("association"),s=i.prev("input[type=hidden]");s.val("1");var o=i.closest(".fields");return o.hide(),o.trigger({type:"nested:fieldRemoved",field:o}).trigger({type:"nested:fieldRemoved:"+n,field:o}),!1}},window.nestedFormEvents=new NestedFormEvents,t(document).delegate("form a.add_nested_fields","click",nestedFormEvents.addFields).delegate("form a.remove_nested_fields","click",nestedFormEvents.removeFields)}(jQuery),/*
 * Copyright 2011, Tobias Lindig
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 */
function(t){t.fn.closestChild=function(e){if(e&&""!=e){var i=[];for(i.push(this);i.length>0;)for(var n=i.shift(),s=n.children(),o=0;o<s.length;++o){var r=t(s[o]);if(r.is(e))return r;i.push(r)}}return t()}}(jQuery),window.Modernizr=function(t,e,i){function n(t){y.cssText=t}function s(t,e){return typeof t===e}function o(t,e){return!!~(""+t).indexOf(e)}function r(t,e){for(var n in t){var s=t[n];if(!o(s,"-")&&y[s]!==i)return"pfx"==e?s:!0}return!1}function a(t,e,n){for(var o in t){var r=e[t[o]];if(r!==i)return n===!1?t[o]:s(r,"function")?r.bind(n||e):r}return!1}function l(t,e,i){var n=t.charAt(0).toUpperCase()+t.slice(1),o=(t+" "+_.join(n+" ")+n).split(" ");return s(e,"string")||s(e,"undefined")?r(o,e):(o=(t+" "+w.join(n+" ")+n).split(" "),a(o,e,i))}var u,c,h,d="2.6.2",p={},f=!0,m=e.documentElement,g="modernizr",v=e.createElement(g),y=v.style,b=({}.toString,"Webkit Moz O ms"),_=b.split(" "),w=b.toLowerCase().split(" "),x={},C=[],k=C.slice,T={}.hasOwnProperty;h=s(T,"undefined")||s(T.call,"undefined")?function(t,e){return e in t&&s(t.constructor.prototype[e],"undefined")}:function(t,e){return T.call(t,e)},Function.prototype.bind||(Function.prototype.bind=function(t){var e=this;if("function"!=typeof e)throw new TypeError;var i=k.call(arguments,1),n=function(){if(this instanceof n){var s=function(){};s.prototype=e.prototype;var o=new s,r=e.apply(o,i.concat(k.call(arguments)));return Object(r)===r?r:o}return e.apply(t,i.concat(k.call(arguments)))};return n}),x.csstransitions=function(){return l("transition")};for(var D in x)h(x,D)&&(c=D.toLowerCase(),p[c]=x[D](),C.push((p[c]?"":"no-")+c));return p.addTest=function(t,e){if("object"==typeof t)for(var n in t)h(t,n)&&p.addTest(n,t[n]);else{if(t=t.toLowerCase(),p[t]!==i)return p;e="function"==typeof e?e():e,"undefined"!=typeof f&&f&&(m.className+=" "+(e?"":"no-")+t),p[t]=e}return p},n(""),v=u=null,function(t,e){function i(t,e){var i=t.createElement("p"),n=t.getElementsByTagName("head")[0]||t.documentElement;return i.innerHTML="x<style>"+e+"</style>",n.insertBefore(i.lastChild,n.firstChild)}function n(){var t=v.elements;return"string"==typeof t?t.split(" "):t}function s(t){var e=g[t[f]];return e||(e={},m++,t[f]=m,g[m]=e),e}function o(t,i,n){if(i||(i=e),c)return i.createElement(t);n||(n=s(i));var o;return o=n.cache[t]?n.cache[t].cloneNode():p.test(t)?(n.cache[t]=n.createElem(t)).cloneNode():n.createElem(t),o.canHaveChildren&&!d.test(t)?n.frag.appendChild(o):o}function r(t,i){if(t||(t=e),c)return t.createDocumentFragment();i=i||s(t);for(var o=i.frag.cloneNode(),r=0,a=n(),l=a.length;l>r;r++)o.createElement(a[r]);return o}function a(t,e){e.cache||(e.cache={},e.createElem=t.createElement,e.createFrag=t.createDocumentFragment,e.frag=e.createFrag()),t.createElement=function(i){return v.shivMethods?o(i,t,e):e.createElem(i)},t.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+n().join().replace(/\w+/g,function(t){return e.createElem(t),e.frag.createElement(t),'c("'+t+'")'})+");return n}")(v,e.frag)}function l(t){t||(t=e);var n=s(t);return v.shivCSS&&!u&&!n.hasCSS&&(n.hasCSS=!!i(t,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),c||a(t,n),t}var u,c,h=t.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f="_html5shiv",m=0,g={};!function(){try{var t=e.createElement("a");t.innerHTML="<xyz></xyz>",u="hidden"in t,c=1==t.childNodes.length||function(){e.createElement("a");var t=e.createDocumentFragment();return"undefined"==typeof t.cloneNode||"undefined"==typeof t.createDocumentFragment||"undefined"==typeof t.createElement}()}catch(i){u=!0,c=!0}}();var v={elements:h.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:h.shivCSS!==!1,supportsUnknownElements:c,shivMethods:h.shivMethods!==!1,type:"default",shivDocument:l,createElement:o,createDocumentFragment:r};t.html5=v,l(e)}(this,e),p._version=d,p._domPrefixes=w,p._cssomPrefixes=_,p.testProp=function(t){return r([t])},p.testAllProps=l,p.prefixed=function(t,e,i){return e?l(t,e,i):l(t,"pfx")},m.className=m.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+C.join(" "):""),p}(this,this.document),function(t,e,i){function n(t){return"[object Function]"==g.call(t)}function s(t){return"string"==typeof t}function o(){}function r(t){return!t||"loaded"==t||"complete"==t||"uninitialized"==t}function a(){var t=v.shift();y=1,t?t.t?f(function(){("c"==t.t?d.injectCss:d.injectJs)(t.s,0,t.a,t.x,t.e,1)},0):(t(),a()):y=0}function l(t,i,n,s,o,l,u){function c(e){if(!p&&r(h.readyState)&&(b.r=p=1,!y&&a(),h.onload=h.onreadystatechange=null,e)){"img"!=t&&f(function(){w.removeChild(h)},50);for(var n in D[i])D[i].hasOwnProperty(n)&&D[i][n].onload()}}var u=u||d.errorTimeout,h=e.createElement(t),p=0,g=0,b={t:n,s:i,e:o,a:l,x:u};1===D[i]&&(g=1,D[i]=[]),"object"==t?h.data=i:(h.src=i,h.type=t),h.width=h.height="0",h.onerror=h.onload=h.onreadystatechange=function(){c.call(this,g)},v.splice(s,0,b),"img"!=t&&(g||2===D[i]?(w.insertBefore(h,_?null:m),f(c,u)):D[i].push(h))}function u(t,e,i,n,o){return y=0,e=e||"j",s(t)?l("c"==e?C:x,t,e,this.i++,i,n,o):(v.splice(this.i++,0,t),1==v.length&&a()),this}function c(){var t=d;return t.loader={load:u,i:0},t}var h,d,p=e.documentElement,f=t.setTimeout,m=e.getElementsByTagName("script")[0],g={}.toString,v=[],y=0,b="MozAppearance"in p.style,_=b&&!!e.createRange().compareNode,w=_?p:m.parentNode,p=t.opera&&"[object Opera]"==g.call(t.opera),p=!!e.attachEvent&&!p,x=b?"object":p?"script":"img",C=p?"script":x,k=Array.isArray||function(t){return"[object Array]"==g.call(t)},T=[],D={},E={timeout:function(t,e){return e.length&&(t.timeout=e[0]),t}};d=function(t){function e(t){var e,i,n,t=t.split("!"),s=T.length,o=t.pop(),r=t.length,o={url:o,origUrl:o,prefixes:t};for(i=0;r>i;i++)n=t[i].split("="),(e=E[n.shift()])&&(o=e(o,n));for(i=0;s>i;i++)o=T[i](o);return o}function r(t,s,o,r,a){var l=e(t),u=l.autoCallback;l.url.split(".").pop().split("?").shift(),l.bypass||(s&&(s=n(s)?s:s[t]||s[r]||s[t.split("/").pop().split("?")[0]]),l.instead?l.instead(t,s,o,r,a):(D[l.url]?l.noexec=!0:D[l.url]=1,o.load(l.url,l.forceCSS||!l.forceJS&&"css"==l.url.split(".").pop().split("?").shift()?"c":i,l.noexec,l.attrs,l.timeout),(n(s)||n(u))&&o.load(function(){c(),s&&s(l.origUrl,a,r),u&&u(l.origUrl,a,r),D[l.url]=2})))}function a(t,e){function i(t,i){if(t){if(s(t))i||(h=function(){var t=[].slice.call(arguments);d.apply(this,t),p()}),r(t,h,e,0,u);else if(Object(t)===t)for(l in a=function(){var e,i=0;for(e in t)t.hasOwnProperty(e)&&i++;return i}(),t)t.hasOwnProperty(l)&&(!i&&!--a&&(n(h)?h=function(){var t=[].slice.call(arguments);d.apply(this,t),p()}:h[l]=function(t){return function(){var e=[].slice.call(arguments);t&&t.apply(this,e),p()}}(d[l])),r(t[l],h,e,l,u))}else!i&&p()}var a,l,u=!!t.test,c=t.load||t.both,h=t.callback||o,d=h,p=t.complete||o;i(u?t.yep:t.nope,!!c),c&&i(c)}var l,u,h=this.yepnope.loader;if(s(t))r(t,0,h,0);else if(k(t))for(l=0;l<t.length;l++)u=t[l],s(u)?r(u,0,h,0):k(u)?d(u):Object(u)===u&&a(u,h);else Object(t)===t&&a(t,h)},d.addPrefix=function(t,e){E[t]=e},d.addFilter=function(t){T.push(t)},d.errorTimeout=1e4,null==e.readyState&&e.addEventListener&&(e.readyState="loading",e.addEventListener("DOMContentLoaded",h=function(){e.removeEventListener("DOMContentLoaded",h,0),e.readyState="complete"},0)),t.yepnope=c(),t.yepnope.executeStack=a,t.yepnope.injectJs=function(t,i,n,s,l,u){var c,h,p=e.createElement("script"),s=s||d.errorTimeout;p.src=t;for(h in n)p.setAttribute(h,n[h]);i=u?a:i||o,p.onreadystatechange=p.onload=function(){!c&&r(p.readyState)&&(c=1,i(),p.onload=p.onreadystatechange=null)},f(function(){c||(c=1,i(1))},s),l?p.onload():m.parentNode.insertBefore(p,m)},t.yepnope.injectCss=function(t,i,n,s,r,l){var u,s=e.createElement("link"),i=l?a:i||o;s.href=t,s.rel="stylesheet",s.type="text/css";for(u in n)s.setAttribute(u,n[u]);r||(m.parentNode.insertBefore(s,m),f(i,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},"undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}t.fn.emulateTransitionEnd=function(e){var i=!1,n=this;t(this).one("bsTransitionEnd",function(){i=!0});var s=function(){i||t(n).trigger(t.support.transition.end)};return setTimeout(s,e),this},t(function(){t.support.transition=e(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){return t(e.target).is(this)?e.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),/* ========================================================================
 * Bootstrap: alert.js v3.2.0
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),s=i.data("bs.alert");s||i.data("bs.alert",s=new n(this)),"string"==typeof e&&s[e].call(i)})}var i='[data-dismiss="alert"]',n=function(e){t(e).on("click",i,this.close)};n.VERSION="3.2.0",n.prototype.close=function(e){function i(){o.detach().trigger("closed.bs.alert").remove()}var n=t(this),s=n.attr("data-target");s||(s=n.attr("href"),s=s&&s.replace(/.*(?=#[^\s]*$)/,""));var o=t(s);e&&e.preventDefault(),o.length||(o=n.hasClass("alert")?n:n.parent()),o.trigger(e=t.Event("close.bs.alert")),e.isDefaultPrevented()||(o.removeClass("in"),t.support.transition&&o.hasClass("fade")?o.one("bsTransitionEnd",i).emulateTransitionEnd(150):i())};var s=t.fn.alert;t.fn.alert=e,t.fn.alert.Constructor=n,t.fn.alert.noConflict=function(){return t.fn.alert=s,this},t(document).on("click.bs.alert.data-api",i,n.prototype.close)}(jQuery),/* ========================================================================
 * Bootstrap: button.js v3.2.0
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),s=n.data("bs.button"),o="object"==typeof e&&e;s||n.data("bs.button",s=new i(this,o)),"toggle"==e?s.toggle():e&&s.setState(e)})}var i=function(e,n){this.$element=t(e),this.options=t.extend({},i.DEFAULTS,n),this.isLoading=!1};i.VERSION="3.2.0",i.DEFAULTS={loadingText:"loading..."},i.prototype.setState=function(e){var i="disabled",n=this.$element,s=n.is("input")?"val":"html",o=n.data();e+="Text",null==o.resetText&&n.data("resetText",n[s]()),n[s](null==o[e]?this.options[e]:o[e]),setTimeout(t.proxy(function(){"loadingText"==e?(this.isLoading=!0,n.addClass(i).attr(i,i)):this.isLoading&&(this.isLoading=!1,n.removeClass(i).removeAttr(i))},this),0)},i.prototype.toggle=function(){var t=!0,e=this.$element.closest('[data-toggle="buttons"]');if(e.length){var i=this.$element.find("input");"radio"==i.prop("type")&&(i.prop("checked")&&this.$element.hasClass("active")?t=!1:e.find(".active").removeClass("active")),t&&i.prop("checked",!this.$element.hasClass("active")).trigger("change")}t&&this.$element.toggleClass("active")};var n=t.fn.button;t.fn.button=e,t.fn.button.Constructor=i,t.fn.button.noConflict=function(){return t.fn.button=n,this},t(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(i){var n=t(i.target);n.hasClass("btn")||(n=n.closest(".btn")),e.call(n,"toggle"),i.preventDefault()})}(jQuery),/* ========================================================================
 * Bootstrap: carousel.js v3.2.0
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),s=n.data("bs.carousel"),o=t.extend({},i.DEFAULTS,n.data(),"object"==typeof e&&e),r="string"==typeof e?e:o.slide;s||n.data("bs.carousel",s=new i(this,o)),"number"==typeof e?s.to(e):r?s[r]():o.interval&&s.pause().cycle()})}var i=function(e,i){this.$element=t(e).on("keydown.bs.carousel",t.proxy(this.keydown,this)),this.$indicators=this.$element.find(".carousel-indicators"),this.options=i,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter.bs.carousel",t.proxy(this.pause,this)).on("mouseleave.bs.carousel",t.proxy(this.cycle,this))};i.VERSION="3.2.0",i.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},i.prototype.keydown=function(t){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()},i.prototype.cycle=function(e){return e||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next,this),this.options.interval)),this},i.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},i.prototype.to=function(e){var i=this,n=this.getItemIndex(this.$active=this.$element.find(".item.active"));return e>this.$items.length-1||0>e?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){i.to(e)}):n==e?this.pause().cycle():this.slide(e>n?"next":"prev",t(this.$items[e]))},i.prototype.pause=function(e){return e||(this.paused=!0),this.$element.find(".next, .prev").length&&t.support.transition&&(this.$element.trigger(t.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},i.prototype.next=function(){return this.sliding?void 0:this.slide("next")},i.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},i.prototype.slide=function(e,i){var n=this.$element.find(".item.active"),s=i||n[e](),o=this.interval,r="next"==e?"left":"right",a="next"==e?"first":"last",l=this;if(!s.length){if(!this.options.wrap)return;s=this.$element.find(".item")[a]()}if(s.hasClass("active"))return this.sliding=!1;var u=s[0],c=t.Event("slide.bs.carousel",{relatedTarget:u,direction:r});if(this.$element.trigger(c),!c.isDefaultPrevented()){if(this.sliding=!0,o&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var h=t(this.$indicators.children()[this.getItemIndex(s)]);h&&h.addClass("active")}var d=t.Event("slid.bs.carousel",{relatedTarget:u,direction:r});return t.support.transition&&this.$element.hasClass("slide")?(s.addClass(e),s[0].offsetWidth,n.addClass(r),s.addClass(r),n.one("bsTransitionEnd",function(){s.removeClass([e,r].join(" ")).addClass("active"),n.removeClass(["active",r].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger(d)},0)}).emulateTransitionEnd(1e3*n.css("transition-duration").slice(0,-1))):(n.removeClass("active"),s.addClass("active"),this.sliding=!1,this.$element.trigger(d)),o&&this.cycle(),this}};var n=t.fn.carousel;t.fn.carousel=e,t.fn.carousel.Constructor=i,t.fn.carousel.noConflict=function(){return t.fn.carousel=n,this},t(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(i){var n,s=t(this),o=t(s.attr("data-target")||(n=s.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,""));if(o.hasClass("carousel")){var r=t.extend({},o.data(),s.data()),a=s.attr("data-slide-to");a&&(r.interval=!1),e.call(o,r),a&&o.data("bs.carousel").to(a),i.preventDefault()}}),t(window).on("load",function(){t('[data-ride="carousel"]').each(function(){var i=t(this);e.call(i,i.data())})})}(jQuery),/* ========================================================================
 * Bootstrap: collapse.js v3.2.0
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),s=n.data("bs.collapse"),o=t.extend({},i.DEFAULTS,n.data(),"object"==typeof e&&e);!s&&o.toggle&&"show"==e&&(e=!e),s||n.data("bs.collapse",s=new i(this,o)),"string"==typeof e&&s[e]()})}var i=function(e,n){this.$element=t(e),this.options=t.extend({},i.DEFAULTS,n),this.transitioning=null,this.options.parent&&(this.$parent=t(this.options.parent)),this.options.toggle&&this.toggle()};i.VERSION="3.2.0",i.DEFAULTS={toggle:!0},i.prototype.dimension=function(){var t=this.$element.hasClass("width");return t?"width":"height"},i.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var i=t.Event("show.bs.collapse");if(this.$element.trigger(i),!i.isDefaultPrevented()){var n=this.$parent&&this.$parent.find("> .panel > .in");if(n&&n.length){var s=n.data("bs.collapse");if(s&&s.transitioning)return;e.call(n,"hide"),s||n.data("bs.collapse",null)}var o=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[o](0),this.transitioning=1;var r=function(){this.$element.removeClass("collapsing").addClass("collapse in")[o](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!t.support.transition)return r.call(this);var a=t.camelCase(["scroll",o].join("-"));this.$element.one("bsTransitionEnd",t.proxy(r,this)).emulateTransitionEnd(350)[o](this.$element[0][a])}}},i.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var e=t.Event("hide.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var i=this.dimension();this.$element[i](this.$element[i]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var n=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return t.support.transition?void this.$element[i](0).one("bsTransitionEnd",t.proxy(n,this)).emulateTransitionEnd(350):n.call(this)}}},i.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var n=t.fn.collapse;t.fn.collapse=e,t.fn.collapse.Constructor=i,t.fn.collapse.noConflict=function(){return t.fn.collapse=n,this},t(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(i){var n,s=t(this),o=s.attr("data-target")||i.preventDefault()||(n=s.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,""),r=t(o),a=r.data("bs.collapse"),l=a?"toggle":s.data(),u=s.attr("data-parent"),c=u&&t(u);a&&a.transitioning||(c&&c.find('[data-toggle="collapse"][data-parent="'+u+'"]').not(s).addClass("collapsed"),s[r.hasClass("in")?"addClass":"removeClass"]("collapsed")),e.call(r,l)})}(jQuery),/* ========================================================================
 * Bootstrap: dropdown.js v3.2.0
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){e&&3===e.which||(t(s).remove(),t(o).each(function(){var n=i(t(this)),s={relatedTarget:this};n.hasClass("open")&&(n.trigger(e=t.Event("hide.bs.dropdown",s)),e.isDefaultPrevented()||n.removeClass("open").trigger("hidden.bs.dropdown",s))}))}function i(e){var i=e.attr("data-target");i||(i=e.attr("href"),i=i&&/#[A-Za-z]/.test(i)&&i.replace(/.*(?=#[^\s]*$)/,""));var n=i&&t(i);return n&&n.length?n:e.parent()}function n(e){return this.each(function(){var i=t(this),n=i.data("bs.dropdown");n||i.data("bs.dropdown",n=new r(this)),"string"==typeof e&&n[e].call(i)})}var s=".dropdown-backdrop",o='[data-toggle="dropdown"]',r=function(e){t(e).on("click.bs.dropdown",this.toggle)};r.VERSION="3.2.0",r.prototype.toggle=function(n){var s=t(this);if(!s.is(".disabled, :disabled")){var o=i(s),r=o.hasClass("open");if(e(),!r){"ontouchstart"in document.documentElement&&!o.closest(".navbar-nav").length&&t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click",e);var a={relatedTarget:this};if(o.trigger(n=t.Event("show.bs.dropdown",a)),n.isDefaultPrevented())return;s.trigger("focus"),o.toggleClass("open").trigger("shown.bs.dropdown",a)}return!1}},r.prototype.keydown=function(e){if(/(38|40|27)/.test(e.keyCode)){var n=t(this);if(e.preventDefault(),e.stopPropagation(),!n.is(".disabled, :disabled")){var s=i(n),r=s.hasClass("open");if(!r||r&&27==e.keyCode)return 27==e.which&&s.find(o).trigger("focus"),n.trigger("click");var a=" li:not(.divider):visible a",l=s.find('[role="menu"]'+a+', [role="listbox"]'+a);if(l.length){var u=l.index(l.filter(":focus"));38==e.keyCode&&u>0&&u--,40==e.keyCode&&u<l.length-1&&u++,~u||(u=0),l.eq(u).trigger("focus")}}}};var a=t.fn.dropdown;t.fn.dropdown=n,t.fn.dropdown.Constructor=r,t.fn.dropdown.noConflict=function(){return t.fn.dropdown=a,this},t(document).on("click.bs.dropdown.data-api",e).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",o,r.prototype.toggle).on("keydown.bs.dropdown.data-api",o+', [role="menu"], [role="listbox"]',r.prototype.keydown)}(jQuery),/* ========================================================================
 * Bootstrap: modal.js v3.2.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e,n){return this.each(function(){var s=t(this),o=s.data("bs.modal"),r=t.extend({},i.DEFAULTS,s.data(),"object"==typeof e&&e);o||s.data("bs.modal",o=new i(this,r)),"string"==typeof e?o[e](n):r.show&&o.show(n)})}var i=function(e,i){this.options=i,this.$body=t(document.body),this.$element=t(e),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};i.VERSION="3.2.0",i.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},i.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},i.prototype.show=function(e){var i=this,n=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(n),this.isShown||n.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.$body.addClass("modal-open"),this.setScrollbar(),this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.backdrop(function(){var n=t.support.transition&&i.$element.hasClass("fade");i.$element.parent().length||i.$element.appendTo(i.$body),i.$element.show().scrollTop(0),n&&i.$element[0].offsetWidth,i.$element.addClass("in").attr("aria-hidden",!1),i.enforceFocus();var s=t.Event("shown.bs.modal",{relatedTarget:e});n?i.$element.find(".modal-dialog").one("bsTransitionEnd",function(){i.$element.trigger("focus").trigger(s)}).emulateTransitionEnd(300):i.$element.trigger("focus").trigger(s)}))},i.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.$body.removeClass("modal-open"),this.resetScrollbar(),this.escape(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},i.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},i.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},i.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$element.trigger("hidden.bs.modal")})},i.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},i.prototype.backdrop=function(e){var i=this,n=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var s=t.support.transition&&n;if(this.$backdrop=t('<div class="modal-backdrop '+n+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),s&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;s?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(150):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var o=function(){i.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",o).emulateTransitionEnd(150):o()}else e&&e()},i.prototype.checkScrollbar=function(){document.body.clientWidth>=window.innerWidth||(this.scrollbarWidth=this.scrollbarWidth||this.measureScrollbar())},i.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.scrollbarWidth&&this.$body.css("padding-right",t+this.scrollbarWidth)},i.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},i.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var n=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=i,t.fn.modal.noConflict=function(){return t.fn.modal=n,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(i){var n=t(this),s=n.attr("href"),o=t(n.attr("data-target")||s&&s.replace(/.*(?=#[^\s]+$)/,"")),r=o.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(s)&&s},o.data(),n.data());n.is("a")&&i.preventDefault(),o.one("show.bs.modal",function(t){t.isDefaultPrevented()||o.one("hidden.bs.modal",function(){n.is(":visible")&&n.trigger("focus")})}),e.call(o,r,this)})}(jQuery),/* ========================================================================
 * Bootstrap: tooltip.js v3.2.0
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),s=n.data("bs.tooltip"),o="object"==typeof e&&e;(s||"destroy"!=e)&&(s||n.data("bs.tooltip",s=new i(this,o)),"string"==typeof e&&s[e]())})}var i=function(t,e){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",t,e)};i.VERSION="3.2.0",i.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},i.prototype.init=function(e,i,n){this.enabled=!0,this.type=e,this.$element=t(i),this.options=this.getOptions(n),this.$viewport=this.options.viewport&&t(this.options.viewport.selector||this.options.viewport);for(var s=this.options.trigger.split(" "),o=s.length;o--;){var r=s[o];if("click"==r)this.$element.on("click."+this.type,this.options.selector,t.proxy(this.toggle,this));else if("manual"!=r){var a="hover"==r?"mouseenter":"focusin",l="hover"==r?"mouseleave":"focusout";this.$element.on(a+"."+this.type,this.options.selector,t.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,t.proxy(this.leave,this))}}this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},i.prototype.getDefaults=function(){return i.DEFAULTS},i.prototype.getOptions=function(e){return e=t.extend({},this.getDefaults(),this.$element.data(),e),e.delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e},i.prototype.getDelegateOptions=function(){var e={},i=this.getDefaults();return this._options&&t.each(this._options,function(t,n){i[t]!=n&&(e[t]=n)}),e},i.prototype.enter=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i)),clearTimeout(i.timeout),i.hoverState="in",i.options.delay&&i.options.delay.show?void(i.timeout=setTimeout(function(){"in"==i.hoverState&&i.show()},i.options.delay.show)):i.show()},i.prototype.leave=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i)),clearTimeout(i.timeout),i.hoverState="out",i.options.delay&&i.options.delay.hide?void(i.timeout=setTimeout(function(){"out"==i.hoverState&&i.hide()},i.options.delay.hide)):i.hide()},i.prototype.show=function(){var e=t.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(e);var i=t.contains(document.documentElement,this.$element[0]);if(e.isDefaultPrevented()||!i)return;var n=this,s=this.tip(),o=this.getUID(this.type);this.setContent(),s.attr("id",o),this.$element.attr("aria-describedby",o),this.options.animation&&s.addClass("fade");var r="function"==typeof this.options.placement?this.options.placement.call(this,s[0],this.$element[0]):this.options.placement,a=/\s?auto?\s?/i,l=a.test(r);l&&(r=r.replace(a,"")||"top"),s.detach().css({top:0,left:0,display:"block"}).addClass(r).data("bs."+this.type,this),this.options.container?s.appendTo(this.options.container):s.insertAfter(this.$element);var u=this.getPosition(),c=s[0].offsetWidth,h=s[0].offsetHeight;if(l){var d=r,p=this.$element.parent(),f=this.getPosition(p);r="bottom"==r&&u.top+u.height+h-f.scroll>f.height?"top":"top"==r&&u.top-f.scroll-h<0?"bottom":"right"==r&&u.right+c>f.width?"left":"left"==r&&u.left-c<f.left?"right":r,s.removeClass(d).addClass(r)}var m=this.getCalculatedOffset(r,u,c,h);this.applyPlacement(m,r);var g=function(){n.$element.trigger("shown.bs."+n.type),n.hoverState=null};t.support.transition&&this.$tip.hasClass("fade")?s.one("bsTransitionEnd",g).emulateTransitionEnd(150):g()}},i.prototype.applyPlacement=function(e,i){var n=this.tip(),s=n[0].offsetWidth,o=n[0].offsetHeight,r=parseInt(n.css("margin-top"),10),a=parseInt(n.css("margin-left"),10);isNaN(r)&&(r=0),isNaN(a)&&(a=0),e.top=e.top+r,e.left=e.left+a,t.offset.setOffset(n[0],t.extend({using:function(t){n.css({top:Math.round(t.top),left:Math.round(t.left)})}},e),0),n.addClass("in");var l=n[0].offsetWidth,u=n[0].offsetHeight;"top"==i&&u!=o&&(e.top=e.top+o-u);var c=this.getViewportAdjustedDelta(i,e,l,u);c.left?e.left+=c.left:e.top+=c.top;var h=c.left?2*c.left-s+l:2*c.top-o+u,d=c.left?"left":"top",p=c.left?"offsetWidth":"offsetHeight";n.offset(e),this.replaceArrow(h,n[0][p],d)},i.prototype.replaceArrow=function(t,e,i){this.arrow().css(i,t?50*(1-t/e)+"%":"")},i.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},i.prototype.hide=function(){function e(){"in"!=i.hoverState&&n.detach(),i.$element.trigger("hidden.bs."+i.type)}var i=this,n=this.tip(),s=t.Event("hide.bs."+this.type);return this.$element.removeAttr("aria-describedby"),this.$element.trigger(s),s.isDefaultPrevented()?void 0:(n.removeClass("in"),t.support.transition&&this.$tip.hasClass("fade")?n.one("bsTransitionEnd",e).emulateTransitionEnd(150):e(),this.hoverState=null,this)},i.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},i.prototype.hasContent=function(){return this.getTitle()},i.prototype.getPosition=function(e){e=e||this.$element;var i=e[0],n="BODY"==i.tagName;return t.extend({},"function"==typeof i.getBoundingClientRect?i.getBoundingClientRect():null,{scroll:n?document.documentElement.scrollTop||document.body.scrollTop:e.scrollTop(),width:n?t(window).width():e.outerWidth(),height:n?t(window).height():e.outerHeight()},n?{top:0,left:0}:e.offset())},i.prototype.getCalculatedOffset=function(t,e,i,n){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-n,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-n/2,left:e.left-i}:{top:e.top+e.height/2-n/2,left:e.left+e.width}},i.prototype.getViewportAdjustedDelta=function(t,e,i,n){var s={top:0,left:0};if(!this.$viewport)return s;var o=this.options.viewport&&this.options.viewport.padding||0,r=this.getPosition(this.$viewport);if(/right|left/.test(t)){var a=e.top-o-r.scroll,l=e.top+o-r.scroll+n;a<r.top?s.top=r.top-a:l>r.top+r.height&&(s.top=r.top+r.height-l)}else{var u=e.left-o,c=e.left+o+i;u<r.left?s.left=r.left-u:c>r.width&&(s.left=r.left+r.width-c)}return s},i.prototype.getTitle=function(){var t,e=this.$element,i=this.options;return t=e.attr("data-original-title")||("function"==typeof i.title?i.title.call(e[0]):i.title)},i.prototype.getUID=function(t){do t+=~~(1e6*Math.random());while(document.getElementById(t));return t},i.prototype.tip=function(){return this.$tip=this.$tip||t(this.options.template)},i.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},i.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},i.prototype.enable=function(){this.enabled=!0},i.prototype.disable=function(){this.enabled=!1},i.prototype.toggleEnabled=function(){this.enabled=!this.enabled},i.prototype.toggle=function(e){var i=this;e&&(i=t(e.currentTarget).data("bs."+this.type),i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i))),i.tip().hasClass("in")?i.leave(i):i.enter(i)},i.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var n=t.fn.tooltip;t.fn.tooltip=e,t.fn.tooltip.Constructor=i,t.fn.tooltip.noConflict=function(){return t.fn.tooltip=n,this}}(jQuery),/* ========================================================================
 * Bootstrap: popover.js v3.2.0
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),s=n.data("bs.popover"),o="object"==typeof e&&e;(s||"destroy"!=e)&&(s||n.data("bs.popover",s=new i(this,o)),"string"==typeof e&&s[e]())})}var i=function(t,e){this.init("popover",t,e)};if(!t.fn.tooltip)throw new Error("Popover requires tooltip.js");i.VERSION="3.2.0",i.DEFAULTS=t.extend({},t.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),i.prototype=t.extend({},t.fn.tooltip.Constructor.prototype),i.prototype.constructor=i,i.prototype.getDefaults=function(){return i.DEFAULTS},i.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),i=this.getContent();t.find(".popover-title")[this.options.html?"html":"text"](e),t.find(".popover-content").empty()[this.options.html?"string"==typeof i?"html":"append":"text"](i),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},i.prototype.hasContent=function(){return this.getTitle()||this.getContent()},i.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},i.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},i.prototype.tip=function(){return this.$tip||(this.$tip=t(this.options.template)),this.$tip};var n=t.fn.popover;t.fn.popover=e,t.fn.popover.Constructor=i,t.fn.popover.noConflict=function(){return t.fn.popover=n,this}}(jQuery),/* ========================================================================
 * Bootstrap: scrollspy.js v3.2.0
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(i,n){var s=t.proxy(this.process,this);this.$body=t("body"),this.$scrollElement=t(t(i).is("body")?window:i),this.options=t.extend({},e.DEFAULTS,n),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",s),this.refresh(),this.process()}function i(i){return this.each(function(){var n=t(this),s=n.data("bs.scrollspy"),o="object"==typeof i&&i;s||n.data("bs.scrollspy",s=new e(this,o)),"string"==typeof i&&s[i]()})}e.VERSION="3.2.0",e.DEFAULTS={offset:10},e.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},e.prototype.refresh=function(){var e="offset",i=0;t.isWindow(this.$scrollElement[0])||(e="position",i=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var n=this;this.$body.find(this.selector).map(function(){var n=t(this),s=n.data("target")||n.attr("href"),o=/^#./.test(s)&&t(s);return o&&o.length&&o.is(":visible")&&[[o[e]().top+i,s]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){n.offsets.push(this[0]),n.targets.push(this[1])})},e.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.getScrollHeight(),n=this.options.offset+i-this.$scrollElement.height(),s=this.offsets,o=this.targets,r=this.activeTarget;if(this.scrollHeight!=i&&this.refresh(),e>=n)return r!=(t=o[o.length-1])&&this.activate(t);if(r&&e<=s[0])return r!=(t=o[0])&&this.activate(t);for(t=s.length;t--;)r!=o[t]&&e>=s[t]&&(!s[t+1]||e<=s[t+1])&&this.activate(o[t])},e.prototype.activate=function(e){this.activeTarget=e,t(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var i=this.selector+'[data-target="'+e+'"],'+this.selector+'[href="'+e+'"]',n=t(i).parents("li").addClass("active");n.parent(".dropdown-menu").length&&(n=n.closest("li.dropdown").addClass("active")),n.trigger("activate.bs.scrollspy")};var n=t.fn.scrollspy;t.fn.scrollspy=i,t.fn.scrollspy.Constructor=e,t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=n,this},t(window).on("load.bs.scrollspy.data-api",function(){t('[data-spy="scroll"]').each(function(){var e=t(this);i.call(e,e.data())})})}(jQuery),/* ========================================================================
 * Bootstrap: tab.js v3.2.0
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),s=n.data("bs.tab");s||n.data("bs.tab",s=new i(this)),"string"==typeof e&&s[e]()})}var i=function(e){this.element=t(e)};i.VERSION="3.2.0",i.prototype.show=function(){var e=this.element,i=e.closest("ul:not(.dropdown-menu)"),n=e.data("target");if(n||(n=e.attr("href"),n=n&&n.replace(/.*(?=#[^\s]*$)/,"")),!e.parent("li").hasClass("active")){var s=i.find(".active:last a")[0],o=t.Event("show.bs.tab",{relatedTarget:s});if(e.trigger(o),!o.isDefaultPrevented()){var r=t(n);this.activate(e.closest("li"),i),this.activate(r,r.parent(),function(){e.trigger({type:"shown.bs.tab",relatedTarget:s})})}}},i.prototype.activate=function(e,i,n){function s(){o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),e.addClass("active"),r?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu")&&e.closest("li.dropdown").addClass("active"),n&&n()}var o=i.find("> .active"),r=n&&t.support.transition&&o.hasClass("fade");r?o.one("bsTransitionEnd",s).emulateTransitionEnd(150):s(),o.removeClass("in")};var n=t.fn.tab;t.fn.tab=e,t.fn.tab.Constructor=i,t.fn.tab.noConflict=function(){return t.fn.tab=n,this},t(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(i){i.preventDefault(),e.call(t(this),"show")})}(jQuery),/* ========================================================================
 * Bootstrap: affix.js v3.2.0
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),s=n.data("bs.affix"),o="object"==typeof e&&e;s||n.data("bs.affix",s=new i(this,o)),"string"==typeof e&&s[e]()})}var i=function(e,n){this.options=t.extend({},i.DEFAULTS,n),this.$target=t(this.options.target).on("scroll.bs.affix.data-api",t.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",t.proxy(this.checkPositionWithEventLoop,this)),this.$element=t(e),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};i.VERSION="3.2.0",i.RESET="affix affix-top affix-bottom",i.DEFAULTS={offset:0,target:window},i.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(i.RESET).addClass("affix");var t=this.$target.scrollTop(),e=this.$element.offset();return this.pinnedOffset=e.top-t},i.prototype.checkPositionWithEventLoop=function(){setTimeout(t.proxy(this.checkPosition,this),1)},i.prototype.checkPosition=function(){if(this.$element.is(":visible")){var e=t(document).height(),n=this.$target.scrollTop(),s=this.$element.offset(),o=this.options.offset,r=o.top,a=o.bottom;"object"!=typeof o&&(a=r=o),"function"==typeof r&&(r=o.top(this.$element)),"function"==typeof a&&(a=o.bottom(this.$element));var l=null!=this.unpin&&n+this.unpin<=s.top?!1:null!=a&&s.top+this.$element.height()>=e-a?"bottom":null!=r&&r>=n?"top":!1;if(this.affixed!==l){null!=this.unpin&&this.$element.css("top","");var u="affix"+(l?"-"+l:""),c=t.Event(u+".bs.affix");this.$element.trigger(c),c.isDefaultPrevented()||(this.affixed=l,this.unpin="bottom"==l?this.getPinnedOffset():null,this.$element.removeClass(i.RESET).addClass(u).trigger(t.Event(u.replace("affix","affixed"))),"bottom"==l&&this.$element.offset({top:e-this.$element.height()-a}))}}};var n=t.fn.affix;t.fn.affix=e,t.fn.affix.Constructor=i,t.fn.affix.noConflict=function(){return t.fn.affix=n,this},t(window).on("load",function(){t('[data-spy="affix"]').each(function(){var i=t(this),n=i.data();n.offset=n.offset||{},n.offsetBottom&&(n.offset.bottom=n.offsetBottom),n.offsetTop&&(n.offset.top=n.offsetTop),e.call(i,n)})})}(jQuery),/*!
 * @preserve
 *
 * Readmore.js jQuery plugin
 * Author: @jed_foster
 * Project home: http://jedfoster.github.io/Readmore.js
 * Licensed under the MIT license
 *
 * Debounce function from http://davidwalsh.name/javascript-debounce-function
 */
function(t){"use strict";function e(t,e,i){var n;return function(){var s=this,o=arguments,r=function(){n=null,i||t.apply(s,o)},a=i&&!n;clearTimeout(n),n=setTimeout(r,e),a&&t.apply(s,o)}}function i(t){var e=++u;return String(null==t?"rmjs-":t)+e}function n(t){var e=t.clone().css({height:"auto",width:t.width(),maxHeight:"none",overflow:"hidden"}).insertAfter(t),i=e.outerHeight(),n=parseInt(e.css({maxHeight:""}).css("max-height").replace(/[^-\d\.]/g,""),10),s=t.data("defaultHeight");e.remove();var o=n||t.data("collapsedHeight")||s;t.data({expandedHeight:i,maxHeight:n,collapsedHeight:o}).css({maxHeight:"none"})}function s(t){if(!l[t.selector]){var e=" ";t.embedCSS&&""!==t.blockCSS&&(e+=t.selector+" + [data-readmore-toggle], "+t.selector+"[data-readmore]{"+t.blockCSS+"}"),e+=t.selector+"[data-readmore]{transition: height "+t.speed+"ms;overflow: hidden;}",function(t,e){var i=t.createElement("style");i.type="text/css",i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),t.getElementsByTagName("head")[0].appendChild(i)}(document,e),l[t.selector]=!0}}function o(e,i){this.element=e,this.options=t.extend({},a,i),s(this.options),this._defaults=a,this._name=r,this.init(),window.addEventListener?(window.addEventListener("load",c),window.addEventListener("resize",c)):(window.attachEvent("load",c),window.attachEvent("resize",c))}var r="readmore",a={speed:100,collapsedHeight:200,heightMargin:16,moreLink:'<a href="#">Read More</a>',lessLink:'<a href="#">Close</a>',embedCSS:!0,blockCSS:"display: block; width: 100%;",startOpen:!1,beforeToggle:function(){},afterToggle:function(){}},l={},u=0,c=e(function(){t("[data-readmore]").each(function(){var e=t(this),i="true"===e.attr("aria-expanded");n(e),e.css({height:e.data(i?"expandedHeight":"collapsedHeight")})})},100);o.prototype={init:function(){var e=this,s=t(this.element);s.data({defaultHeight:this.options.collapsedHeight,heightMargin:this.options.heightMargin}),n(s);var o=s.data("collapsedHeight"),r=s.data("heightMargin");if(s.outerHeight(!0)<=o+r)return!0;var a=s.attr("id")||i(),l=e.options.startOpen?e.options.lessLink:e.options.moreLink;s.attr({"data-readmore":"","aria-expanded":!1,id:a}),s.after(t(l).on("click",function(t){e.toggle(this,s[0],t)}).attr({"data-readmore-toggle":"","aria-controls":a})),e.options.startOpen||s.css({height:o})},toggle:function(e,i,n){n&&n.preventDefault(),e||(e=t('[aria-controls="'+this.element.id+'"]')[0]),i||(i=this.element);var s=this,o=t(i),r="",a="",l=!1,u=o.data("collapsedHeight");o.height()<=u?(r=o.data("expandedHeight")+"px",a="lessLink",l=!0):(r=u,a="moreLink"),s.options.beforeToggle(e,i,!l),o.css({height:r}),o.on("transitionend",function(){s.options.afterToggle(e,i,l),t(this).attr({"aria-expanded":l}).off("transitionend")}),t(e).replaceWith(t(s.options[a]).on("click",function(t){s.toggle(this,i,t)}).attr({"data-readmore-toggle":"","aria-controls":o.attr("id")}))},destroy:function(){t(this.element).each(function(){var e=t(this);e.attr({"data-readmore":null,"aria-expanded":null}).css({maxHeight:"",height:""}).next("[data-readmore-toggle]").remove(),e.removeData()})}},t.fn.readmore=function(e){var i=arguments,n=this.selector;return e=e||{},"object"==typeof e?this.each(function(){if(t.data(this,"plugin_"+r)){var i=t.data(this,"plugin_"+r);i.destroy.apply(i)}e.selector=n,t.data(this,"plugin_"+r,new o(this,e))}):"string"==typeof e&&"_"!==e[0]&&"init"!==e?this.each(function(){var n=t.data(this,"plugin_"+r);n instanceof o&&"function"==typeof n[e]&&n[e].apply(n,Array.prototype.slice.call(i,1))}):void 0}}(jQuery),function(t){"use strict";var e=t(window),i=function(t,e){t.addClass(e.errorElementClass).removeClass("valid");var i=t.parent();i.hasClass("input-group")&&(i=i.parent()),i.addClass(e.inputParentClassOnError).removeClass(e.inputParentClassOnSuccess),""!==e.borderColorOnError&&t.css("border-color",e.borderColorOnError)},n=function(e,i){e.each(function(){var e=t(this),n=e.parent();n.hasClass("input-group")&&(n=n.parent()),s(e,"",i,i.errorMessagePosition),e.removeClass("valid").removeClass(i.errorElementClass).css("border-color",""),n.removeClass(i.inputParentClassOnError).removeClass(i.inputParentClassOnSuccess).find("."+i.errorMessageClass).remove()})},s=function(e,i,n,s){var r=o(e);if(r)r.innerHTML=i;else if("object"==typeof s){var a=!1;if(s.find("."+n.errorMessageClass).each(function(){return this.inputReferer==e[0]?(a=t(this),!1):void 0}),a)i?a.html(i):a.remove();else{var l=t('<div class="'+n.errorMessageClass+'">'+i+"</div>");l[0].inputReferer=e[0],s.prepend(l)}}else{var u=e.parent();u.hasClass("input-group")&&(u=u.parent());var l=u.find("."+n.errorMessageClass+".help-block");0==l.length&&(l=t("<span></span>").addClass("help-block").addClass(n.errorMessageClass),l.appendTo(u)),l.html(i)}},o=function(t){return document.getElementById(t.attr("name")+"_err_msg")},r=function(e,i,n,s){var o=s.errorMessageTemplate.messages.replace(/\{errorTitle\}/g,i),r=[];t.each(n,function(t,e){r.push(s.errorMessageTemplate.field.replace(/\{msg\}/g,e))}),o=o.replace(/\{fields\}/g,r.join(""));var a=s.errorMessageTemplate.container.replace(/\{errorMessageClass\}/g,s.errorMessageClass);a=a.replace(/\{messages\}/g,o),e.children().eq(0).before(a)};t.fn.validateOnBlur=function(e,i){return this.find("input[data-validation],textarea[data-validation],select[data-validation]").bind("blur.validation",function(){t(this).validateInputOnBlur(e,i,!0,"blur")}),i.validateCheckboxRadioOnClick&&this.find("input[type=checkbox][data-validation],input[type=radio][data-validation]").bind("click.validation",function(){t(this).validateInputOnBlur(e,i,!0,"click")}),this},t.fn.validateOnEvent=function(e,i){return this.find("input[data-validation][data-validation-event],textarea[data-validation][data-validation-event],select[data-validation][data-validation-event]").each(function(){var n=t(this),s=n.valAttr("event");s&&n.bind(s+".validation",function(){t(this).validateInputOnBlur(e,i,!0,s)})}),this},t.fn.showHelpOnFocus=function(e){return e||(e="data-validation-help"),this.find(".has-help-txt").valAttr("has-keyup-event",!1).removeClass("has-help-txt"),this.find("textarea,input").each(function(){var i=t(this),n="jquery_form_help_"+(i.attr("name")||"").replace(/(:|\.|\[|\])/g,""),s=i.attr(e);s&&i.addClass("has-help-txt").unbind("focus.help").bind("focus.help",function(){var e=i.parent().find("."+n);0==e.length&&(e=t("<span />").addClass(n).addClass("help").addClass("help-block").text(s).hide(),i.after(e)),e.fadeIn()}).unbind("blur.help").bind("blur.help",function(){t(this).parent().find("."+n).fadeOut("slow")})}),this},t.fn.validateInputOnBlur=function(e,o,r,a){if(t.formUtils.eventType=a,(this.valAttr("suggestion-nr")||this.valAttr("postpone")||this.hasClass("hasDatepicker"))&&!window.postponedValidation){var l=this,u=this.valAttr("postpone")||200;return window.postponedValidation=function(){l.validateInputOnBlur(e,o,r,a),window.postponedValidation=!1},setTimeout(function(){window.postponedValidation&&window.postponedValidation()},u),this}e=t.extend({},t.formUtils.LANG,e||{}),n(this,o);var c=this,h=c.closest("form"),d=(c.attr(o.validationRuleAttribute),t.formUtils.validateInput(c,e,t.extend({},o,{errorMessagePosition:"element"}),h,a));return d===!0?c.addClass("valid").parent().addClass(o.inputParentClassOnSuccess):null!==d&&(i(c,o),s(c,d,o,o.errorMessagePosition),r&&c.unbind("keyup.validation").bind("keyup.validation",function(){t(this).validateInputOnBlur(e,o,!1,"keyup")})),this},t.fn.valAttr=function(t,e){return void 0===e?this.attr("data-validation-"+t):e===!1||null===e?this.removeAttr("data-validation-"+t):(t.length>0&&(t="-"+t),this.attr("data-validation"+t,e))},t.fn.isValid=function(o,a,l){if(t.formUtils.isLoadingModules){var u=this;return setTimeout(function(){u.isValid(o,a,l)},200),null}a=t.extend({},t.formUtils.defaultConfig(),a||{}),o=t.extend({},t.formUtils.LANG,o||{}),l=l!==!1,t.formUtils.errorDisplayPreventedWhenHalted&&(delete t.formUtils.errorDisplayPreventedWhenHalted,l=!1),t.formUtils.isValidatingEntireForm=!0,t.formUtils.haltValidation=!1;var c=function(e,n){t.inArray(e,d)<0&&d.push(e),p.push(n),n.attr("current-error",e),l&&i(n,a)},h=[],d=[],p=[],f=this,m=function(e,i){return"submit"===i||"button"===i||"reset"==i?!0:t.inArray(e,a.ignore||[])>-1};if(l&&(f.find("."+a.errorMessageClass+".alert").remove(),n(f.find("."+a.errorElementClass+",.valid"),a)),f.find("input,textarea,select").filter(':not([type="submit"],[type="button"])').each(function(){var e=t(this),i=e.attr("type"),n="radio"==i||"checkbox"==i,s=e.attr("name");if(!m(s,i)&&(!n||t.inArray(s,h)<0)){n&&h.push(s);var r=t.formUtils.validateInput(e,o,a,f,"submit");null!=r&&(r!==!0?c(r,e):e.valAttr("current-error",!1).addClass("valid").parent().addClass("has-success"))}}),"function"==typeof a.onValidate){var g=a.onValidate(f);t.isArray(g)?t.each(g,function(t,e){c(e.message,e.element)}):g&&g.element&&g.message&&c(g.message,g.element)}return t.formUtils.isValidatingEntireForm=!1,!t.formUtils.haltValidation&&p.length>0?(l&&("top"===a.errorMessagePosition?r(f,o.errorTitle,d,a):"custom"===a.errorMessagePosition?"function"==typeof a.errorMessageCustom&&a.errorMessageCustom(f,o.errorTitle,d,a):t.each(p,function(t,e){s(e,e.attr("current-error"),a,a.errorMessagePosition)}),a.scrollToTopOnError&&e.scrollTop(f.offset().top-20)),!1):(!l&&t.formUtils.haltValidation&&(t.formUtils.errorDisplayPreventedWhenHalted=!0),!t.formUtils.haltValidation)},t.fn.validateForm=function(t,e){return window.console&&"function"==typeof window.console.warn&&window.console.warn("Use of deprecated function $.validateForm, use $.isValid instead"),this.isValid(t,e,!0)},t.fn.restrictLength=function(e){return new t.formUtils.lengthRestriction(this,e),this},t.fn.addSuggestions=function(e){var i=!1;return this.find("input").each(function(){var n=t(this);i=t.split(n.attr("data-suggestions")),i.length>0&&!n.hasClass("has-suggestions")&&(t.formUtils.suggest(n,i,e),n.addClass("has-suggestions"))}),this},t.split=function(e,i){if("function"!=typeof i){if(!e)return[];var n=[];return t.each(e.split(i?i:/[,|-\s]\s*/g),function(e,i){i=t.trim(i),i.length&&n.push(i)}),n}e&&t.each(e.split(/[,|-\s]\s*/g),function(e,n){return n=t.trim(n),n.length?i(n,e):void 0})},t.validate=function(i){var s=t.extend(t.formUtils.defaultConfig(),{form:"form",validateOnEvent:!0,validateOnBlur:!0,validateCheckboxRadioOnClick:!0,showHelpOnFocus:!0,addSuggestions:!0,modules:"",onModulesLoaded:null,language:!1,onSuccess:!1,onError:!1,onElementValidate:!1});i=t.extend(s,i||{}),t(i.form).each(function(s,o){var r=t(o);e.trigger("formValidationSetup",[r]),r.find(".has-help-txt").unbind("focus.validation").unbind("blur.validation"),r.removeClass("has-validation-callback").unbind("submit.validation").unbind("reset.validation").find("input[data-validation],textarea[data-validation]").unbind("blur.validation"),r.bind("submit.validation",function(){var e=t(this);if(t.formUtils.haltValidation)return!1;if(t.formUtils.isLoadingModules)return setTimeout(function(){e.trigger("submit.validation")},200),!1;var n=e.isValid(i.language,i);if(t.formUtils.haltValidation)return!1;if(!n||"function"!=typeof i.onSuccess)return n||"function"!=typeof i.onError?n:(i.onError(e),!1);var s=i.onSuccess(e);return s===!1?!1:void 0}).bind("reset.validation",function(){t(this).find("."+i.errorMessageClass+".alert").remove(),n(t(this).find("."+i.errorElementClass+",.valid"),i)}).addClass("has-validation-callback"),i.showHelpOnFocus&&r.showHelpOnFocus(),i.addSuggestions&&r.addSuggestions(),i.validateOnBlur&&(r.validateOnBlur(i.language,i),r.bind("html5ValidationAttrsFound",function(){r.validateOnBlur(i.language,i)})),i.validateOnEvent&&r.validateOnEvent(i.language,i)}),""!=i.modules&&("function"==typeof i.onModulesLoaded&&e.one("validatorsLoaded",i.onModulesLoaded),t.formUtils.loadModules(i.modules))},t.formUtils={defaultConfig:function(){return{ignore:[],errorElementClass:"error",borderColorOnError:"red",errorMessageClass:"form-error",validationRuleAttribute:"data-validation",validationErrorMsgAttribute:"data-validation-error-msg",errorMessagePosition:"element",errorMessageTemplate:{container:'<div class="{errorMessageClass} alert alert-danger">{messages}</div>',messages:"<strong>{errorTitle}</strong><ul>{fields}</ul>",field:"<li>{msg}</li>"},errorMessageCustom:r,scrollToTopOnError:!0,dateFormat:"yyyy-mm-dd",addValidClassOnAll:!1,decimalSeparator:".",inputParentClassOnError:"has-error",inputParentClassOnSuccess:"has-success"}},validators:{},_events:{load:[],valid:[],invalid:[]},haltValidation:!1,isValidatingEntireForm:!1,addValidator:function(t){var e=0===t.name.indexOf("validate_")?t.name:"validate_"+t.name;void 0===t.validateOnKeyUp&&(t.validateOnKeyUp=!0),this.validators[e]=t},isLoadingModules:!1,loadedModules:{},loadModules:function(i,n,s){if(void 0===s&&(s=!0),t.formUtils.isLoadingModules)return void setTimeout(function(){t.formUtils.loadModules(i,n,s)});var o=!1,r=function(i,n){var r=t.split(i),a=r.length,l=function(){a--,0==a&&(t.formUtils.isLoadingModules=!1,s&&o&&e.trigger("validatorsLoaded"))};a>0&&(t.formUtils.isLoadingModules=!0);var u="?__="+(new Date).getTime(),c=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0];t.each(r,function(e,i){if(i=t.trim(i),0==i.length)l();else{var s=n+i+(".js"==i.substr(-3)?"":".js"),r=document.createElement("SCRIPT");s in t.formUtils.loadedModules?l():(t.formUtils.loadedModules[s]=1,o=!0,r.type="text/javascript",r.onload=l,r.src=s+(".dev.js"==s.substr(-7)?u:""),r.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||(l(),this.onload=null,this.onreadystatechange=null)},c.appendChild(r))}})};if(n)r(i,n);else{var a=function(){var e=!1;return t('script[src*="form-validator"]').each(function(){return e=this.src.substr(0,this.src.lastIndexOf("/"))+"/","/"==e&&(e=""),!1}),e!==!1?(r(i,e),!0):!1};a()||t(a)}},validateInput:function(e,i,n,s,o){if(e.attr("disabled"))return null;e.trigger("beforeValidation");var r=e.val()||"",a=e.valAttr("optional"),l=!1,u=!1,c=!1,h=e.valAttr("if-checked");if(null!=h&&(l=!0,c=s.find('input[name="'+h+'"]'),c.prop("checked")&&(u=!0)),!r&&"true"===a||l&&!u)return n.addValidClassOnAll?!0:null;var d=e.attr(n.validationRuleAttribute),p=!0;if(!d)return n.addValidClassOnAll?!0:null;t.split(d,function(a){0!==a.indexOf("validate_")&&(a="validate_"+a);var l=t.formUtils.validators[a];if(!l||"function"!=typeof l.validatorFunction)throw new Error('Using undefined validator "'+a+'"');"validate_checkbox_group"==a&&(e=t("[name='"+e.attr("name")+"']:eq(0)"));var u=null;return("keyup"!=o||l.validateOnKeyUp)&&(u=l.validatorFunction(r,e,n,i,s)),u?void 0:(p=null,null!==u&&(p=e.attr(n.validationErrorMsgAttribute+"-"+a.replace("validate_","")),p||(p=e.attr(n.validationErrorMsgAttribute),p||(p=i[l.errorMessageKey],p||(p=l.errorMessage)))),!1)}," ");var f;return"string"==typeof p?(e.trigger("validation",!1),f=p):null!==p||n.addValidClassOnAll?(e.trigger("validation",!0),f=!0):f=null,"function"==typeof n.onElementValidate&&null!==f&&n.onElementValidate(f===!0,e,s,p),f},parseDate:function(e,i){var n,s,o,r,a=i.replace(/[a-zA-Z]/gi,"").substring(0,1),l="^",u=i.split(a||null);if(t.each(u,function(t,e){l+=(t>0?"\\"+a:"")+"(\\d{"+e.length+"})"}),l+="$",n=e.match(new RegExp(l)),null===n)return!1;var c=function(e,i,n){for(var s=0;s<i.length;s++)if(i[s].substring(0,1)===e)return t.formUtils.parseDateInt(n[s+1]);return-1};return o=c("m",u,n),s=c("d",u,n),r=c("y",u,n),2===o&&s>28&&(r%4!==0||r%100===0&&r%400!==0)||2===o&&s>29&&(r%4===0||r%100!==0&&r%400===0)||o>12||0===o?!1:this.isShortMonth(o)&&s>30||!this.isShortMonth(o)&&s>31||0===s?!1:[r,o,s]},parseDateInt:function(t){return 0===t.indexOf("0")&&(t=t.replace("0","")),parseInt(t,10)},isShortMonth:function(t){return t%2===0&&7>t||t%2!==0&&t>7},lengthRestriction:function(e,i){var n=parseInt(i.text(),10),s=0,o=function(){var t=e.val().length;if(t>n){var o=e.scrollTop();e.val(e.val().substring(0,n)),e.scrollTop(o)}s=n-t,0>s&&(s=0),i.text(s)};t(e).bind("keydown keyup keypress focus blur",o).bind("cut paste",function(){setTimeout(o,100)}),t(document).bind("ready",o)},numericRangeCheck:function(e,i){var n=t.split(i),s=parseInt(i.substr(3),10);return 2==n.length&&(e<parseInt(n[0],10)||e>parseInt(n[1],10))?["out",n[0],n[1]]:0===i.indexOf("min")&&s>e?["min",s]:0===i.indexOf("max")&&e>s?["max",s]:["ok"]},_numSuggestionElements:0,_selectedSuggestion:null,_previousTypedVal:null,suggest:function(i,n,s){var o={css:{maxHeight:"150px",background:"#FFF",lineHeight:"150%",textDecoration:"underline",overflowX:"hidden",overflowY:"auto",border:"#CCC solid 1px",borderTop:"none",cursor:"pointer"},activeSuggestionCSS:{background:"#E9E9E9"}},r=function(t,e){var i=e.offset();t.css({width:e.outerWidth(),left:i.left+"px",top:i.top+e.outerHeight()+"px"})};s&&t.extend(o,s),o.css.position="absolute",o.css["z-index"]=9999,i.attr("autocomplete","off"),0===this._numSuggestionElements&&e.bind("resize",function(){t(".jquery-form-suggestions").each(function(){var e=t(this),i=e.attr("data-suggest-container");r(e,t(".suggestions-"+i).eq(0))})}),this._numSuggestionElements++;var a=function(e){var i=e.valAttr("suggestion-nr");t.formUtils._selectedSuggestion=null,t.formUtils._previousTypedVal=null,t(".jquery-form-suggestion-"+i).fadeOut("fast")};return i.data("suggestions",n).valAttr("suggestion-nr",this._numSuggestionElements).unbind("focus.suggest").bind("focus.suggest",function(){t(this).trigger("keyup"),t.formUtils._selectedSuggestion=null}).unbind("keyup.suggest").bind("keyup.suggest",function(){var e=t(this),n=[],s=t.trim(e.val()).toLocaleLowerCase();if(s!=t.formUtils._previousTypedVal){t.formUtils._previousTypedVal=s;var l=!1,u=e.valAttr("suggestion-nr"),c=t(".jquery-form-suggestion-"+u);if(c.scrollTop(0),""!=s){var h=s.length>2;t.each(e.data("suggestions"),function(t,e){var i=e.toLocaleLowerCase();return i==s?(n.push("<strong>"+e+"</strong>"),l=!0,!1):void((0===i.indexOf(s)||h&&i.indexOf(s)>-1)&&n.push(e.replace(new RegExp(s,"gi"),"<strong>$&</strong>")))})}l||0==n.length&&c.length>0?c.hide():n.length>0&&0==c.length?(c=t("<div></div>").css(o.css).appendTo("body"),i.addClass("suggestions-"+u),c.attr("data-suggest-container",u).addClass("jquery-form-suggestions").addClass("jquery-form-suggestion-"+u)):n.length>0&&!c.is(":visible")&&c.show(),n.length>0&&s.length!=n[0].length&&(r(c,e),c.html(""),t.each(n,function(i,n){t("<div></div>").append(n).css({overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",padding:"5px"}).addClass("form-suggest-element").appendTo(c).click(function(){e.focus(),e.val(t(this).text()),a(e)})}))}}).unbind("keydown.validation").bind("keydown.validation",function(e){var i,n,s=e.keyCode?e.keyCode:e.which,r=t(this);if(13==s&&null!==t.formUtils._selectedSuggestion){if(i=r.valAttr("suggestion-nr"),n=t(".jquery-form-suggestion-"+i),n.length>0){var l=n.find("div").eq(t.formUtils._selectedSuggestion).text();r.val(l),a(r),e.preventDefault()}}else{i=r.valAttr("suggestion-nr"),n=t(".jquery-form-suggestion-"+i);var u=n.children();if(u.length>0&&t.inArray(s,[38,40])>-1){38==s?(null===t.formUtils._selectedSuggestion?t.formUtils._selectedSuggestion=u.length-1:t.formUtils._selectedSuggestion--,t.formUtils._selectedSuggestion<0&&(t.formUtils._selectedSuggestion=u.length-1)):40==s&&(null===t.formUtils._selectedSuggestion?t.formUtils._selectedSuggestion=0:t.formUtils._selectedSuggestion++,t.formUtils._selectedSuggestion>u.length-1&&(t.formUtils._selectedSuggestion=0));var c=n.innerHeight(),h=n.scrollTop(),d=n.children().eq(0).outerHeight(),p=d*t.formUtils._selectedSuggestion;return(h>p||p>h+c)&&n.scrollTop(p),u.removeClass("active-suggestion").css("background","none").eq(t.formUtils._selectedSuggestion).addClass("active-suggestion").css(o.activeSuggestionCSS),e.preventDefault(),!1}}}).unbind("blur.suggest").bind("blur.suggest",function(){a(t(this))}),i},LANG:{errorTitle:"Form submission failed!",requiredFields:"You have not answered all required fields",badTime:"You have not given a correct time",badEmail:"You have not given a correct e-mail address",badTelephone:"You have not given a correct phone number",badSecurityAnswer:"You have not given a correct answer to the security question",badDate:"You have not given a correct date",lengthBadStart:"The input value must be between ",lengthBadEnd:" characters",lengthTooLongStart:"The input value is longer than ",lengthTooShortStart:"The input value is shorter than ",notConfirmed:"Input values could not be confirmed",badDomain:"Incorrect domain value",badUrl:"The input value is not a correct URL",badCustomVal:"The input value is incorrect",badInt:"The input value was not a correct number",badSecurityNumber:"Your social security number was incorrect",badUKVatAnswer:"Incorrect UK VAT Number",badStrength:"The password isn't strong enough",badNumberOfSelectedOptionsStart:"You have to choose at least ",badNumberOfSelectedOptionsEnd:" answers",badAlphaNumeric:"The input value can only contain alphanumeric characters ",badAlphaNumericExtra:" and ",wrongFileSize:"The file you are trying to upload is too large (max %s)",wrongFileType:"Only files of type %s is allowed",groupCheckedRangeStart:"Please choose between ",groupCheckedTooFewStart:"Please choose at least ",groupCheckedTooManyStart:"Please choose a maximum of ",groupCheckedEnd:" item(s)",badCreditCard:"The credit card number is not correct",badCVV:"The CVV number was not correct"}},t.formUtils.addValidator({name:"email",validatorFunction:function(e){var i=e.toLowerCase().split("@");return 2==i.length?t.formUtils.validators.validate_domain.validatorFunction(i[1])&&!/[^\w\+\.\-]/.test(i[0])&&i[0].length>0:!1},errorMessage:"",errorMessageKey:"badEmail"}),t.formUtils.addValidator({name:"domain",validatorFunction:function(t){return t.length>0&&t.length<=253&&!/[^a-zA-Z0-9]/.test(t.substr(-2))&&!/[^a-zA-Z]/.test(t.substr(0,1))&&!/[^a-zA-Z0-9\.\-]/.test(t)&&1==t.split("..").length&&t.split(".").length>1},errorMessage:"",errorMessageKey:"badDomain"}),t.formUtils.addValidator({name:"required",validatorFunction:function(e,i,n,s,o){switch(i.attr("type")){case"checkbox":return i.is(":checked");case"radio":return o.find('input[name="'+i.attr("name")+'"]').filter(":checked").length>0;default:return""!==t.trim(e)}},errorMessage:"",errorMessageKey:"requiredFields"}),t.formUtils.addValidator({name:"length",validatorFunction:function(e,i,n,s){var o=i.valAttr("length"),r=i.attr("type");if(void 0==o)return alert('Please add attribute "data-validation-length" to '+i[0].nodeName+" named "+i.attr("name")),!0;var a,l="file"==r&&void 0!==i.get(0).files?i.get(0).files.length:e.length,u=t.formUtils.numericRangeCheck(l,o);switch(u[0]){case"out":this.errorMessage=s.lengthBadStart+o+s.lengthBadEnd,a=!1;break;case"min":this.errorMessage=s.lengthTooShortStart+u[1]+s.lengthBadEnd,a=!1;break;case"max":this.errorMessage=s.lengthTooLongStart+u[1]+s.lengthBadEnd,a=!1;break;default:a=!0}return a},errorMessage:"",errorMessageKey:""}),t.formUtils.addValidator({name:"url",validatorFunction:function(e){var i=/^(https?|ftp):\/\/((((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|\[|\]|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;if(i.test(e)){var n=e.split("://")[1],s=n.indexOf("/");return s>-1&&(n=n.substr(0,s)),t.formUtils.validators.validate_domain.validatorFunction(n)}return!1},errorMessage:"",errorMessageKey:"badUrl"}),t.formUtils.addValidator({name:"number",validatorFunction:function(t,e,i){if(""!==t){var n,s,o=e.valAttr("allowing")||"",r=e.valAttr("decimal-separator")||i.decimalSeparator,a=!1,l=e.valAttr("step")||"",u=!1;if(-1==o.indexOf("number")&&(o+=",number"),o.indexOf("negative")>-1&&0===t.indexOf("-")&&(t=t.substr(1)),o.indexOf("range")>-1&&(n=parseFloat(o.substring(o.indexOf("[")+1,o.indexOf(";"))),s=parseFloat(o.substring(o.indexOf(";")+1,o.indexOf("]"))),a=!0),""!=l&&(u=!0),","==r){if(t.indexOf(".")>-1)return!1;t=t.replace(",",".")}if(o.indexOf("number")>-1&&""===t.replace(/[0-9]/g,"")&&(!a||t>=n&&s>=t)&&(!u||t%l==0))return!0;if(o.indexOf("float")>-1&&null!==t.match(new RegExp("^([0-9]+)\\.([0-9]+)$"))&&(!a||t>=n&&s>=t)&&(!u||t%l==0))return!0}return!1},errorMessage:"",errorMessageKey:"badInt"}),t.formUtils.addValidator({name:"alphanumeric",validatorFunction:function(t,e,i,n){var s="^([a-zA-Z0-9",o="]+)$",r=e.valAttr("allowing"),a="";if(r){a=s+r+o;var l=r.replace(/\\/g,"");l.indexOf(" ")>-1&&(l=l.replace(" ",""),l+=" and spaces "),this.errorMessage=n.badAlphaNumeric+n.badAlphaNumericExtra+l}else a=s+o,this.errorMessage=n.badAlphaNumeric;return new RegExp(a).test(t)},errorMessage:"",errorMessageKey:""}),t.formUtils.addValidator({name:"custom",validatorFunction:function(t,e){var i=new RegExp(e.valAttr("regexp"));return i.test(t)},errorMessage:"",errorMessageKey:"badCustomVal"}),t.formUtils.addValidator({name:"date",validatorFunction:function(e,i,n){var s=i.valAttr("format")||n.dateFormat||"yyyy-mm-dd";return t.formUtils.parseDate(e,s)!==!1},errorMessage:"",errorMessageKey:"badDate"}),t.formUtils.addValidator({name:"checkbox_group",validatorFunction:function(e,i,n,s,o){var r=!0,a=i.attr("name"),l=t("input[type=checkbox][name^='"+a+"']:checked",o).length,u=i.valAttr("qty");if(void 0==u){var c=i.get(0).nodeName;alert('Attribute "data-validation-qty" is missing from '+c+" named "+i.attr("name"))}var h=t.formUtils.numericRangeCheck(l,u);switch(h[0]){case"out":this.errorMessage=s.groupCheckedRangeStart+u+s.groupCheckedEnd,r=!1;break;case"min":this.errorMessage=s.groupCheckedTooFewStart+h[1]+s.groupCheckedEnd,r=!1;break;case"max":this.errorMessage=s.groupCheckedTooManyStart+h[1]+s.groupCheckedEnd,r=!1;break;default:r=!0}return r}})}(jQuery),/**
 * jquery.purr.js
 * Copyright (c) 2008 Net Perspective (net-perspective.com)
 * Licensed under the MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * @author R.A. Ray
 * @projectDescription  jQuery plugin for dynamically displaying unobtrusive messages in the browser. Mimics the behavior of the MacOS program "Growl."
 * @version 0.1.0
 *
 * @requires jquery.js (tested with 1.2.6)
 *
 * @param fadeInSpeed           int - Duration of fade in animation in miliseconds
 *                          default: 500
 *  @param fadeOutSpeed         int - Duration of fade out animationin miliseconds
                            default: 500
 *  @param removeTimer          int - Timeout, in miliseconds, before notice is removed once it is the top non-sticky notice in the list
                            default: 4000
 *  @param isSticky             bool - Whether the notice should fade out on its own or wait to be manually closed
                            default: false
 *  @param usingTransparentPNG  bool - Whether or not the notice is using transparent .png images in its styling
                            default: false
 */
function(t){t.purr=function(e,i){function n(){var n=document.createElement("a");if(t(n).attr({"class":"close",href:"#close"}).appendTo(e).click(function(){return s(),!1}),t(document).keyup(function(t){27===t.keyCode&&s()}),e.appendTo(o).hide(),e.fadeIn(i.fadeInSpeed),!i.isSticky)var r=setInterval(function(){0===e.prevAll(".purr").length&&(clearInterval(r),setTimeout(function(){s()},i.removeTimer))},200)}function s(){e.animate({opacity:"0"},{duration:i.fadeOutSpeed,complete:function(){e.animate({height:"0px"},{duration:i.fadeOutSpeed,complete:function(){e.remove()}})}})}e=t(e),e.addClass("purr");var o=document.getElementById("purr-container");o||(o='<div id="purr-container"></div>'),o=t(o),t("body").append(o),n()},t.fn.purr=function(e){return e=e||{},e.fadeInSpeed=e.fadeInSpeed||500,e.fadeOutSpeed=e.fadeOutSpeed||500,e.removeTimer=e.removeTimer||4e3,e.isSticky=e.isSticky||!1,e.usingTransparentPNG=e.usingTransparentPNG||!1,this.each(function(){new t.purr(this,e)}),this}}(jQuery),/*!
	Autosize v1.18.9 - 2014-05-27
	Automatically adjust textarea height based on user input.
	(c) 2014 Jack Moore - http://www.jacklmoore.com/autosize
	license: http://www.opensource.org/licenses/mit-license.php
*/
function(t){"use strict";var e,i={className:"autosizejs",id:"autosizejs",append:"\n",callback:!1,resizeDelay:10,placeholder:!0},n='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',s=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],o=t(n).data("autosize",!0)[0];o.style.lineHeight="99px","99px"===t(o).css("lineHeight")&&s.push("lineHeight"),o.style.lineHeight="",t.fn.autosize=function(n){return this.length?(n=t.extend({},i,n||{}),o.parentNode!==document.body&&t(document.body).append(o),this.each(function(){function i(){var e,i=window.getComputedStyle?window.getComputedStyle(d,null):!1;i?(e=d.getBoundingClientRect().width,0!==e&&"number"==typeof e||(e=parseInt(i.width,10)),t.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(t,n){e-=parseInt(i[n],10)})):e=p.width(),o.style.width=Math.max(e,0)+"px"}function r(){var r={};if(e=d,o.className=n.className,o.id=n.id,u=parseInt(p.css("maxHeight"),10),t.each(s,function(t,e){r[e]=p.css(e)}),t(o).css(r).attr("wrap",p.attr("wrap")),i(),window.chrome){var a=d.style.width;d.style.width="0px";d.offsetWidth;d.style.width=a}}function a(){var t,s;e!==d?r():i(),!d.value&&n.placeholder?o.value=(p.attr("placeholder")||"")+n.append:o.value=d.value+n.append,o.style.overflowY=d.style.overflowY,s=parseInt(d.style.height,10),o.scrollTop=0,o.scrollTop=9e4,t=o.scrollTop,u&&t>u?(d.style.overflowY="scroll",t=u):(d.style.overflowY="hidden",c>t&&(t=c)),t+=f,s!==t&&(d.style.height=t+"px",m&&n.callback.call(d,d))}function l(){clearTimeout(h),h=setTimeout(function(){var t=p.width();t!==v&&(v=t,a())},parseInt(n.resizeDelay,10))}var u,c,h,d=this,p=t(d),f=0,m=t.isFunction(n.callback),g={height:d.style.height,overflow:d.style.overflow,overflowY:d.style.overflowY,wordWrap:d.style.wordWrap,resize:d.style.resize},v=p.width(),y=p.css("resize");p.data("autosize")||(p.data("autosize",!0),"border-box"!==p.css("box-sizing")&&"border-box"!==p.css("-moz-box-sizing")&&"border-box"!==p.css("-webkit-box-sizing")||(f=p.outerHeight()-p.height()),c=Math.max(parseInt(p.css("minHeight"),10)-f||0,p.height()),p.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word"}),"vertical"===y?p.css("resize","none"):"both"===y&&p.css("resize","horizontal"),"onpropertychange"in d?"oninput"in d?p.on("input.autosize keyup.autosize",a):p.on("propertychange.autosize",function(){"value"===event.propertyName&&a()}):p.on("input.autosize",a),n.resizeDelay!==!1&&t(window).on("resize.autosize",l),p.on("autosize.resize",a),p.on("autosize.resizeIncludeStyle",function(){e=null,a()}),p.on("autosize.destroy",function(){e=null,clearTimeout(h),t(window).off("resize",l),p.off("autosize").off(".autosize").css(g).removeData("autosize")}),a())})):this}}(window.jQuery||window.$),BestInPlaceEditor.prototype={activate:function(){"use strict";var t;if(this.isPlaceHolder())t="";else if(this.original_content)t=this.original_content;else switch(this.formType){case"input":case"textarea":if(this.display_raw)t=this.element.html().replace(/&amp;/gi,"&");else{var e=this.element.data("bipValue");t="undefined"==typeof e?"":"string"==typeof e?this.element.data("bipValue").replace(/&amp;/gi,"&"):this.element.data("bipValue")}break;case"select":t=this.element.html()}this.oldValue=this.isPlaceHolder()?"":this.element.html(),this.display_value=t,jQuery(this.activator).unbind("click",this.clickHandler),this.activateForm(),this.element.trigger(jQuery.Event("best_in_place:activate"))},abort:function(){"use strict";this.activateText(this.oldValue),jQuery(this.activator).bind("click",{editor:this},this.clickHandler),this.element.trigger(jQuery.Event("best_in_place:abort")),this.element.trigger(jQuery.Event("best_in_place:deactivate"))},abortIfConfirm:function(){"use strict";return this.useConfirm?void(confirm(BestInPlaceEditor.defaults.locales[""].confirmMessage)&&this.abort()):void this.abort()},update:function(){"use strict";var t=this,e=this.getValue();if(this.formType in{input:1,textarea:1}&&e===this.oldValue)return this.abort(),!0;switch(t.ajax({type:BestInPlaceEditor.defaults.ajaxMethod,dataType:BestInPlaceEditor.defaults.ajaxDataType,data:t.requestData(),success:function(e,i,n){t.loadSuccessCallback(e,i,n)},error:function(e,i){t.loadErrorCallback(e,i)}}),this.formType){case"select":this.previousCollectionValue=e,$.each(this.values,function(i,n){String(n[0])===String(e)&&t.element.html(n[1])});break;case"checkbox":$.each(this.values,function(i,n){String(n[0])===String(e)&&t.element.html(n[1])});break;default:""!==e?this.display_raw?t.element.html(e):t.element.text(e):t.element.html(this.placeHolder)}t.element.data("bipValue",e),t.element.attr("data-bip-value",e),t.element.trigger(jQuery.Event("best_in_place:update"))},activateForm:function(){"use strict";alert(BestInPlaceEditor.defaults.locales[""].uninitializedForm)},activateText:function(t){"use strict";this.element.html(t),this.isPlaceHolder()&&this.element.html(this.placeHolder)},initOptions:function(){"use strict";var t=this;t.element.parents().each(function(){var e=jQuery(this);t.url=t.url||e.data("bipUrl"),t.activator=t.activator||e.data("bipActivator"),t.okButton=t.okButton||e.data("bipOkButton"),t.okButtonClass=t.okButtonClass||e.data("bipOkButtonClass"),t.cancelButton=t.cancelButton||e.data("bipCancelButton"),t.cancelButtonClass=t.cancelButtonClass||e.data("bipCancelButtonClass"),t.skipBlur=t.skipBlur||e.data("bipSkipBlur")}),t.url=t.element.data("bipUrl")||t.url||document.location.pathname,t.collection=t.element.data("bipCollection")||t.collection,t.formType=t.element.data("bipType")||"input",t.objectName=t.element.data("bipObject")||t.objectName,t.attributeName=t.element.data("bipAttribute")||t.attributeName,t.activator=t.element.data("bipActivator")||t.element,t.okButton=t.element.data("bipOkButton")||t.okButton,t.okButtonClass=t.element.data("bipOkButtonClass")||t.okButtonClass||BestInPlaceEditor.defaults.okButtonClass,t.cancelButton=t.element.data("bipCancelButton")||t.cancelButton,t.cancelButtonClass=t.element.data("bipCancelButtonClass")||t.cancelButtonClass||BestInPlaceEditor.defaults.cancelButtonClass,t.skipBlur=t.element.data("bipSkipBlur")||t.skipBlur||BestInPlaceEditor.defaults.skipBlur,null==t.element.data("bipPlaceholder")?t.placeHolder=BestInPlaceEditor.defaults.locales[""].placeHolder:t.placeHolder=t.element.data("bipPlaceholder"),t.inner_class=t.element.data("bipInnerClass"),t.html_attrs=t.element.data("bipHtmlAttrs"),t.original_content=t.element.data("bipOriginalContent")||t.original_content,t.display_raw=t.element.data("bip-raw"),t.useConfirm=t.element.data("bip-confirm"),"select"!==t.formType&&"checkbox"!==t.formType||(t.values=t.collection,t.collectionValue=t.element.data("bipValue")||t.collectionValue)},bindForm:function(){"use strict";this.activateForm=BestInPlaceEditor.forms[this.formType].activateForm,this.getValue=BestInPlaceEditor.forms[this.formType].getValue},initPlaceHolder:function(){"use strict";""===this.element.html()&&(this.element.addClass("bip-placeholder"),this.element.html(this.placeHolder))},isPlaceHolder:function(){"use strict";return""===this.element.html()||this.element.html()===this.placeHolder},getValue:function(){"use strict";alert(BestInPlaceEditor.defaults.locales[""].uninitializedForm)},sanitizeValue:function(t){"use strict";return jQuery.trim(t)},requestData:function(){"use strict";var t=jQuery("meta[name=csrf-token]").attr("content"),e=jQuery("meta[name=csrf-param]").attr("content"),i="_method="+BestInPlaceEditor.defaults.ajaxMethod;return i+="&"+this.objectName+"["+this.attributeName+"]="+encodeURIComponent(this.getValue()),void 0!==e&&void 0!==t&&(i+="&"+e+"="+encodeURIComponent(t)),i},ajax:function(t){"use strict";return t.url=this.url,t.beforeSend=function(t){t.setRequestHeader("Accept","application/json")},jQuery.ajax(t)},loadSuccessCallback:function(t,e,i){"use strict";if(t=jQuery.trim(t),this.display_raw?this.original_content=this.element.html():this.original_content=this.element.text(),t&&""!==t){var n=jQuery.parseJSON(t);null!==n&&n.hasOwnProperty("display_as")&&(this.element.data("bip-original-content",this.element.text()),this.element.html(n.display_as))}this.element.toggleClass("bip-placeholder",this.isPlaceHolder()),this.element.trigger(jQuery.Event("best_in_place:success"),[t,e,i]),this.element.trigger(jQuery.Event("ajax:success"),[t,e,i]),jQuery(this.activator).bind("click",{editor:this},this.clickHandler),this.element.trigger(jQuery.Event("best_in_place:deactivate")),null!==this.collectionValue&&"select"===this.formType&&(this.collectionValue=this.previousCollectionValue,this.previousCollectionValue=null)},loadErrorCallback:function(t,e){"use strict";this.activateText(this.oldValue),this.element.trigger(jQuery.Event("best_in_place:error"),[t,e]),this.element.trigger(jQuery.Event("ajax:error"),t,e),jQuery(this.activator).bind("click",{editor:this},this.clickHandler),this.element.trigger(jQuery.Event("best_in_place:deactivate"))},clickHandler:function(t){"use strict";t.preventDefault(),t.data.editor.activate()},setHtmlAttributes:function(){"use strict";var t=this.element.find(this.formType);if(this.html_attrs){var e=this.html_attrs;$.each(e,function(e,i){t.attr(e,i)})}},placeButtons:function(t,e){"use strict";e.okButton&&t.append(jQuery(document.createElement("input")).attr("type","submit").attr("class",e.okButtonClass).attr("value",e.okButton)),e.cancelButton&&t.append(jQuery(document.createElement("input")).attr("type","button").attr("class",e.cancelButtonClass).attr("value",e.cancelButton))}},BestInPlaceEditor.forms={input:{activateForm:function(){"use strict";var t=jQuery(document.createElement("form")).addClass("form_in_place").attr("action","javascript:void(0);").attr("style","display:inline"),e=jQuery(document.createElement("input")).attr("type","text").attr("name",this.attributeName).val(this.display_value);this.inner_class&&e.addClass(this.inner_class),t.append(e),this.placeButtons(t,this),this.element.html(t),this.setHtmlAttributes(),this.element.find("input[type='text']")[0].select(),this.element.find("form").bind("submit",{editor:this},BestInPlaceEditor.forms.input.submitHandler),this.cancelButton&&this.element.find("input[type='button']").bind("click",{editor:this},BestInPlaceEditor.forms.input.cancelButtonHandler),this.okButton||this.element.find("input[type='text']").bind("blur",{editor:this},BestInPlaceEditor.forms.input.inputBlurHandler),this.element.find("input[type='text']").bind("keyup",{editor:this},BestInPlaceEditor.forms.input.keyupHandler),this.blurTimer=null,this.userClicked=!1},getValue:function(){"use strict";return this.sanitizeValue(this.element.find("input").val())},inputBlurHandler:function(t){"use strict";t.data.editor.okButton?t.data.editor.blurTimer=setTimeout(function(){t.data.editor.userClicked||t.data.editor.abort()},500):t.data.editor.cancelButton?t.data.editor.blurTimer=setTimeout(function(){t.data.editor.userClicked||t.data.editor.update()},500):t.data.editor.update()},submitHandler:function(t){"use strict";t.data.editor.userClicked=!0,clearTimeout(t.data.editor.blurTimer),t.data.editor.update()},cancelButtonHandler:function(t){"use strict";t.data.editor.userClicked=!0,clearTimeout(t.data.editor.blurTimer),t.data.editor.abort(),t.stopPropagation()},keyupHandler:function(t){"use strict";27===t.keyCode&&(t.data.editor.abort(),t.stopImmediatePropagation())}},select:{activateForm:function(){"use strict";var t,e,i=jQuery(document.createElement("form")).attr("action","javascript:void(0)").attr("style","display:inline"),n=jQuery(document.createElement("select")).attr("class",null!==this.inner_class?this.inner_class:""),s=this.collectionValue,o=this.values;$.each(o,function(i,o){t=o[0],e=o[1];var r=jQuery(document.createElement("option")).val(t).html(e);String(t)===String(s)&&r.attr("selected","selected"),n.append(r)}),i.append(n),this.element.html(i),this.setHtmlAttributes(),this.element.find("select").bind("change",{editor:this},BestInPlaceEditor.forms.select.blurHandler),this.element.find("select").bind("blur",{editor:this},BestInPlaceEditor.forms.select.blurHandler),this.element.find("select").bind("keyup",{editor:this},BestInPlaceEditor.forms.select.keyupHandler),this.element.find("select")[0].focus();try{var r=document.createEvent("MouseEvents");r.initMouseEvent("mousedown",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),this.element.find("select")[0].dispatchEvent(r)}catch(r){}},getValue:function(){"use strict";return this.sanitizeValue(this.element.find("select").val())},blurHandler:function(t){"use strict";t.data.editor.update()},keyupHandler:function(t){"use strict";27===t.keyCode&&t.data.editor.abort()}},checkbox:{activateForm:function(){"use strict";this.collectionValue=!this.getValue(),this.setHtmlAttributes(),this.update()},getValue:function(){"use strict";return this.collectionValue}},textarea:{activateForm:function(){"use strict";var t=this.element.css("width"),e=this.element.css("height"),i=jQuery(document.createElement("form")).addClass("form_in_place").attr("action","javascript:void(0);").attr("style","display:inline"),n=jQuery(document.createElement("textarea")).attr("name",this.attributeName).val(this.sanitizeValue(this.display_value));null!==this.inner_class&&n.addClass(this.inner_class),i.append(n),this.placeButtons(i,this),this.element.html(i),this.setHtmlAttributes(),jQuery(this.element.find("textarea")[0]).css({"min-width":t,"min-height":e}),jQuery(this.element.find("textarea")[0]).autosize(),this.element.find("textarea")[0].focus(),this.element.find("form").bind("submit",{editor:this},BestInPlaceEditor.forms.textarea.submitHandler),this.cancelButton&&this.element.find("input[type='button']").bind("click",{editor:this},BestInPlaceEditor.forms.textarea.cancelButtonHandler),this.skipBlur||this.element.find("textarea").bind("blur",{editor:this},BestInPlaceEditor.forms.textarea.blurHandler),this.element.find("textarea").bind("keyup",{editor:this},BestInPlaceEditor.forms.textarea.keyupHandler),this.blurTimer=null,this.userClicked=!1},getValue:function(){"use strict";return this.sanitizeValue(this.element.find("textarea").val())},blurHandler:function(t){"use strict";t.data.editor.okButton?t.data.editor.blurTimer=setTimeout(function(){t.data.editor.userClicked||t.data.editor.abortIfConfirm()},500):t.data.editor.cancelButton?t.data.editor.blurTimer=setTimeout(function(){t.data.editor.userClicked||t.data.editor.update()},500):t.data.editor.update()},submitHandler:function(t){"use strict";t.data.editor.userClicked=!0,clearTimeout(t.data.editor.blurTimer),t.data.editor.update()},cancelButtonHandler:function(t){"use strict";t.data.editor.userClicked=!0,clearTimeout(t.data.editor.blurTimer),t.data.editor.abortIfConfirm(),t.stopPropagation()},keyupHandler:function(t){"use strict";27===t.keyCode&&t.data.editor.abortIfConfirm()}}},BestInPlaceEditor.defaults={locales:{},ajaxMethod:"put",ajaxDataType:"text",okButtonClass:"",cancelButtonClass:"",skipBlur:!1},BestInPlaceEditor.defaults.locales[""]={confirmMessage:"Are you sure you want to discard your changes?",uninitializedForm:"The form was not properly initialized. getValue is unbound",placeHolder:"-"},jQuery.fn.best_in_place=function(){"use strict";function t(t){return t.data("bestInPlaceEditor")?void 0:(t.data("bestInPlaceEditor",new BestInPlaceEditor(t)),!0)}return jQuery(this.context).delegate(this.selector,"click",function(){var e=jQuery(this);t(e)&&e.click()}),this.each(function(){t(jQuery(this))}),this},/*!
 * Select2 4.0.3
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){var e=function(){if(t&&t.fn&&t.fn.select2&&t.fn.select2.amd)var e=t.fn.select2.amd;var e;/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */
return function(){if(!e||!e.requirejs){e?i=e:e={};/**
 * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
var t,i,n;!function(e){function s(t,e){return _.call(t,e)}function o(t,e){var i,n,s,o,r,a,l,u,c,h,d,p=e&&e.split("/"),f=y.map,m=f&&f["*"]||{};if(t&&"."===t.charAt(0))if(e){for(t=t.split("/"),r=t.length-1,y.nodeIdCompat&&x.test(t[r])&&(t[r]=t[r].replace(x,"")),t=p.slice(0,p.length-1).concat(t),c=0;c<t.length;c+=1)if(d=t[c],"."===d)t.splice(c,1),c-=1;else if(".."===d){if(1===c&&(".."===t[2]||".."===t[0]))break;c>0&&(t.splice(c-1,2),c-=2)}t=t.join("/")}else 0===t.indexOf("./")&&(t=t.substring(2));if((p||m)&&f){for(i=t.split("/"),c=i.length;c>0;c-=1){if(n=i.slice(0,c).join("/"),p)for(h=p.length;h>0;h-=1)if(s=f[p.slice(0,h).join("/")],s&&(s=s[n])){o=s,a=c;break}if(o)break;!l&&m&&m[n]&&(l=m[n],u=c)}!o&&l&&(o=l,a=u),o&&(i.splice(0,a,o),t=i.join("/"))}return t}function r(t,i){return function(){var n=w.call(arguments,0);return"string"!=typeof n[0]&&1===n.length&&n.push(null),p.apply(e,n.concat([t,i]))}}function a(t){return function(e){return o(e,t)}}function l(t){return function(e){g[t]=e}}function u(t){if(s(v,t)){var i=v[t];delete v[t],b[t]=!0,d.apply(e,i)}if(!s(g,t)&&!s(b,t))throw new Error("No "+t);return g[t]}function c(t){var e,i=t?t.indexOf("!"):-1;return i>-1&&(e=t.substring(0,i),t=t.substring(i+1,t.length)),[e,t]}function h(t){return function(){return y&&y.config&&y.config[t]||{}}}var d,p,f,m,g={},v={},y={},b={},_=Object.prototype.hasOwnProperty,w=[].slice,x=/\.js$/;f=function(t,e){var i,n=c(t),s=n[0];return t=n[1],s&&(s=o(s,e),i=u(s)),s?t=i&&i.normalize?i.normalize(t,a(e)):o(t,e):(t=o(t,e),n=c(t),s=n[0],t=n[1],s&&(i=u(s))),{f:s?s+"!"+t:t,n:t,pr:s,p:i}},m={require:function(t){return r(t)},exports:function(t){var e=g[t];return"undefined"!=typeof e?e:g[t]={}},module:function(t){return{id:t,uri:"",exports:g[t],config:h(t)}}},d=function(t,i,n,o){var a,c,h,d,p,y,_=[],w=typeof n;if(o=o||t,"undefined"===w||"function"===w){for(i=!i.length&&n.length?["require","exports","module"]:i,p=0;p<i.length;p+=1)if(d=f(i[p],o),c=d.f,"require"===c)_[p]=m.require(t);else if("exports"===c)_[p]=m.exports(t),y=!0;else if("module"===c)a=_[p]=m.module(t);else if(s(g,c)||s(v,c)||s(b,c))_[p]=u(c);else{if(!d.p)throw new Error(t+" missing "+c);d.p.load(d.n,r(o,!0),l(c),{}),_[p]=g[c]}h=n?n.apply(g[t],_):void 0,t&&(a&&a.exports!==e&&a.exports!==g[t]?g[t]=a.exports:h===e&&y||(g[t]=h))}else t&&(g[t]=n)},t=i=p=function(t,i,n,s,o){if("string"==typeof t)return m[t]?m[t](i):u(f(t,i).f);if(!t.splice){if(y=t,y.deps&&p(y.deps,y.callback),!i)return;i.splice?(t=i,i=n,n=null):t=e}return i=i||function(){},"function"==typeof n&&(n=s,s=o),s?d(e,t,i,n):setTimeout(function(){d(e,t,i,n)},4),p},p.config=function(t){return p(t)},t._defined=g,n=function(t,e,i){if("string"!=typeof t)throw new Error("See almond README: incorrect module build, no module name");e.splice||(i=e,e=[]),s(g,t)||s(v,t)||(v[t]=[t,e,i])},n.amd={jQuery:!0}}(),e.requirejs=t,e.require=i,e.define=n}}(),e.define("almond",function(){}),e.define("jquery",[],function(){var e=t||$;return null==e&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),e}),e.define("select2/utils",["jquery"],function(t){function e(t){var e=t.prototype,i=[];for(var n in e){var s=e[n];"function"==typeof s&&"constructor"!==n&&i.push(n)}return i}var i={};i.Extend=function(t,e){function i(){this.constructor=t}var n={}.hasOwnProperty;for(var s in e)n.call(e,s)&&(t[s]=e[s]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},i.Decorate=function(t,i){function n(){var e=Array.prototype.unshift,n=i.prototype.constructor.length,s=t.prototype.constructor;n>0&&(e.call(arguments,t.prototype.constructor),s=i.prototype.constructor),s.apply(this,arguments)}function s(){this.constructor=n}var o=e(i),r=e(t);i.displayName=t.displayName,n.prototype=new s;for(var a=0;a<r.length;a++){var l=r[a];n.prototype[l]=t.prototype[l]}for(var u=(function(t){var e=function(){};t in n.prototype&&(e=n.prototype[t]);var s=i.prototype[t];return function(){var t=Array.prototype.unshift;return t.call(arguments,e),s.apply(this,arguments)}}),c=0;c<o.length;c++){var h=o[c];n.prototype[h]=u(h)}return n};var n=function(){this.listeners={}};return n.prototype.on=function(t,e){this.listeners=this.listeners||{},t in this.listeners?this.listeners[t].push(e):this.listeners[t]=[e]},n.prototype.trigger=function(t){var e=Array.prototype.slice,i=e.call(arguments,1);this.listeners=this.listeners||{},null==i&&(i=[]),0===i.length&&i.push({}),i[0]._type=t,t in this.listeners&&this.invoke(this.listeners[t],e.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},n.prototype.invoke=function(t,e){for(var i=0,n=t.length;n>i;i++)t[i].apply(this,e)},i.Observable=n,i.generateChars=function(t){for(var e="",i=0;t>i;i++){var n=Math.floor(36*Math.random());e+=n.toString(36)}return e},i.bind=function(t,e){return function(){t.apply(e,arguments)}},i._convertData=function(t){for(var e in t){var i=e.split("-"),n=t;if(1!==i.length){for(var s=0;s<i.length;s++){var o=i[s];o=o.substring(0,1).toLowerCase()+o.substring(1),o in n||(n[o]={}),s==i.length-1&&(n[o]=t[e]),n=n[o]}delete t[e]}}return t},i.hasScroll=function(e,i){var n=t(i),s=i.style.overflowX,o=i.style.overflowY;return s!==o||"hidden"!==o&&"visible"!==o?"scroll"===s||"scroll"===o?!0:n.innerHeight()<i.scrollHeight||n.innerWidth()<i.scrollWidth:!1},i.escapeMarkup=function(t){var e={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof t?t:String(t).replace(/[&<>"'\/\\]/g,function(t){return e[t]})},i.appendMany=function(e,i){if("1.7"===t.fn.jquery.substr(0,3)){var n=t();t.map(i,function(t){n=n.add(t)}),i=n}e.append(i)},i}),e.define("select2/results",["jquery","./utils"],function(t,e){function i(t,e,n){this.$element=t,this.data=n,this.options=e,i.__super__.constructor.call(this)}return e.Extend(i,e.Observable),i.prototype.render=function(){var e=t('<ul class="select2-results__options" role="tree"></ul>');return this.options.get("multiple")&&e.attr("aria-multiselectable","true"),this.$results=e,e},i.prototype.clear=function(){this.$results.empty()},i.prototype.displayMessage=function(e){var i=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var n=t('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),s=this.options.get("translations").get(e.message);n.append(i(s(e.args))),n[0].className+=" select2-results__message",this.$results.append(n)},i.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()},i.prototype.append=function(t){this.hideLoading();var e=[];if(null==t.results||0===t.results.length)return void(0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"}));t.results=this.sort(t.results);for(var i=0;i<t.results.length;i++){var n=t.results[i],s=this.option(n);e.push(s)}this.$results.append(e)},i.prototype.position=function(t,e){var i=e.find(".select2-results");i.append(t)},i.prototype.sort=function(t){var e=this.options.get("sorter");return e(t)},i.prototype.highlightFirstItem=function(){var t=this.$results.find(".select2-results__option[aria-selected]"),e=t.filter("[aria-selected=true]");e.length>0?e.first().trigger("mouseenter"):t.first().trigger("mouseenter"),this.ensureHighlightVisible()},i.prototype.setClasses=function(){var e=this;this.data.current(function(i){var n=t.map(i,function(t){return t.id.toString()}),s=e.$results.find(".select2-results__option[aria-selected]");s.each(function(){var e=t(this),i=t.data(this,"data"),s=""+i.id;null!=i.element&&i.element.selected||null==i.element&&t.inArray(s,n)>-1?e.attr("aria-selected","true"):e.attr("aria-selected","false")})})},i.prototype.showLoading=function(t){this.hideLoading();var e=this.options.get("translations").get("searching"),i={disabled:!0,loading:!0,text:e(t)},n=this.option(i);n.className+=" loading-results",this.$results.prepend(n)},i.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},i.prototype.option=function(e){var i=document.createElement("li");i.className="select2-results__option";var n={role:"treeitem","aria-selected":"false"};e.disabled&&(delete n["aria-selected"],n["aria-disabled"]="true"),null==e.id&&delete n["aria-selected"],null!=e._resultId&&(i.id=e._resultId),e.title&&(i.title=e.title),e.children&&(n.role="group",n["aria-label"]=e.text,delete n["aria-selected"]);for(var s in n){var o=n[s];i.setAttribute(s,o)}if(e.children){var r=t(i),a=document.createElement("strong");a.className="select2-results__group";t(a);this.template(e,a);for(var l=[],u=0;u<e.children.length;u++){var c=e.children[u],h=this.option(c);l.push(h)}var d=t("<ul></ul>",{"class":"select2-results__options select2-results__options--nested"});d.append(l),r.append(a),r.append(d)}else this.template(e,i);return t.data(i,"data",e),i},i.prototype.bind=function(e){var i=this,n=e.id+"-results";this.$results.attr("id",n),e.on("results:all",function(t){i.clear(),i.append(t.data),e.isOpen()&&(i.setClasses(),i.highlightFirstItem())}),e.on("results:append",function(t){i.append(t.data),e.isOpen()&&i.setClasses()}),e.on("query",function(t){i.hideMessages(),i.showLoading(t)}),e.on("select",function(){e.isOpen()&&(i.setClasses(),i.highlightFirstItem())}),e.on("unselect",function(){e.isOpen()&&(i.setClasses(),i.highlightFirstItem())}),e.on("open",function(){i.$results.attr("aria-expanded","true"),i.$results.attr("aria-hidden","false"),i.setClasses(),i.ensureHighlightVisible()}),e.on("close",function(){i.$results.attr("aria-expanded","false"),i.$results.attr("aria-hidden","true"),i.$results.removeAttr("aria-activedescendant")}),e.on("results:toggle",function(){var t=i.getHighlightedResults();0!==t.length&&t.trigger("mouseup")}),e.on("results:select",function(){var t=i.getHighlightedResults();if(0!==t.length){var e=t.data("data");"true"==t.attr("aria-selected")?i.trigger("close",{}):i.trigger("select",{data:e})}}),e.on("results:previous",function(){var t=i.getHighlightedResults(),e=i.$results.find("[aria-selected]"),n=e.index(t);if(0!==n){var s=n-1;0===t.length&&(s=0);var o=e.eq(s);o.trigger("mouseenter");var r=i.$results.offset().top,a=o.offset().top,l=i.$results.scrollTop()+(a-r);0===s?i.$results.scrollTop(0):0>a-r&&i.$results.scrollTop(l)}}),e.on("results:next",function(){var t=i.getHighlightedResults(),e=i.$results.find("[aria-selected]"),n=e.index(t),s=n+1;if(!(s>=e.length)){var o=e.eq(s);o.trigger("mouseenter");var r=i.$results.offset().top+i.$results.outerHeight(!1),a=o.offset().top+o.outerHeight(!1),l=i.$results.scrollTop()+a-r;0===s?i.$results.scrollTop(0):a>r&&i.$results.scrollTop(l)}}),e.on("results:focus",function(t){t.element.addClass("select2-results__option--highlighted")}),e.on("results:message",function(t){i.displayMessage(t)}),t.fn.mousewheel&&this.$results.on("mousewheel",function(t){var e=i.$results.scrollTop(),n=i.$results.get(0).scrollHeight-e+t.deltaY,s=t.deltaY>0&&e-t.deltaY<=0,o=t.deltaY<0&&n<=i.$results.height();s?(i.$results.scrollTop(0),t.preventDefault(),t.stopPropagation()):o&&(i.$results.scrollTop(i.$results.get(0).scrollHeight-i.$results.height()),t.preventDefault(),t.stopPropagation())}),this.$results.on("mouseup",".select2-results__option[aria-selected]",function(e){var n=t(this),s=n.data("data");return"true"===n.attr("aria-selected")?void(i.options.get("multiple")?i.trigger("unselect",{originalEvent:e,data:s}):i.trigger("close",{})):void i.trigger("select",{originalEvent:e,data:s})}),this.$results.on("mouseenter",".select2-results__option[aria-selected]",function(){var e=t(this).data("data");i.getHighlightedResults().removeClass("select2-results__option--highlighted"),i.trigger("results:focus",{data:e,element:t(this)})})},i.prototype.getHighlightedResults=function(){var t=this.$results.find(".select2-results__option--highlighted");return t},i.prototype.destroy=function(){this.$results.remove()},i.prototype.ensureHighlightVisible=function(){var t=this.getHighlightedResults();if(0!==t.length){var e=this.$results.find("[aria-selected]"),i=e.index(t),n=this.$results.offset().top,s=t.offset().top,o=this.$results.scrollTop()+(s-n),r=s-n;o-=2*t.outerHeight(!1),2>=i?this.$results.scrollTop(0):(r>this.$results.outerHeight()||0>r)&&this.$results.scrollTop(o)}},i.prototype.template=function(e,i){var n=this.options.get("templateResult"),s=this.options.get("escapeMarkup"),o=n(e,i);null==o?i.style.display="none":"string"==typeof o?i.innerHTML=s(o):t(i).append(o)},i}),e.define("select2/keys",[],function(){var t={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46};return t}),e.define("select2/selection/base",["jquery","../utils","../keys"],function(t,e,i){function n(t,e){this.$element=t,this.options=e,n.__super__.constructor.call(this)}return e.Extend(n,e.Observable),n.prototype.render=function(){var e=t('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=this.$element.data("old-tabindex")?this._tabindex=this.$element.data("old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),e.attr("title",this.$element.attr("title")),e.attr("tabindex",this._tabindex),this.$selection=e,e},n.prototype.bind=function(t){var e=this,n=(t.id+"-container",t.id+"-results");this.container=t,this.$selection.on("focus",function(t){e.trigger("focus",t)}),this.$selection.on("blur",function(t){e._handleBlur(t)}),this.$selection.on("keydown",function(t){e.trigger("keypress",t),t.which===i.SPACE&&t.preventDefault()}),t.on("results:focus",function(t){e.$selection.attr("aria-activedescendant",t.data._resultId)}),t.on("selection:update",function(t){e.update(t.data)}),t.on("open",function(){e.$selection.attr("aria-expanded","true"),e.$selection.attr("aria-owns",n),e._attachCloseHandler(t)}),t.on("close",function(){e.$selection.attr("aria-expanded","false"),e.$selection.removeAttr("aria-activedescendant"),e.$selection.removeAttr("aria-owns"),e.$selection.focus(),e._detachCloseHandler(t)}),t.on("enable",function(){e.$selection.attr("tabindex",e._tabindex)}),t.on("disable",function(){e.$selection.attr("tabindex","-1")})},n.prototype._handleBlur=function(e){var i=this;window.setTimeout(function(){document.activeElement==i.$selection[0]||t.contains(i.$selection[0],document.activeElement)||i.trigger("blur",e)},1)},n.prototype._attachCloseHandler=function(e){t(document.body).on("mousedown.select2."+e.id,function(e){var i=t(e.target),n=i.closest(".select2"),s=t(".select2.select2-container--open");s.each(function(){var e=t(this);if(this!=n[0]){var i=e.data("element");i.select2("close")}})})},n.prototype._detachCloseHandler=function(e){t(document.body).off("mousedown.select2."+e.id)},n.prototype.position=function(t,e){var i=e.find(".selection");i.append(t)},n.prototype.destroy=function(){this._detachCloseHandler(this.container)},n.prototype.update=function(){throw new Error("The `update` method must be defined in child classes.")},n}),e.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(t,e,i){function n(){n.__super__.constructor.apply(this,arguments)}return i.Extend(n,e),n.prototype.render=function(){var t=n.__super__.render.call(this);return t.addClass("select2-selection--single"),t.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),t},n.prototype.bind=function(t){var e=this;n.__super__.bind.apply(this,arguments);var i=t.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",i),this.$selection.attr("aria-labelledby",i),this.$selection.on("mousedown",function(t){1===t.which&&e.trigger("toggle",{originalEvent:t})}),this.$selection.on("focus",function(){}),this.$selection.on("blur",function(){}),t.on("focus",function(){t.isOpen()||e.$selection.focus()}),t.on("selection:update",function(t){e.update(t.data)})},n.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},n.prototype.display=function(t,e){var i=this.options.get("templateSelection"),n=this.options.get("escapeMarkup");return n(i(t,e))},n.prototype.selectionContainer=function(){return t("<span></span>")},n.prototype.update=function(t){if(0===t.length)return void this.clear();var e=t[0],i=this.$selection.find(".select2-selection__rendered"),n=this.display(e,i);i.empty().append(n),i.prop("title",e.title||e.text)},n}),e.define("select2/selection/multiple",["jquery","./base","../utils"],function(t,e,i){function n(){n.__super__.constructor.apply(this,arguments)}return i.Extend(n,e),n.prototype.render=function(){var t=n.__super__.render.call(this);return t.addClass("select2-selection--multiple"),t.html('<ul class="select2-selection__rendered"></ul>'),t},n.prototype.bind=function(){var e=this;n.__super__.bind.apply(this,arguments),this.$selection.on("click",function(t){e.trigger("toggle",{originalEvent:t})}),this.$selection.on("click",".select2-selection__choice__remove",function(i){if(!e.options.get("disabled")){var n=t(this),s=n.parent(),o=s.data("data");e.trigger("unselect",{originalEvent:i,data:o})}})},n.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},n.prototype.display=function(t,e){var i=this.options.get("templateSelection"),n=this.options.get("escapeMarkup");return n(i(t,e))},n.prototype.selectionContainer=function(){var e=t('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');return e},n.prototype.update=function(t){if(this.clear(),0!==t.length){for(var e=[],n=0;n<t.length;n++){var s=t[n],o=this.selectionContainer(),r=this.display(s,o);o.append(r),o.prop("title",s.title||s.text),o.data("data",s),e.push(o)}var a=this.$selection.find(".select2-selection__rendered");i.appendMany(a,e)}},n}),e.define("select2/selection/placeholder",["../utils"],function(){function t(t,e,i){this.placeholder=this.normalizePlaceholder(i.get("placeholder")),t.call(this,e,i)}return t.prototype.normalizePlaceholder=function(t,e){return"string"==typeof e&&(e={id:"",text:e}),e},t.prototype.createPlaceholder=function(t,e){var i=this.selectionContainer();return i.html(this.display(e)),i.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"),i},t.prototype.update=function(t,e){var i=1==e.length&&e[0].id!=this.placeholder.id,n=e.length>1;if(n||i)return t.call(this,e);this.clear();var s=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(s)},t}),e.define("select2/selection/allowClear",["jquery","../keys"],function(t,e){function i(){}return i.prototype.bind=function(t,e,i){var n=this;t.call(this,e,i),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".select2-selection__clear",function(t){n._handleClear(t)}),e.on("keypress",function(t){n._handleKeyboardClear(t,e)})},i.prototype._handleClear=function(t,e){if(!this.options.get("disabled")){var i=this.$selection.find(".select2-selection__clear");if(0!==i.length){e.stopPropagation();for(var n=i.data("data"),s=0;s<n.length;s++){var o={data:n[s]};if(this.trigger("unselect",o),o.prevented)return}this.$element.val(this.placeholder.id).trigger("change"),this.trigger("toggle",{})}}},i.prototype._handleKeyboardClear=function(t,i,n){n.isOpen()||i.which!=e.DELETE&&i.which!=e.BACKSPACE||this._handleClear(i)},i.prototype.update=function(e,i){if(e.call(this,i),!(this.$selection.find(".select2-selection__placeholder").length>0||0===i.length)){var n=t('<span class="select2-selection__clear">&times;</span>');n.data("data",i),this.$selection.find(".select2-selection__rendered").prepend(n)}},i}),e.define("select2/selection/search",["jquery","../utils","../keys"],function(t,e,i){function n(t,e,i){t.call(this,e,i)}return n.prototype.render=function(e){var i=t('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');this.$searchContainer=i,this.$search=i.find("input");var n=e.call(this);return this._transferTabIndex(),n},n.prototype.bind=function(t,e,n){var s=this;t.call(this,e,n),e.on("open",function(){s.$search.trigger("focus")}),e.on("close",function(){s.$search.val(""),s.$search.removeAttr("aria-activedescendant"),s.$search.trigger("focus")}),e.on("enable",function(){s.$search.prop("disabled",!1),s._transferTabIndex()}),e.on("disable",function(){s.$search.prop("disabled",!0)}),e.on("focus",function(){s.$search.trigger("focus")}),e.on("results:focus",function(t){s.$search.attr("aria-activedescendant",t.id)}),this.$selection.on("focusin",".select2-search--inline",function(t){s.trigger("focus",t)}),this.$selection.on("focusout",".select2-search--inline",function(t){s._handleBlur(t)}),this.$selection.on("keydown",".select2-search--inline",function(t){t.stopPropagation(),s.trigger("keypress",t),s._keyUpPrevented=t.isDefaultPrevented();var e=t.which;if(e===i.BACKSPACE&&""===s.$search.val()){var n=s.$searchContainer.prev(".select2-selection__choice");if(n.length>0){var o=n.data("data");s.searchRemoveChoice(o),t.preventDefault()}}});var o=document.documentMode,r=o&&11>=o;this.$selection.on("input.searchcheck",".select2-search--inline",function(){return r?void s.$selection.off("input.search input.searchcheck"):void s.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".select2-search--inline",function(t){if(r&&"input"===t.type)return void s.$selection.off("input.search input.searchcheck");var e=t.which;e!=i.SHIFT&&e!=i.CTRL&&e!=i.ALT&&e!=i.TAB&&s.handleSearch(t)})},n.prototype._transferTabIndex=function(){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},n.prototype.createPlaceholder=function(t,e){this.$search.attr("placeholder",e.text)},n.prototype.update=function(t,e){var i=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),t.call(this,e),this.$selection.find(".select2-selection__rendered").append(this.$searchContainer),this.resizeSearch(),i&&this.$search.focus()},n.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var t=this.$search.val();this.trigger("query",{term:t})}this._keyUpPrevented=!1},n.prototype.searchRemoveChoice=function(t,e){this.trigger("unselect",{data:e}),this.$search.val(e.text),this.handleSearch()},n.prototype.resizeSearch=function(){this.$search.css("width","25px");var t="";if(""!==this.$search.attr("placeholder"))t=this.$selection.find(".select2-selection__rendered").innerWidth();else{var e=this.$search.val().length+1;t=.75*e+"em"}this.$search.css("width",t)},n}),e.define("select2/selection/eventRelay",["jquery"],function(t){function e(){}return e.prototype.bind=function(e,i,n){var s=this,o=["open","opening","close","closing","select","selecting","unselect","unselecting"],r=["opening","closing","selecting","unselecting"];e.call(this,i,n),i.on("*",function(e,i){if(-1!==t.inArray(e,o)){i=i||{};var n=t.Event("select2:"+e,{params:i});s.$element.trigger(n),-1!==t.inArray(e,r)&&(i.prevented=n.isDefaultPrevented())}})},e}),e.define("select2/translation",["jquery","require"],function(t,e){function i(t){this.dict=t||{}}return i.prototype.all=function(){return this.dict},i.prototype.get=function(t){return this.dict[t]},i.prototype.extend=function(e){this.dict=t.extend({},e.all(),this.dict)},i._cache={},i.loadPath=function(t){if(!(t in i._cache)){var n=e(t);i._cache[t]=n}return new i(i._cache[t])},i}),e.define("select2/diacritics",[],function(){var t={"\u24b6":"A","\uff21":"A","\xc0":"A","\xc1":"A","\xc2":"A","\u1ea6":"A","\u1ea4":"A","\u1eaa":"A","\u1ea8":"A","\xc3":"A","\u0100":"A","\u0102":"A","\u1eb0":"A","\u1eae":"A","\u1eb4":"A","\u1eb2":"A","\u0226":"A","\u01e0":"A","\xc4":"A","\u01de":"A","\u1ea2":"A","\xc5":"A","\u01fa":"A","\u01cd":"A","\u0200":"A","\u0202":"A","\u1ea0":"A","\u1eac":"A","\u1eb6":"A","\u1e00":"A","\u0104":"A","\u023a":"A","\u2c6f":"A","\ua732":"AA","\xc6":"AE","\u01fc":"AE","\u01e2":"AE","\ua734":"AO","\ua736":"AU","\ua738":"AV","\ua73a":"AV","\ua73c":"AY","\u24b7":"B","\uff22":"B","\u1e02":"B","\u1e04":"B","\u1e06":"B","\u0243":"B","\u0182":"B","\u0181":"B","\u24b8":"C","\uff23":"C","\u0106":"C","\u0108":"C","\u010a":"C","\u010c":"C","\xc7":"C","\u1e08":"C","\u0187":"C","\u023b":"C","\ua73e":"C","\u24b9":"D","\uff24":"D","\u1e0a":"D","\u010e":"D","\u1e0c":"D","\u1e10":"D","\u1e12":"D","\u1e0e":"D","\u0110":"D","\u018b":"D","\u018a":"D","\u0189":"D","\ua779":"D","\u01f1":"DZ","\u01c4":"DZ","\u01f2":"Dz","\u01c5":"Dz","\u24ba":"E","\uff25":"E","\xc8":"E","\xc9":"E","\xca":"E","\u1ec0":"E","\u1ebe":"E","\u1ec4":"E","\u1ec2":"E","\u1ebc":"E","\u0112":"E","\u1e14":"E","\u1e16":"E","\u0114":"E","\u0116":"E","\xcb":"E","\u1eba":"E","\u011a":"E","\u0204":"E","\u0206":"E","\u1eb8":"E","\u1ec6":"E","\u0228":"E","\u1e1c":"E","\u0118":"E","\u1e18":"E","\u1e1a":"E","\u0190":"E","\u018e":"E","\u24bb":"F","\uff26":"F","\u1e1e":"F","\u0191":"F","\ua77b":"F","\u24bc":"G","\uff27":"G","\u01f4":"G","\u011c":"G","\u1e20":"G","\u011e":"G","\u0120":"G","\u01e6":"G","\u0122":"G","\u01e4":"G","\u0193":"G","\ua7a0":"G","\ua77d":"G","\ua77e":"G","\u24bd":"H","\uff28":"H","\u0124":"H","\u1e22":"H","\u1e26":"H","\u021e":"H","\u1e24":"H","\u1e28":"H","\u1e2a":"H","\u0126":"H","\u2c67":"H","\u2c75":"H","\ua78d":"H","\u24be":"I","\uff29":"I","\xcc":"I","\xcd":"I","\xce":"I","\u0128":"I","\u012a":"I","\u012c":"I","\u0130":"I","\xcf":"I","\u1e2e":"I","\u1ec8":"I","\u01cf":"I","\u0208":"I","\u020a":"I","\u1eca":"I","\u012e":"I","\u1e2c":"I","\u0197":"I","\u24bf":"J","\uff2a":"J","\u0134":"J","\u0248":"J","\u24c0":"K","\uff2b":"K","\u1e30":"K","\u01e8":"K","\u1e32":"K","\u0136":"K","\u1e34":"K","\u0198":"K","\u2c69":"K","\ua740":"K","\ua742":"K","\ua744":"K","\ua7a2":"K","\u24c1":"L","\uff2c":"L","\u013f":"L","\u0139":"L","\u013d":"L","\u1e36":"L","\u1e38":"L","\u013b":"L","\u1e3c":"L","\u1e3a":"L","\u0141":"L","\u023d":"L","\u2c62":"L","\u2c60":"L","\ua748":"L","\ua746":"L","\ua780":"L","\u01c7":"LJ","\u01c8":"Lj","\u24c2":"M","\uff2d":"M","\u1e3e":"M","\u1e40":"M","\u1e42":"M","\u2c6e":"M","\u019c":"M","\u24c3":"N","\uff2e":"N","\u01f8":"N","\u0143":"N","\xd1":"N","\u1e44":"N","\u0147":"N","\u1e46":"N","\u0145":"N","\u1e4a":"N","\u1e48":"N","\u0220":"N","\u019d":"N","\ua790":"N","\ua7a4":"N","\u01ca":"NJ","\u01cb":"Nj","\u24c4":"O","\uff2f":"O","\xd2":"O","\xd3":"O","\xd4":"O","\u1ed2":"O","\u1ed0":"O","\u1ed6":"O","\u1ed4":"O","\xd5":"O","\u1e4c":"O","\u022c":"O","\u1e4e":"O","\u014c":"O","\u1e50":"O","\u1e52":"O","\u014e":"O","\u022e":"O","\u0230":"O","\xd6":"O","\u022a":"O","\u1ece":"O","\u0150":"O","\u01d1":"O","\u020c":"O","\u020e":"O","\u01a0":"O","\u1edc":"O","\u1eda":"O","\u1ee0":"O","\u1ede":"O","\u1ee2":"O","\u1ecc":"O","\u1ed8":"O","\u01ea":"O","\u01ec":"O","\xd8":"O","\u01fe":"O","\u0186":"O","\u019f":"O","\ua74a":"O","\ua74c":"O","\u01a2":"OI","\ua74e":"OO","\u0222":"OU","\u24c5":"P","\uff30":"P","\u1e54":"P","\u1e56":"P","\u01a4":"P","\u2c63":"P","\ua750":"P","\ua752":"P","\ua754":"P","\u24c6":"Q","\uff31":"Q","\ua756":"Q","\ua758":"Q","\u024a":"Q","\u24c7":"R","\uff32":"R","\u0154":"R","\u1e58":"R","\u0158":"R","\u0210":"R","\u0212":"R","\u1e5a":"R","\u1e5c":"R","\u0156":"R","\u1e5e":"R","\u024c":"R","\u2c64":"R","\ua75a":"R","\ua7a6":"R","\ua782":"R","\u24c8":"S","\uff33":"S","\u1e9e":"S","\u015a":"S","\u1e64":"S","\u015c":"S","\u1e60":"S","\u0160":"S","\u1e66":"S","\u1e62":"S","\u1e68":"S","\u0218":"S","\u015e":"S","\u2c7e":"S","\ua7a8":"S","\ua784":"S","\u24c9":"T","\uff34":"T","\u1e6a":"T","\u0164":"T","\u1e6c":"T","\u021a":"T","\u0162":"T","\u1e70":"T","\u1e6e":"T","\u0166":"T","\u01ac":"T","\u01ae":"T","\u023e":"T","\ua786":"T","\ua728":"TZ","\u24ca":"U","\uff35":"U","\xd9":"U","\xda":"U","\xdb":"U","\u0168":"U","\u1e78":"U","\u016a":"U","\u1e7a":"U","\u016c":"U","\xdc":"U","\u01db":"U","\u01d7":"U","\u01d5":"U","\u01d9":"U","\u1ee6":"U","\u016e":"U","\u0170":"U","\u01d3":"U","\u0214":"U","\u0216":"U","\u01af":"U","\u1eea":"U","\u1ee8":"U","\u1eee":"U","\u1eec":"U","\u1ef0":"U","\u1ee4":"U","\u1e72":"U","\u0172":"U","\u1e76":"U","\u1e74":"U","\u0244":"U","\u24cb":"V","\uff36":"V","\u1e7c":"V","\u1e7e":"V","\u01b2":"V","\ua75e":"V","\u0245":"V","\ua760":"VY","\u24cc":"W","\uff37":"W","\u1e80":"W","\u1e82":"W","\u0174":"W","\u1e86":"W","\u1e84":"W","\u1e88":"W","\u2c72":"W","\u24cd":"X","\uff38":"X","\u1e8a":"X","\u1e8c":"X","\u24ce":"Y","\uff39":"Y","\u1ef2":"Y","\xdd":"Y","\u0176":"Y","\u1ef8":"Y","\u0232":"Y","\u1e8e":"Y","\u0178":"Y","\u1ef6":"Y","\u1ef4":"Y","\u01b3":"Y","\u024e":"Y","\u1efe":"Y","\u24cf":"Z","\uff3a":"Z","\u0179":"Z","\u1e90":"Z","\u017b":"Z","\u017d":"Z","\u1e92":"Z","\u1e94":"Z","\u01b5":"Z","\u0224":"Z","\u2c7f":"Z","\u2c6b":"Z","\ua762":"Z","\u24d0":"a","\uff41":"a","\u1e9a":"a","\xe0":"a","\xe1":"a","\xe2":"a","\u1ea7":"a","\u1ea5":"a","\u1eab":"a","\u1ea9":"a","\xe3":"a","\u0101":"a","\u0103":"a","\u1eb1":"a","\u1eaf":"a","\u1eb5":"a","\u1eb3":"a","\u0227":"a","\u01e1":"a","\xe4":"a","\u01df":"a","\u1ea3":"a","\xe5":"a","\u01fb":"a","\u01ce":"a","\u0201":"a","\u0203":"a","\u1ea1":"a","\u1ead":"a","\u1eb7":"a","\u1e01":"a","\u0105":"a","\u2c65":"a","\u0250":"a","\ua733":"aa","\xe6":"ae","\u01fd":"ae","\u01e3":"ae","\ua735":"ao","\ua737":"au","\ua739":"av","\ua73b":"av","\ua73d":"ay","\u24d1":"b","\uff42":"b","\u1e03":"b","\u1e05":"b","\u1e07":"b","\u0180":"b","\u0183":"b","\u0253":"b","\u24d2":"c","\uff43":"c","\u0107":"c","\u0109":"c","\u010b":"c","\u010d":"c","\xe7":"c","\u1e09":"c","\u0188":"c","\u023c":"c","\ua73f":"c","\u2184":"c","\u24d3":"d","\uff44":"d","\u1e0b":"d","\u010f":"d","\u1e0d":"d","\u1e11":"d","\u1e13":"d","\u1e0f":"d","\u0111":"d","\u018c":"d","\u0256":"d","\u0257":"d","\ua77a":"d","\u01f3":"dz","\u01c6":"dz","\u24d4":"e","\uff45":"e","\xe8":"e","\xe9":"e","\xea":"e","\u1ec1":"e","\u1ebf":"e","\u1ec5":"e","\u1ec3":"e","\u1ebd":"e","\u0113":"e","\u1e15":"e","\u1e17":"e","\u0115":"e","\u0117":"e","\xeb":"e","\u1ebb":"e","\u011b":"e","\u0205":"e","\u0207":"e","\u1eb9":"e","\u1ec7":"e","\u0229":"e","\u1e1d":"e","\u0119":"e","\u1e19":"e","\u1e1b":"e","\u0247":"e","\u025b":"e","\u01dd":"e","\u24d5":"f","\uff46":"f","\u1e1f":"f","\u0192":"f","\ua77c":"f","\u24d6":"g","\uff47":"g","\u01f5":"g","\u011d":"g","\u1e21":"g","\u011f":"g","\u0121":"g","\u01e7":"g","\u0123":"g","\u01e5":"g","\u0260":"g","\ua7a1":"g","\u1d79":"g","\ua77f":"g","\u24d7":"h","\uff48":"h","\u0125":"h","\u1e23":"h","\u1e27":"h","\u021f":"h","\u1e25":"h","\u1e29":"h","\u1e2b":"h","\u1e96":"h","\u0127":"h","\u2c68":"h","\u2c76":"h","\u0265":"h","\u0195":"hv","\u24d8":"i","\uff49":"i","\xec":"i","\xed":"i","\xee":"i","\u0129":"i","\u012b":"i","\u012d":"i","\xef":"i","\u1e2f":"i","\u1ec9":"i","\u01d0":"i","\u0209":"i","\u020b":"i","\u1ecb":"i","\u012f":"i","\u1e2d":"i","\u0268":"i","\u0131":"i","\u24d9":"j","\uff4a":"j","\u0135":"j","\u01f0":"j","\u0249":"j","\u24da":"k","\uff4b":"k","\u1e31":"k","\u01e9":"k","\u1e33":"k","\u0137":"k","\u1e35":"k","\u0199":"k","\u2c6a":"k","\ua741":"k","\ua743":"k","\ua745":"k","\ua7a3":"k","\u24db":"l","\uff4c":"l","\u0140":"l","\u013a":"l","\u013e":"l","\u1e37":"l","\u1e39":"l","\u013c":"l","\u1e3d":"l","\u1e3b":"l","\u017f":"l","\u0142":"l","\u019a":"l","\u026b":"l","\u2c61":"l","\ua749":"l","\ua781":"l","\ua747":"l","\u01c9":"lj","\u24dc":"m","\uff4d":"m","\u1e3f":"m","\u1e41":"m","\u1e43":"m","\u0271":"m","\u026f":"m","\u24dd":"n","\uff4e":"n","\u01f9":"n","\u0144":"n","\xf1":"n","\u1e45":"n","\u0148":"n","\u1e47":"n","\u0146":"n","\u1e4b":"n","\u1e49":"n","\u019e":"n","\u0272":"n","\u0149":"n","\ua791":"n","\ua7a5":"n","\u01cc":"nj","\u24de":"o","\uff4f":"o","\xf2":"o","\xf3":"o","\xf4":"o","\u1ed3":"o","\u1ed1":"o","\u1ed7":"o","\u1ed5":"o","\xf5":"o","\u1e4d":"o","\u022d":"o","\u1e4f":"o","\u014d":"o","\u1e51":"o","\u1e53":"o","\u014f":"o","\u022f":"o","\u0231":"o","\xf6":"o","\u022b":"o","\u1ecf":"o","\u0151":"o","\u01d2":"o","\u020d":"o","\u020f":"o","\u01a1":"o","\u1edd":"o","\u1edb":"o","\u1ee1":"o","\u1edf":"o","\u1ee3":"o","\u1ecd":"o","\u1ed9":"o","\u01eb":"o","\u01ed":"o","\xf8":"o","\u01ff":"o","\u0254":"o","\ua74b":"o","\ua74d":"o","\u0275":"o","\u01a3":"oi","\u0223":"ou","\ua74f":"oo","\u24df":"p","\uff50":"p","\u1e55":"p","\u1e57":"p","\u01a5":"p","\u1d7d":"p","\ua751":"p","\ua753":"p","\ua755":"p","\u24e0":"q","\uff51":"q","\u024b":"q","\ua757":"q","\ua759":"q","\u24e1":"r",
"\uff52":"r","\u0155":"r","\u1e59":"r","\u0159":"r","\u0211":"r","\u0213":"r","\u1e5b":"r","\u1e5d":"r","\u0157":"r","\u1e5f":"r","\u024d":"r","\u027d":"r","\ua75b":"r","\ua7a7":"r","\ua783":"r","\u24e2":"s","\uff53":"s","\xdf":"s","\u015b":"s","\u1e65":"s","\u015d":"s","\u1e61":"s","\u0161":"s","\u1e67":"s","\u1e63":"s","\u1e69":"s","\u0219":"s","\u015f":"s","\u023f":"s","\ua7a9":"s","\ua785":"s","\u1e9b":"s","\u24e3":"t","\uff54":"t","\u1e6b":"t","\u1e97":"t","\u0165":"t","\u1e6d":"t","\u021b":"t","\u0163":"t","\u1e71":"t","\u1e6f":"t","\u0167":"t","\u01ad":"t","\u0288":"t","\u2c66":"t","\ua787":"t","\ua729":"tz","\u24e4":"u","\uff55":"u","\xf9":"u","\xfa":"u","\xfb":"u","\u0169":"u","\u1e79":"u","\u016b":"u","\u1e7b":"u","\u016d":"u","\xfc":"u","\u01dc":"u","\u01d8":"u","\u01d6":"u","\u01da":"u","\u1ee7":"u","\u016f":"u","\u0171":"u","\u01d4":"u","\u0215":"u","\u0217":"u","\u01b0":"u","\u1eeb":"u","\u1ee9":"u","\u1eef":"u","\u1eed":"u","\u1ef1":"u","\u1ee5":"u","\u1e73":"u","\u0173":"u","\u1e77":"u","\u1e75":"u","\u0289":"u","\u24e5":"v","\uff56":"v","\u1e7d":"v","\u1e7f":"v","\u028b":"v","\ua75f":"v","\u028c":"v","\ua761":"vy","\u24e6":"w","\uff57":"w","\u1e81":"w","\u1e83":"w","\u0175":"w","\u1e87":"w","\u1e85":"w","\u1e98":"w","\u1e89":"w","\u2c73":"w","\u24e7":"x","\uff58":"x","\u1e8b":"x","\u1e8d":"x","\u24e8":"y","\uff59":"y","\u1ef3":"y","\xfd":"y","\u0177":"y","\u1ef9":"y","\u0233":"y","\u1e8f":"y","\xff":"y","\u1ef7":"y","\u1e99":"y","\u1ef5":"y","\u01b4":"y","\u024f":"y","\u1eff":"y","\u24e9":"z","\uff5a":"z","\u017a":"z","\u1e91":"z","\u017c":"z","\u017e":"z","\u1e93":"z","\u1e95":"z","\u01b6":"z","\u0225":"z","\u0240":"z","\u2c6c":"z","\ua763":"z","\u0386":"\u0391","\u0388":"\u0395","\u0389":"\u0397","\u038a":"\u0399","\u03aa":"\u0399","\u038c":"\u039f","\u038e":"\u03a5","\u03ab":"\u03a5","\u038f":"\u03a9","\u03ac":"\u03b1","\u03ad":"\u03b5","\u03ae":"\u03b7","\u03af":"\u03b9","\u03ca":"\u03b9","\u0390":"\u03b9","\u03cc":"\u03bf","\u03cd":"\u03c5","\u03cb":"\u03c5","\u03b0":"\u03c5","\u03c9":"\u03c9","\u03c2":"\u03c3"};return t}),e.define("select2/data/base",["../utils"],function(t){function e(){e.__super__.constructor.call(this)}return t.Extend(e,t.Observable),e.prototype.current=function(){throw new Error("The `current` method must be defined in child classes.")},e.prototype.query=function(){throw new Error("The `query` method must be defined in child classes.")},e.prototype.bind=function(){},e.prototype.destroy=function(){},e.prototype.generateResultId=function(e,i){var n=e.id+"-result-";return n+=t.generateChars(4),n+=null!=i.id?"-"+i.id.toString():"-"+t.generateChars(4)},e}),e.define("select2/data/select",["./base","../utils","jquery"],function(t,e,i){function n(t,e){this.$element=t,this.options=e,n.__super__.constructor.call(this)}return e.Extend(n,t),n.prototype.current=function(t){var e=[],n=this;this.$element.find(":selected").each(function(){var t=i(this),s=n.item(t);e.push(s)}),t(e)},n.prototype.select=function(t){var e=this;if(t.selected=!0,i(t.element).is("option"))return t.element.selected=!0,void this.$element.trigger("change");if(this.$element.prop("multiple"))this.current(function(n){var s=[];t=[t],t.push.apply(t,n);for(var o=0;o<t.length;o++){var r=t[o].id;-1===i.inArray(r,s)&&s.push(r)}e.$element.val(s),e.$element.trigger("change")});else{var n=t.id;this.$element.val(n),this.$element.trigger("change")}},n.prototype.unselect=function(t){var e=this;if(this.$element.prop("multiple"))return t.selected=!1,i(t.element).is("option")?(t.element.selected=!1,void this.$element.trigger("change")):void this.current(function(n){for(var s=[],o=0;o<n.length;o++){var r=n[o].id;r!==t.id&&-1===i.inArray(r,s)&&s.push(r)}e.$element.val(s),e.$element.trigger("change")})},n.prototype.bind=function(t){var e=this;this.container=t,t.on("select",function(t){e.select(t.data)}),t.on("unselect",function(t){e.unselect(t.data)})},n.prototype.destroy=function(){this.$element.find("*").each(function(){i.removeData(this,"data")})},n.prototype.query=function(t,e){var n=[],s=this,o=this.$element.children();o.each(function(){var e=i(this);if(e.is("option")||e.is("optgroup")){var o=s.item(e),r=s.matches(t,o);null!==r&&n.push(r)}}),e({results:n})},n.prototype.addOptions=function(t){e.appendMany(this.$element,t)},n.prototype.option=function(t){var e;t.children?(e=document.createElement("optgroup"),e.label=t.text):(e=document.createElement("option"),void 0!==e.textContent?e.textContent=t.text:e.innerText=t.text),t.id&&(e.value=t.id),t.disabled&&(e.disabled=!0),t.selected&&(e.selected=!0),t.title&&(e.title=t.title);var n=i(e),s=this._normalizeItem(t);return s.element=e,i.data(e,"data",s),n},n.prototype.item=function(t){var e={};if(e=i.data(t[0],"data"),null!=e)return e;if(t.is("option"))e={id:t.val(),text:t.text(),disabled:t.prop("disabled"),selected:t.prop("selected"),title:t.prop("title")};else if(t.is("optgroup")){e={text:t.prop("label"),children:[],title:t.prop("title")};for(var n=t.children("option"),s=[],o=0;o<n.length;o++){var r=i(n[o]),a=this.item(r);s.push(a)}e.children=s}return e=this._normalizeItem(e),e.element=t[0],i.data(t[0],"data",e),e},n.prototype._normalizeItem=function(t){i.isPlainObject(t)||(t={id:t,text:t}),t=i.extend({},{text:""},t);var e={selected:!1,disabled:!1};return null!=t.id&&(t.id=t.id.toString()),null!=t.text&&(t.text=t.text.toString()),null==t._resultId&&t.id&&null!=this.container&&(t._resultId=this.generateResultId(this.container,t)),i.extend({},e,t)},n.prototype.matches=function(t,e){var i=this.options.get("matcher");return i(t,e)},n}),e.define("select2/data/array",["./select","../utils","jquery"],function(t,e,i){function n(t,e){var i=e.get("data")||[];n.__super__.constructor.call(this,t,e),this.addOptions(this.convertToOptions(i))}return e.Extend(n,t),n.prototype.select=function(t){var e=this.$element.find("option").filter(function(e,i){return i.value==t.id.toString()});0===e.length&&(e=this.option(t),this.addOptions(e)),n.__super__.select.call(this,t)},n.prototype.convertToOptions=function(t){function n(t){return function(){return i(this).val()==t.id}}for(var s=this,o=this.$element.find("option"),r=o.map(function(){return s.item(i(this)).id}).get(),a=[],l=0;l<t.length;l++){var u=this._normalizeItem(t[l]);if(i.inArray(u.id,r)>=0){var c=o.filter(n(u)),h=this.item(c),d=i.extend(!0,{},u,h),p=this.option(d);c.replaceWith(p)}else{var f=this.option(u);if(u.children){var m=this.convertToOptions(u.children);e.appendMany(f,m)}a.push(f)}}return a},n}),e.define("select2/data/ajax",["./array","../utils","jquery"],function(t,e,i){function n(t,e){this.ajaxOptions=this._applyDefaults(e.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),n.__super__.constructor.call(this,t,e)}return e.Extend(n,t),n.prototype._applyDefaults=function(t){var e={data:function(t){return i.extend({},t,{q:t.term})},transport:function(t,e,n){var s=i.ajax(t);return s.then(e),s.fail(n),s}};return i.extend({},e,t,!0)},n.prototype.processResults=function(t){return t},n.prototype.query=function(t,e){function n(){var n=o.transport(o,function(n){var o=s.processResults(n,t);s.options.get("debug")&&window.console&&console.error&&(o&&o.results&&i.isArray(o.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),e(o)},function(){n.status&&"0"===n.status||s.trigger("results:message",{message:"errorLoading"})});s._request=n}var s=this;null!=this._request&&(i.isFunction(this._request.abort)&&this._request.abort(),this._request=null);var o=i.extend({type:"GET"},this.ajaxOptions);"function"==typeof o.url&&(o.url=o.url.call(this.$element,t)),"function"==typeof o.data&&(o.data=o.data.call(this.$element,t)),this.ajaxOptions.delay&&null!=t.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(n,this.ajaxOptions.delay)):n()},n}),e.define("select2/data/tags",["jquery"],function(t){function e(e,i,n){var s=n.get("tags"),o=n.get("createTag");void 0!==o&&(this.createTag=o);var r=n.get("insertTag");if(void 0!==r&&(this.insertTag=r),e.call(this,i,n),t.isArray(s))for(var a=0;a<s.length;a++){var l=s[a],u=this._normalizeItem(l),c=this.option(u);this.$element.append(c)}}return e.prototype.query=function(t,e,i){function n(t,o){for(var r=t.results,a=0;a<r.length;a++){var l=r[a],u=null!=l.children&&!n({results:l.children},!0),c=l.text===e.term;if(c||u)return o?!1:(t.data=r,void i(t))}if(o)return!0;var h=s.createTag(e);if(null!=h){var d=s.option(h);d.attr("data-select2-tag",!0),s.addOptions([d]),s.insertTag(r,h)}t.results=r,i(t)}var s=this;return this._removeOldTags(),null==e.term||null!=e.page?void t.call(this,e,i):void t.call(this,e,n)},e.prototype.createTag=function(e,i){var n=t.trim(i.term);return""===n?null:{id:n,text:n}},e.prototype.insertTag=function(t,e,i){e.unshift(i)},e.prototype._removeOldTags=function(){var e=(this._lastTag,this.$element.find("option[data-select2-tag]"));e.each(function(){this.selected||t(this).remove()})},e}),e.define("select2/data/tokenizer",["jquery"],function(t){function e(t,e,i){var n=i.get("tokenizer");void 0!==n&&(this.tokenizer=n),t.call(this,e,i)}return e.prototype.bind=function(t,e,i){t.call(this,e,i),this.$search=e.dropdown.$search||e.selection.$search||i.find(".select2-search__field")},e.prototype.query=function(e,i,n){function s(e){var i=r._normalizeItem(e),n=r.$element.find("option").filter(function(){return t(this).val()===i.id});if(!n.length){var s=r.option(i);s.attr("data-select2-tag",!0),r._removeOldTags(),r.addOptions([s])}o(i)}function o(t){r.trigger("select",{data:t})}var r=this;i.term=i.term||"";var a=this.tokenizer(i,this.options,s);a.term!==i.term&&(this.$search.length&&(this.$search.val(a.term),this.$search.focus()),i.term=a.term),e.call(this,i,n)},e.prototype.tokenizer=function(e,i,n,s){for(var o=n.get("tokenSeparators")||[],r=i.term,a=0,l=this.createTag||function(t){return{id:t.term,text:t.term}};a<r.length;){var u=r[a];if(-1!==t.inArray(u,o)){var c=r.substr(0,a),h=t.extend({},i,{term:c}),d=l(h);null!=d?(s(d),r=r.substr(a+1)||"",a=0):a++}else a++}return{term:r}},e}),e.define("select2/data/minimumInputLength",[],function(){function t(t,e,i){this.minimumInputLength=i.get("minimumInputLength"),t.call(this,e,i)}return t.prototype.query=function(t,e,i){return e.term=e.term||"",e.term.length<this.minimumInputLength?void this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:e.term,params:e}}):void t.call(this,e,i)},t}),e.define("select2/data/maximumInputLength",[],function(){function t(t,e,i){this.maximumInputLength=i.get("maximumInputLength"),t.call(this,e,i)}return t.prototype.query=function(t,e,i){return e.term=e.term||"",this.maximumInputLength>0&&e.term.length>this.maximumInputLength?void this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:e.term,params:e}}):void t.call(this,e,i)},t}),e.define("select2/data/maximumSelectionLength",[],function(){function t(t,e,i){this.maximumSelectionLength=i.get("maximumSelectionLength"),t.call(this,e,i)}return t.prototype.query=function(t,e,i){var n=this;this.current(function(s){var o=null!=s?s.length:0;return n.maximumSelectionLength>0&&o>=n.maximumSelectionLength?void n.trigger("results:message",{message:"maximumSelected",args:{maximum:n.maximumSelectionLength}}):void t.call(n,e,i)})},t}),e.define("select2/dropdown",["jquery","./utils"],function(t,e){function i(t,e){this.$element=t,this.options=e,i.__super__.constructor.call(this)}return e.Extend(i,e.Observable),i.prototype.render=function(){var e=t('<span class="select2-dropdown"><span class="select2-results"></span></span>');return e.attr("dir",this.options.get("dir")),this.$dropdown=e,e},i.prototype.bind=function(){},i.prototype.position=function(){},i.prototype.destroy=function(){this.$dropdown.remove()},i}),e.define("select2/dropdown/search",["jquery","../utils"],function(t){function e(){}return e.prototype.render=function(e){var i=e.call(this),n=t('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');return this.$searchContainer=n,this.$search=n.find("input"),i.prepend(n),i},e.prototype.bind=function(e,i,n){var s=this;e.call(this,i,n),this.$search.on("keydown",function(t){s.trigger("keypress",t),s._keyUpPrevented=t.isDefaultPrevented()}),this.$search.on("input",function(){t(this).off("keyup")}),this.$search.on("keyup input",function(t){s.handleSearch(t)}),i.on("open",function(){s.$search.attr("tabindex",0),s.$search.focus(),window.setTimeout(function(){s.$search.focus()},0)}),i.on("close",function(){s.$search.attr("tabindex",-1),s.$search.val("")}),i.on("focus",function(){i.isOpen()&&s.$search.focus()}),i.on("results:all",function(t){if(null==t.query.term||""===t.query.term){var e=s.showSearch(t);e?s.$searchContainer.removeClass("select2-search--hide"):s.$searchContainer.addClass("select2-search--hide")}})},e.prototype.handleSearch=function(){if(!this._keyUpPrevented){var t=this.$search.val();this.trigger("query",{term:t})}this._keyUpPrevented=!1},e.prototype.showSearch=function(){return!0},e}),e.define("select2/dropdown/hidePlaceholder",[],function(){function t(t,e,i,n){this.placeholder=this.normalizePlaceholder(i.get("placeholder")),t.call(this,e,i,n)}return t.prototype.append=function(t,e){e.results=this.removePlaceholder(e.results),t.call(this,e)},t.prototype.normalizePlaceholder=function(t,e){return"string"==typeof e&&(e={id:"",text:e}),e},t.prototype.removePlaceholder=function(t,e){for(var i=e.slice(0),n=e.length-1;n>=0;n--){var s=e[n];this.placeholder.id===s.id&&i.splice(n,1)}return i},t}),e.define("select2/dropdown/infiniteScroll",["jquery"],function(t){function e(t,e,i,n){this.lastParams={},t.call(this,e,i,n),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return e.prototype.append=function(t,e){this.$loadingMore.remove(),this.loading=!1,t.call(this,e),this.showLoadingMore(e)&&this.$results.append(this.$loadingMore)},e.prototype.bind=function(e,i,n){var s=this;e.call(this,i,n),i.on("query",function(t){s.lastParams=t,s.loading=!0}),i.on("query:append",function(t){s.lastParams=t,s.loading=!0}),this.$results.on("scroll",function(){var e=t.contains(document.documentElement,s.$loadingMore[0]);if(!s.loading&&e){var i=s.$results.offset().top+s.$results.outerHeight(!1),n=s.$loadingMore.offset().top+s.$loadingMore.outerHeight(!1);i+50>=n&&s.loadMore()}})},e.prototype.loadMore=function(){this.loading=!0;var e=t.extend({},{page:1},this.lastParams);e.page++,this.trigger("query:append",e)},e.prototype.showLoadingMore=function(t,e){return e.pagination&&e.pagination.more},e.prototype.createLoadingMore=function(){var e=t('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),i=this.options.get("translations").get("loadingMore");return e.html(i(this.lastParams)),e},e}),e.define("select2/dropdown/attachBody",["jquery","../utils"],function(t,e){function i(e,i,n){this.$dropdownParent=n.get("dropdownParent")||t(document.body),e.call(this,i,n)}return i.prototype.bind=function(t,e,i){var n=this,s=!1;t.call(this,e,i),e.on("open",function(){n._showDropdown(),n._attachPositioningHandler(e),s||(s=!0,e.on("results:all",function(){n._positionDropdown(),n._resizeDropdown()}),e.on("results:append",function(){n._positionDropdown(),n._resizeDropdown()}))}),e.on("close",function(){n._hideDropdown(),n._detachPositioningHandler(e)}),this.$dropdownContainer.on("mousedown",function(t){t.stopPropagation()})},i.prototype.destroy=function(t){t.call(this),this.$dropdownContainer.remove()},i.prototype.position=function(t,e,i){e.attr("class",i.attr("class")),e.removeClass("select2"),e.addClass("select2-container--open"),e.css({position:"absolute",top:-999999}),this.$container=i},i.prototype.render=function(e){var i=t("<span></span>"),n=e.call(this);return i.append(n),this.$dropdownContainer=i,i},i.prototype._hideDropdown=function(){this.$dropdownContainer.detach()},i.prototype._attachPositioningHandler=function(i,n){var s=this,o="scroll.select2."+n.id,r="resize.select2."+n.id,a="orientationchange.select2."+n.id,l=this.$container.parents().filter(e.hasScroll);l.each(function(){t(this).data("select2-scroll-position",{x:t(this).scrollLeft(),y:t(this).scrollTop()})}),l.on(o,function(){var e=t(this).data("select2-scroll-position");t(this).scrollTop(e.y)}),t(window).on(o+" "+r+" "+a,function(){s._positionDropdown(),s._resizeDropdown()})},i.prototype._detachPositioningHandler=function(i,n){var s="scroll.select2."+n.id,o="resize.select2."+n.id,r="orientationchange.select2."+n.id,a=this.$container.parents().filter(e.hasScroll);a.off(s),t(window).off(s+" "+o+" "+r)},i.prototype._positionDropdown=function(){var e=t(window),i=this.$dropdown.hasClass("select2-dropdown--above"),n=this.$dropdown.hasClass("select2-dropdown--below"),s=null,o=this.$container.offset();o.bottom=o.top+this.$container.outerHeight(!1);var r={height:this.$container.outerHeight(!1)};r.top=o.top,r.bottom=o.top+r.height;var a={height:this.$dropdown.outerHeight(!1)},l={top:e.scrollTop(),bottom:e.scrollTop()+e.height()},u=l.top<o.top-a.height,c=l.bottom>o.bottom+a.height,h={left:o.left,top:r.bottom},d=this.$dropdownParent;"static"===d.css("position")&&(d=d.offsetParent());var p=d.offset();h.top-=p.top,h.left-=p.left,i||n||(s="below"),c||!u||i?!u&&c&&i&&(s="below"):s="above",("above"==s||i&&"below"!==s)&&(h.top=r.top-p.top-a.height),null!=s&&(this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--"+s),this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--"+s)),this.$dropdownContainer.css(h)},i.prototype._resizeDropdown=function(){var t={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(t.minWidth=t.width,t.position="relative",t.width="auto"),this.$dropdown.css(t)},i.prototype._showDropdown=function(){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},i}),e.define("select2/dropdown/minimumResultsForSearch",[],function(){function t(e){for(var i=0,n=0;n<e.length;n++){var s=e[n];s.children?i+=t(s.children):i++}return i}function e(t,e,i,n){this.minimumResultsForSearch=i.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),t.call(this,e,i,n)}return e.prototype.showSearch=function(e,i){return t(i.data.results)<this.minimumResultsForSearch?!1:e.call(this,i)},e}),e.define("select2/dropdown/selectOnClose",[],function(){function t(){}return t.prototype.bind=function(t,e,i){var n=this;t.call(this,e,i),e.on("close",function(t){n._handleSelectOnClose(t)})},t.prototype._handleSelectOnClose=function(t,e){if(e&&null!=e.originalSelect2Event){var i=e.originalSelect2Event;if("select"===i._type||"unselect"===i._type)return}var n=this.getHighlightedResults();if(!(n.length<1)){var s=n.data("data");null!=s.element&&s.element.selected||null==s.element&&s.selected||this.trigger("select",{data:s})}},t}),e.define("select2/dropdown/closeOnSelect",[],function(){function t(){}return t.prototype.bind=function(t,e,i){var n=this;t.call(this,e,i),e.on("select",function(t){n._selectTriggered(t)}),e.on("unselect",function(t){n._selectTriggered(t)})},t.prototype._selectTriggered=function(t,e){var i=e.originalEvent;i&&i.ctrlKey||this.trigger("close",{originalEvent:i,originalSelect2Event:e})},t}),e.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(t){var e=t.input.length-t.maximum,i="Please delete "+e+" character";return 1!=e&&(i+="s"),i},inputTooShort:function(t){var e=t.minimum-t.input.length,i="Please enter "+e+" or more characters";return i},loadingMore:function(){return"Loading more results\u2026"},maximumSelected:function(t){var e="You can only select "+t.maximum+" item";return 1!=t.maximum&&(e+="s"),e},noResults:function(){return"No results found"},searching:function(){return"Searching\u2026"}}}),e.define("select2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(t,e,i,n,s,o,r,a,l,u,c,h,d,p,f,m,g,v,y,b,_,w,x,C,k,T,D,E,S){function A(){this.reset()}A.prototype.apply=function(h){if(h=t.extend(!0,{},this.defaults,h),null==h.dataAdapter){if(null!=h.ajax?h.dataAdapter=f:null!=h.data?h.dataAdapter=p:h.dataAdapter=d,h.minimumInputLength>0&&(h.dataAdapter=u.Decorate(h.dataAdapter,v)),h.maximumInputLength>0&&(h.dataAdapter=u.Decorate(h.dataAdapter,y)),h.maximumSelectionLength>0&&(h.dataAdapter=u.Decorate(h.dataAdapter,b)),h.tags&&(h.dataAdapter=u.Decorate(h.dataAdapter,m)),null==h.tokenSeparators&&null==h.tokenizer||(h.dataAdapter=u.Decorate(h.dataAdapter,g)),null!=h.query){var S=e(h.amdBase+"compat/query");h.dataAdapter=u.Decorate(h.dataAdapter,S)}if(null!=h.initSelection){var A=e(h.amdBase+"compat/initSelection");h.dataAdapter=u.Decorate(h.dataAdapter,A)}}if(null==h.resultsAdapter&&(h.resultsAdapter=i,null!=h.ajax&&(h.resultsAdapter=u.Decorate(h.resultsAdapter,C)),null!=h.placeholder&&(h.resultsAdapter=u.Decorate(h.resultsAdapter,x)),h.selectOnClose&&(h.resultsAdapter=u.Decorate(h.resultsAdapter,D))),null==h.dropdownAdapter){if(h.multiple)h.dropdownAdapter=_;else{var I=u.Decorate(_,w);h.dropdownAdapter=I}if(0!==h.minimumResultsForSearch&&(h.dropdownAdapter=u.Decorate(h.dropdownAdapter,T)),h.closeOnSelect&&(h.dropdownAdapter=u.Decorate(h.dropdownAdapter,E)),null!=h.dropdownCssClass||null!=h.dropdownCss||null!=h.adaptDropdownCssClass){var M=e(h.amdBase+"compat/dropdownCss");h.dropdownAdapter=u.Decorate(h.dropdownAdapter,M)}h.dropdownAdapter=u.Decorate(h.dropdownAdapter,k)}if(null==h.selectionAdapter){if(h.multiple?h.selectionAdapter=s:h.selectionAdapter=n,null!=h.placeholder&&(h.selectionAdapter=u.Decorate(h.selectionAdapter,o)),h.allowClear&&(h.selectionAdapter=u.Decorate(h.selectionAdapter,r)),h.multiple&&(h.selectionAdapter=u.Decorate(h.selectionAdapter,a)),null!=h.containerCssClass||null!=h.containerCss||null!=h.adaptContainerCssClass){var P=e(h.amdBase+"compat/containerCss");h.selectionAdapter=u.Decorate(h.selectionAdapter,P)}h.selectionAdapter=u.Decorate(h.selectionAdapter,l)}if("string"==typeof h.language)if(h.language.indexOf("-")>0){var N=h.language.split("-"),O=N[0];h.language=[h.language,O]}else h.language=[h.language];if(t.isArray(h.language)){var j=new c;h.language.push("en");for(var H=h.language,$=0;$<H.length;$++){var F=H[$],z={};try{z=c.loadPath(F)}catch(L){try{F=this.defaults.amdLanguageBase+F,z=c.loadPath(F)}catch(W){h.debug&&window.console&&console.warn&&console.warn('Select2: The language file for "'+F+'" could not be automatically loaded. A fallback will be used instead.');continue}}j.extend(z)}h.translations=j}else{var R=c.loadPath(this.defaults.amdLanguageBase+"en"),q=new c(h.language);q.extend(R),h.translations=q}return h},A.prototype.reset=function(){function e(t){function e(t){return h[t]||t}return t.replace(/[^\u0000-\u007E]/g,e)}function i(n,s){if(""===t.trim(n.term))return s;if(s.children&&s.children.length>0){for(var o=t.extend(!0,{},s),r=s.children.length-1;r>=0;r--){var a=s.children[r],l=i(n,a);null==l&&o.children.splice(r,1)}return o.children.length>0?o:i(n,o)}var u=e(s.text).toUpperCase(),c=e(n.term).toUpperCase();return u.indexOf(c)>-1?s:null}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:u.escapeMarkup,language:S,matcher:i,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,sorter:function(t){return t},templateResult:function(t){return t.text},templateSelection:function(t){return t.text},theme:"default",width:"resolve"}},A.prototype.set=function(e,i){var n=t.camelCase(e),s={};s[n]=i;var o=u._convertData(s);t.extend(this.defaults,o)};var I=new A;return I}),e.define("select2/options",["require","jquery","./defaults","./utils"],function(t,e,i,n){function s(e,s){if(this.options=e,null!=s&&this.fromElement(s),this.options=i.apply(this.options),s&&s.is("input")){var o=t(this.get("amdBase")+"compat/inputData");this.options.dataAdapter=n.Decorate(this.options.dataAdapter,o)}}return s.prototype.fromElement=function(t){var i=["select2"];null==this.options.multiple&&(this.options.multiple=t.prop("multiple")),null==this.options.disabled&&(this.options.disabled=t.prop("disabled")),null==this.options.language&&(t.prop("lang")?this.options.language=t.prop("lang").toLowerCase():t.closest("[lang]").prop("lang")&&(this.options.language=t.closest("[lang]").prop("lang"))),null==this.options.dir&&(t.prop("dir")?this.options.dir=t.prop("dir"):t.closest("[dir]").prop("dir")?this.options.dir=t.closest("[dir]").prop("dir"):this.options.dir="ltr"),t.prop("disabled",this.options.disabled),t.prop("multiple",this.options.multiple),t.data("select2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),t.data("data",t.data("select2Tags")),t.data("tags",!0)),t.data("ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),t.attr("ajax--url",t.data("ajaxUrl")),t.data("ajax--url",t.data("ajaxUrl")));var s={};s=e.fn.jquery&&"1."==e.fn.jquery.substr(0,2)&&t[0].dataset?e.extend(!0,{},t[0].dataset,t.data()):t.data();var o=e.extend(!0,{},s);o=n._convertData(o);for(var r in o)e.inArray(r,i)>-1||(e.isPlainObject(this.options[r])?e.extend(this.options[r],o[r]):this.options[r]=o[r]);return this},s.prototype.get=function(t){return this.options[t]},s.prototype.set=function(t,e){this.options[t]=e},s}),e.define("select2/core",["jquery","./options","./utils","./keys"],function(t,e,i,n){var s=function(t,i){null!=t.data("select2")&&t.data("select2").destroy(),this.$element=t,this.id=this._generateId(t),i=i||{},this.options=new e(i,t),s.__super__.constructor.call(this);var n=t.attr("tabindex")||0;t.data("old-tabindex",n),t.attr("tabindex","-1");var o=this.options.get("dataAdapter");this.dataAdapter=new o(t,this.options);var r=this.render();this._placeContainer(r);var a=this.options.get("selectionAdapter");this.selection=new a(t,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,r);var l=this.options.get("dropdownAdapter");this.dropdown=new l(t,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,r);var u=this.options.get("resultsAdapter");this.results=new u(t,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var c=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(t){c.trigger("selection:update",{data:t})}),t.addClass("select2-hidden-accessible"),t.attr("aria-hidden","true"),this._syncAttributes(),t.data("select2",this)};return i.Extend(s,i.Observable),s.prototype._generateId=function(t){var e="";return e=null!=t.attr("id")?t.attr("id"):null!=t.attr("name")?t.attr("name")+"-"+i.generateChars(2):i.generateChars(4),e=e.replace(/(:|\.|\[|\]|,)/g,""),e="select2-"+e},s.prototype._placeContainer=function(t){t.insertAfter(this.$element);var e=this._resolveWidth(this.$element,this.options.get("width"));null!=e&&t.css("width",e)},s.prototype._resolveWidth=function(t,e){var i=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==e){var n=this._resolveWidth(t,"style");return null!=n?n:this._resolveWidth(t,"element")}if("element"==e){var s=t.outerWidth(!1);return 0>=s?"auto":s+"px"}if("style"==e){var o=t.attr("style");if("string"!=typeof o)return null;for(var r=o.split(";"),a=0,l=r.length;l>a;a+=1){var u=r[a].replace(/\s/g,""),c=u.match(i);if(null!==c&&c.length>=1)return c[1]}return null}return e},s.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},s.prototype._registerDomEvents=function(){var e=this;this.$element.on("change.select2",function(){e.dataAdapter.current(function(t){e.trigger("selection:update",{data:t})})}),this.$element.on("focus.select2",function(t){e.trigger("focus",t)}),this._syncA=i.bind(this._syncAttributes,this),this._syncS=i.bind(this._syncSubtree,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._syncA);var n=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=n?(this._observer=new n(function(i){t.each(i,e._syncA),t.each(i,e._syncS)}),this._observer.observe(this.$element[0],{attributes:!0,childList:!0,subtree:!1})):this.$element[0].addEventListener&&(this.$element[0].addEventListener("DOMAttrModified",e._syncA,!1),this.$element[0].addEventListener("DOMNodeInserted",e._syncS,!1),this.$element[0].addEventListener("DOMNodeRemoved",e._syncS,!1))},s.prototype._registerDataEvents=function(){var t=this;this.dataAdapter.on("*",function(e,i){t.trigger(e,i)})},s.prototype._registerSelectionEvents=function(){var e=this,i=["toggle","focus"];this.selection.on("toggle",function(){e.toggleDropdown()}),this.selection.on("focus",function(t){e.focus(t)}),this.selection.on("*",function(n,s){-1===t.inArray(n,i)&&e.trigger(n,s)})},s.prototype._registerDropdownEvents=function(){var t=this;this.dropdown.on("*",function(e,i){t.trigger(e,i)})},s.prototype._registerResultsEvents=function(){var t=this;this.results.on("*",function(e,i){t.trigger(e,i)})},s.prototype._registerEvents=function(){var t=this;this.on("open",function(){t.$container.addClass("select2-container--open")}),this.on("close",function(){t.$container.removeClass("select2-container--open")}),this.on("enable",function(){t.$container.removeClass("select2-container--disabled")}),this.on("disable",function(){t.$container.addClass("select2-container--disabled")}),this.on("blur",function(){t.$container.removeClass("select2-container--focus")}),this.on("query",function(e){t.isOpen()||t.trigger("open",{}),this.dataAdapter.query(e,function(i){t.trigger("results:all",{data:i,query:e})})}),this.on("query:append",function(e){this.dataAdapter.query(e,function(i){t.trigger("results:append",{data:i,query:e})})}),this.on("keypress",function(e){var i=e.which;t.isOpen()?i===n.ESC||i===n.TAB||i===n.UP&&e.altKey?(t.close(),e.preventDefault()):i===n.ENTER?(t.trigger("results:select",{}),e.preventDefault()):i===n.SPACE&&e.ctrlKey?(t.trigger("results:toggle",{}),e.preventDefault()):i===n.UP?(t.trigger("results:previous",{}),e.preventDefault()):i===n.DOWN&&(t.trigger("results:next",{}),e.preventDefault()):(i===n.ENTER||i===n.SPACE||i===n.DOWN&&e.altKey)&&(t.open(),e.preventDefault())})},s.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.options.get("disabled")?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},s.prototype._syncSubtree=function(t,e){var i=!1,n=this;if(!t||!t.target||"OPTION"===t.target.nodeName||"OPTGROUP"===t.target.nodeName){if(e)if(e.addedNodes&&e.addedNodes.length>0)for(var s=0;s<e.addedNodes.length;s++){var o=e.addedNodes[s];o.selected&&(i=!0)}else e.removedNodes&&e.removedNodes.length>0&&(i=!0);else i=!0;i&&this.dataAdapter.current(function(t){n.trigger("selection:update",{data:t})})}},s.prototype.trigger=function(t,e){var i=s.__super__.trigger,n={open:"opening",close:"closing",select:"selecting",unselect:"unselecting"};if(void 0===e&&(e={}),t in n){var o=n[t],r={prevented:!1,name:t,args:e};if(i.call(this,o,r),r.prevented)return void(e.prevented=!0)}i.call(this,t,e)},s.prototype.toggleDropdown=function(){this.options.get("disabled")||(this.isOpen()?this.close():this.open())},s.prototype.open=function(){this.isOpen()||this.trigger("query",{});
},s.prototype.close=function(){this.isOpen()&&this.trigger("close",{})},s.prototype.isOpen=function(){return this.$container.hasClass("select2-container--open")},s.prototype.hasFocus=function(){return this.$container.hasClass("select2-container--focus")},s.prototype.focus=function(){this.hasFocus()||(this.$container.addClass("select2-container--focus"),this.trigger("focus",{}))},s.prototype.enable=function(t){this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),null!=t&&0!==t.length||(t=[!0]);var e=!t[0];this.$element.prop("disabled",e)},s.prototype.data=function(){this.options.get("debug")&&arguments.length>0&&window.console&&console.warn&&console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var t=[];return this.dataAdapter.current(function(e){t=e}),t},s.prototype.val=function(e){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),null==e||0===e.length)return this.$element.val();var i=e[0];t.isArray(i)&&(i=t.map(i,function(t){return t.toString()})),this.$element.val(i).trigger("change")},s.prototype.destroy=function(){this.$container.remove(),this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._syncA),null!=this._observer?(this._observer.disconnect(),this._observer=null):this.$element[0].removeEventListener&&(this.$element[0].removeEventListener("DOMAttrModified",this._syncA,!1),this.$element[0].removeEventListener("DOMNodeInserted",this._syncS,!1),this.$element[0].removeEventListener("DOMNodeRemoved",this._syncS,!1)),this._syncA=null,this._syncS=null,this.$element.off(".select2"),this.$element.attr("tabindex",this.$element.data("old-tabindex")),this.$element.removeClass("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),this.$element.removeData("select2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null},s.prototype.render=function(){var e=t('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return e.attr("dir",this.options.get("dir")),this.$container=e,this.$container.addClass("select2-container--"+this.options.get("theme")),e.data("element",this.$element),e},s}),e.define("select2/compat/utils",["jquery"],function(t){function e(e,i,n){var s,o,r=[];s=t.trim(e.attr("class")),s&&(s=""+s,t(s.split(/\s+/)).each(function(){0===this.indexOf("select2-")&&r.push(this)})),s=t.trim(i.attr("class")),s&&(s=""+s,t(s.split(/\s+/)).each(function(){0!==this.indexOf("select2-")&&(o=n(this),null!=o&&r.push(o))})),e.attr("class",r.join(" "))}return{syncCssClasses:e}}),e.define("select2/compat/containerCss",["jquery","./utils"],function(t,e){function i(){return null}function n(){}return n.prototype.render=function(n){var s=n.call(this),o=this.options.get("containerCssClass")||"";t.isFunction(o)&&(o=o(this.$element));var r=this.options.get("adaptContainerCssClass");if(r=r||i,-1!==o.indexOf(":all:")){o=o.replace(":all:","");var a=r;r=function(t){var e=a(t);return null!=e?e+" "+t:t}}var l=this.options.get("containerCss")||{};return t.isFunction(l)&&(l=l(this.$element)),e.syncCssClasses(s,this.$element,r),s.css(l),s.addClass(o),s},n}),e.define("select2/compat/dropdownCss",["jquery","./utils"],function(t,e){function i(){return null}function n(){}return n.prototype.render=function(n){var s=n.call(this),o=this.options.get("dropdownCssClass")||"";t.isFunction(o)&&(o=o(this.$element));var r=this.options.get("adaptDropdownCssClass");if(r=r||i,-1!==o.indexOf(":all:")){o=o.replace(":all:","");var a=r;r=function(t){var e=a(t);return null!=e?e+" "+t:t}}var l=this.options.get("dropdownCss")||{};return t.isFunction(l)&&(l=l(this.$element)),e.syncCssClasses(s,this.$element,r),s.css(l),s.addClass(o),s},n}),e.define("select2/compat/initSelection",["jquery"],function(t){function e(t,e,i){i.get("debug")&&window.console&&console.warn&&console.warn("Select2: The `initSelection` option has been deprecated in favor of a custom data adapter that overrides the `current` method. This method is now called multiple times instead of a single time when the instance is initialized. Support will be removed for the `initSelection` option in future versions of Select2"),this.initSelection=i.get("initSelection"),this._isInitialized=!1,t.call(this,e,i)}return e.prototype.current=function(e,i){var n=this;return this._isInitialized?void e.call(this,i):void this.initSelection.call(null,this.$element,function(e){n._isInitialized=!0,t.isArray(e)||(e=[e]),i(e)})},e}),e.define("select2/compat/inputData",["jquery"],function(t){function e(t,e,i){this._currentData=[],this._valueSeparator=i.get("valueSeparator")||",","hidden"===e.prop("type")&&i.get("debug")&&console&&console.warn&&console.warn("Select2: Using a hidden input with Select2 is no longer supported and may stop working in the future. It is recommended to use a `<select>` element instead."),t.call(this,e,i)}return e.prototype.current=function(e,i){function n(e,i){var s=[];return e.selected||-1!==t.inArray(e.id,i)?(e.selected=!0,s.push(e)):e.selected=!1,e.children&&s.push.apply(s,n(e.children,i)),s}for(var s=[],o=0;o<this._currentData.length;o++){var r=this._currentData[o];s.push.apply(s,n(r,this.$element.val().split(this._valueSeparator)))}i(s)},e.prototype.select=function(e,i){if(this.options.get("multiple")){var n=this.$element.val();n+=this._valueSeparator+i.id,this.$element.val(n),this.$element.trigger("change")}else this.current(function(e){t.map(e,function(t){t.selected=!1})}),this.$element.val(i.id),this.$element.trigger("change")},e.prototype.unselect=function(t,e){var i=this;e.selected=!1,this.current(function(t){for(var n=[],s=0;s<t.length;s++){var o=t[s];e.id!=o.id&&n.push(o.id)}i.$element.val(n.join(i._valueSeparator)),i.$element.trigger("change")})},e.prototype.query=function(t,e,i){for(var n=[],s=0;s<this._currentData.length;s++){var o=this._currentData[s],r=this.matches(e,o);null!==r&&n.push(r)}i({results:n})},e.prototype.addOptions=function(e,i){var n=t.map(i,function(e){return t.data(e[0],"data")});this._currentData.push.apply(this._currentData,n)},e}),e.define("select2/compat/matcher",["jquery"],function(t){function e(e){function i(i,n){var s=t.extend(!0,{},n);if(null==i.term||""===t.trim(i.term))return s;if(n.children){for(var o=n.children.length-1;o>=0;o--){var r=n.children[o],a=e(i.term,r.text,r);a||s.children.splice(o,1)}if(s.children.length>0)return s}return e(i.term,n.text,n)?s:null}return i}return e}),e.define("select2/compat/query",[],function(){function t(t,e,i){i.get("debug")&&window.console&&console.warn&&console.warn("Select2: The `query` option has been deprecated in favor of a custom data adapter that overrides the `query` method. Support will be removed for the `query` option in future versions of Select2."),t.call(this,e,i)}return t.prototype.query=function(t,e,i){e.callback=i;var n=this.options.get("query");n.call(null,e)},t}),e.define("select2/dropdown/attachContainer",[],function(){function t(t,e,i){t.call(this,e,i)}return t.prototype.position=function(t,e,i){var n=i.find(".dropdown-wrapper");n.append(e),e.addClass("select2-dropdown--below"),i.addClass("select2-container--below")},t}),e.define("select2/dropdown/stopPropagation",[],function(){function t(){}return t.prototype.bind=function(t,e,i){t.call(this,e,i);var n=["blur","change","click","dblclick","focus","focusin","focusout","input","keydown","keyup","keypress","mousedown","mouseenter","mouseleave","mousemove","mouseover","mouseup","search","touchend","touchstart"];this.$dropdown.on(n.join(" "),function(t){t.stopPropagation()})},t}),e.define("select2/selection/stopPropagation",[],function(){function t(){}return t.prototype.bind=function(t,e,i){t.call(this,e,i);var n=["blur","change","click","dblclick","focus","focusin","focusout","input","keydown","keyup","keypress","mousedown","mouseenter","mouseleave","mousemove","mouseover","mouseup","search","touchend","touchstart"];this.$selection.on(n.join(" "),function(t){t.stopPropagation()})},t}),function(i){"function"==typeof e.define&&e.define.amd?e.define("jquery-mousewheel",["jquery"],i):"object"==typeof exports?module.exports=i:i(t)}(function(t){function e(e){var r=e||window.event,a=l.call(arguments,1),u=0,h=0,d=0,p=0,f=0,m=0;if(e=t.event.fix(r),e.type="mousewheel","detail"in r&&(d=-1*r.detail),"wheelDelta"in r&&(d=r.wheelDelta),"wheelDeltaY"in r&&(d=r.wheelDeltaY),"wheelDeltaX"in r&&(h=-1*r.wheelDeltaX),"axis"in r&&r.axis===r.HORIZONTAL_AXIS&&(h=-1*d,d=0),u=0===d?h:d,"deltaY"in r&&(d=-1*r.deltaY,u=d),"deltaX"in r&&(h=r.deltaX,0===d&&(u=-1*h)),0!==d||0!==h){if(1===r.deltaMode){var g=t.data(this,"mousewheel-line-height");u*=g,d*=g,h*=g}else if(2===r.deltaMode){var v=t.data(this,"mousewheel-page-height");u*=v,d*=v,h*=v}if(p=Math.max(Math.abs(d),Math.abs(h)),(!o||o>p)&&(o=p,n(r,p)&&(o/=40)),n(r,p)&&(u/=40,h/=40,d/=40),u=Math[u>=1?"floor":"ceil"](u/o),h=Math[h>=1?"floor":"ceil"](h/o),d=Math[d>=1?"floor":"ceil"](d/o),c.settings.normalizeOffset&&this.getBoundingClientRect){var y=this.getBoundingClientRect();f=e.clientX-y.left,m=e.clientY-y.top}return e.deltaX=h,e.deltaY=d,e.deltaFactor=o,e.offsetX=f,e.offsetY=m,e.deltaMode=0,a.unshift(e,u,h,d),s&&clearTimeout(s),s=setTimeout(i,200),(t.event.dispatch||t.event.handle).apply(this,a)}}function i(){o=null}function n(t,e){return c.settings.adjustOldDeltas&&"mousewheel"===t.type&&e%120===0}var s,o,r=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],a="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],l=Array.prototype.slice;if(t.event.fixHooks)for(var u=r.length;u;)t.event.fixHooks[r[--u]]=t.event.mouseHooks;var c=t.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var i=a.length;i;)this.addEventListener(a[--i],e,!1);else this.onmousewheel=e;t.data(this,"mousewheel-line-height",c.getLineHeight(this)),t.data(this,"mousewheel-page-height",c.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var i=a.length;i;)this.removeEventListener(a[--i],e,!1);else this.onmousewheel=null;t.removeData(this,"mousewheel-line-height"),t.removeData(this,"mousewheel-page-height")},getLineHeight:function(e){var i=t(e),n=i["offsetParent"in t.fn?"offsetParent":"parent"]();return n.length||(n=t("body")),parseInt(n.css("fontSize"),10)||parseInt(i.css("fontSize"),10)||16},getPageHeight:function(e){return t(e).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};t.fn.extend({mousewheel:function(t){return t?this.bind("mousewheel",t):this.trigger("mousewheel")},unmousewheel:function(t){return this.unbind("mousewheel",t)}})}),e.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults"],function(t,e,i,n){if(null==t.fn.select2){var s=["open","close","destroy"];t.fn.select2=function(e){if(e=e||{},"object"==typeof e)return this.each(function(){var n=t.extend(!0,{},e);new i(t(this),n)}),this;if("string"==typeof e){var n,o=Array.prototype.slice.call(arguments,1);return this.each(function(){var i=t(this).data("select2");null==i&&window.console&&console.error&&console.error("The select2('"+e+"') method was called on an element that is not using Select2."),n=i[e].apply(i,o)}),t.inArray(e,s)>-1?this:n}throw new Error("Invalid arguments for Select2: "+e)}}return null==t.fn.select2.defaults&&(t.fn.select2.defaults=n),i}),{define:e.define,require:e.require}}(),i=e.require("jquery.select2");return t.fn.select2.amd=e,i}),/*!
 * clipboard.js v1.5.10
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Clipboard=t()}}(function(){var t;return function e(t,i,n){function s(r,a){if(!i[r]){if(!t[r]){var l="function"==typeof require&&require;if(!a&&l)return l(r,!0);if(o)return o(r,!0);var u=new Error("Cannot find module '"+r+"'");throw u.code="MODULE_NOT_FOUND",u}var c=i[r]={exports:{}};t[r][0].call(c.exports,function(e){var i=t[r][1][e];return s(i?i:e)},c,c.exports,e,t,i,n)}return i[r].exports}for(var o="function"==typeof require&&require,r=0;r<n.length;r++)s(n[r]);return s}({1:[function(t,e){var i=t("matches-selector");e.exports=function(t,e,n){for(var s=n?t:t.parentNode;s&&s!==document;){if(i(s,e))return s;s=s.parentNode}}},{"matches-selector":5}],2:[function(t,e){function i(t,e,i,s,o){var r=n.apply(this,arguments);return t.addEventListener(i,r,o),{destroy:function(){t.removeEventListener(i,r,o)}}}function n(t,e,i,n){return function(i){i.delegateTarget=s(i.target,e,!0),i.delegateTarget&&n.call(t,i)}}var s=t("closest");e.exports=i},{closest:1}],3:[function(t,e,i){i.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},i.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||i.node(t[0]))},i.string=function(t){return"string"==typeof t||t instanceof String},i.fn=function(t){var e=Object.prototype.toString.call(t);return"[object Function]"===e}},{}],4:[function(t,e){function i(t,e,i){if(!t&&!e&&!i)throw new Error("Missing required arguments");if(!r.string(e))throw new TypeError("Second argument must be a String");if(!r.fn(i))throw new TypeError("Third argument must be a Function");if(r.node(t))return n(t,e,i);if(r.nodeList(t))return s(t,e,i);if(r.string(t))return o(t,e,i);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function n(t,e,i){return t.addEventListener(e,i),{destroy:function(){t.removeEventListener(e,i)}}}function s(t,e,i){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,i)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,i)})}}}function o(t,e,i){return a(document.body,t,e,i)}var r=t("./is"),a=t("delegate");e.exports=i},{"./is":3,delegate:2}],5:[function(t,e){function i(t,e){if(s)return s.call(t,e);for(var i=t.parentNode.querySelectorAll(e),n=0;n<i.length;++n)if(i[n]==t)return!0;return!1}var n=Element.prototype,s=n.matchesSelector||n.webkitMatchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector;e.exports=i},{}],6:[function(t,e){function i(t){var e;if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName)t.focus(),t.setSelectionRange(0,t.value.length),e=t.value;else{t.hasAttribute("contenteditable")&&t.focus();var i=window.getSelection(),n=document.createRange();n.selectNodeContents(t),i.removeAllRanges(),i.addRange(n),e=i.toString()}return e}e.exports=i},{}],7:[function(t,e){function i(){}i.prototype={on:function(t,e,i){var n=this.e||(this.e={});return(n[t]||(n[t]=[])).push({fn:e,ctx:i}),this},once:function(t,e,i){function n(){s.off(t,n),e.apply(i,arguments)}var s=this;return n._=e,this.on(t,n,i)},emit:function(t){var e=[].slice.call(arguments,1),i=((this.e||(this.e={}))[t]||[]).slice(),n=0,s=i.length;for(n;s>n;n++)i[n].fn.apply(i[n].ctx,e);return this},off:function(t,e){var i=this.e||(this.e={}),n=i[t],s=[];if(n&&e)for(var o=0,r=n.length;r>o;o++)n[o].fn!==e&&n[o].fn._!==e&&s.push(n[o]);return s.length?i[t]=s:delete i[t],this}},e.exports=i},{}],8:[function(e,i,n){!function(s,o){if("function"==typeof t&&t.amd)t(["module","select"],o);else if("undefined"!=typeof n)o(i,e("select"));else{var r={exports:{}};o(r,s.select),s.clipboardAction=r.exports}}(this,function(t,e){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var s=i(e),o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},r=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),a=function(){function t(e){n(this,t),this.resolveOptions(e),this.initSelection()}return t.prototype.resolveOptions=function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action=t.action,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""},t.prototype.initSelection=function(){this.text?this.selectFake():this.target&&this.selectTarget()},t.prototype.selectFake=function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandler=document.body.addEventListener("click",function(){return t.removeFake()}),this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="fixed",this.fakeElem.style[e?"right":"left"]="-9999px",this.fakeElem.style.top=(window.pageYOffset||document.documentElement.scrollTop)+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,document.body.appendChild(this.fakeElem),this.selectedText=(0,s["default"])(this.fakeElem),this.copyText()},t.prototype.removeFake=function(){this.fakeHandler&&(document.body.removeEventListener("click"),this.fakeHandler=null),this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)},t.prototype.selectTarget=function(){this.selectedText=(0,s["default"])(this.target),this.copyText()},t.prototype.copyText=function(){var t=void 0;try{t=document.execCommand(this.action)}catch(e){t=!1}this.handleResult(t)},t.prototype.handleResult=function(t){t?this.emitter.emit("success",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)}):this.emitter.emit("error",{action:this.action,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})},t.prototype.clearSelection=function(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()},t.prototype.destroy=function(){this.removeFake()},r(t,[{key:"action",set:function(){var t=arguments.length<=0||void 0===arguments[0]?"copy":arguments[0];if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==("undefined"==typeof t?"undefined":o(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),t}();t.exports=a})},{select:6}],9:[function(e,i,n){!function(s,o){if("function"==typeof t&&t.amd)t(["module","./clipboard-action","tiny-emitter","good-listener"],o);else if("undefined"!=typeof n)o(i,e("./clipboard-action"),e("tiny-emitter"),e("good-listener"));else{var r={exports:{}};o(r,s.clipboardAction,s.tinyEmitter,s.goodListener),s.clipboard=r.exports}}(this,function(t,e,i,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function l(t,e){var i="data-clipboard-"+t;if(e.hasAttribute(i))return e.getAttribute(i)}var u=s(e),c=s(i),h=s(n),d=function(t){function e(i,n){o(this,e);var s=r(this,t.call(this));return s.resolveOptions(n),s.listenClick(i),s}return a(e,t),e.prototype.resolveOptions=function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText},e.prototype.listenClick=function(t){var e=this;this.listener=(0,h["default"])(t,"click",function(t){return e.onClick(t)})},e.prototype.onClick=function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new u["default"]({action:this.action(e),target:this.target(e),text:this.text(e),trigger:e,emitter:this})},e.prototype.defaultAction=function(t){return l("action",t)},e.prototype.defaultTarget=function(t){var e=l("target",t);return e?document.querySelector(e):void 0},e.prototype.defaultText=function(t){return l("text",t)},e.prototype.destroy=function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)},e}(c["default"]);t.exports=d})},{"./clipboard-action":8,"good-listener":4,"tiny-emitter":7}]},{},[9])(9)}),function(){var t;t={collapsedHeight:120,moreLink:'<a href="#">See more</a>'},onInit(function(){var t,e,i;return $("#activity-media").affix({offset:{bottom:function(){return this.bottom=$(".footer").outerHeight(!0)}}}),t=$("body").data("lang"),i="See More",readmore("#advices",{collapsedHeight:160,moreLink:"<a href='#'>"+i+"</a>"},!0),e=function(t){return""+t=="true"},$("#activity-items").on("click",".icon-action-activity",function(t){var e,i,n,s,o,r,a,l,u,c,h,d;return t.preventDefault(),n=$(t.target),l="fa-plus",a="fa-minus",s="fa-check",o="fa-close",u=t.currentTarget,e=u.attributes[1].value,c=u.attributes[2].value,h="/activities/add_activity/"+e+"/"+c,d="/activities/remove_activity/"+e+"/"+c,i=$('a[data-activity-id="'+e+'"][data-list-id="'+c+'"][class="icon-complete-activity"]'),r=i.children()[0],n.hasClass(l)?$.ajax({method:"GET",url:h,dataType:"json",success:function(){return n.switchClass(l,a,0)}}):$.ajax({method:"GET",url:d,dataType:"json",success:function(t){var i,u;return s="fa-check",o="fa-close",n.switchClass(a,l,0),u=t.change_icon,jQuery.inArray(o,r.className.split(" "))>0&&(jQuery.inArray("fa-4x",r.className.split(" "))>0?r.className="fa fa-check fa-4x":r.className="fa fa-check fa-2x"),u?(i=$("#dropdown-menu-activity-"+e),i.empty(),i.append(t.menu)):void 0}})}),$("#activity-items").on("click",".icon-complete-activity",function(t){var e,i,n,s,o,r,a,l,u,c;return t.preventDefault(),n=$(t.target),a="fa-plus",r="fa-minus",s="fa-check",o="fa-close",l=t.currentTarget,e=l.attributes[1].value,u=l.attributes[2].value,i=$('a[data-activity-id="'+e+'"][data-list-id="'+u+'"][class="icon-action-activity"]').children()[0],c="/activities/complete_activity/"+e+"/"+u,$.ajax({method:"GET",url:c,dataType:"json",success:function(){return jQuery.inArray(a,i.attributes[0].value.split(" "))>0&&n.hasClass(s)?(jQuery.inArray("fa-4x",i.className.split(" "))>0?i.className="fa fa-minus fa-4x":i.className="fa fa-minus fa-2x",n.switchClass(s,o,0)):jQuery.inArray(r,i.attributes[0].value.split(" "))>0&&n.hasClass(s)?n.switchClass(s,o,0):jQuery.inArray(r,i.attributes[0].value.split(" "))>0&&n.hasClass(o)?n.switchClass(o,s,0):void 0}})}),$("#activity-items").on("click",".button-action-activity",function(t){var i,n,s,o,r,a,l,u,c,h,d;return t.preventDefault(),o=$(t.target),s=o[0],r=o[1],i=s.attributes[1].value,c=s.attributes[2].value,n=s.attributes[3].value,h="/activities/add_activity/"+i+"/"+c,d="/activities/remove_activity/"+i+"/"+c,a=$('a[data-activity-id="'+i+'"][class="icon-action-activity"] > i'),u="fa-plus",l="fa-minus",e(n)?$.ajax({method:"GET",url:d,dataType:"json",success:function(t){return s.dataset.added="false",s.text=t.text_button,t.change_icon?a.switchClass(l,u,0):void 0}}):$.ajax({method:"GET",url:h,dataType:"json",success:function(t){return s.dataset.added="true",s.text=t.text_button,t.change_icon?a.switchClass(u,l,0):void 0}})})})}.call(this),function(){}.call(this),function(){}.call(this),function(){onInit(function(){var t;return t=function(t){return""+t=="true"},$("#activity-items,#people-want-grid,#people_complete,#friends-in-common-wolo,#friends-of-friends, #people-complete-grid").on("click",".friendship-status",function(t){var e,i,n,s,o;return t.preventDefault(),e=$(t.target),n="fa-plus",i="fa-check",s=t.currentTarget,o="/friendships",e.hasClass(n)?$.ajax({method:"POST",url:o,data:s.dataset,dataType:"json",success:function(){return e.switchClass(n,i,0)}}):$.ajax({method:"DELETE",url:o,data:s.dataset,dataType:"json",success:function(){return e.switchClass(i,n,0)}})})})}.call(this),function(){}.call(this),$(document).ready(function(){function t(t){var e=$("#available-activities option[value="+t.id+"]"),i=e.attr("data-image-url"),n=$('<div class="act-container-result"><img src="'+i+'" class="act-searched" /><span class="activity-name-format">'+t.text+"</span></div>");return n}$("[data-toggle=offcanvas]").click(function(){$(".row-offcanvas").toggleClass("active")}),$(".best_in_place").best_in_place(),$(".meter > span").each(function(){$(this).data("origWidth",$(this).width()).width(0).animate({width:$(this).data("origWidth")},1200)}),search_bar=$("#available-activities"),search_bar.select2({theme:"bootstrap",placeholder:"Discover new activities",allowClear:!0,templateResult:t}),search_bar.on("select2:select",function(t){var e=JSON.stringify(t.params,function(t,e){return e&&e.nodeName?"[DOM node]":e instanceof $.Event?"[$.Event]":e}),e=JSON.parse(e);window.location.href="/activities/"+e.data.id}),search_bar.select2("val",""),$('b[role="presentation"]').hide(),$(".select2-selection__arrow").append('<i class="fa fa-search"></i>'),new Clipboard(".copy-activity")});
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




;
