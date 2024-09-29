import React from "react";
import BaseSelect, { SingleValue } from "react-select";
import { Callback1, Dict } from "../types";

type ISelectOption = {
   label: string;
   value: string;
};

const stringToSelectOption = (
   key: string,
   optionsMap?: Dict<string>
): ISelectOption => {
   const label = optionsMap && optionsMap[key] ? optionsMap[key] : key;
   return { value: key, label };
};

const mapToStringSelectOptions = (
   keys: string[],
   optionsMap?: Dict<string>
): ISelectOption[] => {
   return keys.map((key) => stringToSelectOption(key, optionsMap));
};

type ISelect = {
   options: Dict<string>;
   value: string;
   onChange: Callback1<string>;
};

export const Select = (props: ISelect) => {
   const { options: optionsMap, value, onChange } = props;
   const options = Object.keys(optionsMap);

   const selectOption = stringToSelectOption(value, optionsMap);
   const selectOptions = mapToStringSelectOptions(options, optionsMap);

   const onChangeSelect = React.useCallback(
      (newValue: SingleValue<ISelectOption>) => {
         if (newValue?.value) {
            onChange(newValue?.value);
         }
      },
      [onChange]
   );

   return (
      <BaseSelect
         value={selectOption}
         options={selectOptions}
         onChange={onChangeSelect}
      />
   );
};
