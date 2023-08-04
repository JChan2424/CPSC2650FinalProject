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

      setRole("NONE");
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
              setRole(data.role);
            });
          } else {
            localStorage.removeItem("token"); // clear the token and need to prompt user to login again

            setRole("NONE");
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
      navigate("/announcements", {
        state: { searchStatus: true, searchedPosts: searchedPosts },
        replace: true,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole("NONE");
    navigate("/announcements", {
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
                  to={"/announcements"}
                  state={{
                    searchedPosts: searchedPosts,
                    searchStatus: searchStatus,
                  }}
                  className="nav-link-active, text-white"
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
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/"
                >
                  My Feed
                </a>
              </li>
              <li className="nav-item">
                <p>You are: {role}</p>
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
            {role === "NONE" ? (
              <>
                <Link
                  to={"/login"}
                  state={{ test: "test" }}
                  className="text-white"
                >
                  Log In
                </Link>
                <Link to={"/register"} className="text-white">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-success"
                  onClick={e=>{navigate('/create-announcement', {replace: true})}}
                >
                  Create Announcement
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={logout}
                >
                  LogOut
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
