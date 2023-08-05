import React, { useState, useEffect } from "react";
import { useLocation, useOutletContext } from "react-router";
import { Link } from "react-router-dom";
import Weather from "./Weather";
import Posts from "./Posts";

const Body = (props) => {
    let [posts, setPosts] = useState();
    const [appRole] = useOutletContext();
    const location = useLocation();
    let searchStatus = location.state?.searchStatus || false;
    let searchedPosts = location.state?.searchedPosts || {};

    let getMostRecentPosts = async () => {
        let results = await fetch(`../api/announcements/last/:10`);
        return results.json();
    };

    useEffect(() => {
        // Get's the most recent posts from the database
        (async () => {
            let results = await getMostRecentPosts();

            // Updates the posts state
            setPosts(results);
        })();
    }, []);

    return (
        <>
            <main>
                <div className="container text-center bg-secondary">
                    <div className="row">
                        <div
                            className="col-2 card me-4 d-none d-sm-block bg-primary"
                            role="complementary"
                        >
                            <div
                                className="card-header bg-primary"
                                id="topics-header"
                            >
                                <h3>All Topics</h3>
                            </div>
                            <div
                                className="card-body"
                                aria-labelledby="topics-header"
                                tabIndex="0"
                            ></div>
                        </div>
                        <div
                            className="col-8 card me-4"
                            style={{ minWidth: 25 + "%" }}
                            role="main"
                        >
                            {!searchStatus ? (
                                <>
                                    <div
                                        className="card-header"
                                        id="recent-posts-header"
                                    >
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
                                <>
                                    <div
                                        className="card-header"
                                        id="search-results-header"
                                    >
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
                                            <p>
                                                No posts match your search term.
                                            </p>
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
                                </>
                            )}
                        </div>
                        <div
                            className="col card bg-primary d-sm-block"
                            role="complementary"
                        >
                            <div
                                className="card-header bg-primary"
                                id="weather-header"
                            >
                                <h3>Weather</h3>
                            </div>
                            <Weather
                                aria-labelledby="weather-header"
                                tabIndex="0"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
export default Body;
