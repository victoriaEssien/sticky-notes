const noteField = document.getElementById('noteInput');
const errorMessage = document.getElementById('error-msg');
const noteBoxContainer = document.getElementById('container');
const addNoteBtn = document.getElementById('addNoteBtn');

errorMessage.hidden = true;

let notesArray = [];


function displayNotes() {

    noteBoxContainer.textContent = '';

    notesArray.forEach((note) => {
        const {message} = note;

        const notesBox = document.createElement('div');
        notesBox.className = 'note-box';
        
        var deleteBtn = document.createElement('button');

        deleteBtn.className = 'delete';
        deleteBtn.appendChild(document.createTextNode('X'));
        notesBox.appendChild(document.createTextNode(message));
        notesBox.appendChild(deleteBtn);
        noteBoxContainer.appendChild(notesBox);
        
        deleteBtn.addEventListener('click', () => {
            notesArray.forEach((note, i) => {
                if (note.message === message) {
                    notesArray.splice(i, 1);
                }
            });

            localStorage.setItem('notes', JSON.stringify(notesArray));
            fetchNotes();
        });
    });

}

function fetchNotes() {

    if (localStorage.getItem('notes')) {
        notesArray = JSON.parse(localStorage.getItem('notes'));
    } else {
        notesArray = [
            {
                message: 'Welcome!'
            },
        ];

        localStorage.setItem('notes', JSON.stringify(notesArray));

    }

    displayNotes();
}

function storeNotes() {

    const noteInput = noteField.value

    if (noteInput === '') {
        errorMessage.hidden = false;
        setTimeout(() => errorMessage.remove(), 3000);
    } else {
        
        const note = {
            message: noteInput
        };

        notesArray.push(note);
        localStorage.setItem('notes', JSON.stringify(notesArray));
        fetchNotes();

        noteField.value = '';
    }
}

addNoteBtn.addEventListener('click', storeNotes);

fetchNotes();