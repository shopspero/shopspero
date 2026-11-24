'use client';

import {
  Box,
  HStack,
  IconButton,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
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

/* ---- shared editing state ---- */

function useEditableProduct(
  product: Product,
  onSave: (priceId: string, stock: number) => Promise<boolean>
) {
  const [editing, setEditing] = useState(false);
  const [priceId, setPriceId] = useState(product.price_id);
  const [editPriceId, setEditPriceId] = useState(product.price_id);
  const [stock, setStock] = useState(product.stock);
  const [editStock, setEditStock] = useState(product.stock);

  function cancel() {
    setEditPriceId(priceId);
    setEditStock(stock);
    setEditing(false);
  }
  async function save() {
    if (await onSave(editPriceId, editStock)) {
      setPriceId(editPriceId);
      setStock(editStock);
      setEditing(false);
    }
  }
  return {
    editing,
    setEditing,
    priceId,
    stock,
    editPriceId,
    setEditPriceId,
    editStock,
    setEditStock,
    cancel,
    save,
  };
}

function useAddProduct(onSave: (product: Product) => Promise<boolean>) {
  const [editing, setEditing] = useState(false);
  const [productId, setProductId] = useState('');
  const [priceId, setPriceId] = useState('');
  const [stock, setStock] = useState('');

  function reset() {
    setEditing(false);
    setProductId('');
    setPriceId('');
    setStock('');
  }
  async function save() {
    if (await onSave({ id: productId, price_id: priceId, stock: parseInt(stock) })) {
      reset();
    }
  }
  return {
    editing,
    setEditing,
    productId,
    setProductId,
    priceId,
    setPriceId,
    stock,
    setStock,
    reset,
    save,
  };
}

/* ---- shared action button groups ---- */

function ViewActions({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => Promise<boolean>;
}) {
  return (
    <>
      <IconButton aria-label="Edit product" icon={<EditIcon />} onClick={onEdit} />
      <IconButton
        aria-label="Delete product"
        icon={<DeleteIcon />}
        ml={3}
        onClick={onDelete}
      />
    </>
  );
}

function EditActions({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <>
      <IconButton aria-label="Cancel edit" icon={<CloseIcon />} onClick={onCancel} />
      <IconButton aria-label="Save edit" icon={<CheckIcon />} ml={3} onClick={onSave} />
    </>
  );
}

/* ---- desktop: table rows ---- */

function ProductRow({
  product,
  onSave,
  onDelete,
}: {
  product: Product;
  onSave: (priceId: string, stock: number) => Promise<boolean>;
  onDelete: () => Promise<boolean>;
}) {
  const e = useEditableProduct(product, onSave);
  return (
    <Tr>
      <Td>{product.id}</Td>
      <Td width={400}>
        {e.editing ? (
          <Input
            width="100%"
            value={e.editPriceId}
            onChange={(ev) => e.setEditPriceId(ev.target.value)}
          />
        ) : (
          <Text>{e.priceId}</Text>
        )}
      </Td>
      <Td width={150}>
        {e.editing ? (
          <Input
            width="100%"
            type="number"
            value={e.editStock}
            onChange={(ev) => e.setEditStock(parseInt(ev.target.value))}
          />
        ) : (
          <Text>{e.stock}</Text>
        )}
      </Td>
      <Td textAlign="right">
        {e.editing ? (
          <EditActions onCancel={e.cancel} onSave={e.save} />
        ) : (
          <ViewActions onEdit={() => e.setEditing(true)} onDelete={onDelete} />
        )}
      </Td>
    </Tr>
  );
}

function AddProductRow({
  onSave,
}: {
  onSave: (product: Product) => Promise<boolean>;
}) {
  const a = useAddProduct(onSave);
  return (
    <Tr>
      <Td width={400}>
        {a.editing && (
          <Input
            width="100%"
            value={a.productId}
            onChange={(ev) => a.setProductId(ev.target.value)}
          />
        )}
      </Td>
      <Td width={400}>
        {a.editing && (
          <Input
            width="100%"
            value={a.priceId}
            onChange={(ev) => a.setPriceId(ev.target.value)}
          />
        )}
      </Td>
      <Td width={150}>
        {a.editing && (
          <Input
            width="100%"
            value={a.stock}
            onChange={(ev) => a.setStock(ev.target.value)}
          />
        )}
      </Td>
      <Td textAlign="right">
        {a.editing ? (
          <EditActions onCancel={a.reset} onSave={a.save} />
        ) : (
          <IconButton
            aria-label="Add product"
            icon={<AddIcon />}
            onClick={() => a.setEditing(true)}
          />
        )}
      </Td>
    </Tr>
  );
}

/* ---- mobile: cards ---- */

function CardField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box>
      <Text fontSize="xs" color="gray.500" textTransform="uppercase">
        {label}
      </Text>
      {children}
    </Box>
  );
}

