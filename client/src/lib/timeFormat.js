const timeFormat = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}giờ ${minutes}phút`;
}

export default timeFormat;