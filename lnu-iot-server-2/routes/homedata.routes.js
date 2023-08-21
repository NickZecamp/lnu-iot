const Router = require("express")
const router = new Router()
const Record = require("../models/Record");

router.get('/data',
    async(req,res)=>{
        try {

            const temperature = await Record.findOne().sort({date: -1})
            return res.json({temperature: temperature.labels.temperature, humidity: temperature.labels.humidity, light: temperature.labels.light})


        }catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.post('/add',
    async(req,res)=>{
        try {
            const {temperature, humidity, light} = req.body
            const record = new Record({labels:{temperature, humidity, light}})
            await record.save()
            console.log(req.body)
            return res.json({message: "Record added"})

        }catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

module.exports = router
