import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "@/pages/auth";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard/dashboard-home";
import Organization from "./pages/dashboard/organization";
import Projects from "@/pages/dashboard/projects";
import ProjectDetail from "@/pages/project/project-detail";
import AppSidebar from "./components/app-sidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<AppSidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="org" element={<Organization />} />
        </Route>
        <Route path="/projects" element={<AppSidebar />}>
          <Route index element={<Projects />} />
          <Route path=":projectId" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
