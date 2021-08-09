import React from "react";
import styled from "styled-components";
import { Item } from "../../model/gilded-rose";
import { DataGraph } from "./DataGraph";
import { DataManagementTab } from "./DataManagementTab";
import { InventoryTab } from "./InventoryTab";
import { Tab, Tabs } from "./Tabs";
import { items as defaultItems } from "../../Data/Items";

interface GildedRoseContext {
	items: Array<Item>;
	setItems: React.Dispatch<React.SetStateAction<Array<Item>>>;
	earnings: number;
	updateEarnings: React.Dispatch<React.SetStateAction<number>>;
}

const GildedRoseContext = React.createContext<GildedRoseContext | null>(null);

interface GildedRoseContextProviderProps {
	items: Array<Item>;
	setItems: React.Dispatch<React.SetStateAction<Array<Item>>>;
	earnings: number;
	updateEarnings: React.Dispatch<React.SetStateAction<number>>;
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
	const [ items, setItems ] = React.useState<Array<Item>>(defaultItems);
	const [ earnings, updateEarnings ] = React.useState<number>(0);

	return <GildedRoseContextProvider items={items} setItems={setItems} earnings={earnings} updateEarnings={updateEarnings} >
		<Pane>
			<Tabs>
				<Tab title="Inventory">
					<InventoryTab />
				</Tab>
				<Tab title="Manage data">
					<DataManagementTab/>
				</Tab>
			</Tabs>
		</Pane>
		<Pane>
			<DataGraph />
		</Pane>
	</GildedRoseContextProvider>;
};

const Pane = styled.div`
	display: flex;
	flex-flow: column;
	background: white;
	padding: 20px;
	flex: 1 1 auto;
	min-height: 500px;
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
	margin: 5px;
	border-radius: 5px;
`;