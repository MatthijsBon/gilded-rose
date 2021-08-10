import { expect } from "chai";
import { GildedRose, Item } from "../src/model/gilded-rose";
import { GildedRose as GildedRoseOriginal } from "../src/model/gilded-rose__original__";

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

	it("should decrease ordinary items with 2 quality and 1 day after sell date", function () {
		const gildedRose = new GildedRose([ new Item("Foo", 0, 10) ]);
		let items = gildedRose.updateQuality();
		expect(items[0].sellIn).to.equal(-1);
		expect(items[0].quality).to.equal(8);
		items = gildedRose.updateQuality();
		expect(items[0].sellIn).to.equal(-2);
		expect(items[0].quality).to.equal(6);
	});

	it("should decrease ordinary items but quality may never be negative", function () {
		const gildedRose = new GildedRose([ new Item("Foo", 0, 3) ]);
		let items = gildedRose.updateQuality();
		expect(items[0].sellIn).to.equal(-1);
		expect(items[0].quality).to.equal(1);
		items = gildedRose.updateQuality();
		expect(items[0].sellIn).to.equal(-2);
		expect(items[0].quality).to.equal(0);
	});

	it("should increase quality of 'Aged Brie'", function () {
		const gildedRose = new GildedRose([ new Item("Aged Brie", 5, 0) ]);
		let items = gildedRose.updateQuality();
		expect(items[0].sellIn).to.equal(4);
		expect(items[0].quality).to.equal(1);
		items = gildedRose.updateQuality();
		expect(items[0].sellIn).to.equal(3);
		expect(items[0].quality).to.equal(2);
	});

	it("should increase quality of items to a maximum of 50", function () {
		const gildedRose = new GildedRose([ new Item("Aged Brie", 60, 0) ]);
		const items = gildedRose.updateQualityForNDays(60);
		expect(items[0].sellIn).to.equal(0);
		expect(items[0].quality).to.equal(50);
	});

	it("should never decrease quality of 'Sulfuras' item", function () {
		const gildedRose = new GildedRose([ new Item("Sulfuras, Hand of Ragnaros", -1, 80) ]);
		const items = gildedRose.updateQualityForNDays(5);
		expect(items[0].sellIn).to.equal(-1);
		expect(items[0].quality).to.equal(80);
	});

	it("should increase quality by 1 for backstage passes when concert is in more than 10 days", function () {
		const gildedRose = new GildedRose([ new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10) ]);
		const updatedItems = gildedRose.updateQuality();
		expect(updatedItems[0].quality).to.equal(11);
	});

	it("should increase quality by 2 for backstage passes when concert is in 6 - 10 days", function () {
		const gildedRose = new GildedRose([
			new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
			new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10),
		]);
		const items = gildedRose.updateQuality();
		const upperBoundItem = items[0];
		expect(upperBoundItem.quality).to.equal(12);
		const lowerBoundItem = items[1];
		expect(lowerBoundItem.quality).to.equal(12);
	});

	it("should increase quality by 3 for backstage passes when concert is in 5 or less days", function () {
		const gildedRose = new GildedRose([
			new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
			new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
		]);
		const items = gildedRose.updateQuality();
		const upperBoundItem = items[0];
		expect(upperBoundItem.quality).to.equal(13);
		const lowerBoundItem = items[1];
		expect(lowerBoundItem.quality).to.equal(13);
	});

	it("should set quality to 0 for backstage passes after the concert", function () {
		const gildedRose = new GildedRose([ new Item("Backstage passes to a TAFKAL80ETC concert", -1, 10) ]);
		const updatedItems = gildedRose.updateQuality();
		expect(updatedItems[0].quality).to.equal(0);
	});

	it("should decrease quality of 'Conjured' items twice as fast", function () {
		const gildedRose = new GildedRose([ new Item("Conjured", 15, 10) ]);
		const items = gildedRose.updateQualityForNDays(5);
		expect(items[0].sellIn).to.equal(10);
		expect(items[0].quality).to.equal(0);
	});

});

