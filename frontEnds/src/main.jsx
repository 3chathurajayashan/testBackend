 
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import Products from './Pages/Products.jsx'

const router = createBrowserRouter([

  {
    path:"/",
    element: <App/>,
  },
  {
    path:"/Products",
    element: <Products/>,
  },
   
   
]);



const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);

