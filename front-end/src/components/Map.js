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
import { fromLonLat } from 'ol/proj'
import PreviewWindow from './PreviewWindow'

// materialui
import Box from '@mui/material/Box'

// axios
import axios from "axios";

function MapWrapper(props) {

  const [map, setMap] = useState()
  const [pop, setPop] = useState()
  const [view, setView] = useState()
  const [image, setImage] = useState()
  const [profile, setProfile] = useState()
  const [seller, setSeller] = useState()
  const [title, setTitle] = useState()
  const [location, setLocation] = useState()
  const [href, setHref] = useState()
  const [userLocation, setUserLocation] = useState()
  const mapElement = useRef()

  //  https://stackoverflow.com/a/60643670
  const mapRef = useRef()
  mapRef.current = map
  const popRef = useRef()
  popRef.current = pop
  const viewRef = useRef()
  viewRef.current = view


  let firstclick = false

  const handleMapClick = async (event) => {
    //  https://stackoverflow.com/a/60643670
    if (!firstclick) {
      const popup = document.getElementById("popup")
      popup.setAttribute("style", "display: block")
      firstclick = true
    }
    //const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel)
    const clickedFeatures = mapRef.current.getFeaturesAtPixel(event.pixel)
    if (clickedFeatures.length > 0) {
      popRef.current.show(event.coordinate, document.getElementById("popup"))
      //const transformedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
      setHref(`/itemdetails?id=${clickedFeatures[0].getId()}`)
      await matchData(clickedFeatures[0].getId())
    }
    else {
      popRef.current.hide()
    }
  }

  useEffect(() => {
    const getLocation = async () => {
      let lat
      let long
      if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
              navigator.geolocation.getCurrentPosition((pos) => {
                lat = pos.coords.latitude
                long = pos.coords.longitude
                setUserLocation([long, lat])
              })
            } else if (result.state === "prompt") {
              navigator.geolocation.getCurrentPosition((pos) => {
                lat = pos.coords.latitude
                long = pos.coords.longitude
                setUserLocation([long, lat])
              }, () => {
                alert("I promise we don't track you");
              }, {
                enableHighAccuracy: true,
                timeout: 50000,
                maximumAge: 0,
              })
            }
          })
      }
      else {
        alert("I promise we don't track you");
      }
    }
    getLocation()
    const featuresLayerURL = `${process.env.REACT_APP_SERVER_HOSTNAME}/map`;
    const featuresLayer = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: featuresLayerURL
      }),
      declutter: true
    });

    const initialView = new View({
      projection: 'EPSG:3857',
      center: fromLonLat([0, 0]),
      zoom: 12,
    })
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        featuresLayer
      ],
      view: initialView,
      controls: []
    })
    const initialPop = new Popup({
      positioning: 'center-center'
    });
    initialMap.addOverlay(initialPop)
    initialMap.on('click', handleMapClick)

    setPop(initialPop)
    setView(initialView)
    setMap(initialMap)


  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (userLocation) {
      viewRef.current.setCenter(fromLonLat(userLocation))
    }
  }, [userLocation])

  const matchData = async (id) => {
    const result = await axios(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/map/feature?id=${id}`
    );
    if (result.data.imgList.length > 0)
      setImage(result.data.imgList[0])
    if (result.data.profileURL)
      setProfile(result.data.profileURL)
    if (result.data.sellerName)
      setSeller(result.data.sellerName)
    if (result.data.title)
      setTitle(result.data.title)
    if (result.data.location)
      setLocation(result.data.location)
  }

  return (
    <>
      <Box component="span" sx={{ display: "block", height: "calc(100vh - 53px)", width: "100vw", m: 0, p: 0 }} ref={mapElement}></Box>
      <Box id="popup" sx={{ display: "none", zIndex: 99999 }}>
        <PreviewWindow href={href} image={image} profile={profile} seller={seller} title={title} location={location} />
      </Box>
    </>
  )

}

export default MapWrapper
