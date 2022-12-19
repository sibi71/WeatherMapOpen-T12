const express = require("express");
const bodyParser = require("body-parser");
const app =express();
const http =require("https");
const { response } = require("express");
const port = process.env.PORT || 4000 ;

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/html/index.html")
})

app.post("/",(req,res)=>{
   
    const city = req.body.cityname ;

    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f3a419ab7ab02bcafdccf93381e74575` ;
    
    http.get(url,(response)=>{
        response.on("data",(data)=>{
            const weatherdata =JSON.parse(data);
            res.render("result",{
                name:weatherdata.name,
                temp:weatherdata.main.temp,
                weather:weatherdata.weather[0].description,
                humidity:weatherdata.main.humidity,
                windspeed:weatherdata.wind.speed

            })
        })
    })
})

app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.listen(port,(req,res)=>{
    console.log(`Server is up and running on port ${port}`);
})

