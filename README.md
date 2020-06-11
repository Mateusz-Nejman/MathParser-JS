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

//Constants
//POW = ^
//SQRT = √
//PI = π

/*
Working calculations
- Add / Substract / Multiply / Divide
- Square root / Power by X
- Percents
*/
let mathString = "2+(3+8)√(2+2)*5^4^5";
let buffer = new MathBuffer(mathString);
buffer.Add('+');
buffer.Add('5');

let val = buffer.Eval();
```

## Other Functions

```javascript
import { LeftSide, RightSide, GetBracketContentLeft, GetBracketContentRight } from '@mateusznejman/mathparser-js';

const leftSide = LeftSide(text, startIndex, withBracket = false); //Get left side of sign in startIndex(to nearest sign other than 1234567890.,;'). If withBracket = true, return value contains brackets(if exists)
const rightSide = Rightide(text, startIndex, withBracket = false); //Get right side of sign in startIndex(to nearest sign other than 1234567890.,;'). If withBracket = true, return value contains brackets(if exists)
const leftBracket = GetBracketContentLeft(text, startIndex, withBracket = false); //Used when in prev char is end bracket
const rightBracket = GetBracketContentRight(text, startIndex, withBracket = false); //Used when in next char is start bracket
```