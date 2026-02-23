export const getImageUrl = (path: string) => {
    // console.log("DEBUG: Raw image path from backend:", path);

    if (!path) return "";

    // If it's a data URL, return as is
    if (path.startsWith("data:")) return path;

    // Get base URL from environment variables
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://13.60.168.111";
    // Remove trailing slash from base URL if it exists for consistent concatenation
    const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

    /**
     * Extraction Logic from AdminProductList:
     * 1. Remove protocol and domain: ^https?:\/\/[^/]+ 
     *    (Matches http://localhost:3002 or https://api.example.com)
     * 2. Remove leading slash: ^\/
     */
    const pathPart = path.replace(/^https?:\/\/[^/]+/, '').replace(/^\//, '');

    // Construct final URL
    const finalUrl = `${cleanBaseUrl}/${pathPart}`;

    // console.log("DEBUG: Image URL Resolution:", { original: path, extracted: pathPart, final: finalUrl });

    return finalUrl;
};
