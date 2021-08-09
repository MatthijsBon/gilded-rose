import React from "react";
import styled from "styled-components";
import { TabProps } from "./Tab";
import { TabTitle } from "./TabTitle";

interface TabsProps {
	children: React.ReactElement<TabProps>[];
}

export const Tabs = ({ children }: TabsProps): React.ReactElement => {
	const [ selectedTabIndex, setSelectedTabIndex ] = React.useState(0);

	return (
		<TabsContainer>
			<Ul>
				{children.map((item, index) => (
					<TabTitle
						key={index}
						title={item.props.title}
						index={index}
						setSelectedTab={setSelectedTabIndex}
						numTabs={children.length}
						selectedTabIndex={selectedTabIndex}
					/>
				))}
			</Ul>
			<Separator/>
			{children[selectedTabIndex]}
		</TabsContainer>
	);
};

const TabsContainer = styled.div`
	display: flex;
	flex-flow: column;
	flex: 1 1 auto;
	min-height: 500px;
`;

const Ul = styled.ul`
	padding-left: 0;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
`;

const Separator = styled.div`
	width: 100%;
	height: 4px;
	background: #CCCCCC;
	border-radius: 1px;
`;