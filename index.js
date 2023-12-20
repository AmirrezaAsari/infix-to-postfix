const express = require("express");
const app = express();
const {infixToPostfix, calculate} = require("./infixToPostfix");
const path = require("path");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// const infix = "2 + 5 * 6 + 2";
// console.log(infixToPostfix(infix));
// console.log(calculate(infixToPostfix(infix)));

app.get("/", (req, res, next) =>{
    res.status(200).json({"message" : "Infix To Postfix app"});
});

app.post("/numeral", (req, res, next)=>{
    const {infix} = req.body;
    const postFix = infixToPostfix(infix);
    const result = calculate(postFix);
    res.json({
        "infix" : infix,
        "postfix" : postFix,
        "result" : result
    });
});

app.post("/functional", (req, res, next) =>{
    const {infix} = req.body;
    const postFix = infixToPostfix(infix);
    res.json({
        "infix" : infix,
        "postfix" : postFix
    });
})

app.listen(3000, (req,res) => {
    console.log("Server run on port 3000: http://localhost:3000");
});

