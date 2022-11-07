export const useChangeData = ( mainData, setMainData, dataChanger) => {
     const updateData = async (data) => {
          const newUpdate = mainData.rows.map((maindata) => {
               if (maindata.id === data.id) {
                    return {
                         ...maindata,
                         [data.field]: data.value,
                    };
               }
               return maindata;
          });
          setMainData({
               ...mainData,
               rows: newUpdate,
          });
     };
     const updateDataWithModal = async (data) => {
          const newUpdate = mainData.rows.map((maindata) => {
               if (maindata.id === data.id) {
                    return data
               }
               return maindata;
          });
          setMainData({
               ...mainData,
               rows: newUpdate,
          });
     };
     const deleteData = (id) => {
          const newData = mainData.rows.filter((data) => data.id !== id);
          setMainData({
               ...mainData,
               rows: newData,
          });
     };
     const onDeleteSeveral = (listId)=> {
          const newData = mainData.rows.filter((data) => {
               return !listId.includes(data.id) 
          });
          setMainData({
               ...mainData,
               rows: newData,
          });
     }

     const addData = (data) => {
          const dataChanged = dataChanger(data)
          const newData = {
               ...mainData,
               rows: [...mainData.rows, dataChanged],
          };
          setMainData(newData);
     };

     return {
          updateData,
          deleteData,
          addData,
          updateDataWithModal,
          onDeleteSeveral
     };
};
