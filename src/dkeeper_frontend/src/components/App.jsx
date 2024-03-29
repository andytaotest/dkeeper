import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper_backend } from "../../../declarations/dkeeper_backend";

function App() {
  const [noteArr, setNoteArr] = useState([]);

  function addNote(note) {
    setNoteArr((prevNoteArr) => {
      dkeeper_backend.createNote(note.title, note.content);
      return [note, ...prevNoteArr];
    });
  }

  //Triggered every re-rendering
  useEffect(() => {
    console.log("useEffect is triggered");
    fetchData(); //useEffect can't be async, that's why create a new method
  }, []); //[] means only called once, in order to avoid infinite loop

  async function fetchData() {
    const notesArray = await dkeeper_backend.readNotes();
    setNoteArr(notesArray);
  }

  function deleteNote(id) {
    dkeeper_backend.removeNote(id);
    setNoteArr((prevNoteArr) => {
      return prevNoteArr.filter((note, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      {noteArr.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
