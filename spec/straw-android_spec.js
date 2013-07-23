
describe('straw', function () {

    it('exists', function () {
        expect(window.straw).not.toBe(null);
    });

    it('is a object', function () {
        expect(typeof straw === 'object').toBe(true);
    });
});
