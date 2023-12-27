'use client';

import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getProducts, upsertProduct, deleteProduct } from '@/actions/admin';
import { Product } from '@/lib/product';
import {
  AddIcon,
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';

function ProductRow({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: (priceId: string, stock: number) => Promise<boolean>;
  onDelete: () => Promise<boolean>;
}) {
  const [editing, setEditing] = useState(false);
  const [priceId, setPriceId] = useState(product.price_id);
  const [stock, setStock] = useState(product.stock.toString());

  let priceIdColumn = <Text>{priceId}</Text>;
  let stockColumn = <Text>{stock}</Text>;
  let actionsColumn = (
    <>
      <IconButton
        aria-label="Edit product"
        icon={<EditIcon />}
        onClick={() => setEditing(true)}
      />
      <IconButton
        aria-label="Delete product"
        icon={<DeleteIcon />}
        ml={3}
        onClick={onDelete}
      />
    </>
  );
  if (editing) {
    priceIdColumn = (
      <Input
        width="100%"
        value={priceId}
        onChange={(e) => setPriceId(e.target.value)}
      />
    );
    stockColumn = (
      <Input
        width="100%"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
    );
    actionsColumn = (
      <>
        <IconButton
          aria-label="Cancel edit"
          icon={<CloseIcon />}
          onClick={() => {
            setPriceId(product.price_id);
            setStock(product.stock.toString());
            setEditing(false);
          }}
        />
        <IconButton
          aria-label="Save edit"
          icon={<CheckIcon />}
          ml={3}
          onClick={async () => {
            if (await onEdit(priceId, parseInt(stock))) {
              setEditing(false);
            }
          }}
        />
      </>
    );
  }

  return (
    <Tr>
      <Td>{product.id}</Td>
      <Td width={400}>{priceIdColumn}</Td>
      <Td width={150}>{stockColumn}</Td>
      <Td textAlign="right">{actionsColumn}</Td>
    </Tr>
  );
}

function AddProductRow({
  onSave,
}: {
  onSave: (product: Product) => Promise<boolean>;
}) {
  const [editing, setEditing] = useState(false);
  const [productId, setProductId] = useState('');
  const [priceId, setPriceId] = useState('');
  const [stock, setStock] = useState('');

  let productIdColumn = <></>;
  let priceIdColumn = <></>;
  let stockColumn = <></>;
  let actionsColumn = (
    <IconButton
      aria-label="Add product"
      icon={<AddIcon />}
      onClick={() => setEditing(true)}
    />
  );
  if (editing) {
    productIdColumn = (
      <Input
        width="100%"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
    );
    priceIdColumn = (
      <Input
        width="100%"
        value={priceId}
        onChange={(e) => setPriceId(e.target.value)}
      />
    );
    stockColumn = (
      <Input
        width="100%"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
    );
    actionsColumn = (
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
          onClick={async () => {
            if (
              await onSave({
                id: productId,
                price_id: priceId,
                stock: parseInt(stock),
              })
            ) {
              setEditing(false);
              setProductId('');
              setPriceId('');
              setStock('');
            }
          }}
        />
      </>
    );
  }

  return (
    <Tr>
      <Td width={400}>{productIdColumn}</Td>
      <Td width={400}>{priceIdColumn}</Td>
      <Td width={150}>{stockColumn}</Td>
      <Td textAlign="right">{actionsColumn}</Td>
    </Tr>
  );
}

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);

  async function refreshProducts() {
    const success = await getProducts()
      .then(setProducts)
      .then(() => true);
    return success;
  }

  useEffect(() => {
    refreshProducts();
  }, []);

  return (
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
            <ProductRow
              key={product.id}
              product={product}
              onEdit={(priceId, stock) =>
                upsertProduct({
                  id: product.id,
                  price_id: priceId,
                  stock: stock,
                })
              }
              onDelete={() =>
                deleteProduct(product.id).then(
                  (success) => success && refreshProducts()
                )
              }
            />
          ))}
          <AddProductRow
            onSave={(product) =>
              upsertProduct(product).then(
                (success) => success && refreshProducts()
              )
            }
          />
        </Tbody>
      </Table>
    </TableContainer>
  );
}
