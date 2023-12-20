import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import { SignInPage } from "../pages/SignInPage/SignInPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { TransactionPage } from "../pages/TransactionPage/TransactionPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { CreditsPage } from "../pages/CreditsPage/CreditsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", element: <HomePage /> },
      { path: "/signIn", element: <SignInPage /> },
      { path: "/signUp", element: <SignUpPage /> },
      { path: "/transactions", element: <TransactionPage /> },
      { path: "/credits", element: <CreditsPage /> },
    ],
  },
]);
