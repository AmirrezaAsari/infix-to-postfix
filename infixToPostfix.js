function infixToPostfix(infix){
    const operators = {
        "+" : 1,
        "-" : 1,
        "*" : 2,
        "/" : 2,
        "^" : 3
    };

    const stack = [];
    let output = "";


    for(let i=0; i<infix.length; i++){
        let token = infix[i];

        if(/[a-zA-z0-9]/.test(token)){
            output += token;
        }
        else if(token in operators){
            while(stack.length && operators[token] <= operators[stack[stack.length - 1]]){
                output += stack.pop();
            }
            stack.push(token);
        }
        else if(token === "("){
            stack.push(token);
        }
        else if(token === ")"){
            while(stack.length && stack[stack.length - 1] !== "("){
                output += stack.pop();
            }
            stack.pop(); //remove (
        }
    }
        while(stack.length){
            output += stack.pop();
        }
        return output;

}


const infix = "a + b * (c ^ d - e) / f";
console.log(infixToPostfix(infix));
