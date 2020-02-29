export default function getCopy(obj, parts, value, i) {
    function getinclud(objectIN, parts, i) {
        i++
        if (i < parts.length) {
            for (let key in objectIN) {
                if (key === parts[i] && parts[i] === 'props') {

                    let B = getinclud(objectIN[parts[i]], parts, i)

                    if (B !== false && B !== undefined) {
                        return { ...objectIN, [parts[i]]: B }
                    }
                    else {
                        console.log('Ошибка редактирования свойсв элемента')
                        return undefined
                    }
                }

                if (key === parts[i] && parts[i] === 'content') {
                    i++
                    let B = getCopy(objectIN, parts, value, i)

                    if (B !== false && B !== undefined) {
                        i--
                        return { ...objectIN, [parts[i]]: B.content }
                    }
                    else {
                        console.log('Ошибка редактирования свойсв элемента')
                        return undefined
                    }
                }
                if (key === parts[i] && parts[i] === parts[parts.length - 1]) {
                    if (typeof objectIN[key] === 'number') {
                        if (!value.match(/^\d+$/)) {
                            console.log('Можно ввести только число')
                            return undefined;
                        }
                        else {
                            return {
                                ...objectIN, [parts[i]]: +value
                            }

                        }
                    }

                    if (typeof objectIN[key] === 'boolean') {
                        if (value.match(/^\btrue\b$|^\bfalse\b$/) !== null) {
                            if (value === 'true') {
                                return {
                                    ...objectIN, [parts[i]]: Boolean(value)
                                }
                            }
                            else {
                                return {
                                    ...objectIN, [parts[i]]: Boolean(!value)
                                }
                            }
                        }
                        else {
                            console.log('доступно только true или false')
                            return undefined;
                        }
                    }
                    else {
                        return { ...objectIN, [parts[i]]: value };
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
