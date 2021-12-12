# node-red fast-running-stats

This is a node-red node for computing running (or rolling) statistics for each `number` in the `msg.payload` fields.

Requires node 14 or more recent.

Can be found on :
* [npm](https://www.npmjs.com/package/@fadoli/node-fast-running-stats)
* [github](https://www.npmjs.com/package/@fadoli/node-red-fast-running-stats)

## Performance and expected outputs

The purpose of this node is to allow [high-performance](https://github.com/Fadoli/node-fast-running-stats#performance-and-results) compute of running/rolling statistics inside Node-Red.

Usage examples :

INPUT

```json
{
    "payload": {
        "fieldA": 1,
        "fieldB": "string"
    }
}
```

OUTPUT

```json
{
    "payload": {
        "fieldA": {"n":1,"min":1,"max":1,"sum":1,"mean":1,"variance":0,"standard_deviation":0},
        "fieldB": "string",
    }
}
```

## Coverage

File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |                   
 index.js |     100 |      100 |     100 |     100 |                   
