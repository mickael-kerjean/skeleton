import page from "./helloworld.js";

test("hello world", () => {
    // given
    const render = createRender();

    // when
    page(render);

    // assert
    expect(render.size()).toBe(1);
    expect(render.get(0)).toContain("Hello World");
    expect(typeof render.get(0)).toBe("string");
});
