# MathParser-JS
Simple Mathematical string parser.

## Installing
```javascript
npm i @mateusznejman/mathparser-js
yarn add @mateusznejman/mathparser-js
```

## Using

```javascript
import { MathBuffer } from '@mateusznejman/mathparser-js';

let mathString = "2+(3+8)√(2+2)*5^4^5";
let buffer = new MathBuffer(mathString);

let val = buffer.Eval();
```
