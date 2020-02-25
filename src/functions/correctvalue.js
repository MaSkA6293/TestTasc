function correctvalue(obj) {
    let Flag = true;

    if (typeof obj !== 'object') {

        console.log('Не корректные данные')
        return false
    }
    if (!(obj.hasOwnProperty('type'))) {

        console.log('Не корректные данные')
        return false
    }
    reccorrectvalue(obj);
    function reccorrectvalue(o) {
        for (let props in o) {
            if (o[props] === 'panel') {
                if (o.props.hasOwnProperty('width') && o.props.hasOwnProperty('height') && o.props.hasOwnProperty('visible')) {
                } else {
                    console.log('Не хватает свойств у элемента панель')
                    return false
                }
            }
            if (o[props] === 'label') {
                if (o.props.hasOwnProperty('caption') && o.props.hasOwnProperty('visible')) {
                    //   console.log('Все ок')
                } else {
                    console.log('Не хватает свойств у элемента лейбл')
                    return false
                }
            }
            if (o[props] === 'button') {
                if (o.props.hasOwnProperty('width') && o.props.hasOwnProperty('height') && o.props.hasOwnProperty('visible') && o.props.hasOwnProperty('caption')) {
                    //    console.log('Все ок')
                } else {
                    console.log('Не хватает свойств у элемента button')
                    return false
                }
            }

            switch (props || o[props]) {
                case 'type':
                    (o[props] === 'panel') ? (Flag = true) : (o[props] === 'label') ? (Flag = true) : (o[props] === 'button') ? (Flag = true) : (Flag = false);

                    break;
                case 'props':
                    break;
                case 'panel':
                    break;
                case 'width':
                    if (typeof o[props] !== 'number') {
                        console.log('Ошибка в свойстве, ожидается number')
                        Flag = false;
                    }
                    break;
                case 'height':
                    if (typeof o[props] !== 'number') {
                        console.log('Ошибка в свойстве, ожидается number')
                        Flag = false;
                    }
                    break;
                case 'visible':
                    if (typeof o[props] !== 'boolean') {
                        console.log('Ошибка в свойстве, ожидается boolean')
                        Flag = false;
                    }
                    break;
                case 'button':
                    break;
                case 'caption':
                    if (typeof o[props] !== 'string') {
                        console.log('Ошибка в свойстве, ожидается string')
                        Flag = false;
                    }
                    break;
                case 'label':
                    break;


                default:
                    console.log('Ошибка! Доступны: panel,button,caption ', o[props])

                    Flag = false;
                    break;
            }

            if (typeof o[props] === 'object' && Flag) {
                reccorrectvalue(o[props]);
            }
        }
    }

}
export default correctvalue;