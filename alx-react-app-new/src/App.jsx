import './App.css';
import React from 'react';
import UserProfile from './components/UserProfile';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Counter from './components/Counter';
import UserContext from './UserContext';
import ProfilePage from './components/ProfilePage';


function App() {
  const userdata = {
    name: "John Doe",
    age: 30,
    location: "New York",
    bio: "Avid traveler and city explorer.",
    favoriteCities: ["New York", "Paris", "Tokyo"],
  };
  return (
    <UserContext.Provider value={userdata}>
      <div className="App">
        <Header />
        <MainContent />
        <Counter />
        <ProfilePage />
        <Footer />
      </div>
    </UserContext.Provider>

  );
}

export default App;
