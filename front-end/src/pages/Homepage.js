import React from "react";
import * as olProj from 'ol/proj'
import * as olExtent from 'ol/extent'
import { layer, Map, Layers } from "react-openlayers";

var resolutions = [];
var matrixIds = [];
var proj3857 = olProj.get("EPSG:3857");
var maxResolution = olExtent.getWidth(proj3857.getExtent()) / 256;

for (var i = 0; i < 18; i++) {
  matrixIds[i] = i.toString();
  resolutions[i] = maxResolution / Math.pow(2, i);
}

function Homepage() {
  return (
    <Map view={{ center: [0, 0], zoom: 2 }}>
      <Layers>
        <layer.Tile />
      </Layers>
    </Map>
  )
}

export default Homepage;


