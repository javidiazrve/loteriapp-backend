const uniqueId = require("generate-unique-id");

export function generateUniqueId(){
    return uniqueId({
        length: 6,
        useLetters: true,
        useNumbers: true
    });
}