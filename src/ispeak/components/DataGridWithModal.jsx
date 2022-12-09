import { DataGrid } from "@mui/x-data-grid";

export const DataGridWithModal = ({ rows, columns, handleCell, onChangeElements }) => {
     return (
          <>
               <DataGrid
                    rows={rows}
                    columns={columns}
                    onCellDoubleClick={(params) => handleCell(params)}
                    pageSize={15}
                    rowsPerPageOptions={[10]}
                    checkboxSelection={true}
                    onSelectionModelChange={(params)=> onChangeElements(params)}
               />
          </>
     );
};
