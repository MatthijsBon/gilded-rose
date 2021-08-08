import { GildedRose, Item } from "./gilded-rose";
import {
	AgingItemAdapter,
	BackstagePassItemAdapter,
	ItemAdapter,
	OrdinaryItemAdapter,
	SulfurasItemAdapter,
} from "./ItemAdapter";

export class ItemAdapterFactory {

	public static createItemAdapter(item: Item): ItemAdapter {
		switch (item.name) {
			case GildedRose.AGED_BRIE:
				return new AgingItemAdapter(item);
			case GildedRose.SULFURAS:
				return new SulfurasItemAdapter(item);
			case GildedRose.BACKSTAGE_PASSES:
				return new BackstagePassItemAdapter(item);
			default:
				return new OrdinaryItemAdapter(item);
		}
	}
}