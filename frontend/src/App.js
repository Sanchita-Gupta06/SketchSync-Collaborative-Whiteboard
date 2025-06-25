import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './components/Login';
import Whiteboard from './components/Header';
import { SocketProvider } from './socketio/Socketio';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #60a5fa, #3b82f6 100%);
`;

function App() {
  return (
    <SocketProvider>
      <AppContainer>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/whiteboard/:roomId" element={<Whiteboard />} />
          </Routes>
        </Router>
      </AppContainer>
    </SocketProvider>
  );
}

export default App; 