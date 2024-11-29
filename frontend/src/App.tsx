import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/account";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
        <Route path="/account/*" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
