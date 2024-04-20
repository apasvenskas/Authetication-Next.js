//changing password and username API call

import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../lib/db,js";
import { hashPassword, verifyPassword } from "../../../lib/auth";

async function handler(req, res){
    if(req.method !== 'PATCH'){
        return; 
    }
    // check if getting a sesion
    const session = await getSession({req: req})
    if(!session){
        res.status(401).json({message: 'Not authenticated'}); 
        return;
    }
    const userEmail = session.user.email; // get user via email, will need to do
    const oldPasword = req.body.oldPasword; // check if password is correct, will need to do
    const newPasword = req.body.newPasword; // add new pasword, will need to do

    const client = await connectToDatabase();
    const userCollection = client.db().collection('user');
    const user = await userCollection.findOne({email: userEmail});

    if(!user){
        res.status(404).json({ message: 'User not found.' });
        client.close();
        return;
    }
    const currentPassword = user.password;
    const passwordsAreEquel = await verifyPassword(oldPasword, currentPassword);
    if(!passwordsAreEquel){
        res.status(403).json({ message: 'Invalid password.'}); 
        client.close();
        return;
    }

    const hashedPassword = await hashPassword(newPasword);
    const result = await userCollection.updateOne(
        {email: userEmail}, 
        { $set: { password: newPasword } }
    )
    client.close();
    res.status(200).json({ message: 'Password updated!' });
}

export default handler;