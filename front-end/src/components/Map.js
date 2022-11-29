/*
 * This component reacts wierd when used in dev mode, because the map can sometimes be rerendered
 * below the first render when a change is made. I don't think this should happen in a prod env
 */
// react
import React, {
  useState, useEffect, useRef
} from 'react';

import { getLocation } from './Location'

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
// import { transform } from 'ol/proj'
import PreviewWindow from './PreviewWindow'

// materialui
import Box from '@mui/material/Box'

// axios
import axios from "axios";

function MapWrapper(_) {

  const [map, setMap] = useState()
  const [pop, setPop] = useState()
  const [view, setView] = useState()
  const [feature, setFeature] = useState()
  const [image, setImage] = useState()
  const [profile, setProfile] = useState()
  const [seller, setSeller] = useState()
  const [title, setTitle] = useState()
  const [itemLocation, setItemLocation] = useState()
  const [href, setHref] = useState()
  const mapElement = useRef()
  //  https://stackoverflow.com/a/60643670
  const mapRef = useRef()
  mapRef.current = map
  const popRef = useRef()
  popRef.current = pop
  const viewRef = useRef()
  viewRef.current = view
  const featureRef = useRef()
  featureRef.current = feature


  let firstclick = false

  const handleMapClick = async (event) => {
    //  https://stackoverflow.com/a/60643670
    // const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel)
    const clickedFeatures = mapRef.current.getFeaturesAtPixel(event.pixel)
    if (clickedFeatures.length > 0) {
      if (!firstclick) {
        const popup = document.getElementById("popup")
        popup.setAttribute("style", "display: block")
        firstclick = true
      }

      popRef.current.show(event.coordinate, document.getElementById("popup"))
      // const transformedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
      setHref(`/itemdetails/${clickedFeatures[0].getId()}`)
      await matchData(clickedFeatures[0].getId())
    }
    else {
      popRef.current.hide()
    }
  }

  useEffect(() => {
    const vectorSource = new VectorSource({
      format: new GeoJSON(),
      loader: function (extent, _, __, success, failure) {
        const url = `${process.env.REACT_APP_SERVER_HOSTNAME}/map/`
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        const onError = function () {
          vectorSource.removeLoadedExtent(extent);
          failure();
        }
        xhr.onerror = onError;
        xhr.onload = function () {
          if (xhr.status == 200) {
            const reader = new GeoJSON()
            const features = reader.readFeatures(xhr.responseText, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' });
            vectorSource.addFeatures(features);
            success(features);
          } else {
            onError();
          }
        }
        xhr.send();
      }
    })
    const featuresLayer = new VectorLayer({
      source: vectorSource,
      declutter: true
    });
    const initialView = new View({
      projection: 'EPSG:3857',
      center: fromLonLat(getLocation()),
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
    setFeature(featuresLayer)
    window.addEventListener('maplocationchange', e => {
      if (viewRef.current) {
        viewRef.current.setCenter(fromLonLat(e.detail.coords))
      }
    })

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const matchData = async (id) => {
    const result = await axios(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/map/feature?id=${id}`
    );
    if (result.data.imgList && result.data.imgList.length > 0)
      setImage(result.data.imgList[0])
    if (result.data.profile && result.data.profile.length > 0)
      setProfile(result.data.profile[0])
    if (result.data.sellerName)
      setSeller(result.data.sellerName)
    if (result.data.title)
      setTitle(result.data.title)
    if (result.data.location)
      setItemLocation(result.data.location.toString())
  }

  return (
    <>
      <Box component="span" sx={{ display: "block", height: "calc(100vh - 53px)", width: "100vw", m: 0, p: 0 }} ref={mapElement}></Box>
      <Box id="popup" sx={{ display: "none", zIndex: 99999 }}>
        <PreviewWindow href={href} image={image} profile={profile} seller={seller} title={title} location={itemLocation} />
      </Box>
    </>
  )

}

export default MapWrapper
