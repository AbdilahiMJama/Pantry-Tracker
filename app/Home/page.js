import * as React from 'react';
import {Box, Container, Grid, Typography, ImageListItem, ImageList} from '@mui/material';
import Head from 'next/head';
import picnicBasket from '../../public/picnicbasket.jpg';
import Image from 'next/image';
//import { ThemeProvider } from '@mui/material/styles'; 
const itemData = [
    {
        img: '/milk.png',
        title: 'Image',
    },
    {
        img: '/apple.png',
        title: 'Image',
    }
]
export default function Home() {
  return (
  <Container maxWidth="99vw">
    <Head>
        <title>Open Basket</title>
        <meta name="description" content="Open Basket - Your Detailed Pantry Tracking App" />
    </Head>
    <Box
    my={5}
    textAlign={'center'}
    justifyContent={'center'}
    >
      <Box
      display={'flex'}
      justifyContent={'center'}
      textAlign={'center'}>
      <Typography variant={'h2'} marginRight={"10px"}>Open Basket</Typography>
      <img src="/picnicbasket.jpg" alt="picnic basket" width="70" height="60"/>
      </Box>
      <Typography variant={'h6'} my={1}>Your Detailed Pantry Tracking App</Typography> 
    </Box>
    <ImageList sx={{width:500, height:450, marginLeft:55}} cols={3} rowHeight={164}>
        {itemData.map((item) => (
            <ImageListItem key={item.img}>
                <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=1`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading='lazy'
                />
            </ImageListItem>
        ))}

    </ImageList>
  </Container>
  );
}