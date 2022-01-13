const { expect, requester } = require("./set_up");

describe("app", function () {
  context("page not found", function () {
    it("page not found", async () => {
      const res = await requester.get("/test");
      expect(res.text).to.equal("Page Not Found!");
    });
  });
});
