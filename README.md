# Project_Note_V2 (Full-Stack Notes App)

A minimal full-stack notes app to **create, read, update, and delete** notes, plus simple **export/download** features.
Built with **React (Vite)** on the frontend and **Node.js/Express + MongoDB** on the backend, with **Upstash Redis** rate limiting.

---

## English

### Features
- CRUD notes (create / list / detail / edit / delete)
- Export **all notes** as `my_notes_backup.json`
- Download **single note** as `.txt`
- Rate-limit protection (HTTP `429`) + friendly UI state
- Toast notifications + clean UI components

### Tech Stack
- **Frontend:** React, React Router, Axios, Tailwind CSS, react-hot-toast, lucide-react  
- **Backend:** Node.js, Express, MongoDB (Mongoose), Upstash Redis (rate limiting)

### API
Base: `/api/notes`
- `GET /api/notes` – list notes
- `GET /api/notes/:id` – note details
- `POST /api/notes` – create note
- `PUT /api/notes/:id` – update note
- `DELETE /api/notes/:id` – delete note

### Run Locally (Dev)
**Backend**
```bash
cd backend
npm install
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

> In development, the frontend calls the backend via `http://localhost:5001/api`.

### Production
In production, the Express server can serve the built frontend from `frontend/dist` and the API under `/api`.

---

## Deutsch

### Features
- CRUD Notizen (Erstellen / Liste / Detail / Bearbeiten / Löschen)
- Export **aller Notizen** als `my_notes_backup.json`
- Download **einer Notiz** als `.txt`
- Rate-Limit Schutz (HTTP `429`) + passende UI
- Toast-Feedback & saubere UI-Komponenten

### Tech-Stack
- **Frontend:** React, React Router, Axios, Tailwind CSS, react-hot-toast, lucide-react  
- **Backend:** Node.js, Express, MongoDB (Mongoose), Upstash Redis (Rate Limiting)

### API
Basis: `/api/notes`
- `GET /api/notes` – alle Notizen
- `GET /api/notes/:id` – Notiz-Details
- `POST /api/notes` – Notiz erstellen
- `PUT /api/notes/:id` – Notiz updaten
- `DELETE /api/notes/:id` – Notiz löschen
```

### Lokal starten (Dev)
**Backend**
```bash
cd backend
npm install
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

> Im Development ruft das Frontend das Backend über `http://localhost:5001/api` auf.

### Production
Im Production-Modus kann Express das gebaute Frontend aus `frontend/dist` ausliefern und die API unter `/api` bereitstellen.

---

