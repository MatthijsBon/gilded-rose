import React from "react";
import styled from "styled-components";

interface SimpleInputProps {
	value: string;
	setValue: (value: string) => void;
}

export const SimpleInput = ({ value, setValue }: SimpleInputProps): React.ReactElement => {

	const onChangeHandler = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	}, [ setValue ]);

	return <Input value={value} onChange={onChangeHandler}/>;
};

const Input = styled.input`
	// todo?
`;