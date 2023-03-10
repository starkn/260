const feed = document.querySelector("#feed");
const contentObj = JSON.parse();

//example
// {
//     img: "...",
//     title: "...",
//     user: "...",
//     keywords: ["..."],
//     id: 0
// }

for (const content in contentObj) {
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
    thumbnail.src = content.img;

    keywords = document.createElement("p");
    keywords.classList.add("vidKeywords");
    keywords.textContent = content.keywords.join(", ");

    newVid.appendChild(title);
    newVid.appendChild(creator);
    newVid.appendChild(thumbnail);
    newVid.appendChild(keywords);
    newVid.href = "viewer.html"

    feed.appendChild(newVid);
}