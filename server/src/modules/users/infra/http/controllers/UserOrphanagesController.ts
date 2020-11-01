import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOrphanagesByUserService from '@modules/users/services/ListOrphanagesByUserService';
import orphanages_view from '@modules/orphanages/infra/http/views/orphanages_view';

class UserOrphanages {
  public async index(request: Request, response: Response): Promise<Response> {
    const listOrphanagesByUser = container.resolve(ListOrphanagesByUserService);

    const orphanages = await listOrphanagesByUser.execute(request.user.id);

    return response.json(orphanages_view.renderMany(orphanages));
  }
}

export default UserOrphanages;
