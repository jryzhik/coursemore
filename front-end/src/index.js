import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Filter from "./pages/Filter";
import "./index.css";


const router  = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "filter",
    element: <Filter/>
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}/>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
