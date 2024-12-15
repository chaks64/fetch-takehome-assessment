const config = require('../config.json');
const pointsMultiplier = config.pointsMultiplier

function pointsCalculator(receipt) {
    let points = 0;
  
    // One point for every alphanumeric character in the retailer name
    const retailerPoints = receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;
    points += retailerPoints * pointsMultiplier.retailerName;
  
    // 50 points if the total is a round dollar amount with no cents
    if (Number.isInteger(parseFloat(receipt.total))) {
      points += pointsMultiplier.totalRound;
    }
  
    // 25 points if the total is a multiple of 0.25
    if (parseFloat(receipt.total) % 0.25 === 0) {
      points += pointsMultiplier.totalMultiple;
    }
  
    // 5 points for every two items on the receipt
    const itemPoints = Math.floor(receipt.items.length / 2) * pointsMultiplier.itemPoints;
    points += itemPoints;
  
    // Calculate points based on item description length and price
    receipt.items.forEach((item) => {
      const trimmedLength = item.shortDescription.trim().length;
      if (trimmedLength % 3 === 0) {
        const itemPoints = Math.ceil(parseFloat(item.price) * pointsMultiplier.itemDesc);
        points += itemPoints;
      }
    });
  
    // 6 points if the day in the purchase date is odd
    const purchaseDate = new Date(receipt.purchaseDate);
    if (purchaseDate.getDate() % 2 !== 0) {
      points += pointsMultiplier.purchaseDate;
    }
  
    // 10 points if the time of purchase is after 2:00pm and before 4:00pm
    const purchaseTime = new Date(`1970-01-01T${receipt.purchaseTime}`);
    const start = new Date(`1970-01-01T14:00`);
    const end = new Date(`1970-01-01T16:00`);
    if (purchaseTime > start && purchaseTime < end) {
      points += pointsMultiplier.timeInterval;
    }
  
    return points;
  }

module.exports = {pointsCalculator}