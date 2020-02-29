import gettrack_value from '../functions/function copy';
//           content[0].content[0].content[1]
const state = {
    content: [
        {
            type: 'panel',
            props: {
                width: 400,
                height: 200,
                visible: true
            },
            content: [
                {
                    type: 'panel',
                    props: {
                        width: 400,
                        height: 200,
                        visible: true
                    },

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
                        }
                    ]






                }
            ]
        }






        , {
            type: 'label',
            props: {
                caption: 'test3',
                visible: true
            }
        },
        {
            type: 'button',
            props: {
                caption: 'Button6',
                width: 100,
                height: 50,
                visible: true
            }
        },

    ],
};


export default function (store = state, action) {

    switch (action.type) {
        case "CHANGE_ELEMENT":
            let trackinobject = gettrack_value(store, action.track, action.value);

            if (typeof trackinobject === 'undefined') {
                return store
            } else {
                return { ...store, content: trackinobject.content };
            }
        default:
            return store;
    }
}