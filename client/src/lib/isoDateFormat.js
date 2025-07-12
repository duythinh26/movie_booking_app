const isoDateFormat = (isoDate) => {
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
};

export default isoDateFormat;