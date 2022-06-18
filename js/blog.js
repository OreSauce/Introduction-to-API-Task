const titleInput = document.getElementById("post-title")
const bodyInput = document.getElementById("post-body")
const form = document.getElementById("new-post")


let postsArray = []


function renderPosts() {  
    let html = ""
    for (let post of postsArray) {
        html += `
        <div class="col-md-12">
        <div class="card mb-3 mt-2">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="https://i.pinimg.com/originals/0a/d9/6e/0ad96e0feb4c1b54bf7d1ea9423012ae.jpg" class="img-fluid rounded-start h-100 w-100" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.body.slice(0,90)}...</p>
                <button class="btn btn-primary" onclick="updatePost(${post.id})">Update <i class="bi bi-pencil"></i></button>
                <a href="/Introduction-to-API-Task/View.html?id=${post.id}" class="btn btn-success">View <i class="bi bi-binoculars-fill"></i></a>
                <button class="btn btn-danger btn-block" onclick="deletePost(${post.id})">Delete <i class="bi bi-trash3-fill"></i></button>
              </div>
            </div>
            
          </div>
        </div>
      </div>`
}
    document.getElementById("post-container").innerHTML = html
}

fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 30)
        renderPosts()
    })

document.getElementById("new-post").addEventListener("submit", function(e) {
    e.preventDefault()
    const postTitle = titleInput.value
    const postBody = bodyInput.value
    const data = {
        title: postTitle,
        body: postBody
    }
    
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    fetch("https://jsonplaceholder.typicode.com/posts", options)
        .then(res => res.json())
        .then(post => {
            postsArray.unshift(post)
            renderPosts()

            form.reset()
        })
})


    function deletePost(id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: 'DELETE',
      })
          .then((response) => response.json())
          .then((data) => {
              console.log(data)
              postsArray = postsArray.filter(post => post.id !== id)
              console.log(postsArray)
              renderPosts()
          })
  
  }

  function updatePost(id) {
    console.log(id)

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: titleInput.value,
            body: bodyInput.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {

            console.log(data)
            let postTitles = document.querySelectorAll('#post-title')
            let postBodies = document.querySelectorAll('#post-body')
            console.log(postTitles)
            postTitles.forEach((postTitle, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        postTitle.innerHTML = data.title
                    }
                }

            })

            postBodies.forEach((postBody, index) => {
                if (index + 1 === id) {
                    if (data.body !== "") {
                        postBody.innerHTML = data.body
                    }
                }

            })

        });
}