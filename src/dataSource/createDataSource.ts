import admin from 'firebase-admin';

import { Config, DataSource } from '../../types';
import createPlayList from '../dataSource/bodypump/createPlayList';
import getFavoriteList from '../dataSource/bodypump/getFavoriteList';
import getPlayList from '../dataSource/bodypump/getPlayList';
import getRandomList from '../dataSource/bodypump/getRandomList';
import updatePlayList from '../dataSource/bodypump/updatePlayList';

const createDataSource = (config: Config): DataSource => {
  admin.initializeApp({ projectId: config.projectId });

  return {
    createPlayList: createPlayList(),
    getFavoriteList: getFavoriteList(),
    getPlayList: getPlayList(),
    getRandomList: getRandomList(),
    updatePlayList: updatePlayList(),
  };
};

export default createDataSource;
