import Image from '@modules/orphanages/infra/typeorm/entities/Image';

export default {
  render(image: Image) {
    return {
      id: image.id,
      url: `${process.env.APP_URL}/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]) {
    return images.map((image) => this.render(image));
  },
};
