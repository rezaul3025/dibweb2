import React, {Fragment} from "react";
import CarouselItem from "./CarouselItem";

export default function Carousel() {

    const headLine = "Whoever builds a mosque for Allah, Allah will build for him a house like it in Paradise."
    const subTitle ="Source: Ṣaḥīḥ al-Bukhārī 450, Ṣaḥīḥ Muslim 533"

    const carouselItems = [
        //{"imageName":"ahmuallaha_arrivals.png","imageAlt":"shealkh","headline":'Sheikh Ahmadullah Berlin Tour', "subTitle":'November 10, 2024 at 14:40 | Gloria Event Center | Markgrafenstraße 67, 10969 Berlin'},
        // {"imageName":"ahmuallaha_arrivals.png","imageAlt":"shealkh","headline":'Sheikh Ahmadullah Berlin Tour', "subTitle":'November 10, 2024 at 14:40 | Gloria Event Center | Markgrafenstraße 67, 10969 Berlin'},
        // {"imageName":"ahmuallaha_arrivals.png","imageAlt":"shealkh","headline":'Sheikh Ahmadullah Berlin Tour', "subTitle":'November 10, 2024 at 14:40 | Gloria Event Center | Markgrafenstraße 67, 10969 Berlin'},
        //{"imageName":"image1.png","imageAlt":"image1.png","headline":headLine, "subTitle":subTitle},
        //{"imageName":"image2.png","imageAlt":"image2.png","headline":headLine, "subTitle":subTitle},
        //{"imageName":"image3.png","imageAlt":"image3.png","headline":headLine, "subTitle":subTitle},
        //{"imageName":"image4.png","imageAlt":"image4.png","headline":headLine, "subTitle":subTitle},
        //{"imageName":"image5.png","imageAlt":"image5.png","headline":headLine, "subTitle":subTitle},
        {"imageName":"image6.png","imageAlt":"image6.png","headline":headLine, "subTitle":subTitle}
    ]

    return (
        <Fragment>
            {/* Carousel Start */}
            <div className="header-carousel owl-carousel">
                {carouselItems.map((ci) => (
                    <CarouselItem imagePath={"/static/assets/img/carousel/"+ci.imageName}
                                  imageAlt={ci.imageAlt}
                                  headline={ci.headline}
                                  subTitle={ci.subTitle}
                                  key={ci.imageName}>
                    </CarouselItem>
                ))}
            </div>
            {/* Carousel End */}
        </Fragment>
    );
}