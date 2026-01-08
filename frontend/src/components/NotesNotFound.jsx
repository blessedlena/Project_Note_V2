import { NotebookIcon } from "lucide-react";
import { Link } from "react-router-dom";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-sky-50 rounded-full p-8 border border-sky-100">
        <NotebookIcon className="size-10 text-sky-500" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 font-serif">No notes yet</h3>
      <p className="text-slate-500">
        Ready to organize your thoughts? Create your first note to get started on your journey.
      </p>
      <Link 
        to="/create" 
        className="inline-flex items-center justify-center bg-white border border-sky-200 text-sky-600 px-6 py-3 rounded-xl font-medium hover:bg-sky-50 transition-all shadow-sm"
      >
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;