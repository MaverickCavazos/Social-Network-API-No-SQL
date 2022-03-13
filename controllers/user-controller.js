const { User } = required('../models');

const userContoller = {
    
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'Thoughts',
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
}