// {==================== Dependencies: Include External Modules ====================}
const path = require("path");
const exphbs = require("express-handlebars");
const express = require("express");
const session = require("express-session");
// Create a new sequelize store using the express-session package
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// {==================== Dependencies: Importing a local module ====================}
const sequelize = require("./config/connection");
const routes = require("./controllers/");
const helpers = require("./utils/helpers");

// {==================== Initialization ====================}
const app = express();
const PORT = process.env.PORT || 3001;

// <---------------- Session ---------------->
// Configure and link a session object with the sequelize store
const sessOptions = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
// Add express-session and store as Express.js middleware
app.use(session(sessOptions));

// <---------------- MVC Engine ---------------->
const hbs = exphbs.create({ helpers });
// Set Handlebars as the default template engine.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// {==================== Middleware ====================}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// {==================== Synchronize All Models & Start Listening ====================}
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
});
