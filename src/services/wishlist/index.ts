import AxiosService from '~/common/utils/axios';

const url = {
  get: 'wishlist',
  add: 'wishlist/add',
};

const fetchWishlist = {
  async get() {
    const response = await AxiosService.get(url.get);
    return response;
  },
  async add(payload: any) {
    const response = await AxiosService.post(url.add, payload);
    return response;
  },
};

export default fetchWishlist;
