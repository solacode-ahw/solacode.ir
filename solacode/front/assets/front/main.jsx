import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from '../../src/js/app.jsx';
import Home from '../../src/js/pages/home.jsx';
import Hire from '../../src/js/pages/hire.jsx';
import Blog from '../../src/js/pages/blog.jsx';
import Post from '../../src/js/pages/post.jsx';
import Resources from '../../src/js/pages/resources.jsx';
import { Unsubscribe, Subscription } from '../../src/js/pages/subscription.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App error={false} />,
    errorElement: <App error={true} />,
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