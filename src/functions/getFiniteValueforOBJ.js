function getFiniteValueforOBJ(obj, a, parts) {
    let i = 0;
    //   console.log('input obj 222', obj)
    //  console.log('input i 222', i)
    getProp2(obj, i);
    function getProp2(o, i) {
        //  console.log('in input i', i)
        //  console.log('in input obj', o)
        //  console.log('in input parts', parts[i])
        for (let prop in o) {
            if ((prop) === parts[i]) {
                //  console.log('YES');
                i++;
                if (i < parts.length) {
                    getProp2(o[prop], i);
                } else {
                    //      console.log('Ya tut', o[prop], prop)
                    //     console.log('это o[prop]', o[prop]);
                    //    console.log('это prop', prop);
                    //    console.log('это a', a);
                    console.log(' элемент a', a);
                    console.log('До o[prop]', o[prop]);
                    console.log('До o', o);
                    o[prop] = { ...o[prop], content: a };

                    console.log('добавляем в элемент o[prop]', o[prop]);

                    console.log('obj', obj);
                    obj = [...obj]
                    return obj
                }
            }
        }
    }
    return obj
}
export default getFiniteValueforOBJ;