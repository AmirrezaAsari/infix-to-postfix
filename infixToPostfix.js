function infixToPostfix(infix){
    const operators = {
        "+"   : 1,
        "-"   : 1,
        "*"   : 2,
        "/"   : 2,
        "^"   : 3,
        'sin' : 4,
        'cos' : 4
    };

    const stack = [];
    let output = "";


    for(let i=0; i<infix.length; i++){
        let token = infix[i];
        if(/[a-zA-Z0-9]/.test(token)){
            output += token + " ";
        }
        else if(token in operators){
            while(stack.length && operators[token] <= operators[stack[stack.length - 1]]){
                output += stack.pop() + " ";
            }
            stack.push(token);
        }
        else if(token === "("){
            stack.push(token);
        }
        else if(token === ")"){
            while(stack.length && stack[stack.length - 1] !== "("){
                output += stack.pop() + " ";
            }
            stack.pop(); //remove (
        }
    }
        while(stack.length){
            output += stack.pop() + " ";
        }
        return output;

}


function calculate(postfix){
    let stack = [];
    //postfix = postfix.replace(/\s/g, '');
    for(let i = 0; i < postfix.length; i++){
        let toCalculate = postfix[i];
        if(toCalculate === " ") {
            toCalculate = postfix[i+1];
            i++;
        }
        let token = postfix[i+1] || 0;
        while(token != " "){
            toCalculate += token;
            token = postfix[i+1];
            i++;
        }
        if(! isNaN(parseInt(toCalculate))){
            stack.push(parseInt(toCalculate));
        }
        else{
            let val1 = stack.pop();
            let val2 = stack.pop();

            switch(toCalculate){
                case "+" :
                    stack.push(val2 + val1);
                    break;
                case "-" :
                    stack.push(val2 - val1);
                    break;
                case "*" :
                    stack.push(val2 * val1);
                    break;
                case "/" :
                    stack.push(val2 / val1);
                    break;
                case "^" :
                    stack.push(Math.pow(val2, val1));
                    //console.log(val2 , val1);
                    break;
            }
        }
        console.log(stack);
        if(i === postfix.length-2) break;
    }
    //console.log(stack);
    return stack.pop();
}

module.exports = {infixToPostfix, calculate}
let postfix = infixToPostfix("3 + 5 * 2 ^ 4");
console.log(postfix);
console.log(calculate(postfix));
