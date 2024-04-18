import { hash } from 'bcryptjs';

// password incription 
export async function hashPassword(password){
    const hashedPassword = hash(password, 12); 
    return hashedPassword
}