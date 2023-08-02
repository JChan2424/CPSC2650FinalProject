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


    // TODO: Add API request for getting get 10 most recent posts (Use effect hook)
    
    // TODO: Add API request for getting Topics for the topics bar
    return (
        <>
            <main>
                <div className="container text-center bg-secondary">
                    <div className="row">
                    <div className="col-2 card me-4 bg-primary">
                        <div className="card-header bg-primary"><h3>All Topics</h3></div>
                        <div className="card-body"></div> 
                    </div>
                    <div className="col-8 card me-4">
                        <div className="card-header"><h3>Recent Posts</h3></div>
                        <Posts posts={posts} />
                    </div>
                    <div className="col card bg-primary">
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