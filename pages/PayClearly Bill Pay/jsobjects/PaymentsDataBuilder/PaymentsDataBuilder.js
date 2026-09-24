export default {
  getPayments() {
    const flattenObject = (obj, parentKey = "", result = {}) => {
      for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        const value = obj[key];
        const cleanKey = key.replace(/\s+/g, "_");
        const newKey = parentKey ? `${parentKey}_${cleanKey}` : cleanKey;

        if (value && typeof value === "object" && !Array.isArray(value)) {
          // recursively flatten nested objects
          flattenObject(value, newKey, result);
        } else if (Array.isArray(value)) {
          // convert arrays to comma-separated string
          result[newKey] = value
            .map((item) =>
              typeof item === "object" ? JSON.stringify(item) : item
            )
            .join(", ");
        } else {
          result[newKey] = value;
        }
      }
      return result;
    };

    return GetPayments.data.data.map((item) => flattenObject(item));
  },
};
