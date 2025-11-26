# Data Positioning Micromark Tool

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=data-positioning_datapos-tool-micromark&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=data-positioning_datapos-tool-micromark)
[![Dependency Check](https://img.shields.io/badge/OWASP-Check-green)](https://data-positioning.github.io/datapos-tool-micromark/dependency-check-report.html)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/11502/badge)](https://www.bestpractices.dev/projects/11502)
[![npm version](https://img.shields.io/npm/v/@datapos/datapos-tool-micromark)](https://www.npmjs.com/package/@datapos/datapos-tool-micromark)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

A library that provides a wrapper around the Micromark markdown parser and the Speed Highlight code highlighter. It improves browser memory efficiency by sharing single instances of these tools across all presenters and loading optional modules on demand.

## Features

- 🚀 **Fast Markdown Parsing** with Micromark
- 💡 **Efficient Syntax Highlighting** via Speed Highlight
- 🧠 **Memory-Optimised**: shared instance across all presenters
- 📦 **Modular Loading**: optional modules loaded on demand
- ☁️ **Cloud-Delivered**: updates new instances automatically; notifies existing ones
- 🧑‍💻 **Implemented in TypeScript**: fully coded in TypeScript

## Installation

There's no need to install this library manually. Once released, it is uploaded to the Data Positioning Cloud and instantly available in all newly launched browser app instances. Running instances are notified of the update.

### For Developers

If you wish to copy or create your own version of the library:

```bash
git clone https://github.com/data-positioning/datapos-tool-micromark.git
cd datapos-tool-micromark
npm install
```

## Reports & Compliance

### Dependency Check Report

The OWASP Dependency Check Report identifies known vulnerabilities in project dependencies. It is generated automatically on each release using the npm package `owasp-dependency-check`.

[View the OWASP Dependency Check Report](https://data-positioning.github.io/datapos-tool-micromark/dependency-check-reports/dependency-check-report.html)

### Dependency Licenses

The following table lists top-level production and peer dependencies only. All dependency licenses (including transitive dependencies) have been recursively verified to conform to Apache-2.0, CC0-1.0, MIT, or n/a. Developers cloning this repository should independently verify dev and optional dependencies; users of the uploaded library are covered by these checks.

<!-- DEPENDENCY_LICENSES_START -->
| Name                          |  Type   | Installed | Latest | Latest Modified          |
| :---------------------------- | :-----: | :-------: | :----: | :----------------------- |
| @speed-highlight/core         | CC0-1.0 |  1.2.12   | 1.2.12 | 2025-11-03T17:41:39.642Z |
| micromark                     |   MIT   |   4.0.2   | 4.0.2  | 2025-02-27T14:04:03.783Z |
| micromark-extension-gfm-table |   MIT   |   2.1.1   | 2.1.1  | 2025-01-20T12:24:29.697Z |
<!-- DEPENDENCY_LICENSES_END -->

### Bundle Analysis Report

The Bundle Analysis Report provides a detailed breakdown of the bundle's composition and module sizes, helping to identify which modules contribute most to the final build. It is generated automatically on each release using the npm package `rollup-plugin-visualizer`.

[View the Bundle Analysis Report](https://data-positioning.github.io/datapos-tool-micromark/stats/index.html)

## Repository Management Commands

The following list details the repository management commands implementation by this project. For more details, please refer to the scripts section of the 'package.json' file in this project.

| Name               | VS Code Shortcuts | Notes                                                                                                                                           |
| ------------------ | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| audit              | alt+ctrl+shift+a  | Audit the project's dependencies for known security vulnerabilities.                                                                            |
| build              | alt+ctrl+shift+b  | Build the package using Vite. Output to '/dist' directory.                                                                                      |
| check              | alt+ctrl+shift+c  | Identify outdated dependencies using npm `outdated` and `npm-check-updates` with option to install latest versions. Also runs `retire` scanner. |
| document           | alt+ctrl+shift+d  | Identify licenses of the project's production and peer dependencies. See [LICENSES.json](./LICENSES.json).                                      |
| format             | alt+ctrl+shift+f  | Use `prettier` to enforce formatting style rules.                                                                                               |
| lint               | alt+ctrl+shift+l  | Use `eslint` to check the code for potential errors and enforces coding style rules.                                                            |
| publish            | alt+ctrl+shift+p  | Publish the package to `npm`.                                                                                                                   |
| release            | alt+ctrl+shift+r  | Bump version, build configuration, build tool, synchronise with `GitHub`, upload tool to Data Positioning platform and publish to `npm`.        |
| sync:withGitHub    | alt+ctrl+shift+s  | Synchronise local repository with the main GitHub repository.                                                                                   |
| test               | alt+ctrl+shift+t  | ❌ Not implemented.                                                                                                                             |
| update:dataPosDeps | alt+ctrl+shift+u  | Install the latest version of all Data Positioning dependencies.                                                                                |

## License

This project is licensed under the MIT License, allowing free use, modification, and distribution.

[MIT](./LICENSE) © 2026 Data Positioning Pty Ltd.

```

```
