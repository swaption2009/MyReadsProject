# MyReads Project

This is the implementation of MyReads project using React components

## Getting Started

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Files Structure
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── components
        ├── BookShelf.js # show list of books by shelf name
        ├── SearchPage.js # show books by search title or author
        └── ShelfSelector.js  #handle changes book shelf status
    ├── icons # Helpful images for your app. Use at your discretion.
        ├── add.svg
        ├── arrow-back.svg
        └── arrow-drop-down.svg
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## App Features

### Main Page
* Books are listed in 3 shelves, ie. "Currently Reading", "Want to Read", and "Read"
* React components: App.js and BookShelf.js
* User can navigate to Search Book page by clicking search icon on bottom right-hand corner
* When User change book shelf, alert will pop-up and render book in the updated shelf

### Search Book Page
* User can search book by title or author name
* User can update book shelf and app will notify the update
* User can navigate back to Main page by clicking back arrow button

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
