import React from 'react'
import ContentLoader from 'react-content-loader'

const ProductLoader = () => (
  <ContentLoader
    width={450}
    height={600}
    viewBox="0 0 450 600"
    backgroundColor="#dcdcdc"
    foregroundColor="#bfbfbf"
  >
    <rect x="30" y="490" rx="4" ry="4" width="271" height="9" />
    <rect x="30" y="520" rx="3" ry="3" width="350" height="7" />
    <rect x="30" y="50" rx="10" ry="10" width="388" height="420" />
    <rect x="30" y="550" rx="3" ry="3" width="50" height="9" />
  </ContentLoader>
)

export default ProductLoader