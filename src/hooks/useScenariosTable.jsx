import { useState, useEffect, useContext } from 'react'
import Context from '../context/appContext'
import { addCompanyScenario, getCompanyDetails, deleteCompanyScenarios } from '../service/companyDetails'

const useScenariosTable = () => {
  const { selectedCompanyID } = useContext(Context).company
  const [offset, setOffset] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [maxPage, setMaxPage] = useState(0)
  const [totalScenarios, setTotalScenarios] = useState([])
  const [company, setCompany] = useState({})
  const [scenarios, setScenarios] = useState([])
  const [total, setTotal] = useState(0)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    initScenarios(rowsPerPage, offset)
  }, [])

  const initScenarios = async (limit, offset) => {
    const response = await getScenarios({ limit, offset })
    setTotalScenarios(response)
  }

  const getScenarios = async (options) => {
    try {
      setLoading(true)
      const response = await getCompanyDetails({ selectedCompanyID, ...options })
      setCompany({ id: response.id, name: response.name })
      setScenarios(response.scenarios.metrics)
      setTotal(response.scenarios.total)
      setLoading(false)
      return response.scenarios.metrics
    } catch (_error) {
      setScenarios([])
      setTotal(0)
      setLoading(false)
    }
  }

  const addScenario = async (scenario, limit, offset) => {
    try {
      setLoading(true)
      const response = await addCompanyScenario(selectedCompanyID, scenario)
      setPage(0)
      setRowsPerPage(10)
      setMaxPage(0)
      setScenarios([])
      initScenarios(limit, offset)
      // await getScenarios({ limit, offset })
      return response.added
    } catch (_error) {
      setLoading(false)
      return false
    }
  }

  const deleteScenarios = async (scenarios, limit, offset) => {
    try {
      setLoading(true)
      const response = await deleteCompanyScenarios(selectedCompanyID, scenarios)
      setPage(0)
      setRowsPerPage(10)
      setMaxPage(0)
      setScenarios([])
      initScenarios(limit, offset)
      // await getScenarios({ limit, offset })
      return response.scenarios_deleted
    } catch (_error) {
      setLoading(false)
      return 0
    }
  }

  const callNextScenarios = async (newPage) => {
    const nextOffset = (newPage * rowsPerPage)
    setOffset(nextOffset)
    setPage(newPage)
    setMaxPage(newPage)
    const response = await getScenarios({ limit: rowsPerPage, offset: nextOffset })
    setTotalScenarios([...totalScenarios, ...response])
  }

  const setCompaniesFromTotalCompanies = (newPage, newRowsPerPage) => {
    setPage(newPage)
    const offset = newPage * newRowsPerPage
    const max = (newPage - page) < 0 ? page * newRowsPerPage : offset + newRowsPerPage
    setScenarios(totalScenarios.slice(offset, max))
  }

  const handleChangePage = async (_event, newPage) => {
    const firstTimeCalled = newPage > page && newPage > maxPage
    if (newPage > page && firstTimeCalled) {
      await callNextScenarios(newPage)
    } else {
      setCompaniesFromTotalCompanies(newPage, rowsPerPage)
    }
  }

  const handleChangeRowsPerPage = (event) => {
    const newOffset = 0
    const nextRowPerPage = +event.target.value
    setRowsPerPage(nextRowPerPage)
    setPage(0)
    setOffset(newOffset)
    setMaxPage(0)
    initScenarios(nextRowPerPage, newOffset)
  }

  return {
    rowsPerPage,
    isLoading,
    company,
    scenarios,
    total,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    addScenario,
    deleteScenarios
  }
}

export default useScenariosTable
