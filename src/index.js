const statsArray = require("@fadoli/node-fast-running-stats");

module.exports = function(RED) {
    function defineNode(config) {
        RED.nodes.createNode(this,config);
        const nbElem = 1 * (config.size || '10');
        const node = this;

        /**
         * This is a map for each numerical value in the payload, we will have a statsArray object
         * @type {Object.<string,statsArray>}
         */
        const elements = {};

        function handleValue(key, value) {
            if (!elements[key]) {
                elements[key] = new statsArray(nbElem); 
            }
            return elements[key].append(value).getStats();
        }
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
            return;
        }

        node.on('input', (msg,send,done) => {
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
    RED.nodes.registerType("fast_stats",defineNode);
}
