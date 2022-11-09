function getLocationCookie() {
  let name = 'resowmaplocation='
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(val) {
  let name = 'resowmaplocation='
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  let cleancookie = ca.filter(col => col.indexOf(name) == 0).join()
  document.cookie = "resowmaplocation=" + val + ";" + cleancookie
}

const findLocation = async () => {
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
            setCookie(long + '&' + lat)
            window.dispatchEvent(new CustomEvent('maplocationchange', {
              coords: [long, lat]
            }))
          })
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition((pos) => {
            lat = pos.coords.latitude
            long = pos.coords.longitude
            setCookie(long + '&' + lat)
            window.dispatchEvent(new CustomEvent('maplocationchange', {
              detail: {
                coords: [long, lat]
              }
            }))
          }, () => {
            alert("I promise we don't track you")
          }, {
            enableHighAccuracy: true,
            timeout: 50000,
            maximumAge: 0,
          })
        }
      })
  }
}

export const locationDifference(a1, a2) {
  return Math.sqrt(Math.abs(a1[0] - a2[0]) + Math.abs(a1[1] - a2[0]))
}

export const getLocation = () => {
  if (getLocationCookie() !== "") {
    return getLocationCookie().split('&').map(function (x) {
      return parseFloat(x)
    })
  }
  else {
    findLocation()
    return [0, 0]
  }
}
