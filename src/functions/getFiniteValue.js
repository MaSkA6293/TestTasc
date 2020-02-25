import copyobj from './copyobj';
function getFiniteValue(out, parts, value) {
    let i = 0;
    let newArray = copyobj(out);
    getProp(newArray, i);
    function getProp(o, i) {

        for (let prop in o) {
            if ((prop) === parts[i]) {

                i++;
                if (i < parts.length) {
                    getProp(o[prop], i);
                } else {

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
    return newArray;
}
export default getFiniteValue;