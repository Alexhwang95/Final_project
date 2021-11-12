import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default function AdminMemberItem({ member }) {
    const [values, setValues] = useState();

    const [editVisible, setEditVisible] = useState(false);
    const [quitVisible, setQuitVisible] = useState(false);
    const showEditModal = () => setEditVisible(true);
    const closeEditModal = () => setEditVisible(false);
    const showQuitModal = () => setQuitVisible(true);
    const closeQuitModal = () => setQuitVisible(false);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.id]: event.target.value
        })
    }

    const handleEditSubmit = () => {
        console.log("[사용자 업데이트]: ", member.userId);
        console.log(values);

        axios.put(`/user-service/users`, values);
        closeEditModal();
        document.location.href = '/admin'
    }

    const handleQuitSubmit = () => {
        console.log("[사용자 삭제]: ", member.userId);
        axios.delete(`/admin-service/admin/user/${member.userId}`);
        closeQuitModal();
        document.location.href = '/admin'
    }

    useEffect(() => {
        setValues({
            ...member,
            "password": ""
        });
    }, [member])

    return (
        <>
            <tr>
                <td>{member.userId}</td>
                <td>{member.userName}</td>
                <td>{member.email}</td>
                <td>{member.createdAt !==null ? member.createdAt.split("T")[0] : ""}</td>
                <td><Button onClick={showEditModal}>수정</Button></td>
                <td><Button onClick={showQuitModal}>탈퇴</Button></td>
            </tr>
            <Modal show={editVisible} onHide={closeEditModal}>
                <Modal.Header>
                    <Modal.Title>회원 정보 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} className="mb-3" controlId="userId">
                        <Form.Label column sm="4">
                            회원ID
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" readOnly defaultValue={member.userId} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="userName">
                        <Form.Label column sm="4">
                            회원이름
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={member.userName} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="email">
                        <Form.Label column sm="4">
                            회원이메일
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="email" readOnly defaultValue={member.email} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="tel">
                        <Form.Label column sm="4">
                            회원전화번호
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="tel" defaultValue={member.tel} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="date">
                        <Form.Label column sm="4">
                            회원가입일
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" readOnly defaultValue={member.createdAt !==null ? member.createdAt.split("T")[0] : ""} />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeEditModal}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={handleEditSubmit}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={quitVisible} onHide={closeQuitModal}>
                <Modal.Header>
                    <Modal.Title>사용자 탈퇴 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    '{member.userId}' 회원님의 정보를 삭제하시겠습니까?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeQuitModal}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={handleQuitSubmit}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}