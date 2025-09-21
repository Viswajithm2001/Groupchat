import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Chat from "./components/Chat";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <Chat currentUser={user} />
      ) : (
        <Login onLogin={setUser} />
      )}
    </div>
  );
};

export default App;
