const helper = require('node-red-node-test-helper');
const test = require("zora").test;

const node = require('../src/index');

const testFlow = [
    { "id": "test_node", "type": "fast_stats", "size": "10", "wires": [["helper_node"]] },
    { "id": "helper_node", "type": "helper" },
];
const testFlowDefaultSize = [
    { "id": "test_node", "type": "fast_stats", "wires": [["helper_node"]] },
    { "id": "helper_node", "type": "helper" },
];

test("statsArray", async (t) => {
    await t.test('Should properly load', async function (t) {
        await helper.load(node, testFlow, {});

        // Do some tests
        t.deepEqual(!!helper.getNode('test_node'), true);

        await helper.unload();
    });

    await t.test('Should properly work', async function (t) {
        await helper.load(node, testFlow, {});
        const nodeInstance = helper.getNode('test_node');
        nodeInstance.receive({
            payload: {
                a: 0,
                b: 'toto'
            }
        })
        return new Promise((res, rej) => {
            helper.getNode('helper_node')
                .on('input', (msg) => {
                    try {
                        t.deepEqual(msg.payload, { "a": { "n": 1, "min": 0, "max": 0, "sum": 0, "mean": 0, "variance": 0, "standard_deviation": 0 }, "b": "toto" });
                        res();
                    } catch (e) {
                        rej(e);
                    }
                })
        }).finally(() => helper.unload());
    });

    await t.test('Should properly work with no size', async function (t) {
        await helper.load(node, testFlowDefaultSize, {});
        const nodeInstance = helper.getNode('test_node');
        nodeInstance.receive({
            payload: {
                a: 0,
                b: 'toto'
            }
        })
        return new Promise((res, rej) => {
            helper.getNode('helper_node')
                .on('input', (msg) => {
                    try {
                        t.deepEqual(msg.payload, { "a": { "n": 1, "min": 0, "max": 0, "sum": 0, "mean": 0, "variance": 0, "standard_deviation": 0 }, "b": "toto" });
                        res();
                    } catch (e) {
                        rej(e);
                    }
                })
        }).finally(() => helper.unload());
    });

    await t.test('Should properly handle object recursively', async function (t) {
        await helper.load(node, testFlowDefaultSize, {});
        const nodeInstance = helper.getNode('test_node');
        nodeInstance.receive({
            payload: {
                obj: {
                    a: 0
                },
                b: 'toto'
            }
        })
        return new Promise((res, rej) => {
            helper.getNode('helper_node')
                .on('input', (msg) => {
                    try {
                        t.deepEqual(msg.payload, { "obj": { "a": { "n": 1, "min": 0, "max": 0, "sum": 0, "mean": 0, "variance": 0, "standard_deviation": 0 } }, "b": "toto" });
                        res();
                    } catch (e) {
                        rej(e);
                    }
                })
        }).finally(() => helper.unload());
    });

    await t.test('Should properly handle simple values', async function (t) {
        await helper.load(node, testFlowDefaultSize, {});
        const nodeInstance = helper.getNode('test_node');
        nodeInstance.receive({
            payload: 0
        })
        return new Promise((res, rej) => {
            helper.getNode('helper_node')
                .on('input', (msg) => {
                    try {
                        t.deepEqual(msg.payload, { "n": 1, "min": 0, "max": 0, "sum": 0, "mean": 0, "variance": 0, "standard_deviation": 0 });
                        res();
                    } catch (e) {
                        rej(e);
                    }
                })
        }).finally(() => helper.unload());
    });

    await t.test('Should properly handle array', async function (t) {
        await helper.load(node, testFlowDefaultSize, {});
        const nodeInstance = helper.getNode('test_node');
        nodeInstance.receive({
            payload: {
                myArray: [0, 1, 2]
            }
        })
        return new Promise((res, rej) => {
            helper.getNode('helper_node')
                .on('input', (msg) => {
                    try {
                        t.deepEqual(msg.payload, {
                            "myArray": [
                                {
                                    "max": 0,
                                    "mean": 0,
                                    "min": 0,
                                    "n": 1,
                                    "standard_deviation": 0,
                                    "sum": 0,
                                    "variance": 0
                                },
                                {
                                    "max": 1,
                                    "mean": 1,
                                    "min": 1,
                                    "n": 1,
                                    "standard_deviation": 0,
                                    "sum": 1,
                                    "variance": 0
                                },
                                {
                                    "max": 2,
                                    "mean": 2,
                                    "min": 2,
                                    "n": 1,
                                    "standard_deviation": 0,
                                    "sum": 2,
                                    "variance": 0
                                }
                            ]
                        });
                        res();
                    } catch (e) {
                        rej(e);
                    }
                })
        }).finally(() => helper.unload());
    });
});