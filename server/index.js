const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const sendotp = require('./utils/sendotp')
const mongoose = require('mongoose')
const useotp = require('./models/useotp')
const genotp = require('./utils/generateotp');
const multer = require('multer')
const csv = require('csvtojson')
const studentmodel = require('./models/student')
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URI)
.then(response => {
    console.log("Database connected Successfully")
})
.catch(err => {
    console.log("Error connecting to database: " + err.message)
})

const PORT = process.env.PORT ||5000
    app.listen(PORT,()=>{
        console.log(`Server listening on port ${PORT}`)
    })

app.get("/",(req, res)=>{
    res.send("Its Working")
})
app.post('/api/sendotp',async(req,res)=>{
    const{email} = req.body
    const aotp = genotp()
    await useotp.create({ email: email, otp: aotp, createdAt:Date.now() })
    .then(response => console.log(response))
    .catch(err => console.log(err))

    try{
        const sent_to = email
        const sent_from = process.env.EMAIL_USER
        const reply_to = email
        const rotp = aotp
        await sendotp(rotp,sent_to, sent_from, reply_to);
        res.status(200).json({success:true,message:"OTP Email sent successfully"})
    }
    catch(err){
        res.status(500).json(err.message)
    }
})

app.post('/api/verifyotp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await useotp.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const storedOtp = user.otp;

        if (otp === storedOtp) {
            // OTP is correct
            await useotp.deleteOne({ email });
            return res.status(200).json({ success: true, message: "OTP verification successful" });
        } else {
            // Incorrect OTP
            return res.status(400).json({ error: "Incorrect OTP" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage,
})

app.post('/api/uploadcsv', upload.single("csvFile"), async (req, res) => {
    try {
        const up = await csv().fromFile(req.file.path);
        await studentmodel.insertMany(up);
        console.log("Added to Database");
        return res.send("Added to Database Successfully");
    } catch (error) {
        console.error("Error adding data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/viewdata', (req, res) => {
    studentmodel.find()
      .lean()
      .then(students => res.json(students))  
      .catch(error => res.json(error));     
});
