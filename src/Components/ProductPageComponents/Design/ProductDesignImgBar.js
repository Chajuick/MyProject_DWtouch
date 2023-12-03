import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const RotateModify = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const RotateModifyBtn = styled.button`
  padding: 0 15px;
  border: 1px solid rgb(180, 180, 180);
  background-color: rgb(250, 250, 250);
  border-bottom: none;
  color: rgb(80, 80, 80);
  transition: all 400ms;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  &:hover {
    cursor: pointer;
    background-color: rgb(220, 220, 220);
    color: rgb(40, 40, 40);
  }
`;

const ImgSubmit = styled.div`
`;

const ControlBar = styled.div`
  width: 100vw;
  background-color: rgb(250, 250, 250);
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  border: 1px solid rgb(200, 200, 200);
`;

const ViewType = styled.div`
  margin: 0 auto;
  flex-shrink: 0;
`;

const ViewTypeBtn = styled.button`
  font-size: 13px;
  padding: 15px 35px;
  color: rgb(180, 180, 180);
  background-color: rgb(250, 250, 250);
  border: none;
  border-bottom: 1px solid rgb(250, 250, 250);
  transition: all 400ms;
  &:hover {
    cursor: pointer;
    color: rgb(100, 100, 100);
    border-bottom: 1px solid rgb(150, 150, 150);
  }
  &.sel {
    color: rgb(100, 100, 100);
    border-bottom: 1px solid rgb(150, 150, 150);
  }
`;

const ViewMod = styled.div`
  position: absolute;
  top: 0;
  right: 20px;
  display: flex;
  flex-direction: row;
`;

const ViewModBtn = styled.button`
  width: 32px;
  height: 32px;
  margin: 6px 0;
  background-color: rgb(250, 250, 250);
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 400ms;
  &:hover {
    cursor: pointer;
    background-color: rgb(230, 230, 230);
  }
  &.sel {
    background-color: rgb(230, 230, 230);
  }
`;

const SubmitAria = styled.div`
  width: 100vw;
  min-height: ${props => props.$submitSize}px;
  max-height: ${props => props.$submitSize}px;
  overflow-y: scroll;
  background-color: rgb(250, 250, 250);
  display: flex;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
  flex-shrink: 0;
  padding: 20px;
`;

const SubmitBtn = styled.button`
  width: ${props => 100 + props.$viewMod*50}px;
  height: ${props => 100 + props.$viewMod*50}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 0 10px 30px;
  border: none;
  transition: all 400ms;
  color: rgb(150, 150, 150);
  font-size: 12px;
  &:hover {
    cursor: pointer;
    background-color: rgb(180, 180, 180);
    color: rgb(40, 40, 40);
  }
  span:first-child {
    font-size: 30px;
    font-weight: bold;
  }
`;

const Arrs = styled.div`
    width: ${props => 100 + props.$viewMod*50}px;
    height: ${props => 100 + props.$viewMod*50}px;
    margin: 0 0 10px 30px;
    overflow: hidden;
    transition: all 400ms;
    box-shadow: 0 0 1px 2px rgba(40, 40, 40, 0);
    &:hover {
      cursor: pointer;
      box-shadow: 0 0 1px 1px rgba(40, 40, 40, 0.5);
    }
    &>img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
`;

const viewTypeArr = ["사진", "클립아트", "배경"];

export default function ProductDesignImgBar() {
  const [submitAriaSize, setSubmitAriaSize] = useState(1);
  const [selectedViewType, setSelectedViewType] = useState(0);
  const [selectedViewMod, setSelectedViewMod] = useState(0);
  const [photoArr, setPhotoArr] = useState([]);
  const [clipArtArr, setClipArtArr] = useState([]);
  const [bckArr, setBckArr] = useState([]);

  // 파일이 선택되었을 때 호출되는 핸들러
  const handleFileChange = (event) => {
    const files = event.target.files;
    // 파일이 선택되었을 때의 로직
    if (files.length > 0) {
      const newPhotoArr = [...photoArr];
      // 각 파일을 순회하며 photoArr에 추가
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileObject = {
          id: Date.now(), // 파일을 구분하기 위한 고유 ID
          file: file,
          previewURL: URL.createObjectURL(file),
        };
        newPhotoArr.push(fileObject);
      }
      // photoArr 업데이트
      setPhotoArr(newPhotoArr);
    }
  };
  // 파일 업로드 버튼을 클릭했을 때 파일 선택 창을 열도록 하는 핸들러
  const handleUploadBtnClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <>
      <Container>
        <RotateModify>
          <RotateModifyBtn
            disabled={submitAriaSize > 1? true : false}
            onClick={() => setSubmitAriaSize(submitAriaSize+1)}
          ><Icon icon="bi:caret-up-fill" /></RotateModifyBtn>
          <RotateModifyBtn
            disabled={submitAriaSize < 1? true : false}
            onClick={() => setSubmitAriaSize(submitAriaSize-1)}
          ><Icon icon="bi:caret-up-fill" rotate={2} /></RotateModifyBtn>
        </RotateModify>
        <ImgSubmit>
          <ControlBar>
            <ViewType>
              {viewTypeArr.map((item, index)=> (
                <ViewTypeBtn key={index} className={index === selectedViewType? 'sel' : ''}
                onClick={() => {setSelectedViewType(index)}}
                >
                  {item}
                </ViewTypeBtn>
              ))}
            </ViewType>
            <ViewMod>
              <ViewModBtn className={selectedViewMod === 0? 'sel' : ''}
              onClick={() => setSelectedViewMod(0)}>
                <Icon icon="bi:grid-3x3-gap-fill" />
              </ViewModBtn>
              <ViewModBtn className={selectedViewMod === 1? 'sel' : ''}
              onClick={() => setSelectedViewMod(1)}>
                <Icon icon="heroicons:squares-2x2-20-solid" />
              </ViewModBtn>
            </ViewMod>
          </ControlBar>
          <SubmitAria $submitSize={submitAriaSize*160}>
            <SubmitBtn $viewMod={selectedViewMod} onClick={handleUploadBtnClick}>
              <span>+</span><span>{viewTypeArr[selectedViewType]} 가져오기</span>
            </SubmitBtn>
            {selectedViewType === 0 && photoArr.map((item, index) => (
              <Arrs key={index} $viewMod={selectedViewMod}>
                <img src={item.previewURL} alt={`Preview ${item.file.name}`} />
              </Arrs>
            ))}
            {selectedViewType === 1 && clipArtArr.map((item, index) => (
              <Arrs key={index} $viewMod={selectedViewMod}>{item}</Arrs>
            ))}
            {selectedViewType === 2 && bckArr.map((item, index) => (
              <Arrs key={index} $viewMod={selectedViewMod}>{item}</Arrs>
            ))}
          </SubmitAria>
          <input
            type='file'
            id='fileInput'
            accept="image/*" // 이미지 파일만 허용
            style={{ display: 'none' }}
            onChange={handleFileChange}
            multiple
          />
        </ImgSubmit>
      </Container>
    </>
  );
};