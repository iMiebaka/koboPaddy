import ChartIcon from "../../../assets/icons/Chart.icon";
import OverviewIcon from "../../../assets/icons/Overview.icon";
import PiggyIcon from "../../../assets/icons/Piggy.icon";
import { Link, useLocation } from "react-router-dom";

export default function NavLinks() {
  return (
    <nav className="mt-10 ">
      <Item
        href="/"
        children={
          <div className="flex items-center">
            <OverviewIcon />
            <span className="mx-3">Dashboard</span>
          </div>
        }
      />
      <Item
        href="/wallet"
        children={
          <div className="flex items-center">
            <PiggyIcon />
            <span className="mx-3">Wallet</span>
          </div>
        }
      />
      <Item
        href="/investment"
        children={
          <div className="flex items-center">
            <ChartIcon />
            <span className="mx-3">Investment</span>
          </div>
        }
      />
    </nav>
  );
}

const Item = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const { pathname } = useLocation();
  const isActive =
    pathname === href || (pathname.includes(href) && href !== "/");

  return (
    <div
      className={` px-6 py-2 mt-4 ${
        isActive ? "!text-gray-100 bg-gray-700 bg-opacity-25" : "text-gray-500"
      } text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100`}
    >
      <Link
       to={href}>{children}</Link>
    </div>
  );
};
