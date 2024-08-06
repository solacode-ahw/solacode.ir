import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './app.jsx';
import Home from './home.jsx';
import Hire from './hire.jsx';
import Blog from './blog.jsx';
import Post from './post.jsx';
import Resources from './resources.jsx';
import { Unsubscribe, Subscription } from './subscription.jsx';
import NotFound from './404.jsx';


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
        path: "resources",
        element: <Resources />
      },
      {
        path: "unsubscribe",
        element: <Unsubscribe />,
      },
      {
        path: "subscription",
        element: <Subscription />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);