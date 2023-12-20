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
    let data = {};
    for(let i=0; i<9; i++){
        numeral = postFix.replace("x", i);
        data[i] = calculate(numeral);
    }
    res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chart.js Example</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </head>
        <body>
        <canvas id="myChart" width="100" height="100"></canvas>
        <script>
        async function drawChart(data) {
            const labels = Object.keys(data);
            const values = Object.values(data);
        
            const ctx = document.getElementById('myChart').getContext('2d');
        
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                    label: 'Chart Data',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
                    borderColor: 'rgba(75, 192, 192, 1)', // Border color
                    borderWidth: 1, // Border width
                    }],
                },
                options: {
                    scales: {
                    y: {
                        beginAtZero: true,
                    },
                    },
                },
            });
        }
        drawChart(${JSON.stringify(data)});
        </script>
        </body>
        </html>`);


    console.log({
        "infix" : infix,
        "postfix" : postFix
    });
});



app.listen(2000, (req,res) => {
    console.log("Server run on port 2000: http://localhost:2000");
});

