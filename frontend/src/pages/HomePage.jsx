import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { PlusIcon } from "lucide-react"; 
import toast from "react-hot-toast";

import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const downloadAllNotes = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notes, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "my_notes_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    toast.success("Backup downloaded!");
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfcfb] text-slate-900 font-sans">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold tracking-tight font-serif">My Notes</h1>
            <p className="text-slate-600 mt-2">Capture your thoughts, simply.</p>
          </div>
          
          <div className="flex flex-col gap-3 items-end">
            {/* New Note Button - Jetzt im gleichen Stil wie Export Backup */}
            <Link 
              to="/create" 
              className="flex items-center gap-2 px-4 py-2 border border-sky-200 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors text-sm font-medium"
            >
              <PlusIcon className="size-4" />
              <span>New Note</span>
            </Link>

            {/* Export Backup Button */}
            {notes.length > 0 && (
              <button 
                onClick={downloadAllNotes}
                className="flex items-center gap-2 px-4 py-2 border border-sky-200 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors text-sm font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" x2="12" y1="15" y2="3"/>
                </svg>
                Export Backup
              </button>
            )}
          </div>
        </header>

        {isRateLimited && <RateLimitedUI />}
        {loading && <div className="text-center py-20 text-sky-400 font-serif">Loading...</div>}

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
