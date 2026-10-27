# Online Lost & Found Portal

GLA University, Mathura. A team project with separate frontend and backend/API work areas.

## Team areas

- **Frontend**: the React/Vite app currently lives in this repository root (`src/`, `index.html`, and `vite.config.js`).
- **Backend/API**: use the `backend/` folder. Its README has setup notes for the teammate implementing the API.

Coordinate API routes and request/response formats with the frontend owner before changing them.

## Run the frontend
1. Install Node.js 18 or newer.
2. In this folder run: `npm install`
3. Start the dev server: `npm run dev` and open the link shown (usually http://localhost:5173).
4. Production build: `npm run build`

To just see the design without installing anything, open `standalone/lost-and-found-portal.html` in a browser (needs internet for React from a CDN).

## What is included
- Login / registration UI for Student, Faculty and Staff
  - Student: university roll number, course, year, B.Tech department (1st year: CSE, Electrical, Mechanical; 2nd-4th year: all branches)
  - Faculty: faculty ID and department
  - Staff: staff ID and field of work (Peon, Sweeper, Gardener, Assistant, etc.)
- Home, Browse (search and filters), Report item, My reports, Admin dashboard
- Item profiles, photo upload, possible-match suggestions, claim verification, status bar, notifications
- Responsive layout, dark mode, keyboard focus

## Files
- `src/App.jsx` - all components and demo data
- `src/styles.css` - styles
- `src/main.jsx` - entry point

## Connecting the backend (Node/Express/MongoDB)
Data is currently demo data held in React state (`SEED` in `App.jsx`) and resets on refresh. To connect the API:
- Replace the `SEED` items and the `claims` state with `fetch('/api/items')` and `fetch('/api/claims')` calls inside `useEffect`.
- Send the report form (`Report` component) with `POST /api/items`, claims with `POST /api/claims`.
- Replace the demo `onLogin` in `Login` with a call to the authentication API and store the returned token.
- Admin approve/reject buttons should call `PATCH /api/claims/:id`.

## Working together with Git

1. Each teammate clones the repository once:
   `git clone https://github.com/Priyaaggarwal07/lost-and-found-portal.git`
2. Before starting work, get the latest changes with `git pull`.
3. Make and commit changes on a separate branch, then push it and open a pull request.
4. Teammates get each other's committed changes after they pull them; GitHub does not automatically sync files between laptops. Use VS Code Live Share for real-time co-editing.
