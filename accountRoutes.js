const express = require('express');
const db = require('./data/dbConfig.js');
const router = express.Router();

//GET request /accounts
router.get('/', (req,res) => {
    db('accounts')
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Cannot retreive accounts'})
    })
})

// GET request /accounts/id
router.get('/:id', validateAccountID, (req, res) => {
    const id = req.params.id;
    db('accounts')
    .where({'id': id})
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => {
        res.status(500).json({error: 'can not retrieve account by ID'})
    })
})

// POST request /accounts
router.post('/', (req, res) => {
    const data = {
        name: req.body.name,
        budget: req.body.budget};
    db('accounts')
        .insert(data)
        .then(ids => {
            const id = ids[0];
            db('accounts')
                .select('name', 'budget')
                .where({id})
                .first()
                .then(posts => {
                    res.status(200).json(posts)
                })
                
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Could not post account info'})
        })
})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

//custom middleware
function validateAccountID(req, res, next) {
    const id = req.params.id;
    db('accounts')
        .where({'id': id})
        .then(account => {
            if(account == ''){
                res.status(400).json({error: 'The specified ID does not exist'})
            } else{
                next();
            }
        })
}

// function validateAccount(req, res, next) {
//     const data = req.body;
//     db('accounts')
//         .insert(data, 'id')
//         .then(post => {
//             const id = post[0];
//             return db()
//         })
// }

module.exports = router;