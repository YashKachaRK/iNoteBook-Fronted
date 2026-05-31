import { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    getNotes();
  }, []);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);

    setShowModal(false);
  };
  const [showModal, setShowModal] = useState(false);

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full">
      <h1 className="text-3xl font-bold text-white mb-8 border-b border-zinc-800 pb-4">
        Your <span className="text-yellow-400">Notes</span>
      </h1>
      {notes.length === 0 ? (
        <div className="text-zinc-500 text-lg text-center mt-12 bg-zinc-900/50 rounded-2xl p-10 border border-dashed border-zinc-800">
          No notes available. Create one to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((n) => {
            return <NoteItem key={n._id} note={n} updateNote={updateNote} />;
          })}
        </div>
      )}

      {/* Model Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-gray-900 text-white w-full max-w-md rounded-xl p-6 shadow-lg border border-zinc-800">
            <h2 className="text-2xl font-bold mb-5">Edit Note</h2>

            <div className="space-y-4">
              <input
                type="text"
                value={note.etitle}
                onChange={(e) => {
                  setNote({ ...note, etitle: e.target.value });
                }}
                placeholder="Enter title"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:border-yellow-400 text-white"
              />

              <textarea
                rows="4"
                value={note.edescription}
                onChange={(e) => {
                  setNote({ ...note, edescription: e.target.value });
                }}
                placeholder="Enter description"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:border-yellow-400 text-white"
              />

              <input
                type="text"
                value={note.etag}
                onChange={(e) => {
                  setNote({ ...note, etag: e.target.value });
                }}
                placeholder="Enter tag"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:border-yellow-400 text-white"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 cursor-pointer"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
