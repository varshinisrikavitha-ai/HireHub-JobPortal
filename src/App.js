import { useState, useEffect } from "react";
import { Container, Button, Navbar, Nav, Form } from "react-bootstrap";
import AdminDashboard from "./components/admin/AdminDashboard";
import JobBoard from "./components/user/JobBoard";

function App() {
  const [role, setRole] = useState("user");
  const [darkMode, setDarkMode] = useState(false);

  const [jobs, setJobs] = useState([
    { id: 1, title: "Frontend Developer", company: "Google", location: "NY", type: "Full-time", posted: "2 days ago" },
    { id: 2, title: "Backend Developer", company: "Amazon", location: "SF", type: "Internship", posted: "1 week ago" },
    { id: 3, title: "Fullstack Developer", company: "Microsoft", location: "LA", type: "Part-time", posted: "3 days ago" },
  ]);

  // Load applications from localStorage
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem("applications");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync applications to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  const themeClasses = darkMode ? "bg-dark text-light min-vh-100" : "bg-light text-dark min-vh-100";

  return (
    <div className={themeClasses}>
      <Navbar
        bg={darkMode ? "dark" : "light"}
        variant={darkMode ? "dark" : "light"}
        expand="lg"
        className="mb-4 shadow-sm sticky-top"
      >
        <Container>
          <Navbar.Brand href="#" className="fw-bold fs-4">🌐 HireHub</Navbar.Brand>

          <Nav className="ms-auto d-flex align-items-center gap-3">
            <div className="role-indicator px-3 py-1 rounded-pill text-center" style={{
              background: darkMode ? "#343a40" : "#e9ecef",
              fontWeight: 500
            }}>
              Role: <strong>{role.toUpperCase()}</strong>
            </div>

            <Button
              variant={darkMode ? "outline-light" : "outline-secondary"}
              size="sm"
              onClick={() => setRole(role === "admin" ? "user" : "admin")}
            >
              Switch to {role === "admin" ? "User" : "Admin"}
            </Button>

            <Form.Check 
              type="switch"
              id="theme-switch"
              label={darkMode ? "🌙 Dark" : "☀️ Light"}
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </Nav>
        </Container>
      </Navbar>

      <Container className="pb-5">
        {role === "admin" ? (
          <AdminDashboard
            jobs={jobs}
            setJobs={setJobs}
            applications={applications}
            darkMode={darkMode}
          />
        ) : (
          <JobBoard
            jobs={jobs}
            setApplications={setApplications}
            darkMode={darkMode}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
