const helper = require('node-red-node-test-helper');
const test = require("zora").test;

const node = require('../src/index');

const testFlow = [{"id":"c3c1389c.61bbf","type":"fast_stats","z":"d7d8ed0f.6ee418","name":"","size":"100000","x":800,"y":220,"wires":[["b8fec2a3.b96b6","94abac1b.517518"]]}];

test("statsArray", (t) => {
    t.test('should not have stats when empty', async () => {
        await helper.load(node, testFlow);
        
        // Do some tests

        await helper.unload();
    });
});