# avitext-parser
####v0.3.3

A module for parsing [avitext](https://github.com/rgeraldporter/avitext-spec) files.

This is an early version that has not been tested much. You have been warned!

[![Build Status](https://travis-ci.org/rgeraldporter/avitext-parser.svg?branch=master)](https://travis-ci.org/rgeraldporter/avitext-parser)

## Setup

Using npm...

```
npm install avitext-parser
```

### Node import

For modern ES6 systems, you can include via `import`

```
import Parse from 'avitext-parse';
```

or in legacy setups, using require()

```
var Parse = require('avitext-parse').default;
```

### Browser import

Include the bundle of your choice, either `dist/avitext-parse.js` or `dist/avitext-parse.min.js`.

## Usage

Assuming you have an Avitext-valid text string, you will instantiate using:

```
let myParsedChecklist = new Parse(text);
```
or, in pre-ES6 environments:
```
var myParsedChecklist = new Parse(text);
```

This will return a checklist object. The API on this is not yet solid and will be locked down before 1.x. Properties in this object are mostly immutables, as this module is written using functional-style.

##License

The MIT License (MIT)

Copyright (c) 2016 Robert Gerald Porter

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


