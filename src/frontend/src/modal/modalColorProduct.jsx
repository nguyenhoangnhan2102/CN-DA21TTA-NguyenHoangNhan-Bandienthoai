/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Modal,
    Typography,
    Input,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { getAllManufacturer } from "../service/manufacturerService";
import { getAllProducts } from "../service/productService";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    maxHeight: "95vh", // Đặt chiều cao tối đa để tránh vượt quá màn hình
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflowY: "auto", // Thêm thuộc tính này để có thanh cuộn dọc khi cần
};

const ModalColorProduct = ({ colorproduct, onSave, open, onClose }) => {
    const [listProducts, setListProducts] = useState([]);
    const [form, setForm] = useState({
        masanpham: "",
        tenmausanpham: "",
        tensanpham: "",
        mausachinhanh: "",
    });

    useEffect(() => {
        console.log("colorproduct", colorproduct)
        if (colorproduct) {
            setForm(colorproduct);
        } else {
            setForm({
                masanpham: "",
                tenmausanpham: "",
                tensanpham: "",
                mausachinhanh: "",
            });
        }
        getAllProductData();
    }, [colorproduct]);

    const getAllProductData = async () => {
        try {
            const response = await getAllProducts();
            if (response) {
                setListProducts(response.DT || []); // Đảm bảo rằng `DT` luôn là một mảng
                console.log("dt", response.DT);
            } else {
                console.error("Failed to fetch");
            }
        } catch (error) {
            console.error("Error occurred", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm((prev) => ({ ...prev, mausachinhanh: file }));
    };


    const handleSubmit = () => {
        onSave(form);
        setForm({
            masanpham: "",
            tenmausanpham: "",
            tensanpham: "",
            mausachinhanh: "",
        });
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-title" variant="h6" component="h2">
                    {colorproduct ? "Cập nhật" : "Thêm mới"}
                </Typography>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="select-mathuonghieu-label">Sản phẩm</InputLabel>
                    <Select
                        labelId="select-mathuonghieu-label"
                        name="masanpham"
                        label="Sản phẩm"
                        value={form.masanpham}
                        onChange={handleChange}
                    >
                        {listProducts.map((colorproduct) => (
                            <MenuItem key={colorproduct.masanpham} value={colorproduct.masanpham}>
                                {colorproduct.tensanpham}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Màu"
                    name="tenmausanpham"
                    value={form.tenmausanpham}
                    onChange={handleChange}
                />
                <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                    <input
                        type="file"
                        id="mausachinhanh"
                        name="mausachinhanh"
                        accept="mausachinhanh/*"
                        onChange={handleFileChange}
                        required
                        style={{
                            width: "100%",
                            padding: "16.5px 14px",
                            fontSize: "1rem",
                            lineHeight: "1.4375em",
                            backgroundColor: "#fff",
                            border: "1px solid rgba(0, 0, 0, 0.23)",
                            borderRadius: "4px",
                            color: "rgba(0, 0, 0, 0.87)",
                            boxSizing: "border-box",
                            transition: "border-color 0.3s, box-shadow 0.3s",
                        }}
                        onFocus={(e) => (e.target.style.border = "2px solid #3f51b5")}
                        onBlur={(e) =>
                            (e.target.style.border = "1px solid rgba(0, 0, 0, 0.23)")
                        }
                    />
                </Box>

                <Box mt={2} display="flex" justifyContent="flex-end" gap="5px">
                    <button className="btn btn-primary admin-btn" onClick={handleSubmit}>
                        {colorproduct ? "Cập nhật" : "Tạo mới"}
                    </button>
                    <button className="btn btn-danger admin-btn" onClick={onClose} style={{ width: '15%' }}>
                        Huỷ
                    </button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalColorProduct;