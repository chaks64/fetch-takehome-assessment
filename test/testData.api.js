const successReceipt = {
  retailer: "Target",
  purchaseDate: "2022-01-02",
  purchaseTime: "13:13",
  total: "1.25",
  items: [{ shortDescription: "Pepsi - 12-oz", price: "1.25" }],
};

const duplicateReceipt = {
  retailer: "Target",
  purchaseDate: "2022-01-02",
  purchaseTime: "13:13",
  total: "1.25",
  items: [{ shortDescription: "Pepsi - 12-oz", price: "1.25" }],
};

const errorReceipt = {
  retailer: "Target",
  purchaseDate: "2022-01-02",
  purchaseTime: "13:13",
  total: "1.25",
  items: [{ shortDescription: "Pepsi - 12-oz", price: "1.2" }],
};

const validID = "ac08f693-d84f-446e-a71c-4033692804bf";

const inValidID = "1111-1111-1111-1111";

module.exports = {
  successReceipt,
  duplicateReceipt,
  errorReceipt,
  validID,
  inValidID,
};
