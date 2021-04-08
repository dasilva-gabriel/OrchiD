exports.index = function (req, res) {
    res.render('index');
};
exports.connect = function (req, res) {
    res.render('connect',{message: ""});
};