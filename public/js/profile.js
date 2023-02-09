document.querySelector("#postForm").addEventListener("submit", event => {
    event.preventDefault();
    const postObj = {
        post: document.querySelector("#postInput").value
    }
    fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(postObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.href = "/profile"
        } else {
            alert("trumpet sound")
        }
    })
})

// let commentForm = document.createElement("form");
// let commentInput = document.createElement("textarea");
// let submitBtn = document.createElement("button")

// commentForm.appendChild(commentInput);
// commentForm.appendChild(submitBtn);
// document.querySelector(".addCommentDiv").appendChild(commentForm)

document.querySelectorAll(".commentBtn").forEach(btn => {
    btn.addEventListener("click", () => {

        let commentForm = document.createElement("form");
        commentForm.setAttribute("class", "commentForm")
        let commentInput = document.createElement("textarea");
        let submitBtn = document.createElement("button");
        submitBtn.textContent = "Submit";
        let exitBtn = document.createElement("button");
        exitBtn.textContent = "Exit";

        exitBtn.addEventListener("click", event =>{
            event.preventDefault()
            commentForm.remove()
        })

        commentForm.appendChild(commentInput);
        commentForm.appendChild(submitBtn);
        commentForm.appendChild(exitBtn);
        btn.parentElement.append(commentForm)

    })
})
