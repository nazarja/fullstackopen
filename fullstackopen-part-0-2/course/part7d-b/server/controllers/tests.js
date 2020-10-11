const router = require('express').Router();
const Note = require('../models/notes');
const User = require('../models/users');

router.post('/reset', async (req, res) => {
    await Note.deleteMany({});
    await User.deleteMany({});

    res.status(204).end();
});

module.exports = router;