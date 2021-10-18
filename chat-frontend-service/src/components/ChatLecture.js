import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatContainer from './ChatContainer';
import MembersList from './MembersList';
import ChatSideTab from './ChatSideTab';

export default function ChatLecture({ classID }) {
    // tabVisible: 탭의 활성화 상태 (false: 비활성, true: 활성화)
    const [tabSelected, setTabSelected] = useState(0);
    const [messages, setMessages] = useState(0);
    const [members, setMembers] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3006/messages?class_id=${classID}`)
            .then(res => {
                setMessages(res.data);
            })

        // TODO: 참가자(참가중, 자리비움, 강사) 데이터 요청
        setMembers('');
    }, [classID])

    return (
        <>
            < ChatSideTab className="sideTab" tabSelected={tabSelected} setTabSelected={setTabSelected} />
            {
                tabSelected > 0 ?
                    tabSelected == 1 ?
                        < ChatContainer messages={messages} /> :
                        < MembersList messages={messages} />
                    :
                    ''
            }
        </>
    );
}