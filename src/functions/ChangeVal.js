export default function getCopy(obj, parts, value, i) {
    function getinclud(objectIN, parts, i) {
        i++
        if (i < parts.length) {
            for (let key in objectIN) {
                if (key === parts[i] && parts[i] === 'props') {
                    //копия уровня пропс
                    //        let itemObj = {
                    //                ...objectIN, [parts[i]]: { ...objectIN.props }
                    // ...objectIN, [parts[i]]: { ...objectIN.props }
                    //           }

                    let B = getinclud(objectIN[parts[i]], parts, i)
                    //let B = getinclud(itemObj[parts[i]], parts, i)

                    if (B !== false) {
                        return { ...objectIN, [parts[i]]: B }
                    }
                    else {
                        return B
                    }
                }

                if (key === parts[i] && parts[i] === 'content') {
                    //   let itemObj = {
                    //          ...objectIN, [parts[i]]: [...objectIN.content]
                    //      }
                    //копия уровень контент
                    i++
                    let B = getCopy(objectIN, parts, value, i)

                    if (B !== false) {
                        i--
                        return { ...objectIN, [parts[i]]: B.content }
                    }
                    else {
                        return B
                    }
                }


                if (key === parts[i] && parts[i] === parts[parts.length - 1]) {
                    // if (key === parts[i] && parts[i] === 'width') {
                    if (typeof objectIN[key] === 'number') {
                        if (!value.match(/^\d+$/)) {
                            console.log('Можно ввести только число')
                            return false;
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
                            return false;
                        }
                    }
                    else {
                        //o[prop] = value;
                        return { ...objectIN, [parts[i]]: value };
                    }

                }





                // if (key === parts[i] && parts[i] === 'width') {
                //     return {
                //         ...objectIN, width: value
                //     }

                // }


            }
        }
    }



    // if (key === parts[i] && parts[i] === 'width' && parts[i] === parts[parts.length - 1]) {
    //     return {
    //         ...objectIN, width: value
    //     }
    //     //return itemObj
    // }

    // }




    // for (let key in objectIN) {
    //     if (key === parts[i] && parts[i]==='props') {
    //         let itemObj = {
    //             ...objectIN, props: { ...objectIN.props }
    //         }
    //         if (i < parts.length) {
    //             let h = getinclud(itemObj, i)
    //         }
    //         return itemObj 
    //     }
    //     if (key === 'content') {
    //         let itemObj = {
    //             ...objectIN, content: objectIN.content.map((u) => {
    //                 if (u.props) {
    //                     return getinclud(u)
    //                 }
    //                 return { ...u }
    //             }
    //             )

    //         }
    //         return { ...itemObj }
    //     }

    // }

    // function getCopyinobj(obj, parts, i) {
    //     i++;
    //     let contentobj = [
    //         ...obj, obj.map((u, key) => {
    //             if (key === +parts[i]) {
    //                 return { ...u }
    //                 //let H = getinclud(u, parts, i)
    //                 //   if (H) {
    //                 //          return H
    //                 //       }
    //                 //      else {
    //                 //           return undefined
    //                 //        }
    //             }
    //             return u
    //         }
    //         )

    //     ]
    //     // взврат копии уровня Content вложенный
    //     return contentobj
    // }


    //let i = 0;
    let itemObj = {
        ...obj, content: obj.content.map((u, key) => {
            if (key === +parts[i]) {
                let H = getinclud(u, parts, i)
                if (H) {
                    return H
                }
                else {
                    return undefined
                }
                //      return getinclud(u, parts, i)
            }
            return u
        }
        )
    }
    if (!itemObj.content[parts[0]]) {
        return undefined
    }
    return itemObj
}
