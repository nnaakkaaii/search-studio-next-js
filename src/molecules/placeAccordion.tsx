import React from 'react';
import {styled} from "@mui/system";
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {ExpandMore} from "@mui/icons-material";
import {Typography} from "@mui/material";


const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion elevation={0} square {...props} />
))(() => ({
    padding: 0,
    boxShadow: 'none',
    '&:before': {
        display: 'none',
    },
    '&.Mui-expanded': {
        margin: 0,
    },
    '&:last-child': {
        borderBottom: '1px solid #D7D2C8',
        '&$expanded': {
            borderBottom: 0
        },
    },
    expanded: {},
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ExpandMore/>}{...props}/>))(() => ({
        fontSize: '14px',
        color: '#5A4628',
        backgroundColor: '#F9F5F0',
        borderTop: '1px solid #D7D2C8',
        minHeight: 20,
        padding: '4px 16px',
        '&.Mui-expanded': {
            minHeight: 20,
            margin: 0
        },
        '&.MuiAccordionSummary-expandIcon': {
            color: '#5A4628',
            padding: '5px',
            margin: '0 -5px 0 0'
        },
        '& .MuiAccordionSummary-content': {
            margin: 0,
            '&$Mui-expanded': {
                margin: 0,
            },
        },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    padding: 0,
    minHeight: 16,
}));

interface PlaceAccordionProps {
    children: React.ReactNode;
    area: string;
}

export default function PlaceAccordion(props: PlaceAccordionProps) {
    const [expanded, setExpanded] = React.useState<string | false>();

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
            <Accordion square expanded={expanded === `panel-${props.area}`} onChange={handleChange(`panel-${props.area}`)}>
                <AccordionSummary expandIcon={<ExpandMore/>}
                                  aria-controls={`panel-${props.area}-content`}
                                  id={`panel-${props.area}-header`}>
                    <Typography variant='subtitle2'>{props.area}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{width: '100%'}}>{props.children}</div>
                </AccordionDetails>
            </Accordion>
    );
}
