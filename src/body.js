import React, { useState,useEffect } from "react";
import { useLocation } from "react-router";
import Weather from "./weather";
import Posts from "./posts";



const Body = props => {
  const location = useLocation();
  let posts = location.state?.posts;
    useEffect(() => {
        // check if credentials are in local storage
        
        if (localStorage.getItem("token") === null) {
          // if not, redirect to login page
        //   window.location.href = "/login?redirect=" + window.location.pathname;
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
            //window.location.href = "/login";
          }
    
          if (res.status === 200) {
            // if so, do nothing
            
          }
    
          // if so, do nothing
        });
        
        // props.setPostArray(getMostRecentPosts());
        // console.log(props.postArray)
      }, []);
      let goBackToAll = (event) => {
        event.preventDefault();
        props.setSearchStatus(false)
      }

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
                            {!props.search ? 
                                <><div className="card-header"><h3>Recent Posts</h3></div>
                                <Posts posts={props.posts} setPosts={props.setPosts} /></>
                                :<> 
                                <div className="card-header"><h3>Search Results</h3></div>
                                {props.posts.length > 0 ? <Posts posts={props.posts} setPosts={props.setPosts} /> : <><p>No posts match your search term.</p></>}
                                <button className="btn btn-primary" onClick={goBackToAll}>Go back to all posts</button>
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