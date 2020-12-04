import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export const getId = item => get(item, 'id')

export const findIndexAndUpdateById = (arrayOfObjects, updateObject) => {
  const updateIndex = findIndex(
    arrayOfObjects,
    object => getId(object) === getId(updateObject),
  )
  arrayOfObjects[updateIndex] = updateObject
}
