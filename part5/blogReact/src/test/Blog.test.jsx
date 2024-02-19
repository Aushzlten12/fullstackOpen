import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect } from "vitest";
import { Blog } from "./../components/Blog";

describe("<Blog />", () => {
  const blog = {
    title: "Test Title",
    author: "Test Author",
    url: "https://www.test.com",
    likes: 10,
    id: 1,
  };

  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        aumentLikes={() => { }}
        remove={() => { }}
        createdByUser={false}
      />,
    ).container;
  });

  test("render content", () => {
    // Title and author must be visible
    const title = screen.getByText("Test Title");
    expect(title).toBeDefined();
    expect(title).toBeVisible();
    const author = screen.getByText("Test Author");
    expect(author).toBeDefined();
    expect(author).toBeVisible();
    // Url and likes not must be visible
    const url = screen.getByText("https://www.test.com");
    expect(url).toBeDefined();
    expect(url).not.toBeVisible();
    const buttonlike = document.querySelector("#likeButton");
    expect(buttonlike).toBeDefined();
    expect(buttonlike).not.toBeVisible();
  });

  test("should show url and likes when i click show button", () => {
    const buttonToShow = document.querySelector("#togglableButton");
    fireEvent.click(buttonToShow);
    const url = screen.getByText("https://www.test.com");
    expect(url).toBeDefined();
    expect(url).toBeVisible();
    const buttonlike = document.querySelector("#likeButton");
    expect(buttonlike).toBeDefined();
    expect(buttonlike).toBeVisible();
  });
});
