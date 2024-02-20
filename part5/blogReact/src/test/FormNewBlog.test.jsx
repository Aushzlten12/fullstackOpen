import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { FormNewBlog } from "../components/FormNewBlog";

describe("<BlogForm />", () => {
  const author = "TestUser";
  const createBlogMock = vi.fn();

  render(<FormNewBlog author={author} createBlog={createBlogMock} />);

  test("should call event controller when user create a new blog", async () => {
    const user = userEvent.setup();
    const createButton = screen.getByText("Create");
    const titleInput = screen.getByPlaceholderText("Enter your blog title");
    const urlInput = screen.getByPlaceholderText("Enter your blog url");

    await user.type(titleInput, "Test Title");
    await user.type(urlInput, "http://test.com");

    await user.click(createButton);

    expect(createBlogMock.mock.calls).toHaveLength(1);
    expect(createBlogMock.mock.calls[0][0]).toEqual({
      title: "Test Title",
      author: "TestUser",
      url: "http://test.com",
    });
    expect(titleInput.value).toBe(""); // Check if title field is cleared
    expect(urlInput.value).toBe(""); // Check if url field is cleared
  });
});
