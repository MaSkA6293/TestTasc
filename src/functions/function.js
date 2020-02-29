//import correctvalue from './correctvalue'
import correctvalue from './correctvalue'
//import getFiniteValue from './getFiniteValue'
import getFiniteValueforOBJ from './getFiniteValueforOBJ'
//import getFiniteValueforContent from './getFiniteValueforContent'
//import copyobj from './copyobj';
//import getCopy from './getcopyobj';
import changeVal from './ChangeVal';
//import ChangevalNomap from './ChangevalNomap';
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
            const result = correctvalue(strtoJSONforcontent);
            if (result === false) {
                console.log('Не корректные данные в поле Новое значение')
                return undefined
            }
            // Переменная добавляет content [ ] в JSON 

            if (track === '' && value) {
                let addNewObj = {
                    ...obj, content: [...obj.content, strtoJSONforcontent]
                }

                return addNewObj;
            }
            else {
                //     let addNewObjinObj = getFiniteValueforContent(obj, strtoJSONforcontent, parts);

                //   return addNewObjinObj
            }
        }
        catch (err) {
            console.log('Ошибка в свойствах объекта')
            return undefined;
        }
    }




    // Если блок пройден значит путь существует, если нет то в консоль отобразится ошибка
    // создаем новую глубокую копию для исследования объекта
    // let copyArr = copyobj(obj.content);
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

    //let G = [...copyArr];


    // let G = getCopy(obj);
    // let G = changeVal(obj, parts, value)
    // изменил  копию
    // let K = G.content[0].props.width = 9000000
    //изменил и копию и объект
    // let K2 = G.content[2].props.width = 9000
    // console.log(K);
    // console.log(K2);







    if (copy.type === 'panel' && value) {


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
            const result = correctvalue(strtoJSON);
            if (result === false) {
                return
            }
            // Переменная добавляет content [ ] в JSON 
            const addcontenttoobject = JSON.parse('{"content":[' + k + ']}');

            const addinPanel = getFiniteValueforOBJ(obj, addcontenttoobject.content, parts);


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

};

export default gettrack_value;