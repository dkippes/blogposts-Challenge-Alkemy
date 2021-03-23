const express = require('express');
const router = express.Router();

const postsController = require('../controllers/postsController');

/**
* "GET/posts
*/
router.get('/', postsController.getAllPosts);

/**
* "GET/posts/:id
*/
router.get('/:id', postsController.getOnePosts);

/**
* "POST/posts
*/
router.post('/', postsController.insertPost);

/**
* "PATCH/posts/:id
*/
router.patch('/:id', postsController.updatePost);

/**
* "DELETE/posts/:id
*/
router.delete('/:id', postsController.deletePost);

module.exports = router;
