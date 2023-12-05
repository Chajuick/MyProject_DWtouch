import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(220, 220, 220);
    padding: 5px 0;
    position: relative;
    background-color: rgb(250, 250, 250);
    z-index: 20;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-left: 15px;
    height: 40px;
  };
  flex-shrink: 0;
`;

export const OptDetail = styled.div`
  margin-left: 20px;
  font-size: 14px;
  color: rgb(120, 120, 120);
  &>span {
    margin-right: 10px;
  }
  del {
    font-size: 12px;
    color: rgb(180, 180, 180);
  }
  b {
    color: rgb(250, 50, 50);
    font-weight: 400;
  }
`;

export const SettingChangeBtn = styled.button`
  margin-left: 5px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    transition: all 400ms;
    color: rgb(120, 120, 120);
  }
  svg:hover {
    color: rgb(40, 40, 40);
  }
  position: relative;
`;

export const Title = styled.div`
  margin-left: 10px;
  padding-left: 10px;
  border-left: 1px solid rgb(210, 210, 210);
  color: rgb(150, 150, 150);
  font-size: 15px;
  transition: all 400ms;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    color: rgb(80, 80, 80);
    text-decoration: underline;
    svg {
        opacity: 1;
    }
  }
  svg {
    opacity: 0;
  }
  position: relative;
`;

export const SaveBtn = styled.button`
  width: 40px;
  height: 40px;
  background-color: rgb(250, 250, 250);
  border: 1px solid rgb(120, 120, 120);
  color: rgb(40, 40, 40);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 400ms;
  &:hover {
    cursor: pointer;
    background-color: rgb(40, 40, 40);
    color: rgb(250, 250, 250);
  }
  position: relative;
`;

export const AddtoCartBtn = styled.button`
    width: 100px;
    height: 40px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(40, 40, 40);
    border: 1px solid rgb(40, 40, 40);
    color: rgb(250, 250, 250);
    margin-right: 20px;
    transition: all 400ms;
    svg {
        margin-right: 10px;
    }
    &:hover {
        cursor: pointer;
        background-color: rgb(250 250, 250);
        color: rgb(40, 40, 40);
    }
`;

export const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const SettingTitle = styled.div`
  font-size: 14px;
  color: rgb(40, 40, 40);
  margin-bottom: 10px;
  width: 250px;
`;

export const SettingSelector = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  font-size: 14px;
  color: rgb(80, 80, 80);
  border: 1px solid rgb(180, 180, 180);
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 1px 1px rgb(80, 80, 80);
  }
`;

export const SettingSelect = styled.ul`
  color: rgb(100, 100, 100);
  margin-bottom: 20px;
  list-style: none;
  div {
    position: absolute;
    border: 1px solid rgb(40, 40, 40);
    background-color: rgb(250, 250, 250);
  }
`;

export const SettingOption = styled.li`
  width: 250px;
  font-size: 14px;
  color: rgb(90, 90, 90);
  padding: 12px 8px;
  border-bottom: 1px solid rgb(200, 200, 200);
  line-height: 1.5;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    background-color: rgb(245, 245, 245);
  }
`;

export const SettingBtn = styled.button`
  width: 250px;
  color: rgb(240, 240, 240);
  background-color:rgb(40, 40, 40);
  border: 1px solid rgb(80, 80, 80);
  text-align: center;
  transition: all 400ms;
  padding: 12px 0;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    color: rgb(40, 40, 40);
    background-color: rgb(250, 250, 250);
  }
`;

export const NameChangeExplain = styled.ul`
  color: rgb(120, 120, 120);
  font-size: 14px;
  margin-top: 30px;
  li {
    margin: 0 20px;
  }
`;

export const NameChageFigure = styled.figure`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(230, 230, 230);
  border-radius: 16px;
  padding: 20px 0;
  img {
    width: 60%;
    margin-right: 40px;
  }
`;

export const NameChangeInput = styled.div`
  position: relative;
  margin-top: 30px;
  font-size: 14px;
  color: rgb(150, 150, 150);
  input {
    width: 100%;
    padding: 8px 8px;
    border: 1px solid rgb(200, 200, 200);
    color: rgb(150, 150, 150);
    &:focus {
      border: 1px solid rgb(80, 80, 80);
      outline: none;
    }
  }
  div {
    position: absolute;
    top: 0;
    right: 8px;
    padding: 8px;
  }
`;

export const NameChangeBtn = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    padding: 8px 40px;
    background-color: rgb(40, 40, 40);
    border: 1px solid rgb(40, 40, 40);
    color: rgb(240, 240, 240);
    transition: all 400ms;
  }
  button:hover {
    background-color: rgb(250, 250, 250);
    color: rgb(40, 40, 40);
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ConfirmBtn = styled.button`
  padding: 5px 15px;
  background-color: rgb(40, 40, 40);
  border: 1px solid rgb(40, 40, 40);
  color: rgb(250, 250, 250);
  transition: all 400ms;
  margin: 0 20px;
  &:hover {
    cursor: pointer;
    background-color: rgb(250, 250, 250);
    border: 1px solid rgb(40, 40, 40);
    color: rgb(40, 40, 40);
  }
`;

export const CancleBtn = styled.button`
  padding: 5px 15px;
  background-color: rgb(250, 250, 250);
  border: 1px solid rgb(40, 40, 40);
  color: rgb(40, 40, 40);
  transition: all 400ms;
  margin: 0 20px;
  &:hover {
    cursor: pointer;
    background-color: rgb(40, 40, 40);
    border: 1px solid rgb(40, 40, 40);
    color: rgb(250, 250, 250);
  }
`;

export const ToolTip = ({ $textMain, $textSub, $show }) => {
  return $show ? 
  <div style={{ 
      padding: '5px 20px',
      border: '1px solid rgb(40, 40, 40)',
      fontSize: '14px',
      backgroundColor: 'rgb(250, 250, 250)', 
      zIndex: 20, 
      position: 'absolute', 
      marginTop: '10px',
      top: '100%', left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '205px',
  }}>
      <p style={{ color: 'rgb(40, 40, 40)' }}>{$textMain}</p>
      <span style={{ color: 'rgb(120, 120, 120)', textAlign: 'left', marginTop: '3px' }}>{$textSub}</span>
  </div> : null;
};