const { send, json } = require('micro');
const { router, get, post, put } = require('microrouter');

const {User} = require('./db');

const index = async () => {
    console.log('start');
    let rows = await User.findAll();
    console.log(rows, JSON.stringify(rows));
    console.log('end');
    return JSON.stringify(rows);
};

const addUsers = async  (req) => {
    const { login } = await json(req);
    User.create({
        login
    })
}

const users = (req) => {
    return JSON.stringify({
        query: req.query,
        params: req.params
    })
}

module.exports = router(
    get('/', index),
    post('/', addUsers),
    get('/users/:user/*', users)
)

