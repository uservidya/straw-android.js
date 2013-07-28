
describe('straw', function () {
    'use strict';

    it('exists', function () {
        expect(window.straw).not.toEqual(null);
    });

    it('is a object', function () {
        expect(typeof window.straw === 'object').toBe(true);
    });

    it('has methods', function () {
        expect(typeof straw.exec === 'function').toBe(true);
        expect(typeof straw.storeCallback === 'function').toBe(true);
        expect(typeof straw.retrieveCallback === 'function').toBe(true);
        expect(typeof straw.nativeCallback === 'function').toBe(true);
    });

    describe('exec', function() {

        it('calls exec of JS_TO_NATIVE_CALLBACK\'s exec and stores a callback with id', function () {
            var a = function () {};
            var b = function () {};

            sinon.spy(straw, 'storeCallback');

            var nativeApi = window['JS_TO_NATIVE_INTERFACE'] = {exec: function () {}};
            sinon.spy(nativeApi, 'exec');

            straw.exec('fooPlugin', 'barAction', {value: 1}, a, b);

            expect(straw.storeCallback.calledOnce).toBe(true);

            var storedCallback = straw.storeCallback.getCall(0).args[0];
            expect(storedCallback).not.toEqual(null);
            expect(storedCallback.success).toBe(a);
            expect(storedCallback.fail).toBe(b);

            var callbackId = storedCallback.id;
            expect(callbackId).not.toEqual(null);

            expect(nativeApi.exec.calledOnce).toBe(true);
            var nativeCall = nativeApi.exec.getCall(0);

            expect(nativeCall.args[0]).toEqual('fooPlugin');
            expect(nativeCall.args[1]).toEqual('barAction');
            expect(nativeCall.args[2]).toEqual('{"value":1}');
            expect(nativeCall.args[3]).toEqual(callbackId);

            expect(straw.retrieveCallback(callbackId)).toBe(storedCallback);

            nativeApi.exec.restore();
            straw.storeCallback.restore();
        });
    });
});
