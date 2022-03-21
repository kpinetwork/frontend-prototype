import { useState } from 'react'

const useCompaniesToChange = () => {
  const [companiesToChange, setCompaniesToChange] = useState({})

  const isCompanyChecked = ({ company, field }) => {
    const { id } = company
    const publicField = company[field]
    if (id in companiesToChange) {
      return companiesToChange[id]
    }
    return publicField
  }

  const handleChange = ({ event, company, field }) => {
    const checked = event.target.checked
    const { id } = company
    const publicField = company[field]
    setCompaniesToChange(prev => {
      if (checked !== publicField) {
        return ({ ...prev, [id]: !publicField })
      } else {
        delete prev[id]
        return ({ ...prev })
      }
    })
  }

  const cleanCompaniesToChange = async (_) => {
    setCompaniesToChange({})
  }

  return { companiesToChange, isCompanyChecked, handleChange, cleanCompaniesToChange }
}

export default useCompaniesToChange
