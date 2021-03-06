/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* eslint-disable no-restricted-syntax, no-invalid-this */

'use strict';

// MODULES //

var defineProperty = require( '@stdlib/utils-define-property' );
var setReadOnly = require( '@stdlib/utils-define-nonenumerable-read-only-property' );
var setReadOnlyAccessor = require( '@stdlib/utils-define-nonenumerable-read-only-accessor' );
var isPositive = require( '@stdlib/assert-is-positive-number' ).isPrimitive;
var isNumber = require( '@stdlib/assert-is-number' ).isPrimitive;
var isnan = require( '@stdlib/assert-is-nan' );
var entropy = require( '@stdlib/stats-base-dists-lognormal-entropy' );
var kurtosis = require( '@stdlib/stats-base-dists-lognormal-kurtosis' );
var mean = require( '@stdlib/stats-base-dists-lognormal-mean' );
var median = require( '@stdlib/stats-base-dists-lognormal-median' );
var mode = require( '@stdlib/stats-base-dists-lognormal-mode' );
var skewness = require( '@stdlib/stats-base-dists-lognormal-skewness' );
var stdev = require( '@stdlib/stats-base-dists-lognormal-stdev' );
var variance = require( '@stdlib/stats-base-dists-lognormal-variance' );
var cdf = require( '@stdlib/stats-base-dists-lognormal-cdf' );
var logcdf = require( '@stdlib/stats-base-dists-lognormal-logcdf' );
var logpdf = require( '@stdlib/stats-base-dists-lognormal-logpdf' );
var pdf = require( '@stdlib/stats-base-dists-lognormal-pdf' );
var quantile = require( '@stdlib/stats-base-dists-lognormal-quantile' );
var format = require( '@stdlib/string-format' );


// FUNCTIONS //

/**
* Evaluates the cumulative distribution function (CDF).
*
* @private
* @param {number} x - input value
* @returns {Probability} evaluated CDF
*/
function lognormalCDF( x ) {
	return cdf( x, this.mu, this.sigma );
}

/**
* Evaluates the natural logarithm of the cumulative distribution function (CDF).
*
* @private
* @param {number} x - input value
* @returns {number} evaluated logCDF
*/
function lognormalLogCDF( x ) {
	return logcdf( x, this.mu, this.sigma );
}

/**
* Evaluates the natural logarithm of the probability density function (PDF).
*
* @private
* @param {number} x - input value
* @returns {number} evaluated logPDF
*/
function lognormalLogPDF( x ) {
	return logpdf( x, this.mu, this.sigma );
}

/**
* Evaluates the probability density function (PDF).
*
* @private
* @param {number} x - input value
* @returns {number} evaluated PDF
*/
function lognormalPDF( x ) {
	return pdf( x, this.mu, this.sigma );
}

/**
* Evaluates the quantile function.
*
* @private
* @param {Probability} p - input probability
* @returns {number} evaluated quantile function
*/
function lognormalQuantile( p ) {
	return quantile( p, this.mu, this.sigma );
}


// MAIN //

