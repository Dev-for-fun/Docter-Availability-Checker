import express from 'express';
import 'dotenv/config'
import doctorAvailabilityRouter from './routes/doctorAvailability.js'
import path from 'path';

const app = express();
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get("/",(req,res)=>{
    return res.render("Home");
})

app.use("/doctor-availability",doctorAvailabilityRouter);

const port  = process.env.PORT;
app.listen(port,(req,res)=>{
    console.log("Connection to the port ",port," is successfully established")
});