"use client";

import { useState } from "react";
import {
  useGetBahanQuery,
  useCreateBahanMutation,
  useUpdateBahanMutation,
  useDeleteBahanMutation,
} from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const Inventory = () => {
  const { data: Bahan, error, isError, isLoading } = useGetBahanQuery();
  const [createBahan] = useCreateBahanMutation();
  const [updateBahan] = useUpdateBahanMutation();
  const [deleteBahan] = useDeleteBahanMutation();

  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedBahan, setSelectedBahan] = useState<any>(null);
  const [BahanToDelete, setBahanToDelete] = useState<string | null>(null);

  const handleCreate = () => {
    setOpen(true);
    setSelectedBahan(null);
  };

  const handleEdit = (Bahan: any) => {
    setOpen(true);
    setSelectedBahan(Bahan);
  };

  const handleDelete = (bahanId: string) => {
    console.log("Delete function called with ID:", bahanId);
    setBahanToDelete(bahanId);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (BahanToDelete) {
      await deleteBahan(BahanToDelete);
      setOpenDeleteDialog(false);
      setBahanToDelete(null);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBahan(null);
  };

  const handleSubmit = async (e: React.FormEvent, id?: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get("name") as string;
    const stock = parseInt(formData.get("stock") as string);
    const unit = formData.get("unit") as string;

    try {
      if (id) {
        const response = await updateBahan({
          id,
          updatedBahan: { name, stock, unit },
        });
        console.log("Update response:", response);
      } else {
        const response = await createBahan({
          name,
          stock,
          unit,
        });
        console.log("Create response:", response);
      }
      handleClose();
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "bahanId", headerName: "ID", width: 90 },
    { field: "name", headerName: "Bahan Name", width: 200 },
    { field: "stock", headerName: "Stok", width: 200 },
    { field: "unit", headerName: "Unit", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="flex space-x-2">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit(params.row)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(params.row.bahanId)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || error || !Bahan) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch Bahan</div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <Button
        onClick={handleCreate}
        variant="contained"
        color="primary"
        className="mb-4"
      >
        Add Bahan
      </Button>
      <DataGrid
        rows={Bahan}
        columns={columns}
        getRowId={(row) => row.bahanId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
        onRowClick={(params) => handleEdit(params.row)}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedBahan ? "Edit Bahan" : "Add Bahan"}</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => handleSubmit(e, selectedBahan?.bahanId)}>
            <TextField
              name="name"
              label="Bahan Name"
              defaultValue={selectedBahan?.name || ""}
              fullWidth
              required
              className="mb-2"
            />
            <TextField
              name="stock"
              label="Stock"
              type="number"
              defaultValue={selectedBahan?.stock || ""}
              fullWidth
              required
              className="mb-2"
            />
            <TextField
              name="unit"
              label="Unit"
              defaultValue={selectedBahan?.unit || ""}
              fullWidth
              required
              className="mb-2"
            />
            <DialogActions>
              <Button onClick={handleClose} color="inherit">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {selectedBahan ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this Bahan?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Inventory;
