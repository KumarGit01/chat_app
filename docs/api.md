# API Documentation

This document provides detailed information about the Chat Application's API endpoints.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

### Chat

#### Get All Chats
```http
GET /chats
Authorization: Bearer <token>
```

#### Create New Chat
```http
POST /chats
Authorization: Bearer <token>
Content-Type: application/json

{
  "participants": ["user_id1", "user_id2"],
  "message": "string"
}
```

#### Send Message
```http
POST /chats/:chatId/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "string"
}
```

### Users

#### Get User Profile
```http
GET /users/:userId
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /users/:userId
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "string",
  "avatar": "string"
}
```

## Response Formats

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE"
  }
}
```

## Error Codes

- `AUTH_ERROR`: Authentication related errors
- `VALIDATION_ERROR`: Input validation errors
- `NOT_FOUND`: Resource not found
- `SERVER_ERROR`: Internal server errors

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## WebSocket Events

### Connection
```javascript
ws://localhost:3000/ws
```

### Events

#### Message Received
```json
{
  "type": "message",
  "data": {
    "chatId": "string",
    "message": "string",
    "sender": "string",
    "timestamp": "string"
  }
}
```

#### User Status
```json
{
  "type": "status",
  "data": {
    "userId": "string",
    "status": "online|offline"
  }
}
``` 