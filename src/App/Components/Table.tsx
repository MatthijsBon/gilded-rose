import React from "react";
import styled from "styled-components";

interface Identifiable {
	id: string;
}

interface TableWithNewEntriesCreatorRowProps<I extends Identifiable> {
	enableNewEntries: true;
	renderCreatorRow: () => React.ReactNode;
}

interface DefaultTableProps {
	enableNewEntries: false;
}

interface CommonTableProps<I extends Identifiable> {
	columns: string[];
	data: I[];
	renderCells: (item: I) => React.ReactNode;
}

type TableProps<I extends Identifiable> = CommonTableProps<I> & (DefaultTableProps | TableWithNewEntriesCreatorRowProps<I>);

export const Table = <I extends Identifiable>({ columns, ...additionalProps }: TableProps<I>): React.ReactElement => {
	return <TableContainer>
		<TableWrapper className="table custom-table">
			<TableHeader columns={columns} />
			<TableBody {...additionalProps} />
		</TableWrapper>
	</TableContainer>;
};

const TableContainer = styled.div`
	display: block;
	width: 100%;
	overflow-x: auto;
`;

const TableWrapper = styled.table`
	border-collapse: collapse;
	width: 100%;
	margin-bottom: 1rem;
	color: #212529;
`;

interface TableHeaderProps {
	columns: string[];
}

const TableHeader = ({ columns }: TableHeaderProps) => {
	return <thead>
		<tr>
			{columns.map((columnName) => {
				return <th key={columnName} scope="col">{columnName}</th>;
			})}
		</tr>
	</thead>;
};

interface CommonTableBodyProps<I extends Identifiable> {
	data: I[];
	renderCells: (item: I) => React.ReactNode;
}

interface TableBodyWithNewEntriesCreatorRowProps<I extends Identifiable> {
	enableNewEntries: true;
	renderCreatorRow: () => React.ReactNode;
}

interface DefaultTableBodyProps {
	enableNewEntries: false;
}

type TableBodyProps<I extends Identifiable> = CommonTableBodyProps<I> & (DefaultTableBodyProps | TableBodyWithNewEntriesCreatorRowProps<I>);

const TableBody = <I extends Identifiable>({ data, renderCells, ...enableNewEntriesProps }: TableBodyProps<I>) => {
	return <tbody>
		{data.map((item) => {
			return <tr key={item.id}>
				{renderCells(item)}
			</tr>;
		})}
		{enableNewEntriesProps.enableNewEntries && <tr>
			{enableNewEntriesProps.renderCreatorRow()}
		</tr>}
	</tbody>;
};