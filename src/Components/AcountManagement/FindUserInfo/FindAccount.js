import styled from 'styled-components';
import * as MS from '../../Modal/ModalStyle';
import FindUserID from './FindUserID';
import FindUserPW from './FindUserPW';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectFindValueAria = styled.div`
  width: 350px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  border-bottom: 1px solid rgb(220, 220, 220);
  button {
    width: calc( 30% );
    padding: 10px 0;
    border: none;
    background: none;
    color: rgb(150, 150, 150);
    transition: all 400ms;
    position: relative;
  }
  button.sel {
    width: calc( 70% );

    color: rgb(40, 40, 40);
  }
  button::after {
    content: '';
    position: absolute;
    width: 0;
    height: 100%;
    border-bottom: 1px solid rgba(150, 150, 150, 0);
    top: 0;
    left: 0;
    transition: all 400ms;
  }
  button.sel::after {
    width: 100%;
    border-bottom: 1px solid rgb(150, 150, 150);
  }
  button:hover {
    cursor: pointer;
    color: rgb(80, 80 ,80);
  }
`;

const SearchAria = styled.div`
  width: 350px;
  border-radius: 0 0 8px 8px;
`;

export default function FindAccount({ showModal, setShowModal, isFindID, setIsFindID, handleOpenLoginModal }) {
  return (
    <>
      <MS.Overlay $showModal={showModal} />
      <MS.Modal $showModal={showModal} >
        <MS.ModalCloseBtn onClick={() => setShowModal(false)}>&times;</MS.ModalCloseBtn>
        <Container>
          <SelectFindValueAria>
            <button className={isFindID? 'sel' : ''} onClick={() => setIsFindID(true)}>아이디 찾기</button>
            <button className={isFindID? '' : 'sel'} onClick={() => setIsFindID(false)}>비밀번호 찾기</button>
          </SelectFindValueAria>
          <SearchAria>
          {isFindID &&
            <FindUserID />
          }
          {!isFindID &&
            <FindUserPW 
              setShowModal={setShowModal}
              handleOpenLoginModal={handleOpenLoginModal}
            />
          }
          </SearchAria>
        </Container>
      </MS.Modal>
    </>
  );
};