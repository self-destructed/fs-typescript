import { useState, useEffect } from 'react';
import axios from 'axios';
import type { DiaryEntry, Weather, Visibility } from './types';
import { Weather as WeatherOptions, Visibility as VisibilityOptions } from './types';
import diaryService from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    diaryService.getAll().then(setDiaries);
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setError(null);
    diaryService
      .create({ date, weather: weather as Weather, visibility: visibility as Visibility, comment: comment || undefined })
      .then(returnedDiary => {
        setDiaries(diaries.concat(returnedDiary));
        setDate('');
        setWeather('');
        setVisibility('');
        setComment('');
      })
      .catch(error => {
        if (axios.isAxiosError<{ error: { message: string; path: (string | number)[] }[] }>(error)) {
          setError(error.response?.data?.error?.map(e => e.message).join('; ') ?? 'Unknown error');
        } else {
          setError('Something went wrong');
        }
      });
  };

  return (
    <div>
      <h1>Flight diaries</h1>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <form onSubmit={diaryCreation}>
        <div>
          date
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          weather
          <select value={weather} onChange={e => setWeather(e.target.value)}>
            <option value="">—</option>
            {Object.values(WeatherOptions).map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
        <div>
          visibility
          <select value={visibility} onChange={e => setVisibility(e.target.value)}>
            <option value="">—</option>
            {Object.values(VisibilityOptions).map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          comment
          <input value={comment} onChange={e => setComment(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Diary entries</h2>
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
