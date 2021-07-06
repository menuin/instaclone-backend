import { makeExecutableSchema } from "apollo-server";
import {loadFilesSync, mergeResolvers, mergeTypeDefs} from "graphql-tools";
import path from 'path';
const __dirname = path.resolve();

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadResolvers);

