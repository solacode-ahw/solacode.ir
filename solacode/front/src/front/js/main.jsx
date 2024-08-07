import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './app.jsx';
import Home from './pages/home.jsx';
import Hire from './pages/hire.jsx';
import Blog from './pages/blog.jsx';
import Post from './pages/post.jsx';
import Resources from './pages/resources.jsx';
import { Unsubscribe, Subscription } from './pages/subscription.jsx';
import NotFound from './pages/404.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "hire",
        element: <Hire />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/post/:id",
        element: <Post />
      },
      {
        path: "blog/unsubscribe",
        element: <Unsubscribe />,
      },
      {
        path: "blog/subscription",
        element: <Subscription />,
      },
      {
        path: "resources",
        element: <Resources />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);