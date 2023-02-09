document.querySelector("#postForm").addEventListener("submit", event=>{
    event.preventDefault();
    const postObj = {
        post:document.querySelector("#postInput").value
    }
    fetch("/api/posts", {
        method:"POST",
        body:JSON.stringify(postObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href="/profile"
        } else {
            alert("trumpet sound")
        }
    })
})