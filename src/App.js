import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }, [user]);

  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
        <Header />
        <Outlet />
      </UserContext.Provider>
    </>
  );
}

export default App;
