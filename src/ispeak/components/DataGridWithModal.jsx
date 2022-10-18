import { DataGrid } from "@mui/x-data-grid";

export const DataGridWithModal = ({ rows, columns, handleCell }) => {
     return (
          <>
               <DataGrid
                    rows={rows}
                    columns={columns}
                    onCellDoubleClick={(params) => handleCell(params)}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
               />
          </>
     );
};
