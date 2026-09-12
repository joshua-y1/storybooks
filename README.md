StoryBooks

A full-stack app where users sign in with Google and create, edit, and share short stories (public or private).

Built by following Traversy Media's Node.js/Express/MongoDB tutorial (https://www.youtube.com/watch?v=SBvmnHTQIPY). Many of the packages (Mongoose, Passport, express-handlebars, connect-mongo) have changed their APIs since the tutorial was recorded, so a good chunk of this was debugging real errors and updating outdated syntax to work with current versions.

Stack: Node.js, Express, MongoDB/Mongoose, Passport.js (Google OAuth), Handlebars, Materialize CSS

Setup

npm install

Create config/config.env:

PORT=3000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

Run it:

npm run dev
