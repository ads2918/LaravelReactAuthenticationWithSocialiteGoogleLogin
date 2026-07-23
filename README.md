

Two separate terminal windows/tabs, since both need to run at the same time.

Backend (Laravel) — in backend:



Frontend (React/Vite) — in frontend:
One-time setup if you ever get a fresh clone of this project (new machine, or after deleting node_modules/vendor): 

#within backend folder run below in terminal
composer install
php artisan migrate
php artisan serve --port=8000

#within frontend folder run below in terminal
npm install  
npm run dev

#NOTE YOU MUST CHANGE EXAMPLE.ENV TO .ENV AN POPULATED GOOGLE CLOUD API KEY

(Vite defaults to port 5173, so you don't need -- --port=5173 unless something else is already using it.)

Then open http://localhost:5173 in your browser. Leave both terminals running — closing either one kills that server (Ctrl+C also stops it manually).

