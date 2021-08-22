const express = require("express")
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

// Middleware (for every request) //
app.use(express.json()) 
app.use(morgan('dev')) 

//connection to DB
mongoose.connect('mongodb://localhost:27017/Inventory',
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, 
  useFindAndModify: false
},
() => console.log("connected to DB")
)

//test to see if mongo is connected
mongoose.connection.on('connected', ()=> {
    console.log('mongo is connected')
})

app.use("/user", require("./routes/userRouter"))
app.use("/issue", require("./routes/issueRouter"))
app.use("/comment", require("./routes/commentRouter"))
app.use("/auth", require("./routes/authRouter"))



//error handler 
app.use((err,req,res,next) =>{
    console.log(err)
    return res.send({errMsg: err.message})
})

//server listener
app.listen(9000, () => {
  console.log("The server is running on Port 9000")
})