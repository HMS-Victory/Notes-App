const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
   const notes = loadNotes();

   const duplicateNote = notes.find((note) => note.title === title);

   if (!duplicateNote) {
      notes.push({
         title: title,
         body: body
      });
      saveNotes(notes);
      console.log(chalk.green.bold('New note added'));
   } else {
      console.log(chalk.red.bold('Note title already in use.'));
   }
}

const removeNote = (title) => {
   const notes = loadNotes();

   const NotesToKeep = notes.filter((note) => note.title !== title);

   if (notes.length > NotesToKeep.length) {
      saveNotes(NotesToKeep);
      console.log(chalk.green.bold(title + "note removed"));
   } else {
      console.log(chalk.red.bold('there is no such file!'));
   }
}

const ListNotes = (title) => {
   const notes = loadNotes();

   console.log(chalk.inverse('Your notes'));
   notes.forEach((note) => {
      console.log(chalk.blue(note.title));
   });
}

const readNotes = (title) => {
   const notes = loadNotes();

   const note = notes.find((note) => note.title === title);

   if (note) {
      console.log(chalk.inverse(note.title));
      console.log(note.body)
   } else {
      console.log(chalk.red('Note not found'));
   }
}

const saveNotes = (notes) => {
   const dataJSON = JSON.stringify(notes);
   fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
   try {
      const dataBuffer = fs.readFileSync('notes.json');
      const dataJSON = dataBuffer.toString();
      return JSON.parse(dataJSON);
   } catch (e) {
      return [];
   }
}

module.exports = {
   addNote: addNote,
   removeNote: removeNote,
   ListNotes: ListNotes,
   readNotes: readNotes
}