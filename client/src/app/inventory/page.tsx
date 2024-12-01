"use client";

import { useState } from "react";
import {
  useGetInventoryQuery,
  useCreateInventoryMutation,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
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
  CircularProgress,
} from "@mui/material";
import CreateInventoryModal from "./CreateInventoryModal";

const Inventory = () => {
  const { data: inventory, error, isError, isLoading } = useGetInventoryQuery();
  const [createInventory] = useCreateInventoryMutation();
  const [updateInventory] = useUpdateInventoryMutation();
  const [deleteInventory] = useDeleteInventoryMutation();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const openCreateDialog = () => {
    setDialogOpen(true);
    setSelectedItem(null);
  };

  const openEditDialog = (item: any) => {
    setDialogOpen(true);
    setSelectedItem(item);
  };

  const openDeleteDialog = (id: string) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteInventory(itemToDelete).unwrap();
      } catch (err) {
        console.error("Failed to delete item:", err);
      } finally {
        setDeleteDialogOpen(false);
        setItemToDelete(null);
      }
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

  const handleSubmit = async (e: React.FormEvent, id?: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get("name") as string;
    const stock = parseInt(formData.get("stock") as string, 10);
    const unit = formData.get("unit") as string;

    try {
      if (id) {
        await updateInventory({
          id,
          updatedInventory: { name, stock, unit },
        }).unwrap();
      } else {
        await createInventory({ name, stock, unit }).unwrap();
      }
      closeDialog();
    } catch (err) {
      console.error("Error submitting inventory form:", err);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nama Barang", width: 200 },
    { field: "stock", headerName: "Stok", width: 200 },
    { field: "unit", headerName: "Satuan", width: 200 },
    {
      field: "actions",
      headerName: "Aksi",
      width: 180,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <Button
            variant="contained"
            color="primary"
            onClick={() => openEditDialog(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => params.row.id && openDeleteDialog(params.row.id)}
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <CircularProgress />
      </div>
    );
  }

  if (isError || !inventory) {
    return (
      <div className="text-center text-red-500 py-4">
        Gagal memuat data inventaris. Silakan coba lagi.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <Button
        onClick={() => setModalOpen(true)}
        variant="contained"
        color="primary"
        className="mb-4"
      >
        Tambah Barang
      </Button>
      <DataGrid
        rows={inventory}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>
          {selectedItem ? "Edit Barang" : "Tambah Barang"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => handleSubmit(e, selectedItem?.id)}>
            <TextField
              name="name"
              label="Nama Barang"
              defaultValue={selectedItem?.name || ""}
              fullWidth
              required
              className="mb-4"
            />
            <TextField
              name="stock"
              label="Stok"
              type="number"
              defaultValue={selectedItem?.stock || ""}
              fullWidth
              required
              className="mb-4"
            />
            <TextField
              name="unit"
              label="Satuan"
              defaultValue={selectedItem?.unit || ""}
              fullWidth
              required
              className="mb-4"
            />
            <DialogActions>
              <Button onClick={closeDialog} color="inherit">
                Batal
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {selectedItem ? "Simpan Perubahan" : "Tambah"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <p>Apakah Anda yakin ingin menghapus barang ini?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            Batal
          </Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <CreateInventoryModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={async (formData) => {
          try {
            await createInventory(formData).unwrap();
          } catch (err) {
            console.error("Error creating inventory:", err);
          }
        }}
      />
    </div>
  );
};

export default Inventory;
