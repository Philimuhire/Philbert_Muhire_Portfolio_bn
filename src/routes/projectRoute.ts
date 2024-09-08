import {Router} from 'express';
import { addProject, getAllProjects, getProject, updateProject, deleteProject } from '../controllers/projectController';

const router = Router();

router.post('/projects/addProject', addProject)
router.get( '/projects/getAllProjects', getAllProjects)
router.get('/projects/getProject/:id', getProject)
router.put( '/projects/updateProject/:id', updateProject)
router.delete('/projects/deleteProject/:id', deleteProject)

export default router;