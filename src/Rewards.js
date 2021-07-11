import './Rewards.css';
import data from './data.json';

const monthsMap = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const monthLimit = 3; // Three months period

function Rewards() {
  let formattedData = [];

  data.customers.forEach((customer, index) => {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let monthsData = [];
    let totalRewards = 0;
    for (var i = 0; i < monthLimit; i++, currentMonth--) {
      // Loop till monthsLimit
      let rewards = 0;
      if (currentMonth < 0) {
        currentMonth = 12;
        currentYear--;
      } // If the currentMonth is January
      // eslint-disable-next-line no-loop-func
      data.transactions.forEach(transaction => {
        if (customer.id === transaction.customer_id) {
          const transactionMonth = new Date(transaction.date).getMonth();
          const transactionYear = new Date(transaction.date).getFullYear();
          if (
            transactionMonth === currentMonth &&
            transactionYear === currentYear
          ) {
            /* Calculate rewards 2 points for every dollar spent over $100 in each transaction, 
               plus 1 point for every dollar spent over $50 */
            rewards +=
              transaction.amount > 100
                ? (transaction.amount - 100) * 2 + 50
                : transaction.amount >= 50
                ? transaction.amount - 50
                : 0;
          }
        }
      });
      monthsData[i] = {
        value: rewards,
        month: monthsMap[currentMonth],
        year: currentYear,
      };
      totalRewards += rewards;
    }

    formattedData[index] = {
      name: customer.name,
      months: monthsData,
      total: totalRewards,
    };
  });

  return <Table tableData={formattedData} />;
}

const Table = ({ tableData }) => {
  return (
    <div id="page">
      <h3 className="center">Rewards Program</h3>
      <table className="transactions">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Total Rewards</th>
            <th>Months Rewards</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(customer => (
            <>
              <tr key={customer.name}>
                <td rowSpan={customer.months.length + 1} className="center">
                  {customer.name}
                </td>
                <td rowSpan={customer.months.length + 1} className="center">
                  {customer.total}
                </td>
              </tr>
              {customer.months.map(month => (
                <tr key={month.month}>
                  <td className="center">{`${month.month} ${month.year} : ${month.value}`}</td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="center" colSpan="3">
              {data.customers.length} Customers
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Rewards;
