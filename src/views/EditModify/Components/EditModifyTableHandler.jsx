export const getHeaderValue = (headerArray, index) => {
  for (let i = index; i >= 0; i--) {
    if (headerArray[i] !== '') {
      return headerArray[i]
    }
  }
}

export const getColumnsValues = (data) => {
  const valuesColumns = []
  if (data.length !== 0) {
    for (let i = 0; i < data[0].scenarios.length; i++) {
      const currentColumn = {
        title: '',
        field: 'scenarios[' + i + '].value',
        type: 'numeric',
        filtering: false,
        cellStyle: {
          textAlign: 'center',
          borderRightStyle: 'solid',
          borderRightColor: '#DEDEDE',
          borderRightWidth: 1
        }
      }
      valuesColumns.push(currentColumn)
    }
    return valuesColumns
  } else {
    return []
  }
}

export const processChanges = (changes) => {
  const allChanges = []
  Object.keys(changes).forEach((value) => {
    const allScenariosModified = []
    changes[value].newData.scenarios.forEach((scenario) => {
      if (scenario.metric_id !== undefined && !isNaN(scenario.value)) {
        allScenariosModified.push({
          metric_id: scenario.metric_id,
          value: scenario.value
        })
      }
    })
    allChanges.push({
      id: value,
      description: {
        name: changes[value].newData.name,
        inves_profile_name: changes[value].newData.inves_profile_name
      },
      scenarios: allScenariosModified
    })
  })
  return allChanges
}

export const processScenarios = (scenarios, headers, newValues, value) => {
  scenarios.forEach((scenario, index) => {
    if (scenario.value === undefined || isNaN(scenario.value)) {
      return
    }
    if (scenario.metric_id === undefined) {
      newValues.push({
        year: parseInt(headers[2][index + 5]),
        metric: getHeaderValue(headers[1], index + 5),
        scenario: getHeaderValue(headers[0], index + 5),
        company_id: value,
        value: scenario.value,
        period_name: 'Full-year'
      })
    }
  })
}

export const processDeletedValues = (scenarios, deletedValues) => {
  scenarios.forEach((scenario) => {
    if (scenario.value !== undefined && isNaN(scenario.value)) {
      deletedValues.push({
        metric_id: scenario.metric_id,
        scenario_id: scenario.scenario_id
      })
    }
  })
}

export const getModifiedData = (changes, headers) => {
  const allChanges = processChanges(changes)
  const newValues = []
  const deletedValues = []
  Object.keys(changes).forEach((value) => {
    processScenarios(changes[value].newData.scenarios, headers, newValues, value)
    processDeletedValues(changes[value].newData.scenarios, deletedValues)
  })
  return { edit: allChanges, add: newValues, delete: deletedValues }
}
