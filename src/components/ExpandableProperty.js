import * as React from 'react';
import styled from 'styled-components';
import {useState} from "react";

export const PropertyName = styled.div`
  color: #008080;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

export default function ExpandableProperty (props) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <PropertyName onClick={() => setIsOpen(!isOpen)}>
                {props.title}
                {isOpen ? '-' : '+'}
            </PropertyName>
            {isOpen ? React.Children.toArray(props.children) : null}
            {React.Children.count(props.children) === 0 && isOpen ? 'The list is empty!' : null}
        </>
    );
}