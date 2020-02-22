function correctvalue(obj) {
    let Flag = true;

    reccorrectvalue(obj);
    function reccorrectvalue(o) {
        for (let props in o) {
            switch (props || o[props]) {
                case 'type':
                    //    console.log('ветка тип');
                    //    console.log('Тип', props);
                    //    console.log('свойство', o[props]);
                    (o[props] === 'panel') ? (Flag = true) : (o[props] === 'label') ? (Flag = true) : (o[props] === 'button') ? (Flag = true) : (Flag = false);
                    //  console.log('Ошибка в свойстве, ожидается panel,label,button')
                    // console.log('Значение тИПА', o[props])
                    //   if (Flag === false) {
                    //          console.log('Ошибка в свойстве, ожидается panel,label,button');
                    //       }
                    //   console.log('flag', Flag);

                    break;
                case 'props':
                    //    console.log('Пропс', props)
                    break;
                case 'panel':
                    //     console.log('Панель', o[props])
                    break;
                case 'width':
                    //  console.log('Ширина', o[props])
                    if (typeof o[props] !== 'number') {
                        console.log('Ошибка в свойстве, ожидается number')
                        Flag = false;
                    }
                    break;
                case 'height':
                    //    console.log('Высота', o[props])
                    if (typeof o[props] !== 'number') {
                        console.log('Ошибка в свойстве, ожидается number')
                        Flag = false;
                    }
                    break;
                case 'visible':

                    //    console.log('ВИЗИБЛ', o[props])
                    if (typeof o[props] !== 'boolean') {
                        console.log('Ошибка в свойстве, ожидается boolean')
                        Flag = false;
                    }
                    break;
                case 'button':
                    //    console.log('Кнопка', o[props])
                    break;
                case 'caption':
                    // console.log('Надпись', o[props])
                    if (typeof o[props] !== 'string') {
                        console.log('Ошибка в свойстве, ожидается string')
                        Flag = false;
                    }
                    break;
                case 'label':
                    //  console.log('Лейбл', o[props])
                    break;


                default:
                    console.log('Ошибка! такого Типа! Доступны: panel,button,caption ', o[props])

                    Flag = false;
                    break;
            }





            //   console.log('свойство ', props)
            //console.log(' значение', o[props])
            //  console.log('тип', typeof o[props]);
            if (typeof o[props] === 'object' && Flag) {
                reccorrectvalue(o[props]);
            }
        }
    }

}
export default correctvalue;