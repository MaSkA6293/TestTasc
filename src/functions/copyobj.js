function dClone(el) {
    const funcsObj = {
        "Object": () => {
            let clObj = {};
            for (let prop in el) {
                clObj[prop] = dClone(el[prop]);
            }
            return clObj;
        },
        "Array": () => {
            return el.map((i) => {
                return dClone(i);
            });
        }
    };
    if (el.constructor.name in funcsObj) {
        return funcsObj[el.constructor.name]();
    } else {
        return el;
    }
}
export default dClone;