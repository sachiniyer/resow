import React, { useEffect, useState } from "react";
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature';
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
    <MapWrapper features={features} />
  )
}

export default Homepage;


