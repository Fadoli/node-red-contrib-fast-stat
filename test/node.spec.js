import { expect, test, describe, beforeAll, beforeEach, afterAll, afterEach } from "bun:test";

const helper = require("bun-red-test-helper");
const node = require('../src/index');

const testFlow = [
    { "id": "test_node", "type": "fast_stats", "size": "10", "wires": [["helper_node"]] },
    { "id": "helper_node", "type": "helper" },
];
const testFlowDefaultSize = [
    { "id": "test_node", "type": "fast_stats", "wires": [["helper_node"]] },
    { "id": "helper_node", "type": "helper" },
];

describe("statsArray", () => {
    afterEach(() => helper.unload());

    test('Should properly load', async () => {
        await helper.load(node, testFlow, {});

        // Do some tests
        expect(!!helper.getNode('test_node')).toBe(true);

        await helper.unload();
    });

    test('Should properly work', async () => {
        await helper.load(node, testFlow, {});
        const nodeInstance = helper.getNode('test_node');
        nodeInstance.receive({
            payload: {
                a: 0,
                b: 'toto'
            }
        })
        const msg = await helper.awaitNodeInput('helper_node');
        expect(msg.payload).toEqual({ "a": { "n": 1, "min": 0, "max": 0, "sum": 0, "mean": 0, "variance": 0, "standard_deviation": 0 }, "b": "toto" });
    });

    test('Should properly work with no size', async () => {
        await helper.load(node, testFlowDefaultSize, {});
        const nodeInstance = helper.getNode('test_node');
        nodeInstance.receive({
            payload: {
                a: 0,
                b: 'toto'
            }
        })
        const msg = await helper.awaitNodeInput('helper_node');
        expect(msg.payload).toEqual({ "a": { "n": 1, "min": 0, "max": 0, "sum": 0, "mean": 0, "variance": 0, "standard_deviation": 0 }, "b": "toto" });
    });

    test('Should properly handle object recursively', async () => {
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
        const msg = await helper.awaitNodeInput('helper_node');
        expect(msg.payload).toEqual({ "obj": { "a": { "n": 1, "min": 0, "max": 0, "sum": 0, "mean": 0, "variance": 0, "standard_deviation": 0 } }, "b": "toto" });
    });

    test('Should properly handle simple values', async () => {
        await helper.load(node, testFlowDefaultSize, {});
        const nodeInstance = helper.getNode('test_node');
        nodeInstance.receive({
            payload: 0
        })
        const msg = await helper.awaitNodeInput('helper_node');
        expect(msg.payload).toEqual({ "n": 1, "min": 0, "max": 0, "sum": 0, "mean": 0, "variance": 0, "standard_deviation": 0 });
    });

    test('Should properly handle array', async () => {
        await helper.load(node, testFlowDefaultSize, {});
        const nodeInstance = helper.getNode('test_node');
        nodeInstance.receive({
            payload: {
                myArray: [0, 1, 2]
            }
        })
        const msg = await helper.awaitNodeInput('helper_node');
        expect(msg.payload).toEqual({
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
    });
});