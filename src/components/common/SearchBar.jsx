import { Row, Col, Form } from "react-bootstrap";

function SearchBar({ search, setSearch, filterCompany, setFilterCompany, filterLocation, setFilterLocation, filterType, setFilterType, darkMode }) {
  const inputBg = darkMode ? "#2c2c2c" : "#ffffff";
  const inputColor = darkMode ? "#f1f1f1" : "#333";
  const borderColor = darkMode ? "#555" : "#ccc";
  const boxShadow = darkMode ? "0 2px 6px rgba(0,0,0,0.6)" : "0 2px 6px rgba(0,0,0,0.1)";

  const commonStyle = { backgroundColor: inputBg, color: inputColor, borderColor, boxShadow, borderRadius: "8px", padding: "6px 12px", transition: "all 0.3s ease" };

  return (
    <Row className="mb-4 g-2">
      <Col md={3}>
        <Form.Control placeholder="Search by title..." value={search} onChange={(e)=>setSearch(e.target.value)} style={commonStyle} className="search-input no-arrow" />
      </Col>
      <Col md={3}>
        <Form.Select value={filterCompany} onChange={(e)=>setFilterCompany(e.target.value)} style={commonStyle} className="search-input dropdown-arrow required">
          <option value="">All Companies</option>
          <option value="Google">Google</option>
          <option value="Amazon">Amazon</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Apple">Apple</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select value={filterLocation} onChange={(e)=>setFilterLocation(e.target.value)} style={commonStyle} className="search-input dropdown-arrow required">
          <option value="">All Locations</option>
          <option value="NY">NY</option>
          <option value="SF">SF</option>
          <option value="LA">LA</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select value={filterType} onChange={(e)=>setFilterType(e.target.value)} style={commonStyle} className="search-input dropdown-arrow required">
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </Form.Select>
      </Col>
    </Row>
  );
}

export default SearchBar;
