import { useEffect, useState } from 'react'
import { getEditModifyData, updateEditModifyData, deleteScenarios } from '../service/editModifyData'
import { isEmptyObject } from '../utils/userFunctions'

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

  useEffect(() => {
    getData()
  }, [reload])

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

  const getData = async () => {
    setLoading(true)
    try {
      const response = await getEditModifyData()
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

  const getEditValues = () => {
    return Object.values(changeObject).map(elem => {
      const data = { ...elem }
      data.scenarios = data.scenarios.map(scenario => ({ ...scenario, value: Number(scenario.value) }))
      return data
    })
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
      if (deleted == null || deleted.length === 0) return
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
  }

  return {
    modifying,
    isLoading,
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
