import { collection, update } from 'typesaurus';
import { BodyPump } from '../../../types';

const updatePlayList = () => async (id: string, pump: Partial<BodyPump>) => {
  const pumpListEntries = collection<BodyPump>('bodypump-playlist');
  if (pump) {
    await update(pumpListEntries, id, pump);
  }
};

export default updatePlayList;
