import { WSAPI } from './WSApi';

export default class PhotoAlbumApi extends WSAPI {
  SearchFolderInfo (params) {
    // instance === axious
    // param === { FloderId: ??? }
    return this.instance.post(this.apiPath + '/PhotoAlbum/SearchFolderInfo', params).then((result) => {
      return result.data;
    });
  }
  SearchFolders () {
    return this.instance.post(this.apiPath + '/PhotoAlbum/SearchFolders').then((result) => {
      return result;
    });
  }

  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
  private static instance: PhotoAlbumApi;
  //* * 单例 */
  public static getInstance (): PhotoAlbumApi {
    if (PhotoAlbumApi.instance) { } else {
      PhotoAlbumApi.instance = new PhotoAlbumApi();
    }
    return PhotoAlbumApi.instance;
  }
}
