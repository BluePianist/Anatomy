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
    
    const newUser = new User({
        Name : req.body.Name,
        Email : req.body.Email.toLowerCase(),
        Password : req.body.Password,
        height : 0,
        sportsList : [],
        weight_evolution : [],
        sleepingHours:[] 
    });
    // res.json(newUser);

    newUser.save()
        .then((user) => res.json(user))
        .catch(err => res.status(400).json('Error : '+ err));
});

//Get all the entities' sport
router.route('/sp/:id').get((req,res)=>{
    User.findById(req.params.id)
    .then(user => res.json(user.sportsList))
    .catch(err=> res.status(400).json('Error '+ err));
});

//Get all the entities' weight
router.route('/we/:id').get((req,res)=>{
    User.findById(req.params.id)
    .then(user => res.json(user.weight_evolution))
    .catch(err=> res.status(400).json('Error '+ err));
});

//Get all the entities' sleep
router.route('/sl/:id').get((req,res)=>{
    User.findById(req.params.id)
    .then(user => res.json(user.sleepingHours))
    .catch(err=> res.status(400).json('Error '+ err));
});

//Get Id with specific username
router.route('/user/:Name').get((req,res)=>{
    User.findOne({Name: req.params.Name})
    .then(user => res.json(user.id))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Get by Id
router.route('/:id').get((req,res)=>{
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err=> res.status(400).json('Error '+ err));
});

//Delete
router.route('/:id').delete((req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error' + err ));
});

//Update
router.route('/update/:id').post((req,res)=>{
    User.findById(req.params.id)
    .then(user=>{
        user.username = req.body.username;
        user.height = Number(req.body.height);
  
        user.save()
        .then(()=> res.json('User updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err=> res.status(400).json('Error: ' + err));
});

//Add SportsList
router.route('/add_sp/:id').post((req,res)=>{
    User.findById(req.params.id)
    .then(user=>{
        // console.log("res = " + req.body.sportsList.sport_name);
        user.updateOne({
            $push: {
                sportsList: {
                    sport_name: req.body.sportsList.sport_name,
                    duration: req.body.sportsList.duration,
                    burnt_calories: req.body.sportsList.burnt_calories,
                    date : req.body.sportsList.date
                }
            }
        })
        .then(()=> res.json('Sport added'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err=> res.status(400).json('Error: ' + err));

});

//Add weight_evolution
router.route('/add_we/:id').post((req,res)=>{
    User.findById(req.params.id)
    .then(user=>{
        user.updateOne({
            $push: {
                weight_evolution: {
                    weight: req.body.weight_evolution.weight,
                    date: req.body.weight_evolution.date,
                }
            }
        })
        .then(()=> res.json('Weight added. Haha'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err=> res.status(400).json('Error: ' + err));
});

//Add sleepingHours
router.route('/add_sh/:id').post((req,res)=>{
    User.findById(req.params.id)
    .then(user=>{
        user.updateOne({
            $push: {
                sleepingHours: {
                    hours: req.body.sleepingHours.hours,
                    date: req.body.sleepingHours.date,
                }
            }
        })
        .then(()=> res.json('sleeping Hours added'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err=> res.status(400).json('Error: ' + err));
});

module.exports = router;