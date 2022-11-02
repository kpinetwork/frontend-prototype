import { useState, useEffect } from 'react'
import { getMetricRanges } from '../service/metricRanges'
import { getMetricsType } from '../service/metrics'

const useMetricRanges = () => {
  const [metricRanges, setRanges] = useState([])
  const [totalRanges, setTotalRanges] = useState()
  const [metrics, setMetrics] = useState([])
  const [metricSelected, setMetricSelected] = useState(null)
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [pageSize, setPageSize] = useState(100)
  const [page, setPage] = useState(0)
  const [maxPage, setMaxPage] = useState(0)

  useEffect(() => {
    (async () => {
      await initData({ limit: pageSize, offset })
    })()
    return () => setDefaultValues()
  }, [])

  const setDefaultValues = () => {
    setTotal(0)
    setRanges([])
    setMetrics([])
    setIsLoading(false)
  }

  const initData = async (options) => {
    setIsLoading(true)
    await getBaseMetrics()
    const ranges = await getRanges(options)
    setTotalRanges(ranges)
    setIsLoading(false)
  }

  const getRanges = async (options) => {
    try {
      const result = await getMetricRanges(options)
      const { total, ranges } = destructuring(result)
      setTotal(total)
      setRanges(ranges)
      return ranges
    } catch (_error) {
      setTotal(0)
      setRanges([])
      return []
    }
  }

  const getBaseMetrics = async () => {
    try {
      const result = await getMetricsType()
      setMetrics([...result, 'Gross profit'])
    } catch (_error) {
      setMetrics([])
    }
  }

  const initRanges = async (limit, offset) => {
    setIsLoading(true)
    const ranges = await getRanges({ limit, offset })
    setIsLoading(false)
    return ranges
  }

  const handleChangePageSize = async (newPageSize) => {
    const newOffset = 0
    setPageSize(newPageSize)
    setPage(0)
    setOffset(newOffset)
    setMaxPage(0)
    const newRanges = await initRanges(newPageSize, newOffset)
    setTotalRanges(newRanges)
  }

  const handleChangePage = async (_event, newPage) => {
    const firstTimeCalled = newPage > page && newPage > maxPage
    if (newPage > page && firstTimeCalled) {
      await callNextRanges(newPage)
    } else {
      setRangesFromTotalRanges(newPage, pageSize)
    }
  }

  const setRangesFromTotalRanges = (newPage, newRowsPerPage) => {
    setPage(newPage)
    const offset = newPage * newRowsPerPage
    const max = (newPage - page) < 0 ? page * newRowsPerPage : offset + newRowsPerPage
    setRanges(totalRanges.slice(offset, max))
  }

  const callNextRanges = async (newPage) => {
    const nextOffset = (newPage * pageSize)
    setOffset(nextOffset)
    setPage(newPage)
    setMaxPage(newPage)
    const ranges = await initRanges(pageSize, nextOffset)
    setTotalRanges([...metricRanges, ...ranges])
  }

  return {
    page,
    total,
    metrics,
    pageSize,
    isLoading,
    metricRanges,
    metricSelected,
    handleChangePage,
    setMetricSelected,
    handleChangePageSize
  }
}

export default useMetricRanges

function destructuring (result) {
  return {
    ranges: result.ranges,
    total: result.total
  }
}