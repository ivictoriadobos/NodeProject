const dotenv = require('dotenv')

const mongoose = require('mongoose');
const app = require('./app')
dotenv.config({path : './config.env'});


mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(connection => {
  console.log(connection.connections);
  console.log('DB connection successful!')
});


const port = 3000;
app.listen(port, ()=>
{
  console.log(`App running on port ${port}...`)
})
