export const select = (track, value) => {
    return {
        type: "CHANGE_ELEMENT",
        track: track,
        value: value,
    }
};