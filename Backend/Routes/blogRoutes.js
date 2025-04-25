const express = require('express');
const router = express.Router();
const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} = require('../Controllers/blogController');


const authenticateUser = require('../MiddleWare/authMiddleware');
const authorizeRoles = require('../MiddleWare/roleMiddleware');


// Public
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Admin Only
router.post('/', authenticateUser, authorizeRoles('admin'), createBlog);
router.put('/:id', authenticateUser, authorizeRoles('admin'), updateBlog);
router.delete('/:id', authenticateUser, authorizeRoles('admin'), deleteBlog);

module.exports = router;
