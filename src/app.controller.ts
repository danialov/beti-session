import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getIndex(@Res() res: Response): void {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  }

}
