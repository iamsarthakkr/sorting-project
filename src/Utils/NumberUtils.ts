import { IList } from "../types";

export const random = (min: number, max: number): number => {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomArray = (len: number): number[] => {
   let ret: number[] = [];
   for (let i = 0; i < len; i++) ret.push(random(50, 200));
   return ret;
};

export const initList = (len: number): IList => {
   return randomArray(len).map((num, i) => {
      return {
         index: i,
         value: num,
      };
   });
};
