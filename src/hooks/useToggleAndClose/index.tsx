import { useCallback, useEffect, useState } from 'react';

const useToggleAndClose = (
  name: string,
  initialState: boolean = false
): [boolean, any] => {
  const [state, setState] = useState<boolean>(initialState);

  const handleClose = useCallback(
    (e: MouseEvent) => {
      const element: HTMLDivElement | null = e?.target as HTMLDivElement;

      if (element.dataset?.element === name) return;

      setState(false);
    },
    [name]
  );

  useEffect(() => {
    if (state) {
      document.addEventListener('mousedown', handleClose, false);
    } else {
      document.removeEventListener('mousedown', handleClose, false);
    }
  }, [handleClose, state]);

  const toggle = useCallback((): void => setState((state) => !state), []);
  return [state, toggle];
};

export default useToggleAndClose;
