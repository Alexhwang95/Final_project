import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

import MyInfoClassItem from './MyInfoClassItem'

export default function MyInfoLecture(props) {
    // const [myClasses, setMyClasses] = useState(null);

    const myClasses = [
        {
            "name": "강의1",
            "imgPath": "이미지1",
            "userId": "강사1",
            "content": "강의내용1",
            "participantNum": "수강인원수1",
            "status": "강의 상태1",
            "createdDate": "2021-11-11"
        },
        {
            "name": "강의2",
            "imgPath": "이미지2",
            "userId": "강사2",
            "content": "강의내용2",
            "participantNum": "수강인원수2",
            "status": "강의 상태2",
            "createdDate": "2021-12-22"
        }
    ]

    // useEffect(() => {
    //     axios.get('').then(res => {
    //         console.log(res.data)
    //         setMembers(res.data);
    //     }).catch((err) =>
    //         console.log(err)
    //     )
    // }, [])

    return (
        <>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>강의이름</th>
                        <th>수강상태</th>
                        <th>수강취소</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myClasses.map(item => {
                            return (<MyInfoClassItem item={item} />);
                        })
                    }
                </tbody>
            </Table>
        </>
    );
}