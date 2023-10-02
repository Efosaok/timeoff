import React, { FC, ReactNode, useEffect, useState } from "react";
import { PageSpinner } from "./Spinners";

interface PageProps {
  isLoading: boolean;
  error: string;
  children: ReactNode;
}
const Page: FC<PageProps> = ({ isLoading, error, children }) => {
  const [ isInitialLoad, setIsInitialLoad ] = useState(true);
  
  useEffect(() => {
    if (!isLoading) setIsInitialLoad(false);
  }, [isLoading])

  return (
    <div className="page">
      {isInitialLoad ? <PageSpinner /> : null}
      {!isInitialLoad && !error ? children : null}
    </div>
  );
};

export default Page;
