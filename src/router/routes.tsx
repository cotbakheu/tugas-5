import { createBrowserRouter } from "react-router";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import PokemonDetails from "../pages/PokemonDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pokemon/:id",
        element: <PokemonDetails />,
      },
    ],
  },
]);

export default router;
