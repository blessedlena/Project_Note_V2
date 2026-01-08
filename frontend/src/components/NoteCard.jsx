import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon, DownloadIcon } from "lucide-react";
import toast from "react-hot-toast";

import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // Stop navigation to detail page

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  const handleDownload = (e) => {
    e.preventDefault(); // Stop navigation to detail page
    try {
      const content = `TITLE: ${note.title}\nDATE: ${formatDate(new Date(note.createdAt))}\n\n${note.content}`;
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${note.title.replace(/\s+/g, "_")}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Note downloaded!");
    } catch (error) {
      toast.error("Download failed");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group bg-white border border-slate-200 rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:border-sky-200 flex flex-col h-full"
    >
      <div className="flex flex-col h-full">
        {/* Title: Serif font for a "Paper" feel, Sky Blue hover color */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif group-hover:text-sky-600 transition-colors">
          {note.title}
        </h3>
        
        {/* Content: Clean, breathable spacing */}
        <p className="text-slate-600 line-clamp-4 leading-relaxed flex-grow">
          {note.content}
        </p>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-50">
          <span className="text-xs font-medium text-slate-400">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-2">
            {/* Download Button (Sky Blue hover) */}
            <button
              onClick={handleDownload}
              className="p-2 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-all"
              title="Download Note"
            >
              <DownloadIcon className="size-4" />
            </button>

            {/* Edit Icon (Now wrapped in a button-like div with Sky Blue hover and Title) */}
            <div 
              className="p-2 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-all cursor-pointer"
              title="Edit Note"
            >
              <PenSquareIcon className="size-4" />
            </div>

            {/* Delete Button (Red hover with Title) */}
            <button
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              onClick={(e) => handleDelete(e, note._id)}
              title="Delete Note"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;