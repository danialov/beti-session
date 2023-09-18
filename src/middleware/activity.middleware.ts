import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ActivityMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        const now = Date.now();
        const oneHour = 60 * 60 * 1000;
        const fiveMinutes = 5 * 60 * 1000;
        // @ts-ignore
        const lastActivity = req.session.lastActivityTimestamp ? parseInt(req.session.lastActivityTimestamp, 10) : null;

        console.log('Last activity timestamp:', lastActivity);

        if (lastActivity) {
            const timeElapsed = now - lastActivity;
            console.log('Time elapsed since last activity:', timeElapsed);

            if (timeElapsed > oneHour && timeElapsed < (oneHour + fiveMinutes)) {
                res.status(403).json({ status: 'blocked', message: 'You are blocked for 5 minutes.' });
            } else if (timeElapsed >= (oneHour + fiveMinutes)) {
                // @ts-ignore
                req.session.lastActivityTimestamp = now.toString();
                res.status(200).json({ status: 'active', message: 'Activity timer reset.' });
            } else {
                res.status(200).json({ status: 'active', message: 'User is active.' });
            }
        } else {
            console.log('No previous activity found. Recording first activity.');
            // @ts-ignore
            req.session.lastActivityTimestamp = now.toString();
            res.status(200).json({ status: 'active', message: 'First activity recorded.' });
        }
    }
}
