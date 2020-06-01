
const SQRT = '√';
const POW = '^';

const LeftSide = (text, startIndex, withBracket = false) => {
    const validChars = "1234567890.,";

    if (text.charAt(startIndex - 1) == ')' || text.charAt(startIndex - 1) == ']') {
        return GetBracketContentLeft(text, startIndex, withBracket);
    }
    else {
        let leftIndex = 0;
        let left = "";

        for (let a = startIndex - 1; a >= 0; a--) {
            if (validChars.includes(text.charAt(a)))
                left = text.charAt(a) + left;
            else {
                leftIndex = a;
                break;
            }
        }

        return left;
    }
}

const RightSide = (text, startIndex, withBracket = false) => {
    const validChars = "1234567890.,";

    if (text.charAt(startIndex + 1) == '(' || text.charAt(startIndex + 1) == '[') {
        return GetBracketContentRight(text, startIndex, withBracket);
    }
    else {
        let rightIndex = 0;
        let right = "";

        for (let a = startIndex + 1; a < text.length; a++) {
            if (validChars.includes(text.charAt(a)))
                right += text.charAt(a);
            else {
                rightIndex = a;
                break;
            }
        }

        return right;
    }
}

const GetBracketContentLeft = (text, startIndex, withBracket = false) => {
    let bracketId = 0;

    for (let a = startIndex; a > 0; a--) {
        if (text.charAt(a) == ')' || text.charAt(a) == ']')
            bracketId++;
        else if (text.charAt(a) == '(' || text.charAt(a) == '[') {
            bracketId--;
            if (bracketId == 0)
                return text.substr(a + (withBracket ? 0 : 1), startIndex - a - (withBracket ? 0 : 2));

        }
    }

    return "";
}

const GetBracketContentRight = (text, startIndex, withBracket = false) => {
    let bracketId = 0;

    for (let a = startIndex; a < text.length; a++) {
        if (text.charAt(a) == '(' || text.charAt(a) == '[')
            bracketId++;
        else if (text.charAt(a) == ')' || text.charAt(a) == ']') {
            bracketId--;
            if (bracketId == 0)
                return text.substr(startIndex + (withBracket ? 1 : 2), a - startIndex - (withBracket ? 0 : 2));

        }
    }

    return "";
}

class MathBuffer {
    signs = "+-*x/";
    buffer = "";

    Add(text) {
        const validChars = `1234567890()+-*x/${SQRT}${POW}.`;

        if (validChars.includes(text)) {
            if (this.buffer.length > 1) {
                let leftSide = LeftSide(this.buffer, this.buffer.left);
                let lastChar = this.buffer.charAt(this.buffer.length - 1);

                if (text == "." && leftSide.includes("."))
                    text = "";
                else if (text == "." && (this.signs.includes(lastChar) || lastChar == POW || lastChar == SQRT))
                    text = "0.";
                else if (this.signs.includes(text) && this.signs.includes(lastChar)) {
                    this.buffer = this.buffer.substr(0, this.buffer.length - 1) + text;
                    text = "";
                }
                else if (this.signs.includes(text) && (lastChar == SQRT || lastChar == POW))
                    text = "";
                else if (leftSide == "0" && text == "0")
                    text = "";
                else if ((lastChar == SQRT || lastChar == POW) && (text == SQRT || text == POW))
                    text = "";
            }
        }
        else
            text = "";

        this.buffer += text;
        return this.buffer;
    }

    ChangeSqrtToFunction(text = "")
    {
        let temp = text.length == 0 ? this.buffer : text;
        temp = temp.replace('x','*');

        while(true)
        {
            if(temp.includes(SQRT))
            {
                let currentIndex = temp.indexOf(SQRT);
                let leftSide = LeftSide(temp,currentIndex,true);
                let rightSide = RightSide(temp,currentIndex,true);
                let leftTemp = temp.substr(0,currentIndex-leftSide.length);
                let rightTemp = temp.substr(currentIndex + 1 + rightSide.length);

                if(leftSide.length > 0)
                leftSide += "*";

                temp = leftTemp + leftSide + "[" + rightSide + "]" + rightTemp;
            }
            else
            break;
        }

        temp = temp.replace("[","Math.sqrt(").replace("]",")");

        return temp;
    }

    ChangePowToFunction(text = "")
    {
        let temp = text.length == 0 ? this.buffer : text;
        temp = temp.replace('x','*');

        while(true)
        {
            if(temp.includes(POW))
            {
                let currentIndex = temp.indexOf(POW);
                let leftSide = LeftSide(temp,currentIndex,true);
                let rightSide = RightSide(temp,currentIndex,true);
                let leftTemp = temp.substr(0,currentIndex-leftSide.length);
                let rightTemp = temp.substr(currentIndex + 1 + rightSide.length);

                if(leftSide.length > 0)
                leftSide += "*";

                temp = leftTemp + "[" + leftSide + ","+rightSide + "]" + rightTemp;
            }
            else
            break;
        }

        temp = temp.replace("[","Math.pow(").replace("]",")");

        return temp;
    }

    Eval()
    {
        const lastChar = this.buffer.charAt(this.buffer.length-1);

        if(this.signs.includes(lastChar))
            this.buffer = this.buffer.substr(0,this.buffer.length-1);

        try
        {
            return eval(this.ChangeSqrtToFunction(this.ChangePowToFunction()));
        }
        catch
        {
            return "Błąd";
        }
        
    }
}

export {SQRT, POW, LeftSide, RightSide, GetBracketContentLeft, GetBracketContentRight, MathBuffer}