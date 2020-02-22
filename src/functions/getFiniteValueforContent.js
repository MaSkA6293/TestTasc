function getFiniteValueforContent(obj, a, parts) {
    let i = 0;
    getProp2(obj, i);
    function getProp2(o, i) {
        for (let prop in o) {
            if ((prop) === parts[i]) {
                console.log('YE S');
                i++;
                if (i < parts.length) {
                    getProp2(o[prop], i);
                } else {
                    o[prop].push(a);
                    //const gobj = [...obj];
                    return obj
                }
            }
        }
    }
    return obj;
}
export default getFiniteValueforContent;