import { Route, Routes } from "react-router-dom";
import Mainlayout from "../../components/layout/Mainlayout";
import Home from "./Home";
import Wallet from "./Wallet";
import Investment from "./Investment";
import { useProfileService } from "../../hooks/services/Account.hook";
import LoadingPage from "../../components/loader/LoadingPage";
import NotFound from "../NotFound";

export default function Dashboard() {
  const { isSuccess } = useProfileService();

  if (!isSuccess) return <LoadingPage />;

  return (
    <Routes>
      <Route path="" element={<Mainlayout />}>
        <Route index element={<Home />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="investment" element={<Investment />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
