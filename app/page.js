'use client'
import {Box, Stack, Typography, Button, Modal, TextField, AppBar, Toolbar} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

import React, {useState, useEffect} from 'react';
import {collection, addDoc, getDocs,getDoc, querySnapshot, onSnapshot, query, deleteDoc, setDoc, doc } from "firebase/firestore";
import {db} from '../firebase'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}

export default function Home() {
  // We'll add our component logic here
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
 


  const updateInventory = async () => {
    const snapshot = query(collection(db, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }
  
  useEffect(() => {
    updateInventory()
  }, [])


  const addItem = async (item) => {
    const docRef = doc(collection(db, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }
  
  const removeItem = async (item) => {
    const docRef = doc(collection(db, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }

  const searchItem = async (item) => {
    const docRef = doc(collection(db, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()) {
     return {name: docSnap.id, ...docSnap.data()};
    } else {
      return null;
    }
    
  }

  

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
  <>
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx = {{flexGrow: 0.92}} textAlign='center'>
            Pantry Tracker
          </Typography>
      </Toolbar>
    </AppBar>
    <Box
    width="90vw"
    height="30vh"
    display={'flex'}
    justifyContent={'center'}
    flexDirection={'column'}
    alignItems={'center'}
    gap={2}
    >
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h4">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={1}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >
             Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="outlined" startIcon={<AddIcon/>} onClick={handleOpen}>
        Add New Item
      </Button>
      <Button variant="outlined" startIcon={<SearchIcon/>} onClick={handleOpen}>
        Search Item
      </Button>
    </Box>
    <TableContainer component={Paper}>
      <Table sx ={{minWidth: 450}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align='right'>Quantity</TableCell>
            <TableCell align='center'></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {inventory.map(({name, quantity}) => (
          <TableRow
          key = {name}
          sx = {{'&:last-child td, &:last-child th': { border: 0 }}}>
            <TableCell component={"th"} scope='row'>{name.charAt(0).toUpperCase() + name.slice(1)}</TableCell>
            <TableCell align='right'>{quantity}</TableCell>
            <TableCell align='right'>
            <Button variant="contained" startIcon={<DeleteIcon/>}onClick={() => removeItem(name)}>Remove</Button>
            </TableCell>
             
            
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  )
}