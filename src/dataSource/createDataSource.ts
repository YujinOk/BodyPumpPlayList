import admin from 'firebase-admin';

import { Config, DataSource } from '../types';
import createPlayList from './bodypump/playlist/createPlayList';
// import getFavoriteList from './bodypump/favorite/getFavoriteList';
// import getPlayList from './bodypump/playlist/getPlayList';
// import getRandomList from './bodypump/random/getRandomList';
import updatePlayList from './bodypump/playlist/updatePlayList';

const createDataSource = (config: Config): DataSource => {
  admin.initializeApp({ projectId: config.projectId });

  return {
    createPlayList: createPlayList(),

    // getFavoriteList: getFavoriteList(),
    // getPlayList: getPlayList(),
    // getRandomList: getRandomList(),
    updatePlayList: updatePlayList(),
  };
};

export default createDataSource;
