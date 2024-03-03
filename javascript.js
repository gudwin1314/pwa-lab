import MusicDB from './movie.js';


document.addEventListener("DOMContentLoaded", function () {
    MusicDB.open()
        .then(() => {
            MusicDB.getAll().then((data) => {
                showData(data)
            });
        })
        .catch((error) => {
            console.log('Error songs list', error);
        })
})






document.getElementById('addButton').addEventListener('click', function (event) {
    event.preventDefault();
    let titleValue = document.getElementById('titleInput');
    let artistValue = document.getElementById('artistInput');
    let messageTitle = document.getElementById('messageTitle');
    let messageArtist = document.getElementById('messageArtist');

    if (titleValue.value !== "" && artistValue.value !== "") {
        MusicDB.add(titleValue.value, artistValue.value, 0)
            .then((docId) => {
                // console.log(`Song added with ID: ${docId}`);
            })
            .catch((error) => {
                console.error('Error adding song:', error);
            });
    }
    if (titleValue.value === "") {
        messageTitle.textContent = "Title field is empty!!";
    }

    if (artistValue.value === "") {
        messageArtist.textContent = "Artist field is empty!!";
    }


    titleValue.value = "";
    artistValue.value = "";
});

function showData(dataList) {
    const songContainer = document.getElementById("resultContainer");
    dataList.forEach(data => {
    
        let showContainer = document.createElement('div');
        showContainer.id = 'show-container';
        let heaDing = document.createElement('h2');
        let paraGraph = document.createElement('p');
        let likes = document.createElement('p');
        likes.id = 'like_id'
        let removeButton = document.createElement('button');
        let likeButton = document.createElement('button');
        removeButton.style.display = 'inline-block';
        likeButton.style.display = 'inline-block';
        removeButton.id = 'remove_button';
        likeButton.id = 'like_button';
        showContainer.appendChild(heaDing);
        showContainer.appendChild(paraGraph)
        showContainer.appendChild(likes)
        showContainer.appendChild(removeButton)
        showContainer.appendChild(likeButton)
        removeButton.textContent = 'Remove';
        likeButton.textContent = '+1 Like';
        songContainer.appendChild(showContainer);



        likeButton.addEventListener('click', function () {
            data.likes++; 
            likes.textContent = `Likes: ${data.likes+1}`; 
            MusicDB.update(data.id, data.likes);
        });
        

        removeButton.addEventListener('click', function () {
            MusicDB.delete(data.id).then(()=>{
                showContainer.remove();
            }).catch((error) =>{
                console.log("Error: ",error);
            })
        })

        heaDing.textContent = `${data.artist}`;
        paraGraph.textContent = `${data.title}`;
    });
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js', { scope: "/" })
        .then((registration) => {
            // registration
        })
        .catch((error) => {
            // console.log(error)
        })
} else {

}
