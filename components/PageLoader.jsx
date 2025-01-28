import React from 'react'
import ShuffleLoader from './ShuffleLoader'

const PageLoader = ({loaderSize=40, isVisible=true}) => {
  return (
    <div className={`w-full min-h-screen ${isVisible?'flex': 'hidden'} flex-row items-center justify-center`}>
        <ShuffleLoader color='#042028' size={loaderSize}/>
    </div>
  )
}

export default PageLoader