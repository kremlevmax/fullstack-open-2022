import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toggable from "./Toggable";

describe("<Togglable />", () => {
  let container;

  beforeEach(() => {
    container = render(
      <Toggable buttonLabel='show...'>
        <div className='testDiv'>togglable content</div>
      </Toggable>
    ).container;
  });

  test("renders its children", () => {
    screen.findAllByText("togglable content");
  });

  test("at start the children are not displayed", () => {
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });
  //5.14: Blog list tests, step2
  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });
});
