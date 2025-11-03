# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Technologies Used

This project uses the T3 Stack, which includes:

- [Next.js](https://nextjs.org) - React framework for production
- [NextAuth.js](https://next-auth.js.org) - Authentication for Next.js
- [Prisma](https://prisma.io) - Modern database toolkit
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [tRPC](https://trpc.io) - End-to-end typesafe APIs
- [Vitest](https://vitest.dev) - Next generation testing framework
- [Husky](https://typicode.github.io/husky/) - Git hooks made easy

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

## Git Hooks (Husky)

This project uses Husky to enforce code quality through Git hooks:

- `pre-commit`: Runs code checks, type checking, and tests before each commit
- `commit-msg`: Validates commit message format using commitlint

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. Commit messages should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types include:
- `feat`: 新功能
- `fix`: 修复
- `docs`: 文档
- `style`: 代码格式
- `refactor`: 重构
- `test`: 测试
- `chore`: 构建过程或辅助工具的变动
- `ci`: CI 配置
- `perf`: 性能优化
- `revert`: 回滚

## Available Scripts

In the project directory, you can run:

### `pnpm dev`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `pnpm build`

Builds the app for production in the `out` folder.

### `pnpm start`

Starts the production build for preview.

### `pnpm preview`

Builds and starts the production build for preview.

### `pnpm test`

Runs your tests using Vitest in interactive mode.

### `pnpm test:run`

Runs your tests once using Vitest.

### `pnpm test:coverage`

Runs your tests and generates a coverage report.

### `pnpm check`

Checks your code for formatting and linting issues using Biome.

### `pnpm check:unsafe`

Checks your code and applies safe fixes using Biome.

### `pnpm fix`

Applies automatic fixes to code formatting and linting issues using Biome.

### `pnpm typecheck`

Checks for TypeScript errors without emitting files.

### `pnpm taze`

Updates all dependencies to their latest versions using taze.

### `pnpm shadcn`

Adds shadcn components to your project.

### Database Scripts

### `pnpm db:generate`

Generates Prisma client.

### `pnpm db:migrate`

Deploys Prisma migrations.

### `pnpm db:push`

Pushes the Prisma schema to the database.

### `pnpm db:studio`

Opens Prisma Studio for database management.




