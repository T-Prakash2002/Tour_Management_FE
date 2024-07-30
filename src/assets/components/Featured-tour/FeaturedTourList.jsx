import React, { useEffect } from 'react';
import TourCard from '../shared/TourCard';
import { Col } from 'reactstrap';
import useFetch from '../../hooks/useFetch'
import {  BASE_URL } from '../../../utils/config'

const FeaturedTourList = () => {


  const {data:featuredTours,error,loading}=useFetch(`${BASE_URL}/tours/search/getFeaturedTour`);

  console.log(featuredTours);

  return (
    <>
    {
      loading && <h4>Loading...</h4>
    }
    {
      error && <h4>{error}</h4>
    }
      {
        !loading && 
        !error &&
        featuredTours?.map(
          tour => (
            <Col lg='3' key={tour._id}>
              <TourCard tour={tour} />
            </Col>
          )
        )
      }
    </>
  )
}

export default FeaturedTourList;
