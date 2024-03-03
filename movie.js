import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
// import { initializeApp } from "f/irebase/app";
import { getFirestore, collection, addDoc, getDocs,deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";


class Movie {
    constructor(){
        this.db = null;
        this.isAvailable = false;
    }


    open() {
        return new Promise((resolve, reject) => {
            try {
                const firebaseConfig = {
                    apiKey: "AIzaSyDr9XPaeMIOeGI_EieJMu9VFLekvkpuFds",
                    authDomain: "test-e7888.firebaseapp.com",
                    projectId: "test-e7888",
                    storageBucket: "test-e7888.appspot.com",
                    messagingSenderId: "632412795485",
                    appId: "1:632412795485:web:5968bde5235d51432513b4"
                  };
                // Initialize Firebase
                const app = initializeApp(firebaseConfig);
                // console.log('DB is open.', app);
                // Initialize Cloud Firestore and get a reference to the service
                const db = getFirestore(app);

                if (db) {
                    this.db = db;
                    this.isAvailable = true;
                    resolve();
                } else {
                    reject('The database is not available.')
                }
            }
            catch (error) {
                reject(error.message)
            }
        });


    }

    getAll() {
        return new Promise((resolve, reject) => {
            if (!this.isAvailable) {
                reject('Database not opened')
            }

            const dbCollection = collection(this.db, 'MusicList');
            getDocs(dbCollection)
                .then((querySnapshot) => {
                    const result=[];
                    querySnapshot.forEach((doc) => {
                        // console.log('Doc:', doc)

                        const data = doc.data();
                        console.log('Data', data)
                        data.id=doc.id;
                        result.push(data);
                        // console.log('Data',data);
                        // console.log('Id', doc.id);
                    });
                    resolve(result);
                    // console.log('Result',result);
                })
                .catch((error) => {
                    reject(error.message)
                })
        });

    }

    add(title, artist,likes) {
        console.log("data add")
        return new Promise((resolve, reject) => {
            // console.log("error here")
            if (!this.isAvailable) {
                reject('Database not opened');
            }
            // create the music object to be added
            const music = {
                title: title,
                artist: artist,
                likes: likes
            };
            // connects to the firease collection
            const dbCollection = collection(this.db, 'MusicList');
            // console.log("Dtaabsbhsbhj");

            // Includes new object to the collections
            addDoc(dbCollection, music)
                .then((docRef) => {
                    // console.log("Firestore add success", docRef);
                    resolve();
                })

                .catch((error) => {
                    reject(error.message)
                })

        });
    };

    update(id, like) {
        console.log("Id and like: ",id +""+like)
        return new Promise((resolve, reject) => {
            if (!this.isAvailable) {
                reject('Database not opened!');
            }

            //Get the document reference.
            const docRef = doc(this.db, 'MusicList', id);

            //Updates the document
            updateDoc(docRef, {
                likes: like+1
            })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }

    delete(id) {
        // console.log("Songs List Database deleted: ", id);
        return new Promise((resolve, reject) => {
            if (!this.isAvailable) {
                reject('Database not opened!');
            }

            const docRef = doc(this.db, 'MusicList', id);

            deleteDoc(docRef)
                .then(() => {
                    // console.log("Document deleted successfully");
                    resolve();
                })
                .catch((error) => {
                    console.error("Error deleting document:", error.message);
                    reject(error.message);
                });
        });
    }

}

export default new Movie();