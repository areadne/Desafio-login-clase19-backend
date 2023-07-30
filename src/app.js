import express from "express";
import productRouter from "./routers/products.router.js";
import cartRouter from "./routers/carts.router.js";
import mongoose, { mongo } from "mongoose";
import handlebars from "express-handlebars";
// import viewRouter from "./routers/view.router.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import sessionsRouter from "./routers/sessions.router.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
// import __

const app = express();

app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");
app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://coder:coder@cluster0.ywdnzff.mongodb.net/",
      dbName: "sessions",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: "victoriasecret",
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productRouter);

app.use("/api/cart", cartRouter);

// app.use("/products", viewRouter);

// ruta que lleva a login
app.use("/api/sessions", sessionsRouter);

await mongoose.connect(
  "mongodb+srv://coder:coder@cluster0.ywdnzff.mongodb.net/ecommerce"
);

const httpServer = app.listen(8080, () => {
  console.log("estoy en ejecucion");
});
