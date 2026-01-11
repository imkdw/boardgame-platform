export interface CreateStoreRoomDto {
  roomNumber: number;
  status: string;
  minCapacity: number;
  maxCapacity: number;
  description: string;
}

export interface UpdateStoreRoomDto {
  roomNumber: number;
  status: string;
  minCapacity: number;
  maxCapacity: number;
  description: string;
}
