// using IIFE
(() => {

    /**----------------------------------------------------
    Utility functions
    -----------------------------------------------------*/
    const getBlobData = async (url) => {
        const response = await fetch(url)
        const imageBlob = await response.blob()
        return imageBlob
    }
    const getJsonData = async (url) => {
        try {
            console.info('getJsonData', url)
            const response = await fetch(url)
            console.info(response)
            const data = await response.json()
            return data
        } catch (err) {
            console.error(err)
        }
    }

    /**----------------------------------------------------
    Utility functions
    -----------------------------------------------------*/
    const getPosts = () => {
        console.info("Getting posts")
        fetch('/posts')
            .then(response => response.json())
            .then(posts => displayPosts(posts))
            .catch(err => console.error(err))
    }
    const displayPosts = async () => {
        const posts = await getJsonData('/posts')
        if (posts.length > 0) {
            console.info("Posts:", posts)
            console.info("Displaying posts")
            let header = document.querySelector('#header')
            let thead = document.querySelector('thead')
            let tbody = document.querySelector('tbody')
            const keys = Object.keys(posts)
            let columns = Object.keys(posts[0])
            let tr = document.createElement('tr')
            tr.setAttribute('class', 'text-center h3')
            columns.push(' ')
            columns.forEach(column => {
                let th = document.createElement('th')
                th.textContent = column === "Message" ? "Message Snippet" : column
                tr.appendChild(th)
            })
            thead.appendChild(tr)

            for (let i = 0; i < posts.length; i++) {
                console.info(`i=${i}`, posts[i])
                let tr = document.createElement('tr')
                let rows = []
                columns.forEach(column => {
                    rows.push(document.createElement('td'))
                })
               
                for (let j = 0; j < rows.length; ++j) {
                    if (j === rows.length - 1) rows[j].innerHTML= `View Post`
                    if (columns[j] === "Message") rows[j].innerHTML = `${posts[i][columns[j]].slice(1, 10)} ...`
                    else rows[j].innerHTML = posts[i][columns[j]]
                    console.info(rows[j].textContent)
                    tr.appendChild(rows[j])
                }
                tbody.appendChild(tr)
            }
        } else {
            console.info(`Posts collection is empty`)
        }
    }


    window.onload = () => {
        displayPosts()
        //getGeolocation()

    }
})()
