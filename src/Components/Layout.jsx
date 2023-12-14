import Header from "./Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

// When you have a nested route structure,
//  where one route contains other sub-routes,
//   you can use the <Outlet> component to render the content 
//   of the child routes within the parent route.