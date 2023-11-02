import React from 'react';
import {GlobeAmericasIcon} from "@heroicons/react/24/solid";

interface Props {
    text: string;
}

const Label: React.FC<Props> = ({text}: Props) => (
    <div className={"flex items-center space-x-1"}>
        <GlobeAmericasIcon className="h-5 w-5 text-white"/>
        <label htmlFor={text.toLowerCase()} className="text-white">{text}</label>
    </div>
)

export default Label;
