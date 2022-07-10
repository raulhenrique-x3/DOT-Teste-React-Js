import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import '../Form/form.css'
import useCart from '../../hooks/useCart';
import { Link } from "react-router-dom";


const API_IMG = 'https://image.tmdb.org/t/p/w500/'

// Validação do Form
const schema = yup.object({

    fullName: yup.string().min(2).required(),

    cpf: yup.number().positive().min(11).integer().required(),

    cellNumber: yup.number().positive().min(12).integer().required(),

    email: yup.string().email().required(),

    cep: yup.number().positive().min(8).required(),

    adress: yup.string().required(),

    city: yup.string().required(),

    state: yup.string().required(),

}).required()



const Form = () => {

    // Remoção de item da seção Form
    const { cart, removeFromCart } = useCart()
    const removeItemForm = (id) => {
        removeFromCart({ type: 'remove', id })
    }

    // Validação do Form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // Submit das informações do Form
    const onSubmit = (data) => {
        console.log(data)
    }

    // Mostrar modal
    const [modalCont, setmodalCont] = useState(false)


    // Cálculo dos produtos do carrinho
    const [totalSum, setTotalSum] = useState(0)
    useEffect(() => {
        const total = cart.reduce((qnt, price) => qnt + price.price, 0)
        setTotalSum(total)
    }, [cart])

    return (
        <div className="sectionForm" >
            <div className="formContent">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        <p>Finalizar Compra</p>
                        <input
                            className="fullInput"
                            type={'text'}
                            placeholder='Nome completo'
                            {...register("fullName")}
                            name="fullName"
                        />
                        <p style={{ color: 'red', fontSize: '1rem' }}>{errors.fullName && "Campo obrigatório!"}</p>
                        <div className="inputHalf">
                            <span>
                                <input
                                    className="cpfInput"
                                    type={'text'}
                                    placeholder='CPF'
                                    {...register("cpf")}
                                    name="cpf"
                                />
                                <p style={{ color: 'red', fontSize: '1rem' }}>{errors.cpf && "Campo obrigatório!"}</p>
                            </span>


                            <span>
                                <input
                                    className="celInput"
                                    type={'tel'}
                                    placeholder='Celular'
                                    {...register("cellNumber")}
                                    name="cellNumber" />
                                <p style={{ color: 'red', fontSize: '1rem' }}>{errors.cellNumber && "Campo obrigatório!"}</p>
                            </span>

                        </div>
                        <input
                            className="fullInput"
                            type={'email'}
                            placeholder='E-mail'
                            {...register("email")}
                            name="email" />
                        <p style={{ color: 'red', fontSize: '1rem' }}>{errors.email && "Campo obrigatório!"}</p>
                        <div className="inputHalf">
                            <span>
                                <input
                                    className="cepInput"
                                    type={'text'}
                                    placeholder='CEP'
                                    {...register("cep")}
                                    name="cep" />
                                <p style={{ color: 'red', fontSize: '1rem' }}>{errors.cep && "Campo obrigatório!"}</p>
                            </span>
                            <span>
                                <input
                                    className="addressInput"
                                    type={'text'}
                                    placeholder='Endereço'
                                    {...register("adress")}
                                    name="adress" />
                                <p style={{ color: 'red', fontSize: '1rem' }}>{errors.adress && "Campo obrigatório!"}</p>
                            </span>
                        </div>
                        <div className="inputHalf">
                            <span>
                                <input
                                    className="cityInput"
                                    type={'text'}
                                    placeholder='Cidade'
                                    {...register("city")}
                                    name="city" />
                                <p style={{ color: 'red', fontSize: '1rem' }}>{errors.city && "Campo obrigatório!"}</p>
                            </span>

                            <span>
                                <input
                                    className="stateInput"
                                    type={'text'}
                                    placeholder='Estado'
                                    {...register("state")}
                                    name="state" />
                                <p style={{ color: 'red', fontSize: '1rem' }}>{errors.state && "Campo obrigatório!"}</p>
                            </span>

                        </div>
                    </label>

                </form>
            </div>

            <div className="buyContent">
                <div className="buyedItems">
                    <div className="buyTitle">
                        <div className="imgName">
                            <p>Imagem</p>
                            <p>Nome</p>
                        </div>
                        <div className="qtdPrice">
                            <p>Qtd</p>
                            <p className='preçoP'>Preço</p>
                        </div>
                    </div>

                    <div className="buyedMovieInfo">
                        {cart?.map((item) =>
                            <div className="selectedMovie" key={item.id}>
                                <img alt={item.title} className='imgMovieBuy' src={API_IMG + item.img} />
                                <div className="testingBuy">
                                    <span><p>{item.title}</p></span>
                                    <span><p>{item.qnt}</p></span>
                                    <span><p>R${item.price}</p></span>
                                    <svg onClick={() => removeItemForm(item.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                    </svg>
                                </div>
                            </div>)}
                    </div>

                    <div className="total">
                        <p className="totalText">Total:</p>
                        <p className="totalValue">R$ {totalSum.toFixed(2)}</p>
                    </div>

                    <span onClick={() => setmodalCont(!modalCont)}>
                        <button onClick={handleSubmit()} className="submitButton" name="submit" type="submit">Finalizar</button>
                    </span>
                </div>
            </div>
            <div className={modalCont ? 'modalCont' : 'hiddeModalCont'}>
                <div className="modal">
                    <h1>Obrigado, Uzumaki Naruto!</h1>
                    <h3>Sua compra foi finalizada com sucesso</h3>
                    <Link to={'/'}>
                        <button className="toHome">Ir para loja</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Form;