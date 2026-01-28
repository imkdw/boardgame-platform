export interface Store {
  id: string;
  name: string;
  address: string;
  wifiName: string;
  wifiPassword: string;
  contact: string;
  introVideoUrl: string | null;
  ip: string;
  latitude: number;
  longitude: number;
  tabletAdminPassword: string | null;
}
