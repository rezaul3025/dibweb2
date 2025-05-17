import React, {Fragment} from "react";

const Vision = () => {
    return (
        <Fragment>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Support Our Mission</h2>

            <div className="container mx-auto px-4 py-8">
                <div className="relative aspect-video w-full max-w-6xl mx-auto">
                    <img
                        src={'/static/assets/img/vision/vision_v1.png'}
                        alt="Featured content"
                        className="absolute inset-0 w-full h-full object-contain"
                        loading="lazy"
                    />
                </div>
            </div>

            <img
                src={'/static/assets/img/vision/vision_v1.png'}
                alt="Banner image"
                className="absolute inset-0 w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                <div className="text-white max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Heading</h2>
                    <p className="text-lg md:text-xl">Supporting text for the banner</p>
                </div>
            </div>

            <img
                srcSet="/static/assets/img/vision/vision_v1.png 640w, /static/assets/img/vision/vision_v1.png 1024w, /static/assets/img/vision/vision_v1.png 1600w"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                src={'/static/assets/img/vision/vision_v1.png'}
                alt="Responsive large image"
                className="mx-auto w-full max-w-[1200px] h-auto shadow-xl rounded-lg"
            />
        </Fragment>
    )
}

export default Vision;