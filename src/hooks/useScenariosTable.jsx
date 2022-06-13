import { useState, useEffect } from 'react'
import useCompanyPanel from './useCompanyPanel'
import useCompaniesToChange from './useCompaniesToChange'
import { changeCompanyPublicly } from '../service/changeCompanyPublicly'
import useCompanyDetails from '../hooks/useCompanyDetails'

const useScenariosTable = () => {
  const [offset, setOffset] = useState(0)
  const { total, scenarios, isLoading, setScenarios} = useCompanyDetails({ limit: rowsPerPage, offset })
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [maxPage, setMaxPage] = useState(0)
  const [totalScenarios, setTotalScenarios] = useState([])

  useEffect(() => {
    initScenarios(rowsPerPage, offset)
  }, [])

  const initScenarios = async (limit, offset) => {
    const response = await getCompanyPanel({ limit, offset })
    setTotalCompanies(response)
  }

  const callNextCompanies = async (newPage) => {
    const nextOffset = newPage * rowsPerPage
    setOffset(nextOffset)
    setPage(newPage)
    setMaxPage(newPage)
    const response = await getCompanyPanel({ limit: rowsPerPage, offset: nextOffset })
    setTotalCompanies([...totalCompanies, ...response])
  }

  const setCompaniesFromTotalCompanies = (newPage, newRowsPerPage) => {
    setPage(newPage)
    const offset = newPage * newRowsPerPage
    const max = (newPage - page) < 0 ? page * newRowsPerPage : offset + newRowsPerPage
    setCompanies(totalCompanies.slice(offset, max))
  }

  const onSave = async (_) => {
    if (Object.keys(companiesToChange).length > 0) {
      await changeCompanyPublicly({ companies: companiesToChange })
    }
    setChange(false)
    await getCompanyPanel({ limit: rowsPerPage, offset: page * rowsPerPage })
  }

  const handleChangePage = (_event, newPage) => {
    const firstTimeCalled = newPage > page && newPage > maxPage
    if (newPage > page && firstTimeCalled) {
      callNextCompanies(newPage)
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
    initCompanies(nextRowPerPage, newOffset)
  }

  return {
    initCompanies,
    rowsPerPage,
    offset,
    wantsChange,
    setChange,
    isLoading,
    companies,
    handleChange,
    isCompanyChecked,
    total,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    cleanCompaniesToChange,
    onSave
  }
}

export default useCompaniesPanelTable
