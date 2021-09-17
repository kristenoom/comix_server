const router = require('express').Router();
const validateSession = require('../middleware/validateSession');
const sequelize = require('../db');
const Wishlist = require("../db").import('../models/wishlist');

/* ***************************
***** CREATE COMIX ENTRY *****
*************************** */
router.post('/create', validateSession, (req, res) => {
    const comixEntryByUser = {
        owner_id: req.user.id,
        title: req.body.title,
        issue_date: req.body.issue_date,
        status: req.body.status,
        read_status: req.body.read_status
    };

    Wishlist.create(comixEntryByUser)
    .then(wishlist => res.status(200).json(wishlist))
    .catch((err) => res.status(500).json({error:err}));

});

/* ***************************
***** RETURN COMIX ENTRY *****
*************************** */
router.get('/wishlistLog', validateSession, (req, res) => {
    const query = {
        where: {
            owner_id: req.user.id
        }
    };

    Wishlist.findAllEntries(query)
    .then((wishlist) => res.status(200).json())
    .catch((err) => res.status(500).json({error: err}));
});

/* ***************************
***** RETURN COMIX ENTRY *****
***** BY INDIVIDUAL USER *****
*************************** */
router.get('/wishlistLog/:id', validateSession, (req, res) => {
    const query = {
        where: {
            id: req.params.id,
            owner_id: req.user.id
        }
    };

    Wishlist.findUserEntry(query)
    .then((wishlist) => res.status(200).json(wishlist))
    .catch((err) => res.status(500).json({error: err}));

});

/* ***************************
***** DELETE COMIX ENTRY *****
*************************** */
router.delete('/wishlist/:id', validateSession, (req, res) => {
    const query = { where: { id: req.params.id, owner: req.user.id } };

    Wishlist.destroy(query)
    .then(() => res.status(200).json({ message: "Wishlist Item Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

/* ***************************
***** UPDATE COMIX ENTRY *****
*************************** */
router.put('/:id', validateSession, (req, res) => {
    const updateWishlist = {
    title: req.body.wishlist.title,
    issue_date: req.body.wishlist.issue_date,
    status: req.body.wishlist.status,
    read_status: req.body.wishlist.read_status
};

const query = { where: { id: req.params.id, owner: req.user.id } };

Comix.update(updateWishlist, query)
.then((comix) => res.status(200).json(comix))
.catch((err) => res.status(500).json({ error: err.message}));
});

module.exports = router;