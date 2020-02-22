import gettrack_value from '../functions/function';
const state = {
    content: [
        {
            type: 'panel',
            props: {
                width: 400,
                height: 200,
                visible: true
            }

        },
        {
            type: 'label',
            props: {
                caption: 'test3',
                visible: true
            }
        },
        {
            type: 'button',
            props: {
                caption: 'Button4',
                width: 100,
                height: 50,
                visible: true
            }
        }
    ],
};


export default function (store = state, action) {

    switch (action.type) {
        case "CHANGE_ELEMENT":
            let trackinobject = gettrack_value(store.content, action.track, action.value);
            if (typeof trackinobject === 'undefined') {
                return store
            } else {
                if (action.track === '') {
                    const f = [...trackinobject];
                    let ddd = { ...store, content: f };
                    return ddd;
                }
                const update = [...trackinobject];
                let zzz = { ...store, content: update };
                return zzz;
            }
        default:
            return store;
    }
}