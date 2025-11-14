# Data Positioning Micromark Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

A TypeScript library that implements a wrapper around Micromark and Prism. This allows a single instance of these tools to be shared across multiple presenters.

## Installation

There’s no need to install this tool manually. Once released, it’s uploaded to the Data Positioning Engine cloud and becomes instantly available to all new instances of the browser app. A notification about the new version is also sent to all existing browser apps.

## Repository Management Commands

The following list details the repository management commands implementation by this project. For more details, please refer to the scripts section of the 'package.json' file in this project.

| Name               | VS Code Shortcuts | Notes                                                                                                                                           |
| ------------------ | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| audit              | alt+ctrl+shift+a  | Audit the project's dependencies for known security vulnerabilities.                                                                            |
| build              | alt+ctrl+shift+b  | Build the package using Vite. Output to '/dist' directory.                                                                                      |
| bump:version       | alt+ctrl+shift+v  | Increment patch version number by 1.                                                                                                            |
| check              | alt+ctrl+shift+c  | Identify outdated dependencies using npm `outdated` and `npm-check-updates` with option to install latest versions. Also runs `retire` scanner. |
| document           | alt+ctrl+shift+d  | Identify licenses of the project's production and peer dependencies. See [LICENSES.json](./LICENSES.json).                                      |
| format             | alt+ctrl+shift+f  | Use `prettier`to enforce formatting style rules.                                                                                                |
| lint               | alt+ctrl+shift+l  | Use `eslint`to check the code for potential errors and enforces coding style rules.                                                             |
| publish            | alt+ctrl+shift+p  | Publish the package to `npm`.                                                                                                                   |
| send:deployNotice  | alt+ctrl+shift+n  | ❌ Not implemented.                                                                                                                             |
| release            | alt+ctrl+shift+r  | Bump version, build configuration, build tool, synchronise with `GitHub`, upload tool to Data Positioning platform and publish to `npm`.        |
| sync:withGitHub    | alt+ctrl+shift+s  | Synchronise local repository with the main GitHub repository.                                                                                   |
| test               | alt+ctrl+shift+t  | ❌ Not implemented.                                                                                                                             |
| update:dataPosDeps | alt+ctrl+shift+u  | Install the latest version of all Data Positioning dependencies.                                                                                |

## Bundle Analysis

View the [bundle report](https://data-positioning.github.io/datapos-tool-micromark/stats/index.html) to analyze the bundle composition and module sizes (generated with rollup-plugin-visualizer).

## Compliance

The following badge reflects FOSSA's assessment of this repository's open-source license compliance.

## License

[MIT](./LICENSE) © 2026 Data Positioning Pty Ltd
