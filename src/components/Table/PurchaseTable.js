import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import tableIcons from "./MaterialTableIcons";
import DeleteIcon from "@mui/icons-material/Delete";

const PurchaseTable = ({
  selectedProduct,
  setSelectedProduct,
  selectedProductQty,
  setSelectedProductQty,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(selectedProduct);
  }, [selectedProduct]);

  const handleProductRemove = (id) => {
    const newData = selectedProduct.filter((data) => data.id != id);
    const newQtyData = selectedProductQty.filter(
      (data) => data.productId != id
    );
    setData(newData);
    setSelectedProduct(newData);
    setSelectedProductQty(newQtyData);
  };

  const handleQuantity = (e, rowdata) => {
    const arr = [];
    selectedProductQty.map((data) => {
      if (data.productId == rowdata.id) {
        arr.push({
          productId: rowdata.id,
          quantity: parseInt(e.target.value),
          price: data.price,
        });
      } else {
        arr.push(data);
      }
    });
    setSelectedProductQty(arr);
  };

  const handlePrice = (e, rowdata) => {
    const arr = [];
    selectedProductQty.map((data) => {
      if (data.productId == rowdata.id) {
        arr.push({
          productId: rowdata.id,
          quantity: data.quantity,
          price: parseFloat(e.target.value),
        });
      } else {
        arr.push(data);
      }
    });
    setSelectedProductQty(arr);
  };

  const subtotal = (id) => {
    const data = selectedProductQty.find((data) => data.productId == id);
    const total = parseFloat(data.quantity * data.price).toFixed(2);
    if (isNaN(total)) {
      return 0;
    }
    return total;
  };

  const columns = [
    {
      title: "#",
      field: "id",
      cellStyle: {
        width: "5%",
      },
      render: (rowdata) => <span>{rowdata.tableData.id + 1}</span>,
    },
    {
      title: "Name",
      field: "name",
      render: (rowdata) => <span>{rowdata.category}</span>,
    },
    {
      title: "Price",
      field: "price",
      cellStyle: {
        width: "18%",
      },
      render: (rowdata) => (
        <TextField
          label=""
          onChange={(e) => handlePrice(e, rowdata)}
          type="number"
          variant="outlined"
          size="small"
          InputProps={{ inputProps: { min: 0 } }}
          defaultValue={rowdata.price}
        />
      ),
    },
    {
      title: "Quantity",
      field: "quantity",
      cellStyle: {
        width: "10%",
      },
      render: (rowdata) => (
        <TextField
          onChange={(e) => handleQuantity(e, rowdata)}
          type="number"
          variant="outlined"
          size="small"
          InputProps={{ inputProps: { min: 1 } }}
          defaultValue={1}
        />
      ),
    },
    {
      title: "Subtotal",
      field: "subtotal",
      cellStyle: {
        width: "10%",
      },
      render: (rowdata) => <span>{subtotal(rowdata.id)}</span>,
    },
    {
      title: "Action",
      align: "center",
      field: "action",
      cellStyle: {
        width: "10%",
      },
      render: (rowdata) => (
        <>
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={() => handleProductRemove(rowdata.id)}
            >
              <DeleteIcon />
            </Button>
          </Box>
        </>
      ),
    },
  ];

  return (
    <div>
      <MaterialTable
        style={{ padding: "5px 10px", minHeight: "50vh" }}
        columns={columns}
        data={data}
        icons={tableIcons}
        localization={{
          toolbar: {
            searchPlaceholder: "Search all assets",
          },
        }}
        options={{
          paging: false,
          rowStyle: {
            fontSize: 16,
          },
          toolbar: false,
          headerStyle: {
            fontSize: 16,
          },
        }}
      ></MaterialTable>
    </div>
  );
};

export default PurchaseTable;
