
export const sanitizer = (data) => {
    if (typeof data !== "object" || Object.keys(data).length === 0) {
        throw new Error("Please provide a non-empty object for sanitization.");
    }
    const SanitizedData = {};

    Object.keys(data).forEach((key) => {
        if (typeof data[key] === "object" && data[key] != null) {
            // If the value of the key is an object, recursively sanitize its properties
            SanitizedData[key] = sanitizer(data[key]);
        } else {
            // Escape characters for CSRF protection and apply custom trimming
            if( typeof data[key] === "string"){
                SanitizedData[key] = sanitizeHtml(data[key]).customTrim(); 
            }
                  
        }
    });

    return SanitizedData;
};


function sanitizeHtml (string) {
    console.log(string)
    return  string.replace(/(<([^>]+)>)/gi, "");
}

