export const getCompanyInvestments = (companyID) => {
  return [
    {
      company_id: companyID,
      id: '123',
      investment_date: '2019-02',
      divestment_date: null,
      round: 1,
      structure: 'Primary',
      ownership: 'Minority',
      investor_type: 'Private equity'
    }
  ]
}

export const addCompanyInvestment = (companyID, investment) => {
  return { company_id: companyID, investment: investment, added: true }
}
