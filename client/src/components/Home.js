import React, { useEffect, useState } from 'react';
import Slideshow from '../assets/Slideshow';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardMedia, Button } from '@mui/material';
import { styled } from '@mui/system';

const WelcomeContainer = styled(Container)({
  marginTop: '1rem',
  textAlign: 'center',
});

const WelcomeText = styled(Typography)({
  fontSize: '3rem',
  fontWeight: 'bold',
});

const ExploreText = styled(Typography)({
  fontSize: '1.5rem',
  marginTop: '1rem',
});

const CardContainer = styled(Container)({
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'row', // Display cards in a row
  // overflowX: 'auto', // Allow horizontal scrolling if needed
});

const CardImage = styled(Card)({
  width: '100%',
  height: '30%',
  objectFit: 'cover',
  maxWidth: '150px', // Adjust the max width to reduce card size
  margin: '5rem', // Add some margin between cards
  objectPosition: 'absolute',
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
      <WelcomeContainer maxWidth="md">
        <WelcomeText>
          Welcome to the Car Dealership App
        </WelcomeText>
        <ExploreText>
          Explore our wide range of cars for sale.
        </ExploreText>
      </WelcomeContainer>
      <Slideshow />
      <CardContainer>
        {brands.map((brand) => (
          <Card key={brand.id} style={{ flex: '0 0 auto' }}>
            <Link to={`/${brand.name}/cars`} className="card">
              <CardImage
                component="img"
                alt={brand.name}
                src={brand.image_url}
              />
            </Link>
          </Card>
        ))}
      </CardContainer>
    </>
  );
}

export default Home;
