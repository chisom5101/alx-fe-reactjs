import React from "react";
import UserProfile from "./components/UserProfile";
import UserContext from './UserContext';
import Counter from './components/Counter';

function App() {
  return (
    <UserContext.Provider value={userdata}>
      <div className="App">
        <Header />
        <MainContent />
        <Counter />
        <ProfilePage />
        <Footer />


    <div>
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
    </div>
  );
}

export default App;