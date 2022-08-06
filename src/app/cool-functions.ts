import _ from "lodash";

export const debounce = _.debounce;

const debouncedFn = debounce(() => 4, 450);
