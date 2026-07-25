interface ContentProps {
  parts: { name: string; exerciseCount: number }[];
}

const Content = ({ parts }: ContentProps) => (
  <>
    {parts.map(p => (
      <p key={p.name}>{p.name} {p.exerciseCount}</p>
    ))}
  </>
);

export default Content;
