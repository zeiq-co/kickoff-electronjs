module.exports = {
  small: ({ width, height }) => ({
    width: 1030,
    height: Math.round(height * 0.9),
  }),
  large: ({ width, height }) => {
    const maxWidth = 1030;
    const maxHeight = 850;
    const widthPercent = Math.round(width * 0.85);
    const heightPercent = Math.round(height * 0.9);

    return {
      width: widthPercent > maxWidth ? maxWidth : widthPercent,
      height: heightPercent > maxHeight ? maxHeight : heightPercent,
    };
  },
};
