import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import { LoginContainer } from "../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const handleSubmit = jest.fn();
      const { getByTestId } = render(<LoginContainer handleSubmit={handleSubmit} />);

      fireEvent.changeText(getByTestId("usernameField"), "kalle");
      fireEvent.changeText(getByTestId("passwordField"), "password");
      fireEvent.press(getByTestId("submitButton"));

      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledTimes(1);

        expect(handleSubmit.mock.calls[0][0]).toEqual({
            username: "kalle",
            password: "password",
          });
      });

     
    });
  });
});
