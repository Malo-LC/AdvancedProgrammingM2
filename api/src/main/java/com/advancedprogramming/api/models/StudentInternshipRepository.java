package com.advancedprogramming.api.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentInternshipRepository extends JpaRepository<StudentInternship, Integer> {

    List<StudentInternship> findAllByUserId(Integer userId);

}
