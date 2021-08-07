export class Item {
	public name: string;
	public sellIn: number;
	public quality: number;

	public constructor(name: string, sellIn: number, quality: number) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
}

export class GildedRose {
	private readonly items: Array<Item>;

	public constructor(items = [] as Array<Item>) {
		this.items = items;
	}

	public updateQuality(): Array<Item> {
		this.items.forEach((item) => {
			if (item.name !== "Aged Brie" && item.name !== "Backstage passes to a TAFKAL80ETC concert") {
				if (item.quality > 0) {
					if (item.name !== "Sulfuras, Hand of Ragnaros") {
						item.quality = item.quality - 1;
					}
				}
			} else {
				if (item.quality < 50) {
					item.quality = item.quality + 1;
					if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
						if (item.sellIn < 11) {
							if (item.quality < 50) {
								item.quality = item.quality + 1;
							}
						}
						if (item.sellIn < 6) {
							if (item.quality < 50) {
								item.quality = item.quality + 1;
							}
						}
					}
				}
			}
			if (item.name !== "Sulfuras, Hand of Ragnaros") {
				item.sellIn = item.sellIn - 1;
			}
			if (item.sellIn < 0) {
				if (item.name !== "Aged Brie") {
					if (item.name !== "Backstage passes to a TAFKAL80ETC concert") {
						if (item.quality > 0) {
							if (item.name !== "Sulfuras, Hand of Ragnaros") {
								item.quality = item.quality - 1;
							}
						}
					} else {
						item.quality = item.quality - item.quality;
					}
				} else {
					if (item.quality < 50) {
						item.quality = item.quality + 1;
					}
				}
			}
		});

		return this.items;
	}

	public updateQualityForNDays(n: number): Array<Item> {
		let i = 1;
		while (i <= n) {
			const items = this.updateQuality();
			if (i === n) {
				return items;
			}
			i++;
		}
		throw new Error("Expected a return during while-loop");
	}
}
