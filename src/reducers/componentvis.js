const state = {
    content: [
        {
            type: 'Panel',
            props: {
                width: 400,
                height: 200,
                visible: true
            },
        },
        {
            type: 'Label',
            props: {
                caption: 'test3',
                visible: true
            },
        },
        {
            type: 'Button',
            props: {
                caption: 'Button4',
                width: 100,
                height: 50,
                visible: true
            },
        }
    ],
};


let gettrack_value = function (obj, track, value) {
    console.log('obj na vhode', obj)
    let parts = track.replace(/(\[?)(\d+)(\]?])/g, '.$2');
    parts = parts.split('.');
    if (parts.length > 1 && parts[0] === 'content') {
        parts.splice(0, 1);
    }
    let rv = obj.slice();
    let out = obj;
    for (let i = 0; i < parts.length; i++) {
        if (rv[parts[i]] === undefined) {
            return console.log('Объект не имеет такой путь');
        } else {
            rv = rv[parts[i]];
        }
    };





    function getFiniteValue(out) {
        let i = 0;
        console.log('input obj', out)
        console.log('input i', i)
        getProp(out, i);
        function getProp(o, i) {
            console.log('in input i', i)
            console.log('in input obj', o)
            console.log('in input parts', parts[i])
            for (let prop in o) {
                if ((prop) === parts[i]) {
                    console.log('YES');
                    i++;
                    if (i < parts.length) {
                        getProp(o[prop], i);
                    } else {
                        console.log('Ya tut', o[prop], prop)

                        if (prop === 'Panel' || prop === 'Label' || prop === 'Button' || prop === 'props' || o[prop].type === 'Panel'
                            || o[prop].type === 'Label' || o[prop].type === 'Button') {
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

    const huk = getFiniteValue(out);
    console.log('HOOOOK', huk);


    return huk;


};


export default function (store = state, action) {

    switch (action.type) {
        case "CHANGE_ELEMENT":
            const trackinobject = gettrack_value(store.content, action.track, action.value);
            if (typeof trackinobject === 'undefined') {
                return store
            } else {
                const update = [...trackinobject];
                return { ...store, content: update };
            }

        default:
            return store;
    }
}