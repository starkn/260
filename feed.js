var request = new XMLHttpRequest();
request.open("GET", "/feed.json", false);
request.send(null)
const allContent = JSON.parse(request.responseText);

let feed;
let filterList;
let filterSet = new Set();

function populateContent(contentObj) {
    feed.innerHTML = "";
    //example
    // {
    //     img: "...",
    //     title: "...",
    //     user: "...",
    //     keywords: ["..."],
    // }

    // Shuffles array for fun with current fixed input
    const shuffledArray = contentObj.sort((a, b) => 0.5 - Math.random());

    // populates vid objects
    shuffledArray.forEach(content => {
        // Populate feed with content
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
        thumbnail.src = "thumbnail/" + content.img;

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

function fillFilter() {
    // Populate filter pulldown
    allContent.forEach(content => content.keywords.forEach(filterSet.add, filterSet));

    filterSet.forEach(keyword => {
        item = document.createElement("li");
        item.textContent = keyword;
        item.setAttribute("onclick", `filterContent("${keyword}")`);
        filterList.appendChild(item);
    });
}

// Creates pulldown to select filter
function gamesPulldown() {

}

// Input of game name/keyword, only displays those keywords on content page
function filterContent(keyword) {
    console.log(keyword);
    populateContent(allContent.filter(element => element.keywords.includes(keyword)))
}

window.onload = (event) => {
    feed = document.getElementById("feed");
    filterList = document.getElementById("filter");

    populateContent(allContent);
    fillFilter();
}
