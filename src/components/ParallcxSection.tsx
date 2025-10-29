import { type ReactNode } from 'react';

const ParallaxSection = ({ image ,children}: { image: string,children:ReactNode }) => {
    return (
        <div className="w-full">
            <div
                className="h-[60vh] bg-fixed bg-center bg-cover"
                style={{ backgroundImage: `url(${image})` }}
            >
               {children}
            </div>
        </div>

    )
}

export default ParallaxSection
