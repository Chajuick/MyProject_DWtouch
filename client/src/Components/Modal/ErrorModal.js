import * as MS from './ModalStyle';

export default function ErrorModal({ showErrorModal, setShowErrorModal, errCode, setErrCode }) {

    function closeErrorModal() {
        setShowErrorModal(false);
    }

    return(
        <>
            <MS.AlertOverlay $showAlertModal={showErrorModal}/>
            <MS.AlertModal $showAlertModal={showErrorModal}>
                <p style={{ color: "rgb(250, 50, 50)" }}>오류코드 - {errCode}</p>
                <div>
                    <button type='button' onClick={closeErrorModal}>확인</button>
                </div>
            </MS.AlertModal>
        </>
    )
};