import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import classNames from "classnames";
import { UserContext } from "../../App";

export const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className={styles.Header}>
      <nav className={styles.Navigation}>
        <ul>
          {user ? (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    classNames(styles.NavigationLink, isActive && styles.active)
                  }
                  to={"/home"}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    classNames(styles.NavigationLink, isActive && styles.active)
                  }
                  to={"/transactions"}
                >
                  Transfer
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    classNames(styles.NavigationLink, isActive && styles.active)
                  }
                  to={"/credits"}
                >
                  Credits
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    classNames(styles.NavigationLink, isActive && styles.active)
                  }
                  to={"/signIn"}
                >
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    classNames(styles.NavigationLink, isActive && styles.active)
                  }
                  to={"/signUp"}
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
