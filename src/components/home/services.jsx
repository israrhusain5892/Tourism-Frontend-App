// src/components/Services.js
import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Grid, Container, Box } from "@mui/material";
import { styled, useTheme } from '@mui/system';

const services = [
  {
    title: "Tour Planning",
    description: "Customized tour plans tailored to your preferences and interests.",
    image: "https://img.freepik.com/free-vector/travel-destination-choosing-accommodation-booking-system_335657-2503.jpg?t=st=1717576159~exp=1717579759~hmac=66e8943e2c798c39f7bbd068c08a3477fc6f2ba76180e8c34d3d0220665a7a0d&w=996",
  },
  {
    title: "Accommodation Booking",
    description: "Find and book the best hotels and accommodations at great prices.",
    image: "https://img.freepik.com/free-vector/flat-hotel-booking-concept-background_52683-10036.jpg?t=st=1717576439~exp=1717580039~hmac=f91ee64c2a922d0060d17903f571fe420aaf4fe2a586b7476a48884db57f55f0&w=740",
  },
  {
    title: "Adventure Activities",
    description: "Experience thrilling adventure activities including trekking, rafting, and more.",
    image: "https://img.freepik.com/free-vector/cartoon-people-hiking-together_23-2149012383.jpg?t=st=1717576602~exp=1717580202~hmac=1e9a0a21ff30b3262833d853f28b5da2c22f60dad5772999c46cfb340986e147&w=996",
  },
  {
    title: "Cultural Tours",
    description: "Discover the rich cultural heritage of various regions with guided cultural tours.",
    image: "https://img.freepik.com/free-vector/hand-drawn-map-india_52683-15299.jpg?t=st=1717576676~exp=1717580276~hmac=9245d5f37908789252ad38a3037e9ea9ce05a98263f03f3f5d0072dc2f17d0d3&w=740",
  },
];

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#fff',
  transition: 'transform 0.3s, box-shadow 0.3s',
  boxShadow: theme?.shadows?.[10] || '10px 10px 10px rgba(0, 0, 0, 0.3)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme?.shadows?.[10] || '0 3px 20px #600180',
  },
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: theme?.spacing?.(2) || '16px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme?.palette?.primary?.main || 'rgb(21 128 61 / 0.9)',
  borderColor: 'rgb(21 128 61 / 0.9)',
  '&:hover': {
    backgroundColor:'rgb(21 128 61 / 0.9)',
    borderColor: 'rgb(21 128 61 / 0.9)',
    color: '#fff',
  },
}));

const StyledTypography = styled(Typography)(({ theme, variant }) => ({
  ...(variant === "h5" && {
    fontWeight: 'bold',
    color: theme?.palette?.secondary?.main || '#ff4081',
  }),
  ...(variant === "body2" && {
    color: theme?.palette?.text?.secondary || '#757575',
  }),
  textAlign: 'center',
  marginBottom: theme?.spacing?.(3) || '24px',
}));

const Services = () => {
  const theme = useTheme();
  
  return (
    <Container className="pt-28">
  <Typography variant="h3" className="text-center pb-8 font-bold text-green-700">
    {/* <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Services</h2> */}
    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Services</h1>
  </Typography>
  <Grid container spacing={4} className="p-4">
    {services.map((service, index) => (
      <Grid item xs={12} md={6} key={index}>
        <StyledCard theme={theme}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CardMedia
                className="h-48 w-full object-cover"
                image={service.image}
                title={service.title}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <StyledTypography
                  variant="h5"
                  component="h2"
                  theme={theme}
                >
                  {service.title}
                </StyledTypography>
                <StyledTypography
                  variant="body2"
                  theme={theme}
                >
                  {service.description}
                </StyledTypography>
                <Box display="flex" justifyContent="center">
                  <StyledButton variant="outlined" theme={theme}>
                    Read More
                  </StyledButton>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </StyledCard>
      </Grid>
    ))}
  </Grid>
</Container>

  );
};

export default Services;
