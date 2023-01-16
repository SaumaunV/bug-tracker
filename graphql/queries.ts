import { gql } from "../src/__generated__/gql";

export const GET_USERS = gql(/* GraphQL */ `
  query GetAllUsers {
    users {
      id
      username
      email
      role
    }
  }
`);

export const GET_USER_ALL_TICKETS = gql(/* GraphQL */ `
  query GetAllUserTickets($id: ID!) {
    user(id: $id) {
      allTickets {
        type
        status
        priority
      }
    }
  }
`); 

export const GET_USER_NAME = gql(/* GraphQL */ `
  query GetUserName($id: ID!) {
    user(id: $id) {
      username
    }
  }
`);

export const DELETE_USER = gql(/* GraphQL */ `
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`);

export const UPDATE_USER = gql(/* GraphQL */ `
  mutation UpdateUser($role: String!, $id: ID!) {
    updateUser(role: $role ,id: $id) {
      role
    }
  }
`);

export const GET_PROJECT_USERS = gql(/* GraphQL */ `
  query GetProjectUsers($id: ID!) {
    project(id: $id) {
      users {
        id
        username
      }
    }
  }
`);

export const GET_PROJECT = gql(/* GraphQL */ `
  query GetProject($id: ID!) {
    project(id: $id) {
      name
      description
      users {
        id
        username
        role
      }
      tickets {
        id
        name
        description
        type
        status
        priority
        user_id
        created_at
        project_id
      }
    }
  }
`);

export const GET_PROJECT_NAME = gql(/* GraphQL */ `
  query GetProjectName($id: ID!) {
    project(id: $id) {
      name
    }
  }
`);

export const GET_PROJECTS = gql(/* GraphQL */ `
  query GetAllProjects($id: ID!) {
    user(id: $id) {
      projects {
        id
        name
        description
      }
    }
  }
`);

export const CREATE_PROJECT = gql(/* GraphQL */`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      name
      description
    }
  }
`);

export const DELETE_PROJECT = gql(/* GraphQL */`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`);

export const GET_TICKETS = gql(/* GraphQL */`
  query GetAllTickets {
    tickets {
      id
      name
      description
      type
      status
      priority
      user_id
    }
  }
`);

export const GET_PROJECT_TICKETS = gql(/* GraphQL */ `
  query GetProjectTickets($id: ID!) {
    projectTickets(id: $id) {
      id
      name
      description
      type
      status
      priority
      user_id
    }
  }
`);
export const GET_USER_TICKETS = gql(/* GraphQL */ `
  query GetUserTickets($id: ID!) {
    userTickets(id: $id) {
      id
      name
      description
      type
      status
      priority
      created_at
      user_id
      project_id
    }
  }
`);

export const CREATE_TICKET = gql(/* GraphQL */`
  mutation CreateTicket($input: CreateTicketInput!) {
    createTicket(input: $input) {
      name
      description
      type
      status
      priority
      user_id
    }
  }
`);

export const DELETE_TICKET = gql(/* GraphQL */`
  mutation DeleteTicket($id: ID!) {
    deleteTicket(id: $id) {
      id
    }
  }
`);

export const UPDATE_TICKET = gql(/* GraphQL */ `
  mutation UpdateTicket($input: UpdateTicketInput!) {
    updateTicket(input: $input) {
      id
    }
  }
`);
