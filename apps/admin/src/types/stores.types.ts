export interface CreateStoreDto {
  name: string;
  address: string;
  wifiName: string;
  wifiPassword: string;
  contact: string;
  introVideoUrl: string | null;
  ip: string;
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
  ip: string;
  latitude: number;
  longitude: number;
}
