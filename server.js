const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config()

const Jam = require('./models/jam')
const jamRoutes = require('./routes/jamroutes')
const { urlencoded } = require('express')

const app = express()
const PORT = process.env.PORT || 8080

// const DBATLAS = `mongodb+srv://user:${process.env.DBACCESS}@cluster0-vwya2.mongodb.net/${process.env.DBUSER}?retryWrites=true&w=majority`
const DBATLAS = `mongodb+srv://user:${process.env.DBACCESS}@ddjmscluster1.tsps8.mongodb.net/${process.env.DBUSER}?retryWrites=true&w=majority`;
//const DBATLAS = `mongodb+srv://user:<password>@ddjmscluster1.tsps8.mongodb.net/<dbname>?retryWrites=true&w=majority`
const DBLOCAL = 'mongodb://localhost/dadjamslocaldb'

mongoose.connect(process.env.MONGODB_URI || DBATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('Boom >> MongoDB is connected')
})

app.use(express.json())
app.use(urlencoded({ extended: false }))
app.use('/api', jamRoutes)

const data = {
  id: '0001',
  songname: 'Sample Jam Yep',
  songslug: 'sample-jam-yep',
  minilouge: 198,
  mpcseq: 12,
  bpm: 120,
  brutepatch: 2,
  bruteseq: 3,
  delay: 'delay1',
  chords: 'C D D Eb',
  lyrics: 'testme lyrics',
  notes: 'test notes lorem ipsum yea boi etc',
}

const testJam = new Jam(data)
// testJam.save((error) => {
//   if (error) {
//     console.warn("error in testJam", error);
//   } else {
//     console.log("all good, saved your testJam");
//   }
// });

//Move to routes
app.use(morgan('tiny'))

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('dadjams/build'))
}

app.listen(
  PORT,
  console.log(`beep beep - server started, listening on port ${PORT}`)
)

