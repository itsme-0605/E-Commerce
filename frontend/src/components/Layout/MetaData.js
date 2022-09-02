import React from 'react'
import Helmet from "react-helmet"



//giving title of every Page / component
const MetaData = ({title}) => {
  return (
    <Helmet><title>{title}</title></Helmet>
  )
}

export default MetaData