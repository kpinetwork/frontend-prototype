const isValidValue = (value) => {
  return value && value !== ''
}

export const getIndexArray = (values, validateName = false) => {
  return values.map((elem, index) => {
    const isNotEmpty = elem && elem !== ''
    const condition = validateName ? isNotEmpty && elem.startsWith(':') : isNotEmpty
    if (condition) return index
    return null
  }).filter(elem => elem != null)
}

export const getValueFromRow = (row, indexColumn, arrayValues) => {
  const _index = arrayValues.filter(index => index <= indexColumn).pop()
  return row[_index]
}

const getCompanyScenarioFromRow = (companyScenario, metricName, year) => {
  const scenarioActive = companyScenario || {}
  const yearScenario = scenarioActive[year] || []
  yearScenario.push(metricName)
  return { ...scenarioActive, ...{ [year]: yearScenario } }
}

const getCompany = (companyRow) => {
  const company = {
    company_name: companyRow[1]
  }
  if (isValidValue(companyRow[0])) {
    company.company_id = companyRow[0]
  }
  return company
}

const getCompanyScenarios = (head, companyRow, scenariosIndex, metricsIndex) => {
  const scenarios = {}
  for (const indexYear of getIndexArray(head[2])) {
    if (isValidValue(companyRow[indexYear])) {
      const year = head[2][indexYear].split(':')[1]
      const metricName = getValueFromRow(head[1], indexYear, metricsIndex).split(':')[1]
      const scenarioName = getValueFromRow(head[0], indexYear, scenariosIndex).split(':')[1]
      scenarios[scenarioName] = getCompanyScenarioFromRow(scenarios[scenarioName], metricName, year)
    }
  }
  return scenarios
}

export const getObjectFromPreview = (head, body) => {
  const scenariosIndex = getIndexArray(head[0], true)
  const metricsIndex = getIndexArray(head[1], true)
  const toSend = body.map((companyRow) => {
    const company = getCompany(companyRow)
    company.scenarios = getCompanyScenarios(head, companyRow, scenariosIndex, metricsIndex)
    return company
  })
  return toSend
}

export const getFirstScenarioIndex = (row) => {
  return row.findIndex(elem => elem.startsWith(':'))
}

export const getMetricsFromPreview = (head) => {
  const metrics = [...new Set(head[1])]
  return metrics.map(metric => metric.split(':').join('')).filter(metric => metric !== '')
}
