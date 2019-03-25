const User = require('../models/User');
const userCtrl = {};


userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

userCtrl.findUser= async (req, res) => {
    const userName =  req.params.userName;
    const user = await User.findOne({userName: userName});
    res.json(user);
}

userCtrl.addUser = async (req, res, next) => {
    if (await User.findOne({ userName: req.body.userName })){
        return next();
    }
    user = new User(req.body);
    user.save((err, data) => {
        if(err) return console.log(err);
        res.json({status: 'User added'});
    });
}



module.exports = userCtrl;