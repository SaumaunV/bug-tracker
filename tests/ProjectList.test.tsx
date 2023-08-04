import React from 'react';
import { render, screen } from "@testing-library/react";
import { useQuery } from "@apollo/client";
import ProjectList from "../components/Projects/ProjectList";

jest.mock("@apollo/client", () => {
  return {
    useQuery: jest.fn().mockReturnValue({
      data: {
        user_projects: [
          {
            id: "1",
            name: "Project 1",
            description: "This is project 1",
          },
          {
            id: "2",
            name: "Project 2",
            description: "This is project 2",
          },
        ],
      },
      loading: false,
      error: null,
    }),
  };
});

jest.mock("@auth0/nextjs-auth0", () => {
  return {
    useUser: jest.fn().mockReturnValue({
      user: {
        sub: "auth0|123456",
      },
    }),
  };
});

describe("ProjectList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the correct number of Project components", () => {
    const { getAllByTestId } = render(<ProjectList />);
    const projectComponents = getAllByTestId("project-component");
    expect(projectComponents).toHaveLength(2);
  });

  test("displays the loading message when loading is true", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    const { getByText } = render(<ProjectList/>);
    expect(getByText("data is loading")).toBeInTheDocument();
  });

  test("displays an error message when an error occurs", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: new Error("Error occurred"),
    });
    const { getByText } = render(<ProjectList />);
    expect(getByText("Error has occurred")).toBeInTheDocument();
  });
});
