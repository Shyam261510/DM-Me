import React, { useEffect, useState } from "react";
interface useDebounceProps {
  query: string;
  delay: number;
}
function useDebounce({ query, delay = 500 }: useDebounceProps) {
  const [debounceQuery, setDebounceQuery] = useState<string>(query);

  useEffect(() => {
    if (!query) return;
    const timer = setTimeout(() => {
      setDebounceQuery(query);
    }, delay);
    return () => clearTimeout(timer);
  }, [query, delay]);
  return debounceQuery;
}

export default useDebounce;
