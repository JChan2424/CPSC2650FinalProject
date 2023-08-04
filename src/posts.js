import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router"; 



const Posts = props => {
    const [loadStatus, setLoadStatus] = useState([]);
    let [ localPosts, setLocalPosts] = useState();
    const navigate = useNavigate();
    
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
    const deleteAnnouncecment = (e, id)=>{
        e.preventDefault();
        //verify
        //call remove announcement endpoint
        const token = localStorage.getItem("token");

        if (!token || token == "undefined") {
            console.log("no token");
        } else {
            fetch("/api/verify", {
                method: "POST",
                headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    res.json().then(data=>{
                        if (data.role === "ADMIN"){
                            fetch(`/api/announcements/${id}`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                            .then(res=>{
                                if (res.status === 200) {
                                    navigate(0);
                                } else {
                                    //go to error (server error)
                                }
                            })
                        } else {
                            //go to error (wrong role)
                        }
                    })
                    .catch(err=>{console.log(err)});                    
                } else {
                    localStorage.removeItem("token"); // clear the token and need to prompt user to login again
                    //go to error
                }
            })
            .catch((err) => console.log(err));
        }
    }

    return (
        <>
            {props.posts ? (props.posts.map(post=>(
                <div className="card" key={post._id}>
                    <div className="card-title bg-primary" >
                        <h3 className="text-start ms-2 mt-2 " >{post.title}</h3>
                    </div>
                    <div className="card-body">
                    <p className="text-start">Topic: {post.topic}</p>
                            <p className="text-start">Posted at: {post.createdAt}</p>
                            <hr />
                            <p className="text-start">{post.message}</p>
                            {props.appRole === "ADMIN" ? <><br /><button className="btn btn-primary" onClick={e=>{deleteAnnouncecment(e, post._id)}}>Delete Announcement</button></> : <></>}
                    </div>
                    
                </div>))

            ):(<p>Loading posts</p>)}
            <br />
        </>
    );
}
export default Posts;