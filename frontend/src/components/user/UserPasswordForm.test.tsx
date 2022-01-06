/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import React from "react";

import { TestWrapper } from "../../utils/TestWrapper";

import { UserPasswordForm } from "./UserPasswordForm";

test("should render a component with essential props", function () {
  const user = {
    id: 1,
    username: "test",
  };

  expect(() =>
    render(<UserPasswordForm user={user} asSuperuser={true} />, {
      wrapper: TestWrapper,
    })
  ).not.toThrow();
});