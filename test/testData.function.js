const successReceipt = {
  retailer: "Target",
  purchaseDate: "2022-01-02",
  purchaseTime: "13:13",
  total: "1.25",
  items: [{ shortDescription: "Pepsi - 12-oz", price: "1.25" }],
};

const missingProperty = {
  retailer: "Target",
  purchaseDate: "2022-01-02",
  total: "1.25",
  items: [{ shortDescription: "Pepsi - 12-oz", price: "1.25" }],
};

const errorRetailerName = {
  retailer: "!@#$",
  purchaseDate: "2022-01-02",
  purchaseTime: "13:13",
  total: "1.25",
  items: [{ shortDescription: "Pepsi - 12-oz", price: "1.25" }],
};

const errorDateProperty = {
  retailer: "Target",
  purchaseDate: "02-01-2022",
  purchaseTime: "13:13",
  total: "1.25",
  items: [{ shortDescription: "Pepsi - 12-oz", price: "1.25" }],
};

const errorTimeProperty = {
  retailer: "Target",
  purchaseDate: "2022-01-02",
  purchaseTime: "1:13",
  total: "1.25",
  items: [{ shortDescription: "Pepsi - 12-oz", price: "1.25" }],
};

const errorItems = {
  retailer: "Target",
  purchaseDate: "2022-01-02",
  purchaseTime: "1:13",
  total: "1.25",
  items: [{ shortDescription: "!@$ - 12-oz", price: "1.5" }],
};

const errorTotal = {
  retailer: "Target",
  purchaseDate: "2022-01-02",
  purchaseTime: "1:13",
  total: "1.5",
  items: [{ shortDescription: "Pepsi - 12-oz", price: "1.25" }],
};

const successReceipt2 = {
  "retailer": "M&M Corner Market",
  "purchaseDate": "2022-03-20",
  "purchaseTime": "14:33",
  "items": [
    {
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    }
  ],
  "total": "9.00"
}

module.exports = {
  successReceipt,
  missingProperty,
  errorRetailerName,
  errorDateProperty,
  errorTimeProperty,
  errorItems,
  errorTotal,
  successReceipt2
};
