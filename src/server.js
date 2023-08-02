import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api/v1', routes)

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.get("/", async (req, res) => {
      res.send("mcs");
    });
    app.listen(process.env.PORT, () => console.log("mcs backend connected"));
  } catch (err) {
    console.log(err);
  }
}
main();
