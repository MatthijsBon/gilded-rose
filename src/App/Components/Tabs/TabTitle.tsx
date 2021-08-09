import React from "react";
import styled from "styled-components";

interface TabTitleProps {
	index: number;
	title: string;
	setSelectedTab: (index: number) => void;
	numTabs: number;
	selectedTabIndex: number;
}

export const TabTitle = ({ title, setSelectedTab, index, selectedTabIndex }: TabTitleProps): React.ReactElement => {

	const tabIsSelected = selectedTabIndex === index;

	const onClick = React.useCallback(() => {
		setSelectedTab(index);
	}, [ setSelectedTab, index ]);

	return <Li>
		<TabTitleAnchor onClick={onClick} tabIsSelected={tabIsSelected}>
			{title}
		</TabTitleAnchor>
	</Li>;
};

const Li = styled.li`
	list-style-type: none;
	box-sizing: border-box;
	flex: 1 1 auto;
	padding: 0 10px;
	text-align: center;
	color: #CCCCCC;
	font-weight: bold;
`;

interface TabTitleAnchorProps {
	tabIsSelected: boolean;
}

const TabTitleAnchor = styled("a")`
	color: ${(props: TabTitleAnchorProps) => props.tabIsSelected ? "#428BFF" : "#CCCCCC"};
	&:hover {
		cursor: pointer;
	}
`;