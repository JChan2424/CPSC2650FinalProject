import React, { useState,useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router";
import { Link } from "react-router-dom";
import Weather from "./weather";
import Posts from "./posts";



const Body = props => {
  let [ posts, setPosts ] = useState();
  const [ appRole, setAppRole, errMessage, setErrMessage ] = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();
  let searchStatus = location.state?.searchStatus;
  let searchedPosts = location.state?.searchedPosts;
  if (searchStatus) {
    console.log("search status", searchStatus);
  } else {
    searchStatus = false;
  }
  if (searchedPosts) {
    console.log("searchedPosts", searchedPosts);
  } else {
    searchedPosts = {};
  }

    useEffect(() => {
        // check if credentials are in local storage       
        if (localStorage.getItem("token") === null) {
          // if not, redirect to login page
        //   window.location.href = "/login?redirect=" + window.location.pathname;
        }
    
        // // if so, send credentials to server to check if they are valid
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

        (async () => {
          let results = await getMostRecentPosts();
          console.log(results)
          setPosts(results);
        })();
        
        // props.setPostArray(getMostRecentPosts());
        // console.log(props.postArray)
      },[]);
      let goBackToAll = (event) => {
        event.preventDefault();
        navigate("/view-announcements", {state:{searchStatus: false}, replace: true});
      }
      let getMostRecentPosts = async () => {
        let results = await fetch(`../api/announcements/last/:10`)
        return results.json();
    };

    return (
        <>
            <main>
                <div className="container text-center bg-secondary">
                    <div className="row">

                        <div className="col-2 card me-4 d-none d-sm-block bg-primary">
                            <div className="card-header bg-primary"><h3>All Topics</h3></div>
                            <div className="card-body"></div> 
                        </div>
                        <div className="col-8 card me-4" style={{ minWidth: 25 + '%' }}>
                            {!searchStatus ? 

                                <><div className="card-header"><h2>Recent Posts</h2></div>
                                <Posts posts={posts} appRole={appRole}/></>
                                :<> 
                                <div className="card-header"><h3>Search Results</h3></div>
                                {searchedPosts.length > 0 ? <Posts posts={searchedPosts} /> : <><p>No posts match your search term.</p></>}
                                <Link to={"/view-announcements"} className="btn btn-primary">Go back to all posts</Link><br />
                            </>}
                        </div>
                        <div className="col card bg-primary d-sm-block">
                            <div className="card-header bg-primary"><h3>Weather</h3></div>
                            <Weather />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
export default Body;