// import React from "react";
// import {
//   makeStyles,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
// } from "@material-ui/core";

// const columns = [
//   {
//     id: "name",
//     label: "Name",
//     minWidth: 100,
//     align: "left",
//     format: (value) => value.toLocaleString(),
//   },

//   {
//     id: "description",
//     label: "Description",
//     minWidth: 170,
//     align: "left",
//   },
//   {
//     id: "credits",
//     label: "Credits",
//     minWidth: 170,
//     align: "left",
//   },
// ];

// function createData(name, description, credits) {
//   return { name, description, credits };
// }

// const rows = [
//   createData("India", "IN", 1324171354),
//   createData("China", "CN", 1403500365),
//   createData("Italy", "IT", 60483973),
//   createData("United States", "US", 327167434),
//   createData("Canada", "CA", 37602103),
//   createData("Australia", "AU", 25475400),
//   createData("Germany", "DE", 83019200),
//   createData("Ireland", "IE", 4857000),
//   createData("Mexico", "MX", 126577691),
//   createData("Japan", "JP", 126317000),
//   createData("France", "FR", 67022000),
//   createData("United Kingdom", "GB", 67545757),
//   createData("Russia", "RU", 146793744),
//   createData("Nigeria", "NG", 200962417),
//   createData("Brazil", "BR", 210147125),
// ];

// const useStyles = makeStyles({
//   root: {
//     width: "100%",
//   },
//   container: {
//     maxHeight: 440,
//   },
// });

// export default function SubjectTable() {
//   const classes = useStyles();
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper className={classes.root}>
//       <TableContainer className={classes.container}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === "number"
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onChangePage={handleChangePage}
//         onChangeRowsPerPage={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }

import React from "react";
import MaterialTable from "material-table";

export default function SubjectTable() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Description", field: "description" },
      { title: "Credits", field: "credits", type: "numeric" },
    ],
    data: [],
  });

  return (
    <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
