/**
 * @jest-environment jsdom
 */

import {
  render,
  waitForElementToBeRemoved,
  screen,
} from "@testing-library/react";
import React from "react";

import { UserPage } from "pages/UserPage";
import { TestWrapper } from "utils/TestWrapper";

afterEach(() => {
  jest.clearAllMocks();
});

test("should match snapshot", async () => {
  Object.defineProperty(window, "django_context", {
    value: {
      user: {
        is_superuser: false,
      },
    },
    writable: false,
  });

  const users = [
    {
      id: 1,
      username: "user1",
      email: "user1@example.com",
      date_joined: "2022-01-01 00:00:00",
    },
    {
      id: 2,
      username: "user2",
      email: "user2@example.com",
      date_joined: "2022-01-01 00:00:00",
    },
  ];

  /* eslint-disable */
  jest
    .spyOn(require("../utils/AironeAPIClient"), "getUsers")
    .mockResolvedValue({
      json() {
        return Promise.resolve(users);
      },
    });
  /* eslint-enable */

  // wait async calls and get rendered fragment
  const result = render(<UserPage />, {
    wrapper: TestWrapper,
  });
  await waitForElementToBeRemoved(screen.getByTestId("loading"));

  expect(result).toMatchSnapshot();
});