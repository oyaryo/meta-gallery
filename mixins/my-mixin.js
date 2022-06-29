import dayjs from "dayjs";

export default {
  filters: {
    dayFormat: (value) => {
      if (!value) return "";
      return dayjs(value).format("YYYY-MM-DD");
    },
  },
};
