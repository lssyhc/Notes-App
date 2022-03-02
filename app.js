const chalk = require("chalk");
const { argv } = require("yargs");
const yargs = require("yargs");
const notes = require("./notes.js");

// Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
  command: "add",
  describe: "Menambah catatan baru",
  builder: {
    title: {
      describe: "Judul catatan",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Isi catatan",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Menghapus catatan",
  builder: {
    title: {
      describe: "Menghapus judul catatan",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// Create list command
yargs.command({
  command: "list",
  describe: "List catatan Anda",
  handler() {
    notes.listNotes();
  },
});

// Create read command
yargs.command({
  command: "read",
  describe: "Membaca catatan Anda",
  builder: {
    title: {
      describe: "Judul catatan",
      demandOption: true,
      type: "string",
    },
  },
  handler() {
    notes.readNote(argv.title);
  },
});

yargs.parse();
