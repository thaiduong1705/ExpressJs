const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");
const { extname, dirname } = require("path");

const db = require("./config/db");
const routes = require("./routes");

// Connect to DB
db.connect();

const app = express();
const port = 8000;

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// HTTP logger
app.use(morgan("combined"));

// Template engine
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
        },
    })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

routes(app);

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
