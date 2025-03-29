import { Request, Response } from 'express'

import { Controller, Post, Get, Put, Delete, Body, Params, Query } from '@banana-universe/bananajs'
import { CreateUserDto, GetUserByIdDto, GetUserListDto } from './User.dto'

@Controller('/users')
export class UserController {
  @Post('/')
  @Body(CreateUserDto)
  async crete(req: Request, res: Response) {
    res.send({ message: 'Create User' })
  }

  @Get('/list')
  @Query(GetUserListDto)
  async list(req: Request, res: Response) {
    res.send({
      message: `List all users from page: ${req.query.page} and limit: ${req.query.limit}`,
    })
  }

  @Get('/:id')
  @Params(GetUserByIdDto)
  async get(req: Request, res: Response) {
    res.send({ message: `Get User by id:  ${req.params.id}` })
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
