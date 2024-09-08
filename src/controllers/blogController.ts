import { Request, Response } from "express";
import * as blogModel from '../models/blogModel';
import { Blog } from '../models/blogModel';

export const addBlog = async (req:Request, res: Response) => {
    try{
    const newBlog: Blog = req.body;

    const createdBlog = await blogModel.createBlog(newBlog);

    res.status(201).json(createdBlog);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const getAllBlogs = async (req: Request, res: Response) => {
    try{
        const blogs = await blogModel.getAllBlogs();
        res.status(200).json(blogs);
    } catch(error: any) {
        res.status(500).json({message:error.message});
    }
}

export const getBlog = async (req:Request, res: Response) => {
    try{
    const blogId = parseInt(req.params.id, 10);

    const blog = await blogModel.getBlog(blogId);

    if(!blog) {
        res.status(404).json({message: 'Blog not found'});    
    }
    res.status(201).json(blog);

    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const blogId = parseInt(req.params.id, 10);
        const updatedBlog = await blogModel.updateBlog(blogId, req.body);

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json(updatedBlog);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const blogId = parseInt(req.params.id, 10);
        const deleted = await blogModel.deleteBlog(blogId);

        if (!deleted) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(204).send();
        
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};