const getDateRangeValues = () => {
  const sd = document.querySelector('#start_date') as any;
  const ed = document.querySelector('#end_date') as any;

  const start_date = sd?.value;
  const end_date = ed?.value;

  const datesStringified = `start_date=${start_date}&end_date=${end_date}`;

  return {
    start_date,
    end_date,
    datesStringified,
  };
}

export default getDateRangeValues;
