import { RouterProvider } from "react-router";
import router from "./router/routes";
import AppProvider from "./context/AppProvider";

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router}></RouterProvider>
    </AppProvider>
  );
}

export default App;
