let difficulty = 1;
let priority = 3;

const addButton = document.getElementById("addButton");

addButton.addEventListener("click", ()=>{

    const subject = document.getElementById("subject").value;

    const title = document.getElementById("title").value;

    const dueDate = document.getElementById("dueDate").value;

    if(subject === "" || title === "")
        return;

    addHomework({

        title: title,

        subject: subject,

        description: "",

        difficulty,

        priority,

        estimatedTime: 0,

        status: "Not Started",

        dueDate: dueDate,

        assignedDate: new Date().toISOString(),

        completedDate: null,

        createdAt: Date.now(),

        updatedAt: Date.now()

    });

});

const dialog = document.getElementById("dialog");

document.getElementById("openDialog").onclick = () => {

    dialog.classList.remove("hidden");

};

document.getElementById("closeDialog").onclick = () => {

    dialog.classList.add("hidden");

};

document.querySelectorAll(".difficultyButton").forEach(button=>{

    button.onclick=()=>{

        document.querySelectorAll(".difficultyButton")
            .forEach(b=>b.classList.remove("selected"));

        button.classList.add("selected");

        difficulty=Number(button.dataset.value);

    };

});

document.querySelectorAll(".priorityButton").forEach(button=>{

    button.onclick=()=>{

        document.querySelectorAll(".priorityButton")
            .forEach(b=>b.classList.remove("selected"));

        button.classList.add("selected");

        priority=Number(button.dataset.value);

    };

});

dialog.addEventListener("click", (event) => {

    if (event.target === dialog) {
        dialog.classList.add("hidden");
    }

});