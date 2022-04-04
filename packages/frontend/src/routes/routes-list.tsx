import { FunctionComponent, ReactElement } from "react";
import Campaigns from "./campaigns";
import HomePage from "./home";
import Stories from "./stories";

interface IRoutes {
  label: string;
  href: string;
  component: ReactElement;
}

const routes: IRoutes[] = [
  { label: "Home", href: "/", component: <HomePage /> },
  { label: "Campaigns", href: "/campaigns", component: <Campaigns /> },
  { label: "Stories", href: "/stories", component: <Stories /> },
];

export default routes;
