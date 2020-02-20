export const select = (track, value) => {
    // console.log('ACTION!', track, value)
    return {
        type: "CHANGE_ELEMENT",
        track: track,
        value: value,
    }
};