document.addEventListener("DOMContentLoaded",()=> {
    document.getElementById("images-request-form").addEventListener("submit",e=>{
        e.preventDefault();
        document.getElementById("gallery-area").innerHTML = '';
        getPixaPhotos(e.target.topic.value);
    })
})

//-----Write a function to get photographs from the api

function getPixaPhotos(topic) {
    fetch(`https://pixabay.com/api/?key=${key}&q=${topic}&image_type=photo`).then(r=>r.json()).then(j=>j.hits.forEach(renderPhotoPost));
}


//-----Write a function that renders the photograph data on the page

function testRender(photoData) {
    let photo = document.createElement("img");
    photo.src = photoData.hits[0].webformatURL;
    console.log(photo.src);
    document.getElementById("gallery-area").append(photo);
}

function renderPhotoPost(photoData){
    let photoPost = document.createElement("div");
    photoPost.id = `post${photoData.id}`;
    photoPost.className = "photo-post";
    let photo = document.createElement("img");
    photo.src = photoData.webformatURL;
    photoPost.append(photo);
    document.getElementById("gallery-area").append(photoPost);   
}

