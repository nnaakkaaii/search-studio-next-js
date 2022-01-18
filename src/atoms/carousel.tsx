import React, {
    ReactNode,
    useState,
    useEffect,
    useRef,
    useCallback,
    ReactNodeArray,
} from 'react';
import { IconButton } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { AnimatePresence, motion, MotionProps, PanInfo } from 'framer-motion'
import {styled} from "@mui/system";
import {useWindowSize} from "react-use";

interface CarouselProps {
    children: React.ReactNode[]
}

export const Carousel = (props: CarouselProps) => {
    const { children } = props;
    const [state, setState] = useState({
        active: 0,
        prevActive: 0,
        next: true
    });
    const [height, setHeight] = useState<number>(0);

    // componentDidMount
    useEffect(() => {
        setNext(0, true);
    }, [])

    const next = (event: any) => {
        let last = children.length - 1;
        const nextActive = state.active + 1 > last ? 0 : state.active + 1;

        setNext(nextActive, true)

        if (event)
            event.stopPropagation();
    }

    const prev = (event: any) => {
        let last = children.length - 1;
        const nextActive = state.active - 1 < 0 ? last : state.active - 1;

        setNext(nextActive, false)

        if (event)
            event.stopPropagation();
    }

    const setNext = (index: number, isNext: boolean) => {
        if (index > children.length - 1) index = children.length - 1;
        if (index < 0) index = 0;

        if (isNext === undefined) {
            isNext = index > state.active
        }

        setState({
            active: index,
            prevActive: state.active,
            next: isNext
        })
    }

    const ItemWrapper = styled('div')({
        position: 'relative',
        width: '100%',
        height: '100%',
    })

    const ButtonWrapper = styled('div')({
        position: "absolute",
        height: "100%",
        backgroundColor: "transparent",
        zIndex: 1,
        top: 0,
        '&:hover': {
            '& $button': {
                backgroundColor: "black",
                filter: "brightness(120%)",
                opacity: "0.4"
            }
        }
    })

    const MyIconButton = styled(IconButton)({
        margin: 8,
        padding: 2,
        position: "relative",
        backgroundColor: '#5A4628',
        opacity: 0.8,
        top: "calc(50% - 40px)",
        color: "white",
        fontSize: "30px",
        transition: "200ms",
        cursor: "pointer",
        '&:hover': {
            backgroundColor: '#5A4628',
            opacity: "0.6"
        },
    })

    return (
        <div style={{position: "relative", overflow: "hidden"}}>
            <ItemWrapper style={{height: height}}>
                {
                    children.map((child, index) => {
                        return (
                            <CarouselItem
                                key={`carousel-item${index}`}
                                state={state}
                                index={index}
                                maxIndex={children.length - 1}
                                child={child}
                                swipe
                                next={next}
                                prev={prev}
                                setHeight={setHeight}
                            />
                        )
                    })
                }
            </ItemWrapper>

            <ButtonWrapper style={{right: 0}}>
                <MyIconButton onClick={next} aria-label="Next">
                    <NavigateNextIcon />
                </MyIconButton>
            </ButtonWrapper>

            <ButtonWrapper style={{left: 0}}>
                <MyIconButton onClick={prev} aria-label="Previous">
                    <NavigateBeforeIcon />
                </MyIconButton>
            </ButtonWrapper>

            <Indicators
                length={children.length}
                active={state.active}
                press={setNext}
            />
        </div>
    )
}

interface CarouselItemProps {
    next?: Function,
    prev?: Function,
    state: {
        active: number,
        prevActive: number,
        next: boolean
    }
    swipe?: boolean,
    index: number,
    maxIndex: number,
    child: React.ReactNode,
    setHeight: Function
}

