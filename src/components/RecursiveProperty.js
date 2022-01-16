import styled from 'styled-components';
import ExpandableProperty from "./ExpandableProperty";
const camelCaseToNormal = str => str.replace(/([A-Z])/g, ' $1').replace(/^./, str2 => str2.toUpperCase());
const RecursivePropertyContainer = styled.div`
  padding-top: 10px;
  padding-left: 3px;
  margin-left: 10px;
  ${(props) =>
    props.excludeBottomBorder ? '' : 'border-bottom: 1px solid #b2d6ff;'}
  color: #666;    
  font-size: 16px;
`;

export const PropertyName = styled.span`
  color: black;
  font-size: 14px;
  font-weight: bold;
`;
export default function RecursiveProperty({property, propertyName, rootProperty, excludeBottomBorder}) {
    return <RecursivePropertyContainer excludeBottomBorder={excludeBottomBorder}>
        {property !== null ? <>
            {typeof property === 'number'
            || typeof property === 'string'
            || typeof property === 'boolean' ? <>
                <PropertyName>{camelCaseToNormal(propertyName)}</PropertyName>
                <span className={"ms-2"}>{property.toString()}</span>
            </>:<ExpandableProperty title={camelCaseToNormal(propertyName)} expanded={!!rootProperty}>
                {Object.values(property).map((prop, index, {length}) =>
                    <RecursiveProperty
                        key={index}
                        property={prop}
                        propertyName={Object.getOwnPropertyNames(property)[index]}
                        excludeBottomBorder={index === length - 1}/>)}
            </ExpandableProperty>}
        </>: <>Property is null</>}
    </RecursivePropertyContainer>;
}