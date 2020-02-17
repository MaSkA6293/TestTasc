export const select = (track, value) => {
    console.log(track, value)
    return {
        type: "CHANGE_ELEMENT",
        track: track,
        value: value,
    }
};