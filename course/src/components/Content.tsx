import Part from './Part';
import type { CoursePart } from '../types';

interface ContentProps {
  parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => (
  <>
    {parts.map(p => (
      <Part key={p.name} part={p} />
    ))}
  </>
);

export default Content;
