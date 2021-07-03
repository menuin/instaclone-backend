import { makeExecutableSchema } from "apollo-server";
import {loadFilesSync, mergeResolvers, mergeTypeDefs} from "graphql-tools";
import path from 'path';
const __dirname = path.resolve();

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`)
const loadResolvers = loadFilesSync(`${__dirname}/**/*.{queries,mutations}.js`)

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadResolvers);


const schema = makeExecutableSchema({typeDefs,resolvers})

export default schema;