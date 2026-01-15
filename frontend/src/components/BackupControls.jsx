import { useRef } from "react";
import toast from "react-hot-toast";

import api from "../lib/axios.js";

const BackupControls = ({ notes, onImported }) => {
  const fileInputRef = useRef(null);

  const exportBackup = () => {
    const dataStr =
      "data:application/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(notes, null, 2));

    const a = document.createElement("a");
    a.href = dataStr;
    a.download = "my_notes_backup.json";
    document.body.appendChild(a);
    a.click();
    a.remove();

    toast.success("Backup downloaded!");
  };

  const importBackup = async (file) => {
    if (!file) return;

    const isJson =
      file.type === "application/json" ||
      file.name.toLowerCase().endsWith(".json");

    if (!isJson) {
      toast.error("Please select a .json backup file");
      return;
    }

    const toastId = toast.loading("Importing backup...");

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      if (!Array.isArray(parsed)) {
        toast.error("Invalid backup format: expected an array of notes", {
          id: toastId,
        });
        return;
      }

      const cleaned = parsed
        .filter((n) => n && typeof n === "object")
        .map((n) => ({
          title: typeof n.title === "string" ? n.title : "",
          content: typeof n.content === "string" ? n.content : "",
        }))
        .filter((n) => n.title.trim() || n.content.trim());

      if (cleaned.length === 0) {
        toast.error("Backup contains no importable notes", { id: toastId });
        return;
      }

      await Promise.all(cleaned.map((note) => api.post("/notes", note)));

      toast.success(`Imported ${cleaned.length} notes!`, { id: toastId });

      // Let HomePage refresh notes (or set state) however it wants
      await onImported?.();
    } catch (err) {
      toast.error("Failed to import backup (invalid JSON or server error)", {
        id: toastId,
      });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center gap-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(e) => importBackup(e.target.files?.[0])}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 border border-sky-200 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors text-sm font-medium"
      >
        Import Backup
      </button>

      {notes?.length > 0 && (
        <button
          onClick={exportBackup}
          className="flex items-center gap-2 px-4 py-2 border border-sky-200 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors text-sm font-medium"
        >
          Export Backup
        </button>
      )}
    </div>
  );
};

export default BackupControls;
