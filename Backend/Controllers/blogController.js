const Blog=require ('../Models/blog')

exports.createBlog = async (req, res) => {
    const { title, content } = req.body;

    try {
        const blog = new Blog({
            title,
            content,
            author: req.user.id
        });
        await blog.save();
        res.status(201).json({ message: 'Blog created', blog });
    } catch (err) {
        res.status(500).json({ message: 'Error creating blog', error: err.message });
    }
};

// Get All Blogs (Public)
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name email');
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching blogs', error: err.message });
    }
};

// Get Single Blog
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name email');
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching blog', error: err.message });
    }
};

// Update Blog (Admin only)
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json({ message: 'Blog updated', blog });
    } catch (err) {
        res.status(500).json({ message: 'Error updating blog', error: err.message });
    }
};

// Delete Blog (Admin only)
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json({ message: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting blog', error: err.message });
    }
};