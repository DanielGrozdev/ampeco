export enum connectorType {
  J1772 = "J1772",
  Type2 = "Type 2",
  CCS2 = "CCS 2",
  Type3 = "Type 3",
}

export enum statusType {
  Available = "available",
  Unavailable = "unavailable",
}

export interface Pin {
  _id: string;
  connectors: [
    {
      status: statusType;
      type: connectorType;
    }
  ];
  latitude: number;
  longitude: number;
  title: string;
}

export type Marker = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export interface BoundingBox {
  northEast: { latitude: number; longitude: number };
  southWest: { latitude: number; longitude: number };
}

export interface stateType {
  data: {
    dataArray: {
      data: [];
    };
  };
}

export interface CustomMarkerType {
  pin: Pin;
}
