const { Router } = require('express');
const router = Router(); //permite definir urls

const User = require('../models/User');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello world'));

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();
    const token = jwt.sign({_id: newUser._id}, 'secretkey');
    res.status(200).json({ token });
})

router.post('/signin', async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(401).send("The email doesn't exists");
    if(user.password !== password) return res.status(401).send("Wrong Password");

    const token = jwt.sign({ _id: user._id}, 'secretkey')
    return res.status(200).json({ token })
})

router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'Lorem ipsum',
            date: "2020-12-28T14:54:28.932"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'Lorem ipsum',
            date: "2020-12-28T14:54:28.932"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'Lorem ipsum',
            date: "2020-12-28T14:54:28.932"
        }
        
    ])
})

router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'Lorem ipsum',
            date: "2020-12-28T14:54:28.932"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'Lorem ipsum',
            date: "2020-12-28T14:54:28.932"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'Lorem ipsum',
            date: "2020-12-28T14:54:28.932"
        }
        
    ])
})

module.exports = router;

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send("unauthorized request");
    }
    const token = req.headers.authorization.split(' ')[1]
    if(token === "null"){
        return res.status(401).send("unauthorized request");
    }
    const payload = jwt.verify(token, 'secretkey');
    req.userId = payload._id
    console.log(req.headers.authorization);
    next();
}