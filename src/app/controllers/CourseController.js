const { mongooseToObject } = require("../../util/ConvertToObject");
const Course = require("../models/Course");

class CourseController {
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render("courses/show", {
                    course: mongooseToObject(course),
                });
            })
            .catch((error) => next(error));
        // res.send("Course Detail");
    }
}

module.exports = new CourseController();
