# Phonebook Application with MongoDB

## Overview

This project is a phonebook application that utilizes MongoDB Atlas for cloud-based data storage. It includes a command-line script (`mongo.js`) for adding new entries to the phonebook and listing all existing entries.

## Setup

### MongoDB Atlas

1. **Create a MongoDB Atlas Account**:
   - Sign up for a MongoDB Atlas account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2. **Create a Cluster**:
   - Create a new cluster in MongoDB Atlas.

3. **Create a Database and Collection**:
   - Create a database named `phonebook` and a collection named `people`.

4. **Create a Database User**:
   - Create a database user with read and write access to the `phonebook` database.

5. **Obtain Connection String**:
   - Retrieve your MongoDB connection string from the MongoDB Atlas dashboard.

### Configuration

1. **Update Connection String**:
   - Update the `mongo.js` file with your actual MongoDB connection string.

   ```javascript
   const password = process.argv[2];
   const url = `mongodb+srv://grey:${password}@cluster0.ph8uczh.mongodb.net/phonebook?retryWrites=true&w=majority`;
