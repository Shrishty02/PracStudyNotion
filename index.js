const express=require("express");
const cors=require("cors");
const database=require("./config/database");
//importing the routers
const userRouter=require("./routes/User");
const profileRouter=require("./routes/Profile");
const paymentsRouter=require("./routes/Payments");
const coursesRouter=require("./routes/Courses");
const contactRouter=require("./routes/Contact");

const app=express();
database.connect();
app.use(cors());
app.use(express.json());




//Routing the requests 
app.use("/api/v1/auth",userRouter);
app.use("/api/v1/profile",profileRouter);
app.use("api/v1/course",coursesRouter);
app.use("/api/v1/payment",paymentsRouter);
app.use("/api/v1/reach",contactRouter);

//Default Route
app.get("/",(req,res)=>{
    return res.status(200).json({
        success:true,
        messege:"Your Server is up and Running "
    })
})



const PORT=4000;
app.listen((PORT),()=>{
    console.log("Server Started on PORT:",PORT);
})

