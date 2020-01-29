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

// GET request /accounts
router.get('/:id', (req, res) => {
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

module.exports = router;