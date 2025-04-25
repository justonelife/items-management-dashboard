# Angular Project

A starter Angular project with a Node.js backend for rapid development and prototyping.

## Prerequisites

- **Node.js**: v23.6.1
- **npm**: Comes bundled with Node.js
- **Angular CLI** (optional, if you need to run Angular CLI commands manually)

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:justonelife/items-management-dashboard.git
   cd items-management-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Database Generation

Generate or update the project database schema using:

```bash
npm run generate
```

## Running the Backend Server

Start the Node.js backend server (listening on `localhost:3000`):

```bash
npm run server
```

Then open your browser to:

```
http://localhost:3000
```

## Running the Angular Application

Launch the Angular frontend application:

```bash
npm start
```

By default, the Angular app will run at:

```
http://localhost:4200
```

```

## Available Scripts

- `npm install`
  Installs all dependencies for both frontend and backend.
- `npm run generate`
  Generates or migrates the database schema.
- `npm run server`
  Starts the backend server on port 3000.
- `npm start`
  Starts the Angular development server on port 4200.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```
