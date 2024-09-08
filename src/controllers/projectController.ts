import { Request, Response } from "express";
import * as projectModel from '../models/projectModel';
import { Project } from '../models/projectModel';

export const addProject = async (req:Request, res: Response) => {
    try{
    const newProject: Project = req.body;

    const createdProject = await projectModel.createProject(newProject);

    res.status(201).json(createdProject);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const getAllProjects = async (req: Request, res: Response) => {
    try{
        const projects = await projectModel.getAllProjects();
        res.status(200).json(projects);
    } catch(error: any) {
        res.status(500).json({message:error.message});
    }
}

export const getProject = async (req:Request, res: Response) => {
    try{
    const projectId = parseInt(req.params.id, 10);

    const project = await projectModel.getProject(projectId);

    if(!project) {
        res.status(404).json({message: 'Project not found'});    
    }
    res.status(201).json(project);

    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const projectId = parseInt(req.params.id, 10);
        const updatedProject = await projectModel.updateProject(projectId, req.body);

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(updatedProject);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const projectId = parseInt(req.params.id, 10);
        const deleted = await projectModel.deleteProject(projectId);

        if (!deleted) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(204).send();
        
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};