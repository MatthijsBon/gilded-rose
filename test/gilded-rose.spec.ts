import { expect } from "chai";
import { GildedRose, Item } from "../app/gilded-rose";

describe("Gilded Rose", function () {

	it("should decrease ordinary items with 1 quality and 1 day after each update", function () {
		let sellIn = 5, quality = 10;
		const gildedRose = new GildedRose([ new Item("Foo", sellIn, quality) ]);
		for (let i = 0; i <= sellIn; i++) {
			const items = gildedRose.updateQuality();
			expect(items[0].sellIn).to.equal(sellIn - 1);
			expect(items[0].quality).to.equal(quality - 1);
			sellIn--;
			quality--;
		}
	});

});
