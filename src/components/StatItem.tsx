type StatItemProps = {
  label: string;
  value: string | number;
};

export function StatItem({ label, value }: StatItemProps) {
  return (
    <div>
      <div className="text-gray-400 text-xs">{label}</div>
      <div className="font-bold text-lg">{value}</div>
    </div>
  );
}
