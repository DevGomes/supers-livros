'use-strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/livro-controller');

let _controller = new controller();

router.get(
    '/',
    _controller.getLivros
);

router.get(
    '/:id',
    _controller.getLivro
);

router.delete(
    '/:id',
    _controller.deleteLivro
);

module.exports = router;