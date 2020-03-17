
// рефакторинг для users reducer функция помагает изменить в массиве какой-то объект
export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map( user => {
        if (user[objPropName] === itemId) {
            return {...user, ...newObjProps}
        }
        return user
    })
};