let currentState = welcoming;

let oOrder = {
  aItems: [],
  bCakePop: false
};

let sItem = "";
let sSize = "";

export function handleInput(sInput) {
  return currentState(sInput);
}

export function clearInput() {
  currentState = welcoming;
  oOrder = { aItems: [], bCakePop: false };
  sItem = "";
  sSize = "";
}

function welcoming() {
  let aReturn = [];
  currentState = choosingItem;

  aReturn[0] = "Welcome to Starbucks ☕";
  aReturn[1] = "What would you like today?";
  aReturn[2] = "You can order a latte or frappuccino.";

  return aReturn;
}

function choosingItem(sInput) {
  let aReturn = [];

  if (sInput.toLowerCase().includes("latte") || sInput.toLowerCase().includes("frappuccino")) {
    if (sInput.toLowerCase().includes("latte")) {
      sItem = "latte";
    } else {
      sItem = "frappuccino";
    }

    currentState = choosingSize;
    aReturn[0] = "Nice choice! What size would you like: tall or grande?";
    return aReturn;
  }

  aReturn[0] = "I didn’t catch that. You can order a latte or frappuccino.";
  return aReturn;
}

function choosingSize(sInput) {
  let aReturn = [];

  if (sInput.toLowerCase().includes("tall") || sInput.toLowerCase().includes("grande")) {
    if (sInput.toLowerCase().includes("tall")) {
      sSize = "tall";
    } else {
      sSize = "grande";
    }

    currentState = choosingMilk;
    aReturn[0] = "Got it. What kind of milk would you like: whole or oat?";
    return aReturn;
  }

  aReturn[0] = "Please choose a size: tall or grande.";
  return aReturn;
}

function choosingMilk(sInput) {
  let aReturn = [];

  if (sInput.toLowerCase().includes("whole") || sInput.toLowerCase().includes("oat")) {
    let sMilk = "";

    if (sInput.toLowerCase().includes("whole")) {
      sMilk = "whole";
    } else {
      sMilk = "oat";
    }

    oOrder.aItems[oOrder.aItems.length] = {
      sItem: sItem,
      sSize: sSize,
      sMilk: sMilk
    };

    sItem = "";
    sSize = "";

    currentState = anotherItem;
    aReturn[0] = "Perfect — I added that to your order.";
    aReturn[1] = "Would you like to add another item? (yes/no)";
    return aReturn;
  }

  aReturn[0] = "Please choose a milk option: whole or oat.";
  return aReturn;
}

function anotherItem(sInput) {
  let aReturn = [];

  if (sInput.toLowerCase().includes("yes")) {
    currentState = choosingItem;
    aReturn[0] = "Sure! You can order a latte or frappuccino.";
    return aReturn;
  }

  if (sInput.toLowerCase().includes("no")) {
    currentState = upsell;
    aReturn[0] = "Would you like to add a cake pop? (yes/no)";
    return aReturn;
  }

  aReturn[0] = "Please reply yes or no.";
  return aReturn;
}

function upsell(sInput) {
  let aReturn = [];

  if (sInput.toLowerCase().includes("yes")) {
    oOrder.bCakePop = true;
    currentState = done;
    aReturn[0] = "Perfect! Your order is confirmed, and I added a cake pop!";
    return aReturn;
  }

  if (sInput.toLowerCase().includes("no")) {
    oOrder.bCakePop = false;
    currentState = done;
    aReturn[0] = "Perfect! Your Starbucks order is confirmed. It will be ready shortly";
    return aReturn;
  }

  aReturn[0] = "Please reply yes or no.";
  return aReturn;
}

function done() {
  let aReturn = [];
  aReturn[0] = "Your order is confirmed. Thanks for ordering with Starbucks!";
  return aReturn;
}