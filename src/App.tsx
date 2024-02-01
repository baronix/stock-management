// @ts-nocheck

import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table"
import { Search, PlusCircle, XCircle, PencilIcon } from "lucide-react"
import { DialogContent, Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./components/ui/dialog"
import { Label } from "./components/ui/label"
import { useEffect, useState } from "react"
import { addProduct, fetchProducts, deleteProduct, editProduct, setSearchTerm } from "./redux/productSlice"
import { useDispatch, useSelector } from "react-redux"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./components/ui/pagination"
import { products } from "./data/products"
import Spinner from "./components/Spinner"
import AnimatedPage from "./components/AnimatedPage"
import Login from "./components/Login"
import NavBar from "./components/NavBar"


function App() {

  //redux declares
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.products) 

  console.log(isLoggedIn)

  //useEffect for first render fetch
    useEffect(()=>{
      dispatch(fetchProducts());
    }, [dispatch])

  //delete product
const handleDelete = (_id) => {
      dispatch(deleteProduct(_id))
      .then(result=> dispatch(fetchProducts()))
      .catch(err => console.log(err))
  }
  //form handlers
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewProduct((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditedProduct((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

    const [newProduct,setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
  })
  const [editedProduct,setEditedProduct] = useState({
    name: '',
    price: '',
    quantity: '',
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newProductData = new FormData();
    newProductData.append('name', newProduct.name);
    newProductData.append('price', newProduct.price);
    newProductData.append('quantity', newProduct.quantity);

    const validatedPrice = newProduct.price.replace(/,/g, ".");

    dispatch(addProduct({ name: newProduct.name, price: validatedPrice, quantity: newProduct.quantity}))
    .then(result => dispatch(fetchProducts()))
    setNewProduct({
      name: '',
      price: '',
      quantity: '',
    }) 
  };

  const handleEdit = ( e: React.FormEvent,  _id ) => {
    e.preventDefault(); 

    const editProductData = new FormData();
    editProductData.append('name', editedProduct.name);
    editProductData.append('price', editedProduct.price);
    editProductData.append('quantity', editedProduct.quantity);

    dispatch(editProduct({id: _id ,name: editedProduct.name, price: editedProduct.price, quantity: editedProduct.quantity}))
    .then(result=> dispatch(fetchProducts()))
    setEditedProduct({
      name: '',
      price: '',
      quantity: '',
    })
  };

  //Filter
  const filteredProducts = useSelector((state) => {
        const products = state?.products?.data?.data;
        const searchTerm = state?.products?.searchTerm?.toLowerCase()

        return products?.filter((product) => {
            const matchSearchTerm = product.name.toLowerCase().includes(searchTerm)

            return matchSearchTerm
        })
    })  
  const [searchTerm, setNewSearchTerm] = useState("")
  const handleSearchChange = (value) => {
        setNewSearchTerm(value)
        dispatch(setSearchTerm(value))
    }


  return (
    <>
      <NavBar/>
      {
      !isLoggedIn 
      ?
      <Login/>
      :
      (<div>{ 
      !filteredProducts 
      ? 
      <Spinner/> 
      : 
      (<AnimatedPage>
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Produtos</h1>
          <div className="flex items-center justify-between">
            <form className="flex items-center gap-2">
              <Input name="nome" id="nome" value={searchTerm} onChange={(e) => handleSearchChange(e.target.value)} placeholder={`Pesquisar`} />
              <Label htmlFor="nome"><Search className="w-4 h-4"/></Label>
            </form>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2"/>
                  Novo produto
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Novo produto</DialogTitle>
                  <DialogDescription>Adicionar um novo produto ao sistema</DialogDescription>
                </DialogHeader>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-4 items-center">
                    <Label htmlFor="name">Produto</Label>
                    <Input className="col-span-3" required value={newProduct.name} onChange={handleInputChange} id="nome" name="name" />
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <Label htmlFor="preco">Preço</Label>
                    <Input className="col-span-3" required value={newProduct.price} onChange={handleInputChange} id="preco" name="price" />
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <Label htmlFor="quantidd">Quantidade</Label>
                    <Input className="col-span-3" required id="quantidd" value={newProduct.quantity} onChange={handleInputChange} type="number" name="quantity" />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="submit">Guardar</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

          </div>
        <div className="border rounded">
          <Table>
            <TableHeader>
              <TableHead className="w-[70%]">Produto</TableHead>
              <TableHead className="w-[10%] ">Preço</TableHead>
              <TableHead className="w-[10%]">Qtd</TableHead>
            </TableHeader>
            <TableBody>
              {filteredProducts?.map((product: any) => {
                return (
                  <TableRow key={product._id}>
                    <TableCell className="">{product.name}</TableCell>
                    <TableCell className="">{product.price.toLocaleString('pt-PT', {style: 'currency', currency: 'eur'})}</TableCell>
                    <TableCell className="">{product.quantity}</TableCell>
                    <div className="flex space-x-2 pl-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button><PencilIcon /></button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar produto</DialogTitle>
                            <DialogDescription>Alterar dados de produto no sistema</DialogDescription>
                          </DialogHeader>
                          <form className="space-y-6" onSubmit={e => handleEdit(e, product._id)}>
                            <div className="grid grid-cols-4 items-center">
                              <Label htmlFor="name">Produto</Label>
                              <Input className="col-span-3" required value={editedProduct.name} onChange={handleEditInputChange} id="nome" name="name" placeholder={product.name}/>
                            </div>
                            <div className="grid grid-cols-4 items-center">
                              <Label htmlFor="preco">Preço</Label>
                              <Input className="col-span-3" required value={editedProduct.price} onChange={handleEditInputChange} id="preco" name="price" placeholder={product.price}/>
                            </div>
                            <div className="grid grid-cols-4 items-center">
                              <Label htmlFor="quantidd">Quantidade</Label>
                              <Input className="col-span-3" min="1" required id="quantidd" value={editedProduct.quantity} onChange={handleEditInputChange} type="number" name="quantity" placeholder={product.quantity}/>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button type="submit">Guardar alteração</Button>
                              </DialogClose>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button><XCircle /></button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Eliminar produto?</DialogTitle>
                            <DialogDescription>Atenção: Esta ação é irreversível</DialogDescription>
                          </DialogHeader>
                          <h2>Tem a certeza que pretende eliminar {product.name}?</h2>
                          <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                              </DialogClose>
                                <Button variant={"destructive"} onClick={() => handleDelete(product._id)} >Eliminar</Button>
                            </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableRow>
                )
              })}
            </TableBody> 
          </Table>
        </div>
        {/*still need to work on this <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination> */}
      </div></AnimatedPage>)}</div>)}
    </>
  )
}

export default App
