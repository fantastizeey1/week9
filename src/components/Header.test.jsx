// Header.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  beforeEach(() => {
    render(<Header />);
  });

  test("renders logo", () => {
    const logo = screen.getByAltText(/Flowbite Logo/i);
    expect(logo).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    const navLinks = [
      "Home",
      "Company",
      "Marketplace",
      "Features",
      "Team",
      "Contact",
    ];

    navLinks.forEach((link) => {
      const linkElement = screen.getByText(link);
      expect(linkElement).toBeInTheDocument();
    });
  });

  test("renders login and get started buttons", () => {
    const loginButton = screen.getByText(/Log in/i);
    const getStartedButton = screen.getByText(/Get started/i);

    expect(loginButton).toBeInTheDocument();
    expect(getStartedButton).toBeInTheDocument();
  });

  test("renders mobile menu button", () => {
    const mobileMenuButton = screen.getByRole("button", {
      name: /Open main menu/i,
    });
    expect(mobileMenuButton).toBeInTheDocument();
  });
});
