class statsArray {

    /**
     * 
     * @param {number} [size=100]
     * @memberof statsArray
     */
    constructor(size = 100) {
        this.size = size;
        this.array = new Array(size);
        this.computed = undefined;

        this.index = 0;
        this.n = 0;
        this.q = 0;
        this.min = Number.MAX_VALUE;
        this.max = -Number.MAX_VALUE;
        this.sum = 0;
        this.mean = 0;
    }

    /**
     * 
     * @param {number} num
     * @returns
     */
    append(num) {
        const previousEntry = this.array[this.index];
        if (previousEntry !== undefined) {
            this.sum -= previousEntry;
            const prevMean = this.mean;
            this.mean = this.sum / this.n;
            this.q -= (previousEntry - prevMean) * (previousEntry - this.mean);
            if (this.q < 0) {
                this.q = 0;
            }
        }
        this.min = Math.min(this.min, num);
        this.max = Math.max(this.max, num);
        this.n = Math.min(this.n + 1, this.size);
        
        this.sum += num;
        const prevMean = this.mean;
        this.mean = this.sum / this.n;
        this.q += (num - prevMean) * (num - this.mean);

        this.array[this.index] = num;
        this.index = (this.index + 1) % this.size;
        return this;
    }

    getStats() {
        if (this.n === 0) {
            return null;
        }
        const variance = this.q / this.n;
        return {
            n: this.n,
            min: this.min,
            max: this.max,
            sum: this.sum,
            mean: this.mean,
            variance: variance,
            standard_deviation: Math.sqrt(variance)
        }
    }

    /**
     * We will compute proper variance here
     */
    compute() {
        let variance = 0;
        let sum = 0;
        let min = Number.MAX_VALUE;
        let max = -Number.MAX_VALUE;
        this.array.forEach(element => {
            max = Math.max(element, max);
            min = Math.min(element, min);
            sum += element;
        });
        let mean = sum / this.n;
        this.array.forEach(element => {
            variance = variance + (element - mean) * (element - mean);
        });
        variance = variance / this.n;
        return {
            n: this.n,
            min: min,
            max: max,
            sum: sum,
            mean: mean,
            variance: variance,
            standard_deviation: Math.sqrt(variance)
        };
    }
};

module.exports = statsArray;
