import { Pool } from 'pg';
import pool from '../config/database';

export interface Project{
    id: number;
    title: string;
    image: string;
    content: string;
}

export const createProject = async (project: Project): Promise<Project | string> => {
    const existingProject = await pool.query(
        'SELECT * FROM Projects WHERE title = $1',
        [project.title]
    )
    if(existingProject.rows.length > 0) {
        return 'Project already exists';
    }
    const result = await pool.query(
        'INSERT INTO Projects (title, image, content) VALUES ($1, $2, $3) RETURNING *',
        [project.title, project.image, project.content]
    );
    return result.rows[0];
};

export const getAllProjects = async (): Promise<Project[]> => {
    const result = await pool.query('SELECT * FROM Projects')
    return result.rows;
}

export const getProject = async (id: number): Promise<Project> => {
    const result = await pool.query(
        'SELECT * FROM Projects WHERE id = $1', [id]
    );
    return result.rows[0] || null;
};

export const updateProject = async (id: number, project: Partial<Project>): Promise<Project | null> => {
    const result = await pool.query(
        'UPDATE Projects SET title = $1, image = $2, content = $3 WHERE id = $4 RETURNING *',
        [project.title, project.image, project.content, id]
    );
    return result.rows[0] || null;
};

export const deleteProject = async (id: number): Promise<boolean> => {
    const result = await pool.query('DELETE FROM Projects WHERE id = $1 RETURNING *', [id]);
    return result.rowCount !== null && result.rowCount > 0;
};