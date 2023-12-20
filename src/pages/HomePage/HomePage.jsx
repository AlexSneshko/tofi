import React, { useContext, useEffect, useState } from "react";
import commonStyles from "../../styles/common.module.scss";
import { supabaseClient } from "../../config/supabase";
import { getUser } from "../../api/getUser";
import { UserContext } from "../../App";
import { Button } from "../../components/ui/Button/Button";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [userName, setUserName] = useState();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate()

  const signOut = () => {
    supabaseClient.auth.signOut().then(() => {
      setUser(null)
      localStorage.removeItem('user')
    })
    navigate('/signIn')
  }

  useEffect(() => {
    getUser().then((user) => {
      setUser(user)
      setUserName(user.name)
    })
  }, []);

  return <section className={commonStyles.container}>
    <h1>Hello {userName}!</h1>
    <Button text={'Sign Out'} onClick={signOut}/>
  </section>;
};
