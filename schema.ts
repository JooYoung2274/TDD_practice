import mongoose from "mongoose";

class Mongo {
  static async connect() {
    try {
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        autoIndex: true,
        ignoreUndefined: true,
        tlsCAFile: process.env.DB_CA as string,
      };
      const url = process.env.DB_URL as string;
      await mongoose.connect(url, options);
      console.log("DB connection 🔌");
    } catch (err) {
      console.log(err);
    }
  }
}

export default Mongo;
