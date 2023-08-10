import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import Navbar from "./components/Navbar";
import Home from "./components/homepage/Home";
import Cart from "./components/Cart";
import Orders from "./components/Orders";

import SignInForm from "./components/FormPages/SignInForm";
import SignUpForm from "./components/FormPages/SignUpForm";

function App() {
  const router = createBrowserRouter([
    {path: '/', element: <Navbar />, children:[
      {index: true, element: <Home />},
      {path:'/signin', element:  <SignInForm/>},
      {path:'/signup', element:  <SignUpForm/>},
      {path:'/cart', element:  <Cart/>},
      {path:'/orders', element:  <Orders/>},
    ]},
  ]);

  return (
    <RouterProvider router={router}>
    <div className="App">
    </div>
    </RouterProvider>
  );
}

export default App;
