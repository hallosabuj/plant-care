import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
        <div className=' bg-orange-200 h-[200px] rounded-md'>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {fertilizer.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </div>
      </Card>
    </div>
  );
}
