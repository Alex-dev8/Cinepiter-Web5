import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Welcome from "./pages/welcome/Welcome";
import Webflix from "./pages/webflix/Webflix";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/webflix" element={<Webflix />} />
    </Routes>
  );
}

export default App;