describe("Gilded Rose (Original)", function () {

	it("should decrease ordinary items with 1 quality and 1 day after each update", function () {
		let sellIn = 5, quality = 10;
		const gildedRose = new GildedRoseOriginal([ new Item("Foo", sellIn, quality) ]);
		for (let i = 0; i <= sellIn; i++) {
			const items = gildedRose.updateQuality();
			expect(items[0].sellIn).to.equal(sellIn - 1);
			expect(items[0].quality).to.equal(quality - 1);
			sellIn--;
			quality--;
		}
	});

	it("should decrease ordinary items with 2 quality and 1 day after sell date", function () {
		const gildedRose = new GildedRoseOriginal([ new Item("Foo", 0, 10) ]);
		let items = gildedRose.updateQuality();
		expect(items[0].sellIn).to.equal(-1);
		expect(items[0].quality).to.equal(8);
		items = gildedRose.updateQuality();
		expect(items[0].sellIn).to.equal(-2);
		expect(items[0].quality).to.equal(6);
	});

	it("should decrease ordinary items but quality may never be negative", function () {
		const gildedRose = new GildedRoseOriginal([ new Item("Foo", 0, 3) ]);
		let items = gildedRose.updateQuality();
		expect(items[0].sellIn).to.equal(-1);
		expect(items[0].quality).to.equal(1);
		items = gildedRose.updateQuality();
		expect(items[0].sellIn).to.equal(-2);
		expect(items[0].quality).to.equal(0);
	});

	it("should increase quality of 'Aged Brie'", function () {
		const gildedRose = new GildedRoseOriginal([ new Item("Aged Brie", 5, 0) ]);
		let items = gildedRose.updateQuality();
		expect(items[0].sellIn).to.equal(4);
		expect(items[0].quality).to.equal(1);
		items = gildedRose.updateQuality();
		expect(items[0].sellIn).to.equal(3);
		expect(items[0].quality).to.equal(2);
	});

	it("should increase quality of items to a maximum of 50", function () {
		const gildedRose = new GildedRoseOriginal([ new Item("Aged Brie", 60, 0) ]);
		const items = gildedRose.updateQualityForNDays(60);
		expect(items[0].sellIn).to.equal(0);
		expect(items[0].quality).to.equal(50);
	});

	it("should never decrease quality of 'Sulfuras' item", function () {
		const gildedRose = new GildedRoseOriginal([ new Item("Sulfuras, Hand of Ragnaros", -1, 80) ]);
		const items = gildedRose.updateQualityForNDays(5);
		expect(items[0].sellIn).to.equal(-1);
		expect(items[0].quality).to.equal(80);
	});

	it("should increase quality by 1 for backstage passes when concert is in more than 10 days", function () {
		const gildedRose = new GildedRoseOriginal([ new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10) ]);
		const updatedItems = gildedRose.updateQuality();
		expect(updatedItems[0].quality).to.equal(11);
	});

	it("should increase quality by 2 for backstage passes when concert is in 6 - 10 days", function () {
		const gildedRose = new GildedRoseOriginal([
			new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
			new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10),
		]);
		const items = gildedRose.updateQuality();
		const upperBoundItem = items[0];
		expect(upperBoundItem.quality).to.equal(12);
		const lowerBoundItem = items[1];
		expect(lowerBoundItem.quality).to.equal(12);
	});

	it("should increase quality by 3 for backstage passes when concert is in 5 or less days", function () {
		const gildedRose = new GildedRoseOriginal([
			new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
			new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10),
		]);
		const items = gildedRose.updateQuality();
		const upperBoundItem = items[0];
		expect(upperBoundItem.quality).to.equal(13);
		const lowerBoundItem = items[1];
		expect(lowerBoundItem.quality).to.equal(13);
	});

	it("should set quality to 0 for backstage passes **immediately** after the concert", function () {
		const gildedRose = new GildedRoseOriginal([
			new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
		]);
		const items = gildedRose.updateQuality();
		expect(items[0].quality).to.equal(0);
	});

	it("should set quality to 0 for backstage passes after the concert", function () {
		const gildedRose = new GildedRoseOriginal([ new Item("Backstage passes to a TAFKAL80ETC concert", -1, 10) ]);
		const updatedItems = gildedRose.updateQuality();
		expect(updatedItems[0].quality).to.equal(0);
	});

	it("should decrease quality of 'Conjured' items twice as fast", function () {
		// Expect failure here.
		const gildedRose = new GildedRoseOriginal([ new Item("Conjured", 15, 10) ]);
		const items = gildedRose.updateQualityForNDays(5);
		expect(items[0].sellIn).to.equal(10);
		expect(items[0].quality).to.equal(0);
	});

});