/**
* Lognormal distribution constructor.
*
* @constructor
* @param {number} [mu=0.0] - location parameter
* @param {PositiveNumber} [sigma=1.0] - scale parameter
* @throws {TypeError} `sigma` must be a positive number
* @returns {LogNormal} distribution instance
*
* @example
* var lognormal = new LogNormal( 1.0, 1.0 );
*
* var y = lognormal.cdf( 1.5 );
* // returns ~0.276
*
* var v = lognormal.mean;
* // returns ~4.482
*/
function LogNormal() {
	var sigma;
	var mu;
	if ( !(this instanceof LogNormal) ) {
		if ( arguments.length === 0 ) {
			return new LogNormal();
		}
		return new LogNormal( arguments[ 0 ], arguments[ 1 ] );
	}
	if ( arguments.length ) {
		mu = arguments[ 0 ];
		sigma = arguments[ 1 ];
		if ( !isNumber( mu ) || isnan( mu ) ) {
			throw new TypeError( format( 'invalid argument. Location parameter must be a number. Value: `%s`.', mu ) );
		}
		if ( !isPositive( sigma ) ) {
			throw new TypeError( format( 'invalid argument. Scale parameter must be a positive number. Value: `%s`.', sigma ) );
		}
	} else {
		mu = 0.0;
		sigma = 1.0;
	}
	defineProperty( this, 'mu', {
		'configurable': false,
		'enumerable': true,
		'get': function get() {
			return mu;
		},
		'set': function set( value ) {
			if ( !isNumber( value ) || isnan( value ) ) {
				throw new TypeError( format( 'invalid assignment. Must be a number. Value: `%s`.', value ) );
			}
			mu = value;
		}
	});
	defineProperty( this, 'sigma', {
		'configurable': false,
		'enumerable': true,
		'get': function get() {
			return sigma;
		},
		'set': function set( value ) {
			if ( !isPositive( value ) ) {
				throw new TypeError( format( 'invalid assignment. Must be a positive number. Value: `%s`.', value ) );
			}
			sigma = value;
		}
	});
	return this;
}

/**
* Lognormal distribution differential entropy.
*
* @name entropy
* @memberof LogNormal.prototype
* @type {number}
* @see [differential entropy]{@link https://en.wikipedia.org/wiki/Entropy_%28information_theory%29}
*
* @example
* var lognormal = new LogNormal( 4.0, 12.0 );
*
* var v = lognormal.entropy;
* // returns ~7.904
*/
setReadOnlyAccessor( LogNormal.prototype, 'entropy', function get() {
	return entropy( this.mu, this.sigma );
});

/**
* Lognormal distribution excess kurtosis.
*
* @name kurtosis
* @memberof LogNormal.prototype
* @type {number}
* @see [kurtosis]{@link https://en.wikipedia.org/wiki/Kurtosis}
*
* @example
* var lognormal = new LogNormal( 4.0, 12.0 );
*
* var v = lognormal.kurtosis;
* // returns 1.4243659274306933e+250
*/
setReadOnlyAccessor( LogNormal.prototype, 'kurtosis', function get() {
	return kurtosis( this.mu, this.sigma );
});

/**
* Lognormal distribution expected value.
*
* @name mean
* @memberof LogNormal.prototype
* @type {number}
* @see [expected value]{@link https://en.wikipedia.org/wiki/Expected_value}
*
* @example
* var lognormal = new LogNormal( 4.0, 12.0 );
*
* var v = lognormal.mean;
* // returns 1.0148003881138887e+33
*/
setReadOnlyAccessor( LogNormal.prototype, 'mean', function get() {
	return mean( this.mu, this.sigma );
});

/**
* Lognormal distribution median.
*
* @name median
* @memberof LogNormal.prototype
* @type {number}
* @see [median]{@link https://en.wikipedia.org/wiki/Median}
*
* @example
* var lognormal = new LogNormal( 4.0, 12.0 );
*
* var v = lognormal.median;
* // returns ~54.598
*/
setReadOnlyAccessor( LogNormal.prototype, 'median', function get() {
	return median( this.mu, this.sigma );
});

/**
* Lognormal distribution mode.
*
* @name mode
* @memberof LogNormal.prototype
* @type {number}
* @see [mode]{@link https://en.wikipedia.org/wiki/Mode_%28statistics%29}
*
* @example
* var lognormal = new LogNormal( 4.0, 12.0 );
*
* var v = lognormal.mode;
* // returns 1.580420060273613e-61
*/
setReadOnlyAccessor( LogNormal.prototype, 'mode', function get() {
	return mode( this.mu, this.sigma );
});

/**
* Lognormal distribution skewness.
*
* @name skewness
* @memberof LogNormal.prototype
* @type {number}
* @see [skewness]{@link https://en.wikipedia.org/wiki/Skewness}
*
* @example
* var lognormal = new LogNormal( 4.0, 12.0 );
*
* var v = lognormal.skewness;
* // returns 6.421080152185613e+93
*/
setReadOnlyAccessor( LogNormal.prototype, 'skewness', function get() {
	return skewness( this.mu, this.sigma );
});

