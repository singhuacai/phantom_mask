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
  context("get pharmacy masks", function () {
    it("with right parameter, sort by mask_price (desc)", async () => {
      const res = await requester.get(
        "/pharmacy/masksList?pharmacy=Cash%20Saver%20Pharmacy&sortby=mask_price&desc=true"
      );
      const data = res.body.masksList;
      const expected = [
        {
          name: "AniMask (green) (10 per pack)",
          price: "49.21",
        },
        {
          name: "MaskT (black) (10 per pack)",
          price: "14.90",
        },
        {
          name: "Free to Roam (black) (3 per pack)",
          price: "13.83",
        },
      ];
      expect(data).to.deep.equal(expected);
    });

    it("with right parameter, sort by mask_price", async () => {
      const res = await requester.get(
        "/pharmacy/masksList?pharmacy=Cash%20Saver%20Pharmacy&sortby=mask_price&desc=false"
      );
      const data = res.body.masksList;
      const expected = [
        {
          name: "Free to Roam (black) (3 per pack)",
          price: "13.83",
        },
        {
          name: "MaskT (black) (10 per pack)",
          price: "14.90",
        },
        {
          name: "AniMask (green) (10 per pack)",
          price: "49.21",
        },
      ];
      expect(data).to.deep.equal(expected);
    });

    it("with right parameter, sort by mask_name (desc)", async () => {
      const res = await requester.get(
        "/pharmacy/masksList?pharmacy=Cash%20Saver%20Pharmacy&sortby=mask_name&desc=true"
      );
      const data = res.body.masksList;
      const expected = [
        {
          name: "MaskT (black) (10 per pack)",
          price: "14.90",
        },
        {
          name: "Free to Roam (black) (3 per pack)",
          price: "13.83",
        },
        {
          name: "AniMask (green) (10 per pack)",
          price: "49.21",
        },
      ];
      expect(data).to.deep.equal(expected);
    });

    it("with right parameter, sort by mask_name", async () => {
      const res = await requester.get(
        "/pharmacy/masksList?pharmacy=Cash%20Saver%20Pharmacy&sortby=mask_name&desc=false"
      );
      const data = res.body.masksList;
      const expected = [
        {
          name: "AniMask (green) (10 per pack)",
          price: "49.21",
        },
        {
          name: "Free to Roam (black) (3 per pack)",
          price: "13.83",
        },

        {
          name: "MaskT (black) (10 per pack)",
          price: "14.90",
        },
      ];
      expect(data).to.deep.equal(expected);
    });

    it("with wrong parameter(sort by)", async () => {
      const res = await requester.get(
        "/pharmacy/masksList?pharmacy=Cash%20Saver%20Pharmacy&sortby=name&desc=false"
      );
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal("you key the wrong sortby!");
    });

    it("with wrong parameter(desc)", async () => {
      const res = await requester.get(
        "/pharmacy/masksList?pharmacy=Cash%20Saver%20Pharmacy&sortby=mask_name&desc=desc"
      );
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal("you key the wrong desc status!");
    });

    it("lack parameter", async () => {
      const res = await requester.get("/pharmacy/masksList");
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal(
        "pharmacy, sortby and desc parameters are required!"
      );
    });
  });
  context("get pharmacies by mask price", function () {
    it("with right parameter", async () => {
      const res = await requester.get(
        "/pharmacy/listByPriceRange?min=0&max=10&perPackCountBasis=4&operator=less"
      );
      const data = res.body.pharmaciesList;
      const expected = ["PrecisionMed", "MedSavvy"];
      expect(data).to.deep.equal(expected);
    });
    it("with wrong parameter (max < min)", async () => {
      const res = await requester.get(
        "/pharmacy/listByPriceRange?min=10&max=0&perPackCountBasis=4&operator=less"
      );
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal("you key the wrong paramaters!");
    });
    it("with wrong parameter (per pack count basis < 1)", async () => {
      const res = await requester.get(
        "/pharmacy/listByPriceRange?min=0&max=10&perPackCountBasis=0&operator=less"
      );
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal("you key the wrong paramaters!");
    });
    it("with wrong parameter (wrong operator)", async () => {
      const res = await requester.get(
        "/pharmacy/listByPriceRange?min=0&max=10&perPackCountBasis=4&operator=equal"
      );
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal("you key the wrong operator!");
    });
    it("lack parameters", async () => {
      const res = await requester.get("/pharmacy/listByPriceRange");
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal("you key the wrong paramaters!");
    });
  });
});
