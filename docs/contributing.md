# Contributing Guidelines

Thank you for your interest in contributing to the Chat Application! This document provides guidelines and steps for contributing to the project.

## Code of Conduct

Please read and follow our [Code of Conduct](./code-of-conduct.md) to maintain a respectful and inclusive environment.

## How to Contribute

1. **Fork the Repository**
   - Fork the repository to your GitHub account
   - Clone your fork locally

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the coding standards
   - Write tests for new features
   - Update documentation as needed

4. **Commit Your Changes**
   ```bash
   git commit -m "feat: add new feature"
   ```
   Follow [Conventional Commits](https://www.conventionalcommits.org/)

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template

## Development Setup

1. Install dependencies:
   ```bash
   bun install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Start development server:
   ```bash
   bun run dev
   ```

## Coding Standards

- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Include tests for new features

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the documentation if you're changing functionality
3. The PR will be merged once you have a maintainer's approval
4. Ensure all tests pass before submitting

## Testing

- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Run tests locally:
  ```bash
  bun test
  ```

## Documentation

- Update API documentation for new endpoints
- Add comments for complex logic
- Update README.md if needed

## Questions?

Feel free to open an issue for any questions or concerns.

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License. 