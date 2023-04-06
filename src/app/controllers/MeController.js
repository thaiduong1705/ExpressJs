const { mutipleMongooseToObject } = require("../../util/ConvertToObject");
const Course = require("../models/Course");

class MeController {
    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render("me/stored-courses", {
                    courses: mutipleMongooseToObject(courses),
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
