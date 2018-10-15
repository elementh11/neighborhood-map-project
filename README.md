# Neighborhood Map (React)

## Table of Contents

* [Description](#description)
* [Instructions](#instructions)
* [Acknowledgements](#acknowledgements)

## Description

This project is part of my Udacity FEND Nano Degree program. It is a single page application built with the React library and featuring some beautiful and relaxing beaches in my neighborhood of Tampa, FL. It consists of a map displaying the locations, and includes a text input field that filters the map markers and list items to locations matching the text input. Clicking a location on the list or a marker displays additional information on a InfoWindow about the location, requested from a third-party API (here Foursquare).
The project rubric is available here:
[ Neighborhood Map project rubric](https://review.udacity.com/#!/rubrics/1351/view).

## Instructions

These instructions will get you a copy of the project up and running on you local machine for developing and testing purposes.

### Prerequisites

- have (preferably the latest) Node.js installed

### Installing

To get the development environment running:

- clone or download this repo
- run `npm install` from the the app directory to install dependencies
- run `npm start` to start the dev server
- navigate to `http://localhost:3000`

### Running a production build

To run a production buld:

- run `npm run build`
- run `serve -s build`
- navigate to `localhost: 5000`

The project includes service workers to cache the visited sites, which are active only in production mode.

## Acknowledgements

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

The Google Map was handled with [google-maps-react](https://www.npmjs.com/package/google-maps-react) library.

The locations (best) photos and ratings are obtained with Foursquare API, courtesy of [Foursquare](https://foursquare.com/).



## License

This project is licensed under the terms of the MIT license.
