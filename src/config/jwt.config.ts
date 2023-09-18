import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
    secret: 'secretKey',
    expiresIn: '1d',
}));