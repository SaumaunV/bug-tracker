/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query GetAllUsers {\n    users {\n      email\n    }\n  }\n": types.GetAllUsersDocument,
    "\n  query GetAllProjects($id: ID!) {\n    user(id: $id) {\n      projects {\n        id\n        name\n        description\n      }\n    }\n  }\n": types.GetAllProjectsDocument,
    "\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      name\n      description\n    }\n  }\n": types.CreateProjectDocument,
    "\n  mutation DeleteProject($id: ID!) {\n    deleteProject(id: $id) {\n      id\n    }\n  }\n": types.DeleteProjectDocument,
    "\n  query GetAllTickets {\n    tickets {\n      id\n      name\n      description\n      type\n      status\n      priority\n      developer_id\n    }\n  }\n": types.GetAllTicketsDocument,
    "\n  mutation CreateTicket($input: CreateTicketInput!) {\n    createTicket(input: $input) {\n      name\n      description\n      type\n      status\n      priority\n      developer_id\n    }\n  }\n": types.CreateTicketDocument,
    "\n  mutation DeleteTicket($id: ID!) {\n    deleteTicket(id: $id) {\n      id\n    }\n  }\n": types.DeleteTicketDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllUsers {\n    users {\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetAllUsers {\n    users {\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllProjects($id: ID!) {\n    user(id: $id) {\n      projects {\n        id\n        name\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllProjects($id: ID!) {\n    user(id: $id) {\n      projects {\n        id\n        name\n        description\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      name\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteProject($id: ID!) {\n    deleteProject(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteProject($id: ID!) {\n    deleteProject(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllTickets {\n    tickets {\n      id\n      name\n      description\n      type\n      status\n      priority\n      developer_id\n    }\n  }\n"): (typeof documents)["\n  query GetAllTickets {\n    tickets {\n      id\n      name\n      description\n      type\n      status\n      priority\n      developer_id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateTicket($input: CreateTicketInput!) {\n    createTicket(input: $input) {\n      name\n      description\n      type\n      status\n      priority\n      developer_id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTicket($input: CreateTicketInput!) {\n    createTicket(input: $input) {\n      name\n      description\n      type\n      status\n      priority\n      developer_id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteTicket($id: ID!) {\n    deleteTicket(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteTicket($id: ID!) {\n    deleteTicket(id: $id) {\n      id\n    }\n  }\n"];

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function gql(source: string): unknown;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;