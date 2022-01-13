const { expect, requester } = require("./set_up");

describe("search", function () {
  context("get search result", function () {
    it("with right parameters", async () => {
      const res = await requester.get("/search?keyword=m");

      const data = res.body.searchResult;
      const expected = {
        pharmacy: [{ pharmacyId: 4, pharmacyName: "MedSavvy" }],
        mask: [
          {
            pharmacyMaskId: 2,
            pharmacyName: "Cash Saver Pharmacy",
            maskName: "MaskT (black) (10 per_pack_count)",
            maskPrice: "14.90",
          },
          {
            pharmacyMaskId: 10,
            pharmacyName: "MedSavvy",
            maskName: "MaskT (black) (3 per_pack_count)",
            maskPrice: "4.14",
          },
          {
            pharmacyMaskId: 11,
            pharmacyName: "Pill Pack",
            maskName: "MaskT (green) (10 per_pack_count)",
            maskPrice: "32.57",
          },
          {
            pharmacyMaskId: 8,
            pharmacyName: "MedSavvy",
            maskName: "Masquerade (black) (10 per_pack_count)",
            maskPrice: "19.17",
          },
          {
            pharmacyMaskId: 7,
            pharmacyName: "PrecisionMed",
            maskName: "Masquerade (black) (3 per_pack_count)",
            maskPrice: "8.17",
          },
        ],
      };
      expect(data).to.deep.equal(expected);
    });
    it("lack keyword", async () => {
      const res = await requester.get("/search");
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal("keyword is required!");
    });
  });
});
