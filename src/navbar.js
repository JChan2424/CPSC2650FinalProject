import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {

  let [term, setTerm] = useState();
  let [role, setRole] = useState();
  let [searchedPosts, setSearchedPosts] = useState();
  let [searchStatus, setSearchStatus] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    // check if credentials are in local storage
    const token = localStorage.getItem("token");

    if (!token || token == "undefined") {

      props.setAppRole("NONE");
      console.log("no token");

    } else {
      fetch("/api/verify", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }
      })
        .then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              props.setAppRole(data.role);
            });
          } else {
            localStorage.removeItem("token"); // clear the token and need to prompt user to login again

            props.setAppRole("NONE");
          }
        })
        .catch((err) => console.log(err));
    }
  });

  const updateSearchTerm = (event) => {
    setTerm(event.target.value);
  };

  let searchForTerm = async (term) => {
    let url = encodeURI(`/api/search/${term}`);
    console.log("url", url);
    let results = await fetch(url);
    return results.json();
  };

  const sendSearchRequest = async (event) => {
    event.preventDefault();
    console.log(term);
    if (term != "") {
      // Encode uri: See link in discord
      props.setPosts([]);
      let response = await searchForTerm(term);
      console.log("search response", response.data);
      // let data = response.json();
      // console.log(data);
      props.setPosts(response.data);
      setSearchedPosts(response.data);
      setSearchStatus(true);
      setTerm("");
      navigate("/view-announcements", {
        state: { searchStatus: true, searchedPosts: searchedPosts },
        replace: true,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    props.setAppRole("NONE");
    navigate("/view-announcements", {
      state: { searchedPosts: searchedPosts, searchStatus: searchStatus },
      replace: true,
    });
  };
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-primary bg-primary mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Langara Announcements
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarCollapse"
          >
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                {/* <a className="nav-link active" aria-current="page" href="/">Home</a> */}
                <Link
                  to={"/view-announcements"}
                  state={{
                    searchedPosts: searchedPosts,
                    searchStatus: searchStatus,
                  }}
                  className="nav-link active"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="https://langara.ca"
                >
                  Langara Homepage
                </a>
              </li>
              <li className="nav-item">
                {role != 'NONE' ? <a
                  className="nav-link active"
                  aria-current="page"
                  href="/"
                >
                  My Feed
                </a> : <Link
                  to={"/login"}
                  state={{ test: "test" }}
                  className="nav-link active"
                >
                  My Feed
                </Link>}
              </li>
              <li className="nav-item">
                {props.appRole != 'NONE' ? <p className="nav-link active">Welcome {props.appRole}!</p> : <Link
                  to={"/login"}
                  state={{ test: "test" }}
                  className="nav-link active"
                >
                  You are not signed in
                </Link>}

              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Topics, authors, etc."
                aria-label="Search"
                onChange={updateSearchTerm}
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={sendSearchRequest}
              >
                Search
              </button>
            </form>
            {console.log(props.appRole)}
            {props.appRole === "NONE" ? (
              <>
                <Link
                  to={"/login"}
                  state={{ test: "test" }}
                  className="btn btn-primary ms-1"
                >
                  Log In
                </Link>
                <Link to={"/register"} className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
              {console.log(props.appRole === "ADMIN" || props.appRole === "MODERATOR")}
              {console.log(props.appRole)}
                <button
                  className="btn btn-outline-secondary ms-1"
                  onClick={e=>{navigate('/create-announcement', {replace: true})}} hidden={props.appRole === "USER"}
                >
                  Make Post
                </button>
                <button
                  className="btn btn-primary ms-1"
                  onClick={logout}
                >
                  Log Out
                </button>
              </>
              
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
