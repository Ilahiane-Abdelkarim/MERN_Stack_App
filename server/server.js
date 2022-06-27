const path = require('path')
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 8080;

connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/usersRoutes'));

app.use('/api/goals', require('./routes/goalRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__filename, '../client/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('set env development to production...'))
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on http://localhost:${port}`)); //npm run server