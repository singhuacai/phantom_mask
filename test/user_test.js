const { expect, requester } = require("./set_up");

describe("user", function () {
  context("get users by total amount", function () {
    it("with right parameters", async () => {
      const res = await requester.get(
        "/user/listByTotalAmount?startDate=2021-01-01%2008:59:59&endDate=2021-01-03%2023:59:59&topXUsers=1"
      );

      const data = res.body.userList;
      const expected = ["user1"];
      expect(data).to.deep.equal(expected);
    });
    it("with wrong parameter (topXUsers)", async () => {
      const res = await requester.get(
        "/user/listByTotalAmount?startDate=2021-01-01%2008:59:59&endDate=2021-01-03%2023:59:59&topXUsers=-1"
      );
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal("you key the wrong paramaters!");
    });
    it("with wrong parameter (startDate or endDate)", async () => {
      const res = await requester.get(
        "/user/listByTotalAmount?startDate=2021-01-01%2008:59:59&endDate=2021-01-03%2023:59:60&topXUsers=2"
      );
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal("you key the wrong paramaters!");
    });
    it("lack parameters", async () => {
      const res = await requester.get("/user/listByTotalAmount");
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal(
        "startDate, endDate and topXUsers parameters are required!"
      );
    });
  });
  context("purchase mask", function () {
    it("with right parameters", async () => {
      const res = await requester.post("/user/purchaseMask").send({
        userId: 1,
        pharmacyName: "Cash Saver Pharmacy",
        mask: "MaskT (black) (10 per pack)",
      });
      expect(res.body.pharchaseId).to.equal(6);
    });
    it("Insufficient balance", async () => {
      const res = await requester.post("/user/purchaseMask").send({
        userId: 2,
        pharmacyName: "Cash Saver Pharmacy",
        mask: "MaskT (black) (10 per pack)",
      });
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal("Insufficient balance");
    });
    it("lack parameter", async () => {
      const res = await requester.post("/user/purchaseMask").send({
        userId: 1,
        pharmacyName: "Cash Saver Pharmacy",
      });
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal(
        "userId, pharmacyName and mask parameters are required!"
      );
    });
    it("with wrong parameter", async () => {
      const res = await requester.post("/user/purchaseMask").send({
        userId: 1,
        pharmacyName: "Cash Saverr Pharmacy",
        mask: "MaskT (black) (10 per pack)",
      });
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal("you key the wrong paramaters!");
    });
  });
});
