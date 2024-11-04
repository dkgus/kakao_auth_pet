export interface LocationType {
  fclty_la: string;
  fclty_lo: string;
}

export interface HotelType {
  ldgs_addr: string;
}

export interface MapFuncType {
  panTo: (latLng: kakao.maps.LatLng) => void;
  setCenter: (latLng: kakao.maps.LatLng) => void;
}

export interface MarkerType {
  position: {
    lat: number;
    lng: number;
  };
  img: { src: string; alt?: string };
  onClick: () => void;
}
