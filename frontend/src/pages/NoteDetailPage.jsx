import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../lib/axios";
import { formatDate } from "../lib/utils";
import { ArrowLeft, Edit2Icon, SaveIcon, XIcon } from "lucide-react";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Local state for editing
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        // Initialize edit fields with fetched data
        setEditTitle(res.data.title);
        setEditContent(res.data.content);
      } catch (err) {
        toast.error("Note not found");
        navigate("/");
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleSave = async () => {
    try {
      const res = await api.put(`/notes/${id}`, {
        title: editTitle,
        content: editContent,
      });
      setNote(res.data); // Update view with new data
      setIsEditing(false);
      toast.success("Note updated successfully!");
    } catch (err) {
      toast.error("Failed to save changes");
    }
  };

  const handleCancel = () => {
    // Reset fields to original note data and exit edit mode
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
  };

  if (!note) return null;

  return (
    <div className="min-h-screen py-12 px-6 bg-[#fdfcfb]">
      <article className="max-w-4xl mx-auto">
        {/* Header Bereich */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate("/")}
            type="button"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-transparent hover:border-slate-200 hover:bg-white transition-all text-slate-400 hover:text-sky-500"
          >
            <ArrowLeft className="size-5" />
            <span>Back to the main page</span>
          </button>

          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-slate-400 tracking-widest">
              Created on {formatDate(new Date(note.createdAt))}
            </span>

            {isEditing && (
              <button
                onClick={handleCancel}
                type="button"
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Cancel"
              >
                <XIcon className="size-5" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Title Field */}
          <div
            className={`bg-white border rounded-xl p-6 shadow-sm transition-all ${
              isEditing
                ? "border-sky-300 ring-2 ring-sky-50"
                : "border-slate-200"
            }`}
          >
            {isEditing ? (
              <input
                className="w-full text-4xl font-bold font-serif text-slate-900 leading-tight focus:outline-none bg-transparent"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title..."
              />
            ) : (
              <h1 className="text-4xl font-bold font-serif text-slate-900 leading-tight">
                {note.title}
              </h1>
            )}
          </div>

          {/* Content Field */}
          <div
            className={`bg-white border rounded-xl p-8 shadow-sm min-h-[400px] transition-all ${
              isEditing
                ? "border-sky-300 ring-2 ring-sky-50"
                : "border-slate-200"
            }`}
          >
            {isEditing ? (
              <textarea
                className="w-full min-h-[350px] text-slate-600 leading-[1.8] text-lg focus:outline-none resize-none bg-transparent"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Start writing..."
              />
            ) : (
              <div className="prose prose-slate prose-lg max-w-none">
                <p className="text-slate-600 leading-[1.8] whitespace-pre-wrap text-lg">
                  {note.content}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-end">
          {isEditing ? (
            <button
              onClick={handleSave}
              type="button"
              className="flex items-center gap-2 bg-sky-500 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-sky-600 transition-all shadow-md shadow-sky-100"
            >
              <SaveIcon className="size-4" />
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              type="button"
              className="flex items-center gap-2 text-sky-600 font-medium hover:bg-sky-50 px-5 py-2.5 rounded-xl transition-all border border-sky-100 hover:shadow-sm"
            >
              <Edit2Icon className="size-4" />
              Edit Note
            </button>
          )}
        </div>
      </article>
    </div>
  );
};

export default NoteDetailPage;
