if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//IMPORTS
const express = require("express");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const notesController = require("./controllers/notesController");
const usersController = require("./controllers/usersController");
const requireAuth = require("./middleware/requireAuth");
const cors = require("cors");

//SET UP APP
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

//CONNECT DO DATABASE
connectToDb();

//ROUTES
app.post("/signup", usersController.signUp);
app.post("/login", usersController.logIn);
app.get("/logout", usersController.logOut);
app.get("/check-auth", requireAuth, usersController.checkAuth);

app.get("/notes", requireAuth, notesController.fetchNotes);
app.get("/notes/:id", requireAuth, notesController.fetchNote);
app.post("/notes", requireAuth, notesController.createNote);
app.put("/notes/:id", requireAuth, notesController.updateNote);
app.delete("/notes/:id", requireAuth, notesController.deleteNote);

//START THE SERVER
app.listen(process.env.PORT);
