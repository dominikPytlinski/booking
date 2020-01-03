const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const typeDefs = fs.readFileSync('./graphql/schema/Schema.graphql', { encoding: 'utf-8' });
const resolvers = require('./graphql/resolvers/Resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const auth = req.headers.authorization;
        if(auth) {
            const token = auth.split(' ')[1];
            try {
                const decoded = await jwt.verify(token, process.env.JWT_KEY);
                return {
                    userId: decoded.userId,
                    role: decoded.role
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
});

server.applyMiddleware({app});

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-kszkn.mongodb.net/booking?retryWrites=true&w=majority`, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    )
    .catch(err => console.log(err));