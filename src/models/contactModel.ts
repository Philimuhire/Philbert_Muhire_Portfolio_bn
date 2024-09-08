import { Pool } from "pg";
import pool from "../config/database";

export interface Contact{
    id: number;
    name: string;
    email: string;
    content:string;
    dateSent: Date;
}

export const createContact = async (contact: Partial<Contact>): Promise<Contact> =>{
    const result = await pool.query(
        'INSERT INTO Contacts (name, email, content) VALUES ($1, $2, $3) RETURNING *',
        [contact.name, contact.email, contact.content, contact.dateSent || new Date()]
    );
    return result.rows[0];
};

export const getAllContacts = async (): Promise<Contact[]> => {
    const result = await pool.query('SELECT * FROM Contacts ORDER BY dateSent DESC');
    return result.rows;
};

export const deleteContact = async (id: number): Promise<boolean> => {
    const result = await pool.query('DELETE FROM Contacts WHERE id = $1 RETURNING *', [id]);
    if(result.rowCount != null){
        return result.rowCount > 0;
    }
    return false;
};
