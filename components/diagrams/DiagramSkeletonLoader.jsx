import { Skeleton } from "@/components/ui/skeleton";

const DiagramSkeletonLoader = ({ isVisible }) => {
  return (
    <div className={`${isVisible ? "grid" : "hidden"} grid-cols-3 gap-5 py-10 max-lg:grid-cols-2 max-herobr03:grid-cols-1`}>

        {
            Array.from({length: 6}).map((_, index) => (
                <Skeleton key={index} className="w-full h-[300px] rounded-md" />
            ))
        }
      {/* <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div> */}
    </div>
  );
};

export default DiagramSkeletonLoader;
