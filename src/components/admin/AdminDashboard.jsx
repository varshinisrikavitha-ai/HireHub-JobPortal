import { useState } from "react"; 
import { Row, Col, Card, Form, Button, Badge } from "react-bootstrap";
import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

function AdminDashboard({ jobs, setJobs, applications, darkMode }) {
  const [editJobId, setEditJobId] = useState(null);
  const [formData, setFormData] = useState({ title: "", company: "", location: "", type: "", posted: "" });

  // Add new job
  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company || !formData.location || !formData.type || !formData.posted) return;
    setJobs([...jobs, { id: Date.now(), ...formData }]);
    setFormData({ title: "", company: "", location: "", type: "", posted: "" });
  };

  // Edit / Save job
  const handleEdit = (job) => { 
    setEditJobId(job.id); 
    setFormData({ ...job }); 
  };
  const handleSave = (id) => { 
    setJobs(jobs.map(j => j.id === id ? { ...formData } : j)); 
    setEditJobId(null); 
    setFormData({ title: "", company: "", location: "", type: "", posted: "" }); 
  };
  const handleDelete = (id) => setJobs(jobs.filter(j => j.id !== id));
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const gradientMap = { 
    "Full-time": "linear-gradient(135deg, #6a11cb, #2575fc)", 
    "Part-time": "linear-gradient(135deg, #ff9966, #ff5e62)", 
    "Internship": "linear-gradient(135deg, #00c6ff, #0072ff)" 
  };

  // Format dates nicely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
  };

  // Safe resume download
  const handleDownloadResume = (resume, name) => {
    if (!resume) return;
    let url;
    if (resume instanceof File || resume instanceof Blob) {
      url = URL.createObjectURL(resume);
    } else {
      url = resume; // already URL or base64
    }
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name || "resume"}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (resume instanceof File || resume instanceof Blob) {
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <h3 className="mb-4">Admin Dashboard</h3>

      {/* Add Job Form */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleAdd}>
            <Row className="g-2">
              <Col md={2}><Form.Control placeholder="Title" name="title" value={formData.title} onChange={handleChange} required /></Col>
              <Col md={2}><Form.Control placeholder="Company" name="company" value={formData.company} onChange={handleChange} required /></Col>
              <Col md={2}><Form.Control placeholder="Location" name="location" value={formData.location} onChange={handleChange} required /></Col>
              <Col md={2}>
                <Form.Select name="type" value={formData.type} onChange={handleChange} required>
                  <option value="">Select Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                </Form.Select>
              </Col>
              <Col md={2}><Form.Control placeholder="Posted" name="posted" value={formData.posted} onChange={handleChange} required /></Col>
              <Col md={2}><Button type="submit" variant="primary">Add</Button></Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Jobs List */}
      <Row>
        {jobs.map(job => (
          <Col md={6} key={job.id}>
            {editJobId === job.id ? (
              <Card className="mb-3 shadow-sm job-card-edit" style={{ backgroundColor: darkMode ? "#1c1c1c" : "#f0f8ff", color: darkMode ? "white" : "black" }}>
                <Card.Body>
                  <Row className="g-2">
                    <Col md={2}><Form.Control name="title" value={formData.title} onChange={handleChange} /></Col>
                    <Col md={2}><Form.Control name="company" value={formData.company} onChange={handleChange} /></Col>
                    <Col md={2}><Form.Control name="location" value={formData.location} onChange={handleChange} /></Col>
                    <Col md={2}>
                      <Form.Select name="type" value={formData.type} onChange={handleChange}>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                      </Form.Select>
                    </Col>
                    <Col md={2}><Form.Control name="posted" value={formData.posted} onChange={handleChange} /></Col>
                    <Col md={2}>
                      <Button variant="success" size="sm" className="me-2" onClick={() => handleSave(job.id)}>Save</Button>
                      <Button variant="secondary" size="sm" onClick={() => setEditJobId(null)}>Cancel</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ) : (
              <Card className="mb-3 shadow-sm job-card hover-gradient" style={{ background: gradientMap[job.type], color: "white" }}>
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2"><FaBuilding className="me-1" />{job.company}</Card.Subtitle>
                  <div className="mb-2 d-flex align-items-center gap-2">
                    <Badge bg="light" text="dark">{job.type}</Badge>
                    <span><FaMapMarkerAlt className="me-1" />{job.location}</span>
                    <span><FaCalendarAlt className="me-1" />{job.posted}</span>
                  </div>
                  <div>
                    <Button variant="light" size="sm" className="me-2 mt-2" onClick={() => handleEdit(job)}>Edit</Button>
                    <Button variant="danger" size="sm" className="mt-2" onClick={() => handleDelete(job.id)}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
        ))}
      </Row>

      {/* Applications Section */}
      <h4 className="mt-5 mb-3">📄 Applications Received</h4>
      {applications.filter(app => app.appliedDate).length === 0 && <p className="text-muted">No applications yet</p>}
      <Row>
        {applications
          .filter(app => app.appliedDate) // only real applications
          .map(app => (
            <Col md={6} key={app.id}>
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title>{app.name || "N/A"}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Applied for <strong>{app.jobTitle || "N/A"}</strong>
                  </Card.Subtitle>
                  <p className="mb-1">📧 {app.email || "N/A"}</p>
                  {app.company && <p className="mb-1">🏢 {app.company}</p>}
                  {app.posted && <p className="mb-1">📅 Job Posted: {app.posted}</p>}
                  {app.appliedDate && <p className="mb-2">🗓 Applied On: {formatDate(app.appliedDate)}</p>}
                  {app.resume && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleDownloadResume(app.resume, app.name)}
                    >
                      Download Resume
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
}

export default AdminDashboard;
