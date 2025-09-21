


// src/components/ProductForm.jsx
import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper, Stack } from "@mui/material";
import API from "../api";

export default function ProductForm({ editData, onProductAdded }) {
  const [productCode, setProductCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [dealerPrice, setDealerPrice] = useState("");
  const [franchisePrice, setFranchisePrice] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setProductCode(editData.productCode || "");
      setName(editData.name?.en || "");
      setDescription(editData.description?.en || "");
      setPrice(editData.price ?? "");
      setQuantity(editData.quantity ?? "");
      setDealerPrice(editData.dealer_price ?? "");
      setFranchisePrice(editData.franchise_price ?? "");
      setExistingImage(editData.image_url || "");
      setImage(null);
    } else {
      setProductCode("");
      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setDealerPrice("");
      setFranchisePrice("");
      setExistingImage("");
      setImage(null);
    }
  }, [editData]);

  const handleDealerPrice = () => {
    if (!price) return alert("Enter base price first");
    setDealerPrice((parseFloat(price) * 0.9).toFixed(2));
  };
  const handleFranchisePrice = () => {
    if (!price) return alert("Enter base price first");
    setFranchisePrice((parseFloat(price) * 0.8).toFixed(2));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || price === "") return alert("Name, description and price are required.");
    const formData = new FormData();
    if (!editData) formData.append("productCode", productCode || Date.now().toString());
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", String(price));
    formData.append("dealer_price", String(dealerPrice || 0));
    formData.append("franchise_price", String(franchisePrice || 0));
    formData.append("quantity", String(quantity || 0));
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      if (editData && editData._id) {
        await API.put(`/api/products/${editData._id}`, formData); // don't set Content-Type manually
        alert("✅ Product updated successfully!");
      } else {
        await API.post(`/api/products`, formData);
        alert("✅ Product added successfully!");
      }
      onProductAdded && onProductAdded();
    } catch (err) {
      console.error("Error submitting product:", err);
      const serverMsg = err?.response?.data?.message || err?.message;
      alert("❌ Failed to submit product: " + serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 2, borderRadius: "20px", background: "linear-gradient(135deg, #f8f9fa, #e3f2fd)" }}>
      <Typography variant="h5" align="center" gutterBottom>{editData ? "✏️ Update Product" : "🛒 Add Product"}</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField label="Product Code" value={productCode} onChange={(e)=>setProductCode(e.target.value)} required={!editData} disabled={!!editData} fullWidth />
          <TextField label="Product Name (English)" value={name} onChange={(e)=>setName(e.target.value)} required fullWidth />
          <TextField label="Description (English)" value={description} onChange={(e)=>setDescription(e.target.value)} multiline rows={3} fullWidth required />
          <TextField label="Base Price" type="number" value={price} onChange={(e)=>setPrice(e.target.value)} fullWidth required />
          <Stack direction="row" spacing={2}><TextField label="Dealer Price" type="number" value={dealerPrice} onChange={(e)=>setDealerPrice(e.target.value)} fullWidth /><Button variant="outlined" onClick={handleDealerPrice}>Auto</Button></Stack>
          <Stack direction="row" spacing={2}><TextField label="Franchise Price" type="number" value={franchisePrice} onChange={(e)=>setFranchisePrice(e.target.value)} fullWidth /><Button variant="outlined" onClick={handleFranchisePrice}>Auto</Button></Stack>
          <TextField label="Quantity" type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} fullWidth />
          <Button variant="outlined" component="label">{editData ? "Change Image" : "Upload Image"}<input type="file" hidden accept="image/*" onChange={(e)=>setImage(e.target.files[0])} /></Button>
          {existingImage && !image && <img src={existingImage} alt="current" style={{ width:"100%", maxHeight:150, objectFit:"cover", borderRadius:8 }} />}
          {image && <Typography variant="body2">📂 {image.name}</Typography>}
          <Button type="submit" variant="contained" disabled={loading} sx={{ background: "linear-gradient(45deg,#4caf50,#2e7d32)", color:"#fff" }}>{loading ? "Submitting..." : (editData ? "Update Product" : "Submit Product")}</Button>
        </Stack>
      </form>
    </Paper>
  );
}
