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
import GeoJSON from 'ol/format/GeoJSON'
import OSM from 'ol/source/OSM'
import Popup from 'ol-popup'
import { transform, fromLonLat } from 'ol/proj'
import PreviewWindow from './PreviewWindow'

// materialui
import Box from '@mui/material/Box'

// axios
import axios from "axios";

function MapWrapper(props) {

  const [map, setMap] = useState()
  const [pop, setPop] = useState()
  const [image, setImage] = useState()
  const [profile, setProfile] = useState()
  const [seller, setSeller] = useState()
  const [title, setTitle] = useState()
  const [location, setLocation] = useState()
  const mapElement = useRef()

  //  https://stackoverflow.com/a/60643670
  const mapRef = useRef()
  mapRef.current = map
  const popRef = useRef()
  popRef.current = pop

  const handleMapClick = async (event) => {
    //  https://stackoverflow.com/a/60643670
    mapRef.current.removeOverlay("popup")
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel)
    const clickedFeatures = mapRef.current.getFeaturesAtPixel(event.pixel)
    if (clickedFeatures.length > 0) {
      popRef.current.show(event.coordinate, document.getElementById("popup"))
      const transformedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
      await matchData(transformedCoord)
    }
    else {
      popRef.current.hide()
    }
  }


  useEffect(() => {
    // I did not use mockaroo here, because I could not find an easy way to do it.
    const featuresLayerURL = "/samplefeatures";

    const featuresLayer = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: featuresLayerURL
      }),

      declutter: true
    });
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        featuresLayer
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: fromLonLat([-118.73196500, 34.07866968]),
        zoom: 12,
      }),
      controls: []
    })
    const initialPop = new Popup({
      positioning: 'center-center'
    });
    initialMap.addOverlay(initialPop)
    initialPop.hide()
    initialMap.on('click', handleMapClick)

    setPop(initialPop)
    setMap(initialMap)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const matchData = async (coords) => {
    const result = await axios(
      "https://my.api.mockaroo.com/items/" + 2 + "?key=59c3eda0"
    );
    setImage(result.data.imgList[0])
    setProfile(result.data.profileURL)
    setSeller(result.data.sellerName)
    setTitle(result.data.title)
    setLocation(result.data.location)
  }

  return (
    <>
      <Box component="span" sx={{ display: "block", height: "calc(100vh - 59px)", width: "100vw", m: 0, p: 0 }} ref={mapElement}></Box>
      <Box id="popup" sx={{ display: "block", zIndex: 99999 }}>
        <PreviewWindow image={image} profile={profile} seller={seller} title={title} location={location} />
      </Box>
    </>
  )

}

export default MapWrapper
