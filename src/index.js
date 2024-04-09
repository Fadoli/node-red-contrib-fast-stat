const statsArray = require("@fadoli/node-fast-running-stats");

module.exports = function (RED) {
    function defineNode(config) {
        const node = this;
        RED.nodes.createNode(node, config);
        const nbElem = 1 * (config.size || '10');

        /**
         * This is a map for each numerical value in the payload, we will have a statsArray object
         * @type {Object.<string,statsArray>}
         */
        const elements = {};

        /**
         * @description This function will handle the value of a key in an object, and return its stats
         * @param {string} key - The key to be handled
         * @param {number} value - The value to be appended to the statsArray
         * @returns {Object} The stats of the statsArray
         */
        function handleValue(key, value) {
            if (!elements[key]) {
                elements[key] = new statsArray(nbElem);
            }
            return elements[key].append(value).getStats();
        }
        /**
         * @description This function will handle an object and inject the results back into the object
         * @param {Object} obj 
         * @param {string} prefix 
         */
        function handleObject(obj, prefix = '') {
            const keys = Object.keys(obj);
            keys.forEach((key) => {
                const completeKey = `${prefix}${key}`
                const value = obj[key];
                if (typeof value === 'number') {
                    obj[key] = handleValue(completeKey, value);
                } else if (typeof value === 'object') {
                    handleObject(obj[key], `${completeKey}.`);
                }
            })
        }

        node.on('input', (msg, send, done) => {
            try {
                if (typeof msg.payload === "object") {
                    handleObject(msg.payload);
                } else if (typeof msg.payload === "number") {
                    msg.payload = handleValue("payload", msg.payload);
                }
                send(msg);
                done();
            } catch (e) {
                done(e);
            }
        })
    }
    RED.nodes.registerType("fast_stats", defineNode);
}
