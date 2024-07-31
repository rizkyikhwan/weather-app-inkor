import App from "./App";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { mockFetch } from "./mocks/mockFetch";

test("should be able to display weather results", async () => {
  window.fetch = mockFetch();

  await act(() => render(<App />));

  const input = screen.getByLabelText("search-location");
  fireEvent.change(input, { target: { value: "jakarta" } });
  expect(input.value).toBe("jakarta");
});
