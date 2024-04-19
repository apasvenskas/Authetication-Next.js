import { connect } from "http2";
import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db,js";

async function handler(req, res){
    if(req.method !== 'POST'){
        return;
    }
    const data = req.body;
    const {email, password} = data; 
    if(!email || !email.includes('@') || !password || password.trim().length < 5){
        res.status(422).json({message: 'Invalid input - password'})
        return;
    }
    const client = await connectToDatabase(); 

    const db = client.db();

    // authentication 
    const hashedPassword = await hashPassword(password); 

    const result = await db.collection('users').insertOne({
        email: email,
        password: hashPassword
    }); 

    res.status(201).json({message: 'Created user!'}); 
}

export default handler;