/**
* Lognormal distribution standard deviation.
*
* @name stdev
* @memberof LogNormal.prototype
* @type {NonNegativeNumber}
* @see [standard deviation]{@link https://en.wikipedia.org/wiki/Standard_deviation}
*
* @example
* var lognormal = new LogNormal( 4.0, 12.0 );
*
* var v = lognormal.stdev;
* // returns 1.886180808490652e+64
*/
setReadOnlyAccessor( LogNormal.prototype, 'stdev', function get() {
	return stdev( this.mu, this.sigma );
});

/**
* Lognormal distribution variance.
*
* @name variance
* @memberof LogNormal.prototype
* @type {NonNegativeNumber}
* @see [variance]{@link https://en.wikipedia.org/wiki/Variance}
*
* @example
* var lognormal = new LogNormal( 4.0, 12.0 );
*
* var v = lognormal.variance;
* // returns 3.55767804231845e+128
*/
setReadOnlyAccessor( LogNormal.prototype, 'variance', function get() {
	return variance( this.mu, this.sigma );
});

/**
* Evaluates the cumulative distribution function (CDF).
*
* @name cdf
* @memberof LogNormal.prototype
* @type {Function}
* @param {number} x - input value
* @returns {number} evaluated CDF
* @see [cdf]{@link https://en.wikipedia.org/wiki/Cumulative_distribution_function}
*
* @example
* var lognormal = new LogNormal( 2.0, 4.0 );
*
* var v = lognormal.cdf( 0.5 );
* // returns ~0.25
*/
setReadOnly( LogNormal.prototype, 'cdf', lognormalCDF );

/**
* Evaluates the natural logarithm of the cumulative distribution function (CDF).
*
* @name logcdf
* @memberof LogNormal.prototype
* @type {Function}
* @param {number} x - input value
* @returns {number} evaluated logCDF
* @see [cdf]{@link https://en.wikipedia.org/wiki/Cumulative_distribution_function}
*
* @example
* var lognormal = new LogNormal( 2.0, 4.0 );
*
* var v = lognormal.logcdf( 0.5 );
* // returns ~-1.385
*/
setReadOnly( LogNormal.prototype, 'logcdf', lognormalLogCDF );

/**
* Evaluates the natural logarithm of the probability density function (PDF).
*
* @name logpdf
* @memberof LogNormal.prototype
* @type {Function}
* @param {number} x - input value
* @returns {number} evaluated logPDF
* @see [pdf]{@link https://en.wikipedia.org/wiki/Probability_density_function}
*
* @example
* var lognormal = new LogNormal( 2.0, 4.0 );
*
* var v = lognormal.logpdf( 0.8 );
* // returns ~-2.237
*/
setReadOnly( LogNormal.prototype, 'logpdf', lognormalLogPDF );

/**
* Evaluates the probability density function (PDF).
*
* @name pdf
* @memberof LogNormal.prototype
* @type {Function}
* @param {number} x - input value
* @returns {number} evaluated PDF
* @see [pdf]{@link https://en.wikipedia.org/wiki/Probability_density_function}
*
* @example
* var lognormal = new LogNormal( 2.0, 4.0 );
*
* var v = lognormal.pdf( 0.8 );
* // returns ~0.107
*/
setReadOnly( LogNormal.prototype, 'pdf', lognormalPDF );

/**
* Evaluates the quantile function.
*
* @name quantile
* @memberof LogNormal.prototype
* @type {Function}
* @param {Probability} p - input probability
* @returns {number} evaluated quantile function
* @see [quantile function]{@link https://en.wikipedia.org/wiki/Quantile_function}
*
* @example
* var lognormal = new LogNormal( 2.0, 4.0 );
*
* var v = lognormal.quantile( 0.5 );
* // returns ~7.389
*/
setReadOnly( LogNormal.prototype, 'quantile', lognormalQuantile );


// EXPORTS //

module.exports = LogNormal;
