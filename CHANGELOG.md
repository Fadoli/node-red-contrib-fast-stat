# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] 2024-12-11

### Changed

* [BREAKING] properly handles objects, array and simple numerical value in the `msg.payload` property, breaks compatibility with circular objects.
* [BREAKING] Drop node 14 and 16 support (should not actually break anything).
* [Deps] Drop c8 / pta / zora for tests, instead rely on built-in nodejs/bun test library, this has no dev dependency anymore.
* [Deps] Update `@fadoli/node-fast-running-stats` to 2.0.0

## [1.0.2] - 2022-02-01

### Fixed

* [Deps] Update internal fast-stats package version to resolve the following issue `properly protects computation from floating precision losses (sometimes causing NaN errors)`.

### Internal

* [Deps] Update dev-dependencies.

## [1.0.1] - 2021-12-11

### Changed

* [Documentation] Add nodejs 14 requirements in `README.md`, `package.json`.
* [Documentation] Add examples of input-output from the node inside `package.json` and into the `html` documentation.
* [Documentation] Add npm and github URLs in `README.md`.
* [Documentation] fill missing fields in `package.json`.

### Internal

* [Deps] Update `pta` and `zora` dev-dependencies.
* [Deps] Update `node-red` dev-dependencies to `2.1.4` from `2.0.0`.
* [Coverage] Completed existing tests to reach 100% coverage.

## [1.0.0] - 2021-10-17 : Initial release
