export type Callback = () => void;
export type Callback1<T> = (Arg: T) => void;

export type Action = Callback;
export type Action1<T> = Callback1<T>;

export type Dict<T> = Record<string, T>;
