import { handleInput, clearInput } from "../starbucksOrder.js";

describe("Tests all stages of an order", function () {

  beforeEach(function () {
    clearInput();
  });

  it("test hello", function () {
    const aResults = handleInput("hello");
    expect(aResults[0]).toBe("Welcome to Starbucks SMS.");
  });

  it("test basic order for an item", function () {
    handleInput("hello");
    handleInput("latte");
    handleInput("tall");
    const aResults = handleInput("oat");
    expect(aResults[0]).toBe("Added to your order.");
    expect(aResults[1]).toBe("Another item? (yes/no)");
  });

  it("test 2nd item", function () {
    handleInput("hello");
    handleInput("latte");
    handleInput("tall");
    handleInput("whole");

    const aResults = handleInput("yes");
    expect(aResults[0]).toBe("Menu: latte, frappuccino");
    expect(aResults[1]).toBe("Reply with: latte or frappuccino");
  });

  it("test another item flow", function () {
    handleInput("hello");
    handleInput("latte");
    handleInput("tall");
    handleInput("whole");
    handleInput("yes");

    handleInput("frappuccino");
    handleInput("grande");
    handleInput("oat");

    const aResults = handleInput("yes");
    expect(aResults[0]).toBe("Menu: latte, frappuccino");
  });

  it("test upsell yes", function () {
    handleInput("hello");
    handleInput("latte");
    handleInput("tall");
    handleInput("whole");

    handleInput("no");
    const aResults = handleInput("yes");
    expect(aResults[0]).toBe("Order confirmed.");
  });

  it("test upsell no", function () {
    handleInput("hello");
    handleInput("frappuccino");
    handleInput("tall");
    handleInput("oat");

    handleInput("no");
    const aResults = handleInput("no");
    expect(aResults[0]).toBe("Order confirmed.");
  });

});

