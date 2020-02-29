import correctvalue from './correctvalue'
import changeVal from './ChangeVal';
import AddVal from './AddVal';

const gettrack_value = function (obj, track, value) {
    // убираю из пути внутри объкта [ ]
    let parts = track.replace(/(\[?)(\d+)(\]?])/g, '.$2');
    //убираем из value все пробелы
    const regex2 = /\s+/g;
    value = value.replace(regex2, '');
    // Разбиваю строку на массив
    parts = parts.split('.');
    // Если есть слово content убираю
    if (parts.length > 1 && parts[0] === 'content') {
        parts.splice(0, 1);
    }

    if (track !== '') {
        function ifTrack(obj, parts) {
            let copy = [...obj.content]
            for (let i = 0; i < parts.length; i++) {
                if (copy[parts[i]] === undefined) {
                    return console.log('Объект не имеет такой путь');
                }
                else copy = { ...copy[parts[i]] }
            }
            return copy
        }
        // исследуем объект
        let copy = ifTrack(obj, parts)
        if (copy === undefined) {
            return copy
        }


        if (parts[parts.length - 1] === 'props') {
            console.log('Путь не корректен, свойство props ')
            return undefined;
        }
        if (copy.type === 'label') {
            console.log('Путь не корректен, Укажите свойство для элемента', copy.type)
            return undefined;
        }
        if (copy.type === 'button') {
            console.log('Путь не корректен, Укажите свойство для элемента', copy.type)
            return undefined;
        }



        if (((parts[parts.length - 1] === 'content') && value) || ((copy.type === 'panel') && value)) {
            // если конечный путь в переданном треке content то выполнится эта ветка
            let k = value;
            try {
                k = k.replace('type', '"type"');
                k = k.replace('props', '"props"');
                k = k.replace('visible', '"visible"');
                k = k.replace('width', '"width"');
                k = k.replace('height', '"height"');
                k = k.replace('caption', '"caption"');
                const regex1 = /'/g;
                k = k.replace(regex1, '"');

                // Переменная для контроля корректности данных
                let strtoJSON = JSON.parse(k);
                // Проверка на соотвествие разрешенным типам и свойствам данных
                // функция вернет флаг, если флаг укажет false значит добавляемый объект не корректен
                const result = correctvalue(strtoJSON);
                if (result === false) {
                    return undefined
                }

                const addinPanel = AddVal(obj, parts, strtoJSON, 0);

                return addinPanel;

            }
            catch (err) {
                console.log('Ошибка в свойствах объекта')
            }
        }
        else {

            // если конечный путь в переданном треке не панель,
            // а значит мы хотим просто изменить значение то выполнится эта ветка
            const changeValue = changeVal(obj, parts, value, 0);
            return changeValue;
        }
    }
    else {
        // если хотим добавить в content новый элемент
        if ((track === '' && value)) {
            let z = value;
            try {
                z = z.replace('type', '"type"');
                z = z.replace('props', '"props"');
                z = z.replace('visible', '"visible"');
                z = z.replace('width', '"width"');
                z = z.replace('height', '"height"');
                z = z.replace('caption', '"caption"');
                const regex1 = /'/g;
                z = z.replace(regex1, '"');

                // Переменная для контроля корректности данных
                let strtoJSONforcontent = JSON.parse(z);
                // Проверка на соотвествие разрешенным типам и свойствам данных
                // функция вернет флаг, если флаг укажет false значит добавляемый объект не корректен
                const result = correctvalue(strtoJSONforcontent);
                if (result === false) {
                    console.log('Не корректные данные в поле Новое значение')
                    return undefined
                }
                let addNewObj = {
                    ...obj, content: [...obj.content, strtoJSONforcontent]
                }
                return addNewObj;
            }
            catch (err) {
                console.log('Ошибка в свойствах объекта')
                return undefined;
            }
        }
    }

};

export default gettrack_value;