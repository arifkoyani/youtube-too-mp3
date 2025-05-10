import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4040;
const whiteList = ["http://localhost:5173"];
const corsOption = {
  origin: function (origin, cb) {
    if (whiteList.includes(origin) || !origin) {
      cb(null, true);
    } else {
      cb(new Error("blocked by cors policy!"));
    }
  },
  methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// .
// .
// .
import mp3route from "./routes/mp3.route.js";
app.use("/youtube", mp3route);
// .
// .
//
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});

export default app;
