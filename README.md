## Intro

This repository is an Angular2 application minimal starter that uses [Gulp](http://gulpjs.com/) as a build workflow runner. This starter includes unit tests, based on [ng2-test-seed](https://github.com/juliemr/ng2-test-seed) by [Julie Ralph](https://twitter.com/SomeJulie).

## Software Prerequisites

In order to run this seed, the following software is required

### Git

See [Setting Up Git](https://help.github.com/articles/set-up-git/) from the GitHub guides.

### Node.js and npm

Node.js and Node's package manager, npm, are used for installing dependencies,
running the build steps, and running tests.


## Getting Started

Begin by cloning the repository.

Use npm to get dependencies:

`npm install`

### Test

`npm run test` or `gulp test`

### Build

The build step invokes the TypeScript compiler to create ES5 javascript
files and source maps from the `.ts` files. Run with:

`npm run build` or `gulp typeScript-compile`

You can examine the configuration for the TypeScript compiler in `tsconfig.json`.
The generated files are output in the same folder as their sources.

To remove all generated files, run:

`npm run clean` or `gulp clean`.

### Watch

The watch step can be run with:

`npm run watch` o `gulp watch`

### Run

To see the app, run

`npm start` or `gulp`

it will automatically open your default browser and navigate to to `localhost:8080`.

### Test

We use Karma with the Jasmine test framework to run unit tests. 