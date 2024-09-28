export const random = (min: number, max: number): number => {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomArray = (len: number): number[] => {
   let ret: number[] = [];
   for (let i = 0; i < len; i++) ret.push(random(50, 150));
   return ret;
};
