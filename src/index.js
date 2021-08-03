document.addEventListener("DOMContentLoaded",()=> {

})

//-----Write a function to get photographs from the api

function getPixaPhotos(topic) {
    fetch(`https://pixabay.com/api/?key=${key}&q=${topic}&image_type=photo`).then(r=>r.json()).then(testRender);
}


//-----Write a function that renders the photograph data on the page

function testRender(photoData) {
    let photo = document.createElement("img");
    photo.src = photoData.hits[0].webformatURL;
    document.getElementById("gallery-area").append(photo);
}

