import axios from 'axios';
import type { DiaryEntry } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = () =>
  axios.get<DiaryEntry[]>(baseUrl).then(r => r.data);

export default { getAll };
