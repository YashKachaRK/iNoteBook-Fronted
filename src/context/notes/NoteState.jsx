import { useState } from "react";
import noteContext from "./noteContext";

// import { useState } from "react";
const NoteState = (props) => {
  const host = "https://i-note-book-backed.vercel.app";

  const [notes, setNotes] = useState([]);
  const getNotes = async () => {
    const responose = await fetch(`${host}/api/note/fatchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await responose.json();
    console.log(json);
    setNotes(json);

    // setNotes(json)
  };
  // add a notes
  const addNote = async (title, description, tag) => {
    const responose = await fetch(`${host}/api/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // API call
    // const note = {
    //   _id: "6a17c9b120f7d37ae045139b",
    //   user: "6a16decceb42c3b5ae8ba7d4",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2026-05-28T04:50:57.221Z",
    //   __v: 0,
    // };
    const json = await responose.json();
    setNotes((prevNote)=>prevNote.concat(json));
  };
  // delete a notes
  const deleteNote = async (id) => {
    await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ id }),
    });

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // edit notes
  const editNote = async (id, title, description, tag) => {
    await fetch(`${host}/api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const updatedNotes = notes.map((note) => {
      return note._id === id ? { ...note, title, description, tag } : note;
    });
    setNotes(updatedNotes);
  };
  const clearNotes = () => {
    setNotes([]);
  };
  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes, clearNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
