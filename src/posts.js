import React, { useState, useEffect } from "react"; 
import { useLocation } from "react-router"; 



const Posts = props => {
    const [loadStatus, setLoadStatus] = useState([]);
    let [ localPosts, setLocalPosts] = useState();
    const location = useLocation();
    //let posts = location.state?.posts;
    
    // setLoadStatus('loading');
    // console.log(`${loadStatus}`)
    // let getMostRecentPosts = async () => {
    //     let results = await fetch(`../api/announcements/last/:10`)
    //     return results.json();
    // };
    // useEffect(() => {
    //     (async () => {
    //         let results = await getMostRecentPosts();
    //         console.log(results)
    //         location.state.posts = results
    //         console.log("posts", location.state?.posts);
    //     })()
    
    // }, []);
    
    // TODO: Style the posts
    
    // TODO: Add API request for getting Topics for the topics bar
    
    return (
        <>
            {console.log("localposts", props.posts)}
            
            {props.posts ? (props.posts.map(post=>(
                <>
                <br />
                {console.log(post)}
                <div className="card" key={post._id}>
                    {console.log(post._id)}
                        <div className="card-title bg-primary">
                            <h3 className="text-start ms-2 mt-2 " >{post.title}</h3>
                        </div>
                        <div className="card-body ">
                            <p className="text-start">Topic: {post.topic}</p>
                            <p className="text-start">Posted at: {post.createdAt}</p>
                            <hr />
                            <p className="text-start">{post.message}</p>
                        </div>                    
                </div>
            </>))
            ):(<p>Loading posts</p>)}
            <br />
        </>
    );
}
export default Posts;