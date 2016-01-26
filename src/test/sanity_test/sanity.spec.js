System.register(['angular2/testing'], function(exports_1) {
    var testing_1;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            }],
        execute: function() {
            testing_1.describe('universal truths', function () {
                testing_1.it('should do math', function () {
                    testing_1.expect(1 + 1).toEqual(2);
                    testing_1.expect(5).toBeGreaterThan(4);
                });
                xit('should skip this', function () {
                    testing_1.expect(4).toEqual(40);
                });
            });
        }
    }
});

//# sourceMappingURL=sanity.spec.js.map
