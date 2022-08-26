let newIDNum = 0;

const key = "22718027-20fc84a3c87d4dbf9a7a7b894";

document.addEventListener("DOMContentLoaded",()=> {
    document.getElementById("images-request-form").addEventListener("submit",e=>{
        e.preventDefault();
        document.getElementById("gallery-area").innerHTML = '';
        getPixaPhotos(e.target.topic.value);
    });
    document.getElementById("return-button").addEventListener("click",()=>{
        document.getElementById("upload-get").style.display = "block";
        document.getElementById("return-button").style.display = "none";
        document.getElementById("images-request-form").style.display = "none";
        document.getElementById("selection-information").style.display = "none";
        document.getElementById("upload-form").style.display = "none";
    });
    document.getElementById("upload-form").addEventListener("submit",e=>{
        e.preventDefault();
        let photo = createPhotoObj(e);
        renderPhotoPost(photo);
        e.target.reset();
    });

    
    getPixaPhotos("");
})

//-----Write a function to get photographs from the api

function getPixaPhotos(topic) {
    document.getElementById("gallery-area").style.display = "flex";
    fetch(`https://pixabay.com/api/?key=${key}&q=${topic}&image_type=photo`).then(r=>r.json()).then(j=>j.hits.forEach(renderPhotoPost));
}


//-----Write a function that renders the photograph data on the page

function renderPhotoPost(photoData) {

    // Create a div that will hold all the elements
    let photoPost = document.createElement("div");
    photoPost.id = `post${photoData.id}`;
    photoPost.className = "photo-post";

    // Create an img that will be the photo
    let photo = document.createElement("img");
    photo.src = photoData.webformatURL;

    // Create an overlay that will show information; use a classname so that css can show it on a hover; set the height proportional to the photo when it is resized to 200px width
    let overlay = document.createElement("div");
    overlay.className = "photo-overlay";
    overlay.style.height = `${50+((200*photoData.webformatHeight)/photoData.webformatWidth)}px`;

    // Create a link to the photo on pixabay with the user name of the photographer; to be added to the overlay
    let linkElement = document.createElement("a");
    linkElement.href = photoData.pageURL;
    linkElement.target= "_blank"; //open in a new tab
    linkElement.textContent=`Photo by ${photoData.user}`;

    //Create a p element to that will consist of a like symbol and the number of likes
    let likeElement = document.createElement("p");

    //Create a span for the heart symbol because we will need to change its color separately from the rest of the text in the p element
    let heartSpan = document.createElement("span");
    heartSpan.textContent = "♡";

    //Create a span to show the number of likes
    let likeSpan = document.createElement("span");
    likeSpan.textContent = photoData.likes;

    //console.log("♡❤️♥️");
    //Add an event listener to the likeElement to increase the like on a click
    likeElement.addEventListener("click",adjustLikes);

    //Append each element to the parent element it needs to go to
    likeElement.append(heartSpan," ",likeSpan);
    overlay.append(linkElement,likeElement);
    photoPost.append(photo,overlay);
    document.getElementById("gallery-area").append(photoPost);   
}

function adjustLikes(e) {
    //Grab the span element that has the heart in it and the element that has the number
    let heartElement = e.target.parentElement.firstChild;
    let countElement = heartElement.nextSibling.nextSibling;

    //If it's an empty heart, change it to a full one and vice versa. Increment or decrement the count.
    countElement.textContent = heartElement.textContent === "♡" ? parseInt(countElement.textContent)+1 : parseInt(countElement.textContent)-1;
    heartElement.textContent = heartElement.textContent === "♡" ? "♥️" : "♡";
}

function selectUpload() {
    document.getElementById("upload-get").style.display = "none";
    document.getElementById("return-button").style.display = "block";
    document.getElementById("upload-form").style.display = "block";
}

function selectGetPhotos() {
    document.getElementById("upload-get").style.display = "none";
    document.getElementById("return-button").style.display = "block";
    document.getElementById("images-request-form").style.display = "block";
    document.getElementById("selection-information").style.display = "block";
}

function createPhotoObj(e) {
    newIDNum++;
    let photo = {
        id: newIDNum,
        webformatURL: e.target.webformatURL.value,
        webformatWidth: e.target.webformatWidth.value,
        webformatHeight: e.target.webformatHeight.value,
        user: e.target.user.value,
        likes: 0
    };
    return photo;
}
