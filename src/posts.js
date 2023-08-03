import React, { useState, useEffect } from "react"; 
import { useLocation } from "react-router"; 



const Posts = props => {
    const [loadStatus, setLoadStatus] = useState([]);
    let [ localPosts, setLocalPosts] = useState();
    const location = useLocation();
    let posts = location.state?.posts;
    
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
            posts = results
            console.log("posts", posts);
            setLocalPosts(posts);
        })()
    
    }, []);
    
    // TODO: Style the posts
    
    // TODO: Add API request for getting Topics for the topics bar
    return (
        <>
            {console.log("localposts", localPosts)}
            {localPosts ? (localPosts.map(post=>(<div className="card" key={post._id}>
                    <div className="card-title" >{post.title}</div>
                    <div className="card-body"><p>Topic: {post.topic}</p></div>
                    <div className="card-body overflow-scroll">{post.message}</div>
                </div>))
            ):(<p>Loading posts</p>)}
        </>
    );
}
export default Posts;