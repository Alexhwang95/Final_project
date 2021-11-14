import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

import AdminMemberItem from './AdminMemberItem';

export default function AdminMember() {
    const [members, setMembers] = useState(null);

    useEffect(() => {
        axios.get('/admin-service/admin/user/all').then(res => {
            // console.log(res.data)
            setMembers(res.data);
        }).catch((err) =>
            console.log(err)
        )
    }, [])

    return (
        <>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>회원이름</th>
                        <th>이메일</th>
                        <th>가입일</th>
                        <th>정보수정</th>
                        <th>탈퇴</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        members !==null ?
                            members.map(member => {
                                return (<AdminMemberItem key={member.userId} member={member} />);
                            })
                            :
                            <>사용자 데이터를 불러올 수 없습니다.</>
                    }
                </tbody>
            </Table>
        </>
    );
}