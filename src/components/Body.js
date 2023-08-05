import React, { useState, useEffect } from "react";
import { useLocation, useOutletContext } from "react-router";
import { Link } from "react-router-dom";
import Weather from "./Weather";
import Posts from "./Posts";

const Body = (props) => {
    let [posts, setPosts] = useState();
    const [appRole, ] = useOutletContext();
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
                        <div className="col-2 card me-4 d-none d-sm-block bg-primary">
                            <div className="card-header bg-primary">
                                <h3>All Topics</h3>
                            </div>
                            <div className="card-body"></div>
                        </div>
                        <div
                            className="col-8 card me-4"
                            style={{ minWidth: 25 + "%" }}
                        >
                            {!searchStatus ? (
                                <>
                                    <div className="card-header">
                                        <h2>Recent Posts</h2>
                                    </div>
                                    <Posts posts={posts} appRole={appRole} />
                                </>
                            ) : (
                                <>
                                    <div className="card-header">
                                        <h3>Search Results</h3>
                                    </div>
                                    {searchedPosts.length > 0 ? (
                                        <Posts posts={searchedPosts} />
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
                                    >
                                        Go back to all posts
                                    </Link>
                                    <br />
                                </>
                            )}
                        </div>
                        <div className="col card bg-primary d-sm-block">
                            <div className="card-header bg-primary">
                                <h3>Weather</h3>
                            </div>
                            <Weather />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
export default Body;
