import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Verify from "./Verify";

export default function Account() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="email-verification" element={<Verify />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
