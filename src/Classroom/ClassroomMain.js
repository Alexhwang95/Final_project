import React, { useEffect, useState } from 'react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Navmenu from '../Home/Navmenu';
// import Footbar from '../Home/Footbar';
import ClassHeader from '../layout/ClassHeader';
import ClassBoardHome from '../Board/ClassBoardHome'
import ClassBoardNotice from '../Board/ClassBoardNotice'
import ClassBoardCurriculum from '../Board/ClassBoardCurriculum'
import ClassBoardHomework from '../Board/ClassBoardAssignment'
import ClassBoardDiscuss from '../Board/ClassBoardDiscuss'
import ClassBoardResource from '../Board/ClassBoardReference'
// import ClassBoardList from '../widgets/ClassBoardList';
import ClassMemberManage from '../widgets/ClassMemberManage'
import styles from '../layout/Class.module.css'
import BoardArticleView from '../Board/BoardArticleView'

export default function ClassroomMain() {

  const classId = window.location.pathname.split('/')[2];
  const [activeKey, setActiveKey] = useState("home");
  const [ clsname, setClsnames ] = useState([]);
  const [ teacher, setTeacher ] = useState([]);
  const [ content, setContent ] = useState([]);
  const [ status, setStatus] = useState([]);
  
  useEffect(() => {
    axios.get('/classroom-service/lectures/all',
    {params: {userId: sessionStorage.userId}})
    .then(res => {
      var cnt = 0
      while (res.data.length !== 0) {
        if (res.data[cnt].classroomId == classId){
          setClsnames(res.data[cnt].name)   
          setTeacher(res.data[cnt].teacher)   
          setContent(res.data[cnt].content)
          setStatus(res.data[cnt].status)
          break;
        } else {
          cnt += 1

  // boardStatus: 0.리스트, 1.글 내용, 2.글 작성, 3. 글 수정
  const [boardStatus, setBoardStatus] = useState(0);
  const [articleId, setArticleId] = useState(0);

  const handleSelected = key => {
    setActiveKey(key);
    setBoardStatus(0);
  }
  
  return (
    <div>
      <Navmenu />
      <div className={styles.clsroomcontainer}>
        <ClassHeader classId={classId} clsname={clsname} teacher={teacher} />
        <Tab.Container
          defaultActiveKey={activeKey}
          onSelect={handleSelected}
        >
          <Row>
            <Col xl={2} sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="home" className={styles.sidemenu}>홈</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey="curr" className={styles.sidemenu}>강의커리큘럼</Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link eventKey="notice" className={styles.sidemenu}>공지사항</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="homework" className={styles.sidemenu}>과제게시판</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="qna" className={styles.sidemenu}>질문게시판</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="material" className={styles.sidemenu}>자료게시판</Nav.Link>
                </Nav.Item>
                {
                  status === 5 ? (
                    <Nav.Item>
                      <Nav.Link eventKey="seventh" className={styles.sidemenu}>수강생관리</Nav.Link>
                    </Nav.Item>
                ) : null
                }
              </Nav>
            </Col>
            <Col xl={10} sm={10}>
              <Tab.Content>
                <BoardArticleView classId={classId} articleId={articleId} boardStatus={boardStatus} setBoardStatus={setBoardStatus} />
                {
                  boardStatus == 0 ?
                    <>
                      <Tab.Pane eventKey="home">
                        <ClassBoardHome setBoardStatus={setBoardStatus} classId={classId} content={content} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="notice">
                        <ClassBoardNotice setBoardStatus={setBoardStatus} setArticleId={setArticleId} classId={classId} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="homework">
                        <ClassBoardHomework classId={classId} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="qna">
                        <ClassBoardDiscuss classId={classId} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="material">
                        <ClassBoardResource classId={classId} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="members">
                        <ClassMemberManage classId={classId} />
                      </Tab.Pane>
                    </>
                    :
                    <></>
                }
              </Tab.Content>
            </Col >
          </Row >
          {/* <ClassBoardList /> */}
        </Tab.Container >
      </div >
      {/* <Footbar /> */}
    </div >
  );
}