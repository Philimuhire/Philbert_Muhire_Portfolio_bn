import { Pool } from 'pg';
import pool from '../config/database';

export interface Blog{
    id: number;
    title: string;
    image: string;
    content: string;
    postedDate: Date;
}

export const createBlog = async (blog: Blog): Promise<Blog | string> => {

    const existingBlog = await pool.query(
        'SELECT * FROM Blogs WHERE title = $1',
        [blog.title]
    )
    if(existingBlog.rows.length > 0) {
        return 'Blog already exists';
    }

    const result = await pool.query(
        'INSERT INTO Blogs (title, image, content, postedDate) VALUES ($1, $2, $3, $4) RETURNING *',
        [blog.title, blog.image, blog.content, blog.postedDate || new Date().toISOString().split('T')[0]]
    );
    return result.rows[0];
};

export const getAllBlogs = async (): Promise<Blog[]> => {
    const result = await pool.query('SELECT * FROM Blogs')
    return result.rows;
}

export const getBlog = async (id: number): Promise<Blog> => {
    const result = await pool.query(
        'SELECT * FROM Projects WHERE id = $1', [id]
    );
    return result.rows[0] || null;
};

export const updateBlog = async (id: number, blog: Partial<Blog>): Promise<Blog | null> => {
    const result = await pool.query(
        'UPDATE Projects SET title = $1, image = $2, content = $3 WHERE datePosted = $4, id = $5 RETURNING *',
        [blog.title, blog.image, blog.content, blog.postedDate, id]
    );
    return result.rows[0] || null;
};

export const deleteBlog = async (id: number): Promise<boolean> => {
    const result = await pool.query('DELETE FROM Blogs WHERE id = $1 RETURNING *', [id]);
    return result.rowCount !== null && result.rowCount > 0;
};