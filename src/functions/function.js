//import correctvalue from './correctvalue'
import correctvalue2 from './correctvalue copy'
import getFiniteValue from './getFiniteValue'
import getFiniteValueforOBJ from './getFiniteValueforOBJ'
import getFiniteValueforContent from './getFiniteValueforContent'
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
    // Переменная для использования копии объекта в качестве исследовании корректности пути
    let trackinobject = obj.slice();

    // Переменная для использования копии объекта
    let out = obj.slice();

    // если хотим добавить прямо в объект новый элемент
    if ((track === '' && value) || (parts[parts.length - 1] === 'content')) {
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
            const result = correctvalue2(strtoJSONforcontent);
            if (result === false) {
                return
            }
            // Переменная добавляет content [ ] в JSON 
            if (track === '' && value) {
                let gtr = [...out, strtoJSONforcontent];
                return gtr;
            }
            else {
                let ffff = getFiniteValueforContent(out, strtoJSONforcontent, parts);

                return ffff
            }
        }
        catch (err) {
            console.log('Ошибка в свойствах объекта')
        }
    }




    // Если блок пройден значит путь существует, если нет то в консоль отобразится ошибка
    for (let i = 0; i < parts.length; i++) {
        if (trackinobject[parts[i]] === undefined) {
            return console.log('Объект не имеет такой путь');
        } else {
            trackinobject = trackinobject[parts[i]]
        }
    };

    if (trackinobject.type === 'panel' && value) {


        // если конечный путь в переданном треке панель то выполнится эта ветка
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
            const result = correctvalue2(strtoJSON);
            if (result === false) {
                return
            }
            // Переменная добавляет content [ ] в JSON 
            const addcontenttoobject = JSON.parse('{"content":[' + k + ']}');

            const huk2 = getFiniteValueforOBJ(out, addcontenttoobject.content, parts);


            return huk2;

        }
        catch (err) {
            console.log('Ошибка в свойствах объекта')
        }
    }
    else {
        // если конечный путь в переданном треке не панель,
        // а значит мы хотим просто изменить значение то выполнится эта ветка
        const huk = getFiniteValue(out, parts, value);
        return huk;
    }

};

export default gettrack_value;