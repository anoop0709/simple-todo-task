import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createContext } from './context';
import { connectDb } from './config/dbConfig';
import schema from './schema';

dotenv.config();

const port = Number(process.env.PORT || 4000);
const app = express();

const server = new ApolloServer({
  schema,
});

async function startServer() {
  try {
    await connectDb();
    await server.start();

    app.use(
      '/graphql',
      cors<cors.CorsRequest>({
        origin: [
          'http://localhost:5173'
        ],
        credentials: true,
      }),
      cookieParser(),
      express.json(),
      expressMiddleware(server, {
        context: ({ req, res }) => createContext({ req, res }),
      })
    );

    app.get('/', (_, res) => {
      res.send('API is running');
    });

    app.listen(port, () => {
      console.log(`Server ready at http://localhost:${port}/graphql`);
    });

  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();