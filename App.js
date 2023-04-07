import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //false means logout...true means lagin

  useEffect(() => {
    const storeUserLoggedInInformation = localStorage.getItem("isloggdin");

    if (storeUserLoggedInInformation === "1") {  //THIS 1 IS COMPARING WITH ....localStorage.setItem("isLoggedin", "1"); \|/
      setIsLoggedIn(true);
    }
  },[]);

  const loginHandler = (email, password,collegeName) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedin", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedin')
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
