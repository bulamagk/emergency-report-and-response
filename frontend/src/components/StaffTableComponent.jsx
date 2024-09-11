import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const StaffTableComponent = ({ data, deleteStaff }) => {
  const [staffId, setStaffId] = useState(null);
  //   Delete Staff
  async function handleDelete(id) {
    deleteStaff(id);
  }

  // Column Definitions
  const columns = [
    {
      name: "Name",
      selector: (row) => `${row.othername} ${row.surname}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => `0${row.phone}`,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => handleDelete(row._id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <section>
      <DataTable columns={columns} data={data} pagination />
    </section>
  );
};

export default StaffTableComponent;
