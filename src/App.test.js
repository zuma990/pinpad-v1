import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import App from "./App";

const setup = () => {
  const utils = render(<App />);
  const input = utils.getByLabelText("input-code");
  return {
    input,
    ...utils
  };
};

test("It should return a successful try", async () => {
  const { input, getByTestId, getByText } = setup();
  await act(async () => {
    fireEvent.change(input, { target: { value: "1995" } });
  });
  expect(input.value).toBe("1995");

  await act(async () => {
    fireEvent.click(getByTestId("unlockbutton"));
  });
  expect(getByText("Unlocked")).toBeInTheDocument();
});
