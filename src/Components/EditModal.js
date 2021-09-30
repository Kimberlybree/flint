import React, { useState, useContext } from 'react';
import { DataContext } from './DataContext';
import DatePickerComponent from './DatePicker.js'
import categoryOptionsRaw from "../categories"
import axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Button,
    RadioGroup,
    Radio,
    Stack
} from "@chakra-ui/react"

const EditModal = (props) => {

    const userId = localStorage.getItem('fuid');

    const { transactionDate, transactionId, setUserAction, matchingTransactionData, accessToken,
        editTxDesc,
        editTxDate,
        editTxType,
        editTxCat,
        editTxSubcat,
        editTxAmt,
        setEditTxDesc,
        setEditTxDate,
        setEditTxType,
        setEditTxCat,
        setEditTxSubcat,
        setEditTxAmt,

        txDescription,
        txType,
        txCategory,
        txSubcategory,
        txAmount,
        setTxDescription,
        setTxType,
        setTxCategory,
        setTxSubcategory,
        setTxAmount,
    } = useContext(DataContext);

    // console.log("matchingTransactionData is", matchingTransactionData);

    let categoryOptions = categoryOptionsRaw.map((item, index) => {
        return (
            <option key={item.id} value={item.major}>{item.major}</option>
        )
    })

    // TODO: Currently hardcoded.
    let selectedCategory = "Entertainment"

    const matchingCategory = categoryOptionsRaw.filter((item, index) => {
        return item.major === selectedCategory;
    })

    let subcategoryOptions = matchingCategory[0].minor.map((item, index) => {

        if (selectedCategory.length > 0) {
            return (
                <option key={item} value={item}>{item}</option>
            )
        } else {
            return (
                <option>No Category Selected</option>
            )
        }

    })

    const editTransaction = async () => {
        console.log(`Attempting to edit a transaction with id of ${transactionId}...`)

        const url =
            process.env.NODE_ENV === 'production'
                ? `http://flint-server.herokuapp.com/users/${userId}/edittransaction/${transactionId}`
                : `http://localhost:8000/users/${userId}/edittransaction/${transactionId}`

        axios.put(url, {
            "description": txDescription,
            "date": transactionDate,
            "type": txType,
            "category": txCategory,
            "subcategory": txSubcategory,
            "amount": txAmount
        },{
            headers: {"authorization": `Bearer ${accessToken}`}
        })
        .then((res) => {
            console.log("Success!")
            setUserAction("edit")
            props.onEditClose()
        })
        .catch(console.error)
    }

    const storeDescription = ((e) => {
        setTxDescription(e.target.value)
        setEditTxDesc(e.target.value)
    })

    const storeType = ((e) => {
        setTxType(e.target.value)
        setEditTxType(e.target.value)
    })

    const storeCategory = ((e) => {
        setTxCategory(e.target.value)
        setEditTxCat(e.target.value)
    })

    const storeSubcategory = ((e) => {
        setTxSubcategory(e.target.value)
        setEditTxSubcat(e.target.value)
    })

    const storeTxAmount = ((e) => {
        setTxAmount(e.target.value)
        setEditTxAmt(e.target.value)
    })

    return (
        <>
            <Modal isOpen={props.isEditOpen} onClose={props.onEditClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Transaction</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input value={editTxDesc} name="input-description" onChange={storeDescription} placeholder="i.e. Starbucks" />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Type</FormLabel>
                            <RadioGroup value={editTxType} defaultValue="2">
                                <Stack spacing={5} direction="row">
                                    <Radio name="input-type" onChange={storeType} colorScheme="green" value="Income">Income</Radio>
                                    <Radio name="input-type" onChange={storeType} colorScheme="red" value="Expense">Expense</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <Select value={editTxCat} name="input-category" onChange={storeCategory} placeholder="Select category">
                                {categoryOptions}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Subcategory</FormLabel>
                            <Select value={editTxSubcat} name="input-subcategory" onChange={storeSubcategory} placeholder="Select category">
                                {subcategoryOptions}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Date</FormLabel>
                            <DatePickerComponent value={editTxDate} name="input-date" className="transaction-date-picker"/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Amount</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    color="gray.300"
                                    fontSize="1.2em"
                                    children="$"
                                />
                                <Input value={editTxAmt} name="input-amount" onChange={storeTxAmount} placeholder="Enter amount" />
                            </InputGroup>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={editTransaction} type="submit">Save</Button>
                        <Button onClick={props.onEditClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditModal;
