import { UAParser } from "ua-parser-js";

const getNavigatorDetails = () => {
    try {
        if (typeof navigator === "undefined") return null;

        const { userAgent } = navigator;
        const parser = new UAParser(userAgent);
        const uaResult = parser.getResult();
        return {
            userAgent,
            platform: uaResult.os.name || null,
            browser: uaResult.browser.name || null,
            os: uaResult.os.name || null,
            device: uaResult.device.type || "Desktop",
        };
    } catch (error) {
        console.error("Error getting navigator details:", error);
        return null;
    }
};


export default getNavigatorDetails;
