export interface Location {
  fclty_la: string;
  fclty_lo: string;
}

export interface MapInstance {
  panTo: (latLng: kakao.maps.LatLng) => void;
}
