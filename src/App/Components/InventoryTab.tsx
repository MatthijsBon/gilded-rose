import React from "react";
import { GildedRose, Item } from "../../model/gilded-rose";
import { useGildedRoseContext } from "./GildedRose";
import { Table } from "./Table";
import { Toolbar } from "./Toolbar";

export const InventoryTab = (): React.ReactElement => {
	const { items, setItems, earnings, updateEarnings } = useGildedRoseContext();

	const gildedRose = React.useMemo(() => {
		return new GildedRose(items);
	}, [ items ]);

	const columns = React.useMemo(() => {
		return [
			"Item name",
			"Sell in",
			"Quality",
			"Actions",
		];
	}, []);

	const identifiableItems = React.useMemo(() => {
		return items.map((item) => {
			return {
				id: item.name,
				...item,
			};
		});
	}, [ items ]);

	const renderCells = React.useCallback((item: Item) => {
		const sellItem = () => {
			setItems((items) => {
				return items.filter((localItem) => {
					return localItem.name !== item.name;
				});
			});
			updateEarnings((earnings) => {
				return earnings + item.quality;
			});
		};

		return <>
			<td>{item.name}</td>
			<td>{item.sellIn}</td>
			<td>{item.quality}</td>
			<td>
				<button onClick={sellItem}>Sell</button>
			</td>
		</>;
	}, [ setItems, updateEarnings ]);

	const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		const updatedItems = gildedRose.updateQuality();
		setItems(updatedItems);
	}, [ gildedRose, setItems ]);

	return <>
		<Table
			columns={columns}
			data={identifiableItems}
			renderCells={renderCells}
		/>
		<Toolbar position="right">
			<button onClick={handleClick}>Advance one day</button>
		</Toolbar>
		<Toolbar position="right">
			<span>
				Total earnings: {earnings}
			</span>
		</Toolbar>
	</>;
};