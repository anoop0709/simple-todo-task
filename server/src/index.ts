import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createContext } from './context';
import { connectDb } from './config/dbConfig';
import schema from './schema'

dotenv.config();
const port = Number(process.env.PORT || 4000);
const app = express() as any;



// Set up Apollo Server
const server = new ApolloServer({
  schema,
});

async function startServer() {
  await connectDb();
  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
    cookieParser(),
    express.json(),
    expressMiddleware(server, {
      context: ({ req, res }) => createContext({ req, res }),
    })
  );
}

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
});

startServer().catch((error) => {
  console.error('Error starting server:', error);
});