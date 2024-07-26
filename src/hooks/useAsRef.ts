import { useRef } from "react";

export function useAsRef<T>(v: T) {
	const ref = useRef<T>(v);

	ref.current = v;

	return ref;
}