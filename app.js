const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
dotenv.config();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("mongoDB is connected"))
  .catch(err => console.log(err));

mongoose.set("debug", true);
mongoose.Promise = Promise;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", require("./routes/user"));
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is working" });
});

app.listen(PORT, () => console.log("Server is running"));
