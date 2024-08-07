import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { Home } from "./pages/home";
import { Register } from "./pages/register";
import { Login } from "./pages/login";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/log-in" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}