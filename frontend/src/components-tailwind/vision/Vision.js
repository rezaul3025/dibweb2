import React, {Fragment} from "react";
import VisionImageGallery from "./VisionImageGallery";

const Vision = () => {
    return (
        <Fragment>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Support Our Mission</h2>
            <div className="container mx-auto px-4 py-8">
                <div className="relative aspect-video w-full max-w-6xl mx-auto">
                    {/*<img
                        src={'/static/assets/img/vision/vision_v1.png'}
                        alt="Featured content"
                        className="absolute inset-0 w-full h-full object-contain"
                        loading="lazy"
                    />*/}
                     <VisionImageGallery images={[
                            { thumbnail: '/static/assets/img/vision/vision_v1.png', fullSize: '/static/assets/img/vision/vision_v1.png', alt: 'Vision 1' },
                            { thumbnail: '/static/assets/img/vision/vision_v2.png', fullSize: '/static/assets/img/vision/vision_v2.png', alt: 'Vision 2' },
                     ]} />
                </div>

                {/*<div className="relative w-full h-screen max-h-[80vh] overflow-hidden">
                    <img
                         src={'/static/assets/img/vision/vision_v1.png'}
                        alt="Hero image"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <h1 className="text-white text-4xl md:text-6xl font-bold">Hero Title</h1>
                    </div>
                </div>*/}
            </div>


            {/*<img
                srcSet="/static/assets/img/vision/vision_v1.png 640w, /static/assets/img/vision/vision_v1.png 1024w, /static/assets/img/vision/vision_v1.png 1600w"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                src={'/static/assets/img/vision/vision_v1.png'}
                alt="Responsive large image"
                className="mx-auto w-full max-w-[1200px] h-auto shadow-xl rounded-lg"
            />*/}
        </Fragment>
    )
}

export default Vision;