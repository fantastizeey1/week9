import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import App from "./App";
import Search from "./search";

vi.mock("axios");

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("displays user information after loading", async () => {
    render(<App />);
    expect(screen.queryByText(/Signed in as/)).toBeNull();

    // Wait for the user information to load
    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
  });

  it("updates search text on input change", async () => {
    render(<App />);

    await screen.findByText(/Signed in as/); // Wait for user info to load
    const input = screen.getByRole("textbox");

    // Simulate typing into the search box
    await userEvent.type(input, "JavaScript");

    expect(screen.getByText(/Searching for: JavaScript/)).toBeInTheDocument();
  });

  it("fetches stories from an API and displays them", async () => {
    const stories = [
      { objectID: "1", title: "Hello" },
      { objectID: "2", title: "React" },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { hits: stories } })
    );

    render(<App />);

    // Click the fetch button
    await userEvent.click(
      screen.getByRole("button", { name: /Fetch Stories/i })
    );

    // Wait for stories to be displayed
    const items = await screen.findAllByRole("listitem");

    expect(items).toHaveLength(2);
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
    expect(screen.getByText(/React/i)).toBeInTheDocument();
  });

  it("displays an error message on fetch failure", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error("Network Error"))
    );

    render(<App />);

    // Click the fetch button
    await userEvent.click(
      screen.getByRole("button", { name: /Fetch Stories/i })
    );

    // Expect an error message to be displayed
    expect(
      await screen.findByText(/Failed to fetch stories/i)
    ).toBeInTheDocument();
  });
});

describe("Search Component", () => {
  it("calls the onChange callback handler when input changes", () => {
    const onChange = vi.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
