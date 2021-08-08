import { ItemAdapterFactory } from "./ItemAdapterFactory";

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
	public static readonly AGED_BRIE = "Aged Brie";
	public static readonly SULFURAS = "Sulfuras, Hand of Ragnaros";
	public static readonly BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";

	private readonly items: Array<Item>;

	public constructor(items = [] as Array<Item>) {
		this.items = items;
	}

	public updateQuality(): Array<Item> {
		return this.items.map((item) => {
			ItemAdapterFactory.createItemAdapter(item)
				.updateState();
			return item;
		});
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
