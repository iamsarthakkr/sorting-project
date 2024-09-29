export type Callback = () => void;
export type Callback1<T> = (Arg: T) => void;
export type Callback2<A1, A2> = (Arg11: A1, Arg2: A2) => void;

export type Action = Callback;
export type Action1<T> = Callback1<T>;
export type Action2<A1, A2> = Callback2<A1, A2>;

export type Dict<T> = Record<string, T>;
