const router = require('express').Router();
//const validateSession = require('../middleware/validateSession');
//commented out for Rodney to complete configuration of validate session
const sequelize = require('../db');
const Comix = sequelize.import('../models/comic');

/* ***************************
***** CREATE COMIX ENTRY *****
*************************** */
router.post('/', /*validateSession,*/ (req, res) => {
    const comixEntryByUser = {
        owner_id: req.user.id,
        title: req.body.comix.title,
        issue_date: req.body.comix.issue_date,
        status: req.body.log.status,
        read_status: req.body.log.read_status
    };

    Comix.create(comixEntryByUser)
    .then((comix) => res.status(200).json(comix))
    .catch((err) => res.status(500).json({error:err}));

});

/* ***************************
***** RETURN COMIX ENTRY *****
*************************** */
router.get('/comixLog', /*validateSession,*/ (req, res) => {
    const query = {
        where: {
            owner_id: req.user.id
        }
    };

    Comix.findAllEntries(query)
    .then((comix) => res.status(200).json())
    .catch((err) => res.status(500).json({error: err}));
});

/* ***************************
***** RETURN COMIX ENTRY *****
***** BY INDIVIDUAL USER *****
*************************** */
router.get('/comixLog/:id', /*validateSession,*/ (req, res) => {
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
router.delete('/comix/:id', /*validateSession,*/ (req, res) => {
    const query
});


/* ***************************
***** UPDATE COMIX ENTRY *****
*************************** */
router.put('/comix/:id', (req, res) => {
    const query
});

module.exports = router;