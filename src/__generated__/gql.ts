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
    "\n  query GetAllUsers {\n    users {\n      id\n      username\n      email\n      role\n    }\n  }\n": types.GetAllUsersDocument,
    "\n  query GetAllUserTickets($id: ID!) {\n    user(id: $id) {\n      allTickets {\n        id\n        type\n        status\n        priority\n      }\n    }\n  }\n": types.GetAllUserTicketsDocument,
    "\n  query GetUserName($id: ID!) {\n    user(id: $id) {\n      username\n    }\n  }\n": types.GetUserNameDocument,
    "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id) {\n      id\n    }\n  }\n": types.DeleteUserDocument,
    "\n  mutation UpdateUser($role: String!, $id: ID!) {\n    updateUser(role: $role ,id: $id) {\n      role\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation AddUsers($input: AddUsersInput!) {\n    addUsers(input: $input) {\n      id\n    }\n  }\n": types.AddUsersDocument,
    "\n  query GetProjectUsers($id: ID!) {\n    project(id: $id) {\n      users {\n        id\n        username\n      }\n    }\n  }\n": types.GetProjectUsersDocument,
    "\n  query GetProject($id: ID!) {\n    project(id: $id) {\n      id\n      name\n      description\n      users {\n        id\n        username\n        role\n      }\n      tickets {\n        id\n        name\n        description\n        type\n        status\n        priority\n        user_id\n        created_at\n        project_id\n      }\n    }\n  }\n": types.GetProjectDocument,
    "\n  query GetProjectName($id: ID!) {\n    project(id: $id) {\n      name\n    }\n  }\n": types.GetProjectNameDocument,
    "\n  query GetAllProjects($id: ID!) {\n    user(id: $id) {\n      projects {\n        id\n        name\n        description\n      }\n    }\n  }\n": types.GetAllProjectsDocument,
    "\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      name\n      description\n    }\n  }\n": types.CreateProjectDocument,
    "\n  mutation DeleteProject($id: ID!) {\n    deleteProject(id: $id) {\n      id\n    }\n  }\n": types.DeleteProjectDocument,
    "\n  mutation UpdateProject($name: String!, $description: String, $id: ID!) {\n    updateProject(name: $name, description: $description, id: $id) {\n      id\n    }\n  }\n": types.UpdateProjectDocument,
    "\n  query GetAllTickets {\n    tickets {\n      id\n      name\n      description\n      type\n      status\n      priority\n      user_id\n    }\n  }\n": types.GetAllTicketsDocument,
    "\n  query GetProjectTickets($id: ID!) {\n    projectTickets(id: $id) {\n      id\n      name\n      description\n      type\n      status\n      priority\n      user_id\n    }\n  }\n": types.GetProjectTicketsDocument,
    "\n  query GetUserTickets($id: ID!) {\n    userTickets(id: $id) {\n      id\n      name\n      description\n      type\n      status\n      priority\n      created_at\n      user_id\n      project_id\n    }\n  }\n": types.GetUserTicketsDocument,
    "\n  mutation CreateTicket($input: CreateTicketInput!) {\n    createTicket(input: $input) {\n      name\n      description\n      type\n      status\n      priority\n      user_id\n    }\n  }\n": types.CreateTicketDocument,
    "\n  mutation DeleteTicket($id: ID!) {\n    deleteTicket(id: $id) {\n      id\n    }\n  }\n": types.DeleteTicketDocument,
    "\n  mutation UpdateTicket($input: UpdateTicketInput!) {\n    updateTicket(input: $input) {\n      id\n    }\n  }\n": types.UpdateTicketDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllUsers {\n    users {\n      id\n      username\n      email\n      role\n    }\n  }\n"): (typeof documents)["\n  query GetAllUsers {\n    users {\n      id\n      username\n      email\n      role\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllUserTickets($id: ID!) {\n    user(id: $id) {\n      allTickets {\n        id\n        type\n        status\n        priority\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllUserTickets($id: ID!) {\n    user(id: $id) {\n      allTickets {\n        id\n        type\n        status\n        priority\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserName($id: ID!) {\n    user(id: $id) {\n      username\n    }\n  }\n"): (typeof documents)["\n  query GetUserName($id: ID!) {\n    user(id: $id) {\n      username\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUser($role: String!, $id: ID!) {\n    updateUser(role: $role ,id: $id) {\n      role\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($role: String!, $id: ID!) {\n    updateUser(role: $role ,id: $id) {\n      role\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddUsers($input: AddUsersInput!) {\n    addUsers(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AddUsers($input: AddUsersInput!) {\n    addUsers(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProjectUsers($id: ID!) {\n    project(id: $id) {\n      users {\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProjectUsers($id: ID!) {\n    project(id: $id) {\n      users {\n        id\n        username\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProject($id: ID!) {\n    project(id: $id) {\n      id\n      name\n      description\n      users {\n        id\n        username\n        role\n      }\n      tickets {\n        id\n        name\n        description\n        type\n        status\n        priority\n        user_id\n        created_at\n        project_id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProject($id: ID!) {\n    project(id: $id) {\n      id\n      name\n      description\n      users {\n        id\n        username\n        role\n      }\n      tickets {\n        id\n        name\n        description\n        type\n        status\n        priority\n        user_id\n        created_at\n        project_id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProjectName($id: ID!) {\n    project(id: $id) {\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetProjectName($id: ID!) {\n    project(id: $id) {\n      name\n    }\n  }\n"];
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
export function gql(source: "\n  mutation UpdateProject($name: String!, $description: String, $id: ID!) {\n    updateProject(name: $name, description: $description, id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProject($name: String!, $description: String, $id: ID!) {\n    updateProject(name: $name, description: $description, id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllTickets {\n    tickets {\n      id\n      name\n      description\n      type\n      status\n      priority\n      user_id\n    }\n  }\n"): (typeof documents)["\n  query GetAllTickets {\n    tickets {\n      id\n      name\n      description\n      type\n      status\n      priority\n      user_id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProjectTickets($id: ID!) {\n    projectTickets(id: $id) {\n      id\n      name\n      description\n      type\n      status\n      priority\n      user_id\n    }\n  }\n"): (typeof documents)["\n  query GetProjectTickets($id: ID!) {\n    projectTickets(id: $id) {\n      id\n      name\n      description\n      type\n      status\n      priority\n      user_id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserTickets($id: ID!) {\n    userTickets(id: $id) {\n      id\n      name\n      description\n      type\n      status\n      priority\n      created_at\n      user_id\n      project_id\n    }\n  }\n"): (typeof documents)["\n  query GetUserTickets($id: ID!) {\n    userTickets(id: $id) {\n      id\n      name\n      description\n      type\n      status\n      priority\n      created_at\n      user_id\n      project_id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateTicket($input: CreateTicketInput!) {\n    createTicket(input: $input) {\n      name\n      description\n      type\n      status\n      priority\n      user_id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTicket($input: CreateTicketInput!) {\n    createTicket(input: $input) {\n      name\n      description\n      type\n      status\n      priority\n      user_id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteTicket($id: ID!) {\n    deleteTicket(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteTicket($id: ID!) {\n    deleteTicket(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateTicket($input: UpdateTicketInput!) {\n    updateTicket(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTicket($input: UpdateTicketInput!) {\n    updateTicket(input: $input) {\n      id\n    }\n  }\n"];

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