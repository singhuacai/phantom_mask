const { expect, requester } = require("./set_up");

describe("pharmacy", function () {
  context("get pharmacies by opening hours", function () {
    it("with day and time", async () => {
      const res = await requester.get(
        "/pharmacy/listByOpeningHours?specificDay=Mon&specificTime=09:00"
      );

      const data = res.body.openingPharmacies;
      const expected = ["Better You", "Cash Saver Pharmacy"];
      expect(data).to.deep.equal(expected);
    });
    it("with day", async () => {
      const res = await requester.get(
        "/pharmacy/listByOpeningHours?specificDay=Mon"
      );

      const data = res.body.openingPharmacies;
      const expected = ["Better You", "Cash Saver Pharmacy", "Pill Pack"];
      expect(data).to.deep.equal(expected);
    });
    it("with time", async () => {
      const res = await requester.get(
        "/pharmacy/listByOpeningHours?specificTime=09:00"
      );

      const data = res.body.openingPharmacies;
      const expected = ["Better You", "Cash Saver Pharmacy"];
      expect(data).to.equal(data, expected);
    });
    it("no day no time", async () => {
      const res = await requester.get("/pharmacy/listByOpeningHours");

      const data = res.body.openingPharmacies;
      const expected = [
        "Better You",
        "Cash Saver Pharmacy",
        "PrecisionMed",
        "MedSavvy",
        "Pill Pack",
      ];
      expect(data).to.deep.equal(expected);
    });
    it("wrong day", async () => {
      const res = await requester.get(
        "/pharmacy/listByOpeningHours?specificDay=Men"
      );
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal("you key the wrong day!");
    });
    it("wrong time", async () => {
      const res = await requester.get(
        "/pharmacy/listByOpeningHours?specificTime=09:65"
      );
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal("you key the wrong time!");
    });
  });
});
