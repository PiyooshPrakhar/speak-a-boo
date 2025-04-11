export function getRandomInt(min, max) {
    const uintArray = new Uint32Array(1);
    window.crypto.getRandomValues(uintArray);
    
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(uintArray[0] / (Math.pow(2, 32) / (max - min + 1))) + min;
}
