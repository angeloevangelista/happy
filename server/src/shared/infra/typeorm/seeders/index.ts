import getUsersSeeds, {
  TGetUsersSeedsResponse,
} from '@modules/users/infra/typeorm/seeders/UsersSeeds';

interface IGetSeeders {
  users: TGetUsersSeedsResponse;
}

const getSeeders = (): IGetSeeders => ({
  users: getUsersSeeds(),
});

export default getSeeders;
