import Auth from "./pages/Auth/Auth";
import CreateCost from "./pages/CreateCost/CreateCost";
import Default from "./pages/Default/Default";
import NotFound from "./pages/NotFound/NotFound";

export const routes = [
  {
    path: "*",
    element: <NotFound/>
  },
  {
    path: "/",
    element: <Default/>
  },
  {
    path: "/signup",
    element: <Auth authTypeText={"SignUp"}/>
  },
  {
    path: "/signin",
    element: <Auth authTypeText={"SignIn"}/>
  },
  {
    path: '/admin',
    element: <Default type='admin'/>
  },
  {
    path: '/createCost',
    element: <CreateCost/>
  }
]