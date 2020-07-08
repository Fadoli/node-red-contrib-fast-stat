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
        this.minIndex = undefined;
        this.max = -Number.MAX_VALUE;
        this.maxIndex = undefined;
        this.sum = 0;
        this.mean = 0;
    }

    computeMin() {
        let iteration;
        // Go the other way around so that we have most chance to find the min 'farther' away from our position
        let iterator = this.index;
        const previousMin = this.min;
        let min = this.max;
        let minIndex;
        for (iteration = 0; iteration < this.n; iteration++) {
            iterator--;
            if (iterator < 0) {
                iterator += this.size;
            }
            const element = this.array[iterator];
            if (element < min) {
                if (element === previousMin) {
                    // Don't look for another one, this was the previous min
                    minIndex = iterator;
                    min = element;
                    break;
                }
                minIndex = iterator;
                min = element;
            }
        }
        this.minIndex = minIndex;
        this.min = min;
    }
    computeMax() {
        let iteration;
        // Go the other way around so that we have most chance to find the min 'farther' away from our position
        let iterator = this.index;
        const previousMax = this.max;
        let max = this.min;
        let maxIndex;
        for (iteration = 0; iteration < this.n; iteration++) {
            iterator--;
            if (iterator < 0) {
                iterator += this.size;
            }
            const element = this.array[iterator];
            if (element < max) {
                if (element === previousMax) {
                    // Don't look for another one, this was the previous max
                    maxIndex = iterator;
                    max = element;
                    break;
                }
                maxIndex = iterator;
                max = element;
            }
        }
        this.maxIndex = maxIndex;
        this.max = max;
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
        } else {
            this.n++;
        }
        if (num <= this.min) {
            this.minIndex = this.index;
            this.min = num;
        } else if (this.minIndex === this.index) {
            console.log("Lost min :'(");
            this.computeMin();
        }
        if (num >= this.max) {
            this.maxIndex = this.index;
            this.max = num;
        } else if (this.maxIndex === this.index) {
            console.log("Lost max :'(");
            this.computeMax();
        }

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
