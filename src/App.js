import React, { useState } from 'react';
import User from './Users';
import UserDetails from './UserDetails';
import './App.css';

function App() {
  const [userId, setUserId] = useState(); // selected

  return (
    <div className='App'>
      <div
        style={{ padding: 20, width: '30%', borderRight: '2px solid white' }}
      >
        <User setUserId={setUserId} />
      </div>

      <div style={{ padding: 20, width: '70%' }}>
        <UserDetails userId={userId} />
      </div>
    </div>
  );
}

export default App;
