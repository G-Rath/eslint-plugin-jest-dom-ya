import plugin, { configs, rules } from "../";

it("includes the configs and rules on the plugin", () => {
  expect(plugin).toHaveProperty("configs", configs);
  expect(plugin).toHaveProperty("rules", rules);
});

it("should have all the rules", () => {
  expect(Object.keys(rules)).toHaveLength(11);
});

it.each(Object.entries(rules))(
  "%s should export required fields",
  (name, rule) => {
    expect(rule).toHaveProperty("create", expect.any(Function));
    expect(rule.meta.docs.url).not.toBe("");
    expect(rule.meta.docs.category).toBe("Best Practices");
    expect(rule.meta.docs.description).not.toBe("");
  }
);

it("has the expected recommended config", () => {
  expect(configs.recommended).toMatchInlineSnapshot(`
    Object {
      plugins: Array [
        jest-dom-ya,
      ],
      rules: Object {
        jest-dom-ya/prefer-checked: error,
        jest-dom-ya/prefer-empty: error,
        jest-dom-ya/prefer-enabled-disabled: error,
        jest-dom-ya/prefer-focus: error,
        jest-dom-ya/prefer-in-document: error,
        jest-dom-ya/prefer-required: error,
        jest-dom-ya/prefer-to-have-attribute: error,
        jest-dom-ya/prefer-to-have-class: error,
        jest-dom-ya/prefer-to-have-style: error,
        jest-dom-ya/prefer-to-have-text-content: error,
        jest-dom-ya/prefer-to-have-value: error,
      },
    }
  `);
});

it("has the expected recommended flat config", () => {
  const expectJestDomPlugin = expect.objectContaining({
    meta: {
      name: "eslint-plugin-jest-dom-ya",
      version: expect.any(String),
    },
  });

  expect(configs["flat/recommended"]).toMatchInlineSnapshot(
    { plugins: { "jest-dom-ya": expectJestDomPlugin } },
    `
    Object {
      plugins: Object {
        jest-dom-ya: ObjectContaining {
          meta: Object {
            name: eslint-plugin-jest-dom-ya,
            version: Any<String>,
          },
        },
      },
      rules: Object {
        jest-dom-ya/prefer-checked: error,
        jest-dom-ya/prefer-empty: error,
        jest-dom-ya/prefer-enabled-disabled: error,
        jest-dom-ya/prefer-focus: error,
        jest-dom-ya/prefer-in-document: error,
        jest-dom-ya/prefer-required: error,
        jest-dom-ya/prefer-to-have-attribute: error,
        jest-dom-ya/prefer-to-have-class: error,
        jest-dom-ya/prefer-to-have-style: error,
        jest-dom-ya/prefer-to-have-text-content: error,
        jest-dom-ya/prefer-to-have-value: error,
      },
    }
  `
  );
});
