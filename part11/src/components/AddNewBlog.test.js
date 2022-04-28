import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddNewBlog from "./AddNewBlog";

test("Test add new Blog form", async () => {
  const createBlog = jest.fn();
  const userForTest = userEvent.setup();
  const user = { name: "Max" };

  render(<AddNewBlog user={user} createBlog={createBlog} />);
  const input1 = screen.getByTestId("textbox1");
  const input2 = screen.getByTestId("textbox2");
  const input3 = screen.getByTestId("textbox3");

  const sendButton = screen.getByText("Create");

  await userForTest.type(input1, "testing a form...");
  await userForTest.type(input2, "testing a form...");
  await userForTest.type(input3, "3");
  await userForTest.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  //   expect(createBlog.mock.calls[0][0].content).toBe("testing a form...");
});
