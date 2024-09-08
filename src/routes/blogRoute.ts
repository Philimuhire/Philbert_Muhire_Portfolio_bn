import {Router} from 'express';
import { addBlog, getAllBlogs, getBlog, updateBlog, deleteBlog } from '../controllers/blogController';

const router = Router();

router.post('/blogs/addBlog', addBlog)
router.get( '/blogs/getAllBlogs', getAllBlogs)
router.get('/blogs/getBlog/:id', getBlog)
router.put( '/blogs/updateBlog/:id', updateBlog)
router.delete('/blogs/deleteBlog/:id', deleteBlog)

export default router;