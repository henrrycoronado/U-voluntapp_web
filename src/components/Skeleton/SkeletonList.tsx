import './Skeleton.css';

interface Props {
  count?: number;
}

export const SkeletonList = ({ count = 3 }: Props) => {
  return (
    <div className="activity-list">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card"></div>
      ))}
    </div>
  );
};
