let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const comix = require('../db').import('../models/comic');

router.put('/:id', validateSession, function(req, res) {
    const updateComix = {
        title: req.body.comix.title,
        issue_date: req.body.comix.issue_date,
        status: req.body.comix.status,
        read_status: req.body.comix.read_status
    };

    const query = { where: { id: req.params.id, owner: req.user.id} };

    comix.update(updateComix, query)
    .then((comics) => res.status(200).json(comics))
    .catch((err) => res.status(500).json({ error: err.message}));
});

router.delete('/:id', validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id } };

    logbook.destroy(query)
    .then(() => res.status(200).json({ message: "Comic Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;