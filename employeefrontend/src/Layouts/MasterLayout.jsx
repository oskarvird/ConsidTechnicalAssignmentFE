import { Outlet } from "react-router-dom";
import SiteHeader from "../Components/SiteHeader/SiteHeader";

const MasterLayout = () => {
  return (
    <div className="container-fluid">
      <SiteHeader />
      <Outlet />
    </div>
  );
};

export default MasterLayout;
