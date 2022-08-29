/**
 * @author Kinza Kiran
 * @version 1.0
 */
export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371;
  var DLat = deg2rad(lat2 - lat1);
  var DLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(DLat / 2) * Math.sin(DLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(DLon / 2) *
      Math.sin(DLon / 2);
      var c= 2* Math.atan2(Math.sqrt(a),Math.sqrt(1-a))
      var d = R*c
      return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
