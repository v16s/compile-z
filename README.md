# CompileZ
[![Build](https://img.shields.io/badge/status-beta-red.svg)](https://github.com/reezpatel/online-compiler/)  [![Licence](https://img.shields.io/badge/licence-MIT-blue.svg)]()  [![Version](https://img.shields.io/badge/version-v0.0.1-lightgrey.svg)]()


CompileZ is a `node` application, that can be deployed to a server. CompileZ is used to provide Rest API for compiling code. This application can be for providing online coding competition.



### Requirement
1. Linux Machine (Ubuntu, Fedora, RedHat, Debian, Mint, Arch etc.)
  * x64 Recommended
2. Node and NPM installed


## Installation
### Installing Node
   Donwload node for official website: [nodejs.org](https://nodejs.org/en/download/)
### Clone the repo
```git
  git clone https://github.com/reezpatel/online-compiler
 ```
### Download Dependencies
```bash
  npm install .
```

## Using CompileZ
### Using pm2
> PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.

```bash
  npm install -g pm2
  pm2 start path/to/compile-z/index.js
```
###### * If pm2 is not installed, then run the app using
```bash
  node path/to/compile-z/index.js
```
### Website
Goto `http://localhost:2200/control` for accessing the control pannel


## API Guide
> `Comming Soon`