const CarouselItem = ({ next, prev, swipe, state, index, maxIndex, child, setHeight }: CarouselItemProps) => {
    const dragProps: MotionProps = {
        drag: 'x',
        layout: true,
        onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
            if (!swipe) return;
            console.log(info);
            if (info.offset.x > 0) prev && prev();
            else if (info.offset.x < 0) next && next();

            event.stopPropagation();
        },
        dragElastic: 0,
        dragConstraints: { left: 0, right: 0 }
    }

    const divRef = useRef<any>(null);

    const {width} = useWindowSize()

    useEffect(() => {
        if (divRef.current) {
            setHeight(divRef.current.offsetHeight);
        }
    }, [divRef, width])

    const variants = {
        leftwardExit: {
            x: '-100%',
            zIndex: 0,
            // position: 'relative'
        },
        leftOut: {
            x: '-100%',
            display: 'none',
            zIndex: 0,
            // position: 'relative'
        },
        rightwardExit: {
            x: '100%',
            zIndex: 0,
            // position: 'relative'
        },
        rightOut: {
            x: '100%',
            display: 'none',
            zIndex: 0,
            // position: 'relative'
        },
        center: {
            x: 0,
            opacity: 1,
            zIndex: 1,
            // position: 'relative'
        },
    };

    // Handle animation directions and opacity given based on active, prevActive and this item's index
    const { active, next: isNext, prevActive } = state;
    let animate = 'center';
    if (index === active)
        animate = 'center';
    else if (index === prevActive) {
        animate = isNext ? 'leftwardExit' : 'rightwardExit';
        if (active === maxIndex && index === 0) animate = 'rightwardExit';
        if (active === 0 && index === maxIndex) animate = 'leftwardExit'
    }
    else {
        animate = index < active ? 'leftOut' : 'rightOut';
        if (active === maxIndex && index === 0) animate = 'rightOut';
        if (active === 0 && index === maxIndex) animate = 'leftOut'
    }


    return (
        <div style={{position: "absolute", width: '100%'}} ref={divRef}>
            <AnimatePresence custom={isNext}>
                <motion.div {...(swipe && dragProps)}>
                    <motion.div
                        custom={isNext}
                        variants={variants}
                        animate={animate}
                        transition={{
                            x: { type: "tween", duration: .2, delay: 0 },
                            opacity: { duration: .2 },
                        }}
                        style={{ position: 'relative'}}
                    >
                        {child}
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

interface IndicatorProps {
    length: number,
    active: number,
    press: Function,
}

const Indicators = (props: IndicatorProps) => {
    const IndicatorIcon = <FiberManualRecordIcon style={{fontSize: "15px"}}/>

    const completeListIfRequired = useCallback((arrayOfIcons: ReactNodeArray) => {
        while (arrayOfIcons.length < props.length) {
            let index = 0;
            arrayOfIcons.push(arrayOfIcons[index]);
            index += 1;
        }
    }, [props.length])

    let indicators = [];

    for (let i = 0; i < props.length; i++) {

        const MyIndicatorIconButton = styled(IconButton)({
            cursor: "pointer",
            transition: "200ms",
            padding: 0,
            color: '#5A4628',
            opacity: 0.5,
            '&:hover': {
                color: '#5A4628',
                opacity: 1
            },
            '&:active': {
                color: '#5A4628',
                opacity: 1
            }
        })

        const createIndicator = (IndicatorIcon: ReactNode) => {
            return (
                i === props.active ?
                    <IconButton
                        key={i}
                        style={{color: '#5A4628'}}
                        onClick={() => { props.press(i) }}
                        aria-label={`aria-label ${i + 1}`}
                    >
                        {IndicatorIcon}
                    </IconButton>
                    :
                <MyIndicatorIconButton
                    key={i}
                    onClick={() => { props.press(i) }}
                    aria-label={`aria-label ${i + 1}`}
                >
                    {IndicatorIcon}
                </MyIndicatorIconButton>
            )
        }

        Array.isArray(IndicatorIcon)
            ? indicators.push(createIndicator(IndicatorIcon[i])) && completeListIfRequired(IndicatorIcon)
            : indicators.push(createIndicator(IndicatorIcon))

    }

    return (
        <div style={{width: "100%", marginTop: "10px", textAlign: "center"}}>
            {indicators}
        </div>
    )
}

export default Carousel;