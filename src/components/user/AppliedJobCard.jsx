import { Card, Badge, Button } from "react-bootstrap";
import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

function AppliedJobCard({ job, darkMode }) {
  return (
    <Card className="mb-3 shadow-sm" style={{ background: darkMode ? "#1c1c1c" : "#f0f8ff", color: darkMode ? "white" : "black" }}>
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Card.Subtitle className="mb-2"><FaBuilding className="me-1" /> {job.company}</Card.Subtitle>
        <div className="mb-2 d-flex align-items-center gap-2">
          <Badge bg="light" text="dark">{job.type}</Badge>
          <span><FaMapMarkerAlt className="me-1" /> {job.location}</span>
          <span><FaCalendarAlt className="me-1" /> {job.posted}</span>
        </div>
        {job.resume ? (
          <Button variant="primary" size="sm" href={URL.createObjectURL(job.resume)} target="_blank" download>
            Download Resume
          </Button>
        ) : (
          <small className="text-muted">No Resume Uploaded</small>
        )}
      </Card.Body>
    </Card>
  );
}

export default AppliedJobCard;
