import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';

import images_view, {
  IImageView,
} from '@modules/orphanages/infra/http/views/images_view';
import users_view, {
  IUserView,
} from '@modules/users/infra/http/views/users_view';

interface IOrphanageView {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  open_on_weekends: boolean;
  opening_hours: string;
  created_at: Date;
  updated_at: Date;
  images: IImageView[];
  user: IUserView;
}

export default {
  render(orphanage: Orphanage): IOrphanageView {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      open_on_weekends: orphanage.open_on_weekends,
      opening_hours: orphanage.opening_hours,
      created_at: orphanage.created_at,
      updated_at: orphanage.updated_at,
      images: images_view.renderMany(orphanage.images),
      user: users_view.render(orphanage.user),
    };
  },

  renderMany(orphanages: Orphanage[]): IOrphanageView[] {
    return orphanages.map((orphanage) => this.render(orphanage));
  },
};
