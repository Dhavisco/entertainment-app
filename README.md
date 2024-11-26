# Entertainment web app
A modern and responsive movie application showcasing trending and regular movies. This app features a carousel for trending movies, bookmarking functionality, and an intuitive user interface designed for a seamless experience.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Features
- **Trending Movies**: A carousel displaying trending movies.
- **Bookmarking**: Users can bookmark their favorite movies.
- **Responsive Design**: The app is designed to work seamlessly on various screen sizes.
- **Bookmark Functionality**: Bookmark your favorite movies for quick access.
**Dynamic Search**: Search for movies with partial matching.
**State Management**: Efficient state handling using Zustand.
**Error Boundaries**: Robust error handling for better user experience.
**Reusable Components**: Modular and reusable component design.

### Expected Behaviour

- General
  - The navigation menu should be fixed to the left for larger screens. Use the "Desktop - Home" page in the design as a visual reference.
- Home
  - The trending section should scroll sideways to reveal other trending shows
  - Any search input should search through all shows (i.e. all movies and TV series)
- Movies
  - This page should only display shows with the "Movie" category
  - Any search input should search through all movies
- TV Series
  - This page should only display shows with the "TV Series" category
  - Any search input should search through all TV series
- Bookmarked Shows
  - This page should display all bookmarked shows from both categories
  - Any search input should search through all bookmarked shows

## Technologies Used
- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand
- React Router
- React Query
- React Icons
- Shadcn UI

## Getting Started
To get started with this project, follow these steps:
1. Clone the repository:
```bash
git clone https://github.com/Dhavisco/entertainment-app.git
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
4. Open your browser and visit http://localhost:3000 to see the app in action.

## Usage
- Explore trending movies in the carousel.
- Bookmark your favorite movies.
- Search for movies using the search bar.
- Navigate through different sections of the app.


