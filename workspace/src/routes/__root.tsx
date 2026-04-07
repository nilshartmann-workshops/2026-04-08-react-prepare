import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import * as React from "react";
import { Panel, TabBar } from "../components/TabBar.tsx";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {

  //
  // Mit Router:
  //
  //  - Back-Button funktioniert
  //  - Deep-Link funktioniert

  return (
    <div className={"AppContainer"}>
      <TabBar>
        <Link
          to={"/"}
          className={"Tab"}
          activeProps={{
            className: "Tab Tab--active",
          }}
        >
          Alle Pflanzen
        </Link>
        <Link
          className={"Tab"}
          to={"/add"}
          activeProps={{
            className: "Tab Tab--active",
          }}
        >
          Pflanze hinzufügen
        </Link>

        <div className={"TabPanel"}>
          <Outlet />
        </div>
      </TabBar>
    </div>
  );
}
