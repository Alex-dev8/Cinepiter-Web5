import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Welcome from "./pages/welcome/Welcome";
import Webflix from "./pages/webflix/Webflix";
import DestinyPlus from "./pages/destiny-plus/DestinyPlus";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/webflix" element={<Webflix />} />
      <Route path="/destiny-plus" element={<DestinyPlus />} />
    </Routes>
  );
}

export default App;
