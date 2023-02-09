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