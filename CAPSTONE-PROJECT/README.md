A modern web application that fetches and displays news articles from various sources using the NewsAPI. Users can browse news by categories, search for specific topics, save favorite articles, and toggle between light/dark modes.

Features
📰 Fetch and display news articles from NewsAPI

🔍 Search functionality for finding specific news

🗂 Category filtering (Business, Technology, Sports, etc.)

💾 Save favorite articles for later reading

🌙 Dark/Light mode toggle

📱 Fully responsive design

⚡ Fast loading with React and Tailwind CSS

Clean UI with loading states and error handling

Technologies Used
React.js

React Router

Tailwind CSS

NewsAPI

Axios

Context API for state management

Installation
Clone the repository:

bash
Copy
git clone https://github.com/Lustroawuah/capstone-project.git
cd news-reader
Install dependencies:


Start the development server:

bash
Copy
npm start
Project Structure
Copy
src/
├── components/            # Reusable components
│   ├── FavoritesPage.jsx
│   ├── Homepage.jsx
│   ├── Navbar.jsx
│   ├── NewCard.jsx
│   ├── NewsDetailPage.jsx
│   └── Searchpage.jsx            
│   └── NewsContext.jsx
├── services/              # API services
│   └── newsApi.js
├── App.jsx                # Main application
└── index.js               # Entry point
API Usage
This application uses the NewsAPI to fetch news articles. You'll need to:

Sign up for a free API key at newsapi.org

Available Scripts
In the project directory, you can run:

npm start
Runs the app in development mode.
Open http://localhost:5173 to view it in your browser.

npm test
Launches the test runner in interactive watch mode.

npm run build
Builds the app for production to the build folder.

Deployment
This project can be easily deployed to:

Netlify

Vercel

Any static hosting service

Simply connect your Git repository and deploy the build folder.

Contributing
Contributions are welcome! Please open an issue or submit a pull request.

Light Mode
Light Mode Interface

Dark Mode
Dark Mode Interface

Mobile View
Mobile Responsive Design


