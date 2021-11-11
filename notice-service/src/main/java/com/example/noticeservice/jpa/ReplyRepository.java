package com.example.noticeservice.jpa;

import com.example.noticeservice.entity.NoticeEntity;
import com.example.noticeservice.entity.ReplyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
@EnableJpaRepositories
@Repository
public interface ReplyRepository extends JpaRepository<ReplyEntity, Long> {

    ReplyEntity findByReplyId(Long replyId);



}
