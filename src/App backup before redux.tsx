import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table"
import { Search, PlusCircle, XCircle, PencilIcon } from "lucide-react"
import { DialogContent, Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./components/ui/dialog"
import { Label } from "./components/ui/label"
import axios from "axios"
import { useEffect, useState } from "react"


function App() {

  const [products,setProducts] = useState([]);
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

    useEffect(()=>{
        axios.get('http://127.0.0.1:3001/get')
        .then(result => setProducts(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewProduct((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDelete = (_id) => {
        axios.delete('http://127.0.0.1:3001/delete/'+_id)
        .then(result => {location.reload()})
        .catch(err => console.log(err))
    }

 /*  const handleEdit = (_id) => {
        axios.put('https://us-central1-todo-f73fb.cloudfunctions.net/api/update/'+_id)
        .then(result => {location.reload()})
        .catch(err => console.log(err))
    }
 */

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newProductData = new FormData();
    newProductData.append('name', newProduct.name);
    newProductData.append('price', newProduct.price);
    newProductData.append('quantity', newProduct.quantity);

    axios.post('http://127.0.0.1:3001/add', {name: newProduct.name, price: newProduct.price, quantity: newProduct.quantity})
        .then(result => {location.reload()})
        .catch(err => console.log(err))
  };

  const handleEdit = ( e: React.FormEvent,  _id ) => {
    e.preventDefault(); 

    const editProductData = new FormData();
    editProductData.append('name', editedProduct.name);
    editProductData.append('price', editedProduct.price);
    editProductData.append('quantity', editedProduct.quantity);

    axios.put('http://127.0.0.1:3001/update/'+_id, {name: editedProduct.name, price: editedProduct.price, quantity: editedProduct.quantity})
        .then(result => {location.reload()})
        .catch(err => console.log(err))
  };

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditedProduct((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  return (
    <>
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Produtos</h1>
          <div className="flex items-center justify-between">
            <form className="flex items-center gap-2">
              <Input name="id" placeholder="ID do produto" />
              <Input name="nome" placeholder="Nome do produto" />
              <Button type="submit" variant="link">
                <Search className="w-4 h-4 mr-2"/>
                Filtrar resultados
              </Button>
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
                    <Button type="submit">Guardar</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

          </div>
        <div className="border rounded">
          <Table>
            <TableHeader>
              <TableHead className="w-[10%]">ID</TableHead>
              <TableHead className="w-[45%]">Produto</TableHead>
              <TableHead className="w-[10%]">Preço</TableHead>
              <TableHead className="w-[10%]">Quantidade</TableHead>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                return (
                  <TableRow key={product._id}>
                    <TableCell>{product._id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price.toLocaleString('pt-PT', {style: 'currency', currency: 'eur'})}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
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
                              <Input className="col-span-3" required id="quantidd" value={editedProduct.quantity} onChange={handleEditInputChange} type="number" name="quantity" placeholder={product.quantity}/>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                              </DialogClose>
                              <Button type="submit">Guardar</Button>
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
      </div>
    </>
  )
}

export default App
