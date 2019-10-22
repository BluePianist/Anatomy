const router = require('express').Router();
let User = require('../Models/user');

router.route('/').get(async function(req, res) {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error ' + err))
})
router.route('/login').post(async function(req, res){
    const reqEmail = req.body.Email;
    const reqPassword = req.body.Password;
    console.log('req: ' + reqEmail);
    console.log('req: ' + reqPassword);

    User.findOne(
        {
            $and:[
                {Password:reqPassword},
                {Email:reqEmail}
            ]
        }
    )
    // .exec()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error ' + err))
  })

router.route('/add').post(async function (req, res) {
    const Name = req.body.Name;
    const Email = req.body.Email.toLowerCase();
    const Password = req.body.Password;

    const newUser = new User({Name, Email, Password});
    // res.json(newUser);

    newUser.save()
        .then(() => res.json('User Added !'))
        .catch(err => res.status(400).json('Error : '+ err));
});

module.exports = router;