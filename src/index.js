const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");
const { extname, dirname } = require("path");

const db = require("./config/db");
const routes = require("./routes");
const Sort = require("./app/middlewares/Sort");

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
// app.use(morgan("combined"));

// Template engine
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : "default";

                const icons = {
                    default: "fa-solid fa-caret-down",
                    asc: "fa-solid fa-caret-down",
                    desc: "fa-solid fa-caret-up"
                }
                const types = {
                    default: "asc",
                    asc: "desc",
                    desc: "asc"
                }

                const icon = icons[sortType];
                const type = types[sortType];
                return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`
            } 
        },
    })
);

app.use(Sort);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

routes(app);

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
