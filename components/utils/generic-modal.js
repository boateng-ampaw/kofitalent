import { useState, useEffect } from "react";
import { MdClose } from 'react-icons/md'
import GenericModalStyles from '../styles/generic-modal.module.css'

export default function GenericModal(props){
    // const [showGenericModal, setShowGenericModal] = useState(false)

    // const handleCloseModal = ()=>setShowGenericModal(!showGenericModal)

    useEffect(()=>{

        // console.log('Generic msg',showGenericModal, 'The props',props);
        if(props.showModal){
            document.body.classList.add('modal-open'); 
        } else {
            document.body.classList.remove('modal-open')
        }

    }, [props.showModal])

    return <>

    {
        props.showModal ? (
            
        <div id="genericModal" className={`${GenericModalStyles.modalWrap} position-fixed top-0 start-0 d-flex justify-content-center align-items-start pt-5`}  >
            <div className={`${GenericModalStyles.PseudoClose}`} onClick={props.closeModal} ></div>

            <div className={`${GenericModalStyles.modalContent} position-relative bg-black p-4 rounded-3 flex-grow-0 flex-shrink-0`}>
                <div className={`${GenericModalStyles.modalheader} d-flex align-items-center justify-content-between mb-3`}>
                    <h3 className="secondary-font mb-0">{props.header}</h3>
                    {/* <span onClick={props.closeModal} className="material-icons-outlined pointer btn btn-dark rounded-circle fs-4 d-flex align-items-center justify-content-center" style={{width: '40px',height:'40px'}}>close</span> */}
                    <MdClose className="pointer btn btn-dark rounded-circle fs-4 d-flex align-items-center justify-content-center" onClick={props.closeModal} style={{width: '50px',height:'50px', fontSize: '25px'}} />
                </div>
            {props.children}
    
            </div>
        </div>

        ) : null
    }
    </>
}