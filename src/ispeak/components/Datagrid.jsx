import { DataGrid } from "@mui/x-data-grid";

export const Datagrid = ({ rows, columns, updateHandler, stopHandler }) => {
     return (
          <>
               <DataGrid
                    rows={rows}
                    columns={columns}
                    onCellEditStop={(params) => stopHandler(params)}
                    onCellEditCommit={(params) => {
                         updateHandler(params);
                    }}
                    pageSize={15}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
               />
          </>
     );
};
