import React from "react";

export interface TabProps {
	title: string;
}

export const Tab = ({ children }: React.PropsWithChildren<TabProps>): React.ReactElement => {
	return <div>{children}</div>;
};