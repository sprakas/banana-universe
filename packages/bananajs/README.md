**BananaJS** is an opinionated Node.js framework built on top of Express, designed to simplify routing for server-side applications. Inspired by frameworks like NestJS, BananaJS focuses on reducing the complexity of routing by using decorators, providing a more readable and maintainable codebase. It also includes powerful data validation capabilities through class-validator, making it easy to validate incoming request data such as body, query parameters, and path parameters.

The combination of simplified routing and automatic validation enhances productivity, reduces boilerplate code, and improves the overall structure and readability of your application.

## Features

- **Easy Routing with Decorators**: Simplifies the way routes are defined using decorators like `@Controller`, `@Get`, `@Post`, `@Put`, and `@Delete`.
- **Validation with Decorators**: Use @Body, @Params, and @Query decorators in combination with class-validator to validate request data explicitly. This ensures that data adheres to predefined validation rules.
- **Improved Readability**: The use of decorators enhances code readability and reduces boilerplate.
- **TypeScript Support**: Fully designed to work with TypeScript
- **Built on Express**: Leverages the power of Express but adds additional structure and usability.

## Prerequisites

- **Node.js**
- **TypeScript**

## Mandatory Dependencies

- **Express**
- **class-validator** (for request data validation)

## Installation

1. **Install BananaJS** in your project:

   ```bash
   npm install @banana-universe/bananajs

   ```

2. **Install Mandatory dependencies** in your project:

   ```bash
   npm install express class-validator

   ```

3. **Install TypeScript and Required Types**:

   If you haven't already, install TypeScript and the necessary type definitions for Express:

   ```bash
   npm install typescript @types/node @types/express --save-dev

   ```

4. **Configure TypeScript**:

   In your `tsconfig.json`, enable `experimentalDecorators`:

   ```json
   {
     "compilerOptions": {
       "experimentalDecorators": true,
       "target": "ES6",
       "module": "commonjs",
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true,
       "esModuleInterop": true
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules"]
   }
   ```

## Usage

Example: https://github.com/sprakas/banana-universe/tree/main/apps/bananajs-demo

### Setting Up the Application

1. **Create the Controller File**:

   In the `src/App/User/User.controller.ts` (or any file you prefer), define your apis using the decorators provided by BananaJS.

```typescript
import { Request, Response } from 'express'
import { Controller, Post, Get, Put, Delete, Body, Params, Query } from '@banana-universe/bananajs'
import { CreateUserDto, GetUserByIdDto, GetUserListDto } from './dto'

@Controller('/users')
export class UserController {
  @Post('/')
  @Body(CreateUserDto)
  async create(req: Request, res: Response) {
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
    res.send({ message: `Get User by id: ${req.params.id}` })
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
```

### Step 2: Create the DTO File

Use `class-validator` to define and validate your DTOs for each request type (body, query, params).

`src/App/User/User.dto.ts`

```typescript
import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @Length(3, 20)
  @IsString()
  name!: string

  @IsEmail()
  @Length(0, 50)
  email!: string

  @IsString()
  password!: string
}

export class GetUserByIdDto {
  @IsString()
  id!: string
}

export class GetUserListDto {
  @IsString()
  page!: string

  @IsString()
  limit!: string
}
```

3. **Create the Application Entry File**:

   In your `src/index.ts` (or main file), initialize the app by importing `BananaApp` and passing in the routes.

   ```typescript
   import BananaApp from '@banana-universe/bananajs'
   import { UserController } from './routes'

   const bananaApp = new BananaApp([UserController]).getInstance()

   bananaApp.listen(3000, () => {
     console.log('Server started on port 3000')
   })
   ```
