const fs = require('fs');

var fetchNotes = () => {
  // if there is no file with this name the program gonna crush
  //and its gonna try ty{} and if it's crushed gonna do catc
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) { 
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {

  var notes = fetchNotes();
  var note = {
    title,
    body
  };



  //if note(user want to add) has a title that already exisit in notes(json file)
  //its gonna return true then filter method gonna add the object(array item) to
  //the duplicateNotes array
  var duplicateNotes = notes.filter((item) => item.title === title);
  console.log(duplicateNotes);

  //if duplicateNotes is empty ==> there is no matches and its "ok" to write the obj
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  return fetchNotes();

};

var getNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((item) => item.title === title);
  return filteredNotes[0];
};

var removeNotes = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((item) => item.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

var logNote = (note) =>{
  debugger ;
  console.log(`---
  Title : ${note.title}
  Body : ${note.body}
  `);
};
module.exports = {
  addNote,
  getAll,
  getNote,
  removeNotes,
  logNote
};
