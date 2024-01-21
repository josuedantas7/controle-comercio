'use client'
import React from 'react'
import RegisterDebt from '../RegisterDebt/RegisterDebt'

const Modal = () => {
  return (
    <div className='flex justify-center mt-8'>
        <button className="btn" onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement)?.showModal()}>Cadastrar Usuário</button>
        <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-3xl text-white mb-8">Cadastrar Usuário</h3>
                <RegisterDebt/>
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn text-white">Fechar</button>
            </form>
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default Modal
