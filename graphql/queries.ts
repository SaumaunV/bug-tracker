import { gql } from "../src/__generated__/gql";

export const GET_USERS = gql(/* GraphQL */ `
  query GetAllUsers {
    users {
      email
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
      developer_id
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
      developer_id
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
