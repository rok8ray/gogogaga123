# Minimal Chat Application

## Overview

This is a simple real-time chat application built with Node.js. It allows multiple users to connect and exchange messages instantly through WebSocket connections. The application serves a single HTML page that handles both the UI and client-side socket communication.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Architecture
- **Framework**: Express.js (v5.2.1) serves as the web server
- **Real-time Communication**: Socket.IO (v4.8.3) handles WebSocket connections for instant messaging
- **Server Setup**: The HTTP server is created manually and passed to both Express and Socket.IO, allowing them to share the same port (5000)

### Frontend Architecture
- **Single Page Application**: One static HTML file (`index.html`) contains all markup, styles, and client-side JavaScript
- **No Build Process**: Plain HTML, CSS, and vanilla JavaScript with no framework or bundling required
- **Socket.IO Client**: Loaded directly from the server via `/socket.io/socket.io.js`

### Communication Pattern
- **Event-Based Messaging**: Client emits `chat message` events to server, server broadcasts to all connected clients
- **Broadcast Model**: All messages are sent to every connected user (no private messaging or rooms)

### Data Storage
- **No Persistence**: Messages exist only in memory during the session; no database or storage mechanism is implemented
- **Stateless**: Chat history is lost on page refresh or server restart

## External Dependencies

### Runtime Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web server framework for serving static files and handling HTTP |
| socket.io | ^4.8.3 | Real-time bidirectional WebSocket communication |

### External Services
- None configured - this is a self-contained application with no external API calls or third-party integrations