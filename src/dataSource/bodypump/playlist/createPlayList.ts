import { collection, add } from 'typesaurus';
import { BodyPump } from '../../../types';

const createPlayList = () => async (pumplist: BodyPump) => {
  const trophyEntries = collection<BodyPump>('bodypump-playlist');

  const result = await add(trophyEntries, {
    ...pumplist,
  });
  return result;
};

export default createPlayList;
