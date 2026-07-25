import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = () =>
  axios.get<DiaryEntry[]>(baseUrl).then(r => r.data);

const create = (object: NewDiaryEntry) =>
  axios.post<DiaryEntry>(baseUrl, object).then(r => r.data);

export default { getAll, create };
