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

  aReturn[0] = "Welcome to Starbucks SMS.";
  aReturn[1] = "Menu: latte, frappuccino";
  aReturn[2] = "Reply with: latte or frappuccino";

  return aReturn;
}

function choosingItem(sInput) {
  let aReturn = [];

  if (sInput == "latte" || sInput == "frappuccino") {
    sItem = sInput;
    currentState = choosingSize;
    aReturn[0] = "Choose a size: tall or grande";
    return aReturn;
  }

  aReturn[0] = "Please reply: latte or frappuccino";
  return aReturn;
}

function choosingSize(sInput) {
  let aReturn = [];

  if (sInput == "tall" || sInput == "grande") {
    sSize = sInput;
    currentState = choosingMilk;
    aReturn[0] = "Choose milk: whole or oat";
    return aReturn;
  }

  aReturn[0] = "Please reply: tall or grande";
  return aReturn;
}

function choosingMilk(sInput) {
  let aReturn = [];

  if (sInput == "whole" || sInput == "oat") {

    oOrder.aItems[oOrder.aItems.length] = {
      sItem: sItem,
      sSize: sSize,
      sMilk: sInput
    };

    sItem = "";
    sSize = "";

    currentState = anotherItem;
    aReturn[0] = "Added to your order.";
    aReturn[1] = "Another item? (yes/no)";
    return aReturn;
  }

  aReturn[0] = "Please reply: whole or oat";
  return aReturn;
}

function anotherItem(sInput) {
  let aReturn = [];

  if (sInput == "yes") {
    currentState = choosingItem;
    aReturn[0] = "Menu: latte, frappuccino";
    aReturn[1] = "Reply with: latte or frappuccino";
    return aReturn;
  }

  if (sInput == "no") {
    currentState = upsell;
    aReturn[0] = "Add a cakepop? (yes/no)";
    return aReturn;
  }

  aReturn[0] = "Please reply yes or no";
  return aReturn;
}

function upsell(sInput) {
  let aReturn = [];

  if (sInput == "yes") {
    oOrder.bCakePop = true;
    currentState = done;
    aReturn[0] = "Order confirmed.";
    return aReturn;
  }

  if (sInput == "no") {
    oOrder.bCakePop = false;
    currentState = done;
    aReturn[0] = "Order confirmed.";
    return aReturn;
  }

  aReturn[0] = "Please reply yes or no";
  return aReturn;
}

function done() {
  let aReturn = [];
  aReturn[0] = "Order confirmed.";
  return aReturn;
}