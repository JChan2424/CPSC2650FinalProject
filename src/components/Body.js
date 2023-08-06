import React, { useState, useEffect } from "react";
import { useLocation, useOutletContext } from "react-router";
import { Link } from "react-router-dom";

import Weather from "./Weather";
import Posts from "./Posts";

const Body = (props) => {
  const [posts, setPosts] = useState();

  const [appRole, , , setErrMessage] = useOutletContext();
  const { state } = useLocation();

  const { searchStatus = false, searchedPosts = [] } = state || {};

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`../api/announcements/last/:10`);
        if (!response.ok) {
          navigate("/error");
          setErrMessage(
            `An error has occurred: ${response.status} ${response.statusText}`
          );
        }
        setPosts(await response.json());
      } catch (error) {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <main>
        <div className="container text-center bg-secondary">
          <div className="row">
            <div
              className="col-8 card me-4"
              style={{ minWidth: "25%" }}
              role="main"
            >
              {!searchStatus ? (
                <>
                  <div className="card-header" id="recent-posts-header">
                    <h2>Recent Posts</h2>
                  </div>
                  <Posts
                    posts={posts}
                    appRole={appRole}
                    aria-labelledby="recent-posts-header"
                    tabIndex="0"
                  />
                </>
              ) : (
                <div>
                  <div className="card-header" id="search-results-header">
                    <h3>Search Results</h3>
                  </div>

                  {searchedPosts.length > 0 ? (
                    <Posts
                      posts={searchedPosts}
                      aria-labelledby="search-results-header"
                      tabIndex="0"
                    />
                  ) : (
                    <>
                      <p>No posts match your search term.</p>
                    </>
                  )}
                  <Link
                    to={"/view-announcements"}
                    className="btn btn-primary"
                    aria-label="Go back to all posts"
                    tabIndex="0"
                  >
                    Go back to all posts
                  </Link>
                  <br />
                </div>
              )}
            </div>
            <div
              className="col card bg-primary d-md-block"
              role="complementary"
            >
              <div className="card-header bg-primary" id="weather-header">
                <h3>Weather</h3>
              </div>
              <Weather aria-labelledby="weather-header" tabIndex="0" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Body;
