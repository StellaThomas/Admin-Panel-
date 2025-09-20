

import React, { useState } from "react";
import { Button, TextField, Typography, Paper, Stack } from "@mui/material";
import API from "../api";

export default function ProductForm({ onProductAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [dealerPrice, setDealerPrice] = useState("");
  const [franchisePrice, setFranchisePrice] = useState("");
  const [image, setImage] = useState(null);
  const [marathiName, setMarathiName] = useState("");
  const [marathiDesc, setMarathiDesc] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Translate English -> Marathi
  const handleTranslate = async () => {
    if (!name && !description) return alert("Enter Name/Description first");
    try {
      setLoading(true);
      const resName = await API.post("/translate", { text: name, target_lang: "mr" });
      const resDesc = await API.post("/translate", { text: description, target_lang: "mr" });
      setMarathiName(resName.data.translated_text);
      setMarathiDesc(resDesc.data.translated_text);
    } catch (err) {
      console.error("Translation error:", err);
      alert("Translation failed!");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Auto-calc Dealer Price
  const handleDealerPrice = () => {
    if (!price) return alert("Enter base price first");
    setDealerPrice((parseFloat(price) * 0.9).toFixed(2));
  };

  // 🔹 Auto-calc Franchise Price
  const handleFranchisePrice = () => {
    if (!price) return alert("Enter base price first");
    setFranchisePrice((parseFloat(price) * 0.8).toFixed(2));
  };

  // 🔹 Submit Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("dealer_price", dealerPrice);
    formData.append("franchise_price", franchisePrice);
    formData.append("marathi_name", marathiName);
    formData.append("marathi_description", marathiDesc);
    formData.append("image", image);

    try {
      setLoading(true);
      const res = await API.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Product added successfully!");
      onProductAdded && onProductAdded();

      // Reset form
      setName(""); setDescription(""); setPrice("");
      setQuantity(""); setDealerPrice(""); setFranchisePrice("");
      setImage(null); setMarathiName(""); setMarathiDesc("");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 6, borderRadius: "20px", background: "linear-gradient(135deg, #f8f9fa, #e3f2fd)" }}>
      <Typography variant="h5" align="center" gutterBottom>🛒 Add Product</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField label="Product Name (English)" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
          <TextField label="Description (English)" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} fullWidth required />
          <TextField label="Base Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth required />

          <Stack direction="row" spacing={2} alignItems="center">
            <TextField label="Dealer Price" type="number" value={dealerPrice} onChange={(e) => setDealerPrice(e.target.value)} fullWidth />
            <Button variant="outlined" color="secondary" onClick={handleDealerPrice}>Auto</Button>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <TextField label="Franchise Price" type="number" value={franchisePrice} onChange={(e) => setFranchisePrice(e.target.value)} fullWidth />
            <Button variant="outlined" color="secondary" onClick={handleFranchisePrice}>Auto</Button>
          </Stack>

          <TextField label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} fullWidth required />

          <Button variant="outlined" component="label">
            Upload Image
            <input type="file" hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </Button>
          {image && <Typography variant="body2">📂 {image.name}</Typography>}

          <Button variant="contained" onClick={handleTranslate} disabled={loading} sx={{ background: "linear-gradient(45deg, #42a5f5, #478ed1)", color: "#fff", borderRadius: "30px", fontWeight: "bold", py: 1.2 }}>
            {loading ? "Translating..." : "Translate to Marathi"}
          </Button>

          {marathiName && (
            <Paper sx={{ p: 2, bgcolor: "#fff3e0", borderRadius: "10px" }}>
              <Typography variant="subtitle1">Marathi Name:</Typography>
              <Typography>{marathiName}</Typography>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>Marathi Description:</Typography>
              <Typography>{marathiDesc}</Typography>
            </Paper>
          )}

          <Button type="submit" variant="contained" sx={{ background: "linear-gradient(45deg, #4caf50, #2e7d32)", color: "#fff", borderRadius: "30px", fontWeight: "bold", py: 1.2 }}>
            {loading ? "Submitting..." : "Submit Product"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
