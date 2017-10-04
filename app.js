
//take all of the fs modules and store it into fs variable

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
var titleOption = {
  describe: 'Title of note',
  demand:true,
  alias:'t'
};
var bodyOption = {
  describe: 'describe your note',
  demand: true,
  alias: 'b'
};

var argv = yargs
.command('add','Add a new note', {
  title:titleOption,
  body:bodyOption
})
.command('list','list all the notes')
.command('read', 'read a note',{
  title:titleOption
})
.command('remove','Remove a note',{
  title:titleOption
})
.help()
.argv;
var command = argv._[0];


if (command === 'add') {

  var note = notes.addNote(argv.title, argv.body);
  console.log(note);
  if (note) {
    console.log(`the Note Created`);
    notes.logNote(note);
  } else {

    console.log(`there is another note with the same title ,
     the title that you entered is not added to the file system`);
  }


} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`printing ${allNotes.length} note(s).`);
  allNotes.forEach((item) => notes.logNote(item));
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log(`the Note Found`);
    notes.logNote(note);
  } else {

    console.log(`The Note Not Found`);
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNotes(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'note not found';
  console.log(message);
} else {
  console.log('Command is not recognized');
}
