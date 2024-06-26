import { compare, hash } from 'bcryptjs';

// password incription 
export async function hashPassword(password){
    const hashedPassword = hash(password, 12); 
    return hashedPassword
}

export async function verifyPassword(password, hashedPassword){
    const isValid = await compare(password, hashedPassword); 
    return isValid
}