function ProductCard({
  product,
  onSave,
  onDelete,
}: {
  product: Product;
  onSave: (priceId: string, stock: number) => Promise<boolean>;
  onDelete: () => Promise<boolean>;
}) {
  const e = useEditableProduct(product, onSave);
  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Stack gap={3}>
        <CardField label="Product ID">
          <Text wordBreak="break-word">{product.id}</Text>
        </CardField>
        <CardField label="Stripe Price ID">
          {e.editing ? (
            <Input
              value={e.editPriceId}
              onChange={(ev) => e.setEditPriceId(ev.target.value)}
            />
          ) : (
            <Text wordBreak="break-word">{e.priceId}</Text>
          )}
        </CardField>
        <CardField label="Stock">
          {e.editing ? (
            <Input
              type="number"
              value={e.editStock}
              onChange={(ev) => e.setEditStock(parseInt(ev.target.value))}
            />
          ) : (
            <Text>{e.stock}</Text>
          )}
        </CardField>
        <HStack justify="flex-end" pt={1}>
          {e.editing ? (
            <EditActions onCancel={e.cancel} onSave={e.save} />
          ) : (
            <ViewActions onEdit={() => e.setEditing(true)} onDelete={onDelete} />
          )}
        </HStack>
      </Stack>
    </Box>
  );
}

function AddProductCard({
  onSave,
}: {
  onSave: (product: Product) => Promise<boolean>;
}) {
  const a = useAddProduct(onSave);
  if (!a.editing) {
    return (
      <Box>
        <IconButton
          aria-label="Add product"
          icon={<AddIcon />}
          onClick={() => a.setEditing(true)}
        />
      </Box>
    );
  }
  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Stack gap={3}>
        <CardField label="Product ID">
          <Input value={a.productId} onChange={(ev) => a.setProductId(ev.target.value)} />
        </CardField>
        <CardField label="Stripe Price ID">
          <Input value={a.priceId} onChange={(ev) => a.setPriceId(ev.target.value)} />
        </CardField>
        <CardField label="Stock">
          <Input value={a.stock} onChange={(ev) => a.setStock(ev.target.value)} />
        </CardField>
        <HStack justify="flex-end" pt={1}>
          <EditActions onCancel={a.reset} onSave={a.save} />
        </HStack>
      </Stack>
    </Box>
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

  const saveHandler = (product: Product) => (priceId: string, stock: number) =>
    upsertProduct({ id: product.id, price_id: priceId, stock });
  const deleteHandler = (product: Product) => () =>
    deleteProduct(product.id).then((success) => success && refreshProducts());
  const addHandler = (product: Product) =>
    upsertProduct(product).then((success) => success && refreshProducts());

  return (
    <>
      {/* Tablet and up: table */}
      <TableContainer display={{ base: 'none', sm: 'block' }}>
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
                onSave={saveHandler(product)}
                onDelete={deleteHandler(product)}
              />
            ))}
            <AddProductRow onSave={addHandler} />
          </Tbody>
        </Table>
      </TableContainer>

      {/* Mobile: cards */}
      <Stack display={{ base: 'flex', sm: 'none' }} gap={4}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSave={saveHandler(product)}
            onDelete={deleteHandler(product)}
          />
        ))}
        <AddProductCard onSave={addHandler} />
      </Stack>
    </>
  );
}
