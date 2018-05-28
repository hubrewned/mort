import { Selector } from "../src/selector";

test("it strips out `#` and `.` from selectors", () => {
    const expectedId = "a-valid-id";
    const expectedClass = "a-valid-class";

    const selectorId = new Selector("#a-valid-id");
    expect(selectorId.cleanName).toEqual(expectedId);

    const selectorClass = new Selector(".a-valid-class");
    expect(selectorClass.cleanName).toEqual(expectedClass);
});

test("it strips out attribute selectors", () => {
    const expectedId = "a-valid-id";
    const expectedClass = "a-valid-class";

    const selectorId = new Selector("#a-valid-id[type=button]");
    expect(selectorId.cleanName).toEqual(expectedId);

    const selectorClass = new Selector(".a-valid-class[something]");
    expect(selectorClass.cleanName).toEqual(expectedClass);
});

test("it is instantiated with a default line count of 0", () => {
    const selector = new Selector("#something");
    expect(selector.lineCount).toEqual(0);
});

// https://github.com/joereynolds/mort/issues/7
test("it strips punctuation from the selector", () => {
    const expectedId = "id-with-comma";
    const expectedClass = "class-with-comma";

    const selectorId = new Selector("#id-with-comma,");
    expect(selectorId.cleanName).toEqual(expectedId);

    const selectorClass = new Selector(".class-with-comma,");
    expect(selectorClass.cleanName).toEqual(expectedClass);
});
