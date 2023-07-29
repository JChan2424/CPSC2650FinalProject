import React from "react";

const Navbar = props => {

    return (
        <>
            <nav class="navbar navbar-expand-md navbar-primary bg-primary mb-4">
                <div class="container-fluid">
                    <a class="navbar-brand" href="index.html">Langara Announcements</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <ul class="navbar-nav me-auto mb-2 mb-md-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="index.html">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="https://langara.ca">Langara Homepage</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="index.html">My Feed</a>
                            </li>
                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Topics, authors, etc." aria-label="Search"/>
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <button class="btn btn-primary ms-1">Login</button>
                        <button class="btn btn-primary">Sign out</button>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default Navbar;