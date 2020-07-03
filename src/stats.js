


class FastStats {

    FastStats(initData) {
        this.n = 0;
        this.min = Number.MAX_VALUE;
        this.max = -Number.MAX_VALUE;
        this.sum = 0;
        this.mean = 0;
        this.q = 0;
        this.sum = 0;
        this.mean = 0;
        this.variance = 0;
        this.standard_deviation = 0;

        if (initData) {
            importData(initData);
        }
    }

    exportData() {

    }


    addOne(n) {
        // Sorry, no NaNs
        if (isNaN(n)) {
            return;
        }
        this.n++;
        this.min = Math.min(this.min, num);
        this.max = Math.max(this.max, num);
        this.sum += num;
        var prevMean = this.mean;
        this.mean = this.mean + (num - this.mean) / this.n;
        this.q = this.q + (num - prevMean) * (num - this.mean);
        // TODO : implement 'overflow' removal
        this._bins.push(value);
        if (this._bins.length > this.smaBins) {
            this._bins.shift();
        }
    }

    /**
     * Add one or several items to the entries
     * @param {Number | Array<Number>} data
     * @memberof FastStats
     */
    add(data) {
        // Make sure we have some data
        if (data === undefined || data === null || data.length === 0) {
            throw "Can't add nothing";
        }
        // If it's not an array, let's make it one
        if (!data.length) {
            this.addOne(data);
            return;
        }
        if (data.length < MAGIC_NUMBER) {
            data.forEach((entry) => {
                this.addOne(entry);
            });
        } else {
            // Raw add ?
        }
    }

    /**
     * Retuns the stats of the current element
     * @returns
     * @memberof FastStats
     */
    getStats() {
        if (this.n === 0) {
            return null
        }
        const variance = this.q/this.n;
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
}



