/* #Validate, #Props */

export default {
  props: {
    prop1s: {
      type: Array,
      required: true,
      validator(prop1s) {
        return ['propX', 'propY', 'propZ'].every(function (prop) {
          return Object.values(prop1s).every(function doeshaveProp(prop1) {
            return Object.prototype.hasOwnProperty.call(prop1, prop);
          });
        });
      },
    },
  },
};
