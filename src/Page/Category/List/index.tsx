import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Container, Typography, Button } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Category {
    id: string;
    name: string;
    is_active: boolean;
}

const List = () => {
    const navigate = useNavigate();
    const [rows, setRows] = useState<Category[]>([]);

    const handleEdit = (id: string) => () => {
        navigate(`/edit/${id}`);
    }

    const token = window.localStorage.getItem('token');

    const fetchList = async () => {
        try {
            const response = await axios.get('https://mock-api.arikmpt.com/api/category', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setRows(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchList();
    }, []);

    const handleDelete = (id: string) => async () => {
        try {
            await axios.delete(`https://mock-api.arikmpt.com/api/category/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            fetchList();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    }

    return (
        <div className='content'>
            <Container maxWidth="md">
                <div className='category-list'>
                    <Typography variant="h4" component="h4" align={'center'}>
                        List Of Category
                    </Typography>
                    <Link to={'/add'}>Add New Category</Link>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.is_active ? 'Active' : 'Deactive'}</TableCell>
                                        <TableCell align="center">
                                            <div className="action-group">
                                                <Button size="small" variant="contained" onClick={handleEdit(row.id)}>Edit</Button>
                                                <Button size="small" variant="outlined" color="error" onClick={handleDelete(row.id)}>Hapus</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Container>
        </div>
    );
}

export default List;
