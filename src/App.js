import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard';
import CaregiverDashboard from './CaregiverDashboard';
import MemoryChat from './MemoryChat';
import MedicationReminder from './MedicationReminder';
import Login from './Login';
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">
      <h1>Alzheimer's App</h1>
      {loggedIn ? (
          <div>
            <Dashboard />
            <CaregiverDashboard />
            <MemoryChat />
            <MedicationReminder />
          </div>
      ) : (
          <div>
            <div className="login-container">
              <Login onLogin={handleLogin} />
            </div>
            <div className="dashboard-container">
              <Dashboard />
            </div>
          </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
