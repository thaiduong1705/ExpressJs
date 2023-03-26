const Course = require("../models/Course");

class SiteController {
    index(req, res) {
        Course.find({})
            .then((courses) => {
                res.json(courses);
            })
            .catch((error) => {
                res.status(500).json({ error: "ERROR!!!" });
            });
    }
    search(req, res) {
        res.render("search");
    }
}

module.exports = new SiteController();
