import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#fdfcfb]/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand: same serif + slate styling as HomePage */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight font-serif text-slate-900 hover:text-sky-600 transition-colors"
          >
            Hyejeong’s Cozy Code Corner
          </Link>

          {/* Action button: match HomePage "Export Backup" outline-sky style */}
          <Link
            to="/create"
            className="flex items-center gap-2 px-4 py-2 border border-sky-200 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors text-sm font-medium"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Back to the main page</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
