import noteContext from "../context/notes/noteContext";
import { useContext, useState } from "react";
import Alert from "./Alert";

export default function AddNote() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setnote] = useState({ title: "", description: "", tag: "" });
  const [error, seterror] = useState({});
  const [alert, setAlert] = useState(null);

  const validate = () => {
    let newErrors = {};

    if (note.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (note.description.trim().length < 5) {
      newErrors.description = "Description must be at least 5 characters";
    }

    if (note.tag.trim() === "") {
      newErrors.tag = "Tag is required";
    }
    seterror(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleAddNote = async  (e) => {
    e.preventDefault(); // atale page reload no thay

    if (!validate()) return;

    await addNote(note.title , note.description , note.tag);

    setAlert({
      type: "success",
      message: "Note Added Successfully",
    });

    setTimeout(() => {
      setAlert(null);
    }, 3000);

    setnote({
      title: "",
      description: "",
      tag: "",
    });
  };

  const onChange = (e) => {
    setnote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-zinc-900 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-zinc-800">
        {alert && <Alert type={alert.type} message={alert.message} />}
        {/* Heading */}
        <h1 className="text-4xl font-bold text-white mb-2">Add New Note</h1>

        <p className="text-zinc-400 mb-8">
          Save your thoughts quickly and securely.
        </p>

        {/* Form */}
        <form className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Note Title
            </label>

            <input
              type="text"
              name="title"
              value={note.title}
              placeholder="Enter note title..."
              className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl outline-none border border-zinc-700 focus:border-yellow-400 transition duration-300"
              onChange={onChange}
            />
            {error.title && (
              <p className="text-red-400 text-sm mt-2">{error.title}</p>
            )}
          </div>

          {/* Tag */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">Tag</label>

            <input
              type="text"
              name="tag"
              value={note.tag}
              placeholder="Work, Study, Personal..."
              className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl outline-none border border-zinc-700 focus:border-yellow-400 transition duration-300"
              onChange={onChange}
            />
            {error.tag && (
              <p className="text-red-400 text-sm mt-2">{error.tag}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={note.description}
              placeholder="Write your note here..."
              className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl outline-none border border-zinc-700 focus:border-yellow-400 transition duration-300 resize-none"
              onChange={onChange}
            ></textarea>

            {error.description && (
              <p className="text-red-400 text-sm mt-2">{error.description}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:scale-[1.02] transition duration-300"
            onClick={handleAddNote}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
