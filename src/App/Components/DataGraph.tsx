import * as d3 from "d3";
import React from "react";
import styled from "styled-components";
import { GildedRose } from "../../model/gilded-rose";
import { useGildedRoseContext } from "./GildedRose";
import { H1 } from "./Text";

const margin = { top: 60, right: 230, bottom: 50, left: 50 };
const width = 660 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

interface DataEntry {
	itemName: string;
	quality: number;
}

interface D3ContainerProps {
	data: DataEntry[];
}

const D3Container = ({ data }: D3ContainerProps) => {
	const d3ContainerRef = React.useRef<SVGSVGElement | null>(null);

	React.useEffect(() => {
		if (d3ContainerRef.current) {
			const x = d3.scaleLinear()
				.domain([ 0, 100 ])
				.range([ 0, width ]);

			const y = d3.scaleBand()
				.range([ 0, height ])
				.domain(data.map((item) => item.itemName))
				.padding(.1);

			const svg = d3.select(d3ContainerRef.current)
				.append("g")
				.attr("transform",
					`translate(${margin.left}, ${margin.top})`);

			svg.append("g")
				.attr("transform", `translate(0, ${height})`)
				.call(d3.axisBottom(x))
				.selectAll("text")
				.attr("transform", "translate(-10,0)rotate(-45)")
				.style("text-anchor", "end");

			svg.append("g")
				.call(d3.axisLeft(y));

			svg.selectAll("myRect")
				.data(data)
				.enter()
				.append("rect")
				.attr("x", x(0))
				.attr("y", (d) => y(d.itemName) ?? -1)
				.attr("width", (d) => x(d.quality))
				.attr("height", y.bandwidth())
				.attr("fill", "#69b3a2");

			return () => {
				svg.remove();
			};

		}
	}, [ data ]);

	return <SVGContainer
		id="d3-container"
		width="100%"
		height="400px"
		ref={d3ContainerRef}
	/>;
};

const SVGContainer = styled.svg`
	min-width: 500px;
	margin-left: 100px;
`;

function updateOrSetCategoryQuality(categorized: Record<string, number>, name: string, quality: number): Record<string, number> {
	if (categorized[name]) {
		categorized[name] += quality;
	} else {
		categorized[name] = quality;
	}
	return categorized;
}

export const DataGraph = (): React.ReactElement => {
	const { items } = useGildedRoseContext();

	const itemQualities = React.useMemo(() => {
		const index = items.reduce((categorized: Record<string, number>, item) => {
			switch (item.name) {
				case GildedRose.AGED_BRIE:
				case GildedRose.SULFURAS:
				case GildedRose.BACKSTAGE_PASSES:
				case GildedRose.CONJURED:
					return updateOrSetCategoryQuality(categorized, item.name, item.quality);
				default:
					return updateOrSetCategoryQuality(categorized, "Other", item.quality);
			}
		}, {});

		return Object.keys(index).map((itemName) => {
			const quality = index[itemName];
			return {
				itemName: itemName,
				quality: quality,
			};
		});
	}, [ items ]);

	return <StyledGraph>
		<H1 style={{ color: "#428BFF" }}>Visualisation</H1>
		<D3Container data={itemQualities} />
	</StyledGraph>;
};

const StyledGraph = styled.div`
	display: flex;
	flex-flow: column;
	flex: 1 1 auto;
	min-height: 500px;
`;