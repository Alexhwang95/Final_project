import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ClassBoardSearchMenu from './ClassBoardSearchMenu';
import BoardCreate from './BoardCreate';

// TODO: 한 페이지 게시글 최대 개수 지정 혹은 스크롤링
export default function ClassBoardNotice({ classId }) {

  const [ keyword, setKeyword ] = useState({
    keywordType: 0,
    keywordValue: null
  });
  const [ filtered, setFiltered ] = useState([]);
  const [ classes, setClasses ] = useState([]);
  const [ people, setPeople ] = useState("");

  useEffect(() => {
    axios.get(`/notice-service/${classId}/notice/all/0`)
      .then(res => {
        setClasses(res.data.content);
        setFiltered(res.data.content);
      })
      .catch((err) =>
        console.log(err)
      )
    // setFiltered(classes);
  }, [classId])

  useEffect(() => {
    if (keyword.keywordValue != null) {
      let searchType = parseInt(keyword.keywordType);
      let searchValue = keyword.keywordValue;
      // console.log("searchType: " + searchType);
      // console.log("searchValue: " + searchValue);

      switch (searchType) {
        case 0: {
          setFiltered(classes.filter(item => item.author.includes(searchValue)));
          break;
        }
        case 1: {
          setFiltered(classes.filter(item => item.title.includes(searchValue)));
          break;
        }
        default: {
          console.log("ERROR: Invalid Search Keyword Type");
          // setFiltered(classes);
          break;
        }
      }
    }
  }, [keyword])

  // 게시글 목록
  var classesList = filtered.map((clas) => {
    const enternoticedetail = () => {
      let clickCnt = 1
      axios.get(`/notice-service/${classId}/notice/${clas.noticeId}`, {
        params: {
          clickCnt: 0
        }
      })
    }

    // 게시글 작성일 raw 데이터 편집  
    if (clas.createDate != null) {
      var dateRaw = clas.createDate;
      var createDate = '';
      var createTime = '';
      createDate = dateRaw.split("T")[0];
      createTime = dateRaw.split("T")[1];
      createTime = createTime.split(":")[1] + ":" + createTime.split(":")[2];
    }
    
    return (
      <tr>
        <th scope="row">{clas.noticeId}</th>
        <td>
          <Link to={{
            pathname: `/classdetailnotice/${clas.noticeId}`,
            state: {
              classId: classId
            }
          }}
            style={{color:"black"}}>
              <button onClick={enternoticedetail}>
            {clas.title}</button>
          </Link>
        </td>
        <td>{clas.userName}</td>
        <td>{createDate + " " + createTime}</td>
        <td>{clas.clickCnt}</td>
      </tr>
    )
  })

  return (
    <div>
      <div className="row">
        <div className="col-2">
          {/* <BoardCreate></BoardCreate> */}
          <Link to={`/boardcreate/${classId}`} params={classId}>
            <i class="fas fa-pen-square fa-2x" style={{ color: "black" }}></i>
          </Link>
        </div>
        <div className="col-10">
          <ClassBoardSearchMenu keyword={keyword} setKeyword={setKeyword} />
        </div>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">번호</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">등록일</th>
            <th scope="col">조회수</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ?
            classesList
            :
            <>검색된 게시글이 없습니다!</>
          }
        </tbody>
      </table>
      {/* <ClassBoardList name="notice" classId={classId} /> */}
    </div>
  );
}