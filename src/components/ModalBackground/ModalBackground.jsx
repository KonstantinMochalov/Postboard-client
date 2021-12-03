import React, {useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import PostForm from './PostForm/PostForm';
import styles from "./ModalBackground.module.css"
import ModalError from './ModalError/ModalError';
import { closeModal } from '../../actions/modal';
import LoginForm from './LogInForm/LoginForm';
import SignInForm from './SignInForm/SignInForm';
import { setCurrentId } from '../../actions/currentId';

export default function ModalBackground() {
    const dispatch = useDispatch()
    const modalRef = useRef()
    const handleCloseModal = e =>{
        if (modalRef.current === e.target) {
          dispatch(closeModal())
          dispatch(setCurrentId(0))
        }
      }
    const modal = useSelector(state => state.modal)
    useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27){
            dispatch(closeModal())
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[])
    function ModalWindow(){
        switch (modal) {
            case "postForm":
                return <PostForm/>
            case "logInForm":
                return <LoginForm/>
            case "signInForm":
                return <SignInForm/>        
            default:
                return <ModalError/>;
        }

    }
    return (
        <div className={styles.background} ref={modalRef} onClick={handleCloseModal}>
            <ModalWindow/>
        </div>
    )
}
