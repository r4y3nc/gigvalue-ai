const KURS_USD_TO_IDR = Number(process.env.KURS_USD_TO_IDR) || 17000;

const formatToIDR = (usdAmount) => {
  const idr = Math.round((usdAmount * KURS_USD_TO_IDR) / 1000) * 1000;
  return "Rp " + idr.toLocaleString('id-ID');
};

const convertTextToIDR = (text) => {
  if (!text) return text;
  return text.replace(/\$\d+(\.\d+)?/g, (match) => {
    const usd = parseFloat(match.replace('$', ''));
    return formatToIDR(usd);
  });
};

module.exports = {
  KURS_USD_TO_IDR,
  formatToIDR,
  convertTextToIDR,
};