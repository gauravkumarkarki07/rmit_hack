import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ListEvents from './Events/ListEvents.tsx';
import Index from './Home/views/Index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path:'',
        element:<Navigate to={'/events'}/>
      },
      {
        path:'/events',
        element:<ListEvents/>
      },
      {
        path: '/events/:eventId',
        element: <Index />
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
