const formatCurrency = (currency) => {
  const arg = Number(currency);
  const result = `RP ${arg.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
  return result.substring(0, result.length - 3);
}

const formatNumber = (number) => {
  const arg = Number(number);
    const result = `${arg.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
    return result.substring(0, result.length - 3);
  }

const formatDecimal = (floatingValue) => {
  if(!floatingValue){
    return '';
  }
  return Math.round(floatingValue * 100) / 100;
}

const formatPercentage = (slice, full) => {
  return formatDecimal(slice / full * 100) + '%';
}

const formatDate = (date) => {
  const newDate = new Date(date);
  if(newDate){
      const months=[
          '','Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
          'Agu', 'Sep', 'Okt', 'Nov', 'Des'
      ];
      const thisDate = newDate.getDate();
      const thisMonth = months[newDate.getMonth()];
      const thisYear = newDate.getFullYear();
      return `${thisDate} ${thisMonth} ${thisYear}`;
  }
  return date;
}

export {formatCurrency, formatDecimal, formatPercentage, formatNumber, formatDate};