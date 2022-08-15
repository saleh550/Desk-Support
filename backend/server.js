const path =require('path')
const express=require('express');
const colors=require('colors');
const dotenv=require('dotenv').config();
const {errorHandler}=require('./middleware/errorMiddleware')
const connectDB=require('./config/db')
const PORT =process.env.PORT||8000
const app=express()

//connect to database
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))



//routes
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/tickets',require('./routes/ticketRoutes'))

//serve frontend
if(process.env.NODE_ENV==='production'){
  //set build folder as static
  app.use(express.static(path.join(__dirname,'../frontend/build')))


  app.get('*',(req,res)=>res.sendFile(__dirname,'../', 'frontend' ,'buils' , 'index.html'))
}
else{
  app.get('/',(req,res)=>{
    res.status(200).json({message: 'Welcome to the Support Desk API'})  
  
  })
}

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
})