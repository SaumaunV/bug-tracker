import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetAllProjects {
    projects {
      id
      name
      description
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      name
      description
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

export const GET_TICKETS = gql`
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
`

export const CREATE_TICKET = gql`
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
`;

export const DELETE_TICKET = gql`
  mutation DeleteTicket($id: ID!) {
    deleteTicket(id: $id) {
      id
    }
  }
`;
