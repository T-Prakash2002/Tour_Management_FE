import React, { useRef, useEffect,useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link,useNavigate } from "react-router-dom";
import "./header.css";
import logo from "../images/logo.png";
import { AuthContext } from "../../../context/context";



const nav_links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/bookinglist",
    display: "Booking",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];
const Header = () => {

const { user,dispatch } = useContext(AuthContext);
const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT"});
    alert("Logout Successful");
    navigate("/");
  };
  return (
    <header className="header mb-3">
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            {/*-------logo--------*/}
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            {/*-------logo end--------*/}
            {/*-------MENU START--------*/}
            <div className="navogation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/*-------MENU END--------*/}

            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-4">
                { user ? (
                  <>
                    <h5>{user.username}</h5>

                    <Button
                      className="btn secondary__btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="nav_btns d-flex align-items-center gap-4">
                    <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </div>
                )}
              </div>

              <span className="mobile_menu">
                <i className="ri_menu_line">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                    id="Bullet-List--Streamline-Core"
                    height="14"
                    width="14"
                  >
                    <desc>
                      Bullet List Streamline Icon: https://streamlinehq.com
                    </desc>
                    <g id="bullet-list--points-bullet-unordered-list-lists-bullets">
                      <path
                        id="Union"
                        fill="#000000"
                        fillRule="evenodd"
                        d="M2 2.49951c0 0.55229 -0.44772 1 -1 1 -0.552285 0 -1 -0.44771 -1 -1 0 -0.55228 0.447715 -1 1 -1 0.55228 0 1 0.44772 1 1ZM1 8c0.55228 0 1 -0.44772 1 -1s-0.44772 -1 -1 -1c-0.552285 0 -1 0.44772 -1 1s0.447715 1 1 1Zm0 4.5005c0.55228 0 1 -0.4477 1 -1s-0.44772 -1 -1 -1c-0.552285 0 -1 0.4477 -1 1s0.447715 1 1 1ZM4.75 1.75c-0.41421 0 -0.75 0.33579 -0.75 0.75s0.33579 0.75 0.75 0.75h8.5c0.4142 0 0.75 -0.33579 0.75 -0.75s-0.3358 -0.75 -0.75 -0.75h-8.5ZM4 7c0 -0.41421 0.33579 -0.75 0.75 -0.75h8.5c0.4142 0 0.75 0.33579 0.75 0.75s-0.3358 0.75 -0.75 0.75h-8.5C4.33579 7.75 4 7.41421 4 7Zm0.75 3.75c-0.41421 0 -0.75 0.3358 -0.75 0.75s0.33579 0.75 0.75 0.75h8.5c0.4142 0 0.75 -0.3358 0.75 -0.75s-0.3358 -0.75 -0.75 -0.75h-8.5Z"
                        clipRule="evenodd"
                        strokeWidth="1"
                      ></path>
                    </g>
                  </svg>
                </i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
