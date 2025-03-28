import { Request, Response } from 'express'

import { Controller, Post, Get, Put, Delete } from '@banana-universe/bananajs'

@Controller('/users')
export class UserController {
  @Post('/')
  async crete(req: Request, res: Response) {
    res.send({ message: 'Create User' })
  }

  @Get('/list')
  async list(req: Request, res: Response) {
    res.send({ message: 'List all users' })
  }

  @Get('/')
  async get(req: Request, res: Response) {
    res.send({ message: 'Get User' })
  }

  @Put('/')
  async update(req: Request, res: Response) {
    res.send({ message: 'Update User' })
  }

  @Delete('/')
  async delete(req: Request, res: Response) {
    res.send({ message: 'Delete User' })
  }
}
