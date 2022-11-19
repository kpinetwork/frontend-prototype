import { useState, useEffect } from 'react'
import { getMetricRanges, getRangesByMetric, modifyMetricRanges } from '../service/metricRanges'
import { getMetricsType } from '../service/metrics'

const useMetricRanges = () => {
  const [allMetricRanges, setAllRanges] = useState([])
  const [totalRanges, setTotalRanges] = useState()
  const [metricRanges, setMetricRanges] = useState([])
  const [initMetricRanges, setInitMetricRanges] = useState([])
  const [rangesToDelete, setRangesToDelete] = useState([])
  const [metrics, setMetrics] = useState([])
  const [editedRanges, setEditedRanges] = useState([])
  const [metricSelected, setMetricSelected] = useState(null)
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isRangesLoading, setIsRangesLoading] = useState(true)
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
    setAllRanges([])
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
      setAllRanges(ranges)
      return ranges
    } catch (_error) {
      setTotal(0)
      setAllRanges([])
      return []
    }
  }

  const getRangesBySpecificMetric = async (metric) => {
    try {
      setIsRangesLoading(true)
      const result = await getRangesByMetric(metric)
      setIsRangesLoading(false)
      setInitMetricRanges(result)
      setMetricRanges(result)
      return result
    } catch (_error) {
      setMetricRanges([])
      setIsRangesLoading(false)
      return []
    }
  }

  const getBaseMetrics = async () => {
    try {
      const result = await getMetricsType()
      setMetrics([...result, 'Gross profit', 'Revenue per employee'])
    } catch (_error) {
      setMetrics([])
    }
  }

  const modifyRanges = async (metric) => {
    try {
      setIsLoading(true)
      const response = await modifyMetricRanges(getModifiedRanges(metric))
      setIsLoading(false)
      if (response.updated) {
        initData({ limit: pageSize, offset })
      }
      return response.updated
    } catch (_error) {
      setIsLoading(false)
      return false
    }
  }

  const initRanges = async (limit, offset) => {
    setIsLoading(true)
    const ranges = await getRanges({ limit, offset })
    setIsLoading(false)
    return ranges
  }

  const getEdgeRanges = (allRanges) => allRanges.filter(range => range?.min_value === null || range?.max_value === null).map(range => range.id)

  const getRangesToAdd = () => {
    const rangesToAdd = metricRanges.filter(range => !range.id)
    if (editedRanges.filter(range => range.id).length === 0 && getEdgeRanges(rangesToAdd).length === rangesToAdd.length && initMetricRanges.length === 0) {
      return []
    }
    return rangesToAdd
  }

  const getModifiedRanges = (metric) => {
    return {
      metric_ranges: {
        key: metric,
        label: 'million',
        ranges_to_update: editedRanges.filter(range => range.id),
        ranges_to_add: getRangesToAdd(),
        ranges_to_delete: rangesToDelete.filter(id => id)
      }
    }
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
    setAllRanges(totalRanges.slice(offset, max))
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
    isRangesLoading,
    allMetricRanges,
    metricSelected,
    metricRanges,
    editedRanges,
    rangesToDelete,
    setMetricRanges,
    setRangesToDelete,
    getRangesBySpecificMetric,
    handleChangePage,
    setMetricSelected,
    handleChangePageSize,
    setEditedRanges,
    modifyRanges
  }
}

export default useMetricRanges

function destructuring (result) {
  return {
    ranges: result.ranges,
    total: result.total
  }
}
