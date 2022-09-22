import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "../CSS/Home.css"
export default function ActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 1000, height: 700 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="500"
          image={props.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
               
            <button className='button' onClick={()=>{}}>{props.buton}</button>
            
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}