# SketchSync - Real-Time Collaborative Whiteboard

SketchSync is an interactive, real-time collaborative whiteboard built using the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. It enables multiple users to seamlessly draw, write, and brainstorm together on a shared canvas — all in real time. With integrated chat, dynamic drawing tools, and live room synchronization, SketchSync replicates the feel of a physical whiteboard, optimized for remote teamwork, classrooms, and creative sessions.

### Deployed Links :

*   **Frontend - Vercel :** [Live App on Vercel](https://sketch-sync-collaborative-whiteboar-kohl.vercel.app/)
*   **Backend - Railway** 

---

## Key Features

- **Real-Time Sync**  
  All drawings, shapes, and text update instantly across all connected users via WebSockets, enabling seamless live collaboration.

- **Versatile Drawing Tools**  
  - **Pen & Eraser**: Freehand drawing with adjustable brush size and opacity  
  - **Shapes**: Easily draw rectangles and circles  
  - **Text Tool**: Insert and position text directly on the canvas

- **Room Access Control**  
  - **Public Rooms**: Shareable link for open collaboration  
  - **Private Rooms**: Password-protected for secure, invite-only sessions

- **Built-In Live Chat**  
  Collaborators can communicate in real-time using the integrated chat panel.

- **Undo & Redo**  
  Step backward or forward through drawing actions with multi-level undo/redo support.

- **Canvas Management Tools**  
  - Clear the entire canvas for all participants  
  - Customize color, brush size, and opacity for a personalized drawing experience

- **Export Options**  
  Save your whiteboard as a high-quality **PNG** image or **PDF** for offline sharing or documentation.

---

## Tech Stack

| Category   | Technology                                      |
|------------|--------------------------------------------------|
| Frontend   | React, Styled Components, Socket.IO Client, HTML5 Canvas API |
| Backend    | Node.js, Express, Socket.IO, Mongoose            |
| Database   | MongoDB (via MongoDB Atlas)                      |
| Deployment| [Vercel](https://vercel.com/), [Railway](https://railway.app/)    
---

## Project Structure

The project is organized as a monorepo with two main directories:

```
/
├── backend/        # Node.js, Express, Socket.IO server
│   ├── model/     # Mongoose data models (Room, User)
│   └── server.js   # Main server entry point
└── frontend/       # React application
    ├── public/
    └── src/
        ├── components/ # React components
        ├── socketio/    # Socket.IO and other contexts
        └── App.js      # Main app component
```
---

## 🏁 Getting Started

To run this project locally, follow these steps.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Sanchita-Gupta06/SketchSync-Collaborative-Whiteboard.git
    cd SketchSync-Collaborative-Whiteboard
    ```

2.  **Set up the Backend:**
    ```bash
    # Navigate to the backend directory
    cd backend

    # Install dependencies
    npm install

3.  **Set up the Frontend:**
    ```bash
    # Navigate to the frontend directory from the root
    cd ../frontend

    # Install dependencies
    npm install

4.  **Run the Application:**
    *   **Start the Backend Server:** Open a terminal in the `/backend` directory and run:
        ```bash
        npm start
        ```
    *   **Start the Frontend App:** Open a separate terminal in the `/frontend` directory and run:
        ```bash
        npm start
        ```
---

## Future Improvements

- Voice/Video chat integration
- Drawing history timeline
- Offline mode

---
