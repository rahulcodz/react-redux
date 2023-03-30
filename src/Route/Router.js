import Practice from "../components/Others/Practice";
import Login from "../pages/Login/Login";
import FormList from "../components/List/FormList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Protected from "./Protected";
function Router() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/",
      element: <Protected HomeComponent={FormList} />,
    },

    {
      path: "/practice",
      element: <Practice />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default Router;
