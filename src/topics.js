import React, { useState, useEffect } from "react";
// TODO: Add API request for getting Topics for the topics bar
const Topics = props => {
    const [loadStatus, setLoadStatus] = useState([]);
    const [topics, setTopics] = useState();
    // setLoadStatus('loading');
    // console.log(`${loadStatus}`)
    let getMostRecentPosts = async () => {
        let results = await fetch(`../api/announcements/last/:10`)
        // setLoadStatus('done')
        // console.log(loadStatus);
        return results.json();
    };
    useEffect(() => {
        (async () => {
            let results = await getMostRecentPosts();
            console.log(results)
            setPosts(results)
            console.log(posts);
        })()
    
    }, []);
    
    
    
    
    return (
        <>
            {console.log(posts)}
            {posts ? (posts.map(post=>(<div className="card" key={post._id}>
                    <div className="card-title" >{post.title}</div>
                    <div className="card-body"><p>Topic: {post.topic}</p></div>
                    <div className="card-body">{post.message}</div>
                </div>))
            ):(<p>Loading posts</p>)}
        </>
    );
}
export default Topics;