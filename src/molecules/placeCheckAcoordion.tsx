import React, { useState} from 'react';
import SearchCheckbox from "../atoms/searchCheckbox";
import {styled} from "@mui/system";
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {ExpandMore} from "@mui/icons-material";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion elevation={0} square {...props} />
))(() => ({
    boxShadow: 'none',
    '&:before': {
        display: 'none',
    },
    '&.Mui-expanded': {
        margin: 'auto',
    },
    expanded: {},
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ExpandMore/>}{...props}/>))(() => ({
    paddingLeft: 8,
    minHeight: 16,
    color: '#5A4628',
    borderTop: '1px solid #D7D2C8',
    '&.Mui-expanded': {
        minHeight: 16,
    },
    '& .MuiAccordionSummary-expandIcon': {
        color: '#5A4628',
        padding: '5px',
        margin: '0 -5px 0 0'
    },
    '& .MuiAccordionSummary-content': {
        margin: 0,
        '&$expanded': {
            margin: 0
        }
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    padding: '0 24px',
    display: 'flex',
    flexWrap: 'wrap',
}));

interface PlaceCheckAccordionProps {
    items: {id: string, name: string}[];
    parentItem: {id: string, name: string};
    childItems: {id: string, name: string}[];
    checkedParent: (children: any[]) => (item: any) => void,
    checkedChild: (parent: any, children: any[]) => (item: any) => void,
    unCheckedParent: (children: any[]) => (item: any) => void,
    unCheckedChild: (parent: any) => (item: any) => void,
}

export default function PlaceCheckAccordion(props: PlaceCheckAccordionProps) {
    const [expanded, setExpanded] = useState<string | false>();
    const {items, parentItem, childItems, checkedParent, checkedChild, unCheckedParent, unCheckedChild} = props;

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <Accordion square expanded={expanded === `panel-${parentItem.id}`} onChange={handleChange(`panel-${parentItem.id}`)}>
            <AccordionSummary expandIcon={<ExpandMore />}
                              aria-controls={`panel-${parentItem.id}-content`}
                              id={`panel-${parentItem.id}-header`}>
                <SearchCheckbox item={parentItem} itemName={parentItem.name} key={parentItem.id} parent
                                checked={items.includes(parentItem)}
                                itemChecked={checkedParent(childItems)} itemUnChecked={unCheckedParent(childItems)}/>
            </AccordionSummary>
            <AccordionDetails>
                {
                    childItems.map((childItem) => (
                        <SearchCheckbox item={childItem} itemName={childItem.name} key={childItem.id} child
                                        checked={items.map((item) => item.id).includes(childItem.id)}
                                        itemChecked={checkedChild(parentItem, childItems)}
                                        itemUnChecked={unCheckedChild(parentItem)}/>
                    ))
                }
            </AccordionDetails>
        </Accordion>
    );
}
