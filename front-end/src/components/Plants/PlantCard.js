import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PlantCard({plant}) {
  let imageUrl="http://localhost:8080/plant/downloadImage/"+plant.imageName
  return (
    <div className='float-left pr-1 pl-1 pt-3 shadow-lg w-1/5 h-auto'>
      <Card sx={{ border: 1, borderRadius: 2 }}>
        <CardMedia
          component="img"
          height="40"
          image={imageUrl}
          alt={plant.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {plant.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}
