const content = [
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
]

let gettrack_value = function (obj, track, value) {
    let parts = track.replace(/(\[?)(\d+)(\]?])/g, '.$2');
    console.log('пусть после реплейс', parts);
    parts = parts.split('.');
    console.log('путь после сплит', parts)
    if (parts.length > 1 && parts[0] === 'content') {

        parts.splice(0, 1);
    }
    console.log('путь на выходе', parts);

    let rv = [...obj];
    console.log('переменная obj', obj);

    for (let i = 0; i < parts.length - 1; i++) {
        console.log('внутри массива длинна', parts.length);
        let d = rv[parts[i]];
        console.log('внутри цикла', d);
        if (rv[parts[i]] === undefined) {
            return undefined;
        } else {
            rv = rv[parts[i]];
            console.log('внутри цикла rv', rv);
        }

    }
    console.log('выход из цикла длинна', parts.length);
    if (typeof rv[parts[parts.length - 1]] === 'number') {
        console.log('внутри if', parts.length);
        let j = parts[parts.length - 1];
        console.log('переменная j  1if', j);
        console.log('переменная партс-1  1 иф', parts[parts.length - 1]);
        return rv[parts[parts.length - 1]] = +value;
        //  console.log('itogo', rv)
    } else {
        console.log('внутри if', parts.length);
        let j = parts[parts.length - 1];
        console.log('переменная j 2 if', j);
        return rv[parts[parts.length - 1]] = value;
        //    console.log('itogo', rv)
    }

    //  return;


};


export default function (state = content, action) {

    // let t = content[c];
    //  console.log(t);



    switch (action.type) {
        case "CHANGE_ELEMENT":
            let trackinobject = gettrack_value(state, action.track, action.value);
            console.log('out func', trackinobject);
            if (typeof trackinobject !== 'number' || typeof trackinobject !== 'string') {
                return state
            } else {
                return [...state,
                {
                    trackinobject
                }]
            }

        default:
            return state;
    }
}