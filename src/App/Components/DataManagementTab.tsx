import React from "react";
import { Item } from "../../model/gilded-rose";
import { useGildedRoseContext } from "./GildedRose";
import { SimpleInput } from "./SimpleInput";
import { Table } from "./Table";

export const DataManagementTab = (): React.ReactElement => {

	const { items, setItems } = useGildedRoseContext();

	const columns = React.useMemo(() => {
		return [
			"Item name",
			"Sell in",
			"Quality",
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
		return <>
			<td>{item.name}</td>
			<td>{item.sellIn}</td>
			<td>{item.quality}</td>
		</>;
	}, []);

	const addItem = React.useCallback((name: string, sellIn: number, quality: number) => {
		setItems((items) => {
			return [ ...items, {
				name: name,
				sellIn: sellIn,
				quality: quality,
			} ];
		});
	}, [ setItems ]);

	const renderCreatorRow = React.useCallback(() => {
		return <NewItemCreator addItem={addItem}/>;
	}, [ addItem ]);

	return <div>
		<Table
			columns={columns}
			data={identifiableItems}
			renderCells={renderCells}
			enableNewEntries={true}
			renderCreatorRow={renderCreatorRow}
		/>
	</div>;
};

interface NewItemCreatorProps {
	addItem: (name: string, sellIn: number, quality: number) => void;
}

interface NewItem {
	name: string;
	sellIn: string;
	quality: string;
}

const NewItemCreator = ({ addItem }: NewItemCreatorProps) => {
	const [ item, setItem ] = React.useState<NewItem | null>(null);

	const setName = React.useCallback((name: string) => {
		setItem((item) => {
			return {
				name: name,
				sellIn: item?.sellIn ?? "",
				quality: item?.quality ?? "",
			};
		});
	}, [ setItem ]);

	const setSellIn = React.useCallback((sellIn: string) => {
		setItem((item) => {
			return {
				name: item?.name ?? "",
				sellIn: sellIn,
				quality: item?.quality ?? "",
			};
		});
	}, [ setItem ]);

	const setQuality = React.useCallback((quality: string) => {
		setItem((item) => {
			return {
				name: item?.name ?? "",
				sellIn: item?.sellIn ?? "",
				quality: quality,
			};
		});
	}, [ setItem ]);

	const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		if (item?.name && item.sellIn && item.quality) {
			const parsedSellIn = parseFloat(item.sellIn);
			const parsedQuality = parseFloat(item.quality);
			if (isNaN(parsedSellIn) || isNaN(parsedQuality)) {
				alert("SellIn or Quality is not a number");
			} else {
				addItem(item.name, parsedSellIn, parsedQuality);
				setItem(null);
			}
		}
	}, [ item, addItem ]);

	return <>
		<td>
			<SimpleInput value={item?.name ?? ""} setValue={setName} />
		</td>
		<td>
			<SimpleInput value={item?.sellIn.toString() ?? ""} setValue={setSellIn} />
		</td>
		<td>
			<SimpleInput value={item?.quality.toString() ?? ""} setValue={setQuality} />
		</td>
		<td>
			<button onClick={handleClick}>Add item</button>
		</td>
	</>;
};