// Import the MySQL2 module for database connectivity
const mysql = require('mysql2');

// Create a connection pool to manage multiple database connections efficiently
const pool = mysql.createPool({
  host: 'localhost',          // Host where MySQL server is running (local machine)
  user: 'root',               // MySQL username
  password: 'admin',          // MySQL password
  database: 'volunteer_connect_db', // Name of the database to connect to
  waitForConnections: true,   // Wait for an available connection instead of throwing an error
  connectionLimit: 10,        // Maximum number of active connections in the pool
  queueLimit: 0               // Unlimited queued connection requests
});

// Test the database connection by getting one connection from the pool
pool.getConnection((err, connection) => {
  if (err) {
    // If there is an error, log it and stop the server
    console.error(' Database connection failed:', err.message);
    process.exit(1);
  }
  // If successful, print success message
  console.log(' Connected to MySQL Database');
  // Release the connection back to the pool after testing
  connection.release();
});

// Export the pool as a promise-based interface to use async/await in other files
module.exports = pool.promise();
