import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import JobCard from "../common/JobCard";
import SearchBar from "../common/SearchBar";

function JobBoard({ jobs, setApplications, darkMode }) {
  const [search, setSearch] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("");

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterCompany === "" || job.company === filterCompany) &&
    (filterLocation === "" || job.location === filterLocation) &&
    (filterType === "" || job.type === filterType)
  );

  return (
    <>
      <h3 className="mb-3">Job Listings</h3>
      <SearchBar
        search={search} setSearch={setSearch}
        filterCompany={filterCompany} setFilterCompany={setFilterCompany}
        filterLocation={filterLocation} setFilterLocation={setFilterLocation}
        filterType={filterType} setFilterType={setFilterType}
        darkMode={darkMode}
      />

      <Row>
        {filteredJobs.length === 0 && <p>No jobs found</p>}
        {filteredJobs.map(job => (
          <Col md={6} key={job.id}>
            <JobCard job={job} setApplications={setApplications} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default JobBoard;
