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
    create(req, res, next) {
        res.render("courses/create");
    }
    store(req, res, next) {
        // res.json(req.body);
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect("/"))
            .catch(next);
    }

    //[GET] /:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render("courses/edit", { course: mongooseToObject(course) })
            )
            .catch((e) => next(e));
    }

    //[PUT]: /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect("/me/stored/courses"))
            .catch((e) => next(e));
    }
}

module.exports = new CourseController();
