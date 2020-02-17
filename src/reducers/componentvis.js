const contentt = [
    {
        type: 'Panel',
        props: {
            width: 300,
            height: 300,
            visible: true
        },
        content: [
            {
                type: 'Button',
                props: {
                    caption: 'Button',
                    width: 100,
                    height: 50,
                    visible: true
                },
            },
            {
                type: 'Button',
                props: {
                    caption: 'Button',
                    width: 100,
                    height: 50,
                    visible: true
                },
            },
            {
                type: 'Panel',
                props: {
                    width: 100,
                    height: 100,
                    visible: true
                },
                content: [
                    {
                        type: 'Button',
                        props: {
                            caption: 'Button',
                            width: 100,
                            height: 50,
                            visible: true
                        },
                    },
                    {
                        type: 'Button',
                        props: {
                            caption: 'Button',
                            width: 100,
                            height: 50,
                            visible: true
                        },
                    }]
            }]
    },

    {
        type: 'Label',
        props: {
            caption: 'test',
            visible: true
        },
    },
    {
        type: 'Button',
        props: {
            caption: 'Button',
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