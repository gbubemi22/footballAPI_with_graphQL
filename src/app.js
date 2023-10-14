require("dotenv").config();
require("express-async-errors");

const { ApolloServer } = require("apollo-server");

const typeDefs = require("../src/graphql/User/typeDefs");
const resolvers = require("../src/graphql/User/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/graphql", // Specify the GraphQL endpoint
  },
});

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");

// databaseconst

const connectDB = require("./DB/connect");

//ROUTES
const AuthRouter = require("./routers/authRouter");
const LeagueRouter = require("./routers/leagueRouter");

app.get("/", (req, res) => {
  res.json(`Wellcome to Oritse Codes`);
});

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.JWT_SECT));

//errorHandlerMiddleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

//USE ROUTES
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/leagues", LeagueRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5500;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen().then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });

    app.listen(port, () => {
      console.log(`Express app is running on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
