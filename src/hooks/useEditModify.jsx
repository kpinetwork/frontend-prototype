import { useEffect, useState } from 'react'
import { getEditModifyData, updateEditModifyData, deleteScenarios } from '../service/editModifyData'
import { getCompanies } from '../service/company'
import { isEmptyObject } from '../utils/userFunctions'
import { INVESTOR_PROFILES, SECTORS, VERTICALS } from '../utils/constants/CompanyDescription'

export const useEditModify = () => {
  const [reload, setReload] = useState(false)
  const [body, setBody] = useState([])
  const [initialData, setInitialData] = useState([])
  const [head, setHead] = useState([])
  const [changeObject, setChangeObject] = useState({})
  const [addObject, setAddObject] = useState({})
  const [deleteObject, setDeleteObject] = useState({})
  const [edit, setEdit] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [openErrorFormat, setOpenErrorFormat] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [recordsAdded, setRecordsAdded] = useState({})
  const [updated, setUpdated] = useState(false)
  const [errorObject, setErrorObject] = useState({})
  const [openResetModal, setOpenResetModal] = useState(false)
  const [deleted, setDeleted] = useState(0)
  const [modifying, setModifying] = useState(false)
  const [openResponse, setOpenResponse] = useState(false)
  const [companies, setCompanies] = useState([])
  const [filters, setFilters] = useState({
    names: [],
    sectors: [],
    verticals: [],
    investor_profiles: [],
    scenarios: []
  })

  useEffect(() => {
    getData()
  }, [reload, filters])

  const getBody = (bodyData) => {
    const values = Object.values(bodyData)
    return JSON.parse(JSON.stringify(values))
  }

  const buildErrorObject = (body) => {
    const errors = Object.fromEntries(
      body.map((_elem, index) => [
        [index], []
      ])
    )
    setErrorObject(errors)
  }

  const getAllCompanies = async () => {
    try {
      const companiesObject = await getCompanies()
      setCompanies(companiesObject.companies.map(company => company.name))
    } catch (_error) {
      setCompanies([])
    }
  }

  const getData = async () => {
    setLoading(true)
    await getAllCompanies()
    await getEditData()
    setLoading(false)
  }

  const getFilters = () => {
    return Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [key, value.join(',')])
    )
  }

  const getEditData = async () => {
    setLoading(true)
    try {
      const params = getFilters()
      const response = await getEditModifyData({ filters: params })
      const {
        namesHead,
        yearsHead,
        metricsHead,
        bodyArray
      } = destructuring(response)
      setHead([namesHead, metricsHead, yearsHead])
      setBody(getBody(bodyArray))
      setInitialData(getBody(bodyArray))
      buildErrorObject(getBody(bodyArray))
    } catch (_error) {
      setBody([])
      setHead([])
      setInitialData([])
      setChangeObject({})
      setAddObject({})
      setDeleteObject({})
      setErrorMessage('Cannot get edit/modify data')
    }
    setLoading(false)
  }

  const resetData = () => {
    setBody(JSON.parse(JSON.stringify(initialData)))
    setOpenResetModal(false)
  }

  const findName = (company, names, field) => {
    if (company.description[field]) {
      const nameArray = names.filter(name => name.toLowerCase() === company.description[field])
      company.description = { ...company.description, [field]: nameArray[0] }
    }
  }

  const parseSelectValues = (values) => {
    values.forEach((company) => {
      findName(company, INVESTOR_PROFILES, 'inves_profile_name')
      findName(company, SECTORS, 'sector')
      findName(company, VERTICALS, 'vertical')
    })
  }

  const getEditValues = () => {
    const toEdit = Object.values(changeObject).map(elem => {
      const data = { ...elem }
      data.scenarios = data.scenarios.map(scenario => ({ ...scenario, value: Number(scenario.value) }))
      return data
    }).filter((company) => company.scenarios.length > 0 || !isEmptyObject(company.description))
    parseSelectValues(toEdit)

    return toEdit
  }

  const getAddValues = () => {
    if (isEmptyObject(addObject)) return []
    return Object.values(addObject).reduce((prev, curr) => {
      return [...prev, ...curr]
    }).map(scenario => ({ ...scenario, value: Number(scenario.value), year: parseInt(scenario.year) }))
  }

  const getDeleteValues = () => {
    return Object.values(deleteObject).map((elem) => {
      return [...elem.scenarios]
    }).reduce((prev, curr) => {
      return [...prev, ...curr]
    })
  }

  const deleteMetrics = async () => {
    try {
      const deleted = getDeleteValues()
      if (deleted == null || deleted.length === 0) return 0
      const response = await deleteScenarios({
        scenarios: deleted
      })
      return response['scenarios deleted']
    } catch (error) {
      return 0
    }
  }

  const modifyData = async () => {
    const edit = getEditValues()
    const add = getAddValues()
    if (edit.length === 0 && add.length === 0) return { edited: true, added: {} }
    const body = { add, edit }
    try {
      const response = await updateEditModifyData(body)
      return response
    } catch (error) {
      setErrorMessage('Cannot modify records, please try again')
      return { edited: false, added: {} }
    }
  }

  const updateEditData = async () => {
    setModifying(true)
    const modified = await modifyData()
    const deleted = await deleteMetrics()

    setUpdated(modified.edited)
    setRecordsAdded(modified.added)
    setDeleted(deleted)
    setModifying(false)
    setOpenResponse(true)
    setReload(!reload)
    setEdit(false)
    clear()
  }

  const clear = () => {
    setChangeObject({})
    setAddObject({})
    setDeleteObject({})
  }

  return {
    clear,
    modifying,
    isLoading,
    companies,
    filters,
    body,
    head,
    initialData,
    edit,
    openErrorFormat,
    changeObject,
    addObject,
    deleteObject,
    errorObject,
    updated,
    deleted,
    recordsAdded,
    errorMessage,
    openResetModal,
    openResponse,
    setFilters,
    setOpenResponse,
    setEdit,
    setChangeObject,
    setAddObject,
    setDeleteObject,
    setErrorMessage,
    buildErrorObject,
    setOpenErrorFormat,
    updateEditData,
    modifyData,
    setOpenResetModal,
    resetData
  }
}

function destructuring (result) {
  const {
    years: yearsHead,
    headers: namesHead,
    metrics: metricsHead,
    companies: bodyArray
  } = result
  return {
    namesHead,
    yearsHead,
    metricsHead,
    bodyArray
  }
}
