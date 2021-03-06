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

'use strict';

// MODULES //

var tape = require( 'tape' );
var isFunction = require( '@stdlib/assert-is-function' );
var hasOwnProp = require( '@stdlib/assert-has-own-property' );
var quantile = require( '@stdlib/stats-base-dists-lognormal-quantile' );
var cdf = require( '@stdlib/stats-base-dists-lognormal-cdf' );
var logcdf = require( '@stdlib/stats-base-dists-lognormal-logcdf' );
var logpdf = require( '@stdlib/stats-base-dists-lognormal-logpdf' );
var pdf = require( '@stdlib/stats-base-dists-lognormal-pdf' );
var kurtosis = require( '@stdlib/stats-base-dists-lognormal-kurtosis' );
var skewness = require( '@stdlib/stats-base-dists-lognormal-skewness' );
var variance = require( '@stdlib/stats-base-dists-lognormal-variance' );
var entropy = require( '@stdlib/stats-base-dists-lognormal-entropy' );
var median = require( '@stdlib/stats-base-dists-lognormal-median' );
var stdev = require( '@stdlib/stats-base-dists-lognormal-stdev' );
var mode = require( '@stdlib/stats-base-dists-lognormal-mode' );
var mean = require( '@stdlib/stats-base-dists-lognormal-mean' );
var LogNormal = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof LogNormal, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if provided a `sigma` argument which is not a number primitive', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		NaN,
		true,
		false,
		void 0,
		null,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			// eslint-disable-next-line no-new
			new LogNormal( value, 1.0 );
		};
	}
});

tape( 'the function throws an error if provided a `sigma` argument which is not a positive number', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		-5.0,
		0.0,
		NaN,
		true,
		false,
		void 0,
		null,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			// eslint-disable-next-line no-new
			new LogNormal( 2.0, value );
		};
	}
});

tape( 'if provided arguments, the function requires both `mu` and `sigma`', function test( t ) {
	t.throws( foo, TypeError, 'throws an error' );
	t.end();

	function foo() {
		// eslint-disable-next-line no-new
		new LogNormal( 2.0 );
	}
});

tape( 'the function returns a new distribution instance (default parameters)', function test( t ) {
	var lognormal = new LogNormal();
	t.strictEqual( lognormal instanceof LogNormal, true, 'returns an instance' );
	t.end();
});

tape( 'the function returns a new distribution instance (custom parameters)', function test( t ) {
	var lognormal = new LogNormal( 2.0, 4.0 );
	t.strictEqual( lognormal instanceof LogNormal, true, 'returns an instance' );
	t.end();
});

tape( 'the function can be invoked without the new operator', function test( t ) {
	// eslint-disable-next-line new-cap
	var lognormal = LogNormal();
	t.strictEqual( lognormal instanceof LogNormal, true, 'returns an instance' );

	// eslint-disable-next-line new-cap
	lognormal = LogNormal( 2.0, 4.0 );
	t.strictEqual( lognormal instanceof LogNormal, true, 'returns an instance' );

	t.end();
});

tape( 'the created distribution has a property for getting and setting `mu`', function test( t ) {
	var lognormal;

	lognormal = new LogNormal( 2.0, 4.0 );
	t.strictEqual( hasOwnProp( lognormal, 'mu' ), true, 'has property' );
	t.strictEqual( lognormal.mu, 2.0, 'returns expected value' );

	lognormal.mu = 3.0;
	t.strictEqual( lognormal.mu, 3.0, 'returns expected value' );

	t.end();
});

tape( 'the created distribution throws an error if one attempts to set `mu` to a value which is not a number primitive', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		NaN,
		true,
		false,
		void 0,
		null,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var lognormal = new LogNormal();
			lognormal.mu = value;
		};
	}
});

tape( 'the created distribution has a property for getting and setting `sigma`', function test( t ) {
	var lognormal;

	lognormal = new LogNormal( 2.0, 4.0 );
	t.strictEqual( hasOwnProp( lognormal, 'sigma' ), true, 'has property' );
	t.strictEqual( lognormal.sigma, 4.0, 'returns expected value' );

	lognormal.sigma = 3.0;
	t.strictEqual( lognormal.sigma, 3.0, 'returns expected value' );

	t.end();
});

tape( 'the created distribution throws an error if one attempts to set `sigma` to a value which is not a positive number', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		-5.0,
		0.0,
		NaN,
		true,
		false,
		void 0,
		null,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var lognormal = new LogNormal();
			lognormal.sigma = value;
		};
	}
});

tape( 'the distribution prototype has a property for retrieving the distribution entropy', function test( t ) {
	var lognormal;

	t.strictEqual( hasOwnProp( LogNormal.prototype, 'entropy' ), true, 'has property' );

	lognormal = new LogNormal();
	t.strictEqual( lognormal.entropy, entropy( 0.0, 1.0 ), 'returns expected value' );

	t.end();
});

tape( 'the distribution prototype has a property for retrieving the distribution kurtosis', function test( t ) {
	var lognormal;

	t.strictEqual( hasOwnProp( LogNormal.prototype, 'kurtosis' ), true, 'has property' );

	lognormal = new LogNormal( 2.0, 4.0 );
	t.strictEqual( lognormal.kurtosis, kurtosis( 2.0, 4.0 ), 'returns expected value' );

	t.end();
});

