export default function getCopy(obj) {
    function getinclud(objectIN) {
        for (let key in objectIN) {
            if (key === 'props') {
                let itemObj = {
                    ...objectIN, props: { ...objectIN.props }
                }
                return { ...itemObj }
            }
            if (key === 'content') {
                let itemObj = {
                    ...objectIN, content: objectIN.content.map((u) => {
                        if (u.props) {
                            return getinclud(u)
                        }
                        return { ...u }
                    }
                    )

                }
                return { ...itemObj }
            }
        }
    }

    let itemObj = {
        ...obj, content: obj.content.map((u) => {
            if (u.props) {
                return getinclud(u)
            }
            return { ...u }
        }
        )
    }
    return itemObj
}
