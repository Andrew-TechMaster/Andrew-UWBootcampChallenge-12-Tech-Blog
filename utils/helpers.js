module.exports = {
  format_date: (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const year = date.getFullYear();

    const result = `${month}/${day}/${year}`;
    return result;
  },
};
