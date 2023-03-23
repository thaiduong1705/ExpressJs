class NewsController {
    index(req, res) {
        res.render('News');
    }
    show(req, res) {
        res.send('New Detail');
    }
}

module.exports = new NewsController;