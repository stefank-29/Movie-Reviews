const passport = require('passport');


exports.login = passport.authenticate('local', {
   
});

exports.logout = (req, res) => {
    req.logout();
    res.status(200).send();
};

exports.sendUser = (req, res) => {
    console.log(req.user);
    res.send({ user: req.user });
};

exports.isUserLoggedIn = (req, res) => {
    if (req.isAuthenticated()) {
        res.send({ user: req.user});
    } else {
        res.send(null);
    }
};
