const statsArray = require("./statsArray");

module.exports = function(RED) {
    function defineNode(config) {
        RED.nodes.createNode(this,config);
        const nbElem = config.size || 10;
        const node = this;

        /**
         * This is a map for each numerical value in the payload, we will have a statsArray object
         * @type {Object.<string,statsArray>}
         */
        const elements = {};
        node.on('input', (msg,send,done) => {
            const keys = Object.keys(msg.payload);
            const result = {};
            keys.forEach((key) => {
                const value = msg.payload[key];
                if (typeof value === 'number') {
                    if (!elements[key]) {
                        elements[key] = new statsArray(nbElem);
                    }
                    elements[key].append(value);
                    result[key] = elements[key].getStats();
                } else {
                    result[key] = value;
                }
            })
            msg.payload = result;
            send(msg);
            done();
        })
    }
    RED.nodes.registerType("fast_stats",defineNode);
}
