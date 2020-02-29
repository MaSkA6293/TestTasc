//import copyobj from './copyobj';
import getCopy from './getcopyobj';
function getFiniteValue(out, parts, value) {
    let i = 0;
    let newArray = getCopy(out);
    getProp(newArray.content, i);


    function getProp(object1, i) {
        for (let prop in object1) {

            if ((prop) === parts[i]) {
                i++;
                if (i < parts.length) {
                    let h = getProp(object1[prop], i);
                } else {

                    if (prop === 'panel' || prop === 'label' || prop === 'button' || prop === 'props' || object1[prop].type === 'panel'
                        || object1[prop].type === 'label' || object1[prop].type === 'button') {
                        return;
                    }
                    // let F = { ...o };
                    if (typeof object1[prop] === 'number') {
                        if (!value.match(/^\d+$/)) {
                            console.log('Можно ввести только число')
                            return;
                        }
                        else {


                            //   o[prop] = [...+value]

                            //o[prop] = +value;

                            return { ...object1, [prop]: +value };
                        }
                    }
                    if (typeof object1[prop] === 'boolean') {
                        if (value.match(/^\btrue\b$|^\bfalse\b$/) !== null) {
                            if (value === 'true') {
                                object1[prop] = Boolean(value);
                                return object1;
                            }
                            else object1[prop] = Boolean(!value);

                            return object1;
                        }
                        else {
                            console.log('доступно только true или false')
                            return;
                        }
                    }
                    else {
                        //o[prop] = value;
                        return { ...object1, [prop]: value };
                    }

                }
            }
            //return o
        }
        return object1

    }
    return newArray;
}
export default getFiniteValue;