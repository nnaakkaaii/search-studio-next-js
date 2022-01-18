import React from "react";
import Carousel from "../atoms/carousel";
import Image from "next/image";

interface ImgCarouselProps {
    img: {
        name: string,
        description: string,
        path: string
    }[],
}

export default function ImgCarousel(props: ImgCarouselProps) {
    const {img} = props;

    return (
        <Carousel>
            {
                img.map((img) =>
                    <div key={0} style={{position: 'relative', width: '100%',}}>
                        <Image width={300} height={200} layout={'responsive'} objectFit={'contain'}
                               alt={img.description}
                               src={img.path !== '' ? img.path : "https://placehold.jp/300x200.png"}/>
                    </div>)
            }
        </Carousel>
    );
}