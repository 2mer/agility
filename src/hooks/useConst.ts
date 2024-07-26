import { useRef } from "react";

const UNSET = Symbol('UNSET');

export function useConst<T>(compute: () => T) {
	const ref = useRef<T | typeof UNSET>(UNSET);

	if (ref.current === UNSET) {
		ref.current = compute();
	}

	return ref.current as T;
}