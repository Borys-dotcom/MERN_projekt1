import "./Table.css";

const Table = ({ events, deleteEvent, ...rest }) => {
  return (
    <table {...rest}>
      <thead>
        <tr>
          <th>#</th>
          <th>Imię i Nazwisko</th>
          <th>Wydarzenie</th>
          <th>Miasto</th>
          <th className="trAction">Akcja</th>
        </tr>
      </thead>
      <tbody>
        {events.map((row, index) => {
          return (
            <tr key={row._id}>
              <td>{index+1}</td>
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
