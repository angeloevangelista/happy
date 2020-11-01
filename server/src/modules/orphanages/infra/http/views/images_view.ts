import Image from '@modules/orphanages/infra/typeorm/entities/Image';

export interface IImageView {
  id: number;
  url: string;
}

export default {
  render(image: Image): IImageView {
    return {
      id: image.id,
      url: `${process.env.APP_URL}/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]): IImageView[] {
    return images.map((image) => this.render(image));
  },
};
