import _ from "lodash";

export const debounce = _.debounce;

const myFn = () => {
  console.log(1);
};

const debouncedFn = debounce(myFn, 1000);

