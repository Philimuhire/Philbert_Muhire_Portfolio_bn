import express, { Express, Request, Response } from "express";
import pool from './config/database';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoute';
import blogRoutes from './routes/blogRoute';
import contactRoutes from './routes/contactRoute';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.get('/test-db-connection', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
          message: 'Database connected successfully',
          currentTime: result.rows[0].now,
      });
    } catch (err: any) {  
        console.error('Database connection failed:', err.message);
        res.status(500).json({ message: 'Database connection failed', error: err.message });
    }
});

app.use('/', projectRoutes); 
app.use('/', blogRoutes); 
app.use('/', contactRoutes); 

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});