import { useEffect, useState } from 'react'
import { getEditModifyData, updateEditModifyData, deleteScenarios } from '../service/editModifyData'

export const useEditModify = () => {
  const [reload, setReload] = useState(false)
  const [body, setBody] = useState([])
  const [head, setHead] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [modifying, setModifying] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorObject, setErrorObject] = useState({})
  const [filters, setFilters] = useState({
    names: [],
    sectors: [],
    verticals: [],
    investor_profiles: [],
    scenarios: []
  })

  useEffect(() => {
    getData()

    return () => {
      setDefaultValues()
    }
  }, [reload, filters])

  const setDefaultValues = () => {
    setBody([])
    setHead([])
  }

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
      buildErrorObject(getBody(bodyArray))
    } catch (_error) {
      setDefaultValues()
      setErrorMessage('Cannot get edit/modify data')
    }
    setLoading(false)
  }

  const deleteMetrics = async (deleted) => {
    try {
      if (deleted == null || deleted.length === 0) return 0
      const response = await deleteScenarios({
        scenarios: deleted
      })
      return response['scenarios deleted']
    } catch (error) {
      return 0
    }
  }

  const modifyData = async (edit, add) => {
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

  const updateEditData = async (modifiedData) => {
    setModifying(true)
    await modifyData(modifiedData.edit, modifiedData.add)
    await deleteMetrics(modifiedData.delete)
    setModifying(false)
    setReload(!reload)
  }

  return {
    isLoading,
    modifying,
    filters,
    body,
    head,
    errorObject,
    errorMessage,
    setFilters,
    setErrorMessage,
    buildErrorObject,
    updateEditData,
    modifyData,
    setBody,
    setHead,
    deleteMetrics
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
