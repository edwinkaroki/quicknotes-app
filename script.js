// Get elements from the HTML
const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const noteCategory = document.getElementById("note-category");
const notesList = document.getElementById("notes-list");
const errorMessage = document.getElementById("error-message");
const noteCount = document.getElementById("note-count");
const searchInput = document.getElementById("search-input");

// Load saved notes from localStorage
let notes = JSON.parse(localStorage.getItem("quickNotes")) || [];

// Update the note count
function updateNoteCount() {
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}

// Save notes to localStorage
function saveNotes() {
    localStorage.setItem("quickNotes", JSON.stringify(notes));
}

// Display notes on the page
function renderNotes(notesToDisplay = notes) {
    notesList.innerHTML = "";

    if (notesToDisplay.length === 0 && searchInput.value.trim() !== "") {
        notesList.innerHTML = "<li>No notes match your search.</li>";
        updateNoteCount();
        return;
    }

    notesToDisplay.forEach(function(note) {
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

    updateNoteCount();
}

// Add a new note
noteForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = noteInput.value.trim();

    // Check if the note is empty
    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    // Check if the note is longer than 200 characters
    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }

    const note = {
        id: Date.now(),
        text: text,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);

    // Save the updated notes
    saveNotes();

    // Clear error message
    errorMessage.textContent = "";

    // Display the notes
    renderNotes();

    // Clear the input
    noteInput.value = "";
});

// Delete a note
notesList.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        const noteId = Number(event.target.dataset.id);

        notes = notes.filter(function(note) {
            return note.id !== noteId;
        });

        // Save the updated notes
        saveNotes();

        renderNotes();
    }
});

// Search notes as the user types
searchInput.addEventListener("input", function() {
    const searchWords = searchInput.value.toLowerCase().trim();

    const filteredNotes = notes.filter(function(note) {
        return note.text.toLowerCase().includes(searchWords);
    });

    renderNotes(filteredNotes);
});

// Display saved notes when the page opens
renderNotes();