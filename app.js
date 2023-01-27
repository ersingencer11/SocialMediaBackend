const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const cors = require('cors')

const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')
const interactionRoute = require('./routes/interactionRoute')
const commentRoute = require('./routes/commentRoute')



const app = express()
app.use(cors())
port=8000

//GLOBAL DEGİŞKENLER
global.userIn = null

//DB CONNECTION
mongoose.connect('mongodb://localhost/medium-db').then(()=>console.log('db connected succesfully'))



//MIDDLEWARES
app.use(express.json())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/medium-db' })
  }))


app.use('*',(req,res,next)=>{
    userIn=req.session.id
    next()
})


app.get('/', function(req,res){
    console.log(req.session.userID)
})



app.use('/posts',postRoute)
app.use('/interaction',interactionRoute)
app.use('/comments', commentRoute)
app.use('/users',userRoute)



app.listen(port)