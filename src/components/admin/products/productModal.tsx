import {
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import File from 'showed/components/core/input/file';
import { FileType } from 'showed/components/core/input/fileType';
import {
    createProduct,
    updateProduct,
} from 'showed/controllers/product/productController';
import { Product } from 'showed/lib/product/models/product';

export default function ProductModal({
    initialProduct = null,
    onProductSaved,
}: {
    initialProduct?: Product | null;
    onProductSaved: (product: Product) => void;
}) {
    const [image, setImage] = useState<File | null>(null);
    const [hasImageChanged, setHasImageChanged] = useState<boolean>(false);
    const [initialImagePath, setInitialImagePath] = useState<string | null>(
        null
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<Product>(
        initialProduct
            ? initialProduct
            : { name: '', description: '', price: 0, imageId: '' }
    );
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const handleImageChange = async (file: File | null) => {
        setImage(file);
        setHasImageChanged(true);
    };

    const openProductModal = () => {
        setIsModalOpen(true);
        setProduct(
            initialProduct
                ? initialProduct
                : { name: '', description: '', price: 0, imageId: '' }
        );
    };
    const cancelNewProduct = () => {
        setIsModalOpen(false);
    };
    async function saveNewProduct() {
        if (hasImageChanged) {
            if (product.imageId) {
                await fetch(`api/image/${product.imageId}`, {
                    method: 'DELETE',
                });
            }
            if (image) {
                const fileFormData = new FormData();
                fileFormData.append('file', image);
                const result = await (
                    await fetch('api/image', {
                        method: 'POST',
                        body: fileFormData,
                    })
                ).json();

                product.imageId = result.id;
            }
            setHasImageChanged(false);
            setImage(null);
        }
        if (initialProduct) {
            await updateProduct(product);
        } else {
            await createProduct(product);
        }
        onProductSaved(product);
        setIsModalOpen(false);
    }

    useEffect(() => {
        if (initialProduct?.imageId) {
            fetch(`api/image/${initialProduct.imageId}?mustReturnData=1`).then(
                async (response) => {
                    response.json().then((result) => {
                        setInitialImagePath(result.filepath);
                        setIsLoading(false);
                    });
                }
            );
        } else {
            setIsLoading(false);
        }
    }, [initialProduct]);

    return (
        <>
            <Button onClick={openProductModal}>
                {initialProduct ? 'Modifier' : 'Créer un produit'}
            </Button>
            <Modal isOpen={isModalOpen} onClose={cancelNewProduct}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {initialProduct
                            ? 'Modifier le produit ' + initialProduct.name
                            : 'Créer un produit'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody margin={'20px'}>
                        <Text marginBottom={'10px'}>Nom</Text>
                        <Input
                            placeholder='Nom du produit'
                            value={product.name}
                            onChange={(e) =>
                                setProduct({ ...product, name: e.target.value })
                            }
                        />
                        <Text marginTop={'15px'} marginBottom={'10px'}>
                            Description
                        </Text>
                        <Input
                            placeholder='Description du produit'
                            value={product.description}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    description: e.target.value,
                                })
                            }
                        />
                        <Text marginTop={'15px'} marginBottom={'10px'}>
                            Prix
                        </Text>
                        <InputGroup>
                            <Input
                                placeholder='Entrez le prix'
                                type='number'
                                value={product.price}
                                onChange={(e) =>
                                    setProduct({
                                        ...product,
                                        price: parseFloat(e.target.value),
                                    })
                                }
                            />
                            <InputRightElement
                                pointerEvents='none'
                                color='gray.300'
                                fontSize='1.2em'
                            >
                                €
                            </InputRightElement>
                        </InputGroup>
                        <Text marginTop={'15px'} marginBottom={'10px'}>
                            Image
                        </Text>
                        {isLoading && <Spinner size='xl' />}
                        {!isLoading && (
                            <File
                                name='imageId'
                                initialFilePath={initialImagePath}
                                onChange={handleImageChange}
                                allowedFileExtensions={['png, jpg, jpeg']}
                                fileType={FileType.IMAGE}
                            />
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            marginRight={'10px'}
                            variant={'ghost'}
                            onClick={cancelNewProduct}
                        >
                            Annuler
                        </Button>
                        <Button onClick={saveNewProduct}>
                            {initialProduct
                                ? 'Sauvegarder les modifications'
                                : 'Créer le produit'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
