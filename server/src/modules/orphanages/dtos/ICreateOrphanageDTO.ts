export default interface ICreateOrphanageDTO {
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
