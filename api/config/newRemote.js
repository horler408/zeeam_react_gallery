const mongoose = require("mongoose")

const dbConnect = async () => {
    try {
      mongoose.Promise = global.Promise;
      await mongoose.connect(process.env.ATLAS_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .then(() => {
        console.log("Successfully connected to MongoDB Atlas!");
      })
      .catch((error) => {
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(error);
      });
    } catch (err) {
      console.log('Mongoose error', err);
    }
  }
  
  module.exports = dbConnect;
  