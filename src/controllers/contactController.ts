import { Request, Response } from "express";
import pool from '../config/database';
import nodemailer from 'nodemailer';
import * as contactModel from '../models/contactModel'; 

export const addMessage = async (req: Request, res: Response) => {
    const { name, email, content } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO Contacts (name, email, content) VALUES ($1, $2, $3) RETURNING *',
            [name, email, content]
        );

        const transporter = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
                user: 'philimuhire@gmail.com', 
                pass: 'vqpu poib lxri zdzo', 
            },
        });

        const mailOptions = {
            from: email,
            to: 'philimuhire@gmail.com', 
            subject: 'New Portfolio Contact Form Submission',
            text: `You have a new message from ${name} (${email}):\n\n${content}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({
            message: "Message sent successfully",
            data: result.rows[0]
        });
    } catch (error: any) {
        console.error("Error sending message:", error.message);
        res.status(500).json({ message: "Error sending message", error: error.message });
    }
};

export const getAllContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await contactModel.getAllContacts();
        res.status(200).json(contacts);
    } catch (error: any) {
        res.status(500).json({ message: "Error retrieving contacts", error: error.message });
    }
};

export const deleteContact = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const isDeleted = await contactModel.deleteContact(Number(id));

        if (isDeleted) {
            res.status(200).json({ message: "Contact deleted successfully" });
        } else {
            res.status(404).json({ message: "Contact not found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: "Error deleting contact", error: error.message });
    }
};
