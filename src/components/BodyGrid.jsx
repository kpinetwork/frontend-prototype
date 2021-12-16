import React from 'react'
import ContentLoader from 'react-content-loader'

const HeadBodyGrid = ({ ...rest }) => (
    <ContentLoader viewBox="0 0 400 475" {...rest}>
    <rect x="0" y="235" rx="4" ry="4" width="400" height="13" />
    <rect x="0" y="0" rx="4" ry="4" width="400" height="13" />
    <rect x="0" y="230" rx="5" ry="5" width="400" height="10" />
    <rect x="0" y="20" rx="5" ry="5" width="400" height="200" />
  </ContentLoader>
)

HeadBodyGrid.metadata = {
  name: 'RoyalBhati',
  github: 'royalbhati',
  description: 'Dev.to card',
  filename: 'DevtoCard'
}

export default HeadBodyGrid
