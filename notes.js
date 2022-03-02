const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  debugger;

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.info(chalk.green.bold("Catatan berhasil disimpan!"));
  } else {
    console.info(chalk.red.bold("Judul catatan sudah ada"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKepp = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKepp.length) {
    saveNotes(notesToKepp);
    console.info(chalk.green.bold("Catatan berhasil dihapus"));
  } else {
    console.info(chalk.red.bold("Catatan gagal dihapus"));
  }
};

const listNotes = () => {
  console.info(chalk.yellow.bold("Catatan Anda"));

  const notes = loadNotes();
  notes.forEach((element) => {
    console.info(`- ${element.title}`);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const findNote = notes.find((note) => note.title === title);

  if (findNote) {
    console.info(chalk.inverse(findNote.title));
    console.info(findNote.body);
  } else {
    console.info(chalk.red.bold("Catatan tidak ditemukan!"));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
