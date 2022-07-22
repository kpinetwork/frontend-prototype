import { getValueFromRow, getIndexArray } from '../../../utils/validateFile/getObjectToValidate'

export const useTrackChanges = (
  { changeObject, addObject, deleteObject, initialData, head }
) => {
  const getScenarioFromValues = (array, objectToFind, field) => {
    return array.filter(elem => elem[field] === objectToFind[field])
  }

  const removeFromObject = (arrayObject, scenarios) => {
    if (!arrayObject || arrayObject.length <= 0) return scenarios
    return scenarios.filter(item => item !== arrayObject[0])
  }

  const getScenario = (initialScenario, value, toModify = false) => {
    const data = { metric_id: initialScenario.metric_id }
    const scenarios = {
      true: { ...data, value },
      false: { ...data, scenario_id: initialScenario.scenario_id }
    }
    return scenarios[toModify]
  }

  const modifyObject = (scenarioFiltered, scenarios, initialScenario, value, toModify = false) => {
    const shouldBeAdded = scenarioFiltered == null || scenarioFiltered.length === 0
    if (shouldBeAdded) {
      const scenarioToAdd = getScenario(initialScenario, value, toModify)
      scenarios.push(scenarioToAdd)
    }
    if (!shouldBeAdded && toModify) {
      scenarioFiltered[0].value = value
    }
  }

  const addScenariosToDelete = (data, initialScenario, dataDelete, initialCompany) => {
    const added = getScenarioFromValues(data.scenarios, initialScenario, 'metric_id')
    const alreadyAdded = getScenarioFromValues(dataDelete.scenarios, initialScenario, 'metric_id')

    data.scenarios = removeFromObject(added, data.scenarios)
    modifyObject(alreadyAdded, dataDelete.scenarios, initialScenario, '', false)

    deleteObject[initialCompany.id] = dataDelete
  }

  const getNameFromRow = (header, index, forScenario = false) => {
    let valuesIndex = getIndexArray(header)
    if (forScenario) {
      const yearsIndex = getIndexArray(head[2])
      valuesIndex = getIndexArray([...head[0]].splice(yearsIndex[0]))
      header = [...header].splice(yearsIndex[0])
      index = index - yearsIndex[0]
    }
    return getValueFromRow(header, index, valuesIndex)
  }

  const getScenarioToAdd = (column, companyId) => {
    const year = getNameFromRow(head[2], column)
    const metric = getNameFromRow(head[1], column)
    const scenarioName = getNameFromRow(head[0], column, true)

    return {
      year, metric, scenario: scenarioName, company_id: companyId
    }
  }

  const compareScenarios = (elem, scenario) => {
    const data = { ...elem }
    delete data.value
    return JSON.stringify(data) === JSON.stringify(scenario)
  }

  const addNewScenarios = (column, initialCompany, value) => {
    const scenario = getScenarioToAdd(column, initialCompany.id)

    const dataAdd = addObject[initialCompany.id] || []
    const added = dataAdd.filter(elem => compareScenarios(elem, scenario))

    if (added && added.length > 0) {
      added[0].value = value
    } else {
      scenario.value = value
      dataAdd.push(scenario)
    }
    addObject[initialCompany.id] = dataAdd
  }

  const addScenariosToModify = (data, dataDelete, initialScenario, initialCompany, value) => {
    data = JSON.parse(JSON.stringify(data))
    const alreadyAdded = getScenarioFromValues(data.scenarios, initialScenario, 'metric_id')
    const deleted = getScenarioFromValues(dataDelete.scenarios, initialScenario, 'metric_id')

    dataDelete.scenarios = removeFromObject(deleted, dataDelete.scenarios)

    modifyObject(alreadyAdded, data.scenarios, initialScenario, value, true)
    changeObject[initialCompany.id] = data
  }

  const removeFromNewScenarios = (initialCompany, column) => {
    const scenario = getScenarioToAdd(column, initialCompany.id)

    const added = addObject[initialCompany.id].filter(elem => compareScenarios(elem, scenario))

    addObject[initialCompany.id] = addObject[initialCompany.id].filter(elem => elem !== added[0])
  }

  const removeFromObjectWithValue = (initialScenario, object) => {
    if (object.scenarios == null) return
    const elems = object.scenarios.filter(elem => elem.metric_id === initialScenario.metric_id)
    object.scenarios = object.scenarios.filter(elem => elem !== elems[0])
  }

  const removeFromAddAndDelete = (data, initialScenario, dataDelete) => {
    removeFromObjectWithValue(initialScenario, data)
    removeFromObjectWithValue(initialScenario, dataDelete)
  }

  const trackerDescriptionChange = (column, fieldsLenght, value, field, initialCompany, data) => {
    if (column < fieldsLenght) {
      if (value !== initialCompany[field]) {
        const description = data.description
        data.description = { ...description, [field]: value }
        changeObject[initialCompany.id] = data
      }
    }
  }

  const trackEditChange = (initialValue, value, data, dataDelete, initialScenario, initialCompany) => {
    const parseInitialValue = `${initialValue}`
    if (initialValue && value !== '' && parseInitialValue !== value) {
      addScenariosToModify(data, dataDelete, initialScenario, initialCompany, value)
    }
  }

  const trackAddChange = (initialValue, value, column, initialCompany) => {
    if (!initialValue && value !== '') {
      addNewScenarios(column, initialCompany, value)
    }
  }

  const trackDeleteChange = (initialValue, value, data, dataDelete, initialScenario, initialCompany) => {
    const parseInitialValue = `${initialValue}`
    if (initialValue && value === '' && parseInitialValue !== value) {
      addScenariosToDelete(data, initialScenario, dataDelete, initialCompany)
    }
  }

  const trackRemoveRecords = (initialValue, value, column, data, dataDelete, initialScenario, initialCompany) => {
    const parseInitialValue = `${initialValue}`
    if (initialValue == null && value === '') {
      removeFromNewScenarios(initialCompany, column)
    } else if (parseInitialValue === value) {
      removeFromAddAndDelete(data, initialScenario, dataDelete)
    }
  }

  const trackChange = (row, column, value, field) => {
    value = value.trim()
    const initialCompany = initialData[row]
    const fieldsLenght = Object.keys(initialCompany).length - 1
    const company = { id: initialCompany.id, description: {}, scenarios: [] }
    const data = changeObject[initialCompany.id] || company
    const dataDelete = deleteObject[initialCompany.id] || { scenarios: [] }

    trackerDescriptionChange(column, fieldsLenght, value, field, initialCompany, data)

    if (column < fieldsLenght) return
    const initialScenario = initialCompany.scenarios[column - fieldsLenght]
    const initialValue = initialScenario.value

    trackEditChange(initialValue, value, data, dataDelete, initialScenario, initialCompany)
    trackAddChange(initialValue, value, column, initialCompany)
    trackDeleteChange(initialValue, value, data, dataDelete, initialScenario, initialCompany)
    trackRemoveRecords(initialValue, value, column, data, dataDelete, initialScenario, initialCompany)
  }

  return {
    trackChange
  }
}
