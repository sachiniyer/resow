import React, { useEffect, useState } from "react";
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature';
import Box from '@mui/material/Box'

import MapWrapper from "../components/Map";

function Homepage() {
  const [features, setFeatures] = useState([])

  useEffect(() => {
    let parsedFeatures = [
      new Feature({
        geometry: new Point([0, 0]),
        name: "some point"
      })
    ]
    setFeatures(parsedFeatures)

  }, [])


  return (

    <Box sx={{ height: 1, width: 1 }}>
      <MapWrapper features={features} />
    </Box>
  )
}

export default Homepage;


