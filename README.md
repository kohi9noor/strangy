# Strangy

Strangy is a web-based platform for users for real-time conversations. It provides an interactive and anonymous chatting experience with features similar to Omegle, implemented using **Node.js** and **React.js**.

## Features

- **Real-Time Chat**: Connect with strangers and chat in real time.
- **Anonymous Conversations**: Maintain anonymity while chatting.
- **WebSocket Integration**: Uses WebSocket for seamless real-time communication.
- **Redis Support**: Efficient session management and user matching with Redis.
- **Interactive UI**: User-friendly interface built with React.js.
- **Local and Cloud Setup**: Works locally and can be deployed using tunneling services like Cloudflare.

## Structure

```
Strangy/
├── client/       # React.js frontend
├── server/       # Node.js backend
```

## Environment Variables

### Server Directory

Create a `.env` file in the `server` directory with the following variables:

```env
PORT="5500"
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PWD=""
PUBLIC_WEBSOCKET_URL=""
```

### Client Directory

Create a `.env` file in the `client` directory with the following variable:

```env
VITE_APP_WEBSOCKET_URL=""
```

> **Note:** The URLs provided are for testing purposes and use Cloudflare tunnels.

## Local Setup

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.
- **Redis**: Install and configure Redis.

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/strangy.git
   cd strangy
   ```

2. **Setup the Server**

   ```bash
   cd server
   npm install
   npm run start
   ```

   The server will start on `http://localhost:5500` (or the port specified in the `.env` file).

3. **Setup the Client**

   ```bash
   cd client
   npm install
   npm run dev
   ```

   The client will start on `http://localhost:3000` by default.

4. **Run Redis Locally**

   Start Redis on the host machine or use a Docker container:

   ```bash
   docker run -d -p 6379:6379 redis
   ```

5. **Access the Application**

   Open the client URL (`http://localhost:3000`)
