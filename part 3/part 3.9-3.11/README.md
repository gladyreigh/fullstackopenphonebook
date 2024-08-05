# Phonebook Application

## Overview

This repository contains the code for a Phonebook application. The application consists of a front end and a back end, both of which have been deployed.

## Deployed Applications

- **Front End:** [https://phonebook-6ot.pages.dev/](https://phonebook-6ot.pages.dev/)
- **Back End:** [https://phonebook-backend.greygladyreigh.workers.dev/](https://phonebook-backend.greygladyreigh.workers.dev/api/persons)

## Front End

The front end of the application is built using [Vite](https://vitejs.dev/) and is deployed on [Netlify](https://www.netlify.com/). You can access it through the URL provided above. 

### Features

- View the list of contacts
- Add new contacts
- Delete contacts
- Display contact details

## Back End

The back end is built using [Cloudflare Workers](https://workers.cloudflare.com/) and provides a RESTful API for managing contacts. The API endpoints are available at the URL provided above.

### API Endpoints

- **GET /api/persons**: Retrieve all contacts
- **GET /api/persons/:id**: Retrieve a specific contact by ID
- **POST /api/persons**: Add a new contact
- **DELETE /api/persons/:id**: Delete a contact by ID
- **GET /info**: Retrieve information about the phonebook

## Development

To run the project locally, follow these steps:

### Front End

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```

2. Navigate to the front end directory:
    ```sh
    cd <front-end-directory>
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

### Back End

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```

2. Navigate to the back end directory:
    ```sh
    cd <back-end-directory>
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. Start the development server:
    ```sh
    npm start
    ```

## Contributing

Feel free to contribute to the project by submitting pull requests or opening issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
