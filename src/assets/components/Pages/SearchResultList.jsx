import React, { useState } from 'react';
import '../styles/SearchResultList.css'
import CommonSection from '../shared/CommonSection';
import { Container,Row,Col } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import TourCard from '../shared/TourCard';


const SearchResultList = () => {
  const location = useLocation();

  const [data]=useState(location.state);

  console.log(data)

  return (
    <div className="search-result-list">
      <CommonSection title={'Tour search results'} />

      <section>
        <Container>
          <Row>
            {
              data.length === 0 ?
              <Col className="text-center" md={12}>
                <h3>No results found</h3>
              </Col>
              :
              data.map((tour, index) => (
                <Col key={index} md={4} lg={3} className="mb-4">
                  <TourCard tour={tour} />
                </Col>
              ))
            }
          </Row>
        </Container>
      </section>
      
    </div>
  )
}

export default SearchResultList;
