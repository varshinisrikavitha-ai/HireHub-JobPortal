import { Card, Badge, Button, Modal, Form, Toast, ToastContainer } from "react-bootstrap";
import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";

function JobCard({ job, setApplications }) {
  const [showApply, setShowApply] = useState(false);
  const [applicant, setApplicant] = useState({ name: "", email: "", resume: null });
  const [applied, setApplied] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", success: true });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") setApplicant({ ...applicant, resume: files[0] });
    else setApplicant({ ...applicant, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (applicant.name && applicant.email && applicant.resume) {
      setApplications(prev => [
        ...prev,
        {
          id: Date.now(),
          jobTitle: job.title,
          company: job.company,
          name: applicant.name,
          email: applicant.email,
          resume: applicant.resume,
          posted: job.posted,
          appliedDate: new Date().toLocaleDateString()
        }
      ]);

      setToast({ show: true, message: `Application for ${job.title} submitted!`, success: true });
      setApplied(true);
      setShowApply(false);
      setApplicant({ name: "", email: "", resume: null });
    } else {
      setToast({ show: true, message: "Application failed. Fill all fields.", success: false });
    }
  };

  const gradientMap = {
    "Full-time": "linear-gradient(135deg, #6a11cb, #2575fc)",
    "Part-time": "linear-gradient(135deg, #ff9966, #ff5e62)",
    Internship: "linear-gradient(135deg, #00c6ff, #0072ff)",
  };

  return (
    <>
      <Card className="mb-3 shadow-sm job-card hover-gradient" style={{ background: gradientMap[job.type], color: "white" }}>
        <Card.Body>
          <Card.Title>{job.title}</Card.Title>
          <Card.Subtitle className="mb-2"><FaBuilding className="me-1" />{job.company}</Card.Subtitle>
          <div className="mb-2 d-flex align-items-center gap-2">
            <Badge bg="light" text="dark">{job.type}</Badge>
            <span><FaMapMarkerAlt className="me-1" />{job.location}</span>
            <span><FaCalendarAlt className="me-1" />{job.posted}</span>
          </div>
          <Button 
            variant="light" 
            size="sm" 
            onClick={() => setShowApply(true)}
            disabled={applied}
          >
            {applied ? "Applied" : "Apply"}
          </Button>
        </Card.Body>
      </Card>

      {/* Apply Modal */}
      <Modal show={showApply} onHide={() => setShowApply(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for {job.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={applicant.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={applicant.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Resume (PDF)</Form.Label>
              <Form.Control type="file" name="resume" accept=".pdf" onChange={handleChange} required />
            </Form.Group>
            <Button type="submit" variant="primary">Submit Application</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          bg={toast.success ? "success" : "danger"} 
          onClose={() => setToast({ ...toast, show: false })} 
          show={toast.show} 
          delay={3000} 
          autohide
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default JobCard;
