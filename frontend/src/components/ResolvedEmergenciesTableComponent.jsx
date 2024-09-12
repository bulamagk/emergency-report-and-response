import DataTable from "react-data-table-component";

const ResolvedEmergenciesTableComponent = ({ data }) => {
  // Column Definitions
  const columns = [
    {
      name: "Type",
      selector: (row) => `${row.type}`,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Reported By",
      selector: (row) =>
        `${row.user.othername} ${row.user.surname} | ${row.user.email} | ${row.user.phone}`,
    },

    {
      name: "Reported On",
      selector: (row) => `0${row.createdAt}`,
    },
  ];

  return (
    <section>
      <DataTable columns={columns} data={data} pagination />
    </section>
  );
};

export default ResolvedEmergenciesTableComponent;
