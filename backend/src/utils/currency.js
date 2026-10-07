const calculateIDR = (usdAmount, rate) => {
  const nearestUSD = Math.round(usdAmount);
  return Math.round((nearestUSD * rate) / 1000) * 1000;
};

const formatToIDR = (usdAmount, rate) => {
  const idr = calculateIDR(usdAmount, rate);
  return "Rp " + idr.toLocaleString('id-ID');
};

const convertTextToIDR = (text, rate) => {
  if (!text) return text;
  return text.replace(/\$\d+(\.\d+)?/g, (match) => {
    const usd = parseFloat(match.replace('$', ''));
    return formatToIDR(usd, rate);
  });
};

module.exports = {
  calculateIDR,
  formatToIDR,
  convertTextToIDR,
};
