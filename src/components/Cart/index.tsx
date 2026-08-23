import { Button, CartContainer, CartItem, Overlay, Sidebar, TotalPrice, Infos, TrashCan, Checkout, Title, Form, Row, InputGroup, Warning } from "./styles"
import { useDispatch, useSelector } from "react-redux"
import type { RootReducer } from "../../store"
import { close, remove, forward, backward, resetCount } from "../../store/reducers/cart"
import { useFormik } from "formik"
import * as Yup from "yup"
import { usePurchaseMutation } from "../../services/api"

function Cart() {

    const { isOpen, items, checkout } = useSelector((state: RootReducer) => state.cart)
    const dispatch = useDispatch()
    const [purchase, { isSuccess, data, reset }] = usePurchaseMutation()

    const getProducts = () => {
        const products: Product[] = []
        for (let i = 0; i < items.length; i++) {
            products.push({
                id: items[i].id,
                price: items[i].preco
            })
        }
        return products
    }

    const form = useFormik({
        initialValues: {
            name: "",
            address: "",
            city: "",
            cep: "",
            houseNumber: "",
            addrAddInfo: "",
            cardOwner: "",
            cardNumber: "",
            cardCode: "",
            expireMonth: "",
            expireYear: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().min(5, "O campo precisa ter pelo menos 5 caracteres").required("O campo é obrigatório"),
            address: Yup.string().min(5, "O campo precisa ter pelo menos 5 caracteres").required("O campo é obrigatório"),
            city: Yup.string().min(5, "O campo precisa ter pelo menos 5 caracteres").required("O campo é obrigatório"),
            cep: Yup.string().min(9, "O campo precisa ter 9 caracteres").max(9, "O campo precisa ter 9 caracteres").required("O campo é obrigatório"),
            houseNumber: Yup.string().min(3, "O campo precisa ter pelo menos 3 caracteres").required("O campo é obrigatório"),
            addrAddInfo: Yup.string().min(5, "O campo precisa ter pelo menos 5 caracteres"),
            cardOwner: Yup.string().min(5, "O campo precisa ter pelo menos 5 caracteres").required("O campo é obrigatório"),
            cardNumber: Yup.string().min(12, "O campo precisa ter pelo menos 12 caracteres").required("O campo é obrigatório"),
            cardCode: Yup.string().min(3, "O campo precisa ter 3 caracteres").max(3, "O campo precisa ter 3 caracteres").required("O campo é obrigatório"),
            expireMonth: Yup.string().min(1, "O campo precisa ter pelo menos 1 caracter").max(2, "O campo precisa ter no máximo 2 caracteres").required("O campo é obrigatório"),
            expireYear: Yup.string().min(4, "O campo precisa ter 4 caracteres").max(4, "O campo precisa ter 4 caracteres").required("O campo é obrigatório"),
        }),
        onSubmit: (values) => {
            purchase({
                products: getProducts(),
                delivery: {
                    receiver: values.name,
                    address: {
                        description: values.address,
                        city: values.city,
                        zipCode: values.cep,
                        number: Number(values.houseNumber),
                        complement: values.addrAddInfo
                    }
                },
                payment: {
                    card: {
                        name: values.cardOwner,
                        number: values.cardNumber,
                        code: Number(values.cardCode),
                        expires: {
                            month: Number(values.expireMonth),
                            year: Number(values.expireYear)
                        }
                    }
                }
            })
        }
    })


    const doResetCount = () => {
        dispatch(resetCount())
    }

    const goForward = () => {
        dispatch(forward())
    }

    const goBackward = () => {
        dispatch(backward())
    }

    const closeCart = () => {
        dispatch(close())
    }

    const priceFormat = (price = 0) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(price)
    }

    const finishPurchase = () => {
        reset()
        closeCart()
        doResetCount()
        items.forEach((item) => removeItem(item.id))
    }

    const getTotalPrice = () => {
        return items.reduce((total, item) => {
            return total + (item.preco ?? 0)
        }, 0)
    }

    const removeItem = (id: number) => {
        dispatch(remove(id))
    }

    const getErrorMessage = (fieldName: string, message?: string) => {
        const isTouched = fieldName in form.touched
        const isInvalid = fieldName in form.errors

        if (isTouched && isInvalid) {
            return message
        }
        return ""
    }

    if (items.length === 0) {
        return (
            <CartContainer onSubmit={form.handleSubmit} className={isOpen ? "is-open" : ""}>
            <Overlay onClick={closeCart}/>
            <Sidebar>
                <Checkout className={checkout === 0 ? "" : "is-hidden"}>
                    <Warning>Adicione items ao carrinho para continuar</Warning>
                </Checkout>
            </Sidebar>
        </CartContainer>
        )
    }

    return (
        <CartContainer onSubmit={form.handleSubmit} className={isOpen ? "is-open" : ""}>
            <Overlay onClick={() => {
                closeCart()
                doResetCount()
            }}/>
            <Sidebar>

                <Checkout className={checkout === 0 ? "" : "is-hidden"}>
                    <ul>
                        {items.map(item => (
                            <CartItem key={item.id}>
                                <img src={item.foto} />
                                <Infos>
                                    <p>{item.nome}</p>
                                    <span>{priceFormat(item.preco)}</span>
                                </Infos>
                                <TrashCan onClick={() => removeItem(item.id)}/>
                            </CartItem>
                        ))}
                    </ul>
                    <TotalPrice>
                        <p>Valor total</p>
                        <p>{priceFormat(getTotalPrice())}</p>
                    </TotalPrice>
                    <Button type="button" onClick={goForward}>Continuar com a entrega</Button>
                </Checkout>

                <Checkout className={checkout === 1 ? "" : "is-hidden"}>
                    <Title>Entrega</Title>
                    <Form>
                        <Row>
                            <InputGroup>
                                <label htmlFor="name">Quem irá receber</label>
                                <input id="name" type="text" value={form.values.name} onChange={form.handleChange} onBlur={form.handleBlur}/>
                                <p>{getErrorMessage("name", form.errors.name)}</p>
                            </InputGroup>
                        </Row>
                        <Row>
                            <InputGroup>
                                <label htmlFor="address">Endereço</label>
                                <input id="address" type="text" value={form.values.address} onChange={form.handleChange} onBlur={form.handleBlur}/>
                                <p>{getErrorMessage("address", form.errors.address)}</p>
                            </InputGroup>
                        </Row>
                        <Row>
                            <InputGroup>
                                <label htmlFor="city">Cidade</label>
                                <input id="city" type="text" value={form.values.city} onChange={form.handleChange} onBlur={form.handleBlur}/>
                                <p>{getErrorMessage("city", form.errors.city)}</p>
                            </InputGroup>
                        </Row>
                        <Row displayMode="flex">
                            <InputGroup>
                                <label htmlFor="cep">CEP</label>
                                <input id="cep" type="text" value={form.values.cep} onChange={form.handleChange} onBlur={form.handleBlur}/>
                                <p>{getErrorMessage("cep", form.errors.cep)}</p>
                            </InputGroup>
                            <InputGroup>
                                <label htmlFor="houseNumber">Número</label>
                                <input id="houseNumber" type="number" value={form.values.houseNumber} onChange={form.handleChange} onBlur={form.handleBlur}/>
                                <p>{getErrorMessage("houseNumber", form.errors.houseNumber)}</p>
                            </InputGroup>
                        </Row>
                        <Row>
                            <InputGroup>
                                <label htmlFor="addrAddInfo">Complemento (opcional)</label>
                                <input id="addrAddInfo" type="text" value={form.values.addrAddInfo} onChange={form.handleChange} onBlur={form.handleBlur}/>
                                <p>{getErrorMessage("addrAddInfo", form.errors.addrAddInfo)}</p>
                            </InputGroup>
                        </Row>
                    </Form>
                    <Button type="button" onClick={goForward}>Continuar com o pagamento</Button>
                    <Button type="button" onClick={goBackward}>Voltar para o carrinho</Button>
                </Checkout>

                {isSuccess ? (
                    <Checkout className={checkout === 2 ? "" : "is-hidden"}>
                        <Title>Pedido realizado - {data.orderId}</Title>
                        <p>
                            Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.
                        </p>
                        <p>
                            Gostaríamos de ressaltar que nossos entregadores não estão autorizados a realizar cobranças extras. 
                        </p>
                        <p>
                            Lembre-se da importância de higienizar as mãos após o recebimento do pedido, garantindo assim sua segurança e bem-estar durante a refeição.
                        </p>
                        <p>
                            Esperamos que desfrute de uma deliciosa e agradável experiência gastronômica. Bom apetite!
                        </p>
                        <Button onClick={finishPurchase}>Concluir</Button>
                    </Checkout>
                ) : (
                    <Checkout className={checkout === 2 ? "" : "is-hidden"}>
                        <Title>Pagamento - Valor a pagar {priceFormat(getTotalPrice())}</Title>
                        <Form>
                            <Row>
                                <InputGroup>
                                    <label htmlFor="cardOwner">Nome no cartão</label>
                                    <input id="cardOwner" type="text" value={form.values.cardOwner} onChange={form.handleChange} onBlur={form.handleBlur}/>
                                    <p>{getErrorMessage("cardOwner", form.errors.cardOwner)}</p>
                                </InputGroup>
                            </Row>
                            <Row displayMode="flex">
                                <InputGroup>
                                    <label htmlFor="cardNumber">Número do cartão</label>
                                    <input id="cardNumber" type="text" value={form.values.cardNumber} onChange={form.handleChange} onBlur={form.handleBlur}/>
                                    <p>{getErrorMessage("cardNumber", form.errors.cardNumber)}</p>
                                </InputGroup>
                                <InputGroup maxWidth="86px">
                                    <label htmlFor="cardCode">CVV</label>
                                    <input id="cardCode" type="number" value={form.values.cardCode} onChange={form.handleChange} onBlur={form.handleBlur}/>
                                    <p>{getErrorMessage("cardCode", form.errors.cardCode)}</p>
                                </InputGroup>
                            </Row>
                            <Row displayMode="flex">
                                <InputGroup>
                                    <label htmlFor="expireMonth">Mês de vencimento</label>
                                    <input id="expireMonth" type="number" value={form.values.expireMonth} onChange={form.handleChange} onBlur={form.handleBlur}/>
                                    <p>{getErrorMessage("expireMonth", form.errors.expireMonth)}</p>
                                </InputGroup>
                                <InputGroup>
                                    <label htmlFor="expireYear">Ano de vencimento</label>
                                    <input id="expireYear" type="number" value={form.values.expireYear} onChange={form.handleChange} onBlur={form.handleBlur}/>
                                    <p>{getErrorMessage("expireYear", form.errors.expireYear)}</p>
                                </InputGroup>
                            </Row>
                        </Form>
                        <Button type="submit">Finalizar pagamento</Button>
                        <Button type="button" onClick={goBackward}>Voltar para a edição de endereço</Button>
                    </Checkout>
                )}
            </Sidebar>
        </CartContainer>
    )
}

export default Cart