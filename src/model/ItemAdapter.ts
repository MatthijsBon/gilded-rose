import { Item } from "./gilded-rose";

export interface ItemAdapter {
	updateState: () => void;
}

abstract class AbstractItemAdapter implements ItemAdapter {

	abstract updateState(): void;

	public constructor(protected item: Item) {
	}

	protected increaseQuality(n: number = 1): number {
		// Quality can never be greater than 50
		return Math.min(50, this.item.quality + n);
	}

	protected decreaseQuality(n: number = 1): number {
		// Quality can never be less than 0
		return Math.max(0, this.item.quality - n);
	}

}

export class OrdinaryItemAdapter extends AbstractItemAdapter {

	public updateState(): void {
		this.item.quality = this.decreaseQuality();
		this.item.sellIn--;
		if (this.item.sellIn < 0) {
			this.item.quality = this.decreaseQuality();
		}
	}
}

export class AgingItemAdapter extends AbstractItemAdapter {

	public updateState(): void {
		this.item.quality = this.increaseQuality();
		this.item.sellIn--;
	}
}

export class BackstagePassItemAdapter extends AbstractItemAdapter {

	public updateState(): void {
		if (this.item.sellIn > 0) {
			const n = this.item.sellIn < 6 ? 3 : this.item.sellIn < 11 ? 2 : 1;
			this.item.quality = this.increaseQuality(n);
		}
		this.item.sellIn--;
		if (this.item.sellIn < 0) {
			this.item.quality = 0;
		}
	}
}

export class SulfurasItemAdapter extends AbstractItemAdapter {
	public updateState(): void {
		// Sulfuras items never change state
	}
}

export class ConjuredItemAdapter extends AbstractItemAdapter {

	public updateState(): void {
		this.item.quality = this.decreaseQuality(2);
		this.item.sellIn--;
	}
}