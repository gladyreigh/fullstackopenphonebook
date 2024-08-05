# Phonebook Application

This is a full stack phonebook application built with React, Node.js, and MongoDB. The application allows users to manage a list of contacts, each with a name and phone number. The backend is deployed to Cloudflare Workers, and the frontend is served from the backend.

## Features

1. Add, update, and delete contacts.
2. Validate that names are at least three characters long.
3. Validate that phone numbers follow a specific format.
4. Display error messages when validation fails.
5. Fetch and display contacts from a MongoDB database.

## Setup and Installation

### Prerequisites

- Node.js
- MongoDB
- Cloudflare Workers account

### Backend Setup

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure environment variables**:
    Create a `.env` file in the root directory and add the following:
    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
    PORT=3001
    ```

4. **Run the backend**:
    ```bash
    npm start
    ```

### Frontend Setup

1. **Navigate to the frontend directory**:
    ```bash
    cd client
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Build the frontend**:
    ```bash
    npm run build
    ```

4. **Copy the build to the backend**:
    Copy the contents of the `build` directory to the `public` directory in the backend root.

### Deploying to Cloudflare Workers

1. **Login to Cloudflare**:
    ```bash
    wrangler login
    ```

2. **Initialize the project**:
    ```bash
    wrangler init
    ```

3. **Configure `wrangler.toml`**:
    Update your `wrangler.toml` configuration file to include the necessary settings for your project.

4. **Deploy the backend**:
    ```bash
    wrangler publish
    ```

## Validation and Error Handling

### Name Validation

- Names must be at least three characters long.
- Implemented in the backend using Mongoose validation.

### Phone Number Validation

- Phone numbers must be at least 8 characters long and follow the pattern: two or three numbers, a hyphen, and then the rest of the numbers (e.g., `09-12345678`).
- Implemented using a custom Mongoose validator.

### Error Handling

- Errors are caught in the backend and passed to the frontend.
- The frontend displays error messages using the `Notification` component.

### Example Code Snippets

#### Backend Validation (in Mongoose Schema)
```javascript
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d{5,}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true
  }
});
