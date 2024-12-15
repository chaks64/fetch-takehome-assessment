/* -------Validate overal receipt------- */
const config = require('../config.json');
const requiredProperties = config.validation.requiredProperties
const requiredItemProperties = config.validation.requiredItemProperties
const regexPatterns = config.regexPatterns

function validateReceipt(receipt) {
  // Validate required properties
  for (const property of requiredProperties) {
    if (!receipt.hasOwnProperty(property)) {
      return false;
    }
  }
  // Validate retailer property
  if (
    typeof receipt.retailer !== "string" ||
    !receipt.retailer.match(regexPatterns.retailer)
  ) {
    return false;
  }
  // Validate purchaseDate property
  if (
    typeof receipt.purchaseDate !== "string" ||
    !receipt.purchaseDate.match(regexPatterns.date)
    // !regexPatterns.date.test(receipt.purchaseDate)
  ) {
    return false;
  }
  // Validate purchaseTime property
  if (
    typeof receipt.purchaseTime !== "string" ||
    !receipt.purchaseTime.match(regexPatterns.time)
  ) {
    return false;
  }
  // Validate items property
  if (!Array.isArray(receipt.items) || receipt.items.length < 1) {
    return false;
  }
  // Validate each item in the items array
  for (const item of receipt.items) {
    if (!validateItem(item)) {
      return false;
    }
  }
  // Validate total property
  if (
    typeof receipt.total !== "string" ||
    !receipt.total.match(regexPatterns.price)
  ) {
    return false;
  }
  return true;
}

/* -------Validate individual item------- */
function validateItem(item) {
  // Validate required properties
  for (const property of requiredItemProperties) {
    if (!item.hasOwnProperty(property)) {
      return false;
    }
  }
  // Validate shortDescription property
  if (
    typeof item.shortDescription !== "string" ||
    !item.shortDescription.match(regexPatterns.shortDesc)
  ) {
    return false;
  }
  // Validate price property
  if (typeof item.price !== "string" ||
    !item.price.match(regexPatterns.price)
  ) {
    return false;
  }
  return true;
}

module.exports = { validateReceipt };
