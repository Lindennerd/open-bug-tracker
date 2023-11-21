//Loadin skeleton component using React and TailwindCSS

export const LoadingSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-2">
      <div className="flex flex-col gap-1">
        <div className="rounded bg-gray-700 text-center">
          <span>Loading...</span>
        </div>
      </div>
    </div>
  );
};
export default LoadingSkeleton;
