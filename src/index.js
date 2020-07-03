const util = require("util");


module.exports = function(RED) {
    util.log(RED);

    function defineNode(config) {
        RED.nodes.createNode(this,config);
        const node = this;
        util.log(node);
    }
    RED.nodes.registerType("red_node",defineNode);
}
