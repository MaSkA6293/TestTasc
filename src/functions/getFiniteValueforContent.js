function getFiniteValueforContent(obj, a, parts) {
    let newArray = JSON.parse(JSON.stringify(obj))
    let i = 0;
    getProp2(newArray, i);
    function getProp2(o, i) {
        for (let prop in o) {
            if ((prop) === parts[i]) {
                i++;
                if (i < parts.length) {
                    getProp2(o[prop], i);
                } else {
                    o[prop].push(a);
                    return obj
                }
            }
        }
    }
    return newArray;
}
export default getFiniteValueforContent;