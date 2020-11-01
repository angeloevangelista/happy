export default interface ICreateOrphanageDTO {
  user_id: number;
  name: string;
  about: string;
  latitude: number;
  longitude: number;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: {
    path: string;
  }[];
}
