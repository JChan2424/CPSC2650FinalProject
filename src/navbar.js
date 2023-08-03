import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = props => {
    let [term, setTerm] = useState();
    let [role, setRole] = useState();
    let [searchedPosts, setSearchedPosts] = useState();
    let [searchStatus, setSearchStatus] = useState();
    let navigate = useNavigate();
    useEffect(() => {
        // check if credentials are in local storage
        console.log("navbar useEffect");
    
        if (localStorage.getItem("token") === null || localStorage.getItem("token") === undefined || localStorage.getItem("token") === "undefined") {
          // if not, redirect to login page
          // window.location.href = "/login?redirect=" + window.location.pathname;
          console.log("no token");
        } else {
          fetch("/api/verify", {
            method: "POST",
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "username": localStorage.getItem("username"),
              "role" : localStorage.getItem("role") 
            })
          })
          .then(res=>{
            if (res.status === 200) {
              res.json().then(data=>{
                setRole(data.role);
              })
              
            }
          })
          .catch(err=>console.log(err));
        }
    
        // if so, send credentials to server to check if they are valid
        // fetch("/api/announcement", {
        //   method: "GET",
        //   headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token"),
        //   }
        // }).then((res) => {
        //   // if not, redirect to login page
        //   if (res.status === 401) {
        //     //window.location.href = "/login";
        //   }
    
        //   if (res.status === 200) {
        //     // if so, do nothing
            
        //   }
    
        //   // if so, do nothing
        // });
      });
    // TODO: add event handler that makes API request for search.
    // On submit button click, make api call using the end point '/api/search/:term'
    // Use boostrap modals? 

    const updateSearchTerm = (event) => {
      setTerm(event.target.value);
    }

    let searchForTerm = async (term) => {
      let url = encodeURI(`/api/search/:${term}`)
      console.log("url", url);
      let results = await fetch(url);
      return results.json();
    }

    const sendSearchRequest = async (event) => {
      event.preventDefault();
      console.log(term);
      if (term != '') {
        // Encode uri: See link in discord
        props.setPosts([])
        let response = await searchForTerm(term);
        console.log(response.data);
        // let data = response.json();
        // console.log(data);
        props.setPosts(response.data);
        setSearchedPosts(response.data);
        setSearchStatus(true);
        setTerm('');
        navigate("/announcements", {state:{searchStatus: true, searchedPosts: searchedPosts}, replace: true});
      }
    }
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-primary bg-primary mb-4">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Langara Announcements</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                {/* <a className="nav-link active" aria-current="page" href="/">Home</a> */}
                                <Link to={"/announcements"} state={{searchedPosts: searchedPosts, searchStatus: searchStatus}} className="nav-link-active">Home</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="https://langara.ca">Langara Homepage</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">My Feed</a>
                            </li>
                            <li className="nav-item">
                                <p>You are: {role}</p>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Topics, authors, etc." aria-label="Search" onChange={updateSearchTerm}/>
                            <button className="btn btn-outline-success" type="submit" onClick={sendSearchRequest}>Search</button>
                        </form>
                        <Link to={"/login"}  state={{test:"test"}} className="text-white">Log In</Link>
                        <Link to={"/register"} className="text-white">Sign Up</Link>

                    </div>
                </div>
            </nav>
        </>
    );
}
export default Navbar;