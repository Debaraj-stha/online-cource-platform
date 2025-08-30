export const getColorBasedOnName = (name: string): string => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Use hash to generate hue between 0–360
    const hue = Math.abs(hash) % 360;

    // Fixed saturation & lightness for consistency
    return `hsl(${hue}, 70%, 50%)`;
};
