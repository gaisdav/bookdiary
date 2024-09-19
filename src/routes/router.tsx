import { createBrowserRouter } from "react-router-dom";
import Library from "../pages/Library.tsx";
import { Layout } from "../Layout.tsx";

export enum ROUTE {
  HOME = "/",
  LIBRARY = "library",
  PROFILE = "profile",
}

export const router = createBrowserRouter([
  {
    path: ROUTE.HOME,
    Component: Layout,
    children: [
      {
        path: ROUTE.HOME,
        element: <h1>Top book</h1>,
      },
      {
        path: ROUTE.LIBRARY,
        element: <Library />,
      },
      {
        path: ROUTE.PROFILE,
        element: <div>profile</div>,
      },
    ],
  },
]);
