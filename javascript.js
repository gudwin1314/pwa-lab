
let titleValue = document.getElementById('titleInput');
let artistValue = document.getElementById('artistInput');
let resultContainer = document.getElementById('resultContainer');
let messageTitle = document.getElementById('messageTitle');
let messageArtist = document.getElementById('messageArtist');



document.getElementById('addButton').addEventListener('click', function () {

    if (titleValue.value !== "" && artistValue.value !== "") {
        let showContainer = document.createElement('div');
        showContainer.id = 'show-container';
        let heaDing = document.createElement('h2');
        let paraGraph = document.createElement('p');
        showContainer.appendChild(heaDing);
        showContainer.appendChild(paraGraph)

        resultContainer.appendChild(showContainer);

        heaDing.textContent = `${titleValue.value}`;
        paraGraph.textContent = `${artistValue.value}`;
        messageTitle.style.display = "none";
        messageArtist.style.display = "none";
    }
    else {
        if (titleValue.value === "") {
            messageTitle.textContent = "Title field is empty!!";
        }

        if (artistValue.value === "") {
            messageArtist.textContent = "Artist field is empty!!";
        }
    }
    titleValue.value = "";
    artistValue.value = "";

});



if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js',{scope:"/"})
        .then((registration)=>{
            // registration
        })
        .catch((error)=>{

        })
} else {

}
