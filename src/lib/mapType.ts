export interface LocationType {
  fclty_la: string;
  fclty_lo: string;
  fclty_flag_nm?: string;
  ldgs_nm?: string;
  ldgs_addr?: string;
  rdnmadr_nm?: string;
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
  info: { nm: string; location: string };
  onClick: () => void;
}
