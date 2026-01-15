import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import toast from "react-hot-toast";

import RateLimitedUI from "../components/RateLimitedUI.jsx";
import api from "../lib/axios.js";
import NoteCard from "../components/NoteCard.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";
import BackupControls from "../components/BackupControls.jsx";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
      setIsRateLimited(false);
    } catch (error) {
      if (error?.response?.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error("Failed to load notes");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfcfb] text-slate-900 font-sans">
      <main className="max-w-6xl mx-auto px-6 pt-20 pb-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight font-serif">
            My Notes
          </h1>
          <p className="text-slate-600 mt-3">Capture your thoughts, simply.</p>

          <div className="mt-6 flex justify-end">
            <div className="flex items-center gap-3">
              <Link
                to="/create"
                className="flex items-center gap-2 px-4 py-2 border border-sky-200 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors text-sm font-medium"
              >
                <PlusIcon className="size-4" />
                <span>New Note</span>
              </Link>

              <BackupControls notes={notes} onImported={fetchNotes} />
            </div>
          </div>
        </header>

        {isRateLimited && <RateLimitedUI />}

        {loading && (
          <div className="text-center py-20 text-sky-400 font-serif">
            Loading...
          </div>
        )}

        {!loading && notes.length === 0 && <NotesNotFound />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
