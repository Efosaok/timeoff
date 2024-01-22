import moment from 'moment';

interface DateRangePrettyProps {
  sameMonth: boolean;
  startDate?: string;
  endDate?: string;
}
const dateRangePretty = ({
  sameMonth,
  startDate,
  endDate,
}: DateRangePrettyProps) => (
  sameMonth ? moment(startDate)?.format('MMMM YYYY') : `${moment(startDate).format('MMMM')} - ${moment(endDate).format('MMMM, YYYY')}`
);

export default dateRangePretty;
