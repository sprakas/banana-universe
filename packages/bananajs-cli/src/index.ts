#!/usr/bin/env node

import * as fs from 'fs/promises'
import * as path from 'path'
import chalk from 'chalk'

async function createApp(appName: string) {
  const appDir = path.join(process.cwd(), appName)

  try {
    const stats = await fs.stat(appDir)
    if (stats.isDirectory()) {
      console.log(chalk.red(`App "${appName}" already exists!`))
      process.exit(1)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // Directory doesn't exist, continue
    } else {
      console.error('Error checking if app exists:', error)
      process.exit(1)
    }
  }

  try {
    await fs.mkdir(appDir)
    await fs.writeFile(path.join(appDir, 'README.md'), `# ${appName} App`)
    console.log(chalk.green(`App "${appName}" created successfully!`))
  } catch (error) {
    console.error('Error creating app:', error)
    process.exit(1)
  }
}

const command = process.argv[2]
const appName = process.argv[3]

if (command !== 'new') {
  console.log(chalk.red(`Unknown command: ${command}`))
  process.exit(1)
}

if (!appName) {
  console.log(chalk.red('Please specify the app name.'))
  process.exit(1)
}

if (command === 'new') {
  createApp(appName)
}
