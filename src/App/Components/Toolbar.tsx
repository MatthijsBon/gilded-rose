import * as React from "react";
import styled from "styled-components";

interface ToolbarProps {
	position: "left" | "right" | "center";
}

export const Toolbar = ({ position, children }: React.PropsWithChildren<ToolbarProps>): React.ReactElement => {
	return (
		<StyledToolbar position={position}>
			{React.Children.map(children, (child, index) => {
				if (!child) {
					return;
				}

				return <StyledToolbarItem key={index}>
					{child}
				</StyledToolbarItem>;
			})}
		</StyledToolbar>
	);
};

export const StyledToolbar = styled.ul`
	display: flex;
	flex: 0 0 auto;
	padding: 0;
	margin: 0;
	margin-bottom: 10px;
	list-style: none;
	justify-content: ${(props: ToolbarProps) => props.position === "right" ? "flex-end" : "center"}
`;

const StyledToolbarItem = styled.li`
	display: flex;
	align-items: center;
	flex: 0 0 auto;
	padding: 0 10px 0 0;
	margin: 0;
`;