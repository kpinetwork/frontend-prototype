import { useEffect, useState } from 'react'
import { getPublicCompanies } from '../service/company'

const usePublicCompanies = () => {
  const [total, setTotal] = useState(0)
  const [companies, setCompanies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [page, setPage] = useState(0)
  const [offset, setOffset] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalCompanies, setTotalCompanies] = useState([])
  const [maxPage, setMaxPage] = useState(0)

  useEffect(() => {
    initCompanies(rowsPerPage, offset)
    return () => setDefaultValues()
  }, [])

  const setDefaultValues = () => {
    setTotal(0)
    setCompanies([])
    setIsLoading(false)
  }

  const getCompanies = async (options) => {
    setIsLoading(true)
    try {
      const result = await getPublicCompanies(options)
      const { total, companiesArray } = destructuring(result)
      setTotal(total)
      setCompanies(companiesArray)
      return companiesArray
    } catch (_error) {
      setTotal(0)
      setCompanies([])
      return []
    } finally {
      setIsLoading(false)
    }
  }

  const initCompanies = async (limit, offset) => {
    const response = await getCompanies({ limit, offset })
    setTotalCompanies(response)
  }

  const callNextCompanies = async (newPage) => {
    const nextOffset = newPage * rowsPerPage
    setOffset(nextOffset)
    setPage(newPage)
    setMaxPage(newPage)
    const response = await getCompanies({ limit: rowsPerPage, offset: nextOffset })
    setTotalCompanies([...totalCompanies, ...response])
  }

  const setCompaniesFromTotalCompanies = (newPage, newRowsPerPage) => {
    setPage(newPage)
    const offset = newPage * newRowsPerPage
    const max = (newPage - page) < 0 ? page * newRowsPerPage : offset + newRowsPerPage
    setCompanies(totalCompanies.slice(offset, max))
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
    total,
    companies,
    isLoading,
    page,
    offset,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage
  }
}

export default usePublicCompanies

function destructuring (result) {
  return {
    companiesArray: result.companies,
    total: result.total
  }
}
