import page from "./helloworld2.js";

test("hello world", async () => {
    // given
    const render = createRender();

    // when
    page(render);
    await new Promise((done) => setTimeout(done, 1000));

    // assert
    expect(render.size()).toBe(2);
    expect(render.get(0)).toContain("Hello world");
    expect(render.get(1)).toContain("Hello world");
});
