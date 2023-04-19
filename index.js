const express = require('express')
const app = express()
const getWeatherData = require('./getWeatherData')
const sendMail = require('./sendMail')
const assembleHTML = require('./assembleHTML')
const throttle = require("express-throttle");

require("dotenv").config()

const BerlinLoc = '52.5200,13.4050' 
const JakartaLoc = '-6.180376,106.834467'

app.use(express.json())
app.use(express.static('public'))


app.post('/sendEmail', throttle({ "burst": 1, "period": "2s" }), async (req, res) => {
    const email = req.body.email
    console.log('Email is ' + email);

    const weather = await getWeatherData(process.env.AZURE_API_KEY,BerlinLoc,JakartaLoc,true)
    const HTMLData = assembleHTML(weather)
    const authentication = {
        'user':process.env.GMAIL_ADRESS,
        'pass':process.env.GMAIL_APP_PASSWORD
    }
    const error = await sendMail(HTMLData,email,authentication)
    if (!error) {
        res.status(200).json({message:'E-mail sent!'})
    }
    else{
        res.status(400).json({message:error})
    }

    

})
app.get('/', (req,res) => {
    res.sendFile('/public/index.html')
})
const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`App listening on port ${port}..`)
})
