import { describe, it, expect } from "vitest";
import { encodeAnswers, decodeAnswers } from "./shareLink";
import { ENGINEER, TEACHER } from "./engine/fixtures";

describe("share link", () => {
  it("round-trips answers through encode → decode", () => {
    for (const user of [ENGINEER, TEACHER]) {
      const decoded = decodeAnswers(encodeAnswers(user));
      expect(decoded).toEqual(user);
    }
  });

  it("produces a URL-safe string (no +, /, or = padding)", () => {
    const encoded = encodeAnswers(ENGINEER);
    expect(encoded).not.toMatch(/[+/=]/);
  });

  it("returns null for a malformed or incomplete link", () => {
    expect(decodeAnswers("not-valid-base64!!")).toBeNull();
    expect(decodeAnswers(btoa('{"situation":"graduate"}'))).toBeNull(); // incomplete
  });
});
