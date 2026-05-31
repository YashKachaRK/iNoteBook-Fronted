import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Notes from "./components/Notes";
import Profile from "./components/Profile";
import NoteState from "./context/notes/NoteState";
import AddNote from "./components/AddNotes";
import Login from "./components/login";
import Signup from "./components/Singup";

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      <NoteState>
        {!hideNavbar && <Navbar />}

        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/Notes" element={<Notes />} />
          {/* <Route path="/Favorites" element={<Favorites />} /> */}
          <Route path="/Profile" element={<Profile />} />
          <Route path="/addNote" element={<AddNote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;