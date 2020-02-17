const contentt = [
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