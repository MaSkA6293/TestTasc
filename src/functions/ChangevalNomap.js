// Без  функции map


export default function getCopy(obj, parts, value) {
    function getinclud(objectIN, parts, i) {
        i++
        if (i < parts.length) {
            for (let key in objectIN) {
                if (key === parts[i] && parts[i] === 'props') {
                    let itemObj = {
                        ...objectIN, [parts[i]]: { ...objectIN.props }
                    }
                    let B = getinclud(itemObj[parts[i]], parts, i)
                    return { ...itemObj, [parts[i]]: { ...B } }
                }
                if (key === parts[i] && parts[i] === 'width') {
                    return {
                        ...objectIN, width: value
                    }
                    //return itemObj
                }
                // return
            }
        }
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
    }
    let i = 0;
    let itemObj = {
        ...obj, content: obj.content.forEach((u, key) => {
            if (key === +parts[i]) {
                let V = getinclud(u, parts, i);
                {...V}
}
return u
}
        )
    }
return itemObj
}
