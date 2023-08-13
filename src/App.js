import { RouterProvider, createBrowserRouter} from 'react-router-dom';

import { UserCustomHook } from './components/context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./components/navbar/Navbar";
import Home from "./components/homepage/Home";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import SignInForm from "./components/FormPages/SignInForm";
import SignUpForm from "./components/FormPages/SignUpForm";

function App() {
  const {userName} = UserCustomHook();

  const router = createBrowserRouter([
    {path: '/', element: <Navbar />, children:[
      {index: true, element: <Home />},
      {path:'/cart', element: userName===''? <Home/> : <Cart/> },
      {path:'/orders', element: userName===''? <Home/> : <Orders/> },
      {path:'/signin', element:  <SignInForm/>},
      {path:'/signup', element:  <SignUpForm/>}
    ]},
  ]);

  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer theme="dark"/>
    </>
  );
}

export default App;
