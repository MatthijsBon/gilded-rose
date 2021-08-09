import React from "react";

interface TabsProps {
	children: React.ReactElement<TabProps>[];
}

export const Tabs = ({ children }: TabsProps): React.ReactElement => {
	const [ selectedTab, setSelectedTab ] = React.useState(0);

	return (
		<div>
			<ul>
				{children.map((item, index) => (
					<TabTitle
						key={index}
						title={item.props.title}
						index={index}
						setSelectedTab={setSelectedTab}
					/>
				))}
			</ul>
			{children[selectedTab]}
		</div>
	);
};

interface TabProps {
	title: string;
}

export const Tab = ({ children }: React.PropsWithChildren<TabProps>): React.ReactElement => {
	return <div>{children}</div>;
};

interface TabTitleProps {
	index: number;
	title: string;
	setSelectedTab: (index: number) => void;
}

const TabTitle = ({ title, setSelectedTab, index }: TabTitleProps): React.ReactElement => {

	const onClick = React.useCallback(() => {
		setSelectedTab(index);
	}, [ setSelectedTab, index ]);

	return (
		<li>
			<button onClick={onClick}>{title}</button>
		</li>
	);
};