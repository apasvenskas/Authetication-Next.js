import { connect } from "http2";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res){
    const data = req.body;
    const {email, password} = data; 
    if(!email || !email.includes('@') || !password || password.trim().length < 5){
        res.status(422).json({message: 'Invalid input - password'})
        return;
    }
    const client = await connectToDtatbase(); 

    const db = client.db();

    // authentication 
    const hashedPassword = hashPassword(password); 

    const result = await db.collection('users').insertOne({
        email: email,
        password: password
    }); 

    res.status(201).json({message: 'Created user!'}); 
}

export default handler;