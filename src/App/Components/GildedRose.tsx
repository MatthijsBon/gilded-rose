import React from "react";
import { Item } from "../../model/gilded-rose";
import { Tab, Tabs } from "./Tabs";

interface GildedRoseContext {
	items: Array<Item>;
	setItems: (items: Array<Item>) => void;
}

const GildedRoseContext = React.createContext<GildedRoseContext | null>(null);

interface GildedRoseContextProviderProps {
	items: Array<Item>;
	setItems: (items: Array<Item>) => void;
}

export const GildedRoseContextProvider = ({ children, ...contextValue }: React.PropsWithChildren<GildedRoseContextProviderProps>): React.ReactElement => {
	return <GildedRoseContext.Provider value={contextValue}>
		{children}
	</GildedRoseContext.Provider>;
};

export const GildedRose = (): React.ReactElement => {
	const [ items, setItems ] = React.useState<Array<Item>>([]);

	return <GildedRoseContextProvider items={items} setItems={setItems}>
		<Tabs>
			<Tab title="Inventory">
				<p className="primary">
					INVENTORY PLACEHOLDER
				</p>
			</Tab>
			<Tab title="Manage data">
				<p className="primary">
					MANAGE DATA PLACEHOLDER
				</p>
			</Tab>
		</Tabs>
	</GildedRoseContextProvider>;
};