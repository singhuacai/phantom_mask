const { expect, requester } = require("./set_up");

describe("statistic", function () {
  context("get mask amount and total transaction value", function () {
    it("with right parameters", async () => {
      const res = await requester.get(
        "/statistic/maskAmountAndTotalTransValue?startDate=2021-01-01%2008:59:59&endDate=2021-01-03%2023:59:59"
      );

      const data = res.body.result;
      const expected = [
        {
          dollarValueOfTransactions: 33.65,
          totalAmountOfMasks: 10,
        },
      ];
      expect(data).to.deep.equal(expected);
    });
    it("with wrong parameter (startDate or endDate)", async () => {
      const res = await requester.get(
        "/statistic/maskAmountAndTotalTransValue?startDate=2021-01-01%2008:59:59&endDate=2021-01-03%2023:59:60"
      );
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal("you key the wrong paramaters!");
    });
    it("lack parameters", async () => {
      const res = await requester.get(
        "/statistic/maskAmountAndTotalTransValue"
      );
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal(
        "startDate and endDate parameters are required!"
      );
    });
  });
});
