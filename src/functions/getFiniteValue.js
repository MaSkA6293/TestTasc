function getFiniteValue(out, parts, value) {
    let i = 0;
    //  console.log('input obj', out)
    //   console.log('input i', i)
    getProp(out, i);
    function getProp(o, i) {
        // console.log('in input i', i)
        // console.log('in input obj', o)
        //  console.log('in input parts', parts[i])
        for (let prop in o) {
            if ((prop) === parts[i]) {
                //   console.log('YES');
                i++;
                if (i < parts.length) {
                    getProp(o[prop], i);
                } else {
                    // console.log('Ya tut', o[prop], prop)

                    if (prop === 'panel' || prop === 'label' || prop === 'button' || prop === 'props' || o[prop].type === 'panel'
                        || o[prop].type === 'label' || o[prop].type === 'button') {
                        return;
                    }
                    if (typeof o[prop] === 'number') {
                        if (!value.match(/^\d+$/)) {
                            console.log('Можно ввести только число')
                            return;
                        }
                        else {
                            o[prop] = +value;
                            return o;
                        }

                    }
                    if (typeof o[prop] === 'boolean') {
                        if (value.match(/^\btrue\b$|^\bfalse\b$/) !== null) {
                            if (value === 'true') {
                                o[prop] = Boolean(value);
                                return o;
                            }
                            else o[prop] = Boolean(!value);

                            return o;
                        }
                        else {
                            console.log('доступно только true или false')
                            return;
                        }
                    }
                    else {
                        o[prop] = value;
                        return o;
                    }
                }
            }
        }
    }
    return out;
}
export default getFiniteValue;