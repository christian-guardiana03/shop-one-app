# Node JS Product App

Simple Node.js and React.js CRUD App for Product management.

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Note (Phone Number Letter Combination Generator)](#note)

## Description
This is a simple CRUD (Create, Read, Update, Delete) application for managing products. It uses Node.js for the backend and React.js for the frontend, providing a seamless and responsive user experience.

## Features
- Create, update, and delete products.
- Fetch and display product details.
- Responsive and user-friendly interface.

## Installation

To get started with the Node JS Product App, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/christian-guardiana03/shop-one-app.git
   ```

2. Navigate into the project directory:
   ```bash
   cd shop-one-app
   ```

## Usage

1. Build the application for production:
   ```bash
   npm run build
   ```

2. Start the application:
   ```bash
   npm run start
   ```

The application will be available at `http://localhost:5001`.

## Testing

The app is can be also tested by using the test script implmented using Jest Supertest

1. To test the product api request, run this to the command:
   ```bash
   NODE_OPTIONS=--experimental-vm-modules npx jest
   ```

## Note

The Phone Number Letter Combination generator can be access by going to the link `http://localhost:5001/phone-number-combinations`

