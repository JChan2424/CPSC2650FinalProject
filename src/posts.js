import React, { useState, useEffect } from "react";

const Posts = props => {
    const [loadStatus, setLoadStatus] = useState([]);
    
    // setLoadStatus('loading');
    // console.log(`${loadStatus}`)
    let getMostRecentPosts = async () => {
        let results = await fetch(`../api/announcements/last/:10`)
        return results.json();
    };
    useEffect(() => {
        (async () => {
            let results = await getMostRecentPosts();
            console.log(results)
            props.setPosts(results)
            console.log(props.posts);
        })()
    
    }, []);
    
    // TODO: Style the posts
    
    // TODO: Add API request for getting Topics for the topics bar
    return (
        <>
            {console.log(props.posts)}
            {props.posts ? (props.posts.map(post=>(<div className="card" key={post._id}>
                    <div className="card-title" >{post.title}</div>
                    <div className="card-body"><p>Topic: {post.topic}</p></div>
                    <div className="card-body">{post.message}</div>
                </div>))
            ):(<p>Loading posts</p>)}
        </>
    );
}
export default Posts;