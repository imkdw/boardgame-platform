export interface Store {
  id: string;
  name: string;
  address: string;
  wifiName: string;
  wifiPassword: string;
  contact: string;
  introVideoUrl: string | null;
  latitude: number;
  longitude: number;
}

export interface CreateStoreDto {
  name: string;
  address: string;
  wifiName: string;
  wifiPassword: string;
  contact: string;
  introVideoUrl: string | null;
  latitude: number;
  longitude: number;
}

export interface UpdateStoreDto {
  name: string;
  address: string;
  wifiName: string;
  wifiPassword: string;
  contact: string;
  introVideoUrl: string | null;
  latitude: number;
  longitude: number;
}
