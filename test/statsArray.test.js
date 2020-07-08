require('tap').mochaGlobals()
const should = require('should')
const StatsArray = require("../src/statsArray");

const TEST_PRECISION = 1000000000; // 10^-9 precision (9 can fail on sum/avg)

function applyPrecision ( obj, precision = TEST_PRECISION ) {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
        obj[key] = Math.round(obj[key] * precision) / precision;
    })
    return obj;
}


describe("statsArray", () => {
    it('should not have stats when empty', function () {
        const stat = new StatsArray(10);
        should(stat.getStats()).eql(null);
    });

    it('Compute data on the go', function () {
        const stat = new StatsArray(10);
        stat.append(1);
        stat.getStats().should.eql({ n: 1, min: 1, max: 1, sum: 1, mean: 1, variance: 0, standard_deviation: 0 });
        stat.append(-1);
        stat.getStats().should.eql({ n: 2, min: -1, max: 1, sum: 0, mean: 0, variance: 1, standard_deviation: 1 });
        stat.append(1);
        stat.getStats().should.eql({ n: 3, min: -1, max: 1, sum: 1, mean: 1 / 3, variance: 0.888888888888889, standard_deviation: 0.9428090415820634 });
        stat.append(-1);
        stat.getStats().should.eql({ n: 4, min: -1, max: 1, sum: 0, mean: 0, variance: 1, standard_deviation: 1 });

        stat.append(1);
        stat.append(-1);
        stat.append(1);
        stat.append(-1);
        stat.append(1);
        stat.append(-1);
        // Final stats
        stat.getStats().should.eql({ n: 10, min: -1, max: 1, sum: 0, mean: 0, variance: 1, standard_deviation: 1 });
    });

    it('Compute data on the go : and correctly (no over-write)', function () {
        const array = [];
        const SIZE = 42;
        let qt = SIZE;
        while (qt) {
            array[qt--] = Math.random() * 5;
        }

        const stat1 = new StatsArray(SIZE);

        array.forEach(element => {
            stat1.append(element);
        });

        // Important note :
        // It is possible that due to how it is computed (incrementaly) variance changes a tad
        // This means we have to reduce the number of digit that matters
        const res1 = applyPrecision(stat1.getStats());
        const res2 = applyPrecision(stat1.compute());
        res1.should.eql(res2);
    });


    it('Compute data on the go : and correctly (with over-write)', function () {
        const array = [];
        const SIZE = 42;
        let qt = SIZE;
        while (qt) {
            array[qt--] = Math.random() * 5;
        }

        const stat1 = new StatsArray(SIZE);

        // Random data
        array.forEach(element => {
            stat1.append(element);
        });
        // Full 0
        array.forEach(element => {
            stat1.append(0);
        });

        // Important note :
        // It is possible that due to how it is computed (incrementaly) variance changes a tad
        // This means we have to reduce the number of digit that matters
        const res1 = applyPrecision(stat1.getStats());
        const res2 = applyPrecision(stat1.compute());
        res1.should.eql(res2);

        res1.mean.should.eql(0);
        res1.min.should.eql(0);
        res1.variance.should.eql(0);
    });
});