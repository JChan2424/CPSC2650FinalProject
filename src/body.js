import React from "react";
const Body = props => {

    return (
        <>
            <main>
                <div class="container text-center">
                    <div class="row">
                    <div class="col-2 card me-4 bg-primary">
                        <div class="card-header bg-primary"><h3>Your Topics</h3></div>
                        <div class="card-body"></div> 
                    </div>
                    <div class="col-8 card me-4">
                        <div class="card-header"><h3>Recent Posts</h3></div>
                    </div>
                    <div class="col card bg-primary">
                        <div class="card-header bg-primary"><h3>Weather</h3></div>
                    </div>
                    </div>
                </div>
            </main>
        </>
    );
}
export default Body;