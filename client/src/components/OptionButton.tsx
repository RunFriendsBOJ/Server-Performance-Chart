import { useState } from "react";
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { onChangeFunc } from "../types/eventHandler";


interface Prop {
    options: {name: string, value: string}[]
    selectedValue: string
    onChange: onChangeFunc
}


export default function OptionButton({ options, selectedValue, onChange } : Prop) {

    return (
        <ButtonGroup toggle>
            {options.map((option, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={option.value}
                    checked={selectedValue === option.value}
                    onChange={onChange}
                >
                    {option.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    );
}