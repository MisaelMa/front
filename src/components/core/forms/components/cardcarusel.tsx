import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import {
  Paper,
  Box,
  Container,
  Button,
  Card,
  CardHeader,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

interface Pack {
  image: string;
  headline: string;
  plan: string;
  costos: string;
  price: string;
  color: string;
  ventajas: string[];
}

interface PropsCardOption {
  plan: string;
  select: (plant: string, price: string) => void;
}

const arrowStyle = {
  background: `transparent`,
  border: 0,
  fontSize: `55px`,
};

const useStyles = makeStyles({
  root: {
    borderRadius: `10px`,
    margin: `0px`,
    height: `290px`,
  },
  card: {
    margin: `2px`,
  },
});
const CustomRight = ({ onClick }) => (
  <ArrowForwardIosIcon
    onClick={onClick}
    className="arrow right"
    style={{ fontSize: `30px`, ...arrowStyle }}
  />
);
const CustomLeft = ({ onClick }) => (
  <ArrowBackIosIcon
    onClick={onClick}
    className="arrow left"
    style={{ fontSize: `30px`, ...arrowStyle }}
  />
);
const CardCarusel = (props: PropsCardOption) => {
  const packages: Pack[] = [
    {
      image: `../450/1.450.svg`,
      headline: `BENEFICIOS`,
      color: `#F9B233`,
      plan: `Plan Velocidad 8/1 mb`,
      costos: `../450/2.450.svg`,
      price: `$450.00`,
      ventajas: [
        `Sin limite de consumo.`,
        `Hasta 5 dispositivos conectados al mismo tiempo.`,
        `Redes Sociales.`,
      ],
    },
    {
      image: `../599/1.599.svg`,
      headline: `BENEFICIOS`,
      color: `#E94E1B`,
      plan: `Plan Velocidad 12/2 mb`,
      costos: `../599/2.599.svg`,
      price: `$599.00`,
      ventajas: [
        `Sin limite de consumo.`,
        `Hasta 9 dispositivos conectados al mismo tiempo.`,
        `Streaming multimedia.`,
        `Redes Sociales.`,
      ],
    },
    {
      image: `../899/1.899.svg`,
      headline: `BENEFICIOS`,
      color: `#E71D73`,
      plan: `Plan Velocidad 15/5 mb`,
      costos: `../899/2.899.svg`,
      price: `$899.00`,
      ventajas: [
        `Sin limite de consumo.`,
        `Sin limite de dispositivo.`,
        `Streaming multimedia.`,
        `Redes Sociales.`,
      ],
    },
    {
      image: `../949/1.949.svg`,
      headline: `BENEFICIOS`,
      color: `#95C11F`,
      plan: `Plan Velocidad 15/10 mb`,
      costos: `../949/2.949.svg`,
      price: `$949.00`,
      ventajas: [
        `Sin limite de consumo.`,
        `Sin limite de dispositivos.`,
        `Streaming multimedia.`,
        `Redes Sociales.`,
      ],
    },
  ];
  const classes = useStyles();
  // @ts-ignore
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      keyBoardControl
      focusOnSelect={false}
      centerMode={false}
      // @ts-ignore
      customLeftArrow={<CustomLeft />}
      // @ts-ignore
      customRightArrow={<CustomRight />}
      infinite={false}
      renderButtonGroupOutside
      renderDotsOutside
      itemClass={classes.card}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 3,
          partialVisibilityGutter: 40,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 375,
          },
          items: 3,
          partialVisibilityGutter: 30,
        },
        mobile: {
          breakpoint: {
            max: 375,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 0,
        },
      }}
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {packages.map((card, index) => (
        <Box
          key={index}
          boxShadow={props.plan === card.plan ? 20 : 0}
          style={{
            borderRadius: `10px`,
            height: `290px`,
            marginTop: `10px`,
            marginBottom: `10px`,
          }}
        >
          <Card
            key={card.headline}
            style={{
              backgroundColor: props.plan === card.plan ? card.color : ``,
              color: props.plan === card.plan ? `white` : `#524b4b`,
            }}
            onClick={() => {
              props.select(card.plan, card.price);
            }}
            className={classes.root}
          >
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              style={{ backgroundColor: card.color }}
              image={card.image}
            />
            <CardContent style={{ padding: `0px` }}>
              <Typography
                align="center"
                variant="h6"
                style={{
                  color: props.plan === card.plan ? `white` : `#524b4b`,
                }}
                component="h1"
              >
                {card.headline}
              </Typography>
              <div>
                <ul>
                  {card.ventajas.map((v) => (
                    <li key={v}> {v}</li>
                  ))}
                </ul>
              </div>
              <div style={{ textAlign: `center`, marginTop: `-15px` }}>
                <img height="125px" width="125px" src={card.costos} />
              </div>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Carousel>
  );
};

export default CardCarusel;
