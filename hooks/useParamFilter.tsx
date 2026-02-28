/* eslint-disable react-hooks/exhaustive-deps */
import {
  useSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  startTransition,
} from "react";

type SetQueryFunction = (value: string) => void;

export function useParamFilter(
  queryName: string,
  debounce = 250
): [string, SetQueryFunction] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlValue = searchParams.get(queryName) ?? "";
  const [value, setValue] = useState(urlValue);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  // 🔄 URL → local state (canonical source)
  useEffect(() => {
    if (urlValue !== value) {
      setValue(urlValue);
    }
  }, [urlValue]);

  // 🚀 local state → URL (debounced, non-blocking)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) params.set(queryName, value);
        else params.delete(queryName);

        router.replace(`${pathname}?${params.toString()}`, {
          scroll: false,
        });
      });
    }, debounce);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value]);

  return [value, setValue];
}
