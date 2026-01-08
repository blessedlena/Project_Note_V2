import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/notes", { title, content });
      toast.success("Notiz erfolgreich erstellt!");
      navigate("/");
    } catch (error) {
      toast.error("Fehler beim Erstellen der Notiz");
    }
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-[#fdfcfb]">
      <div className="max-w-4xl mx-auto">
        {/* Header Bereich mit Zurück-Button */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="text-slate-400 hover:text-sky-500 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            ← Zurück
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Gerahmtes Feld für den Titel-Input */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm focus-within:border-sky-300 transition-all">
            <input
              type="text"
              placeholder="Titel der Notiz..."
              className="w-full text-3xl font-bold font-serif border-none focus:ring-0 placeholder:text-slate-200 text-slate-900 bg-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          {/* Gerahmtes Feld für den Text-Input (Textarea) */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm focus-within:border-sky-300 transition-all min-h-[450px] flex flex-col">
            <textarea
              placeholder="Schreibe hier deine Gedanken..."
              className="w-full flex-grow text-lg text-slate-600 border-none focus:ring-0 resize-none placeholder:text-slate-200 leading-relaxed bg-transparent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* Footer Bereich mit Speicher-Button */}
          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-white px-10 py-3 rounded-xl font-medium transition-all shadow-md shadow-sky-500/20 active:scale-95"
            >
              Notiz speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;