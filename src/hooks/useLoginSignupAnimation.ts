import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

const useLoginSignupAnimation=()=>{
        // Refs for animation
    const containerRef = useRef<HTMLDivElement>(null);
    const gifRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);


    // GSAP animation on mount
    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline();

        // Animate GIF from left
        tl.from(gifRef.current, {
            x: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

        // Animate form container from bottom
        tl.from(
            formRef.current,
            {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            },
            "-=0.5" // overlap the animations slightly
        );
        return () => tl.kill()
    }, [containerRef, gifRef, formRef]);
    return {
        gifRef,
        containerRef,
        formRef
    }
}
export default useLoginSignupAnimation