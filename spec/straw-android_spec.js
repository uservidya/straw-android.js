
describe('straw', function () {

    it('exists', function () {
        expect(window.straw).not.toEqual(null);
    });

    it('is a object', function () {
        expect(typeof window.straw === 'object').toBe(true);
    });
});
