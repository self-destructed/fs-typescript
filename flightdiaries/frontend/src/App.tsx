import { useState, useEffect } from 'react';
import type { DiaryEntry } from './types';
import diaryService from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then(initialDiaries => {
      setDiaries(initialDiaries);
    });
  }, []);

  return (
    <div>
      <h1>Flight diaries</h1>
      <ul>
        {diaries.map(d => (
          <li key={d.id}>
            <strong>{d.date}</strong> — {d.weather}, {d.visibility}
            {d.comment && <p>{d.comment}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
