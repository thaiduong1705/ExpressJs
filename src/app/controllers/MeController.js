const { mutipleMongooseToObject } = require("../../util/ConvertToObject");
const Course = require("../models/Course");

class MeController {
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});
        if (req.query.hasOwnProperty("_sort")) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render("me/stored-courses", {
                    courses: mutipleMongooseToObject(courses),
                    deletedCount,
                })
            )
            .catch((error) => next(error));
    }
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render("me/trash-courses", {
                    courses: mutipleMongooseToObject(courses),
                })
            )
            .catch((error) => next(error));
    }
}

module.exports = new MeController();
