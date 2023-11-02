import React from 'react';
import Label from "@components/Label";
import Select from "react-select";

interface Props {
    label: string;
    value: any;
    onChange: (v: any) => void;
    options: any[];
}

const Selector: React.FC<Props> = ({label, value, onChange, options}: Props) => (
    <div className="space-y-2">
        <Label text={label} />
        <Select
            className="text-black"
            value={value}
            onChange={onChange}
            options={options}
        />
    </div>
)

export default Selector;
