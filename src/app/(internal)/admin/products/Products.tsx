'use client';

import {
  Center,
  Container,
  Heading,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getProducts, upsertProduct, deleteProduct } from '@/actions/admin';
import { Product } from '@/lib/product';
import {
  AddIcon,
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  function refreshProducts() {
    getProducts().then((products) => {
      setProducts(products);
    });
  }

  useEffect(refreshProducts, []);

  function handleDelete(productId: string) {
    deleteProduct(productId).then(refreshProducts);
  }

  function handleUpsert(product: Product) {
    upsertProduct(product).then(refreshProducts);
  }

  function ProductRow(product: Product) {
    const [editing, setEditing] = useState(false);
    const [priceId, setPriceId] = useState(product.price_id);
    const [stock, setStock] = useState(product.stock.toString());

    return (
      <Tr>
        <Td>{product.id}</Td>
        <Td width={400}>
          {editing ? (
            <Input
              width="100%"
              value={priceId}
              onChange={(e) => setPriceId(e.target.value)}
            />
          ) : (
            priceId
          )}
        </Td>
        <Td width={150}>
          {editing ? (
            <Input
              width="100%"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          ) : (
            stock
          )}
        </Td>
        <Td textAlign="right">
          {editing ? (
            <IconButton
              aria-label="Cancel edit"
              icon={<CloseIcon />}
              onClick={() => {
                setPriceId(product.price_id);
                setStock(product.stock.toString());
                setEditing(false);
              }}
            />
          ) : (
            <IconButton
              aria-label="Edit product"
              icon={<EditIcon />}
              onClick={() => setEditing(true)}
            />
          )}
          {editing ? (
            <IconButton
              aria-label="Save edit"
              icon={<CheckIcon />}
              ml={3}
              onClick={() => {
                handleUpsert({
                  id: product.id,
                  price_id: priceId,
                  stock: parseInt(stock),
                });
              }}
            />
          ) : (
            <IconButton
              aria-label="Delete product"
              icon={<DeleteIcon />}
              ml={3}
              onClick={() => handleDelete(product.id)}
            />
          )}
        </Td>
      </Tr>
    );
  }

  function AddProductRow() {
    const [editing, setEditing] = useState(false);
    const [productId, setProductId] = useState('');
    const [priceId, setPriceId] = useState('');
    const [stock, setStock] = useState('');

    return (
      <Tr>
        <Td width={400}>
          {editing && (
            <Input
              width="100%"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          )}
        </Td>
        <Td width={400}>
          {editing && (
            <Input
              width="100%"
              value={priceId}
              onChange={(e) => setPriceId(e.target.value)}
            />
          )}
        </Td>
        <Td width={150}>
          {editing && (
            <Input
              width="100%"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          )}
        </Td>
        <Td textAlign="right">
          {editing ? (
            <>
              <IconButton
                aria-label="Cancel add"
                icon={<CloseIcon />}
                onClick={() => {
                  setEditing(false);
                  setProductId('');
                  setPriceId('');
                  setStock('');
                }}
              />
              <IconButton
                aria-label="Confirm add"
                icon={<CheckIcon />}
                ml={3}
                onClick={() => {
                  handleUpsert({
                    id: productId,
                    price_id: priceId,
                    stock: parseInt(stock),
                  });
                }}
              />
            </>
          ) : (
            <IconButton
              aria-label="Add product"
              icon={<AddIcon />}
              onClick={() => setEditing(true)}
            />
          )}
        </Td>
      </Tr>
    );
  }

  return (
    <Container maxWidth={1300}>
      <Center p={10}>
        <Heading as="h1" size="2xl">
          Products
        </Heading>
      </Center>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Product ID</Th>
              <Th>Stripe Price ID</Th>
              <Th>Stock</Th>
              <Th textAlign="right">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <ProductRow key={product.id} {...product} />
            ))}
            <AddProductRow />
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}
