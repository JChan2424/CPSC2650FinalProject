import React, { useEffect } from "react";

const Topics = (props) => {
    let getMostRecentPosts = async () => {
        let results = await fetch(`../api/announcements/last/:10`);
        return results.json();
    };
    useEffect(() => {
        (async () => {
            let results = await getMostRecentPosts();
            setPosts(results);
        })();
    }, []);

    return (
        <>
            {posts ? (
                posts.map((post) => (
                    <div className="card" key={post._id}>
                        <div className="card-title">{post.title}</div>
                        <div className="card-body">
                            <p>Topic: {post.topic}</p>
                        </div>
                        <div className="card-body">{post.message}</div>
                    </div>
                ))
            ) : (
                <p>Loading posts</p>
            )}
        </>
    );
};
export default Topics;
