import test from "node:test";
import assert from "node:assert/strict";
import {
  LANGUAGE_STORAGE_KEY,
  readLanguagePreference,
  saveLanguagePreference,
} from "../src/hooks/useSiteLanguage.js";

test("defaults to Japanese when there is no preference", () => {
  assert.equal(readLanguagePreference(undefined), "ja");
  assert.equal(readLanguagePreference({ getItem: () => null }), "ja");
  assert.equal(readLanguagePreference({ getItem: () => "unknown" }), "ja");
});

test("restores English when explicitly selected", () => {
  const saved = new Map();
  const storage = {
    getItem: (key) => saved.get(key) ?? null,
    setItem: (key, value) => saved.set(key, value),
  };

  assert.equal(saveLanguagePreference(storage, "en"), true);
  assert.equal(saved.get(LANGUAGE_STORAGE_KEY), "en");
  assert.equal(readLanguagePreference(storage), "en");

  assert.equal(saveLanguagePreference(storage, "ja"), true);
  assert.equal(readLanguagePreference(storage), "ja");
});

test("storage failures never block the language controls", () => {
  const blockedStorage = {
    getItem: () => { throw new Error("Storage denied"); },
    setItem: () => { throw new Error("Storage denied"); },
  };
  assert.equal(readLanguagePreference(blockedStorage), "ja");
  assert.equal(saveLanguagePreference(blockedStorage, "en"), false);
});
