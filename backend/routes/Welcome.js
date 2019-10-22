const router = require('express').Router();
let User = require('../Models/user');

router.route('/').get(async function(req, res) {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error ' + err))
})
module.exports = router;