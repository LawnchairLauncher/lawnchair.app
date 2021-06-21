// (c) 2021 Raphael Tang
// This code is licensed under MIT license (see LICENSE for details)

import { useState, useCallback } from "react"

export const random = {
  choice: <T>(arr: T[]) => {
    return arr[Math.floor(Math.random() * arr.length)]
  },
}

export function shuffleArray<T>(o: T[]) {
  for (
    var j, x, i = o.length;
    i;
    j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o
}

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}
