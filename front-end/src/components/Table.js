import "./Table.css";

const Table = ({ events, deleteEvent, ...rest }) => {
  return (
    <table {...rest}>
      <thead>
        <tr>
          <th>#</th>
          <th>imię i nazwisko</th>
          <th>wydarzenie</th>
          <th>miasto</th>
          <th>akcja</th>
        </tr>
      </thead>
      <tbody>
        {events.map((row, index) => {
          return (
            <tr key={row._id}>
              <td>{index}</td>
              <td>{row.name}</td>
              <td eventkey={row.event.key}>{row.event.val}</td>
              <td citykey={row.city.key}>{row.city.val}</td>
              <td>
                <button
                  className="Delete"
                  onClick={() => {
                    deleteEvent(row._id)
                  }}
                >
                  Usuń
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
