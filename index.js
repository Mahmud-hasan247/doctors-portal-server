const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// console.log(process.env.DB_PASS)

const uri = `mongodb://doctorsPortalUser:WanaEXViYhre9sy6@cluster0-shard-00-00.yetxo.mongodb.net:27017,cluster0-shard-00-01.yetxo.mongodb.net:27017,cluster0-shard-00-02.yetxo.mongodb.net:27017/doctors-portal?ssl=true&replicaSet=atlas-8altey-shard-0&authSource=admin&retryWrites=true&w=majority`;
MongoClient.connect(uri,  { useUnifiedTopology: true }, function(err, client) {
  const appointmentCollection = client.db('doctors-portal').collection("appointments");
  console.log('alhamdulillah')

  app.post('/saveAppointment', (req, res) => {
      const appointment = req.body;
      console.log(appointment);
      appointmentCollection.insertOne(appointment)
      .then(result => {
          res.send(result.insertedCount > 0)
      })
  })
});


app.get("/", (req, res) => {
    res.send('Yes, I am working!')
})


app.listen(process.env.PORT || port)