import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";

const App = () => {
  return (
    /* Wir entfernen das absolute Div mit dem radial-gradient. 
       Stattdessen nutzen wir einfach die volle Höhe und die Hintergrundfarbe #fdfcfb.
    */
    <div className="relative min-h-screen w-full bg-[#fdfcfb]">    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
