# Chat Application

A real-time chat platform where users can share their thoughts and communicate seamlessly.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Bun (v1.1.38 or higher)
- MongoDB (for database)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chat_app.git
cd chat_app
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
bun run src/server.ts
```

## 📚 Documentation

Detailed documentation is available in the [docs](./docs) directory:
- [Getting Started](./docs/getting-started.md)
- [API Documentation](./docs/api.md)
- [Architecture](./docs/architecture.md)
- [Contributing Guidelines](./docs/contributing.md)

## 🛠️ Tech Stack

- **Backend**: Node.js with Express
- **Runtime**: Bun
- **Database**: MongoDB
- **Real-time Communication**: WebSocket
- **Authentication**: JWT

## 📁 Project Structure

```
chat_app/
├── src/
│   ├── server.ts
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── middleware/
├── docs/
├── tests/
└── README.md
```

## 🤝 Contributing

Please read our [Contributing Guidelines](./docs/contributing.md) before submitting any pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👥 Authors

- Kumar_Raj - Initial work

## 🙏 Acknowledgments

- Bun.js team for the amazing runtime
- Express.js community
- MongoDB team
