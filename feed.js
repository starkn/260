function populateContent() {
    const feed = document.getElementById("feed");
    var request = new XMLHttpRequest();
    request.open("GET", "/feed.json", false);
    request.send(null)
    const contentObj = JSON.parse(request.responseText);


    //example
    // {
    //     img: "...",
    //     title: "...",
    //     user: "...",
    //     keywords: ["..."],
    // }

    contentObj.forEach(content => {
        newVid = document.createElement("a");
        newVid.classList.add("vid")

        title = document.createElement("p");
        title.classList.add("vidTitle");
        title.textContent = content.title;

        creator = document.createElement("p");
        creator.classList.add("vidCreator");
        creator.textContent = content.user;

        thumbnail = document.createElement("img");
        thumbnail.classList.add("vidThumb");
        thumbnail.src = "thumbnail/"+content.img;

        keywords = document.createElement("p");
        keywords.classList.add("vidKeywords");
        keywords.textContent = content.keywords.join(", ");

        newVid.appendChild(title);
        newVid.appendChild(creator);
        newVid.appendChild(thumbnail);
        newVid.appendChild(keywords);
        newVid.href = "viewer.html"

        feed.appendChild(newVid);
    });
}

window.onload = (event) => {populateContent();}
