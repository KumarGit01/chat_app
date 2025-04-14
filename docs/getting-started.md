# Getting Started Guide

This guide will help you set up and run the Chat Application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) (v1.1.38 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Community Edition)

## Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/chat_app.git
   cd chat_app
   ```

2. **Install Dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and configure the following variables:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/chat_app
     JWT_SECRET=your_jwt_secret
     ```

4. **Database Setup**
   - Ensure MongoDB is running on your system
   - The application will automatically create necessary collections

5. **Start the Application**
   ```bash
   bun run src/server.ts
   ```

## Verifying Installation

1. The server should start without errors
2. You should see a message indicating the server is running
3. Access the API documentation at `http://localhost:3000/api-docs`

## Common Issues and Solutions

### MongoDB Connection Issues
- Ensure MongoDB service is running
- Check if the connection string in `.env` is correct
- Verify network connectivity if using remote MongoDB

### Port Already in Use
- Change the PORT in `.env` file
- Kill the process using the current port

## Next Steps

- Read the [API Documentation](./api.md)
- Check out the [Architecture Guide](./architecture.md)
- Review [Contributing Guidelines](./contributing.md) 