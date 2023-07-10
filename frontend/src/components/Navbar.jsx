import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

function MainNavbar() {
  const [login, setLogin] = useState(false);

  return (
    <>
      {["xl"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          bg="primary"
          data-bs-theme="dark"
          className="bg-body-primary mb-3"
        >
          <Container fluid>
            <Link to="/admin" style={{ textDecoration: "inherit" }}>
              <Navbar.Brand className="fw-bold">
                Movie Bookerz... Admin Panel
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Movie Booking System
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {login ? (
                    <>
                      <Link
                        to={"/admin/"}
                        style={{ textDecoration: "inherit" }}
                      >
                        <div className="fw-bold text-white m-2">Dashboard</div>
                      </Link>
                      <Link
                        to={"/admin/showAllMovies"}
                        style={{ textDecoration: "inherit" }}
                      >
                        <div className="fw-bold text-white m-2">
                          Show Movies
                        </div>
                      </Link>
                      <Link
                        to={"/admin/addMovie"}
                        style={{ textDecoration: "inherit" }}
                      >
                        <div className="fw-bold text-white m-2">Add Movies</div>
                      </Link>

                      <NavDropdown
                        title="UserName"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                      >
                        <NavDropdown.Item href="#action4">
                          My Profile
                        </NavDropdown.Item>
                        {/* <NavDropdown.Item href="#action3">My Tickets</NavDropdown.Item> */}
                        <NavDropdown.Item
                          href="#action3"
                          onClick={() => {
                            setLogin(false);
                          }}
                        >
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
                      <Link
                        to='/admin/login'
                        onClick={() => {
                          setLogin(true);
                        }}
                      >
                        Login
                      </Link>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default MainNavbar;