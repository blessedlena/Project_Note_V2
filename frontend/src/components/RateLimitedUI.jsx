import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white border border-sky-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="flex-shrink-0 bg-sky-50 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
            <ZapIcon className="size-8 text-sky-500" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-slate-900 mb-1 font-serif">Slow down a bit</h3>
            <p className="text-slate-500 text-sm">
              You've made too many requests. Please wait a moment before trying again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;