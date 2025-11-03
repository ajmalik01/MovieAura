import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ExplorePage from "../pages/ExplorePage";
import DetailPage from "../pages/DetailPage";
import SearchPage from "../pages/SearchPage";
import ErrorPage from "../pages/ErrorPage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import FAQ from "../pages/FAQ";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MyList from "../pages/MyList";
import AccountSettings from "../pages/AccountSettings";

const router = createBrowserRouter([
  // 🧱 AUTH ROUTES - standalone
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  // 🏠 MAIN APP (with header/footer)
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "explore/:explore", element: <ExplorePage /> },
      { path: ":explore/:id", element: <DetailPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "privacy", element: <PrivacyPolicy /> },
      { path: "terms", element: <TermsOfService /> },
      { path: "faq", element: <FAQ /> },
      { path: "account", element: <AccountSettings /> },
      {
        path: "my-list",
        element: localStorage.getItem("loggedInUser") ? (
          <MyList />
        ) : (
          <Navigate to="/login" replace />
        ),
      },
    ],
  },
]);

export default router;
