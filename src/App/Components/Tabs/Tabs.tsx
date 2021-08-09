import React from "react";
import styled from "styled-components";
import { TabProps } from "./Tab";
import { TabTitle } from "./TabTitle";

interface TabsProps {
	children: React.ReactElement<TabProps>[];
}

const TabsRaw = ({ children }: TabsProps): React.ReactElement => {
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
	background: white;
	padding: 50px;
	flex: 1 1 auto;
	min-height: 500px;
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
	border-radius: 5px;
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

export const Tabs = styled(TabsRaw)`
	margin-top: 10px
    color: rgba(0,0,0,0.6)
    display: inline-block
    padding: 10px
    border-bottom: 2px solid rgba(0,0,0,0.2)
    border-radius: 10px 10px 0 0
    cursor: pointer
    &:hover,
    &.active {
      background: none
      border-bottom: 2px solid rgba(0,0,0,0.5)
	}
`;