tape( 'the distribution prototype has a property for retrieving the distribution mean', function test( t ) {
	var lognormal;

	t.strictEqual( hasOwnProp( LogNormal.prototype, 'mean' ), true, 'has property' );

	lognormal = new LogNormal();
	t.strictEqual( lognormal.mean, mean( 0.0, 1.0 ), 'returns expected value' );

	t.end();
});

tape( 'the distribution prototype has a property for retrieving the distribution median', function test( t ) {
	var lognormal;

	t.strictEqual( hasOwnProp( LogNormal.prototype, 'median' ), true, 'has property' );

	lognormal = new LogNormal( 5.0, 2.0 );
	t.strictEqual( lognormal.median, median( 5.0, 2.0 ), 'returns expected value' );

	t.end();
});

tape( 'the distribution prototype has a property for retrieving the distribution mode', function test( t ) {
	var lognormal;

	t.strictEqual( hasOwnProp( LogNormal.prototype, 'mode' ), true, 'has property' );

	lognormal = new LogNormal( 2.0, 3.0 );
	t.strictEqual( lognormal.mode, mode( 2.0, 3.0 ), 'returns expected value' );

	t.end();
});

tape( 'the distribution prototype has a property for retrieving the distribution skewness', function test( t ) {
	var lognormal;

	t.strictEqual( hasOwnProp( LogNormal.prototype, 'skewness' ), true, 'has property' );

	lognormal = new LogNormal( 0.5, 0.5 );
	t.strictEqual( lognormal.skewness, skewness( 0.5, 0.5 ), 'returns expected value' );

	t.end();
});

tape( 'the distribution prototype has a property for retrieving the distribution standard deviation', function test( t ) {
	var lognormal;

	t.strictEqual( hasOwnProp( LogNormal.prototype, 'stdev' ), true, 'has property' );

	lognormal = new LogNormal( 3.0, 1.0 );
	t.strictEqual( lognormal.stdev, stdev( 3.0, 1.0 ), 'returns expected value' );

	t.end();
});

tape( 'the distribution prototype has a property for retrieving the distribution variance', function test( t ) {
	var lognormal;

	t.strictEqual( hasOwnProp( LogNormal.prototype, 'variance' ), true, 'has property' );

	lognormal = new LogNormal( 3.0, 1.0 );
	t.strictEqual( lognormal.variance, variance( 3.0, 1.0 ), 'returns expected value' );

	t.end();
});

tape( 'the distribution prototype has a method for evaluating the cumulative distribution function (CDF)', function test( t ) {
	var lognormal;
	var y;

	t.strictEqual( hasOwnProp( LogNormal.prototype, 'cdf' ), true, 'has property' );
	t.strictEqual( isFunction( LogNormal.prototype.cdf ), true, 'has method' );

	lognormal = new LogNormal();
	y = lognormal.cdf( 0.5 );

	t.strictEqual( y, cdf( 0.5, 0.0, 1.0 ), 'returns expected value' );
	t.end();
});

tape( 'the distribution prototype has a method for evaluating the natural logarithm of the probability density function (PDF)', function test( t ) {
	var lognormal;
	var y;

	t.strictEqual( hasOwnProp( LogNormal.prototype, 'logpdf' ), true, 'has property' );
	t.strictEqual( isFunction( LogNormal.prototype.logpdf ), true, 'has method' );

	lognormal = new LogNormal();
	y = lognormal.logpdf( 0.2 );

	t.strictEqual( y, logpdf( 0.2, 0.0, 1.0 ), 'returns expected value' );
	t.end();
});

tape( 'the distribution prototype has a method for evaluating the natural logarithm of the cumulative distribution function (CDF)', function test( t ) {
	var lognormal;
	var y;

	t.strictEqual( hasOwnProp( LogNormal.prototype, 'logcdf' ), true, 'has property' );
	t.strictEqual( isFunction( LogNormal.prototype.logcdf ), true, 'has method' );

	lognormal = new LogNormal();
	y = lognormal.logcdf( 0.2 );

	t.strictEqual( y, logcdf( 0.2, 0.0, 1.0 ), 'returns expected value' );
	t.end();
});

tape( 'the distribution prototype has a method for evaluating the probability density function (PDF)', function test( t ) {
	var lognormal;
	var y;

	t.strictEqual( hasOwnProp( LogNormal.prototype, 'pdf' ), true, 'has property' );
	t.strictEqual( isFunction( LogNormal.prototype.pdf ), true, 'has method' );

	lognormal = new LogNormal();
	y = lognormal.pdf( 0.2 );

	t.strictEqual( y, pdf( 0.2, 0.0, 1.0 ), 'returns expected value' );
	t.end();
});

tape( 'the distribution prototype has a method for evaluating the quantile function', function test( t ) {
	var lognormal;
	var y;

	t.strictEqual( hasOwnProp( LogNormal.prototype, 'quantile' ), true, 'has property' );
	t.strictEqual( isFunction( LogNormal.prototype.quantile ), true, 'has method' );

	lognormal = new LogNormal();
	y = lognormal.quantile( 0.8 );

	t.strictEqual( y, quantile( 0.8, 0.0, 1.0 ), 'returns expected value' );
	t.end();
});
