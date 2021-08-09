import React from "react";
import styled from "styled-components";
import { H1 } from "./Text";

export const DataGraph = (): React.ReactElement => {
	return <StyledGraph>
		<H1 style={{ color: "#428BFF" }}>Visualisation (WIP)</H1>
	</StyledGraph>;
};

const StyledGraph = styled.div`
	display: flex;
	flex-flow: column;
	flex: 1 1 auto;
	min-height: 500px;
`;