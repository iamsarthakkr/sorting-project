import { IList } from "../types";

export const swap = (arr: IList, i1: number, i2: number) => {
   const tmp = arr[i1].value;
   arr[i1].value = arr[i2].value;
   arr[i2].value = tmp;
};
