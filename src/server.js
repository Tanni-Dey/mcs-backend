import mongoose, { Schema, model } from "mongoose";
import express, { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const taskSchema = new Schema({
  title: { type: String, required: true },
  des: { type: String, required: true },
  status: { type: String, required: true },
});

const Task = model("Task", taskSchema);

const findTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.send(tasks);
};

const findSingleTask = async (req, res) => {
  const tasks = await Task.findOne({ _id: req.params.id });
  res.send(tasks);
};

const addTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.send(task);
};

const updateTask = async (req, res) => {
  const task = await Task.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { upsert: true }
  );
  res.send(task);
};

const markCompleteTask = async (req, res) => {
  const task = await Task.updateOne(
    { _id: req.params.id },
    { $set: { status: "completed" } },
    { upsert: true }
  );
  res.send(task);
};

const deleteTask = async (req, res) => {
  const task = await Task.deleteOne({ _id: req.params.id });
  res.send(task);
};

const routes = Router();
app.use("/api", routes);

// all route
routes.get("/tasks", findTasks);
routes.get("/task/:id", findSingleTask);
routes.post("/add-task", addTask);
routes.put("/update-task/:id", updateTask);
routes.put("/mark-complete/:id", markCompleteTask);
routes.delete("/delete-task/:id", deleteTask);

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
