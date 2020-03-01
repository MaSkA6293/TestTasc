
export default function getCopy(obj, parts, value, i) {
    function getinclud(objectIN, parts, i) {
        i++
        if (i === parts.length) {
            // значит элемент панель
            if (objectIN.hasOwnProperty('content')) {
                return { ...objectIN, content: [...objectIN.content, value] }
            }
            else { return { ...objectIN, content: [value] } }

        }
        if (i < parts.length) {
            for (let key in objectIN) {
                if (key === parts[i] && parts[i] === 'content') {

                    //копия уровень контент
                    if (parts[i] === parts[parts.length - 1] && i === parts.length - 1) {
                        return { ...objectIN, content: [...objectIN.content, value] }
                    }

                    i++
                    let B = getCopy(objectIN, parts, value, i)

                    if (B !== false && B !== undefined) {
                        i--
                        return { ...objectIN, [parts[i]]: B.content }
                    }
                    else {
                        console.log('Ошибка редактирования свойсв элемента')
                        return undefined
                        //  return B
                    }
                }
            }
        }
    }
    let err = '';
    let itemObj = {
        ...obj, content: obj.content.map((u, key) => {
            if (key === +parts[i]) {
                let H = getinclud(u, parts, i)
                if (H) {
                    return H
                }
                else {
                    err = undefined;
                    return undefined
                }
            }
            return u
        }
        )
    }
    if (err === undefined) {
        return undefined
    }
    return itemObj
}
