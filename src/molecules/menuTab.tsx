import React, {useState} from 'react';
import {AppBar, Tab, Tabs} from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabPanel" hidden={value !== index} id={`tabPanel${index}`} aria-labelledby={`tab${index}`} {...other}>
            {value === index && children}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `tab${index}`,
        'aria-controls': `tabPanel${index}`,
    };
}

interface TabBarProps {
    labels: string[];
    barTop?: any;
    white?: boolean;
    tabFontSize?: number;
    tabFlexGrow: number;
    tabMinHeight: number;
    children: React.ReactNode[];
}

export default function MenuTab(props: TabBarProps) {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <AppBar position='sticky' sx={{top: props.barTop}}>
                <Tabs sx={{backgroundColor: props.white ? '#FFF' : '#F9F5F0', color: '#5A4628', minHeight: 24}}
                      TabIndicatorProps={{style: {backgroundColor: '#1D356A'}}}
                      value={value} onChange={handleChange} aria-label="menuTabs">
                    {
                        props.labels.map((label, index) =>
                            <Tab label={label} key={index} {...a11yProps(index)} wrapped
                                 sx={{fontSize: props.tabFontSize, flexGrow: props.tabFlexGrow, minHeight: props.tabMinHeight,
                                     fontWeight: 'bold', p: 0, maxWidth: 600}}/>
                        )
                    }
                </Tabs>
            </AppBar>
            {
                props.children.map((child,index) =>
                    <TabPanel value={value} index={index} key={index}>{child}</TabPanel>
                )
            }
        </>
    );
}
