const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 5000


const app = express()

app.use(cors())
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://arabian:arabian156207@cluster0.bd9js.mongodb.net/burjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bookings = client.db("burjAlArab").collection("bookings");
  // perform actions on the collection object
  console.log("Db connection successfully")
  
//   ******************************************************************    post   ********************
  app.post("/addBooking",(req, res) =>{
      const newbooking = req.body
      bookings.insertOne(newbooking)
      .then(result => {
          res.send(result.insertedCount > 0)
      })
      console.log(newbooking)
  })
// ************************************************************************ get ********************* 

  app.get("/bookings" ,(req, res) =>{
      console.log(req.headers.authorization)
      bookings.find({email  : req.query.email})
      .toArray((err , documents) =>{    
          res.send(documents)

      })
  })



});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})