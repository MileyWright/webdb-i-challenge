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


module.exports = router;