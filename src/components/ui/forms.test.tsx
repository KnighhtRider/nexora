import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Checkbox } from "./Checkbox";
import { Input } from "./Input";
import { Select } from "./Select";
import { Textarea } from "./Textarea";

describe("form primitives", () => {
  it("associates an input error via aria-describedby", () => {
    render(<Input id="email" label="Email" error="Enter a valid email" />);

    const input = screen.getByLabelText("Email") as HTMLInputElement;
    const error = screen.getByText("Enter a valid email");

    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toBe("email-error");
    expect(error.getAttribute("id")).toBe("email-error");
  });

  it("associates helper text when there is no error", () => {
    render(<Input id="name" label="Name" helperText="As it appears on your ID" />);

    const input = screen.getByLabelText("Name") as HTMLInputElement;
    expect(input.getAttribute("aria-describedby")).toBe("name-helper");
    expect(screen.getByText("As it appears on your ID")).toBeTruthy();
  });

  it("renders textarea, select and checkbox with labels", () => {
    render(
      <>
        <Textarea id="message" label="Message" />
        <Select id="topic" label="Topic" defaultValue="">
          <option value="">Choose</option>
        </Select>
        <Checkbox id="terms" label="Accept terms" />
      </>,
    );

    expect(screen.getByLabelText("Message")).toBeTruthy();
    expect(screen.getByLabelText("Topic")).toBeTruthy();
    expect(screen.getByLabelText("Accept terms")).toBeTruthy();
  });

  it("associates a checkbox error via aria-describedby", () => {
    render(<Checkbox id="consent" label="Consent" error="Required" />);

    const checkbox = screen.getByLabelText("Consent") as HTMLInputElement;
    expect(checkbox.getAttribute("aria-describedby")).toBe("consent-error");
  });
});
