import { DataGrid } from "@mui/x-data-grid";

export const Datagrid = ({ rows, columns, updateHandler }) => {
     return (
          <>
               <DataGrid
                    rows={rows}
                    columns={columns}
                    onCellEditCommit={(params) => updateHandler(params)}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
               />
          </>
     );
};
