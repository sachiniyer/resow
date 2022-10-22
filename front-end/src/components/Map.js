/*
 * This component reacts wierd when used in dev mode, because the map can sometimes be rerendered
 * below the first render when a change is made. I don't think this should happen in a prod env
 */
// react
import React, {
  useState, useEffect, useRef
} from 'react';

// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { transform } from 'ol/proj'

// materialui
import Box from '@mui/material/Box'

function MapWrapper(props) {

  const [map, setMap] = useState()
  const [featuresLayer, setFeaturesLayer] = useState()

  const mapElement = useRef()

  //  https://stackoverflow.com/a/60643670
  const mapRef = useRef()
  mapRef.current = map

  useEffect(() => {
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource()
    })

    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          })
        }),
        initalFeaturesLayer
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 3
      }),
      controls: []
    })

    initialMap.on('click', handleMapClick)

    setMap(initialMap)
    setFeaturesLayer(initalFeaturesLayer)

  }, [])

  useEffect(() => {
    if (props.features && props.features.length) {
      featuresLayer.setSource(
        new VectorSource({
          features: props.features
        })
      )
    }

  }, [props.features, featuresLayer])

  const handleMapClick = (event) => {
    //  https://stackoverflow.com/a/60643670
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);
    const transformedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
    console.log(transformedCoord)

  }
  return (
    <Box sx={{ display: "flex", height: 1000, width: 1000 }} ref={mapElement}></Box>
  )

}

export default MapWrapper
