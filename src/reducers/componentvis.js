const contentt = [
    {
        type: 'Panel',
        props: {
            width: 600,
            height: 600,
            visible: true
        },
        content: [
            {
                type: 'Button',
                props: {
                    caption: 'Button1',
                    width: 100,
                    height: 50,
                    visible: true
                },
            },
            {
                type: 'Label',
                props: {
                    caption: 'test1',
                    visible: true
                },
            },
            {
                type: 'Panel',
                props: {
                    width: 500,
                    height: 500,
                    visible: true
                },
                content: [
                    {
                        type: 'Button',
                        props: {
                            caption: 'Button2',
                            width: 100,
                            height: 50,
                            visible: true
                        },
                    },
                    {
                        type: 'Button',
                        props: {
                            caption: 'Button3',
                            width: 100,
                            height: 50,
                            visible: true
                        },
                    }, {
                        type: 'Label',
                        props: {
                            caption: 'test2',
                            visible: true
                        },
                    },]
            }]
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



export default function (content = contentt, action) {

    // let t = content[c];
    //  console.log(t);



    switch (action.type) {
        case "CHANGE_ELEMENT":
            return [...content,
            {
                track: action.text,
                value: action.value
            }]
        default:
            return content;
    }
}