const changeByteToKByte = (byte) => (byte / 1024).toFixed(2);

const convertToGigabyte = (byte) => (byte / Math.pow(1024, 3)).toFixed(2);

export { changeByteToKByte, convertToGigabyte };
