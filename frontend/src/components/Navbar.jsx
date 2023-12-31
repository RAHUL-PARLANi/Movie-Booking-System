import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/user";

function MainNavbar() {
  const userData = useSelector(state=>state.users.value);
  const dispatch=useDispatch()
  return (
    <>
      {["xl"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          bg="primary"
          data-bs-theme="blue"
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
                  {userData.isAuthenticated == true? (
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
                        title={userData.userName}
                        color="white"
                        className="fw-bold text-white"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                      >
                        <NavDropdown.Item >
                          My Profile
                        </NavDropdown.Item>
                        {/* <NavDropdown.Item href="#action3">My Tickets</NavDropdown.Item> */}
                        <NavDropdown.Item
                          onClick={() => {
                            dispatch(logout())   
                          }}
                        >
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
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