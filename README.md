# YouBloom Explorer

*YouBloom Explorer* is a React-based demo web application designed to explore and interact with data in a modern, responsive interface. This project was built for a technical assessment and showcases clean UI, routing, and state management.
---

## Features

- *Login Page* with phone number validation and mock authentication
- *Main Page* displaying a searchable list of items fetched from a public API
- *Detail Page* showing detailed information for selected items
- *Header and Footer* for consistent navigation and branding across pages
- Responsive design using *Tailwind CSS*
- Client-side routing with *React Router*
- State management using *React Hooks* and Context API

## Tech Stack

- ReactJS (functional components & hooks)  
- React Router DOM for routing  
- Tailwind CSS for styling  
- Vite as the build tool  
- Public REST API for data (e.g., [JSONPlaceholder](https://jsonplaceholder.typicode.com))  
- Jest & React Testing Library for unit testing
---

## Installation

1. Clone the repository:  
   ```bash
   git clone git@github.com:Chenzie2/YouBloom-Explorer.git
   ```

2. Navigate to the project folder
```bash
cd YouBloom-Explorer
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm run dev
```

5. Open the app in your browser at http://localhost:5173
---

## Project Structure
```bash
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── public
│   └── logo.svg
├── README.md
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   ├── components
│   ├── context
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   ├── services
│   └── utils
└── vite.config.js
```
---

## Usage
1. Open the app in a browser
2. Log in with a mock phone number (e.g., +254712345678)
3. Explore the Main Page and search for items
4. Click an item to view its details on the Detail Page

## Testing
- Run tests with:
```bash
npm run test
```
- Includes at least one unit test using Jest and React Testing Library
---

## License
This project is for demonstration purposes only.

## Author
Grace Zawadi
