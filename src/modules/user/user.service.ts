import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private readonly users = [
        {
            userId: 1,
            username: 'user1',
            password: 'password1',
        },
        // ... other users
    ];

    async findOne(username: string): Promise<any> {
        return this.users.find(user => user.username === username);
    }

}

