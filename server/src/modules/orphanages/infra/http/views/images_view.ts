import Image from '@modules/orphanages/infra/typeorm/entities/Image';

export interface IImageView {
  id: number;
  url: string;
  created_at: Date;
  updated_at: Date;
}

export default {
  render(image: Image): IImageView {
    return {
      id: image.id,
      url: `${process.env.APP_URL}/uploads/${image.path}`,
      created_at: image.created_at,
      updated_at: image.updated_at,
    };
  },

  renderMany(images: Image[]): IImageView[] {
    return images.map((image) => this.render(image));
  },
};
