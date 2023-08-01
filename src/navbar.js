import React, {useState, useEffect} from "react";

const Navbar = props => {
    let [term, setTerm] = useState();
    useEffect(() => {
        // check if credentials are in local storage
    
        if (localStorage.getItem("token") === null) {
          // if not, redirect to login page
          // window.location.href = "/login?redirect=" + window.location.pathname;
        }
    
        // if so, send credentials to server to check if they are valid
        fetch("/api/announcement", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
          }
        }).then((res) => {
          // if not, redirect to login page
          if (res.status === 401) {
            window.location.href = "/login";
          }
    
          if (res.status === 200) {
            // if so, do nothing
            
          }
    
          // if so, do nothing
        });
      }, []);
    // TODO: add event handler that makes API request for search.
    // On submit button click, make api call using the end point '/api/search/:term'
    // Use boostrap modals? 

    const updateSearchTerm = (event) => {
      setTerm(event.target.value);
      console.log(term);
    }

    let searchForTerm = async (term) => {
      let results = await fetch(`/api/search/:${term}`);
      return results.json();
    }

    const sendSearchRequest = async (event) => {
      console.log("click");
      event.preventDefault();
      if (term != null && term.length > 0) {
        // Encode uri: See link in discord
        props.setPosts([])
        let response = await searchForTerm(event.target.value);
        console.log(response.data);
        // let data = response.json();
        // console.log(data);
        props.setPosts(response.data);
      }
    }
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-primary bg-primary mb-4">
                <div className="container-fluid">
                    <a className="navbar-brand" href="index.html">Langara Announcements</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="index.html">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="https://langara.ca">Langara Homepage</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="index.html">My Feed</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Topics, authors, etc." aria-label="Search" onChange={updateSearchTerm}/>
                            <button className="btn btn-outline-success" type="submit" onClick={sendSearchRequest}>Search</button>
                        </form>
                        <button className="btn btn-primary ms-1">Login</button>
                        <button className="btn btn-primary">Sign Up</button>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default Navbar;