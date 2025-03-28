**BananaJS** is an opinionated Node.js framework built on top of Express, designed to simplify the routing and dependency management for server-side applications. Inspired by frameworks like NestJS. The main focus of **BananaJS** is to reduce the complexity of routing by using decorators, providing a more readable and maintainable codebase.

## Features

- **Easy Routing with Decorators**: Simplifies the way routes are defined using decorators like `@Controller`, `@Get`, `@Post`, `@Put`, and `@Delete`.
- **Improved Readability**: The use of decorators enhances code readability and reduces boilerplate.
- **TypeScript Support**: Fully designed to work with TypeScript
- **Built on Express**: Leverages the power of Express but adds additional structure and usability.

## Prerequisites

- **Node.js** (latest stable version)
- **TypeScript** (preferably installed globally)
- **Express** (must be installed before using the framework)

## Installation

1. **Install Express** in your project:

   ```bash
   npm install express

   ```

2. **Install BananaJS** in your project:

   ```bash
   npm install @banana-universe/bananajs

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

### Setting Up the Application

1. **Create the Routes File**:

   In the `src/routes.ts` (or any file you prefer), define your routes using the decorators provided by BananaJS.

   ```typescript
   import { Request, Response } from 'express'
   import { Controller, Post, Get, Put, Delete } from '@banana-universe/bananajs'

   @Controller('/users')
   export class UserController {
     @Post('/')
     async create(req: Request, res: Response) {
       res.send({ message: 'Create User' })
     }

     @Get('/list')
     async list(req: Request, res: Response) {
       res.send({ message: 'List all users' })
     }

     @Get('/')
     async get(req: Request, res: Response) {
       res.send({ message: 'Get User 123456' })
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

2. **Create the Application Entry File**:

   In your `src/index.ts` (or main file), initialize the app by importing `BananaApp` and passing in the routes.

   ```typescript
   import BananaApp from '@banana-universe/bananajs'
   import { Routes } from './routes'

   const bananaApp = new BananaApp(Routes).getInstance()

   bananaApp.listen(3000, () => {
     console.log('Server started on port 3000')
   })
   ```
