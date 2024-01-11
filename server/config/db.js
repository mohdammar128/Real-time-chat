const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    console.log(process.env.MONGO_URL);
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(conn.connection.host);
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
