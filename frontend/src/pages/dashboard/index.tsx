import { Route, Routes } from "react-router-dom";
import Mainlayout from "../../components/layout/Mainlayout";
import Home from "./Home";
import Wallet from "./Wallet";
import Investment from "./Investment";

export default function Dashboard() {
  return (
    <Routes>
      <Route path="" element={<Mainlayout />}>
        <Route index element={<Home />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="investment" element={<Investment />} />
      </Route>
    </Routes>
  );
}
