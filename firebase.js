import { app } from "./firebase-config.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc as firestoreDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const loginButton = document.getElementById("loginButton");

let currentUser = null;

loginButton.addEventListener("click", async () => {

    if(currentUser){

        await signOut(auth);

    }else{

        await signInWithPopup(auth, provider);

    }

});

onAuthStateChanged(auth, async (user)=>{

    currentUser = user;

    if(user){

        loginButton.textContent = "Sign Out";

        loadHomework();

    }else{

        loginButton.textContent = "Sign In with Google";

    }

});

window.addHomework = async function(homework){

    if(!currentUser) return;

    await addDoc(
        collection(db, "users", currentUser.uid, "homework"),
        homework
    );

    loadHomework();

}

window.loadHomework = async function () {

    if (!currentUser) return;

    const snapshot = await getDocs(
        collection(db, "users", currentUser.uid, "homework")
    );

    const homeworkList = document.getElementById("homeworkList");

    homeworkList.innerHTML = "";

    snapshot.forEach(homeworkDoc => {

        const hw = homeworkDoc.data();

        const id = homeworkDoc.id;

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${hw.title}</h3>

            <p><strong>Subject:</strong> ${hw.subject}</p>

            <p><strong>Due:</strong> ${hw.dueDate}</p>

            <p>
                <strong>Difficulty:</strong>
                <span class="difficulty difficulty${hw.difficulty}">
                    ${"★".repeat(hw.difficulty)}
                </span>
            </p>

            <p>
                <strong>Priority:</strong>
                ${["Low","Normal","Medium","High","Critical"][hw.priority-1]}
            </p>

            <p>

            <strong>Status:</strong>

            <span class="status ${
                hw.status === "Not Started"
                    ? "notStarted"
                    : hw.status === "In Progress"
                    ? "inProgress"
                    : "completed"
            }">

            ${hw.status}

            </span>

            </p>

            <div class="buttons">

                <button class="statusButton">

                    ${
                        hw.status === "Not Started"
                        ? "▶ Start"

                        : hw.status === "In Progress"
                        ? "✔ Complete"

                        : "↺ Reset"
                    }

                </button>

                <button class="editButton">
                    ✏ Edit
                </button>

                <button class="deleteButton">
                    🗑 Delete
                </button>

            </div>
        `;

        homeworkList.appendChild(card);

        card.querySelector(".deleteButton").addEventListener("click", async () => {

            if (!confirm("Delete this homework?"))
                return;

            await deleteDoc(
                firestoreDoc(
                    db,
                    "users",
                    currentUser.uid,
                    "homework",
                    id
                )
            );

            loadHomework();

        });

        card.querySelector(".statusButton").addEventListener("click", async ()=>{

            let nextStatus;

            if(hw.status === "Not Started"){

                nextStatus = "In Progress";

            }
            else if(hw.status === "In Progress"){

                nextStatus = "Completed";

            }
            else{

                nextStatus = "Not Started";

            }

            await updateDoc(

                firestoreDoc(
                    db,
                    "users",
                    currentUser.uid,
                    "homework",
                    id
                ),

                {

                    status: nextStatus,
                    updatedAt: Date.now()

                }

            );

            loadHomework();

        });

    });

}