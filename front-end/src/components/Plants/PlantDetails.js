import React, { Component } from 'react'

class PlantDetails extends Component {
  render() {
    let plantId=window.location.href.split('/')[4]
    return (
      <div>
        <div className='grid grid-cols-3 gap-2 p-2'>
          {/* Row 1 */}
          <div className=' col-span-3 bg-slate-500 h-14'><h1>PlantDetails: {plantId}</h1></div>
          {/* Row 2 */}
          <div className=' bg-slate-400'>Applied On 12/12/22</div>
          <div className=' col-span-2 row-span-3 bg-slate-400'><img alt="plant Image" style={{height:"200px"}}/></div>
          {/* Row 3 */}
          <div className=' bg-slate-500'> DOB: 11/11/22</div>
          {/* Row 4 */}
          <div className=' bg-slate-400'>Apply Interval: 10</div>
          {/* Row 5 */}
          <div className=' col-span-3 bg-slate-500 h-16'>Plant details</div>
        </div>
      </div>
    )
  }
}

export default PlantDetails