import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "@/pages/auth";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard/dashboard-home";
import Organization from "./pages/dashboard/organization";
import Projects from "@/pages/dashboard/projects";
import DashboardLayout from "./pages/dashboard/dashboard-layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

        {/* Dashboard layout with nested routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} /> {/* /dashboard */}
          <Route path="org" element={<Organization />} />
          <Route path="projects" element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
