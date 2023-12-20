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

        if(/[a-zA-z0-9]/.test(token)){
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
    postfix = postfix.replace(/\s/g, '');
    for(let i = 0; i < postfix.length; i++){
        let token = postfix[i];
        if(! isNaN(parseInt(token))){
            stack.push(parseInt(token));
        }
        else{
            let val1 = stack.pop();
            let val2 = stack.pop();

            switch(token){
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
                    break;
            }
        }
    }
    return stack.pop();
}

module.exports = {infixToPostfix, calculate}

