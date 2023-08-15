import { render, screen } from "@testing-library/react";
import {
  getLanguage,
  setLanguage,
} from "../../multiLanguage/helpers/useLanguage";

// Mock localStorage methods
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("Language utilities", () => {
  it("should set language in localStorage", () => {
    const language = "fr";
    setLanguage(language);
    expect(localStorage.setItem).toHaveBeenCalledWith("language", language);
  });

  it("should get language from localStorage", () => {
    const language = "en";
    const result = getLanguage();
    expect(result).toBe(language);
    expect(localStorage.getItem).toHaveBeenCalledWith("language");
  });

  it("should return default language if localStorage is empty", () => {
    const defaultLanguage = "en";
    const result = getLanguage();
    expect(result).toBe(defaultLanguage);
    expect(localStorage.getItem).toHaveBeenCalledWith("language");
  });
});
