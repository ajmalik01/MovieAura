import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ExplorePage from "../pages/ExplorePage";
import DetailPage from "../pages/DetailPage";
import SearchPage from "../pages/SearchPage";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "explore/:explore",
        element: <ExplorePage />,
      },
      {
        path: ":explore/:id",
        element: <DetailPage />,
      },
      {
        path: "explore/:explore/:id",
        element: <Navigate to="../:explore/:id" replace />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
]);

export default router;
