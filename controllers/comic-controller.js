const router = require('express').Router();
const validateSession = require('../middleware/validateSession');
const sequelize = require('../db');
const Comix = require("../db").import('../models/comic');

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

    Comix.create(comixEntryByUser)
    .then(comix => res.status(200).json(comix))
    .catch((err) => res.status(500).json({error:err}));

});

/* ***************************
***** RETURN COMIX ENTRY *****
*************************** */
router.get('/comixLog', validateSession, (req, res) => {
    const query = {
        where: {
            owner_id: req.user.id
        }
    };

    Comix.findAll(query)
    .then((comix) => res.status(200).json(comix))
    .catch((err) => res.status(500).json({error: err}));
});

/* ***************************
***** RETURN COMIX ENTRY *****
***** BY INDIVIDUAL USER *****
*************************** */
router.get('/comixLog/:id', validateSession, (req, res) => {
    const query = {
        where: {
            id: req.params.id,
            owner_id: req.user.id
        }
    };

    Comix.findUserEntry(query)
    .then((comix) => res.status(200).json(comix))
    .catch((err) => res.status(500).json({error: err}));

});

/* ***************************
***** DELETE COMIX ENTRY *****
*************************** */
router.delete('/comix/:id', validateSession, (req, res) => {
    const query = { where: { id: req.params.id, owner_id: req.user.id } };

    Comix.destroy(query)
    .then(() => res.status(200).json({ message: "Comic Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});


/* ***************************
***** UPDATE COMIX ENTRY *****
*************************** */
router.put('/:id', validateSession, (req, res) => {
    const updateComix = {
    title: req.body.title,
    issue_date: req.body.issue_date,
    status: req.body.status,
    read_status: req.body.read_status
};

const query = { where: { id: req.params.id, owner_id: req.user.id } };

Comix.update(updateComix, query)
.then((comix) => res.status(200).json(comix))
.catch((err) => res.status(500).json({ error: err.message}));
});

module.exports = router;