import {Controller, Post, Body, UnauthorizedException, Get, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {JwtAuthGuard} from "../../guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: any) {
        const user = await this.authService.validateUser(body);
        if (!user) {
            throw new UnauthorizedException();
        }

        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('check-activity')
    checkActivityStatus() {
        // The Activity middleware will handle the response
    }
}