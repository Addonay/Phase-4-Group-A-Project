import React, { useEffect, useState } from 'react';
import Slideshow from '../assets/Slideshow';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, styled, Card, CardMedia } from '@mui/material';
// import Navbar from "../assets/Navbar";

const WelcomeContainer = styled(Container)({
  marginTop: '2rem', // Increase the top margin
  textAlign: 'center',
  maxWidth: 'lg', // Adjust the maxWidth to control the container's width
});

const WelcomeText = styled(Typography)({
  fontSize: '4rem', // Increase the font size
  fontWeight: 'bold',
});

const ExploreText = styled(Typography)({
  fontSize: '2rem', // Increase the font size
  marginTop: '1rem',
});

const SlideshowContainer = styled(Container)({
  height: '500px', // Increase the height of the Slideshow container
});

const BottomImagesContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '2cm', // Margin at the bottom
});

const SmallCard = styled(Card)({
  width: '150px', // Adjust the width as needed
  height: 'auto',
  margin: '0 1rem', // Margin between cards
});

const SmallImage = styled(CardMedia)({
  width: '100%',
  height: 'auto',
});

function Home() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Fetch the list of brands from your Flask API
    fetch('http://127.0.0.1:5000/')
      .then((response) => response.json())
      .then((data) => setBrands(data.brands))
      .catch((error) => console.error('Error fetching brands:', error));
  }, []);

  return (
    <>
      <WelcomeContainer>
        <WelcomeText>
          Welcome to the Car Dealership App
        </WelcomeText>
        <ExploreText>
          Explore our wide range of cars for sale.
        </ExploreText>
      </WelcomeContainer>
      <SlideshowContainer>
        <Slideshow />
      </SlideshowContainer>
      <BottomImagesContainer>
        {brands.map((brand) => (
          <SmallCard key={brand.id}>
            <Link to={`/${brand.name}/cars`} style={{ textDecoration: 'none' }}>
              <SmallImage
                component="img"
                alt={brand.name}
                src={brand.image_url}
              />
            </Link>
          </SmallCard>
        ))}
      </BottomImagesContainer>
    </>
  );
}

export default Home;
