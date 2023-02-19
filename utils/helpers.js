module.exports = {
  format_date: (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const result = `${month}/${day}/${year}`;
    return result;
  },
};
