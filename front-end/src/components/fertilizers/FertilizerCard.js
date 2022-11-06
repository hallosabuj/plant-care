import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

export default function FertilizerCard({ fertilizer }) {
  let imageUrl = "http://localhost:8080/fertilizer/downloadImage/" + fertilizer.imageName
  return (
    <div className='float-left pr-1 pl-1 pt-3 shadow-lg lg:w-1/6 md:w-1/3'>
      <Card sx={{ border: 1, borderRadius: 2, height: "500px", backgroundColor: "cyan" }}>
        <div className='h-[300px] bg-lime-900 flex justify-center items-center p-2 rounded-md'>
          <CardMedia
            component="img"
            image={imageUrl}
            alt={fertilizer.name}
            sx={{maxHeight:"100%",maxWidth:"100%"}}
          />
        </div>
        <div className=' bg-orange-200 h-[200px] rounded-md flex justify-center items-center'>
          <div className='grid grid-cols-3 grid-rows-3 gap-2'>
            {/* Row 1 */}
            <div className='bg-red-400 col-span-2 flex justify-center items-center'>Name: NPK</div>
            <div className='bg-red-400 flex justify-center items-center'>DEL</div>
            {/* Row 2 */}
            <div className='bg-green-600 col-span-3 flex justify-center items-center'>Apply Interval: 22/11/22</div>
            <div className='bg-green-600 col-span-3 flex justify-center items-center'>Availability: </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
