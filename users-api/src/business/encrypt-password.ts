import crypto from 'crypto';

export function encryptPassword(src: string) {
    return crypto.createHash('sha256').update(src).digest('base64');
}