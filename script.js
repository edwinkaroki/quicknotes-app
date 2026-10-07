// Get elements from the HTML
const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const noteCategory = document.getElementById("note-category");
const notesList = document.getElementById("notes-list");

// Store all notes
let notes = [];

// Display notes on the page
function renderNotes() {
    notesList.innerHTML = "";

    notes.forEach(function(note) {
        const noteItem = document.createElement("li");

        noteItem.classList.add("note-card");
        noteItem.classList.add(`category-${note.category}`);

        noteItem.innerHTML = `
            <p>${note.text}</p>
            <small>Category: ${note.category}</small>
            <br>
            <small>${note.createdAt}</small>
            <br><br>
            <button class="delete-btn" data-id="${note.id}">Delete</button>
        `;

        notesList.appendChild(noteItem);
    });
}

// Add a new note
noteForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const note = {
        id: Date.now(),
        text: noteInput.value,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);

    renderNotes();

    // Clear the input after adding
    noteInput.value = "";
});