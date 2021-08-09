import React from "react";
import { Item } from "../../model/gilded-rose";
import { DataManagementTab } from "./DataManagementTab";
import { Tab, Tabs } from "./Tabs";
import { P } from "./Text";

interface GildedRoseContext {
	items: Array<Item>;
	setItems: React.Dispatch<React.SetStateAction<Array<Item>>>;
}

const GildedRoseContext = React.createContext<GildedRoseContext | null>(null);

interface GildedRoseContextProviderProps {
	items: Array<Item>;
	setItems: React.Dispatch<React.SetStateAction<Array<Item>>>;
}

export const GildedRoseContextProvider = ({ children, ...contextValue }: React.PropsWithChildren<GildedRoseContextProviderProps>): React.ReactElement => {
	return <GildedRoseContext.Provider value={contextValue}>
		{children}
	</GildedRoseContext.Provider>;
};

export const useGildedRoseContext = (): GildedRoseContext => {
	const context = React.useContext(GildedRoseContext);
	if (context === null) {
		throw new Error("Context was not provided. Make sure to wrap in ContextProvider");
	}
	return context;
};

export const GildedRose = (): React.ReactElement => {
	const [ items, setItems ] = React.useState<Array<Item>>([]);

	return <GildedRoseContextProvider items={items} setItems={setItems}>
		<Tabs>
			<Tab title="Inventory">
				<P>INVENTORY PLACEHOLDER</P>
			</Tab>
			<Tab title="Manage data">
				<DataManagementTab/>
			</Tab>
		</Tabs>
	</GildedRoseContextProvider>;
};