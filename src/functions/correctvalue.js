function correctvalue(obj) {
    let Flag = true;
    console.log('переданный объект', obj)
    reccorrectvalue(obj);
    function reccorrectvalue(o) {
        for (let props in o) {
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