
var describe = window.describe;
var it = window.it;
var expect = window.expect;
var sinon = window.sinon;
var straw = window.straw;

describe('straw.http', function () {
    'use strict';

    it('exists', function () {
        expect(straw.http).not.toEqual(null);
    });

    it('is a object', function () {
        expect(typeof straw.http === 'object').toBe(true);
    });

    it('has methods', function () {
        expect(typeof straw.http.get === 'function').toBe(true);
    });

    describe('straw.http.get', function () {

        it('calls exec of straw', function () {
            window.JS_TO_NATIVE_INTERFACE = {exec: function () {}};
            sinon.spy(straw, 'exec');

            var success = sinon.spy();
            var error = sinon.spy();

            straw.http.get('http://example.com/', success, error);

            expect(straw.exec.calledOnce).toBe(true);
            expect(straw.exec.getCall(0).args[0]).toBe('http');
            expect(straw.exec.getCall(0).args[1]).toBe('get');
            expect(straw.exec.getCall(0).args[2]).toEqual({url: 'http://example.com/'});
            expect(straw.exec.getCall(0).args[3]).toBe(success);
            expect(straw.exec.getCall(0).args[4]).toBe(error);

            straw.exec.restore();
        });

    });

});
